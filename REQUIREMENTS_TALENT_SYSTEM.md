# 需求文档：系统里无限服的天赋树改为和游戏最新的天赋一模一样

* **Git 仓库地址**：`https://github.com/louiszwk/wow-wxxcx.git`
* **默认分支**：`master`
* **文档目的**：供协同 AI 在线读取 Git 仓库并执行修改，将小程序中【无限服】的天赋树系统完整修正为与游戏内最新真实天赋 100% 一致。

---

## 一、 任务核心目标与严格隔离红线

### 1. 核心目标
将小程序【无限服专区】的天赋树（9大职业、27棵专精天赋树）全部修正为与《魔兽世界：无限》（WoW: Forever）游戏客户端内的最新真实天赋**100% 一模一样**。
包含：天赋名称、官方图标、行列坐标、点数上限、前置依赖、技能效果描述及主流 51 点加点预设。

### 2. 【严禁触碰】正式服隔离红线
本项目包含正式服（12.0 地下城/团本/BIS装备库/宏）与无限服两大独立板块：
* **严禁修改任何正式服代码与数据**（受保护目录：`pages/mdt/`, `pages/loot/`, `pages/bis/`, `pages/build/`, `pages/meta/`, `pages/topmeta/`, `pages/token/`, `pages/macros/`；数据文件：`data/loot.js`, `data/wow_equipment_db.js`, `data/wow_guides_data.js`）。
* 正式服必须保持与 `origin/master` **0 diff**。

### 3. 本次需求修改范围（In-Scope）
所有改动严格限制在无限服天赋模块：
* **天赋核心数据**：`data/infinite_talents_data.js`
* **天赋构建脚本**：`scripts/build_infinite_latest_talents.js`
* **前端展示页面**：`pages/infinite-talents/infinite-talents.wxml`, `infinite-talents.js`, `infinite-talents.wxss`
* **数据校验脚本**：`scripts/audit_talent_data.js`

---

## 二、 现状问题与修改要点

### 1. 潜行者（盗贼）等职业的天赋核对与纠正
* **天赋名称与图标匹配**：例如潜行者刺杀第一行【强化剔骨】与战斗第一行【强化凿击】，必须严格核对图标与技能是否匹配，严禁图标反串或技能放错。
* **技能矩阵位置**：刺杀、战斗、敏锐三系的技能名称、图标、所在行（Row 1~7）、所在列（Col 1~4）必须与游戏内天赋界面的网格位置一模一样。

### 2. 全职业 9 大职业、27 棵天赋树全面对齐游戏
涉及 9 大职业：
1. **潜行者 (rogue)**：刺杀、战斗、敏锐
2. **战士 (warrior)**：武器、狂怒、防护
3. **圣骑士 (paladin)**：神圣、防护、惩戒
4. **猎人 (hunter)**：野兽控制、射击、生存
5. **萨满祭司 (shaman)**：元素、增强、恢复
6. **德鲁伊 (druid)**：平衡、野性战斗、恢复
7. **法师 (mage)**：奥术、火焰、冰霜
8. **术士 (warlock)**：痛苦、恶魔学识、毁灭
9. **牧师 (priest)**：戒律、神圣、暗影

**每个天赋节点必须严格满足以下规则**：
* **`name`**：与游戏内名称完全一致，严禁错别字或自造词。
* **`icon`**：使用暴雪官方 Zamimg CDN 图标标识（小写英文，如 `ability_rogue_eviscerate`），确保图标真实存在且与游戏图标一致（不可 404）。
* **`row` / `col`**：行号 1~7，列号 1~4，与游戏内客户端的矩阵格子一模一样。
* **`max`**：满级点数（1~5点），与游戏内上限一致。
* **`ranks`**：各等级技能描述文本，数组长度必须等于 `max`。
* **`prereq`**：前置技能 ID。若某天赋需要前置天赋点满才能激活（如游戏内的箭头指向），必须正确指向该前置技能；无前置则为 `null`。

### 3. 主流 51 点加点预设（Presets）
每个职业需配置 2~3 套热门主流 51 点加点预设：
* 每套预设总点数恰好等于 **51** 点。
* 必须满足**层级解锁规则**：第 R 层投入点数前，该天赋树的前 R-1 层累计投入点数必须达到 `(R - 1) * 5` 点。
* 必须满足**前置依赖规则**：点有前置依赖的技能时，其前置技能必须已点满。

---

## 三、 数据结构规范（Data Schema）

`data/infinite_talents_data.js` 导出的 `TALENT_DATA_60` 格式规范如下：

```javascript
module.exports = {
  TALENT_DATA_60: {
    rogue: {
      name: "潜行者",
      icon: "🗡️",
      classIcon: "class_rogue",
      presets: [
        {
          name: "战斗剑贼 (19/32/0)",
          desc: "主流PVE团本配装，高攻速与剑刃乱舞爆发",
          points: {
            r_imp_ss: 2,
            r_lightning_ref: 3,
            // ...各技能加点数，总和必须恰好为 51 点
          }
        }
      ],
      trees: [
        {
          id: "assassination",
          name: "刺杀",
          skills: [
            {
              id: "r_imp_evisc",
              name: "强化剔骨",
              icon: "ability_rogue_eviscerate",
              row: 1,
              col: 1,
              max: 3,
              prereq: null,
              ranks: [
                "使你的剔骨技能造成的伤害提高 5%",
                "使你的剔骨技能造成的伤害提高 10%",
                "使你的剔骨技能造成的伤害提高 15%"
              ]
            }
            // ...其余技能节点
          ]
        }
        // ...其余 2 棵天赋树
      ]
    }
    // ...其余 8 个职业
  }
};
```

---

## 四、 验收标准与自测命令

修改完成后，必须通过以下全部检验方可提交：

1. **天赋数据合规性校验**：
   ```bash
   node scripts/audit_talent_data.js
   ```
   **验收标准**：必须输出 `🎉 审计 100% 通过！0 错误，0 警告。全职业天赋树完备合法！`，退出码为 0。

2. **系统整体自动化体检**：
   ```bash
   node scripts/audit_system.js
   ```
   **验收标准**：全页面依赖、数据字段、语法校验无报错。

3. **正式服 0 改动验证**：
   ```bash
   git diff origin/master -- pages/mdt pages/loot pages/bis pages/build pages/meta pages/topmeta pages/token pages/macros data/loot.js data/wow_equipment_db.js data/wow_guides_data.js
   ```
   **验收标准**：输出必须为空，确保正式服 100% 保持原样。
