// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 1. 获取源数据 (通过 rss2json 代理节点绕过反爬)
    const rssUrl = encodeURIComponent('https://www.wowhead.com/news/rss/all');
    const proxyApi = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    const response = await axios.get(proxyApi, { timeout: 10000 });

    if (response.data.status !== 'ok') {
      throw new Error('RSS 解析代理返回错误状态');
    }

    const feedItems = response.data.items || [];
    
    // 2. 提取数据（不在这里做耗时的自动翻译，避免 3 秒超时崩溃）
    const items = feedItems.slice(0, 20).map(item => {
      const isBluePost = item.title.toLowerCase().includes('blue post') || 
                         (item.categories && item.categories.includes('Blue Posts'));
                         
      return {
        title: item.title,
        link: item.link,
        formattedDate: item.pubDate,
        isBluePost: isBluePost,
        // 保留更多原文内容用于小程序内展示
        contentSnippet: item.description ? item.description.replace(/<img[^>]*>/g, '').replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '') : '',
        isTranslated: false
      }
    });

    return {
      success: true,
      data: items
    }
  } catch (err) {
    console.error('抓取失败:', err)
    return {
      success: false,
      error: err.message || 'RSS 抓取失败'
    }
  }
}
