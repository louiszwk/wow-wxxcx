const { WOW_TERMS } = require('../../data/infinite_data.js');

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    searchKeyword: '',
    currentCategory: 'all',
    categoryList: [
      { id: 'all', label: '全部术语' },
      { id: 'forever', label: '🌌 无限服新系统' },
      { id: 'mechanics', label: '核心机制' },
      { id: 'tactics', label: '战斗走位' },
      { id: 'raid', label: '团本大米' },
      { id: 'gear', label: '经典神装' },
      { id: 'social', label: '社交行话' }
    ],
    terms: [],
    displayTerms: [],
    favTerms: {},
    // 投稿弹窗
    showModal: false,
    formTerm: '',
    formAlias: '',
    formCategoryIndex: 0,
    formCategories: [
      { id: 'forever', name: '无限服新系统' },
      { id: 'mechanics', name: '核心机制' },
      { id: 'tactics', name: '战斗走位' },
      { id: 'raid', name: '团本大米' },
      { id: 'gear', name: '经典神装' },
      { id: 'social', name: '社交行话' }
    ],
    formDefinition: '',
    formExample: ''
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
    const favTerms = wx.getStorageSync('infinite_fav_terms') || {};
    const localUserTerms = wx.getStorageSync('infinite_user_terms') || [];

    const combinedTerms = [...localUserTerms, ...WOW_TERMS];

    this.setData({
      theme: savedTheme,
      terms: combinedTerms,
      displayTerms: combinedTerms,
      favTerms
    });
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
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

  onSearchInput(e) {
    const searchKeyword = e.detail.value.trim().toLowerCase();
    this.setData({ searchKeyword }, () => {
      this.applyFilter();
    });
  },

  clearSearch() {
    this.setData({ searchKeyword: '' }, () => {
      this.applyFilter();
    });
  },

  selectCategory(e) {
    const cat = e.currentTarget.dataset.id;
    this.setData({ currentCategory: cat }, () => {
      this.applyFilter();
    });
  },

  applyFilter() {
    const { terms, currentCategory, searchKeyword } = this.data;
    let list = terms;

    if (currentCategory !== 'all') {
      list = list.filter(t => t.category === currentCategory);
    }

    if (searchKeyword) {
      list = list.filter(t => {
        const termMatch = t.term.toLowerCase().includes(searchKeyword);
        const aliasMatch = (t.alias || '').toLowerCase().includes(searchKeyword);
        const defMatch = (t.definition || '').toLowerCase().includes(searchKeyword);
        const exMatch = (t.example || '').toLowerCase().includes(searchKeyword);
        return termMatch || aliasMatch || defMatch || exMatch;
      });
    }

    this.setData({ displayTerms: list });
  },

  toggleFav(e) {
    const id = e.currentTarget.dataset.id;
    const { favTerms } = this.data;
    const newFav = { ...favTerms };

    if (newFav[id]) {
      delete newFav[id];
      wx.showToast({ title: '已取消收藏', icon: 'none' });
    } else {
      newFav[id] = true;
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      wx.showToast({ title: '已加入收藏', icon: 'success' });
    }

    wx.setStorageSync('infinite_fav_terms', newFav);
    this.setData({ favTerms: newFav });
  },

  copyTermExplanation(e) {
    const { term, def } = e.currentTarget.dataset;
    const text = `【魔兽黑话 · ${term}】：${def}`;
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({ title: '术语解释已复制', icon: 'success' });
      }
    });
  },

  openSubmitModal() {
    this.setData({
      showModal: true,
      formTerm: '',
      formAlias: '',
      formDefinition: '',
      formExample: ''
    });
  },

  closeSubmitModal() {
    this.setData({ showModal: false });
  },

  onFormTermInput(e) { this.setData({ formTerm: e.detail.value }); },
  onFormAliasInput(e) { this.setData({ formAlias: e.detail.value }); },
  onFormCatChange(e) { this.setData({ formCategoryIndex: parseInt(e.detail.value, 10) }); },
  onFormDefInput(e) { this.setData({ formDefinition: e.detail.value }); },
  onFormExInput(e) { this.setData({ formExample: e.detail.value }); },

  submitNewTerm() {
    const { formTerm, formAlias, formDefinition, formExample, formCategories, formCategoryIndex, terms } = this.data;

    if (!formTerm.trim() || !formDefinition.trim()) {
      wx.showToast({ title: '请填写术语名称与解释', icon: 'none' });
      return;
    }

    const catObj = formCategories[formCategoryIndex];
    const newTerm = {
      id: 'custom_t_' + Date.now(),
      term: formTerm.trim(),
      alias: formAlias.trim(),
      category: catObj.id,
      tag: catObj.name,
      definition: formDefinition.trim(),
      example: formExample.trim() ? `“${formExample.trim()}”` : '“队伍交流常用语”',
      tip: '玩家投稿收录的新兴黑话。'
    };

    const userTerms = wx.getStorageSync('infinite_user_terms') || [];
    userTerms.unshift(newTerm);
    wx.setStorageSync('infinite_user_terms', userTerms);

    const updated = [newTerm, ...terms];

    this.setData({
      showModal: false,
      terms: updated,
      displayTerms: updated,
      currentCategory: 'all'
    });

    wx.showToast({ title: '黑话收录成功！', icon: 'success' });
  }
,
  onShareAppMessage() {
    return {
      title: '魔兽术语与黑话字典 - 萌新不懵圈，老鸟开荒暗号速查',
      path: '/pages/infinite-terms/infinite-terms'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽术语与黑话字典 - 萌新不懵圈，老鸟开荒暗号速查',
      path: '/pages/infinite-terms/infinite-terms'
    };
  }
});
