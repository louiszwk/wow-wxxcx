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

  // 5. 保存或更新路线 (云端 Admin 权限，天然规避集合不存在与客户端写入权限限制)
  if (event && event.action === 'saveMdtRoute') {
    try {
      try {
        await db.createCollection('mdt_routes');
      } catch (_) {}

      const { routeId, isEdit, routeData } = event;
      if (isEdit && routeId) {
        // 修改路线前先校验是否为本人创建
        const oldDoc = await db.collection('mdt_routes').doc(routeId).get();
        if (oldDoc && oldDoc.data && oldDoc.data._openid && oldDoc.data._openid !== wxContext.OPENID) {
          return { success: false, error: '仅创建人可修改路线' };
        }
        await db.collection('mdt_routes').doc(routeId).update({
          data: {
            ...routeData,
            updateTime: Date.now()
          }
        });
        return { success: true, routeId };
      } else {
        const res = await db.collection('mdt_routes').add({
          data: {
            ...routeData,
            _openid: wxContext.OPENID,
            views: 1,
            likes: 0,
            createTime: Date.now(),
            updateTime: Date.now()
          }
        });
        return { success: true, routeId: res._id };
      }
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  // 6. 路线列表查询 (云端 Admin 权限，跨用户免鉴权读取公开路线)
  if (event && event.action === 'getMdtRoutes') {
    try {
      try {
        await db.createCollection('mdt_routes');
      } catch (_) {}

      const { dungeonAliases, levelRange, onlyMyRoutes } = event;
      const conditions = {};
      if (dungeonAliases && Array.isArray(dungeonAliases) && dungeonAliases.length > 0) {
        conditions.dungeon = _.in(dungeonAliases);
      }
      if (levelRange && levelRange !== '全部') {
        conditions.levelRange = levelRange;
      }
      if (onlyMyRoutes) {
        conditions._openid = wxContext.OPENID;
      }
      const res = await db.collection('mdt_routes')
        .where(conditions)
        .orderBy('createTime', 'desc')
        .limit(50)
        .get();
      return { success: true, data: res.data || [] };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  // 7. 单条路线详情 (云端 Admin 权限，跨用户免鉴权读取公开路线)
  if (event && event.action === 'getMdtRouteById' && event.routeId) {
    try {
      const res = await db.collection('mdt_routes').doc(event.routeId).get();
      return { success: true, data: res.data };
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
