const cloud = require('wx-server-sdk');
const axios = require('axios');
const xml2js = require('xml2js');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  try {
    // 请求 Wowhead RSS
    const response = await axios.get('https://www.wowhead.com/news/rss/retail', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);
    
    // 提取前 10 条蓝贴或新闻
    let items = result.rss.channel.item || [];
    if (!Array.isArray(items)) items = [items];
    items = items.slice(0, 10);

    const newsList = items.map(item => {
      // 简单清理下 HTML 标签
      let desc = item.description ? item.description.replace(/<[^>]+>/g, '').trim() : '';
      if (desc.length > 100) desc = desc.substring(0, 100) + '...';
      
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: desc
      };
    });

    return {
      success: true,
      data: newsList
    };

  } catch (error) {
    console.error('获取 Wowhead 资讯失败', error);
    return {
      success: false,
      error: error.message
    };
  }
};
