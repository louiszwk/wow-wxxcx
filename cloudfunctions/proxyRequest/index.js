// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
exports.main = async (event, context) => {
  const { url, method = 'GET', data = {}, headers = {}, responseType = 'json' } = event
  try {
    const res = await axios({
      url,
      method,
      data,
      headers,
      responseType,
      timeout: 15000 // 增加超时时间
    })
    
    return {
      success: true,
      data: res.data,
      statusCode: res.status
    }
  } catch (err) {
    console.error('代理请求失败:', err)
    return {
      success: false,
      error: err.message,
      statusCode: err.response ? err.response.status : 500,
      data: err.response ? err.response.data : null
    }
  }
}
