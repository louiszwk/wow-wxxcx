// 云函数: 微信官方文本内容安全检测 (security.msgSecCheck)
// 无需在代码中维护敏感词库，完全依托微信官方大模型安全检测服务
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const { content } = event;
  const wxContext = cloud.getWXContext();

  const db = cloud.database();
  const _ = db.command;

  // 1. 自动初始化创建 mdt_routes 集合 (解决 DATABASE_COLLECTION_NOT_EXIST 错误)
  if (event && event.action === 'initMdtCollection') {
    try {
      await db.createCollection('mdt_routes');
      return { success: true, created: true, openid: wxContext.OPENID };
    } catch (err) {
      return { success: true, existed: true, openid: wxContext.OPENID };
    }
  }

  // 2. 支持直接获取当前调用者的真实 openid，并自动确保集合存在
  if (event && event.action === 'getOpenId') {
    try {
      await db.createCollection('mdt_routes');
    } catch (_) {}
    return {
      openid: wxContext.OPENID,
      unionid: wxContext.UNIONID,
      env: wxContext.ENV
    };
  }

  // 3. 点赞与浏览量自增 (云端 Admin 权限，天然规避只读权限限制)
  if (event && event.action === 'likeMdtRoute' && event.routeId) {
    try {
      await db.collection('mdt_routes').doc(event.routeId).update({
        data: { likes: _.inc(1) }
      });
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  if (event && event.action === 'incMdtView' && event.routeId) {
    try {
      await db.collection('mdt_routes').doc(event.routeId).update({
        data: { views: _.inc(1) }
      });
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  // 4. 删除路线 (云端 Admin 权限兜底，严格校验仅创建者可删)
  if (event && event.action === 'deleteMdtRoute' && event.routeId) {
    try {
      const doc = await db.collection('mdt_routes').doc(event.routeId).get();
      if (doc && doc.data && doc.data._openid && doc.data._openid === wxContext.OPENID) {
        await db.collection('mdt_routes').doc(event.routeId).remove();
        return { success: true };
      }
      return { success: false, error: '无权删除他人路线' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  if (!content || typeof content !== 'string') {
    return { pass: true, openid: wxContext.OPENID };
  }

  const cleanContent = content.trim().slice(0, 500);

  // 1. 调用微信官方推荐的 security.msgSecCheck v2 接口 (按场景与OpenID精准检测)
  try {
    const res = await cloud.openapi.security.msgSecCheck({
      openid: wxContext.OPENID || 'user',
      scene: 2, // 场景值 2: 论坛/社区/留言/许愿/发帖
      version: 2,
      content: cleanContent
    });

    // v2 返回格式: { errCode: 0, result: { suggest: 'pass' | 'review' | 'risky', label: 100, ... } }
    if (res.result && res.result.suggest) {
      if (res.result.suggest === 'risky') {
        return {
          pass: false,
          label: res.result.label,
          error: '许愿内容含有敏感或违规信息，未通过微信内容安全审核'
        };
      }
      return { pass: true };
    }

    if (res.errCode === 0) {
      return { pass: true };
    }
  } catch (errV2) {
    // 若命中微信官方 87014 违规码，直接判定不通过
    if (errV2.errCode === 87014 || (errV2.errMsg && errV2.errMsg.includes('risky'))) {
      return {
        pass: false,
        error: '许愿内容含有敏感或违规信息，未通过微信内容安全审核'
      };
    }

    // 2. 兼容性降级检测 (调用 v1 接口)
    try {
      const resV1 = await cloud.openapi.security.msgSecCheck({
        content: cleanContent
      });
      if (resV1.errCode === 0) {
        return { pass: true };
      }
    } catch (errV1) {
      if (errV1.errCode === 87014 || (errV1.errMsg && errV1.errMsg.includes('risky'))) {
        return {
          pass: false,
          error: '许愿内容含有敏感或违规信息，未通过微信内容安全审核'
        };
      }
      console.warn('微信内容安全接口调用异常:', errV1);
    }
  }

  return { pass: true };
};
