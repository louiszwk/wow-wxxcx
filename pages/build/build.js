// pages/build/build.js
const equipmentDb = require('../../data/wow_equipment_db.js');
const guidesData = require('../../data/wow_guides_data.js');

// BiS 清单的槽位标签 -> 配装编辑器的 equippedGear 键
const BIS_SLOT_MAP = {
  '头部': 'head', '颈部': 'neck', '肩部': 'shoulder', '背部': 'back',
  '胸部': 'chest', '腕部': 'wrist', '手部': 'hands', '腰部': 'waist',
  '腿部': 'legs', '脚部': 'feet',
  '戒指 1': 'finger1', '戒指 2': 'finger2', '戒指1': 'finger1', '戒指2': 'finger2',
  '饰品 1': 'trinket1', '饰品 2': 'trinket2', '饰品1': 'trinket1', '饰品2': 'trinket2',
  '主手武器': 'mainHand', '主手': 'mainHand', '武器': 'mainHand', '双手武器': 'mainHand', '主手/双手': 'mainHand',
  '副手/盾牌': 'offHand', '副手': 'offHand', '副手武器': 'offHand', '盾牌': 'offHand'
};

const TWO_HANDED_TYPES = ['双手剑', '双手斧', '双手锤', '法杖', '长柄武器', '弓', '枪械', '弩'];
const ONE_HANDED_TYPES = ['单手剑', '单手斧', '单手锤', '匕首', '拳套', '战刃', '魔杖'];

const WOW_CLASSES = [
  {
    id: 'warrior', name: '战士', icon: '⚔️', color: '#C69B6D', armor: '板甲', mainStat: '力量',
    specs: [
      { id: 'arms', name: '武器', desc: '主双手武器 (双手剑/斧/锤)' },
      { id: 'fury', name: '狂怒', desc: '泰坦之握 (支持双持两把双手武器)' },
      { id: 'protection', name: '防护', desc: '单手武器 + 盾牌' }
    ]
  },
  {
    id: 'paladin', name: '圣骑士', icon: '🛡️', color: '#F48CBA', armor: '板甲', mainStat: '力量',
    specs: [
      { id: 'retribution', name: '惩戒', desc: '主双手武器 (双手斧/双手锤/双手剑)' },
      { id: 'protection', name: '防护', desc: '单手武器 + 盾牌' },
      { id: 'holy', name: '神圣', desc: '单手武器 + 盾牌/副手 或 双手法杖' }
    ]
  },
  {
    id: 'death-knight', name: '死亡骑士', icon: '💀', color: '#C41E3A', armor: '板甲', mainStat: '力量',
    specs: [
      { id: 'blood', name: '鲜血', desc: '双手武器 (双手斧/剑)' },
      { id: 'frost', name: '冰霜', desc: '双持单手 或 双手武器' },
      { id: 'unholy', name: '邪恶', desc: '双手武器' }
    ]
  },
  {
    id: 'hunter', name: '猎人', icon: '🏹', color: '#AAD372', armor: '锁甲', mainStat: '敏捷',
    specs: [
      { id: 'beast-mastery', name: '野兽控制', desc: '双手远程 (弓/枪械/弩)' },
      { id: 'marksmanship', name: '射击', desc: '双手远程 (弓/枪械/弩)' },
      { id: 'survival', name: '生存', desc: '双手长柄武器/双手斧' }
    ]
  },
  {
    id: 'shaman', name: '萨满祭司', icon: '⚡', color: '#0070DE', armor: '锁甲', mainStat: '智力',
    specs: [
      { id: 'elemental', name: '元素', desc: '单手武器 + 盾牌 或 双手法杖' },
      { id: 'enhancement', name: '增强', desc: '双持单手武器 (单手斧/单手锤)' },
      { id: 'restoration', name: '恢复', desc: '单手武器 + 盾牌 或 双手法杖' }
    ]
  },
  {
    id: 'evoker', name: '唤魔师', icon: '🐉', color: '#33937F', armor: '锁甲', mainStat: '智力',
    specs: [
      { id: 'devastation', name: '湮灭', desc: '双手法杖 或 单手+副手' },
      { id: 'preservation', name: '恩护', desc: '双手法杖 或 单手+副手' },
      { id: 'augmentation', name: '增辉', desc: '双手法杖 或 单手+副手' }
    ]
  },
  {
    id: 'rogue', name: '潜行者', icon: '🗡️', color: '#FFF468', armor: '皮甲', mainStat: '敏捷',
    specs: [
      { id: 'assassination', name: '奇袭', desc: '双持匕首' },
      { id: 'outlaw', name: '狂徒', desc: '单手剑/斧/拳套 + 副手匕首/单手' },
      { id: 'subtlety', name: '敏锐', desc: '双持匕首' }
    ]
  },
  {
    id: 'demon-hunter', name: '恶魔猎手', icon: '🦇', color: '#A330C9', armor: '皮甲', mainStat: '敏捷',
    specs: [
      { id: 'havoc', name: '浩劫', desc: '双持战刃/单手剑/单手斧' },
      { id: 'vengeance', name: '复仇', desc: '双持战刃/单手剑/单手斧' },
      { id: 'devourer', name: '噬灭', desc: '12.1 新增专精 · 双持战刃/单手剑' }
    ]
  },
  {
    id: 'druid', name: '德鲁伊', icon: '🐻', color: '#FF7C0A', armor: '皮甲', mainStat: '敏捷',
    specs: [
      { id: 'balance', name: '平衡', desc: '双手法杖/双手锤 或 单手+副手' },
      { id: 'feral', name: '野性', desc: '双手长柄/双手锤' },
      { id: 'guardian', name: '守护', desc: '双手长柄/双手锤' },
      { id: 'restoration', name: '恢复', desc: '双手法杖 或 单手+副手' }
    ]
  },
  {
    id: 'monk', name: '武僧', icon: '🥋', color: '#00FF98', armor: '皮甲', mainStat: '敏捷',
    specs: [
      { id: 'brewmaster', name: '酒仙', desc: '双手长柄/双手法杖 或 双持单手' },
      { id: 'mistweaver', name: '织雾', desc: '双手法杖 或 单手+副手' },
      { id: 'windwalker', name: '踏风', desc: '双持单手武器 (拳套/单手剑/斧/锤)' }
    ]
  },
  {
    id: 'mage', name: '法师', icon: '🔥', color: '#3FC7EB', armor: '布甲', mainStat: '智力',
    specs: [
      { id: 'arcane', name: '奥术', desc: '双手法杖 或 单手剑/匕首/魔杖+副手' },
      { id: 'fire', name: '火焰', desc: '双手法杖 或 单手剑/匕首/魔杖+副手' },
      { id: 'frost', name: '冰霜', desc: '双手法杖 或 单手剑/匕首/魔杖+副手' }
    ]
  },
  {
    id: 'warlock', name: '术士', icon: '👿', color: '#8788EE', armor: '布甲', mainStat: '智力',
    specs: [
      { id: 'affliction', name: '痛苦', desc: '双手法杖 或 单手剑/匕首/魔杖+副手' },
      { id: 'demonology', name: '恶魔学识', desc: '双手法杖 或 单手剑/匕首/魔杖+副手' },
      { id: 'destruction', name: '毁灭', desc: '双手法杖 或 单手剑/匕首/魔杖+副手' }
    ]
  },
  {
    id: 'priest', name: '牧师', icon: '✨', color: '#FFFFFF', armor: '布甲', mainStat: '智力',
    specs: [
      { id: 'discipline', name: '戒律', desc: '双手法杖 或 单手锤/匕首/魔杖+副手' },
      { id: 'holy', name: '神圣', desc: '双手法杖 或 单手锤/匕首/魔杖+副手' },
      { id: 'shadow', name: '暗影', desc: '双手法杖 或 单手锤/匕首/魔杖+副手' }
    ]
  }
];

const SLOTS_CONFIG = [
  // 左侧栏 6 部位
  { id: 'head', name: '头部', icon: '🪖', accepted: ['头部'], col: 'left' },
  { id: 'neck', name: '颈部', icon: '📿', accepted: ['颈部'], col: 'left' },
  { id: 'shoulder', name: '肩部', icon: '🥋', accepted: ['肩部'], col: 'left' },
  { id: 'back', name: '背部', icon: '🧣', accepted: ['背部'], col: 'left' },
  { id: 'chest', name: '胸部', icon: '🦺', accepted: ['胸部'], col: 'left' },
  { id: 'wrist', name: '腕部', icon: '⌚', accepted: ['腕部'], col: 'left' },

  // 右侧栏 6 部位
  { id: 'hands', name: '手部', icon: '🧤', accepted: ['手部'], col: 'right' },
  { id: 'waist', name: '腰部', icon: '🎗️', accepted: ['腰部'], col: 'right' },
  { id: 'legs', name: '腿部', icon: '👖', accepted: ['腿部'], col: 'right' },
  { id: 'feet', name: '脚部', icon: '🥾', accepted: ['脚部'], col: 'right' },
  { id: 'finger1', name: '手指 1', icon: '💍', accepted: ['手指'], col: 'right' },
  { id: 'finger2', name: '手指 2', icon: '💍', accepted: ['手指'], col: 'right' },

  // 底部栏 4 部位
  { id: 'trinket1', name: '饰品 1', icon: '🔮', accepted: ['饰品'], col: 'bottom' },
  { id: 'trinket2', name: '饰品 2', icon: '🔮', accepted: ['饰品'], col: 'bottom' },
  { id: 'mainHand', name: '主手武器', icon: '⚔️', accepted: ['单手', '双手', '主手', '远程'], col: 'bottom' },
  { id: 'offHand', name: '副手/盾牌', icon: '🛡️', accepted: ['单手', '副手', '盾牌', '双手'], col: 'bottom' }
];

// 直接由统一权威装备库派生，数据更新后筛选器自动同步，不再写死分类名
const SOURCE_ORDER = ['烈毒之渊', '潮缚石窟', '基希克斯破封', '史诗钥石', '套装', '地下堡掉落'];
const DUNGEON_PRIORITY = ['全部', ...SOURCE_ORDER.filter(d => equipmentDb.some(i => i.source_dungeon === d))];
const STAT_OPTIONS = ['全部', '暴击', '急速', '精通', '全能'];

// 12.1 S2 初始精选方案样本
function getInitialStarterBuilds() {
  // 从统一权威装备库按部位自动挑选，避免写死旧版装备名（数据重建后会全部失效）
  const bySlot = (slot, armor) => equipmentDb.find(i =>
    i.slot === slot && (!armor || i.item_class === armor || i.item_class === '其他'));
  const ARMOR_SLOTS = {
    head: '头部', shoulder: '肩部', chest: '胸部', wrist: '腕部',
    hands: '手部', waist: '腰部', legs: '腿部', feet: '脚部'
  };
  const makeGear = (armor, mainSlots, withOffHand) => {
    const gear = {};
    Object.keys(ARMOR_SLOTS).forEach(key => {
      const it = bySlot(ARMOR_SLOTS[key], armor);
      if (it) gear[key] = it;
    });
    [['neck', '颈部'], ['back', '背部'], ['finger1', '手指'], ['trinket1', '饰品']]
      .forEach(([key, slot]) => {
        const it = bySlot(slot);
        if (it) gear[key] = it;
      });
    const main = equipmentDb.find(i => mainSlots.includes(i.slot));
    if (main) gear.mainHand = main;
    if (withOffHand) {
      const off = equipmentDb.find(i => ['副手', '盾牌'].includes(i.slot));
      if (off) gear.offHand = off;
    }
    return gear;
  };
  const common = { classId: 'paladin', className: '圣骑士', classColor: '#F48CBA', classIcon: '🛡️' };
  return [
    {
      id: 'starter_paladin_ret', name: '12.1.5 惩戒骑 · 双手武器流', ...common,
      specId: 'retribution', specName: '惩戒',
      equippedGear: makeGear('板甲', ['双手'], false),
      updatedAtText: '12.1.5 官方装备库精选'
    },
    {
      id: 'starter_paladin_prot', name: '12.1.5 防护骑 · 单手加盾', ...common,
      specId: 'protection', specName: '防护',
      equippedGear: makeGear('板甲', ['单手'], true),
      updatedAtText: '12.1.5 官方装备库精选'
    }
  ];
}

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',

    // 视图切换：'list' (方案库列表) | 'editor' (配装编辑试穿)
    currentView: 'list',

    // 全职业与专精配置
    classes: WOW_CLASSES,

    // ================= 列表页状态 =================
    selectedClassFilter: { id: 'all', name: '全部职业', color: '#38bdf8' },
    selectedSpecFilterId: 'all',
    specFilterOptions: [],
    savedBuilds: [],
    filteredBuilds: [],

    // ================= 专精 BiS 配装清单 =================
    bisGearExpanded: true,
    bisClassIndex: 0,
    bisSpecIndex: 0,
    bisSpecOptions: WOW_CLASSES[0].specs,
    bisSpecLabel: WOW_CLASSES[0].name + ' · ' + WOW_CLASSES[0].specs[0].name,
    bisGearRows: [],

    // ================= 编辑器状态 =================
    currentBuild: {
      id: null,
      name: '',
      classId: 'paladin',
      className: '圣骑士',
      classColor: '#F48CBA',
      classIcon: '🛡️',
      specId: 'retribution',
      specName: '惩戒'
    },
    currentClassIndex: 1, // 默认圣骑士
    currentSpecIndex: 0,  // 默认惩戒

    slotsConfig: SLOTS_CONFIG,
    equippedGear: {},
    statsSummary: {
      count: 0,
      critScore: 0,
      hasteScore: 0,
      masteryScore: 0,
      versaScore: 0,
      critPercent: 0,
      hastePercent: 0,
      masteryPercent: 0,
      versaPercent: 0,
      sourcesList: []
    },

    // 双手武器与副手锁定判定
    isMainHandTwoHanded: false,
    isOffHandLocked: false,

    // 是否来自好友分享
    isFromShare: false,

    // 装备选择抽屉
    isDrawerOpen: false,
    activeSlot: null,
    searchQuery: '',
    dungeonFilters: DUNGEON_PRIORITY,
    selectedDungeonFilter: '全部',
    statFilters: STAT_OPTIONS,
    selectedStatFilter: '全部',
    onlyMatchArmor: true,
    candidateItems: [],

    // 分享弹窗
    isShareModalOpen: false,
    sharingBuild: null
  },

  onLoad(options) {
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

    // 初始化已保存的配装库与专精 BiS 清单
    this.loadSavedBuilds();
    this.refreshBisGear();

    // 检查是否通过分享口令进入
    if (options && options.shareCode) {
      try {
        // 小程序框架已对 query 解码一次；再无条件 decodeURIComponent 会在名字含 % 时抛 URIError
        let importedBuild = null;
        try {
          importedBuild = JSON.parse(options.shareCode);
        } catch (e) {
          importedBuild = JSON.parse(decodeURIComponent(options.shareCode));
        }
        if (importedBuild && importedBuild.name) {
          this.loadBuildIntoEditor(importedBuild, true);
          wx.showToast({ title: '已载入分享配装', icon: 'success' });
          return;
        }
      } catch (err) {
        console.warn('解析分享代码失败:', err);
      }
    }
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  // 顶部导航返回
  onNavBack() {
    if (this.data.currentView === 'editor') {
      // 从编辑器返回列表页，刷新列表
      this.loadSavedBuilds();
      this.setData({ currentView: 'list', isFromShare: false });
    } else {
      wx.navigateBack({
        delta: 1,
        fail: () => {
          wx.reLaunch({ url: '/pages/index/index' });
        }
      });
    }
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  // ========================================================
  // 列表视图逻辑 (筛选、展示、管理)
  // ========================================================
  loadSavedBuilds() {
    let builds = wx.getStorageSync('wow_saved_builds');
    if (!builds || !Array.isArray(builds) || builds.length === 0) {
      // 首次加载，写入 12.1 S2 精选样本
      builds = getInitialStarterBuilds();
      wx.setStorageSync('wow_saved_builds', builds);
    }

    // 计算每个方案的属性概览和武器预览
    builds.forEach(b => {
      const gear = b.equippedGear || {};
      const { summary, weaponPreview } = this.computeBuildSummary(gear, b.classId, b.specId);
      b.statsSummary = summary;
      b.equippedCount = summary.count;
      b.weaponPreview = weaponPreview;
    });

    this.setData({ savedBuilds: builds }, () => {
      this.applyListFilters();
    });
  },

  // 切换职业筛选
  onSelectClassFilter(e) {
    const classId = e.currentTarget.dataset.id;
    if (classId === 'all') {
      this.setData({
        selectedClassFilter: { id: 'all', name: '全部职业', color: '#38bdf8' },
        selectedSpecFilterId: 'all',
        specFilterOptions: []
      }, () => {
        this.applyListFilters();
      });
      return;
    }

    const cls = WOW_CLASSES.find(c => c.id === classId);
    if (!cls) return;

    this.setData({
      selectedClassFilter: cls,
      selectedSpecFilterId: 'all',
      specFilterOptions: cls.specs || []
    }, () => {
      this.applyListFilters();
    });
  },

  // 切换专精筛选
  onSelectSpecFilter(e) {
    const specId = e.currentTarget.dataset.id;
    this.setData({ selectedSpecFilterId: specId }, () => {
      this.applyListFilters();
    });
  },

  // 过滤配装列表
  applyListFilters() {
    const { savedBuilds, selectedClassFilter, selectedSpecFilterId } = this.data;
    let list = [...savedBuilds];

    if (selectedClassFilter.id !== 'all') {
      list = list.filter(b => b.classId === selectedClassFilter.id);
    }

    if (selectedSpecFilterId !== 'all') {
      list = list.filter(b => b.specId === selectedSpecFilterId);
    }

    this.setData({ filteredBuilds: list });
  },

  // ========================================================
  // 专精 BiS 配装：40 专精清单 + 一键载入配装编辑器
  // ========================================================
  toggleBisGear() {
    this.setData({ bisGearExpanded: !this.data.bisGearExpanded });
  },

  onBisClassChange(e) {
    const idx = Number(e.detail.value) || 0;
    const cls = WOW_CLASSES[idx];
    if (!cls) return;
    this.setData({
      bisClassIndex: idx,
      bisSpecIndex: 0,
      bisSpecOptions: cls.specs || []
    }, () => this.refreshBisGear());
  },

  onBisSpecChange(e) {
    this.setData({ bisSpecIndex: Number(e.detail.value) || 0 }, () => this.refreshBisGear());
  },

  refreshBisGear() {
    const cls = WOW_CLASSES[this.data.bisClassIndex] || WOW_CLASSES[0];
    const specs = cls.specs || [];
    const spec = specs[this.data.bisSpecIndex] || specs[0];
    if (!spec) return;

    const customKey = 'wow_guide_' + cls.id + '_' + spec.id;
    let guide = null;
    let isFromBackend = false;

    // 1. 优先读取后台录入的本地持久化数据
    try {
      const cached = wx.getStorageSync(customKey);
      if (cached && cached.gear && (
        (cached.gear.left && cached.gear.left.length > 0) ||
        (cached.gear.right && cached.gear.right.length > 0) ||
        (cached.gear.weapons && cached.gear.weapons.length > 0)
      )) {
        guide = cached;
        isFromBackend = true;
      }
    } catch (e) {}

    // 2. 异步尝试从云数据库查询最新配置更新缓存
    if (wx.cloud && typeof wx.cloud.database === 'function') {
      try {
        const db = wx.cloud.database();
        db.collection('wow_guides').where({ classSlug: cls.id, specId: spec.id }).get().then(res => {
          if (res.data && res.data.length > 0) {
            const doc = res.data[0];
            const d = doc.data || doc;
            if (d && d.gear) {
              wx.setStorageSync(customKey, d);
              const curCls = WOW_CLASSES[this.data.bisClassIndex];
              const curSpec = curCls && curCls.specs[this.data.bisSpecIndex];
              if (curCls && curCls.id === cls.id && curSpec && curSpec.id === spec.id) {
                this.renderBisGearFromGuide(cls, spec, d, true);
              }
            }
          }
        }).catch(() => {});
      } catch (err) {}
    }

    // 3. 兜底官方权威库
    if (!guide) {
      guide = guidesData.find(g => g.classSlug === cls.id && g.specId === spec.id);
    }

    this.renderBisGearFromGuide(cls, spec, guide, isFromBackend);
  },

  renderBisGearFromGuide(cls, spec, guide, isFromBackend) {
    if (!guide || !guide.gear) {
      this.setData({
        bisSpecLabel: cls.name + ' · ' + spec.name,
        bisGearRows: []
      });
      return;
    }

    const allItems = [
      ...(guide.gear.left || []),
      ...(guide.gear.right || []),
      ...(guide.gear.weapons || [])
    ];

    const rows = allItems.map(r => {
      const found = equipmentDb.find(x =>
        (r.itemId && String(x.id) === String(r.itemId)) ||
        (r.name && x.name === r.name)
      );
      return {
        slot: r.slot,
        name: r.name,
        icon: (found && found.icon) || r.icon || 'inv_misc_questionmark',
        ilvl: (found && found.item_level) || r.ilvl || 639,
        statCombo: (found && (found.stat_combo || (found.secondary_stats && found.secondary_stats.ratio_text))) || r.statCombo || r.desc || '',
        itemId: (found && found.id) || r.itemId || null
      };
    });

    this.setData({
      bisSpecLabel: cls.name + ' · ' + spec.name + (isFromBackend ? ' (后台最新配置)' : ''),
      bisGearRows: rows
    });
  },

  // 把该专精的 BiS 清单转成一套可编辑配装方案
  loadBisIntoEditor() {
    const cls = WOW_CLASSES[this.data.bisClassIndex] || WOW_CLASSES[0];
    const specs = cls.specs || [];
    const spec = specs[this.data.bisSpecIndex] || specs[0];
    if (!spec) return;

    const customKey = 'wow_guide_' + cls.id + '_' + spec.id;
    let guide = null;
    let isFromBackend = false;
    try {
      const cached = wx.getStorageSync(customKey);
      if (cached && cached.gear) {
        guide = cached;
        isFromBackend = true;
      }
    } catch (e) {}

    if (!guide) {
      guide = guidesData.find(g => g.classSlug === cls.id && g.specId === spec.id);
    }

    if (!guide || !guide.gear) {
      wx.showToast({ title: '该专精暂无 BiS 清单', icon: 'none' });
      return;
    }

    const gear = {};
    const allItems = [
      ...(guide.gear.left || []),
      ...(guide.gear.right || []),
      ...(guide.gear.weapons || [])
    ];

    allItems.forEach(r => {
      const key = BIS_SLOT_MAP[r.slot];
      if (!key) return;
      const item = equipmentDb.find(x =>
        (r.itemId && String(x.id) === String(r.itemId)) ||
        (r.name && x.name === r.name)
      );
      if (item) {
        gear[key] = item;
      } else if (r.name) {
        gear[key] = {
          id: r.itemId || ('custom_' + Date.now()),
          name: r.name,
          slot: r.slot,
          icon: r.icon || 'inv_misc_questionmark',
          item_level: r.ilvl || 639,
          quality: r.quality || 'epic',
          stat_combo: r.statCombo || r.desc || '12.1 S2'
        };
      }
    });

    this.loadBuildIntoEditor({
      id: 'build_' + Date.now(),
      name: cls.name + ' · ' + spec.name + (isFromBackend ? ' 后台BiS' : ' BiS 配装'),
      classId: cls.id,
      className: cls.name,
      classColor: cls.color,
      classIcon: cls.icon,
      specId: spec.id,
      specName: spec.name,
      equippedGear: gear,
      updatedAtText: isFromBackend ? '来自后台最新 BiS 录入' : '来自 12.1.5 BiS 清单'
    }, false);
    wx.showToast({ title: '已载入 ' + Object.keys(gear).length + ' 件 BiS', icon: 'success' });
  },

  // 打开新配装编辑器
  openNewBuildEditor() {
    let classIdx = 1; // 默认圣骑士
    let specIdx = 0;  // 默认惩戒

    // 如果当前筛选了具体职业，直接以该职业开始
    if (this.data.selectedClassFilter.id !== 'all') {
      const foundIdx = WOW_CLASSES.findIndex(c => c.id === this.data.selectedClassFilter.id);
      if (foundIdx !== -1) classIdx = foundIdx;
      if (this.data.selectedSpecFilterId !== 'all') {
        const sIdx = WOW_CLASSES[classIdx].specs.findIndex(s => s.id === this.data.selectedSpecFilterId);
        if (sIdx !== -1) specIdx = sIdx;
      }
    }

    const curClass = WOW_CLASSES[classIdx];
    const curSpec = curClass.specs[specIdx];

    const newBuild = {
      id: 'build_' + Date.now(),
      name: `${curClass.name} · ${curSpec.name} 自定义配装`,
      classId: curClass.id,
      className: curClass.name,
      classColor: curClass.color,
      classIcon: curClass.icon,
      specId: curSpec.id,
      specName: curSpec.name,
      equippedGear: {},
      updatedAtText: '刚刚创建'
    };

    this.loadBuildIntoEditor(newBuild, false);
  },

  // 打开现有配装进行编辑
  openEditBuild(e) {
    const build = e.currentTarget.dataset.build;
    if (!build) return;
    this.loadBuildIntoEditor(build, false);
  },

  // 复制并新建配装
  duplicateBuild(e) {
    const build = e.currentTarget.dataset.build;
    if (!build) return;

    const cloned = JSON.parse(JSON.stringify(build));
    cloned.id = 'build_' + Date.now();
    cloned.name = `${cloned.name} (副本)`;
    cloned.updatedAtText = '刚刚复制';

    const list = [cloned, ...this.data.savedBuilds];
    wx.setStorageSync('wow_saved_builds', list);
    this.setData({ savedBuilds: list }, () => {
      this.applyListFilters();
      wx.showToast({ title: '已复制新建方案', icon: 'success' });
    });
  },

  // 删除配装
  confirmDeleteBuild(e) {
    const build = e.currentTarget.dataset.build;
    if (!build) return;

    wx.showModal({
      title: '确认删除方案',
      content: `确定删除配装方案「${build.name}」吗？`,
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return;

        const list = this.data.savedBuilds.filter(b => b.id !== build.id);
        wx.setStorageSync('wow_saved_builds', list);
        this.setData({ savedBuilds: list }, () => {
          this.applyListFilters();
          wx.showToast({ title: '方案已删除', icon: 'success' });
        });
      }
    });
  },

  // ========================================================
  // 编辑器视图逻辑 (纸娃娃、双手武器判定、实时统计)
  // ========================================================
  loadBuildIntoEditor(build, isFromShare) {
    let classIdx = WOW_CLASSES.findIndex(c => c.id === build.classId);
    if (classIdx === -1) classIdx = 1;
    let specIdx = WOW_CLASSES[classIdx].specs.findIndex(s => s.id === build.specId);
    if (specIdx === -1) specIdx = 0;

    const gear = build.equippedGear || {};

    // 检查武器双手锁定逻辑
    const { isMain2H, isOffHandLocked } = this.checkWeaponHands(gear, build.classId, build.specId);

    // 如果双手武器锁定且副手存在，则清除副手
    if (isOffHandLocked && gear.offHand) {
      delete gear.offHand;
    }

    const { summary } = this.computeBuildSummary(gear, build.classId, build.specId);

    this.setData({
      currentView: 'editor',
      currentBuild: { ...build },
      currentClassIndex: classIdx,
      currentSpecIndex: specIdx,
      equippedGear: gear,
      statsSummary: summary,
      isMainHandTwoHanded: isMain2H,
      isOffHandLocked: isOffHandLocked,
      isFromShare: !!isFromShare
    });
  },

  // 判定主手是否为双手武器，以及副手是否锁死占用
  checkWeaponHands(gear, classId, specId) {
    const mainHandItem = gear.mainHand;
    if (!mainHandItem) {
      return { isMain2H: false, isOffHandLocked: false };
    }

    const itemClass = mainHandItem.item_class;
    const isMain2H = TWO_HANDED_TYPES.includes(itemClass);

    // 狂暴战特殊天赋：泰坦之握 (可以双持双手武器)
    const isFuryWarrior = classId === 'warrior' && specId === 'fury';

    const isOffHandLocked = isMain2H && !isFuryWarrior;

    return { isMain2H, isOffHandLocked };
  },

  // 方案名称输入
  onBuildNameInput(e) {
    this.setData({ 'currentBuild.name': e.detail.value });
  },

  // 切换职业
  onClassChange(e) {
    const classIdx = Number(e.detail.value);
    const newClass = WOW_CLASSES[classIdx];
    const newSpec = newClass.specs[0];

    const currentBuild = {
      ...this.data.currentBuild,
      classId: newClass.id,
      className: newClass.name,
      classColor: newClass.color,
      classIcon: newClass.icon,
      specId: newSpec.id,
      specName: newSpec.name
    };

    // 检查双手武器占用
    const { isMain2H, isOffHandLocked } = this.checkWeaponHands(this.data.equippedGear, newClass.id, newSpec.id);
    const gear = { ...this.data.equippedGear };
    if (isOffHandLocked && gear.offHand) {
      delete gear.offHand;
    }

    const { summary } = this.computeBuildSummary(gear, newClass.id, newSpec.id);

    this.setData({
      currentClassIndex: classIdx,
      currentSpecIndex: 0,
      currentBuild: currentBuild,
      equippedGear: gear,
      statsSummary: summary,
      isMainHandTwoHanded: isMain2H,
      isOffHandLocked: isOffHandLocked
    });
  },

  // 切换专精
  onSpecChange(e) {
    const specIdx = Number(e.detail.value);
    const curClass = WOW_CLASSES[this.data.currentClassIndex];
    const newSpec = curClass.specs[specIdx];

    const currentBuild = {
      ...this.data.currentBuild,
      specId: newSpec.id,
      specName: newSpec.name
    };

    const { isMain2H, isOffHandLocked } = this.checkWeaponHands(this.data.equippedGear, curClass.id, newSpec.id);
    const gear = { ...this.data.equippedGear };
    if (isOffHandLocked && gear.offHand) {
      delete gear.offHand;
    }

    const { summary } = this.computeBuildSummary(gear, curClass.id, newSpec.id);

    this.setData({
      currentSpecIndex: specIdx,
      currentBuild: currentBuild,
      equippedGear: gear,
      statsSummary: summary,
      isMainHandTwoHanded: isMain2H,
      isOffHandLocked: isOffHandLocked
    });
  },

  // 点击副手卡片 (如果锁死则阻断并提示)
  onOffHandSlotTap(e) {
    if (this.data.isOffHandLocked) {
      wx.showModal({
        title: '双手武器已占用副手',
        content: '当前主手装备了双手武器，根据魔兽机制已占用副手栏位。\n（若切换为单手武器或狂暴战泰坦之握专精，可解锁副手装备）',
        showCancel: false,
        confirmText: '我知道了'
      });
      return;
    }
    this.openSlotDrawer(e);
  },

  // 打开装备选择抽屉
  openSlotDrawer(e) {
    const slotId = e.currentTarget.dataset.slotId;
    const slotConfig = SLOTS_CONFIG.find(s => s.id === slotId);
    if (!slotConfig) return;

    this.setData({
      isDrawerOpen: true,
      activeSlot: slotConfig,
      searchQuery: '',
      selectedDungeonFilter: '全部',
      selectedStatFilter: '全部'
    });

    this.filterDrawerItems();
  },

  closeDrawer() {
    this.setData({ isDrawerOpen: false });
  },

  onSearchInput(e) {
    this.setData({ searchQuery: e.detail.value });
    this.filterDrawerItems();
  },

  toggleArmorMatch() {
    this.setData({ onlyMatchArmor: !this.data.onlyMatchArmor });
    this.filterDrawerItems();
  },

  onStatFilterChange(e) {
    this.setData({ selectedStatFilter: e.currentTarget.dataset.stat });
    this.filterDrawerItems();
  },

  onDungeonFilterChange(e) {
    this.setData({ selectedDungeonFilter: e.currentTarget.dataset.dungeon });
    this.filterDrawerItems();
  },

  // 筛选候选装备
  filterDrawerItems() {
    const { activeSlot, searchQuery, selectedDungeonFilter, selectedStatFilter, onlyMatchArmor, currentClassIndex, currentSpecIndex } = this.data;
    if (!activeSlot) return;

    const curClass = WOW_CLASSES[currentClassIndex];
    const curSpec = curClass.specs[currentSpecIndex];
    const curArmor = curClass.armor;

    // 确定接受的 slot
    let accepted = activeSlot.accepted || [activeSlot.name];

    // 过滤候选装备
    let candidates = equipmentDb.filter(item => {
      // 1. 部位匹配
      let passSlot = accepted.includes(item.slot);
      if (activeSlot.id === 'mainHand') {
        passSlot = ['单手', '双手', '主手', '远程'].includes(item.slot);
      } else if (activeSlot.id === 'offHand') {
        // 副手可以是盾牌、副手物品，或允许双持的单手武器
        passSlot = ['副手', '盾牌', '单手'].includes(item.slot);
        if (curClass.id === 'warrior' && curSpec.id === 'fury') {
          // 狂暴战允许双持双手武器
          passSlot = ['双手', '单手', '副手', '盾牌'].includes(item.slot);
        }
      }
      if (!passSlot) return false;

      // 2. 专用护甲匹配 (仅对护甲部位生效)
      if (onlyMatchArmor && ['head', 'shoulder', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet'].includes(activeSlot.id)) {
        if (item.item_class !== curArmor && item.item_class !== '其他') {
          return false;
        }
      }

      // 3. 副本来源筛选
      if (selectedDungeonFilter !== '全部') {
        if (selectedDungeonFilter === '制造业') {
          if (!item.is_crafted) return false;
        } else if (item.source_dungeon !== selectedDungeonFilter) {
          return false;
        }
      }

      // 4. 副属性绿字筛选
      if (selectedStatFilter !== '全部') {
        const stats = item.secondary_stats;
        let passStat = false;
        if (stats && stats.list) {
          passStat = stats.list.some(st => st.name === selectedStatFilter);
        } else if (item.stat_combo) {
          passStat = item.stat_combo.includes(selectedStatFilter);
        }
        if (!passStat) return false;
      }

      // 5. 关键词搜索
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(q);
        const descMatch = (item.source_desc || '').toLowerCase().includes(q);
        const comboMatch = (item.stat_combo || '').toLowerCase().includes(q);
        const classMatch = (item.item_class || '').toLowerCase().includes(q);
        if (!nameMatch && !descMatch && !comboMatch && !classMatch) return false;
      }

      return true;
    });

    this.setData({ candidateItems: candidates });
  },

  // 装备选中物品
  equipItem(e) {
    const item = e.currentTarget.dataset.item;
    const slotId = this.data.activeSlot.id;

    const gear = { ...this.data.equippedGear, [slotId]: item };
    const curClass = WOW_CLASSES[this.data.currentClassIndex];
    const curSpec = curClass.specs[this.data.currentSpecIndex];

    // 如果装备主手且为双手武器，且非狂暴战，自动释放并锁定副手
    const { isMain2H, isOffHandLocked } = this.checkWeaponHands(gear, curClass.id, curSpec.id);
    if (isOffHandLocked && gear.offHand) {
      delete gear.offHand;
      wx.showToast({ title: '主手装备双手武器，副手已自动占用', icon: 'none' });
    }

    const { summary } = this.computeBuildSummary(gear, curClass.id, curSpec.id);

    this.setData({
      equippedGear: gear,
      statsSummary: summary,
      isMainHandTwoHanded: isMain2H,
      isOffHandLocked: isOffHandLocked,
      isDrawerOpen: false
    });
  },

  // 卸下当前部位装备
  unequipSlot(e) {
    const slotId = e.currentTarget.dataset.slotId;
    const gear = { ...this.data.equippedGear };
    delete gear[slotId];

    const curClass = WOW_CLASSES[this.data.currentClassIndex];
    const curSpec = curClass.specs[this.data.currentSpecIndex];

    const { isMain2H, isOffHandLocked } = this.checkWeaponHands(gear, curClass.id, curSpec.id);
    const { summary } = this.computeBuildSummary(gear, curClass.id, curSpec.id);

    this.setData({
      equippedGear: gear,
      statsSummary: summary,
      isMainHandTwoHanded: isMain2H,
      isOffHandLocked: isOffHandLocked,
      isDrawerOpen: false
    });
  },

  // 重置清空当前装备
  clearCurrentSlots() {
    wx.showModal({
      title: '清空确认',
      content: '确定清空当前已装配的所有部位吗？',
      success: (res) => {
        if (!res.confirm) return;
        const curClass = WOW_CLASSES[this.data.currentClassIndex];
        const curSpec = curClass.specs[this.data.currentSpecIndex];
        const { summary } = this.computeBuildSummary({}, curClass.id, curSpec.id);

        this.setData({
          equippedGear: {},
          statsSummary: summary,
          isMainHandTwoHanded: false,
          isOffHandLocked: false
        });
      }
    });
  },

  // 汇总统计当前配装收益
  computeBuildSummary(gear, classId, specId) {
    let crit = 0, haste = 0, mastery = 0, versa = 0;
    let count = 0;
    const sourceMap = {};
    let weaponPreview = '';

    const { isOffHandLocked } = this.checkWeaponHands(gear, classId, specId);

    Object.keys(gear).forEach(slotKey => {
      // 若副手锁死，则副手不计入属性与件数
      if (slotKey === 'offHand' && isOffHandLocked) return;

      const item = gear[slotKey];
      if (!item) return;

      count++;

      // 记录来源
      const src = item.source_dungeon || (item.is_crafted ? '制造业' : '其他');
      sourceMap[src] = (sourceMap[src] || 0) + 1;

      // 累加绿字权重
      const sec = item.secondary_stats;
      if (sec) {
        if (sec.crit_weight) crit += sec.crit_weight;
        if (sec.haste_weight) haste += sec.haste_weight;
        if (sec.mastery_weight) mastery += sec.mastery_weight;
        if (sec.versa_weight) versa += sec.versa_weight;
      }
    });

    // 格式化武器预览文本
    if (gear.mainHand) {
      weaponPreview = `${gear.mainHand.name} (${gear.mainHand.item_class})`;
      if (isOffHandLocked) {
        weaponPreview += ' · [双手武器占用副手]';
      } else if (gear.offHand) {
        weaponPreview += ` + ${gear.offHand.name} (${gear.offHand.item_class})`;
      }
    }

    const totalWeight = crit + haste + mastery + versa;
    let critPct = 0, hastePct = 0, masteryPct = 0, versaPct = 0;

    if (totalWeight > 0) {
      critPct = Math.round((crit / totalWeight) * 100);
      hastePct = Math.round((haste / totalWeight) * 100);
      masteryPct = Math.round((mastery / totalWeight) * 100);
      versaPct = Math.max(0, 100 - (critPct + hastePct + masteryPct));
    }

    const sourcesList = Object.keys(sourceMap).map(k => ({ name: k, count: sourceMap[k] }));

    return {
      summary: {
        count,
        critScore: Math.round(crit * 10) / 10,
        hasteScore: Math.round(haste * 10) / 10,
        masteryScore: Math.round(mastery * 10) / 10,
        versaScore: Math.round(versa * 10) / 10,
        critPercent: critPct,
        hastePercent: hastePct,
        masteryPercent: masteryPct,
        versaPercent: versaPct,
        sourcesList
      },
      weaponPreview
    };
  },

  // 保存当前方案
  saveCurrentBuild() {
    let name = (this.data.currentBuild.name || '').trim();
    const curClass = WOW_CLASSES[this.data.currentClassIndex];
    const curSpec = curClass.specs[this.data.currentSpecIndex];

    if (!name) {
      name = `${curClass.name} · ${curSpec.name} 配装方案`;
    }

    const buildId = this.data.currentBuild.id || ('build_' + Date.now());

    const updatedBuild = {
      id: buildId,
      name: name,
      classId: curClass.id,
      className: curClass.name,
      classColor: curClass.color,
      classIcon: curClass.icon,
      specId: curSpec.id,
      specName: curSpec.name,
      equippedGear: this.data.equippedGear,
      updatedAtText: '刚刚更新'
    };

    // 检查本地列表中是否已有
    const saved = [...this.data.savedBuilds];
    const existingIdx = saved.findIndex(b => b.id === buildId);

    if (existingIdx !== -1) {
      saved[existingIdx] = updatedBuild;
    } else {
      saved.unshift(updatedBuild);
    }

    wx.setStorageSync('wow_saved_builds', saved);

    this.setData({
      currentBuild: updatedBuild,
      isFromShare: false
    });

    wx.showToast({ title: '配装方案已保存！', icon: 'success' });

    // 自动重载列表
    setTimeout(() => {
      this.loadSavedBuilds();
      this.setData({ currentView: 'list' });
    }, 800);
  },

  // ========================================================
  // 分享功能逻辑 (微信卡片分享与清单文本口令导出)
  // ========================================================
  openShareModal(e) {
    const build = e.currentTarget.dataset.build || this.data.currentBuild;
    this.setData({
      isShareModalOpen: true,
      sharingBuild: build
    });
  },

  closeShareModal() {
    this.setData({ isShareModalOpen: false });
  },

  // 复制配装清单文本与导入口令
  copyShareText() {
    const b = this.data.sharingBuild || this.data.currentBuild;
    const text = this.formatBuildShareText(b);

    wx.setClipboardData({
      data: text,
      success: () => {
        this.closeShareModal();
        wx.showToast({ title: '清单口令已复制！', icon: 'success' });
      }
    });
  },

  // 复制纯清单
  exportBuildText() {
    const b = this.data.currentBuild;
    const text = this.formatBuildShareText(b);
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({ title: '配装清单已复制！', icon: 'success' });
      }
    });
  },

  formatBuildShareText(build) {
    const gear = build.equippedGear || {};
    const stats = build.statsSummary || this.computeBuildSummary(gear, build.classId, build.specId).summary;

    let lines = [];
    lines.push(`=== 【艾泽拉斯的微风】12.1 S2 配装方案 ===`);
    lines.push(`方案名称: ${build.name}`);
    lines.push(`职业专精: ${build.className} · ${build.specName}`);
    lines.push(`属性比例: 暴击 ${stats.critPercent}% · 急速 ${stats.hastePercent}% · 精通 ${stats.masteryPercent}% · 全能 ${stats.versaPercent}%`);
    lines.push(`已配部位: ${stats.count} / 16 件`);
    lines.push(`\n【装备清单】`);

    SLOTS_CONFIG.forEach(slot => {
      const item = gear[slot.id];
      if (item) {
        let tag = item.is_crafted ? '[制造业]' : `[${item.source_dungeon || ''}]`;
        lines.push(`${slot.name}: ${item.name} (${item.item_class}) ${tag} - ${item.stat_combo || ''}`);
      } else if (slot.id === 'offHand' && this.data.isOffHandLocked) {
        lines.push(`${slot.name}: [双手武器已自动占用]`);
      }
    });

    // 导入口令码
    const serialized = encodeURIComponent(JSON.stringify(build));
    lines.push(`\n【小程序配装导入口令】`);
    lines.push(`#WOWBUILD#${serialized}#END#`);

    return lines.join('\n');
  },

  // 原生小程序转发分享卡片
  onShareAppMessage() {
    const b = this.data.sharingBuild || this.data.currentBuild;
    const serialized = encodeURIComponent(JSON.stringify(b));

    return {
      title: `【魔兽配装】${b.name} (${b.className}·${b.specName})`,
      path: `/pages/build/build?shareCode=${serialized}`
    };
  }
});
