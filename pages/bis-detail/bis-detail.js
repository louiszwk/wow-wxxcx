// pages/bis-detail/bis-detail.js
// 《天赋与手法》：每个专精一套 12.1.5 可导入天赋码 + 中文输出手法。
// BiS 装备清单已移至《BiS与配装》（pages/build），本页不再展示装备。
Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    className: '',
    classSlug: '',
    specs: [],
    activeSpec: 0,
    isLoading: true,
    guideData: null,

    // 天赋展示模式: 'official' (官方/后台推荐) | 'custom' (用户自定义配置)
    talentTab: 'official',
    customTalents: [],

    // 自定义天赋弹窗
    isTalentModalOpen: false,
    modalTitle: '新建自定义天赋',
    editingTalentId: null,
    modalForm: {
      name: '',
      heroTree: '',
      scene: '',
      code: '',
      note: ''
    }
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

    if (options.class && options.slug && options.specs) {
      try {
        const specsObj = JSON.parse(decodeURIComponent(options.specs));
        let activeIndex = 0;
        if (options.spec) {
          const foundIdx = specsObj.findIndex(s => s.id === options.spec);
          if (foundIdx !== -1) activeIndex = foundIdx;
        }
        this.setData({
          className: decodeURIComponent(options.class),
          classSlug: options.slug,
          specs: specsObj,
          activeSpec: activeIndex
        });
        this.fetchDynamicBisGear();
      } catch (e) {
        console.error(e);
        this.setData({ isLoading: false, guideData: null });
      }
    } else {
      // 分享或直达链接缺少参数时，不能停在永久 loading
      this.setData({ isLoading: false, guideData: null });
      wx.showToast({ title: '请先选择职业专精', icon: 'none' });
    }
  },

  fetchDynamicBisGear() {
    this.setData({ isLoading: true });

    const currentSpec = this.data.specs[this.data.activeSpec];
    if (!currentSpec) {
      this.setData({ isLoading: false });
      return;
    }

    // 同步载入当前专精的用户自定义天赋列表
    this.loadCustomTalents(this.data.classSlug, currentSpec.id);

    // 1. 优先读取后台录入的离线缓存
    try {
      const cached = wx.getStorageSync('wow_guide_' + this.data.classSlug + '_' + currentSpec.id);
      if (cached && cached.talents && cached.talents.code) {
        this.applyGuideData(cached);
        return;
      }
    } catch (e) {}

    // 2. 尝试从微信云数据库读取
    try {
      if (wx.cloud && typeof wx.cloud.database === 'function') {
        const db = wx.cloud.database();
        db.collection('wow_guides').where({
          classSlug: this.data.classSlug,
          specId: currentSpec.id
        }).get({
          success: (res) => {
            try {
              const doc = res.data && res.data[0];
              const d = doc ? (doc.data || doc) : null;
              const usable = d && d.talents && d.talents.code;
              if (usable) {
                wx.setStorageSync('wow_guide_' + this.data.classSlug + '_' + currentSpec.id, d);
                this.applyGuideData(d);
              } else {
                this.loadLocalGuide(this.data.classSlug, currentSpec.id);
              }
            } catch (err) {
              console.warn('云端攻略数据异常，回退本地攻略:', err);
              this.loadLocalGuide(this.data.classSlug, currentSpec.id);
            }
          },
          fail: () => {
            this.loadLocalGuide(this.data.classSlug, currentSpec.id);
          }
        });
        return;
      }
    } catch (err) {
      console.warn('云数据库暂不可用，使用内置攻略:', err);
    }

    // 3. 兜底内置官方权威库
    this.loadLocalGuide(this.data.classSlug, currentSpec.id);
  },

  applyGuideData(data) {
    // 统一补齐可能缺失的字段，模板里对 rotation / talents 判空才安全
    this.setData({
      guideData: {
        ...data,
        talents: data.talents && data.talents.code ? data.talents : null,
        rotation: Array.isArray(data.rotation) ? data.rotation : [],
        talentSource: data.talentSource || null
      },
      isLoading: false
    });
  },

  loadLocalGuide(classSlug, specId) {
    try {
      const allGuides = require('../../data/wow_guides_data.js');
      const found = allGuides.find(g => g.classSlug === classSlug && g.specId === specId);
      if (found) {
        this.applyGuideData(found);
        return;
      }
    } catch (e) {
      console.error('加载本地攻略数据失败:', e);
    }
    this.setData({ guideData: null, isLoading: false });
  },

  // ================= 用户自定义天赋管理 =================
  loadCustomTalents(classSlug, specId) {
    if (!classSlug || !specId) return;
    try {
      const key = 'user_talents_' + classSlug + '_' + specId;
      const list = wx.getStorageSync(key) || [];
      this.setData({ customTalents: Array.isArray(list) ? list : [] });
    } catch (e) {
      this.setData({ customTalents: [] });
    }
  },

  switchTalentTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ talentTab: tab });
  },

  openAddTalentModal() {
    const currentSpec = this.data.specs[this.data.activeSpec];
    this.setData({
      isTalentModalOpen: true,
      modalTitle: '新建自定义天赋配置',
      editingTalentId: null,
      modalForm: {
        name: (currentSpec ? currentSpec.name : '') + ' 自定义方案',
        heroTree: '',
        scene: '大秘境 / 综合',
        code: '',
        note: ''
      }
    });
  },

  openEditTalentModal(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.customTalents.find(t => t.id === id);
    if (!item) return;
    this.setData({
      isTalentModalOpen: true,
      modalTitle: '编辑自定义天赋配置',
      editingTalentId: id,
      modalForm: {
        name: item.name || '',
        heroTree: item.heroTree || '',
        scene: item.scene || '',
        code: item.code || '',
        note: item.note || ''
      }
    });
  },

  closeTalentModal() {
    this.setData({ isTalentModalOpen: false });
  },

  onModalInput(e) {
    const field = e.currentTarget.dataset.field;
    const val = e.detail.value;
    this.setData({
      [`modalForm.${field}`]: val
    });
  },

  pasteCodeFromClipboard() {
    wx.getClipboardData({
      success: (res) => {
        const text = (res.data || '').trim();
        if (!text) {
          wx.showToast({ title: '剪贴板为空', icon: 'none' });
          return;
        }
        this.setData({
          'modalForm.code': text
        });
        wx.showToast({ title: '已粘贴天赋代码', icon: 'success' });
      },
      fail: () => {
        wx.showToast({ title: '读取剪贴板失败', icon: 'none' });
      }
    });
  },

  saveCustomTalent() {
    const { name, heroTree, scene, code, note } = this.data.modalForm;
    if (!name || !name.trim()) {
      wx.showToast({ title: '请填写方案名称', icon: 'none' });
      return;
    }
    if (!code || !code.trim()) {
      wx.showToast({ title: '请填入天赋字符串', icon: 'none' });
      return;
    }

    const currentSpec = this.data.specs[this.data.activeSpec];
    if (!currentSpec) return;

    const key = 'user_talents_' + this.data.classSlug + '_' + currentSpec.id;
    let list = [...(this.data.customTalents || [])];

    const now = new Date();
    const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (this.data.editingTalentId) {
      const idx = list.findIndex(t => t.id === this.data.editingTalentId);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          name: name.trim(),
          heroTree: (heroTree || '').trim(),
          scene: (scene || '').trim(),
          code: code.trim(),
          note: (note || '').trim(),
          updatedAtText: timeStr
        };
      }
    } else {
      list.unshift({
        id: 'talent_' + Date.now(),
        name: name.trim(),
        heroTree: (heroTree || '').trim(),
        scene: (scene || '').trim(),
        code: code.trim(),
        note: (note || '').trim(),
        updatedAtText: timeStr
      });
    }

    try {
      wx.setStorageSync(key, list);
    } catch (e) {
      console.warn('保存自定义天赋失败:', e);
    }

    this.setData({
      customTalents: list,
      isTalentModalOpen: false,
      talentTab: 'custom'
    });
    wx.showToast({ title: '天赋方案已保存！', icon: 'success' });
  },

  deleteCustomTalent(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.customTalents.find(t => t.id === id);
    if (!item) return;

    wx.showModal({
      title: '删除方案确认',
      content: `确定要删除「${item.name}」吗？`,
      confirmText: '删除',
      confirmColor: '#ef4444',
      success: (res) => {
        if (res.confirm) {
          const currentSpec = this.data.specs[this.data.activeSpec];
          const key = 'user_talents_' + this.data.classSlug + '_' + currentSpec.id;
          const filtered = this.data.customTalents.filter(t => t.id !== id);
          try {
            wx.setStorageSync(key, filtered);
          } catch (err) {}
          this.setData({ customTalents: filtered });
          wx.showToast({ title: '已删除方案', icon: 'none' });
        }
      }
    });
  },

  // 将官方/后台推荐一键保存为我的自定义天赋方案
  saveOfficialToCustom() {
    const g = this.data.guideData;
    if (!g || !g.talents || !g.talents.code) {
      wx.showToast({ title: '暂无官方天赋可存', icon: 'none' });
      return;
    }
    const currentSpec = this.data.specs[this.data.activeSpec];
    this.setData({
      isTalentModalOpen: true,
      modalTitle: '存为我的自定义配置',
      editingTalentId: null,
      modalForm: {
        name: (g.talents.buildName || `${currentSpec.name} 推荐天赋`) + ' (自定义)',
        heroTree: g.talents.heroTree || '',
        scene: g.talents.scene || '大秘境 / 综合',
        code: g.talents.code || '',
        note: g.talents.note || ''
      }
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

  switchSpec(e) {
    this.setData({ activeSpec: e.currentTarget.dataset.index });
    this.fetchDynamicBisGear();
  },

  copyTalent(e) {
    const code = e.currentTarget.dataset.code || '';
    if (!code) {
      wx.showToast({ title: '暂无可用天赋码', icon: 'none' });
      return;
    }
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({ title: '天赋码已复制', icon: 'success' });
      }
    });
  },

  openTalentSource() {
    const src = this.data.guideData && this.data.guideData.talentSource;
    if (!src || !src.url) return;
    wx.navigateTo({
      url: `/pages/webview/webview?url=${encodeURIComponent(src.url)}`
    });
  },

  // 分享必须携带职业/专精参数，否则接收方打开后无数据且永久转圈
  buildShareQuery() {
    const { className, classSlug, specs, activeSpec } = this.data;
    if (!classSlug || !specs || !specs.length) return '';
    const specId = (specs[activeSpec] && specs[activeSpec].id) || '';
    return 'class=' + encodeURIComponent(className) +
      '&slug=' + encodeURIComponent(classSlug) +
      '&specs=' + encodeURIComponent(JSON.stringify(specs)) +
      '&spec=' + encodeURIComponent(specId);
  },

  onShareAppMessage() {
    const query = this.buildShareQuery();
    return {
      title: (this.data.className || '魔兽世界') + ' 12.1.5 天赋与手法',
      path: '/pages/bis-detail/bis-detail' + (query ? '?' + query : '')
    };
  },

  onShareTimeline() {
    return {
      title: (this.data.className || '魔兽世界') + ' 12.1.5 天赋与手法',
      query: this.buildShareQuery()
    };
  }
});
