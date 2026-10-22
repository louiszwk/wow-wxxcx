const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. 获取所有 8 个副本的敌人与技能列表
const dungeons = [
  { file: 'MurderRow.lua', key: '谋杀街 (Murder Row)' },
  { file: 'DenOfNalorakk.lua', key: '纳洛拉克之巢' },
  { file: 'TheBlindingVale.lua', key: '致盲谷' },
  { file: 'VoidscarArena.lua', key: '虚空之痕竞技场' },
  { file: 'AltarOfFangs.lua', key: '尖牙祭坛' },
  { file: 'RubyLifePools.lua', key: '红玉新生法地' },
  { file: 'TempleOfSethraliss.lua', key: '塞塔里斯神庙' },
  { file: 'KingsRest.lua', key: '诸王之眠' }
];

// 读取 zhCN.lua 汉化
const zhCNPath = path.join(__dirname, '../data/MythicDungeonTools/Locales/zhCN.lua');
const zhCNContent = fs.readFileSync(zhCNPath, 'utf8');
const localeMap = {};
zhCNContent.split('\n').forEach(line => {
  const m = line.match(/L\["([^"]+)"\]\s*=\s*"([^"]+)"/);
  if (m) localeMap[m[1]] = m[2];
});

const enemyDB = {};
const allSpellIds = new Set();

dungeons.forEach(d => {
  const fPath = path.join(__dirname, '../data/MythicDungeonTools/Midnight', d.file);
  if (!fs.existsSync(fPath)) return;
  const content = fs.readFileSync(fPath, 'utf8');

  const enemiesCodePart = content.split(/MDT\.dungeonEnemies\[dungeonIndex\]\s*=\s*\{/)[1];
  if (!enemiesCodePart) return;
  const enemyBlocks = enemiesCodePart.split(/\r?\n  \[\d+\]\s*=\s*\{/);

  for (let i = 1; i < enemyBlocks.length; i++) {
    const block = enemyBlocks[i];
    const nameM = block.match(/\["name"\]\s*=\s*"([^"]+)"/);
    const idM = block.match(/\["id"\]\s*=\s*(\d+)/);
    if (!nameM || !idM) continue;

    const name = nameM[1];
    const id = parseInt(idM[1]);
    const healthM = block.match(/\["health"\]\s*=\s*(\d+)/);
    const creatureTypeM = block.match(/\["creatureType"\]\s*=\s*"([^"]+)"/);
    const displayIdM = block.match(/\["displayId"\]\s*=\s*(\d+)/);
    const isBossM = block.match(/\["isBoss"\]\s*=\s*true/);

    const spells = [];
    const sIdx = block.indexOf('["spells"]');
    const cIdx = block.indexOf('["clones"]');
    if (sIdx !== -1 && cIdx !== -1 && cIdx > sIdx) {
      const spellsStr = block.substring(sIdx, cIdx);
      const spellMatches = [...spellsStr.matchAll(/\[(\d+)\]\s*=/g)];
      for (const sm of spellMatches) {
        const sid = parseInt(sm[1]);
        spells.push(sid);
        allSpellIds.add(sid);
      }
    }

    const characteristics = [];
    const charSection = block.match(/\["characteristics"\]\s*=\s*\{([\s\S]*?)\n\s*\},/);
    if (charSection) {
      const charMatches = charSection[1].matchAll(/\["([^"]+)"\]\s*=\s*true/g);
      for (const cm of charMatches) {
        characteristics.push(cm[1]);
      }
    }

    enemyDB[id] = {
      id,
      name,
      nameCn: localeMap[name] || name,
      dungeon: d.key,
      health: healthM ? parseInt(healthM[1]) : 0,
      creatureType: creatureTypeM ? creatureTypeM[1] : 'Humanoid',
      displayId: displayIdM ? parseInt(displayIdM[1]) : 0,
      isBoss: !!isBossM,
      characteristics,
      spells
    };
  }
});

console.log(`Found ${Object.keys(enemyDB).length} enemies, ${allSpellIds.size} unique spells.`);

// 2. 爬取/缓存 Wowhead 技能信息
const cacheFile = path.join(__dirname, 'wowhead_spells_cache.json');
let spellCache = {};
if (fs.existsSync(cacheFile)) {
  try {
    spellCache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    console.log(`Loaded ${Object.keys(spellCache).length} cached spells.`);
  } catch (e) {}
}

const spellList = [...allSpellIds].filter(id => !spellCache[id]);
console.log(`Spells to fetch: ${spellList.length}`);

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function fetchSpell(id) {
  return new Promise(resolve => {
    const url = `https://nether.wowhead.com/tooltip/spell/${id}?dataEnv=1&locale=zhcn`;
    const req = https.get(url, { timeout: 6000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          let castTime = '';
          let range = '';
          let desc = '';
          
          if (json.tooltip) {
            const castM = json.tooltip.match(/([\d.]+\s*秒\s*施法时间|瞬发|被动)/);
            if (castM) castTime = castM[1].replace(/\s+/g, '');
            const rangeM = json.tooltip.match(/(\d+\s*码范围|近战范围|自身|无限范围)/);
            if (rangeM) range = rangeM[1].replace(/\s+/g, '');
            
            const descM = json.tooltip.match(/<div class="q">([\s\S]*?)<\/div>/);
            if (descM) {
              desc = cleanHtml(descM[1]);
            } else {
              desc = cleanHtml(json.tooltip);
            }
          }
          
          // 智能分析技能标签
          const tags = [];
          const textToAnalyze = (json.name || '') + ' ' + desc;
          if (castTime && castTime !== '瞬发' && castTime !== '被动') {
            tags.push('读条');
          }
          if (/打断|沉默/.test(textToAnalyze) || (castTime && castTime.includes('秒') && !/首领|大招/.test(textToAnalyze))) {
            tags.push('可打断');
          }
          if (/秒杀|致命|巨额|灭团|毁灭/.test(textToAnalyze)) {
            tags.push('高危');
          }
          if (/全队|所有盟友|所有敌人|全体|AOE|区域/.test(textToAnalyze)) {
            tags.push('全队AOE');
          }
          if (/当前目标|主目标|坦克/.test(textToAnalyze)) {
            tags.push('坦克死刑');
          }
          if (/诅咒/.test(textToAnalyze)) tags.push('诅咒');
          if (/中毒|毒素/.test(textToAnalyze)) tags.push('中毒');
          if (/疾病/.test(textToAnalyze)) tags.push('疾病');
          if (/魔法/.test(textToAnalyze)) tags.push('魔法');
          if (/流血/.test(textToAnalyze)) tags.push('流血');
          if (/激怒/.test(textToAnalyze)) tags.push('激怒');

          resolve({
            id,
            name: json.name || `技能 #${id}`,
            icon: json.icon || 'inv_misc_questionmark',
            castTime: castTime || '瞬发',
            range: range || '',
            desc: desc || '对敌方目标施放战术技能。',
            tags: tags.slice(0, 3)
          });
        } catch (e) {
          resolve({
            id,
            name: `未知技能 #${id}`,
            icon: 'inv_misc_questionmark',
            castTime: '瞬发',
            range: '',
            desc: '对敌方目标施放技能。',
            tags: ['战斗技能']
          });
        }
      });
    });
    req.on('error', () => {
      resolve({
        id,
        name: `技能 #${id}`,
        icon: 'inv_misc_questionmark',
        castTime: '瞬发',
        range: '',
        desc: '对敌方目标施放技能。',
        tags: []
      });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
  });
}

async function run() {
  const CONCURRENCY = 12;
  let cursor = 0;
  let completed = 0;
  let saveCounter = 0;

  async function worker() {
    while (cursor < spellList.length) {
      const id = spellList[cursor++];
      const res = await fetchSpell(id);
      if (res) {
        spellCache[id] = res;
      }
      completed++;
      if (++saveCounter % 50 === 0) {
        fs.writeFileSync(cacheFile, JSON.stringify(spellCache, null, 2), 'utf8');
        console.log(`Progress: ${completed}/${spellList.length} spells cached.`);
      }
    }
  }

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  fs.writeFileSync(cacheFile, JSON.stringify(spellCache, null, 2), 'utf8');
  console.log('Spell fetch completed! Saved to wowhead_spells_cache.json.');

  // 生成小程序端可直接使用的 mdt_enemies_db.js
  const outputData = {};
  for (const [npcId, enemy] of Object.entries(enemyDB)) {
    const enemySpells = (enemy.spells || [])
      .map(sid => spellCache[sid])
      .filter(Boolean)
      // 过滤掉没有有效名字的冗余项
      .filter(s => s.name && !s.name.startsWith('未知技能'));
    
    // 如果没有技能，保留默认普攻
    if (enemySpells.length === 0) {
      enemySpells.push({
        id: 0,
        name: '近战近身攻击',
        icon: 'ability_steelpath',
        castTime: '瞬发',
        range: '近战范围',
        desc: '对主要仇恨目标造成物理近战普通攻击伤害。',
        tags: ['物理伤害']
      });
    }

    // 默认代表头像
    const primaryIcon = (enemySpells[0] && enemySpells[0].icon) ? enemySpells[0].icon : 'inv_misc_head_dragon_01';

    outputData[npcId] = {
      ...enemy,
      primaryIcon,
      spells: enemySpells
    };
  }

  const outFilePath = path.join(__dirname, '../pages/mdt/mdt_enemies_db.js');
  const code = `// 魔兽大秘境 8 大地下城怪物全图鉴与技能数据库 (自动生成)\nmodule.exports = ${JSON.stringify(outputData, null, 2)};\n`;
  fs.writeFileSync(outFilePath, code, 'utf8');
  console.log(`Generated mini-program database at ${outFilePath} (${(code.length / 1024).toFixed(1)} KB)`);
}

run();
