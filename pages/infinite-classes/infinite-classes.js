const { WOW_RACES, WOW_CLASSES } = require('../../data/infinite_data.js');

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    activeTab: 'races', // 'races' | 'classes'
    raceFilter: 'all', // 'all' | 'alliance' | 'horde' | 'new'
    filterList: [
      { id: 'all', label: '全部种族' },
      { id: 'new', label: '🌌 无限服新种族' },
      { id: 'alliance', label: '🛡️ 联盟' },
      { id: 'horde', label: '⚔️ 部落' }
    ],
    allRaces: [],
    displayRaces: [],
    allClasses: []
  },

  onLoad() {
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
    this.setData({
      theme: savedTheme,
      allRaces: WOW_RACES,
      displayRaces: WOW_RACES,
      allClasses: WOW_CLASSES
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

  setRaceFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    const { allRaces } = this.data;
    let filtered = allRaces;

    if (filter === 'new') {
      filtered = allRaces.filter(r => r.id === 'race_celestial' || (r.badge && r.badge.includes('无限服')));
    } else if (filter === 'alliance') {
      filtered = allRaces.filter(r => r.factionType === 'alliance' || r.factionType === 'neutral');
    } else if (filter === 'horde') {
      filtered = allRaces.filter(r => r.factionType === 'horde' || r.factionType === 'neutral');
    }

    this.setData({
      raceFilter: filter,
      displayRaces: filtered
    });
  },
  onShareAppMessage() {
    return {
      title: '魔兽世界无限服 - 新种族天裔精灵与全职业解析',
      path: '/pages/infinite-classes/infinite-classes'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界无限服 - 新种族天裔精灵与全职业解析',
      path: '/pages/infinite-classes/infinite-classes'
    };
  }
});
