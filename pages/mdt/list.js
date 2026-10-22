const DUNGEONS = [
  {
    id: 'AltarOfFangs',
    name: '毒牙祭坛',
    image: '/pages/mdt/images/maps/AltarOfFangs.jpg',
    aliases: ['毒牙祭坛', '尖牙祭坛']
  },
  {
    id: 'VoidscarArena',
    name: '虚空之痕竞技场',
    image: '/pages/mdt/images/maps/VoidscarArena.jpg',
    aliases: ['虚空之痕竞技场']
  },
  {
    id: 'TheBlindingVale',
    name: '夺目谷',
    image: '/pages/mdt/images/maps/TheBlindingVale.jpg',
    aliases: ['夺目谷', '致盲谷']
  },
  {
    id: 'RubyLifePools',
    name: '红玉新生法池',
    image: '/pages/mdt/images/maps/RubyLifePools.jpg',
    aliases: ['红玉新生法池', '红玉新生法地']
  },
  {
    id: 'MurderRow',
    name: '谋杀街',
    image: '/pages/mdt/images/maps/MurderRow.jpg',
    aliases: ['谋杀街', '谋杀街 (Murder Row)']
  },
  {
    id: 'DenOfNalorakk',
    name: '纳洛拉克之巢',
    image: '/pages/mdt/images/maps/DenOfNalorakk.jpg',
    aliases: ['纳洛拉克之巢']
  },
  {
    id: 'TempleOfSethraliss',
    name: '塞塔里斯神庙',
    image: '/pages/mdt/images/maps/TempleOfSethraliss.jpg',
    aliases: ['塞塔里斯神庙']
  },
  {
    id: 'KingsRest',
    name: '诸王之眠',
    image: '/pages/mdt/images/maps/KingsRest.jpg',
    aliases: ['诸王之眠']
  }
];

Page({
  data: {
    statusBarHeight: 20,
    menuButtonHeight: 32,
    theme: 'dark',

    // 八个副本选择栏，默认选择第1个 (毒牙祭坛)
    dungeons: DUNGEONS,
    currentDungeonIndex: 0,
    currentDungeon: DUNGEONS[0],

    // 难度层级切换
    levelTabs: ['全部', '2-10层', '10-15层', '15层以上'],
    currentLevelTab: '全部',

    // 《仅显示我的路线》选项
    onlyMyRoutes: false,

    // 用户身份
    currentOpenId: '',
    userLikedIds: {},

    // 路线真实列表
    routes: [],
    isLoading: true,
    isRefreshing: false
  },

  onLoad(options) {
    const app = getApp();
    if (app && app.globalData) {
      this.setData({
        statusBarHeight: app.globalData.statusBarHeight || 20,
        menuButtonHeight: app.globalData.menuButtonHeight || 32
      });
    }

    let dIndex = 0;
    if (options) {
      if (options.dungeonIndex !== undefined) {
        dIndex = parseInt(options.dungeonIndex, 10) || 0;
      } else if (options.d !== undefined) {
        dIndex = parseInt(options.d, 10) || 0;
      } else if (options.dungeon) {
        const dName = decodeURIComponent(options.dungeon);
        const idx = DUNGEONS.findIndex(d => d.name === dName || (d.aliases && d.aliases.includes(dName)));
        if (idx >= 0) dIndex = idx;
      }
    }
    if (dIndex < 0 || dIndex >= DUNGEONS.length) dIndex = 0;

    this.setData({
      currentDungeonIndex: dIndex,
      currentDungeon: DUNGEONS[dIndex]
    });

    // 初始化用户身份 openid 并拉取数据
    this._initUserIdentity(() => {
      this.fetchRoutesFromCloud();
    });
  },

  onShow() {
    // 每次从创建或修改页面返回，重新刷新当前真实数据
    if (this.data.currentOpenId) {
      this.fetchRoutesFromCloud(true);
    }
  },

  navigateBack() {
    const pages = getCurrentPages();
    if (pages && pages.length > 1) {
      wx.navigateBack({ delta: 1 });
    } else {
      wx.reLaunch({ url: '/pages/index/index' });
    }
  },

  // 获取微信真实 openid
  _initUserIdentity(callback) {
    let openid = wx.getStorageSync('user_openid') || '';
    if (openid) {
      this.setData({ currentOpenId: openid });
      if (callback) callback();
      return;
    }

    wx.cloud.callFunction({
      name: 'checkWishContent',
      data: { action: 'getOpenId' },
      success: (res) => {
        if (res.result && res.result.openid) {
          openid = res.result.openid;
          wx.setStorageSync('user_openid', openid);
          this.setData({ currentOpenId: openid });
        }
      },
      complete: () => {
        if (callback) callback();
      }
    });
  },

  // 1. 切换副本
  onSelectDungeon(e) {
    const index = Number(e.currentTarget.dataset.index);
    if (index === this.data.currentDungeonIndex) return;

    this.setData({
      currentDungeonIndex: index,
      currentDungeon: this.data.dungeons[index]
    });

    this.fetchRoutesFromCloud();
  },

  // 2. 切换层级标签
  onSelectLevelTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.currentLevelTab) return;

    this.setData({ currentLevelTab: tab });
    this.fetchRoutesFromCloud();
  },

  // 3. 切换《仅显示我的路线》
  toggleOnlyMyRoutes() {
    const nextVal = !this.data.onlyMyRoutes;
    this.setData({ onlyMyRoutes: nextVal });
    this.fetchRoutesFromCloud();
  },

  // 下拉刷新
  onPullDownRefreshList() {
    this.setData({ isRefreshing: true });
    this.fetchRoutesFromCloud(false, () => {
      this.setData({ isRefreshing: false });
    });
  },

  // 从微信云数据库真实拉取路线
  fetchRoutesFromCloud(silent = false, finishCb = null) {
    if (!silent) {
      this.setData({ isLoading: true });
    }

    let db;
    try {
      db = wx.cloud.database();
    } catch (e) {
      console.warn('云开发未初始化:', e);
      this.setData({ isLoading: false, routes: [] });
      if (finishCb) finishCb();
      return;
    }

    const _ = db.command;
    const currentDungeon = this.data.currentDungeon;
    const currentLevelTab = this.data.currentLevelTab;
    const onlyMyRoutes = this.data.onlyMyRoutes;
    const currentOpenId = this.data.currentOpenId || wx.getStorageSync('user_openid') || '';

    // 查询条件：匹配当前副本（含别名兼容）
    const whereCondition = {
      dungeon: _.in(currentDungeon.aliases)
    };

    // 难度层级过滤
    if (currentLevelTab !== '全部') {
      whereCondition.levelRange = currentLevelTab;
    }

    // 仅显示我的路线过滤
    if (onlyMyRoutes) {
      if (currentOpenId) {
        whereCondition._openid = currentOpenId;
      } else {
        // 如果未取得 openid，返回空
        this.setData({ routes: [], isLoading: false });
        if (finishCb) finishCb();
        return;
      }
    }

    db.collection('mdt_routes')
      .where(whereCondition)
      .orderBy('createTime', 'desc')
      .limit(50)
      .get()
      .then(res => {
        const rawList = res.data || [];
        const formattedRoutes = rawList.map(item => {
          const isOwner = Boolean(currentOpenId && item._openid && currentOpenId === item._openid);
          return {
            ...item,
            isOwner,
            displayTime: this._formatDisplayTime(item.createTime),
            hasLiked: Boolean(this.data.userLikedIds[item._id])
          };
        });

        this.setData({
          routes: formattedRoutes,
          isLoading: false
        });
        if (finishCb) finishCb();
      })
      .catch(err => {
        console.warn('客户端直查路线失败，启动云函数 Admin 模式无缝拉取:', err);
        wx.cloud.callFunction({
          name: 'checkWishContent',
          data: {
            action: 'getMdtRoutes',
            dungeonAliases: currentDungeon.aliases,
            levelRange: currentLevelTab,
            onlyMyRoutes: onlyMyRoutes
          }
        }).then(cfRes => {
          if (cfRes && cfRes.result && cfRes.result.success) {
            const rawList = cfRes.result.data || [];
            const formattedRoutes = rawList.map(item => {
              const isOwner = Boolean(currentOpenId && item._openid && currentOpenId === item._openid);
              return {
                ...item,
                isOwner,
                displayTime: this._formatDisplayTime(item.createTime),
                hasLiked: Boolean(this.data.userLikedIds[item._id])
              };
            });
            this.setData({
              routes: formattedRoutes,
              isLoading: false
            });
          } else {
            this.setData({ routes: [], isLoading: false });
          }
          if (finishCb) finishCb();
        }).catch(() => {
          this.setData({ routes: [], isLoading: false });
          if (finishCb) finishCb();
        });
      });
  },

  // 格式化时间为 YYYY-MM-DD HH:mm
  _formatDisplayTime(timestamp) {
    if (!timestamp) return '';
    let d;
    if (typeof timestamp === 'number') {
      d = new Date(timestamp);
    } else if (timestamp instanceof Date) {
      d = timestamp;
    } else {
      d = new Date(timestamp);
    }
    if (isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const h = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${day} ${h}:${min}`;
  },

  // 跳转创建路线
  goToCreateRoute() {
    const dungeonName = this.data.currentDungeon.name;
    wx.navigateTo({
      url: `/pages/mdt/mdt?mode=create&dungeon=${encodeURIComponent(dungeonName)}`
    });
  },

  // 跳转查看路线 (点击卡片)
  goToViewRoute(e) {
    const routeId = e.currentTarget.dataset.id;
    if (!routeId) return;
    const targetRoute = this.data.routes.find(r => r._id === routeId);
    const dungeonName = targetRoute ? targetRoute.dungeon : this.data.currentDungeon.name;
    
    // 如果是创建人自己，直接进入查看/编辑模式均可；否则以只读查看模式进入
    const mode = (targetRoute && targetRoute.isOwner) ? 'edit' : 'view';
    wx.navigateTo({
      url: `/pages/mdt/mdt?mode=${mode}&id=${routeId}&dungeon=${encodeURIComponent(dungeonName)}`
    });
  },

  // 需求3：创建人在列表中点击修改进行修改
  goToEditRoute(e) {
    const routeId = e.currentTarget.dataset.id;
    if (!routeId) return;
    const targetRoute = this.data.routes.find(r => r._id === routeId);
    if (!targetRoute || !targetRoute.isOwner) {
      wx.showToast({ title: '仅创建人可修改路线', icon: 'none' });
      return;
    }

    wx.navigateTo({
      url: `/pages/mdt/mdt?mode=edit&id=${routeId}&dungeon=${encodeURIComponent(targetRoute.dungeon)}`
    });
  },

  // 删除路线 (仅限创建人)
  onDeleteRoute(e) {
    const routeId = e.currentTarget.dataset.id;
    const routeName = e.currentTarget.dataset.name || '该路线';
    const targetRoute = this.data.routes.find(r => r._id === routeId);
    if (!targetRoute || !targetRoute.isOwner) {
      wx.showToast({ title: '无权删除他人路线', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '确认删除',
      content: `确定要永久删除路线「${routeName}」吗？删除后不可恢复。`,
      confirmColor: '#dc2626',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '正在删除...' });
          const db = wx.cloud.database();
          db.collection('mdt_routes').doc(routeId).remove().then(() => {
            wx.hideLoading();
            wx.showToast({ title: '已删除', icon: 'success' });
            this.fetchRoutesFromCloud(true);
          }).catch(() => {
            // 客户端因数据库权限无法直接删除时，转由云函数 Admin 权限安全校验并删除
            wx.cloud.callFunction({
              name: 'checkWishContent',
              data: { action: 'deleteMdtRoute', routeId }
            }).then(cfRes => {
              wx.hideLoading();
              if (cfRes && cfRes.result && cfRes.result.success) {
                wx.showToast({ title: '已删除', icon: 'success' });
                this.fetchRoutesFromCloud(true);
              } else {
                wx.showToast({ title: (cfRes && cfRes.result && cfRes.result.error) || '删除失败', icon: 'none' });
              }
            }).catch(err => {
              wx.hideLoading();
              console.error('删除路线失败:', err);
              wx.showToast({ title: '删除失败', icon: 'none' });
            });
          });
        }
      }
    });
  },

  // 点赞路线 (真实写入云数据库)
  onLikeRoute(e) {
    const routeId = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    if (!routeId) return;

    if (this.data.userLikedIds[routeId]) {
      wx.showToast({ title: '您已点赞过该路线', icon: 'none' });
      return;
    }

    // 乐观更新界面
    const routes = this.data.routes.slice();
    if (routes[index]) {
      routes[index].likes = (routes[index].likes || 0) + 1;
      routes[index].hasLiked = true;
    }
    const userLikedIds = { ...this.data.userLikedIds, [routeId]: true };
    this.setData({ routes, userLikedIds });

    try {
      const db = wx.cloud.database();
      const _ = db.command;
      db.collection('mdt_routes').doc(routeId).update({
        data: { likes: _.inc(1) }
      }).catch(() => {
        // 若客户端因“仅创建者可写”无法直接修改，转由云函数 Admin 权限更新
        wx.cloud.callFunction({
          name: 'checkWishContent',
          data: { action: 'likeMdtRoute', routeId }
        }).catch(() => {});
      });
    } catch (_) {
      wx.cloud.callFunction({
        name: 'checkWishContent',
        data: { action: 'likeMdtRoute', routeId }
      }).catch(() => {});
    }

    wx.showToast({ title: '感谢点赞！', icon: 'success' });
  },

  // 分享大秘境路线列表
  onShareAppMessage(res) {
    if (res && res.from === 'button' && res.target && res.target.dataset && res.target.dataset.route) {
      const r = res.target.dataset.route;
      const dName = this.data.currentDungeon.name;
      return {
        title: `🗺️ [${dName}] ${r.name || '大秘境路线'}`,
        path: `/pages/mdt/mdt?mode=view&id=${r._id}&dungeon=${encodeURIComponent(dName)}&d=${this.data.currentDungeonIndex}`
      };
    }
    const dungeon = this.data.currentDungeon || DUNGEONS[0];
    return {
      title: `🗺️ [${dungeon.name}] 大秘境路线推荐与规划`,
      path: `/pages/mdt/list?dungeon=${encodeURIComponent(dungeon.name)}&dungeonIndex=${this.data.currentDungeonIndex}`
    };
  },

  // 微信朋友圈分享
  onShareTimeline() {
    const dungeon = this.data.currentDungeon || DUNGEONS[0];
    return {
      title: `🗺️ [${dungeon.name}] 大秘境路线推荐与规划`,
      query: `dungeon=${encodeURIComponent(dungeon.name)}&dungeonIndex=${this.data.currentDungeonIndex}`
    };
  }
});
