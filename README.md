# 《魔兽世界》小程序开发仓库

* **Git 仓库地址**：`https://github.com/louiszwk/wow-wxxcx.git`
* **默认分支**：`master`

本项目为微信小程序，包含两大业务模块：
1. **正式服模块（12.0 地下城 / 团本 / BIS 装备库 / 职业宏）**：该模块已稳定上线，**严禁修改任何代码与数据**。
2. **无限服模块（经典旧世 / WoW: Forever 特色服专区）**：包含 60 级全职业天赋系统、地下城与怪物速览、术语字典、心愿单等。

---

## 📌 当前进行中的任务需求

👉 **最新需求文档**：请直接阅读根目录下的 [**`REQUIREMENTS_TALENT_SYSTEM.md`**](REQUIREMENTS_TALENT_SYSTEM.md)
* **需求核心**：《系统里无限服的天赋树改为和游戏最新的天赋一模一样》
* **修改范围**：仅限 `data/infinite_talents_data.js`、`scripts/build_infinite_latest_talents.js`、`pages/infinite-talents/`、`scripts/audit_talent_data.js`
* **校验命令**：`node scripts/audit_talent_data.js`
