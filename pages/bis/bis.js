const WOW_CLASSES = [
  {
    id: 'warrior', name: '战士', icon: '⚔️', color: '#C69B6D',
    specs: [
      { id: 'arms', name: '武器' }, { id: 'fury', name: '狂怒' }, { id: 'protection', name: '防护' }
    ]
  },
  {
    id: 'paladin', name: '圣骑士', icon: '🛡️', color: '#F48CBA',
    specs: [
      { id: 'holy', name: '神圣' }, { id: 'protection', name: '防护' }, { id: 'retribution', name: '惩戒' }
    ]
  },
  {
    id: 'hunter', name: '猎人', icon: '🏹', color: '#AAD372',
    specs: [
      { id: 'beast-mastery', name: '野兽控制' }, { id: 'marksmanship', name: '射击' }, { id: 'survival', name: '生存' }
    ]
  },
  {
    id: 'rogue', name: '潜行者', icon: '🗡️', color: '#FFF468',
    specs: [
      { id: 'assassination', name: '奇袭' }, { id: 'outlaw', name: '狂徒' }, { id: 'subtlety', name: '敏锐' }
    ]
  },
  {
    id: 'priest', name: '牧师', icon: '✨', color: '#FFFFFF',
    specs: [
      { id: 'discipline', name: '戒律' }, { id: 'holy', name: '神圣' }, { id: 'shadow', name: '暗影' }
    ]
  },
  {
    id: 'death-knight', name: '死亡骑士', icon: '💀', color: '#C41E3A',
    specs: [
      { id: 'blood', name: '鲜血' }, { id: 'frost', name: '冰霜' }, { id: 'unholy', name: '邪恶' }
    ]
  },
  {
    id: 'shaman', name: '萨满祭司', icon: '⚡', color: '#0070DE',
    specs: [
      { id: 'elemental', name: '元素' }, { id: 'enhancement', name: '增强' }, { id: 'restoration', name: '恢复' }
    ]
  },
  {
    id: 'mage', name: '法师', icon: '🔥', color: '#3FC7EB',
    specs: [
      { id: 'arcane', name: '奥术' }, { id: 'fire', name: '火焰' }, { id: 'frost', name: '冰霜' }
    ]
  },
  {
    id: 'warlock', name: '术士', icon: '👿', color: '#8788EE',
    specs: [
      { id: 'affliction', name: '痛苦' }, { id: 'demonology', name: '恶魔学识' }, { id: 'destruction', name: '毁灭' }
    ]
  },
  {
    id: 'monk', name: '武僧', icon: '🥋', color: '#00FF98',
    specs: [
      { id: 'brewmaster', name: '酒仙' }, { id: 'mistweaver', name: '织雾' }, { id: 'windwalker', name: '踏风' }
    ]
  },
  {
    id: 'druid', name: '德鲁伊', icon: '🐻', color: '#FF7C0A',
    specs: [
      { id: 'balance', name: '平衡' }, { id: 'feral', name: '野性' }, { id: 'guardian', name: '守护' }, { id: 'restoration', name: '恢复' }
    ]
  },
  {
    id: 'demon-hunter', name: '恶魔猎手', icon: '🦇', color: '#A330C9',
    specs: [
      { id: 'havoc', name: '浩劫' }, { id: 'vengeance', name: '复仇' }, { id: 'devourer', name: '噬灭' }
    ]
  },
  {
    id: 'evoker', name: '唤魔师', icon: '🐉', color: '#33937F',
    specs: [
      { id: 'devastation', name: '湮灭' }, { id: 'preservation', name: '恩护' }, { id: 'augmentation', name: '增辉' }
    ]
  }
];

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    classes: WOW_CLASSES,
    expandedClassId: null
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const sysInfo = (wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync());
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navBarHeight: (menuButtonInfo.top - sysInfo.statusBarHeight) * 2 + menuButtonInfo.height + sysInfo.statusBarHeight,
      menuButtonTop: menuButtonInfo.top,
      menuButtonHeight: menuButtonInfo.height
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

  toggleExpand(e) {
    const classId = e.currentTarget.dataset.id;
    if (this.data.expandedClassId === classId) {
      this.setData({ expandedClassId: null });
    } else {
      this.setData({ expandedClassId: classId });
    }
  },

  openBisGuide(e) {
    const classId = e.currentTarget.dataset.class;
    const specId = e.currentTarget.dataset.spec;
    const classObj = WOW_CLASSES.find(c => c.id === classId);
    if (!classObj) return;
    const className = classObj.name;
    const specsStr = encodeURIComponent(JSON.stringify(classObj.specs));
    
    // 使用提取的高保真 UI 渲染并实时请求动态实战数据
    wx.navigateTo({
      url: `/pages/bis-detail/bis-detail?class=${encodeURIComponent(className)}&slug=${classId}&specs=${specsStr}&spec=${specId || ''}`
    });
  }
,
  onShareAppMessage() {
    return {
      title: '魔兽世界全职业 12.1.5 天赋与手法',
      path: '/pages/bis/bis'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界全职业 12.1.5 天赋与手法',
      path: '/pages/bis/bis'
    };
  }
});
