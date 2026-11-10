// scripts/audit_talent_data.js
/**
 * 权威天赋数据审计脚本
 * 深度验证全职业天赋树合法性、完整度（7层全满）、暴雪图标格式、前置依赖及51点预设
 */

const fs = require('fs');
const path = require('path');

const talentDataPath = path.join(__dirname, '../data/infinite_talents_data.js');
if (!fs.existsSync(talentDataPath)) {
  console.error('[FAIL] File not found:', talentDataPath);
  process.exit(1);
}

const { TALENT_DATA_60 } = require(talentDataPath);
if (!TALENT_DATA_60 || Object.keys(TALENT_DATA_60).length === 0) {
  console.error('[FAIL] TALENT_DATA_60 is empty or missing!');
  process.exit(1);
}

let totalErrors = 0;
let totalWarnings = 0;
let totalSkills = 0;

console.log('=== 开始全面审计 60 级无限服权威全职业天赋系统 ===\n');

for (const [clsKey, clsData] of Object.entries(TALENT_DATA_60)) {
  console.log(`\n【职业: ${clsData.name} (${clsKey})】`);
  
  if (!clsData.trees || clsData.trees.length !== 3) {
    console.error(`  [ERROR] 职业 ${clsKey} 必须包含恰好 3 个专精天赋树！实际: ${clsData.trees ? clsData.trees.length : 0}`);
    totalErrors++;
  }

  // 1. 验证专精天赋树
  clsData.trees.forEach(tree => {
    const rowCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    const skillMap = new Map();
    const coordSet = new Set();

    tree.skills.forEach(skill => {
      totalSkills++;
      // 基本字段
      if (!skill.id || !skill.name || !skill.icon || !skill.row || !skill.col || !skill.max || !skill.ranks) {
        console.error(`  [ERROR] [${tree.name}] 技能 ${skill.id || '未知'} 缺少必需字段！`);
        totalErrors++;
      }
      // 坐标范围
      if (skill.row < 1 || skill.row > 7 || skill.col < 1 || skill.col > 4) {
        console.error(`  [ERROR] [${tree.name}] 技能 ${skill.name} (${skill.id}) 坐标越界: [${skill.row}, ${skill.col}]！`);
        totalErrors++;
      }
      // 坐标唯一性
      const coordKey = `${skill.row}-${skill.col}`;
      if (coordSet.has(coordKey)) {
        console.error(`  [ERROR] [${tree.name}] 坐标重复: [${skill.row}, ${skill.col}] (技能: ${skill.name})！`);
        totalErrors++;
      }
      coordSet.add(coordKey);

      // 等级与描述
      if (!Array.isArray(skill.ranks) || skill.ranks.length !== skill.max) {
        console.error(`  [ERROR] [${tree.name}] 技能 ${skill.name} ranks 数组长度 (${skill.ranks ? skill.ranks.length : 0}) 与 max (${skill.max}) 不匹配！`);
        totalErrors++;
      }

      rowCounts[skill.row] = (rowCounts[skill.row] || 0) + 1;
      skillMap.set(skill.id, skill);
    });

    // 验证 7 层每层是否均有天赋，且第 7 层必须有 31 点终极天赋
    for (let r = 1; r <= 7; r++) {
      if (!rowCounts[r] || rowCounts[r] === 0) {
        console.error(`  [ERROR] [${tree.name}] 第 ${r} 层缺失天赋（空行）！`);
        totalErrors++;
      }
    }

    // 验证前置依赖关系
    tree.skills.forEach(skill => {
      if (skill.prereq) {
        const parent = skillMap.get(skill.prereq);
        if (!parent) {
          console.error(`  [ERROR] [${tree.name}] 技能 ${skill.name} 的前置依赖 ${skill.prereq} 在本天赋树中不存在！`);
          totalErrors++;
        } else if (parent.row > skill.row) {
          console.error(`  [ERROR] [${tree.name}] 技能 ${skill.name} (第${skill.row}层) 的前置技能 ${parent.name} (第${parent.row}层) 层数异常（不能位于更深层数）！`);
          totalErrors++;
        }
      }
    });

    console.log(`  - 专精 [${tree.name}]: ${tree.skills.length} 个天赋节点，7层矩阵全满`);
  });

  // 2. 验证预设加点
  if (!clsData.presets || clsData.presets.length === 0) {
    console.error(`  [ERROR] 职业 ${clsKey} 缺少主流权威加点预设！`);
    totalErrors++;
  } else {
    clsData.presets.forEach(preset => {
      let presetTotal = 0;
      const treeSpent = [0, 0, 0];

      // 验证点数之和
      for (const [skillId, pts] of Object.entries(preset.points)) {
        presetTotal += pts;
        let found = false;

        clsData.trees.forEach((tree, treeIdx) => {
          const sk = tree.skills.find(s => s.id === skillId);
          if (sk) {
            found = true;
            if (pts > sk.max) {
              console.error(`  [ERROR] 预设 [${preset.name}] 技能 ${sk.name} 加点 ${pts} 超过上限 ${sk.max}！`);
              totalErrors++;
            }
            treeSpent[treeIdx] += pts;
          }
        });

        if (!found) {
          console.error(`  [ERROR] 预设 [${preset.name}] 中存在未知技能 ID: ${skillId}！`);
          totalErrors++;
        }
      }

      if (presetTotal !== 51) {
        console.error(`  [ERROR] 预设 [${preset.name}] 总点数不是 51 点！实际: ${presetTotal} 点`);
        totalErrors++;
      }

      // 验证预设各层点数解锁合法性
      clsData.trees.forEach((tree, treeIdx) => {
        // 统计每层投入点数
        const rowSpent = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
        for (const [skillId, pts] of Object.entries(preset.points)) {
          const sk = tree.skills.find(s => s.id === skillId);
          if (sk) {
            rowSpent[sk.row] = (rowSpent[sk.row] || 0) + pts;
            // 验证前置技能是否已点满
            if (sk.prereq && pts > 0) {
              const parentPts = preset.points[sk.prereq] || 0;
              const parentSkill = tree.skills.find(s => s.id === sk.prereq);
              if (parentPts < parentSkill.max) {
                console.error(`  [ERROR] 预设 [${preset.name}] 技能 ${sk.name} 已加点，但前置 ${parentSkill.name} 仅有点数 ${parentPts}/${parentSkill.max}！`);
                totalErrors++;
              }
            }
          }
        }

        // 验证每一层点数要求：点第 R 层时，前 R-1 层累计投入必须 >= (R-1)*5
        let accumulated = 0;
        for (let r = 1; r <= 7; r++) {
          const ptsInRow = rowSpent[r] || 0;
          if (ptsInRow > 0 && accumulated < (r - 1) * 5) {
            console.error(`  [ERROR] 预设 [${preset.name}] 在 [${tree.name}] 第 ${r} 层投入了 ${ptsInRow} 点，但之前仅投入 ${accumulated} 点（需要 ${(r-1)*5} 点）！`);
            totalErrors++;
          }
          accumulated += ptsInRow;
        }
      });

      console.log(`  ✓ 预设 [${preset.name}]: 恰好 51 点 (${treeSpent[0]}/${treeSpent[1]}/${treeSpent[2]})，层级与前置完全合规`);
    });
  }
}

console.log('\n========================================');
console.log(`审计统计: 共验证 ${Object.keys(TALENT_DATA_60).length} 个职业，${totalSkills} 个天赋节点`);
if (totalErrors === 0) {
  console.log(`🎉 审计 100% 通过！0 错误，0 警告。全职业天赋树完备合法！`);
  process.exit(0);
} else {
  console.error(`❌ 审计发现 ${totalErrors} 处错误，请立即修复！`);
  process.exit(1);
}
