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
    sectionTabs: ['天赋&物资', '输出循环', 'BiS装备'],
    activeSection: 0,
    
    isLoading: true,
    playerInfo: '',
    
    guideData: null,
    leftGear: [],
    rightGear: [],
    weapons: []
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
    this.setData({ isLoading: true });
    
    const currentSpec = this.data.specs[this.data.activeSpec];
    const db = wx.cloud.database();
    
    db.collection('wow_guides').where({
      classSlug: this.data.classSlug,
      specId: currentSpec.id
    }).get({
      success: (res) => {
        if (res.data && res.data.length > 0) {
          const data = res.data[0];
          this.setData({
            guideData: data,
            leftGear: data.gear && data.gear.left ? data.gear.left : [],
            rightGear: data.gear && data.gear.right ? data.gear.right : [],
            weapons: data.gear && data.gear.weapons ? data.gear.weapons : [],
            isLoading: false
          });
        } else {
          // 数据库中未找到该专精的攻略
          this.setData({
            guideData: null,
            leftGear: [],
            rightGear: [],
            weapons: [],
            isLoading: false
          });
        }
      },
      fail: (err) => {
        console.error('获取攻略失败:', err);
        this.setData({ isLoading: false });
        wx.showToast({ title: '数据库连接失败', icon: 'none' });
      }
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

  switchSection(e) {
    this.setData({ activeSection: e.currentTarget.dataset.index });
  },

  copyTalent(e) {
    const string = e.currentTarget.dataset.code;
    if (string.includes('暂无')) {
      wx.showToast({ title: '暂无可用代码', icon: 'none' });
      return;
    }
    wx.setClipboardData({
      data: string,
      success: () => {
        wx.showToast({ title: '天赋已复制', icon: 'success' });
      }
    });
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
