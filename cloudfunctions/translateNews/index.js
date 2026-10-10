const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { texts = [] } = event;
  
  if (!texts || texts.length === 0) {
    return { success: true, data: [] };
  }

  try {
    const translatePromises = texts.map(async (text) => {
      try {
        const trUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|zh-CN`;
        const trRes = await axios.get(trUrl, { timeout: 5000 });
        if (trRes.data && trRes.data.responseData && trRes.data.responseData.translatedText) {
          return trRes.data.responseData.translatedText;
        }
      } catch (e) {
        console.warn('Translate error:', e.message);
      }
      return text; // 返回原文兜底
    });

    const translatedTexts = await Promise.all(translatePromises);
    
    return {
      success: true,
      data: translatedTexts
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}
