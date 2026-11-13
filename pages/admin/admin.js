// pages/admin/admin.js
const equipmentDb = require('../../data/wow_equipment_db.js');
const defaultGuides = require('../../data/wow_guides_data.js');

const WOW_CLASSES = [
  {
    id: 'warrior', name: '战士', icon: '⚔️', color: '#C69B6D', armor: '板甲',
    specs: [{ id: 'arms', name: '武器' }, { id: 'fury', name: '狂怒' }, { id: 'protection', name: '防护' }]
  },
  {
    id: 'paladin', name: '圣骑士', icon: '🛡️', color: '#F48CBA', armor: '板甲',
    specs: [{ id: 'holy', name: '神圣' }, { id: 'protection', name: '防护' }, { id: 'retribution', name: '惩戒' }]
  },
  {
    id: 'death-knight', name: '死亡骑士', icon: '💀', color: '#C41E3A', armor: '板甲',
    specs: [{ id: 'blood', name: '鲜血' }, { id: 'frost', name: '冰霜' }, { id: 'unholy', name: '邪恶' }]
  },
  {
    id: 'hunter', name: '猎人', icon: '🏹', color: '#AAD372', armor: '锁甲',
    specs: [{ id: 'beast-mastery', name: '野兽控制' }, { id: 'marksmanship', name: '射击' }, { id: 'survival', name: '生存' }]
  },
  {
    id: 'shaman', name: '萨满祭司', icon: '⚡', color: '#0070DE', armor: '锁甲',
    specs: [{ id: 'elemental', name: '元素' }, { id: 'enhancement', name: '增强' }, { id: 'restoration', name: '恢复' }]
  },
  {
    id: 'evoker', name: '唤魔师', icon: '🐉', color: '#33937F', armor: '锁甲',
    specs: [{ id: 'devastation', name: '湮灭' }, { id: 'preservation', name: '恩护' }, { id: 'augmentation', name: '增辉' }]
  },
  {
    id: 'rogue', name: '潜行者', icon: '🗡️', color: '#FFF468', armor: '皮甲',
    specs: [{ id: 'assassination', name: '奇袭' }, { id: 'outlaw', name: '狂徒' }, { id: 'subtlety', name: '敏锐' }]
  },
  {
    id: 'demon-hunter', name: '恶魔猎手', icon: '🦇', color: '#A330C9', armor: '皮甲',
    specs: [{ id: 'havoc', name: '浩劫' }, { id: 'vengeance', name: '复仇' }, { id: 'devourer', name: '噬灭' }]
  },
  {
    id: 'druid', name: '德鲁伊', icon: '🐻', color: '#FF7C0A', armor: '皮甲',
    specs: [{ id: 'balance', name: '平衡' }, { id: 'feral', name: '野性' }, { id: 'guardian', name: '守护' }, { id: 'restoration', name: '恢复' }]
  },
  {
    id: 'monk', name: '武僧', icon: '🥋', color: '#00FF98', armor: '皮甲',
    specs: [{ id: 'brewmaster', name: '酒仙' }, { id: 'mistweaver', name: '织雾' }, { id: 'windwalker', name: '踏风' }]
  },
  {
    id: 'mage', name: '法师', icon: '🔥', color: '#3FC7EB', armor: '布甲',
    specs: [{ id: 'arcane', name: '奥术' }, { id: 'fire', name: '火焰' }, { id: 'frost', name: '冰霜' }]
  },
  {
    id: 'warlock', name: '术士', icon: '👿', color: '#8788EE', armor: '布甲',
    specs: [{ id: 'affliction', name: '痛苦' }, { id: 'demonology', name: '恶魔学识' }, { id: 'destruction', name: '毁灭' }]
  },
  {
    id: 'priest', name: '牧师', icon: '✨', color: '#FFFFFF', armor: '布甲',
    specs: [{ id: 'discipline', name: '戒律' }, { id: 'holy', name: '神圣' }, { id: 'shadow', name: '暗影' }]
  }
];

const SLOTS_CONFIG = [
  { key: 'head', name: '头部', icon: '🪖', accepted: ['头部'] },
  { key: 'neck', name: '颈部', icon: '📿', accepted: ['颈部'] },
  { key: 'shoulder', name: '肩部', icon: '🥋', accepted: ['肩部'] },
  { key: 'back', name: '背部', icon: '🧣', accepted: ['背部'] },
  { key: 'chest', name: '胸部', icon: '🦺', accepted: ['胸部'] },
  { key: 'wrist', name: '腕部', icon: '⌚', accepted: ['腕部'] },
  { key: 'hands', name: '手部', icon: '🧤', accepted: ['手部'] },
  { key: 'waist', name: '腰部', icon: '🎗️', accepted: ['腰部'] },
  { key: 'legs', name: '腿部', icon: '👖', accepted: ['腿部'] },
  { key: 'feet', name: '脚部', icon: '🥾', accepted: ['脚部'] },
  { key: 'ring1', name: '戒指 1', icon: '💍', accepted: ['手指'] },
  { key: 'ring2', name: '戒指 2', icon: '💍', accepted: ['手指'] },
  { key: 'trinket1', name: '饰品 1', icon: '🔮', accepted: ['饰品'] },
  { key: 'trinket2', name: '饰品 2', icon: '🔮', accepted: ['饰品'] },
  { key: 'weaponMain', name: '主手/双手武器', icon: '⚔️', accepted: ['单手', '双手', '主手', '远程'] },
  { key: 'weaponOff', name: '副手/盾牌', icon: '🛡️', accepted: ['单手', '副手', '盾牌'] }
];

// 历史发布数据使用的简写槽位名 -> SLOTS_CONFIG 的规范名
const SLOT_ALIASES = {
  '戒指1': '戒指 1',
  '戒指2': '戒指 2',
  '饰品1': '饰品 1',
  '饰品2': '饰品 2',
  '主手/双手': '主手/双手武器',
  '副手': '副手/盾牌'
};

function initEmptyGear() {
  const gear = {};
  SLOTS_CONFIG.forEach(s => {
    gear[s.key] = { name: '', desc: '', quality: 'epic' };
  });
  return gear;
}

Page({
  data: {
    activeTab: 'build', // 'build' | 'db'

    // ================= 推荐出装编辑状态 =================
    classes: WOW_CLASSES,
    pickerRange: [[], []],
    pickerIndex: [0, 0],
    selectedClass: WOW_CLASSES[0],
    selectedSpec: WOW_CLASSES[0].specs[0],

    slotsList: SLOTS_CONFIG,
    configuredSlotsCount: 0,
    gearForm: initEmptyGear(),

    statPriority: '',
    talentBuildName: '',
    talentHeroTree: '',
    talentScene: '',
    talentCode: '',
    talentNote: '',
    talentsMythic: '',
    talentsRaid: '',
    talentsDesc: '',
    rotationList: [],

    cFlask: '',
    cPotion: '',
    cFood: '',
    cWeapon: '',
    cGems: '',

    docId: null,

    // 装备快速选择抽屉
    isGearPickerOpen: false,
    targetSlotKey: '',
    targetSlotName: '',
    gearPickerQuery: '',
    rawGearCandidates: [],
    gearCandidates: [],

    // ================= 数据库管理模块状态 =================
    currentCollection: 'wow_equipment', // 'wow_equipment' | 'wow_guides'
    dbSearchQuery: '',
    dbRecords: [],
    filteredRecords: [],
    dbTotalCount: 0,
    isLoadingDb: false,
    isUsingLocalFallback: false,
    syncStatusText: '',

    // 记录编辑/新增弹窗
    isRecordModalOpen: false,
    isAddingRecord: false,
    isJsonEditMode: false,
    recordFormData: {
      name: '',
      slot: '',
      item_class: '',
      source_dungeon: '',
      source_boss: '',
      source_desc: '',
      stat_combo: '',
      description: '',
      is_crafted: false
    },
    recordJsonString: '',
    activeEditingRecordId: null
  },

  onLoad() {
    // 管理页必须先从首页通过身份验证，避免直接输入页面路径进入后台
    const session = wx.getStorageSync('admin_session') || 0;
    if (!session || Date.now() - session > 30 * 60 * 1000) {
      wx.removeStorageSync('admin_session');
      wx.showToast({ title: '请先从首页验证管理员身份', icon: 'none' });
      setTimeout(() => wx.reLaunch({ url: '/pages/index/index' }), 900);
      return;
    }
    this.initClassPicker();
    this.loadCurrentSpecBuild();
  },

  // 切换顶部 Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    if (tab === 'db' && this.data.dbRecords.length === 0) {
      this.fetchCollectionData();
    }
  },

  // ========================================================
  // 推荐出装编辑逻辑
  // ========================================================
  initClassPicker() {
    const classNames = WOW_CLASSES.map(c => c.name);
    const specNames = WOW_CLASSES[0].specs.map(s => s.name);
    this.setData({
      pickerRange: [classNames, specNames]
    });
  },

  onClassColumnChange(e) {
    if (e.detail.column === 0) {
      const classIndex = e.detail.value;
      const specNames = WOW_CLASSES[classIndex].specs.map(s => s.name);
      this.setData({
        'pickerRange[1]': specNames,
        'pickerIndex[0]': classIndex,
        'pickerIndex[1]': 0
      });
    }
  },

  onSpecChange(e) {
    const classIdx = e.detail.value[0];
    const specIdx = e.detail.value[1];
    this.setData({
      pickerIndex: e.detail.value,
      selectedClass: WOW_CLASSES[classIdx],
      selectedSpec: WOW_CLASSES[classIdx].specs[specIdx]
    });
    this.loadCurrentSpecBuild();
  },

  // 读取目标专精现有推荐配置（优先云端，次选本地缓存，再默认官方权威库）
  loadCurrentSpecBuild() {
    const classSlug = this.data.selectedClass.id;
    const specId = this.data.selectedSpec.id;

    wx.showLoading({ title: '加载中...' });

    const handleFallback = () => {
      // 检查本地持久化存储
      try {
        const localSaved = wx.getStorageSync('wow_guide_' + classSlug + '_' + specId);
        if (localSaved && (localSaved.gear || localSaved.talents)) {
          this.applyGuideToForm(localSaved._id || null, localSaved);
          wx.hideLoading();
          return;
        }
      } catch (e) {}

      // 兜底载入官方权威默认库
      this.loadDefaultGuideData(false);
      wx.hideLoading();
    };

    if (wx.cloud && typeof wx.cloud.database === 'function') {
      const db = wx.cloud.database();
      db.collection('wow_guides').where({
        classSlug,
        specId
      }).get().then(res => {
        if (res.data && res.data.length > 0) {
          wx.hideLoading();
          const doc = res.data[0];
          const d = doc.data || doc;
          this.applyGuideToForm(doc._id, d);
        } else {
          handleFallback();
        }
      }).catch(err => {
        console.warn('云端推荐读取失败，尝试本地缓存与默认配置:', err);
        handleFallback();
      });
    } else {
      handleFallback();
    }
  },

  // 一键从 12.1.5 官方权威库载入预置完整配置（装备+天赋+手法+属性）
  loadDefaultGuideData(showToast = true) {
    const classSlug = this.data.selectedClass.id;
    const specId = this.data.selectedSpec.id;
    const found = defaultGuides.find(g => g.classSlug === classSlug && g.specId === specId);
    if (!found) {
      if (showToast) wx.showToast({ title: '未找到官方预置数据', icon: 'none' });
      return;
    }
    this.applyGuideToForm(this.data.docId, found);
    if (showToast) {
      wx.showToast({ title: '已载入官方配置', icon: 'success' });
    }
  },

  resetBuildForm() {
    this.setData({
      docId: null,
      gearForm: initEmptyGear(),
      configuredSlotsCount: 0,
      statPriority: '',
      talentBuildName: '',
      talentHeroTree: '',
      talentScene: '',
      talentCode: '',
      talentNote: '',
      talentsMythic: '',
      talentsRaid: '',
      talentsDesc: '',
      rotationList: [],
      cFlask: '',
      cPotion: '',
      cFood: '',
      cWeapon: '',
      cGems: ''
    });
  },

  applyGuideToForm(docId, d) {
    const gear = initEmptyGear();
    let count = 0;

    const fillSlots = (list) => {
      if (!list || !Array.isArray(list)) return;
      list.forEach(item => {
        if (!item || !item.slot) return;
        // 兼容后台历史写入的简写槽位名，否则戒指/饰品/主手装备回读时会被整条丢弃
        const slot = SLOT_ALIASES[item.slot] || item.slot;
        const cfg = SLOTS_CONFIG.find(s => s.name === slot || s.accepted.includes(slot));
        const key = cfg ? cfg.key : null;
        if (key && item.name) {
          gear[key] = {
            name: item.name || '',
            desc: item.desc || (item.ilvl ? `装等 ${item.ilvl} · ${item.statCombo || ''}` : ''),
            quality: item.quality || 'epic',
            itemId: item.itemId || item.id || null
          };
          count++;
        }
      });
    };

    if (d.gear) {
      fillSlots(d.gear.left);
      fillSlots(d.gear.right);
      fillSlots(d.gear.weapons);
    }

    const t = d.talents || {};
    const rot = Array.isArray(d.rotation)
      ? d.rotation.map(r => ({ name: r.name || '', desc: r.desc || '' }))
      : [];
    const statPri = d.statPriority || (t && t.statPriority) || '';

    this.setData({
      docId: docId || this.data.docId,
      gearForm: gear,
      configuredSlotsCount: count,
      statPriority: statPri,
      talentBuildName: t.buildName || '',
      talentHeroTree: t.heroTree || '',
      talentScene: t.scene || '',
      talentCode: t.code || t.mythicPlus || '',
      talentNote: t.note || t.desc || '',
      talentsMythic: t.mythicPlus || t.code || '',
      talentsRaid: t.raid || '',
      talentsDesc: t.desc || t.note || '',
      rotationList: rot,
      cFlask: d.consumables?.flask || '',
      cPotion: d.consumables?.potion || '',
      cFood: d.consumables?.food || '',
      cWeapon: d.consumables?.weapon || '',
      cGems: d.consumables?.gems || ''
    });
  },

  onGearFieldInput(e) {
    const slot = e.currentTarget.dataset.slot;
    const field = e.currentTarget.dataset.field;
    const val = e.detail.value;

    const path = `gearForm.${slot}.${field}`;
    this.setData({ [path]: val }, () => {
      this.updateConfiguredCount();
    });
  },

  onBuildFieldInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },

  clearSingleSlot(e) {
    const slot = e.currentTarget.dataset.slot;
    const path = `gearForm.${slot}`;
    this.setData({
      [path]: { name: '', desc: '', quality: 'epic' }
    }, () => {
      this.updateConfiguredCount();
    });
  },

  updateConfiguredCount() {
    let count = 0;
    Object.keys(this.data.gearForm).forEach(k => {
      if (this.data.gearForm[k].name) count++;
    });
    this.setData({ configuredSlotsCount: count });
  },

  // 快捷填入该职业 12.1 S2 套装 (头、肩、胸、手、腿)
  quickFillFrom121Set() {
    const className = this.data.selectedClass.name;
    const tierItems = equipmentDb.filter(i => i.source_type === '套装' && i.source_boss === className);

    if (tierItems.length === 0) {
      wx.showToast({ title: '未找到对应套装', icon: 'none' });
      return;
    }

    const currentGear = { ...this.data.gearForm };
    let filled = 0;

    tierItems.forEach(item => {
      const match = SLOTS_CONFIG.find(s => s.accepted.includes(item.slot));
      if (match && ['head', 'shoulder', 'chest', 'hands', 'legs'].includes(match.key)) {
        currentGear[match.key] = {
          name: item.name,
          desc: `12.1.5 套装 (${item.stat_combo})`,
          quality: 'epic'
        };
        filled++;
      }
    });

    this.setData({ gearForm: currentGear }, () => {
      this.updateConfiguredCount();
      wx.showToast({ title: `已填入 ${filled} 件套装`, icon: 'success' });
    });
  },

  // 打开 12.1 S2 装备快速挑选抽屉
  openGearPicker(e) {
    const slotKey = e.currentTarget.dataset.slot;
    const slotName = e.currentTarget.dataset.slotname;
    const cfg = SLOTS_CONFIG.find(s => s.key === slotKey);
    const acceptedSlots = cfg ? cfg.accepted : [slotName];

    // 筛选符合该部位的 12.1 装备
    const candidates = equipmentDb.filter(i => acceptedSlots.includes(i.slot));

    this.setData({
      isGearPickerOpen: true,
      targetSlotKey: slotKey,
      targetSlotName: slotName,
      gearPickerQuery: '',
      rawGearCandidates: candidates,
      gearCandidates: candidates
    });
  },

  onGearPickerSearch(e) {
    const q = (e.detail.value || '').trim().toLowerCase();
    this.setData({ gearPickerQuery: q });

    if (!q) {
      this.setData({ gearCandidates: this.data.rawGearCandidates });
      return;
    }

    const filtered = this.data.rawGearCandidates.filter(i => {
      return (i.name && i.name.toLowerCase().includes(q))
        || (i.source_desc && i.source_desc.toLowerCase().includes(q))
        || (i.stat_combo && i.stat_combo.toLowerCase().includes(q))
        || (i.item_class && i.item_class.toLowerCase().includes(q));
    });

    this.setData({ gearCandidates: filtered });
  },

  selectGearItem(e) {
    const item = e.currentTarget.dataset.item;
    const slotKey = this.data.targetSlotKey;
    if (!slotKey) return;

    let desc = `${item.source_desc}`;
    if (item.secondary_stats && item.secondary_stats.ratio_text) {
      desc += ` · ${item.secondary_stats.ratio_text}`;
    }

    const path = `gearForm.${slotKey}`;
    this.setData({
      [path]: {
        name: item.name,
        desc: desc,
        quality: 'epic'
      },
      isGearPickerOpen: false
    }, () => {
      this.updateConfiguredCount();
      wx.showToast({ title: `已选用: ${item.name}`, icon: 'none' });
    });
  },

  closeGearPicker() {
    this.setData({ isGearPickerOpen: false });
  },

  // 手法优先级步骤增删与编辑
  addRotationStep() {
    const list = [...(this.data.rotationList || [])];
    list.push({ name: '', desc: '' });
    this.setData({ rotationList: list });
  },

  removeRotationStep(e) {
    const idx = Number(e.currentTarget.dataset.index);
    const list = [...(this.data.rotationList || [])];
    list.splice(idx, 1);
    this.setData({ rotationList: list });
  },

  onRotationStepName(e) {
    const idx = Number(e.currentTarget.dataset.index);
    const val = e.detail.value;
    const path = `rotationList[${idx}].name`;
    this.setData({ [path]: val });
  },

  onRotationStepDesc(e) {
    const idx = Number(e.currentTarget.dataset.index);
    const val = e.detail.value;
    const path = `rotationList[${idx}].desc`;
    this.setData({ [path]: val });
  },

  // 保存推荐出装配置并发布至 wow_guides（双写本地Storage与云数据库）
  saveBuildData() {
    const gear = this.data.gearForm;
    const classSlug = this.data.selectedClass.id;
    const specId = this.data.selectedSpec.id;

    const buildSlot = (slotName, itemObj) => {
      if (!itemObj || !itemObj.name) return null;
      return {
        slot: slotName,
        name: itemObj.name.trim(),
        desc: itemObj.desc ? itemObj.desc.trim() : '12.1 S2 推荐装备',
        quality: itemObj.quality || 'epic',
        itemId: itemObj.itemId || null
      };
    };

    const rotationClean = (this.data.rotationList || [])
      .filter(r => r && (r.name.trim() || r.desc.trim()))
      .map(r => ({ name: r.name.trim(), desc: r.desc.trim() }));

    const mainCode = (this.data.talentCode || this.data.talentsMythic || '').trim();

    const payload = {
      classSlug: classSlug,
      specId: specId,
      className: this.data.selectedClass.name,
      specName: this.data.selectedSpec.name,
      statPriority: (this.data.statPriority || '').trim(),
      talents: {
        code: mainCode,
        buildName: (this.data.talentBuildName || `${this.data.selectedSpec.name} 推荐天赋`).trim(),
        heroTree: (this.data.talentHeroTree || '').trim(),
        scene: (this.data.talentScene || '大秘境 / 综合').trim(),
        note: (this.data.talentNote || this.data.talentsDesc || '').trim(),
        mythicPlus: (this.data.talentsMythic || mainCode).trim(),
        raid: (this.data.talentsRaid || '').trim(),
        desc: (this.data.talentsDesc || this.data.talentNote || '').trim()
      },
      rotation: rotationClean,
      consumables: {
        flask: this.data.cFlask || '',
        potion: this.data.cPotion || '',
        food: this.data.cFood || '',
        weapon: this.data.cWeapon || '',
        gems: this.data.cGems || ''
      },
      gear: {
        left: [
          buildSlot('头部', gear.head),
          buildSlot('颈部', gear.neck),
          buildSlot('肩部', gear.shoulder),
          buildSlot('背部', gear.back),
          buildSlot('胸部', gear.chest),
          buildSlot('腕部', gear.wrist)
        ].filter(Boolean),
        right: [
          buildSlot('手部', gear.hands),
          buildSlot('腰部', gear.waist),
          buildSlot('腿部', gear.legs),
          buildSlot('脚部', gear.feet),
          buildSlot('戒指 1', gear.ring1),
          buildSlot('戒指 2', gear.ring2),
          buildSlot('饰品 1', gear.trinket1),
          buildSlot('饰品 2', gear.trinket2)
        ].filter(Boolean),
        weapons: [
          buildSlot('主手/双手', gear.weaponMain),
          buildSlot('副手', gear.weaponOff)
        ].filter(Boolean)
      },
      sourceType: 'admin_custom',
      dataVersion: '12.1.5',
      dataDate: '2026-11-13',
      updatedAt: new Date().toISOString()
    };

    // 1. 本地存储优先双写缓存
    try {
      wx.setStorageSync('wow_guide_' + classSlug + '_' + specId, payload);
    } catch (e) {
      console.warn('Storage 写入失败:', e);
    }

    // 2. 云数据库写入或更新
    if (wx.cloud && typeof wx.cloud.database === 'function') {
      const db = wx.cloud.database();
      wx.showLoading({ title: '正在发布中...', mask: true });

      if (this.data.docId) {
        db.collection('wow_guides').doc(this.data.docId).update({
          data: payload
        }).then(() => {
          wx.hideLoading();
          wx.showToast({ title: '配置已更新保存！', icon: 'success' });
        }).catch(err => {
          wx.hideLoading();
          wx.showModal({
            title: '云端同步提示',
            content: '已保存至本地配置生效！云端同步失败: ' + (err.message || '网络或权限限制'),
            showCancel: false
          });
        });
      } else {
        db.collection('wow_guides').add({
          data: payload
        }).then(res => {
          this.setData({ docId: res._id });
          payload._id = res._id;
          wx.setStorageSync('wow_guide_' + classSlug + '_' + specId, payload);
          wx.hideLoading();
          wx.showToast({ title: '配置已发布保存！', icon: 'success' });
        }).catch(err => {
          wx.hideLoading();
          wx.showModal({
            title: '云端同步提示',
            content: '已保存至本地配置生效！云端添加失败: ' + (err.message || '网络或权限限制'),
            showCancel: false
          });
        });
      }
    } else {
      wx.showToast({ title: '已保存至本地缓存！', icon: 'success' });
    }
  },

  // ========================================================
  // 各数据库管理逻辑 (CRUD wow_equipment / wow_guides)
  // ========================================================
  switchCollection(e) {
    const col = e.currentTarget.dataset.name;
    this.setData({
      currentCollection: col,
      dbSearchQuery: '',
      dbRecords: [],
      filteredRecords: []
    }, () => {
      this.fetchCollectionData();
    });
  },

  fetchCollectionData() {
    const col = this.data.currentCollection;
    const db = wx.cloud.database();

    this.setData({ isLoadingDb: true, isUsingLocalFallback: false });

    db.collection(col).limit(50).get().then(res => {
      let records = res.data || [];
      if (records.length === 0 && col === 'wow_equipment') {
        // 云端若尚未同步，直接展示本地 12.1 S2 装备数据作为兜底
        records = equipmentDb.slice(0, 50);
        this.setData({ isUsingLocalFallback: true });
      }

      this.setData({
        dbRecords: records,
        filteredRecords: records,
        dbTotalCount: records.length,
        isLoadingDb: false
      });
    }).catch(err => {
      console.warn(`云端读取 ${col} 失败，启用本地数据模式:`, err);
      if (col === 'wow_equipment') {
        const records = equipmentDb.slice(0, 50);
        this.setData({
          dbRecords: records,
          filteredRecords: records,
          dbTotalCount: equipmentDb.length,
          isLoadingDb: false,
          isUsingLocalFallback: true
        });
      } else {
        this.setData({
          dbRecords: [],
          filteredRecords: [],
          dbTotalCount: 0,
          isLoadingDb: false
        });
      }
    });
  },

  onDbSearchInput(e) {
    const q = (e.detail.value || '').trim().toLowerCase();
    this.setData({ dbSearchQuery: q });

    if (!q) {
      this.setData({ filteredRecords: this.data.dbRecords });
      return;
    }

    const filtered = this.data.dbRecords.filter(item => {
      const name = (item.name || item.className || '').toLowerCase();
      const slot = (item.slot || item.specName || '').toLowerCase();
      const dungeon = (item.source_dungeon || '').toLowerCase();
      const id = String(item.id || item._id || '').toLowerCase();
      return name.includes(q) || slot.includes(q) || dungeon.includes(q) || id.includes(q);
    });

    this.setData({ filteredRecords: filtered });
  },

  clearDbSearch() {
    this.setData({
      dbSearchQuery: '',
      filteredRecords: this.data.dbRecords
    });
  },

  // 打开新增记录弹窗
  openNewRecordModal() {
    const blank = {
      name: '',
      slot: '头部',
      item_class: '板甲',
      source_dungeon: '烈毒之渊',
      source_boss: '盘魂者内克扎莉',
      source_desc: '烈毒之渊 · 盘魂者内克扎莉',
      stat_combo: '急速/暴击',
      description: '12.1.5 第二赛季掉落装备',
      is_crafted: false
    };

    this.setData({
      isRecordModalOpen: true,
      isAddingRecord: true,
      isJsonEditMode: false,
      recordFormData: blank,
      recordJsonString: JSON.stringify(blank, null, 2),
      activeEditingRecordId: null
    });
  },

  // 打开编辑记录弹窗
  openEditRecordModal(e) {
    const record = e.currentTarget.dataset.record;
    const cleanRecord = { ...record };

    this.setData({
      isRecordModalOpen: true,
      isAddingRecord: false,
      isJsonEditMode: false,
      recordFormData: {
        name: cleanRecord.name || cleanRecord.className || '',
        slot: cleanRecord.slot || cleanRecord.specName || '',
        item_class: cleanRecord.item_class || cleanRecord.classSlug || '',
        source_dungeon: cleanRecord.source_dungeon || '',
        source_boss: cleanRecord.source_boss || '',
        source_desc: cleanRecord.source_desc || '',
        stat_combo: cleanRecord.stat_combo || '',
        description: cleanRecord.description || '',
        is_crafted: !!cleanRecord.is_crafted
      },
      recordJsonString: JSON.stringify(cleanRecord, null, 2),
      activeEditingRecordId: cleanRecord._id || cleanRecord.id
    });
  },

  switchEditMode(e) {
    const isJson = e.currentTarget.dataset.json;
    if (isJson && !this.data.isJsonEditMode) {
      // 从表单模式切换到 JSON 模式：将表单数据转为 JSON
      const current = { ...this.data.recordFormData };
      this.setData({
        isJsonEditMode: true,
        recordJsonString: JSON.stringify(current, null, 2)
      });
    } else if (!isJson && this.data.isJsonEditMode) {
      // 从 JSON 模式切换到表单模式：尝试解析 JSON 并同步表单
      try {
        const parsed = JSON.parse(this.data.recordJsonString);
        this.setData({
          isJsonEditMode: false,
          recordFormData: { ...this.data.recordFormData, ...parsed }
        });
      } catch (err) {
        wx.showToast({ title: 'JSON 格式有误，无法切换', icon: 'none' });
      }
    }
  },

  onRecordFormInput(e) {
    const field = e.currentTarget.dataset.field;
    const path = `recordFormData.${field}`;
    this.setData({ [path]: e.detail.value });
  },

  onRecordCraftedChange(e) {
    this.setData({ 'recordFormData.is_crafted': e.detail.value });
  },

  onRecordJsonInput(e) {
    this.setData({ recordJsonString: e.detail.value });
  },

  closeRecordModal() {
    this.setData({ isRecordModalOpen: false });
  },

  // 保存记录 (新增或修改)
  saveRecord() {
    let payload = {};

    if (this.data.isJsonEditMode) {
      try {
        payload = JSON.parse(this.data.recordJsonString);
      } catch (err) {
        wx.showToast({ title: 'JSON 语法错误，请检查格式', icon: 'none' });
        return;
      }
    } else {
      payload = { ...this.data.recordFormData };
    }

    const col = this.data.currentCollection;
    const db = wx.cloud.database();
    wx.showLoading({ title: '保存中...', mask: true });

    if (this.data.isAddingRecord) {
      // 新增记录
      db.collection(col).add({
        data: payload
      }).then(() => {
        wx.hideLoading();
        this.setData({ isRecordModalOpen: false });
        wx.showToast({ title: '记录已新增！', icon: 'success' });
        this.fetchCollectionData();
      }).catch(err => {
        wx.hideLoading();
        wx.showModal({ title: '新增失败', content: err.message || '网络异常', showCancel: false });
      });
    } else {
      // 修改现有记录
      const id = this.data.activeEditingRecordId;
      if (!id) {
        wx.hideLoading();
        wx.showToast({ title: '缺少记录 ID', icon: 'none' });
        return;
      }

      // 如果有 _id 则按 _id 更新，否则按 id 查
      const query = typeof id === 'string' && id.length > 10 ? db.collection(col).doc(id) : db.collection(col).where({ id: id });

      const doUpdate = (docId) => {
        db.collection(col).doc(docId).update({
          data: payload
        }).then(() => {
          wx.hideLoading();
          this.setData({ isRecordModalOpen: false });
          wx.showToast({ title: '更新成功！', icon: 'success' });
          this.fetchCollectionData();
        }).catch(err => {
          wx.hideLoading();
          wx.showModal({ title: '更新失败', content: err.message || '网络异常', showCancel: false });
        });
      };

      if (typeof id === 'string' && id.length > 10) {
        doUpdate(id);
      } else {
        db.collection(col).where({ id: id }).get().then(res => {
          if (res.data && res.data.length > 0) {
            doUpdate(res.data[0]._id);
          } else {
            wx.hideLoading();
            wx.showToast({ title: '未找到云端记录', icon: 'none' });
          }
        }).catch(err => {
          wx.hideLoading();
          wx.showModal({ title: '查询失败', content: err.message || '异常', showCancel: false });
        });
      }
    }
  },

  // 删除记录
  confirmDeleteRecord(e) {
    const record = e.currentTarget.dataset.record;
    const name = record.name || record.className || record._id;
    const id = record._id || record.id;
    const col = this.data.currentCollection;

    wx.showModal({
      title: '确认删除',
      content: `确定从数据库中删除记录「${name}」吗？此操作无法撤销。`,
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return;

        const db = wx.cloud.database();
        wx.showLoading({ title: '删除中...' });

        const doDelete = (docId) => {
          db.collection(col).doc(docId).remove().then(() => {
            wx.hideLoading();
            wx.showToast({ title: '已删除', icon: 'success' });
            this.fetchCollectionData();
          }).catch(err => {
            wx.hideLoading();
            wx.showModal({ title: '删除失败', content: err.message || '异常', showCancel: false });
          });
        };

        if (record._id) {
          doDelete(record._id);
        } else {
          db.collection(col).where({ id: id }).get().then(qRes => {
            if (qRes.data && qRes.data.length > 0) {
              doDelete(qRes.data[0]._id);
            } else {
              wx.hideLoading();
              wx.showToast({ title: '记录未在云端找到', icon: 'none' });
            }
          });
        }
      }
    });
  },

  // 一键将 12.1 S2 全部 629 件装备同步至云数据库 wow_equipment
  async syncAll121EquipmentToCloud() {
    const total = equipmentDb.length;
    wx.showModal({
      title: '确认全量同步',
      content: `即将把 12.1 S2 全部 ${total} 件装备批量同步写入云端集合 wow_equipment，是否继续？`,
      success: async (res) => {
        if (!res.confirm) return;

        const db = wx.cloud.database();
        this.setData({ syncStatusText: `准备同步 0 / ${total}...` });
        wx.showLoading({ title: '正在同步...', mask: true });

        let successCount = 0;
        let failCount = 0;
        const BATCH_SIZE = 10;

        for (let i = 0; i < total; i += BATCH_SIZE) {
          const slice = equipmentDb.slice(i, i + BATCH_SIZE);
          const tasks = slice.map(item => {
            return db.collection('wow_equipment').where({ id: item.id }).get().then(checkRes => {
              if (checkRes.data && checkRes.data.length > 0) {
                return db.collection('wow_equipment').doc(checkRes.data[0]._id).update({ data: item });
              } else {
                return db.collection('wow_equipment').add({ data: item });
              }
            }).then(() => {
              successCount++;
            }).catch(err => {
              console.warn('单条同步失败:', item.name, err);
              failCount++;
            });
          });

          await Promise.all(tasks);
          const progress = `同步中 ${Math.min(i + BATCH_SIZE, total)} / ${total}`;
          this.setData({ syncStatusText: progress });
          wx.showLoading({ title: progress, mask: true });
        }

        wx.hideLoading();
        this.setData({ syncStatusText: `同步完成: ${successCount} 成功` });
        wx.showModal({
          title: '同步完成',
          content: `12.1 S2 装备数据库已成功更新！\n成功：${successCount} 件\n失败：${failCount} 件`,
          showCancel: false
        });
        this.fetchCollectionData();
      }
    });
  }
});
