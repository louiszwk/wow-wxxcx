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
    const db = wx.cloud.database();
    db.collection('wow_guides').count().then(res => {
      // 只有在数据少于30条时才批量注入，防止重复插入
      if (res.total < 30) {
        wx.showLoading({ title: '正在初始化全职业39专精真实装备数据...' });
        
        const allGuides = require('../../data/wow_guides_data.js');

        // 分批插入数据库，避免云函数单次请求并发过高
        let count = 0;
        const insertBatch = () => {
          if (count >= allGuides.length) {
            wx.hideLoading();
            wx.showToast({ title: '全职业39专精数据补齐完成', icon: 'none', duration: 3000 });
            return;
          }
          db.collection('wow_guides').add({ data: allGuides[count] }).then(() => {
            count++;
            insertBatch();
          }).catch(err => {
            console.error('插入失败', err);
            count++;
            insertBatch();
          });
        };
        insertBatch();
      }
    });
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
    wx.showToast({
      title: '敬请期待',
      icon: 'none',
      duration: 2000
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
  goToInfiniteTalents() {
    wx.showToast({
      title: '敬请期待',
      icon: 'none',
      duration: 2000
    });
  },
  goToInfiniteClasses() { wx.navigateTo({ url: '/pages/infinite-classes/infinite-classes' }); },
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
