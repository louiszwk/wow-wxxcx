/**
 * data/wow_equipment_db.js
 * 配装模拟器 / 管理后台装备库（全部为官方实装物品）。
 * 每件装备均含官方简中名、装等、图标、护甲/武器类型、主副属性与真实掉落来源。
 * description 优先展示清洗后的装备特效 / 使用效果。
 * 游戏版本: 魔兽世界 12.1.5 / Midnight 第二赛季
 * 数据日期: 2026-11-13
 * 数据来源: bispath.gg 40 专精 BiS 清单 + Wowhead 官方简中物品 tooltip
 * 掉落归类: 暴雪国服第 2 赛季公告 + 冒险指南 12.1.5（scripts/season2_sources.js）
 * 生成方式: node scripts/build_retail_gear_data.js（请勿手工编辑本文件）
 * 为控制小程序主包体积，本文件仅保存派生规则与精简索引。
 * 加载时从 data/retail_items_master.js（唯一权威库）实时展开，导出结构与原先完全一致。
 */
var M = require('./retail_items_master.js').items;
var SM = {"暴击":{"short":"暴","color":"#f43f5e","key":"crit"},"急速":{"short":"急","color":"#38bdf8","key":"haste"},"精通":{"short":"精","color":"#4ade80","key":"mastery"},"全能":{"short":"全","color":"#c084fc","key":"versa"}};
var fixClass = function (n) { return n === '萨满' ? '萨满祭司' : n; };
var DATA_DATE = "2026-11-13";
module.exports = Object.keys(M).map(function (id) {
  var it = M[id];
  var sec = it.secondary || {}, names = Object.keys(sec);
  var total = 0, list = [], weights = {};
  for (var i = 0; i < names.length; i++) {
    var n = names[i], v = sec[n], m = SM[n];
    total += v;
    list.push({ name: n, short: m.short, weight: v, color: m.color, percent: 0 });
    weights[m.key + '_weight'] = v;
  }
  for (var j = 0; j < list.length; j++) {
    list[j].percent = total ? Math.round(list[j].weight / total * 100) : 0;
  }
  var secondary_stats = {
    list: list,
    crit_weight: weights.crit_weight || 0,
    haste_weight: weights.haste_weight || 0,
    mastery_weight: weights.mastery_weight || 0,
    versa_weight: weights.versa_weight || 0,
    ratio_text: list.map(function (x) { return x.name + ' ' + x.percent + '%'; }).join(' / '),
    detailed_text: list.map(function (x) { return x.name + ' ' + x.percent + '%'; }).join(' · ')
  };
  return {
    id: it.id, name: it.name, slot: it.slot, item_class: it.itemClass,
    source_type: it.sourceType, source_dungeon: it.sourceDungeon,
    source_instance: it.sourceInstance, source_boss: fixClass(it.sourceBoss || ''),
    source_desc: it.sourceDesc, quality: it.quality, ilvl: it.ilvl, icon: it.iconUrl,
    main_stats: it.mainStats, stat_combo: it.statCombo || '', secondary_stats: secondary_stats,
    description: it.special || (it.useEffect ? '使用：' + it.useEffect : it.sourceDesc),
    special: it.special, useEffect: it.useEffect, drop_rate: it.dropRate || '',
    is_crafted: false, profession: '', embellishment_compatible: false,
    wowheadId: it.id, tierSet: it.tierSet || '', patch: it.patch,
    dataDate: DATA_DATE
  };
});
