// data/wow_guides_data.js
// 自动汇聚的真实全职业 BiS 装备与攻略数据
module.exports = [
  {
    "classSlug": "warrior",
    "className": "战士",
    "specId": "arms",
    "specName": "武器",
    "statPriority": "暴击 > 急速 > 精通 > 全能",
    "statDesc": "暴击联动重伤与致死打击的激怒触发，急速缩短巨人打击与压制循环。",
    "talents": {
      "mythicPlus": "CcEAAAAAAAAAAAAAAAAAAAAAAwYYGAAAAAAAMbzMmZmhxMmxMzMmZmxM2AAAAAzMz2MbMzsZMMzMGA",
      "mythicPlusName": "屠戮者 · 顺劈致死流",
      "raid": "CcEAAAAAAAAAAAAAAAAAAAAAAwYYGAAAAAAAMbzMmZmhxMmxMzMmZmxM2AAAAAzMz2MbMzsZMMzMGA",
      "raidName": "纯单体破阵者流",
      "desc": "破阵者撕碎群体护甲，横扫攻击保持持续双目标压制。"
    },
    "consumables": {
      "flask": "淬火暴击合剂",
      "potion": "淬火强能药水",
      "food": "炙烤海鲜",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂暴击",
      "gems": "力量暴击复合石"
    },
    "rotation": [
      {
        "name": "巨人易伤",
        "desc": "灭战者/巨人打击打入易伤窗口"
      },
      {
        "name": "致死循环",
        "desc": "压制叠压制层数 -> 打高伤致死打击 -> 斩杀期斩杀"
      },
      {
        "name": "AOE 爆发",
        "desc": "横扫攻击 -> 剑刃风暴 (大风车) -> 顺劈斩"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "复活牺牲者颅骨卫士",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "被遗忘的牺牲肩甲",
          "desc": "烈毒之渊 · 小怪掉落 · 力量/智力",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "鲁莽精神胸甲",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "贝壳护腕",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "鳞板绞杀者",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "悔毒束带",
          "desc": "烈毒之渊 · 盘卷祭坛 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "毒液守望者护腿",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "埋葬邪教徒马靴",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "warrior",
    "className": "战士",
    "specId": "fury",
    "specName": "狂怒",
    "statPriority": "急速 (达到 32%) > 精通 > 暴击 > 全能",
    "statDesc": "急速是狂怒战的灵魂，降低公 CD 与嗜血/怒击冷却，激怒覆盖率必须保持在 95% 以上。",
    "talents": {
      "mythicPlus": "CpEAAAAAAAAAAAAAAAAAAAAAAQkGAAAAAAAIDbziZGzMjZGzMmxMzMmZW2AAAAAzMz2MbMzsZMMzMGA",
      "mythicPlusName": "屠戮者 · 顺劈奥丁怒火流",
      "raid": "CpEAAAAAAAAAAAAAAAAAAAAAAQkGAAAAAAAIDbzixMjZGzMmZMzMmZW2AAAAAzMz2MbMzsZMMzMGA",
      "raidName": "山丘领主 · 单体雷霆暴怒流",
      "desc": "大秘境顺劈暴怒配合奥丁之怒，制造毁灭性的开怪大爆发。"
    },
    "consumables": {
      "flask": "淬火狂暴合剂",
      "potion": "淬火强能药水",
      "food": "香辣急速杂烩",
      "weapon": "主手/副手双附魔：议会之威 + 灿烂急速",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "力量急速双色石"
    },
    "rotation": [
      {
        "name": "维持激怒",
        "desc": "嗜血/暴怒触发激怒，无激怒严禁打其他技能"
      },
      {
        "name": "AOE 顺劈",
        "desc": "旋风斩获得顺劈 Buff -> 暴怒 -> 怒击（传导到周围4目标）"
      },
      {
        "name": "爆发全开",
        "desc": "鲁莽 + 天神下凡 + 饰品 -> 奥丁之怒 -> 碎甲猛击"
      },
      {
        "name": "保命自愈",
        "desc": "狂怒回复 + 胜利在望卡 CD 吃"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "复活牺牲者颅骨卫士",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "被遗忘的牺牲肩甲",
          "desc": "烈毒之渊 · 小怪掉落 · 力量/智力",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "鲁莽精神胸甲",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "贝壳护腕",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "鳞板绞杀者",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "悔毒束带",
          "desc": "烈毒之渊 · 盘卷祭坛 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "毒液守望者护腿",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "埋葬邪教徒马靴",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "warrior",
    "className": "战士",
    "specId": "protection",
    "specName": "防护",
    "statPriority": "急速 > 精通 > 全能 > 暴击",
    "statDesc": "急速直接降低盾牌猛击与雷霆一击的 CD，并显著缩短盾牌格挡充能时间。",
    "talents": {
      "mythicPlus": "CkEAAAAAAAAAAAAAAAAAAAAAAwYYGAAAAAAAMbzMmZmhxMmxMzMmZmxM2AAAAAzMz2MbMzsZMMzMGA",
      "mythicPlusName": "山丘领主 · 雷霆天神流",
      "raid": "CkEAAAAAAAAAAAAAAAAAAAAAAwYYGAAAAAAAMbzMmZmhxMmxMzMmZmxM2AAAAAzMz2MbMzsZMMzMGA",
      "raidName": "纯物理格挡硬化流",
      "desc": "山丘领主赋予雷霆一击闪电风暴，大秘境物理减伤天花板。"
    },
    "consumables": {
      "flask": "淬火韧性合剂",
      "potion": "坚韧防御药水",
      "food": "香辣急速杂烩",
      "weapon": "附魔武器 - 灿烂急速",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "耐力急速石"
    },
    "rotation": [
      {
        "name": "减伤铁律",
        "desc": "盾牌格挡保持100%覆盖，多余怒气打无视痛苦"
      },
      {
        "name": "雷霆仇恨",
        "desc": "雷霆一击卡 CD 踩，配合挫志怒吼回怒并增伤"
      },
      {
        "name": "手牌交接",
        "desc": "盾墙应对巨额穿刺；破釜沉舟配合强力回血"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "复活牺牲者颅骨卫士",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "被遗忘的牺牲肩甲",
          "desc": "烈毒之渊 · 小怪掉落 · 力量/智力",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "鲁莽精神胸甲",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "贝壳护腕",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "鳞板绞杀者",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "悔毒束带",
          "desc": "烈毒之渊 · 盘卷祭坛 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "毒液守望者护腿",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "埋葬邪教徒马靴",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "paladin",
    "className": "圣骑士",
    "specId": "holy",
    "specName": "神圣",
    "statPriority": "暴击 > 急速 > 精通 > 全能",
    "statDesc": "暴击提升圣震与荣耀圣令的治疗期望，急速加速读条与十字军打击回能。",
    "talents": {
      "mythicPlus": "CEEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "太阳先驱 · 美德信标瞬抬流",
      "raid": "CEEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "信仰信标团刷流",
      "desc": "美德道标应对全队 AOE 尖刺伤害，神圣震击卡 CD 释放打出日出效果。"
    },
    "consumables": {
      "flask": "淬火无面合剂 (智力/暴击)",
      "potion": "心能爆发药水",
      "food": "暴击盛宴",
      "weapon": "附魔武器 - 绚丽暴击",
      "rings": "附魔戒指 - 绚丽暴击",
      "gems": "智力暴击复合石"
    },
    "rotation": [
      {
        "name": "尖刺群抬",
        "desc": "全队大掉血前挂【美德道标】-> 敲钟 -> 圣震 -> 黎明之光"
      },
      {
        "name": "单体抢救",
        "desc": "神圣震击 -> 圣疗术 / 灌注圣光闪烁"
      },
      {
        "name": "输出补伤害",
        "desc": "近战位奉献 + 十字军打击攒圣能打盾击"
      },
      {
        "name": "手牌规划",
        "desc": "光环掌握（虔诚光环大减伤）交在 Boss 读大招时"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "复活牺牲者颅骨卫士",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "被遗忘的牺牲肩甲",
          "desc": "烈毒之渊 · 小怪掉落 · 力量/智力",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "鲁莽精神胸甲",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "贝壳护腕",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "鳞板绞杀者",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "悔毒束带",
          "desc": "烈毒之渊 · 盘卷祭坛 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "毒液守望者护腿",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "埋葬邪教徒马靴",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "paladin",
    "className": "圣骑士",
    "specId": "protection",
    "specName": "防护",
    "statPriority": "急速 (达到30%) > 精通 > 全能 > 暴击",
    "statDesc": "急速直接降低正义之盾与审判的冷却时间，维持100%盾击减伤覆盖是生存在大米的根基。",
    "talents": {
      "mythicPlus": "CIEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxsMAAAAAAAMbAAAAYMzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "圣殿骑士 · 减伤与圣能永动流",
      "raid": "CIEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxsMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "纯减伤坦度流",
      "desc": "强化炽热防御者与提尔之眼覆盖率，配合神圣鸣钟瞬间拉稳群仇恨。"
    },
    "consumables": {
      "flask": "淬火淬硬合剂 (耐力与全能)",
      "potion": "无羁韧性药水",
      "food": "香辣炖肉 (急速)",
      "weapon": "附魔武器 - 灿烂全能",
      "rings": "附魔戒指 - 灿烂急速",
      "gems": "主属性急速宝石"
    },
    "rotation": [
      {
        "name": "生存基础",
        "desc": "奉献绝不断档（提供高额减伤与格挡率）"
      },
      {
        "name": "盾击覆盖",
        "desc": "有3圣能立即打正义之盾，严禁断盾击裸吃普攻"
      },
      {
        "name": "打断断条",
        "desc": "复仇者之盾与责难双打断，神圣鸣钟全场沉默"
      },
      {
        "name": "救急手段",
        "desc": "提尔之眼预铺大波怪；远古列王守卫留给高压穿刺"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "复活牺牲者颅骨卫士",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "被遗忘的牺牲肩甲",
          "desc": "烈毒之渊 · 小怪掉落 · 力量/智力",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "鲁莽精神胸甲",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "贝壳护腕",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "鳞板绞杀者",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "悔毒束带",
          "desc": "烈毒之渊 · 盘卷祭坛 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "毒液守望者护腿",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "埋葬邪教徒马靴",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "paladin",
    "className": "圣骑士",
    "specId": "retribution",
    "specName": "惩戒",
    "statPriority": "精通 > 急速 (25%软上限) > 暴击 > 全能",
    "statDesc": "精通直接大幅放大神圣风暴与裁决的神圣伤害；急速保持 20%~25% 让圣能获取极其丝滑。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "太阳先驱 · 圣能风暴 AOE 流",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "圣殿骑士 · 纯单体裁决爆发流",
      "desc": "大秘境点出日出之辉与晨光迸发，配合终结技触发太阳裂片，融化大波怪。"
    },
    "consumables": {
      "flask": "淬火混沌合剂 (提升暴击/精通)",
      "potion": "淬火淬毒药水 (爆发主属性)",
      "food": "香辣油炸蛛丝面 (提供精通)",
      "weapon": "附魔武器 - 议会之威 (触发巨额力量)",
      "rings": "附魔戒指 - 光耀精通 (+315 精通)",
      "gems": "璀璨紫黄晶 (+主属性 & 精通)"
    },
    "rotation": [
      {
        "name": "起手爆发",
        "desc": "灰烬觉醒 -> 征伐/复仇之怒 -> 敲钟 (神圣鸣钟) -> 裁决/风暴"
      },
      {
        "name": "AOE 循环",
        "desc": "满圣能必打神圣风暴 -> 触发光明使者免费风暴 -> 刀阵充能不溢出"
      },
      {
        "name": "单体循环",
        "desc": "审判保持增伤 -> 最终审判消耗圣能 -> 愤怒之锤卡CD斩杀"
      },
      {
        "name": "团队辅助",
        "desc": "圣疗留给濒死坦克/治疗；自由之祝福解全队减速；牺牲之祝福分担尖刺"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "复活牺牲者颅骨卫士",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "被遗忘的牺牲肩甲",
          "desc": "烈毒之渊 · 小怪掉落 · 力量/智力",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "鲁莽精神胸甲",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "贝壳护腕",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "鳞板绞杀者",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "悔毒束带",
          "desc": "烈毒之渊 · 盘卷祭坛 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "毒液守望者护腿",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "埋葬邪教徒马靴",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "hunter",
    "className": "猎人",
    "specId": "beast-mastery",
    "specName": "野兽控制",
    "statPriority": "暴击 > 急速 (25%+) > 精通 > 全能",
    "statDesc": "暴击触发荒野呼唤重置倒刺射击，急速保证顺劈斩与狂乱 Buff 永久覆盖。",
    "talents": {
      "mythicPlus": "C0PAAAAAAAAAAAAAAAAAAAAAAAMmxMDMmxMMzMzsMmZGYmxMAAAAAgZGzMjxMzsMmZmZmxMAAAA",
      "mythicPlusName": "兽群领袖 · 多重射击顺劈流",
      "raid": "C0PAAAAAAAAAAAAAAAAAAAAAAAMmxMDMmxMMzMzsMmZGYmxMAAAAAgZGzMjxMzsMmZmZmxMAAAA",
      "raidName": "黑暗游侠 · 纯单体黑蚀箭流",
      "desc": "无读条全移动输出，多重射击保持宠物顺劈斩。"
    },
    "consumables": {
      "flask": "淬火暴击合剂",
      "potion": "淬火敏捷药水",
      "food": "香辣暴击肉排",
      "weapon": "高品质瞄准镜/附魔",
      "rings": "附魔戒指 - 绚烂暴击",
      "gems": "敏捷暴击双色宝石"
    },
    "rotation": [
      {
        "name": "狂乱保持",
        "desc": "倒刺射击卡在倒计时最后 1 秒补，叠满 3 层宠物狂乱"
      },
      {
        "name": "AOE 核心",
        "desc": "每隔 4 秒打一次多重射击，维持宠物野兽顺劈斩"
      },
      {
        "name": "爆发",
        "desc": "红人 (狂野怒火) + 杀戮命令 + 绿叶荒野呼唤"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "永恒之牙之冠",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "噬魂者肩甲",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "蛇尾方邮件",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "闪闪发光的霜鳞包裹",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "冰川盆地护手",
          "desc": "地下堡 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "被诅咒的圣物束带",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "展开联盟的Cuisses",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "鲁莽旅人之靴",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "hunter",
    "className": "猎人",
    "specId": "marksmanship",
    "specName": "射击",
    "statPriority": "暴击 > 精通 > 急速 > 全能",
    "statDesc": "精通提升射程与所有技能伤害，高暴击让瞄准射击伤害成倍增加。",
    "talents": {
      "mythicPlus": "C4PAAAAAAAAAAAAAAAAAAAAAAAMmxMDMmxMMzMzsMmZGYmxMAAAAAgZGzMjxMzsMmZmZmxMAAAA",
      "mythicPlusName": "黑暗游侠 · 技巧射击急射流",
      "raid": "C4PAAAAAAAAAAAAAAAAAAAAAAAMmxMDMmxMMzMzsMmZGYmxMAAAAAgZGzMjxMzsMmZmZmxMAAAA",
      "raidName": "哨兵 · 纯单体百发百中流",
      "desc": "多重射击触发技巧射击，瞄准与急射在怪堆中疯狂弹跳。"
    },
    "consumables": {
      "flask": "淬火精通合剂",
      "potion": "淬火敏捷药水",
      "food": "精通盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂精通",
      "gems": "敏捷精通石"
    },
    "rotation": [
      {
        "name": "技巧 AOE",
        "desc": "多重射击命中3+目标获得技巧射击 -> 急速射击 -> 瞄准射击"
      },
      {
        "name": "百发爆发",
        "desc": "开启百发百中，瞄准与急射循环泄能"
      },
      {
        "name": "斩杀",
        "desc": "目标血量 20% 以下夺命射击亮起必打"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "永恒之牙之冠",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "噬魂者肩甲",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "蛇尾方邮件",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "闪闪发光的霜鳞包裹",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "冰川盆地护手",
          "desc": "地下堡 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "被诅咒的圣物束带",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "展开联盟的Cuisses",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "鲁莽旅人之靴",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "hunter",
    "className": "猎人",
    "specId": "survival",
    "specName": "survival",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "永恒之牙之冠",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "噬魂者肩甲",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "蛇尾方邮件",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "闪闪发光的霜鳞包裹",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "冰川盆地护手",
          "desc": "地下堡 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "被诅咒的圣物束带",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "展开联盟的Cuisses",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "鲁莽旅人之靴",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "rogue",
    "className": "潜行者",
    "specId": "assassination",
    "specName": "assassination",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "rogue",
    "className": "潜行者",
    "specId": "outlaw",
    "specName": "狂徒",
    "statPriority": "全能 > 急速 > 暴击 > 精通",
    "statDesc": "全能提供稳定物理增伤与硬减伤，急速加快能量恢复与冲动周转。",
    "talents": {
      "mythicPlus": "CUQAAAAAAAAAAAAAAAAAAAAAAAAAAAMzMmZMzMzMzwwMzgxMzsAAAAAAAmxMzMzsMmxMmZmxMAAAA",
      "mythicPlusName": "欺诈者 · 剑刃乱舞无休锋刃流",
      "raid": "CUQAAAAAAAAAAAAAAAAAAAAAAAAAAAMzMmZMzMzMzwwMzgxMzsAAAAAAAmxMzMzsMmxMmZmxMAAAA",
      "raidName": "命缚者 · 单体命运硬币流",
      "desc": "剑刃乱舞无限顺劈，命运骨骰提供强力战斗增益。"
    },
    "consumables": {
      "flask": "淬火全能合剂",
      "potion": "淬火敏捷药水",
      "food": "全能肉排",
      "weapon": "双附魔：灿烂全能 + 议会之威",
      "rings": "附魔戒指 - 绚烂全能",
      "gems": "敏捷全能复合石"
    },
    "rotation": [
      {
        "name": "常驻 Buff",
        "desc": "战斗常驻【剑刃乱舞】，命运骨骰roll出好骰子"
      },
      {
        "name": "爆发冲动",
        "desc": "冲动卡 CD 开，影袭攒星，满星打斩击刷技能 CD"
      },
      {
        "name": "功能性",
        "desc": "致盲、脚踢、偷袭、暗影斗篷解魔法，消失重置伏击"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "rogue",
    "className": "潜行者",
    "specId": "subtlety",
    "specName": "subtlety",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "priest",
    "className": "牧师",
    "specId": "discipline",
    "specName": "discipline",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "错误卷贤的兜帽",
          "desc": "烈毒之渊 · 迷失的探险者 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "永恒线圈的装饰品",
          "desc": "烈毒之渊 · 双生毒牙 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "多玛纳尔征服者法衣",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "毒液烧焦袖口",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "永恒暗影之握",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "腐蚀性链包裹腰带",
          "desc": "烈毒之渊 · 斯索拉克 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "入门者的牺牲紧身裤",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "内克扎莉的灵魂行者",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "priest",
    "className": "牧师",
    "specId": "holy",
    "specName": "holy",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "错误卷贤的兜帽",
          "desc": "烈毒之渊 · 迷失的探险者 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "永恒线圈的装饰品",
          "desc": "烈毒之渊 · 双生毒牙 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "多玛纳尔征服者法衣",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "毒液烧焦袖口",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "永恒暗影之握",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "腐蚀性链包裹腰带",
          "desc": "烈毒之渊 · 斯索拉克 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "入门者的牺牲紧身裤",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "内克扎莉的灵魂行者",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "priest",
    "className": "牧师",
    "specId": "shadow",
    "specName": "暗影",
    "statPriority": "急速 > 精通 > 暴击 > 全能",
    "statDesc": "急速直接降低虚空箭与心爆冷却，加快暗影 DOT 跳数与狂乱值获取。",
    "talents": {
      "mythicPlus": "CIQAAAAAAAAAAAAAAAAAAAAAAwMzMzMmxMDmxMzMmZmxM2AAAAAAYmZmxMzMzsNmZMzMzgZAAAA",
      "mythicPlusName": "执政官 · 虚空洪流暗影狂乱流",
      "raid": "CIQAAAAAAAAAAAAAAAAAAAAAAwMzMzMmxMDmxMzMmZmxM2AAAAAAYmZmxMzMzsNmZMzMzgZAAAA",
      "raidName": "虚空编织者 · 坍缩黑洞单体流",
      "desc": "群体吸血鬼之触触碰所有目标，暗影冲撞起手铺满 DOT。"
    },
    "consumables": {
      "flask": "淬火急速合剂",
      "potion": "淬火智力药水",
      "food": "香辣急速肉排",
      "weapon": "附魔武器 - 灿烂急速",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "智力急速石"
    },
    "rotation": [
      {
        "name": "铺 DOT",
        "desc": "暗影冲撞对群怪上触与痛 -> 虚空爆发进入虚空形态"
      },
      {
        "name": "技能优先级",
        "desc": "虚空洪流 -> 虚空箭 -> 心灵震爆 -> 灼烧打噬灵疫病"
      },
      {
        "name": "神技",
        "desc": "群体驱散（解无敌/冰箱/大面积魔法）、吸血鬼的拥抱抬团血"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "错误卷贤的兜帽",
          "desc": "烈毒之渊 · 迷失的探险者 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "永恒线圈的装饰品",
          "desc": "烈毒之渊 · 双生毒牙 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "多玛纳尔征服者法衣",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "毒液烧焦袖口",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "永恒暗影之握",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "腐蚀性链包裹腰带",
          "desc": "烈毒之渊 · 斯索拉克 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "入门者的牺牲紧身裤",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "内克扎莉的灵魂行者",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "death-knight",
    "className": "死亡骑士",
    "specId": "blood",
    "specName": "鲜血",
    "statPriority": "急速 (达到 35%) > 全能 > 精通 > 暴击",
    "statDesc": "急速加快符文恢复速度与骨盾消耗补充，全能提供实打实的硬减伤与自疗提升。",
    "talents": {
      "mythicPlus": "CoPAAAAAAAAAAAAAAAAAAAAAAAwADgZmxMzYMzMmxYmxMDzAAAAAAYmxMDzMzsNmZmZmxMAAAA",
      "mythicPlusName": "萨莱茵 · 吸血鬼鲜血盛宴流",
      "raid": "CoPAAAAAAAAAAAAAAAAAAAAAAAwADgZmxMzYMzMmxYmxMDzAAAAAAYmxMDzMzsNmZmZmxMAAAA",
      "raidName": "天启骑士 · 稳健减伤流",
      "desc": "白骨之盾保持5层以上，利用灵界打击进行“电梯血”瞬间拉满。"
    },
    "consumables": {
      "flask": "淬火全能合剂",
      "potion": "坚韧药水",
      "food": "全能急速盛宴",
      "weapon": "符文熔铸 - 堕落十字军之符文 (力量提升与回血)",
      "rings": "附魔戒指 - 绚烂全能",
      "gems": "耐力全能复合石"
    },
    "rotation": [
      {
        "name": "开怪起手",
        "desc": "死神抚摩/抚弄拉怪 -> 凋零铺地 -> 骨髓分裂攒骨盾"
      },
      {
        "name": "自疗机制",
        "desc": "吃大伤害后立即打【灵界打击】回满血，严禁满血乱打灵打"
      },
      {
        "name": "大减伤",
        "desc": "吸血鬼之血（短CD覆盖率极高）、冰封之韧免控解晕"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "复活牺牲者颅骨卫士",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "被遗忘的牺牲肩甲",
          "desc": "烈毒之渊 · 小怪掉落 · 力量/智力",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "鲁莽精神胸甲",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "贝壳护腕",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "鳞板绞杀者",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "悔毒束带",
          "desc": "烈毒之渊 · 盘卷祭坛 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "毒液守望者护腿",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "埋葬邪教徒马靴",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "death-knight",
    "className": "死亡骑士",
    "specId": "frost",
    "specName": "冰霜",
    "statPriority": "暴击 (40%) > 急速 > 精通 > 全能",
    "statDesc": "暴击触发杀戮机器（湮灭必暴击），精通提升纯冰霜伤害。",
    "talents": {
      "mythicPlus": "CsPAAAAAAAAAAAAAAAAAAAAAAAwADgZmxMzYMzMmxYmxMDzAAAAAAYmxMDzMzsNmZmZmxMAAAA",
      "mythicPlusName": "天启骑士 · 冰龙吐息大爆发",
      "raid": "CsPAAAAAAAAAAAAAAAAAAAAAAAwADgZmxMzYMzMmxYmxMDzAAAAAAYmxMDzMzsNmZmZmxMAAAA",
      "raidName": "湮灭冰柱爆发流",
      "desc": "冰霜之柱配合辛达苟萨之怒（冰龙），瞬间打出千万级峰值 AOE。"
    },
    "consumables": {
      "flask": "淬火暴击合剂",
      "potion": "淬火强能药水",
      "food": "暴击盛宴",
      "weapon": "双持：堕落十字军 + 冰峰魔印",
      "rings": "附魔戒指 - 绚烂暴击",
      "gems": "力量暴击石"
    },
    "rotation": [
      {
        "name": "冰柱爆发",
        "desc": "冰霜之柱 -> 符文武器增效 -> 冰龙吐息 -> 杀戮湮灭"
      },
      {
        "name": "平稳期",
        "desc": "冰霜打击泄符文能量，触发白霜打吹风 (凛风冲击)"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "复活牺牲者颅骨卫士",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "被遗忘的牺牲肩甲",
          "desc": "烈毒之渊 · 小怪掉落 · 力量/智力",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "鲁莽精神胸甲",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "贝壳护腕",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "鳞板绞杀者",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "悔毒束带",
          "desc": "烈毒之渊 · 盘卷祭坛 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "毒液守望者护腿",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "埋葬邪教徒马靴",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "death-knight",
    "className": "死亡骑士",
    "specId": "unholy",
    "specName": "邪恶",
    "statPriority": "精通 > 急速 > 暴击 > 全能",
    "statDesc": "精通极大提升宝宝与暗影疾病伤害，急速加快符文周转。",
    "talents": {
      "mythicPlus": "CwPAAAAAAAAAAAAAAAAAAAAAAAwADgZmxMzYMzMmxYmxMDzAAAAAAYmxMDzMzsNmZmZmxMAAAA",
      "mythicPlusName": "萨莱茵 · 溃烂爆裂爆发流",
      "raid": "CwPAAAAAAAAAAAAAAAAAAAAAAAwADgZmxMzYMzMmxYmxMDzAAAAAAYmxMDzMzsNmZmZmxMAAAA",
      "raidName": "天启骑士 · 纯单体大军流",
      "desc": "亡者大军配合邪恶突袭与凋零缠绕，爆发天花板。"
    },
    "consumables": {
      "flask": "淬火精通合剂",
      "potion": "淬火强能药水",
      "food": "精通盛宴",
      "weapon": "符文熔铸 - 堕落十字军之符文",
      "rings": "附魔戒指 - 绚烂精通",
      "gems": "力量精通石"
    },
    "rotation": [
      {
        "name": "伤口爆发",
        "desc": "脓疮打击叠溃烂伤口 -> 天启引爆 -> 邪恶狂乱"
      },
      {
        "name": "AOE 铺场",
        "desc": "枯萎凋零铺地，天灾打击顺劈引爆所有怪身上的伤口"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "复活牺牲者颅骨卫士",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "被遗忘的牺牲肩甲",
          "desc": "烈毒之渊 · 小怪掉落 · 力量/智力",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "鲁莽精神胸甲",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "贝壳护腕",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "鳞板绞杀者",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "悔毒束带",
          "desc": "烈毒之渊 · 盘卷祭坛 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "毒液守望者护腿",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "埋葬邪教徒马靴",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "shaman",
    "className": "萨满祭司",
    "specId": "elemental",
    "specName": "elemental",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "永恒之牙之冠",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "噬魂者肩甲",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "蛇尾方邮件",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "闪闪发光的霜鳞包裹",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "冰川盆地护手",
          "desc": "地下堡 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "被诅咒的圣物束带",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "展开联盟的Cuisses",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "鲁莽旅人之靴",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "shaman",
    "className": "萨满祭司",
    "specId": "enhancement",
    "specName": "enhancement",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "永恒之牙之冠",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "噬魂者肩甲",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "蛇尾方邮件",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "闪闪发光的霜鳞包裹",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "冰川盆地护手",
          "desc": "地下堡 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "被诅咒的圣物束带",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "展开联盟的Cuisses",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "鲁莽旅人之靴",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "shaman",
    "className": "萨满祭司",
    "specId": "restoration",
    "specName": "恢复",
    "statPriority": "暴击 > 急速 > 精通 > 全能",
    "statDesc": "暴击触发复苏回蓝并产生双倍治疗，急速加快治疗波与治疗暴雨的铺设。",
    "talents": {
      "mythicPlus": "CGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzMzMDmxMmZGMmxM2AAAAAAYmZmxMzMzsNmZMzMzgZAAAA",
      "mythicPlusName": "先祖指引 · 大雨激流涌动链",
      "raid": "CGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzMzMDmxMmZGMmxM2AAAAAAYmZmxMzMzsNmZMzMzgZAAAA",
      "raidName": "先知 · 升腾治疗链流",
      "desc": "灵魂链接图腾（群刷换血神技）、先祖活力与风剪（12秒远程打断）。"
    },
    "consumables": {
      "flask": "淬火暴击合剂",
      "potion": "心能爆发药水",
      "food": "暴击盛宴",
      "weapon": "附魔武器 - 绚烂暴击",
      "rings": "附魔戒指 - 绚烂暴击",
      "gems": "智力暴击复合石"
    },
    "rotation": [
      {
        "name": "常驻铺垫",
        "desc": "脚下常驻大地之墙图腾与暴雨图腾，保持激流 Hot"
      },
      {
        "name": "急救换血",
        "desc": "全队濒死直接插【灵魂链接图腾】，升腾瞬间拉满"
      },
      {
        "name": "打断断条",
        "desc": "卡 12 秒 CD 释放风剪，全职业最强远程打断"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "永恒之牙之冠",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "噬魂者肩甲",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "蛇尾方邮件",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "闪闪发光的霜鳞包裹",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "冰川盆地护手",
          "desc": "地下堡 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "被诅咒的圣物束带",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "展开联盟的Cuisses",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "鲁莽旅人之靴",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "mage",
    "className": "法师",
    "specId": "arcane",
    "specName": "奥术",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "急速加快弹幕、飞弹与奥冲的释放频率，高暴击让虚空风暴与大法师之触爆击融化敌人。",
    "talents": {
      "mythicPlus": "C4DAAAAAAAAAAAAAAAAAAAAAAYmZMMzMjZmZGYmxMMzMz2AAAAAAmZmxMzMzsNmZMzMzgZAAAA",
      "mythicPlusName": "日怒 · 虚空裂隙触手大爆发",
      "raid": "C4DAAAAAAAAAAAAAAAAAAAAAAYmZMMzMjZmZGYmxMMzMz2AAAAAAmZmxMzMzsNmZMzMzgZAAAA",
      "raidName": "法咒师 · 稳定奥术飞弹流",
      "desc": "奥术涌动配合大法师之触，是当前版本大秘境最强波次融怪爆发之一。"
    },
    "consumables": {
      "flask": "淬火无面合剂 (暴击/急速)",
      "potion": "淬火智力药水",
      "food": "香辣急速肉排",
      "weapon": "附魔武器 - 灿烂急速",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "智力急速石"
    },
    "rotation": [
      {
        "name": "爆发触",
        "desc": "大法师之触 -> 奥术涌动 -> 奥能弹幕 -> 满层奥冲"
      },
      {
        "name": "节能飞弹",
        "desc": "触发节能施法打奥术飞弹，消耗飞弹打高额弹幕"
      },
      {
        "name": "减伤保命",
        "desc": "棱彩护体常驻，急冷冰箱消一切负面效果"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "错误卷贤的兜帽",
          "desc": "烈毒之渊 · 迷失的探险者 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "永恒线圈的装饰品",
          "desc": "烈毒之渊 · 双生毒牙 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "多玛纳尔征服者法衣",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "毒液烧焦袖口",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "永恒暗影之握",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "腐蚀性链包裹腰带",
          "desc": "烈毒之渊 · 斯索拉克 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "入门者的牺牲紧身裤",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "内克扎莉的灵魂行者",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "mage",
    "className": "法师",
    "specId": "fire",
    "specName": "fire",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "错误卷贤的兜帽",
          "desc": "烈毒之渊 · 迷失的探险者 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "永恒线圈的装饰品",
          "desc": "烈毒之渊 · 双生毒牙 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "多玛纳尔征服者法衣",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "毒液烧焦袖口",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "永恒暗影之握",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "腐蚀性链包裹腰带",
          "desc": "烈毒之渊 · 斯索拉克 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "入门者的牺牲紧身裤",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "内克扎莉的灵魂行者",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "mage",
    "className": "法师",
    "specId": "frost",
    "specName": "冰霜",
    "statPriority": "暴击 (33.3%碎冰线) > 急速 > 精通 > 全能",
    "statDesc": "暴击达到 33.3% 碎冰软上限后，对冰冻目标的所有爆击率达到 100%。",
    "talents": {
      "mythicPlus": "C8DAAAAAAAAAAAAAAAAAAAAAAYmZMMzMjZmZGYmxMMzMz2AAAAAAmZmxMzMzsNmZMzMzgZAAAA",
      "mythicPlusName": "冰霜射线 · 冰霜宝珠暴风雪 AOE",
      "raid": "C8DAAAAAAAAAAAAAAAAAAAAAAYmZMMzMjZmZGYmxMMzMz2AAAAAAmZmxMzMzsNmZMzMzgZAAAA",
      "raidName": "纯单体热能冰枪流",
      "desc": "暴风雪减宝珠 CD，冰霜宝珠提供源源不断的冰指打出巨额碎冰伤害。"
    },
    "consumables": {
      "flask": "淬火急速合剂",
      "potion": "淬火智力药水",
      "food": "急速海鲜盛宴",
      "weapon": "附魔武器 - 绚烂暴击",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "智力暴击复合石"
    },
    "rotation": [
      {
        "name": "AOE 铺场",
        "desc": "冰霜宝珠丢入怪堆 -> 暴风雪卡 CD 下 -> 冰指打冰枪术"
      },
      {
        "name": "大招",
        "desc": "冰冷血脉全开，彗星风暴配合冰霜新星打深冬碎冰"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "错误卷贤的兜帽",
          "desc": "烈毒之渊 · 迷失的探险者 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "永恒线圈的装饰品",
          "desc": "烈毒之渊 · 双生毒牙 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "多玛纳尔征服者法衣",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "毒液烧焦袖口",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "永恒暗影之握",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "腐蚀性链包裹腰带",
          "desc": "烈毒之渊 · 斯索拉克 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "入门者的牺牲紧身裤",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "内克扎莉的灵魂行者",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "warlock",
    "className": "术士",
    "specId": "affliction",
    "specName": "affliction",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "错误卷贤的兜帽",
          "desc": "烈毒之渊 · 迷失的探险者 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "永恒线圈的装饰品",
          "desc": "烈毒之渊 · 双生毒牙 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "多玛纳尔征服者法衣",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "毒液烧焦袖口",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "永恒暗影之握",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "腐蚀性链包裹腰带",
          "desc": "烈毒之渊 · 斯索拉克 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "入门者的牺牲紧身裤",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "内克扎莉的灵魂行者",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "warlock",
    "className": "术士",
    "specId": "demonology",
    "specName": "demonology",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "错误卷贤的兜帽",
          "desc": "烈毒之渊 · 迷失的探险者 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "永恒线圈的装饰品",
          "desc": "烈毒之渊 · 双生毒牙 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "多玛纳尔征服者法衣",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "毒液烧焦袖口",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "永恒暗影之握",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "腐蚀性链包裹腰带",
          "desc": "烈毒之渊 · 斯索拉克 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "入门者的牺牲紧身裤",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "内克扎莉的灵魂行者",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "warlock",
    "className": "术士",
    "specId": "destruction",
    "specName": "destruction",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "错误卷贤的兜帽",
          "desc": "烈毒之渊 · 迷失的探险者 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "永恒线圈的装饰品",
          "desc": "烈毒之渊 · 双生毒牙 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "多玛纳尔征服者法衣",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "毒液烧焦袖口",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "永恒暗影之握",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "腐蚀性链包裹腰带",
          "desc": "烈毒之渊 · 斯索拉克 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "入门者的牺牲紧身裤",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "内克扎莉的灵魂行者",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "monk",
    "className": "武僧",
    "specId": "brewmaster",
    "specName": "brewmaster",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "monk",
    "className": "武僧",
    "specId": "mistweaver",
    "specName": "mistweaver",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "monk",
    "className": "武僧",
    "specId": "windwalker",
    "specName": "windwalker",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "druid",
    "className": "德鲁伊",
    "specId": "balance",
    "specName": "平衡",
    "statPriority": "精通 > 急速 > 暴击 > 全能",
    "statDesc": "精通提升日蚀与月蚀状态下的所有自然与奥术伤害，星辰坠落常驻下伤害拉满。",
    "talents": {
      "mythicPlus": "CYGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgGmhZZGLzMzMGzMLzMDzMz2wwMzMjxyYmZmhBAAAAmZzYGMwMAMwAAA",
      "mythicPlusName": "艾露恩之怒 · 星落万物顺劈流",
      "raid": "CYGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgGmhZZGLzMzMGzMLzMDzMz2wwMzMjxyYmZmhBAAAAmZzYGMwMAMwAAA",
      "raidName": "丛林守护者 · 单体星涌爆发流",
      "desc": "群怪星辰坠落无目标上限，超凡之盟爆发毁灭全场。"
    },
    "consumables": {
      "flask": "淬火精通合剂",
      "potion": "淬火智力药水",
      "food": "精通盛宴",
      "weapon": "附魔武器 - 绚烂精通",
      "rings": "附魔戒指 - 绚烂精通",
      "gems": "智力精通复合石"
    },
    "rotation": [
      {
        "name": "进蚀输出",
        "desc": "打两次星火进日蚀，打两次愤怒进月蚀"
      },
      {
        "name": "群怪 AOE",
        "desc": "阳炎术铺全场，能量全部打【星辰坠落】"
      },
      {
        "name": "爆发",
        "desc": "超凡之盟/化身 -> 艾露恩之怒 -> 连续星涌"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "druid",
    "className": "德鲁伊",
    "specId": "feral",
    "specName": "feral",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "druid",
    "className": "德鲁伊",
    "specId": "guardian",
    "specName": "guardian",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "druid",
    "className": "德鲁伊",
    "specId": "restoration",
    "specName": "restoration",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "demon-hunter",
    "className": "恶魔猎手",
    "specId": "havoc",
    "specName": "havoc",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "demon-hunter",
    "className": "恶魔猎手",
    "specId": "vengeance",
    "specName": "vengeance",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "暗影猎人的战争面罩",
          "desc": "烈毒之渊 · 陵寝哨兵 · 全能/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "泡沫毒液护肩",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "觉醒法衣",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "不安的精神枷锁",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "无情屠宰之握",
          "desc": "烈毒之渊 · 斯索拉克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "失落的颅骨腰带",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "失落军团长裤",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "唾液滑鞋",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "evoker",
    "className": "唤魔师",
    "specId": "devastation",
    "specName": "devastation",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "永恒之牙之冠",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "噬魂者肩甲",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "蛇尾方邮件",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "闪闪发光的霜鳞包裹",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "冰川盆地护手",
          "desc": "地下堡 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "被诅咒的圣物束带",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "展开联盟的Cuisses",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "鲁莽旅人之靴",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "evoker",
    "className": "唤魔师",
    "specId": "preservation",
    "specName": "preservation",
    "statPriority": "急速 > 暴击 > 精通 > 全能",
    "statDesc": "建议平衡绿字收益，保持急速手感与主属性收益最大化。",
    "talents": {
      "mythicPlus": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAYGzMWGDmxMziZmZjhZmFmNzM2AAAAYmBMzAA",
      "mythicPlusName": "大秘境通用标准推荐流派",
      "raid": "CYEAAAAAAAAAAAAAAAAAAAAAAAAAAYbDAYmBAmxyMAAAAAAAMbAAAAY2yYmZmxMMzMzMzMzYGMzMzmZAAAAYmBMzAA",
      "raidName": "团本纯单体进阶流派",
      "desc": "官方平衡推荐天赋配置，一键导入游戏即刻生效。"
    },
    "consumables": {
      "flask": "淬火混沌合剂",
      "potion": "淬火强能药水",
      "food": "精选大餐盛宴",
      "weapon": "附魔武器 - 议会之威",
      "rings": "附魔戒指 - 绚烂急速",
      "gems": "主属性复合璀璨宝石"
    },
    "rotation": [
      {
        "name": "爆发开启",
        "desc": "开启种族特长与主力爆发饰品，倾泻大招"
      },
      {
        "name": "核心平稳",
        "desc": "主力资源获取技能卡 CD 释放，避免资源溢出"
      },
      {
        "name": "AOE 目标",
        "desc": "多目标时切换顺劈机制技能"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "永恒之牙之冠",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "噬魂者肩甲",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "蛇尾方邮件",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "闪闪发光的霜鳞包裹",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "冰川盆地护手",
          "desc": "地下堡 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "被诅咒的圣物束带",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "展开联盟的Cuisses",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "鲁莽旅人之靴",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  },
  {
    "classSlug": "evoker",
    "className": "唤魔师",
    "specId": "augmentation",
    "specName": "增辉",
    "statPriority": "精通 (黑檀之力收益) > 急速 > 暴击 > 全能",
    "statDesc": "精通直接根据自身力量提升队友的主属性！增辉是冲高层大米队伍不可或缺的核心放大器。",
    "talents": {
      "mythicPlus": "CEcBAAAAAAAAAAAAAAAAAAAAAMzYmZMzYmxMMzMzsMmZGYmxMAAAAAgZGzMjxMzsNmZMzMzgZAAAA",
      "mythicPlusName": "时空守卫 · 黑檀之力全队增幅流",
      "raid": "CEcBAAAAAAAAAAAAAAAAAAAAAMzYmZMzYmxMMzMzsMmZGYmxMAAAAAgZGzMjxMzsNmZMzMzgZAAAA",
      "raidName": "塑焰者 · 纯单体火息爆燃流",
      "desc": "黑檀之力全程覆盖坦克与两位最强爆发 DPS，先知先觉精准给爆发期队友。"
    },
    "consumables": {
      "flask": "淬火精通合剂",
      "potion": "淬火智力药水",
      "food": "香辣精通盛宴",
      "weapon": "附魔武器 - 绚烂精通",
      "rings": "附魔戒指 - 绚烂精通",
      "gems": "智力精通石"
    },
    "rotation": [
      {
        "name": "黑檀覆盖",
        "desc": "黑檀之力卡 CD 释放，利用地击与喷火延长持续时间"
      },
      {
        "name": "预知给谁",
        "desc": "爆发期开启前将【先知先觉】挂给爆发最高的核心队友"
      },
      {
        "name": "群控与保命",
        "desc": "山崩定身群怪、扫尾/飞翼击飞断钢条、微风全队魔法减伤"
      }
    ],
    "gear": {
      "left": [
        {
          "slot": "头部",
          "name": "永恒之牙之冠",
          "desc": "烈毒之渊 · 陵寝哨兵 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "颈部",
          "name": "哨兵的硫酸链",
          "desc": "烈毒之渊 · 陵寝哨兵 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "肩部",
          "name": "噬魂者肩甲",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "背部",
          "name": "阿曼尼召唤披肩",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "胸部",
          "name": "蛇尾方邮件",
          "desc": "烈毒之渊 · 双生毒牙 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        },
        {
          "slot": "腕部",
          "name": "闪闪发光的霜鳞包裹",
          "desc": "地下堡 · 全能/急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg"
        }
      ],
      "right": [
        {
          "slot": "手部",
          "name": "冰川盆地护手",
          "desc": "地下堡 · 急速/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腰部",
          "name": "被诅咒的圣物束带",
          "desc": "烈毒之渊 · 盘魂者内克扎莉 · 全能/暴击",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "腿部",
          "name": "展开联盟的Cuisses",
          "desc": "烈毒之渊 · 盘卷祭坛 · 急速/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "脚部",
          "name": "鲁莽旅人之靴",
          "desc": "烈毒之渊 · 迷失的探险者 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 1",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        },
        {
          "slot": "戒指 2",
          "name": "邪恶炼金术士指环",
          "desc": "烈毒之渊 · 万毒邪祟者瓦什尼克 · 暴击/精通",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg"
        }
      ],
      "weapons": [
        {
          "slot": "主手武器",
          "name": "议会之威战刃 / 裂魂者",
          "desc": "史诗钥石地下城 · 暴击 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg"
        },
        {
          "slot": "副手/盾牌",
          "name": "阿曼尼符文盾 / 仪式副手",
          "desc": "史诗钥石地下城 · 精通 / 急速",
          "icon": "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg"
        }
      ]
    }
  }
];
