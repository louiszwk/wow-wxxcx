// index.js
const realLootData = require('../../data/loot.js');

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    loading: true,
    dungeons: [],
    allDungeons: [],
    theme: 'dark', // 默认深色主题
    primaryStats: ['全部', '力量', '敏捷', '智力'],
    secondaryStats: ['全部', '暴击', '急速', '精通', '全能'],
    slots: ['全部', '头部', '颈部', '肩部', '背部', '胸部', '腕部', '手部', '腰部', '腿部', '脚部', '手指', '饰品', '单手', '双手', '主手', '副手', '远程', '盾牌'],
    primaryIndex: 0,
    secondaryIndex: 0,
    slotIndex: 0
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
    
    this.setData({ 
      theme: savedTheme
    });

    // 立即加载真实掉落数据
    this.loadLootData();
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

  toggleDungeon(e) {
    const id = e.currentTarget.dataset.id;
    const dungeons = this.data.dungeons.map(d => {
      if (d.id === id) {
        d.expanded = !d.expanded;
      }
      return d;
    });
    this.setData({ dungeons });
  },

  toggleBoss(e) {
    const dungeonId = e.currentTarget.dataset.dungeonId;
    const bossId = e.currentTarget.dataset.bossId;
    
    const dungeons = this.data.dungeons.map(d => {
      if (d.id === dungeonId) {
        d.encounters = d.encounters.map(encounter => {
          if (encounter.id === bossId) {
            // 如果 expanded 属性不存在，默认是 true，所以取反应该是 false
            encounter.expanded = encounter.expanded === false ? true : false;
          }
          return encounter;
        });
      }
      return d;
    });
    this.setData({ dungeons });
  },

  onPrimaryChange(e) {
    this.setData({ primaryIndex: e.detail.value });
    this.applyFilter();
  },

  onSecondaryChange(e) {
    this.setData({ secondaryIndex: e.detail.value });
    this.applyFilter();
  },

  onSlotChange(e) {
    this.setData({ slotIndex: e.detail.value });
    this.applyFilter();
  },

  applyFilter() {
    const { primaryIndex, secondaryIndex, slotIndex, primaryStats, secondaryStats, slots, allDungeons } = this.data;
    const selectedPrimary = primaryStats[primaryIndex];
    const selectedSecondary = secondaryStats[secondaryIndex];
    const selectedSlot = slots[slotIndex];

    const isAllPrimary = selectedPrimary === '全部';
    const isAllSecondary = selectedSecondary === '全部';
    const isAllSlots = selectedSlot === '全部';

    if (isAllPrimary && isAllSecondary && isAllSlots) {
      this.setData({ dungeons: allDungeons });
      return;
    }

    // 深度克隆并过滤
    const filteredDungeons = JSON.parse(JSON.stringify(allDungeons)).map(d => {
      d.encounters = d.encounters.map(encounter => {
        encounter.items = encounter.items.filter(item => {
          let passPrimary = true;
          if (!isAllPrimary) {
            passPrimary = !item.stats || !item.stats.main || item.stats.main.includes(selectedPrimary);
          }
          let passSecondary = true;
          if (!isAllSecondary) {
            passSecondary = item.stats && item.stats.combo && item.stats.combo.includes(selectedSecondary);
            if (!passSecondary && item.stats) {
               if (selectedSecondary === '暴击' && item.stats.crit) passSecondary = true;
               if (selectedSecondary === '急速' && item.stats.haste) passSecondary = true;
               if (selectedSecondary === '精通' && item.stats.mastery) passSecondary = true;
               if (selectedSecondary === '全能' && item.stats.versa) passSecondary = true;
            }
          }
          let passSlot = true;
          if (!isAllSlots) {
            passSlot = item.inventory_type.name === selectedSlot;
          }
          return passPrimary && passSecondary && passSlot;
        });
        return encounter;
      }).filter(e => e.items.length > 0);
      return d;
    }).filter(d => d.encounters.length > 0);

    this.setData({ dungeons: filteredDungeons });
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  // 加载真实静态数据（当前赛季大秘境数据）
  loadLootData() {
    // 强制排序团本/玩法
    const order = ["烈毒之渊", "剧毒深渊", "潮缚石窟", "潮缚岩洞", "史诗钥石", "套装", "地下堡", "狩猎"];
    realLootData.sort((a, b) => {
      let idxA = order.indexOf(a.name);
      let idxB = order.indexOf(b.name);
      if (idxA === -1) idxA = 999;
      if (idxB === -1) idxB = 999;
      return idxA - idxB;
    });

    realLootData.forEach(d => {
      if (d.encounters) {
        d.encounters.sort((a, b) => (a.order || 999) - (b.order || 999));
        d.encounters.forEach(e => {
          if (e.items) {
            e.items.forEach(item => {
              if (item.stats) {
                const list = [];
                if (item.stats.crit) list.push({ name: '暴击', short: '暴', weight: Number(item.stats.crit), color: '#f43f5e' });
                if (item.stats.haste) list.push({ name: '急速', short: '急', weight: Number(item.stats.haste), color: '#38bdf8' });
                if (item.stats.mastery) list.push({ name: '精通', short: '精', weight: Number(item.stats.mastery), color: '#4ade80' });
                if (item.stats.versa) list.push({ name: '全能', short: '全', weight: Number(item.stats.versa), color: '#c084fc' });

                if (list.length > 0) {
                  const sum = list.reduce((a, b) => a + b.weight, 0);
                  list.sort((a, b) => b.weight - a.weight);
                  let allocated = 0;
                  list.forEach((st, idx) => {
                    const rawVal = Math.round(st.weight * 10) / 10;
                    st.displayVal = rawVal;
                    if (idx === list.length - 1) {
                      st.percent = 100 - allocated;
                    } else {
                      st.percent = Math.round((st.weight / sum) * 100);
                      allocated += st.percent;
                    }
                  });
                  item.stats.ratioList = list;
                  item.stats.ratioText = list.map(st => `${st.name} ${st.percent}%`).join(' / ');
                }
              }
            });
          }
        });
      }
    });

    this.setData({
      allDungeons: realLootData,
      loading: false
    });
    this.applyFilter();
  }
,
  onShareAppMessage() {
    return {
      title: '魔兽世界大秘境第二赛季掉落速查',
      path: '/pages/loot/loot'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界大秘境第二赛季掉落速查',
      path: '/pages/loot/loot'
    };
  }
});
