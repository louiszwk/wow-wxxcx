const allDungeonsData = require('./all_dungeons_data.js');

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
    routeId: '',
    editingRouteId: '',
    isAuthor: false,
    currentOpenId: '',
    userNickname: '',

    // 难度层级选项
    levelRangeOptions: ['全部', '2-10层', '10-15层', '15层以上'],
    saveRouteLevelRange: '全部',

    // 缩放控制
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

    // 地图加载状态
    mapLoading: true
  },

  // ===== 纯内存状态（不走 setData，避免昂贵的视图层序列化） =====
  _enemies: [],         // 怪物原始数据列表
  _enemyMap: {},         // id → index 快速哈希索引
  _enemyState: {},       // id → { selected, color, pullNumber }
  _pullBadges: [],       // 内存中各波次徽章坐标，用于 Canvas 绘制与快速命中检测
  _drawPending: false,   // Canvas rAF 节流锁
  _touchStartInfo: null, // 触摸开始记录，用于区分轻触与地图拖拽

  onLoad(options) {
    const app = getApp();
    if (app && app.globalData) {
      this.setData({
        menuButtonTop: app.globalData.menuButtonTop || 44,
        menuButtonHeight: app.globalData.menuButtonHeight || 32,
        navBarHeight: app.globalData.navBarHeight || 88
      });
    }
    const sys = wx.getSystemInfoSync();
    const winWidth = sys.windowWidth || 390;
    this.fitScale = parseFloat(Math.max(0.25, Math.min(1.0, winWidth / 1200)).toFixed(2));
    this.currentScale = this.fitScale;
    this.setData({
      scaleValue: this.fitScale,
      scalePercent: Math.round(this.fitScale * 100)
    });

    // 获取当前用户 openid 与昵称
    this._initUserIdentity();

    const mode = options ? (options.mode || 'create') : 'create';
    const routeId = options ? (options.id || '') : '';
    let targetDungeon = '毒牙祭坛';
    if (options && options.dungeon) {
      targetDungeon = decodeURIComponent(options.dungeon);
    }

    this.setData({
      mode,
      routeId,
      currentDungeonName: targetDungeon
    });

    if (routeId) {
      // 从云数据库加载指定路线
      this.loadRouteFromCloud(routeId, mode);
    } else {
      // 新建空白路线
      this.loadDungeon(targetDungeon);
    }
  },

  _initUserIdentity() {
    let openid = wx.getStorageSync('user_openid') || '';
    let nickname = wx.getStorageSync('user_nickname') || '';
    if (openid) {
      this.setData({ currentOpenId: openid, userNickname: nickname });
      return;
    }

    try {
      wx.cloud.callFunction({
        name: 'checkWishContent',
        data: { action: 'getOpenId' },
        success: (res) => {
          if (res.result && res.result.openid) {
            openid = res.result.openid;
            wx.setStorageSync('user_openid', openid);
            this.setData({ currentOpenId: openid });
          }
        }
      });
    } catch (e) {
      console.warn('获取 openid 失败:', e);
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

    db.collection('mdt_routes').doc(routeId).get().then(res => {
      wx.hideLoading();
      const route = res.data;
      if (!route) {
        wx.showToast({ title: '路线不存在或已删除', icon: 'none' });
        return;
      }

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
        editingRouteId: (isAuthor && effectiveMode === 'edit') ? route._id : '',
        isAuthor,
        saveRouteName: route.name || '',
        saveRouteRemark: route.remark || '',
        saveRouteLevelRange: route.levelRange || '全部',
        currentDungeonName: dungeonName
      });

      // 加载副本底图与波次数据
      this.loadDungeon(dungeonName, route.pulls);

      // 累加浏览数 (自增1)
      try {
        const _ = db.command;
        db.collection('mdt_routes').doc(routeId).update({
          data: { views: _.inc(1) }
        }).catch(() => {
          wx.cloud.callFunction({
            name: 'checkWishContent',
            data: { action: 'incMdtView', routeId }
          }).catch(() => {});
        });
      } catch (_) {
        wx.cloud.callFunction({
          name: 'checkWishContent',
          data: { action: 'incMdtView', routeId }
        }).catch(() => {});
      }

    }).catch(err => {
      wx.hideLoading();
      console.error('加载路线详情失败:', err);
      wx.showToast({ title: '获取路线失败', icon: 'none' });
    });
  },

  onReady() {
    this.initCanvas();
  },

  navigateBack() {
    wx.navigateBack({
      fail() {
        wx.switchTab({ url: '/pages/index/index' });
      }
    });
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

    this.setData({
      currentDungeonName: name,
      mapImage: `/pages/mdt/images/maps/${file}.jpg`,
      totalForces: data.totalForces,
      pulls: initialPulls,
      activePullIndex: 0,
      activePullScrollId: 'pull-item-0',
      currentForces: 0,
      percent: '0.00',
      selectedEnemyInfo: null,
      scaleValue: initialScale,
      scalePercent: Math.round(initialScale * 100),
      savedRoutes,
      showRouteManager: false,
      mapLoading: false
    });

    this._recalcForces(initialPulls);
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
        const sys = wx.getSystemInfoSync();
        // 限制最大 DPR 为 2，保证视网膜级别超清同时防止占用过高显存导致低端机掉帧
        const dpr = Math.min(2, sys.pixelRatio || 2);
        canvas.width = this.data.mapWidth * dpr;
        canvas.height = this.data.mapHeight * dpr;
        ctx.scale(dpr, dpr);
        this.canvasCtx = ctx;
        this.canvasNode = canvas;
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

    // --- 3. 绘制所有怪物点（Canvas 一次性渲染 200+ 点，0 DOM 开销） ---
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i];
      const s = state[e.id] || {};
      const px = e.x * W, py = e.y * H;
      const isSelected = s.selected;
      const isCurrentActive = isSelected && (s.pullNumber === activeIdx + 1);
      const color = s.color || '#64748b';

      ctx.save();
      if (e.isBoss) {
        // Boss 首领：带金色光环菱形
        const size = isCurrentActive ? 14 : (isSelected ? 12 : 10);
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.rect(-size / 2, -size / 2, size, size);
        ctx.fillStyle = isSelected ? color : '#c084fc';
        ctx.fill();
        ctx.strokeStyle = isCurrentActive ? '#fef08a' : (isSelected ? '#ffffff' : '#0f172a');
        ctx.lineWidth = isCurrentActive ? 2.5 : 1.5;
        if (isCurrentActive) {
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 10;
        } else if (isSelected) {
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 6;
        }
        ctx.stroke();

        // 皇冠标记
        ctx.rotate(-Math.PI / 4);
        ctx.font = `${isCurrentActive ? 12 : 10}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👑', 0, 0);
      } else {
        // 普通小怪：圆点
        const radius = isCurrentActive ? 9.5 : (isSelected ? 8 : 6.5);
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? color : '#64748b';
        ctx.fill();
        ctx.strokeStyle = isCurrentActive ? '#fef08a' : (isSelected ? '#ffffff' : '#0f172a');
        ctx.lineWidth = isCurrentActive ? 2.5 : (isSelected ? 1.8 : 1);
        if (isCurrentActive) {
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 8;
        } else if (isSelected) {
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 4;
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    // --- 4. 绘制各波次中心数字徽章（在 Canvas 上直接绘制，零 DOM 延迟） ---
    for (const b of badges) {
      ctx.save();
      const radius = b.isActive ? 13 : 11;
      ctx.beginPath();
      ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
      ctx.lineWidth = b.isActive ? 2.6 : 1.8;
      ctx.strokeStyle = '#ffffff';
      if (b.isActive) {
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 12;
      } else {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 4;
      }
      ctx.stroke();

      // 数字
      ctx.font = `bold ${b.isActive ? 11 : 9.5}px sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(b.pullNum), b.x, b.y);
      ctx.restore();
    }
  },

  // ===== 区分拖拽与轻触（彻底解决拖动地图误触发选怪问题） =====
  onCanvasTouchStart(e) {
    const t = e.touches && e.touches[0];
    if (t) {
      this._touchStartInfo = {
        x: t.clientX || t.x,
        y: t.clientY || t.y,
        time: Date.now()
      };
    }
  },

  onCanvasTap(e) {
    const detail = e.detail;
    const clientX = detail.x !== undefined ? detail.x : (detail.clientX !== undefined ? detail.clientX : 0);
    const clientY = detail.y !== undefined ? detail.y : (detail.clientY !== undefined ? detail.clientY : 0);

    // 检查触摸移动距离和耗时，防止拖动地图结束时误判定为点击
    if (this._touchStartInfo) {
      const dx = clientX - this._touchStartInfo.x;
      const dy = clientY - this._touchStartInfo.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const elapsed = Date.now() - this._touchStartInfo.time;
      // 移动超过 10px 或按住超过 400ms，判定为地图平移/缩放操作，不触发选怪
      if (dist > 10 || elapsed > 400) {
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

      // 1. 优先怪物命中检测（给予手指 26px 宽容范围，小屏幕点怪丝滑命中）
      const hitRadius = 26 / renderScale;
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
        this.handleToggleEnemy(bestEnemy.id);
        return;
      }

      // 2. 如果未命中怪物，检测是否点击了波次数字徽章（点击徽章快速切换活跃波次）
      for (const b of (this._pullBadges || [])) {
        const dx = b.x - cx, dy = b.y - cy;
        const bDist = Math.sqrt(dx * dx + dy * dy);
        if (bDist <= 24 / renderScale) {
          this.setData({
            activePullIndex: b.pullIndex,
            activePullScrollId: `pull-item-${b.pullIndex}`
          });
          this.scheduleRedraw();
          return;
        }
      }
    }).exec();
  },

  // ===== 怪物选择与波次联动逻辑 =====
  handleToggleEnemy(id) {
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
      selectedEnemyInfo: null
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
    next = Math.max(0.2, Math.min(4.0, parseFloat(next.toFixed(2))));
    this.currentScale = next;
    this.setData({ scaleValue: next, scalePercent: Math.round(next * 100) });
  },

  onScaleChange(e) {
    if (e.detail && e.detail.scale) {
      this.currentScale = e.detail.scale;
      const pct = Math.round(e.detail.scale * 100);
      if (Math.abs(pct - this.data.scalePercent) >= 5) {
        this.setData({ scalePercent: pct });
      }
    }
  },

  zoomIn() {
    let cur = this.currentScale || 0.35;
    let next = Math.min(4.0, parseFloat((cur * 1.25).toFixed(2)));
    if (next === this.data.scaleValue) next += 0.01;
    this.currentScale = next;
    this.setData({ scaleValue: next, scalePercent: Math.round(next * 100) });
  },

  zoomOut() {
    let cur = this.currentScale || 0.35;
    let next = Math.max(0.2, parseFloat((cur / 1.25).toFixed(2)));
    if (next === this.data.scaleValue) next -= 0.01;
    this.currentScale = next;
    this.setData({ scaleValue: next, scalePercent: Math.round(next * 100) });
  },

  resetZoom() {
    let s = this.fitScale || 0.35;
    if (this.data.scaleValue === s) s += 0.001;
    this.currentScale = s;
    this.setData({ scaleValue: s, scalePercent: Math.round(s * 100) });
    wx.showToast({ title: '已自适应全图', icon: 'none', duration: 800 });
  },

  // ===== 波次管理 =====
  addPull() {
    let pulls = this.data.pulls;
    const nextColor = PULL_COLORS[pulls.length % PULL_COLORS.length];
    pulls.push({ color: nextColor, enemyIds: [], forces: 0, percent: '0.0', note: '' });
    const newIdx = pulls.length - 1;
    this.setData({
      pulls,
      activePullIndex: newIdx,
      activePullScrollId: `pull-item-${newIdx}`
    });
    this._saveRoute();
  },

  selectPull(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({
      activePullIndex: idx,
      activePullScrollId: `pull-item-${idx}`
    });
    this.scheduleRedraw();
  },

  deletePull(e) {
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
          selectedEnemyInfo: null
        });
        this._recalcForces(pulls);
        this.setData({ pulls });
        this._saveRoute();
        this.scheduleRedraw();
      }
    });
  },

  clearActivePull() {
    let pulls = this.data.pulls;
    const p = pulls[this.data.activePullIndex];
    if (!p || p.enemyIds.length === 0) return;
    p.enemyIds = [];
    p.forces = 0;
    p.percent = '0.0';
    this.setData({ pulls, selectedEnemyInfo: null });
    this._recalcForces(pulls);
    this.setData({ pulls });
    this._saveRoute();
    this.scheduleRedraw();
  },

  resetAll() {
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
            ...payload,
            authorName: authorName
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
          wx.navigateBack();
        }, 1200);
      } else {
        // 创建全新真实路线
        await db.collection('mdt_routes').add({
          data: {
            ...payload,
            authorName: authorName || '艾泽拉斯勇士',
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
          wx.navigateBack();
        }, 1200);
      }
    } catch (err) {
      const errMsg = (err && (err.errMsg || err.message)) ? (err.errMsg || err.message) : '';
      console.warn('云端保存初次异常:', errMsg);

      // 自愈机制：若集合未创建，尝试触发云函数自动建表后重试一次
      if (!isRetry && (errMsg.includes('not exist') || errMsg.includes('ResourceNotFound') || errMsg.includes('DATABASE_COLLECTION_NOT_EXIST'))) {
        try {
          const initRes = await wx.cloud.callFunction({
            name: 'checkWishContent',
            data: { action: 'initMdtCollection' }
          });
          if (initRes && initRes.result && initRes.result.success) {
            return this._saveRouteToCloud(routeName, routeRemark, levelRange, authorName, true);
          }
        } catch (callErr) {
          console.warn('云函数自动建表尝试失败:', callErr);
        }
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
        name: '自定义大秘境路线',
        remark: '',
        pulls: this.data.pulls
      };
    } else {
      const route = this.data.savedRoutes.find(r => r.id === routeId);
      if (route) {
        this._shareRouteData = {
          name: route.name,
          remark: route.remark || '',
          pulls: route.pulls
        };
      }
    }
  },

  // ===== 路线编码/解码（用于分享链接） =====
  _encodeRouteForShare(pulls) {
    return pulls.map((p, i) => {
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
      const cIdx = parseInt(part.substring(0, dashIdx));
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
          routeData = { name: route.name, remark: route.remark || '', pulls: route.pulls };
        }
      }
    }
    if (!routeData) {
      routeData = {
        name: '自定义大秘境路线',
        remark: '',
        pulls: this.data.pulls
      };
    }
    this._shareRouteData = null;

    const dIdx = DUNGEONS_LIST.indexOf(this.data.currentDungeonName);
    const encoded = this._encodeRouteForShare(routeData.pulls);
    const routeName = encodeURIComponent(routeData.name || '大秘境路线');
    const remark = encodeURIComponent(routeData.remark || '');
    const path = `/pages/mdt/mdt?d=${dIdx}&p=${encoded}&n=${routeName}&r=${remark}`;

    return {
      title: `🗺️ [${this.data.currentDungeonName}] ${routeData.name}${routeData.remark ? (' - ' + routeData.remark) : ''}`,
      path: path
    };
  },

  switchDungeon() {
    this.openDungeonModal();
  }
});
