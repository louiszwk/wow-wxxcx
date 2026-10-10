const classData = [
  {
    name: '全部',
    specs: [{ name: '全部专精', armor: [], weapons: [], mainStat: '' }]
  },
  // ================= 板甲 =================
  {
    name: '战士',
    specs: [
      { name: '武器', armor: ['板甲'], weapons: ['双手斧', '双手锤', '双手剑', '长柄'], mainStat: '力量' },
      { name: '狂怒', armor: ['板甲'], weapons: ['双手斧', '双手锤', '双手剑', '长柄', '单手斧', '单手锤', '单手剑'], mainStat: '力量' },
      { name: '防护', armor: ['板甲'], weapons: ['单手斧', '单手锤', '单手剑', '盾牌'], mainStat: '力量' }
    ]
  },
  {
    name: '圣骑士',
    specs: [
      { name: '神圣', armor: ['板甲'], weapons: ['单手锤', '单手剑', '双手锤', '双手剑', '盾牌', '长柄'], mainStat: '智力' },
      { name: '防护', armor: ['板甲'], weapons: ['单手斧', '单手锤', '单手剑', '盾牌'], mainStat: '力量' },
      { name: '惩戒', armor: ['板甲'], weapons: ['双手斧', '双手锤', '双手剑', '长柄'], mainStat: '力量' }
    ]
  },
  {
    name: '死亡骑士',
    specs: [
      { name: '鲜血', armor: ['板甲'], weapons: ['双手斧', '双手锤', '双手剑', '长柄'], mainStat: '力量' },
      { name: '冰霜', armor: ['板甲'], weapons: ['单手斧', '单手锤', '单手剑', '双手斧', '双手锤', '双手剑', '长柄'], mainStat: '力量' },
      { name: '邪恶', armor: ['板甲'], weapons: ['双手斧', '双手锤', '双手剑', '长柄'], mainStat: '力量' }
    ]
  },
  // ================= 皮甲 =================
  {
    name: '潜行者',
    specs: [
      { name: '奇袭', armor: ['皮甲'], weapons: ['匕首'], mainStat: '敏捷' },
      { name: '狂徒', armor: ['皮甲'], weapons: ['单手剑', '单手斧', '单手锤', '拳套', '匕首'], mainStat: '敏捷' },
      { name: '敏锐', armor: ['皮甲'], weapons: ['匕首'], mainStat: '敏捷' }
    ]
  },
  {
    name: '武僧',
    specs: [
      { name: '酒仙', armor: ['皮甲'], weapons: ['长柄', '法杖'], mainStat: '敏捷' },
      { name: '织雾', armor: ['皮甲'], weapons: ['单手剑', '单手锤', '法杖', '副手'], mainStat: '智力' },
      { name: '踏风', armor: ['皮甲'], weapons: ['单手剑', '单手斧', '单手锤', '拳套'], mainStat: '敏捷' }
    ]
  },
  {
    name: '德鲁伊',
    specs: [
      { name: '平衡', armor: ['皮甲'], weapons: ['匕首', '单手锤', '法杖', '长柄', '副手'], mainStat: '智力' },
      { name: '野性', armor: ['皮甲'], weapons: ['长柄', '法杖', '双手锤'], mainStat: '敏捷' },
      { name: '守护', armor: ['皮甲'], weapons: ['长柄', '法杖', '双手锤'], mainStat: '敏捷' },
      { name: '恢复', armor: ['皮甲'], weapons: ['匕首', '单手锤', '法杖', '副手'], mainStat: '智力' }
    ]
  },
  {
    name: '恶魔猎手',
    specs: [
      { name: '浩劫', armor: ['皮甲'], weapons: ['战刃', '单手剑', '单手斧', '拳套'], mainStat: '敏捷' },
      { name: '复仇', armor: ['皮甲'], weapons: ['战刃', '单手剑', '单手斧', '拳套'], mainStat: '敏捷' }
    ]
  },
  // ================= 锁甲 =================
  {
    name: '猎人',
    specs: [
      { name: '野兽控制', armor: ['锁甲'], weapons: ['弓', '弩', '枪'], mainStat: '敏捷' },
      { name: '射击', armor: ['锁甲'], weapons: ['弓', '弩', '枪'], mainStat: '敏捷' },
      { name: '生存', armor: ['锁甲'], weapons: ['长柄', '双手斧', '双手剑'], mainStat: '敏捷' }
    ]
  },
  {
    name: '萨满祭司',
    specs: [
      { name: '元素', armor: ['锁甲'], weapons: ['匕首', '单手斧', '单手锤', '拳套', '法杖', '盾牌', '副手'], mainStat: '智力' },
      { name: '增强', armor: ['锁甲'], weapons: ['单手斧', '单手锤', '拳套'], mainStat: '敏捷' },
      { name: '恢复', armor: ['锁甲'], weapons: ['匕首', '单手斧', '单手锤', '拳套', '法杖', '盾牌', '副手'], mainStat: '智力' }
    ]
  },
  {
    name: '唤魔师',
    specs: [
      { name: '湮灭', armor: ['锁甲'], weapons: ['匕首', '单手剑', '单手斧', '单手锤', '法杖', '副手'], mainStat: '智力' },
      { name: '恩护', armor: ['锁甲'], weapons: ['匕首', '单手剑', '单手斧', '单手锤', '法杖', '副手'], mainStat: '智力' },
      { name: '增辉', armor: ['锁甲'], weapons: ['匕首', '单手剑', '单手斧', '单手锤', '法杖', '副手'], mainStat: '智力' }
    ]
  },
  // ================= 布甲 =================
  {
    name: '牧师',
    specs: [
      { name: '戒律', armor: ['布甲'], weapons: ['匕首', '单手锤', '法杖', '魔杖', '副手'], mainStat: '智力' },
      { name: '神圣', armor: ['布甲'], weapons: ['匕首', '单手锤', '法杖', '魔杖', '副手'], mainStat: '智力' },
      { name: '暗影', armor: ['布甲'], weapons: ['匕首', '单手锤', '法杖', '魔杖', '副手'], mainStat: '智力' }
    ]
  },
  {
    name: '法师',
    specs: [
      { name: '奥术', armor: ['布甲'], weapons: ['匕首', '单手剑', '法杖', '魔杖', '副手'], mainStat: '智力' },
      { name: '火焰', armor: ['布甲'], weapons: ['匕首', '单手剑', '法杖', '魔杖', '副手'], mainStat: '智力' },
      { name: '冰霜', armor: ['布甲'], weapons: ['匕首', '单手剑', '法杖', '魔杖', '副手'], mainStat: '智力' }
    ]
  },
  {
    name: '术士',
    specs: [
      { name: '痛苦', armor: ['布甲'], weapons: ['匕首', '单手剑', '法杖', '魔杖', '副手'], mainStat: '智力' },
      { name: '恶魔学识', armor: ['布甲'], weapons: ['匕首', '单手剑', '法杖', '魔杖', '副手'], mainStat: '智力' },
      { name: '毁灭', armor: ['布甲'], weapons: ['匕首', '单手剑', '法杖', '魔杖', '副手'], mainStat: '智力' }
    ]
  }
];

// 判断装备是否匹配专精
function isItemMatchingSpec(item, spec) {
  if (spec.name === '全部专精') return true;

  const itemType = item.item_class.name; 
  const itemSlot = item.inventory_type.name;
  const itemMainStat = item.stats.main || '';

  // 1. 饰品需要校验主属性 (由于饰品的 itemType 通常也是 '其他'，所以要放在最前面优先判断)
  if (itemSlot === '饰品') {
    if (itemMainStat && !itemMainStat.includes(spec.mainStat)) {
      return false; // 如果饰品有明确的主属性，且不包含当前专精的主属性，就不展示
    }
    return true;
  }

  // 2. 戒指、项链（颈部）、披风（背部）、以及其余 '其他' 类物品全职业通用
  if (['手指', '颈部', '背部', '其他'].includes(itemSlot) || itemType === '其他') {
    return true;
  }

  // 3. 护甲部位 (头肩胸等)，校验护甲类型 (板甲/皮甲/锁甲/布甲)
  const armorSlots = ['头部', '肩部', '胸部', '腕部', '手部', '腰部', '腿部', '脚部'];
  if (armorSlots.includes(itemSlot)) {
    return spec.armor.includes(itemType);
  }

  // 4. 武器部位 (主手/副手/单手/双手/远程/盾牌)，校验武器类型
  const weaponSlots = ['单手', '双手', '主手', '远程', '盾牌', '副手'];
  if (weaponSlots.includes(itemSlot)) {
    return spec.weapons.includes(itemType) || (itemSlot === '副手' && spec.weapons.includes('副手')) || (itemSlot === '盾牌' && spec.weapons.includes('盾牌'));
  }

  // 其他情况默认放行
  return true;
}

module.exports = {
  classData,
  isItemMatchingSpec
};
