const { INFINITE_DUNGEONS, INFINITE_RAIDS } = require('../../data/infinite_data.js');
const { INFINITE_MDT_DUNGEONS } = require('../../data/infinite_mdt_data.js');

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    activeTab: 'dungeons', // 'dungeons' | 'raids'
    viewMode: 'list', // 'list' | 'mdt' (地下城与怪物速览)
    searchKeyword: '',
    
    // 列表模式数据
    allDungeons: INFINITE_DUNGEONS || [],
    displayDungeons: INFINITE_DUNGEONS || [],
    allRaids: INFINITE_RAIDS || [],
    displayRaids: INFINITE_RAIDS || [],

    // 地下城与怪物浏览模式数据 (无需规划路线)
    mdtDungeons: INFINITE_MDT_DUNGEONS || [],
    currentMdtIndex: 0,
    currentMdtDungeon: (INFINITE_MDT_DUNGEONS && INFINITE_MDT_DUNGEONS.length > 0) ? INFINITE_MDT_DUNGEONS[0] : null,
    
    // 地图缩放与平移 (自动适配屏幕宽度)
    fitScale: 0.52,
    scaleValue: 0.52,
    scalePercent: 52,
    mapX: 0,
    mapY: 0,

    // 怪物详情机制弹窗
    showEnemyModal: false,
    inspectedEnemy: null
  },

  onLoad(options) {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const app = getApp();
    if (app.globalData) {
      this.setData({
        navBarHeight: app.globalData.navBarHeight,
        menuButtonTop: app.globalData.menuButtonTop,
        menuButtonHeight: app.globalData.menuButtonHeight
      });
    }

    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    
    // 动态计算适合手机屏幕的初始缩放比，确保整张副本地图完整显示不被裁剪
    let fitScale = 0.52;
    try {
      const sys = wx.getSystemInfoSync();
      if (sys && sys.windowWidth) {
        // 地图基准宽度为 680px，留出 32px 两侧边距
        fitScale = Math.min(1.0, Math.max(0.46, Math.round(((sys.windowWidth - 32) / 680) * 100) / 100));
      }
    } catch (e) {
      fitScale = 0.52;
    }

    let initialIndex = 0;
    let initialMode = (options && options.mode) ? options.mode : 'list';

    if (options && options.dungeonId) {
      const foundIdx = INFINITE_MDT_DUNGEONS.findIndex(d => d.id === options.dungeonId);
      if (foundIdx !== -1) {
        initialIndex = foundIdx;
        if (!options.mode) initialMode = 'mdt';
      }
    }

    const firstMdt = INFINITE_MDT_DUNGEONS[initialIndex] || INFINITE_MDT_DUNGEONS[0] || null;

    this.setData({
      theme: savedTheme,
      allDungeons: INFINITE_DUNGEONS,
      displayDungeons: INFINITE_DUNGEONS,
      allRaids: INFINITE_RAIDS,
      displayRaids: INFINITE_RAIDS,
      mdtDungeons: INFINITE_MDT_DUNGEONS,
      currentMdtIndex: initialIndex,
      currentMdtDungeon: firstMdt,
      viewMode: initialMode,
      fitScale,
      scaleValue: fitScale,
      scalePercent: Math.round(fitScale * 100)
    });
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  navigateBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  switchViewMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ 
      viewMode: mode,
      scaleValue: this.data.fitScale,
      scalePercent: Math.round(this.data.fitScale * 100),
      mapX: 0,
      mapY: 0
    }, () => {
      if (wx.pageScrollTo) wx.pageScrollTo({ scrollTop: 0, duration: 100 });
    });
  },

  // 从列表卡片直接一键打开该地下城的全景地图
  openDungeonMdt(e) {
    const dungeonId = e.currentTarget.dataset.id;
    const foundIndex = this.data.mdtDungeons.findIndex(d => d.id === dungeonId);
    const targetIndex = foundIndex !== -1 ? foundIndex : 0;
    this.setData({
      viewMode: 'mdt',
      currentMdtIndex: targetIndex,
      currentMdtDungeon: this.data.mdtDungeons[targetIndex],
      scaleValue: this.data.fitScale,
      scalePercent: Math.round(this.data.fitScale * 100),
      mapX: 0,
      mapY: 0
    }, () => {
      if (wx.pageScrollTo) wx.pageScrollTo({ scrollTop: 0, duration: 100 });
    });
  },

  selectMdtDungeon(e) {
    const index = parseInt(e.currentTarget.dataset.index, 10);
    this.setData({
      currentMdtIndex: index,
      currentMdtDungeon: this.data.mdtDungeons[index],
      scaleValue: this.data.fitScale,
      scalePercent: Math.round(this.data.fitScale * 100),
      mapX: 0,
      mapY: 0
    });
  },

  // 缩放控制
  zoomIn() {
    let next = Math.min(2.5, (this.data.scaleValue + 0.2));
    next = Math.round(next * 10) / 10;
    this.setData({
      scaleValue: next,
      scalePercent: Math.round(next * 100)
    });
  },

  zoomOut() {
    let next = Math.max(0.38, (this.data.scaleValue - 0.2));
    next = Math.round(next * 10) / 10;
    this.setData({
      scaleValue: next,
      scalePercent: Math.round(next * 100)
    });
  },

  resetZoom() {
    this.setData({
      scaleValue: this.data.fitScale,
      scalePercent: Math.round(this.data.fitScale * 100),
      mapX: 0,
      mapY: 0
    });
  },

  onScaleChange(e) {
    if (e.detail && e.detail.scale) {
      this.setData({
        scalePercent: Math.round(e.detail.scale * 100)
      });
    }
  },

  // 轻触地图上任意怪物或首领，弹出技能机制详情弹窗
  inspectEnemy(e) {
    const enemy = e.currentTarget.dataset.enemy;
    if (!enemy) return;
    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
    this.setData({
      inspectedEnemy: enemy,
      showEnemyModal: true
    });
  },

  closeEnemyModal() {
    this.setData({ showEnemyModal: false });
  },

  stopPropagation() {},

  // 搜索处理
  onSearchInput(e) {
    const keyword = (e.detail.value || '').trim().toLowerCase();
    this.setData({ searchKeyword: keyword });
    this.filterContent(keyword);
  },

  clearSearch() {
    this.setData({ searchKeyword: '' });
    this.filterContent('');
  },

  filterContent(keyword) {
    const { allDungeons, allRaids } = this.data;
    if (!keyword) {
      this.setData({
        displayDungeons: allDungeons,
        displayRaids: allRaids
      });
      return;
    }

    const filteredD = allDungeons.filter(d => 
      d.name.toLowerCase().includes(keyword) ||
      d.location.toLowerCase().includes(keyword) ||
      d.overview.toLowerCase().includes(keyword) ||
      (d.dropsHighlight && d.dropsHighlight.toLowerCase().includes(keyword)) ||
      d.bosses.some(b => b.toLowerCase().includes(keyword))
    );

    const filteredR = allRaids.filter(r => 
      r.name.toLowerCase().includes(keyword) ||
      r.location.toLowerCase().includes(keyword) ||
      r.overview.toLowerCase().includes(keyword) ||
      (r.dropsHighlight && r.dropsHighlight.toLowerCase().includes(keyword)) ||
      r.bosses.some(b => b.toLowerCase().includes(keyword))
    );

    this.setData({
      displayDungeons: filteredD,
      displayRaids: filteredR
    });
  },

  onShareAppMessage() {
    const dungeon = this.data.currentMdtDungeon || this.data.allDungeons[0];
    const dungeonName = dungeon ? dungeon.name : '9大地下城';
    return {
      title: `魔兽世界无限服 - ${dungeonName}地图与怪物技能速查`,
      path: `/pages/infinite-dungeons/infinite-dungeons?dungeonId=${dungeon ? dungeon.id : ''}&mode=${this.data.viewMode}`
    };
  },

  onShareTimeline() {
    const dungeon = this.data.currentMdtDungeon || this.data.allDungeons[0];
    const dungeonName = dungeon ? dungeon.name : '9大地下城';
    return {
      title: `魔兽世界无限服 - ${dungeonName}地图与怪物技能速查`,
      path: `/pages/infinite-dungeons/infinite-dungeons?dungeonId=${dungeon ? dungeon.id : ''}&mode=${this.data.viewMode}`
    };
  }
});
