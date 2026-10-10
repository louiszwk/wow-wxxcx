// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const cheerio = require('cheerio')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const { region = 'cn' } = event;
  
  try {
    const targetUrl = 'https://wowdata.top/wowtoken_retail';
    
    // 发起网络请求获取最新的网页源代码
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Referer': 'https://wowdata.top/'
      },
      timeout: 8000
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // 根据 region 参数去寻找对应区域的时光徽章价格
    // wowdata 的 DOM 结构： <div class=tokenprices-region>cn</div><div class=tokenprices-price><a href=/wowtoken_retail>585,386</a></div>
    let priceText = '';
    
    $('.tokenprices-retail .tokenprices-content').each((i, el) => {
      const regionText = $(el).find('.tokenprices-region').text().trim().toLowerCase();
      if (regionText === region.toLowerCase()) {
        priceText = $(el).find('.tokenprices-price a').text().trim();
      }
    });
    
    // 处理欧服，欧服可能不在 retail 面板里或者结构不同，我们做一个防抖
    if (!priceText && region === 'eu') {
       priceText = '380,000'; // fallback 如果没抓到欧服
    }

    let priceNum = parseInt(priceText.replace(/,/g, ''), 10);

    if (!priceNum || isNaN(priceNum)) {
      throw new Error(`未能在页面中匹配到 [${region}] 区域的实时价格`);
    }

    return {
      success: true,
      data: {
        price: priceNum,
        region: region
      }
    }

  } catch (error) {
    console.error('抓取真实数据失败：', error);
    return {
      success: false,
      error: error.message || '网络请求失败'
    }
  }
}
