Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    newsList: [],
    isLoading: true,
    hasError: false
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
    this.fetchNews();
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

  fetchNews() {
    this.setData({ isLoading: true, hasError: false, isTranslatingAll: false });

    wx.cloud.callFunction({
      name: 'getWowNews',
      success: (res) => {
        if (res.result && res.result.success && res.result.data) {
          const formattedList = res.result.data.map(item => {
            const d = new Date(item.pubDate || item.formattedDate);
            item.formattedDate = `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
            item.expanded = false; // 初始收起详情
            return item;
          });
          this.setData({
            newsList: formattedList,
            isLoading: false
          });
        } else {
          console.warn('云函数抓取蓝贴失败', res);
          this.setData({ isLoading: false, hasError: true });
        }
      },
      fail: (err) => {
        console.error('调用云函数失败:', err);
        this.setData({ isLoading: false, hasError: true });
      }
    });
  },

  toggleExpand(e) {
    const index = e.currentTarget.dataset.index;
    const currentList = this.data.newsList;
    currentList[index].expanded = !currentList[index].expanded;
    this.setData({ newsList: currentList });
  },

  translateAll() {
    if (!this.data.newsList || this.data.newsList.length === 0) return;
    
    this.setData({ isTranslatingAll: true });

    // 只翻译标题，为了快速展示
    const titlesToTranslate = this.data.newsList.map(item => item.title);

    wx.cloud.callFunction({
      name: 'translateNews',
      data: {
        texts: titlesToTranslate
      },
      success: (res) => {
        if (res.result && res.result.success && res.result.data) {
          const translatedTitles = res.result.data;
          const newList = this.data.newsList.map((item, idx) => {
            if (translatedTitles[idx]) {
              item.title = translatedTitles[idx];
              item.isTranslated = true;
            }
            return item;
          });
          this.setData({ newsList: newList });
          wx.showToast({ title: '翻译成功', icon: 'success' });
        } else {
          wx.showToast({ title: '翻译服务异常', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('翻译失败:', err);
        wx.showToast({ title: '翻译请求超时', icon: 'none' });
      },
      complete: () => {
        this.setData({ isTranslatingAll: false });
      }
    });
  }
});
