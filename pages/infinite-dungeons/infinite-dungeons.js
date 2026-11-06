const { INFINITE_DUNGEONS, INFINITE_RAIDS } = require('../../data/infinite_data.js');
const { INFINITE_MDT_DUNGEONS } = require('../../data/infinite_mdt_data.js');

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    activeTab: 'dungeons', // 'dungeons' | 'raids'
    viewMode: 'list', // 'list' | 'mdt'
    searchKeyword: '',
    
    // 列表模式数据
    allDungeons: [],
    displayDungeons: [],
    allRaids: [],
    displayRaids: [],

    // MDT 地图与怪物浏览模式数据 (无需规划路线)
    mdtDungeons: [],
    currentMdtIndex: 0,
    currentMdtDungeon: null,
    
    // 地图缩放与平移
    scaleValue: 1.0,
    scalePercent: 100,
    mapX: 0,
    mapY: 0,

    // MDT 怪物详情机制弹窗
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
    const firstMdt = INFINITE_MDT_DUNGEONS[0] || null;

    this.setData({
      theme: savedTheme,
      allDungeons: INFINITE_DUNGEONS,
      displayDungeons: INFINITE_DUNGEONS,
      allRaids: INFINITE_RAIDS,
      displayRaids: INFINITE_RAIDS,
      mdtDungeons: INFINITE_MDT_DUNGEONS,
      currentMdtIndex: 0,
      currentMdtDungeon: firstMdt
    });

    if (options && options.mode === 'mdt') {
      this.setData({ viewMode: 'mdt' });
    }
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
    this.setData({ viewMode: mode });
  },

  // 从列表卡片直接一键打开该副本的 MDT 地图
  openDungeonMdt(e) {
    const dungeonId = e.currentTarget.dataset.id;
    const foundIndex = this.data.mdtDungeons.findIndex(d => d.id === dungeonId);
    const targetIndex = foundIndex !== -1 ? foundIndex : 0;
    this.setData({
      viewMode: 'mdt',
      currentMdtIndex: targetIndex,
      currentMdtDungeon: this.data.mdtDungeons[targetIndex],
      scaleValue: 1.0,
      scalePercent: 100,
      mapX: 0,
      mapY: 0
    });
  },

  selectMdtDungeon(e) {
    const index = parseInt(e.currentTarget.dataset.index, 10);
    this.setData({
      currentMdtIndex: index,
      currentMdtDungeon: this.data.mdtDungeons[index],
      scaleValue: 1.0,
      scalePercent: 100,
      mapX: 0,
      mapY: 0
    });
  },

  // 缩放控制
  zoomIn() {
    let next = Math.min(3.0, (this.data.scaleValue + 0.3));
    next = Math.round(next * 10) / 10;
    this.setData({
      scaleValue: next,
      scalePercent: Math.round(next * 100)
    });
  },

  zoomOut() {
    let next = Math.max(0.7, (this.data.scaleValue - 0.3));
    next = Math.round(next * 10) / 10;
    this.setData({
      scaleValue: next,
      scalePercent: Math.round(next * 100)
    });
  },

  resetZoom() {
    this.setData({
      scaleValue: 1.0,
      scalePercent: 100,
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

  // 轻触地图上任意怪物或首领，弹出 MDT 技能机制详情弹窗
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
    return {
      title: '魔兽世界无限服 - 首发9大全新地下城MDT地图与怪物机制',
      path: '/pages/infinite-dungeons/infinite-dungeons'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界无限服 - 首发9大全新地下城MDT地图与怪物机制',
      path: '/pages/infinite-dungeons/infinite-dungeons'
    };
  }
});
