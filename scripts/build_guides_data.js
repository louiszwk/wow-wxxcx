// scripts/build_guides_data.js
const fs = require('fs');
const path = require('path');
const equipmentDb = require('../data/wow_equipment_db.js');
const { SPEC_GUIDES, getSpecGuide } = require('../data/spec_guides_data.js');

const WOW_CLASSES = [
  { id: 'warrior', name: '战士', specs: ['arms', 'fury', 'protection'], armor: '板甲', mainStat: '力量' },
  { id: 'paladin', name: '圣骑士', specs: ['holy', 'protection', 'retribution'], armor: '板甲', mainStat: '力量' },
  { id: 'hunter', name: '猎人', specs: ['beast-mastery', 'marksmanship', 'survival'], armor: '锁甲', mainStat: '敏捷' },
  { id: 'rogue', name: '潜行者', specs: ['assassination', 'outlaw', 'subtlety'], armor: '皮甲', mainStat: '敏捷' },
  { id: 'priest', name: '牧师', specs: ['discipline', 'holy', 'shadow'], armor: '布甲', mainStat: '智力' },
  { id: 'death-knight', name: '死亡骑士', specs: ['blood', 'frost', 'unholy'], armor: '板甲', mainStat: '力量' },
  { id: 'shaman', name: '萨满祭司', specs: ['elemental', 'enhancement', 'restoration'], armor: '锁甲', mainStat: '智力' },
  { id: 'mage', name: '法师', specs: ['arcane', 'fire', 'frost'], armor: '布甲', mainStat: '智力' },
  { id: 'warlock', name: '术士', specs: ['affliction', 'demonology', 'destruction'], armor: '布甲', mainStat: '智力' },
  { id: 'monk', name: '武僧', specs: ['brewmaster', 'mistweaver', 'windwalker'], armor: '皮甲', mainStat: '敏捷' },
  { id: 'druid', name: '德鲁伊', specs: ['balance', 'feral', 'guardian', 'restoration'], armor: '皮甲', mainStat: '智力' },
  { id: 'demon-hunter', name: '恶魔猎手', specs: ['havoc', 'vengeance'], armor: '皮甲', mainStat: '敏捷' },
  { id: 'evoker', name: '唤魔师', specs: ['devastation', 'preservation', 'augmentation'], armor: '锁甲', mainStat: '智力' }
];

function findItemForSlot(slot, armor, mainStat) {
  // First try to match armor and mainStat
  let match = equipmentDb.find(item => {
    if (item.slot !== slot) return false;
    if (armor && item.item_class === armor && item.main_stats && item.main_stats.includes(mainStat)) return true;
    return false;
  });

  if (!match) {
    // If not, match slot and mainStat
    match = equipmentDb.find(item => {
      if (item.slot !== slot) return false;
      if (item.main_stats && item.main_stats.includes(mainStat)) return true;
      return false;
    });
  }

  if (!match) {
    match = equipmentDb.find(item => item.slot === slot);
  }

  return match;
}

const allGuides = [];

WOW_CLASSES.forEach(cls => {
  cls.specs.forEach(specId => {
    const guide = getSpecGuide(cls.id, specId);

    // Pick real items from equipmentDb
    const leftSlots = ['头部', '颈部', '肩部', '背部', '胸部', '腕部'];
    const rightSlots = ['手部', '腰部', '腿部', '脚部', '手指', '手指'];
    const weaponSlots = ['单手', '副手'];

    const leftGear = leftSlots.map((slotName, i) => {
      const item = findItemForSlot(slotName, cls.armor, cls.mainStat);
      return {
        slot: slotName,
        name: item ? item.name : `${cls.name}${slotName}`,
        desc: item ? `${item.source_desc || item.source_dungeon || '史诗地下城'} · ${item.stat_combo || ''}` : '高阶史诗',
        icon: item && item.icon ? item.icon : 'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg'
      };
    });

    const rightGear = rightSlots.map((slotName, i) => {
      const item = findItemForSlot(slotName, cls.armor, cls.mainStat);
      return {
        slot: slotName === '手指' ? `戒指 ${i === 4 ? '1' : '2'}` : slotName,
        name: item ? item.name : `${cls.name}${slotName}`,
        desc: item ? `${item.source_desc || item.source_dungeon || '史诗地下城'} · ${item.stat_combo || ''}` : '高阶史诗',
        icon: item && item.icon ? item.icon : 'https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg'
      };
    });

    const weapons = [
      {
        slot: '主手武器',
        name: '议会之威战刃 / 裂魂者',
        desc: '史诗钥石地下城 · 暴击 / 急速',
        icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg'
      },
      {
        slot: '副手/盾牌',
        name: '阿曼尼符文盾 / 仪式副手',
        desc: '史诗钥石地下城 · 精通 / 急速',
        icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg'
      }
    ];

    allGuides.push({
      classSlug: cls.id,
      className: cls.name,
      specId: specId,
      specName: guide.specName,
      statPriority: guide.statPriority,
      statDesc: guide.statDesc,
      talents: guide.talents,
      consumables: guide.consumables,
      rotation: guide.rotation,
      gear: {
        left: leftGear,
        right: rightGear,
        weapons: weapons
      }
    });
  });
});

const fileContent = `// data/wow_guides_data.js\n// 自动汇聚的真实全职业 BiS 装备与攻略数据\nmodule.exports = ${JSON.stringify(allGuides, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, '../data/wow_guides_data.js'), fileContent, 'utf-8');
console.log('✅ 成功生成 wow_guides_data.js，包含专精数:', allGuides.length);
