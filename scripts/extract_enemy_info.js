const fs = require('fs');
const path = require('path');

// 1. 读取 zhCN.lua
const zhCNPath = path.join(__dirname, '../data/MythicDungeonTools/Locales/zhCN.lua');
const zhCNContent = fs.readFileSync(zhCNPath, 'utf8');

const localeMap = {};
const lines = zhCNContent.split('\n');
lines.forEach(line => {
  const m = line.match(/L\["([^"]+)"\]\s*=\s*"([^"]+)"/);
  if (m) {
    localeMap[m[1]] = m[2];
  }
});

console.log('Total localized strings in zhCN.lua:', Object.keys(localeMap).length);

// 2. 读取 8 个副本的 lua 文件
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

let allEnemiesCount = 0;
let spellsFound = 0;
const enemyDB = {};

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

    // 提取 spells
    const spells = [];
    const sIdx = block.indexOf('["spells"]');
    const cIdx = block.indexOf('["clones"]');
    if (sIdx !== -1 && cIdx !== -1 && cIdx > sIdx) {
      const spellsStr = block.substring(sIdx, cIdx);
      const spellMatches = [...spellsStr.matchAll(/\[(\d+)\]\s*=/g)];
      for (const sm of spellMatches) {
        spells.push(parseInt(sm[1]));
        spellsFound++;
      }
    }

    // 提取 characteristics (控制受控情况)
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
      creatureType: creatureTypeM ? creatureTypeM[1] : 'Unknown',
      displayId: displayIdM ? parseInt(displayIdM[1]) : 0,
      isBoss: !!isBossM,
      spells,
      characteristics
    };
    allEnemiesCount++;
  }
});

const allSpells = new Set();
Object.values(enemyDB).forEach(e => {
  e.spells.forEach(s => allSpells.add(s));
});
console.log('Total unique spells count across all 8 dungeons:', allSpells.size);
console.log('Sample 30 spells:', [...allSpells].slice(0, 30));
