const allDungeonsData = require('./all_dungeons_data.js');
const mdtEnemiesDb = require('./mdt_enemies_db.js');

const CREATURE_TYPES_CN = {
  'Beast': '野兽',
  'Undead': '亡灵',
  'Aberration': '畸变',
  'Humanoid': '人型生物',
  'Elemental': '元素生物',
  'Mechanical': '机械',
  'Totem': '图腾',
  'Not specified': '未知生物',
  'Dragonkin': '龙类',
  'Demon': '恶魔'
};

const CHARACTERISTICS_CN = {
  'Taunt': '可嘲讽',
  'Stun': '可昏迷',
  'Silence': '可沉默/打断',
  'Incapacitate': '可瘫痪',
  'Disorient': '可致盲/迷惑',
  'Root': '可定身',
  'Slow': '可减速',
  'Fear': '可恐惧',
  'Knock': '可击退',
  'Grip': '可死握',
  'Mind Control': '可心控',
  'Sap': '可闷棍',
  'Polymorph': '可变形',
  'Imprison': '可禁锢',
  'Banish': '可放逐',
  'Hibernate': '可休眠',
  'Shackle Undead': '可束缚亡灵',
  'Sleep Walk': '可梦游',
  'Mind Soothe': '可安抚心灵',
  'Repentance': '可忏悔'
};

const DUNGEONS_LIST = [
  '毒牙祭坛',
  '虚空之痕竞技场',
  '夺目谷',
  '红玉新生法池',
  '谋杀街',
  '纳洛拉克之巢',
  '塞塔里斯神庙',
  '诸王之眠'
];

const DUNGEON_DATA_KEYS = {
  '毒牙祭坛': '尖牙祭坛',
  '尖牙祭坛': '尖牙祭坛',
  '虚空之痕竞技场': '虚空之痕竞技场',
  '夺目谷': '致盲谷',
  '致盲谷': '致盲谷',
  '红玉新生法池': '红玉新生法地',
  '红玉新生法地': '红玉新生法地',
  '谋杀街': '谋杀街 (Murder Row)',
  '谋杀街 (Murder Row)': '谋杀街 (Murder Row)',
  '纳洛拉克之巢': '纳洛拉克之巢',
  '塞塔里斯神庙': '塞塔里斯神庙',
  '诸王之眠': '诸王之眠'
};

const DUNGEON_FILES = {
  '毒牙祭坛': 'AltarOfFangs',
  '尖牙祭坛': 'AltarOfFangs',
  '虚空之痕竞技场': 'VoidscarArena',
  '夺目谷': 'TheBlindingVale',
  '致盲谷': 'TheBlindingVale',
  '红玉新生法池': 'RubyLifePools',
  '红玉新生法地': 'RubyLifePools',
  '谋杀街': 'MurderRow',
  '谋杀街 (Murder Row)': 'MurderRow',
  '纳洛拉克之巢': 'DenOfNalorakk',
  '塞塔里斯神庙': 'TempleOfSethraliss',
  '诸王之眠': 'KingsRest'
};

const PULL_COLORS = [
  '#ef4444', '#3b82f6', '#10b981', '#f59e0b',
  '#8b5cf6', '#ec4899', '#06b6d4', '#eab308',
  '#14b8a6', '#f43f5e', '#a855f7', '#6366f1',
  '#f97316', '#84cc16', '#22d3ee', '#fb923c',
  '#0284c7', '#d946ef', '#16a34a', '#ca8a04'
];

// --- 几何算法：凸包与外扩缓冲 ---
function crossProduct(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function convexHull(points) {
  if (points.length <= 2) return points.slice();
  const sorted = points.slice().sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));
  const lower = [];
  for (let i = 0; i < sorted.length; i++) {
    while (lower.length >= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], sorted[i]) <= 0) {
      lower.pop();
    }
    lower.push(sorted[i]);
  }
  const upper = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], sorted[i]) <= 0) {
      upper.pop();
    }
    upper.push(sorted[i]);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

function getPuffedHull(pts, radius = 14) {
  if (pts.length === 0) return [];
  if (pts.length === 1) {
    const p = pts[0], res = [], N = 12;
    for (let i = 0; i < N; i++) {
      const a = (i * Math.PI * 2) / N;
      res.push({ x: p.x + radius * Math.cos(a), y: p.y + radius * Math.sin(a) });
    }
    return res;
  }
  const circlePoints = [], N = 8;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    for (let j = 0; j < N; j++) {
      const a = (j * Math.PI * 2) / N;
      circlePoints.push({ x: p.x + radius * Math.cos(a), y: p.y + radius * Math.sin(a) });
    }
  }
  return convexHull(circlePoints);
}

function clusterEnemies(enemies, threshold = 42) {
  if (enemies.length <= 1) return [enemies];
  const adj = Array.from({ length: enemies.length }, () => []);
  for (let i = 0; i < enemies.length; i++) {
    for (let j = i + 1; j < enemies.length; j++) {
      const e1 = enemies[i], e2 = enemies[j];
      let connected = (e1.pack != null && e1.pack === e2.pack);
      if (!connected) {
        const dx = e1.px - e2.px, dy = e1.py - e2.py;
        connected = Math.sqrt(dx * dx + dy * dy) <= threshold;
      }
      if (connected) {
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }
  const visited = new Set(), clusters = [];
  for (let i = 0; i < enemies.length; i++) {
    if (visited.has(i)) continue;
    const cluster = [], queue = [i];
    visited.add(i);
    while (queue.length > 0) {
      const curr = queue.shift();
      cluster.push(enemies[curr]);
      for (const nb of adj[curr]) {
        if (!visited.has(nb)) {
          visited.add(nb);
          queue.push(nb);
        }
      }
    }
    clusters.push(cluster);
  }
  return clusters;
}

function hexToRgba(hex, alpha) {
  let c = (hex || '#ef4444').replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const r = parseInt(c.substring(0, 2), 16) || 0;
  const g = parseInt(c.substring(2, 4), 16) || 0;
  const b = parseInt(c.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

Page({
  data: {
    menuButtonTop: 44,
    menuButtonHeight: 32,
    navBarHeight: 88,
    mapWidth: 1200,
    mapHeight: 800,

    dungeonNames: DUNGEONS_LIST,
    currentDungeonName: '毒牙祭坛',
    mapImage: '/pages/mdt/images/maps/AltarOfFangs.jpg',
    showDungeonModal: false,

    // 路线模式与权限
    mode: 'create', // create: 创建, edit: 修改(仅限创建人), view: 浏览
    interactiveMode: 'plan', // 'plan': 规划路线, 'preview': 技能预览模式
    inspectedEnemyId: null,  // 正在查看技能的怪物 ID
    showEnemyModal: false,   // 是否显示怪物技能图鉴弹窗
    inspectedEnemy: null,    // 怪物详情与全技能数据
    routeId: '',
    editingRouteId: '',
    isAuthor: false,
    currentOpenId: '',
    userNickname: '',

    // 难度层级选项
    levelRangeOptions: ['全部', '2-10层', '10-15层', '15层以上'],
    saveRouteLevelRange: '全部',

    // 缩放控制
    scaleMin: 0.3,
    scaleValue: 0.35,
    scalePercent: 35,

    // 进度
    currentForces: 0,
    totalForces: 551,
    percent: '0.00',

    // 悬浮提示
    selectedEnemyInfo: null,

    // 波次数据
    pulls: [{ color: '#ef4444', enemyIds: [], forces: 0, percent: '0.0', note: '' }],
    activePullIndex: 0,
    activePullScrollId: 'pull-item-0',

    // 路线管理
    showRouteManager: false,
    savedRoutes: [],
    showSaveModal: false,
    saveRouteName: '',
    saveRouteRemark: '',

    // 地图位移控制与居中
    mapX: 0,
    mapY: 0,
    mapAnimation: true,

    // 地图加载状态
    mapLoading: true
  },

  // ===== 纯内存状态（不走 setData，避免昂贵的视图层序列化） =====
  _enemies: [],         // 怪物原始数据列表
  _enemyMap: {},         // id → index 快速哈希索引
  _enemyState: {},       // id → { selected, color, pullNumber }
  _pullBadges: [],       // 内存中各波次徽章坐标，用于 Canvas 绘制与快速命中检测
  _portraitImages: {},   // 怪物头像图片对象缓存
  _drawPending: false,   // Canvas rAF 节流锁
  _touchStartInfo: null, // 触摸开始记录，用于区分轻触与地图拖拽
  _currentMapX: 0,       // 当前地图实时的 X 偏移
  _currentMapY: 0,       // 当前地图实时的 Y 偏移
  _containerWidth: 0,    // 地图主视窗容器真实宽度
  _containerHeight: 0,   // 地图主视窗容器真实高度
  _rawLoadedRoute: null, // 缓存当前载入的路线原始对象，用于鉴权校验

  onLoad(options) {
    const app = getApp();
    if (app && app.globalData) {
      this.setData({
        menuButtonTop: app.globalData.menuButtonTop || 44,
        menuButtonHeight: app.globalData.menuButtonHeight || 32,
        navBarHeight: app.globalData.navBarHeight || 88
      });
    }
    const sys = (wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync());
    const winWidth = sys.windowWidth || 390;
    this.fitScale = parseFloat(Math.max(0.25, Math.min(1.0, winWidth / 1200)).toFixed(2));
    this.currentScale = this.fitScale;
    this.setData({
      scaleMin: this.fitScale,
      scaleValue: this.fitScale,
      scalePercent: Math.round(this.fitScale * 100)
    });

    // 身份信息在路线加载完成后统一初始化（见下方 _initUserIdentity 回调），避免竞态

    // 1. 严格解析目标副本名称（全面兼容 options.dungeon、options.d 索引等传参形式）
    let targetDungeon = '';
    if (options && options.dungeon) {
      targetDungeon = decodeURIComponent(options.dungeon);
    } else if (options && options.d !== undefined) {
      const dIdx = parseInt(options.d, 10);
      if (!isNaN(dIdx) && dIdx >= 0 && dIdx < DUNGEONS_LIST.length) {
        targetDungeon = DUNGEONS_LIST[dIdx];
      }
    }
    if (!targetDungeon) {
      targetDungeon = '毒牙祭坛';
    }

    // 2. 解析模式与路线 ID（如果是通过分享链接带路线编码 p 或云端 id 进入，默认进入 view 预览模式）
    const routeId = options ? (options.id || '') : '';
    let mode = options ? (options.mode || '') : '';
    if (!mode) {
      mode = (routeId || (options && options.p)) ? 'view' : 'create';
    }

    // 3. 处理分享进入的波次与路线编码
    if (options && options.p) {
      this._pendingShare = {
        pulls: options.p,
        name: options.n ? decodeURIComponent(options.n) : '',
        remark: options.r ? decodeURIComponent(options.r) : ''
      };
    }

    const saveRouteName = (options && options.n) ? decodeURIComponent(options.n) : '';
    const saveRouteRemark = (options && options.r) ? decodeURIComponent(options.r) : '';

    this.setData({
      mode,
      routeId,
      interactiveMode: mode === 'view' ? 'preview' : 'plan',
      currentDungeonName: targetDungeon,
      ...(saveRouteName ? { saveRouteName } : {}),
      ...(saveRouteRemark ? { saveRouteRemark } : {})
    });

    // 先拿到 openid 再加载云端路线；否则 _applyLoadedRoute 判定 isAuthor 时身份尚未就绪，
    // 会把创建人误降级为只读且无法恢复
    this._initUserIdentity(() => {
      if (routeId) {
        this.loadRouteFromCloud(routeId, mode);
      } else {
        // 加载指定副本（若有 pendingShare 会在此处自动解码载入）
        this.loadDungeon(targetDungeon);
      }
    });
  },

  _initUserIdentity(callback) {
    let openid = wx.getStorageSync('user_openid') || '';
    const nickname = wx.getStorageSync('user_nickname') || '';
    let called = false;
    const done = (id) => {
      if (called) return;
      called = true;
      if (callback) callback(id);
    };

    if (openid) {
      this.setData({ currentOpenId: openid, userNickname: nickname });
      if (this._rawLoadedRoute) {
        const isAuthor = Boolean(this._rawLoadedRoute._openid && this._rawLoadedRoute._openid === openid);
        this.setData({ isAuthor });
      }
      done(openid);
      return;
    }

    // 云函数不可用/超时也要放行，否则路线会永远加载不出来
    const timer = setTimeout(() => done(''), 1500);
    try {
      wx.cloud.callFunction({
        name: 'checkWishContent',
        data: { action: 'getOpenId' },
        success: (res) => {
          clearTimeout(timer);
          if (res.result && res.result.openid) {
            openid = res.result.openid;
            wx.setStorageSync('user_openid', openid);
            const isAuthor = Boolean(this._rawLoadedRoute && this._rawLoadedRoute._openid && this._rawLoadedRoute._openid === openid);
            this.setData({
              currentOpenId: openid,
              ...(this._rawLoadedRoute ? { isAuthor } : {})
            });
          }
          done(openid);
        },
        fail: (err) => {
          clearTimeout(timer);
          console.warn('获取 openid 失败:', err);
          done('');
        }
      });
    } catch (e) {
      clearTimeout(timer);
      console.warn('获取 openid 失败:', e);
      done('');
    }
  },

  // 从云数据库真实加载路线数据
  loadRouteFromCloud(routeId, requestedMode) {
    this.setData({ mapLoading: true });
    wx.showLoading({ title: '加载路线中...' });

    let db;
    try {
      db = wx.cloud.database();
    } catch (e) {
      wx.hideLoading();
      wx.showToast({ title: '云开发未初始化', icon: 'none' });
      return;
    }

    if (db) {
      db.collection('mdt_routes').doc(routeId).get().then(res => {
        wx.hideLoading();
        this._applyLoadedRoute(res.data, requestedMode, routeId);
      }).catch(err => {
        console.warn('客户端直查路线失败，尝试云函数 Admin 模式拉取:', err);
        this._loadRouteFromCloudFunction(routeId, requestedMode);
      });
    } else {
      this._loadRouteFromCloudFunction(routeId, requestedMode);
    }
  },

  _loadRouteFromCloudFunction(routeId, requestedMode) {
    wx.cloud.callFunction({
      name: 'checkWishContent',
      data: { action: 'getMdtRouteById', routeId }
    }).then(cfRes => {
      wx.hideLoading();
      if (cfRes && cfRes.result && cfRes.result.success && cfRes.result.data) {
        this._applyLoadedRoute(cfRes.result.data, requestedMode, routeId);
      } else {
        if (this._pendingShare) {
          wx.showToast({ title: '已从分享链接恢复路线', icon: 'none' });
          this.loadDungeon(this.data.currentDungeonName);
        } else {
          wx.showToast({ title: '获取路线失败', icon: 'none' });
        }
      }
    }).catch(cfErr => {
      wx.hideLoading();
      console.error('云函数获取路线失败:', cfErr);
      if (this._pendingShare) {
        wx.showToast({ title: '已从分享链接恢复路线', icon: 'none' });
        this.loadDungeon(this.data.currentDungeonName);
      } else {
        wx.showToast({ title: '获取路线失败', icon: 'none' });
      }
    });
  },

  _applyLoadedRoute(route, requestedMode, routeId) {
    if (!route) {
      wx.showToast({ title: '路线不存在或已删除', icon: 'none' });
      return;
    }
    this._rawLoadedRoute = route;

    const currentOpenId = this.data.currentOpenId || wx.getStorageSync('user_openid') || '';
    const isAuthor = Boolean(currentOpenId && route._openid && currentOpenId === route._openid);

    let effectiveMode = requestedMode;
    // 需求3：必须创建人在列表里点击修改才能进行修改；若非创建人强行修改，则降级为浏览模式
    if (effectiveMode === 'edit' && !isAuthor) {
      effectiveMode = 'view';
      wx.showModal({
        title: '权限提示',
        content: '只有路线创建人才能修改此路线。当前已为您切换至浏览模式。',
        showCancel: false,
        confirmColor: '#2563eb'
      });
    }

    const dungeonName = route.dungeon || this.data.currentDungeonName;
    this.setData({
      mode: effectiveMode,
      interactiveMode: effectiveMode === 'view' ? 'preview' : 'plan',
      editingRouteId: (isAuthor && effectiveMode === 'edit') ? (route._id || routeId) : '',
      isAuthor,
      routeId: route._id || routeId,
      saveRouteName: route.name || '',
      saveRouteRemark: route.remark || '',
      saveRouteLevelRange: route.levelRange || '全部',
      currentDungeonName: dungeonName
    });

    // 加载副本底图与波次数据
    this.loadDungeon(dungeonName, route.pulls);

    // 累加浏览数 (自增1)
    try {
      const db = wx.cloud.database();
      const _ = db.command;
      db.collection('mdt_routes').doc(route._id || routeId).update({
        data: { views: _.inc(1) }
      }).catch(() => {
        wx.cloud.callFunction({
          name: 'checkWishContent',
          data: { action: 'incMdtView', routeId: route._id || routeId }
        }).catch(() => {});
      });
    } catch (_) {
      wx.cloud.callFunction({
        name: 'checkWishContent',
        data: { action: 'incMdtView', routeId: route._id || routeId }
      }).catch(() => {});
    }
  },

  onReady() {
    this.initCanvas();
    const query = this.createSelectorQuery();
    query.select('.map-container').boundingClientRect((rect) => {
      if (rect) {
        this._containerWidth = rect.width;
        this._containerHeight = rect.height;
      }
    }).exec();
  },

  // 需求1：仅创建人有“编辑”按钮，在查看模式下点击即可直接切换进入编辑模式
  enterEditMode() {
    if (!this.data.isAuthor) {
      wx.showToast({ title: '仅创建人可编辑', icon: 'none' });
      return;
    }
    const editId = this.data.routeId || this.data.editingRouteId || '';
    this.setData({
      mode: 'edit',
      interactiveMode: 'plan',
      editingRouteId: editId
    });
    wx.showToast({ title: '已进入编辑模式', icon: 'none' });
    this.scheduleRedraw();
  },

  navigateBack() {
    const pages = getCurrentPages();
    if (pages && pages.length > 1) {
      wx.navigateBack({ delta: 1 });
    } else {
      wx.redirectTo({
        url: `/pages/mdt/list?dungeon=${encodeURIComponent(this.data.currentDungeonName)}`,
        fail: () => {
          wx.reLaunch({ url: '/pages/index/index' });
        }
      });
    }
  },

  // ===== 副本切换 =====
  openDungeonModal() {
    if (this.data.mode === 'edit' || this.data.mode === 'view') {
      return; // 编辑或查看模式下锁定当前副本
    }
    this.setData({ showDungeonModal: true });
  },
  closeDungeonModal() {
    this.setData({ showDungeonModal: false });
  },
  stopPropagation() {},

  onSelectDungeon(e) {
    const name = e.currentTarget.dataset.name;
    this.closeDungeonModal();
    if (name && name !== this.data.currentDungeonName) {
      this.setData({ mapLoading: true });
      setTimeout(() => this.loadDungeon(name), 60);
    }
  },

  loadDungeon(name, presetPulls = null) {
    const dataKey = DUNGEON_DATA_KEYS[name] || name;
    const data = allDungeonsData[dataKey];
    if (!data) {
      wx.showToast({ title: '副本数据缺失', icon: 'none' });
      return;
    }
    const file = DUNGEON_FILES[name] || DUNGEON_FILES[dataKey];
    if (!file) {
      wx.showToast({ title: '地图文件缺失', icon: 'none' });
      return;
    }

    // 1. 内存中构建怪物索引
    this._enemies = JSON.parse(JSON.stringify(data.enemies));
    this._enemyMap = {};
    this._enemyState = {};
    this._enemies.forEach((e, idx) => {
      this._enemyMap[e.id] = idx;
      this._enemyState[e.id] = { selected: false, color: '', pullNumber: null };
    });

    // 2. 波次装载逻辑：浏览与已保存路线直接展示，不读本地草稿缓存；仅新建时才检查未保存草稿
    let initialPulls = [{ color: PULL_COLORS[0], enemyIds: [], forces: 0, percent: '0.0', note: '' }];
    let shareMeta = null;

    if (presetPulls && presetPulls.length > 0) {
      // 浏览或修改已保存路线：严格按已保存数据加载，绝不读取本地草稿！
      initialPulls = presetPulls.map((p, i) => ({
        color: p.color || PULL_COLORS[i % PULL_COLORS.length],
        enemyIds: (p.enemyIds || []).slice(),
        forces: 0,
        percent: '0.0',
        note: p.note || ''
      }));
    } else if (this._pendingShare) {
      // 从分享链接解码
      const decoded = this._decodeSharedRoute(this._pendingShare.pulls);
      if (decoded && decoded.length > 0) {
        initialPulls = decoded;
      }
      shareMeta = {
        name: this._pendingShare.name,
        remark: this._pendingShare.remark
      };
      this._pendingShare = null;
    } else {
      // 只有新建路线且未保存时，才尝试读取本地未保存的临时草稿
      try {
        const draftKey = 'mdt_draft_' + name;
        const draft = wx.getStorageSync(draftKey);
        if (draft && draft.pulls && draft.pulls.length > 0) {
          initialPulls = draft.pulls.map((sp, i) => ({
            color: sp.color || PULL_COLORS[i % PULL_COLORS.length],
            enemyIds: (sp.enemyIds || []).slice(),
            forces: 0,
            percent: '0.0',
            note: sp.note || ''
          }));
        }
      } catch (e) {
        console.warn('读取本地草稿失败', e);
      }
    }

    // 加载已保存路线列表
    let savedRoutes = [];
    try {
      savedRoutes = wx.getStorageSync('mdt_saved_routes_' + name) || [];
    } catch (e) {}

    const initialScale = this.fitScale || 0.35;
    this.currentScale = initialScale;
    this._currentMapX = 0;
    this._currentMapY = 0;

    const nextState = {
      currentDungeonName: name,
      mapImage: `/pages/mdt/images/maps/${file}.jpg`,
      totalForces: data.totalForces,
      pulls: initialPulls,
      activePullIndex: 0,
      activePullScrollId: 'pull-item-0',
      currentForces: 0,
      percent: '0.00',
      selectedEnemyInfo: null,
      inspectedEnemyId: null,
      showEnemyModal: false,
      inspectedEnemy: null,
      scaleMin: this.fitScale || 0.3,
      scaleValue: initialScale,
      scalePercent: Math.round(initialScale * 100),
      mapX: 0,
      mapY: 0,
      mapAnimation: false,
      savedRoutes,
      showRouteManager: false,
      mapLoading: false
    };

    if (shareMeta) {
      if (shareMeta.name) nextState.saveRouteName = shareMeta.name;
      if (shareMeta.remark) nextState.saveRouteRemark = shareMeta.remark;
    }

    this.setData(nextState);

    this._recalcForces(initialPulls);
    this._preloadDungeonPortraits();
    this.scheduleRedraw();
  },

  onMapImageLoad() {
    this.setData({ mapLoading: false });
    this.scheduleRedraw();
  },

  // ===== Canvas 初始化与 Retina 渲染 =====
  initCanvas() {
    const query = this.createSelectorQuery();
    query.select('#routeCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0]) return;
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const sys = (wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync());
        // 限制最大 DPR 为 2，保证视网膜级别超清同时防止占用过高显存导致低端机掉帧
        const dpr = Math.min(2, sys.pixelRatio || 2);
        canvas.width = this.data.mapWidth * dpr;
        canvas.height = this.data.mapHeight * dpr;
        ctx.scale(dpr, dpr);
        this.canvasCtx = ctx;
        this.canvasNode = canvas;
        this._portraitImages = {};
        this._preloadDungeonPortraits();
        this.scheduleRedraw();
      });
  },

  // requestAnimationFrame 节流重绘，一帧最多重绘一次
  scheduleRedraw() {
    if (this._drawPending) return;
    this._drawPending = true;
    if (this.canvasNode && this.canvasNode.requestAnimationFrame) {
      this.canvasNode.requestAnimationFrame(() => {
        this._drawPending = false;
        this.drawAll();
      });
    } else {
      setTimeout(() => {
        this._drawPending = false;
        this.drawAll();
      }, 16);
    }
  },

  // ===== 核心 Canvas 渲染：包围框 + 连接线 + 怪物点 + 波次数字徽章 =====
  drawAll() {
    if (!this.canvasCtx) return;
    const ctx = this.canvasCtx;
    const W = this.data.mapWidth, H = this.data.mapHeight;
    ctx.clearRect(0, 0, W, H);

    const pulls = this.data.pulls || [];
    const enemies = this._enemies;
    const state = this._enemyState;
    const activeIdx = this.data.activePullIndex;

    const activeCentroids = [];
    const badges = [];

    // --- 1. 绘制波次包围框与收集徽章坐标 ---
    for (let i = 0; i < pulls.length; i++) {
      const p = pulls[i];
      if (!p.enemyIds || p.enemyIds.length === 0) continue;

      const pEnemies = [];
      let sumX = 0, sumY = 0;
      for (const eid of p.enemyIds) {
        const idx = this._enemyMap[eid];
        if (idx === undefined) continue;
        const e = enemies[idx];
        const px = e.x * W, py = e.y * H;
        pEnemies.push({ ...e, px, py });
        sumX += px;
        sumY += py;
      }
      if (pEnemies.length === 0) continue;

      const isActive = (activeIdx === i);
      const pts = pEnemies.map(e => ({ x: e.px, y: e.py }));

      // 计算该波次所有怪物的中心位置与包围范围
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const pt of pts) {
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
      }
      const cx = Math.round((minX + maxX) / 2);
      const cy = Math.round((minY + maxY) / 2);

      // 绘制同波次怪物的包围轮廓（整波怪一起框起来）
      ctx.save();
      if (pts.length === 1) {
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 22, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? hexToRgba(p.color, 0.32) : hexToRgba(p.color, 0.15);
        ctx.fill();
        ctx.strokeStyle = p.color;
        ctx.lineWidth = isActive ? 2.8 : 1.8;
        if (isActive) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
        }
        ctx.stroke();
      } else {
        const hull = getPuffedHull(pts, 20);
        if (hull.length >= 3) {
          ctx.beginPath();
          ctx.moveTo(hull[0].x, hull[0].y);
          for (let k = 1; k < hull.length; k++) {
            ctx.lineTo(hull[k].x, hull[k].y);
          }
          ctx.closePath();
          ctx.fillStyle = isActive ? hexToRgba(p.color, 0.32) : hexToRgba(p.color, 0.15);
          ctx.fill();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = isActive ? 2.8 : 1.8;
          if (isActive) {
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
          }
          ctx.stroke();
        }
      }
      ctx.restore();

      // 框中间显示波次的数字
      let badgeX = cx;
      let badgeY = cy;
      if (pts.length === 1) {
        // 单怪时数字徽章放在框上方，避免遮挡怪物首领皇冠/图标
        badgeY = Math.round(pts[0].y - 20);
      }

      badges.push({
        pullIndex: i,
        pullNum: i + 1,
        x: badgeX,
        y: badgeY,
        color: p.color,
        isActive
      });

      activeCentroids.push({ x: badgeX, y: badgeY });
    }

    this._pullBadges = badges;

    // --- 2. 绘制行进方向虚线与箭头 ---
    if (activeCentroids.length >= 2) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 2.4;
      ctx.setLineDash([7, 5]);
      for (let i = 0; i < activeCentroids.length; i++) {
        const c = activeCentroids[i];
        if (i === 0) ctx.moveTo(c.x, c.y);
        else ctx.lineTo(c.x, c.y);
      }
      ctx.stroke();

      // 绘制沿路径方向箭头
      for (let i = 1; i < activeCentroids.length; i++) {
        const from = activeCentroids[i - 1], to = activeCentroids[i];
        const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        const arrowLen = 9;
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.moveTo(mx - arrowLen * Math.cos(angle - 0.5), my - arrowLen * Math.sin(angle - 0.5));
        ctx.lineTo(mx, my);
        ctx.lineTo(mx - arrowLen * Math.cos(angle + 0.5), my - arrowLen * Math.sin(angle + 0.5));
        ctx.stroke();
      }
      ctx.restore();
    }

    // --- 3. 绘制所有怪物头像（圆形头像剪裁 + 波次光环 + 首领金框皇冠 + 预览高亮） ---
    const inspectedId = this.data.inspectedEnemyId;
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i];
      const s = state[e.id] || {};
      const px = e.x * W, py = e.y * H;
      const isSelected = s.selected;
      const isCurrentActive = isSelected && (s.pullNumber === activeIdx + 1);
      const isInspected = (inspectedId === e.id);
      const color = s.color || '#64748b';

      const isBoss = Boolean(e.isBoss);
      // 优化头像尺寸：首领 Boss 半径 13.5px，普通怪半径 9.5px（更紧凑精致，避免小怪密集时遮挡与重叠）
      const baseRadius = isBoss ? 13.5 : 9.5;
      const radius = isCurrentActive ? (baseRadius + 2) : (isInspected ? (baseRadius + 1.8) : (isSelected ? (baseRadius + 0.8) : baseRadius));

      ctx.save();

      // A. 当前活跃波次怪物 / 正在预览的怪物：底部外发光光环
      if (isCurrentActive || isInspected) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, radius + 2.8, 0, Math.PI * 2);
        ctx.fillStyle = isInspected ? 'rgba(56, 189, 248, 0.45)' : hexToRgba(color, 0.45);
        ctx.shadowColor = isInspected ? '#38bdf8' : (color || '#ffffff');
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // B. 圆形遮罩剪裁，绘制怪物头像图片
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.clip();

      const img = this._getPortraitImage(e.npcId);
      if (img && img._loaded) {
        ctx.drawImage(img, px - radius, py - radius, radius * 2, radius * 2);
      } else {
        // 头像未加载完成或缺失时的优雅兜底
        ctx.fillStyle = isSelected ? color : (isBoss ? '#4c1d95' : '#1e293b');
        ctx.fill();
        ctx.fillStyle = '#f8fafc';
        ctx.font = `bold ${Math.round(radius * 0.9)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(isBoss ? '👑' : (e.name ? e.name[0] : '●'), px, py);
      }
      ctx.restore();

      // C. 头像边框线与皇冠
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      if (isBoss) {
        // Boss 首领：金色高贵边框
        ctx.strokeStyle = isInspected ? '#38bdf8' : (isCurrentActive ? '#fef08a' : (isSelected ? color : '#f59e0b'));
        ctx.lineWidth = (isCurrentActive || isInspected) ? 2.8 : (isSelected ? 2.2 : 1.8);
        ctx.stroke();

        // Boss 顶部金冠徽章
        ctx.font = `${Math.round(radius * 0.95)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('👑', px, py - radius + 3.5);
      } else {
        // 普通小怪：已选中按波次颜色高亮，当前活跃波次亮白强化，未选怪为暗黑金属框
        ctx.strokeStyle = isInspected ? '#38bdf8' : (isCurrentActive ? '#ffffff' : (isSelected ? color : 'rgba(15, 23, 42, 0.95)'));
        ctx.lineWidth = (isCurrentActive || isInspected) ? 2.2 : (isSelected ? 1.8 : 1.2);
        if (isCurrentActive) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 5;
        } else if (isInspected) {
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 7;
        }
        ctx.stroke();
      }

      ctx.restore();
    }

    // --- 4. 绘制各波次中心数字徽章（在 Canvas 上直接绘制，零 DOM 延迟） ---
    for (const b of badges) {
      ctx.save();
      const radius = b.isActive ? 11 : 9;
      ctx.beginPath();
      ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
      ctx.lineWidth = b.isActive ? 2.2 : 1.6;
      ctx.strokeStyle = '#ffffff';
      if (b.isActive) {
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 10;
      } else {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 3;
      }
      ctx.stroke();

      // 数字
      ctx.font = `bold ${b.isActive ? 9.5 : 8}px sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(b.pullNum), b.x, b.y);
      ctx.restore();
    }
  },

  // ===== 区分拖拽与轻触（彻底解决拖动地图误触发选怪问题） =====
  onCanvasTouchStart(e) {
    this._longPressed = false;
    const t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
    if (t) {
      this._touchStartInfo = {
        x: t.clientX !== undefined ? t.clientX : (t.x !== undefined ? t.x : 0),
        y: t.clientY !== undefined ? t.clientY : (t.y !== undefined ? t.y : 0),
        time: Date.now()
      };
    }
  },

  onCanvasTap(e) {
    if (this._longPressed) {
      this._longPressed = false;
      return;
    }

    const t = (e.detail && e.detail.x !== undefined) ? e.detail : ((e.changedTouches && e.changedTouches[0]) || (e.touches && e.touches[0]) || this._touchStartInfo || {});
    const clientX = t.clientX !== undefined ? t.clientX : (t.x !== undefined ? t.x : 0);
    const clientY = t.clientY !== undefined ? t.clientY : (t.y !== undefined ? t.y : 0);

    // 检查触摸移动距离和耗时，防止拖动地图结束时误判定为点击
    if (this._touchStartInfo) {
      const dx = clientX - this._touchStartInfo.x;
      const dy = clientY - this._touchStartInfo.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const elapsed = Date.now() - this._touchStartInfo.time;
      // 移动超过 8px 或按住超过 350ms，判定为地图平移/缩放操作，不触发选怪
      if (dist > 8 || elapsed > 350) {
        return;
      }
    }

    const query = this.createSelectorQuery();
    query.select('#routeCanvas').boundingClientRect((rect) => {
      if (!rect) return;

      const W = this.data.mapWidth, H = this.data.mapHeight;
      // 精确换算到 Canvas 逻辑像素坐标
      const cx = ((clientX - rect.left) / rect.width) * W;
      const cy = ((clientY - rect.top) / rect.height) * H;
      const renderScale = rect.width / W;

      // 1. 优先怪物命中检测（结合精细头像尺寸，给予手指 22px 宽容范围，小屏幕点怪精准丝滑）
      const hitRadius = 22 / renderScale;
      let bestDist = Infinity, bestEnemy = null;

      for (const en of this._enemies) {
        const px = en.x * W, py = en.y * H;
        const dx = px - cx, dy = py - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < hitRadius && dist < bestDist) {
          bestDist = dist;
          bestEnemy = en;
        }
      }

      if (bestEnemy) {
        if (this.data.interactiveMode === 'preview' || this.data.mode === 'view') {
          this.inspectEnemy(bestEnemy.id);
        } else {
          this.handleToggleEnemy(bestEnemy.id);
        }
        return;
      }

      // 2. 如果未命中怪物，检测是否点击了波次数字徽章（点击徽章快速切换活跃波次，受控保留坐标不弹回左上角）
      for (const b of (this._pullBadges || [])) {
        const dx = b.x - cx, dy = b.y - cy;
        const bDist = Math.sqrt(dx * dx + dy * dy);
        if (bDist <= 20 / renderScale) {
          this.setData({
            activePullIndex: b.pullIndex,
            activePullScrollId: `pull-item-${b.pullIndex}`,
            mapX: this._currentMapX,
            mapY: this._currentMapY,
            mapAnimation: false
          });
          this.scheduleRedraw();
          return;
        }
      }
    }).exec();
  },

  // ===== 怪物选择与波次联动逻辑 =====
  handleToggleEnemy(id) {
    if (this.data.mode === 'view') {
      this.inspectEnemy(id);
      return;
    }
    const idx = this._enemyMap[id];
    if (idx === undefined) return;
    const target = this._enemies[idx];
    let pulls = this.data.pulls;
    const activeIdx = this.data.activePullIndex;

    // 联动同组怪群 (Pack)
    let packIds = [id];
    if (target.pack != null) {
      packIds = this._enemies.filter(e => e.pack === target.pack).map(e => e.id);
    }

    // 检查是否已经在某个波次中
    let existingPullIdx = -1;
    for (let i = 0; i < pulls.length; i++) {
      if (pulls[i].enemyIds.includes(id)) {
        existingPullIdx = i;
        break;
      }
    }

    let isSelectedNow = false;
    let actionDesc = '';

    if (existingPullIdx !== -1) {
      // 需求1：再次点击已选怪，直接取消选择！
      pulls[existingPullIdx].enemyIds = pulls[existingPullIdx].enemyIds.filter(eid => !packIds.includes(eid));
      isSelectedNow = false;
      actionDesc = `已取消选择 (移出第 ${existingPullIdx + 1} 波)`;
    } else {
      // 未选状态 -> 加入当前活跃波次
      for (const eid of packIds) {
        if (!pulls[activeIdx].enemyIds.includes(eid)) {
          pulls[activeIdx].enemyIds.push(eid);
        }
      }
      isSelectedNow = true;
      actionDesc = `已标记为第 ${activeIdx + 1} 波`;
    }

    // 需求2：彻底去掉震动反馈和每次点击地图弹一下的 HUD 反馈，保持画布平稳丝滑
    this._recalcForces(pulls);

    this.setData({
      pulls,
      selectedEnemyInfo: null,
      mapX: this._currentMapX,
      mapY: this._currentMapY,
      mapAnimation: false
    });

    this._saveRoute();
    this.scheduleRedraw();
  },

  // ===== 进度计算（纯内存处理，仅同步必要数值到视图） =====
  _recalcForces(pulls) {
    let current = 0;

    Object.keys(this._enemyState).forEach(id => {
      this._enemyState[id] = { selected: false, color: '', pullNumber: null };
    });

    for (let pIdx = 0; pIdx < pulls.length; pIdx++) {
      const p = pulls[pIdx];
      let pForce = 0;
      for (const eid of p.enemyIds) {
        const idx = this._enemyMap[eid];
        if (idx === undefined) continue;
        const e = this._enemies[idx];
        pForce += e.forces;
        this._enemyState[eid] = { selected: true, color: p.color, pullNumber: pIdx + 1 };
      }
      p.forces = pForce;
      p.percent = ((pForce / this.data.totalForces) * 100).toFixed(1);
      current += pForce;
    }

    const percent = ((current / this.data.totalForces) * 100).toFixed(2);
    this.setData({ currentForces: current, percent });
  },

  // ===== 本地临时草稿缓存（仅在编辑未保存时缓存；浏览已保存路线绝不缓存） =====
  _saveRoute() {
    // 1. 用户要求：浏览已经保存的路线是不会缓存的！
    if (this.data.mode === 'view') {
      return;
    }

    // 2. 只有在编辑/新建且尚未保存到数据库时，才记录本地未保存临时草稿
    try {
      const name = this.data.currentDungeonName;
      const pulls = this.data.pulls;
      const draftKey = 'mdt_draft_' + name;
      const hasContent = pulls.some(p => p.enemyIds && p.enemyIds.length > 0);

      if (!hasContent) {
        wx.removeStorageSync(draftKey);
        return;
      }

      const draftData = {
        dungeonName: name,
        pulls: pulls.map(p => ({
          color: p.color,
          enemyIds: (p.enemyIds || []).slice(),
          note: p.note || ''
        })),
        savedAt: Date.now()
      };
      wx.setStorageSync(draftKey, draftData);
    } catch (e) {
      console.warn('缓存草稿失败', e);
    }
  },

  // ===== 波次备注功能（玩家喜爱的战术提醒） =====
  editActivePullNote() {
    if (this.data.mode === 'view') {
      wx.showToast({ title: '查看模式下不可修改备注', icon: 'none' });
      return;
    }
    const pulls = this.data.pulls;
    const activeIdx = this.data.activePullIndex;
    const curNote = pulls[activeIdx] ? (pulls[activeIdx].note || '') : '';

    wx.showModal({
      title: `编辑第 ${activeIdx + 1} 波战术备注`,
      editable: true,
      placeholderText: '例如: 起手嗜血 / 打断通灵法师 / 盗贼闷棍跳怪',
      content: curNote,
      confirmText: '保存',
      confirmColor: '#38bdf8',
      success: (res) => {
        if (res.confirm) {
          const newNote = (res.content || '').trim();
          pulls[activeIdx].note = newNote;
          this.setData({ pulls });
          this._saveRoute();
          wx.showToast({ title: newNote ? '备注已更新' : '已清除备注', icon: 'none', duration: 1000 });
        }
      }
    });
  },

  // ===== 缩放与自适应 =====
  onMouseWheel(e) {
    const delta = (e.detail && e.detail.deltaY !== undefined)
      ? e.detail.deltaY
      : (e.deltaY !== undefined ? e.deltaY : (e.detail && e.detail.wheelDelta ? -e.detail.wheelDelta : 0));
    if (!delta) return;
    let cur = this.currentScale || this.data.scaleValue || 0.35;
    let next = delta < 0 ? cur * 1.15 : cur / 1.15;
    const minScale = this.data.scaleMin || this.fitScale || 0.3;
    next = Math.max(minScale, Math.min(4.0, parseFloat(next.toFixed(2))));
    this.currentScale = next;
    this.setData({ scaleValue: next, scalePercent: Math.round(next * 100) });
  },

  // 追踪用户拖拽地图位置，杜绝 setData 时由于没有受控坐标被基础库弹回左上角 (0, 0)
  onMapMove(e) {
    if (e.detail && (e.detail.source === 'touch' || e.detail.source === 'touch-out-of-bounds')) {
      this._currentMapX = e.detail.x;
      this._currentMapY = e.detail.y;
    }
  },

  onScaleChange(e) {
    if (e.detail) {
      if (e.detail.scale) {
        this.currentScale = e.detail.scale;
        const pct = Math.round(e.detail.scale * 100);
        if (Math.abs(pct - this.data.scalePercent) >= 5) {
          this.setData({ scalePercent: pct });
        }
      }
      if (e.detail.x !== undefined && e.detail.y !== undefined) {
        this._currentMapX = e.detail.x;
        this._currentMapY = e.detail.y;
      }
    }
  },

  zoomIn() {
    let cur = this.currentScale || 0.35;
    let next = Math.min(4.0, parseFloat((cur * 1.25).toFixed(2)));
    if (next === this.data.scaleValue) next += 0.01;
    this.currentScale = next;
    this.setData({ 
      scaleValue: next, 
      scalePercent: Math.round(next * 100),
      mapX: this._currentMapX,
      mapY: this._currentMapY,
      mapAnimation: false
    });
  },

  zoomOut() {
    let cur = this.currentScale || 0.35;
    const minScale = this.data.scaleMin || this.fitScale || 0.3;
    let next = Math.max(minScale, parseFloat((cur / 1.25).toFixed(2)));
    if (next === this.data.scaleValue) next -= 0.01;
    if (next < minScale) next = minScale;
    this.currentScale = next;
    this.setData({ 
      scaleValue: next, 
      scalePercent: Math.round(next * 100),
      mapX: this._currentMapX,
      mapY: this._currentMapY,
      mapAnimation: false
    });
  },

  resetZoom() {
    let s = this.fitScale || 0.35;
    if (this.data.scaleValue === s) s += 0.001;
    this.currentScale = s;
    this._currentMapX = 0;
    this._currentMapY = 0;
    this.setData({ 
      scaleValue: s, 
      scalePercent: Math.round(s * 100),
      mapX: 0,
      mapY: 0,
      mapAnimation: true
    });
    wx.showToast({ title: '已自适应全图', icon: 'none', duration: 800 });
  },

  // ===== 波次管理 =====
  addPull() {
    if (this.data.mode === 'view') {
      wx.showToast({ title: '查看模式下不可新增波次', icon: 'none' });
      return;
    }
    let pulls = this.data.pulls;
    const nextColor = PULL_COLORS[pulls.length % PULL_COLORS.length];
    pulls.push({ color: nextColor, enemyIds: [], forces: 0, percent: '0.0', note: '' });
    const newIdx = pulls.length - 1;
    this.setData({
      pulls,
      activePullIndex: newIdx,
      activePullScrollId: `pull-item-${newIdx}`,
      mapX: this._currentMapX,
      mapY: this._currentMapY,
      mapAnimation: false
    });
    this._saveRoute();
  },

  // 修复点击波次弹到左上角的关键函数：若有怪物则平滑居中聚焦，若无怪物则保持当前坐标受控，永不弹回 (0, 0)
  selectPull(e) {
    const idx = Number(e.currentTarget.dataset.index);
    if (isNaN(idx)) return;
    const pulls = this.data.pulls || [];
    const p = pulls[idx];

    let nextState = {
      activePullIndex: idx,
      activePullScrollId: `pull-item-${idx}`
    };

    let centered = false;
    if (p && p.enemyIds && p.enemyIds.length > 0 && this._enemies && this._enemies.length > 0) {
      let sumX = 0, sumY = 0, count = 0;
      const W = this.data.mapWidth, H = this.data.mapHeight;
      for (const eid of p.enemyIds) {
        const eIdx = this._enemyMap[eid];
        if (eIdx !== undefined && this._enemies[eIdx]) {
          const en = this._enemies[eIdx];
          sumX += en.x * W;
          sumY += en.y * H;
          count++;
        }
      }
      if (count > 0) {
        const cx = sumX / count;
        const cy = sumY / count;
        const curScale = this.currentScale || this.data.scaleValue || 0.35;
        const viewW = this._containerWidth || ((wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()).windowWidth) || 390;
        const viewH = this._containerHeight || 450;
        
        // 计算让怪群几何中心居中的偏移坐标
        let targetX = (viewW / 2) - (cx * curScale);
        let targetY = (viewH / 2) - (cy * curScale);

        this._currentMapX = Math.round(targetX);
        this._currentMapY = Math.round(targetY);
        nextState.mapX = this._currentMapX;
        nextState.mapY = this._currentMapY;
        nextState.mapAnimation = true;
        centered = true;
      }
    }

    if (!centered) {
      // 保持当前实时的移动坐标受控传递，防止微信基础库 reset 到 (0, 0)
      nextState.mapX = this._currentMapX || 0;
      nextState.mapY = this._currentMapY || 0;
      nextState.mapAnimation = false;
    }

    this.setData(nextState);
    this.scheduleRedraw();
  },

  deletePull(e) {
    if (this.data.mode === 'view') {
      wx.showToast({ title: '查看模式下不可删除波次', icon: 'none' });
      return;
    }
    const index = Number(e.currentTarget.dataset.index);
    if (this.data.pulls.length <= 1) {
      this.clearActivePull();
      return;
    }
    wx.showModal({
      title: '删除拉怪批次',
      content: `确定要删除第 ${index + 1} 波吗？`,
      confirmText: '删除',
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return;
        let pulls = this.data.pulls;
        pulls.splice(index, 1);
        let newActive = Math.min(this.data.activePullIndex, pulls.length - 1);
        this.setData({
          pulls,
          activePullIndex: newActive,
          activePullScrollId: `pull-item-${newActive}`,
          selectedEnemyInfo: null,
          mapX: this._currentMapX,
          mapY: this._currentMapY,
          mapAnimation: false
        });
        this._recalcForces(pulls);
        this.setData({ pulls });
        this._saveRoute();
        this.scheduleRedraw();
      }
    });
  },

  clearActivePull() {
    if (this.data.mode === 'view') {
      wx.showToast({ title: '查看模式下不可清空波次', icon: 'none' });
      return;
    }
    let pulls = this.data.pulls;
    const p = pulls[this.data.activePullIndex];
    if (!p || p.enemyIds.length === 0) return;
    p.enemyIds = [];
    p.forces = 0;
    p.percent = '0.0';
    this.setData({ 
      pulls, 
      selectedEnemyInfo: null,
      mapX: this._currentMapX,
      mapY: this._currentMapY,
      mapAnimation: false
    });
    this._recalcForces(pulls);
    this.setData({ pulls });
    this._saveRoute();
    this.scheduleRedraw();
  },

  resetAll() {
    if (this.data.mode === 'view') {
      wx.showToast({ title: '查看模式下不可重置路线', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '重置整张路线',
      content: '确定要清空全部波次规划吗？',
      confirmText: '全部重置',
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return;
        const pulls = [{ color: PULL_COLORS[0], enemyIds: [], forces: 0, percent: '0.0', note: '' }];
        this.setData({
          pulls,
          activePullIndex: 0,
          activePullScrollId: 'pull-item-0',
          currentForces: 0,
          percent: '0.00',
          selectedEnemyInfo: null
        });
        this._recalcForces(pulls);
        try {
          wx.removeStorageSync('mdt_draft_' + this.data.currentDungeonName);
          wx.removeStorageSync('mdt_route_' + this.data.currentDungeonName);
        } catch (_) {}
        this.scheduleRedraw();
      }
    });
  },

  dismissEnemyTip() {
    this.setData({ selectedEnemyInfo: null });
  },

  // ===== 路线管理：保存/加载/删除多条自定义路线 =====
  openRouteManager() {
    const name = this.data.currentDungeonName;
    try {
      const savedRoutes = wx.getStorageSync('mdt_saved_routes_' + name) || [];
      this.setData({ savedRoutes, showRouteManager: true });
    } catch (e) {
      this.setData({ savedRoutes: [], showRouteManager: true });
    }
  },

  closeRouteManager() {
    this.setData({ showRouteManager: false });
  },

  openSaveModal() {
    const pulls = this.data.pulls;
    const hasContent = pulls.some(p => p.enemyIds && p.enemyIds.length > 0);
    if (!hasContent) {
      wx.showToast({ title: '当前路线为空，请先在地图上选怪', icon: 'none' });
      return;
    }

    if (this.data.mode === 'view') {
      wx.showModal({
        title: '另存为路线',
        content: '您正在浏览他人路线，确认将此路线另存为您自己的全新路线吗？',
        confirmText: '去另存',
        confirmColor: '#10b981',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              mode: 'create',
              editingRouteId: '',
              showSaveModal: true,
              saveRouteName: `${this.data.saveRouteName || this.data.currentDungeonName} (副本)`,
              saveRouteRemark: this.data.saveRouteRemark || ''
            });
          }
        }
      });
      return;
    }

    const defaultName = this.data.saveRouteName || `${this.data.currentDungeonName} 推荐路线`;
    const defaultAuthor = this.data.saveAuthorName || wx.getStorageSync('user_nickname') || '艾泽拉斯勇士';
    this.setData({
      showSaveModal: true,
      saveRouteName: defaultName,
      saveAuthorName: defaultAuthor
    });
  },

  closeSaveModal() {
    this.setData({ showSaveModal: false });
  },

  onSaveRouteNameInput(e) {
    this.setData({ saveRouteName: e.detail.value });
  },

  onSaveRouteRemarkInput(e) {
    this.setData({ saveRouteRemark: e.detail.value });
  },

  onSaveAuthorNameInput(e) {
    this.setData({ saveAuthorName: e.detail.value });
  },

  onSelectSaveLevelRange(e) {
    const level = e.currentTarget.dataset.level;
    this.setData({ saveRouteLevelRange: level });
  },

  confirmSaveRoute() {
    const name = (this.data.saveRouteName || '').trim() || `${this.data.currentDungeonName} 路线`;
    const remark = (this.data.saveRouteRemark || '').trim();
    const levelRange = this.data.saveRouteLevelRange || '全部';
    const authorName = (this.data.saveAuthorName || '').trim() || '艾泽拉斯勇士';
    wx.setStorageSync('user_nickname', authorName);
    this.setData({ showSaveModal: false });
    this._saveRouteToCloud(name, remark, levelRange, authorName, false);
  },

  async _saveRouteToCloud(routeName, routeRemark, levelRange, authorName, isRetry = false) {
    const dungeonName = this.data.currentDungeonName;
    const pulls = this.data.pulls;
    const mode = this.data.mode;
    const editingRouteId = this.data.editingRouteId;

    wx.showLoading({ title: isRetry ? '正在自动建表后重试...' : '正在同步到云端...' });

    // 文本内容安全审核 (security.msgSecCheck)
    try {
      const fullText = `${routeName} ${routeRemark} ${authorName}`;
      const secRes = await wx.cloud.callFunction({
        name: 'checkWishContent',
        data: { content: fullText }
      });
      if (secRes && secRes.result && secRes.result.pass === false) {
        wx.hideLoading();
        wx.showModal({
          title: '未通过内容安全审核',
          content: secRes.result.error || '路线名称、说明或署名包含敏感或违规内容，请修改后再发布。',
          showCancel: false,
          confirmColor: '#f59e0b'
        });
        return;
      }
    } catch (secErr) {
      console.warn('内容安全接口检测异常:', secErr);
    }

    let db;
    try {
      db = wx.cloud.database();
    } catch (e) {
      wx.hideLoading();
      wx.showToast({ title: '云开发未初始化', icon: 'none' });
      return;
    }

    const payload = {
      dungeon: dungeonName,
      name: routeName,
      remark: routeRemark,
      authorName: authorName || '艾泽拉斯勇士',
      levelRange: levelRange || '全部',
      pulls: pulls.map(p => ({
        color: p.color,
        enemyIds: (p.enemyIds || []).slice(),
        note: p.note || ''
      })),
      totalForces: this.data.currentForces,
      totalRequired: this.data.totalForces,
      percent: this.data.percent,
      pullCount: pulls.filter(p => p.enemyIds && p.enemyIds.length > 0).length,
      updateTime: Date.now()
    };

    try {
      if (mode === 'edit' && editingRouteId) {
        // 需求3：修改已有路线（由创建人在列表点击修改进入）
        await db.collection('mdt_routes').doc(editingRouteId).update({
          data: {
            ...payload
          }
        });
        // 用户要求：已保存的路线不缓存，彻底清除本地临时草稿
        try {
          wx.removeStorageSync('mdt_draft_' + dungeonName);
          wx.removeStorageSync('mdt_route_' + dungeonName);
        } catch (_) {}
        wx.hideLoading();
        wx.showToast({ title: '修改已保存！', icon: 'success' });
        setTimeout(() => {
          this.navigateBack();
        }, 1200);
      } else {
        // 创建全新真实路线
        await db.collection('mdt_routes').add({
          data: {
            ...payload,
            views: 1,
            likes: 0,
            createTime: Date.now()
          }
        });
        // 用户要求：已保存的路线不缓存，彻底清除本地临时草稿
        try {
          wx.removeStorageSync('mdt_draft_' + dungeonName);
          wx.removeStorageSync('mdt_route_' + dungeonName);
        } catch (_) {}
        wx.hideLoading();
        wx.showToast({ title: '路线发布成功！', icon: 'success' });
        setTimeout(() => {
          this.navigateBack();
        }, 1200);
      }
    } catch (err) {
      const errMsg = (err && (err.errMsg || err.message)) ? (err.errMsg || err.message) : '';
      console.warn('客户端直存异常，尝试云函数 Admin 模式保存:', errMsg);

      try {
        const cfSaveRes = await wx.cloud.callFunction({
          name: 'checkWishContent',
          data: {
            action: 'saveMdtRoute',
            routeId: editingRouteId,
            isEdit: mode === 'edit',
            routeData: payload
          }
        });

        if (cfSaveRes && cfSaveRes.result && cfSaveRes.result.success) {
          try {
            wx.removeStorageSync('mdt_draft_' + dungeonName);
            wx.removeStorageSync('mdt_route_' + dungeonName);
          } catch (_) {}
          wx.hideLoading();
          wx.showToast({
            title: mode === 'edit' ? '修改已保存！' : '路线发布成功！',
            icon: 'success'
          });
          setTimeout(() => {
            this.navigateBack();
          }, 1200);
          return;
        }
      } catch (cfErr) {
        console.warn('云函数 Admin 保存亦失败:', cfErr);
      }

      wx.hideLoading();
      if (errMsg.includes('not exist') || errMsg.includes('ResourceNotFound') || errMsg.includes('DATABASE_COLLECTION_NOT_EXIST')) {
        wx.showModal({
          title: '数据库集合未创建',
          content: '云端集合 mdt_routes 尚未创建。\n请在微信开发者工具顶部点击【云开发】->【数据库】->【+添加集合】，输入 mdt_routes 即可！',
          confirmText: '我知道了',
          showCancel: false
        });
      } else {
        wx.showModal({
          title: '云端保存失败',
          content: errMsg || '保存至云端数据库时发生错误，请检查网络与环境配置',
          showCancel: false
        });
      }
    }
  },

  _formatTime(d) {
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const h = d.getHours().toString().padStart(2, '0');
    const min = d.getMinutes().toString().padStart(2, '0');
    return `${m}-${day} ${h}:${min}`;
  },

  loadSavedRoute(e) {
    const routeId = e.currentTarget.dataset.id;
    const route = this.data.savedRoutes.find(r => r.id === routeId);
    if (!route) return;
    const pulls = route.pulls.map((rp, i) => ({
      color: rp.color || PULL_COLORS[i % PULL_COLORS.length],
      enemyIds: (rp.enemyIds || []).slice(),
      forces: 0,
      percent: '0.0',
      note: rp.note || ''
    }));
    this.setData({
      pulls,
      activePullIndex: 0,
      activePullScrollId: 'pull-item-0',
      selectedEnemyInfo: null,
      showRouteManager: false
    });
    this._recalcForces(pulls);
    this.scheduleRedraw();
    wx.showToast({ title: `已加载「${route.name}」`, icon: 'none' });
  },

  deleteSavedRoute(e) {
    const routeId = e.currentTarget.dataset.id;
    const route = this.data.savedRoutes.find(r => r.id === routeId);
    if (!route) return;
    wx.showModal({
      title: '删除路线',
      content: `确定删除「${route.name}」吗？删除后不可恢复。`,
      confirmText: '删除',
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return;
        const storageKey = 'mdt_saved_routes_' + this.data.currentDungeonName;
        try {
          let savedRoutes = this.data.savedRoutes.filter(r => r.id !== routeId);
          wx.setStorageSync(storageKey, savedRoutes);
          this.setData({ savedRoutes });
          wx.showToast({ title: '已删除', icon: 'none' });
        } catch (e) {
          wx.showToast({ title: '删除失败', icon: 'none' });
        }
      }
    });
  },

  // 分享前设置要分享的路线（供 button open-type="share" 触发）
  setShareRoute(e) {
    const routeId = (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.id) || 'current';
    if (routeId === 'current') {
      this._shareRouteData = {
        name: this.data.saveRouteName || `${this.data.currentDungeonName} 路线`,
        remark: this.data.saveRouteRemark || '',
        pulls: this.data.pulls,
        id: this.data.routeId || this.data.editingRouteId || ''
      };
    } else {
      const route = this.data.savedRoutes.find(r => r.id === routeId);
      if (route) {
        this._shareRouteData = {
          name: route.name,
          remark: route.remark || '',
          pulls: route.pulls,
          id: route.id || route._id || ''
        };
      }
    }
  },

  // ===== 路线编码/解码（用于分享链接） =====
  _encodeRouteForShare(pulls) {
    return (pulls || []).map((p, i) => {
      const cIdx = PULL_COLORS.indexOf(p.color);
      const ids = (p.enemyIds || []).join(',');
      return `${cIdx >= 0 ? cIdx : i}-${ids}`;
    }).filter(s => {
      const ids = s.split('-')[1];
      return ids && ids.length > 0;
    }).join('.');
  },

  _decodeSharedRoute(code) {
    if (!code) return null;
    const parts = code.split('.');
    const pulls = [];
    for (const part of parts) {
      const dashIdx = part.indexOf('-');
      if (dashIdx < 0) continue;
      const cIdx = parseInt(part.substring(0, dashIdx), 10);
      const idsStr = part.substring(dashIdx + 1);
      pulls.push({
        color: PULL_COLORS[isNaN(cIdx) ? pulls.length : cIdx % PULL_COLORS.length],
        enemyIds: idsStr ? idsStr.split(',').map(Number).filter(n => !isNaN(n)) : [],
        forces: 0,
        percent: '0.0',
        note: ''
      });
    }
    return pulls.length > 0 ? pulls : null;
  },

  // ===== 微信分享 =====
  onShareAppMessage(res) {
    let routeData = this._shareRouteData;
    if (!routeData) {
      const routeId = res && res.target && res.target.dataset && res.target.dataset.id;
      if (routeId && routeId !== 'current') {
        const route = this.data.savedRoutes.find(r => r.id === routeId);
        if (route) {
          routeData = { 
            name: route.name, 
            remark: route.remark || '', 
            pulls: route.pulls,
            id: route.id || route._id || ''
          };
        }
      }
    }
    if (!routeData) {
      routeData = {
        name: this.data.saveRouteName || `${this.data.currentDungeonName} 路线`,
        remark: this.data.saveRouteRemark || '',
        pulls: this.data.pulls,
        id: this.data.routeId || this.data.editingRouteId || ''
      };
    }
    this._shareRouteData = null;

    const dIdx = this.canonicalDungeonIndex(this.data.currentDungeonName);
    const encoded = this._encodeRouteForShare(routeData.pulls);
    const routeName = encodeURIComponent(routeData.name || `${this.data.currentDungeonName} 路线`);
    const remark = encodeURIComponent(routeData.remark || '');
    const dungeonNameEnc = encodeURIComponent(this.data.currentDungeonName);

    // 组合高兼容性分享链接：包含副本名、索引 d、波次编码 p、名称 n、说明 r、云端 ID (若有)
    let path = `/pages/mdt/mdt?mode=view&dungeon=${dungeonNameEnc}&d=${dIdx}&p=${encoded}&n=${routeName}&r=${remark}`;
    if (routeData.id) {
      path += `&id=${routeData.id}`;
    }

    return {
      title: `🗺️ [${this.data.currentDungeonName}] ${routeData.name}${routeData.remark ? (' - ' + routeData.remark) : ''}`,
      path: path
    };
  },

  // 云端路线可能使用别名（致盲谷、尖牙祭坛等），先反查规范名再取索引
  canonicalDungeonIndex(name) {
    let idx = DUNGEONS_LIST.indexOf(name);
    if (idx >= 0) return idx;
    const dataKey = DUNGEON_DATA_KEYS[name];
    if (dataKey) {
      const canonical = Object.keys(DUNGEON_DATA_KEYS)
        .find(k => DUNGEONS_LIST.includes(k) && DUNGEON_DATA_KEYS[k] === dataKey);
      if (canonical) idx = DUNGEONS_LIST.indexOf(canonical);
    }
    return idx;
  },

  // 微信朋友圈分享
  onShareTimeline() {
    const routeData = this._shareRouteData || {
      name: this.data.saveRouteName || `${this.data.currentDungeonName} 路线`,
      remark: this.data.saveRouteRemark || '',
      pulls: this.data.pulls || [],
      id: this.data.routeId || this.data.editingRouteId || ''
    };
    const dIdx = this.canonicalDungeonIndex(this.data.currentDungeonName);
    // 与好友分享保持一致：带上波次编码，未保存云端的路线也能完整分享出去
    let query = 'mode=view&dungeon=' + encodeURIComponent(this.data.currentDungeonName) +
      '&d=' + dIdx +
      '&p=' + this._encodeRouteForShare(routeData.pulls) +
      '&n=' + encodeURIComponent(routeData.name) +
      '&r=' + encodeURIComponent(routeData.remark || '');
    if (routeData.id) query += '&id=' + routeData.id;
    return {
      title: `🗺️ [${this.data.currentDungeonName}] ${routeData.name}`,
      query: query
    };
  },

  // ===== 怪物头像加载与缓存 =====
  _getPortraitImage(npcId) {
    if (!this.canvasNode || !npcId) return null;
    if (!this._portraitImages) this._portraitImages = {};
    if (this._portraitImages[npcId]) {
      return this._portraitImages[npcId];
    }
    const img = this.canvasNode.createImage();
    img.onload = () => {
      img._loaded = true;
      this.scheduleRedraw();
    };
    img.onerror = () => {
      img._failed = true;
    };
    img.src = `https://assets.keystone.guru/images/enemyportraits/${npcId}.png`;
    this._portraitImages[npcId] = img;
    return img;
  },

  _preloadDungeonPortraits() {
    if (!this.canvasNode || !this._enemies) return;
    const uniqueNpcIds = new Set();
    this._enemies.forEach(e => {
      if (e.npcId) uniqueNpcIds.add(e.npcId);
    });
    uniqueNpcIds.forEach(id => {
      this._getPortraitImage(id);
    });
  },

  // ===== 模式切换：规划模式 vs 预览模式 =====
  switchInteractiveMode(e) {
    if (this.data.mode === 'view') {
      if (this.data.isAuthor) {
        wx.showModal({
          title: '提示',
          content: '当前为只读查看模式，是否切换为编辑模式以进行波次规划？',
          confirmText: '去编辑',
          confirmColor: '#2563eb',
          success: (res) => {
            if (res.confirm) {
              this.enterEditMode();
            }
          }
        });
      } else {
        wx.showToast({ title: '当前为查看模式，轻触怪物查机制', icon: 'none' });
      }
      return;
    }
    const targetMode = e.currentTarget.dataset.mode;
    if (!targetMode || targetMode === this.data.interactiveMode) return;
    this.setData({
      interactiveMode: targetMode,
      inspectedEnemyId: null,
      showEnemyModal: false
    });
    if (targetMode === 'preview') {
      wx.showToast({ title: '已进入预览模式：点击怪物看技能', icon: 'none', duration: 1500 });
    } else {
      wx.showToast({ title: '已进入规划模式：点击怪物编入波次', icon: 'none', duration: 1500 });
    }
    this.scheduleRedraw();
  },

  // ===== 长按 Canvas 选怪：即使在规划模式下也能快捷查看技能 =====
  onCanvasLongPress(e) {
    this._longPressed = true;
    const t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || this._touchStartInfo || {};
    const clientX = t.clientX !== undefined ? t.clientX : (t.x !== undefined ? t.x : (e.detail && (e.detail.x || e.detail.clientX) || 0));
    const clientY = t.clientY !== undefined ? t.clientY : (t.y !== undefined ? t.y : (e.detail && (e.detail.y || e.detail.clientY) || 0));

    const query = this.createSelectorQuery();
    query.select('#routeCanvas').boundingClientRect((rect) => {
      if (!rect) return;
      const W = this.data.mapWidth, H = this.data.mapHeight;
      const cx = ((clientX - rect.left) / rect.width) * W;
      const cy = ((clientY - rect.top) / rect.height) * H;
      const renderScale = rect.width / W;
      const hitRadius = 32 / renderScale;
      let bestDist = Infinity, bestEnemy = null;

      for (const en of this._enemies) {
        const px = en.x * W, py = en.y * H;
        const dx = px - cx, dy = py - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < hitRadius && dist < bestDist) {
          bestDist = dist;
          bestEnemy = en;
        }
      }

      if (bestEnemy) {
        this.inspectEnemy(bestEnemy.id);
      }
    }).exec();
  },

  // ===== 怪物技能与图鉴机制详情 =====
  inspectEnemy(id) {
    const idx = this._enemyMap[id];
    if (idx === undefined) return;
    const target = this._enemies[idx];
    const enemyDb = mdtEnemiesDb[target.npcId] || {};

    // 确定该怪物当前属于哪个波次
    let assignedPull = null;
    const pulls = this.data.pulls || [];
    for (let i = 0; i < pulls.length; i++) {
      if (pulls[i].enemyIds && pulls[i].enemyIds.includes(id)) {
        assignedPull = {
          pullIndex: i,
          pullNum: i + 1,
          color: pulls[i].color || '#3b82f6',
          note: pulls[i].note || ''
        };
        break;
      }
    }

    const healthVal = enemyDb.health || target.health || 0;
    let healthStr = '未知';
    if (healthVal > 0) {
      if (healthVal >= 1000000) {
        healthStr = `${(healthVal / 1000000).toFixed(2)}M (${Math.round(healthVal / 10000)}万)`;
      } else if (healthVal >= 10000) {
        healthStr = `${(healthVal / 10000).toFixed(1)}万`;
      } else {
        healthStr = healthVal.toLocaleString();
      }
    }

    const totalForces = this.data.totalForces || 1;
    const forces = target.forces || 0;
    const forcesPercent = ((forces / totalForces) * 100).toFixed(1);

    const isBoss = Boolean(target.isBoss || enemyDb.isBoss);
    const creatureType = enemyDb.creatureType || 'Humanoid';
    const creatureTypeCn = CREATURE_TYPES_CN[creatureType] || creatureType;

    const chars = (enemyDb.characteristics || []).map(c => ({
      key: c,
      name: CHARACTERISTICS_CN[c] || c
    }));

    const spells = (enemyDb.spells || []).map(s => ({
      id: s.id,
      name: s.name,
      icon: s.icon,
      iconUrl: s.icon ? `https://wow.zamimg.com/images/wow/icons/medium/${s.icon}.jpg` : '',
      castTime: s.castTime || '瞬发',
      range: s.range || '',
      desc: s.desc || '造成普通攻击与伤害效果。',
      tags: s.tags || []
    }));

    this.setData({
      showEnemyModal: true,
      inspectedEnemyId: target.id,
      mapX: this._currentMapX,
      mapY: this._currentMapY,
      mapAnimation: false,
      inspectedEnemy: {
        id: target.id,
        npcId: target.npcId,
        name: enemyDb.name || target.name,
        nameCn: enemyDb.nameCn || target.name,
        isBoss,
        creatureTypeCn,
        healthStr,
        forces,
        forcesPercent,
        characteristics: chars,
        spells,
        spellCount: spells.length,
        assignedPull,
        portraitUrl: `https://assets.keystone.guru/images/enemyportraits/${target.npcId}.png`
      }
    });

    this.scheduleRedraw();
  },

  closeEnemyModal() {
    this.setData({
      showEnemyModal: false,
      inspectedEnemyId: null,
      inspectedEnemy: null,
      mapX: this._currentMapX,
      mapY: this._currentMapY,
      mapAnimation: false
    });
    this.scheduleRedraw();
  },

  toggleInspectedEnemyFromModal() {
    if (this.data.mode === 'view') {
      wx.showToast({ title: '查看模式下不可修改', icon: 'none' });
      return;
    }
    const enemy = this.data.inspectedEnemy;
    if (!enemy) return;
    this.handleToggleEnemy(enemy.id);
    // 重新更新弹窗中的波次归属显示
    this.inspectEnemy(enemy.id);
  },

  switchDungeon() {
    this.openDungeonModal();
  }
});

