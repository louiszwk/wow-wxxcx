Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    link: '',
    htmlContent: '',
    isLoading: true,
    hasError: false,
    statusBarHeight: 20
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

    const sysInfo = wx.getSystemInfoSync();
    this.setData({ statusBarHeight: sysInfo.statusBarHeight || 20 });
    
    if (options.link) {
      const link = decodeURIComponent(options.link);
      this.setData({ link });
      if (options.title) {
        wx.setNavigationBarTitle({ title: decodeURIComponent(options.title) });
      }
      this.fetchArticleDetail(link);
    } else {
      this.setData({ isLoading: false, hasError: true });
    }
  },

  fetchArticleDetail(url) {
    wx.cloud.callFunction({
      name: 'getWowNewsDetail',
      data: { url },
      success: (res) => {
        if (res.result && res.result.success && res.result.data) {
          // 处理小程序富文本图片自适应问题
          let html = res.result.data;
          html = html.replace(/<img[^>]*>/gi, function(match) {
            match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
            match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
            match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
            return match.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:10px 0;border-radius:8px;"');
          });

          this.setData({
            htmlContent: html,
            isLoading: false
          });
        } else {
          console.warn('获取文章失败:', res);
          this.setData({ isLoading: false, hasError: true });
        }
      },
      fail: (err) => {
        console.error('云函数调用失败:', err);
        this.setData({ isLoading: false, hasError: true });
      }
    });
  },

  goBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.switchTab({
          url: '/pages/index/index' // fallback
        });
      }
    });
  }
});
