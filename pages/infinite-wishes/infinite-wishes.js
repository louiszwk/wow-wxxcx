const { INITIAL_WISHES } = require('../../data/infinite_data.js');

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    currentCategory: 'all',
    categoryList: [
      { id: 'all', label: '全部心愿' },
      { id: '神兵掉落', label: '⚔️ 神兵掉落' },
      { id: '稀有坐骑', label: '🦄 稀有坐骑' },
      { id: '开荒通关', label: '🏰 团本通关' },
      { id: '欧气满满', label: '🍀 欧气祈福' }
    ],
    wishes: [],
    displayWishes: [],
    likedWishes: {},
    // 许愿弹窗
    showModal: false,
    formAuthor: '',
    formCategoryIndex: 0,
    formCategories: ['神兵掉落', '稀有坐骑', '开荒通关', '欧气满满'],
    formClassIndex: 0,
    formClasses: [
      { name: '战士', icon: '⚔️' },
      { name: '法师', icon: '🧙‍♂️' },
      { name: '潜行者', icon: '🗡️' },
      { name: '牧师', icon: '✨' },
      { name: '圣骑士', icon: '🛡️' },
      { name: '猎人', icon: '🏹' },
      { name: '术士', icon: '💀' },
      { name: '萨满祭司', icon: '⚡' },
      { name: '德鲁伊', icon: '🌱' }
    ],
    formContent: ''
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
    const localUserWishes = wx.getStorageSync('infinite_user_wishes') || [];
    const likedWishes = wx.getStorageSync('infinite_liked_wishes') || {};

    const combinedWishes = [...localUserWishes, ...INITIAL_WISHES];

    this.setData({
      theme: savedTheme,
      wishes: combinedWishes,
      displayWishes: combinedWishes,
      likedWishes
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

  selectCategory(e) {
    const cat = e.currentTarget.dataset.id;
    const { wishes } = this.data;
    let list = wishes;
    if (cat !== 'all') {
      list = wishes.filter(w => w.category === cat);
    }
    this.setData({
      currentCategory: cat,
      displayWishes: list
    });
  },

  likeWish(e) {
    const id = e.currentTarget.dataset.id;
    const { likedWishes, wishes, displayWishes } = this.data;

    if (likedWishes[id]) {
      wx.showToast({ title: '圣光已收到你的祝福啦', icon: 'none' });
      return;
    }

    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

    const newLiked = { ...likedWishes, [id]: true };
    wx.setStorageSync('infinite_liked_wishes', newLiked);

    const updateList = list => list.map(item => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    });

    this.setData({
      likedWishes: newLiked,
      wishes: updateList(wishes),
      displayWishes: updateList(displayWishes)
    });

    wx.showToast({
      title: '祝福 +1 欧气加倍',
      icon: 'success'
    });
  },

  openWishModal() {
    this.setData({
      showModal: true,
      formAuthor: '',
      formContent: ''
    });
  },

  closeWishModal() {
    this.setData({ showModal: false });
  },

  onAuthorInput(e) {
    this.setData({ formAuthor: e.detail.value });
  },

  onCategoryChange(e) {
    this.setData({ formCategoryIndex: parseInt(e.detail.value, 10) });
  },

  onClassChange(e) {
    this.setData({ formClassIndex: parseInt(e.detail.value, 10) });
  },

  onContentInput(e) {
    this.setData({ formContent: e.detail.value });
  },

  submitWish() {
    const { formAuthor, formContent, formCategories, formCategoryIndex, formClasses, formClassIndex, wishes } = this.data;

    if (!formContent.trim()) {
      wx.showToast({ title: '请填写心愿内容', icon: 'none' });
      return;
    }

    const newWish = {
      id: 'custom_' + Date.now(),
      author: formAuthor.trim() || '艾泽拉斯勇士',
      classIcon: formClasses[formClassIndex].icon,
      category: formCategories[formCategoryIndex],
      text: formContent.trim(),
      likes: 1,
      date: '刚刚'
    };

    const userWishes = wx.getStorageSync('infinite_user_wishes') || [];
    userWishes.unshift(newWish);
    wx.setStorageSync('infinite_user_wishes', userWishes);

    const updatedAll = [newWish, ...wishes];

    this.setData({
      showModal: false,
      wishes: updatedAll,
      displayWishes: updatedAll,
      currentCategory: 'all'
    });

    wx.showModal({
      title: '🪙 祈愿成功',
      content: '金币已落入圣泉之底，艾露恩与圣光将赐予你欧气加护！',
      showCancel: false,
      confirmText: '必出毕业'
    });
  }
,
  onShareAppMessage() {
    return {
      title: '魔兽世界无限服 - 达拉然魔力祈愿池，愿圣光保佑出神兵',
      path: '/pages/infinite-wishes/infinite-wishes'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界无限服 - 达拉然魔力祈愿池，愿圣光保佑出神兵',
      path: '/pages/infinite-wishes/infinite-wishes'
    };
  }
});
