const allDungeonsData = require('./all_dungeons_data.js');
const presetRoutes = require('./preset_routes.js');

const DUNGEONS_LIST = [
  '谋杀街 (Murder Row)',
  '纳洛拉克之巢',
  '致盲谷',
  '虚空之痕竞技场',
  '尖牙祭坛',
  '红玉新生法地',
  '塞塔里斯神庙',
  '诸王之眠'
];

const DUNGEON_FILES = {
  '谋杀街 (Murder Row)': 'MurderRow',
  '纳洛拉克之巢': 'DenOfNalorakk',
  '致盲谷': 'TheBlindingVale',
  '虚空之痕竞技场': 'VoidscarArena',
  '尖牙祭坛': 'AltarOfFangs',
  '红玉新生法地': 'RubyLifePools',
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
    currentDungeonName: '红玉新生法地',
    mapImage: '/pages/mdt/images/maps/RubyLifePools.jpg',
    showDungeonModal: false,

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

    // 预设路线
    showRoutePanel: false,
    presetRouteList: [],
    activeRouteId: null,

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

  onLoad() {
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

    this.loadDungeon('红玉新生法地');
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

  loadDungeon(name) {
    const data = allDungeonsData[name];
    if (!data) {
      wx.showToast({ title: '副本数据缺失', icon: 'none' });
      return;
    }
    const file = DUNGEON_FILES[name];
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

    // 2. 加载预设路线
    const routes = presetRoutes[name] || [];
    const routeList = routes.map(r => ({
      id: r.id,
      name: r.name,
      tag: r.tag,
      author: r.author,
      targetPercent: r.targetPercent,
      pullCount: r.pulls ? r.pulls.length : 0
    }));

    // 默认自动加载首条推荐路线（对标艾泽拉斯之夏：开箱即用，无需从空白摸索）
    let initialPulls = [{ color: PULL_COLORS[0], enemyIds: [], forces: 0, percent: '0.0', note: '' }];
    let activeRouteId = null;

    if (routes.length > 0 && routes[0].pulls && routes[0].pulls.length > 0) {
      const firstRoute = routes[0];
      activeRouteId = firstRoute.id;
      initialPulls = firstRoute.pulls.map((rp, i) => ({
        color: rp.color || PULL_COLORS[i % PULL_COLORS.length],
        enemyIds: (rp.enemyIds || []).slice(),
        forces: 0,
        percent: '0.0',
        note: rp.note || ''
      }));
    }

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
      presetRouteList: routeList,
      showRoutePanel: false,
      activeRouteId,
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

      const centroid = { x: sumX / pEnemies.length, y: sumY / pEnemies.length };
      activeCentroids.push(centroid);

      const isActive = (activeIdx === i);
      const clusters = clusterEnemies(pEnemies, 42);

      for (let clIdx = 0; clIdx < clusters.length; clIdx++) {
        const cluster = clusters[clIdx];
        if (cluster.length === 0) continue;

        let cx = 0, cy = 0;
        cluster.forEach(e => { cx += e.px; cy += e.py; });
        cx = Math.round(cx / cluster.length);
        cy = Math.round(cy / cluster.length);
        if (cluster.length === 1) cy = Math.round(cluster[0].py - 16);

        // 记录波次数字徽章坐标
        badges.push({
          pullIndex: i,
          pullNum: i + 1,
          x: cx,
          y: cy,
          color: p.color,
          isActive
        });

        // 绘制群怪包围轮廓
        ctx.save();
        if (cluster.length === 1) {
          ctx.beginPath();
          ctx.arc(cluster[0].px, cluster[0].py, 15, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? hexToRgba(p.color, 0.35) : hexToRgba(p.color, 0.16);
          ctx.fill();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = isActive ? 2.8 : 1.6;
          if (isActive) {
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
          }
          ctx.stroke();
        } else {
          const pts = cluster.map(e => ({ x: e.px, y: e.py }));
          const hull = getPuffedHull(pts, 15);
          if (hull.length >= 3) {
            ctx.beginPath();
            ctx.moveTo(hull[0].x, hull[0].y);
            for (let k = 1; k < hull.length; k++) {
              ctx.lineTo(hull[k].x, hull[k].y);
            }
            ctx.closePath();
            ctx.fillStyle = isActive ? hexToRgba(p.color, 0.35) : hexToRgba(p.color, 0.16);
            ctx.fill();
            ctx.strokeStyle = p.color;
            ctx.lineWidth = isActive ? 2.8 : 1.6;
            if (isActive) {
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 10;
            }
            ctx.stroke();
          }
        }
        ctx.restore();
      }
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

      // 1. 优先命中检测：波次徽章（点击徽章直接快速切换当前波次）
      for (const b of (this._pullBadges || [])) {
        const dx = b.x - cx, dy = b.y - cy;
        const bDist = Math.sqrt(dx * dx + dy * dy);
        if (bDist <= 20 / renderScale) {
          this.setData({
            activePullIndex: b.pullIndex,
            activePullScrollId: `pull-item-${b.pullIndex}`
          });
          try { wx.vibrateShort({ type: 'light' }); } catch (_) {}
          this.scheduleRedraw();
          return;
        }
      }

      // 2. 怪物命中检测（给予手指 28px 宽容范围，小屏幕点怪丝滑命中）
      const hitRadius = 28 / renderScale;
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
      if (existingPullIdx === activeIdx) {
        // 当前波次内再次点击 -> 移出路线
        pulls[existingPullIdx].enemyIds = pulls[existingPullIdx].enemyIds.filter(eid => !packIds.includes(eid));
        isSelectedNow = false;
        actionDesc = '已从当前波次移出';
      } else {
        // 属于其他波次 -> 切换高亮到那个波次，并提示
        this.setData({
          activePullIndex: existingPullIdx,
          activePullScrollId: `pull-item-${existingPullIdx}`
        });
        isSelectedNow = true;
        actionDesc = `属于第 ${existingPullIdx + 1} 波 (再次点击可移出)`;
      }
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

    // 轻微震动触感反馈
    try { wx.vibrateShort({ type: 'light' }); } catch (_) {}

    // 统计同组贡献
    const packEnemies = packIds.map(eid => this._enemies[this._enemyMap[eid]]).filter(Boolean);
    const totalEnemyForces = packEnemies.reduce((sum, en) => sum + en.forces, 0);
    const percentContributed = ((totalEnemyForces / this.data.totalForces) * 100).toFixed(2);

    this._recalcForces(pulls);

    this.setData({
      pulls,
      selectedEnemyInfo: {
        name: target.name,
        isBoss: target.isBoss,
        forces: totalEnemyForces,
        percent: percentContributed,
        packCount: packEnemies.length,
        action: actionDesc
      }
    });

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

  // ===== 预设路线切换 =====
  toggleRoutePanel() {
    this.setData({ showRoutePanel: !this.data.showRoutePanel });
  },

  loadPresetRoute(e) {
    const routeId = e.currentTarget.dataset.id;
    const name = this.data.currentDungeonName;
    const routes = presetRoutes[name] || [];
    const route = routes.find(r => r.id === routeId);
    if (!route) return;

    if (!route.pulls || route.pulls.length === 0) {
      const emptyPulls = [{ color: PULL_COLORS[0], enemyIds: [], forces: 0, percent: '0.0', note: '' }];
      this.setData({
        pulls: emptyPulls,
        activePullIndex: 0,
        activePullScrollId: 'pull-item-0',
        activeRouteId: routeId,
        showRoutePanel: false,
        selectedEnemyInfo: null
      });
      this._recalcForces(emptyPulls);
      this.scheduleRedraw();
      wx.showToast({ title: '已清空，开始自由规划', icon: 'none', duration: 1200 });
      return;
    }

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
      activeRouteId: routeId,
      showRoutePanel: false,
      selectedEnemyInfo: null
    });

    this._recalcForces(pulls);
    this.setData({ pulls });
    this.scheduleRedraw();

    wx.showToast({ title: `已加载「${route.name}」`, icon: 'none', duration: 1500 });
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
    try { wx.vibrateShort({ type: 'light' }); } catch (_) {}
  },

  selectPull(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({
      activePullIndex: idx,
      activePullScrollId: `pull-item-${idx}`
    });
    try { wx.vibrateShort({ type: 'light' }); } catch (_) {}
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
          selectedEnemyInfo: null,
          activeRouteId: null
        });
        this._recalcForces(pulls);
        this.scheduleRedraw();
      }
    });
  },

  dismissEnemyTip() {
    this.setData({ selectedEnemyInfo: null });
  },

  importMDT() {
    wx.showModal({
      title: '导入 MDT 字符串',
      content: '该功能底层需解密 LibDeflate 字符串并匹配怪物坐标系，当前技术预览版可直接选用顶部精选的预设路线！',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  switchDungeon() {
    this.openDungeonModal();
  }
});
