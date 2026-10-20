const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*'
}

async function safeGet(url, options = {}, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await axios.get(url, {
        headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
        timeout: options.timeout || 15000,
        responseType: options.responseType || 'json'
      })
    } catch (err) {
      if (attempt === retries) throw err
      console.warn(`[syncWarcraftData] ${url} 失败，准备重试: ${err.message}`)
      await new Promise(r => setTimeout(r, 500))
    }
  }
}

exports.main = async (event, context) => {
  try {
    console.log('开始定时抓取魔兽数据...')
    
    // 1. 抓取 Mythicstats DPS/Tanks/Healers 强度 HTML
    console.log('正在获取 Mythicstats 强度榜...')
    try {
      const metaRes = await safeGet('https://mythicstats.com/dps', {
        timeout: 20000,
        responseType: 'text',
        headers: { 'Referer': 'https://mythicstats.com/' }
      }, 1)
      if (metaRes?.data && typeof metaRes.data === 'string') {
        await db.collection('meta_data').doc('latest').set({
          data: {
            html: metaRes.data,
            updateTime: db.serverDate()
          }
        })
        console.log('✅ 强度榜数据已更新至云数据库')
      }
    } catch (metaErr) {
      console.error('抓取 Mythicstats 失败:', metaErr.message)
    }

    // 2. 抓取 Raider.io 前 100 名车队数据
    console.log('正在获取 Raider.io 顶层车队数据 (共100名)...')
    const pageMap = {}
    const requests = [0, 1, 2, 3, 4].map(i => {
      const pageUrl = `https://raider.io/api/v1/mythic-plus/runs?region=world&dungeon=all&page=${i}`
      return safeGet(pageUrl, { timeout: 15000 }, 1)
        .then(res => {
          if (res?.data?.rankings && Array.isArray(res.data.rankings)) {
            pageMap[i] = res.data.rankings
          }
        })
        .catch(err => {
          console.error(`Page ${i} 抓取失败:`, err.message)
        })
    })

    await Promise.all(requests)

    let combinedRankings = []
    for (let i = 0; i < 5; i++) {
      if (pageMap[i]) {
        combinedRankings = combinedRankings.concat(pageMap[i])
      }
    }

    // 严格按 rank 排序
    combinedRankings.sort((a, b) => (a.rank || 0) - (b.rank || 0))
    combinedRankings = combinedRankings.slice(0, 100)
    
    // 安全检查：如果前20名缺失（第一条 rank > 20），放弃本次写入以免污染数据库
    if (combinedRankings.length > 0 && combinedRankings[0].rank <= 20) {
      const strippedRankings = combinedRankings.map(r => ({
        rank: r.rank,
        score: r.score,
        run: {
          mythic_level: r.run?.mythic_level || 0,
          dungeon: { name: r.run?.dungeon?.name || '未知副本' },
          roster: (r.run?.roster || []).map(m => ({
            role: m.role || 'dps',
            character: {
              name: m.character?.name || '未知玩家',
              spec: { name: m.character?.spec?.name || '未知专精' },
              class: { name: m.character?.class?.name || '未知职业' }
            }
          }))
        }
      }))

      await db.collection('topmeta_data').doc('latest').set({
        data: {
          rankings: strippedRankings,
          updateTime: db.serverDate()
        }
      })
      console.log(`✅ 顶层车队数据已更新，共 ${strippedRankings.length} 条`)
    } else {
      console.warn('本次抓取 Raider.io 数据不全或缺失头部排名，放弃覆写数据库')
    }

    return { success: true, message: '定时数据更新完成' }
  } catch (err) {
    console.error('抓取数据整体失败:', err)
    return { success: false, error: err.message }
  }
}
