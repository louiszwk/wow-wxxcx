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

    if (options.class && options.slug && options.specs) {
      try {
        const specsObj = JSON.parse(decodeURIComponent(options.specs));
        let activeIndex = 0;
        if (options.spec) {
          const foundIdx = specsObj.findIndex(s => s.id === options.spec);
          if (foundIdx !== -1) activeIndex = foundIdx;
        }
        this.setData({ 
          className: decodeURIComponent(options.class),
          classSlug: options.slug,
          specs: specsObj,
          activeSpec: activeIndex
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
    if (!currentSpec) {
      this.setData({ isLoading: false });
      return;
    }

    try {
      if (wx.cloud && typeof wx.cloud.database === 'function') {
        const db = wx.cloud.database();
        db.collection('wow_guides').where({
          classSlug: this.data.classSlug,
          specId: currentSpec.id
        }).get({
          success: (res) => {
            if (res.data && res.data.length > 0 && res.data[0].gear && res.data[0].gear.left && res.data[0].talents && !res.data[0].talents.mythicPlus.includes('...')) {
              this.applyGuideData(res.data[0]);
            } else {
              this.loadLocalGuide(this.data.classSlug, currentSpec.id);
            }
          },
          fail: () => {
            this.loadLocalGuide(this.data.classSlug, currentSpec.id);
          }
        });
        return;
      }
    } catch (err) {
      console.warn('云函数或数据库暂不可用，使用内置攻略:', err);
    }

    this.loadLocalGuide(this.data.classSlug, currentSpec.id);
  },

  applyGuideData(data) {
    this.setData({
      guideData: data,
      leftGear: data.gear && data.gear.left ? data.gear.left : [],
      rightGear: data.gear && data.gear.right ? data.gear.right : [],
      weapons: data.gear && data.gear.weapons ? data.gear.weapons : [],
      isLoading: false
    });
  },

  loadLocalGuide(classSlug, specId) {
    try {
      const allGuides = require('../../data/wow_guides_data.js');
      const found = allGuides.find(g => g.classSlug === classSlug && g.specId === specId);
      if (found) {
        this.applyGuideData(found);
        return;
      }
      
      const { getSpecGuide } = require('../../data/spec_guides_data.js');
      const fallbackGuide = getSpecGuide(classSlug, specId);
      if (fallbackGuide) {
        this.applyGuideData({
          classSlug,
          specId,
          statPriority: fallbackGuide.statPriority,
          statDesc: fallbackGuide.statDesc,
          talents: fallbackGuide.talents,
          consumables: fallbackGuide.consumables,
          rotation: fallbackGuide.rotation,
          gear: { left: [], right: [], weapons: [] }
        });
        return;
      }
    } catch (e) {
      console.error('加载本地攻略数据失败:', e);
    }
    this.setData({
      guideData: null,
      leftGear: [],
      rightGear: [],
      weapons: [],
      isLoading: false
    });
  },

  navigateBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
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
,
  onShareAppMessage() {
    return {
      title: '魔兽世界全职业 BiS 毕业装备详情',
      path: '/pages/bis-detail/bis-detail'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界全职业 BiS 毕业装备详情',
      path: '/pages/bis-detail/bis-detail'
    };
  }
});
