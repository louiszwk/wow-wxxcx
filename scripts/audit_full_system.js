// scripts/audit_full_system.js
/**
 * 小程序全量静态体检：语法 / 结构 / 引用 / 绑定 / 数据 / 云函数 / 运行时风险
 * 运行: node scripts/audit_full_system.js
 * 只读，不修改任何文件。问题按 ERROR / WARN / INFO 分级输出。
 */
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.workbuddy', 'portraits_backup']);
const issues = [];
const stats = {};
function add(level, cat, msg) { issues.push({ level, cat, msg }); }
function rel(p) { return path.relative(ROOT, p).replace(/\\/g, '/'); }

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('.') || SKIP_DIRS.has(f)) continue;
    const full = path.join(dir, f);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const allFiles = walk(ROOT);
const byExt = {};
for (const f of allFiles) {
  const e = path.extname(f).toLowerCase();
  (byExt[e] = byExt[e] || []).push(f);
}
stats.files = allFiles.length;

// ---------- 1. JS 语法 ----------
const jsFiles = (byExt['.js'] || []).filter(f => !f.includes(`${path.sep}node_modules${path.sep}`));
let jsBad = 0;
for (const f of jsFiles) {
  const r = cp.spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' });
  if (r.status !== 0) {
    jsBad++;
    add('ERROR', '语法', `${rel(f)}: ${(r.stderr || '').split('\n').filter(Boolean)[0] || 'syntax error'}`);
  }
}
stats.jsChecked = jsFiles.length;
stats.jsBad = jsBad;

// ---------- 2. JSON 可解析 ----------
const jsonFiles = (byExt['.json'] || []).filter(f => !f.includes(`${path.sep}node_modules${path.sep}`));
for (const f of jsonFiles) {
  try { JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { add('ERROR', 'JSON', `${rel(f)}: ${e.message}`); }
}
stats.jsonChecked = jsonFiles.length;

// ---------- 3. app.json 页面注册 & 四件套 ----------
const appJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'app.json'), 'utf8'));
const registered = [...appJson.pages];
for (const sub of appJson.subpackages || []) {
  for (const p of sub.pages) registered.push(path.join(sub.root, p).replace(/\\/g, '/'));
}
stats.pages = registered.length;
for (const p of registered) {
  for (const ext of ['.js', '.json', '.wxml', '.wxss']) {
    if (!fs.existsSync(path.join(ROOT, p + ext))) add('ERROR', '页面', `缺少 ${p + ext}`);
  }
  const jsPath = path.join(ROOT, p + '.js');
  if (fs.existsSync(jsPath)) {
    const s = fs.readFileSync(jsPath, 'utf8');
    if (!/\bPage\s*\(/.test(s) && !/\bComponent\s*\(/.test(s)) add('ERROR', '页面', `${p}.js 未调用 Page()/Component()`);
  }
  const jsonPath = path.join(ROOT, p + '.json');
  if (fs.existsSync(jsonPath)) {
    let cfg;
    try { cfg = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); }
    catch (e) { add('ERROR', '页面', `${p}.json 无法解析: ${e.message}`); continue; }
    for (const [name, p2] of Object.entries(cfg.usingComponents || {})) {
      if (typeof p2 !== 'string') continue;
      const base = p2.startsWith('/') ? path.join(ROOT, p2.slice(1)) : path.resolve(path.dirname(jsonPath), p2);
      if (!fs.existsSync(base + '.wxml') && !fs.existsSync(path.join(base, 'index.wxml'))) {
        add('ERROR', '组件', `${p}.json 组件 ${name} -> ${p2} 不存在`);
      }
    }
  }
}
// 孤儿页面
const pageDirs = new Set();
for (const f of allFiles.filter(f => f.endsWith('.wxml') && rel(f).startsWith('pages/'))) {
  pageDirs.add(rel(f).replace(/\.wxml$/, ''));
}
for (const p of pageDirs) if (!registered.includes(p)) add('WARN', '页面', `目录存在但未在 app.json 注册: ${p}`);

// ---------- 4. require 完整性 ----------
// 构建脚本会把「待写入数据文件的 require 语句」作为字符串模板保存（例如生成器里的
// "var M = require('./xxx.js')"），这类文本不是本文件的真实引用，需排除误报。
function insideStringLiteral(source, index) {
  const start = source.lastIndexOf('\n', index - 1) + 1;
  const before = source.slice(start, index);
  let dq = 0, sq = 0, escaped = false;
  for (const ch of before) {
    if (escaped) { escaped = false; continue; }
    if (ch === '\\') { escaped = true; continue; }
    if (ch === '"') dq ^= 1;
    else if (ch === "'") sq ^= 1;
  }
  return dq === 1 || sq === 1;
}
for (const f of jsFiles) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /require\(\s*['"]([^'"]+)['"]\s*\)/g;
  let m;
  while ((m = re.exec(s))) {
    const r = m[1];
    if (!r.startsWith('.')) continue;
    if (insideStringLiteral(s, m.index)) continue;
    const base = path.resolve(path.dirname(f), r);
    if (![base, base + '.js', base + '.json', path.join(base, 'index.js')].some(x => fs.existsSync(x))) {
      add('ERROR', '引用', `${rel(f)}: require('${r}') 目标不存在`);
    }
  }
}

// ---------- 5. 路由跳转目标 ----------
for (const f of jsFiles.filter(f => rel(f).startsWith('pages/'))) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /wx\.(?:navigateTo|redirectTo|reLaunch|switchTab)\s*\(\s*\{[\s\S]{0,200}?url\s*:\s*(['"`])([^'"`]+)\1/g;
  let m;
  while ((m = re.exec(s))) {
    const raw = m[2].split('?')[0].replace(/^\//, '');
    if (raw.includes('${') || raw.includes('+')) continue;
    if (!registered.includes(raw)) add('ERROR', '路由', `${rel(f)}: 跳转到未注册页面 ${raw}`);
  }
  // 页面中出现的页面路径字面量（含动态拼接里的常量片段）统一校验
  for (const mm of s.matchAll(/['"`](\/pages\/[a-zA-Z0-9_/-]+)['"`]/g)) {
    if (!registered.includes(mm[1].slice(1))) add('ERROR', '路由', `${rel(f)}: 引用了未注册页面 ${mm[1]}`);
  }
}

// ---------- 6. WXML 模板检查 ----------
const wxmlFiles = (byExt['.wxml'] || []).filter(f => rel(f).startsWith('pages/'));
for (const f of wxmlFiles) {
  const s = fs.readFileSync(f, 'utf8');
  const opens = (s.match(/\{\{/g) || []).length, closes = (s.match(/\}\}/g) || []).length;
  if (opens !== closes) add('ERROR', '模板', `${rel(f)}: {{ }} 不配对 (${opens}/${closes})`);
  // 标签闭合（忽略自闭合与注释）
  const stack = [];
  const tagRe = /<\/?([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
  let t;
  while ((t = tagRe.exec(s))) {
    const [all, name, attrs, selfClose] = t;
    if (all.startsWith('</')) {
      const top = stack.pop();
      if (top !== name) { add('ERROR', '模板', `${rel(f)}: 标签闭合不匹配 </${name}>，栈顶 ${top || '空'}`); break; }
    } else if (!selfClose && !['import', 'include', 'wxs'].includes(name)) {
      // WXML 里 image/input/textarea 可以成对出现，只有 import/include/wxs 是纯声明标签
      stack.push(name);
    }
  }
  if (stack.length) add('WARN', '模板', `${rel(f)}: 未闭合标签 ${stack.slice(-3).join(',')}`);
  // import / include
  for (const m of s.matchAll(/(?:<import|<include)\s+src\s*=\s*["']([^"']+)["']/g)) {
    const r = m[1];
    const base = r.startsWith('/') ? path.join(ROOT, r.slice(1)) : path.resolve(path.dirname(f), r);
    if (!fs.existsSync(base)) add('ERROR', '模板', `${rel(f)}: ${r} 不存在`);
  }
  // 事件绑定 vs JS 方法
  const jsf = f.replace(/\.wxml$/, '.js');
  if (fs.existsSync(jsf)) {
    const js = fs.readFileSync(jsf, 'utf8');
    const names = new Set();
    for (const mm of s.matchAll(/\b(?:bind|catch|capture-bind|capture-catch|mut-bind):?([a-zA-Z]+)\s*=\s*["']([^"'{]+)["']/g)) {
      names.add(mm[2].trim());
    }
    for (const n of names) {
      if (!n || /^[a-zA-Z_$][\w$]*$/.test(n) === false) continue;
      const re1 = new RegExp('(^|[\\s,{])' + n + '\\s*[:(]', 'm');
      if (!re1.test(js)) add('ERROR', '绑定', `${rel(f)}: 事件 ${n} 在 JS 中未定义`);
    }
  }
}
stats.wxmlChecked = wxmlFiles.length;

// ---------- 7. WXSS / 本地图片资源 ----------
const localAssetRefs = [];
for (const f of [...(byExt['.wxml'] || []), ...(byExt['.wxss'] || []), ...jsFiles]) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/(?:src|url)\s*[=:(]\s*["'`]?(\/?(?:images|assets|pages)[^"'`)\s]+?\.(?:png|jpg|jpeg|gif|webp|svg))/gi)) {
    localAssetRefs.push({ f, ref: m[1] });
  }
  for (const m of s.matchAll(/["'`](\/images\/[^"'`\s]+?\.(?:png|jpg|jpeg|gif|webp|svg))["'`]/gi)) {
    localAssetRefs.push({ f, ref: m[1] });
  }
}
const assetSet = new Map();
for (const { f, ref } of localAssetRefs) {
  if (ref.includes('${') || ref.includes('*')) continue;
  const p = ref.startsWith('/') ? path.join(ROOT, ref.slice(1)) : path.resolve(path.dirname(f), ref);
  const key = p + '|' + rel(f);
  if (!assetSet.has(key)) assetSet.set(key, { f, ref, exists: fs.existsSync(p) });
}
for (const v of assetSet.values()) if (!v.exists) add('WARN', '资源', `${rel(v.f)}: 本地图片不存在 ${v.ref}`);
stats.assetRefs = assetSet.size;

// WXSS 括号平衡
for (const f of (byExt['.wxss'] || [])) {
  const s = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  let b = 0;
  for (const ch of s) { if (ch === '{') b++; else if (ch === '}') b--; }
  if (b !== 0) add('ERROR', 'WXSS', `${rel(f)}: 花括号不平衡 (${b})`);
}

// ---------- 8. 云函数 ----------
const cfRoot = path.join(ROOT, 'cloudfunctions');
const cloudNames = new Set();
if (fs.existsSync(cfRoot)) {
  for (const d of fs.readdirSync(cfRoot)) {
    const dir = path.join(cfRoot, d);
    if (!fs.statSync(dir).isDirectory()) continue;
    cloudNames.add(d);
    const idx = path.join(dir, 'index.js'), pkg = path.join(dir, 'package.json');
    if (!fs.existsSync(idx)) add('ERROR', '云函数', `${d}: 缺 index.js`);
    else {
      const s = fs.readFileSync(idx, 'utf8');
      if (!/exports\.main|module\.exports\s*=/.test(s)) add('ERROR', '云函数', `${d}/index.js 未导出 main`);
      const reqs = [...s.matchAll(/require\(['"]([^'".][^'"]*)['"]\)/g)].map(m => m[1].split('/')[0]);
      let deps = {};
      if (fs.existsSync(pkg)) { try { deps = JSON.parse(fs.readFileSync(pkg, 'utf8')).dependencies || {}; } catch (e) {} }
      else add('WARN', '云函数', `${d}: 缺 package.json`);
      for (const r of new Set(reqs)) if (!deps[r]) add('WARN', '云函数', `${d}: require('${r}') 未在 package.json 声明`);
    }
  }
}
// 页面调用的云函数名
for (const f of jsFiles.filter(f => rel(f).startsWith('pages/'))) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/\.callFunction\s*\(\s*\{[^}]*?name\s*:\s*['"]([^'"]+)['"]/g)) {
    if (!cloudNames.has(m[1])) add('ERROR', '云函数', `${rel(f)}: 调用未部署的云函数 ${m[1]}`);
  }
}
stats.cloudFunctions = cloudNames.size;

// ---------- 9. 天赋数据深度校验 ----------
try {
  const { TALENT_DATA_60 } = require(path.join(ROOT, 'data/infinite_talents_data.js'));
  let nodes = 0, presets = 0;
  for (const [cls, c] of Object.entries(TALENT_DATA_60)) {
    const globalIds = new Set();
    for (const t of c.trees) {
      const byId = new Map();
      for (const sk of t.skills) {
        nodes++;
        if (globalIds.has(sk.id)) add('ERROR', '天赋数据', `${cls}/${t.name}: 重复 id ${sk.id}`);
        globalIds.add(sk.id); byId.set(sk.id, sk);
        if (!(sk.row >= 1 && sk.row <= 7) || !(sk.col >= 1 && sk.col <= 4)) add('ERROR', '天赋数据', `${cls}/${t.name}/${sk.name}: 坐标越界 R${sk.row}C${sk.col}`);
        if (!Array.isArray(sk.ranks) || sk.ranks.length !== sk.max) add('ERROR', '天赋数据', `${cls}/${t.name}/${sk.name}: ranks ${sk.ranks && sk.ranks.length} != max ${sk.max}`);
        if (!sk.icon || !sk.name) add('ERROR', '天赋数据', `${cls}/${t.name}: 缺图标或名称`);
      }
      const dupCell = new Map();
      for (const sk of t.skills) {
        const k = sk.row + '|' + sk.col;
        if (dupCell.has(k)) add('ERROR', '天赋数据', `${cls}/${t.name}: R${sk.row}C${sk.col} 重复 (${dupCell.get(k)} / ${sk.name})`);
        dupCell.set(k, sk.name);
      }
      for (const sk of t.skills) {
        if (sk.prereq && !byId.has(sk.prereq)) add('ERROR', '天赋数据', `${cls}/${t.name}/${sk.name}: 前置 ${sk.prereq} 不在本树`);
      }
    }
    for (const p of c.presets || []) {
      presets++;
      const total = Object.values(p.points || {}).reduce((a, b) => a + b, 0);
      if (total !== 51) add('ERROR', '天赋数据', `${cls} 预设 ${p.name}: ${total} 点 (应为 51)`);
      for (const id of Object.keys(p.points || {})) if (!globalIds.has(id)) add('ERROR', '天赋数据', `${cls} 预设 ${p.name}: 无效天赋 id ${id}`);
      // 层级 + 前置
      for (const t of c.trees) {
        const byId = new Map(t.skills.map(s => [s.id, s]));
        const rows = {};
        for (const sk of t.skills) rows[sk.row] = (rows[sk.row] || 0) + (p.points[sk.id] || 0);
        let acc = 0;
        for (let r = 1; r <= 7; r++) {
          if (rows[r] > 0 && acc < (r - 1) * 5) add('ERROR', '天赋预设', `${cls}/${p.name}/${t.name}: 第${r}行已投 ${rows[r]} 点但前置点数仅 ${acc}`);
          acc += rows[r] || 0;
        }
        for (const sk of t.skills) if ((p.points[sk.id] || 0) > 0 && sk.prereq) {
          const pre = byId.get(sk.prereq);
          if (pre && (p.points[pre.id] || 0) < pre.max) add('ERROR', '天赋预设', `${cls}/${p.name}: ${sk.name} 的前置 ${pre.name} 未点满`);
        }
      }
    }
  }
  stats.talentNodes = nodes; stats.talentPresets = presets;
} catch (e) { add('ERROR', '天赋数据', `加载失败: ${e.message}`); }

// ---------- 10. 数据导出与页面使用字段 ----------
try {
  const d = require(path.join(ROOT, 'data/infinite_data.js'));
  const expected = ['FLIGHT_PATHS', 'WOW_RACES', 'WOW_CLASSES', 'TALENT_DATA_60', 'INITIAL_WISHES', 'WOW_TERMS', 'INFINITE_DUNGEONS', 'INFINITE_RAIDS'];
  for (const k of expected) if (!(k in d)) add('ERROR', '数据', `infinite_data.js 缺导出 ${k}`);
  stats.dataExports = Object.keys(d).length;
} catch (e) { add('ERROR', '数据', `infinite_data.js 加载失败: ${e.message}`); }

// ---------- 11. 外部域名汇总 ----------
const domains = new Map();
for (const f of [...jsFiles, ...(byExt['.wxml'] || []), ...(byExt['.wxss'] || [])]) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/https?:\/\/([a-zA-Z0-9.-]+)/g)) {
    const k = m[1];
    domains.set(k, (domains.get(k) || 0) + 1);
  }
}
stats.externalDomains = domains.size;

// ---------- 12. 运行时风险提示 ----------
for (const f of jsFiles.filter(f => rel(f).startsWith('pages/'))) {
  const s = fs.readFileSync(f, 'utf8');
  if (/wx\.getSystemInfoSync\s*\(/.test(s) && !/wx\.getWindowInfo/.test(s)) add('INFO', '兼容性', `${rel(f)}: 使用已废弃的 wx.getSystemInfoSync`);
  if (/wx\.request\s*\(/.test(s) && !/fail\s*:/.test(s)) add('INFO', '健壮性', `${rel(f)}: wx.request 未统一处理 fail`);
}

// ---------- 输出 ----------
const order = { ERROR: 0, WARN: 1, INFO: 2 };
issues.sort((a, b) => order[a.level] - order[b.level] || a.cat.localeCompare(b.cat));
console.log('=== 小程序系统全量体检 ===\n');
console.log('统计:', JSON.stringify(stats, null, 0));
console.log('\n外部域名:', [...domains.entries()].map(([k, v]) => `${k}(${v})`).join(', ') || '无');
console.log('\n--- 问题清单 ---');
if (!issues.length) console.log('无');
const grouped = {};
for (const i of issues) (grouped[i.level] = grouped[i.level] || []).push(i);
for (const lv of ['ERROR', 'WARN', 'INFO']) {
  const list = grouped[lv] || [];
  console.log(`\n[${lv}] ${list.length} 项`);
  for (const i of list.slice(0, 80)) console.log(`  (${i.cat}) ${i.msg}`);
  if (list.length > 80) console.log(`  ... 另有 ${list.length - 80} 项`);
}
console.log(`\n合计: ERROR ${(grouped.ERROR || []).length} / WARN ${(grouped.WARN || []).length} / INFO ${(grouped.INFO || []).length}`);
process.exitCode = (grouped.ERROR || []).length ? 1 : 0;
