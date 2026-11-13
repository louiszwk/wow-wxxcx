// scripts/build_retail_gear_data.js
/**
 * 正式服装备数据 —— 统一权威库派发生成器
 *
 * 读取 scripts/cache/retail_gear_source.json（由 fetch_retail_gear_data.py 产出），
 * 生成 4 份相互一致的数据文件：
 *   data/retail_items_master.js   唯一权威库（Wowhead 物品 ID 主键，完整实体数据）
 *   data/wow_equipment_db.js      配装模拟器 + 管理后台（运行时从权威库展开）
 *   data/loot.js                  第二赛季掉落查询（运行时从权威库展开）
 *   data/wow_guides_data.js       BiS 速查 40 专精（精简索引 + 运行时展开）
 *
 * 体积策略：小程序主包有 2048KB 硬限制，三份派生数据原先各自复制了 431 件装备的
 * 名称/图标/属性/特效，重复约 1MB。现改为只保存派生规则与精简索引，加载时从
 * 唯一权威库实时展开；导出结构与原先逐字段一致，页面代码无需改动。
 * 生成器在写盘后会立即用 new Function 加载新文件，与生成期对象做 deepStrictEqual
 * 校验，任何不等价都会直接报错退出。
 *
 * 运行：node scripts/build_retail_gear_data.js
 *
 * 口径说明：
 *  - 所有物品均来自 Wowhead 官方简中 tooltip，含真实装等、图标、部位、主副属性、
 *    特效、掉落 Boss。掉落归类以 scripts/season2_sources.js 的权威映射表为准。
 *  - 烈毒之渊固定按官方 8 首领展示；史诗钥石按 8 个副本展示（不再按 Boss 分组）。
 *  - 官方 tooltip 与 BiS 清单均未标注掉落源的装备归入「地下堡掉落」。
 *  - 每件装备都带真实数值属性与清洗后的装备/使用特效，供页面直接注明。
 *  - BiS 清单来自 bispath.gg 公开推荐（基于掉落 API 与攻略权重，不是模拟出的理论最优）。
 *  - 40 个专精各一套 12.1.5 天赋导入码与中文输出手法，来源 wowsod.pro（对齐 Icy Veins 12.1.5）；
 *    导入码取页面原文可在游戏内直接导入，绝不编造；中文手法据该页 Rotation Priority 归纳翻译。
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Module = require('module');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(__dirname, 'cache', 'retail_gear_source.json');
const TALENT_RAW = path.join(__dirname, 'cache', 'spec_talent_rotation_raw.json');
const TALENT_ZH = path.join(__dirname, 'cache', 'spec_talent_rotation_zh.json');
const MASTER_FILE = path.join(ROOT, 'data', 'retail_items_master.js');

const source = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const talentRaw = JSON.parse(fs.readFileSync(TALENT_RAW, 'utf8'));
const talentZh = JSON.parse(fs.readFileSync(TALENT_ZH, 'utf8'));
const { meta, specMeta, specBis } = source;

const {
  DUNGEON_ORDER, RAID_ABYSS_ORDER, MYTHIC_DUNGEON_ORDER, SLOT_ORDER,
  STAT_META, classify, cleanEffect, buildAttrs
} = require('./season2_sources.js');

// admin.js 的 quickFillFrom121Set 用职业名索引套装，官方简中为「萨满」，项目用「萨满祭司」
function normalizeClassName(n) {
  return n === '萨满' ? '萨满祭司' : n;
}

function header(file, desc, extra) {
  return [
    '/**',
    ' * ' + file,
    ...desc.map(l => ' * ' + l),
    ' * 游戏版本: 魔兽世界 12.1.5 / Midnight 第二赛季',
    ' * 数据日期: ' + meta.dataDate,
    ' * 数据来源: bispath.gg 40 专精 BiS 清单 + Wowhead 官方简中物品 tooltip',
    ' * 掉落归类: 暴雪国服第 2 赛季公告 + 冒险指南 12.1.5（scripts/season2_sources.js）',
    ' * 生成方式: node scripts/build_retail_gear_data.js（请勿手工编辑本文件）',
    ...(extra || []).map(l => ' * ' + l),
    ' */',
    ''
  ].join('\n');
}

function writeJs(rel, content) {
  fs.writeFileSync(path.join(ROOT, rel), content, 'utf8');
  console.log('  ✓ ' + rel + ' (' + (Buffer.byteLength(content) / 1024).toFixed(0) + ' KB)');
}

// 主包有 2MB 体积限制，生成文件统一紧凑输出（不缩进），可读性由上游权威库与脚本保证
const dump = (x) => JSON.stringify(x);

// 写出「运行时派生」数据文件，并自校验展开结果与生成期对象逐字段一致
function writeDerived(rel, desc, bodyLines, expected) {
  const content = header(rel, desc, [
    '为控制小程序主包体积，本文件仅保存派生规则与精简索引。',
    '加载时从 data/retail_items_master.js（唯一权威库）实时展开，导出结构与原先完全一致。'
  ]) + bodyLines.join('\n') + '\n';
  writeJs(rel, content);

  const mod = { exports: {} };
  const localRequire = (p) => p === './retail_items_master.js'
    ? require(MASTER_FILE)
    : Module.createRequire(path.join(ROOT, rel))(p);
  try {
    new Function('require', 'module', 'exports', content)(localRequire, mod, mod.exports);
    // JSON 归一化：原纯数据文件里 undefined 字段不会落盘，运行时对象里为 undefined，语义相同
    const norm = (x) => JSON.parse(JSON.stringify(x));
    assert.deepStrictEqual(norm(mod.exports), norm(expected));
    console.log('    ✓ 运行时展开与生成期对象逐字段一致');
  } catch (e) {
    console.error('    ✗ ' + rel + ' 展开校验失败: ' + e.message);
    process.exit(1);
  }
}

// ------------------------------------------------- 0) 权威物品：补分类 / 属性 / 特效
const items = {};
for (const [id, raw] of Object.entries(source.items)) {
  const c = classify(raw);
  items[id] = {
    ...raw,
    special: cleanEffect(raw.special),
    useEffect: cleanEffect(raw.useEffect),
    attrs: buildAttrs(raw),
    lootGroup: c.group,
    lootSection: c.section,
    sourceLabel: c.label,
    sourceInstance: c.sourceInstance,
    sourceDungeon: c.group,
    sourceBoss: c.label,
    sourceType: c.sourceType,
    sourceDesc: c.sourceDesc
  };
}

// ---------------------------------------------------------------- 1) 权威库
const master = {
  meta: { ...meta, generatedBy: 'scripts/build_retail_gear_data.js' },
  items
};
writeJs('data/retail_items_master.js',
  header('data/retail_items_master.js', [
    '正式服装备唯一权威库：以 Wowhead 物品 ID 为主键。',
    '其余三份数据文件全部由本库派生，保证三个板块口径一致。',
    '每件含 lootGroup / lootSection 掉落归类与 attrs 真实数值属性。'
  ]) + 'module.exports = ' + dump(master) + ';\n');

// ---------------------------------------------------------------- 2) 装备库
const equipmentDb = Object.values(items).map(it => {
  const secEntries = Object.entries(it.secondary || {});
  const total = secEntries.reduce((n, [, v]) => n + v, 0);
  const list = secEntries.map(([name, val]) => ({
    name,
    short: STAT_META[name].short,
    weight: val,
    color: STAT_META[name].color,
    percent: total ? Math.round(val / total * 100) : 0
  }));
  // build.js 的 computeBuildSummary 依赖 *_weight 计算配装属性占比
  const weights = {};
  for (const [name, val] of secEntries) weights[STAT_META[name].key + '_weight'] = val;
  const secondary_stats = {
    list,
    crit_weight: weights.crit_weight || 0,
    haste_weight: weights.haste_weight || 0,
    mastery_weight: weights.mastery_weight || 0,
    versa_weight: weights.versa_weight || 0,
    ratio_text: list.map(x => x.name + ' ' + x.percent + '%').join(' / '),
    detailed_text: list.map(x => x.name + ' ' + x.percent + '%').join(' · ')
  };
  return {
    id: it.id,
    name: it.name,
    slot: it.slot,
    item_class: it.itemClass,
    source_type: it.sourceType,
    source_dungeon: it.sourceDungeon,
    source_instance: it.sourceInstance,
    source_boss: normalizeClassName(it.sourceBoss || ''),
    source_desc: it.sourceDesc,
    quality: it.quality,
    ilvl: it.ilvl,
    icon: it.iconUrl,
    main_stats: it.mainStats,
    stat_combo: it.statCombo || '',
    secondary_stats,
    description: it.special || (it.useEffect ? '使用：' + it.useEffect : it.sourceDesc),
    special: it.special,
    useEffect: it.useEffect,
    drop_rate: it.dropRate || '',
    is_crafted: false,
    profession: '',
    embellishment_compatible: false,
    wowheadId: it.id,
    tierSet: it.tierSet || '',
    patch: it.patch,
    dataDate: meta.dataDate
  };
});

writeDerived('data/wow_equipment_db.js', [
  '配装模拟器 / 管理后台装备库（全部为官方实装物品）。',
  '每件装备均含官方简中名、装等、图标、护甲/武器类型、主副属性与真实掉落来源。',
  'description 优先展示清洗后的装备特效 / 使用效果。'
], [
  "var M = require('./retail_items_master.js').items;",
  'var SM = ' + dump(STAT_META) + ';',
  "var fixClass = function (n) { return n === '萨满' ? '萨满祭司' : n; };",
  'var DATA_DATE = ' + dump(meta.dataDate) + ';',
  'module.exports = Object.keys(M).map(function (id) {',
  '  var it = M[id];',
  '  var sec = it.secondary || {}, names = Object.keys(sec);',
  '  var total = 0, list = [], weights = {};',
  '  for (var i = 0; i < names.length; i++) {',
  '    var n = names[i], v = sec[n], m = SM[n];',
  '    total += v;',
  '    list.push({ name: n, short: m.short, weight: v, color: m.color, percent: 0 });',
  "    weights[m.key + '_weight'] = v;",
  '  }',
  '  for (var j = 0; j < list.length; j++) {',
  '    list[j].percent = total ? Math.round(list[j].weight / total * 100) : 0;',
  '  }',
  '  var secondary_stats = {',
  '    list: list,',
  "    crit_weight: weights.crit_weight || 0,",
  "    haste_weight: weights.haste_weight || 0,",
  "    mastery_weight: weights.mastery_weight || 0,",
  "    versa_weight: weights.versa_weight || 0,",
  "    ratio_text: list.map(function (x) { return x.name + ' ' + x.percent + '%'; }).join(' / '),",
  "    detailed_text: list.map(function (x) { return x.name + ' ' + x.percent + '%'; }).join(' · ')",
  '  };',
  '  return {',
  '    id: it.id, name: it.name, slot: it.slot, item_class: it.itemClass,',
  '    source_type: it.sourceType, source_dungeon: it.sourceDungeon,',
  "    source_instance: it.sourceInstance, source_boss: fixClass(it.sourceBoss || ''),",
  '    source_desc: it.sourceDesc, quality: it.quality, ilvl: it.ilvl, icon: it.iconUrl,',
  "    main_stats: it.mainStats, stat_combo: it.statCombo || '', secondary_stats: secondary_stats,",
  "    description: it.special || (it.useEffect ? '使用：' + it.useEffect : it.sourceDesc),",
  "    special: it.special, useEffect: it.useEffect, drop_rate: it.dropRate || '',",
  "    is_crafted: false, profession: '', embellishment_compatible: false,",
  "    wowheadId: it.id, tierSet: it.tierSet || '', patch: it.patch,",
  '    dataDate: DATA_DATE',
  '  };',
  '});'
], equipmentDb);

// ---------------------------------------------------------------- 3) 掉落查询
const groups = {};
for (const it of Object.values(items)) {
  (groups[it.lootGroup] = groups[it.lootGroup] || {});
  (groups[it.lootGroup][it.lootSection] =
    groups[it.lootGroup][it.lootSection] || []).push(it);
}

function sectionNames(group, sections) {
  // 烈毒之渊固定 8 首领、史诗钥石固定 8 副本；即使某组暂无收录装备也保留空分组
  if (group === '烈毒之渊') return RAID_ABYSS_ORDER.slice();
  if (group === '史诗钥石') return MYTHIC_DUNGEON_ORDER.slice();
  if (group === '地下堡掉落') {
    const fixed = SLOT_ORDER.filter(s => sections[s]);
    const rest = Object.keys(sections)
      .filter(s => !SLOT_ORDER.includes(s))
      .sort((a, b) => a.localeCompare(b, 'zh-CN'));
    return fixed.concat(rest);
  }
  if (group === '套装') return Object.keys(sections).sort((a, b) => a.localeCompare(b, 'zh-CN'));
  return Object.keys(sections).sort((a, b) =>
    sections[b].length - sections[a].length || a.localeCompare(b, 'zh-CN'));
}

function lootItem(it) {
  const stats = {
    combo: it.statCombo || '',
    main: (it.mainStats || []).join('/')
  };
  for (const [stat, val] of Object.entries(it.secondary || {})) {
    stats[STAT_META[stat].key] = val;
  }
  return {
    id: it.id,
    name: it.name,
    quality: { type: it.quality },
    item_class: { name: it.itemClass },
    inventory_type: { name: it.slot },
    ilvl: it.ilvl,
    icon: it.iconUrl,
    stats,
    attrs: it.attrs,
    special: it.special || '',
    useEffect: it.useEffect || '',
    sourceLabel: it.sourceLabel || '',
    sourceDesc: it.sourceDesc,
    dropRate: it.dropRate || '',
    tierSet: it.tierSet || ''
  };
}

const loot = DUNGEON_ORDER.map((dName, gi) => {
  const sections = groups[dName] || {};
  const names = sectionNames(dName, sections);
  return {
    id: gi + 1,
    name: dName,
    expanded: false,
    encounters: names.map((name, idx) => ({
      id: (gi + 1) * 100 + idx + 1,
      name,
      order: idx + 1,
      items: (sections[name] || []).map(lootItem)
    }))
  };
});

const STAT_KEYS = Object.fromEntries(
  Object.entries(STAT_META).map(([name, v]) => [name, v.key]));

writeDerived('data/loot.js', [
  '至暗之夜第二赛季掉落查询：团本 / 巢穴 / 12.1.5 团本 / 史诗钥石 / 套装 / 地下堡。',
  '烈毒之渊按官方 8 首领分区；史诗钥石按 8 个副本分区（Boss 仅作单件掉落注释）。',
  '未标注掉落源的装备统一归入「地下堡掉落」并按部位分组。',
  '每件装备含真实装等、主/副属性数值、护甲/武器参数与清洗后的装备/使用特效。'
], [
  "var M = require('./retail_items_master.js').items;",
  'var ORDER = ' + dump(DUNGEON_ORDER) + ';',
  'var RAID = ' + dump(RAID_ABYSS_ORDER) + ';',
  'var MYTHIC = ' + dump(MYTHIC_DUNGEON_ORDER) + ';',
  'var SLOTS = ' + dump(SLOT_ORDER) + ';',
  'var SK = ' + dump(STAT_KEYS) + ';',
  'function sectionNames(group, sections) {',
  "  if (group === '烈毒之渊') return RAID.slice();",
  "  if (group === '史诗钥石') return MYTHIC.slice();",
  "  if (group === '地下堡掉落') {",
  '    var fixed = SLOTS.filter(function (s) { return sections[s]; });',
  '    var rest = Object.keys(sections).filter(function (s) { return SLOTS.indexOf(s) === -1; })',
  "      .sort(function (a, b) { return a.localeCompare(b, 'zh-CN'); });",
  '    return fixed.concat(rest);',
  '  }',
  "  if (group === '套装') return Object.keys(sections).sort(function (a, b) { return a.localeCompare(b, 'zh-CN'); });",
  '  return Object.keys(sections).sort(function (a, b) {',
  "    return sections[b].length - sections[a].length || a.localeCompare(b, 'zh-CN');",
  '  });',
  '}',
  'function lootItem(it) {',
  "  var stats = { combo: it.statCombo || '', main: (it.mainStats || []).join('/') };",
  '  var sec = it.secondary || {};',
  '  Object.keys(sec).forEach(function (n) { stats[SK[n]] = sec[n]; });',
  '  return {',
  '    id: it.id, name: it.name, quality: { type: it.quality },',
  '    item_class: { name: it.itemClass }, inventory_type: { name: it.slot },',
  '    ilvl: it.ilvl, icon: it.iconUrl, stats: stats, attrs: it.attrs,',
  "    special: it.special || '', useEffect: it.useEffect || '',",
  "    sourceLabel: it.sourceLabel || '', sourceDesc: it.sourceDesc,",
  "    dropRate: it.dropRate || '', tierSet: it.tierSet || ''",
  '  };',
  '}',
  'var groups = {};',
  'Object.keys(M).forEach(function (id) {',
  '  var it = M[id];',
  '  if (!groups[it.lootGroup]) groups[it.lootGroup] = {};',
  '  if (!groups[it.lootGroup][it.lootSection]) groups[it.lootGroup][it.lootSection] = [];',
  '  groups[it.lootGroup][it.lootSection].push(it);',
  '});',
  'module.exports = ORDER.map(function (dName, gi) {',
  '  var sections = groups[dName] || {};',
  '  var names = sectionNames(dName, sections);',
  '  return {',
  '    id: gi + 1, name: dName, expanded: false,',
  '    encounters: names.map(function (name, idx) {',
  '      return { id: (gi + 1) * 100 + idx + 1, name: name, order: idx + 1,',
  '        items: (sections[name] || []).map(lootItem) };',
  '    })',
  '  };',
  '});'
], loot);

// ---------------------------------------------------------------- 4) BiS 速查
const LEFT_SLOTS = ['头部', '颈部', '肩部', '背部', '胸部', '腕部'];
const RIGHT_SLOTS = ['手部', '腰部', '腿部', '脚部', '戒指 1', '戒指 2', '饰品 1', '饰品 2'];
const SLOT_LABEL = {
  '戒指 1': '戒指 1', '戒指 2': '戒指 2',
  '饰品 1': '饰品 1', '饰品 2': '饰品 2',
  '主手': '主手武器', '副手': '副手/盾牌', '武器': '武器', '双手': '双手武器'
};

function gearRow(row) {
  const it = items[String(row.itemId)];
  if (!it) return null;
  const label = SLOT_LABEL[row.slot] || row.slot;
  const descParts = [it.ilvl + ' 装等'];
  if (it.sourceDesc) descParts.push(it.sourceDesc);
  if (it.statCombo) descParts.push(it.statCombo);
  return {
    slot: label,
    name: it.name,
    desc: descParts.join(' · '),
    icon: it.iconUrl,
    quality: 'EPIC',
    ilvl: it.ilvl,
    itemId: it.id,
    sourceBoss: it.sourceBoss || '',
    statCombo: it.statCombo || ''
  };
}

// 每个专精一套 12.1.5 天赋 + 中文手法：导入码取自抓取快照原文，中文内容取自人工整理版。
// 任一项缺失都直接报错，避免悄悄回退到旧的占位数据。
function buildTalent(slug) {
  const z = talentZh.specs[slug];
  const r = talentRaw.specs[slug];
  if (!z || !r) throw new Error('缺少 12.1.5 天赋/手法数据: ' + slug);
  const b = r.builds[z.buildIndex];
  if (!b || !b.code || !/^[A-Za-z0-9+/]{60,}$/.test(b.code)) {
    throw new Error('天赋导入码缺失或格式异常: ' + slug);
  }
  if (!Array.isArray(z.rotation) || z.rotation.length < 3) {
    throw new Error('手法条目不足: ' + slug);
  }
  return {
    talents: {
      code: b.code,                 // 游戏内可直接导入的原文码
      buildName: z.buildName,
      heroTree: b.heroTree || '',
      scene: z.scene,
      note: z.talentNote,
      whenToUse: b.whenToUse,
      calculator: b.calculator,
      sourceTitle: b.title
    },
    rotation: z.rotation,
    source: {
      name: 'wowsod.pro 12.1.5 专精指南（页面标注对齐 Icy Veins 12.1.5）',
      url: r.url,
      patch: r.patch || '12.1.5'
    }
  };
}

const guides = Object.entries(specBis).map(([slug]) => {
  const sm = specMeta[slug];
  const [classSlug, className, specId, specName] = sm;
  const t = buildTalent(slug);
  return {
    classSlug,
    className,
    specId,
    specName,
    talents: t.talents,
    rotation: t.rotation,
    talentSource: t.source,
    gear: { left: [], right: [], weapons: [] },
    dataDate: meta.dataDate,
    dataVersion: meta.patch,
    source: 'bispath.gg 全专精 BiS 清单 + Wowhead 物品数据 / wowsod.pro · Icy Veins 12.1.5 天赋与手法'
  };
});

// 用原始 slot 精确分组（避免上面标签映射造成的歧义）
guides.forEach((g, i) => {
  const slug = Object.keys(specBis)[i];
  const rows = specBis[slug].map(gearRow).filter(Boolean);
  const rawSlots = specBis[slug].map(r => r.slot);
  g.gear = {
    left: rows.filter((r, k) => LEFT_SLOTS.includes(rawSlots[k])),
    right: rows.filter((r, k) => RIGHT_SLOTS.includes(rawSlots[k])),
    weapons: rows.filter((r, k) => !LEFT_SLOTS.includes(rawSlots[k]) && !RIGHT_SLOTS.includes(rawSlots[k]))
  };
});

// 精简索引：每个专精只保留 [专精四元组, 三组 (itemId, 原始 slot) 列表, 天赋码, 手法]
const guideSeed = guides.map((g, i) => {
  const rows = specBis[Object.keys(specBis)[i]];
  const bucket = { left: [], right: [], weapons: [] };
  rows.forEach(r => {
    const key = LEFT_SLOTS.includes(r.slot) ? 'left'
      : RIGHT_SLOTS.includes(r.slot) ? 'right' : 'weapons';
    bucket[key].push([r.itemId, r.slot]);
  });
  return [g.classSlug, g.className, g.specId, g.specName,
    bucket.left, bucket.right, bucket.weapons, g.talents, g.rotation, g.talentSource];
});

writeDerived('data/wow_guides_data.js', [
  '40 个专精：BiS 装备清单 + 一套 12.1.5 天赋导入码与中文输出手法。',
  'BiS 装备为公开权威推荐清单（非模拟最优），物品名称与属性取自官方客户端数据。',
  '天赋码取自 wowsod.pro 12.1.5 专精指南原文（对齐 Icy Veins 12.1.5），可在游戏内直接导入；',
  '中文手法依据该页 Rotation Priority 归纳翻译，技能名保留英文原名以便核对。'
], [
  "var M = require('./retail_items_master.js').items;",
  'var LABEL = ' + dump(SLOT_LABEL) + ';',
  'var SEED = ' + dump(guideSeed) + ';',
  'var DATA_DATE = ' + dump(meta.dataDate) + ';',
  'var DATA_VERSION = ' + dump(meta.patch) + ';',
  'var SOURCE = ' + dump('bispath.gg 全专精 BiS 清单 + Wowhead 物品数据 / wowsod.pro · Icy Veins 12.1.5 天赋与手法') + ';',
  'function gearRow(pair) {',
  '  var it = M[String(pair[0])];',
  '  if (!it) return null;',
  '  var label = LABEL[pair[1]] || pair[1];',
  "  var desc = [it.ilvl + ' 装等'];",
  '  if (it.sourceDesc) desc.push(it.sourceDesc);',
  '  if (it.statCombo) desc.push(it.statCombo);',
  "  return { slot: label, name: it.name, desc: desc.join(' · '), icon: it.iconUrl,",
  "    quality: 'EPIC', ilvl: it.ilvl, itemId: it.id, sourceBoss: it.sourceBoss || '',",
  "    statCombo: it.statCombo || '' };",
  '}',
  'function rows(list) {',
  '  return list.map(gearRow).filter(function (x) { return !!x; });',
  '}',
  'module.exports = SEED.map(function (s) {',
  '  return { classSlug: s[0], className: s[1], specId: s[2], specName: s[3],',
  '    talents: s[7], rotation: s[8], talentSource: s[9],',
  '    gear: { left: rows(s[4]), right: rows(s[5]), weapons: rows(s[6]) },',
  '    dataDate: DATA_DATE, dataVersion: DATA_VERSION, source: SOURCE };',
  '});'
], guides);

// ---------------------------------------------------------------- 对账单
const talentCount = guides.filter(g => g.talents && g.talents.code).length;
const rotationCount = guides.filter(g => g.rotation && g.rotation.length).length;
const gearCount = guides.reduce((n, g) => n + g.gear.left.length + g.gear.right.length + g.gear.weapons.length, 0);
const lootFlat = loot.flatMap(d => d.encounters.flatMap(e => e.items));
console.log('\n=== 生成对账单 ===');
console.log('  权威物品:', Object.keys(items).length, '件 | 12.1.5:', meta.kithixCount, '件');
console.log('  装备库:', equipmentDb.length, '件 | 掉落分类:', loot.length, '个 /',
  loot.reduce((n, d) => n + d.encounters.length, 0), '个子分组');
loot.forEach(d => console.log('    · ' + d.name + ': ' + d.encounters.length + ' 组 / ' +
  d.encounters.reduce((n, e) => n + e.items.length, 0) + ' 件'));
console.log('  含装备特效:', lootFlat.filter(i => i.special).length, '件 | 含使用效果:',
  lootFlat.filter(i => i.useEffect).length, '件');
console.log('  BiS 专精:', guides.length, '| BiS 装备条目:', gearCount);
console.log('  有天赋码:', talentCount, '/', guides.length, '| 有手法:', rotationCount, '/', guides.length);
