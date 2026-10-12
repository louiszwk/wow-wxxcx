const fs = require('fs');
const path = require('path');

const dungeons = [
  { file: 'MurderRow.lua', mapId: 4402, name: '谋杀街 (Murder Row)' },
  { file: 'DenOfNalorakk.lua', mapId: 4403, name: '纳洛拉克之巢' }, // Example Map IDs, I don't know the real ones for S2 yet
  { file: 'TheBlindingVale.lua', mapId: 4404, name: '致盲谷' },
  { file: 'VoidscarArena.lua', mapId: 4405, name: '虚空之痕竞技场' },
  { file: 'AltarOfFangs.lua', mapId: 4406, name: '尖牙祭坛' },
  { file: 'RubyLifePools.lua', mapId: 4329, name: '红玉新生法地' }, // Real Wowhead map ID for RLP is 4329
  { file: 'TempleOfSethraliss.lua', mapId: 1041, name: '塞塔里斯神庙' },
  { file: 'KingsRest.lua', mapId: 1044, name: '诸王之眠' }
];

const allData = {};

dungeons.forEach(d => {
  const filepath = path.join(__dirname, 'MythicDungeonTools', 'Midnight', d.file);
  if (!fs.existsSync(filepath)) {
    console.log("Not found: " + filepath);
    return;
  }
  const luaCode = fs.readFileSync(filepath, 'utf8');

  const countMatch = luaCode.match(/MDT\.dungeonTotalCount\[dungeonIndex\] = { normal = (\d+) }/);
  const totalForces = countMatch ? parseInt(countMatch[1]) : 300;

  const enemiesCodePart = luaCode.split('MDT.dungeonEnemies[dungeonIndex] = {')[1];
  if (!enemiesCodePart) {
    console.log("No enemies section found in " + d.file);
    return;
  }
  const enemyBlocks = enemiesCodePart.split(/\n  \[\d+\] = {/);

  const enemies = [];

  for (let i = 1; i < enemyBlocks.length; i++) {
    const block = enemyBlocks[i];
    if (!block.includes('["name"]')) continue;

    const nameMatch = block.match(/\["name"\] = "([^"]+)"/);
    const idMatch = block.match(/\["id"\] = (\d+)/);
    const countRegex = block.match(/\["count"\] = (\d+)/);
    const isBossMatch = block.match(/\["isBoss"\] = true/);

    if (nameMatch && idMatch) {
      const enemy = {
        name: nameMatch[1],
        id: parseInt(idMatch[1]),
        forces: countRegex ? parseInt(countRegex[1]) : 0,
        isBoss: !!isBossMatch,
        clones: []
      };

      const clonesSection = block.split(/\["clones"\] = {/)[1];
      if (clonesSection) {
        const clonesEnd = clonesSection.indexOf('},\n  },');
        const clonesStr = clonesSection.substring(0, clonesEnd !== -1 ? clonesEnd : clonesSection.length);
        
        const cloneBlocks = clonesStr.split(/\[\d+\] = {/);
        for (let j = 1; j < cloneBlocks.length; j++) {
          const cBlock = cloneBlocks[j];
          const xMatch = cBlock.match(/\["x"\] = ([-.\d]+)/);
          const yMatch = cBlock.match(/\["y"\] = ([-.\d]+)/);
          const gMatch = cBlock.match(/\["g"\] = (\d+)/);
          if (xMatch && yMatch) {
            enemy.clones.push({
              x: parseFloat(xMatch[1]),
              y: parseFloat(yMatch[1]),
              pack: gMatch ? parseInt(gMatch[1]) : null
            });
          }
        }
      }
      enemies.push(enemy);
    }
  }

  const flatNodes = [];
  let globalId = 1;

  enemies.forEach(e => {
    e.clones.forEach(c => {
      // MDT canvas width is 840, height is 560.
      // Top-left is (0,0). c.x is in [0, 840], c.y is negative in [-560, 0].
      const normX = parseFloat((c.x / 840).toFixed(4));
      const normY = parseFloat(((-c.y) / 560).toFixed(4));
      flatNodes.push({
        id: globalId++,
        npcId: e.id,
        name: e.name,
        forces: e.forces,
        isBoss: e.isBoss,
        pack: c.pack,
        x: normX,
        y: normY,
        selected: false
      });
    });
  });

  allData[d.name] = {
    totalForces: totalForces,
    mapId: d.mapId,
    enemies: flatNodes
  };
  
  console.log('Parsed ' + d.name + ': ' + flatNodes.length + ' enemies.');
});

const output = `module.exports = ${JSON.stringify(allData, null, 2)};`;
const outPath = path.join(__dirname, '..', 'pages', 'mdt', 'all_dungeons_data.js');
fs.writeFileSync(outPath, output);
console.log('Wrote all_dungeons_data.js');
