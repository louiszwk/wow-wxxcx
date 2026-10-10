const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { url } = event;
  if (!url) {
    return { success: false, error: '缺少链接' };
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    
    const html = response.data;
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    
    // 国服官网的文章内容通常在 <div class="detail"> 或 <div class="Blog"> 里面
    let articleHtml = '';
    const detailNode = $('.detail, .Blog, .detail-content, .news-detail-content').first();
    
    if (detailNode.length > 0) {
      // 移除可能引起问题的样式和脚本标签
      detailNode.find('style, script, iframe').remove();
      articleHtml = detailNode.html();
    } else {
      articleHtml = '<div style="padding:20px;text-align:center;">无法自动解析该文章格式，<a href="' + url + '">请尝试在浏览器打开</a></div>';
    }

    return {
      success: true,
      data: articleHtml
    };
  } catch (err) {
    console.error('抓取文章详情失败:', err);
    return {
      success: false,
      error: err.message
    }
  }
}
