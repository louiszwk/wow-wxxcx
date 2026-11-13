/**
 * data/infinite_talents_data.js
 * 《魔兽世界：无限》(WoW: Forever) 1.60.1 客户端实装天赋数据
 * 9 大职业 / 27 棵专精天赋树 / 467 个天赋节点，含名称、官方图标、行列坐标、
 * 点数上限、前置依赖与各阶中文效果说明；27 套主流 51 点配装。
 * 数据来源：游戏客户端 1.60.1 实装数据（2026-11-12 校验，含 11/10、11/11 在线热修）
 * 生成时间: 2026-11-13T00:57:03.564Z
 */

const TALENT_DATA_60 = {
  "warrior": {
    "name": "战士",
    "icon": "⚔️",
    "classIcon": "class_warrior",
    "presets": [
      {
        "name": "武器战 (32/17/2)",
        "desc": "游戏内主流推荐加点 · 武器 32 / 狂怒 17 / 防护 2 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "w_imp_hs": 3,
          "w_imp_rend": 3,
          "t12295": 3,
          "w_imp_overpower": 2,
          "w_anger_mgmt": 1,
          "w_deep_wounds": 3,
          "t1310222": 1,
          "w_two_hand_spec": 3,
          "w_impale": 2,
          "t1289682": 2,
          "w_sweeping_strikes": 1,
          "w_weapon_exp": 5,
          "w_imp_slam": 2,
          "w_mortal_strike": 1,
          "w_booming_voice": 5,
          "w_cruelty": 5,
          "w_unbridled_wrath": 5,
          "w_imp_execute": 2,
          "t12301": 2
        }
      },
      {
        "name": "狂暴战 (17/33/1)",
        "desc": "游戏内主流推荐加点 · 武器 17 / 狂怒 33 / 防护 1 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "w_imp_hs": 3,
          "w_imp_rend": 3,
          "t12295": 3,
          "w_imp_overpower": 2,
          "w_anger_mgmt": 1,
          "w_deep_wounds": 3,
          "w_impale": 2,
          "w_booming_voice": 3,
          "w_cruelty": 5,
          "w_unbridled_wrath": 5,
          "t1323963": 3,
          "w_dw_spec": 5,
          "t1329555": 1,
          "w_imp_execute": 2,
          "t20500": 2,
          "w_death_wish": 1,
          "t1310315": 2,
          "w_flurry": 3,
          "w_bloodthirst": 1,
          "t12301": 1
        }
      },
      {
        "name": "防战 (5/15/31)",
        "desc": "游戏内主流推荐加点 · 武器 5 / 狂怒 15 / 防护 31 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "w_deflection": 5,
          "w_cruelty": 5,
          "w_unbridled_wrath": 5,
          "t12317": 5,
          "t12301": 1,
          "w_shield_spec": 5,
          "w_anticipation": 5,
          "w_imp_revenge": 3,
          "w_imp_thunder": 1,
          "w_last_stand": 1,
          "t1310316": 2,
          "w_defiance": 3,
          "w_concussion_blow": 1,
          "t29787": 3,
          "t16538": 5,
          "w_shield_slam": 1
        }
      }
    ],
    "trees": [
      {
        "id": "arms",
        "name": "武器",
        "skills": [
          {
            "id": "w_imp_hs",
            "name": "强化英勇打击",
            "icon": "ability_rogue_ambush",
            "row": 1,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的英勇打击消耗的怒气减少1点。",
              "使你的英勇打击消耗的怒气减少2点。",
              "使你的英勇打击消耗的怒气减少3点。"
            ]
          },
          {
            "id": "w_deflection",
            "name": "偏斜",
            "icon": "ability_parry",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的招架几率提高1%。",
              "使你的招架几率提高2%。",
              "使你的招架几率提高3%。",
              "使你的招架几率提高4%。",
              "使你的招架几率提高5%。"
            ]
          },
          {
            "id": "w_imp_rend",
            "name": "强化撕裂",
            "icon": "ability_gouge",
            "row": 1,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的撕裂技能造成的流血伤害提高12%。",
              "使你的撕裂技能造成的流血伤害提高23%。",
              "使你的撕裂技能造成的流血伤害提高35%。"
            ]
          },
          {
            "id": "w_imp_charge",
            "name": "强化冲锋",
            "icon": "ability_warrior_charge",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的冲锋技能产生的怒气提高3点。",
              "使你的冲锋技能产生的怒气提高6点。"
            ]
          },
          {
            "id": "t12295",
            "name": "强化战术掌握",
            "icon": "spell_nature_enchantarmor",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "战术掌握使你在改变姿态时最多额外保留5点怒气。",
              "战术掌握使你在改变姿态时最多额外保留10点怒气。",
              "战术掌握使你在改变姿态时最多额外保留15点怒气。"
            ]
          },
          {
            "id": "w_imp_overpower",
            "name": "强化压制",
            "icon": "inv_sword_05",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的压制技能造成爆击的几率提高25%。",
              "使你的压制技能造成爆击的几率提高50%。"
            ]
          },
          {
            "id": "w_anger_mgmt",
            "name": "愤怒掌控",
            "icon": "spell_holy_blessingofstamina",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": "t12295",
            "ranks": [
              "在战斗中每3秒获得1点怒气，并使脱战怒气衰减降低30%。"
            ]
          },
          {
            "id": "w_deep_wounds",
            "name": "重伤",
            "icon": "ability_backstab",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": "w_imp_rend",
            "ranks": [
              "你的爆击会使对手流血，在12秒内造成相当于你近战武器平均伤害20%的伤害。",
              "你的爆击会使对手流血，在12秒内造成相当于你近战武器平均伤害40%的伤害。",
              "你的爆击会使对手流血，在12秒内造成相当于你近战武器平均伤害60%的伤害。"
            ]
          },
          {
            "id": "t1310222",
            "name": "穿刺打击",
            "icon": "inv_spear_01",
            "row": 4,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "一次残忍的攻击，造成75%的武器伤害。对巨人、龙类以及骑乘状态下的目标额外造成75%的武器伤害。骑乘状态下的目标会被迫下马。"
            ]
          },
          {
            "id": "w_two_hand_spec",
            "name": "双手武器专精",
            "icon": "inv_axe_09",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的双手近战武器造成的伤害提高2%。",
              "使你的双手近战武器造成的伤害提高4%。",
              "使你的双手近战武器造成的伤害提高6%。"
            ]
          },
          {
            "id": "w_impale",
            "name": "穿刺",
            "icon": "ability_searingarrow",
            "row": 4,
            "col": 3,
            "max": 2,
            "prereq": "w_deep_wounds",
            "ranks": [
              "使你的技能爆击伤害加成提高10%。",
              "使你的技能爆击伤害加成提高20%。"
            ]
          },
          {
            "id": "t1289682",
            "name": "血之气息",
            "icon": "inv_sword_01",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "对受你撕裂影响的敌人使用主手武器发动近战攻击时，有10%的几率激活压制。",
              "对受你撕裂影响的敌人使用主手武器发动近战攻击时，有20%的几率激活压制。"
            ]
          },
          {
            "id": "w_sweeping_strikes",
            "name": "横扫攻击",
            "icon": "ability_rogue_slicedice",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "你在接下来的5次近战攻击中可以攻击到一个额外的敌人。"
            ]
          },
          {
            "id": "w_weapon_exp",
            "name": "武器大师",
            "icon": "garrison_weaponupgrade",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "根据你所使用的武器，为你的近战武器攻击提供一定的加成效果。 斧/长柄武器：使你的 爆击几率提高1%。 锤/法杖：你的攻击忽略 目标3%的护甲值。 剑：你成功的近战 攻击有1%的几率对目标 造成一次额外的 攻击。",
              "根据你所使用的武器，为你的近战武器攻击提供一定的加成效果。 斧/长柄武器：使你的 爆击几率提高2%。 锤/法杖：你的攻击忽略 目标6%的护甲值。 剑：你成功的近战 攻击有2%的几率对目标 造成一次额外的 攻击。",
              "根据你所使用的武器，为你的近战武器攻击提供一定的加成效果。 斧/长柄武器：使你的 爆击几率提高3%。 锤/法杖：你的攻击忽略 目标9%的护甲值。 剑：你成功的近战 攻击有3%的几率对目标 造成一次额外的 攻击。",
              "根据你所使用的武器，为你的近战武器攻击提供一定的加成效果。 斧/长柄武器：使你的 爆击几率提高4%。 锤/法杖：你的攻击忽略 目标12%的护甲值。 剑：你成功的近战 攻击有4%的几率对目标 造成一次额外的 攻击。",
              "根据你所使用的武器，为你的近战武器攻击提供一定的加成效果。 斧/长柄武器：使你的 爆击几率提高5%。 锤/法杖：你的攻击忽略 目标15%的护甲值。 剑：你成功的近战 攻击有5%的几率对目标 造成一次额外的 攻击。"
            ]
          },
          {
            "id": "w_imp_slam",
            "name": "强化猛击",
            "icon": "ability_warrior_decisivestrike",
            "row": 6,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的猛击技能的冷却时间缩短2.5秒，施法时间和公共冷却时间缩短0.25秒，且猛击不再打断或延迟你的近战挥击计时。",
              "使你的猛击技能的冷却时间缩短5秒，施法时间和公共冷却时间缩短0.5秒，且猛击不再打断或延迟你的近战挥击计时。"
            ]
          },
          {
            "id": "t12289",
            "name": "强化断筋",
            "icon": "ability_shockwave",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的断筋技能有5%的几率令目标无法移动，持续5秒。",
              "使你的断筋技能有10%的几率令目标无法移动，持续5秒。",
              "使你的断筋技能有15%的几率令目标无法移动，持续5秒。"
            ]
          },
          {
            "id": "w_mortal_strike",
            "name": "致死打击",
            "icon": "ability_warrior_savageblow",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "w_sweeping_strikes",
            "ranks": [
              "一次邪恶的攻击，对目标造成武器伤害外加85点伤害，并使任何形式的治疗对其产生的效果降低50%，持续10秒。"
            ]
          }
        ]
      },
      {
        "id": "fury",
        "name": "狂怒",
        "skills": [
          {
            "id": "w_booming_voice",
            "name": "震耳嗓音",
            "icon": "spell_nature_purge",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "你的怒吼技能的范围扩大10%，怒吼和嚎叫技能的怒气消耗降低5%。",
              "你的怒吼技能的范围扩大20%，怒吼和嚎叫技能的怒气消耗降低10%。",
              "你的怒吼技能的范围扩大30%，怒吼和嚎叫技能的怒气消耗降低15%。",
              "你的怒吼技能的范围扩大40%，怒吼和嚎叫技能的怒气消耗降低20%。",
              "你的怒吼技能的范围扩大50%，怒吼和嚎叫技能的怒气消耗降低25%。"
            ]
          },
          {
            "id": "w_cruelty",
            "name": "残忍",
            "icon": "ability_rogue_eviscerate",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的近战攻击造成爆击的几率提高1%。",
              "使你的近战攻击造成爆击的几率提高2%。",
              "使你的近战攻击造成爆击的几率提高3%。",
              "使你的近战攻击造成爆击的几率提高4%。",
              "使你的近战攻击造成爆击的几率提高5%。"
            ]
          },
          {
            "id": "t1323964",
            "name": "余怒未消",
            "icon": "ability_warrior_secondwind",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你脱离战斗后怒气开始衰减的时间延后2秒。",
              "使你脱离战斗后怒气开始衰减的时间延后4秒。",
              "使你脱离战斗后怒气开始衰减的时间延后6秒。",
              "使你脱离战斗后怒气开始衰减的时间延后8秒。",
              "使你脱离战斗后怒气开始衰减的时间延后10秒。"
            ]
          },
          {
            "id": "w_unbridled_wrath",
            "name": "怒不可遏",
            "icon": "spell_nature_stoneclawtotem",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你有12%的几率在使用武器造成近战伤害后额外获得1点怒气。",
              "使你有24%的几率在使用武器造成近战伤害后额外获得1点怒气。",
              "使你有36%的几率在使用武器造成近战伤害后额外获得1点怒气。",
              "使你有48%的几率在使用武器造成近战伤害后额外获得1点怒气。",
              "使你有60%的几率在使用武器造成近战伤害后额外获得1点怒气。"
            ]
          },
          {
            "id": "t1323963",
            "name": "狂怒精准",
            "icon": "ability_warrior_incite",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的副手攻击命中几率提高4%。",
              "使你的副手攻击命中几率提高7%。",
              "使你的副手攻击命中几率提高10%。"
            ]
          },
          {
            "id": "w_piercing_howl",
            "name": "刺耳怒吼",
            "icon": "spell_shadow_deathscream",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使周围10码内的所有敌人眩晕，移动速度降低50%，持续6秒。"
            ]
          },
          {
            "id": "w_blood_craze",
            "name": "血之狂热",
            "icon": "spell_shadow_summonimp",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "受到爆击，或单次攻击使你损失超过20%的最大生命值后，在6秒内恢复总生命值的1%。",
              "受到爆击，或单次攻击使你损失超过20%的最大生命值后，在6秒内恢复总生命值的2%。",
              "受到爆击，或单次攻击使你损失超过20%的最大生命值后，在6秒内恢复总生命值的3%。"
            ]
          },
          {
            "id": "t12317",
            "name": "狂怒",
            "icon": "spell_shadow_unholyfrenzy",
            "row": 3,
            "col": 4,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你在遭受任何伤害性攻击后，有30%的几率使你造成的物理伤害提高2%，持续12秒。",
              "使你在遭受任何伤害性攻击后，有30%的几率使你造成的物理伤害提高4%，持续12秒。",
              "使你在遭受任何伤害性攻击后，有30%的几率使你造成的物理伤害提高6%，持续12秒。",
              "使你在遭受任何伤害性攻击后，有30%的几率使你造成的物理伤害提高8%，持续12秒。",
              "使你在遭受任何伤害性攻击后，有30%的几率使你造成的物理伤害提高10%，持续12秒。"
            ]
          },
          {
            "id": "w_dw_spec",
            "name": "双武器专精",
            "icon": "ability_dualwield",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的副手武器造成的伤害提高5%，副手攻击产生的怒气提高10%。",
              "使你的副手武器造成的伤害提高10%，副手攻击产生的怒气提高20%。",
              "使你的副手武器造成的伤害提高15%，副手攻击产生的怒气提高30%。",
              "使你的副手武器造成的伤害提高20%，副手攻击产生的怒气提高40%。",
              "使你的副手武器造成的伤害提高25%，副手攻击产生的怒气提高50%。"
            ]
          },
          {
            "id": "t1329555",
            "name": "鲁莽挥击",
            "icon": "ability_warrior_bloodfrenzy",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "你接下来的4次近战攻击每次额外产生5点怒气，持续8秒。"
            ]
          },
          {
            "id": "w_imp_execute",
            "name": "强化斩杀",
            "icon": "inv_sword_48",
            "row": 4,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的斩杀技能的怒气值消耗减少3点。",
              "使你的斩杀技能的怒气值消耗减少5点。"
            ]
          },
          {
            "id": "t20500",
            "name": "强化狂暴之怒",
            "icon": "spell_nature_ancestralguardian",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "你的狂暴之怒激活时会立即获得5点怒气，并有50%的几率移除所有移动限制效果。",
              "你的狂暴之怒激活时会立即获得10点怒气，并有100%的几率移除所有移动限制效果。"
            ]
          },
          {
            "id": "w_death_wish",
            "name": "死亡之愿",
            "icon": "spell_shadow_deathpact",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后，你造成的物理伤害提高20%，并免疫恐惧效果，但受到的所有伤害提高5%。持续30秒。"
            ]
          },
          {
            "id": "t1323967",
            "name": "饮血者",
            "icon": "racial_troll_berserk",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": "w_blood_craze",
            "ranks": [
              "你的狂怒、狂暴之怒、血性狂暴、死亡之愿、鲁莽挥击以及嗜血技能使你接下来的3次近战攻击恢复你0.5%的最大生命值。",
              "你的狂怒、狂暴之怒、血性狂暴、死亡之愿、鲁莽挥击以及嗜血技能使你接下来的3次近战攻击恢复你1%的最大生命值。"
            ]
          },
          {
            "id": "t20504",
            "name": "强化拦截",
            "icon": "ability_rogue_sprint",
            "row": 5,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的拦截技能的冷却时间减少5秒。",
              "使你的拦截技能的冷却时间减少10秒。"
            ]
          },
          {
            "id": "t1310315",
            "name": "强化旋风斩",
            "icon": "ability_whirlwind",
            "row": 6,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的旋风斩技能的冷却时间缩短1秒，对距离最近的敌人造成的伤害提高15%。",
              "使你的旋风斩技能的冷却时间缩短2秒，对距离最近的敌人造成的伤害提高30%。"
            ]
          },
          {
            "id": "w_flurry",
            "name": "乱舞",
            "icon": "ability_ghoulfrenzy",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "近战攻击造成爆击后，使你接下来的3次攻击的近战攻击速度提高10%。",
              "近战攻击造成爆击后，使你接下来的3次攻击的近战攻击速度提高20%。",
              "近战攻击造成爆击后，使你接下来的3次攻击的近战攻击速度提高30%。"
            ]
          },
          {
            "id": "w_bloodthirst",
            "name": "嗜血",
            "icon": "spell_nature_bloodlust",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "w_death_wish",
            "ranks": [
              "立即攻击目标，造成相当于攻击强度45%外加30点的伤害，并使移动速度提高10%，持续10秒。"
            ]
          }
        ]
      },
      {
        "id": "protection",
        "name": "防护",
        "skills": [
          {
            "id": "t12301",
            "name": "强化血性狂暴",
            "icon": "ability_racial_bloodrage",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的血性狂暴技能产生的所有怒气提高25%。",
              "使你的血性狂暴技能产生的所有怒气提高50%。"
            ]
          },
          {
            "id": "w_shield_spec",
            "name": "盾牌专精",
            "icon": "inv_shield_06",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你用盾牌格挡攻击的几率提高1%，并使你在格挡时有20%的几率产生5点怒气。",
              "使你用盾牌格挡攻击的几率提高2%，并使你在格挡时有40%的几率产生5点怒气。",
              "使你用盾牌格挡攻击的几率提高3%，并使你在格挡时有60%的几率产生5点怒气。",
              "使你用盾牌格挡攻击的几率提高4%，并使你在格挡时有80%的几率产生5点怒气。",
              "使你用盾牌格挡攻击的几率提高5%，并使你在格挡时有100%的几率产生5点怒气。"
            ]
          },
          {
            "id": "w_iron_will",
            "name": "钢铁意志",
            "icon": "spell_magic_magearmor",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你受到的昏迷和恐惧效果的持续时间缩短3%。",
              "使你受到的昏迷和恐惧效果的持续时间缩短6%。",
              "使你受到的昏迷和恐惧效果的持续时间缩短9%。",
              "使你受到的昏迷和恐惧效果的持续时间缩短12%。",
              "使你受到的昏迷和恐惧效果的持续时间缩短15%。"
            ]
          },
          {
            "id": "w_anticipation",
            "name": "预知",
            "icon": "spell_nature_mirrorimage",
            "row": 2,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的防御技能提高4点。",
              "使你的防御技能提高8点。",
              "使你的防御技能提高12点。",
              "使你的防御技能提高16点。",
              "使你的防御技能提高20点。"
            ]
          },
          {
            "id": "w_imp_revenge",
            "name": "强化复仇",
            "icon": "ability_warrior_revenge",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的复仇技能造成的伤害提高20%。",
              "使你的复仇技能造成的伤害提高40%。",
              "使你的复仇技能造成的伤害提高60%。"
            ]
          },
          {
            "id": "w_imp_thunder",
            "name": "强化雷霆一击",
            "icon": "ability_thunderclap",
            "row": 2,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的雷霆一击技能消耗的怒气减少2点。",
              "使你的雷霆一击技能消耗的怒气减少4点。",
              "使你的雷霆一击技能消耗的怒气减少6点。"
            ]
          },
          {
            "id": "w_last_stand",
            "name": "破釜沉舟",
            "icon": "spell_holy_ashestoashes",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后，该技能会使你暂时获得相当于最大生命值30%的生命值，持续20秒。效果结束后会失去这些生命值。"
            ]
          },
          {
            "id": "t1310316",
            "name": "防御大师",
            "icon": "ability_warrior_shieldguard",
            "row": 3,
            "col": 2,
            "max": 2,
            "prereq": "w_shield_spec",
            "ranks": [
              "使你有50%的几率在装备盾牌并躲闪或招架时产生5点怒气。",
              "使你有100%的几率在装备盾牌并躲闪或招架时产生5点怒气。"
            ]
          },
          {
            "id": "w_imp_disarm",
            "name": "强化缴械",
            "icon": "ability_warrior_disarm",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的缴械技能冷却时间缩短7秒。",
              "使你的缴械技能冷却时间缩短13秒。",
              "使你的缴械技能冷却时间缩短20秒。"
            ]
          },
          {
            "id": "w_defiance",
            "name": "挑衅",
            "icon": "ability_warrior_innerrage",
            "row": 3,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "装备盾牌时，在防御姿态下产生的所有威胁值额外提高7%。",
              "装备盾牌时，在防御姿态下产生的所有威胁值额外提高13%。",
              "装备盾牌时，在防御姿态下产生的所有威胁值额外提高20%。"
            ]
          },
          {
            "id": "t12308",
            "name": "强化破甲攻击",
            "icon": "ability_warrior_sunder",
            "row": 4,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的破甲攻击消耗的怒气减少1点。",
              "使你的破甲攻击消耗的怒气减少2点。",
              "使你的破甲攻击消耗的怒气减少3点。"
            ]
          },
          {
            "id": "t1310317",
            "name": "先锋",
            "icon": "ability_warrior_shieldcharge",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "你的冲锋技能现在可以在防御姿态下使用。"
            ]
          },
          {
            "id": "w_imp_shield_bash",
            "name": "强化盾击",
            "icon": "ability_warrior_shieldbash",
            "row": 4,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的盾击技能有50%的几率令目标沉默3秒。",
              "使你的盾击技能有100%的几率令目标沉默3秒。"
            ]
          },
          {
            "id": "w_imp_shield_wall",
            "name": "强化盾墙",
            "icon": "ability_warrior_shieldwall",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的盾墙技能的冷却时间缩短5.5分钟。",
              "使你的盾墙技能的冷却时间缩短11分钟。"
            ]
          },
          {
            "id": "w_concussion_blow",
            "name": "震荡猛击",
            "icon": "ability_thunderbolt",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使目标昏迷，持续5秒。"
            ]
          },
          {
            "id": "t29787",
            "name": "怒火聚焦",
            "icon": "ability_warrior_focusedrage",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的进攻技能消耗的怒气降低1点。",
              "使你的进攻技能消耗的怒气降低2点。",
              "使你的进攻技能消耗的怒气降低3点。"
            ]
          },
          {
            "id": "t16538",
            "name": "坚城",
            "icon": "inv_shield_04",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "装备盾牌时，你造成的所有伤害提高2%。",
              "装备盾牌时，你造成的所有伤害提高4%。",
              "装备盾牌时，你造成的所有伤害提高6%。",
              "装备盾牌时，你造成的所有伤害提高8%。",
              "装备盾牌时，你造成的所有伤害提高10%。"
            ]
          },
          {
            "id": "w_shield_slam",
            "name": "盾牌猛击",
            "icon": "inv_shield_05",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "w_concussion_blow",
            "ranks": [
              "用盾牌猛击目标，造成421到439点伤害，该伤害受格挡值加成，并有50%的几率驱散目标身上的1个魔法效果。产生极高的威胁。"
            ]
          }
        ]
      }
    ]
  },
  "paladin": {
    "name": "圣骑士",
    "icon": "🛡️",
    "classIcon": "class_paladin",
    "presets": [
      {
        "name": "奶骑 (32/7/12)",
        "desc": "游戏内主流推荐加点 · 神圣 32 / 防护 7 / 惩戒 12 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "p_spiritual_focus": 5,
          "p_healing_light": 3,
          "t1310899": 2,
          "t429144": 2,
          "t20216": 1,
          "t20210": 5,
          "t1237268": 2,
          "t426065": 2,
          "t1328548": 1,
          "p_holy_shock": 1,
          "t1328550": 2,
          "p_holy_power": 5,
          "p_light_watch": 1,
          "t20257": 5,
          "t20174": 2,
          "t20101": 5,
          "p_imp_judgment": 2,
          "p_conviction": 3,
          "p_pursuit_justice": 2
        }
      },
      {
        "name": "防骑 (12/32/7)",
        "desc": "游戏内主流推荐加点 · 神圣 12 / 防护 32 / 惩戒 7 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t20262": 5,
          "t20224": 5,
          "t1237268": 2,
          "p_redoubt": 5,
          "p_precision": 3,
          "t1224697": 2,
          "t1311015": 1,
          "t20150": 2,
          "p_toughness": 2,
          "t1310994": 1,
          "p_imp_righteous_fury": 3,
          "t20096": 3,
          "p_holy_shield": 1,
          "p_reckoning": 5,
          "t1311034": 3,
          "t1328544": 1,
          "p_deflection": 5,
          "p_imp_judgment": 2
        }
      },
      {
        "name": "惩戒骑 (14/6/31)",
        "desc": "游戏内主流推荐加点 · 神圣 14 / 防护 6 / 惩戒 31 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t20262": 5,
          "t1310899": 2,
          "t20224": 5,
          "t1237268": 2,
          "t20257": 5,
          "p_precision": 1,
          "t20101": 5,
          "p_imp_judgment": 2,
          "p_conviction": 3,
          "t1311074": 3,
          "t9453": 1,
          "p_seal_of_command": 1,
          "p_pursuit_justice": 2,
          "t1311087": 1,
          "p_two_hand_spec": 3,
          "t20066": 1,
          "p_vengeance": 3,
          "t1311084": 5,
          "t1310735": 1
        }
      }
    ],
    "trees": [
      {
        "id": "holy",
        "name": "神圣",
        "skills": [
          {
            "id": "p_spiritual_focus",
            "name": "精神集中",
            "icon": "spell_arcane_blink",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的圣光闪现、圣光术和圣光守望有14%的几率在受到伤害时不损失施法时间。",
              "使你的圣光闪现、圣光术和圣光守望有28%的几率在受到伤害时不损失施法时间。",
              "使你的圣光闪现、圣光术和圣光守望有42%的几率在受到伤害时不损失施法时间。",
              "使你的圣光闪现、圣光术和圣光守望有56%的几率在受到伤害时不损失施法时间。",
              "使你的圣光闪现、圣光术和圣光守望有70%的几率在受到伤害时不损失施法时间。"
            ]
          },
          {
            "id": "t20262",
            "name": "神圣之力",
            "icon": "ability_golemthunderclap",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的力量提高2%。",
              "使你的力量提高4%。",
              "使你的力量提高6%。",
              "使你的力量提高8%。",
              "使你的力量提高10%。"
            ]
          },
          {
            "id": "p_healing_light",
            "name": "治疗之光",
            "icon": "spell_holy_holybolt",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的圣光术、圣光闪现和神圣震击的治疗量提高4%。",
              "使你的圣光术、圣光闪现和神圣震击的治疗量提高8%。",
              "使你的圣光术、圣光闪现和神圣震击的治疗量提高12%。"
            ]
          },
          {
            "id": "t1310899",
            "name": "敬畏",
            "icon": "spell_holy_divineillumination",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你在施法时仍保持15%的法力值恢复速度。",
              "使你在施法时仍保持30%的法力值恢复速度。"
            ]
          },
          {
            "id": "t20224",
            "name": "强化圣印",
            "icon": "ability_thunderbolt",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的圣印和审判造成的伤害提高3%。",
              "使你的圣印和审判造成的伤害提高6%。",
              "使你的圣印和审判造成的伤害提高9%。",
              "使你的圣印和审判造成的伤害提高12%。",
              "使你的圣印和审判造成的伤害提高15%。"
            ]
          },
          {
            "id": "t429144",
            "name": "净化之力",
            "icon": "spell_holy_purifyingpower",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的清洁术和纯净术法力消耗降低10%，并使驱邪术和神圣愤怒的冷却时间缩短17%。",
              "使你的清洁术和纯净术法力消耗降低20%，并使驱邪术和神圣愤怒的冷却时间缩短33%。"
            ]
          },
          {
            "id": "t20216",
            "name": "神恩术",
            "icon": "spell_holy_heal",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活之后，使你的下一个圣光闪现、圣光术或神圣震击有100%的几率造成极效治疗效果。"
            ]
          },
          {
            "id": "t20210",
            "name": "启发",
            "icon": "spell_holy_greaterheal",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": "t1310899",
            "ranks": [
              "在你的圣光闪现、圣光术、圣光守夜或神圣震击治疗法术造成爆击效果后，你有20%的几率回复相当于该法术基础消耗50%的法力值。",
              "在你的圣光闪现、圣光术、圣光守夜或神圣震击治疗法术造成爆击效果后，你有40%的几率回复相当于该法术基础消耗50%的法力值。",
              "在你的圣光闪现、圣光术、圣光守夜或神圣震击治疗法术造成爆击效果后，你有60%的几率回复相当于该法术基础消耗50%的法力值。",
              "在你的圣光闪现、圣光术、圣光守夜或神圣震击治疗法术造成爆击效果后，你有80%的几率回复相当于该法术基础消耗50%的法力值。",
              "在你的圣光闪现、圣光术、圣光守夜或神圣震击治疗法术造成爆击效果后，你有100%的几率回复相当于该法术基础消耗50%的法力值。"
            ]
          },
          {
            "id": "t1237268",
            "name": "神圣导能",
            "icon": "spell_holy_devineaegis",
            "row": 3,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的奉献、神圣愤怒、驱邪术和愤怒之锤法力消耗降低20%。",
              "使你的奉献、神圣愤怒、驱邪术和愤怒之锤法力消耗降低40%。"
            ]
          },
          {
            "id": "t1310904",
            "name": "神圣精准",
            "icon": "spell_holy_mindsooth",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的神圣法术命中几率提高4%，并使你受到的沉默效果的持续时间缩短10%。",
              "使你的神圣法术命中几率提高8%，并使你受到的沉默效果的持续时间缩短20%。"
            ]
          },
          {
            "id": "t426065",
            "name": "圣光灌注",
            "icon": "ability_paladin_infusionoflight",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "你的神圣震击和圣光闪现造成爆击时，使你在15秒内下一次圣光术的施法时间缩短0.5秒。",
              "你的神圣震击和圣光闪现造成爆击时，使你在15秒内下一次圣光术的施法时间缩短1秒。"
            ]
          },
          {
            "id": "t1328548",
            "name": "圣光誓约",
            "icon": "spell_holy_greaterblessingoflight",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "立誓守护一名友方目标，持续5分钟。你对其施放圣光术的治疗量最多提高400点，圣光闪现的治疗量最多提高115点，神圣震击的治疗量最多提高230点。每名圣骑士同一时间只能立下一个圣光誓约。"
            ]
          },
          {
            "id": "t1310905",
            "name": "奉献之地",
            "icon": "spell_holy_innerfire",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的神圣法术对最先进入你的奉献的4个敌人造成的伤害提高5%。",
              "使你的神圣法术对最先进入你的奉献的4个敌人造成的伤害提高10%。"
            ]
          },
          {
            "id": "p_holy_shock",
            "name": "神圣震击",
            "icon": "spell_holy_searinglight",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "以神圣能量冲击目标，对一个敌人造成129到139点神圣伤害，或者为一个友方目标恢复110到118点生命值。"
            ]
          },
          {
            "id": "t1328550",
            "name": "无垠圣光",
            "icon": "ability_paladin_sacredcleansing",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": "p_holy_shock",
            "ranks": [
              "对未受到你的圣光誓约影响的盟友施放神圣震击时，其爆击几率提高15%。",
              "对未受到你的圣光誓约影响的盟友施放神圣震击时，其爆击几率提高30%。"
            ]
          },
          {
            "id": "p_holy_power",
            "name": "神圣强化",
            "icon": "spell_holy_power",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的神圣法术的爆击治疗加成提高10%。",
              "使你的神圣法术的爆击治疗加成提高20%。",
              "使你的神圣法术的爆击治疗加成提高30%。",
              "使你的神圣法术的爆击治疗加成提高40%。",
              "使你的神圣法术的爆击治疗加成提高50%。"
            ]
          },
          {
            "id": "p_light_watch",
            "name": "圣光守望",
            "icon": "ability_paladin_judgementofthepure",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "p_holy_shock",
            "ranks": [
              "对友方目标施加圣光守望，持续30秒。你对其施放的下一个神圣震击不触发冷却，并为目标及其小队恢复326到344点生命值。你在每个小队中最多可同时维持一个圣光守望。"
            ]
          }
        ]
      },
      {
        "id": "protection",
        "name": "防护",
        "skills": [
          {
            "id": "t20257",
            "name": "神圣智慧",
            "icon": "spell_nature_sleep",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的智力值上限提高2%。",
              "使你的智力值上限提高4%。",
              "使你的智力值上限提高6%。",
              "使你的智力值上限提高8%。",
              "使你的智力值上限提高10%。"
            ]
          },
          {
            "id": "p_redoubt",
            "name": "盾牌壁垒",
            "icon": "ability_defend",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "对你造成伤害的近战攻击有10%的几率使你的格挡几率提高6%。持续10秒或格挡5次。",
              "对你造成伤害的近战攻击有10%的几率使你的格挡几率提高12%。持续10秒或格挡5次。",
              "对你造成伤害的近战攻击有10%的几率使你的格挡几率提高18%。持续10秒或格挡5次。",
              "对你造成伤害的近战攻击有10%的几率使你的格挡几率提高24%。持续10秒或格挡5次。",
              "对你造成伤害的近战攻击有10%的几率使你的格挡几率提高30%。持续10秒或格挡5次。"
            ]
          },
          {
            "id": "p_precision",
            "name": "精确",
            "icon": "ability_rogue_ambush",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你击中目标的几率提高1%。",
              "使你击中目标的几率提高2%。",
              "使你击中目标的几率提高3%。"
            ]
          },
          {
            "id": "t20174",
            "name": "守护者的宠爱",
            "icon": "spell_holy_sealofprotection",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的保护祝福冷却时间缩短1分钟，并使自由祝福持续时间延长3秒。",
              "使你的保护祝福冷却时间缩短2分钟，并使自由祝福持续时间延长6秒。"
            ]
          },
          {
            "id": "t1224697",
            "name": "神圣职责",
            "icon": "spell_holy_divineintervention",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使圣盾术、圣佑术和圣殿骑士壁垒的冷却时间缩短30秒，并使自律的持续时间缩短5秒。",
              "使圣盾术、圣佑术和圣殿骑士壁垒的冷却时间缩短60秒，并使自律的持续时间缩短10秒。"
            ]
          },
          {
            "id": "t1311015",
            "name": "圣殿骑士壁垒",
            "icon": "ability_paladin_shieldofthetemplar",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后，获得相当于你最大生命值100%的吸收护盾，持续8秒。施加自律，持续1分钟。自律效果激活时无法施放。"
            ]
          },
          {
            "id": "p_imp_hoj",
            "name": "强化制裁之锤",
            "icon": "spell_holy_sealofmight",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的制裁之锤的冷却时间减少5秒。",
              "使你的制裁之锤的冷却时间减少10秒。",
              "使你的制裁之锤的冷却时间减少15秒。"
            ]
          },
          {
            "id": "t20150",
            "name": "盾牌专精",
            "icon": "inv_shield_06",
            "row": 3,
            "col": 3,
            "max": 2,
            "prereq": "p_redoubt",
            "ranks": [
              "使你的盾牌吸收的伤害提高15%，并使你的格挡有50%的几率恢复最大法力值的4%。每3秒最多触发一次。",
              "使你的盾牌吸收的伤害提高30%，并使你的格挡有100%的几率恢复最大法力值的4%。每3秒最多触发一次。"
            ]
          },
          {
            "id": "p_toughness",
            "name": "坚韧",
            "icon": "spell_holy_devotion",
            "row": 3,
            "col": 4,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你因装备而获得的护甲值提高2%。",
              "使你因装备而获得的护甲值提高4%。",
              "使你因装备而获得的护甲值提高6%。",
              "使你因装备而获得的护甲值提高8%。",
              "使你因装备而获得的护甲值提高10%。"
            ]
          },
          {
            "id": "t1310994",
            "name": "迅捷审判",
            "icon": "ability_paladin_judgementred",
            "row": 4,
            "col": 1,
            "max": 1,
            "prereq": "t1311015",
            "ranks": [
              "Unleash the energy of a Seal spell upon an enemy. Does not consume the Seal. Refer to individual Seals for Judgement effect. Does not share a cooldown with your Judgement ability."
            ]
          },
          {
            "id": "p_imp_righteous_fury",
            "name": "强化正义之怒",
            "icon": "spell_holy_sealoffury",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "当正义之怒处于激活状态时，你所承受的一切伤害降低3%。",
              "当正义之怒处于激活状态时，你所承受的一切伤害降低6%。",
              "当正义之怒处于激活状态时，你所承受的一切伤害降低9%。"
            ]
          },
          {
            "id": "t20096",
            "name": "预知",
            "icon": "spell_magic_lesserinvisibilty",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的防御技能提高4点。",
              "使你的防御技能提高8点。",
              "使你的防御技能提高12点。",
              "使你的防御技能提高16点。",
              "使你的防御技能提高20点。"
            ]
          },
          {
            "id": "t1328546",
            "name": "坚忍",
            "icon": "spell_holy_stoicism",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你受到的昏迷和魅惑效果的持续时间缩短10%。",
              "使你受到的昏迷和魅惑效果的持续时间缩短20%。"
            ]
          },
          {
            "id": "p_holy_shield",
            "name": "神圣之盾",
            "icon": "spell_holy_blessingofprotection",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你的格挡几率提高30%，持续10秒。在此期间每次成功格挡都会对攻击者造成75点神圣伤害。神圣之盾造成的伤害额外产生20%的威胁值。每次格挡消耗一层充能。共4层。"
            ]
          },
          {
            "id": "p_reckoning",
            "name": "清算",
            "icon": "spell_holy_blessingofstrength",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你在格挡后有8%的几率获得一次额外攻击，受到非周期性爆击之后有20%的几率获得一次额外攻击。最多可储存4次额外攻击。格挡触发此效果的频率最多为每1.5秒一次。",
              "使你在格挡后有16%的几率获得一次额外攻击，受到非周期性爆击之后有40%的几率获得一次额外攻击。最多可储存4次额外攻击。格挡触发此效果的频率最多为每1.5秒一次。",
              "使你在格挡后有24%的几率获得一次额外攻击，受到非周期性爆击之后有60%的几率获得一次额外攻击。最多可储存4次额外攻击。格挡触发此效果的频率最多为每1.5秒一次。",
              "使你在格挡后有32%的几率获得一次额外攻击，受到非周期性爆击之后有80%的几率获得一次额外攻击。最多可储存4次额外攻击。格挡触发此效果的频率最多为每1.5秒一次。",
              "使你在格挡后有40%的几率获得一次额外攻击，受到非周期性爆击之后有100%的几率获得一次额外攻击。最多可储存4次额外攻击。格挡触发此效果的频率最多为每1.5秒一次。"
            ]
          },
          {
            "id": "t1311034",
            "name": "钢铁信条",
            "icon": "spell_holy_improvedresistanceauras",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的神圣打击产生的威胁值提高10%。在正义之怒激活时，神圣打击还会使你受到的伤害降低2%，持续6秒。",
              "使你的神圣打击产生的威胁值提高20%。在正义之怒激活时，神圣打击还会使你受到的伤害降低4%，持续6秒。",
              "使你的神圣打击产生的威胁值提高30%。在正义之怒激活时，神圣打击还会使你受到的伤害降低6%，持续6秒。"
            ]
          },
          {
            "id": "t1328544",
            "name": "以盾为誓",
            "icon": "spell_holy_greaterblessingofsanctuary",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "p_holy_shield",
            "ranks": [
              "Reduces the cooldown of your Holy Strike ability by 4 sec. Additionally, Holy Strike now strikes with your shield, triggering your active Holy Shield and Shield Specialization talents without consuming their charges or triggering their cooldowns, and allowing you to Block spells for 6 sec."
            ]
          }
        ]
      },
      {
        "id": "retribution",
        "name": "惩戒",
        "skills": [
          {
            "id": "p_deflection",
            "name": "偏斜",
            "icon": "ability_parry",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的招架几率提高1%。",
              "使你的招架几率提高2%。",
              "使你的招架几率提高3%。",
              "使你的招架几率提高4%。",
              "使你的招架几率提高5%。"
            ]
          },
          {
            "id": "t20101",
            "name": "祈福",
            "icon": "spell_frost_windwalkon",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你所有瞬发法术和技能所消耗的法力值降低2%。",
              "使你所有瞬发法术和技能所消耗的法力值降低4%。",
              "使你所有瞬发法术和技能所消耗的法力值降低6%。",
              "使你所有瞬发法术和技能所消耗的法力值降低8%。",
              "使你所有瞬发法术和技能所消耗的法力值降低10%。"
            ]
          },
          {
            "id": "p_imp_judgment",
            "name": "强化审判",
            "icon": "spell_holy_righteousfury",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的审判技能冷却时间缩短1秒。",
              "使你的审判技能冷却时间缩短2秒。"
            ]
          },
          {
            "id": "p_conviction",
            "name": "定罪",
            "icon": "spell_holy_retributionaura",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的所有法术和攻击的爆击几率提高2%。",
              "使你的所有法术和攻击的爆击几率提高4%。",
              "使你的所有法术和攻击的爆击几率提高6%。"
            ]
          },
          {
            "id": "t1311074",
            "name": "神圣审判",
            "icon": "ability_paladin_judgementblue",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的审判有33%几率返还被审判圣印法力消耗的20%。",
              "使你的审判有66%几率返还被审判圣印法力消耗的40%。",
              "使你的审判有100%几率返还被审判圣印法力消耗的60%。"
            ]
          },
          {
            "id": "t9452",
            "name": "辩护",
            "icon": "spell_holy_vindication",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的伤害性近战攻击有几率令目标的攻击强度降低68点，持续30秒。",
              "使你的伤害性近战攻击有几率令目标的攻击强度降低136点，持续30秒。",
              "使你的伤害性近战攻击有几率令目标的攻击强度降低204点，持续30秒。"
            ]
          },
          {
            "id": "t9453",
            "name": "不灭信仰",
            "icon": "spell_holy_unyieldingfaith",
            "row": 3,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你受到的恐惧和迷惑效果的持续时间缩短15%。",
              "使你受到的恐惧和迷惑效果的持续时间缩短30%。"
            ]
          },
          {
            "id": "p_seal_of_command",
            "name": "命令圣印",
            "icon": "ability_warrior_innerrage",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使圣骑士在攻击时有一定几率对目标造成与攻击伤害的70%等量的神圣伤害。圣骑士在同一时间内只能激活一种圣印。持续30秒。 释放这种圣印的能量将对目标造成审判效果，对其立刻造成68.9点神圣伤害，若目标昏迷或瘫痪则造成138到146点神圣伤害。"
            ]
          },
          {
            "id": "p_pursuit_justice",
            "name": "正义追击",
            "icon": "spell_holy_persuitofjustice",
            "row": 3,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的移动速度和坐骑移动速度提高8%。这个效果不与其它同类效果叠加。",
              "使你的移动速度和坐骑移动速度提高15%。这个效果不与其它同类效果叠加。"
            ]
          },
          {
            "id": "p_eye_for_eye",
            "name": "以眼还眼",
            "icon": "spell_holy_eyeforaneye",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "所有对你造成的爆击也会对攻击者造成相当于你所受伤害5%的伤害。以眼还眼造成的伤害不会超过圣骑士总生命值的50%。",
              "所有对你造成的爆击也会对攻击者造成相当于你所受伤害10%的伤害。以眼还眼造成的伤害不会超过圣骑士总生命值的50%。"
            ]
          },
          {
            "id": "t1311087",
            "name": "神圣仲裁者",
            "icon": "inv_sword_08",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你的神圣打击造成的伤害提高20%，并刷新目标身上的所有审判效果。"
            ]
          },
          {
            "id": "p_two_hand_spec",
            "name": "双手武器专精",
            "icon": "inv_hammer_04",
            "row": 4,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "装备双手近战武器时，你造成的物理和神圣伤害提高2%，产生的所有威胁值降低7%。",
              "装备双手近战武器时，你造成的物理和神圣伤害提高4%，产生的所有威胁值降低14%。",
              "装备双手近战武器时，你造成的物理和神圣伤害提高6%，产生的所有威胁值降低20%。"
            ]
          },
          {
            "id": "t1328370",
            "name": "Turn Evil",
            "icon": "spell_holy_turnundead",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "Reduces the cast time of your Turn Undead spell by 0.5 sec, its cooldown by 5 sec, and allows it to affect Demons.",
              "Reduces the cast time of your Turn Undead spell by 1 sec, its cooldown by 10 sec, and allows it to affect Demons."
            ]
          },
          {
            "id": "t20066",
            "name": "忏悔",
            "icon": "spell_holy_prayerofhealing",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使敌方目标进入冥想状态，最多瘫痪6秒。造成任何伤害都会唤醒目标。只对人型生物有效。"
            ]
          },
          {
            "id": "p_vengeance",
            "name": "复仇",
            "icon": "ability_racial_avatar",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": "p_seal_of_command",
            "ranks": [
              "造成非周期性爆击后，你造成的物理和神圣伤害提高1%，持续30秒。最多叠加5次。",
              "造成非周期性爆击后，你造成的物理和神圣伤害提高2%，持续30秒。最多叠加5次。",
              "造成非周期性爆击后，你造成的物理和神圣伤害提高3%，持续30秒。最多叠加5次。"
            ]
          },
          {
            "id": "t1311084",
            "name": "光芒勇士",
            "icon": "ability_paladin_enlightenedjudgements",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的法术伤害最多提高相当于你智力12%的数值，并使你的愤怒之锤的施法时间缩短0.2秒。",
              "使你的法术伤害最多提高相当于你智力24%的数值，并使你的愤怒之锤的施法时间缩短0.4秒。",
              "使你的法术伤害最多提高相当于你智力36%的数值，并使你的愤怒之锤的施法时间缩短0.6秒。",
              "使你的法术伤害最多提高相当于你智力48%的数值，并使你的愤怒之锤的施法时间缩短0.8秒。",
              "使你的法术伤害最多提高相当于你智力60%的数值，并使你的愤怒之锤的施法时间缩短1秒。"
            ]
          },
          {
            "id": "t1310735",
            "name": "解封之怒",
            "icon": "spell_holy_blessedresillience",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "t20066",
            "ranks": [
              "你的近战攻击会储存当前激活圣印的一个副本，持续15秒，最多可叠加3层。使用不同的圣印进行攻击并命中时，会消耗所有层数，每层分别按正常几率尝试触发储存的圣印。"
            ]
          }
        ]
      }
    ]
  },
  "hunter": {
    "name": "猎人",
    "icon": "🏹",
    "classIcon": "class_hunter",
    "presets": [
      {
        "name": "兽王猎 (31/16/4)",
        "desc": "游戏内主流推荐加点 · 野兽控制 31 / 射击 16 / 生存 4 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t19552": 5,
          "h_endurance_training": 3,
          "t1223755": 2,
          "t19596": 1,
          "h_unleashed_fury": 5,
          "h_ferocity": 5,
          "t1293241": 1,
          "h_intimidation": 1,
          "t19590": 2,
          "h_frenzy": 5,
          "h_bestial_wrath": 1,
          "t19426": 5,
          "t1310661": 3,
          "h_efficiency": 2,
          "t1223984": 5,
          "h_trueshot": 1,
          "t24293": 4
        }
      },
      {
        "name": "射击猎 (5/41/5)",
        "desc": "游戏内主流推荐加点 · 野兽控制 5 / 射击 41 / 生存 5 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t19552": 5,
          "t19426": 5,
          "t1310661": 3,
          "h_efficiency": 4,
          "t1223984": 5,
          "t415405": 2,
          "t19454": 5,
          "h_lone_wolf": 1,
          "h_trueshot": 1,
          "h_mortal_shots": 5,
          "t1223987": 2,
          "h_barrage": 2,
          "h_ranged_spec": 5,
          "t1310687": 1,
          "t24293": 5
        }
      },
      {
        "name": "生存猎 (0/20/31)",
        "desc": "游戏内主流推荐加点 · 野兽控制 0 / 射击 20 / 生存 31 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t19426": 5,
          "t1310661": 3,
          "t1223984": 5,
          "t19454": 1,
          "h_lone_wolf": 1,
          "h_trueshot": 1,
          "h_mortal_shots": 4,
          "t24293": 5,
          "h_deflection": 3,
          "h_savage_strikes": 2,
          "t19239": 2,
          "h_surefooted": 3,
          "t1310627": 5,
          "t440529": 2,
          "t1310532": 2,
          "t1317257": 1,
          "h_lightning_reflexes": 5,
          "t1310533": 1
        }
      }
    ],
    "trees": [
      {
        "id": "beast-mastery",
        "name": "野兽控制",
        "skills": [
          {
            "id": "t19552",
            "name": "致命守护",
            "icon": "spell_nature_ravenform",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "雄鹰守护激活时，自动射击有2%的几率使远程攻击速度提高30%，持续12秒。野兽守护激活时，所有近战自动攻击都有2%的几率使近战攻击速度提高30%，持续12秒。",
              "雄鹰守护激活时，自动射击有4%的几率使远程攻击速度提高30%，持续12秒。野兽守护激活时，所有近战自动攻击都有4%的几率使近战攻击速度提高30%，持续12秒。",
              "雄鹰守护激活时，自动射击有6%的几率使远程攻击速度提高30%，持续12秒。野兽守护激活时，所有近战自动攻击都有6%的几率使近战攻击速度提高30%，持续12秒。",
              "雄鹰守护激活时，自动射击有8%的几率使远程攻击速度提高30%，持续12秒。野兽守护激活时，所有近战自动攻击都有8%的几率使近战攻击速度提高30%，持续12秒。",
              "雄鹰守护激活时，自动射击有10%的几率使远程攻击速度提高30%，持续12秒。野兽守护激活时，所有近战自动攻击都有10%的几率使近战攻击速度提高30%，持续12秒。"
            ]
          },
          {
            "id": "h_endurance_training",
            "name": "耐久训练",
            "icon": "spell_nature_reincarnation",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的宠物生命值和护甲提高3%。",
              "使你的宠物生命值和护甲提高6%。",
              "使你的宠物生命值和护甲提高9%。",
              "使你的宠物生命值和护甲提高12%。",
              "使你的宠物生命值和护甲提高15%。"
            ]
          },
          {
            "id": "t1223755",
            "name": "集中火力",
            "icon": "inv_weapon_crossbow_10",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "宠物激活时，使你和宠物造成的所有伤害提高1%。",
              "宠物激活时，使你和宠物造成的所有伤害提高2%。"
            ]
          },
          {
            "id": "t19549",
            "name": "强化灵猴守护",
            "icon": "ability_hunter_aspectofthemonkey",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的灵猴守护提供的躲闪加成提高2%。此外，你的宠物获得灵猴守护效果的50%。",
              "使你的灵猴守护提供的躲闪加成提高4%。此外，你的宠物获得灵猴守护效果的50%。",
              "使你的灵猴守护提供的躲闪加成提高6%。此外，你的宠物获得灵猴守护效果的50%。"
            ]
          },
          {
            "id": "t24443",
            "name": "强化复活宠物",
            "icon": "ability_hunter_beastsoothe",
            "row": 2,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的复活宠物法术的施法时间减少3秒，法力值消耗降低20%，宠物复活后的生命值提高15%。",
              "使你的复活宠物法术的施法时间减少6秒，法力值消耗降低40%，宠物复活后的生命值提高30%。"
            ]
          },
          {
            "id": "h_pathfinding",
            "name": "寻路",
            "icon": "ability_mount_jungletiger",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的猎豹守护和豹群守护的速度加成效果提高3%。",
              "使你的猎豹守护和豹群守护的速度加成效果提高6%。"
            ]
          },
          {
            "id": "t19596",
            "name": "野兽迅捷",
            "icon": "ability_druid_dash",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你的宠物移动速度提高30%。"
            ]
          },
          {
            "id": "h_unleashed_fury",
            "name": "狂怒释放",
            "icon": "ability_bullrush",
            "row": 3,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的宠物和雄鹰造成的伤害提高3%。",
              "使你的宠物和雄鹰造成的伤害提高6%。",
              "使你的宠物和雄鹰造成的伤害提高9%。",
              "使你的宠物和雄鹰造成的伤害提高12%。",
              "使你的宠物和雄鹰造成的伤害提高15%。"
            ]
          },
          {
            "id": "t19572",
            "name": "强化治疗宠物",
            "icon": "ability_hunter_mendpet",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的治疗宠物每次治疗时有15%的几率净化宠物身上的1个诅咒、疾病、魔法或中毒效果，并使法力消耗降低10%。",
              "使你的治疗宠物每次治疗时有50%的几率净化宠物身上的1个诅咒、疾病、魔法或中毒效果，并使法力消耗降低20%。"
            ]
          },
          {
            "id": "h_ferocity",
            "name": "凶暴",
            "icon": "inv_misc_monsterclaw_04",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的宠物和雄鹰的爆击几率提高2%。",
              "使你的宠物和雄鹰的爆击几率提高4%。",
              "使你的宠物和雄鹰的爆击几率提高6%。",
              "使你的宠物和雄鹰的爆击几率提高8%。",
              "使你的宠物和雄鹰的爆击几率提高10%。"
            ]
          },
          {
            "id": "t1293241",
            "name": "召唤雄鹰",
            "icon": "ability_hunter_animalhandler",
            "row": 4,
            "col": 4,
            "max": 1,
            "prereq": null,
            "ranks": [
              "命令一只雄鹰俯冲轰炸目标敌人，造成32点物理伤害并继续攻击18秒。同时最多只能激活2只雄鹰。召唤雄鹰与奥术射击共享冷却时间。"
            ]
          },
          {
            "id": "h_spirit_bond",
            "name": "灵魂联结",
            "icon": "ability_druid_demoralizingroar",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "当你的宠物被激活后，你和你的宠物都会每10秒回复1%的生命值。",
              "当你的宠物被激活后，你和你的宠物都会每5秒回复1%的生命值。"
            ]
          },
          {
            "id": "h_intimidation",
            "name": "胁迫",
            "icon": "ability_devour",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": "t19596",
            "ranks": [
              "命令你的宠物在下次成功攻击时使目标昏迷3秒，且该次攻击的爆击几率提高100%。产生大量威胁值。"
            ]
          },
          {
            "id": "t19590",
            "name": "野兽戒律",
            "icon": "spell_nature_abolishmagic",
            "row": 5,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的宠物的集中值回复速度提高10%，并使你在施法时仍可保持25%的法力回复。",
              "使你的宠物的集中值回复速度提高20%，并使你在施法时仍可保持50%的法力回复。"
            ]
          },
          {
            "id": "h_frenzy",
            "name": "狂乱",
            "icon": "inv_misc_monsterclaw_03",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": "h_ferocity",
            "ranks": [
              "使你的宠物有20%的几率在对敌人造成爆击后获得攻击速度提高30%的效果，持续8秒。",
              "使你的宠物有40%的几率在对敌人造成爆击后获得攻击速度提高30%的效果，持续8秒。",
              "使你的宠物有60%的几率在对敌人造成爆击后获得攻击速度提高30%的效果，持续8秒。",
              "使你的宠物有80%的几率在对敌人造成爆击后获得攻击速度提高30%的效果，持续8秒。",
              "使你的宠物有100%的几率在对敌人造成爆击后获得攻击速度提高30%的效果，持续8秒。"
            ]
          },
          {
            "id": "h_bestial_wrath",
            "name": "狂野怒火",
            "icon": "ability_druid_ferociousbite",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "h_intimidation",
            "ranks": [
              "使宠物进入疯狂状态，对目标造成的伤害提高50%，持续18秒。在这种状态下，宠物不会有任何恐惧或怜悯，也无法停止下来，除非被杀死。"
            ]
          }
        ]
      },
      {
        "id": "marksmanship",
        "name": "射击",
        "skills": [
          {
            "id": "h_hawk_eye",
            "name": "鹰眼",
            "icon": "ability_townwatch",
            "row": 1,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的远程武器的射程延长2码。",
              "使你的远程武器的射程延长4码。",
              "使你的远程武器的射程延长6码。"
            ]
          },
          {
            "id": "h_concussive_shot",
            "name": "强化震荡射击",
            "icon": "spell_frost_stun",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的震荡射击有4%的几率令目标昏迷3秒。",
              "使你的震荡射击有8%的几率令目标昏迷3秒。",
              "使你的震荡射击有12%的几率令目标昏迷3秒。",
              "使你的震荡射击有16%的几率令目标昏迷3秒。",
              "使你的震荡射击有20%的几率令目标昏迷3秒。"
            ]
          },
          {
            "id": "t19426",
            "name": "致命攻击",
            "icon": "ability_searingarrow",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的所有攻击造成爆击的几率提高1%。",
              "使你的所有攻击造成爆击的几率提高2%。",
              "使你的所有攻击造成爆击的几率提高3%。",
              "使你的所有攻击造成爆击的几率提高4%。",
              "使你的所有攻击造成爆击的几率提高5%。"
            ]
          },
          {
            "id": "t1310661",
            "name": "强化钉刺",
            "icon": "ability_hunter_quickshot",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的毒蛇钉刺伤害提高6%，蝰蛇钉刺冷却时间缩短2秒，毒蝎钉刺持续时间延长15秒。",
              "使你的毒蛇钉刺伤害提高13%，蝰蛇钉刺冷却时间缩短4秒，毒蝎钉刺持续时间延长30秒。",
              "使你的毒蛇钉刺伤害提高20%，蝰蛇钉刺冷却时间缩短6秒，毒蝎钉刺持续时间延长45秒。"
            ]
          },
          {
            "id": "h_efficiency",
            "name": "效率",
            "icon": "spell_frost_wizardmark",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的射击、钉刺和近战技能所消耗的法力值降低3%。",
              "使你的射击、钉刺和近战技能所消耗的法力值降低6%。",
              "使你的射击、钉刺和近战技能所消耗的法力值降低9%。",
              "使你的射击、钉刺和近战技能所消耗的法力值降低12%。",
              "使你的射击、钉刺和近战技能所消耗的法力值降低15%。"
            ]
          },
          {
            "id": "t1223984",
            "name": "精确瞄准",
            "icon": "ability_hunter_zenarchery",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的攻击强度提高，数值相当于你的智力值的20%。",
              "使你的攻击强度提高，数值相当于你的智力值的40%。",
              "使你的攻击强度提高，数值相当于你的智力值的60%。",
              "使你的攻击强度提高，数值相当于你的智力值的80%。",
              "使你的攻击强度提高，数值相当于你的智力值的100%。"
            ]
          },
          {
            "id": "t415405",
            "name": "疾速杀戮",
            "icon": "ability_hunter_rapidkilling",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的急速射击冷却时间缩短1分钟。此外，当你消灭一个能为你提供经验值或荣誉值的敌人，或其在受到你的毒蛇钉刺影响时死亡，你获得疾速杀戮，使你在20秒内的下一个射击技能造成的伤害提高10%。",
              "使你的急速射击冷却时间缩短2分钟。此外，当你消灭一个能为你提供经验值或荣誉值的敌人，或其在受到你的毒蛇钉刺影响时死亡，你获得疾速杀戮，使你在20秒内的下一个射击技能造成的伤害提高20%。"
            ]
          },
          {
            "id": "t19454",
            "name": "强化奥术射击",
            "icon": "ability_impalingbolt",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的奥术射击的冷却时间缩短0.3秒。不影响与奥术射击共享冷却时间的技能。",
              "使你的奥术射击的冷却时间缩短0.6秒。不影响与奥术射击共享冷却时间的技能。",
              "使你的奥术射击的冷却时间缩短0.9秒。不影响与奥术射击共享冷却时间的技能。",
              "使你的奥术射击的冷却时间缩短1.2秒。不影响与奥术射击共享冷却时间的技能。",
              "使你的奥术射击的冷却时间缩短1.5秒。不影响与奥术射击共享冷却时间的技能。"
            ]
          },
          {
            "id": "h_lone_wolf",
            "name": "独来独往",
            "icon": "ability_mount_whitedirewolf",
            "row": 3,
            "col": 4,
            "max": 1,
            "prereq": null,
            "ranks": [
              "没有激活的宠物时，你的所有攻击造成的伤害提高20%。"
            ]
          },
          {
            "id": "h_trueshot",
            "name": "强击光环",
            "icon": "ability_trueshot",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使45码内的小队或团队成员的远程攻击强度提高20点。"
            ]
          },
          {
            "id": "h_mortal_shots",
            "name": "致死射击",
            "icon": "ability_piercedamage",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": "t1223984",
            "ranks": [
              "使你所有远程技能的爆击伤害加成提高6%。",
              "使你所有远程技能的爆击伤害加成提高12%。",
              "使你所有远程技能的爆击伤害加成提高18%。",
              "使你所有远程技能的爆击伤害加成提高24%。",
              "使你所有远程技能的爆击伤害加成提高30%。"
            ]
          },
          {
            "id": "t1223987",
            "name": "急速恢复",
            "icon": "ability_hunter_rapidregeneration",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": "t415405",
            "ranks": [
              "对目标施加毒蛇钉刺使你在施法时仍保持25%的法力恢复速度，持续15秒。当疾速杀戮被消耗时，效果提升至50%。",
              "对目标施加毒蛇钉刺使你在施法时仍保持50%的法力恢复速度，持续15秒。当疾速杀戮被消耗时，效果提升至100%。"
            ]
          },
          {
            "id": "h_barrage",
            "name": "弹幕",
            "icon": "ability_upgrademoonglaive",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的多重射击、瞄准射击和乱射技能造成的伤害提高5%。",
              "使你的多重射击、瞄准射击和乱射技能造成的伤害提高10%。",
              "使你的多重射击、瞄准射击和乱射技能造成的伤害提高15%。"
            ]
          },
          {
            "id": "h_scatter_shot",
            "name": "驱散射击",
            "icon": "ability_golemstormbolt",
            "row": 5,
            "col": 4,
            "max": 1,
            "prereq": null,
            "ranks": [
              "短程射击，对目标造成50%的武器伤害，并使其困惑4秒。任何伤害都会打断该效果。使用之后结束你的攻击。"
            ]
          },
          {
            "id": "h_ranged_spec",
            "name": "远程武器专精",
            "icon": "inv_weapon_rifle_06",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的远程武器造成的伤害提高1%。",
              "使你的远程武器造成的伤害提高2%。",
              "使你的远程武器造成的伤害提高3%。",
              "使你的远程武器造成的伤害提高4%。",
              "使你的远程武器造成的伤害提高5%。"
            ]
          },
          {
            "id": "t1310687",
            "name": "狙击",
            "icon": "hunter_pvp_snipershot",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "h_trueshot",
            "ranks": [
              "一次长距离射击，造成远程伤害外加320点伤害，并使你接下来3次射击的射程延长10码，持续10秒。"
            ]
          }
        ]
      },
      {
        "id": "survival",
        "name": "生存",
        "skills": [
          {
            "id": "t24293",
            "name": "强化追踪",
            "icon": "inv_misc_head_dragon_black",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "在追踪野兽、恶魔、龙类、元素生物、巨人、人型生物或亡灵时，你对该被追踪生物类型造成的所有伤害提高1%。",
              "在追踪野兽、恶魔、龙类、元素生物、巨人、人型生物或亡灵时，你对该被追踪生物类型造成的所有伤害提高2%。",
              "在追踪野兽、恶魔、龙类、元素生物、巨人、人型生物或亡灵时，你对该被追踪生物类型造成的所有伤害提高3%。",
              "在追踪野兽、恶魔、龙类、元素生物、巨人、人型生物或亡灵时，你对该被追踪生物类型造成的所有伤害提高4%。",
              "在追踪野兽、恶魔、龙类、元素生物、巨人、人型生物或亡灵时，你对该被追踪生物类型造成的所有伤害提高5%。"
            ]
          },
          {
            "id": "h_deflection",
            "name": "偏斜",
            "icon": "ability_parry",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的招架几率提高1%。",
              "使你的招架几率提高2%。",
              "使你的招架几率提高3%。",
              "使你的招架几率提高4%。",
              "使你的招架几率提高5%。"
            ]
          },
          {
            "id": "h_entrapment",
            "name": "诱捕",
            "icon": "spell_nature_stranglevines",
            "row": 2,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "当你的陷阱被触发时，所有受影响的目标被诱捕，无法移动，持续1秒。",
              "当你的陷阱被触发时，所有受影响的目标被诱捕，无法移动，持续2秒。",
              "当你的陷阱被触发时，所有受影响的目标被诱捕，无法移动，持续3秒。",
              "当你的陷阱被触发时，所有受影响的目标被诱捕，无法移动，持续4秒。",
              "当你的陷阱被触发时，所有受影响的目标被诱捕，无法移动，持续5秒。"
            ]
          },
          {
            "id": "h_savage_strikes",
            "name": "野蛮打击",
            "icon": "ability_racial_bloodrage",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你所有近战技能的爆击几率提高2%。",
              "使你所有近战技能的爆击几率提高4%。"
            ]
          },
          {
            "id": "h_survivalist",
            "name": "生存专家",
            "icon": "spell_shadow_twilight",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的总生命值提高2%。",
              "使你的总生命值提高4%。",
              "使你的总生命值提高6%。",
              "使你的总生命值提高8%。",
              "使你的总生命值提高10%。"
            ]
          },
          {
            "id": "t19228",
            "name": "强化摔绊",
            "icon": "ability_rogue_trip",
            "row": 2,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的摔绊技能有7%的几率令目标在5秒内无法移动。",
              "使你的摔绊技能有13%的几率令目标在5秒内无法移动。",
              "使你的摔绊技能有20%的几率令目标在5秒内无法移动。"
            ]
          },
          {
            "id": "t19239",
            "name": "灵巧陷阱",
            "icon": "spell_nature_timestop",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的冰冻陷阱和冰霜陷阱的效果持续时间提高15%，献祭陷阱和爆炸陷阱所造成的伤害提高15%。",
              "使你的冰冻陷阱和冰霜陷阱的效果持续时间提高30%，献祭陷阱和爆炸陷阱所造成的伤害提高30%。"
            ]
          },
          {
            "id": "h_surefooted",
            "name": "稳固",
            "icon": "ability_kick",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的命中几率提高1%，并使你受到的移动限制效果的持续时间缩短10%。",
              "使你的命中几率提高2%，并使你受到的移动限制效果的持续时间缩短20%。",
              "使你的命中几率提高3%，并使你受到的移动限制效果的持续时间缩短30%。"
            ]
          },
          {
            "id": "h_deterrence",
            "name": "威慑",
            "icon": "ability_whirlwind",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活之后，使你的躲闪和招架几率提高25%，持续10秒。"
            ]
          },
          {
            "id": "t19376",
            "name": "生存战术",
            "icon": "ability_ensnare",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的陷阱和假死的命中几率提高5%。",
              "使你的陷阱和假死的命中几率提高10%。"
            ]
          },
          {
            "id": "t1310627",
            "name": "掠食者之锋",
            "icon": "ability_dualwield",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的近战技能爆击伤害提高6%，副手武器伤害提高10%。",
              "使你的近战技能爆击伤害提高12%，副手武器伤害提高20%。",
              "使你的近战技能爆击伤害提高18%，副手武器伤害提高30%。",
              "使你的近战技能爆击伤害提高24%，副手武器伤害提高40%。",
              "使你的近战技能爆击伤害提高30%，副手武器伤害提高50%。"
            ]
          },
          {
            "id": "h_counterattack",
            "name": "反击",
            "icon": "ability_warrior_challange",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": "h_deterrence",
            "ranks": [
              "招架对手的攻击后可使用。该攻击造成50%武器伤害外加26点伤害，并使目标无法移动5秒。反击无法被格挡、躲闪或招架。"
            ]
          },
          {
            "id": "t440529",
            "name": "游刃有余",
            "icon": "ability_hunter_resourcefulness",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的陷阱技能和近战技能消耗的法力值降低30%。此外，你的近战和远程技能爆击有50%的几率使你在施法时仍可保持50%的法力恢复速度，持续30秒。",
              "使你的陷阱技能和近战技能消耗的法力值降低60%。此外，你的近战和远程技能爆击有100%的几率使你在施法时仍可保持50%的法力恢复速度，持续30秒。"
            ]
          },
          {
            "id": "t1310532",
            "name": "暴露猎物",
            "icon": "ability_hunter_swiftstrike",
            "row": 5,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "对受猎人印记影响的敌人发动近战或远程攻击时，有5%的几率激活猫鼬撕咬。持续10秒。",
              "对受猎人印记影响的敌人发动近战或远程攻击时，有10%的几率激活猫鼬撕咬。持续10秒。"
            ]
          },
          {
            "id": "t1310496",
            "name": "生存专家的戒律",
            "icon": "ability_hunter_mastertactitian",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的陷阱和威慑技能的冷却时间缩短20%。",
              "使你的陷阱和威慑技能的冷却时间缩短40%。"
            ]
          },
          {
            "id": "t1317257",
            "name": "陆行鸟踢击",
            "icon": "ability_hunter_pet_tallstrider",
            "row": 5,
            "col": 4,
            "max": 1,
            "prereq": null,
            "ranks": [
              "一记强力踢击，造成100%近战武器伤害，并使移动速度提高30%，持续3秒。"
            ]
          },
          {
            "id": "h_lightning_reflexes",
            "name": "闪电反射",
            "icon": "spell_nature_invisibilty",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的敏捷提高3%。",
              "使你的敏捷提高6%。",
              "使你的敏捷提高9%。",
              "使你的敏捷提高12%。",
              "使你的敏捷提高15%。"
            ]
          },
          {
            "id": "t1310533",
            "name": "裂伤打击",
            "icon": "ability_gouge",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "t1310532",
            "ranks": [
              "你的猫鼬撕咬还会使目标流血，在21秒内造成相当于猫鼬撕咬伤害40%的伤害。"
            ]
          }
        ]
      }
    ]
  },
  "rogue": {
    "name": "潜行者",
    "icon": "🗡️",
    "classIcon": "class_rogue",
    "presets": [
      {
        "name": "刺杀贼 (31/19/1)",
        "desc": "游戏内主流推荐加点 · 奇袭 31 / 战斗 19 / 敏锐 1 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "r_malice": 5,
          "r_ruthlessness": 3,
          "r_imp_snd": 3,
          "r_vigor": 1,
          "t1329256": 1,
          "t14128": 2,
          "t16513": 3,
          "r_cold_blood": 1,
          "r_imp_poisons": 2,
          "r_rel_strikes": 5,
          "t1329328": 1,
          "r_seal_fate": 3,
          "r_mutilate": 1,
          "r_deadly_strike": 3,
          "r_imp_ss": 2,
          "r_puncturing": 3,
          "r_precision": 3,
          "r_endurance": 2,
          "t1329265": 2,
          "t1310711": 1,
          "t18427": 3,
          "r_opportunity": 1
        }
      },
      {
        "name": "战斗贼 (16/35/0)",
        "desc": "游戏内主流推荐加点 · 奇袭 16 / 战斗 35 / 敏锐 0 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "r_malice": 5,
          "r_ruthlessness": 3,
          "r_imp_snd": 3,
          "r_vigor": 2,
          "t14128": 2,
          "r_cold_blood": 1,
          "r_deadly_strike": 3,
          "r_imp_ss": 2,
          "r_deflection": 1,
          "r_precision": 3,
          "r_imp_sprint": 2,
          "r_endurance": 2,
          "t1329265": 2,
          "t1310711": 1,
          "t30919": 2,
          "t18427": 3,
          "r_dw_spec": 2,
          "r_blade_flurry": 1,
          "t13960": 5,
          "t1329284": 5,
          "r_adrenaline_rush": 1
        }
      },
      {
        "name": "敏锐贼 (12/8/31)",
        "desc": "游戏内主流推荐加点 · 奇袭 12 / 战斗 8 / 敏锐 31 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "r_malice": 5,
          "r_ruthlessness": 3,
          "r_imp_snd": 3,
          "t1329256": 1,
          "r_deadly_strike": 3,
          "r_imp_ss": 2,
          "r_precision": 3,
          "r_setup": 3,
          "r_opportunity": 5,
          "r_dirty_deeds": 2,
          "r_camouflage": 3,
          "r_initiative": 3,
          "r_premeditation": 1,
          "r_serrated_blades": 3,
          "r_elusiveness": 2,
          "r_ghostly": 1,
          "r_prep": 1,
          "r_hemo": 1,
          "t1329286": 5,
          "t1316709": 1
        }
      }
    ],
    "trees": [
      {
        "id": "assassination",
        "name": "奇袭",
        "skills": [
          {
            "id": "t13741",
            "name": "强化凿击",
            "icon": "ability_gouge",
            "row": 1,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的凿击技能持续时间延长0.5秒。",
              "使你的凿击技能持续时间延长1秒。",
              "使你的凿击技能持续时间延长1.5秒。"
            ]
          },
          {
            "id": "r_remorseless",
            "name": "冷酷攻击",
            "icon": "ability_fiegndead",
            "row": 1,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "击杀一个能为你提供经验值或荣誉值的敌人后，使你的下一次邪恶攻击、背刺、伏击、毁伤或鬼魅攻击的爆击几率提高20%。持续20秒。",
              "击杀一个能为你提供经验值或荣誉值的敌人后，使你的下一次邪恶攻击、背刺、伏击、毁伤或鬼魅攻击的爆击几率提高40%。持续20秒。"
            ]
          },
          {
            "id": "r_malice",
            "name": "恶意",
            "icon": "ability_racial_bloodrage",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你所有攻击和毒药的爆击几率提高1%。",
              "使你所有攻击和毒药的爆击几率提高2%。",
              "使你所有攻击和毒药的爆击几率提高3%。",
              "使你所有攻击和毒药的爆击几率提高4%。",
              "使你所有攻击和毒药的爆击几率提高5%。"
            ]
          },
          {
            "id": "r_ruthlessness",
            "name": "无情",
            "icon": "ability_druid_disembowel",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的终结技有20%的几率为目标增加一个连击点数。",
              "使你的终结技有40%的几率为目标增加一个连击点数。",
              "使你的终结技有60%的几率为目标增加一个连击点数。"
            ]
          },
          {
            "id": "r_imp_ea",
            "name": "强化破甲",
            "icon": "ability_warrior_riposte",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的破甲消耗的能量值降低5点，并在以5个连击点数施放时返还1个连击点。",
              "使你的破甲消耗的能量值降低10点，并在以5个连击点数施放时返还2个连击点。"
            ]
          },
          {
            "id": "r_imp_snd",
            "name": "强化切割",
            "icon": "ability_rogue_slicedice",
            "row": 2,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的切割技能的效果持续时间延长15%。",
              "使你的切割技能的效果持续时间延长30%。",
              "使你的切割技能的效果持续时间延长45%。"
            ]
          },
          {
            "id": "r_vigor",
            "name": "精力",
            "icon": "spell_nature_earthbindtotem",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的能量值上限提高5点。",
              "使你的能量值上限提高10点。"
            ]
          },
          {
            "id": "t1329256",
            "name": "Blood Splatter",
            "icon": "ability_rogue_rupture",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "Increases the duration of your Rupture ability by 6 sec and your Garrote ability by 9 sec."
            ]
          },
          {
            "id": "t14128",
            "name": "致命偷袭",
            "icon": "ability_criticalstrike",
            "row": 3,
            "col": 3,
            "max": 2,
            "prereq": "r_malice",
            "ranks": [
              "使你的邪恶攻击、凿击、背刺、毁伤、鬼魅攻击和出血技能的爆击伤害加成提高10%。",
              "使你的邪恶攻击、凿击、背刺、毁伤、鬼魅攻击和出血技能的爆击伤害加成提高20%。"
            ]
          },
          {
            "id": "t16513",
            "name": "恶性毒药",
            "icon": "ability_rogue_feigndeath",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的毒素所造成的伤害提高4%，并使你的毒药抵抗驱散效果的几率提高8%。",
              "使你的毒素所造成的伤害提高8%，并使你的毒药抵抗驱散效果的几率提高16%。",
              "使你的毒素所造成的伤害提高12%，并使你的毒药抵抗驱散效果的几率提高24%。",
              "使你的毒素所造成的伤害提高16%，并使你的毒药抵抗驱散效果的几率提高32%。",
              "使你的毒素所造成的伤害提高20%，并使你的毒药抵抗驱散效果的几率提高40%。"
            ]
          },
          {
            "id": "r_cold_blood",
            "name": "冷血",
            "icon": "spell_ice_lament",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后，使你的下一次邪恶攻击、背刺、伏击、刺骨或毁伤的爆击几率提高100%。"
            ]
          },
          {
            "id": "r_imp_poisons",
            "name": "强化毒药",
            "icon": "ability_poisons",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你对目标施加毒药的几率提高2%，并使毒药生效时有10%的几率不消耗使用次数。",
              "使你对目标施加毒药的几率提高4%，并使毒药生效时有20%的几率不消耗使用次数。",
              "使你对目标施加毒药的几率提高6%，并使毒药生效时有30%的几率不消耗使用次数。",
              "使你对目标施加毒药的几率提高8%，并使毒药生效时有40%的几率不消耗使用次数。",
              "使你对目标施加毒药的几率提高10%，并使毒药生效时有50%的几率不消耗使用次数。"
            ]
          },
          {
            "id": "r_rel_strikes",
            "name": "无情打击",
            "icon": "ability_warrior_decisivestrike",
            "row": 5,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "你的终结技每消耗一个连击点数都有4%的几率恢复25点能量。",
              "你的终结技每消耗一个连击点数都有8%的几率恢复25点能量。",
              "你的终结技每消耗一个连击点数都有12%的几率恢复25点能量。",
              "你的终结技每消耗一个连击点数都有16%的几率恢复25点能量。",
              "你的终结技每消耗一个连击点数都有20%的几率恢复25点能量。"
            ]
          },
          {
            "id": "t1329328",
            "name": "毒针",
            "icon": "inv_sword_31",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "Causes your Shank ability to increase your Poison damage by 30% and your chance to apply Poisons by 20% for 6 sec."
            ]
          },
          {
            "id": "r_imp_ks",
            "name": "强化肾击",
            "icon": "ability_rogue_kidneyshot",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "被你的肾击昏迷的敌人，受到你的毒药和攻击的伤害提高5%。",
              "被你的肾击昏迷的敌人，受到你的毒药和攻击的伤害提高10%。"
            ]
          },
          {
            "id": "r_seal_fate",
            "name": "封印命运",
            "icon": "spell_shadow_chilltouch",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "可增加连击点数的技能造成爆击时，有33%的几率额外增加一个连击点数。",
              "可增加连击点数的技能造成爆击时，有66%的几率额外增加一个连击点数。",
              "可增加连击点数的技能造成爆击时，有100%的几率额外增加一个连击点数。"
            ]
          },
          {
            "id": "r_mutilate",
            "name": "毁伤",
            "icon": "ability_rogue_deadlybrew",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "t1329328",
            "ranks": [
              "立即用两把武器攻击，每把武器造成90%武器伤害，外加40点伤害。对中毒目标造成的伤害提高20%。奖励2个连击点。"
            ]
          }
        ]
      },
      {
        "id": "combat",
        "name": "战斗",
        "skills": [
          {
            "id": "r_deadly_strike",
            "name": "致命一击",
            "icon": "ability_rogue_eviscerate",
            "row": 1,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的刺骨技能所造成的伤害提高7%，死亡印记技能所造成的伤害和伤害储存比例提高7%。",
              "使你的刺骨技能所造成的伤害提高13%，死亡印记技能所造成的伤害和伤害储存比例提高13%。",
              "使你的刺骨技能所造成的伤害提高20%，死亡印记技能所造成的伤害和伤害储存比例提高20%。"
            ]
          },
          {
            "id": "r_imp_ss",
            "name": "高效打击",
            "icon": "spell_shadow_ritualofsacrifice",
            "row": 1,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的邪恶攻击和出血技能所消耗的能量值减少3点。",
              "使你的邪恶攻击和出血技能所消耗的能量值减少5点。"
            ]
          },
          {
            "id": "r_lightning_ref",
            "name": "闪电反射",
            "icon": "spell_nature_invisibilty",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的躲闪几率提高1%。",
              "使你的躲闪几率提高2%。",
              "使你的躲闪几率提高3%。",
              "使你的躲闪几率提高4%。",
              "使你的躲闪几率提高5%。"
            ]
          },
          {
            "id": "r_puncturing",
            "name": "穿刺之伤",
            "icon": "ability_backstab",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的背刺爆击几率提高10%、毁伤爆击几率提高5%，并使背刺有15%的几率额外增加一个连击点数。",
              "使你的背刺爆击几率提高20%、毁伤爆击几率提高10%，并使背刺有30%的几率额外增加一个连击点数。",
              "使你的背刺爆击几率提高30%、毁伤爆击几率提高15%，并使背刺有45%的几率额外增加一个连击点数。"
            ]
          },
          {
            "id": "r_deflection",
            "name": "偏斜",
            "icon": "ability_parry",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的招架几率提高2%。",
              "使你的招架几率提高4%。",
              "使你的招架几率提高6%。"
            ]
          },
          {
            "id": "r_precision",
            "name": "精确",
            "icon": "ability_marksmanship",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你击中目标的几率提高1%。",
              "使你击中目标的几率提高2%。",
              "使你击中目标的几率提高3%。"
            ]
          },
          {
            "id": "r_imp_sprint",
            "name": "强化疾跑",
            "icon": "ability_rogue_sprint",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你在启动疾跑技能时有50%的几率移除所有移动限制效果。",
              "使你在启动疾跑技能时有100%的几率移除所有移动限制效果。"
            ]
          },
          {
            "id": "r_endurance",
            "name": "耐久",
            "icon": "spell_shadow_shadowward",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的疾跑和闪避技能冷却时间缩短30%。",
              "使你的疾跑和闪避技能冷却时间缩短60%。"
            ]
          },
          {
            "id": "r_riposte",
            "name": "还击",
            "icon": "ability_warrior_challange",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": "r_deflection",
            "ranks": [
              "在招架了敌人的攻击之后可以使用的技能，对目标造成150%的武器伤害，并使其被缴械，持续6秒。"
            ]
          },
          {
            "id": "t1329265",
            "name": "沉着",
            "icon": "ability_rogue_fleetfooted",
            "row": 3,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的蓄势待发技能额外减少5点能量消耗。",
              "使你的蓄势待发技能额外减少10点能量消耗。"
            ]
          },
          {
            "id": "r_imp_kick",
            "name": "强化脚踢",
            "icon": "ability_kick",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的脚踢技能有50%的几率令目标沉默2秒。",
              "使你的脚踢技能有100%的几率令目标沉默2秒。"
            ]
          },
          {
            "id": "t1310711",
            "name": "完美处刑",
            "icon": "inv_sword_35",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你的刺骨消耗的能量值降低15点。"
            ]
          },
          {
            "id": "t30919",
            "name": "武器专家",
            "icon": "spell_holy_blessingofstrength",
            "row": 4,
            "col": 3,
            "max": 2,
            "prereq": "r_precision",
            "ranks": [
              "使你的攻击被躲闪或招架的几率降低1%。",
              "使你的攻击被躲闪或招架的几率降低2%。"
            ]
          },
          {
            "id": "t18427",
            "name": "侵略",
            "icon": "ability_racial_avatar",
            "row": 4,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的邪恶攻击和刺骨技能的伤害提高5%。",
              "使你的邪恶攻击和刺骨技能的伤害提高10%。",
              "使你的邪恶攻击和刺骨技能的伤害提高15%。"
            ]
          },
          {
            "id": "r_dw_spec",
            "name": "双武器专精",
            "icon": "ability_dualwield",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的副手武器造成的伤害提高25%。",
              "使你的副手武器造成的伤害提高50%。"
            ]
          },
          {
            "id": "r_blade_flurry",
            "name": "剑刃乱舞",
            "icon": "ability_warrior_punishingblow",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你的近战攻击速度提高20%，并使你的近战攻击命中附近的一个额外对手。持续15秒。"
            ]
          },
          {
            "id": "t13960",
            "name": "劈斩",
            "icon": "inv_sword_27",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的近战武器攻击根据武器类型获得不同增益。 斧/剑：你的成功近战攻击有1%的几率对目标触发一次额外攻击。 匕首/拳套：使你的爆击几率提高1%。 锤：你的攻击无视 目标3%的护甲值。",
              "使你的近战武器攻击根据武器类型获得不同增益。 斧/剑：你的成功近战攻击有2%的几率对目标触发一次额外攻击。 匕首/拳套：使你的爆击几率提高2%。 锤：你的攻击无视 目标6%的护甲值。",
              "使你的近战武器攻击根据武器类型获得不同增益。 斧/剑：你的成功近战攻击有3%的几率对目标触发一次额外攻击。 匕首/拳套：使你的爆击几率提高3%。 锤：你的攻击无视 目标9%的护甲值。",
              "使你的近战武器攻击根据武器类型获得不同增益。 斧/剑：你的成功近战攻击有4%的几率对目标触发一次额外攻击。 匕首/拳套：使你的爆击几率提高4%。 锤：你的攻击无视 目标12%的护甲值。",
              "使你的近战武器攻击根据武器类型获得不同增益。 斧/剑：你的成功近战攻击有5%的几率对目标触发一次额外攻击。 匕首/拳套：使你的爆击几率提高5%。 锤：你的攻击无视 目标15%的护甲值。"
            ]
          },
          {
            "id": "t1329284",
            "name": "Flash of Steel",
            "icon": "ability_rogue_restlessblades",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "Increases the Energy generated by your Shank ability by 3 and reduces its cooldown by 0.4 sec.",
              "Increases the Energy generated by your Shank ability by 6 and reduces its cooldown by 0.8 sec.",
              "Increases the Energy generated by your Shank ability by 9 and reduces its cooldown by 1.2 sec.",
              "Increases the Energy generated by your Shank ability by 12 and reduces its cooldown by 1.6 sec.",
              "Increases the Energy generated by your Shank ability by 15 and reduces its cooldown by 2 sec."
            ]
          },
          {
            "id": "r_adrenaline_rush",
            "name": "冲动",
            "icon": "spell_shadow_shadowworddominate",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "r_blade_flurry",
            "ranks": [
              "使你的能量值回复速度提高100%，持续15秒。"
            ]
          }
        ]
      },
      {
        "id": "subtlety",
        "name": "敏锐",
        "skills": [
          {
            "id": "r_setup",
            "name": "调整",
            "icon": "spell_nature_mirrorimage",
            "row": 1,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你在躲闪目标的攻击或完全抵抗其法术后，有15%的几率为该目标增加一个连击点数。",
              "使你在躲闪目标的攻击或完全抵抗其法术后，有30%的几率为该目标增加一个连击点数。",
              "使你在躲闪目标的攻击或完全抵抗其法术后，有45%的几率为该目标增加一个连击点数。"
            ]
          },
          {
            "id": "t13958",
            "name": "欺诈高手",
            "icon": "spell_shadow_charm",
            "row": 1,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "当你在潜行状态下时，降低敌人侦测到你的几率，等同于你的等级提高了1级。",
              "当你在潜行状态下时，降低敌人侦测到你的几率，等同于你的等级提高了2级。",
              "当你在潜行状态下时，降低敌人侦测到你的几率，等同于你的等级提高了3级。"
            ]
          },
          {
            "id": "r_opportunity",
            "name": "伺机而动",
            "icon": "ability_warrior_warcry",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的背刺、绞喉、伏击和毁伤技能造成的伤害提高4%。",
              "使你的背刺、绞喉、伏击和毁伤技能造成的伤害提高8%。",
              "使你的背刺、绞喉、伏击和毁伤技能造成的伤害提高12%。",
              "使你的背刺、绞喉、伏击和毁伤技能造成的伤害提高16%。",
              "使你的背刺、绞喉、伏击和毁伤技能造成的伤害提高20%。"
            ]
          },
          {
            "id": "r_dirty_deeds",
            "name": "卑鄙",
            "icon": "spell_shadow_summonsuccubus",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的偷袭和绞喉消耗的能量值降低10点，且绞喉不再要求你位于目标身后。",
              "使你的偷袭和绞喉消耗的能量值降低20点，且绞喉不再要求你位于目标身后。"
            ]
          },
          {
            "id": "r_camouflage",
            "name": "伪装",
            "icon": "ability_stealth",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你潜行时的移动速度惩罚降低5%，并使潜行的冷却时间缩短2秒。",
              "使你潜行时的移动速度惩罚降低10%，并使潜行的冷却时间缩短4秒。",
              "使你潜行时的移动速度惩罚降低15%，并使潜行的冷却时间缩短6秒。"
            ]
          },
          {
            "id": "r_imp_ambush",
            "name": "强化伏击",
            "icon": "ability_rogue_ambush",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的伏击技能造成爆击的几率提高15%。",
              "使你的伏击技能造成爆击的几率提高30%。",
              "使你的伏击技能造成爆击的几率提高45%。"
            ]
          },
          {
            "id": "t1224782",
            "name": "邪恶计谋",
            "icon": "ability_sap",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的闷棍和致盲技能消耗的能量值减少25%。",
              "使你的闷棍和致盲技能消耗的能量值减少50%。"
            ]
          },
          {
            "id": "r_initiative",
            "name": "先发制人",
            "icon": "spell_shadow_fumble",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你有33%的几率在使用伏击、绞喉或偷袭技能后获得1个额外的连击点数。",
              "使你有67%的几率在使用伏击、绞喉或偷袭技能后获得1个额外的连击点数。",
              "使你有100%的几率在使用伏击、绞喉或偷袭技能后获得1个额外的连击点数。"
            ]
          },
          {
            "id": "r_premeditation",
            "name": "预谋",
            "icon": "spell_shadow_possession",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "为你的目标增加2个连击点数。你必须在20秒内增加或消耗这些连击点数，否则它们就会消失。"
            ]
          },
          {
            "id": "r_serrated_blades",
            "name": "锯齿利刃",
            "icon": "inv_sword_17",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的攻击忽略目标3%的护甲，并使你的割裂技能造成的伤害提高10%。",
              "使你的攻击忽略目标6%的护甲，并使你的割裂技能造成的伤害提高20%。",
              "使你的攻击忽略目标9%的护甲，并使你的割裂技能造成的伤害提高30%。"
            ]
          },
          {
            "id": "r_elusiveness",
            "name": "飘忽不定",
            "icon": "spell_magic_lesserinvisibilty",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的消失和致盲技能的冷却时间缩短45秒。",
              "使你的消失和致盲技能的冷却时间缩短90秒。"
            ]
          },
          {
            "id": "r_ghostly",
            "name": "鬼魅攻击",
            "icon": "spell_shadow_curse",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "打击敌人，造成125%（主手装备匕首时为180%）武器伤害，并使你的躲闪几率提高15%，持续7秒，且在7秒内施放的下一个伏击或绞喉不需要潜行。奖励1个连击点。"
            ]
          },
          {
            "id": "t1310728",
            "name": "迅捷脱身",
            "icon": "ability_rogue_blackjack",
            "row": 4,
            "col": 4,
            "max": 2,
            "prereq": "t1224782",
            "ranks": [
              "使你能同时闷棍的目标数量上限提高1个，并使你在闷棍目标后的3秒内移动速度提高15%。",
              "使你能同时闷棍的目标数量上限提高1个，并使你在闷棍目标后的3秒内移动速度提高30%。"
            ]
          },
          {
            "id": "t30894",
            "name": "察觉",
            "icon": "ability_ambush",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的潜行侦测相当于提高1级，并使你被法术和远程攻击命中的几率降低2%。",
              "使你的潜行侦测相当于提高3级，并使你被法术和远程攻击命中的几率降低4%。"
            ]
          },
          {
            "id": "r_prep",
            "name": "伺机待发",
            "icon": "spell_shadow_antishadow",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活之后，这项技能立刻令你的其它潜行者技能的冷却时间结束。"
            ]
          },
          {
            "id": "r_hemo",
            "name": "出血",
            "icon": "spell_shadow_lifedrain",
            "row": 5,
            "col": 3,
            "max": 1,
            "prereq": "r_serrated_blades",
            "ranks": [
              "发动瞬发打击，造成100%武器伤害（装备匕首时为145%），并使目标受到来自潜行者的割裂和绞喉伤害提高15%，持续15秒。奖励1个连击点数。"
            ]
          },
          {
            "id": "t1329286",
            "name": "Boot Knife",
            "icon": "inv_sword_32",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "Grants your Shank ability a 20% chance to add 2 Combo Points to the target.",
              "Grants your Shank ability a 40% chance to add 2 Combo Points to the target.",
              "Grants your Shank ability a 60% chance to add 2 Combo Points to the target.",
              "Grants your Shank ability a 80% chance to add 2 Combo Points to the target.",
              "Grants your Shank ability a 100% chance to add 2 Combo Points to the target."
            ]
          },
          {
            "id": "t1316709",
            "name": "死亡印记",
            "icon": "ability_creature_cursed_02",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "r_prep",
            "ranks": [
              "终结技，标记目标，每有一个连击点数，储存一部分你的攻击对该目标造成的伤害。绞喉和割裂伤害的储存比例翻倍。6秒后，对目标造成储存的伤害，但伤害不超过由攻击强度和爆击几率决定的上限： 1点：储存12%伤害，伤害上限为165点。 2点：储存24%伤害，伤害上限为267点。 3点：储存36%伤害，伤害上限为369点。 4点：储存48%伤害，伤害上限为471点。 5点：储存60%伤害，伤害上限为573点。"
            ]
          }
        ]
      }
    ]
  },
  "priest": {
    "name": "牧师",
    "icon": "✨",
    "classIcon": "class_priest",
    "presets": [
      {
        "name": "戒律牧 (32/19/0)",
        "desc": "游戏内主流推荐加点 · 戒律 32 / 神圣 19 / 暗影 0 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t1225132": 5,
          "t1309957": 2,
          "t18551": 5,
          "p_mental_agility": 2,
          "p_inner_focus": 1,
          "p_imp_shield": 3,
          "p_meditation": 3,
          "t402000": 1,
          "p_penance": 1,
          "t425280": 5,
          "t431622": 3,
          "p_power_infusion": 1,
          "t14913": 3,
          "p_imp_renew": 3,
          "p_holy_spec": 5,
          "p_holy_nova": 1,
          "p_inspiration": 3,
          "p_imp_healing": 3,
          "t1328569": 1
        }
      },
      {
        "name": "神牧 (19/32/0)",
        "desc": "游戏内主流推荐加点 · 戒律 19 / 神圣 32 / 暗影 0 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t1225132": 5,
          "t14523": 2,
          "t18551": 4,
          "p_mental_agility": 1,
          "p_inner_focus": 1,
          "p_imp_shield": 3,
          "p_meditation": 3,
          "p_imp_renew": 3,
          "p_holy_spec": 5,
          "p_divine_fury": 5,
          "p_inspiration": 3,
          "p_imp_healing": 3,
          "t1328569": 1,
          "t1317006": 2,
          "p_spirit_redemption": 1,
          "p_spiritual_guidance": 5,
          "p_spiritual_healing": 3,
          "p_prayer_mending": 1
        }
      },
      {
        "name": "暗牧 (15/3/33)",
        "desc": "游戏内主流推荐加点 · 戒律 15 / 神圣 3 / 暗影 33 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t1225132": 5,
          "t14523": 3,
          "t18551": 3,
          "p_inner_focus": 1,
          "p_meditation": 3,
          "t14913": 3,
          "p_shadow_focus": 5,
          "p_imp_mb": 4,
          "p_imp_swp": 2,
          "p_shadow_reach": 2,
          "p_mind_flay": 1,
          "t1225139": 2,
          "t1326159": 5,
          "p_vampiric_embrace": 1,
          "p_shadow_weaving": 3,
          "t1309950": 2,
          "p_darkness": 5,
          "p_shadowform": 1
        }
      }
    ],
    "trees": [
      {
        "id": "discipline",
        "name": "戒律",
        "skills": [
          {
            "id": "t1309969",
            "name": "圣光之力",
            "icon": "spell_holy_searinglight",
            "row": 1,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "你的惩击和苦修法术对受到你的神圣之火或暗言术：痛影响的目标造成的伤害提高2%。",
              "你的惩击和苦修法术对受到你的神圣之火或暗言术：痛影响的目标造成的伤害提高4%。",
              "你的惩击和苦修法术对受到你的神圣之火或暗言术：痛影响的目标造成的伤害提高6%。",
              "你的惩击和苦修法术对受到你的神圣之火或暗言术：痛影响的目标造成的伤害提高8%。",
              "你的惩击和苦修法术对受到你的神圣之火或暗言术：痛影响的目标造成的伤害提高10%。"
            ]
          },
          {
            "id": "p_wand_spec",
            "name": "魔杖专精",
            "icon": "inv_wand_01",
            "row": 1,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的魔杖造成的伤害提高13%。",
              "使你的魔杖造成的伤害提高25%。"
            ]
          },
          {
            "id": "t1225132",
            "name": "双生戒律",
            "icon": "spell_holy_sealofvengeance",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的瞬发法术的伤害和治疗效果提高1%。",
              "使你的瞬发法术的伤害和治疗效果提高2%。",
              "使你的瞬发法术的伤害和治疗效果提高3%。",
              "使你的瞬发法术的伤害和治疗效果提高4%。",
              "使你的瞬发法术的伤害和治疗效果提高5%。"
            ]
          },
          {
            "id": "t14523",
            "name": "无声消退",
            "icon": "spell_nature_manaregentotem",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的法术产生的威胁值降低10%，并使你受到的昏迷、恐惧和沉默效果的持续时间缩短5%。",
              "使你的法术产生的威胁值降低20%，并使你受到的昏迷、恐惧和沉默效果的持续时间缩短10%。",
              "使你的法术产生的威胁值降低30%，并使你受到的昏迷、恐惧和沉默效果的持续时间缩短15%。"
            ]
          },
          {
            "id": "t1309957",
            "name": "神圣精准",
            "icon": "spell_holy_divineillumination",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的神圣法术命中几率提高6%。",
              "使你的神圣法术命中几率提高12%。",
              "使你的神圣法术命中几率提高18%。"
            ]
          },
          {
            "id": "t18551",
            "name": "心灵之力",
            "icon": "spell_nature_enchantarmor",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的智力总值提高2%。",
              "使你的智力总值提高4%。",
              "使你的智力总值提高6%。",
              "使你的智力总值提高8%。",
              "使你的智力总值提高10%。"
            ]
          },
          {
            "id": "t14531",
            "name": "殉难",
            "icon": "spell_nature_tranquility",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你有50%的几率在受到敌人的近战或远程爆击后得到专注施法，持续6秒。专注施法效果可以让你在施法时不会因为受到伤害而延长施法时间，且令你抵抗打断效果的几率提高20%。",
              "使你有100%的几率在受到敌人的近战或远程爆击后得到专注施法，持续6秒。专注施法效果可以让你在施法时不会因为受到伤害而延长施法时间，且令你抵抗打断效果的几率提高20%。"
            ]
          },
          {
            "id": "p_mental_agility",
            "name": "精神敏锐",
            "icon": "ability_hibernation",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的惩击、神圣之火和瞬发法术消耗的法力值降低3%。",
              "使你的惩击、神圣之火和瞬发法术消耗的法力值降低7%。",
              "使你的惩击、神圣之火和瞬发法术消耗的法力值降低10%。"
            ]
          },
          {
            "id": "p_inner_focus",
            "name": "心灵专注",
            "icon": "spell_frost_windwalkon",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活之后，你的下一个法术所消耗的法力值减少100%，造成爆击或极效治疗的几率提高25%（如果它是非周期性法术且有可能造成这些效果的话）。"
            ]
          },
          {
            "id": "p_imp_shield",
            "name": "强化真言术：盾",
            "icon": "spell_holy_powerwordshield",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的真言术：盾所吸收的伤害量提高7%。",
              "使你的真言术：盾所吸收的伤害量提高14%。",
              "使你的真言术：盾所吸收的伤害量提高20%。"
            ]
          },
          {
            "id": "p_meditation",
            "name": "冥想",
            "icon": "spell_nature_sleep",
            "row": 3,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你在施法时仍保持17%的法力回复速度。",
              "使你在施法时仍保持33%的法力回复速度。",
              "使你在施法时仍保持50%的法力回复速度。"
            ]
          },
          {
            "id": "t14747",
            "name": "强化心灵之火",
            "icon": "spell_holy_innerfire",
            "row": 4,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的心灵之火的护甲值加成提高15%，并使其总充能次数提高4次。",
              "使你的心灵之火的护甲值加成提高30%，并使其总充能次数提高8次。",
              "使你的心灵之火的护甲值加成提高45%，并使其总充能次数提高12次。"
            ]
          },
          {
            "id": "t14750",
            "name": "强化法力燃烧",
            "icon": "spell_shadow_manaburn",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的法力燃烧的施法时间缩短0.5秒。",
              "使你的法力燃烧的施法时间缩短1秒。"
            ]
          },
          {
            "id": "t402000",
            "name": "灵魂守护",
            "icon": "spell_holy_pureofheart",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": "p_imp_shield",
            "ranks": [
              "使你的真言术：盾冷却时间缩短4秒，法力消耗降低15%。"
            ]
          },
          {
            "id": "p_penance",
            "name": "苦修",
            "icon": "spell_holy_penance",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "向目标释放圣光能量，立即对一名敌人造成45点神圣伤害，或为一名盟友恢复134点生命值，并在接下来的2秒内每1秒重复一次效果。"
            ]
          },
          {
            "id": "t425280",
            "name": "新生希望",
            "icon": "spell_holy_holyprotection",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": "t402000",
            "ranks": [
              "你对具有虚弱灵魂的目标施放的快速治疗、次级治疗术、治疗术、强效治疗术和苦修的爆击几率提高2%，并使目标身上虚弱灵魂的剩余持续时间缩短1秒。",
              "你对具有虚弱灵魂的目标施放的快速治疗、次级治疗术、治疗术、强效治疗术和苦修的爆击几率提高4%，并使目标身上虚弱灵魂的剩余持续时间缩短2秒。",
              "你对具有虚弱灵魂的目标施放的快速治疗、次级治疗术、治疗术、强效治疗术和苦修的爆击几率提高6%，并使目标身上虚弱灵魂的剩余持续时间缩短3秒。",
              "你对具有虚弱灵魂的目标施放的快速治疗、次级治疗术、治疗术、强效治疗术和苦修的爆击几率提高8%，并使目标身上虚弱灵魂的剩余持续时间缩短4秒。",
              "你对具有虚弱灵魂的目标施放的快速治疗、次级治疗术、治疗术、强效治疗术和苦修的爆击几率提高10%，并使目标身上虚弱灵魂的剩余持续时间缩短5秒。"
            ]
          },
          {
            "id": "t431622",
            "name": "神圣庇护",
            "icon": "spell_holy_devineaegis",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "你的非周期性极效治疗会在目标身上生成一道保护性护盾，吸收相当于治疗量5%的伤害。最多可吸收1200点伤害，持续12秒。",
              "你的非周期性极效治疗会在目标身上生成一道保护性护盾，吸收相当于治疗量10%的伤害。最多可吸收1200点伤害，持续12秒。",
              "你的非周期性极效治疗会在目标身上生成一道保护性护盾，吸收相当于治疗量15%的伤害。最多可吸收1200点伤害，持续12秒。"
            ]
          },
          {
            "id": "p_power_infusion",
            "name": "能量灌注",
            "icon": "spell_holy_powerinfusion",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "p_penance",
            "ranks": [
              "为目标注入能量，使其法术伤害和治疗量提高20%，持续15秒。"
            ]
          }
        ]
      },
      {
        "id": "holy",
        "name": "神圣",
        "skills": [
          {
            "id": "t14913",
            "name": "暮光专注",
            "icon": "spell_holy_healingfocus",
            "row": 1,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的法术有23%的几率在受到伤害时不损失施法时间。",
              "使你的法术有47%的几率在受到伤害时不损失施法时间。",
              "使你的法术有70%的几率在受到伤害时不损失施法时间。"
            ]
          },
          {
            "id": "p_imp_renew",
            "name": "强化恢复",
            "icon": "spell_holy_renew",
            "row": 1,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的恢复法术的治疗效果提高5%。",
              "使你的恢复法术的治疗效果提高10%。",
              "使你的恢复法术的治疗效果提高15%。"
            ]
          },
          {
            "id": "p_holy_spec",
            "name": "神圣专精",
            "icon": "spell_holy_sealofsalvation",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的神圣法术造成爆击的几率提高1%。",
              "使你的神圣法术造成爆击的几率提高2%。",
              "使你的神圣法术造成爆击的几率提高3%。",
              "使你的神圣法术造成爆击的几率提高4%。",
              "使你的神圣法术造成爆击的几率提高5%。"
            ]
          },
          {
            "id": "p_spell_warding",
            "name": "法术屏障",
            "icon": "spell_holy_spellwarding",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你受到的所有法术伤害降低2%。",
              "使你受到的所有法术伤害降低4%。",
              "使你受到的所有法术伤害降低6%。",
              "使你受到的所有法术伤害降低8%。",
              "使你受到的所有法术伤害降低10%。"
            ]
          },
          {
            "id": "p_divine_fury",
            "name": "神圣之怒",
            "icon": "spell_holy_sealofwrath",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的惩击、神圣之火、治疗术和强效治疗术的施法时间缩短0.1秒。",
              "使你的惩击、神圣之火、治疗术和强效治疗术的施法时间缩短0.2秒。",
              "使你的惩击、神圣之火、治疗术和强效治疗术的施法时间缩短0.3秒。",
              "使你的惩击、神圣之火、治疗术和强效治疗术的施法时间缩短0.4秒。",
              "使你的惩击、神圣之火、治疗术和强效治疗术的施法时间缩短0.5秒。"
            ]
          },
          {
            "id": "p_holy_nova",
            "name": "神圣新星",
            "icon": "spell_holy_holynova",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "在施法者周围引发神圣光芒爆炸，对10码内所有敌方目标造成26到30点神圣伤害，并为10码内所有小队成员恢复50到57点生命值。这些效果不产生威胁值。"
            ]
          },
          {
            "id": "t27811",
            "name": "神恩回复",
            "icon": "spell_holy_blessedrecovery",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "在遭受近战或远程爆击，或单次受到的伤害超过最大生命值30%后，在6秒内恢复相当于所受伤害8%的生命值。刷新该效果时会保留剩余治疗量。",
              "在遭受近战或远程爆击，或单次受到的伤害超过最大生命值30%后，在6秒内恢复相当于所受伤害17%的生命值。刷新该效果时会保留剩余治疗量。",
              "在遭受近战或远程爆击，或单次受到的伤害超过最大生命值30%后，在6秒内恢复相当于所受伤害25%的生命值。刷新该效果时会保留剩余治疗量。"
            ]
          },
          {
            "id": "p_inspiration",
            "name": "灵感",
            "icon": "spell_holy_layonhands",
            "row": 3,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "你的非周期性治疗爆击会使目标的护甲值提高8%，持续15秒。",
              "你的非周期性治疗爆击会使目标的护甲值提高17%，持续15秒。",
              "你的非周期性治疗爆击会使目标的护甲值提高25%，持续15秒。"
            ]
          },
          {
            "id": "p_holy_reach",
            "name": "神圣延伸",
            "icon": "spell_holy_purify",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的惩击和神圣之火的射程、治疗祷言和神圣新星的作用半径提高10%。",
              "使你的惩击和神圣之火的射程、治疗祷言和神圣新星的作用半径提高20%。"
            ]
          },
          {
            "id": "p_imp_healing",
            "name": "强化治疗术",
            "icon": "spell_holy_heal02",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的次级治疗术、治疗术、强效治疗术、苦修和愈合祷言的法力消耗降低5%。",
              "使你的次级治疗术、治疗术、强效治疗术、苦修和愈合祷言的法力消耗降低10%。",
              "使你的次级治疗术、治疗术、强效治疗术、苦修和愈合祷言的法力消耗降低15%。"
            ]
          },
          {
            "id": "t14909",
            "name": "灼热之光",
            "icon": "spell_holy_searinglightpriest",
            "row": 4,
            "col": 3,
            "max": 2,
            "prereq": "p_divine_fury",
            "ranks": [
              "使你造成的神圣伤害提高2%，并且每次神圣之火造成周期性伤害时，有5%的几率使你的下一个神圣新星不消耗法力值。",
              "使你造成的神圣伤害提高5%，并且每次神圣之火造成周期性伤害时，有10%的几率使你的下一个神圣新星不消耗法力值。"
            ]
          },
          {
            "id": "t1328569",
            "name": "Holy Binding",
            "icon": "spell_holy_blindingheal",
            "row": 4,
            "col": 4,
            "max": 1,
            "prereq": null,
            "ranks": [
              "Each time you heal a target other than yourself with Flash Heal, you are healed for 50% as much. This healing generates no threat."
            ]
          },
          {
            "id": "t1317006",
            "name": "圣光连祷",
            "icon": "inv_scroll_07",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "当你施放治疗法术时，若你上一次施放的是不同的治疗法术，则获得相当于本次法术基础法力消耗5%的法力值。",
              "当你施放治疗法术时，若你上一次施放的是不同的治疗法术，则获得相当于本次法术基础法力消耗10%的法力值。"
            ]
          },
          {
            "id": "p_spirit_redemption",
            "name": "救赎之魂",
            "icon": "inv_enchant_essenceeternallarge",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "在死亡时，牧师变成一个救赎之魂，持续15秒。救赎之魂无法移动、攻击，也不会受到任何法术或效果的影响。在这个形态下，牧师可以施放任何治疗法术，不需消耗任何法力值。当救赎之魂效果结束时，牧师死亡。"
            ]
          },
          {
            "id": "p_spiritual_guidance",
            "name": "精神指引",
            "icon": "spell_holy_spiritualguidence",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的法术治疗量最多提高相当于你精神总值的5%，法术伤害最多提高相当于你精神总值的1%。",
              "使你的法术治疗量最多提高相当于你精神总值的10%，法术伤害最多提高相当于你精神总值的3%。",
              "使你的法术治疗量最多提高相当于你精神总值的15%，法术伤害最多提高相当于你精神总值的5%。",
              "使你的法术治疗量最多提高相当于你精神总值的20%，法术伤害最多提高相当于你精神总值的6%。",
              "使你的法术治疗量最多提高相当于你精神总值的25%，法术伤害最多提高相当于你精神总值的8%。"
            ]
          },
          {
            "id": "p_spiritual_healing",
            "name": "精神治疗",
            "icon": "spell_nature_moonglow",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的法术治疗量提高3%。",
              "使你的法术治疗量提高7%。",
              "使你的法术治疗量提高10%。"
            ]
          },
          {
            "id": "p_prayer_mending",
            "name": "愈合祷言",
            "icon": "spell_holy_prayerofmendingtga",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "p_spirit_redemption",
            "ranks": [
              "向目标施加一个法术，在该目标下一次受到伤害或获得非周期性治疗时为其恢复172点生命值。这个治疗效果发生之后，愈合祷言会转移到20码范围内的小队或团队成员身上。最多可以转移5次，每次转移之后持续30秒。每个施法者在同一时间内只能在一名目标身上施放该法术。"
            ]
          }
        ]
      },
      {
        "id": "shadow",
        "name": "暗影",
        "skills": [
          {
            "id": "p_shadow_focus",
            "name": "暗影集中",
            "icon": "spell_shadow_burningspirit",
            "row": 1,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的暗影法术命中几率提高1%。",
              "使你的暗影法术命中几率提高2%。",
              "使你的暗影法术命中几率提高3%。",
              "使你的暗影法术命中几率提高4%。",
              "使你的暗影法术命中几率提高5%。"
            ]
          },
          {
            "id": "t15326",
            "name": "昏阙",
            "icon": "spell_shadow_gathershadows",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的暗影系伤害性法术有2%的几率令目标昏迷3秒。",
              "使你的暗影系伤害性法术有4%的几率令目标昏迷3秒。",
              "使你的暗影系伤害性法术有6%的几率令目标昏迷3秒。",
              "使你的暗影系伤害性法术有8%的几率令目标昏迷3秒。",
              "使你的暗影系伤害性法术有10%的几率令目标昏迷3秒。"
            ]
          },
          {
            "id": "p_spirit_tap",
            "name": "精神分流",
            "icon": "spell_shadow_requiem",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "消灭能为你提供经验值或荣誉值的目标后，或受你的吸血鬼的拥抱影响的敌人死亡时，你有20%的几率使精神提高100%，持续15秒。在此期间，你在施法时仍可保持50%的法力恢复速度。",
              "消灭能为你提供经验值或荣誉值的目标后，或受你的吸血鬼的拥抱影响的敌人死亡时，你有40%的几率使精神提高100%，持续15秒。在此期间，你在施法时仍可保持50%的法力恢复速度。",
              "消灭能为你提供经验值或荣誉值的目标后，或受你的吸血鬼的拥抱影响的敌人死亡时，你有60%的几率使精神提高100%，持续15秒。在此期间，你在施法时仍可保持50%的法力恢复速度。",
              "消灭能为你提供经验值或荣誉值的目标后，或受你的吸血鬼的拥抱影响的敌人死亡时，你有80%的几率使精神提高100%，持续15秒。在此期间，你在施法时仍可保持50%的法力恢复速度。",
              "消灭能为你提供经验值或荣誉值的目标后，或受你的吸血鬼的拥抱影响的敌人死亡时，你有100%的几率使精神提高100%，持续15秒。在此期间，你在施法时仍可保持50%的法力恢复速度。"
            ]
          },
          {
            "id": "p_imp_mb",
            "name": "强化心灵震爆",
            "icon": "spell_shadow_unholyfrenzy",
            "row": 2,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的心灵震爆的冷却时间减少0.5秒。",
              "使你的心灵震爆的冷却时间减少1秒。",
              "使你的心灵震爆的冷却时间减少1.5秒。",
              "使你的心灵震爆的冷却时间减少2秒。",
              "使你的心灵震爆的冷却时间减少2.5秒。"
            ]
          },
          {
            "id": "p_imp_swp",
            "name": "强化暗言术：痛",
            "icon": "spell_shadow_shadowwordpain",
            "row": 2,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的暗言术：痛的持续时间延长3秒。",
              "使你的暗言术：痛的持续时间延长6秒。"
            ]
          },
          {
            "id": "p_shadow_reach",
            "name": "暗影延伸",
            "icon": "spell_shadow_chilltouch",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的暗影系伤害性法术的射程提高10%。",
              "使你的暗影系伤害性法术的射程提高20%。"
            ]
          },
          {
            "id": "t15392",
            "name": "强化心灵尖啸",
            "icon": "spell_shadow_psychicscream",
            "row": 3,
            "col": 2,
            "max": 2,
            "prereq": "t15326",
            "ranks": [
              "使你的心灵尖啸的冷却时间减少2秒。",
              "使你的心灵尖啸的冷却时间减少4秒。"
            ]
          },
          {
            "id": "p_mind_flay",
            "name": "精神鞭笞",
            "icon": "spell_shadow_siphonmana",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "以暗影能量冲击目标的心灵，在3秒内造成63点暗影伤害，并使其移动速度降低50%。"
            ]
          },
          {
            "id": "t1225139",
            "name": "强化精神鞭笞",
            "icon": "spell_shadow_soulleech_2",
            "row": 3,
            "col": 4,
            "max": 2,
            "prereq": "p_mind_flay",
            "ranks": [
              "精神鞭笞每次造成的伤害都比前一次提高10%。",
              "精神鞭笞每次造成的伤害都比前一次提高20%。"
            ]
          },
          {
            "id": "t1326159",
            "name": "黑暗启发",
            "icon": "spell_warlock_demonsoul",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "你的心灵震爆和完整引导的精神鞭笞会触发黑暗启发，使你和小队成员的精神提高3%，持续10秒。",
              "你的心灵震爆和完整引导的精神鞭笞会触发黑暗启发，使你和小队成员的精神提高6%，持续10秒。",
              "你的心灵震爆和完整引导的精神鞭笞会触发黑暗启发，使你和小队成员的精神提高9%，持续10秒。",
              "你的心灵震爆和完整引导的精神鞭笞会触发黑暗启发，使你和小队成员的精神提高12%，持续10秒。",
              "你的心灵震爆和完整引导的精神鞭笞会触发黑暗启发，使你和小队成员的精神提高15%，持续10秒。"
            ]
          },
          {
            "id": "p_vampiric_embrace",
            "name": "吸血鬼的拥抱",
            "icon": "spell_shadow_unsummonbuilding",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "暗影魔法的能量笼罩你的目标，使你对其造成的暗影伤害总量的20%转而治疗所有队友。效果持续30秒。"
            ]
          },
          {
            "id": "p_shadow_weaving",
            "name": "暗影之波",
            "icon": "spell_shadow_blackplague",
            "row": 4,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "你的暗影伤害法术有33%的几率使目标受到的来自你的暗影伤害提高2%，持续15秒，最多叠加5次。",
              "你的暗影伤害法术有67%的几率使目标受到的来自你的暗影伤害提高2%，持续15秒，最多叠加5次。",
              "你的暗影伤害法术有100%的几率使目标受到的来自你的暗影伤害提高2%，持续15秒，最多叠加5次。"
            ]
          },
          {
            "id": "p_silence",
            "name": "沉默",
            "icon": "spell_shadow_impphaseshift",
            "row": 5,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使目标沉默，在5秒内无法施法，并打断其施法，持续3秒。"
            ]
          },
          {
            "id": "t1309950",
            "name": "噬灵传染",
            "icon": "spell_shadow_devouringplague",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的噬灵瘟疫的法力值消耗降低25%。 受到噬灵瘟疫影响的目标死亡时，瘟疫会传播给5码内的2名附近敌人，并保留剩余持续时间。",
              "使你的噬灵瘟疫的法力值消耗降低50%。 受到噬灵瘟疫影响的目标死亡时，瘟疫会传播给10码内的2名附近敌人，并保留剩余持续时间。"
            ]
          },
          {
            "id": "t1310076",
            "name": "提早离世",
            "icon": "spell_shadow_demonicfortitude",
            "row": 6,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "对生命值等于或低于20%的目标，使暗言术：灭的爆击几率提高15%。",
              "对生命值等于或低于20%的目标，使暗言术：灭的爆击几率提高30%。"
            ]
          },
          {
            "id": "p_darkness",
            "name": "黑暗",
            "icon": "spell_shadow_twilight",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "你造成的暗影伤害提高2%。",
              "你造成的暗影伤害提高4%。",
              "你造成的暗影伤害提高6%。",
              "你造成的暗影伤害提高8%。",
              "你造成的暗影伤害提高10%。"
            ]
          },
          {
            "id": "p_shadowform",
            "name": "暗影形态",
            "icon": "spell_shadow_shadowform",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "p_vampiric_embrace",
            "ranks": [
              "进入暗影形态，使你的暗影伤害提高10%，所有暗影法术消耗的法力值降低50%，暗影法术的爆击伤害加成提高100%，你受到的物理伤害降低15%。但是在此形态下，你无法施放治疗法术。"
            ]
          }
        ]
      }
    ]
  },
  "shaman": {
    "name": "萨满祭司",
    "icon": "⚡",
    "classIcon": "class_shaman",
    "presets": [
      {
        "name": "元素萨 (32/11/8)",
        "desc": "游戏内主流推荐加点 · 元素 32 / 增强 11 / 恢复 8 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "s_convection": 5,
          "s_concussion": 5,
          "t16578": 3,
          "s_call_of_flame": 3,
          "s_elemental_focus": 1,
          "t16086": 2,
          "s_eye_of_storm": 3,
          "s_call_of_thunder": 1,
          "t408438": 3,
          "s_elemental_fury": 5,
          "s_lightning_mastery": 1,
          "t16255": 5,
          "s_ancestral_know": 5,
          "t1223030": 1,
          "s_tidal_focus": 5,
          "t1223033": 3
        }
      },
      {
        "name": "增强萨 (17/31/3)",
        "desc": "游戏内主流推荐加点 · 元素 17 / 增强 31 / 恢复 3 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "s_concussion": 5,
          "t30160": 3,
          "s_reverberation": 3,
          "s_call_of_flame": 3,
          "s_elemental_focus": 1,
          "t16086": 2,
          "t16255": 5,
          "s_ancestral_know": 3,
          "t415140": 3,
          "t16266": 3,
          "t1223030": 1,
          "s_flurry": 5,
          "s_stormstrike": 1,
          "t30812": 2,
          "t1223031": 2,
          "s_maelstrom_weapon": 5,
          "t425336": 1,
          "s_tidal_focus": 3
        }
      },
      {
        "name": "奶萨 (0/10/41)",
        "desc": "游戏内主流推荐加点 · 元素 0 / 增强 10 / 恢复 41 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t16255": 5,
          "s_ancestral_know": 5,
          "s_imp_healing_wave": 5,
          "s_tidal_focus": 5,
          "t1223033": 3,
          "s_ancestral_healing": 3,
          "s_healing_focus": 3,
          "t408510": 1,
          "s_tidal_mastery": 5,
          "s_restorative_totems": 5,
          "s_mana_tide": 1,
          "t29206": 3,
          "s_nature_swiftness": 1,
          "s_purification": 5,
          "s_riptide": 1
        }
      }
    ],
    "trees": [
      {
        "id": "elemental",
        "name": "元素",
        "skills": [
          {
            "id": "s_convection",
            "name": "传导",
            "icon": "spell_nature_wispsplode",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的震击、闪电箭和闪电链的法力消耗降低2%。",
              "使你的震击、闪电箭和闪电链的法力消耗降低4%。",
              "使你的震击、闪电箭和闪电链的法力消耗降低6%。",
              "使你的震击、闪电箭和闪电链的法力消耗降低8%。",
              "使你的震击、闪电箭和闪电链的法力消耗降低10%。"
            ]
          },
          {
            "id": "s_concussion",
            "name": "震荡",
            "icon": "spell_nature_earthshock",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的闪电箭、闪电链和大地震击造成的伤害提高1%。",
              "使你的闪电箭、闪电链和大地震击造成的伤害提高2%。",
              "使你的闪电箭、闪电链和大地震击造成的伤害提高3%。",
              "使你的闪电箭、闪电链和大地震击造成的伤害提高4%。",
              "使你的闪电箭、闪电链和大地震击造成的伤害提高5%。"
            ]
          },
          {
            "id": "t30160",
            "name": "元素浩劫",
            "icon": "spell_fire_elementaldevastation",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "直接伤害法术造成爆击后，你的近战攻击爆击几率提高3%，持续10秒。",
              "直接伤害法术造成爆击后，你的近战攻击爆击几率提高6%，持续10秒。",
              "直接伤害法术造成爆击后，你的近战攻击爆击几率提高9%，持续10秒。"
            ]
          },
          {
            "id": "s_reverberation",
            "name": "回响",
            "icon": "spell_frost_frostward",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的震击法术的冷却时间减少0.2秒。",
              "使你的震击法术的冷却时间减少0.4秒。",
              "使你的震击法术的冷却时间减少0.6秒。",
              "使你的震击法术的冷却时间减少0.8秒。",
              "使你的震击法术的冷却时间减少1秒。"
            ]
          },
          {
            "id": "t16578",
            "name": "元素迅捷",
            "icon": "spell_lightning_lightningbolt01",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的闪电箭和闪电链的施法时间缩短0.17秒。",
              "使你的闪电箭和闪电链的施法时间缩短0.33秒。",
              "使你的闪电箭和闪电链的施法时间缩短0.5秒。"
            ]
          },
          {
            "id": "s_call_of_flame",
            "name": "烈焰召唤",
            "icon": "spell_fire_immolation",
            "row": 2,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的火焰图腾以及烈焰震击和火焰新星造成的伤害提高5%，并使烈焰震击的持续时间延长3秒。",
              "使你的火焰图腾以及烈焰震击和火焰新星造成的伤害提高10%，并使烈焰震击的持续时间延长6秒。",
              "使你的火焰图腾以及烈焰震击和火焰新星造成的伤害提高15%，并使烈焰震击的持续时间延长9秒。"
            ]
          },
          {
            "id": "s_elemental_focus",
            "name": "元素集中",
            "icon": "spell_shadow_manaburn",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你有10%的几率在施放任何火焰、冰霜或自然系的伤害性法术之后进入节能施法状态。这个状态可以使你的下一个伤害性法术所消耗的法力值减少100%。"
            ]
          },
          {
            "id": "s_elemental_warding",
            "name": "元素防护",
            "icon": "spell_nature_spiritarmor",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "受到的火焰、冰霜和自然效果伤害降低3%。",
              "受到的火焰、冰霜和自然效果伤害降低7%。",
              "受到的火焰、冰霜和自然效果伤害降低10%。"
            ]
          },
          {
            "id": "t16086",
            "name": "火焰试炼",
            "icon": "spell_fire_sealoffire",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的火焰新星造成的伤害提高10%，冷却时间缩短2秒，并使你的熔岩图腾的持续时间延长10秒。",
              "使你的火焰新星造成的伤害提高20%，冷却时间缩短4秒，并使你的熔岩图腾的持续时间延长20秒。"
            ]
          },
          {
            "id": "s_eye_of_storm",
            "name": "风暴之眼",
            "icon": "spell_nature_eyeofthestorm",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的闪电箭和闪电链有23%的几率在受到伤害时不损失施法时间。",
              "使你的闪电箭和闪电链有47%的几率在受到伤害时不损失施法时间。",
              "使你的闪电箭和闪电链有70%的几率在受到伤害时不损失施法时间。"
            ]
          },
          {
            "id": "t1222988",
            "name": "地缚",
            "icon": "spell_nature_stranglevines",
            "row": 4,
            "col": 4,
            "max": 1,
            "prereq": null,
            "ranks": [
              "施放地缚图腾时，使附近目标无法移动5秒。"
            ]
          },
          {
            "id": "t28999",
            "name": "元素射程",
            "icon": "spell_nature_stormreach",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的闪电箭、闪电链和火焰新星的射程提高3码。",
              "使你的闪电箭、闪电链和火焰新星的射程提高6码。"
            ]
          },
          {
            "id": "s_call_of_thunder",
            "name": "雷霆召唤",
            "icon": "spell_nature_callstorm",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你的闪电箭和闪电链的爆击几率提高5%。"
            ]
          },
          {
            "id": "t408438",
            "name": "闪电超载",
            "icon": "spell_nature_lightningoverload",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": "t16578",
            "ranks": [
              "你的闪电箭和闪电链有10%的几率对同一目标施放第二个类似法术，不消耗额外法力，只造成一半伤害且不产生威胁。",
              "你的闪电箭和闪电链有20%的几率对同一目标施放第二个类似法术，不消耗额外法力，只造成一半伤害且不产生威胁。",
              "你的闪电箭和闪电链有30%的几率对同一目标施放第二个类似法术，不消耗额外法力，只造成一半伤害且不产生威胁。"
            ]
          },
          {
            "id": "s_elemental_fury",
            "name": "元素之怒",
            "icon": "spell_fire_volcano",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": "t408438",
            "ranks": [
              "使你的灼热图腾、熔岩图腾以及你的火焰、冰霜和自然系法术的爆击伤害加成提高20%。",
              "使你的灼热图腾、熔岩图腾以及你的火焰、冰霜和自然系法术的爆击伤害加成提高40%。",
              "使你的灼热图腾、熔岩图腾以及你的火焰、冰霜和自然系法术的爆击伤害加成提高60%。",
              "使你的灼热图腾、熔岩图腾以及你的火焰、冰霜和自然系法术的爆击伤害加成提高80%。",
              "使你的灼热图腾、熔岩图腾以及你的火焰、冰霜和自然系法术的爆击伤害加成提高100%。"
            ]
          },
          {
            "id": "s_lightning_mastery",
            "name": "闪电掌握",
            "icon": "spell_nature_unrelentingstorm",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "s_call_of_thunder",
            "ranks": [
              "掌握闪电之力，使闪电箭的施法时间缩短0.5秒，并移除闪电链的冷却时间。持续15秒。"
            ]
          }
        ]
      },
      {
        "id": "enhancement",
        "name": "增强",
        "skills": [
          {
            "id": "s_earths_grasp",
            "name": "大地之握",
            "icon": "spell_nature_stoneclawtotem",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的石爪图腾的生命值提高25%，地缚图腾的影响范围增加10%。",
              "使你的石爪图腾的生命值提高50%，地缚图腾的影响范围增加20%。"
            ]
          },
          {
            "id": "t16255",
            "name": "雷鸣猛击",
            "icon": "ability_thunderbolt",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的所有法术和攻击的爆击几率提高1%。",
              "使你的所有法术和攻击的爆击几率提高2%。",
              "使你的所有法术和攻击的爆击几率提高3%。",
              "使你的所有法术和攻击的爆击几率提高4%。",
              "使你的所有法术和攻击的爆击几率提高5%。"
            ]
          },
          {
            "id": "s_ancestral_know",
            "name": "先祖知识",
            "icon": "spell_shadow_grimward",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的智力值提高2%。",
              "使你的智力值提高4%。",
              "使你的智力值提高6%。",
              "使你的智力值提高8%。",
              "使你的智力值提高10%。"
            ]
          },
          {
            "id": "t16258",
            "name": "守护图腾",
            "icon": "spell_nature_stoneskintotem",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的石肤图腾和风墙图腾所能吸收的伤害提高10%，根基图腾的冷却时间减少1秒。",
              "使你的石肤图腾和风墙图腾所能吸收的伤害提高20%，根基图腾的冷却时间减少2秒。"
            ]
          },
          {
            "id": "t415140",
            "name": "聪慧",
            "icon": "spell_nature_mentalquickness",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的攻击强度提高，数值相当于你智力的50%。",
              "使你的攻击强度提高，数值相当于你智力的100%。",
              "使你的攻击强度提高，数值相当于你智力的150%。"
            ]
          },
          {
            "id": "t16261",
            "name": "强化闪电之盾",
            "icon": "spell_nature_lightningshield",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的闪电之盾法术所造成的伤害提高5%。",
              "使你的闪电之盾法术所造成的伤害提高10%。",
              "使你的闪电之盾法术所造成的伤害提高15%。"
            ]
          },
          {
            "id": "t16266",
            "name": "元素武器",
            "icon": "spell_fire_flametounge",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的石化武器所提供的近战攻击强度加成提高7%，风怒武器所提供的近战攻击强度加成提高13%，火舌武器和冰封武器所造成的伤害提高5%。",
              "使你的石化武器所提供的近战攻击强度加成提高13%，风怒武器所提供的近战攻击强度加成提高27%，火舌武器和冰封武器所造成的伤害提高10%。",
              "使你的石化武器所提供的近战攻击强度加成提高20%，风怒武器所提供的近战攻击强度加成提高40%，火舌武器和冰封武器所造成的伤害提高15%。"
            ]
          },
          {
            "id": "t1223030",
            "name": "萨满专注",
            "icon": "spell_nature_elementalabsorption",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你的震击和闪电之盾消耗的法力值降低45%。"
            ]
          },
          {
            "id": "s_anticipation",
            "name": "预知",
            "icon": "spell_nature_mirrorimage",
            "row": 3,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的躲闪几率提高2%。",
              "使你的躲闪几率提高4%。",
              "使你的躲闪几率提高6%。"
            ]
          },
          {
            "id": "t16252",
            "name": "坚韧",
            "icon": "spell_holy_devotion",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的耐力提高2%。",
              "使你的耐力提高4%。",
              "使你的耐力提高6%。",
              "使你的耐力提高8%。",
              "使你的耐力提高10%。"
            ]
          },
          {
            "id": "s_flurry",
            "name": "乱舞",
            "icon": "ability_ghoulfrenzy",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": "t415140",
            "ranks": [
              "近战攻击造成爆击后，使你接下来的3次攻击的攻击速度提高6%。",
              "近战攻击造成爆击后，使你接下来的3次攻击的攻击速度提高12%。",
              "近战攻击造成爆击后，使你接下来的3次攻击的攻击速度提高18%。",
              "近战攻击造成爆击后，使你接下来的3次攻击的攻击速度提高24%。",
              "近战攻击造成爆击后，使你接下来的3次攻击的攻击速度提高30%。"
            ]
          },
          {
            "id": "s_stormstrike",
            "name": "风暴打击",
            "icon": "ability_shaman_stormstrike",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "立即打击，造成150%武器伤害，并使你下一次用闪电箭、闪电链或大地震击对该目标造成的伤害提高20%，持续12秒。"
            ]
          },
          {
            "id": "s_ghost_wolf",
            "name": "强化幽魂之狼",
            "icon": "spell_nature_spiritwolf",
            "row": 4,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的幽魂之狼法术的施法时间缩短1秒，且可在室内使用。",
              "使你的幽魂之狼法术的施法时间缩短3秒，且可在室内使用。"
            ]
          },
          {
            "id": "t16268",
            "name": "灵魂武器",
            "icon": "ability_parry",
            "row": 5,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "有几率招架敌人的近战攻击。未激活石化武器时，你的攻击产生的威胁值降低30%；激活石化武器时，产生的所有威胁值提高30%。"
            ]
          },
          {
            "id": "t30812",
            "name": "精神敏锐",
            "icon": "spell_nature_sleep",
            "row": 5,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的法术伤害和治疗效果最多提高相当于你智力15%的数值。",
              "使你的法术伤害和治疗效果最多提高相当于你智力30%的数值。"
            ]
          },
          {
            "id": "t1223031",
            "name": "强化风暴打击",
            "icon": "spell_shaman_improvedstormstrike",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": "s_stormstrike",
            "ranks": [
              "使用风暴打击时，你有50%的几率获得50%的施法时法力回复，持续15秒；每当你躲闪或招架时，风暴打击的冷却时间有50%的几率重置。",
              "使用风暴打击时，你有100%的几率获得50%的施法时法力回复，持续15秒；每当你躲闪或招架时，风暴打击的冷却时间有100%的几率重置。"
            ]
          },
          {
            "id": "s_maelstrom_weapon",
            "name": "漩涡武器",
            "icon": "spell_shaman_maelstromweapon",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "近战攻击造成伤害时，你有几率使下一个闪电箭的施法时间和法力消耗降低4%。最多叠加5次。持续30秒。",
              "近战攻击造成伤害时，你有几率使下一个闪电箭的施法时间和法力消耗降低8%。最多叠加5次。持续30秒。",
              "近战攻击造成伤害时，你有几率使下一个闪电箭的施法时间和法力消耗降低12%。最多叠加5次。持续30秒。",
              "近战攻击造成伤害时，你有几率使下一个闪电箭的施法时间和法力消耗降低16%。最多叠加5次。持续30秒。",
              "近战攻击造成伤害时，你有几率使下一个闪电箭的施法时间和法力消耗降低20%。最多叠加5次。持续30秒。"
            ]
          },
          {
            "id": "t425336",
            "name": "先知之怒",
            "icon": "spell_nature_bloodlust",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "t30812",
            "ranks": [
              "使你的攻击速度提高30%，持续25秒。"
            ]
          }
        ]
      },
      {
        "id": "restoration",
        "name": "恢复",
        "skills": [
          {
            "id": "s_imp_healing_wave",
            "name": "强化治疗波",
            "icon": "spell_nature_magicimmunity",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的治疗波的施法时间减少0.1秒。",
              "使你的治疗波的施法时间减少0.2秒。",
              "使你的治疗波的施法时间减少0.3秒。",
              "使你的治疗波的施法时间减少0.4秒。",
              "使你的治疗波的施法时间减少0.5秒。"
            ]
          },
          {
            "id": "s_tidal_focus",
            "name": "潮汐集中",
            "icon": "spell_frost_manarecharge",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的治疗法术法力消耗降低1%，并使你的命中几率提高1%。",
              "使你的治疗法术法力消耗降低2%，并使你的命中几率提高2%。",
              "使你的治疗法术法力消耗降低3%，并使你的命中几率提高3%。",
              "使你的治疗法术法力消耗降低4%，并使你的命中几率提高4%。",
              "使你的治疗法术法力消耗降低5%，并使你的命中几率提高5%。"
            ]
          },
          {
            "id": "t1223033",
            "name": "全神贯注",
            "icon": "spell_nature_sleep",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你在施法时仍保持17%的法力值恢复速度。",
              "使你在施法时仍保持33%的法力值恢复速度。",
              "使你在施法时仍保持50%的法力值恢复速度。"
            ]
          },
          {
            "id": "t29187",
            "name": "自然优雅",
            "icon": "spell_nature_healingtouch",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的法术造成的威胁值降低5%。",
              "使你的法术造成的威胁值降低10%。",
              "使你的法术造成的威胁值降低15%。"
            ]
          },
          {
            "id": "s_totemic_focus",
            "name": "图腾集中",
            "icon": "spell_nature_moonglow",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的图腾以及任何召唤或移动图腾的法术所消耗的法力值降低5%。",
              "使你的图腾以及任何召唤或移动图腾的法术所消耗的法力值降低10%。",
              "使你的图腾以及任何召唤或移动图腾的法术所消耗的法力值降低15%。",
              "使你的图腾以及任何召唤或移动图腾的法术所消耗的法力值降低20%。",
              "使你的图腾以及任何召唤或移动图腾的法术所消耗的法力值降低25%。"
            ]
          },
          {
            "id": "t16184",
            "name": "强化复生",
            "icon": "spell_nature_reincarnation",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的复生法术冷却时间缩短10分钟，最大生命值提高2%，并使你复生时获得的生命值和法力值额外提高10%。",
              "使你的复生法术冷却时间缩短20分钟，最大生命值提高4%，并使你复生时获得的生命值和法力值额外提高20%。"
            ]
          },
          {
            "id": "s_ancestral_healing",
            "name": "先祖治疗",
            "icon": "spell_nature_undyingstrength",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "在你的任何一个治疗法术对目标造成极效治疗效果后，使目标因装备而获得的护甲值提高8%，持续15秒。",
              "在你的任何一个治疗法术对目标造成极效治疗效果后，使目标因装备而获得的护甲值提高17%，持续15秒。",
              "在你的任何一个治疗法术对目标造成极效治疗效果后，使目标因装备而获得的护甲值提高25%，持续15秒。"
            ]
          },
          {
            "id": "s_healing_focus",
            "name": "治疗专注",
            "icon": "spell_nature_healingwavelesser",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的治疗法术有23%的几率在受到伤害时不损失施法时间。",
              "使你的治疗法术有47%的几率在受到伤害时不损失施法时间。",
              "使你的治疗法术有70%的几率在受到伤害时不损失施法时间。"
            ]
          },
          {
            "id": "t408510",
            "name": "水之护盾",
            "icon": "ability_shaman_watershield",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "施法者被3个水球环绕。当法术、近战或远程攻击命中施法者，或施法者的法术造成爆击时，恢复最大法力值的2%，并消耗一个水球。每隔数秒只会有一个水球被激活。持续10分钟。 萨满祭司在同一时间只能激活一种元素之盾。"
            ]
          },
          {
            "id": "s_tidal_mastery",
            "name": "潮汐掌握",
            "icon": "spell_nature_tranquility",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的治疗法术产生极效治疗的几率提高1%。",
              "使你的治疗法术产生极效治疗的几率提高2%。",
              "使你的治疗法术产生极效治疗的几率提高3%。",
              "使你的治疗法术产生极效治疗的几率提高4%。",
              "使你的治疗法术产生极效治疗的几率提高5%。"
            ]
          },
          {
            "id": "s_restorative_totems",
            "name": "恢复图腾",
            "icon": "spell_nature_manaregentotem",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的法力之泉图腾的效果提高5%，治疗之泉图腾的效果提高10%。",
              "使你的法力之泉图腾的效果提高10%，治疗之泉图腾的效果提高20%。",
              "使你的法力之泉图腾的效果提高15%，治疗之泉图腾的效果提高30%。",
              "使你的法力之泉图腾的效果提高20%，治疗之泉图腾的效果提高40%。",
              "使你的法力之泉图腾的效果提高25%，治疗之泉图腾的效果提高50%。"
            ]
          },
          {
            "id": "s_mana_tide",
            "name": "法力之潮图腾",
            "icon": "spell_frost_summonwaterelemental",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "在施法者身边召唤一个生命值为5点的法力之潮图腾，持续12秒。它可以为半径30码范围内的小队成员每3秒回复88点法力值。"
            ]
          },
          {
            "id": "t29206",
            "name": "治疗之道",
            "icon": "spell_nature_healingway",
            "row": 5,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "治疗波的效果提高8%。",
              "治疗波的效果提高17%。",
              "治疗波的效果提高25%。"
            ]
          },
          {
            "id": "s_nature_swiftness",
            "name": "自然迅捷",
            "icon": "spell_nature_ravenform",
            "row": 5,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活之后，你的下一个施法时间低于10秒的自然法术会成为瞬发法术。"
            ]
          },
          {
            "id": "s_purification",
            "name": "净化",
            "icon": "spell_frost_wizardmark",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的治疗法术的效果提高2%。",
              "使你的治疗法术的效果提高4%。",
              "使你的治疗法术的效果提高6%。",
              "使你的治疗法术的效果提高8%。",
              "使你的治疗法术的效果提高10%。"
            ]
          },
          {
            "id": "s_riptide",
            "name": "激流",
            "icon": "spell_nature_riptide",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "t29206",
            "ranks": [
              "在15秒内为一个友方目标恢复445点生命值，并使你对该目标直接施放的治疗链效果提高25%。"
            ]
          }
        ]
      }
    ]
  },
  "mage": {
    "name": "法师",
    "icon": "🧙‍♂️",
    "classIcon": "class_mage",
    "presets": [
      {
        "name": "奥法 (35/13/3)",
        "desc": "游戏内主流推荐加点 · 奥术 35 / 火焰 13 / 冰霜 3 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t11237": 5,
          "t11210": 2,
          "m_arcane_focus": 5,
          "t400588": 2,
          "m_magic_attunement": 2,
          "t11242": 3,
          "m_arcane_blast": 1,
          "t11255": 1,
          "m_arcane_meditation": 3,
          "t1326079": 1,
          "m_presence_of_mind": 1,
          "m_arcane_mind": 5,
          "t15058": 3,
          "m_arcane_power": 1,
          "t18459": 5,
          "t11069": 5,
          "m_imp_flamestrike": 3,
          "t29438": 3
        }
      },
      {
        "name": "火法 (16/32/3)",
        "desc": "游戏内主流推荐加点 · 奥术 16 / 火焰 32 / 冰霜 3 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t11237": 5,
          "t11210": 2,
          "m_arcane_focus": 5,
          "t400588": 2,
          "m_arcane_blast": 1,
          "m_arcane_meditation": 1,
          "t18459": 5,
          "t11069": 5,
          "m_ignite": 5,
          "m_pyroblast": 1,
          "m_imp_fire_blast": 2,
          "m_imp_scorch": 3,
          "t400624": 1,
          "m_master_of_elements": 3,
          "m_critical_mass": 3,
          "m_fire_power": 3,
          "m_combustion": 1,
          "t29438": 3
        }
      },
      {
        "name": "冰法 (18/0/33)",
        "desc": "游戏内主流推荐加点 · 奥术 18 / 火焰 0 / 冰霜 33 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "m_wand_spec": 2,
          "t28574": 3,
          "t11210": 2,
          "m_magic_absorption": 2,
          "m_arcane_focus": 5,
          "m_magic_attunement": 1,
          "m_arcane_meditation": 3,
          "m_imp_frostbolt": 5,
          "t29438": 3,
          "m_ice_shards": 5,
          "m_imp_blizzard": 1,
          "t1312002": 1,
          "t16757": 2,
          "m_ice_block": 1,
          "m_shatter": 3,
          "t11190": 3,
          "m_cold_snap": 1,
          "t400647": 2,
          "m_winters_chill": 5,
          "m_ice_barrier": 1
        }
      }
    ],
    "trees": [
      {
        "id": "arcane",
        "name": "奥术",
        "skills": [
          {
            "id": "m_wand_spec",
            "name": "魔杖专精",
            "icon": "inv_wand_01",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的魔杖造成的伤害提高13%。",
              "使你的魔杖造成的伤害提高25%。"
            ]
          },
          {
            "id": "t11237",
            "name": "强化引导",
            "icon": "spell_nature_starfall",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的奥术飞弹有20%的几率在受到伤害时不损失施法时间，奥术冲击和奥术愤怒则有14%的几率。",
              "使你的奥术飞弹有40%的几率在受到伤害时不损失施法时间，奥术冲击和奥术愤怒则有28%的几率。",
              "使你的奥术飞弹有60%的几率在受到伤害时不损失施法时间，奥术冲击和奥术愤怒则有42%的几率。",
              "使你的奥术飞弹有80%的几率在受到伤害时不损失施法时间，奥术冲击和奥术愤怒则有56%的几率。",
              "使你的奥术飞弹有100%的几率在受到伤害时不损失施法时间，奥术冲击和奥术愤怒则有70%的几率。"
            ]
          },
          {
            "id": "t28574",
            "name": "奥术充沛",
            "icon": "spell_arcane_arcaneresilience",
            "row": 1,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的护甲提高相当于智力25%的数值。",
              "使你的护甲提高相当于智力50%的数值。",
              "使你的护甲提高相当于智力75%的数值。"
            ]
          },
          {
            "id": "t11210",
            "name": "奥术精妙",
            "icon": "spell_holy_dispelmagic",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的目标对你的所有法术的抗性降低8点，并使你的奥术系法术所造成的威胁值降低15%。",
              "使你的目标对你的所有法术的抗性降低15点，并使你的奥术系法术所造成的威胁值降低30%。"
            ]
          },
          {
            "id": "m_magic_absorption",
            "name": "魔法吸收",
            "icon": "spell_nature_astralrecalgroup",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的所有抗性提高5点，并使你完全抵抗的法术恢复最大法力值的1%。每秒最多触发一次。",
              "使你的所有抗性提高10点，并使你完全抵抗的法术恢复最大法力值的2%。每秒最多触发一次。"
            ]
          },
          {
            "id": "m_arcane_focus",
            "name": "奥术专注",
            "icon": "spell_shadow_manaburn",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你有2%的几率在任何伤害法术命中目标之后进入节能施法状态。节能施法状态可以使你的下一个伤害性法术所消耗的法力值减少100%。",
              "使你有4%的几率在任何伤害法术命中目标之后进入节能施法状态。节能施法状态可以使你的下一个伤害性法术所消耗的法力值减少100%。",
              "使你有6%的几率在任何伤害法术命中目标之后进入节能施法状态。节能施法状态可以使你的下一个伤害性法术所消耗的法力值减少100%。",
              "使你有8%的几率在任何伤害法术命中目标之后进入节能施法状态。节能施法状态可以使你的下一个伤害性法术所消耗的法力值减少100%。",
              "使你有10%的几率在任何伤害法术命中目标之后进入节能施法状态。节能施法状态可以使你的下一个伤害性法术所消耗的法力值减少100%。"
            ]
          },
          {
            "id": "t400588",
            "name": "飞弹连射",
            "icon": "ability_mage_missilebarrage",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "你的奥术冲击有20%的几率，奥术愤怒、火球术、寒冰箭和霜火之箭有10%的几率，使下一个奥术飞弹的引导时间缩短50%、法力消耗减少100%，且每0.5秒发射一次飞弹。",
              "你的奥术冲击有40%的几率，奥术愤怒、火球术、寒冰箭和霜火之箭有20%的几率，使下一个奥术飞弹的引导时间缩短50%、法力消耗减少100%，且每0.5秒发射一次飞弹。"
            ]
          },
          {
            "id": "m_magic_attunement",
            "name": "魔法协调",
            "icon": "inv_ability_mage_radiantspark",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的奥术法术的射程延长3码。",
              "使你的奥术法术的射程延长6码。"
            ]
          },
          {
            "id": "t11242",
            "name": "奥术冲撞",
            "icon": "spell_nature_wispsplode",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的奥术法术爆击几率提高2%。",
              "使你的奥术法术爆击几率提高4%。",
              "使你的奥术法术爆击几率提高6%。"
            ]
          },
          {
            "id": "m_arcane_blast",
            "name": "奥术冲击",
            "icon": "spell_arcane_blast",
            "row": 3,
            "col": 4,
            "max": 1,
            "prereq": null,
            "ranks": [
              "用能量冲击目标，造成34到38点奥术伤害。每次施放奥术冲击，获得相当于你智力12%的法术伤害加成，奥术冲击的法力消耗提高100%。该效果最多叠加4次，从首次生效时起持续18秒。"
            ]
          },
          {
            "id": "t11252",
            "name": "奥术护盾",
            "icon": "spell_shadow_detectlesserinvisibility",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的法力护盾每吸收一点伤害所消耗的法力值减少17%，并使你的魔甲术提供的抗性提高25%。",
              "使你的法力护盾每吸收一点伤害所消耗的法力值减少33%，并使你的魔甲术提供的抗性提高50%。"
            ]
          },
          {
            "id": "t11255",
            "name": "强化法术反制",
            "icon": "spell_frost_iceshock",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "你的法术反制还会使目标沉默2秒。",
              "你的法术反制还会使目标沉默4秒。"
            ]
          },
          {
            "id": "m_arcane_meditation",
            "name": "奥术冥想",
            "icon": "spell_shadow_siphonmana",
            "row": 4,
            "col": 3,
            "max": 3,
            "prereq": "m_arcane_focus",
            "ranks": [
              "使你在施法时仍保持17%的法力回复速度。",
              "使你在施法时仍保持33%的法力回复速度。",
              "使你在施法时仍保持50%的法力回复速度。"
            ]
          },
          {
            "id": "t1326079",
            "name": "奥术愤怒",
            "icon": "ability_mage_netherwindpresence",
            "row": 4,
            "col": 4,
            "max": 1,
            "prereq": "m_arcane_blast",
            "ranks": [
              "向敌方目标发射一枚由纯粹奥术能量构成的飞弹，造成122到146点奥术伤害。此法术额外获得相当于你法力值上限5%的法术伤害加成。"
            ]
          },
          {
            "id": "m_presence_of_mind",
            "name": "气定神闲",
            "icon": "spell_nature_enchantarmor",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活之后，你的下一个施法时间低于10秒的法师法术会成为瞬发法术。"
            ]
          },
          {
            "id": "m_arcane_mind",
            "name": "奥术心智",
            "icon": "spell_shadow_charm",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的智力提高2%，奥术法术的爆击伤害加成提高20%。",
              "使你的智力提高4%，奥术法术的爆击伤害加成提高40%。",
              "使你的智力提高6%，奥术法术的爆击伤害加成提高60%。",
              "使你的智力提高8%，奥术法术的爆击伤害加成提高80%。",
              "使你的智力提高10%，奥术法术的爆击伤害加成提高100%。"
            ]
          },
          {
            "id": "t15058",
            "name": "奥术增效",
            "icon": "spell_shadow_teleport",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的法术伤害提高1%，爆击几率提高1%。",
              "使你的法术伤害提高2%，爆击几率提高2%。",
              "使你的法术伤害提高3%，爆击几率提高3%。"
            ]
          },
          {
            "id": "m_arcane_power",
            "name": "奥术强化",
            "icon": "spell_nature_lightning",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "m_presence_of_mind",
            "ranks": [
              "在接下来的15秒内，你的法术造成的伤害提高30%，但消耗的法力值也提高30%。"
            ]
          }
        ]
      },
      {
        "id": "fire",
        "name": "火焰",
        "skills": [
          {
            "id": "t18459",
            "name": "烧尽",
            "icon": "spell_fire_flameshock",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的火焰冲击、冰枪术、奥术冲击和灼烧的爆击几率提高2%。",
              "使你的火焰冲击、冰枪术、奥术冲击和灼烧的爆击几率提高4%。",
              "使你的火焰冲击、冰枪术、奥术冲击和灼烧的爆击几率提高6%。",
              "使你的火焰冲击、冰枪术、奥术冲击和灼烧的爆击几率提高8%。",
              "使你的火焰冲击、冰枪术、奥术冲击和灼烧的爆击几率提高10%。"
            ]
          },
          {
            "id": "t11069",
            "name": "助燃",
            "icon": "spell_fire_flamebolt",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的火球术、霜火之箭和奥术愤怒的施法时间缩短0.1秒。",
              "使你的火球术、霜火之箭和奥术愤怒的施法时间缩短0.2秒。",
              "使你的火球术、霜火之箭和奥术愤怒的施法时间缩短0.3秒。",
              "使你的火球术、霜火之箭和奥术愤怒的施法时间缩短0.4秒。",
              "使你的火球术、霜火之箭和奥术愤怒的施法时间缩短0.5秒。"
            ]
          },
          {
            "id": "m_ignite",
            "name": "点燃",
            "icon": "spell_fire_incinerate",
            "row": 2,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "你的火焰伤害法术造成爆击后会使目标燃烧，在4秒内额外造成相当于该法术伤害8%的伤害。",
              "你的火焰伤害法术造成爆击后会使目标燃烧，在4秒内额外造成相当于该法术伤害16%的伤害。",
              "你的火焰伤害法术造成爆击后会使目标燃烧，在4秒内额外造成相当于该法术伤害24%的伤害。",
              "你的火焰伤害法术造成爆击后会使目标燃烧，在4秒内额外造成相当于该法术伤害32%的伤害。",
              "你的火焰伤害法术造成爆击后会使目标燃烧，在4秒内额外造成相当于该法术伤害40%的伤害。"
            ]
          },
          {
            "id": "m_flame_throwing",
            "name": "烈焰投掷",
            "icon": "spell_fire_flare",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的火焰法术的射程增加3码。",
              "使你的火焰法术的射程增加6码。"
            ]
          },
          {
            "id": "m_impact",
            "name": "冲击",
            "icon": "spell_fire_meteorstorm",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的火焰法术有3%的几率令目标昏迷2秒。",
              "使你的火焰法术有7%的几率令目标昏迷2秒。",
              "使你的火焰法术有10%的几率令目标昏迷2秒。"
            ]
          },
          {
            "id": "m_burning_soul",
            "name": "燃烧之魂",
            "icon": "spell_fire_fire",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的火焰系法术有23%的几率不会因为你受到伤害而被干扰，火焰系法术所造成的威胁值降低10%。",
              "使你的火焰系法术有47%的几率不会因为你受到伤害而被干扰，火焰系法术所造成的威胁值降低20%。",
              "使你的火焰系法术有70%的几率不会因为你受到伤害而被干扰，火焰系法术所造成的威胁值降低30%。"
            ]
          },
          {
            "id": "m_imp_flamestrike",
            "name": "强化烈焰风暴",
            "icon": "spell_fire_selfdestruct",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的烈焰风暴造成爆击的几率提高5%。",
              "使你的烈焰风暴造成爆击的几率提高10%。",
              "使你的烈焰风暴造成爆击的几率提高15%。"
            ]
          },
          {
            "id": "m_pyroblast",
            "name": "炎爆术",
            "icon": "spell_fire_fireball02",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "发射一枚巨大的火球，对目标造成101到131点火焰伤害，并在12秒内造成总计44点额外伤害。"
            ]
          },
          {
            "id": "m_imp_fire_blast",
            "name": "强化火焰冲击",
            "icon": "spell_fire_lavaspawn",
            "row": 3,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的火焰冲击的冷却时间缩短1秒，射程增加8码。",
              "使你的火焰冲击的冷却时间缩短2秒，射程增加15码。"
            ]
          },
          {
            "id": "m_imp_scorch",
            "name": "强化灼烧",
            "icon": "spell_fire_soulburn",
            "row": 4,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "你的灼烧法术有33%的几率使目标更易受到火焰伤害。该易伤效果会使你对该目标造成的所有火焰伤害提高3%，持续30秒，最多叠加5次。",
              "你的灼烧法术有67%的几率使目标更易受到火焰伤害。该易伤效果会使你对该目标造成的所有火焰伤害提高3%，持续30秒，最多叠加5次。",
              "你的灼烧法术有100%的几率使目标更易受到火焰伤害。该易伤效果会使你对该目标造成的所有火焰伤害提高3%，持续30秒，最多叠加5次。"
            ]
          },
          {
            "id": "t11094",
            "name": "强化防护火焰结界",
            "icon": "spell_fire_firearmor",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "你的防护火焰结界有10%的几率将火焰法术反射给施法者。",
              "你的防护火焰结界有20%的几率将火焰法术反射给施法者。"
            ]
          },
          {
            "id": "t400624",
            "name": "热力迸发",
            "icon": "spell_fire_firebolt",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": "m_pyroblast",
            "ranks": [
              "火球术、霜火之箭、火焰冲击和灼烧的非周期性爆击会使你在20秒内施放的下一个炎爆术的施法时间缩短25%，最多叠加3次。火焰冲击每次造成伤害时，还会使该效果额外叠加一层。"
            ]
          },
          {
            "id": "m_master_of_elements",
            "name": "元素大师",
            "icon": "spell_fire_masterofelements",
            "row": 4,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "你的火焰和冰霜法术造成爆击时，会返还其基础法力消耗的10%。",
              "你的火焰和冰霜法术造成爆击时，会返还其基础法力消耗的20%。",
              "你的火焰和冰霜法术造成爆击时，会返还其基础法力消耗的30%。"
            ]
          },
          {
            "id": "m_critical_mass",
            "name": "火焰重击",
            "icon": "spell_nature_wispheal",
            "row": 5,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的火焰法术造成爆击的几率提高2%。",
              "使你的火焰法术造成爆击的几率提高4%。",
              "使你的火焰法术造成爆击的几率提高6%。"
            ]
          },
          {
            "id": "m_blast_wave",
            "name": "冲击波",
            "icon": "spell_holy_excorcism_02",
            "row": 5,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "施法者向外释放一道火焰冲击波，对冲击范围内的所有敌人造成154到184点火焰伤害，并使其眩晕，移动速度降低50%，持续6秒。"
            ]
          },
          {
            "id": "m_fire_power",
            "name": "火焰强化",
            "icon": "spell_fire_immolation",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "目标身上每有一个你施加的火焰效果，你的火焰法术造成的伤害就提高1%，最多提高4%。混合多个魔法派系的效果不计入其中。",
              "目标身上每有一个你施加的火焰效果，你的火焰法术造成的伤害就提高2%，最多提高8%。混合多个魔法派系的效果不计入其中。",
              "目标身上每有一个你施加的火焰效果，你的火焰法术造成的伤害就提高3%，最多提高12%。混合多个魔法派系的效果不计入其中。"
            ]
          },
          {
            "id": "m_combustion",
            "name": "燃烧",
            "icon": "spell_fire_sealoffire",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "m_critical_mass",
            "ranks": [
              "激活后，你的火焰伤害法术每次命中都会使你的火焰伤害法术爆击几率提高10%。该效果会持续到你用火焰法术造成3次非周期性爆击为止。"
            ]
          }
        ]
      },
      {
        "id": "frost",
        "name": "冰霜",
        "skills": [
          {
            "id": "t11189",
            "name": "冰霜障壁",
            "icon": "spell_frost_frostward",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的霜甲术和冰甲术提供的护甲和抗性提高15%，防护冰霜结界有10%的几率抵消其所防护的伤害法术，寒冰护体和防护冰霜结界吸收的伤害量提高10%。",
              "使你的霜甲术和冰甲术提供的护甲和抗性提高30%，防护冰霜结界有20%的几率抵消其所防护的伤害法术，寒冰护体和防护冰霜结界吸收的伤害量提高20%。"
            ]
          },
          {
            "id": "m_imp_frostbolt",
            "name": "强化寒冰箭",
            "icon": "spell_frost_frostbolt02",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的寒冰箭的施法时间缩短0.1秒。",
              "使你的寒冰箭的施法时间缩短0.2秒。",
              "使你的寒冰箭的施法时间缩短0.3秒。",
              "使你的寒冰箭的施法时间缩短0.4秒。",
              "使你的寒冰箭的施法时间缩短0.5秒。"
            ]
          },
          {
            "id": "t29438",
            "name": "精准",
            "icon": "spell_ice_magicdamage",
            "row": 1,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的所有法术的命中几率提高2%。",
              "使你的所有法术的命中几率提高4%。",
              "使你的所有法术的命中几率提高6%。"
            ]
          },
          {
            "id": "m_ice_shards",
            "name": "寒冰碎片",
            "icon": "spell_frost_iceshard",
            "row": 2,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的冰霜法术爆击所造成的伤害提高20%。",
              "使你的冰霜法术爆击所造成的伤害提高40%。",
              "使你的冰霜法术爆击所造成的伤害提高60%。",
              "使你的冰霜法术爆击所造成的伤害提高80%。",
              "使你的冰霜法术爆击所造成的伤害提高100%。"
            ]
          },
          {
            "id": "m_frostbite",
            "name": "霜寒刺骨",
            "icon": "spell_frost_frostarmor",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "你的冰冷效果有5%的几率将目标冰冻5秒。",
              "你的冰冷效果有10%的几率将目标冰冻5秒。",
              "你的冰冷效果有15%的几率将目标冰冻5秒。"
            ]
          },
          {
            "id": "t11165",
            "name": "强化冰霜新星",
            "icon": "spell_frost_freezingbreath",
            "row": 2,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的冰霜新星的冷却时间减少2秒。",
              "使你的冰霜新星的冷却时间减少4秒。"
            ]
          },
          {
            "id": "t11175",
            "name": "极寒冰霜",
            "icon": "spell_frost_wisp",
            "row": 2,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的冰冷效果持续时间延长11%，并使目标的速度额外降低3%。",
              "使你的冰冷效果持续时间延长22%，并使目标的速度额外降低7%。",
              "使你的冰冷效果持续时间延长33%，并使目标的速度额外降低10%。"
            ]
          },
          {
            "id": "t11160",
            "name": "冰霜导能",
            "icon": "spell_frost_stun",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的所有冰霜法术所消耗的法力值减少5%，冰霜系法术所造成的威胁值降低10%。",
              "使你的所有冰霜法术所消耗的法力值减少10%，冰霜系法术所造成的威胁值降低20%。",
              "使你的所有冰霜法术所消耗的法力值减少15%，冰霜系法术所造成的威胁值降低30%。"
            ]
          },
          {
            "id": "m_imp_blizzard",
            "name": "强化暴风雪",
            "icon": "spell_frost_icestorm",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "为你的暴风雪法术附加冰冷效果，使目标的移动速度降低15%，持续1.5秒。",
              "为你的暴风雪法术附加冰冷效果，使目标的移动速度降低25%，持续1.5秒。",
              "为你的暴风雪法术附加冰冷效果，使目标的移动速度降低40%，持续1.5秒。"
            ]
          },
          {
            "id": "t1312002",
            "name": "冰枪术",
            "icon": "spell_frost_frostblast",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "对一个敌方目标造成28到32点冰霜伤害。对被冰冻的目标造成的伤害提高300%。"
            ]
          },
          {
            "id": "t16757",
            "name": "极寒延伸",
            "icon": "spell_shadow_darkritual",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "Increases the range of your Frostbolt, Ice Lance, and Blizzard spells and the radius of your Frost Nova and Cone of Cold spells by 10%.",
              "Increases the range of your Frostbolt, Ice Lance, and Blizzard spells and the radius of your Frost Nova and Cone of Cold spells by 20%."
            ]
          },
          {
            "id": "m_ice_block",
            "name": "寒冰屏障",
            "icon": "spell_frost_frost",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "你被封在一块寒冰中，在10秒内免受所有物理攻击和法术影响，但在此期间无法攻击、移动或施法。"
            ]
          },
          {
            "id": "m_shatter",
            "name": "碎冰",
            "icon": "spell_frost_frostshock",
            "row": 4,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的所有法术对被冻结目标的爆击几率提高17%。",
              "使你的所有法术对被冻结目标的爆击几率提高33%。",
              "使你的所有法术对被冻结目标的爆击几率提高50%。"
            ]
          },
          {
            "id": "t11190",
            "name": "强化冰锥术",
            "icon": "spell_frost_glacier",
            "row": 5,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的冰锥术所造成的伤害提高12%。",
              "使你的冰锥术所造成的伤害提高23%。",
              "使你的冰锥术所造成的伤害提高35%。"
            ]
          },
          {
            "id": "m_cold_snap",
            "name": "急速冷却",
            "icon": "spell_frost_wizardmark",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "结束你所有其他冰霜法术的剩余冷却时间。"
            ]
          },
          {
            "id": "t400647",
            "name": "寒冰指",
            "icon": "ability_mage_wintersgrasp",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": "t1312002",
            "ranks": [
              "你的冰冷效果有15%的几率使你获得寒冰指效果，使你的下1次法术将目标视为已被冻结。持续15秒。",
              "你的冰冷效果有15%的几率使你获得寒冰指效果，使你的下2次法术将目标视为已被冻结。持续15秒。"
            ]
          },
          {
            "id": "m_winters_chill",
            "name": "深冬之寒",
            "icon": "spell_frost_chillingblast",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "你的寒冰箭以及受寒冰指强化的冰枪术有20%的几率对目标施加深冬之寒效果，使你的下一个冰锥术对其造成的伤害提高20%，并使该次冰锥术额外获得相当于你的法术伤害7%的伤害加成，最多叠加5次。",
              "你的寒冰箭以及受寒冰指强化的冰枪术有40%的几率对目标施加深冬之寒效果，使你的下一个冰锥术对其造成的伤害提高20%，并使该次冰锥术额外获得相当于你的法术伤害7%的伤害加成，最多叠加5次。",
              "你的寒冰箭以及受寒冰指强化的冰枪术有60%的几率对目标施加深冬之寒效果，使你的下一个冰锥术对其造成的伤害提高20%，并使该次冰锥术额外获得相当于你的法术伤害7%的伤害加成，最多叠加5次。",
              "你的寒冰箭以及受寒冰指强化的冰枪术有80%的几率对目标施加深冬之寒效果，使你的下一个冰锥术对其造成的伤害提高20%，并使该次冰锥术额外获得相当于你的法术伤害7%的伤害加成，最多叠加5次。",
              "你的寒冰箭以及受寒冰指强化的冰枪术有100%的几率对目标施加深冬之寒效果，使你的下一个冰锥术对其造成的伤害提高20%，并使该次冰锥术额外获得相当于你的法术伤害7%的伤害加成，最多叠加5次。"
            ]
          },
          {
            "id": "m_ice_barrier",
            "name": "寒冰护体",
            "icon": "spell_ice_lament",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "m_cold_snap",
            "ranks": [
              "为自己施加护盾，吸收448点伤害，并使你的冰霜伤害提高15%，持续1分钟。护盾存在期间，你的冰霜伤害额外提高5%，且施法不会因受到伤害而延迟。"
            ]
          }
        ]
      }
    ]
  },
  "warlock": {
    "name": "术士",
    "icon": "🔮",
    "classIcon": "class_warlock",
    "presets": [
      {
        "name": "痛苦术 (35/11/5)",
        "desc": "游戏内主流推荐加点 · 痛苦 35 / 恶魔学识 11 / 毁灭 5 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "wl_imp_life_tap": 2,
          "wl_suppression": 5,
          "wl_imp_corruption": 5,
          "t18827": 2,
          "wl_amplify_curse": 1,
          "t427712": 3,
          "t1310949": 5,
          "wl_nightfall": 2,
          "wl_siphon_life": 1,
          "t17804": 3,
          "wl_shadow_mastery": 5,
          "t1316697": 1,
          "wl_demonic_embrace": 5,
          "t1235316": 2,
          "t18731": 3,
          "wl_demonic_sacrifice": 1,
          "wl_imp_sb": 5
        }
      },
      {
        "name": "恶魔术 (2/31/18)",
        "desc": "游戏内主流推荐加点 · 痛苦 2 / 恶魔学识 31 / 毁灭 18 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "wl_suppression": 1,
          "wl_imp_corruption": 1,
          "wl_unholy_power": 5,
          "t18731": 3,
          "t1225214": 2,
          "t18754": 3,
          "wl_demonic_sacrifice": 1,
          "wl_master_summoner": 2,
          "t440870": 2,
          "t1293695": 3,
          "wl_soul_link": 1,
          "t412732": 3,
          "t23785": 5,
          "t425464": 1,
          "wl_imp_sb": 5,
          "wl_bane": 5,
          "wl_ruin": 5,
          "t17927": 3
        }
      },
      {
        "name": "毁灭术 (18/0/33)",
        "desc": "游戏内主流推荐加点 · 痛苦 18 / 恶魔学识 0 / 毁灭 33 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "wl_imp_life_tap": 2,
          "wl_suppression": 5,
          "wl_imp_corruption": 5,
          "t18827": 2,
          "wl_amplify_curse": 1,
          "t427712": 3,
          "wl_bane": 5,
          "wl_cataclysm": 3,
          "wl_aftermath": 5,
          "wl_ruin": 5,
          "wl_shadowburn": 1,
          "t17927": 3,
          "t1293817": 1,
          "t1225228": 1,
          "t412751": 3,
          "t426316": 5,
          "t412758": 1
        }
      }
    ],
    "trees": [
      {
        "id": "affliction",
        "name": "痛苦",
        "skills": [
          {
            "id": "wl_imp_life_tap",
            "name": "强化生命分流",
            "icon": "spell_shadow_burningspirit",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的生命分流法术所转化的法力值提高10%。",
              "使你的生命分流法术所转化的法力值提高20%。"
            ]
          },
          {
            "id": "wl_suppression",
            "name": "镇压",
            "icon": "spell_shadow_unsummonbuilding",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的命中几率提高1%，并使你产生的所有威胁降低4%。",
              "使你的命中几率提高2%，并使你产生的所有威胁降低8%。",
              "使你的命中几率提高3%，并使你产生的所有威胁降低12%。",
              "使你的命中几率提高4%，并使你产生的所有威胁降低16%。",
              "使你的命中几率提高5%，并使你产生的所有威胁降低20%。"
            ]
          },
          {
            "id": "wl_imp_corruption",
            "name": "强化腐蚀术",
            "icon": "spell_shadow_abominationexplosion",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的腐蚀术的施法时间缩短0.4秒，造成的伤害提高2%。",
              "使你的腐蚀术的施法时间缩短0.8秒，造成的伤害提高4%。",
              "使你的腐蚀术的施法时间缩短1.2秒，造成的伤害提高6%。",
              "使你的腐蚀术的施法时间缩短1.6秒，造成的伤害提高8%。",
              "使你的腐蚀术的施法时间缩短2秒，造成的伤害提高10%。"
            ]
          },
          {
            "id": "wl_grim_reach",
            "name": "无情延伸",
            "icon": "spell_shadow_callofbone",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的痛苦系法术的射程延长10%。",
              "使你的痛苦系法术的射程延长20%。"
            ]
          },
          {
            "id": "t437032",
            "name": "灵魂收割",
            "icon": "inv_elemental_primal_shadow",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "消灭受你的吸取灵魂影响且能为你提供经验值或荣誉值的目标时，使你的法力恢复速度提高50%，持续10秒。在此期间，施法时仍可保持50%的正常法力恢复速度。",
              "消灭受你的吸取灵魂影响且能为你提供经验值或荣誉值的目标时，使你的法力恢复速度提高100%，持续10秒。在此期间，施法时仍可保持100%的正常法力恢复速度。"
            ]
          },
          {
            "id": "t403511",
            "name": "强化吸取",
            "icon": "spell_shadow_haunting",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的吸取生命、吸取灵魂和吸取法力法术造成的伤害、吸取的生命或法力值提高7%。",
              "使你的吸取生命、吸取灵魂和吸取法力法术造成的伤害、吸取的生命或法力值提高13%。",
              "使你的吸取生命、吸取灵魂和吸取法力法术造成的伤害、吸取的生命或法力值提高20%。"
            ]
          },
          {
            "id": "t18827",
            "name": "强化痛苦灾祸",
            "icon": "spell_shadow_curseofsargeras",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的痛苦灾祸造成的伤害提高5%。",
              "使你的痛苦灾祸造成的伤害提高10%。"
            ]
          },
          {
            "id": "wl_fel_concen",
            "name": "恶魔专注",
            "icon": "spell_shadow_fingerofdeath",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的吸取生命、吸取法力、吸取灵魂和折磨法术有23%的几率在受到伤害时不损失施法时间。",
              "使你的吸取生命、吸取法力、吸取灵魂和折磨法术有47%的几率在受到伤害时不损失施法时间。",
              "使你的吸取生命、吸取法力、吸取灵魂和折磨法术有70%的几率在受到伤害时不损失施法时间。"
            ]
          },
          {
            "id": "wl_amplify_curse",
            "name": "诅咒增幅",
            "icon": "spell_shadow_contagion",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你的下一个虚弱诅咒或痛苦灾祸的效果提高50%，或使你的下一个疲劳诅咒的效果提高20%，持续30秒。"
            ]
          },
          {
            "id": "t427712",
            "name": "恶疾",
            "icon": "spell_shadow_unstableaffliction_2",
            "row": 3,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的腐蚀术、痛苦灾祸、末日灾祸、吸取灵魂、吸取生命、生命虹吸和折磨法术的爆击伤害加成提高33%。",
              "使你的腐蚀术、痛苦灾祸、末日灾祸、吸取灵魂、吸取生命、生命虹吸和折磨法术的爆击伤害加成提高67%。",
              "使你的腐蚀术、痛苦灾祸、末日灾祸、吸取灵魂、吸取生命、生命虹吸和折磨法术的爆击伤害加成提高100%。"
            ]
          },
          {
            "id": "t1310949",
            "name": "怨毒",
            "icon": "spell_shadow_focusedpower",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的暗影法术爆击几率提高1%。",
              "使你的暗影法术爆击几率提高2%。",
              "使你的暗影法术爆击几率提高3%。",
              "使你的暗影法术爆击几率提高4%。",
              "使你的暗影法术爆击几率提高5%。"
            ]
          },
          {
            "id": "wl_nightfall",
            "name": "夜幕",
            "icon": "spell_shadow_twilight",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的腐蚀术、吸取灵魂、吸取生命和折磨法术在对敌人造成伤害后有2%的几率令你进入暗影冥思。暗影冥思使你的下一个暗影箭的施法时间缩短100%。",
              "使你的腐蚀术、吸取灵魂、吸取生命和折磨法术在对敌人造成伤害后有4%的几率令你进入暗影冥思。暗影冥思使你的下一个暗影箭的施法时间缩短100%。"
            ]
          },
          {
            "id": "wl_curse_exhaustion",
            "name": "疲劳诅咒",
            "icon": "spell_shadow_grimward",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": "wl_amplify_curse",
            "ranks": [
              "使目标的速度降低30%，持续12秒。每个术士只能对一个目标施加一种诅咒，且同类诅咒不能叠加。"
            ]
          },
          {
            "id": "wl_siphon_life",
            "name": "生命虹吸",
            "icon": "spell_shadow_requiem",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "每3秒将目标的11点生命值转移给施法者，持续30秒。"
            ]
          },
          {
            "id": "t17804",
            "name": "灵魂虹吸",
            "icon": "spell_shadow_lifedrain02",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "Increases the damage done or health drained by your Drain Life, Drain Soul, and Wrack spells by 4% per each of your Corruption, Siphon Life, and Bane of Agony effects active on the target, up to a maximum increase of 12%.",
              "Increases the damage done or health drained by your Drain Life, Drain Soul, and Wrack spells by 8% per each of your Corruption, Siphon Life, and Bane of Agony effects active on the target, up to a maximum increase of 24%.",
              "Increases the damage done or health drained by your Drain Life, Drain Soul, and Wrack spells by 12% per each of your Corruption, Siphon Life, and Bane of Agony effects active on the target, up to a maximum increase of 36%."
            ]
          },
          {
            "id": "wl_shadow_mastery",
            "name": "暗影掌握",
            "icon": "spell_shadow_shadetruesight",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的暗影法术所造成的伤害或吸取的生命值提高2%。",
              "使你的暗影法术所造成的伤害或吸取的生命值提高4%。",
              "使你的暗影法术所造成的伤害或吸取的生命值提高6%。",
              "使你的暗影法术所造成的伤害或吸取的生命值提高8%。",
              "使你的暗影法术所造成的伤害或吸取的生命值提高10%。"
            ]
          },
          {
            "id": "t1316697",
            "name": "折磨",
            "icon": "ability_deathknight_hemorrhagicfever",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "wl_siphon_life",
            "ranks": [
              "Tears the target apart from within for 6 sec, inflicting 60 Shadow damage every 1 sec. While channeling, your Siphon Life, Corruption, and Bane of Agony effects on the target deal their periodic damage 100% faster."
            ]
          }
        ]
      },
      {
        "id": "demonology",
        "name": "恶魔学识",
        "skills": [
          {
            "id": "t18703",
            "name": "强化生命通道",
            "icon": "spell_shadow_lifedrain",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的生命通道转移的生命值提高20%，生命值消耗降低15%，并使生命通道产生的所有威胁降低50%。无论恶魔的生命值如何都可以使用生命通道。",
              "使你的生命通道转移的生命值提高40%，生命值消耗降低30%，并使生命通道产生的所有威胁降低100%。无论恶魔的生命值如何都可以使用生命通道。"
            ]
          },
          {
            "id": "t18694",
            "name": "强化小鬼",
            "icon": "spell_shadow_summonimp",
            "row": 1,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的小鬼的火焰箭造成的伤害提高10%，火焰之盾的效果提高10%。",
              "使你的小鬼的火焰箭造成的伤害提高20%，火焰之盾的效果提高20%。",
              "使你的小鬼的火焰箭造成的伤害提高30%，火焰之盾的效果提高30%。"
            ]
          },
          {
            "id": "wl_demonic_embrace",
            "name": "恶魔之拥",
            "icon": "spell_shadow_metamorphosis",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的耐力总值提高3%。",
              "使你的耐力总值提高6%。",
              "使你的耐力总值提高9%。",
              "使你的耐力总值提高12%。",
              "使你的耐力总值提高15%。"
            ]
          },
          {
            "id": "wl_unholy_power",
            "name": "邪恶强化",
            "icon": "spell_shadow_shadowworddominate",
            "row": 1,
            "col": 4,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的小鬼、虚空行者、魅魔、夜魔和地狱猎犬宠物造成的所有伤害提高2%。",
              "使你的小鬼、虚空行者、魅魔、夜魔和地狱猎犬宠物造成的所有伤害提高4%。",
              "使你的小鬼、虚空行者、魅魔、夜魔和地狱猎犬宠物造成的所有伤害提高6%。",
              "使你的小鬼、虚空行者、魅魔、夜魔和地狱猎犬宠物造成的所有伤害提高8%。",
              "使你的小鬼、虚空行者、魅魔、夜魔和地狱猎犬宠物造成的所有伤害提高10%。"
            ]
          },
          {
            "id": "t1235316",
            "name": "恶魔庇护",
            "icon": "spell_shadow_ragingscream",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的恶魔皮肤和恶魔护甲法术的效果提高15%。",
              "使你的恶魔皮肤和恶魔护甲法术的效果提高30%。"
            ]
          },
          {
            "id": "wl_imp_voidwalker",
            "name": "强化虚空行者",
            "icon": "spell_shadow_summonvoidwalker",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的虚空行者的折磨、吞噬暗影、牺牲和受难法术效果提高10%。",
              "使你的虚空行者的折磨、吞噬暗影、牺牲和受难法术效果提高20%。",
              "使你的虚空行者的折磨、吞噬暗影、牺牲和受难法术效果提高30%。"
            ]
          },
          {
            "id": "t18731",
            "name": "邪能活力",
            "icon": "spell_shadow_demonictactics",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的小鬼、虚空行者、魅魔、夜魔和地狱猎犬的生命值与法力值上限提高5%，并使你的法力值上限提高5%。",
              "使你的小鬼、虚空行者、魅魔、夜魔和地狱猎犬的生命值与法力值上限提高10%，并使你的法力值上限提高10%。",
              "使你的小鬼、虚空行者、魅魔、夜魔和地狱猎犬的生命值与法力值上限提高15%，并使你的法力值上限提高15%。"
            ]
          },
          {
            "id": "t1225214",
            "name": "恶魔能量",
            "icon": "spell_shadow_felmending",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "你造成的所有法术伤害会为宠物恢复相当于该伤害8%的生命值。通过生命分流获得法力时，召唤的恶魔会获得相当于你所得法力50%的法力。",
              "你造成的所有法术伤害会为宠物恢复相当于该伤害15%的生命值。通过生命分流获得法力时，召唤的恶魔会获得相当于你所得法力100%的法力。"
            ]
          },
          {
            "id": "t18754",
            "name": "强化萨亚德",
            "icon": "ability_warlock_randomizesuccubusincubus",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的魅魔和夜魔的剧痛鞭笞和安抚之吻法术的效果提高10%，并使你的魅魔和夜魔的诱惑和次级隐形术的持续时间延长10%。",
              "使你的魅魔和夜魔的剧痛鞭笞和安抚之吻法术的效果提高20%，并使你的魅魔和夜魔的诱惑和次级隐形术的持续时间延长20%。",
              "使你的魅魔和夜魔的剧痛鞭笞和安抚之吻法术的效果提高30%，并使你的魅魔和夜魔的诱惑和次级隐形术的持续时间延长30%。"
            ]
          },
          {
            "id": "wl_demonic_sacrifice",
            "name": "恶魔牺牲",
            "icon": "spell_shadow_psychicscream",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后，牺牲你召唤的恶魔来强化你力量的相反面向，使你获得一个持续2小时的效果。如果召唤任何恶魔，该效果会被取消。 小鬼：使你的暗影伤害提高15%。 虚空行者：每4秒恢复总法力值的2%。 魅魔/夜魔：使你的火焰伤害提高15%。 地狱猎犬：每4秒恢复总生命值的3%。"
            ]
          },
          {
            "id": "wl_master_summoner",
            "name": "召唤大师",
            "icon": "spell_shadow_impphaseshift",
            "row": 3,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你召唤小鬼、虚空行者、魅魔、夜魔和地狱猎犬的施法时间减少2秒，法力值消耗降低20%。",
              "使你召唤小鬼、虚空行者、魅魔、夜魔和地狱猎犬的施法时间减少4秒，法力值消耗降低40%。"
            ]
          },
          {
            "id": "t440870",
            "name": "屠戮",
            "icon": "spell_fire_fireball02",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的灵魂之火冷却时间缩短45%。当你对生命值低于35%的敌人施放暗影箭或灼热之痛时，这些法术造成的伤害提高3%，并且在接下来的10秒内，你的灵魂之火施法时间缩短20%，且不消耗灵魂碎片。",
              "使你的灵魂之火冷却时间缩短90%。当你对生命值低于35%的敌人施放暗影箭或灼热之痛时，这些法术造成的伤害提高6%，并且在接下来的10秒内，你的灵魂之火施法时间缩短40%，且不消耗灵魂碎片。"
            ]
          },
          {
            "id": "wl_fel_domination",
            "name": "恶魔支配",
            "icon": "spell_nature_removecurse",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": "wl_master_summoner",
            "ranks": [
              "你的下一个召唤小鬼、虚空行者、魅魔、夜魔或地狱猎犬的法术施法时间减少5.5秒，法力消耗减少50%。"
            ]
          },
          {
            "id": "t1293695",
            "name": "恶魔印记",
            "icon": "ability_demonhunter_chaoticimprint_fire",
            "row": 4,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "灼热之痛产生的威胁值降低17%，并给目标施加持续10秒的标记。你的宠物接下来对该目标的2次攻击造成65至68点火焰或暗影伤害，伤害类型取决于宠物。只有造成暗影伤害时，才会产生高额威胁值。",
              "灼热之痛产生的威胁值降低33%，并给目标施加持续10秒的标记。你的宠物接下来对该目标的4次攻击造成65至68点火焰或暗影伤害，伤害类型取决于宠物。只有造成暗影伤害时，才会产生高额威胁值。",
              "灼热之痛产生的威胁值降低50%，并给目标施加持续10秒的标记。你的宠物接下来对该目标的6次攻击造成65至68点火焰或暗影伤害，伤害类型取决于宠物。只有造成暗影伤害时，才会产生高额威胁值。"
            ]
          },
          {
            "id": "t1225217",
            "name": "强化地狱猎犬",
            "icon": "spell_shadow_summonfelhunter",
            "row": 5,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的地狱猎犬的腐坏之血的攻击强度降低效果、吞噬魔法的治疗效果以及多疑的侦测等级提高10%，并使其法术封锁的冷却时间缩短2秒。",
              "使你的地狱猎犬的腐坏之血的攻击强度降低效果、吞噬魔法的治疗效果以及多疑的侦测等级提高20%，并使其法术封锁的冷却时间缩短4秒。",
              "使你的地狱猎犬的腐坏之血的攻击强度降低效果、吞噬魔法的治疗效果以及多疑的侦测等级提高30%，并使其法术封锁的冷却时间缩短6秒。"
            ]
          },
          {
            "id": "wl_soul_link",
            "name": "灵魂链接",
            "icon": "spell_shadow_gathershadows",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": "wl_demonic_sacrifice",
            "ranks": [
              "激活时，施法者受到的所有伤害有30%由你的小鬼、虚空行者、魅魔、夜魔或地狱猎犬恶魔承受。此外，恶魔和主人造成的伤害都提高3%。只要恶魔处于激活状态，该效果就会持续。"
            ]
          },
          {
            "id": "t412732",
            "name": "恶魔知识",
            "icon": "spell_shadow_improvedvampiricembrace",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "召唤的恶魔宠物激活时，使你和恶魔宠物的法术伤害最多提高相当于你等级33%的数值。",
              "召唤的恶魔宠物激活时，使你和恶魔宠物的法术伤害最多提高相当于你等级67%的数值。",
              "召唤的恶魔宠物激活时，使你和恶魔宠物的法术伤害最多提高相当于你等级100%的数值。"
            ]
          },
          {
            "id": "t23785",
            "name": "恶魔学识大师",
            "icon": "spell_shadow_shadowpact",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "只要召唤的恶魔保持激活，使术士和该恶魔获得一个效果。 小鬼 - 火焰伤害提高2%。 虚空行者 - 受到的物理伤害降低2%。 魅魔/夜魔 - 暗影伤害提高2%。 地狱猎犬 - 受到的魔法伤害降低2%。",
              "只要召唤的恶魔保持激活，使术士和该恶魔获得一个效果。 小鬼 - 火焰伤害提高4%。 虚空行者 - 受到的物理伤害降低4%。 魅魔/夜魔 - 暗影伤害提高4%。 地狱猎犬 - 受到的魔法伤害降低4%。",
              "只要召唤的恶魔保持激活，使术士和该恶魔获得一个效果。 小鬼 - 火焰伤害提高6%。 虚空行者 - 受到的物理伤害降低6%。 魅魔/夜魔 - 暗影伤害提高6%。 地狱猎犬 - 受到的魔法伤害降低6%。",
              "只要召唤的恶魔保持激活，使术士和该恶魔获得一个效果。 小鬼 - 火焰伤害提高8%。 虚空行者 - 受到的物理伤害降低8%。 魅魔/夜魔 - 暗影伤害提高8%。 地狱猎犬 - 受到的魔法伤害降低8%。",
              "只要召唤的恶魔保持激活，使术士和该恶魔获得一个效果。 小鬼 - 火焰伤害提高10%。 虚空行者 - 受到的物理伤害降低10%。 魅魔/夜魔 - 暗影伤害提高10%。 地狱猎犬 - 受到的魔法伤害降低10%。"
            ]
          },
          {
            "id": "t425464",
            "name": "恶魔契约",
            "icon": "inv_ability_soulharvesterwarlock_demonicsoul",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "wl_soul_link",
            "ranks": [
              "你的恶魔牺牲效果不再因召唤其它不同的恶魔宠物而取消。重新召唤已被牺牲的宠物仍会取消该效果。"
            ]
          }
        ]
      },
      {
        "id": "destruction",
        "name": "毁灭",
        "skills": [
          {
            "id": "wl_destructive_reach",
            "name": "毁灭延伸",
            "icon": "spell_shadow_corpseexplode",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的毁灭系法术的射程增加10%。",
              "使你的毁灭系法术的射程增加20%。"
            ]
          },
          {
            "id": "wl_imp_sb",
            "name": "强化暗影箭",
            "icon": "spell_shadow_shadowbolt",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "你的暗影箭爆击会使目标受到来自你攻击的暗影伤害提高4%，持续12秒。",
              "你的暗影箭爆击会使目标受到来自你攻击的暗影伤害提高8%，持续12秒。",
              "你的暗影箭爆击会使目标受到来自你攻击的暗影伤害提高12%，持续12秒。",
              "你的暗影箭爆击会使目标受到来自你攻击的暗影伤害提高16%，持续12秒。",
              "你的暗影箭爆击会使目标受到来自你攻击的暗影伤害提高20%，持续12秒。"
            ]
          },
          {
            "id": "wl_bane",
            "name": "灾祸",
            "icon": "spell_shadow_deathpact",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的暗影箭、献祭和烧尽的施法时间缩短0.1秒，灵魂之火的施法时间缩短0.4秒。",
              "使你的暗影箭、献祭和烧尽的施法时间缩短0.2秒，灵魂之火的施法时间缩短0.8秒。",
              "使你的暗影箭、献祭和烧尽的施法时间缩短0.3秒，灵魂之火的施法时间缩短1.2秒。",
              "使你的暗影箭、献祭和烧尽的施法时间缩短0.4秒，灵魂之火的施法时间缩短1.6秒。",
              "使你的暗影箭、献祭和烧尽的施法时间缩短0.5秒，灵魂之火的施法时间缩短2秒。"
            ]
          },
          {
            "id": "t1225220",
            "name": "熔岩之肤",
            "icon": "ability_mage_moltenarmor",
            "row": 2,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你受到的所有伤害降低2%。",
              "使你受到的所有伤害降低4%。",
              "使你受到的所有伤害降低6%。",
              "使你受到的所有伤害降低8%。",
              "使你受到的所有伤害降低10%。"
            ]
          },
          {
            "id": "wl_cataclysm",
            "name": "灾变",
            "icon": "spell_fire_windsofwoe",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的毁灭系法术所消耗的法力值减少3%。",
              "使你的毁灭系法术所消耗的法力值减少6%。",
              "使你的毁灭系法术所消耗的法力值减少10%。"
            ]
          },
          {
            "id": "wl_aftermath",
            "name": "清算",
            "icon": "spell_fire_fire",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的献祭的初始伤害提高10%，并且你的燃烧有20%的几率使目标眩晕，移动速度降低50%，持续5秒。",
              "使你的献祭的初始伤害提高20%，并且你的燃烧有40%的几率使目标眩晕，移动速度降低50%，持续5秒。",
              "使你的献祭的初始伤害提高30%，并且你的燃烧有60%的几率使目标眩晕，移动速度降低50%，持续5秒。",
              "使你的献祭的初始伤害提高40%，并且你的燃烧有80%的几率使目标眩晕，移动速度降低50%，持续5秒。",
              "使你的献祭的初始伤害提高50%，并且你的燃烧有100%的几率使目标眩晕，移动速度降低50%，持续5秒。"
            ]
          },
          {
            "id": "wl_ruin",
            "name": "毁灭",
            "icon": "spell_shadow_shadowwordpain",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的毁灭系法术的爆击伤害加成提高20%。",
              "使你的毁灭系法术的爆击伤害加成提高40%。",
              "使你的毁灭系法术的爆击伤害加成提高60%。",
              "使你的毁灭系法术的爆击伤害加成提高80%。",
              "使你的毁灭系法术的爆击伤害加成提高100%。"
            ]
          },
          {
            "id": "wl_shadowburn",
            "name": "暗影灼烧",
            "icon": "spell_shadow_scourgebuild",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "立即冲击目标，造成65到74点暗影伤害。若消灭一个能为你提供经验值或荣誉值的敌人，且其在受到暗影灼烧后的8秒内死亡，则施法者获得一块灵魂碎片。"
            ]
          },
          {
            "id": "t18135",
            "name": "强烈",
            "icon": "spell_fire_lavaspawn",
            "row": 4,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的毁灭系法术有23%的几率在受到伤害时不损失施法时间。",
              "使你的毁灭系法术有47%的几率在受到伤害时不损失施法时间。",
              "使你的毁灭系法术有70%的几率在受到伤害时不损失施法时间。"
            ]
          },
          {
            "id": "t17927",
            "name": "苦痛之焰",
            "icon": "spell_fire_soulburn",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的灼热之痛的爆击几率提高3%，并使你所有毁灭系法术造成的伤害提高3%。",
              "使你的灼热之痛的爆击几率提高7%，并使你所有毁灭系法术造成的伤害提高7%。",
              "使你的灼热之痛的爆击几率提高10%，并使你所有毁灭系法术造成的伤害提高10%。"
            ]
          },
          {
            "id": "t1293817",
            "name": "燃烧",
            "icon": "spell_fire_fireball",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "点燃一个已经受到你的献祭法术影响的目标，造成88到111点火焰伤害，并消耗献祭效果。"
            ]
          },
          {
            "id": "t18073",
            "name": "火焰冲撞",
            "icon": "spell_fire_volcano",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": "t18135",
            "ranks": [
              "使你的灵魂之火有13%的几率令目标昏迷3秒，并使你的火焰之雨和地狱烈焰在持续期间有13%的几率令受到伤害的目标昏迷3秒。",
              "使你的灵魂之火有26%的几率令目标昏迷3秒，并使你的火焰之雨和地狱烈焰在持续期间有26%的几率令受到伤害的目标昏迷3秒。"
            ]
          },
          {
            "id": "t1225228",
            "name": "浩劫灾祸",
            "icon": "ability_warlock_baneofhavoc",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使目标遭受浩劫灾祸，持续5分钟，术士对其他目标造成的所有伤害有15%也会施加给被诅咒的目标。浩劫灾祸只能影响1个目标，且每个术士在任一目标身上只能维持一种灾祸。"
            ]
          },
          {
            "id": "t412751",
            "name": "硫磺烈火",
            "icon": "spell_fire_meteorstorm",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": "t1293817",
            "ranks": [
              "使你的燃烧法术爆击几率提高8%。",
              "使你的燃烧法术爆击几率提高17%。",
              "使你的燃烧法术爆击几率提高25%。"
            ]
          },
          {
            "id": "t426316",
            "name": "影与焰",
            "icon": "spell_fire_playingwithfire",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使用燃烧击中敌人后，你造成的所有暗影伤害提高4%，持续20秒。使用暗影灼烧击中敌人后，你造成的所有火焰伤害提高4%，持续20秒。此外，燃烧有20%的几率不消耗献祭，暗影灼烧有20%的几率立刻返还一块灵魂碎片。",
              "使用燃烧击中敌人后，你造成的所有暗影伤害提高8%，持续20秒。使用暗影灼烧击中敌人后，你造成的所有火焰伤害提高8%，持续20秒。此外，燃烧有40%的几率不消耗献祭，暗影灼烧有40%的几率立刻返还一块灵魂碎片。",
              "使用燃烧击中敌人后，你造成的所有暗影伤害提高12%，持续20秒。使用暗影灼烧击中敌人后，你造成的所有火焰伤害提高12%，持续20秒。此外，燃烧有60%的几率不消耗献祭，暗影灼烧有60%的几率立刻返还一块灵魂碎片。",
              "使用燃烧击中敌人后，你造成的所有暗影伤害提高16%，持续20秒。使用暗影灼烧击中敌人后，你造成的所有火焰伤害提高16%，持续20秒。此外，燃烧有80%的几率不消耗献祭，暗影灼烧有80%的几率立刻返还一块灵魂碎片。",
              "使用燃烧击中敌人后，你造成的所有暗影伤害提高20%，持续20秒。使用暗影灼烧击中敌人后，你造成的所有火焰伤害提高20%，持续20秒。此外，燃烧有100%的几率不消耗献祭，暗影灼烧有100%的几率立刻返还一块灵魂碎片。"
            ]
          },
          {
            "id": "t412758",
            "name": "烧尽",
            "icon": "spell_fire_burnout",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "t1225228",
            "ranks": [
              "对你的目标造成100到114点火焰伤害，如果目标受到献祭的影响，则额外造成25%的伤害。"
            ]
          }
        ]
      }
    ]
  },
  "druid": {
    "name": "德鲁伊",
    "icon": "🌿",
    "classIcon": "class_druid",
    "presets": [
      {
        "name": "鸟德 (38/0/13)",
        "desc": "游戏内主流推荐加点 · 平衡 38 / 野性战斗 0 / 恢复 13 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "d_imp_wrath": 5,
          "t1223081": 2,
          "d_moonglow": 3,
          "d_imp_moonfire": 2,
          "t1223082": 2,
          "d_natures_reach": 2,
          "t1223083": 1,
          "d_insect_swarm": 1,
          "t16909": 5,
          "t16850": 5,
          "t16880": 1,
          "d_eclipse": 3,
          "d_moonfury": 5,
          "d_moonkin_form": 1,
          "t17063": 5,
          "d_naturalist": 5,
          "d_reflection": 3
        }
      },
      {
        "name": "猫德 (9/32/10)",
        "desc": "游戏内主流推荐加点 · 平衡 9 / 野性战斗 32 / 恢复 10 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t1223081": 5,
          "t1223082": 2,
          "d_natures_reach": 2,
          "d_ferocity": 5,
          "d_furor": 3,
          "t17002": 2,
          "t16966": 3,
          "d_savage_fury": 2,
          "d_feral_charge": 1,
          "d_sharpened_claws": 2,
          "d_predatory_strikes": 3,
          "t1328613": 1,
          "t16958": 2,
          "d_leader_of_pack": 1,
          "t1223242": 2,
          "t1223246": 4,
          "t1322605": 1,
          "d_heart_of_wild": 5,
          "d_naturalist": 5
        }
      },
      {
        "name": "奶德 (13/0/38)",
        "desc": "游戏内主流推荐加点 · 平衡 13 / 野性战斗 0 / 恢复 38 · 对齐 1.60.1 客户端实装天赋树（含 11 月 10/11 日在线热修）",
        "points": {
          "t1223081": 5,
          "d_moonglow": 3,
          "t1223082": 2,
          "d_natures_reach": 2,
          "t1223083": 1,
          "t17063": 5,
          "d_heart_of_wild": 5,
          "d_naturalist": 5,
          "d_reflection": 3,
          "d_gift_of_nature": 5,
          "t1328621": 1,
          "d_imp_rejuv": 3,
          "d_swiftmend": 1,
          "d_nature_swiftness": 1,
          "t1309631": 3,
          "d_imp_regrowth": 5,
          "d_wild_growth": 1
        }
      }
    ],
    "trees": [
      {
        "id": "balance",
        "name": "平衡",
        "skills": [
          {
            "id": "d_imp_wrath",
            "name": "强化愤怒",
            "icon": "spell_nature_abolishmagic",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的愤怒法术的施法时间缩短0.1秒，法力值消耗降低10%。",
              "使你的愤怒法术的施法时间缩短0.2秒，法力值消耗降低20%。",
              "使你的愤怒法术的施法时间缩短0.3秒，法力值消耗降低30%。",
              "使你的愤怒法术的施法时间缩短0.4秒，法力值消耗降低40%。",
              "使你的愤怒法术的施法时间缩短0.5秒，法力值消耗降低50%。"
            ]
          },
          {
            "id": "t1223081",
            "name": "起源",
            "icon": "spell_arcane_arcane03",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的法术和技能造成的周期性伤害和治疗量提高2%。",
              "使你的法术和技能造成的周期性伤害和治疗量提高4%。",
              "使你的法术和技能造成的周期性伤害和治疗量提高6%。",
              "使你的法术和技能造成的周期性伤害和治疗量提高8%。",
              "使你的法术和技能造成的周期性伤害和治疗量提高10%。"
            ]
          },
          {
            "id": "d_moonglow",
            "name": "月光",
            "icon": "spell_nature_sentinal",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "你的伤害性法术的法力消耗降低8%。",
              "你的伤害性法术的法力消耗降低17%。",
              "你的伤害性法术的法力消耗降低25%。"
            ]
          },
          {
            "id": "d_imp_moonfire",
            "name": "强化月火术",
            "icon": "spell_nature_starfall",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的月火术的伤害和爆击几率提高5%。",
              "使你的月火术的伤害和爆击几率提高10%。"
            ]
          },
          {
            "id": "t1223082",
            "name": "自然的威严",
            "icon": "inv_staff_01",
            "row": 2,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的法术和近战攻击的爆击几率提高2%。",
              "使你的法术和近战攻击的爆击几率提高4%。"
            ]
          },
          {
            "id": "d_natures_reach",
            "name": "自然延伸",
            "icon": "spell_nature_naturetouchgrow",
            "row": 2,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的进攻性平衡法术射程提高10%，命中几率提高2%。",
              "使你的进攻性平衡法术射程提高20%，命中几率提高4%。"
            ]
          },
          {
            "id": "t16918",
            "name": "强化纠缠根须",
            "icon": "spell_nature_stranglevines",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的纠缠根须造成的伤害提高25%，且受其影响的目标可额外承受最多25%的伤害而不会打断该效果。",
              "使你的纠缠根须造成的伤害提高50%，且受其影响的目标可额外承受最多50%的伤害而不会打断该效果。",
              "使你的纠缠根须造成的伤害提高75%，且受其影响的目标可额外承受最多75%的伤害而不会打断该效果。"
            ]
          },
          {
            "id": "t1223083",
            "name": "自然的壮美",
            "icon": "spell_nature_natureresistancetotem",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": "t1223082",
            "ranks": [
              "使你的月火术和回春术的持续时间延长3秒，愈合的持续时间延长6秒，虫群的持续时间延长2秒。"
            ]
          },
          {
            "id": "d_insect_swarm",
            "name": "虫群",
            "icon": "spell_nature_insectswarm",
            "row": 4,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "敌人被飞虫围绕，攻击命中几率降低2%，在12秒内受到总计48点自然伤害。"
            ]
          },
          {
            "id": "t16909",
            "name": "复仇",
            "icon": "spell_nature_purge",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": "d_imp_moonfire",
            "ranks": [
              "使你的奥术和自然法术的爆击伤害加成提高20%。",
              "使你的奥术和自然法术的爆击伤害加成提高40%。",
              "使你的奥术和自然法术的爆击伤害加成提高60%。",
              "使你的奥术和自然法术的爆击伤害加成提高80%。",
              "使你的奥术和自然法术的爆击伤害加成提高100%。"
            ]
          },
          {
            "id": "t16850",
            "name": "强化星火术",
            "icon": "spell_arcane_starfire",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的星火术的施法时间缩短0.1秒，并有3%的几率使目标昏迷3秒。",
              "使你的星火术的施法时间缩短0.2秒，并有6%的几率使目标昏迷3秒。",
              "使你的星火术的施法时间缩短0.3秒，并有9%的几率使目标昏迷3秒。",
              "使你的星火术的施法时间缩短0.4秒，并有12%的几率使目标昏迷3秒。",
              "使你的星火术的施法时间缩短0.5秒，并有15%的几率使目标昏迷3秒。"
            ]
          },
          {
            "id": "t17245",
            "name": "繁茂",
            "icon": "inv_misc_herb_15",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你同时可被纠缠根须影响的目标数量上限提高1个。",
              "使你同时可被纠缠根须影响的目标数量上限提高2个。"
            ]
          },
          {
            "id": "t16880",
            "name": "自然之赐",
            "icon": "spell_nature_naturesblessing",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "你的所有非周期性法术爆击都会使你获得自然的赐福，使施法速度提高并公共冷却时间缩短10%，持续3秒。"
            ]
          },
          {
            "id": "d_eclipse",
            "name": "日月之蚀",
            "icon": "ability_druid_eclipse",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "你的愤怒使接下来2次星火术的施法时间缩短0.17秒。最多储存4层。持续15秒。",
              "你的愤怒使接下来2次星火术的施法时间缩短0.33秒。最多储存4层。持续15秒。",
              "你的愤怒使接下来2次星火术的施法时间缩短0.5秒。最多储存4层。持续15秒。"
            ]
          },
          {
            "id": "d_moonfury",
            "name": "月怒",
            "icon": "spell_nature_moonglow",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的奥术和自然法术造成的伤害提高2%。",
              "使你的奥术和自然法术造成的伤害提高4%。",
              "使你的奥术和自然法术造成的伤害提高6%。",
              "使你的奥术和自然法术造成的伤害提高8%。",
              "使你的奥术和自然法术造成的伤害提高10%。"
            ]
          },
          {
            "id": "d_moonkin_form",
            "name": "枭兽形态",
            "icon": "spell_nature_forceofnature",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "进入枭兽形态，使清晰预兆触发的几率提高100%，物品提供的护甲值提高360%，并使45码内所有队伍或团队成员的爆击几率提高3%。免疫变形效果，枭兽形态下无法施放治疗法术。 变形可解除施法者身上的变形术和移动限制效果。"
            ]
          }
        ]
      },
      {
        "id": "feral-combat",
        "name": "野性战斗",
        "skills": [
          {
            "id": "d_ferocity",
            "name": "凶暴",
            "icon": "ability_hunter_pet_hyena",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的槌击、原始撕咬、挥击、爪击和扫击技能消耗的怒气或能量减少1点。",
              "使你的槌击、原始撕咬、挥击、爪击和扫击技能消耗的怒气或能量减少2点。",
              "使你的槌击、原始撕咬、挥击、爪击和扫击技能消耗的怒气或能量减少3点。",
              "使你的槌击、原始撕咬、挥击、爪击和扫击技能消耗的怒气或能量减少4点。",
              "使你的槌击、原始撕咬、挥击、爪击和扫击技能消耗的怒气或能量减少5点。"
            ]
          },
          {
            "id": "d_furor",
            "name": "激怒",
            "icon": "spell_holy_blessingofstamina",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你有20%的几率在变身为熊形态或巨熊形态时获得10点怒气。变身为猎豹形态时，恢复上次处于猎豹形态时所拥有能量的20%，并根据你离开熊形态和巨熊形态的时长，按每秒2点额外恢复能量，总计最多恢复20点能量。",
              "使你有40%的几率在变身为熊形态或巨熊形态时获得10点怒气。变身为猎豹形态时，恢复上次处于猎豹形态时所拥有能量的40%，并根据你离开熊形态和巨熊形态的时长，按每秒4点额外恢复能量，总计最多恢复40点能量。",
              "使你有60%的几率在变身为熊形态或巨熊形态时获得10点怒气。变身为猎豹形态时，恢复上次处于猎豹形态时所拥有能量的60%，并根据你离开熊形态和巨熊形态的时长，按每秒6点额外恢复能量，总计最多恢复60点能量。",
              "使你有80%的几率在变身为熊形态或巨熊形态时获得10点怒气。变身为猎豹形态时，恢复上次处于猎豹形态时所拥有能量的80%，并根据你离开熊形态和巨熊形态的时长，按每秒8点额外恢复能量，总计最多恢复80点能量。",
              "使你有100%的几率在变身为熊形态或巨熊形态时获得10点怒气。变身为猎豹形态时，恢复上次处于猎豹形态时所拥有能量的100%，并根据你离开熊形态和巨熊形态的时长，按每秒10点额外恢复能量，总计最多恢复100点能量。"
            ]
          },
          {
            "id": "t17002",
            "name": "豹之迅捷",
            "icon": "spell_nature_spiritwolf",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你在猎豹形态下的移动速度提高15%，躲闪几率提高2%。",
              "使你在猎豹形态下的移动速度提高30%，躲闪几率提高4%。"
            ]
          },
          {
            "id": "d_feral_instinct",
            "name": "野性本能",
            "icon": "ability_ambush",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的挥击造成的伤害提高10%，并在潜行时使敌人侦测到你的几率降低，效果相当于你高出1级。",
              "使你的挥击造成的伤害提高20%，并在潜行时使敌人侦测到你的几率降低，效果相当于你高出2级。",
              "使你的挥击造成的伤害提高30%，并在潜行时使敌人侦测到你的几率降低，效果相当于你高出3级。"
            ]
          },
          {
            "id": "d_brutal_impact",
            "name": "野蛮冲撞",
            "icon": "ability_druid_bash",
            "row": 2,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的重击和突袭的昏迷持续时间延长0.5秒，并使重击的冷却时间缩短15秒。",
              "使你的重击和突袭的昏迷持续时间延长1秒，并使重击的冷却时间缩短30秒。"
            ]
          },
          {
            "id": "d_thick_hide",
            "name": "厚皮",
            "icon": "inv_misc_pelt_bear_03",
            "row": 2,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "处于熊形态、猎豹形态、巨熊形态或枭兽形态时，你每级获得1点额外基础护甲；防御技能超过你等级五倍后，每一点还会提供0.67点基础护甲。该数值可进一步受到这些形态的倍率加成。",
              "处于熊形态、猎豹形态、巨熊形态或枭兽形态时，你每级获得2点额外基础护甲；防御技能超过你等级五倍后，每一点还会提供1.33点基础护甲。该数值可进一步受到这些形态的倍率加成。",
              "处于熊形态、猎豹形态、巨熊形态或枭兽形态时，你每级获得3点额外基础护甲；防御技能超过你等级五倍后，每一点还会提供2点基础护甲。该数值可进一步受到这些形态的倍率加成。"
            ]
          },
          {
            "id": "t16966",
            "name": "撕碎攻击",
            "icon": "spell_shadow_vampiricaura",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的撕碎消耗的能量值降低6点，割伤消耗的怒气降低1点。",
              "使你的撕碎消耗的能量值降低12点，割伤消耗的怒气降低2点。",
              "使你的撕碎消耗的能量值降低18点，割伤消耗的怒气降低3点。"
            ]
          },
          {
            "id": "d_savage_fury",
            "name": "野蛮暴怒",
            "icon": "ability_druid_ravage",
            "row": 3,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的爪击、扫击、撕碎、槌击和横扫技能造成的伤害提高5%。",
              "使你的爪击、扫击、撕碎、槌击和横扫技能造成的伤害提高10%。"
            ]
          },
          {
            "id": "d_feral_charge",
            "name": "野性冲锋",
            "icon": "ability_hunter_pet_bear",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "需要熊形态或巨熊形态 向敌人冲锋，使其无法移动，并打断其正在施放的任何法术，持续4秒。 跳跃到敌人的背后。"
            ]
          },
          {
            "id": "d_sharpened_claws",
            "name": "锋利兽爪",
            "icon": "inv_misc_monsterclaw_04",
            "row": 3,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你在熊形态、巨熊形态或猎豹形态下的爆击几率提高3%。",
              "使你在熊形态、巨熊形态或猎豹形态下的爆击几率提高6%。"
            ]
          },
          {
            "id": "d_predatory_strikes",
            "name": "猛兽攻击",
            "icon": "ability_hunter_pet_cat",
            "row": 4,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你在猎豹形态、熊形态和巨熊形态下的近战攻击强度提高，数值相当于你等级的50%。",
              "使你在猎豹形态、熊形态和巨熊形态下的近战攻击强度提高，数值相当于你等级的100%。",
              "使你在猎豹形态、熊形态和巨熊形态下的近战攻击强度提高，数值相当于你等级的150%。"
            ]
          },
          {
            "id": "t1328617",
            "name": "割伤",
            "icon": "ability_druid_lacerate",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": "d_savage_fury",
            "ranks": [
              "割伤敌方目标并使其流血，在15秒内受到20点伤害，目标身上的每层割伤额外附加10%的武器伤害。造成高额威胁值。该效果对同一个目标最多叠加5次。"
            ]
          },
          {
            "id": "t1328613",
            "name": "Predatory Discipline",
            "icon": "spell_druid_savagery",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "Your Ferocious Bite ability no longer converts extra Energy into damage, but still deals extra damage based on your excess Energy."
            ]
          },
          {
            "id": "t16958",
            "name": "血性狂乱",
            "icon": "ability_ghoulfrenzy",
            "row": 4,
            "col": 4,
            "max": 2,
            "prereq": "d_sharpened_claws",
            "ranks": [
              "使你在熊形态或巨熊形态下造成爆击时，有50%的几率额外获得5点怒气。此外，你的猎豹形态下可产生连击点数的技能的非周期性爆击有50%的几率额外增加一个连击点数。",
              "使你在熊形态或巨熊形态下造成爆击时，有100%的几率额外获得5点怒气。此外，你的猎豹形态下可产生连击点数的技能的非周期性爆击有100%的几率额外增加一个连击点数。"
            ]
          },
          {
            "id": "d_leader_of_pack",
            "name": "兽群领袖",
            "icon": "spell_nature_unyeildingstamina",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "处于猎豹、熊或巨熊形态时，兽群领袖使45码内所有小队或团队成员的爆击几率提高3%。"
            ]
          },
          {
            "id": "t1223242",
            "name": "自然本能",
            "icon": "ability_druid_predatoryinstincts",
            "row": 5,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "近战技能的爆击伤害加成提高10%，并使你的法术治疗效果获得相当于智力12%的加成。",
              "近战技能的爆击伤害加成提高20%，并使你的法术治疗效果获得相当于智力25%的加成。"
            ]
          },
          {
            "id": "t1223246",
            "name": "狂乱撕扯",
            "icon": "ability_druid_primalagression",
            "row": 6,
            "col": 1,
            "max": 5,
            "prereq": "d_predatory_strikes",
            "ranks": [
              "使你的近战技能对流血目标造成的伤害提高3%。",
              "使你的近战技能对流血目标造成的伤害提高6%。",
              "使你的近战技能对流血目标造成的伤害提高9%。",
              "使你的近战技能对流血目标造成的伤害提高12%。",
              "使你的近战技能对流血目标造成的伤害提高15%。"
            ]
          },
          {
            "id": "t417051",
            "name": "自然反射",
            "icon": "ability_bullrush",
            "row": 6,
            "col": 4,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的躲闪几率提高1%，并且每次躲闪有20%的几率获得5点怒气。",
              "使你的躲闪几率提高2%，并且每次躲闪有40%的几率获得5点怒气。",
              "使你的躲闪几率提高3%，并且每次躲闪有60%的几率获得5点怒气。",
              "使你的躲闪几率提高4%，并且每次躲闪有80%的几率获得5点怒气。",
              "使你的躲闪几率提高5%，并且每次躲闪有100%的几率获得5点怒气。"
            ]
          },
          {
            "id": "t407995",
            "name": "原始撕咬",
            "icon": "ability_racial_cannibalize",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "d_leader_of_pack",
            "ranks": [
              "撕咬目标，造成100%普通伤害外加42点伤害，并产生大量威胁值。"
            ]
          },
          {
            "id": "t1322605",
            "name": "变形之力",
            "icon": "spell_druid_displacement",
            "row": 7,
            "col": 3,
            "max": 1,
            "prereq": "t1328613",
            "ranks": [
              "立即将55%点法力值转化为40点能量。降低变形法术消耗的效果也会降低变形之力的消耗。"
            ]
          }
        ]
      },
      {
        "id": "restoration",
        "name": "恢复",
        "skills": [
          {
            "id": "t17063",
            "name": "自然集中",
            "icon": "spell_nature_healingwavegreater",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的奥术和自然法术有14%的几率在受到伤害时不损失施法时间。",
              "使你的奥术和自然法术有28%的几率在受到伤害时不损失施法时间。",
              "使你的奥术和自然法术有42%的几率在受到伤害时不损失施法时间。",
              "使你的奥术和自然法术有56%的几率在受到伤害时不损失施法时间。",
              "使你的奥术和自然法术有70%的几率在受到伤害时不损失施法时间。"
            ]
          },
          {
            "id": "d_heart_of_wild",
            "name": "野性之心",
            "icon": "spell_holy_blessingofagility",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的智力提高2%。此外，在熊形态或巨熊形态下，耐力提高4%；在猎豹形态下，力量提高2%。",
              "使你的智力提高4%。此外，在熊形态或巨熊形态下，耐力提高8%；在猎豹形态下，力量提高4%。",
              "使你的智力提高6%。此外，在熊形态或巨熊形态下，耐力提高12%；在猎豹形态下，力量提高6%。",
              "使你的智力提高8%。此外，在熊形态或巨熊形态下，耐力提高16%；在猎豹形态下，力量提高8%。",
              "使你的智力提高10%。此外，在熊形态或巨熊形态下，耐力提高20%；在猎豹形态下，力量提高10%。"
            ]
          },
          {
            "id": "d_naturalist",
            "name": "自然主义",
            "icon": "spell_nature_healingtouch",
            "row": 2,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的治疗之触和野性成长的施法时间缩短0.1秒，并使你造成的所有伤害提高2%。",
              "使你的治疗之触和野性成长的施法时间缩短0.2秒，并使你造成的所有伤害提高4%。",
              "使你的治疗之触和野性成长的施法时间缩短0.3秒，并使你造成的所有伤害提高6%。",
              "使你的治疗之触和野性成长的施法时间缩短0.4秒，并使你造成的所有伤害提高8%。",
              "使你的治疗之触和野性成长的施法时间缩短0.5秒，并使你造成的所有伤害提高10%。"
            ]
          },
          {
            "id": "d_reflection",
            "name": "反射",
            "icon": "spell_frost_windwalkon",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你在施法时仍保持17%的法力回复速度。",
              "使你在施法时仍保持33%的法力回复速度。",
              "使你在施法时仍保持50%的法力回复速度。"
            ]
          },
          {
            "id": "t16833",
            "name": "自然变形",
            "icon": "spell_nature_wispsplode",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的所有变形法术所消耗的法力值降低10%。",
              "使你的所有变形法术所消耗的法力值降低20%。",
              "使你的所有变形法术所消耗的法力值降低30%。"
            ]
          },
          {
            "id": "d_subtlety",
            "name": "微妙",
            "icon": "ability_eyeoftheowl",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的自然和奥术法术产生的威胁降低10%。",
              "使你的自然和奥术法术产生的威胁降低20%。",
              "使你的自然和奥术法术产生的威胁降低30%。"
            ]
          },
          {
            "id": "d_gift_of_nature",
            "name": "自然赐福",
            "icon": "spell_nature_protectionformnature",
            "row": 3,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的所有治疗法术效果提高2%。",
              "使你的所有治疗法术效果提高4%。",
              "使你的所有治疗法术效果提高6%。",
              "使你的所有治疗法术效果提高8%。",
              "使你的所有治疗法术效果提高10%。"
            ]
          },
          {
            "id": "t1328621",
            "name": "Bloom",
            "icon": "inv_misc_herb_felblossom",
            "row": 3,
            "col": 4,
            "max": 1,
            "prereq": null,
            "ranks": [
              "When your Rejuvenation or Regrowth spell expires due to its duration, the target is instantly healed for an amount equal to 100% of your Spirit. If either spell expires due to being dispelled, the target is healed for 50% of your Spirit instead."
            ]
          },
          {
            "id": "t24968",
            "name": "宁静之魂",
            "icon": "spell_holy_elunesgrace",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使你的治疗之触和宁静所消耗的法力值减少2%。",
              "使你的治疗之触和宁静所消耗的法力值减少4%。",
              "使你的治疗之触和宁静所消耗的法力值减少6%。",
              "使你的治疗之触和宁静所消耗的法力值减少8%。",
              "使你的治疗之触和宁静所消耗的法力值减少10%。"
            ]
          },
          {
            "id": "d_imp_rejuv",
            "name": "强化回春术",
            "icon": "spell_nature_rejuvenation",
            "row": 4,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的回春术的效果提高5%。",
              "使你的回春术的效果提高10%。",
              "使你的回春术的效果提高15%。"
            ]
          },
          {
            "id": "d_swiftmend",
            "name": "迅捷治愈",
            "icon": "inv_relics_idolofrejuvenation",
            "row": 4,
            "col": 4,
            "max": 1,
            "prereq": null,
            "ranks": [
              "立即为一个带有你施放的回春术或愈合效果的目标恢复生命值，数值等于该效果在完整持续时间内的周期性治疗总量。"
            ]
          },
          {
            "id": "d_nature_swiftness",
            "name": "自然迅捷",
            "icon": "spell_nature_ravenform",
            "row": 5,
            "col": 1,
            "max": 1,
            "prereq": "d_naturalist",
            "ranks": [
              "激活之后，你的下一个自然法术会成为瞬发法术。"
            ]
          },
          {
            "id": "t1309631",
            "name": "生命之魂",
            "icon": "spell_nature_giftofthewaterspirit",
            "row": 5,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的精神提高5%。",
              "使你的精神提高10%。",
              "使你的精神提高15%。"
            ]
          },
          {
            "id": "t17123",
            "name": "强化宁静",
            "icon": "spell_nature_tranquility",
            "row": 5,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的宁静产生的威胁值降低50%，冷却时间缩短30%。",
              "使你的宁静产生的威胁值降低100%，冷却时间缩短60%。"
            ]
          },
          {
            "id": "d_imp_regrowth",
            "name": "强化愈合",
            "icon": "spell_nature_resistnature",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": "d_imp_rejuv",
            "ranks": [
              "使你的愈合法术产生极效治疗效果的几率提高10%。",
              "使你的愈合法术产生极效治疗效果的几率提高20%。",
              "使你的愈合法术产生极效治疗效果的几率提高30%。",
              "使你的愈合法术产生极效治疗效果的几率提高40%。",
              "使你的愈合法术产生极效治疗效果的几率提高50%。"
            ]
          },
          {
            "id": "d_wild_growth",
            "name": "野性成长",
            "icon": "ability_druid_flourish",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "t1309631",
            "ranks": [
              "在7秒内为目标及其43.5码内的小队成员恢复336点生命值。治疗效果起初较快，随着野性成长接近结束而变慢。"
            ]
          }
        ]
      }
    ]
  }
};

module.exports = {
  TALENT_DATA_60
};
