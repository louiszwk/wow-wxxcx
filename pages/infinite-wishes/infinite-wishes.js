const { INITIAL_WISHES } = require('../../data/infinite_data.js');
const { checkTextSecurity } = require('../../utils/sensitive_filter.js');

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
    isLoadingWishes: false,
    // 许愿弹窗表单
    showModal: false,
    isSubmitting: false,
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
    const likedWishes = wx.getStorageSync('infinite_liked_wishes') || {};

    this.setData({
      theme: savedTheme,
      likedWishes
    });

    // 从微信云数据库加载全服玩家许愿
    this.loadWishesFromDatabase();
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  onPullDownRefresh() {
    this.loadWishesFromDatabase(() => {
      wx.stopPullDownRefresh();
      wx.showToast({ title: '许愿墙已更新', icon: 'none' });
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

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  // 格式化相对时间
  formatRelativeTime(timestamp) {
    if (!timestamp) return '刚刚';
    let time = timestamp;
    if (timestamp instanceof Date) {
      time = timestamp.getTime();
    }
    const diff = Math.floor((Date.now() - time) / 1000);
    if (diff < 60) return '刚刚';
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
    if (diff < 86400 * 30) return `${Math.floor(diff / 86400)}天前`;
    const d = new Date(time);
    return `${d.getMonth() + 1}-${d.getDate()}`;
  },

  // 根据分类过滤清单
  filterByCategory(list, category) {
    if (category === 'all') return list;
    return list.filter(w => w.category === category);
  },

  // 从云数据库加载许愿列表
  loadWishesFromDatabase(callback) {
    this.setData({ isLoadingWishes: true });

    let db;
    try {
      db = wx.cloud.database();
    } catch (e) {
      console.warn('云环境未初始化，使用本地预设:', e);
      this.fallbackToLocalWishes(callback);
      return;
    }

    db.collection('infinite_wishes')
      .orderBy('createTime', 'desc')
      .limit(60)
      .get()
      .then(res => {
        let dbList = [];
        if (res.data && res.data.length > 0) {
          dbList = res.data.map(item => ({
            id: item._id,
            author: item.author || '艾泽拉斯勇士',
            classIcon: item.classIcon || '⚔️',
            category: item.category || '欧气满满',
            text: item.text,
            likes: item.likes || 1,
            date: this.formatRelativeTime(item.createTime),
            createTime: item.createTime,
            isDb: true
          }));
        }

        // 获取用户本地离线许愿 (防止用户离线时发布的数据丢失)
        const localWishes = wx.getStorageSync('infinite_user_wishes') || [];

        // 合并数据：云端最新玩家许愿 + 本地用户许愿 + 初始高赞预设
        const combined = [...dbList, ...localWishes, ...INITIAL_WISHES];

        // 去重合并
        const uniqueWishes = [];
        const seenTexts = new Set();
        for (const w of combined) {
          if (!seenTexts.has(w.text)) {
            seenTexts.add(w.text);
            uniqueWishes.push(w);
          }
        }

        const displayList = this.filterByCategory(uniqueWishes, this.data.currentCategory);

        this.setData({
          wishes: uniqueWishes,
          displayWishes: displayList,
          isLoadingWishes: false
        });

        if (callback) callback();
      })
      .catch(err => {
        console.warn('云端许愿列表获取失败或集合尚未创建，降级读取本地预设:', err);
        this.fallbackToLocalWishes(callback);
      });
  },

  fallbackToLocalWishes(callback) {
    const localUserWishes = wx.getStorageSync('infinite_user_wishes') || [];
    const combinedWishes = [...localUserWishes, ...INITIAL_WISHES];
    const displayList = this.filterByCategory(combinedWishes, this.data.currentCategory);

    this.setData({
      wishes: combinedWishes,
      displayWishes: displayList,
      isLoadingWishes: false
    });

    if (callback) callback();
  },

  selectCategory(e) {
    const cat = e.currentTarget.dataset.id;
    const { wishes } = this.data;
    const list = this.filterByCategory(wishes, cat);
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
        return { ...item, likes: (item.likes || 0) + 1 };
      }
      return item;
    });

    this.setData({
      likedWishes: newLiked,
      wishes: updateList(wishes),
      displayWishes: updateList(displayWishes)
    });

    // 如果是云端数据库数据，同步累加点赞数
    const targetItem = wishes.find(item => item.id === id);
    if (targetItem && targetItem.isDb) {
      try {
        const db = wx.cloud.database();
        const _ = db.command;
        db.collection('infinite_wishes').doc(id).update({
          data: { likes: _.inc(1) }
        }).catch(err => {
          console.log('点赞已本地更新，云端点赞记录:', err.message);
        });
      } catch (err) {
        // 静默处理
      }
    }

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

  // 提交许愿：违规检测 -> 云端安全审核 -> 入库存储
  async submitWish() {
    const {
      formAuthor,
      formContent,
      formCategories,
      formCategoryIndex,
      formClasses,
      formClassIndex,
      isSubmitting
    } = this.data;

    if (isSubmitting) return;

    const trimmedAuthor = formAuthor.trim() || '艾泽拉斯勇士';
    const trimmedContent = formContent.trim();

    if (!trimmedContent) {
      wx.showToast({ title: '请写下你的心愿内容', icon: 'none' });
      return;
    }

    if (trimmedContent.length < 2) {
      wx.showToast({ title: '心愿太短啦，多写几个字吧', icon: 'none' });
      return;
    }

    // 1. 本地敏感词即时检测 (拦截违法违规、涉黄涉赌、暴恐辱骂、恶意引流广告)
    const authorCheck = checkTextSecurity(trimmedAuthor);
    if (!authorCheck.pass) {
      wx.showModal({
        title: '昵称未通过合规检测',
        content: `冒险者昵称含有不合规内容（“${authorCheck.word || '违规词'}”），请修改后再试！`,
        showCancel: false,
        confirmColor: '#f59e0b'
      });
      return;
    }

    const contentCheck = checkTextSecurity(trimmedContent);
    if (!contentCheck.pass) {
      wx.showModal({
        title: '心愿未通过合规检测',
        content: `许愿内容包含敏感或违规词汇（“${contentCheck.word || '违规词'}”），请文明许愿！`,
        showCancel: false,
        confirmColor: '#f59e0b'
      });
      return;
    }

    this.setData({ isSubmitting: true });
    wx.showLoading({ title: '圣光验愿中...', mask: true });

    // 2. 调用微信官方云端安全内容检测 (msgSecCheck) 进行双重审核
    try {
      const fullText = `${trimmedAuthor}：${trimmedContent}`;
      const secRes = await wx.cloud.callFunction({
        name: 'checkWishContent',
        data: { content: fullText }
      });

      if (secRes && secRes.result && secRes.result.pass === false) {
        wx.hideLoading();
        this.setData({ isSubmitting: false });
        wx.showModal({
          title: '未通过微信内容安全审核',
          content: secRes.result.error || '该心愿内容经系统检测存在违规信息，请调整文字后再试。',
          showCancel: false,
          confirmColor: '#f59e0b'
        });
        return;
      }
    } catch (err) {
      // 若云函数未部署或网络异常，已通过第一道本地敏感词过滤兜底，允许继续入库
      console.warn('云端安全检测调用跳过(使用本地严格过滤):', err.message);
    }

    // 3. 将玩家许愿写入微信云数据库 infinite_wishes 集合
    const newWishData = {
      author: trimmedAuthor,
      classIcon: formClasses[formClassIndex].icon,
      className: formClasses[formClassIndex].name,
      category: formCategories[formCategoryIndex],
      text: trimmedContent,
      likes: 1,
      createTime: Date.now()
    };

    try {
      const db = wx.cloud.database();
      const addRes = await db.collection('infinite_wishes').add({
        data: newWishData
      });

      wx.hideLoading();
      this.setData({ isSubmitting: false, showModal: false });

      const newWishItem = {
        id: addRes._id,
        ...newWishData,
        date: '刚刚',
        isDb: true
      };

      // 立即刷新前端列表，让玩家立即看到自己的愿望在最前面
      const updatedAll = [newWishItem, ...this.data.wishes];
      const displayList = this.filterByCategory(updatedAll, this.data.currentCategory);

      this.setData({
        wishes: updatedAll,
        displayWishes: displayList
      });

      wx.showModal({
        title: '🪙 祈愿成功',
        content: '心愿已成功铭刻于达拉然圣泉石碑，全服冒险者皆可为你送上祝福！',
        showCancel: false,
        confirmText: '必出毕业',
        confirmColor: '#f59e0b'
      });

    } catch (dbErr) {
      wx.hideLoading();
      this.setData({ isSubmitting: false, showModal: false });
      console.warn('云数据库写入异常（可能集合尚未创建），降级本地保存:', dbErr);

      // 降级本地存储，保证玩家体验不中断
      const localId = 'local_' + Date.now();
      const localWishItem = {
        id: localId,
        ...newWishData,
        date: '刚刚',
        isDb: false
      };

      const localList = wx.getStorageSync('infinite_user_wishes') || [];
      localList.unshift(localWishItem);
      wx.setStorageSync('infinite_user_wishes', localList);

      const updatedAll = [localWishItem, ...this.data.wishes];
      const displayList = this.filterByCategory(updatedAll, this.data.currentCategory);

      this.setData({
        wishes: updatedAll,
        displayWishes: displayList
      });

      wx.showModal({
        title: '🪙 祈愿成功',
        content: '金币已落入圣泉之底，艾露恩与圣光将赐予你欧气加护！',
        showCancel: false,
        confirmText: '必出毕业',
        confirmColor: '#f59e0b'
      });
    }
  },

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
