// pages/bis-detail/bis-detail.js
Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    className: '',
    classSlug: '',
    specs: [],
    activeSpec: 0,
    modes: ['大秘境高层榜首配装 (实战BiS)'],
    activeMode: 0,
    
    isLoading: true,
    playerInfo: '',
    
    leftGear: [],
    rightGear: [],
    weapons: [],
    stats: {
      crit: 0, haste: 0, mastery: 0, vers: 0
    }
  },
  
  onLoad(options) {
    const app = getApp();
    if (app.globalData) {
      this.setData({
        navBarHeight: app.globalData.navBarHeight,
        menuButtonTop: app.globalData.menuButtonTop,
        menuButtonHeight: app.globalData.menuButtonHeight
      });
    }

    if (options.class && options.slug && options.specs) {
      try {
        const specsObj = JSON.parse(decodeURIComponent(options.specs));
        this.setData({ 
          className: decodeURIComponent(options.class),
          classSlug: options.slug,
          specs: specsObj
        });
        this.fetchDynamicBisGear();
      } catch (e) {
        console.error(e);
      }
    }
  },

  fetchDynamicBisGear() {
    this.setData({ isLoading: false });
    wx.showToast({
      title: '数据更新中，敬请期待',
      icon: 'none',
      duration: 3000
    });
  },

  navigateBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.switchTab({ url: '/pages/index/index' });
      }
    });
  },

  switchSpec(e) {
    this.setData({ activeSpec: e.currentTarget.dataset.index });
    this.fetchDynamicBisGear();
  },

  switchMode(e) {
    this.setData({ activeMode: e.currentTarget.dataset.index });
  },

  openItemStats(e) {
    const itemName = e.currentTarget.dataset.name;
    if (!itemName) return;
    // 点击装备后，通过小程序的 WebView 跳转到 Wowhead 对应的物品搜索页（自带详细属性弹窗效果）
    const searchUrl = `https://www.wowhead.com/search?q=${encodeURIComponent(itemName)}`;
    wx.navigateTo({
      url: `/pages/webview/webview?url=${encodeURIComponent(searchUrl)}`
    });
  }
});
