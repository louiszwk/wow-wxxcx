Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'light'
  },

  onLoad() {
    const app = getApp();
    if (app.globalData) {
      this.setData({
        navBarHeight: app.globalData.navBarHeight,
        menuButtonTop: app.globalData.menuButtonTop,
        menuButtonHeight: app.globalData.menuButtonHeight
      });
    }

    const savedTheme = wx.getStorageSync('app_theme') || 'light';
    this.setData({ theme: savedTheme });
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'light';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateToLoot() {
    wx.navigateTo({
      url: '/pages/loot/loot'
    });
  },

  navigateToBis() {
    wx.showToast({
      title: '敬请期待',
      icon: 'none',
      duration: 2000
    });
  },

  navigateToMeta() {
    wx.navigateTo({
      url: '/pages/meta/meta'
    });
  },

  navigateToTopMeta() {
    wx.navigateTo({
      url: '/pages/topmeta/topmeta'
    });
  },

  navigateToToken() {
    wx.navigateTo({
      url: '/pages/token/token'
    });
  },

  navigateToNews() {
    wx.navigateTo({
      url: '/pages/news/news'
    });
  }
});
