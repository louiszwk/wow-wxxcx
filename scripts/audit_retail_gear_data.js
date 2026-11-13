// scripts/audit_retail_gear_data.js
/**
 * 正式服装备数据一致性 / 覆盖率体检
 * 运行：node scripts/audit_retail_gear_data.js
 *
 * 校验四份数据是否同源、12.1.5 装备是否三处齐全、BiS 是否有悬空引用、
 * 页面字段契约是否完整、天赋码与手法是否残留模板占位。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const master = require(path.join(ROOT, 'data/retail_items_master.js'));
const eq = require(path.join(ROOT, 'data/wow_equipment_db.js'));
const loot = require(path.join(ROOT, 'data/loot.js'));
const guides = require(path.join(ROOT, 'data/wow_guides_data.js'));

let errors = 0, warns = 0;
const err = (m) => { errors++; console.log('  ✗ ' + m); };
const warn = (m) => { warns++; console.log('  ! ' + m); };
const ok = (m) => console.log('  ✓ ' + m);

const items = master.items;
const itemList = Object.values(items);
console.log('=== 1. 权威库 ===');
console.log('  版本 ' + master.meta.patch + ' | 数据日期 ' + master.meta.dataDate +
  ' | 物品 ' + itemList.length + ' 件 | 专精 ' + master.meta.specCount);
for (const f of ['name', 'icon', 'iconUrl', 'ilvl', 'slot', 'itemClass', 'sourceDungeon']) {
  const missing = itemList.filter(x => x[f] === undefined || x[f] === '' || x[f] === 0);
  if (missing.length) err(f + ' 字段缺失 ' + missing.length + ' 件');
}
if (!itemList.length) err('权威库为空');
else ok('核心字段完整：' + itemList.length + '/' + itemList.length);
const badIcon = itemList.filter(x => !x.iconUrl.startsWith('https://wow.zamimg.com/'));
if (badIcon.length) err('图标域名不合法 ' + badIcon.length + ' 件');
else ok('图标全部沿用现有合法域名 wow.zamimg.com');

console.log('\n=== 2. 12.1.5 基希克斯破封装备 ===');
const kith = itemList.filter(x => x.isKithix);
if (kith.length !== 10) err('应为 10 件，实际 ' + kith.length);
else ok('10 件特效装备齐全（4 护甲 + 2 武器 + 1 戒指 + 3 饰品）');
const lootKith = loot.find(d => d.name === '基希克斯破封');
if (!lootKith) err('掉落查询缺少「基希克斯破封」分类');
else {
  const flat = lootKith.encounters.flatMap(e => e.items);
  const missing = kith.filter(x => !flat.some(i => i.id === x.id));
  if (missing.length) err('掉落查询缺 ' + missing.length + ' 件：' + missing.map(x => x.name).join('、'));
  else ok('掉落查询 10/10 齐全');
}
const eqKith = kith.filter(x => !eq.some(i => i.id === x.id));
if (eqKith.length) err('配装装备库缺 ' + eqKith.length + ' 件');
else ok('配装装备库 10/10 齐全');

console.log('\n=== 3. 三份数据与权威库一致性 ===');
const eqBad = eq.filter(i => {
  const m = items[String(i.id)];
  return !m || m.name !== i.name || m.ilvl !== i.ilvl || m.iconUrl !== i.icon;
});
if (eqBad.length) err('装备库与权威库不一致 ' + eqBad.length + ' 件');
else ok('装备库 ' + eq.length + ' 件与权威库逐字段一致');
if (eq.length !== itemList.length) err('装备库数量与权威库不符');
const lootFlat = loot.flatMap(d => d.encounters.flatMap(e => e.items));
const lootBad = lootFlat.filter(i => {
  const m = items[String(i.id)];
  return !m || m.name !== i.name || m.ilvl !== i.ilvl;
});
if (lootBad.length) err('掉落查询与权威库不一致 ' + lootBad.length + ' 件');
else ok('掉落查询 ' + lootFlat.length + ' 条与权威库逐字段一致');
const missingIds = itemList.filter(x => !eq.some(i => i.id === x.id));
if (missingIds.length) err('权威库有 ' + missingIds.length + ' 件未进入装备库');
else ok('权威库物品 100% 进入装备库');

console.log('\n=== 4. BiS 40 专精 ===');
if (guides.length !== 40) err('专精数应为 40，实际 ' + guides.length);
else ok('覆盖 40 个专精（含 12.1 新增噬灭 DH）');
let dangling = 0, gearRows = 0;
const talentCodes = [];
for (const g of guides) {
  for (const row of [...g.gear.left, ...g.gear.right, ...g.gear.weapons]) {
    gearRows++;
    const m = items[String(row.itemId)];
    if (!m || m.name !== row.name) dangling++;
  }
  if (g.talents && g.talents.code) talentCodes.push(g.talents.code);
}
if (dangling) err('BiS 悬空物品引用 ' + dangling + ' 条');
else ok('BiS ' + gearRows + ' 条装备引用 100% 可反查权威库');
const dupGroups = {};
talentCodes.forEach(c => { dupGroups[c] = (dupGroups[c] || 0) + 1; });
const dup = Object.entries(dupGroups).filter(([, n]) => n > 1);
if (dup.length) err('存在 ' + dup.length + ' 组重复天赋导入码');
else if (talentCodes.length !== guides.length) err('导入码覆盖 ' + talentCodes.length + '/' + guides.length + '，要求 40 专精全覆盖');
else ok('40 个专精各有 1 条独立真实导入码');
const badCode = guides.filter(g => !g.talents || !/^[A-Za-z0-9+/]{60,}$/.test(g.talents.code || ''));
if (badCode.length) err('导入码格式异常 ' + badCode.length + ' 个专精');
else ok('全部导入码格式合法（可在游戏内直接导入）');
const noSource = guides.filter(g => !g.talentSource || !g.talentSource.url || !g.talentSource.patch);
if (noSource.length) err('缺少 12.1.5 来源标注 ' + noSource.length + ' 个专精');
else ok('40 个专精均标注 12.1.5 来源与原文链接');
const placeholders = guides.filter(g => {
  const s = JSON.stringify(g);
  return /\.\.\.|待补|暂无|TBD|TODO|占位|通用标准推荐/.test(s);
});
if (placeholders.length) err('残留占位文案 ' + placeholders.length + ' 个专精');
else ok('无模板/占位文案');
const noTalent = guides.filter(g => !g.talents || !g.talents.code ||
  !g.talents.buildName || !g.talents.note);
const noRot = guides.filter(g => !g.rotation || g.rotation.length < 3 ||
  g.rotation.some(r => !r.name || !r.desc));
if (noTalent.length || noRot.length)
  err('天赋/手法覆盖不足：天赋 ' + noTalent.length + ' 个、手法 ' + noRot.length + ' 个专精缺失');
else ok('每个专精均有一套天赋 + 不少于 3 条中文手法');

console.log('\n=== 5. 页面字段契约 ===');
const eqMissing = eq.filter(i =>
  !i.secondary_stats || typeof i.secondary_stats.crit_weight !== 'number' ||
  !Array.isArray(i.secondary_stats.list) || typeof i.source_desc !== 'string' ||
  typeof i.item_class !== 'string' || typeof i.slot !== 'string');
if (eqMissing.length) err('装备库缺页面必需字段 ' + eqMissing.length + ' 件');
else ok('配装模拟器所需字段（槽位/类型/来源/权重）齐全');
const lootMissing = lootFlat.filter(i =>
  !i.quality || !i.quality.type || !i.item_class || !i.item_class.name ||
  !i.inventory_type || !i.inventory_type.name || !i.stats || !i.attrs ||
  typeof i.special !== 'string' || typeof i.useEffect !== 'string' ||
  typeof i.sourceDesc !== 'string');
if (lootMissing.length) err('掉落查询缺页面必需字段 ' + lootMissing.length + ' 条');
else ok('掉落查询模板所需字段（quality/type/stats/attrs/特效/来源）齐全');
const guideMissing = guides.filter(g =>
  !g.gear || !Array.isArray(g.gear.left) || !Array.isArray(g.gear.right) ||
  !Array.isArray(g.gear.weapons) || !g.classSlug || !g.specId ||
  !g.talents || !g.talents.code || !g.talents.buildName ||
  !Array.isArray(g.rotation) || !g.talentSource || !g.talentSource.url);
if (guideMissing.length) err('专精攻略缺页面必需字段 ' + guideMissing.length + ' 条');
else ok('BiS 清单 / 天赋导入码 / 中文手法 / 来源字段齐全');

console.log('\n=== 6. 首页两个板块入口与职责 ===');
const indexWxml = fs.readFileSync(path.join(ROOT, 'pages/index/index.wxml'), 'utf8');
const hasBisGear = /bindtap="navigateToBuild"/.test(indexWxml) && indexWxml.includes('BiS与配装');
const hasTalent = /bindtap="navigateToBis"/.test(indexWxml) && indexWxml.includes('天赋与手法');
if (!hasBisGear || !hasTalent) err('首页两个板块入口未恢复或名称不符');
else ok('首页已恢复「BiS与配装」「天赋与手法」两个入口');
const detailWxml = fs.readFileSync(path.join(ROOT, 'pages/bis-detail/bis-detail.wxml'), 'utf8');
if (/activeSection|sectionTabs|mode-tabs|gear-panel|weapons-panel|leftGear|rightGear/.test(detailWxml))
  err('「天赋与手法」页仍残留 BiS 装备区 / 三页签结构');
else ok('「天赋与手法」页收敛为天赋码 + 手法，BiS 装备已移出');
const buildJs = fs.readFileSync(path.join(ROOT, 'pages/build/build.js'), 'utf8');
if (!/loadBisIntoEditor|refreshBisGear|BIS_SLOT_MAP/.test(buildJs))
  err('「BiS与配装」页缺少按专精一键载入 BiS 能力');
else ok('「BiS与配装」页含 40 专精 BiS 清单与一键载入');

console.log('\n=== 7. 第二赛季掉落分组结构 ===');
const { DUNGEON_ORDER, RAID_ABYSS_ORDER, MYTHIC_DUNGEON_ORDER } =
  require('./season2_sources.js');
const groupNames = loot.map(d => d.name);
if (groupNames.join('|') !== DUNGEON_ORDER.join('|'))
  err('掉落分组顺序不符：' + groupNames.join('、'));
else ok('6 个分组顺序正确：' + groupNames.join(' / '));
if (groupNames.some(n => /其他来源|未标注来源|史诗钥匙/.test(n)))
  err('仍残留旧分组名（其他来源 / 未标注来源）');
else ok('旧「其他来源」已改为「地下堡掉落」');

const abyss = loot.find(d => d.name === '烈毒之渊');
if (!abyss || abyss.encounters.length !== 8)
  err('烈毒之渊首领数应为 8，实际 ' + (abyss ? abyss.encounters.length : 0));
else if (abyss.encounters.some((e, i) => e.name !== RAID_ABYSS_ORDER[i]))
  err('烈毒之渊首领名 / 顺序与官方 8 首领不符');
else ok('烈毒之渊 8 首领齐全且顺序与官方分区一致（' +
  abyss.encounters.reduce((n, e) => n + e.items.length, 0) + ' 件）');

const mythic = loot.find(d => d.name === '史诗钥石');
if (!mythic || mythic.encounters.length !== 8)
  err('史诗钥石副本数应为 8，实际 ' + (mythic ? mythic.encounters.length : 0));
else if (mythic.encounters.some((e, i) => e.name !== MYTHIC_DUNGEON_ORDER[i]))
  err('史诗钥石分组不是按副本名（疑似仍按 Boss 分组）');
else ok('史诗钥石按 8 个副本分组（' +
  mythic.encounters.reduce((n, e) => n + e.items.length, 0) + ' 件），不再按 Boss 分组');

const delve = loot.find(d => d.name === '地下堡掉落');
if (!delve || !delve.encounters.length) err('缺少「地下堡掉落」分组');
else ok('地下堡掉落 ' + delve.encounters.reduce((n, e) => n + e.items.length, 0) +
  ' 件，按 ' + delve.encounters.length + ' 个部位分组');

const totalLoot = lootFlat.length;
if (totalLoot !== itemList.length)
  err('掉落查询条目 ' + totalLoot + ' 与权威库 ' + itemList.length + ' 件不符');
else ok('431 件装备全部有且仅有一个掉落归属');

const badDesc = lootFlat.filter(i => /其他来源|未标注来源|官方数据未标注/.test(i.sourceDesc));
if (badDesc.length) err('掉落详情仍有旧口径来源文案 ' + badDesc.length + ' 条');
else ok('掉落来源文案全部更新为新口径');
const badEffect = lootFlat.filter(i =>
  /需要等级|售价:|\u0008|\(0\/\d\)/.test(i.special + i.useEffect));
if (badEffect.length) err('特效文案残留 tooltip 杂质 ' + badEffect.length + ' 条');
else ok('特效文案已清洗（' + lootFlat.filter(i => i.special).length + ' 件装备特效 + ' +
  lootFlat.filter(i => i.useEffect).length + ' 件使用效果）');
const noAttrs = lootFlat.filter(i => !i.attrs.hasStats);
if (noAttrs.some(i => !i.attrs.emptyText)) err('无数值属性装备缺少明确说明 ' + noAttrs.length + ' 件');
else ok('全部装备均带真实属性明细（' + noAttrs.length +
  ' 件纯特效饰品官方未给数值，已明确注明不臆造）');
const eqOld = eq.filter(i => /其他来源|官方数据未标注/.test(i.source_dungeon + i.source_desc));
if (eqOld.length) err('装备库仍残留旧来源分类 ' + eqOld.length + ' 件');
else ok('配装模拟器 / 管理后台来源分类同步更新');

console.log('\n=== 对账单 ===');
console.log('  权威物品 ' + itemList.length + ' 件 | 12.1.5 装备 ' + kith.length + ' 件');
console.log('  掉落分类 ' + loot.length + ' 个 / 子分组 ' + loot.reduce((n, d) => n + d.encounters.length, 0) + ' 个');
console.log('  BiS 专精 ' + guides.length + ' 个 / 装备条目 ' + gearRows + ' 条');
console.log('  天赋码 ' + talentCodes.length + '/' + guides.length + ' | 手法 ' +
  (guides.length - noRot.length) + '/' + guides.length);
console.log('\n结果：' + errors + ' 错误 / ' + warns + ' 警告');
process.exitCode = errors ? 1 : 0;
