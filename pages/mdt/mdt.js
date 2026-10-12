Page({
  data: {
    menuButtonTop: 44,
    menuButtonHeight: 32,
    navBarHeight: 88,

    mapWidth: 1200,
    mapHeight: 800,

    currentDungeonName: '红玉新生法地',
    mapImage: '/images/maps/RubyLifePools.jpg',
    showDungeonModal: false,

    // 缩放与平移控制
    scaleValue: 0.45,
    scalePercent: 45,
    mapX: 0,
    mapY: 0,
    
    currentForces: 0,
    totalForces: 551,
    percent: '0.00',
    
    enemies: [],
    pullMarkers: [], // 每一波的中心编号徽章
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
    this.fitScale = parseFloat(Math.max(0.3, Math.min(1.0, (sys.windowWidth || 390) / 1200)).toFixed(2));

    this.allDungeons = require('./all_dungeons_data.js');
    this.dungeonNames = [
      '谋杀街 (Murder Row)',
      '纳洛拉克之巢',
      '致盲谷',
      '虚空之痕竞技场',
      '尖牙祭坛',
      '红玉新生法地',
      '塞塔里斯神庙',
      '诸王之眠'
    ];
    
    this.dungeonFiles = {
      '谋杀街 (Murder Row)': 'MurderRow',
      '纳洛拉克之巢': 'DenOfNalorakk',
      '致盲谷': 'TheBlindingVale',
      '虚空之痕竞技场': 'VoidscarArena',
      '尖牙祭坛': 'AltarOfFangs',
      '红玉新生法地': 'RubyLifePools',
      '塞塔里斯神庙': 'TempleOfSethraliss',
      '诸王之眠': 'KingsRest'
    };
    
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
    const data = this.allDungeons[name];
    if (!data) return;

    const file = this.dungeonFiles[name];
    const initialScale = this.fitScale || 0.45;

    this.setData({
      currentDungeonName: name,
      mapImage: `/images/maps/${file}.jpg`,
      totalForces: data.totalForces,
      enemies: JSON.parse(JSON.stringify(data.enemies)),
      pulls: [{ color: '#ef4444', enemyIds: [], forces: 0 }],
      activePullIndex: 0,
      currentForces: 0,
      percent: '0.00',
      pullMarkers: [],
      selectedEnemyInfo: null,
      scaleValue: initialScale,
      scalePercent: Math.round(initialScale * 100),
      mapX: 0,
      mapY: 0
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

  // 鼠标滚轮缩放支持 (PC端 / 开发者工具)
  onMouseWheel(e) {
    const delta = (e.detail && e.detail.deltaY !== undefined) 
      ? e.detail.deltaY 
      : (e.deltaY !== undefined ? e.deltaY : (e.detail && e.detail.wheelDelta ? -e.detail.wheelDelta : 0));
    
    if (!delta) return;

    let currentScale = this.data.scaleValue || 1.0;
    // 向上滚 delta < 0 放大，向下滚 delta > 0 缩小
    let nextScale = delta < 0 ? currentScale * 1.15 : currentScale / 1.15;
    
    if (nextScale < 0.25) nextScale = 0.25;
    if (nextScale > 4.5) nextScale = 4.5;
    
    const s = parseFloat(nextScale.toFixed(2));
    this.setData({ 
      scaleValue: s,
      scalePercent: Math.round(s * 100)
    });
  },

  // 双指缩放移动端原生监听
  onScaleChange(e) {
    if (e.detail && e.detail.scale) {
      const s = parseFloat(e.detail.scale.toFixed(2));
      this.setData({ 
        scaleValue: s,
        scalePercent: Math.round(s * 100)
      });
    }
  },

  zoomIn() {
    let s = (this.data.scaleValue || 1.0) * 1.25;
    if (s > 4.5) s = 4.5;
    s = parseFloat(s.toFixed(2));
    this.setData({ scaleValue: s, scalePercent: Math.round(s * 100) });
  },

  zoomOut() {
    let s = (this.data.scaleValue || 1.0) / 1.25;
    if (s < 0.25) s = 0.25;
    s = parseFloat(s.toFixed(2));
    this.setData({ scaleValue: s, scalePercent: Math.round(s * 100) });
  },

  resetZoom() {
    const s = this.fitScale || 0.45;
    this.setData({ 
      scaleValue: s, 
      scalePercent: Math.round(s * 100),
      mapX: 0, 
      mapY: 0 
    });
    wx.showToast({ title: '已重置视野', icon: 'none', duration: 800 });
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
  },

  selectPullByIndex(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({ activePullIndex: idx });
    wx.showToast({
      title: `已选中 Pull ${idx + 1}`,
      icon: 'none',
      duration: 1000
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
      content: `确定要删除 Pull ${index + 1} 吗？该波次中的怪物将被取消标号并移出路线。`,
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
          pullMarkers: [],
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
        action: isSelectedNow ? `已标号为波次 Pull ${activeIdx + 1}` : '已移出路线'
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
    const pullMarkers = [];

    // 重置所有怪物的标号状态
    enemies.forEach(en => {
      en.selected = false;
      en.color = '';
      en.pullNumber = null;
    });

    pulls.forEach((p, pIdx) => {
      let pForce = 0;
      let sumX = 0;
      let sumY = 0;
      let count = 0;

      p.enemyIds.forEach(eid => {
        const e = enemies.find(en => en.id === eid);
        if (e) {
          pForce += e.forces;
          e.selected = true;
          e.color = p.color;
          e.pullNumber = pIdx + 1; // 每一波怪打上明显的波次数字
          sumX += e.x;
          sumY += e.y;
          count++;
        }
      });
      p.forces = pForce;
      current += pForce;

      if (count > 0) {
        pullMarkers.push({
          pullIndex: pIdx,
          pullNum: pIdx + 1,
          x: Math.round((sumX / count) * this.data.mapWidth),
          y: Math.round((sumY / count) * this.data.mapHeight),
          color: p.color,
          count: count,
          forces: pForce
        });
      }
    });

    let percent = ((current / this.data.totalForces) * 100).toFixed(2);
    this.setData({ pulls, currentForces: current, percent, enemies, pullMarkers });
  },

  drawLines() {
    if (!this.canvasCtx) return;
    const ctx = this.canvasCtx;
    ctx.clearRect(0, 0, this.data.mapWidth, this.data.mapHeight);
    
    const pulls = this.data.pulls;
    const enemies = this.data.enemies;
    let lastPullCenter = null;

    for (let i = 0; i < pulls.length; i++) {
      const p = pulls[i];
      if (p.enemyIds.length === 0) continue;

      // 绘制同波次怪物之间的连线
      ctx.beginPath();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([]);

      let sumX = 0, sumY = 0;
      for (let j = 0; j < p.enemyIds.length; j++) {
        const e = enemies.find(en => en.id === p.enemyIds[j]);
        if (!e) continue;
        const px = e.x * this.data.mapWidth;
        const py = e.y * this.data.mapHeight;
        sumX += px; sumY += py;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // 计算本波重心
      const centerX = sumX / p.enemyIds.length;
      const centerY = sumY / p.enemyIds.length;

      // 绘制波次与波次之间的虚线箭头连线
      if (lastPullCenter) {
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 6]);
        ctx.moveTo(lastPullCenter.x, lastPullCenter.y);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
      }
      lastPullCenter = { x: centerX, y: centerY };
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
