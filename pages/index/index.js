Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    tokenPrice: '获取中...',
    tokenError: false,
    affixes: [],
    isLoadingAffixes: true,
    affixError: false,
    currentTab: 'retail'
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
    this.setData({ theme: savedTheme });

    this.fetchTokenPrice();
    this.fetchAffixes();
    this.autoSeedDatabase();
  },

  autoSeedDatabase() {
    try {
      if (!wx.cloud || typeof wx.cloud.database !== 'function') return;
      const db = wx.cloud.database();
      db.collection('wow_guides').count().then(res => {
        if (res && res.total < 30) {
          const allGuides = require('../../data/wow_guides_data.js');
          let count = 0;
          const insertBatch = () => {
            if (count >= allGuides.length) return;
            db.collection('wow_guides').add({ data: allGuides[count] }).then(() => {
              count++;
              insertBatch();
            }).catch(() => {
              count++;
              insertBatch();
            });
          };
          insertBatch();
        }
      }).catch(() => {
        // 静默跳过，本地已有完整 39 专精数据，不影响用户使用
      });
    } catch (e) {
      // 容错处理
    }
  },

  fetchTokenPrice() {
    this.setData({ tokenPrice: '获取中...', tokenError: false });

    wx.cloud.callFunction({
      name: 'getTokenPrice',
      data: { region: 'cn' },
      success: (res) => {
        if (res.result && res.result.data && res.result.data.price) {
          this.setData({
            tokenPrice: res.result.data.price.toLocaleString(),
            tokenError: false
          });
        } else {
          this.setData({
            tokenPrice: '获取失败',
            tokenError: true
          });
        }
      },
      fail: (err) => {
        console.error('获取时光徽章价格失败:', err);
        this.setData({
          tokenPrice: '获取失败',
          tokenError: true
        });
      }
    });
  },

  fetchAffixes() {
    this.setData({ isLoadingAffixes: true, affixError: false });

    wx.cloud.callFunction({
      name: 'proxyRequest',
      data: {
        url: 'https://raider.io/api/v1/mythic-plus/affixes?region=cn&locale=zh',
        method: 'GET'
      },
      success: (res) => {
        if (res.result && res.result.success && res.result.data) {
          let affixes = res.result.data.affix_details || [];

          // 词缀名称简写与汉化映射表
          const shortMap = {
            '萨拉塔斯的交易：虚空': '虚空',
            "Xal'atath's Bargain: Void": '虚空',
            '萨拉塔斯的交易：遗忘': '遗忘',
            "Xal'atath's Bargain: Oblivion": '遗忘',
            '萨拉塔斯的交易：吞噬': '吞噬',
            "Xal'atath's Bargain: Devour": '吞噬',
            '萨拉塔斯的交易：晋升': '晋升',
            "Xal'atath's Bargain: Ascendant": '晋升',
            '挑战者的祸患': '祸患',
            "Challenger's Peril": '祸患',
            'Fortified': '强韧',
            'Tyrannical': '残暴'
          };

          affixes = affixes.map(a => {
            let n = a.name;
            for (let key in shortMap) {
              if (n.includes(key)) n = n.replace(key, shortMap[key]);
            }
            return { ...a, name: n };
          }).filter(a => /[\u4e00-\u9fa5]/.test(a.name));

          this.setData({
            affixes,
            isLoadingAffixes: false,
            affixError: affixes.length === 0
          });
        } else {
          this.setData({ isLoadingAffixes: false, affixError: true });
        }
      },
      fail: (err) => {
        console.error('获取词缀失败:', err);
        this.setData({ isLoadingAffixes: false, affixError: true });
      }
    });
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateToMacros() {
    wx.navigateTo({
      url: '/pages/macros/macros'
    });
  },

  navigateToLoot() {
    wx.navigateTo({
      url: '/pages/loot/loot'
    });
  },

  navigateToBuild() {
    wx.navigateTo({
      url: '/pages/build/build'
    });
  },

  navigateToBis() {
    wx.navigateTo({
      url: '/pages/bis/bis'
    });
  },

  navigateToMdt() {
    wx.navigateTo({
      url: '/pages/mdt/list'
    });
  },

  switchMainTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.currentTab) return;
    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
    this.setData({ currentTab: tab });
  },

  goToInfiniteMap() { wx.navigateTo({ url: '/pages/infinite-map/infinite-map' }); },
  goToInfiniteTalents() { wx.navigateTo({ url: '/pages/infinite-talents/infinite-talents' }); },
  goToInfiniteClasses() { wx.navigateTo({ url: '/pages/infinite-classes/infinite-classes' }); },
  goToInfiniteDungeons() { wx.navigateTo({ url: '/pages/infinite-dungeons/infinite-dungeons' }); },
  goToInfiniteWishes() { wx.navigateTo({ url: '/pages/infinite-wishes/infinite-wishes' }); },
  goToInfiniteTerms() { wx.navigateTo({ url: '/pages/infinite-terms/infinite-terms' }); },

  onSubtitleTap() {
    const now = Date.now();
    if (this.lastClickTime && (now - this.lastClickTime > 2000)) {
      this.subtitleClickCount = 0;
    }
    this.lastClickTime = now;
    this.subtitleClickCount = (this.subtitleClickCount || 0) + 1;
    
    if (this.subtitleClickCount >= 5) {
      this.subtitleClickCount = 0;
      wx.showModal({
        title: '身份验证',
        content: '',
        editable: true,
        placeholderText: '请输入管理员密码',
        success: (res) => {
          if (res.confirm && res.content === 'louiskkk') {
            wx.navigateTo({ url: '/pages/admin/admin' });
          } else if (res.confirm) {
            wx.showToast({ title: '密码错误', icon: 'error' });
          }
        }
      });
    }
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
  }
,
  onShareAppMessage() {
    return {
      title: '艾泽拉斯的微风 - 魔兽世界核心向工具箱',
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return {
      title: '艾泽拉斯的微风 - 魔兽世界核心向工具箱',
      path: '/pages/index/index'
    };
  }
});
