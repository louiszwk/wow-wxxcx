// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*'
}

// 带单次重试的安全 GET 请求
async function safeGet(url, options = {}, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await axios.get(url, {
        headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
        timeout: options.timeout || 12000,
        responseType: options.responseType || 'json'
      })
      return res
    } catch (err) {
      if (attempt === retries) throw err
      console.warn(`[safeGet] 请求 ${url} 失败，准备第 ${attempt + 1} 次重试... 错误: ${err.message}`)
      await new Promise(r => setTimeout(r, 400))
    }
  }
}

// 聚合拉取 Raider.io 前100名大秘境车队数据
async function fetchTopRunsAggregated() {
  const pageMap = {}
  
  // 5页并发拉取，内部带重试
  const tasks = [0, 1, 2, 3, 4].map(page => {
    const pageUrl = `https://raider.io/api/v1/mythic-plus/runs?region=world&dungeon=all&page=${page}`
    return safeGet(pageUrl, { timeout: 12000 }, 1)
      .then(res => {
        if (res?.data?.rankings && Array.isArray(res.data.rankings)) {
          pageMap[page] = res.data.rankings
        }
      })
      .catch(err => {
        console.error(`拉取 Raider.io Page ${page} 失败:`, err.message)
      })
  })

  await Promise.all(tasks)

  // 拼接并确保顺序
  let combined = []
  for (let p = 0; p < 5; p++) {
    if (pageMap[p]) {
      combined = combined.concat(pageMap[p])
    }
  }

  // 按 rank 严格升序排序
  combined.sort((a, b) => (a.rank || 0) - (b.rank || 0))
  // 限制前100
  combined = combined.slice(0, 100)

  if (combined.length === 0) {
    // 尝试从云数据库读取降级缓存
    try {
      const cacheDoc = await db.collection('topmeta_data').doc('latest').get()
      if (cacheDoc?.data?.rankings?.length > 0) {
        console.log('网络抓取为空，使用数据库历史缓存')
        return { success: true, data: { rankings: cacheDoc.data.rankings }, fromCache: true }
      }
    } catch (e) {
      // ignore
    }
    throw new Error('未获取到有效的 Raider.io 车队数据')
  }

  // 瘦身过滤无用冗余字段，极大减小小程序包体积和传输延时
  const strippedRankings = combined.map(r => ({
    rank: r.rank,
    score: r.score,
    run: {
      mythic_level: r.run?.mythic_level,
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

  // 异步尝试存入云数据库备份，静默容错
  try {
    await db.collection('topmeta_data').doc('latest').set({
      data: {
        rankings: strippedRankings,
        updateTime: db.serverDate()
      }
    })
  } catch (dbErr) {
    console.warn('保存 topmeta_data 缓存至云数据库失败（如集合未创建可忽略）:', dbErr.message)
  }

  return { success: true, data: { rankings: strippedRankings } }
}

// 获取 Mythicstats 强度榜数据
async function fetchMetaStats() {
  const targetUrl = 'https://mythicstats.com/dps'
  try {
    const res = await safeGet(targetUrl, {
      timeout: 16000,
      responseType: 'text',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Referer': 'https://mythicstats.com/'
      }
    }, 1)

    const html = res.data
    if (html && typeof html === 'string') {
      // 异步尝试写入云数据库
      try {
        await db.collection('meta_data').doc('latest').set({
          data: {
            html: html,
            updateTime: db.serverDate()
          }
        })
      } catch (dbErr) {
        console.warn('保存 meta_data 缓存至云数据库失败:', dbErr.message)
      }
      return { success: true, data: html }
    }
    throw new Error('未能获取到有效的 Mythicstats HTML 内容')
  } catch (err) {
    // 降级尝试从云数据库读取历史缓存
    try {
      const cacheDoc = await db.collection('meta_data').doc('latest').get()
      if (cacheDoc?.data?.html) {
        console.log('实时抓取失败，使用数据库历史缓存')
        return { success: true, data: cacheDoc.data.html, fromCache: true }
      }
    } catch (e) {
      // ignore
    }
    throw err
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  const { action, url, method = 'GET', data = {}, headers = {}, responseType = 'json' } = event

  // 1. 聚合拉取 Raider.io 大米前百车队数据
  if (action === 'getTopRuns') {
    try {
      const result = await fetchTopRunsAggregated()
      return result
    } catch (err) {
      console.error('getTopRuns 聚合拉取失败:', err)
      return { success: false, error: err.message }
    }
  }

  // 2. 抓取 Mythicstats 强度榜数据
  if (action === 'getMetaStats') {
    try {
      const result = await fetchMetaStats()
      return result
    } catch (err) {
      console.error('getMetaStats 抓取失败:', err)
      return { success: false, error: err.message }
    }
  }

  // 3. 通用代理请求（向前兼容旧逻辑）
  try {
    const res = await axios({
      url,
      method,
      data,
      headers: { ...DEFAULT_HEADERS, ...headers },
      responseType,
      timeout: 15000
    })
    
    return {
      success: true,
      data: res.data,
      statusCode: res.status
    }
  } catch (err) {
    console.error('代理请求失败:', err.message)
    return {
      success: false,
      error: err.message,
      statusCode: err.response ? err.response.status : 500,
      data: err.response ? err.response.data : null
    }
  }
}
