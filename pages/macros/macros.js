// pages/macros/macros.js
const { MACRO_CATEGORIES } = require('../../data/wow_macros_data.js');

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    categories: MACRO_CATEGORIES,
    activeCategoryIndex: 0,
    searchQuery: '',
    selectedTag: '全部',
    filterTags: ['全部', '打断', '爆发', '指向', '保命', '控制', '驱散', '位移'],
    displayedMacros: [],
    totalMacroCount: 0
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const app = getApp();
    if (app.globalData) {
      this.setData({
        navBarHeight: app.globalData.navBarHeight || 80,
        menuButtonTop: app.globalData.menuButtonTop || 40,
        menuButtonHeight: app.globalData.menuButtonHeight || 32
      });
    }

    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });

    // 计算总宏数量
    let total = 0;
    MACRO_CATEGORIES.forEach(cat => {
      total += (cat.macros || []).length;
    });

    this.setData({ totalMacroCount: total });
    this.updateDisplayedMacros();
  },

  switchCategory(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeCategoryIndex: index,
      searchQuery: '',
      selectedTag: '全部'
    }, () => {
      this.updateDisplayedMacros();
    });
  },

  onSearchInput(e) {
    const query = e.detail.value.trim();
    this.setData({ searchQuery: query }, () => {
      this.updateDisplayedMacros();
    });
  },

  clearSearch() {
    this.setData({ searchQuery: '' }, () => {
      this.updateDisplayedMacros();
    });
  },

  selectTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({ selectedTag: tag }, () => {
      this.updateDisplayedMacros();
    });
  },

  updateDisplayedMacros() {
    const query = this.data.searchQuery.toLowerCase();
    const tag = this.data.selectedTag;

    // 如果处于全局关键词搜索状态，跨越所有分类检索
    if (query) {
      let results = [];
      MACRO_CATEGORIES.forEach(cat => {
        (cat.macros || []).forEach(m => {
          const matchTitle = m.title.toLowerCase().includes(query);
          const matchDesc = m.desc.toLowerCase().includes(query);
          const matchCode = m.code.toLowerCase().includes(query);
          const matchTag = m.tag && m.tag.toLowerCase().includes(query);
          const matchCat = cat.category.toLowerCase().includes(query);

          if (matchTitle || matchDesc || matchCode || matchTag || matchCat) {
            results.push({ ...m, categoryName: cat.category });
          }
        });
      });
      this.setData({ displayedMacros: results });
      return;
    }

    // 否则按当前分类与 Tag 过滤
    const currentCategory = this.data.categories[this.data.activeCategoryIndex];
    if (!currentCategory) {
      this.setData({ displayedMacros: [] });
      return;
    }

    let list = currentCategory.macros || [];
    if (tag && tag !== '全部') {
      list = list.filter(m => m.tag === tag);
    }

    const decorated = list.map(m => ({
      ...m,
      categoryName: currentCategory.category
    }));

    this.setData({ displayedMacros: decorated });
  },

  copyMacro(e) {
    const code = e.currentTarget.dataset.code;
    const title = e.currentTarget.dataset.title || '宏命令';
    if (wx.vibrateShort) {
      wx.vibrateShort({ type: 'light' });
    }
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({
          title: '已复制到剪贴板！',
          icon: 'success',
          duration: 1800
        });
      }
    });
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '魔兽世界全职业终极宏命令大全 (80+条一键复制)',
      path: '/pages/macros/macros'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界全职业终极宏命令大全 (80+条一键复制)',
      path: '/pages/macros/macros'
    };
  }
});
