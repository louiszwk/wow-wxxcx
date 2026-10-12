const WOW_CLASSES = [
  { id: 'warrior', name: '战士', specs: [{ id: 'arms', name: '武器' }, { id: 'fury', name: '狂怒' }, { id: 'protection', name: '防护' }] },
  { id: 'paladin', name: '圣骑士', specs: [{ id: 'holy', name: '神圣' }, { id: 'protection', name: '防护' }, { id: 'retribution', name: '惩戒' }] },
  { id: 'hunter', name: '猎人', specs: [{ id: 'beast-mastery', name: '野兽控制' }, { id: 'marksmanship', name: '射击' }, { id: 'survival', name: '生存' }] },
  { id: 'rogue', name: '潜行者', specs: [{ id: 'assassination', name: '奇袭' }, { id: 'outlaw', name: '狂徒' }, { id: 'subtlety', name: '敏锐' }] },
  { id: 'priest', name: '牧师', specs: [{ id: 'discipline', name: '戒律' }, { id: 'holy', name: '神圣' }, { id: 'shadow', name: '暗影' }] },
  { id: 'death-knight', name: '死亡骑士', specs: [{ id: 'blood', name: '鲜血' }, { id: 'frost', name: '冰霜' }, { id: 'unholy', name: '邪恶' }] },
  { id: 'shaman', name: '萨满祭司', specs: [{ id: 'elemental', name: '元素' }, { id: 'enhancement', name: '增强' }, { id: 'restoration', name: '恢复' }] },
  { id: 'mage', name: '法师', specs: [{ id: 'arcane', name: '奥术' }, { id: 'fire', name: '火焰' }, { id: 'frost', name: '冰霜' }] },
  { id: 'warlock', name: '术士', specs: [{ id: 'affliction', name: '痛苦' }, { id: 'demonology', name: '恶魔学识' }, { id: 'destruction', name: '毁灭' }] },
  { id: 'monk', name: '武僧', specs: [{ id: 'brewmaster', name: '酒仙' }, { id: 'mistweaver', name: '织雾' }, { id: 'windwalker', name: '踏风' }] },
  { id: 'druid', name: '德鲁伊', specs: [{ id: 'balance', name: '平衡' }, { id: 'feral', name: '野性' }, { id: 'guardian', name: '守护' }, { id: 'restoration', name: '恢复' }] },
  { id: 'demon-hunter', name: '恶魔猎手', specs: [{ id: 'havoc', name: '浩劫' }, { id: 'vengeance', name: '复仇' }] },
  { id: 'evoker', name: '唤魔师', specs: [{ id: 'devastation', name: '湮灭' }, { id: 'preservation', name: '恩护' }, { id: 'augmentation', name: '增辉' }] }
];

Page({
  data: {
    classes: WOW_CLASSES,
    pickerRange: [[], []],
    pickerIndex: [0, 0],
    selectedClass: WOW_CLASSES[0],
    selectedSpec: WOW_CLASSES[0].specs[0],
    
    // Form Data
    talentsMythic: '', talentsRaid: '', talentsDesc: '',
    cFlask: '', cPotion: '', cFood: '', cWeapon: '', cGems: '',
    
    gHead: '', gNeck: '', gShoulder: '', gBack: '', gChest: '', gWrist: '',
    gHands: '', gWaist: '', gLegs: '', gFeet: '', gRing1: '', gRing2: '', gTrinket1: '', gTrinket2: '',
    gWeaponMain: '', gWeaponOff: '',
    
    advancedJson: ''
  },

  onLoad() {
    this.initPicker();
    this.loadCurrentSpecData();
  },

  initPicker() {
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
    this.loadCurrentSpecData();
  },

  loadCurrentSpecData() {
    const db = wx.cloud.database();
    wx.showLoading({ title: '加载中' });
    db.collection('wow_guides').where({
      classSlug: this.data.selectedClass.id,
      specId: this.data.selectedSpec.id
    }).get().then(res => {
      wx.hideLoading();
      if (res.data.length > 0) {
        const d = res.data[0].data || res.data[0];
        
        // Map gear from arrays back to simple form fields for easy editing
        const left = d.gear?.left || [];
        const right = d.gear?.right || [];
        const weapons = d.gear?.weapons || [];
        const getGear = (arr, slotName) => {
          const item = arr.find(i => i.slot === slotName);
          return item ? item.name : '';
        };

        this.setData({
          docId: res.data[0]._id, // save document id for update
          talentsMythic: d.talents?.mythicPlus || '',
          talentsRaid: d.talents?.raid || '',
          talentsDesc: d.talents?.desc || '',
          
          cFlask: d.consumables?.flask || '',
          cPotion: d.consumables?.potion || '',
          cFood: d.consumables?.food || '',
          cWeapon: d.consumables?.weapon || '',
          cGems: d.consumables?.gems || '',
          
          gHead: getGear(left, '头部'),
          gNeck: getGear(left, '颈部'),
          gShoulder: getGear(left, '肩部'),
          gBack: getGear(left, '背部'),
          gChest: getGear(left, '胸部'),
          gWrist: getGear(left, '腕部'),
          
          gHands: getGear(right, '手部'),
          gWaist: getGear(right, '腰部'),
          gLegs: getGear(right, '腿部'),
          gFeet: getGear(right, '脚部'),
          gRing1: getGear(right, '戒指1'),
          gRing2: getGear(right, '戒指2'),
          gTrinket1: getGear(right, '饰品1'),
          gTrinket2: getGear(right, '饰品2'),
          
          gWeaponMain: getGear(weapons, '主手') || getGear(weapons, '主手/双手') || '',
          gWeaponOff: getGear(weapons, '副手') || ''
        });
      } else {
        // Clear form if no data
        this.setData({ docId: null, talentsMythic: '', talentsRaid: '', talentsDesc: '', cFlask: '', cPotion: '', cFood: '', cWeapon: '', cGems: '', gHead: '', gNeck: '', gShoulder: '', gBack: '', gChest: '', gWrist: '', gHands: '', gWaist: '', gLegs: '', gFeet: '', gRing1: '', gRing2: '', gTrinket1: '', gTrinket2: '', gWeaponMain: '', gWeaponOff: '' });
      }
    });
  },

  saveData() {
    // Build the final JSON object to save
    const buildGear = (slot, name) => name ? { slot, name, desc: '大秘境/团本', quality: 'epic' } : null;
    
    let finalData = {
      classSlug: this.data.selectedClass.id,
      specId: this.data.selectedSpec.id,
      talents: {
        mythicPlus: this.data.talentsMythic,
        raid: this.data.talentsRaid,
        desc: this.data.talentsDesc
      },
      consumables: {
        flask: this.data.cFlask, potion: this.data.cPotion, food: this.data.cFood, weapon: this.data.cWeapon, gems: this.data.cGems
      },
      gear: {
        left: [
          buildGear('头部', this.data.gHead), buildGear('颈部', this.data.gNeck), buildGear('肩部', this.data.gShoulder),
          buildGear('背部', this.data.gBack), buildGear('胸部', this.data.gChest), buildGear('腕部', this.data.gWrist)
        ].filter(Boolean),
        right: [
          buildGear('手部', this.data.gHands), buildGear('腰部', this.data.gWaist), buildGear('腿部', this.data.gLegs),
          buildGear('脚部', this.data.gFeet), buildGear('戒指1', this.data.gRing1), buildGear('戒指2', this.data.gRing2),
          buildGear('饰品1', this.data.gTrinket1), buildGear('饰品2', this.data.gTrinket2)
        ].filter(Boolean),
        weapons: [
          buildGear('主手/双手', this.data.gWeaponMain), buildGear('副手', this.data.gWeaponOff)
        ].filter(Boolean)
      }
    };

    // If advanced json is provided, merge it
    if (this.data.advancedJson) {
      try {
        const adv = JSON.parse(this.data.advancedJson);
        finalData = { ...finalData, ...adv };
      } catch(e) {
        wx.showToast({ title: 'JSON格式错误', icon: 'none' });
        return;
      }
    }

    const db = wx.cloud.database();
    wx.showLoading({ title: '保存中' });
    
    if (this.data.docId) {
      // Update existing
      db.collection('wow_guides').doc(this.data.docId).update({
        data: { data: finalData }
      }).then(() => {
        wx.hideLoading();
        wx.showToast({ title: '更新成功' });
      });
    } else {
      // Add new
      db.collection('wow_guides').add({
        data: { data: finalData }
      }).then((res) => {
        this.setData({ docId: res._id });
        wx.hideLoading();
        wx.showToast({ title: '添加成功' });
      });
    }
  }
});
