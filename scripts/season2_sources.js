// scripts/season2_sources.js
/**
 * 至暗之夜 12.1.5 第二赛季掉落来源 —— 唯一权威映射表
 *
 * 核实依据（2026-11-13）：
 *  - 暴雪国服官网《暗影渐深 "至暗之夜"第2赛季将于8月20日开启》
 *    https://wow.blizzard.cn/news/24294369/index.html
 *    → 烈毒之渊为 8 首领团本；史诗钥石池 8 个副本的官方简中名；
 *      巢穴「潮缚石窟」为独立世界首领场景，不属于钥石池。
 *  - 暴雪蓝贴 / NGA 转载《乌拉特克的诅咒》：烈毒之渊 8 首领及 LFR 分区顺序。
 *  - TheWoWDB 冒险指南（客户端 12.1.5.70391）：8 个钥石副本各自的首领名单。
 *  - BISPath 40 专精 BiS 表的 sourceEn（英文首领名）+ Wowhead 官方简中 tooltip
 *    的「掉落于」，用于把每件装备精确落到团本首领 / 钥石副本。
 *
 * 口径：
 *  - 烈毒之渊严格按官方 8 首领分区展示，即使某个首领暂无收录装备也保留空分组。
 *  - 史诗钥石按「副本」分组，不再按 Boss 分组；Boss 名降级为单件装备的掉落注释。
 *  - 官方 tooltip 与 BiS 清单均未标注掉落源的装备统一归入「地下堡掉落」。
 */
'use strict';

const DUNGEON_ORDER = [
  '烈毒之渊', '潮缚石窟', '基希克斯破封', '史诗钥石', '套装', '地下堡掉落'
];

// 烈毒之渊 8 首领（官方 LFR 分区顺序：盘魂者 / 毒液精华 / 蛇裔地洞 / 乌拉特克之墓）
const RAID_ABYSS_ORDER = [
  '盘魂者内克扎莉', '双子毒牙',
  '陵寝哨兵', '万毒邪祟者瓦什尼克',
  '迷失的探险者', '斯索拉克',
  '盘卷祭坛', '乌拉特克'
];

// Wowhead tooltip 里出现的 NPC / 旧译名 -> 官方首领名
const RAID_BOSS_ALIAS = {
  '盘魂者内克扎莉': '盘魂者内克扎莉',
  '陵寝哨兵': '陵寝哨兵',
  '乌拉特克之息': '陵寝哨兵',   // 陵寝哨兵战斗中的两尊魔像之一
  '乌拉特克之血': '陵寝哨兵',
  '万毒邪祟者瓦什尼克': '万毒邪祟者瓦什尼克',
  '迷失的探险者': '迷失的探险者',
  '莫尔扎希': '迷失的探险者',   // 迷失的探险者战斗中的 NPC
  '霍吉': '迷失的探险者',
  '斯索拉克': '斯索拉克',
  '双生毒牙': '双子毒牙',
  '双子毒牙': '双子毒牙',
  '维克苏尔': '双子毒牙',       // 双子毒牙：维克苏尔与伊斯拉兹
  '伊斯拉兹': '双子毒牙',
  '盘卷祭坛': '盘卷祭坛',
  '乌拉特克': '乌拉特克'
};

// BISPath 英文来源 -> 团本官方首领名
const RAID_BOSS_EN = {
  "Nek'zali the Soulcoiler": '盘魂者内克扎莉',
  'Entombed Sentinels': '陵寝哨兵',
  'Vashnik the Malignant': '万毒邪祟者瓦什尼克',
  'The Lost Explorers': '迷失的探险者',
  'Sszorak': '斯索拉克',
  'The Twin Fangs': '双子毒牙',
  'The Coiled Altar': '盘卷祭坛',
  "Ula'tek": '乌拉特克'
};

// 第二赛季史诗钥石池（暴雪国服官方简中名）
const MYTHIC_DUNGEON_ORDER = [
  '毒牙祭坛',         // Altar of Fangs（12.1 新增，3 首领）
  '密谋小径',         // Murder Row（4 首领）
  '纳洛拉克的洞穴',   // Den of Nalorakk（3 首领）
  '夺目谷',           // The Blinding Vale（4 首领）
  '虚空之痕竞技场',   // Voidscar Arena（3 首领）
  '红玉新生法池',     // Ruby Life Pools（巨龙时代回归）
  '诸王之眠',         // Kings' Rest（争霸艾泽拉斯回归）
  '塞塔里斯神庙'      // Temple of Sethraliss（争霸艾泽拉斯回归）
];

// 冒险指南 12.1.5：副本 -> 首领（中文/英文对照）
const MYTHIC_BOSS_CN = {
  '拉维': '毒牙祭坛', '扭缠盘蛇': '毒牙祭坛', '祖尔加': '毒牙祭坛',
  '凯斯媞亚·魔力之心': '密谋小径', '赞恩·刃悲': '密谋小径',
  '歼灭者萨祖克斯': '密谋小径',
  '纳洛拉克': '纳洛拉克的洞穴', '寒冬哨兵': '纳洛拉克的洞穴',
  '[The Hoardmonger]': '纳洛拉克的洞穴', '囤宝者': '纳洛拉克的洞穴',
  '梅提克': '夺目谷', '圣光猎手伊库兹': '夺目谷',
  '护光者鲁伊亚': '夺目谷', '兹欧凯特': '夺目谷',
  '塔兹拉尔': '虚空之痕竞技场', '阿特洛苏斯': '虚空之痕竞技场',
  '煞戎努斯': '虚空之痕竞技场',
  '梅莉杜莎·寒妆': '红玉新生法池', '柯姬雅·焰蹄': '红玉新生法池',
  '达萨大王': '诸王之眠', '黄金风蛇': '诸王之眠',
  '征服者阿卡阿里': '诸王之眠', '殓尸者姆沁巴': '诸王之眠',
  '米利克萨': '塞塔里斯神庙', '加瓦兹特': '塞塔里斯神庙',
  '塞塔里斯的化身': '塞塔里斯神庙'
};

const MYTHIC_BOSS_EN = {
  "Rav'i": '毒牙祭坛', 'The Writhing Coil': '毒牙祭坛', "Zul'jan": '毒牙祭坛',
  'Kystia Manaheart': '密谋小径', 'Zaen Bladesorrow': '密谋小径',
  'Xathuux the Annihilator': '密谋小径', 'Lithiel Cinderfury': '密谋小径',
  'The Hoardmonger': '纳洛拉克的洞穴', 'Sentinel of Winter': '纳洛拉克的洞穴',
  'Nalorakk': '纳洛拉克的洞穴',
  'Lightblossom Trinity': '夺目谷', 'Ikuzz the Light Hunter': '夺目谷',
  'Lightwarden Ruia': '夺目谷', 'Ziekket': '夺目谷',
  "Taz'Rah": '虚空之痕竞技场', 'Atroxus': '虚空之痕竞技场',
  'Charonus': '虚空之痕竞技场',
  'Melidrussa Chillworn': '红玉新生法池', 'Kokia Blazehoof': '红玉新生法池',
  'Kyrakka and Erkhart Stormvein': '红玉新生法池',
  'Dazar, The First King': '诸王之眠', 'The Golden Serpent': '诸王之眠',
  'Mchimba the Embalmer': '诸王之眠', 'The Council of Tribes': '诸王之眠',
  'Adderis and Aspix': '塞塔里斯神庙', 'Merektha': '塞塔里斯神庙',
  'Galvazzt': '塞塔里斯神庙', 'Avatar of Sethraliss': '塞塔里斯神庙'
};

// BISPath 英文来源 -> 可核实的官方简中首领名（仅收录已有权威译名，绝不臆造）
const EN_BOSS_LABEL = {
  ...RAID_BOSS_EN,
  'Nymrissa Wavecaller': '尼姆瑞莎·唤波者',
  'Kystia Manaheart': '凯斯媞亚·魔力之心',
  'Sentinel of Winter': '寒冬哨兵',
  'Charonus': '煞戎努斯'
};

const LAIR_BOSS = new Set(['尼姆瑞莎·唤波者', '潮缚石窟']);
const KITHIX_BOSS = new Set(['基希克斯', '基希克斯破封']);

// 地下堡掉落按部位分组，保持与页面部位筛选器一致的顺序
const SLOT_ORDER = [
  '头部', '颈部', '肩部', '背部', '胸部', '腕部', '手部', '腰部',
  '腿部', '脚部', '手指', '饰品', '单手', '双手', '主手', '副手', '远程', '盾牌'
];

const STAT_META = {
  '暴击': { short: '暴', color: '#f43f5e', key: 'crit' },
  '急速': { short: '急', color: '#38bdf8', key: 'haste' },
  '精通': { short: '精', color: '#4ade80', key: 'mastery' },
  '全能': { short: '全', color: '#c084fc', key: 'versa' }
};

/**
 * 把一件权威库物品归类到掉落页的「分组 / 子分组」。
 * 返回字段同时供 master / equipmentDb / loot 三处派生使用，保证口径一致。
 */
function classify(it) {
  const sources = it.bisSources || [];
  const en = sources.find(s => RAID_BOSS_EN[s] || MYTHIC_BOSS_EN[s] ||
    s === 'Nymrissa Wavecaller') || '';
  const cnBoss = it.dropBoss || '';
  const legacyGroup = it.sourceDungeon || '';

  // 1) 12.1.5 单首领团本「基希克斯破封」
  if (it.isKithix || KITHIX_BOSS.has(cnBoss) || legacyGroup === '基希克斯破封') {
    return {
      group: '基希克斯破封', section: '基希克斯', label: '基希克斯',
      sourceType: '团本', sourceInstance: '基希克斯破封',
      sourceDesc: '基希克斯破封 · 基希克斯'
    };
  }

  // 2) 巢穴「潮缚石窟」世界首领（独立场景，不属于史诗钥石池）
  if (LAIR_BOSS.has(cnBoss) || en === 'Nymrissa Wavecaller' || legacyGroup === '潮缚石窟') {
    return {
      group: '潮缚石窟', section: '尼姆瑞莎·唤波者', label: '尼姆瑞莎·唤波者',
      sourceType: '巢穴', sourceInstance: '潮缚石窟',
      sourceDesc: '潮缚石窟 · 尼姆瑞莎·唤波者'
    };
  }

  // 3) 职业套装 / 特殊组合套（如「祖尔加之咬」3 件套）
  if (it.tierSet) {
    const section = it.classRestriction || it.tierSet || '套装';
    return {
      group: '套装', section, label: section,
      sourceType: '套装', sourceInstance: '套装',
      sourceDesc: '套装 · ' + section
    };
  }

  // 4) 烈毒之渊 8 首领
  const raidBoss = (en && RAID_BOSS_EN[en]) || RAID_BOSS_ALIAS[cnBoss];
  if (raidBoss) {
    const label = EN_BOSS_LABEL[en] || RAID_BOSS_ALIAS[cnBoss] || cnBoss || raidBoss;
    return {
      group: '烈毒之渊', section: raidBoss, label,
      sourceType: '团本', sourceInstance: '烈毒之渊',
      sourceDesc: '烈毒之渊 · ' + raidBoss
    };
  }

  // 5) 史诗钥石：按副本归类，Boss 只作为单件装备的掉落注释
  const dungeon = (en && MYTHIC_BOSS_EN[en]) || MYTHIC_BOSS_CN[cnBoss];
  if (dungeon) {
    const label = cnBoss || EN_BOSS_LABEL[en] || '';
    return {
      group: '史诗钥石', section: dungeon, label,
      sourceType: '地下城', sourceInstance: dungeon,
      sourceDesc: '史诗钥石 · ' + dungeon + (label ? ' · ' + label : '')
    };
  }
  if (legacyGroup === '史诗钥石') {
    // 兜底：已确认来自钥石但首领名无法核实，不臆测副本
    return {
      group: '史诗钥石', section: '其他赛季地下城', label: cnBoss || '',
      sourceType: '地下城', sourceInstance: '史诗钥石',
      sourceDesc: '史诗钥石 · ' + (cnBoss || '未标注首领')
    };
  }

  // 6) 未标注掉落源 -> 地下堡掉落（按部位分组，避免上百件挤在一处）
  return {
    group: '地下堡掉落', section: it.slot || '其他部位', label: '',
    sourceType: '地下堡', sourceInstance: '地下堡掉落',
    sourceDesc: '地下堡掉落 · ' + (it.slot || '其他部位')
  };
}

// ---------------------------------------------------------------- 特效文案清洗

// 安全的四则运算求值（只允许数字与 + - * / ( )，用于展开 tooltip 的 ( 55761 * 1 ) 之类表达式）
function evalExpr(expr) {
  const tokens = String(expr).match(/[\d.]+|[()+\-*/]/g);
  if (!tokens) throw new Error('bad expr');
  let i = 0;
  const primary = () => {
    if (tokens[i] === '(') {
      i++;
      const v = add();
      if (tokens[i] !== ')') throw new Error('bad expr');
      i++;
      return v;
    }
    const t = tokens[i];
    if (t === undefined || !/^[\d.]+$/.test(t)) throw new Error('bad expr');
    i++;
    return parseFloat(t);
  };
  const mul = () => {
    let v = primary();
    while (tokens[i] === '*' || tokens[i] === '/') {
      const op = tokens[i++];
      const r = primary();
      v = op === '*' ? v * r : v / r;
    }
    return v;
  };
  const add = () => {
    let v = mul();
    while (tokens[i] === '+' || tokens[i] === '-') {
      const op = tokens[i++];
      const r = mul();
      v = op === '+' ? v + r : v - r;
    }
    return v;
  };
  const value = add();
  if (i !== tokens.length || !Number.isFinite(value)) throw new Error('bad expr');
  return Math.round(value * 100) / 100;
}

function expandMath(text) {
  let out = text;
  for (let pass = 0; pass < 4; pass++) {
    out = out.replace(/\(([^()]*)\)/g, (whole, inner) => {
      if (!/^[\d\s*/+.\-]+$/.test(inner)) return whole;
      try { return String(evalExpr(inner)); } catch (e) { return whole; }
    });
    out = out.replace(/\[([^\[\]]*)\]/g, (whole, inner) => {
      if (!/^[\d\s*/+.\-]+$/.test(inner)) return whole;
      try { return String(evalExpr(inner)); } catch (e) { return whole; }
    });
  }
  return out;
}

/** 去掉 tooltip 残留的「需要等级 / 售价 / 套装组合 / 风味台词」，只保留可读的装备或使用效果。 */
function cleanEffect(text) {
  if (!text) return '';
  let s = String(text)
    .replace(/\u0008/g, ' ')                 // tooltip 里的退格控制符
    .replace(/\u200b/g, '')                 // 零宽空格
    .split(/\s*(?:需要等级|售价[：:]|掉落于[：:]|\(0\/\d\))/)[0]
    .replace(/装备[：:]\s*/g, '')
    .replace(/\s+["“][^"”]*["”]\s*$/u, '')  // 末尾风味台词
    .trim();
  s = expandMath(s);
  return s.replace(/\s+/g, ' ')
    .replace(/\s+([，。；、！？）])/g, '$1')
    .replace(/([（(])\s+/g, '$1')
    .trim();
}

/** 生成页面展示用的真实属性明细（数值均来自官方 tooltip）。 */
function buildAttrs(it) {
  const mainNames = it.mainStats || [];
  const values = it.mainStatValues || {};
  const mainList = [];
  if (mainNames.length) {
    const distinct = [...new Set(mainNames.map(n => values[n]).filter(v => v > 0))];
    if (distinct.length === 1) {
      mainList.push({ label: mainNames.join('/'), value: distinct[0] });
    } else {
      mainNames.forEach(n => mainList.push({ label: n, value: values[n] || 0 }));
    }
  }
  const mainText = mainList.map(x => x.label + ' +' + x.value).join(' / ');
  const staminaText = it.stamina ? '耐力 +' + it.stamina : '';
  const armorText = it.armorValue ? it.armorValue + ' 点护甲' : '';
  const weaponText = it.weaponDamage
    ? it.weaponDamage + ' 伤害 · 速度 ' + it.weaponSpeed +
      (it.weaponDps ? ' · 每秒 ' + it.weaponDps : '')
    : '';
  const secondaryList = Object.entries(it.secondary || {}).map(([name, value]) => ({
    name, value, short: STAT_META[name].short, key: STAT_META[name].key
  }));
  const hasStats = !!(mainText || staminaText || armorText || weaponText || secondaryList.length);
  return {
    mainList, mainText, staminaText, armorText, weaponText,
    secondaryList, hasStats,
    // 纯特效饰品官方 tooltip 只有效果没有数值属性，明确说明而不是留白
    emptyText: hasStats ? '' : '官方数据未标注数值属性（仅特效）',
    secondaryText: secondaryList.map(x => x.name + ' +' + x.value).join(' · ')
  };
}

module.exports = {
  DUNGEON_ORDER, RAID_ABYSS_ORDER, RAID_BOSS_ALIAS, RAID_BOSS_EN,
  MYTHIC_DUNGEON_ORDER, MYTHIC_BOSS_CN, MYTHIC_BOSS_EN, EN_BOSS_LABEL,
  SLOT_ORDER, STAT_META, classify, cleanEffect, buildAttrs, evalExpr
};
