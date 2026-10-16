// 云函数: 微信官方安全文本内容检测 (msgSecCheck)
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const { content } = event;

  if (!content || typeof content !== 'string') {
    return { pass: true };
  }

  try {
    const res = await cloud.openapi.security.msgSecCheck({
      content: content.slice(0, 500)
    });

    if (res.errCode === 0) {
      return { pass: true };
    } else {
      return {
        pass: false,
        errCode: res.errCode,
        error: '内容包含敏感或违规信息'
      };
    }
  } catch (err) {
    console.warn('微信官方文本检测异常或拦截:', err);
    // 微信官方安全审核 87014 代表违规
    if (err.errCode === 87014 || (err.message && err.message.includes('risky content'))) {
      return {
        pass: false,
        errCode: 87014,
        error: '经微信官方安全检测，该内容含有违法违规信息，请调整后再试'
      };
    }
    // 其他错误（如接口权限、网络连接等），返回 fallback 允许客户端通过本地敏感词库兜底
    return {
      pass: true,
      fallback: true,
      warning: err.message
    };
  }
};
