Page({
  data: {
    menuButtonTop: 44,
    menuButtonHeight: 32,
    navBarHeight: 88,

    mapWidth: 1200,
    mapHeight: 800,

    currentDungeonName: '红玉新生法地',
    mapImage: '/images/maps/RubyLifePools.jpg',
    
    currentForces: 0,
    totalForces: 551,
    percent: '0.00',
    
    enemies: [],
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

  loadDungeon(name) {
    const data = this.allDungeons[name];
    if (!data) return;

    const file = this.dungeonFiles[name];

    this.setData({
      currentDungeonName: name,
      mapImage: `/images/maps/${file}.jpg`,
      totalForces: data.totalForces,
      enemies: JSON.parse(JSON.stringify(data.enemies)),
      pulls: [{ color: '#ef4444', enemyIds: [], forces: 0 }],
      activePullIndex: 0,
      currentForces: 0,
      percent: '0.00',
      selectedEnemyInfo: null
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

  deletePull(e) {
    const index = Number(e.currentTarget.dataset.index);
    if (this.data.pulls.length <= 1) {
      this.clearActivePull();
      return;
    }
    
    wx.showModal({
      title: '删除拉怪批次',
      content: `确定要删除 Pull ${index + 1} 吗？已勾选的对应怪物将被移出路线。`,
      confirmText: '删除',
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return;
        let pulls = this.data.pulls;
        let enemies = this.data.enemies;
        const targetPull = pulls[index];
        
        targetPull.enemyIds.forEach(id => {
          const en = enemies.find(item => item.id === id);
          if (en) {
            en.selected = false;
            en.color = '';
          }
        });

        pulls.splice(index, 1);
        let newActive = Math.min(this.data.activePullIndex, pulls.length - 1);
        if (newActive < 0) newActive = 0;

        this.setData({ 
          pulls, 
          enemies, 
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
    let enemies = this.data.enemies;
    const activeIdx = this.data.activePullIndex;
    const targetPull = pulls[activeIdx];
    if (!targetPull || targetPull.enemyIds.length === 0) return;

    targetPull.enemyIds.forEach(id => {
      const en = enemies.find(item => item.id === id);
      if (en) {
        en.selected = false;
        en.color = '';
      }
    });

    targetPull.enemyIds = [];
    targetPull.forces = 0;

    this.setData({ 
      pulls, 
      enemies,
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
        let enemies = this.data.enemies;
        enemies.forEach(en => {
          en.selected = false;
          en.color = '';
        });
        this.setData({
          enemies,
          pulls: [{ color: this.data.pullColors[0], enemyIds: [], forces: 0 }],
          activePullIndex: 0,
          currentForces: 0,
          percent: '0.00',
          selectedEnemyInfo: null
        });
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

    // Find all enemies in the same pack
    let packEnemies = [target];
    if (target.pack !== null && target.pack !== undefined) {
      packEnemies = enemies.filter(en => en.pack === target.pack);
    }

    // Check if the target is already in a pull
    let existingPullIdx = -1;
    for (let i = 0; i < pulls.length; i++) {
      if (pulls[i].enemyIds.includes(id)) {
        existingPullIdx = i;
        break;
      }
    }

    let isSelectedNow = false;
    if (existingPullIdx !== -1) {
      // Remove all pack enemies from existing pull
      const packIds = packEnemies.map(en => en.id);
      pulls[existingPullIdx].enemyIds = pulls[existingPullIdx].enemyIds.filter(eId => !packIds.includes(eId));
      packEnemies.forEach(en => {
        en.selected = false;
        en.color = '';
      });
      isSelectedNow = false;
    } else {
      // Add all pack enemies to active pull
      packEnemies.forEach(en => {
        if (!pulls[activeIdx].enemyIds.includes(en.id)) {
          pulls[activeIdx].enemyIds.push(en.id);
          en.selected = true;
          en.color = pulls[activeIdx].color;
        }
      });
      isSelectedNow = true;
    }

    const totalEnemyForces = packEnemies.reduce((sum, en) => sum + en.forces, 0);
    const percentContributed = ((totalEnemyForces / this.data.totalForces) * 100).toFixed(2);

    this.setData({ 
      enemies, 
      pulls,
      selectedEnemyInfo: {
        name: target.name,
        isBoss: target.isBoss,
        forces: totalEnemyForces,
        percent: percentContributed,
        packCount: packEnemies.length,
        action: isSelectedNow ? `已添加至 Pull ${activeIdx + 1}` : '已移出路线'
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
    const enemies = this.data.enemies;

    pulls.forEach(p => {
      let pForce = 0;
      p.enemyIds.forEach(eid => {
        const e = enemies.find(en => en.id === eid);
        if (e) pForce += e.forces;
      });
      p.forces = pForce;
      current += pForce;
    });

    let percent = ((current / this.data.totalForces) * 100).toFixed(2);
    this.setData({ pulls, currentForces: current, percent });
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

      // Draw lines between enemies in this pull
      ctx.beginPath();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([]); // solid line for same pull

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

      // Calculate centroid of this pull
      const centerX = sumX / p.enemyIds.length;
      const centerY = sumY / p.enemyIds.length;

      // Draw dashed line connecting pulls
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
    wx.showActionSheet({
      itemList: this.dungeonNames,
      success: (res) => {
        const selectedName = this.dungeonNames[res.tapIndex];
        wx.showToast({ title: '加载中...', icon: 'loading' });
        this.loadDungeon(selectedName);
      }
    });
  }
});
