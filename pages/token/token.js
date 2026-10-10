Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    currentRegion: 'cn',
    price: { gold: '---' },
    lastUpdated: '--:--',
    isRefreshing: false
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

    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });
    this.fetchData();
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

  switchRegion(e) {
    const region = e.currentTarget.dataset.region;
    if (this.data.currentRegion === region) return;
    
    this.setData({ 
      currentRegion: region,
      price: { gold: '---' }
    });
    this.fetchData();
  },

  refreshData() {
    if (this.data.isRefreshing) return;
    this.fetchData();
  },

  fetchData() {
    this.setData({ isRefreshing: true });
    
    // 调用微信云开发中的爬虫云函数 (获取真实数据)
    wx.cloud.callFunction({
      name: 'getTokenPrice',
      data: {
        region: this.data.currentRegion
      },
      success: (res) => {
        if (res.result && res.result.success && res.result.data) {
          const now = new Date();
          const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
          
          this.setData({
            price: { gold: (res.result.data.price || 0).toLocaleString() },
            lastUpdated: timeString,
            isRefreshing: false
          });
        } else {
          console.warn('云函数抓取失败', res);
          this.setData({
            price: { gold: '数据错误' },
            isRefreshing: false
          });
          wx.showToast({ title: '抓取失败，请检查云函数日志', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('云函数调用异常:', err);
        this.setData({
          price: { gold: '调用失败' },
          isRefreshing: false
        });
        wx.showToast({ title: '请求超时或云环境未部署', icon: 'none' });
      }
    });
  }
});
