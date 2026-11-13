/**
 * data/loot.js
 * 至暗之夜第二赛季掉落查询：团本 / 巢穴 / 12.1.5 团本 / 史诗钥石 / 套装 / 地下堡。
 * 烈毒之渊按官方 8 首领分区；史诗钥石按 8 个副本分区（Boss 仅作单件掉落注释）。
 * 未标注掉落源的装备统一归入「地下堡掉落」并按部位分组。
 * 每件装备含真实装等、主/副属性数值、护甲/武器参数与清洗后的装备/使用特效。
 * 游戏版本: 魔兽世界 12.1.5 / Midnight 第二赛季
 * 数据日期: 2026-11-13
 * 数据来源: bispath.gg 40 专精 BiS 清单 + Wowhead 官方简中物品 tooltip
 * 掉落归类: 暴雪国服第 2 赛季公告 + 冒险指南 12.1.5（scripts/season2_sources.js）
 * 生成方式: node scripts/build_retail_gear_data.js（请勿手工编辑本文件）
 * 为控制小程序主包体积，本文件仅保存派生规则与精简索引。
 * 加载时从 data/retail_items_master.js（唯一权威库）实时展开，导出结构与原先完全一致。
 */
var M = require('./retail_items_master.js').items;
var ORDER = ["烈毒之渊","潮缚石窟","基希克斯破封","史诗钥石","套装","地下堡掉落"];
var RAID = ["盘魂者内克扎莉","双子毒牙","陵寝哨兵","万毒邪祟者瓦什尼克","迷失的探险者","斯索拉克","盘卷祭坛","乌拉特克"];
var MYTHIC = ["毒牙祭坛","密谋小径","纳洛拉克的洞穴","夺目谷","虚空之痕竞技场","红玉新生法池","诸王之眠","塞塔里斯神庙"];
var SLOTS = ["头部","颈部","肩部","背部","胸部","腕部","手部","腰部","腿部","脚部","手指","饰品","单手","双手","主手","副手","远程","盾牌"];
var SK = {"暴击":"crit","急速":"haste","精通":"mastery","全能":"versa"};
function sectionNames(group, sections) {
  if (group === '烈毒之渊') return RAID.slice();
  if (group === '史诗钥石') return MYTHIC.slice();
  if (group === '地下堡掉落') {
    var fixed = SLOTS.filter(function (s) { return sections[s]; });
    var rest = Object.keys(sections).filter(function (s) { return SLOTS.indexOf(s) === -1; })
      .sort(function (a, b) { return a.localeCompare(b, 'zh-CN'); });
    return fixed.concat(rest);
  }
  if (group === '套装') return Object.keys(sections).sort(function (a, b) { return a.localeCompare(b, 'zh-CN'); });
  return Object.keys(sections).sort(function (a, b) {
    return sections[b].length - sections[a].length || a.localeCompare(b, 'zh-CN');
  });
}
function lootItem(it) {
  var stats = { combo: it.statCombo || '', main: (it.mainStats || []).join('/') };
  var sec = it.secondary || {};
  Object.keys(sec).forEach(function (n) { stats[SK[n]] = sec[n]; });
  return {
    id: it.id, name: it.name, quality: { type: it.quality },
    item_class: { name: it.itemClass }, inventory_type: { name: it.slot },
    ilvl: it.ilvl, icon: it.iconUrl, stats: stats, attrs: it.attrs,
    special: it.special || '', useEffect: it.useEffect || '',
    sourceLabel: it.sourceLabel || '', sourceDesc: it.sourceDesc,
    dropRate: it.dropRate || '', tierSet: it.tierSet || ''
  };
}
var groups = {};
Object.keys(M).forEach(function (id) {
  var it = M[id];
  if (!groups[it.lootGroup]) groups[it.lootGroup] = {};
  if (!groups[it.lootGroup][it.lootSection]) groups[it.lootGroup][it.lootSection] = [];
  groups[it.lootGroup][it.lootSection].push(it);
});
module.exports = ORDER.map(function (dName, gi) {
  var sections = groups[dName] || {};
  var names = sectionNames(dName, sections);
  return {
    id: gi + 1, name: dName, expanded: false,
    encounters: names.map(function (name, idx) {
      return { id: (gi + 1) * 100 + idx + 1, name: name, order: idx + 1,
        items: (sections[name] || []).map(lootItem) };
    })
  };
});
