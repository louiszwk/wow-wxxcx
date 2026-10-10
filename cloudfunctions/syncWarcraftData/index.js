const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    console.log('开始定时抓取魔兽数据...')
    
    // 1. 抓取 Mythicstats DPS/Tanks/Healers 强度 HTML
    console.log('正在获取 Mythicstats 强度榜...')
    const metaRes = await axios.get('https://mythicstats.com/dps', { timeout: 20000 })
    if (metaRes.data) {
      // 存入云数据库，固定 _id 为 'latest'
      await db.collection('meta_data').doc('latest').set({
        data: {
          html: metaRes.data,
          updateTime: db.serverDate()
        }
      })
      console.log('✅ 强度榜数据已更新')
    }

    // 2. 抓取 Raider.io 前 100 名车队数据 (并发请求)
    console.log('正在获取 Raider.io 顶层车队数据 (共100名)...')
    let combinedRankings = []
    
    const requests = []
    for (let i = 0; i < 5; i++) {
      requests.push(axios.get(`https://raider.io/api/v1/mythic-plus/runs?region=world&dungeon=all&page=${i}`, { timeout: 15000 }).catch(err => null))
    }
    const results = await Promise.all(requests)
    
    results.forEach(runRes => {
      if (runRes && runRes.data && runRes.data.rankings) {
        combinedRankings = combinedRankings.concat(runRes.data.rankings)
      }
    })
    
    // 3. 瘦身数据 (只保留排版需要的最精简字段，以免超过云数据库1MB单记录限制)
    const strippedRankings = combinedRankings.map(r => ({
      rank: r.rank,
      score: r.score,
      run: {
        mythic_level: r.run.mythic_level,
        dungeon: { name: r.run.dungeon.name },
        roster: r.run.roster.map(m => ({
          role: m.role,
          character: {
            name: m.character.name,
            spec: { name: m.character.spec.name },
            class: { name: m.character.class.name }
          }
        }))
      }
    }));
    
    if (strippedRankings.length > 0) {
      await db.collection('topmeta_data').doc('latest').set({
        data: {
          rankings: strippedRankings,
          updateTime: db.serverDate()
        }
      })
      console.log(`✅ 顶层车队数据已更新，共 ${strippedRankings.length} 条`)
    }

    return { success: true, message: '定时数据更新完成' }
  } catch (err) {
    console.error('抓取数据失败:', err)
    return { success: false, error: err.message }
  }
}
