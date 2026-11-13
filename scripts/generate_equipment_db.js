// scripts/generate_equipment_db.js
// 【已废弃 / DEPRECATED】请勿再运行本脚本：它会用旧的副本分类覆盖 data/wow_equipment_db.js。
// 正式服装备数据的唯一生成链路是：
//   python scripts/fetch_retail_gear_data.py [--from-cache <DIR>]
//   node scripts/build_retail_gear_data.js
// 后者从 data/retail_items_master.js 派生四份数据，掉落归类见 scripts/season2_sources.js。
// ---------------------------------------------------------------------------
// 从 data/loot.js 中提取 12.1 S2 真实掉落数据，并整合 12.1 S2 制造业（火花）全套装备
// 所有字段明确细分：名称、部位、甲类/武器类、来源分类、副本、首领、品质、主属性、副属性权重与百分比、制造业标记与专业

const fs = require('fs');
const path = require('path');
const rawLootData = require('../data/loot.js');

// 计算副属性权重与百分比
function calculateSecondaryStats(stats) {
  if (!stats) return null;
  const list = [];
  if (stats.crit) list.push({ name: '暴击', short: '暴', weight: Number(stats.crit), color: '#f43f5e' });
  if (stats.haste) list.push({ name: '急速', short: '急', weight: Number(stats.haste), color: '#38bdf8' });
  if (stats.mastery) list.push({ name: '精通', short: '精', weight: Number(stats.mastery), color: '#4ade80' });
  if (stats.versa) list.push({ name: '全能', short: '全', weight: Number(stats.versa), color: '#c084fc' });

  if (list.length === 0) return null;

  const sum = list.reduce((a, b) => a + b.weight, 0);
  if (sum <= 0) return null;

  list.sort((a, b) => b.weight - a.weight);

  let allocated = 0;
  list.forEach((st, idx) => {
    st.weight = Math.round(st.weight * 10) / 10;
    if (idx === list.length - 1) {
      st.percent = 100 - allocated;
    } else {
      st.percent = Math.round((st.weight / sum) * 100);
      allocated += st.percent;
    }
  });

  const ratioText = list.map(st => `${st.name} ${st.percent}%`).join(' / ');
  const detailedText = list.map(st => `${st.name} ${st.percent}% (权重 ${st.weight})`).join(' · ');

  return {
    list,
    crit_weight: stats.crit ? Math.round(Number(stats.crit) * 10) / 10 : 0,
    haste_weight: stats.haste ? Math.round(Number(stats.haste) * 10) / 10 : 0,
    mastery_weight: stats.mastery ? Math.round(Number(stats.mastery) * 10) / 10 : 0,
    versa_weight: stats.versa ? Math.round(Number(stats.versa) * 10) / 10 : 0,
    ratio_text: ratioText,
    detailed_text: detailedText
  };
}

// 1. 处理来自 loot.js 的第二赛季副本数据
// 仅保留 12.1 S2 掉落：烈毒之渊, 潮缚石窟, 史诗钥石, 套装, 地下堡, 狩猎
const S2_VALID_DUNGEONS = ['烈毒之渊', '剧毒深渊', '潮缚石窟', '潮缚岩洞', '史诗钥石', '套装', '地下堡', '狩猎'];

const processedItems = [];
const seenKeys = new Set();
let autoIdCounter = 200000;

rawLootData.forEach(dungeon => {
  const dungeonName = dungeon.name;
  if (!S2_VALID_DUNGEONS.includes(dungeonName)) return;

  const sourceType = dungeonName === '烈毒之渊' || dungeonName === '剧毒深渊' ? '团本'
    : dungeonName === '史诗钥石' || dungeonName === '潮缚石窟' || dungeonName === '潮缚岩洞' ? '大秘境'
    : dungeonName === '套装' ? '套装'
    : dungeonName === '狩猎' ? '狩猎' : '地下堡';

  if (!dungeon.encounters) return;

  dungeon.encounters.forEach(encounter => {
    const bossName = (encounter.name && encounter.name !== 'NONE') ? encounter.name : '';
    const sourceDesc = bossName ? `${dungeonName} · ${bossName}` : dungeonName;

    if (!encounter.items) return;

    encounter.items.forEach(item => {
      const uniqueKey = `${item.name}_${sourceDesc}_${item.inventory_type ? item.inventory_type.name : ''}`;
      if (seenKeys.has(uniqueKey)) return;
      seenKeys.add(uniqueKey);

      const slot = item.inventory_type ? item.inventory_type.name : '';
      const itemClass = item.item_class ? item.item_class.name : '其他';
      const stats = item.stats || {};
      const secondaryCalculated = calculateSecondaryStats(stats);

      // 主属性解析
      let mainStats = [];
      if (stats.main) {
        if (stats.main.includes('力量')) mainStats.push('力量');
        if (stats.main.includes('敏捷')) mainStats.push('敏捷');
        if (stats.main.includes('智力')) mainStats.push('智力');
      }
      if (mainStats.length === 0) {
        if (['板甲', '双手剑', '双手斧', '双手锤', '单手剑', '单手斧', '单手锤', '盾牌'].includes(itemClass)) {
          mainStats = ['力量'];
        } else if (['皮甲', '拳套', '弓', '匕首'].includes(itemClass)) {
          mainStats = ['敏捷'];
        } else if (['布甲', '法杖', '魔杖'].includes(itemClass)) {
          mainStats = ['智力'];
        } else {
          mainStats = ['力量', '敏捷', '智力'];
        }
      }

      processedItems.push({
        id: item.id || autoIdCounter++,
        name: item.name,
        slot: slot,
        item_class: itemClass,
        source_type: sourceType,
        source_dungeon: dungeonName,
        source_boss: bossName || '关底掉落',
        source_desc: sourceDesc,
        quality: 'EPIC',
        main_stats: mainStats,
        stat_combo: stats.combo || (secondaryCalculated ? secondaryCalculated.ratio_text : '全属性'),
        secondary_stats: secondaryCalculated,
        is_crafted: false,
        profession: '',
        embellishment_compatible: false,
        description: `12.1 S2 ${sourceType}掉落装备`
      });
    });
  });
});

console.log(`已成功提取 12.1 S2 掉落装备: ${processedItems.length} 件`);

// 2. 注入 12.1 S2 全套真实制造业装备 (Crafted Gear)
// 包含 锻造(板甲与武器)、制皮(皮甲/锁甲/弓/拳套)、裁缝(布甲与披风)、珠宝加工(项链与戒指)、工程学(护目镜与护腕)
const CRAFTED_GEAR_TEMPLATES = [
  // ================= 锻造 (Blacksmithing) =================
  // 板甲 8 部位
  { name: '永铸头盔', slot: '头部', item_class: '板甲', profession: '锻造', main_stats: ['力量', '智力'] },
  { name: '永铸肩铠', slot: '肩部', item_class: '板甲', profession: '锻造', main_stats: ['力量', '智力'] },
  { name: '永铸胸甲', slot: '胸部', item_class: '板甲', profession: '锻造', main_stats: ['力量', '智力'] },
  { name: '永铸护腕', slot: '腕部', item_class: '板甲', profession: '锻造', main_stats: ['力量', '智力'] },
  { name: '永铸护手', slot: '手部', item_class: '板甲', profession: '锻造', main_stats: ['力量', '智力'] },
  { name: '永铸腰带', slot: '腰部', item_class: '板甲', profession: '锻造', main_stats: ['力量', '智力'] },
  { name: '永铸护腿', slot: '腿部', item_class: '板甲', profession: '锻造', main_stats: ['力量', '智力'] },
  { name: '永铸战靴', slot: '脚部', item_class: '板甲', profession: '锻造', main_stats: ['力量', '智力'] },
  { name: '永铸之墙', slot: '副手', item_class: '盾牌', profession: '锻造', main_stats: ['力量', '智力'] },
  // 近战武器
  { name: '永铸长剑', slot: '单手', item_class: '单手剑', profession: '锻造', main_stats: ['力量', '敏捷', '智力'] },
  { name: '永铸战锤', slot: '单手', item_class: '单手锤', profession: '锻造', main_stats: ['力量', '敏捷', '智力'] },
  { name: '永铸战斧', slot: '单手', item_class: '单手斧', profession: '锻造', main_stats: ['力量', '敏捷'] },
  { name: '永铸匕首', slot: '单手', item_class: '匕首', profession: '锻造', main_stats: ['敏捷', '智力'] },
  { name: '永铸战刃', slot: '单手', item_class: '战刃', profession: '锻造', main_stats: ['敏捷'] },
  { name: '永铸双手剑', slot: '双手', item_class: '双手剑', profession: '锻造', main_stats: ['力量'] },
  { name: '永铸巨斧', slot: '双手', item_class: '双手斧', profession: '锻造', main_stats: ['力量'] },
  { name: '永铸双手锤', slot: '双手', item_class: '双手锤', profession: '锻造', main_stats: ['力量'] },
  { name: '永铸长柄武器', slot: '双手', item_class: '长柄武器', profession: '锻造', main_stats: ['力量', '敏捷'] },

  // ================= 制皮 (Leatherworking) =================
  // 皮甲 (命缚系列) 8 部位
  { name: '命缚头盔', slot: '头部', item_class: '皮甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '命缚肩甲', slot: '肩部', item_class: '皮甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '命缚外套', slot: '胸部', item_class: '皮甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '命缚护腕', slot: '腕部', item_class: '皮甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '命缚手套', slot: '手部', item_class: '皮甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '命缚腰带', slot: '腰部', item_class: '皮甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '命缚裤子', slot: '腿部', item_class: '皮甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '命缚长靴', slot: '脚部', item_class: '皮甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  // 锁甲 (焰触系列) 8 部位
  { name: '焰触头盔', slot: '头部', item_class: '锁甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '焰触肩甲', slot: '肩部', item_class: '锁甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '焰触胸甲', slot: '胸部', item_class: '锁甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '焰触护腕', slot: '腕部', item_class: '锁甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '焰触手套', slot: '手部', item_class: '锁甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '焰触腰带', slot: '腰部', item_class: '锁甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '焰触护腿', slot: '腿部', item_class: '锁甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  { name: '焰触战靴', slot: '脚部', item_class: '锁甲', profession: '制皮', main_stats: ['敏捷', '智力'] },
  // 制皮武器
  { name: '泥沼潜猎者之弓', slot: '双手', item_class: '弓', profession: '制皮', main_stats: ['敏捷'] },
  { name: '附魔骨雕拳套', slot: '单手', item_class: '拳套', profession: '制皮', main_stats: ['敏捷'] },

  // ================= 裁缝 (Tailoring) =================
  // 布甲 (圣化系列) 8 部位 + 披风
  { name: '圣化风帽', slot: '头部', item_class: '布甲', profession: '裁缝', main_stats: ['智力'] },
  { name: '圣化护肩', slot: '肩部', item_class: '布甲', profession: '裁缝', main_stats: ['智力'] },
  { name: '圣化长袍', slot: '胸部', item_class: '布甲', profession: '裁缝', main_stats: ['智力'] },
  { name: '圣化护腕', slot: '腕部', item_class: '布甲', profession: '裁缝', main_stats: ['智力'] },
  { name: '圣化手套', slot: '手部', item_class: '布甲', profession: '裁缝', main_stats: ['智力'] },
  { name: '圣化腰带', slot: '腰部', item_class: '布甲', profession: '裁缝', main_stats: ['智力'] },
  { name: '圣化护腿', slot: '腿部', item_class: '布甲', profession: '裁缝', main_stats: ['智力'] },
  { name: '圣化便鞋', slot: '脚部', item_class: '布甲', profession: '裁缝', main_stats: ['智力'] },
  { name: '圣化披风', slot: '背部', item_class: '其他', profession: '裁缝', main_stats: ['力量', '敏捷', '智力'] },

  // ================= 珠宝加工 (Jewelcrafting) =================
  { name: '土灵匠工之戒', slot: '手指', item_class: '其他', profession: '珠宝加工', main_stats: ['力量', '敏捷', '智力'] },
  { name: '土灵匠工护符', slot: '颈部', item_class: '其他', profession: '珠宝加工', main_stats: ['力量', '敏捷', '智力'] },
  { name: '阿加竞争者的玺戒', slot: '手指', item_class: '其他', profession: '珠宝加工', main_stats: ['力量', '敏捷', '智力'] },
  { name: '阿加竞争者的护符', slot: '颈部', item_class: '其他', profession: '珠宝加工', main_stats: ['力量', '敏捷', '智力'] },

  // ================= 工程学 (Engineering) =================
  { name: '精工战术护目镜', slot: '头部', item_class: '其他', profession: '工程学', main_stats: ['力量', '敏捷', '智力'] },
  { name: '工程战复护腕', slot: '腕部', item_class: '其他', profession: '工程学', main_stats: ['力量', '敏捷', '智力'] },
  { name: '掌中加农炮', slot: '双手', item_class: '枪械', profession: '工程学', main_stats: ['敏捷'] }
];

// 制造业装备支持 6 种经典公函绿字组合 (暴急、急精、暴精、急全、精全、暴全)
// 默认生成暴击/急速作为基准，并在属性中注明公函自选
let craftedIdCounter = 900000;
const craftedItems = CRAFTED_GEAR_TEMPLATES.map(tpl => {
  const statConfig = {
    combo: '公函定制 (暴击/急速/精通/全能任选)',
    crit: 2.3,
    haste: 1.0
  };
  const secondaryCalculated = calculateSecondaryStats(statConfig);

  return {
    id: craftedIdCounter++,
    name: tpl.name,
    slot: tpl.slot,
    item_class: tpl.item_class,
    source_type: '制造业',
    source_dungeon: '制造业',
    source_boss: `${tpl.profession}订制`,
    source_desc: `制造业 · ${tpl.profession}火花制作`,
    quality: 'EPIC',
    main_stats: tpl.main_stats,
    stat_combo: '公函自选双绿字 (支持美化)',
    secondary_stats: secondaryCalculated,
    is_crafted: true,
    profession: tpl.profession,
    embellishment_compatible: true,
    description: `12.1 S2 征兆火花制造装备，可放入公函自由指定双绿字，并可附加美化特效`
  };
});

console.log(`已成功生成 12.1 S2 制造业装备: ${craftedItems.length} 件`);

const ALL_EQUIPMENT_DATABASE = [...processedItems, ...craftedItems];
console.log(`12.1 S2 装备数据库总计: ${ALL_EQUIPMENT_DATABASE.length} 件`);

// 写入 data/wow_equipment_db.js
const fileContent = `// data/wow_equipment_db.js
// 12.1 第二赛季官方掉落与制造业装备标准数据库
// 所有装备信息分字段完整规范记录，支持快速查询与索引

module.exports = ${JSON.stringify(ALL_EQUIPMENT_DATABASE, null, 2)};
`;

const outputPath = path.join(__dirname, '../data/wow_equipment_db.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`✅ 数据库已保存至: ${outputPath}`);
