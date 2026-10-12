const allDungeonsData = require('./all_dungeons_data.js');

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

// --- MDT 几何计算与贴身轮廓算法 ---
function crossProduct(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function convexHull(points) {
  if (points.length <= 2) return points.slice();
  const sorted = points.slice().sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
  
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

// 严密贴合怪物群外缘的最小外扩凸包（半径12px，消除任何宽大矩形角）
function getPuffedHull(pts, radius = 12) {
  if (pts.length === 0) return [];
  if (pts.length === 1) {
    const p = pts[0];
    const res = [];
    const N = 12;
    for (let i = 0; i < N; i++) {
      const a = (i * Math.PI * 2) / N;
      res.push({ x: p.x + radius * Math.cos(a), y: p.y + radius * Math.sin(a) });
    }
    return res;
  }
  const circlePoints = [];
  const N = 8;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    for (let j = 0; j < N; j++) {
      const a = (j * Math.PI * 2) / N;
      circlePoints.push({ x: p.x + radius * Math.cos(a), y: p.y + radius * Math.sin(a) });
    }
  }
  return convexHull(circlePoints);
}

// 怪物聚类：同组怪或距离极近怪聚为一簇，避免跨空地框入其他怪
function clusterEnemies(enemies, threshold = 38) {
  if (enemies.length <= 1) return [enemies];
  const adj = Array.from({ length: enemies.length }, () => []);
  for (let i = 0; i < enemies.length; i++) {
    for (let j = i + 1; j < enemies.length; j++) {
      const e1 = enemies[i], e2 = enemies[j];
      let connected = false;
      if (e1.pack !== null && e1.pack !== undefined && e1.pack === e2.pack) {
        connected = true;
      } else {
        const dx = e1.px - e2.px;
        const dy = e1.py - e2.py;
        if (Math.sqrt(dx * dx + dy * dy) <= threshold) {
          connected = true;
        }
      }
      if (connected) {
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }

  const visited = new Set();
  const clusters = [];
  for (let i = 0; i < enemies.length; i++) {
    if (visited.has(i)) continue;
    const cluster = [];
    const queue = [i];
    visited.add(i);
    while (queue.length > 0) {
      const curr = queue.shift();
      cluster.push(enemies[curr]);
      for (const neighbor of adj[curr]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
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
    mapImage: '/images/maps/RubyLifePools.jpg',
    showDungeonModal: false,

    // 缩放控制（初始自适应屏幕宽度）
    scaleValue: 0.35,
    scalePercent: 35,
    
    currentForces: 0,
    totalForces: 551,
    percent: '0.00',
    
    enemies: [],
    pullBadges: [], // 每一波选中的中心编号徽章
    selectedEnemyInfo: null,
    
    pullColors: [
      '#ef4444', '#3b82f6', '#10b981', '#f59e0b', 
      '#8b5cf6', '#ec4899', '#06b6d4', '#eab308', 
      '#14b8a6', '#f43f5e'
    ],
    pulls: [{ color: '#ef4444', enemyIds: [], forces: 0 }],
    activePullIndex: 0
  },

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
    // 计算刚好贴合屏幕宽度的初始缩放比例
    const winWidth = sys.windowWidth || 390;
    this.fitScale = parseFloat(Math.max(0.25, Math.min(1.0, winWidth / 1200)).toFixed(2));
    this.currentScale = this.fitScale;

    this.setData({
      scaleValue: this.fitScale,
      scalePercent: Math.round(this.fitScale * 100)
    });

    this.loadDungeon('红玉新生法地');
  },

  navigateBack() {
    wx.navigateBack({
      fail() {
        wx.switchTab({ url: '/pages/index/index' });
      }
    });
  },

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
      wx.showToast({ title: '加载中...', icon: 'loading', duration: 400 });
      this.loadDungeon(name);
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

    const initialScale = this.fitScale || 0.35;
    this.currentScale = initialScale;

    this.setData({
      currentDungeonName: name,
      mapImage: `/images/maps/${file}.jpg`,
      totalForces: data.totalForces,
      enemies: JSON.parse(JSON.stringify(data.enemies)),
      pulls: [{ color: '#ef4444', enemyIds: [], forces: 0 }],
      activePullIndex: 0,
      currentForces: 0,
      percent: '0.00',
      pullBadges: [],
      selectedEnemyInfo: null,
      scaleValue: initialScale,
      scalePercent: Math.round(initialScale * 100)
    });
    
    if (this.canvasCtx) {
      this.drawLines();
    }
  },

  onReady() {
    this.initCanvas();
  },

  initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#routeCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0]) return;
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        const dpr = wx.getSystemInfoSync().pixelRatio || 2;
        canvas.width = this.data.mapWidth * dpr;
        canvas.height = this.data.mapHeight * dpr;
        ctx.scale(dpr, dpr);
        
        this.canvasCtx = ctx;
        this.canvasNode = canvas;
        this.drawLines();
      });
  },

  // 鼠标滚轮缩放监听 (PC微信 / 微信开发者工具)
  onMouseWheel(e) {
    const delta = (e.detail && e.detail.deltaY !== undefined) 
      ? e.detail.deltaY 
      : (e.deltaY !== undefined ? e.deltaY : (e.detail && e.detail.wheelDelta ? -e.detail.wheelDelta : 0));
    
    if (!delta) return;

    let cur = this.currentScale || this.data.scaleValue || 0.35;
    // 向上滚动放大，向下滚动缩小
    let next = delta < 0 ? cur * 1.15 : cur / 1.15;
    if (next < 0.2) next = 0.2;
    if (next > 4.0) next = 4.0;
    
    next = parseFloat(next.toFixed(2));
    this.currentScale = next;
    this.setData({ 
      scaleValue: next,
      scalePercent: Math.round(next * 100)
    });
  },

  // 移动端双指手势缩放变化监听
  onScaleChange(e) {
    if (e.detail && e.detail.scale) {
      this.currentScale = e.detail.scale;
      // 注意：不要在手势进行中频繁 setData(scaleValue)，避免造成组件跳动
    }
  },

  zoomIn() {
    let cur = this.currentScale || this.data.scaleValue || 0.35;
    let next = Math.min(4.0, parseFloat((cur * 1.3).toFixed(2)));
    if (next === this.data.scaleValue) next += 0.01;
    this.currentScale = next;
    this.setData({ scaleValue: next, scalePercent: Math.round(next * 100) });
  },

  zoomOut() {
    let cur = this.currentScale || this.data.scaleValue || 0.35;
    let next = Math.max(0.2, parseFloat((cur / 1.3).toFixed(2)));
    if (next === this.data.scaleValue) next -= 0.01;
    this.currentScale = next;
    this.setData({ scaleValue: next, scalePercent: Math.round(next * 100) });
  },

  resetZoom() {
    let s = this.fitScale || 0.35;
    if (this.data.scaleValue === s) {
      s += 0.001;
    }
    this.currentScale = s;
    this.setData({ 
      scaleValue: s, 
      scalePercent: Math.round(s * 100)
    });
    wx.showToast({ title: '已自适应全图', icon: 'none', duration: 800 });
  },

  addPull() {
    let pulls = this.data.pulls;
    const nextColor = this.data.pullColors[pulls.length % this.data.pullColors.length];
    pulls.push({ color: nextColor, enemyIds: [], forces: 0 });
    this.setData({ 
      pulls,
      activePullIndex: pulls.length - 1
    });
  },

  selectPull(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({ activePullIndex: idx });
    this.drawLines();
  },

  selectPullByIndex(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({ activePullIndex: idx });
    this.drawLines();
    wx.showToast({
      title: `第 ${idx + 1} 波`,
      icon: 'none',
      duration: 800
    });
  },

  deletePull(e) {
    const index = Number(e.currentTarget.dataset.index);
    if (this.data.pulls.length <= 1) {
      this.clearActivePull();
      return;
    }
    
    wx.showModal({
      title: '删除拉怪批次',
      content: `确定要删除第 ${index + 1} 波吗？该波次中的怪物将被移出路线。`,
      confirmText: '删除',
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return;
        let pulls = this.data.pulls;
        pulls.splice(index, 1);
        let newActive = Math.min(this.data.activePullIndex, pulls.length - 1);
        if (newActive < 0) newActive = 0;

        this.setData({ 
          pulls, 
          activePullIndex: newActive,
          selectedEnemyInfo: null
        });
        this.calculateForces();
        this.drawLines();
      }
    });
  },

  clearActivePull() {
    let pulls = this.data.pulls;
    const activeIdx = this.data.activePullIndex;
    const targetPull = pulls[activeIdx];
    if (!targetPull || targetPull.enemyIds.length === 0) return;

    targetPull.enemyIds = [];
    targetPull.forces = 0;

    this.setData({ 
      pulls, 
      selectedEnemyInfo: null
    });
    this.calculateForces();
    this.drawLines();
  },

  resetAll() {
    wx.showModal({
      title: '重置整张路线',
      content: '确定要清空全部波次规划吗？',
      confirmText: '全部重置',
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return;
        this.setData({
          pulls: [{ color: this.data.pullColors[0], enemyIds: [], forces: 0 }],
          activePullIndex: 0,
          currentForces: 0,
          percent: '0.00',
          pullBadges: [],
          selectedEnemyInfo: null
        });
        this.calculateForces();
        this.drawLines();
      }
    });
  },

  toggleEnemy(e) {
    const id = e.currentTarget.dataset.id;
    let enemies = this.data.enemies;
    let pulls = this.data.pulls;
    let activeIdx = this.data.activePullIndex;
    
    let target = enemies.find(en => en.id === id);
    if (!target) return;

    // 找到同属于一组(pack)的全部怪物
    let packEnemies = [target];
    if (target.pack !== null && target.pack !== undefined) {
      packEnemies = enemies.filter(en => en.pack === target.pack);
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
    if (existingPullIdx !== -1) {
      // 移出已有波次
      const packIds = packEnemies.map(en => en.id);
      pulls[existingPullIdx].enemyIds = pulls[existingPullIdx].enemyIds.filter(eId => !packIds.includes(eId));
      isSelectedNow = false;
    } else {
      // 添加至当前波次
      packEnemies.forEach(en => {
        if (!pulls[activeIdx].enemyIds.includes(en.id)) {
          pulls[activeIdx].enemyIds.push(en.id);
        }
      });
      isSelectedNow = true;
    }

    const totalEnemyForces = packEnemies.reduce((sum, en) => sum + en.forces, 0);
    const percentContributed = ((totalEnemyForces / this.data.totalForces) * 100).toFixed(2);

    this.setData({ 
      pulls,
      selectedEnemyInfo: {
        name: target.name,
        isBoss: target.isBoss,
        forces: totalEnemyForces,
        percent: percentContributed,
        packCount: packEnemies.length,
        action: isSelectedNow ? `已标号为第 ${activeIdx + 1} 波` : '已移出路线'
      }
    });

    this.calculateForces();
    this.drawLines();
  },

  dismissEnemyTip() {
    this.setData({ selectedEnemyInfo: null });
  },

  calculateForces() {
    let current = 0;
    let pulls = this.data.pulls;
    let enemies = this.data.enemies;
    const pullBadges = [];

    // 重置所有怪物的标号状态
    enemies.forEach(en => {
      en.selected = false;
      en.color = '';
      en.pullNumber = null;
    });

    pulls.forEach((p, pIdx) => {
      let pForce = 0;
      let pEnemies = [];
      let sumAllX = 0, sumAllY = 0;

      p.enemyIds.forEach(eid => {
        const e = enemies.find(en => en.id === eid);
        if (e) {
          pForce += e.forces;
          e.selected = true;
          e.color = p.color;
          e.pullNumber = pIdx + 1;
          
          const px = e.x * this.data.mapWidth;
          const py = e.y * this.data.mapHeight;
          pEnemies.push({ ...e, px, py });
          sumAllX += px;
          sumAllY += py;
        }
      });
      p.forces = pForce;
      current += pForce;

      if (pEnemies.length > 0) {
        // 智能聚类：同组怪或距离极近怪聚为一簇，避免跨空地框入其他怪
        const clusters = clusterEnemies(pEnemies, 38);
        p.clusters = clusters.map(cl => cl.map(e => ({ x: e.px, y: e.py })));
        p.centroid = { 
          x: Math.round(sumAllX / pEnemies.length), 
          y: Math.round(sumAllY / pEnemies.length) 
        };

        // 为每个紧凑聚合群打上波次数字标记
        clusters.forEach((cl, clIdx) => {
          let cx = 0, cy = 0;
          cl.forEach(e => { cx += e.px; cy += e.py; });
          cx = Math.round(cx / cl.length);
          cy = Math.round(cy / cl.length);

          if (cl.length === 1) {
            // 单只怪（如Boss）时，徽章置于怪物上方，清晰标号且不挡怪物本体
            cy = Math.round(cl[0].py - 18);
          }

          pullBadges.push({
            id: `${pIdx}-${clIdx}`,
            pullIndex: pIdx,
            pullNum: pIdx + 1,
            x: cx,
            y: cy,
            color: p.color
          });
        });
      } else {
        p.clusters = [];
        p.centroid = null;
      }
    });

    let percent = ((current / this.data.totalForces) * 100).toFixed(2);
    this.setData({ pulls, currentForces: current, percent, enemies, pullBadges });
  },

  drawLines() {
    if (!this.canvasCtx) return;
    const ctx = this.canvasCtx;
    ctx.clearRect(0, 0, this.data.mapWidth, this.data.mapHeight);
    
    const pulls = this.data.pulls || [];

    // 1. 绘制波次与波次之间简洁清晰的白色虚线行进路线（连接各波中心点）
    const activeCentroids = [];
    for (let i = 0; i < pulls.length; i++) {
      if (pulls[i].enemyIds && pulls[i].enemyIds.length > 0 && pulls[i].centroid) {
        activeCentroids.push(pulls[i].centroid);
      }
    }
    if (activeCentroids.length >= 2) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);
      for (let i = 0; i < activeCentroids.length; i++) {
        const c = activeCentroids[i];
        if (i === 0) ctx.moveTo(c.x, c.y);
        else ctx.lineTo(c.x, c.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // 2. 绘制每个波次的最小贴身包围框（严格最小凸包算法，半径12px贴身收紧，绝不波及其他怪）
    for (let i = 0; i < pulls.length; i++) {
      const p = pulls[i];
      if (!p.clusters || p.clusters.length === 0) continue;

      const isActive = this.data.activePullIndex === i;

      for (let c = 0; c < p.clusters.length; c++) {
        const cluster = p.clusters[c];
        if (cluster.length === 0) continue;

        ctx.save();
        if (cluster.length === 1) {
          // 单只怪时：紧凑正圆
          ctx.beginPath();
          ctx.arc(cluster[0].x, cluster[0].y, 13, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? hexToRgba(p.color, 0.32) : hexToRgba(p.color, 0.16);
          ctx.fill();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = isActive ? 2.5 : 1.8;
          ctx.setLineDash([]);
          if (isActive) {
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
          }
          ctx.stroke();
        } else {
          // 2只及以上怪：严格最小贴身凸包轮廓
          const hull = getPuffedHull(cluster, 12);
          if (hull.length >= 3) {
            ctx.beginPath();
            ctx.moveTo(hull[0].x, hull[0].y);
            for (let k = 1; k < hull.length; k++) {
              ctx.lineTo(hull[k].x, hull[k].y);
            }
            ctx.closePath();
            ctx.fillStyle = isActive ? hexToRgba(p.color, 0.32) : hexToRgba(p.color, 0.16);
            ctx.fill();
            ctx.strokeStyle = p.color;
            ctx.lineWidth = isActive ? 2.5 : 1.8;
            ctx.setLineDash([]);
            if (isActive) {
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 8;
            }
            ctx.stroke();
          }
        }
        ctx.restore();
      }
    }
  },

  importMDT() {
    wx.showModal({
      title: '导入 MDT 代码',
      content: '该功能底层需解密 LibDeflate 字符串并匹配上万个怪物坐标系，当前为技术预览版，正由引擎加紧构建中！',
      showCancel: false,
      confirmText: '加油'
    });
  },

  switchDungeon() {
    this.openDungeonModal();
  }
});
