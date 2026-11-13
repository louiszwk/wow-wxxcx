// pages/bis-detail/bis-detail.js
Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    className: '',
    classSlug: '',
    specs: [],
    activeSpec: 0,
    sectionTabs: ['天赋代码', '输出手法', 'BiS 装备'],
    activeSection: 0,
    
    isLoading: true,
    playerInfo: '',
    
    guideData: null,
    leftGear: [],
    rightGear: [],
    weapons: []
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
      wx.showToast({ title: '请先从 BiS 列表选择职业专精', icon: 'none' });
    }
  },

  fetchDynamicBisGear() {
    this.setData({ isLoading: true });
    
    const currentSpec = this.data.specs[this.data.activeSpec];
    if (!currentSpec) {
      this.setData({ isLoading: false });
      return;
    }

    try {
      if (wx.cloud && typeof wx.cloud.database === 'function') {
        const db = wx.cloud.database();
        db.collection('wow_guides').where({
          classSlug: this.data.classSlug,
          specId: currentSpec.id
        }).get({
          success: (res) => {
            // 云数据库回调是异步的，外层 try/catch 抓不到；此处必须自行判空并兜底
            try {
              const doc = res.data && res.data[0];
              // 只接受由新版生成器发布的 12.1.5 文档；
              // 云端历史模板数据（含占位天赋码）一律回退本地官方权威库
              const isCurrent = doc && (doc.dataVersion === '12.1.5' ||
                (doc.dataDate && String(doc.dataDate) >= '2026-11-13'));
              const usable = isCurrent && doc.gear && doc.gear.left &&
                doc.gear.left.length > 0;
              if (usable) this.applyGuideData(doc);
              else this.loadLocalGuide(this.data.classSlug, currentSpec.id);
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
      console.warn('云函数或数据库暂不可用，使用内置攻略:', err);
    }

    this.loadLocalGuide(this.data.classSlug, currentSpec.id);
  },

  applyGuideData(data) {
    // 统一补齐可能缺失的字段，模板里对 rotation / talents 判空才安全
    const normalized = {
      ...data,
      talents: data.talents || null,
      rotation: Array.isArray(data.rotation) ? data.rotation : []
    };
    this.setData({
      guideData: normalized,
      leftGear: data.gear && data.gear.left ? data.gear.left : [],
      rightGear: data.gear && data.gear.right ? data.gear.right : [],
      weapons: data.gear && data.gear.weapons ? data.gear.weapons : [],
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
      
      // 不再回退到 spec_guides_data：那批「一图流」数据与官方实装不符，
      // 缺失内容一律留空，符合「能查到就展示，没有就空着」的口径。
    } catch (e) {
      console.error('加载本地攻略数据失败:', e);
    }
    this.setData({
      guideData: null,
      leftGear: [],
      rightGear: [],
      weapons: [],
      isLoading: false
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

  switchSection(e) {
    this.setData({ activeSection: e.currentTarget.dataset.index });
  },

  copyTalent(e) {
    const string = e.currentTarget.dataset.code || '';
    if (!string || string.includes('暂无')) {
      wx.showToast({ title: '暂无可用代码', icon: 'none' });
      return;
    }
    wx.setClipboardData({
      data: string,
      success: () => {
        wx.showToast({ title: '天赋已复制', icon: 'success' });
      }
    });
  },

  openItemStats(e) {
    const itemName = e.currentTarget.dataset.name;
    if (!itemName) return;
    // 用统一权威库按名称反查 Wowhead 物品 ID，直达物品页而非模糊搜索
    let itemId = 0;
    try {
      const { items } = require('../../data/retail_items_master.js');
      const hit = Object.values(items).find(x => x.name === itemName);
      if (hit) itemId = hit.id;
    } catch (err) { /* 数据文件缺失时回退搜索 */ }
    const target = itemId
      ? `https://www.wowhead.com/item=${itemId}`
      : `https://www.wowhead.com/search?q=${encodeURIComponent(itemName)}`;
    wx.navigateTo({
      url: `/pages/webview/webview?url=${encodeURIComponent(target)}`
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
      title: (this.data.className || '魔兽世界') + ' BiS 毕业装备与天赋',
      path: '/pages/bis-detail/bis-detail' + (query ? '?' + query : '')
    };
  },

  onShareTimeline() {
    return {
      title: (this.data.className || '魔兽世界') + ' BiS 毕业装备与天赋',
      query: this.buildShareQuery()
    };
  }
});
