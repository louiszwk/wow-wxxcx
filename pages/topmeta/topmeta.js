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

    this.fetchData();
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

  fetchData(cb) {
    this.setData({
      loading: true,
      errorMsg: '',
      metaData: null,
      runsData: null,
      allRankings: [],
      isRefreshing: true,
      allExpanded: false
    });
    this.fetchRunsRealtime(cb);
  },

  onPullDownRefresh() {
    this.fetchData(() => {
      this.setData({ isRefreshing: false });
      wx.stopPullDownRefresh();
    });
  },

  // 获取 Raider.io 前100名大秘境数据（5页并发请求，无数据库缓存）
  fetchRunsRealtime(cb) {
    this.showLoadingOverlay();

    const pageMap = {};
    let firstBatchShown = false;

    const fetchPage = (page) => {
      return wx.cloud.callFunction({
        name: 'proxyRequest',
        data: {
          url: `https://raider.io/api/v1/mythic-plus/runs?region=world&dungeon=all&page=${page}`,
          method: 'GET'
        }
      }).then(res => {
        if (res && res.result && res.result.success && res.result.data && res.result.data.rankings) {
          pageMap[page] = res.result.data.rankings;

          // 若首屏 page=0 先到达，迅速显示前20条，大幅降低体感白屏时间
          if (page === 0 && !firstBatchShown && this.data.loading) {
            firstBatchShown = true;
            this.hideLoadingOverlay();
            this.setData({
              allRankings: pageMap[0],
              loading: false,
              isRefreshing: false
            });
            this.processRuns(pageMap[0]);
          }
        }
      }).catch(err => {
        console.error(`Page ${page} 请求异常:`, err);
      });
    };

    const requests = [0, 1, 2, 3, 4].map(p => fetchPage(p));

    Promise.all(requests).then(() => {
      let combined = [];
      for (let p = 0; p < 5; p++) {
        if (pageMap[p]) {
          combined = combined.concat(pageMap[p]);
        }
      }
      // 严格截取前100个
      combined = combined.slice(0, 100);

      if (combined.length > 0) {
        this.setData({
          allRankings: combined,
          loading: false,
          isRefreshing: false,
          scrollTop: 0
        });
        this.processRuns(combined);
        // 固定计算前100个队伍的职业与专精出场率
        this.processMetaStats(combined);
        this.hideLoadingOverlay();
      } else {
        this.hideLoadingOverlay();
        this.setData({
          loading: false,
          isRefreshing: false,
          errorMsg: '获取实时数据失败，请下拉重试'
        });
        wx.showToast({ title: '数据异常稍后再试', icon: 'none' });
      }
    }).catch(err => {
      console.error('获取实时数据失败:', err);
      this.hideLoadingOverlay();
      this.setData({
        loading: false,
        isRefreshing: false,
        errorMsg: '获取实时数据失败，请下拉重试'
      });
      wx.showToast({ title: '数据异常稍后再试', icon: 'none' });
    }).finally(() => {
      if (typeof cb === 'function') cb();
    });
  },

  retryFetch() {
    this.setData({ errorMsg: '' });
    this.fetchTopRuns();
  },

  processMetaStats(allRuns) {
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

    classData.forEach(c => { classColors[c.name] = c.color; });

    allRuns.forEach(r => {
      if (!r.run || !r.run.roster) return;
      r.run.roster.forEach(member => {
        const char = member.character;
        const role = member.role;
        const specEn = char.spec.name;
        const clsEn = char.class.name;

        const clsName = clsMap[clsEn] || clsEn;
        const specName = specMap[specEn] || specEn;
        const key = `${clsName} - ${specName}`;
        const color = classColors[clsName] || '#ffffff';

        let category = null;
        if (role === 'tank') category = 'tanks';
        else if (role === 'healer') category = 'healers';
        else if (role === 'dps') category = rangedSpecs.has(specEn) ? 'ranged' : 'melee';

        if (category) {
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

    classData.forEach(c => { classColors[c.name] = c.color; });

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
        existingExpanded[item.rank] = item.expanded;
      });
    }

    const runsData = runs.map(r => {
      if (!r.run || !r.run.roster) return null;
      const roster = r.run.roster.map(m => {
        const clsEn = m.character.class.name;
        const specEn = m.character.spec.name;
        const clsName = clsMap[clsEn] || clsEn;
        const specName = specMap[specEn] || specEn;
        return {
          name: m.character.name,
          role: m.role,
          rawClass: clsName,
          rawSpec: specName,
          spec: `${clsName} - ${specName}`,
          color: classColors[clsName] || '#ffffff'
        };
      });

      const roleOrder = { 'tank': 1, 'healer': 2, 'dps': 3 };
      roster.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

      const enDungeon = r.run.dungeon.name;
      return {
        rank: r.rank,
        score: r.score,
        level: r.run.mythic_level,
        dungeon: dungeonMap[enDungeon] || enDungeon,
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
