Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    metaData: null,
    runsData: null,
    theme: 'dark',
    allExpanded: false,
    loading: true,
    errorMsg: '',
    scrollTop: 0,
    showMetaModal: false,
    showCustomLoading: false,
    loadingDots: '',
    allRankings: [],
    isRefreshing: false
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

    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    // 1. 优先读取本地持久化缓存（实现秒开，防止白屏与超时等待）
    const cached = wx.getStorageSync('cache_top_runs_data');
    if (cached && cached.rankings && Array.isArray(cached.rankings) && cached.rankings.length > 0) {
      this.setData({
        allRankings: cached.rankings,
        loading: false,
        errorMsg: ''
      });
      this.processRuns(cached.rankings);
      this.processMetaStats(cached.rankings);
      // 静默拉取最新数据，不干扰用户正常浏览
      this.fetchData({ silent: true });
    } else {
      // 无缓存时走初次完整加载
      this.fetchData();
    }
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
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

  toggleRoster(e) {
    const idx = e.currentTarget.dataset.index;
    const key = `runsData[${idx}].expanded`;
    this.setData({
      [key]: !this.data.runsData[idx].expanded
    });
  },

  toggleAllRosters() {
    const newExpanded = !this.data.allExpanded;
    if (this.data.runsData) {
      const updatedRuns = this.data.runsData.map(r => ({
        ...r,
        expanded: newExpanded
      }));
      this.setData({
        runsData: updatedRuns,
        allExpanded: newExpanded
      });
    }
  },

  showStatisticsModal() {
    if (this.data.allRankings && this.data.allRankings.length > 0) {
      const top100 = this.data.allRankings.slice(0, 100);
      this.processMetaStats(top100);
      this.setData({ showMetaModal: true });
    } else {
      wx.showToast({ title: '数据加载中...', icon: 'none' });
    }
  },

  closeStatisticsModal() {
    this.setData({ showMetaModal: false });
  },

  preventBubble() {},

  preventTouchMove() {},

  showLoadingOverlay() {
    this.setData({ showCustomLoading: true });
    this.startLoadingDots();
  },

  hideLoadingOverlay() {
    this.setData({ showCustomLoading: false });
    this.stopLoadingDots();
  },

  startLoadingDots() {
    this.setData({ loadingDots: '' });
    this.dotsInterval = setInterval(() => {
      let dots = this.data.loadingDots;
      if (dots.length >= 6) dots = '';
      else dots += '.';
      this.setData({ loadingDots: dots });
    }, 250);
  },

  stopLoadingDots() {
    if (this.dotsInterval) clearInterval(this.dotsInterval);
  },

  // 统一入口：支持静默刷新与下拉刷新
  fetchData(options = {}, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    const silent = !!options.silent;
    const hasExistingData = !!(this.data.runsData && this.data.runsData.length > 0);

    if (!silent && !hasExistingData) {
      this.setData({
        loading: true,
        errorMsg: '',
        isRefreshing: true
      });
      this.showLoadingOverlay();
    } else {
      this.setData({ isRefreshing: true });
    }

    this.fetchRunsUnified((err, rankings) => {
      this.hideLoadingOverlay();
      this.setData({ isRefreshing: false });

      if (rankings && rankings.length > 0) {
        this.setData({
          allRankings: rankings,
          loading: false,
          errorMsg: ''
        });
        this.processRuns(rankings);
        this.processMetaStats(rankings);
        // 保存本地持久化缓存
        wx.setStorageSync('cache_top_runs_data', {
          rankings: rankings,
          time: Date.now()
        });
      } else {
        // 请求失败降级保护：如果当前已有展示数据，绝不覆盖/清空用户视图！
        if (hasExistingData || (this.data.runsData && this.data.runsData.length > 0)) {
          this.setData({ loading: false });
          if (!silent) {
            wx.showToast({ title: '网络稍有延迟，已展示当前数据', icon: 'none' });
          }
        } else {
          // 仅在完全没有数据时，才展示全局错误提示
          this.setData({
            loading: false,
            errorMsg: '获取实时数据失败，请下拉重试'
          });
          wx.showToast({ title: '数据异常稍后再试', icon: 'none' });
        }
      }

      if (typeof cb === 'function') cb();
    });
  },

  onPullDownRefresh() {
    this.fetchData({ silent: false }, () => {
      wx.stopPullDownRefresh();
    });
  },

  retryFetch() {
    this.setData({ errorMsg: '' });
    this.fetchData();
  },

  // 统一数据拉取：云端聚合优先，失败则智能客户端分批重试
  fetchRunsUnified(callback) {
    // 方案 1：优先尝试云函数一次性聚合拉取（100% 解决丢失第0页、20或40后断层问题）
    wx.cloud.callFunction({
      name: 'proxyRequest',
      data: { action: 'getTopRuns' }
    }).then(res => {
      const rankings = res?.result?.data?.rankings;
      if (res?.result?.success && Array.isArray(rankings) && rankings.length > 0) {
        // 严格按 rank 排序
        rankings.sort((a, b) => (a.rank || 0) - (b.rank || 0));
        callback(null, rankings);
      } else {
        // 云函数 action 暂未部署或返回空，平滑降级到客户端分批获取
        console.warn('云函数 getTopRuns 暂未返回有效数据，降级为客户端分批安全获取');
        this.fetchRunsClientFallback(callback);
      }
    }).catch(err => {
      console.warn('云函数 getTopRuns 调用异常，降级为客户端分批安全获取:', err);
      this.fetchRunsClientFallback(callback);
    });
  },

  // 客户端分批拉取降级方案（带失败单页重试机制，防止缺失第0页导致前20名丢失）
  fetchRunsClientFallback(callback) {
    const pageMap = {};

    const fetchSinglePage = (page, retryCount = 1) => {
      return wx.cloud.callFunction({
        name: 'proxyRequest',
        data: {
          url: `https://raider.io/api/v1/mythic-plus/runs?region=world&dungeon=all&page=${page}`,
          method: 'GET'
        }
      }).then(res => {
        const rankings = res?.result?.data?.rankings;
        if (res?.result?.success && Array.isArray(rankings) && rankings.length > 0) {
          pageMap[page] = rankings;
          // 若首屏 page=0 快速到达且当前屏幕尚未有数据，先展示前20条
          if (page === 0 && (!this.data.runsData || this.data.runsData.length === 0)) {
            this.hideLoadingOverlay();
            this.setData({ allRankings: rankings, loading: false });
            this.processRuns(rankings);
          }
          return true;
        }
        throw new Error(`Page ${page} 返回数据为空`);
      }).catch(err => {
        if (retryCount > 0) {
          console.warn(`Page ${page} 请求失败，执行单页补拉重试...`);
          return new Promise(r => setTimeout(r, 500)).then(() => fetchSinglePage(page, retryCount - 1));
        }
        console.error(`Page ${page} 最终请求失败:`, err);
        return false;
      });
    };

    const tasks = [0, 1, 2, 3, 4].map(p => fetchSinglePage(p, 1));

    Promise.all(tasks).then(() => {
      let combined = [];
      for (let p = 0; p < 5; p++) {
        if (pageMap[p]) {
          combined = combined.concat(pageMap[p]);
        }
      }

      // 按 rank 严格升序排序
      combined.sort((a, b) => (a.rank || 0) - (b.rank || 0));
      combined = combined.slice(0, 100);

      // 关键容错检查：如果缺失了第0页（第1~20名），绝不能把第21名之后的数据当作前百直接覆盖
      if (combined.length > 0 && combined[0].rank > 20) {
        console.warn('检测到前20名数据缺失，尝试复用缓存数据');
        const cached = wx.getStorageSync('cache_top_runs_data');
        if (cached && cached.rankings && cached.rankings.length > 0) {
          callback(null, cached.rankings);
          return;
        }
      }

      if (combined.length > 0) {
        callback(null, combined);
      } else {
        callback(new Error('未拉取到任何有效数据'), null);
      }
    }).catch(err => {
      callback(err, null);
    });
  },

  processMetaStats(allRuns) {
    if (!allRuns || !Array.isArray(allRuns) || allRuns.length === 0) return;

    const counts = { tanks: {}, healers: {}, melee: {}, ranged: {} };
    const rangedSpecs = new Set([
      'Balance', 'Beast Mastery', 'Marksmanship', 'Arcane', 'Fire', 'Frost',
      'Shadow', 'Elemental', 'Affliction', 'Demonology', 'Destruction', 'Devastation', 'Augmentation'
    ]);

    const { classData } = require('../../utils/wowClasses.js');
    const classColors = {};
    const clsMap = {
      'Death Knight': '死亡骑士', 'Demon Hunter': '恶魔猎手', 'Druid': '德鲁伊', 'Evoker': '唤魔师',
      'Hunter': '猎人', 'Mage': '法师', 'Monk': '武僧', 'Paladin': '圣骑士', 'Priest': '牧师',
      'Rogue': '潜行者', 'Shaman': '萨满', 'Warlock': '术士', 'Warrior': '战士'
    };

    const specMap = {
      'Blood': '鲜血', 'Frost': '冰霜', 'Unholy': '邪恶',
      'Havoc': '浩劫', 'Vengeance': '复仇',
      'Balance': '平衡', 'Feral': '野性', 'Guardian': '守护', 'Restoration': '恢复',
      'Devastation': '湮灭', 'Preservation': '恩护', 'Augmentation': '增辉',
      'Beast Mastery': '野兽控制', 'Marksmanship': '射击', 'Survival': '生存',
      'Arcane': '奥术', 'Fire': '火焰',
      'Brewmaster': '酒仙', 'Mistweaver': '织雾', 'Windwalker': '踏风',
      'Holy': '神圣', 'Protection': '防护', 'Retribution': '惩戒',
      'Discipline': '戒律', 'Shadow': '暗影',
      'Assassination': '奇袭', 'Outlaw': '狂徒', 'Subtlety': '敏锐',
      'Elemental': '元素', 'Enhancement': '增强',
      'Affliction': '痛苦', 'Demonology': '恶魔学识', 'Destruction': '毁灭',
      'Arms': '武器', 'Fury': '狂怒'
    };

    if (Array.isArray(classData)) {
      classData.forEach(c => { classColors[c.name] = c.color; });
    }

    allRuns.forEach(r => {
      if (!r || !r.run || !Array.isArray(r.run.roster)) return;
      r.run.roster.forEach(member => {
        if (!member || !member.character) return;
        const char = member.character;
        const role = member.role || 'dps';
        const specEn = char?.spec?.name || '';
        const clsEn = char?.class?.name || '';

        const clsName = clsMap[clsEn] || clsEn || '未知职业';
        const specName = specMap[specEn] || specEn || '未知专精';
        const key = `${clsName} - ${specName}`;
        const color = classColors[clsName] || '#ffffff';

        let category = null;
        if (role === 'tank') category = 'tanks';
        else if (role === 'healer') category = 'healers';
        else if (role === 'dps') category = rangedSpecs.has(specEn) ? 'ranged' : 'melee';

        if (category && counts[category]) {
          if (!counts[category][key]) counts[category][key] = { count: 0, color };
          counts[category][key].count += 1;
        }
      });
    });

    const formatMeta = (obj) => {
      const arr = Object.entries(obj).map(([name, data]) => ({ name, count: data.count, color: data.color })).sort((a, b) => b.count - a.count);
      return arr.length > 0 ? arr : [{ name: '无数据', count: 1, color: '#999' }];
    };

    this.setData({
      metaData: {
        tanks: formatMeta(counts.tanks),
        healers: formatMeta(counts.healers),
        melee: formatMeta(counts.melee),
        ranged: formatMeta(counts.ranged)
      }
    });
  },

  processRuns(runs) {
    if (!runs || !Array.isArray(runs)) return;

    const { classData } = require('../../utils/wowClasses.js');
    const classColors = {};
    const clsMap = {
      'Death Knight': '死亡骑士', 'Demon Hunter': '恶魔猎手', 'Druid': '德鲁伊', 'Evoker': '唤魔师',
      'Hunter': '猎人', 'Mage': '法师', 'Monk': '武僧', 'Paladin': '圣骑士', 'Priest': '牧师',
      'Rogue': '潜行者', 'Shaman': '萨满', 'Warlock': '术士', 'Warrior': '战士'
    };

    const specMap = {
      'Blood': '鲜血', 'Frost': '冰霜', 'Unholy': '邪恶',
      'Havoc': '浩劫', 'Vengeance': '复仇',
      'Balance': '平衡', 'Feral': '野性', 'Guardian': '守护', 'Restoration': '恢复',
      'Devastation': '湮灭', 'Preservation': '恩护', 'Augmentation': '增辉',
      'Beast Mastery': '野兽控制', 'Marksmanship': '射击', 'Survival': '生存',
      'Arcane': '奥术', 'Fire': '火焰',
      'Brewmaster': '酒仙', 'Mistweaver': '织雾', 'Windwalker': '踏风',
      'Holy': '神圣', 'Protection': '防护', 'Retribution': '惩戒',
      'Discipline': '戒律', 'Shadow': '暗影',
      'Assassination': '奇袭', 'Outlaw': '狂徒', 'Subtlety': '敏锐',
      'Elemental': '元素', 'Enhancement': '增强',
      'Affliction': '痛苦', 'Demonology': '恶魔学识', 'Destruction': '毁灭',
      'Arms': '武器', 'Fury': '狂怒'
    };

    if (Array.isArray(classData)) {
      classData.forEach(c => { classColors[c.name] = c.color; });
    }

    const dungeonMap = {
      'Den of Nalorakk': '纳洛拉克的洞穴',
      'Kings\' Rest': '诸王之眠',
      'Murder Row': '密谋小径',
      'Temple of Sethraliss': '塞塔里斯神庙',
      'The Blinding Vale': '夺目谷',
      'Ruby Life Pools': '红玉新生法池',
      'Arena of the Void': '虚空之竞技场',
      'The Void Arena': '虚空之竞技场',
      'Void Arena': '虚空之竞技场',
      'Altar of Fangs': '毒牙祭坛',
      'The Altar of Fangs': '毒牙祭坛',
      'Darkflame Cleft': '暗焰裂口',
      'Cinderbrew Meadery': '燧酿酒庄',
      'The Rookery': '驭雷巢穴',
      'Priory of the Sacred Flame': '圣焰修道院',
      'The MOTHERLODE!!': '暴富矿区！！',
      'Theater of Pain': '伤逝剧场',
      'Operation: Mechagon - Workshop': '麦卡贡 - 车间',
      'Operation: Mechagon - Junkyard': '麦卡贡 - 垃圾场',
      'Return to Karazhan: Lower': '卡拉赞 - 下层',
      'Return to Karazhan: Upper': '卡拉赞 - 上层',
      'Floodgate': '涌泉谷',
      'Operation: Floodgate': '涌泉谷',
      'Ara-Kara, City of Echoes': '回响之城阿拉卡拉',
      'City of Threads': '千丝之城',
      'The Stonevault': '矶石宝库',
      'The Dawnbreaker': '破晨号'
    };

    const existingExpanded = {};
    if (this.data.runsData) {
      this.data.runsData.forEach(item => {
        if (item && item.rank !== undefined) {
          existingExpanded[item.rank] = item.expanded;
        }
      });
    }

    const runsData = runs.map(r => {
      if (!r || !r.run || !Array.isArray(r.run.roster)) return null;
      const roster = r.run.roster.map(m => {
        if (!m || !m.character) return null;
        const clsEn = m?.character?.class?.name || '';
        const specEn = m?.character?.spec?.name || '';
        const clsName = clsMap[clsEn] || clsEn || '未知职业';
        const specName = specMap[specEn] || specEn || '未知专精';
        return {
          name: m?.character?.name || '未知',
          role: m?.role || 'dps',
          rawClass: clsName,
          rawSpec: specName,
          spec: `${clsName} - ${specName}`,
          color: classColors[clsName] || '#ffffff'
        };
      }).filter(Boolean);

      const roleOrder = { 'tank': 1, 'healer': 2, 'dps': 3 };
      roster.sort((a, b) => (roleOrder[a.role] || 3) - (roleOrder[b.role] || 3));

      const enDungeon = r.run?.dungeon?.name || '';
      return {
        rank: r.rank,
        score: r.score,
        level: r.run?.mythic_level || 0,
        dungeon: dungeonMap[enDungeon] || enDungeon || '未知地下城',
        roster: roster,
        expanded: existingExpanded[r.rank] !== undefined ? existingExpanded[r.rank] : this.data.allExpanded
      };
    }).filter(r => r !== null).sort((a, b) => a.rank - b.rank);

    this.setData({ runsData: runsData });
  },

  onShareAppMessage() {
    return {
      title: '魔兽世界大米前百车队与专精出场率',
      path: '/pages/topmeta/topmeta'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界大米前百车队与专精出场率',
      path: '/pages/topmeta/topmeta'
    };
  }
});
