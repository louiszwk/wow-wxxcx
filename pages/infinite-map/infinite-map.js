const { FLIGHT_PATHS } = require('../../data/infinite_data.js');

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    activeTab: 'list', // 'list' | 'planner'
    searchKeyword: '',
    currentFilter: 'all', // 'all' | '联盟' | '部落' | '中立' | '东部王国' | '卡利姆多' | '无限探索区'
    filterOptions: [
      { id: 'all', label: '全部' },
      { id: '联盟', label: '联盟' },
      { id: '部落', label: '部落' },
      { id: '中立', label: '中立' },
      { id: '东部王国', label: '东部王国' },
      { id: '卡利姆多', label: '卡利姆多' },
      { id: '无限探索区', label: '无限探索区' }
    ],
    allFlightPaths: FLIGHT_PATHS || [],
    filteredList: FLIGHT_PATHS || [],
    // 航线规划
    startZones: [],
    destZones: [],
    startIndex: 0,
    destIndex: 1,
    routeResult: null
  },

  onLoad(options) {
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
    const zoneList = FLIGHT_PATHS.map(p => p.zone);

    const initialTab = (options && options.tab) ? options.tab : 'list';
    const initialFilter = (options && options.filter) ? options.filter : 'all';

    this.setData({
      theme: savedTheme,
      activeTab: initialTab,
      currentFilter: initialFilter,
      allFlightPaths: FLIGHT_PATHS,
      filteredList: FLIGHT_PATHS,
      startZones: zoneList,
      destZones: zoneList,
      startIndex: 0,
      destIndex: 1 < zoneList.length ? 1 : 0
    }, () => {
      if (initialFilter !== 'all') {
        this.applyFilters();
      }
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

  switchModeTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  onSearchInput(e) {
    const searchKeyword = e.detail.value.trim().toLowerCase();
    this.setData({ searchKeyword }, () => {
      this.applyFilters();
    });
  },

  clearSearch() {
    this.setData({ searchKeyword: '' }, () => {
      this.applyFilters();
    });
  },

  setFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({ currentFilter: filter }, () => {
      this.applyFilters();
    });
  },

  applyFilters() {
    const { allFlightPaths, searchKeyword, currentFilter } = this.data;
    let list = allFlightPaths;

    // 分类筛选
    if (currentFilter !== 'all') {
      if (['联盟', '部落', '中立'].includes(currentFilter)) {
        list = list.filter(item => item.faction.includes(currentFilter));
      } else if (['东部王国', '卡利姆多', '无限探索区'].includes(currentFilter)) {
        list = list.filter(item => item.continent === currentFilter);
      }
    }

    // 关键词搜索 (匹配区域、NPC、航线目的地)
    if (searchKeyword) {
      list = list.filter(item => {
        const zoneMatch = item.zone.toLowerCase().includes(searchKeyword);
        const npcMatch = item.npc.toLowerCase().includes(searchKeyword);
        const coordMatch = item.coord.toLowerCase().includes(searchKeyword);
        const connMatch = item.connections.some(c => c.toLowerCase().includes(searchKeyword));
        return zoneMatch || npcMatch || coordMatch || connMatch;
      });
    }

    this.setData({ filteredList: list });
  },

  copyCoord(e) {
    const { zone, coord } = e.currentTarget.dataset;
    const wayRegex = /\((\d+\.?\d*),\s*(\d+\.?\d*)\)/;
    const match = coord.match(wayRegex);
    let copyText = coord;
    if (match) {
      copyText = `/way ${match[1]} ${match[2]} ${zone}`;
    }

    wx.setClipboardData({
      data: copyText,
      success: () => {
        wx.showToast({
          title: '已复制坐标宏',
          icon: 'success',
          duration: 1500
        });
      }
    });
  },

  jumpToZone(e) {
    const targetZone = e.currentTarget.dataset.zone;
    this.setData({
      searchKeyword: targetZone,
      currentFilter: 'all'
    }, () => {
      this.applyFilters();
    });
  },

  onStartChange(e) {
    this.setData({
      startIndex: parseInt(e.detail.value, 10),
      routeResult: null
    });
  },

  onDestChange(e) {
    this.setData({
      destIndex: parseInt(e.detail.value, 10),
      routeResult: null
    });
  },

  planRoute() {
    const { startZones, startIndex, destIndex, allFlightPaths } = this.data;
    const startName = startZones[startIndex];
    const destName = startZones[destIndex];

    if (startName === destName) {
      wx.showToast({ title: '出发点与目的地相同', icon: 'none' });
      return;
    }

    const startNode = allFlightPaths.find(p => p.zone === startName);
    const destNode = allFlightPaths.find(p => p.zone === destName);

    if (!startNode || !destNode) {
      wx.showToast({ title: '无法找到对应航线节点', icon: 'none' });
      return;
    }

    // 检查直达
    const isDirect = startNode.connections.some(c => destName.includes(c) || c.includes(destName));
    if (isDirect) {
      this.setData({
        routeResult: {
          type: 'direct',
          hops: [startNode.zone, destNode.zone],
          flightTime: '约 1 分 40 秒',
          npc: `${startNode.npc} ➔ ${destNode.npc}`,
          factionCheck: startNode.faction === destNode.faction || startNode.faction === '中立' || destNode.faction === '中立'
        }
      });
      return;
    }

    // 检查1次中转
    let transfer = null;
    for (const c of startNode.connections) {
      const midNode = allFlightPaths.find(p => p.zone.includes(c) || c.includes(p.zone));
      if (midNode && midNode.connections.some(nc => destName.includes(nc) || nc.includes(destName))) {
        transfer = midNode.zone;
        break;
      }
    }

    if (transfer) {
      this.setData({
        routeResult: {
          type: 'transfer',
          hops: [startNode.zone, transfer, destNode.zone],
          flightTime: '约 3 分 30 秒 (含中转)',
          npc: `${startNode.npc} ➔ 联络点 ➔ ${destNode.npc}`,
          factionCheck: true
        }
      });
    } else {
      // 跨大陆或需开辟航线
      this.setData({
        routeResult: {
          type: 'cross',
          hops: [startNode.zone, '需乘船/飞艇跨大陆或开辟新航点', destNode.zone],
          flightTime: '跨大陆长途飞行',
          npc: '推荐前往藏宝海湾/棘齿城码头乘船转机',
          factionCheck: true
        }
      });
    }
  }
,
  onShareAppMessage() {
    return {
      title: '魔兽世界无限服 - 世界地图与飞行路线NPC速查',
      path: `/pages/infinite-map/infinite-map?tab=${this.data.activeTab}&filter=${this.data.currentFilter}`
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界无限服 - 世界地图与飞行路线NPC速查',
      path: `/pages/infinite-map/infinite-map?tab=${this.data.activeTab}&filter=${this.data.currentFilter}`
    };
  }
});
