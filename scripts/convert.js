const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelFilePath = path.join(__dirname, '12.1 DropSheet(by Ango).xlsx');
const outputFilePath = path.join(__dirname, '../data/loot.js');

if (!fs.existsSync(excelFilePath)) {
  console.error('❌ 找不到 12.1 DropSheet(by Ango).xlsx 文件！');
  process.exit(1);
}

console.log('读取 Excel 文件中...');
const workbook = xlsx.readFile(excelFilePath);
const sheetName = workbook.SheetNames[0]; // 读取第一个标签页
const sheet = workbook.Sheets[sheetName];

// 将表格转换为 JSON，首行为键名
const data = xlsx.utils.sheet_to_json(sheet);

console.log(`成功读取 ${data.length} 行掉落数据。`);

const dungeonsMap = new Map();
let currentItemId = 100000;

data.forEach((row) => {
  const itemName = row['名称'];
  const slot = row['部位'] || '未知部位';
  const type = row['分类'] || '护甲';
  const rawDungeonName = row['掉落途径'] || '未知掉落途径';
  const dungeonName = rawDungeonName;
  
  // 提取装备属性
  const statCombo = row['属性组合'] || '';
  const mainStat = row['主属性'] || '';
  const crit = row['暴击'];
  const mastery = row['精通'];
  const haste = row['急速'];
  const versa = row['全能'];
  
  // 处理 Boss 名称，提取 (#1) 这种后缀作为排序号，然后直接转换为中文
  let rawBossName = row['掉落来源'] || '未知来源';
  let orderIndex = 999; // 默认排序靠后
  const match = rawBossName.match(/\(#(\d+)\)/);
  if (match) {
    orderIndex = parseInt(match[1], 10);
  }
  rawBossName = rawBossName.replace(/\(#\d+\)/g, '').trim();
  let bossName = rawBossName;

  // 如果是狩猎或地下堡，不再分子类，全部放在一个叫做 'NONE' 的隐藏节点下
  if (dungeonName === '狩猎' || dungeonName === '地下堡') {
    bossName = 'NONE';
  }

  // 如果没有物品名称，跳过
  if (!itemName) return;

  // 根据掉落途径分类（地下城/团本）
  if (!dungeonsMap.has(dungeonName)) {
    dungeonsMap.set(dungeonName, {
      id: dungeonsMap.size + 1,
      name: dungeonName,
      expanded: false,
      encountersMap: new Map()
    });
  }

  const dungeon = dungeonsMap.get(dungeonName);
  
  if (!dungeon.encountersMap.has(bossName)) {
    dungeon.encountersMap.set(bossName, {
      id: parseInt(`${dungeon.id}0${dungeon.encountersMap.size + 1}`),
      name: bossName,
      order: orderIndex,
      items: []
    });
  }

  const encounter = dungeon.encountersMap.get(bossName);
  encounter.items.push({
    id: currentItemId++,
    name: itemName.trim(),
    quality: { type: 'EPIC' }, // 默认紫装
    item_class: { name: type },
    inventory_type: { name: slot },
    stats: {
      combo: statCombo,
      main: mainStat,
      crit: crit,
      mastery: mastery,
      haste: haste,
      versa: versa
    }
  });
});

// 转换 Map 为最终的 JSON 数组
const result = Array.from(dungeonsMap.values()).map(d => {
  const encountersArr = Array.from(d.encountersMap.values());
  // 按照从 Excel 中提取的 (#X) 序号进行升序排序
  encountersArr.sort((a, b) => a.order - b.order);

  return {
    id: d.id,
    name: d.name,
    expanded: d.expanded,
    encounters: encountersArr
  };
});

// 生成模块文件
const fileContent = `// 由 Excel 自动生成的真实 12.1 掉落数据
module.exports = ${JSON.stringify(result, null, 2)};
`;

fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
console.log(`✅ 成功将数据按照【掉落途径（副本/团本） -> 掉落来源（Boss）】分类！`);
console.log(`✅ 共有 ${result.length} 个掉落途径（副本/团本），已保存至: ${outputFilePath}`);
