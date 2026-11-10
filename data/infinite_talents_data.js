/**
 * data/infinite_talents_data.js
 * 暴雪《魔兽世界：无限》（World of Warcraft: Forever 2026最新独立产品线）
 * 全职业60级权威天赋树与主流配装方案
 * 严格按照暴雪Zamimg CDN官方高清图标、真实依赖链与51点加点矩阵
 * 生成时间: 2026-11-10T02:12:45.941Z
 */

const TALENT_DATA_60 = {
  "rogue": {
    "name": "潜行者",
    "icon": "🗡️",
    "classIcon": "class_rogue",
    "presets": [
      {
        "name": "敏锐死亡印记出血 (15/5/31)",
        "desc": "【无限服木桩单体T0王者】千刀万剐与割裂无视护甲暴击联动，死亡印记终结技6秒储能爆发引爆真实伤害，单体上限封神！",
        "points": {
          "r_malice": 5,
          "r_ruthlessness": 3,
          "r_puncturing": 3,
          "r_rel_strikes": 1,
          "r_lethality": 3,
          "r_imp_ss": 2,
          "r_lightning_ref": 3,
          "r_opportunity": 5,
          "r_camouflage": 5,
          "r_initiative": 3,
          "r_ghostly": 1,
          "r_imp_sap": 1,
          "r_serrated_blades": 3,
          "r_hemo": 1,
          "r_elusiveness": 2,
          "r_heightened_senses": 2,
          "r_prep": 1,
          "r_dirty_deeds": 2,
          "r_deadliness": 4,
          "r_death_mark": 1
        }
      },
      {
        "name": "战斗大开大合剑斧 (19/32/0)",
        "desc": "【无限服综合开荒清场王牌】大开大合合并剑斧锤武器专精，还击招架缴械，剑刃乱舞双倍清怪，冲动极速回能！",
        "points": {
          "r_imp_evisc": 2,
          "r_malice": 5,
          "r_ruthlessness": 3,
          "r_rel_strikes": 1,
          "r_lethality": 4,
          "r_imp_poisons": 4,
          "r_imp_ss": 2,
          "r_lightning_ref": 3,
          "r_deflection": 5,
          "r_precision": 5,
          "r_endurance": 2,
          "r_riposte": 1,
          "r_blade_flurry": 1,
          "r_dagger_spec": 1,
          "r_dw_spec": 5,
          "r_hack_slash": 5,
          "r_weapon_exp": 1,
          "r_adrenaline_rush": 1
        }
      },
      {
        "name": "刺杀双持毁伤毒针 (38/11/2)",
        "desc": "【无限服毒药特化流】31点终极毒针提升30%毒伤与10%命中，毁伤双匕首暴击连击快速攒星，割裂毒药双跳！",
        "points": {
          "r_imp_evisc": 2,
          "r_malice": 5,
          "r_ruthlessness": 3,
          "r_puncturing": 3,
          "r_rel_strikes": 1,
          "r_lethality": 5,
          "r_venom": 2,
          "r_vile_poisons": 3,
          "r_imp_poisons": 5,
          "r_poised": 2,
          "r_cold_blood": 1,
          "r_imp_ks": 2,
          "r_master_poisoner": 2,
          "r_mutilate": 1,
          "r_venomous_sting": 1,
          "r_imp_ss": 2,
          "r_lightning_ref": 3,
          "r_deflection": 1,
          "r_precision": 5,
          "r_opportunity": 2
        }
      }
    ],
    "trees": [
      {
        "id": "assassination",
        "name": "刺杀",
        "skills": [
          {
            "id": "r_imp_evisc",
            "name": "强化剔骨",
            "icon": "ability_rogue_eviscerate",
            "row": 1,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "使你的剔骨技能造成的伤害提高 5%",
              "提高 10%",
              "提高 15%"
            ]
          },
          {
            "id": "r_malice",
            "name": "恶意",
            "icon": "ability_racial_bloodrage",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "r_remorseless",
            "name": "冷酷攻击",
            "icon": "ability_fiegndead",
            "row": 1,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "杀死敌人后使下一次邪恶攻击、背刺、伏击暴击几率提高 20%",
              "提高 40%"
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
              "背刺暴击几率提高 10%，伏击暴击几率提高 15%",
              "提高 20%/30%",
              "提高 30%/45%"
            ]
          },
          {
            "id": "r_ruthlessness",
            "name": "无情",
            "icon": "ability_druid_disembowel",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "终结技有 20% 几率增加一个连击点",
              "几率 40%",
              "几率 60%"
            ]
          },
          {
            "id": "r_murder",
            "name": "谋杀",
            "icon": "spell_shadow_deathscream",
            "row": 2,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "对人形生物、巨人、野兽和龙类造成的伤害提高 1%",
              "提高 2%"
            ]
          },
          {
            "id": "r_rel_strikes",
            "name": "无情打击",
            "icon": "ability_warrior_decisivestrike",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "终结技每消耗一个连击点，就有 20% 几率恢复 25 点能量"
            ]
          },
          {
            "id": "r_lethality",
            "name": "致命偷袭",
            "icon": "ability_criticalstrike",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": "r_malice",
            "ranks": [
              "邪恶攻击、背刺、伏击、出血暴击伤害加成提高 6%",
              "提高 12%",
              "提高 18%",
              "提高 24%",
              "提高 30%"
            ]
          },
          {
            "id": "r_imp_ea",
            "name": "强化破甲",
            "icon": "ability_warrior_riposte",
            "row": 3,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "破甲技能使目标护甲降低效果提高 25%",
              "提高 50%"
            ]
          },
          {
            "id": "r_venom",
            "name": "猛毒",
            "icon": "ability_creature_poison_06",
            "row": 3,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "【无限服特色】毒药伤害额外获得 15% 攻击强度加成，上毒几率提高 3%",
              "伤害额外获得 30% 攻击强度加成，上毒几率提高 6%"
            ]
          },
          {
            "id": "r_vile_poisons",
            "name": "剧毒",
            "icon": "ability_rogue_feigndeath",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "毒药和驱毒抵抗几率提高 8%，毒药伤害提高 4%",
              "提高 16%/8%",
              "提高 24%/12%",
              "提高 32%/16%",
              "提高 40%/20%"
            ]
          },
          {
            "id": "r_imp_poisons",
            "name": "强化毒药",
            "icon": "ability_poisons",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "致命毒药和速效毒药命中几率提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "r_poised",
            "name": "蓄势待发",
            "icon": "ability_rogue_feigndeath",
            "row": 4,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "【无限服特色】进入战斗后第一个连击技能能量消耗降低 5 点",
              "能量消耗降低 10 点"
            ]
          },
          {
            "id": "r_cold_blood",
            "name": "冷血",
            "icon": "spell_ice_lament",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后使你的下一次攻击技能致命一击几率提高 100%"
            ]
          },
          {
            "id": "r_imp_ks",
            "name": "强化肾击",
            "icon": "ability_rogue_kidneyshot",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "目标处于肾击昏迷状态时受到的所有伤害提高 3%",
              "提高 6%",
              "提高 9%"
            ]
          },
          {
            "id": "r_seal_fate",
            "name": "封印命运",
            "icon": "spell_shadow_chilltouch",
            "row": 5,
            "col": 4,
            "max": 5,
            "prereq": "r_cold_blood",
            "ranks": [
              "增加连击点的技能致命一击后有 20% 几率额外增加一个连击点",
              "几率 40%",
              "几率 60%",
              "几率 80%",
              "几率 100%"
            ]
          },
          {
            "id": "r_master_poisoner",
            "name": "毒药大师",
            "icon": "ability_creature_poison_06",
            "row": 6,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "使你的中毒抵抗几率提高 10%，终结技有 50% 几率不消耗目标毒药",
              "提高 20%，几率 100%"
            ]
          },
          {
            "id": "r_mutilate",
            "name": "毁伤",
            "icon": "ability_rogue_shadowstrikes",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "双匕首重击目标造成双方武器伤害加成，对中毒目标伤害提高 50%，奖励 2 个连击点"
            ]
          },
          {
            "id": "r_venomous_sting",
            "name": "毒针",
            "icon": "spell_nature_corrosivebreath",
            "row": 7,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服31点核心】毒药伤害提高 30%，毒药命中提高 10%，刺击和终结技刷新毒药持续时间"
            ]
          }
        ]
      },
      {
        "id": "combat",
        "name": "战斗",
        "skills": [
          {
            "id": "r_imp_gouge",
            "name": "强化凿击",
            "icon": "ability_gouge",
            "row": 1,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "凿击持续时间延长 0.5 秒",
              "延长 1.0 秒",
              "延长 1.5 秒"
            ]
          },
          {
            "id": "r_imp_ss",
            "name": "强化邪恶攻击",
            "icon": "spell_shadow_ritualofsacrifice",
            "row": 1,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "邪恶攻击能量消耗降低 3 点",
              "降低 5 点"
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
              "躲闪几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "r_imp_snd",
            "name": "强化切割",
            "icon": "ability_rogue_slicedice",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "切割技能攻击速度加成持续时间延长 15%",
              "延长 30%",
              "延长 45%"
            ]
          },
          {
            "id": "r_deflection",
            "name": "偏斜",
            "icon": "ability_parry",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "招架几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "r_precision",
            "name": "精确",
            "icon": "ability_marksmanship",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "近战武器命中几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
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
              "疾跑和闪避冷却时间缩短 45 秒",
              "缩短 90 秒"
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
              "招架敌人攻击后激活，造成 150% 武器伤害并缴械目标 6 秒"
            ]
          },
          {
            "id": "r_imp_sprint",
            "name": "强化疾跑",
            "icon": "ability_rogue_sprint",
            "row": 3,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "疾跑有 50% 几率移除所有移动限制效果",
              "几率 100%"
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
              "脚踢有 50% 几率使目标沉默 2 秒",
              "几率 100%"
            ]
          },
          {
            "id": "r_blade_flurry",
            "name": "剑刃乱舞",
            "icon": "ability_warrior_punishingblow",
            "row": 4,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "攻击速度提高 20%，且近战攻击可以额外命中附近一个敌人，持续 15 秒"
            ]
          },
          {
            "id": "r_dagger_spec",
            "name": "匕首专精",
            "icon": "ability_shockwave",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使用匕首时致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "r_dw_spec",
            "name": "双武器专精",
            "icon": "ability_dualwield",
            "row": 5,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "副手武器造成的伤害提高 10%",
              "提高 20%",
              "提高 30%",
              "提高 40%",
              "提高 50%"
            ]
          },
          {
            "id": "r_hack_slash",
            "name": "大开大合",
            "icon": "inv_axe_06",
            "row": 5,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "【无限服武器整合】装备剑、斧、锤或拳套时，攻击有 1% 几率获得一次额外攻击，暴击伤害+2%",
              "几率 2%/+4%",
              "几率 3%/+6%",
              "几率 4%/+8%",
              "几率 5%/+10%"
            ]
          },
          {
            "id": "r_mace_spec",
            "name": "锤类武器专精",
            "icon": "inv_mace_01",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "钝击武器技能提高 1 点，并有 1% 几率昏迷 3 秒",
              "提高 2 点/2%",
              "提高 3 点/3%",
              "提高 4 点/4%",
              "提高 5 点/6%"
            ]
          },
          {
            "id": "r_weapon_exp",
            "name": "武器大师",
            "icon": "ability_warrior_weaponmastery",
            "row": 6,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "单手武器技能提高 3 点，被缴械持续时间缩短 25%",
              "技能提高 5 点，缩短 50%"
            ]
          },
          {
            "id": "r_aggression",
            "name": "侵略",
            "icon": "ability_racial_avatar",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "邪恶攻击和剔骨伤害提高 2%",
              "提高 4%",
              "提高 6%"
            ]
          },
          {
            "id": "r_coup_de_grace",
            "name": "完美处决",
            "icon": "ability_warrior_decisivestrike",
            "row": 6,
            "col": 4,
            "max": 2,
            "prereq": null,
            "ranks": [
              "【无限服特色】终结技消耗连击点使攻击速度提高 6%，刺骨暴击几率提高 5%",
              "攻速提高 12%，暴击提高 10%"
            ]
          },
          {
            "id": "r_adrenaline_rush",
            "name": "冲动",
            "icon": "spell_shadow_shadowworddominate",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "能量恢复速度提高 100%，持续 15 秒"
            ]
          }
        ]
      },
      {
        "id": "subtlety",
        "name": "敏锐",
        "skills": [
          {
            "id": "r_mod",
            "name": "欺诈大师",
            "icon": "spell_shadow_charm",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "潜行状态下降低敌人发现几率（相当于等级+1）",
              "等级+2",
              "等级+3",
              "等级+4",
              "等级+5"
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
              "从背后使用背刺、绞喉或伏击伤害提高 4%",
              "提高 8%",
              "提高 12%",
              "提高 16%",
              "提高 20%"
            ]
          },
          {
            "id": "r_sleight",
            "name": "诡计",
            "icon": "ability_rogue_feint",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "佯攻仇恨减少量提高 10%，受暴击几率降低 1%",
              "提高 20%/2%"
            ]
          },
          {
            "id": "r_camouflage",
            "name": "伪装",
            "icon": "ability_stealth",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "潜行移速提高 3%，潜行冷却缩短 1 秒",
              "提高 6%/2s",
              "提高 9%/3s",
              "提高 12%/4s",
              "提高 15%/5s"
            ]
          },
          {
            "id": "r_initiative",
            "name": "先发制人",
            "icon": "spell_shadow_fumble",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "伏击、绞喉或偷袭有 25% 几率额外增加一个连击点",
              "几率 50%",
              "几率 75%"
            ]
          },
          {
            "id": "r_imp_ambush",
            "name": "强化伏击",
            "icon": "ability_rogue_ambush",
            "row": 2,
            "col": 4,
            "max": 3,
            "prereq": null,
            "ranks": [
              "伏击暴击几率提高 15%",
              "提高 30%",
              "提高 45%"
            ]
          },
          {
            "id": "r_ghostly",
            "name": "鬼魅攻击",
            "icon": "spell_shadow_curse",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "造成 125% 武器伤害，并在 7 秒内闪避几率提高 15%，获得 1 个连击点"
            ]
          },
          {
            "id": "r_imp_sap",
            "name": "强化闷棍",
            "icon": "ability_sap",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "闷棍后有 30% 几率不脱离潜行",
              "几率 60%",
              "几率 90%"
            ]
          },
          {
            "id": "r_serrated_blades",
            "name": "锯齿利刃",
            "icon": "inv_sword_33",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "无视目标 100 点护甲，割裂伤害提高 10%",
              "无视 200 点/20%",
              "无视 300 点/30%"
            ]
          },
          {
            "id": "r_setup",
            "name": "调整",
            "icon": "spell_nature_mirrorimage",
            "row": 4,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "成功闪避或招架攻击后有 15% 几率获得一个连击点",
              "几率 30%",
              "几率 45%"
            ]
          },
          {
            "id": "r_elusiveness",
            "name": "飘忽不定",
            "icon": "spell_magic_lesserinvisibilty",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "消失和致盲冷却缩短 45 秒",
              "缩短 90 秒"
            ]
          },
          {
            "id": "r_hemo",
            "name": "出血",
            "icon": "spell_shadow_lifedrain",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": "r_serrated_blades",
            "ranks": [
              "造成武器伤害并施加出血易伤，【无限服】使用匕首时造成额外 30% 伤害"
            ]
          },
          {
            "id": "r_heightened_senses",
            "name": "强化察觉",
            "icon": "ability_townwatch",
            "row": 5,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "侦测潜行能力提高，被法术和远程攻击命中的几率降低 2%",
              "能力显著提高，几率降低 4%"
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
              "激活后立即结束闪避、疾跑、消失、冷血、暗影步的冷却时间"
            ]
          },
          {
            "id": "r_dirty_deeds",
            "name": "卑鄙",
            "icon": "spell_shadow_summonsuccubus",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "偷袭和绞喉能量消耗减少 10 点",
              "减少 20 点"
            ]
          },
          {
            "id": "r_boot_knife",
            "name": "短靴暗刃",
            "icon": "ability_rogue_ambush",
            "row": 6,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "【无限服特色】刺击技能有 50% 几率额外奖励 1 个连击点",
              "几率 100%"
            ]
          },
          {
            "id": "r_deadliness",
            "name": "致命",
            "icon": "inv_weapon_crossbow_11",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "攻击强度提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "r_premed",
            "name": "预谋",
            "icon": "spell_shadow_possession",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "r_prep",
            "ranks": [
              "潜行下使用，为目标增加 2 个连击点，持续 20 秒"
            ]
          },
          {
            "id": "r_death_mark",
            "name": "死亡印记",
            "icon": "spell_shadow_antimagicshell",
            "row": 7,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服31点终极绝技】标记目标持续 6 秒，储存期间造成伤害的 25% 并在结束时以真实伤害引爆！"
            ]
          }
        ]
      }
    ]
  },
  "warrior": {
    "name": "战士",
    "icon": "⚔️",
    "classIcon": "class_warrior",
    "presets": [
      {
        "name": "无限服·刺矛武器战 (31/20/0)",
        "desc": "【无限服双手武器大核】致死打击减疗50%，4层刺矛打击对巨人龙类额外增伤，横扫攻击双倍旋风斩清怪！",
        "points": {
          "w_imp_hs": 3,
          "w_deflection": 2,
          "w_imp_rend": 3,
          "w_tactical_mastery": 5,
          "w_imp_charge": 2,
          "w_deep_wounds": 3,
          "w_imp_overpower": 2,
          "w_impale": 2,
          "w_two_hand_spec": 5,
          "w_impaling_strike": 1,
          "w_sweeping_strikes": 1,
          "w_axe_spec": 1,
          "w_mortal_strike": 1,
          "w_cruelty": 5,
          "w_unbridled_wrath": 5,
          "w_imp_cleave": 3,
          "w_piercing_howl": 1,
          "w_imp_shout": 1,
          "w_enrage": 5
        }
      },
      {
        "name": "无限服·双持狂暴战 (17/34/0)",
        "desc": "【无限服团本持续输出之王】乱舞极速攻速，激怒增伤25%，嗜血强力单体加回血，死亡之愿绝地爆发！",
        "points": {
          "w_imp_hs": 3,
          "w_deflection": 2,
          "w_imp_rend": 3,
          "w_tactical_mastery": 5,
          "w_imp_overpower": 2,
          "w_deep_wounds": 2,
          "w_booming_voice": 2,
          "w_cruelty": 5,
          "w_unbridled_wrath": 5,
          "w_imp_shout": 4,
          "w_piercing_howl": 1,
          "w_dw_spec": 5,
          "w_enrage": 5,
          "w_flurry": 5,
          "w_death_wish": 1,
          "w_bloodthirst": 1
        }
      },
      {
        "name": "无限服·战备防战 (11/5/35)",
        "desc": "【无限服团队第一主坦】防御姿态直接冲锋，破釜沉舟极速救场，盾牌猛击高仇恨驱散，坚若磐石！",
        "points": {
          "w_deflection": 5,
          "w_tactical_mastery": 5,
          "w_anger_mgmt": 1,
          "w_cruelty": 5,
          "w_shield_spec": 5,
          "w_anticipation": 5,
          "w_toughness": 5,
          "w_def_charge": 2,
          "w_last_stand": 1,
          "w_imp_sunder": 3,
          "w_defiance": 5,
          "w_one_hand_spec": 5,
          "w_concussion_blow": 1,
          "w_shield_slam": 1,
          "w_imp_shield_wall": 2
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
              "英勇打击怒气消耗降低 1 点",
              "降低 2 点",
              "降低 3 点"
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
              "招架几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
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
              "撕裂流血伤害提高 15%",
              "提高 25%",
              "提高 35%"
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
              "冲锋获得的怒气提高 3 点",
              "提高 6 点"
            ]
          },
          {
            "id": "w_tactical_mastery",
            "name": "战术掌握",
            "icon": "spell_nature_enchantarmor",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "切换姿态时保留怒气最多 5 点",
              "保留 10 点",
              "保留 15 点",
              "保留 20 点",
              "保留 25 点"
            ]
          },
          {
            "id": "w_imp_thunder",
            "name": "强化雷霆一击",
            "icon": "spell_nature_thunderclap",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "雷霆一击怒气消耗降低 1 点",
              "降低 2 点",
              "降低 4 点"
            ]
          },
          {
            "id": "w_imp_overpower",
            "name": "强化压制",
            "icon": "ability_meleedamage",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "压制暴击几率提高 25%",
              "提高 50%"
            ]
          },
          {
            "id": "w_anger_mgmt",
            "name": "愤怒掌控",
            "icon": "spell_holy_blessingofstamina",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "战斗中每 3 秒生成 1 点怒气，脱战怒气衰减减缓 30%"
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
              "暴击使目标在 12 秒内受到武器平均伤害 20% 的流血伤害",
              "受到 40%",
              "受到 60%"
            ]
          },
          {
            "id": "w_impaling_strike",
            "name": "刺矛打击",
            "icon": "ability_warrior_punishingblow",
            "row": 4,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服特色】长矛突刺击退目标，对飞行坐骑/巨人/龙类额外造成 30% 物理真实伤害"
            ]
          },
          {
            "id": "w_two_hand_spec",
            "name": "双手武器专精",
            "icon": "inv_sword_23",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "双手武器造成的物理伤害提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
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
              "技能致命一击伤害加成提高 10%",
              "提高 20%"
            ]
          },
          {
            "id": "w_axe_spec",
            "name": "斧类武器专精",
            "icon": "inv_axe_06",
            "row": 5,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "使用斧或长柄武器时致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
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
              "使你的下 5 次近战攻击可以命中附近额外一个目标"
            ]
          },
          {
            "id": "w_sword_spec",
            "name": "剑类武器专精",
            "icon": "inv_sword_27",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "剑类武器击中敌人后有 1% 几率获得一次额外攻击",
              "几率 2%",
              "几率 3%",
              "几率 4%",
              "几率 5%"
            ]
          },
          {
            "id": "w_weapon_exp",
            "name": "武器大师",
            "icon": "ability_warrior_weaponmastery",
            "row": 6,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "近战武器技能提高 3 点，躲闪抵抗提高 1%",
              "技能提高 5 点，提高 2%"
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
              "造成武器伤害加额外伤害，并使目标受到的治疗效果降低 50%，持续 10 秒"
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
              "战斗怒吼和挫志怒吼范围和持续时间提高 10%",
              "提高 20%",
              "提高 30%",
              "提高 40%",
              "提高 50%"
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
              "近战武器致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "w_imp_demo",
            "name": "强化挫志怒吼",
            "icon": "ability_warrior_warcry",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "挫志怒吼降低目标攻击强度的效果提高 8%",
              "提高 16%",
              "提高 24%",
              "提高 32%",
              "提高 40%"
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
              "近战伤害有 8% 几率产生 1 点额外怒气",
              "几率 16%",
              "几率 24%",
              "几率 32%",
              "几率 40%"
            ]
          },
          {
            "id": "w_imp_cleave",
            "name": "强化顺劈斩",
            "icon": "ability_warrior_cleave",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "顺劈斩造成的额外伤害提高 40%",
              "提高 80%",
              "提高 120%"
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
              "使身边 10 码内所有敌人移动速度降低 50%，持续 6 秒"
            ]
          },
          {
            "id": "w_blood_craze",
            "name": "血之狂热",
            "icon": "spell_nature_bloodlust",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "受到致命一击后在 6 秒内回复总生命值 1%",
              "回复 2%",
              "回复 3%"
            ]
          },
          {
            "id": "w_imp_shout",
            "name": "强化战斗怒吼",
            "icon": "ability_warrior_battleshout",
            "row": 3,
            "col": 4,
            "max": 5,
            "prereq": null,
            "ranks": [
              "战斗怒吼提高攻击强度的效果提高 5%",
              "提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%"
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
              "副手武器伤害提高 5%",
              "提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%"
            ]
          },
          {
            "id": "w_imp_execute",
            "name": "强化斩杀",
            "icon": "inv_sword_48",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "斩杀怒气消耗降低 2 点",
              "降低 5 点"
            ]
          },
          {
            "id": "w_enrage",
            "name": "激怒",
            "icon": "spell_shadow_unholyfrenzy",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "受到致命一击后物理近战伤害提高 5%",
              "提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%"
            ]
          },
          {
            "id": "w_imp_slam",
            "name": "强化猛击",
            "icon": "ability_flamingarrows",
            "row": 5,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "猛击施法时间缩短 0.1 秒",
              "缩短 0.2 秒",
              "缩短 0.3 秒",
              "缩短 0.4 秒",
              "缩短 0.5 秒"
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
              "物理伤害提高 20%，免疫恐惧，护甲与抗性降低 20%，持续 30 秒"
            ]
          },
          {
            "id": "w_flurry",
            "name": "乱舞",
            "icon": "ability_ghoulfrenzy",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": "w_enrage",
            "ranks": [
              "近战暴击后下 3 次攻击速度提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%",
              "提高 30%"
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
              "立即发起攻击造成基于攻击强度的伤害，下 5 次成功击中均回复生命值"
            ]
          }
        ]
      },
      {
        "id": "protection",
        "name": "防护",
        "skills": [
          {
            "id": "w_shield_spec",
            "name": "盾牌专精",
            "icon": "inv_shield_06",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "盾牌格挡几率提高 1%，成功格挡产生 1 点怒气",
              "提高 2%/1点",
              "提高 3%/1点",
              "提高 4%/1点",
              "提高 5%/1点"
            ]
          },
          {
            "id": "w_anticipation",
            "name": "预知",
            "icon": "spell_nature_mirrorimage",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "防御技能提高 2 点",
              "提高 4 点",
              "提高 6 点",
              "提高 8 点",
              "提高 10 点"
            ]
          },
          {
            "id": "w_def_charge",
            "name": "战备冲锋",
            "icon": "ability_warrior_charge",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "【无限服特色】允许在防御姿态下直接使用冲锋，并提高怒气获取 2 点",
              "允许防御姿态冲锋，提高怒气获取 5 点"
            ]
          },
          {
            "id": "w_toughness",
            "name": "坚韧",
            "icon": "spell_holy_devotionaura",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "装备护甲值提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "w_iron_will",
            "name": "钢铁意志",
            "icon": "spell_magic_magearmor",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "抵抗昏迷和魅惑几率提高 3%",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "w_last_stand",
            "name": "破釜沉舟",
            "icon": "spell_holy_ashestoashes",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": "w_shield_spec",
            "ranks": [
              "立即获得 30% 生命值上限加成，持续 20 秒，救场神技"
            ]
          },
          {
            "id": "w_imp_revenge",
            "name": "强化复仇",
            "icon": "ability_warrior_revenge",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "复仇技能有 15% 几率使目标昏迷 3 秒",
              "几率 30%",
              "几率 45%"
            ]
          },
          {
            "id": "w_defiance",
            "name": "挑衅",
            "icon": "ability_warrior_sunder",
            "row": 3,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "防御姿态下造成的仇恨值提高 3%",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "w_imp_sunder",
            "name": "强化破甲",
            "icon": "ability_warrior_sunder",
            "row": 4,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "破甲攻击怒气消耗降低 1 点",
              "降低 2 点",
              "降低 3 点"
            ]
          },
          {
            "id": "w_imp_disarm",
            "name": "强化缴械",
            "icon": "ability_warrior_disarm",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "缴械持续时间延长 1 秒",
              "延长 2 秒",
              "延长 3 秒"
            ]
          },
          {
            "id": "w_imp_taunt",
            "name": "强化嘲讽",
            "icon": "spell_nature_reincarnation",
            "row": 4,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "嘲讽冷却时间缩短 1 秒",
              "缩短 2 秒"
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
              "盾墙持续时间延长 3 秒，冷却缩短 2 分钟",
              "延长 5 秒，冷却缩短 5 分钟"
            ]
          },
          {
            "id": "w_concussion_blow",
            "name": "震荡猛击",
            "icon": "ability_golemstorm",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "重击目标使其昏迷 5 秒，造成物理伤害并产生高仇恨"
            ]
          },
          {
            "id": "w_imp_shield_bash",
            "name": "强化盾击",
            "icon": "ability_warrior_shieldbash",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "盾击有 50% 几率使目标沉默 3 秒",
              "几率 100%"
            ]
          },
          {
            "id": "w_one_hand_spec",
            "name": "单手武器专精",
            "icon": "inv_sword_20",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "单手物理武器造成的伤害提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
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
              "以盾牌重击目标造成格挡值加成物理伤害，驱散 1 个魔法效果并产生大量仇恨"
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
        "name": "无限服·圣印舞惩戒骑 (11/0/40)",
        "desc": "【无限服惩戒爆发T0】点出圣印舞切圣印自动带出上一圣印伤害，十字军打击常驻，命令审判暴击秒杀！",
        "points": {
          "p_divine_intellect": 5,
          "p_spiritual_focus": 5,
          "p_consecration": 1,
          "p_benediction": 5,
          "p_imp_judgment": 2,
          "p_imp_ret_aura": 2,
          "p_deflection": 5,
          "p_conviction": 5,
          "p_seal_of_command": 1,
          "p_pursuit_justice": 2,
          "p_eye_for_eye": 2,
          "p_imp_might": 4,
          "p_two_hand_spec": 3,
          "p_sanctity_aura": 1,
          "p_seal_twisting": 2,
          "p_vengeance": 5,
          "p_crusader_strike": 1
        }
      },
      {
        "name": "无限服·守望奶骑团刷 (31/0/20)",
        "desc": "【无限服团队第一奶妈】神圣大招圣光守望震击无CD群疗，神圣眷顾必暴击，奉献AOE补伤！",
        "points": {
          "p_divine_intellect": 5,
          "p_spiritual_focus": 5,
          "p_healing_light": 3,
          "p_consecration": 1,
          "p_unyielding_faith": 1,
          "p_illumination": 5,
          "p_divine_favor": 1,
          "p_holy_power": 5,
          "p_holy_guidance": 4,
          "p_holy_shock": 1,
          "p_benediction": 5,
          "p_imp_judgment": 2,
          "p_deflection": 5,
          "p_conviction": 5,
          "p_pursuit_justice": 2,
          "p_seal_of_command": 1
        }
      }
    ],
    "trees": [
      {
        "id": "holy",
        "name": "神圣",
        "skills": [
          {
            "id": "p_healing_focus",
            "name": "治疗专注",
            "icon": "spell_holy_healingfocus",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "治疗法术受到伤害施法打退几率降低 35%",
              "降低 70%"
            ]
          },
          {
            "id": "p_divine_intellect",
            "name": "神圣智力",
            "icon": "spell_holy_magicalsentry",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "智力总值提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "p_divine_strength",
            "name": "神圣力量",
            "icon": "spell_holy_blessingofstrength",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "力量总值提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "p_spiritual_focus",
            "name": "精神集中",
            "icon": "spell_holy_healingaura",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "圣光闪现和圣光术打退几率降低 14%",
              "降低 28%",
              "降低 42%",
              "降低 56%",
              "降低 70%"
            ]
          },
          {
            "id": "p_imp_lay_on_hands",
            "name": "强化圣疗术",
            "icon": "spell_holy_layonhands",
            "row": 2,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "圣疗术目标护甲值提高 15%，持续 2 分钟",
              "提高 30%"
            ]
          },
          {
            "id": "p_healing_light",
            "name": "治疗之光",
            "icon": "spell_holy_holybolt",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "圣光术和圣光闪现治疗量提高 4%",
              "提高 8%",
              "提高 12%"
            ]
          },
          {
            "id": "p_consecration",
            "name": "奉献",
            "icon": "spell_holy_innerfire",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "将圣洁能量注入地面，在 8 秒内对进入区域的敌人造成神圣伤害"
            ]
          },
          {
            "id": "p_unyielding_faith",
            "name": "不屈意志",
            "icon": "spell_holy_unyieldingfaith",
            "row": 3,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "抵抗恐惧和诱捕几率提高 5%",
              "提高 10%"
            ]
          },
          {
            "id": "p_illumination",
            "name": "启示",
            "icon": "spell_holy_greaterblessingofsanctuary",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "圣光术、圣光闪现或神圣震击暴击后有 20% 几率返还法力消耗",
              "几率 40%",
              "几率 60%",
              "几率 80%",
              "几率 100%"
            ]
          },
          {
            "id": "p_imp_blessing_wisdom",
            "name": "强化智慧祝福",
            "icon": "spell_holy_sealofwisdom",
            "row": 4,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "智慧祝福法力恢复效果提高 10%",
              "提高 20%"
            ]
          },
          {
            "id": "p_divine_favor",
            "name": "神圣眷顾",
            "icon": "spell_holy_heal",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": "p_illumination",
            "ranks": [
              "激活后使你的下一次圣光闪现、圣光术或神圣震击必定暴击"
            ]
          },
          {
            "id": "p_holy_power",
            "name": "神圣强化",
            "icon": "spell_holy_power",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "神圣法术致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "p_holy_guidance",
            "name": "神圣指引",
            "icon": "spell_holy_spiritualguidence",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "法术治疗和法术伤害提高智力总值的 5%",
              "提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%"
            ]
          },
          {
            "id": "p_holy_shock",
            "name": "神圣震击",
            "icon": "spell_holy_sealinggloriouslight",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "p_divine_favor",
            "ranks": [
              "以神圣能量冲击目标，对敌人造成伤害，或为盟友回复生命值"
            ]
          },
          {
            "id": "p_light_watch",
            "name": "圣光守望",
            "icon": "ability_paladin_beaconoflight",
            "row": 7,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服特色大招】神圣震击命中后激发生命共鸣，无冷却智能弹跳治疗全小队"
            ]
          }
        ]
      },
      {
        "id": "protection",
        "name": "防护",
        "skills": [
          {
            "id": "p_redoubt",
            "name": "盾牌壁垒",
            "icon": "spell_holy_innerfire",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "受到暴击后格挡几率提高 6%，持续 10 秒或格挡 5 次",
              "提高 12%",
              "提高 18%",
              "提高 24%",
              "提高 30%"
            ]
          },
          {
            "id": "p_purifying_aura",
            "name": "纯洁之心",
            "icon": "spell_holy_purifyingaura",
            "row": 1,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "抵抗诅咒和疾病效果几率提高 5%",
              "提高 10%",
              "提高 15%"
            ]
          },
          {
            "id": "p_precision",
            "name": "精确",
            "icon": "ability_marksmanship",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "近战武器和法术命中几率提高 1%",
              "提高 2%",
              "提高 3%"
            ]
          },
          {
            "id": "p_toughness",
            "name": "坚韧",
            "icon": "spell_holy_devotionaura",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "装备护甲值提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "p_imp_righteous_fury",
            "name": "强化正义之怒",
            "icon": "spell_holy_sealofwisdom",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "正义之怒产生的神圣仇恨提高 16%",
              "提高 33%",
              "提高 50%"
            ]
          },
          {
            "id": "p_imp_hoj",
            "name": "强化制裁之锤",
            "icon": "spell_holy_sealofmight",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "制裁之锤冷却时间缩短 5 秒",
              "缩短 10 秒",
              "缩短 15 秒"
            ]
          },
          {
            "id": "p_blessing_sanctuary",
            "name": "庇护祝福",
            "icon": "spell_holy_greaterblessingofsanctuary",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "祝福目标减少受到的所有伤害，格挡后反弹神圣伤害给攻击者"
            ]
          },
          {
            "id": "p_reckoning",
            "name": "清算",
            "icon": "spell_holy_blessingofstrength",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "受到暴击后有 20% 几率获得一次额外武器攻击机会",
              "几率 40%",
              "几率 60%",
              "几率 80%",
              "几率 100%"
            ]
          },
          {
            "id": "p_one_hand_spec",
            "name": "单手武器专精",
            "icon": "inv_sword_20",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "单手近战武器造成的伤害提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "p_holy_shield",
            "name": "神圣之盾",
            "icon": "spell_holy_blessingofprotection",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": "p_blessing_sanctuary",
            "ranks": [
              "格挡几率提高 30% 持续 10 秒，每次格挡对攻击者造成神圣反弹伤害"
            ]
          },
          {
            "id": "p_divine_intervention",
            "name": "圣光守护",
            "icon": "spell_holy_divineintervention",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "法术伤害和治疗效果提高 3%，受到的法术暴击降低 2%",
              "提高 6%，降低 4%"
            ]
          },
          {
            "id": "p_ardent_defender",
            "name": "炽热防御者",
            "icon": "spell_holy_ardentdefender",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "生命值低于 35% 时受到的所有伤害降低 6%",
              "降低 12%",
              "降低 18%",
              "降低 24%",
              "降低 30%"
            ]
          },
          {
            "id": "p_avengers_shield",
            "name": "复仇者之盾",
            "icon": "spell_holy_avengersshield",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "投掷神圣之盾重击敌人造成神圣伤害并打断施法，弹跳攻击最多 3 个目标"
            ]
          }
        ]
      },
      {
        "id": "retribution",
        "name": "惩戒",
        "skills": [
          {
            "id": "p_benediction",
            "name": "强化祈福",
            "icon": "spell_frost_windwalkon",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "审判和圣印法力消耗降低 3%",
              "降低 6%",
              "降低 9%",
              "降低 12%",
              "降低 15%"
            ]
          },
          {
            "id": "p_imp_judgment",
            "name": "强化审判",
            "icon": "spell_holy_righteousfury",
            "row": 1,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "审判冷却时间缩短 1 秒",
              "缩短 2 秒"
            ]
          },
          {
            "id": "p_imp_ret_aura",
            "name": "强化惩戒光环",
            "icon": "spell_holy_auraoflight",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "惩戒光环反弹伤害提高 25%",
              "提高 50%"
            ]
          },
          {
            "id": "p_deflection",
            "name": "偏斜",
            "icon": "ability_parry",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "招架几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "p_conviction",
            "name": "定罪",
            "icon": "spell_holy_retributionaura",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "近战武器致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "p_seal_of_command",
            "name": "命令圣印",
            "icon": "ability_warrior_innerrage",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "近战攻击有一定几率造成武器神圣伤害，审判造成爆发神圣伤害"
            ]
          },
          {
            "id": "p_pursuit_justice",
            "name": "正义追击",
            "icon": "spell_holy_persuitofjustice",
            "row": 3,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "移动速度和坐骑速度提高 4%，受昏迷几率降低 5%",
              "提高 8%/10%"
            ]
          },
          {
            "id": "p_eye_for_eye",
            "name": "以眼还眼",
            "icon": "spell_holy_eyeforaneye",
            "row": 3,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "受到法术暴击后反弹 15% 伤害给施法者",
              "反弹 30%"
            ]
          },
          {
            "id": "p_imp_might",
            "name": "强化力量祝福",
            "icon": "spell_holy_fistofjustice",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "力量祝福攻击强度提高 4%",
              "提高 8%",
              "提高 12%",
              "提高 16%",
              "提高 20%"
            ]
          },
          {
            "id": "p_two_hand_spec",
            "name": "双手武器专精",
            "icon": "inv_sword_04",
            "row": 5,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "双手近战武器造成的伤害提高 2%",
              "提高 4%",
              "提高 6%"
            ]
          },
          {
            "id": "p_sanctity_aura",
            "name": "圣洁光环",
            "icon": "spell_holy_mindvision",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使小队成员的神圣伤害提高 10%"
            ]
          },
          {
            "id": "p_seal_twisting",
            "name": "圣印舞",
            "icon": "spell_holy_righteousnessaura",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "【无限服核心机制】切换圣印时，原圣印伤害效果依然保留 0.4 秒并可同时触发",
              "保留 0.8 秒"
            ]
          },
          {
            "id": "p_vengeance",
            "name": "复仇",
            "icon": "ability_racial_avatar",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": "p_conviction",
            "ranks": [
              "暴击后物理和神圣伤害提高 3%，最多叠加 3 次",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "p_crusader_strike",
            "name": "十字军打击",
            "icon": "spell_holy_crusaderstrike",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服31点核心大招】即时近战攻击造成 110% 武器伤害，刷新目标所有审判"
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
        "name": "无限服·漩涡先知增强萨 (0/32/19)",
        "desc": "【无限服近战法王】普攻叠满漩涡武器瞬发大闪电箭/治疗波，先知之怒专属狂暴嗜血，风暴打击双持爆发！",
        "points": {
          "s_ancestral_know": 5,
          "s_thundering_strikes": 5,
          "s_ghost_wolf": 2,
          "s_shield_spec": 2,
          "s_two_hand": 1,
          "s_flurry": 5,
          "s_spirit_weapons": 1,
          "s_stormstrike": 1,
          "s_anticipation": 4,
          "s_weapon_mastery": 5,
          "s_maelstrom_weapon": 1,
          "s_tidal_focus": 5,
          "s_totemic_focus": 5,
          "s_healing_focus": 5,
          "s_restorative_totems": 4
        }
      },
      {
        "name": "无限服·激流链刷奶萨 (0/5/46)",
        "desc": "【无限服团队抬血之神】瞬发激流HOT增幅治疗链，法力之潮图腾全队回蓝，自然迅捷绝境救场！",
        "points": {
          "s_ancestral_know": 5,
          "s_imp_healing_wave": 5,
          "s_tidal_focus": 5,
          "s_totemic_focus": 5,
          "s_healing_focus": 5,
          "s_totemic_mastery": 1,
          "s_restorative_totems": 5,
          "s_tidal_mastery": 5,
          "s_nature_swiftness": 1,
          "s_mana_tide": 1,
          "s_purification": 5,
          "s_riptide": 1,
          "s_ancestral_healing": 3,
          "s_nature_guidance": 3,
          "s_healing_grace": 1
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
            "icon": "spell_nature_lightningbolt",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "震击、闪电箭和闪电链法力消耗降低 2%",
              "降低 4%",
              "降低 6%",
              "降低 8%",
              "降低 10%"
            ]
          },
          {
            "id": "s_concussion",
            "name": "震荡",
            "icon": "spell_fire_fireball",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "闪电法术和震击伤害提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "s_earths_grasp",
            "name": "大地之握",
            "icon": "spell_nature_stoneclawtotem",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "地缚图腾范围提高 25%，石爪图腾生命值提高 25%",
              "提高 50%/50%"
            ]
          },
          {
            "id": "s_elemental_warding",
            "name": "元素防护",
            "icon": "spell_nature_spiritarmor",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "受到的自然、火焰和冰霜伤害降低 4%",
              "降低 7%",
              "降低 10%"
            ]
          },
          {
            "id": "s_call_of_flame",
            "name": "烈焰召唤",
            "icon": "spell_fire_immolation",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "火焰图腾造成的伤害提高 5%",
              "提高 10%",
              "提高 15%"
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
              "法术致命一击后使你的下 2 个伤害或治疗法术法力消耗降低 40%"
            ]
          },
          {
            "id": "s_reverberation",
            "name": "回响",
            "icon": "spell_frost_frostshock",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "震击法术冷却时间缩短 0.2 秒",
              "缩短 0.4 秒",
              "缩短 0.6 秒",
              "缩短 0.8 秒",
              "缩短 1.0 秒"
            ]
          },
          {
            "id": "s_call_of_thunder",
            "name": "雷霆召唤",
            "icon": "spell_nature_callstorm",
            "row": 3,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "闪电箭和闪电链致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 6%"
            ]
          },
          {
            "id": "s_eye_of_storm",
            "name": "风暴之眼",
            "icon": "spell_nature_stormreach",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "受到近战暴击后获得专注光环，在 6 秒内施法不被打退",
              "持续加成提高",
              "必定触发"
            ]
          },
          {
            "id": "s_elemental_devastation",
            "name": "元素毁灭",
            "icon": "spell_fire_elementaldevastation",
            "row": 4,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "攻击法术暴击后近战致命一击几率提高 3%，持续 10 秒",
              "提高 6%",
              "提高 9%"
            ]
          },
          {
            "id": "s_elemental_fury",
            "name": "元素之怒",
            "icon": "spell_fire_volcano",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "闪电、震击和火焰图腾暴击伤害加成提高 100%"
            ]
          },
          {
            "id": "s_lightning_mastery",
            "name": "闪电掌握",
            "icon": "spell_nature_lightning",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": "s_call_of_thunder",
            "ranks": [
              "闪电箭和闪电链施法时间缩短 0.2 秒",
              "缩短 0.4 秒",
              "缩短 0.6 秒",
              "缩短 0.8 秒",
              "缩短 1.0 秒"
            ]
          },
          {
            "id": "s_elemental_mastery",
            "name": "元素掌握",
            "icon": "spell_nature_wispheal",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "s_elemental_fury",
            "ranks": [
              "激活后你的下一个闪电或震击法术瞬发且必定暴击，法力消耗降低 100%"
            ]
          },
          {
            "id": "s_lava_burst",
            "name": "熔岩爆裂",
            "icon": "spell_shaman_lavaburst",
            "row": 7,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服特色大招】向目标投掷熔岩造成大量火焰伤害，若目标处于烈焰震击状态则必定暴击！"
            ]
          }
        ]
      },
      {
        "id": "enhancement",
        "name": "增强",
        "skills": [
          {
            "id": "s_ancestral_know",
            "name": "先祖知识",
            "icon": "spell_shadow_grimward",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "法力值上限提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "s_shield_spec",
            "name": "盾牌专精",
            "icon": "inv_shield_06",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "盾牌格挡几率提高 1%，格挡值提高 5%",
              "提高 2%/10%",
              "提高 3%/15%",
              "提高 4%/20%",
              "提高 5%/25%"
            ]
          },
          {
            "id": "s_thundering_strikes",
            "name": "雷霆罢击",
            "icon": "ability_thunderbolt",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "近战武器致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "s_ghost_wolf",
            "name": "强化幽魂之狼",
            "icon": "spell_nature_spiritwolf",
            "row": 2,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "变身幽魂之狼施法时间缩短 1 秒",
              "变为瞬发"
            ]
          },
          {
            "id": "s_two_hand",
            "name": "双手斧和锤",
            "icon": "inv_axe_10",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "允许装备双手斧和双手锤类武器"
            ]
          },
          {
            "id": "s_anticipation",
            "name": "预知",
            "icon": "spell_nature_mirrorimage",
            "row": 4,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "躲闪几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "s_flurry",
            "name": "乱舞",
            "icon": "ability_ghoulfrenzy",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": "s_thundering_strikes",
            "ranks": [
              "近战暴击后下 3 次攻击速度提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%",
              "提高 30%"
            ]
          },
          {
            "id": "s_spirit_weapons",
            "name": "幽魂武器",
            "icon": "spell_nature_windfury",
            "row": 4,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "招架几率提高 5%，并使近战攻击产生的仇恨降低 30%"
            ]
          },
          {
            "id": "s_stormstrike",
            "name": "风暴打击",
            "icon": "spell_holy_sealofmight",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "双手武器同时攻击，造成武器伤害并使目标受到的下 2 次自然伤害提高 20%"
            ]
          },
          {
            "id": "s_weapon_mastery",
            "name": "武器大师",
            "icon": "ability_warrior_weaponmastery",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "所有武器造成的物理伤害提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "s_maelstrom_weapon",
            "name": "漩涡武器",
            "icon": "spell_shaman_maelstromweapon",
            "row": 7,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "近战攻击有几率使下一次闪电箭、闪电链或治疗法术施法时间缩短 20%，可叠 5 层瞬发",
              "提高触发几率",
              "提高几率",
              "提高几率",
              "满层瞬发且不耗蓝"
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
              "治疗波施法时间缩短 0.1 秒",
              "缩短 0.2 秒",
              "缩短 0.3 秒",
              "缩短 0.4 秒",
              "缩短 0.5 秒"
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
              "治疗法术法力消耗降低 1%",
              "降低 2%",
              "降低 3%",
              "降低 4%",
              "降低 5%"
            ]
          },
          {
            "id": "s_ancestral_healing",
            "name": "先祖治疗",
            "icon": "spell_nature_undyingstrength",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "治疗暴击使目标护甲值提高 8%，持续 15 秒",
              "提高 16%",
              "提高 25%"
            ]
          },
          {
            "id": "s_totemic_focus",
            "name": "图腾集中",
            "icon": "spell_nature_manaregentotem",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "图腾法力消耗降低 5%",
              "降低 10%",
              "降低 15%",
              "降低 20%",
              "降低 25%"
            ]
          },
          {
            "id": "s_nature_guidance",
            "name": "自然指引",
            "icon": "spell_frost_stun",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "近战和法术命中几率提高 1%",
              "提高 2%",
              "提高 3%"
            ]
          },
          {
            "id": "s_healing_focus",
            "name": "治疗专注",
            "icon": "spell_nature_healingtouch",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "治疗法术施法受打退几率降低 14%",
              "降低 28%",
              "降低 42%",
              "降低 56%",
              "降低 70%"
            ]
          },
          {
            "id": "s_totemic_mastery",
            "name": "图腾掌握",
            "icon": "spell_nature_astralrecal",
            "row": 3,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "图腾的作用半径提高到 30 码"
            ]
          },
          {
            "id": "s_healing_grace",
            "name": "治疗恩赐",
            "icon": "spell_nature_healingtouch",
            "row": 4,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "治疗法术产生的仇恨降低 5%",
              "降低 10%",
              "降低 15%"
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
              "法力之泉和治疗之泉图腾效果提高 5%",
              "提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%"
            ]
          },
          {
            "id": "s_tidal_mastery",
            "name": "潮汐掌握",
            "icon": "spell_nature_tranquility",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "治疗法术和闪电法术暴击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "s_nature_swiftness",
            "name": "自然迅捷",
            "icon": "spell_nature_ravenform",
            "row": 5,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后使你的下一个施法时间低于 10 秒的自然法术变为瞬发"
            ]
          },
          {
            "id": "s_mana_tide",
            "name": "法力之潮图腾",
            "icon": "spell_frost_summonwaterelemental",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": "s_restorative_totems",
            "ranks": [
              "召唤图腾为小队成员每 3 秒恢复大量法力值，持续 12 秒"
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
              "治疗法术效果提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "s_riptide",
            "name": "激流",
            "icon": "spell_nature_riptide",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服特色大招】立即治疗友方目标并在 15 秒内持续回血，使下一次治疗链跳跃增幅 25%"
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
        "name": "无限服·独来独往射击猎 (0/31/20)",
        "desc": "【无限服无宠纯射击王者】独来独往使无宠物时远程伤害提升20%，瞄准致死暴击巨额爆发！",
        "points": {
          "h_efficiency": 5,
          "h_lethal_shots": 5,
          "h_concussive_shot": 1,
          "h_aimed_shot": 1,
          "h_hawk_eye": 3,
          "h_mortal_shots": 5,
          "h_hunters_mark": 1,
          "h_scatter_shot": 1,
          "h_barrage": 3,
          "h_ranged_spec": 5,
          "h_trueshot": 1,
          "h_monster_slaying": 3,
          "h_humanoid_slaying": 2,
          "h_savage_strikes": 2,
          "h_entrapment": 3,
          "h_survivalist": 5,
          "h_surefooted": 3,
          "h_deflection": 2
        }
      },
      {
        "name": "无限服·近战撕裂生存猎 (0/20/31)",
        "desc": "【无限服近战猎全新标杆】生存彻底重做近战专精！猛禽一击重置，新大招撕裂打击撕碎护甲！",
        "points": {
          "h_efficiency": 5,
          "h_lethal_shots": 5,
          "h_concussive_shot": 1,
          "h_aimed_shot": 1,
          "h_hawk_eye": 3,
          "h_mortal_shots": 5,
          "h_monster_slaying": 3,
          "h_humanoid_slaying": 2,
          "h_deflection": 5,
          "h_survivalist": 5,
          "h_surefooted": 3,
          "h_entrapment": 2,
          "h_killer_instinct": 3,
          "h_deterrence": 1,
          "h_counterattack": 1,
          "h_lightning_reflexes": 5,
          "h_lacerate": 1
        }
      },
      {
        "name": "无限服·雄鹰兽王狂暴 (31/20/0)",
        "desc": "【无限服人宠合一开荒神技】狂野怒火红人宠物狂暴免疫控制，强化雄鹰守护机关枪极速射击！",
        "points": {
          "h_imp_hawk": 5,
          "h_endurance_training": 5,
          "h_thick_hide": 3,
          "h_pathfinding": 2,
          "h_unleashed_fury": 5,
          "h_ferocity": 5,
          "h_intimidation": 1,
          "h_frenzy": 4,
          "h_bestial_wrath": 1,
          "h_efficiency": 5,
          "h_lethal_shots": 5,
          "h_concussive_shot": 1,
          "h_aimed_shot": 1,
          "h_hawk_eye": 3,
          "h_mortal_shots": 5
        }
      }
    ],
    "trees": [
      {
        "id": "beastmastery",
        "name": "野兽控制",
        "skills": [
          {
            "id": "h_imp_hawk",
            "name": "强化雄鹰守护",
            "icon": "spell_nature_ravenform",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "普通射击有 1% 几率使远程攻速提高 30%，持续 12 秒",
              "几率 2%",
              "几率 3%",
              "几率 4%",
              "几率 5%"
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
              "宠物生命值提高 3%，猎人生命值提高 1%",
              "提高 6%/2%",
              "提高 9%/3%",
              "提高 12%/4%",
              "提高 15%/5%"
            ]
          },
          {
            "id": "h_thick_hide",
            "name": "厚皮",
            "icon": "inv_misc_pelt_bear_03",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "宠物护甲值提高 10%，猎人护甲提高 3%",
              "提高 20%/6%",
              "提高 30%/10%"
            ]
          },
          {
            "id": "h_pathfinding",
            "name": "寻路",
            "icon": "ability_mount_ridinghorse",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "猎豹和豹群守护速度提高 3%",
              "提高 6%"
            ]
          },
          {
            "id": "h_unleashed_fury",
            "name": "狂怒释放",
            "icon": "ability_bullrush",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "宠物伤害提高 3%",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "h_ferocity",
            "name": "凶暴",
            "icon": "inv_misc_monsterclaw_04",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "宠物致命一击几率提高 3%",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "h_intimidation",
            "name": "胁迫",
            "icon": "ability_devour",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": "h_unleashed_fury",
            "ranks": [
              "指令宠物下一次近战攻击使目标昏迷 3 秒并产生巨额仇恨"
            ]
          },
          {
            "id": "h_spirit_bond",
            "name": "灵魂联结",
            "icon": "ability_druid_demoralizingroar",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "宠物处于激活状态时，每 10 秒为猎人和宠物回复 1% 生命",
              "回复 2%"
            ]
          },
          {
            "id": "h_frenzy",
            "name": "狂乱",
            "icon": "inv_misc_monsterclaw_03",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": "h_ferocity",
            "ranks": [
              "宠物暴击后有 20% 几率攻击速度提高 30%，持续 8 秒",
              "几率 40%",
              "几率 60%",
              "几率 80%",
              "几率 100%"
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
              "使宠物进入狂暴状态造成的伤害提高 50%，免疫所有控制，持续 18 秒"
            ]
          }
        ]
      },
      {
        "id": "marksmanship",
        "name": "射击",
        "skills": [
          {
            "id": "h_concussive_shot",
            "name": "强化震荡射击",
            "icon": "spell_frost_stun",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "震荡射击有 4% 几率使目标昏迷 3 秒",
              "几率 8%",
              "几率 12%",
              "几率 16%",
              "几率 20%"
            ]
          },
          {
            "id": "h_efficiency",
            "name": "效率",
            "icon": "spell_frost_wizardmark",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "射击技能法力消耗降低 2%",
              "降低 4%",
              "降低 6%",
              "降低 8%",
              "降低 10%"
            ]
          },
          {
            "id": "h_hunters_mark",
            "name": "强化猎人印记",
            "icon": "ability_hunter_snipershot",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "猎人印记提供的攻击强度提高 3%",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "h_lethal_shots",
            "name": "夺命射击",
            "icon": "ability_searingarrow",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "远程武器致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "h_aimed_shot",
            "name": "瞄准射击",
            "icon": "inv_spear_07",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "强力狙击造成武器伤害+600点额外伤害，使目标受到的治疗效果降低 50%"
            ]
          },
          {
            "id": "h_hawk_eye",
            "name": "鹰眼",
            "icon": "ability_townwatch",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "远程武器射程增加 2 码",
              "增加 4 码",
              "增加 6 码"
            ]
          },
          {
            "id": "h_mortal_shots",
            "name": "致死射击",
            "icon": "ability_searingarrow",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": "h_lethal_shots",
            "ranks": [
              "远程武器暴击伤害加成提高 6%",
              "提高 12%",
              "提高 18%",
              "提高 24%",
              "提高 30%"
            ]
          },
          {
            "id": "h_scatter_shot",
            "name": "驱散射击",
            "icon": "ability_golemstorm",
            "row": 5,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "短程射击造成 50% 武器伤害并使目标迷惑 4 秒，受伤害打断"
            ]
          },
          {
            "id": "h_barrage",
            "name": "弹幕",
            "icon": "ability_upgrademoonglaive",
            "row": 5,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "多重射击和乱射造成的伤害提高 5%",
              "提高 10%",
              "提高 15%"
            ]
          },
          {
            "id": "h_ranged_spec",
            "name": "远程武器专精",
            "icon": "inv_weapon_rifle_01",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "远程武器造成的伤害提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "h_lone_wolf",
            "name": "独来独往",
            "icon": "ability_hunter_pet_wolf",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "【无限服特色】不召唤宠物时，自身远程攻击造成的伤害提高 7%",
              "伤害提高 14%",
              "伤害提高 20%"
            ]
          },
          {
            "id": "h_trueshot",
            "name": "强击光环",
            "icon": "ability_trueshot",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "h_barrage",
            "ranks": [
              "小队光环使所有小队成员远程和近战攻击强度提高 100 点"
            ]
          }
        ]
      },
      {
        "id": "survival",
        "name": "生存",
        "skills": [
          {
            "id": "h_monster_slaying",
            "name": "怪物杀手",
            "icon": "inv_misc_head_dragon_01",
            "row": 1,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "对野兽、巨人、龙类伤害提高 1%，受到的暴击伤害降低 1%",
              "提高 2%/2%",
              "提高 3%/3%"
            ]
          },
          {
            "id": "h_humanoid_slaying",
            "name": "人型生物杀手",
            "icon": "spell_holy_prayerofhealing",
            "row": 1,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "对人型生物伤害提高 1%，暴击伤害加成提高 1%",
              "提高 2%/2%",
              "提高 3%/3%"
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
              "招架几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
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
              "冰霜陷阱和献祭陷阱有 5% 几率困住目标使其无法移动 5 秒",
              "几率 10%",
              "几率 15%",
              "几率 20%",
              "几率 25%"
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
              "猛禽一击和猫鼬撕咬致命一击几率提高 10%",
              "提高 20%"
            ]
          },
          {
            "id": "h_survivalist",
            "name": "生存专家",
            "icon": "spell_shadow_twilight",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "生命值上限提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
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
              "激活后闪避和招架几率提高 25%，持续 10 秒"
            ]
          },
          {
            "id": "h_surefooted",
            "name": "稳固",
            "icon": "ability_kick",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "命中几率提高 1%，抵抗移动限制几率提高 5%",
              "提高 2%/10%",
              "提高 3%/15%"
            ]
          },
          {
            "id": "h_killer_instinct",
            "name": "杀戮本能",
            "icon": "spell_holy_blessingofstamina",
            "row": 5,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "所有攻击致命一击几率提高 1%",
              "提高 2%",
              "提高 3%"
            ]
          },
          {
            "id": "h_counterattack",
            "name": "反击",
            "icon": "ability_warrior_challange",
            "row": 5,
            "col": 3,
            "max": 1,
            "prereq": "h_survivalist",
            "ranks": [
              "招架后激活造成近战武器伤害，并使目标无法移动 5 秒"
            ]
          },
          {
            "id": "h_lightning_reflexes",
            "name": "闪电反射",
            "icon": "spell_nature_invisibilty",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "敏捷总值提高 3%",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "h_lacerate",
            "name": "撕裂打击",
            "icon": "ability_ghoulfrenzy",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服生存近战核心】近战撕裂目标伤口，无视护甲流血并在持续时间内提高近战伤害 30%"
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
        "name": "无限服·野性狂暴猫熊 (0/38/13)",
        "desc": "【无限服变形核心双修】狂暴大招裂伤3目标移除CD，野性之心耐力/力量大提升，清晰预兆极速回能！",
        "points": {
          "d_ferocity": 5,
          "d_feral_aggression": 5,
          "d_feral_instinct": 5,
          "d_thick_hide": 2,
          "d_sharpened_claws": 3,
          "d_predatory_strikes": 3,
          "d_feral_charge": 1,
          "d_primal_fury": 2,
          "d_blood_frenzy": 2,
          "d_faerie_fire": 1,
          "d_savage_fury": 2,
          "d_heart_of_wild": 5,
          "d_leader_of_pack": 1,
          "d_berserk": 1,
          "d_imp_mark_of_wild": 5,
          "d_furor": 5,
          "d_naturalist": 3
        }
      },
      {
        "name": "无限服·野性成长奶德 (5/0/46)",
        "desc": "【无限服团队第一HOT大师】野性成长大招全团智能群抬，自然迅捷救急大触，回春愈合满场跳！",
        "points": {
          "d_imp_wrath": 5,
          "d_imp_mark_of_wild": 5,
          "d_furor": 5,
          "d_nature_focus": 5,
          "d_naturalist": 5,
          "d_omen_of_clarity": 1,
          "d_subtlety": 4,
          "d_gift_of_nature": 5,
          "d_imp_rejuv": 3,
          "d_nature_swiftness": 1,
          "d_reflection": 3,
          "d_imp_regrowth": 5,
          "d_swiftmend": 1,
          "d_wild_growth": 2,
          "d_natures_grasp": 1
        }
      }
    ],
    "trees": [
      {
        "id": "balance",
        "name": "平衡",
        "skills": [
          {
            "id": "d_natures_grasp",
            "name": "自然之握",
            "icon": "spell_nature_natureswrath",
            "row": 1,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后受近战攻击有 35% 几率纠缠目标"
            ]
          },
          {
            "id": "d_imp_natures_grasp",
            "name": "强化自然之握",
            "icon": "spell_nature_natureswrath",
            "row": 1,
            "col": 2,
            "max": 4,
            "prereq": "d_natures_grasp",
            "ranks": [
              "自然之握触发几率提高 15%",
              "提高 30%",
              "提高 45%",
              "提高 65%"
            ]
          },
          {
            "id": "d_imp_wrath",
            "name": "强化愤怒",
            "icon": "spell_nature_abolishmagic",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "愤怒施法时间缩短 0.1 秒",
              "缩短 0.2 秒",
              "缩短 0.3 秒",
              "缩短 0.4 秒",
              "缩短 0.5 秒"
            ]
          },
          {
            "id": "d_natures_reach",
            "name": "自然延伸",
            "icon": "spell_nature_naturetouchgrow",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "自然法术射程增加 10%",
              "增加 20%"
            ]
          },
          {
            "id": "d_imp_moonfire",
            "name": "强化月火术",
            "icon": "spell_nature_starfall",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "月火术伤害和暴击几率提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "d_insect_swarm",
            "name": "虫群",
            "icon": "spell_nature_insectswarm",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "昆虫侵扰目标在 12 秒内造成自然伤害，并使其物理命中几率降低 2%"
            ]
          },
          {
            "id": "d_moonfury",
            "name": "月怒",
            "icon": "spell_nature_moonglow",
            "row": 3,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "星火术、月火术和愤怒伤害提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "d_eclipse",
            "name": "日月之蚀",
            "icon": "spell_nature_crystalball",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "【无限服特色】星火术暴击使愤怒暴击提高 10%，愤怒暴击使星火术伤害提高 10%",
              "提高 20%/20%",
              "提高 30%/30%"
            ]
          },
          {
            "id": "d_natures_grace",
            "name": "自然赐福",
            "icon": "spell_nature_naturesspeaking",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "法术致命一击后使你的下一个法术施法时间缩短 0.5 秒"
            ]
          },
          {
            "id": "d_moonglow",
            "name": "月光",
            "icon": "spell_nature_moonglow",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "月火术、星火术、治疗之触法力消耗降低 3%",
              "降低 6%",
              "降低 9%"
            ]
          },
          {
            "id": "d_dreamstate",
            "name": "梦境",
            "icon": "spell_nature_sentinal",
            "row": 6,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "智力总值的 4% 转化为法术伤害和治疗效果",
              "转化为 7%",
              "转化为 10%"
            ]
          },
          {
            "id": "d_moonkin_form",
            "name": "枭兽形态",
            "icon": "spell_nature_forceofnature",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "d_natures_grace",
            "ranks": [
              "变身枭兽护甲值提高 360%，小队法术致命一击几率提高 3%"
            ]
          }
        ]
      },
      {
        "id": "feral",
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
              "重击、挥击、爪击和扫击怒气/能量消耗降低 1 点",
              "降低 2 点",
              "降低 3 点",
              "降低 4 点",
              "降低 5 点"
            ]
          },
          {
            "id": "d_feral_aggression",
            "name": "野性侵略",
            "icon": "ability_druid_demoralizingroar",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "挫志咆哮降低攻击强度效果提高 8%，凶猛撕咬伤害提高 3%",
              "提高 16%/6%",
              "提高 24%/9%",
              "提高 32%/12%",
              "提高 40%/15%"
            ]
          },
          {
            "id": "d_feral_instinct",
            "name": "野性本能",
            "icon": "ability_ambush",
            "row": 2,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "熊形态产生的仇恨提高 3%，潜行敌人发现难度提高",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "d_brutal_impact",
            "name": "野蛮冲撞",
            "icon": "ability_druid_bash",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "重击和突袭昏迷时间延长 0.5 秒",
              "延长 1.0 秒"
            ]
          },
          {
            "id": "d_thick_hide",
            "name": "厚皮",
            "icon": "inv_misc_pelt_bear_03",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "装备护甲值提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "d_feral_charge",
            "name": "野性冲锋",
            "icon": "ability_hunter_pet_bear",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "向敌人冲锋使其无法移动 4 秒并打断施法"
            ]
          },
          {
            "id": "d_sharpened_claws",
            "name": "锋利兽爪",
            "icon": "inv_misc_monsterclaw_04",
            "row": 3,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "熊和猎豹形态致命一击几率提高 2%",
              "提高 4%",
              "提高 6%"
            ]
          },
          {
            "id": "d_predatory_strikes",
            "name": "猛兽攻击",
            "icon": "ability_hunter_pet_cat",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "熊和猎豹形态攻击强度提高基于等级的数值",
              "大幅提高",
              "极大幅度提高"
            ]
          },
          {
            "id": "d_primal_fury",
            "name": "原始狂怒",
            "icon": "ability_racial_bloodrage",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": "d_sharpened_claws",
            "ranks": [
              "暴击后熊形态有 50% 几率产生 5 点怒气，猫形态额外增加 1 个连击点",
              "几率 100%"
            ]
          },
          {
            "id": "d_blood_frenzy",
            "name": "血之狂暴",
            "icon": "ability_druid_catform",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "暴击使目标受到物理流血易伤提高 2%",
              "提高 4%"
            ]
          },
          {
            "id": "d_faerie_fire",
            "name": "精灵之火(野性)",
            "icon": "spell_nature_faeriefire",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "削弱目标护甲值并在 40 秒内阻止潜行和隐形"
            ]
          },
          {
            "id": "d_savage_fury",
            "name": "野蛮暴怒",
            "icon": "ability_druid_mangle",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "爪击、扫击、重击和撕裂伤害提高 10%",
              "提高 20%"
            ]
          },
          {
            "id": "d_heart_of_wild",
            "name": "野性之心",
            "icon": "spell_holy_blessingofagility",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "智力提高 4%，熊形态耐力提高 4%，猎豹形态力量提高 4%",
              "提高 8%",
              "提高 12%",
              "提高 16%",
              "提高 20%"
            ]
          },
          {
            "id": "d_leader_of_pack",
            "name": "兽群领袖",
            "icon": "spell_nature_unyeildingstamina",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "猎豹和熊形态光环使 45 码内所有队友物理致命一击几率提高 3%"
            ]
          },
          {
            "id": "d_berserk",
            "name": "狂暴",
            "icon": "ability_druid_berserk",
            "row": 7,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服特色大招】裂伤无CD且可攻击3个目标，持续期间连击点消耗减半，持续 15 秒！"
            ]
          }
        ]
      },
      {
        "id": "restoration",
        "name": "恢复",
        "skills": [
          {
            "id": "d_imp_mark_of_wild",
            "name": "强化野性印记",
            "icon": "spell_nature_regeneration",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "野性印记和野性赐福效果提高 7%",
              "提高 14%",
              "提高 21%",
              "提高 28%",
              "提高 35%"
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
              "变身熊形态有 20% 几率获得 10 点怒气，猫形态获得 8 点能量",
              "几率 40%/16点",
              "几率 60%/24点",
              "几率 80%/32点",
              "几率 100%/40点"
            ]
          },
          {
            "id": "d_nature_focus",
            "name": "自然专注",
            "icon": "spell_nature_healingtouch",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "治疗之触、愈合施法受到伤害打退几率降低 14%",
              "降低 28%",
              "降低 42%",
              "降低 56%",
              "降低 70%"
            ]
          },
          {
            "id": "d_naturalist",
            "name": "自然主义",
            "icon": "spell_nature_healingwavegreater",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "治疗之触施法时间缩短 0.1 秒，物理伤害提高 2%",
              "缩短 0.2s/4%",
              "缩短 0.3s/6%",
              "缩短 0.4s/8%",
              "缩短 0.5s/10%"
            ]
          },
          {
            "id": "d_omen_of_clarity",
            "name": "清晰预兆",
            "icon": "spell_nature_crystalball",
            "row": 3,
            "col": 1,
            "max": 1,
            "prereq": null,
            "ranks": [
              "近战攻击有几率使德鲁伊进入节能施法状态，下一次攻击技能或法术消耗降低 100%"
            ]
          },
          {
            "id": "d_subtlety",
            "name": "微妙",
            "icon": "ability_eyeoftheowl",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "治疗法术产生的仇恨降低 4%",
              "降低 8%",
              "降低 12%",
              "降低 16%",
              "降低 20%"
            ]
          },
          {
            "id": "d_gift_of_nature",
            "name": "自然赐福",
            "icon": "spell_nature_protectionformnature",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "所有治疗法术效果提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
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
              "回春术治疗效果提高 5%",
              "提高 10%",
              "提高 15%"
            ]
          },
          {
            "id": "d_nature_swiftness",
            "name": "自然迅捷",
            "icon": "spell_nature_ravenform",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后使你的下一个自然法术变为瞬发"
            ]
          },
          {
            "id": "d_reflection",
            "name": "反射",
            "icon": "spell_frost_windwalkon",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "在施法时保持 5% 的法力恢复速度",
              "保持 10%",
              "保持 15%"
            ]
          },
          {
            "id": "d_imp_regrowth",
            "name": "强化愈合",
            "icon": "spell_nature_resistnature",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "愈合暴击几率提高 10%",
              "提高 20%",
              "提高 30%",
              "提高 40%",
              "提高 50%"
            ]
          },
          {
            "id": "d_swiftmend",
            "name": "迅捷治愈",
            "icon": "inv_relics_idolofrejuvenation",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "消耗目标身上的回春术或愈合效果，立即为其回复大量生命值"
            ]
          },
          {
            "id": "d_wild_growth",
            "name": "野性成长",
            "icon": "ability_druid_haesharsh",
            "row": 7,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "【无限服特色大招】为小队全员施加回春能量，在 7 秒内全员持续回复高额生命",
              "治疗量提高 25%"
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
        "name": "无限服·奥术冲击爆发 (31/20/0)",
        "desc": "【无限服单体爆发新天花板】无限服全新大招【奥术冲击】急速叠层增伤，气定神闲瞬发大炎爆！",
        "points": {
          "m_arcane_subtlety": 2,
          "m_arcane_focus": 3,
          "m_imp_arcane_missiles": 5,
          "m_arcane_concentration": 5,
          "m_magic_attunement": 2,
          "m_imp_arcane_explosion": 3,
          "m_arcane_meditation": 3,
          "m_presence_of_mind": 1,
          "m_arcane_mind": 2,
          "m_arcane_instability": 3,
          "m_arcane_power": 1,
          "m_arcane_blast": 1,
          "m_imp_fireball": 5,
          "m_ignite": 5,
          "m_flame_throwing": 2,
          "m_pyroblast": 1,
          "m_burning_soul": 2,
          "m_imp_scorch": 3,
          "m_imp_flamestrike": 2
        }
      },
      {
        "name": "无限服·霜火之箭输出 (17/31/3)",
        "desc": "【无限服双系合璧巅峰】火系燃烧点燃 + 霜火之箭冰火双减抗双暴击，奥术节能续航无忧！",
        "points": {
          "m_arcane_subtlety": 2,
          "m_arcane_focus": 3,
          "m_imp_arcane_missiles": 5,
          "m_arcane_concentration": 5,
          "m_magic_attunement": 2,
          "m_imp_fireball": 5,
          "m_ignite": 5,
          "m_flame_throwing": 2,
          "m_pyroblast": 1,
          "m_burning_soul": 2,
          "m_imp_scorch": 3,
          "m_imp_flamestrike": 2,
          "m_critical_mass": 3,
          "m_master_of_elements": 2,
          "m_fire_power": 5,
          "m_frostfire_bolt": 1,
          "m_elemental_precision": 3
        }
      },
      {
        "name": "无限服·深冰控场练级 (17/0/34)",
        "desc": "【无限服野外与副本生存之王】急速冷却双冰箱双吹风，寒冰护体厚盾吸收，暴风雪减速无伤拉怪！",
        "points": {
          "m_arcane_subtlety": 2,
          "m_arcane_focus": 3,
          "m_imp_arcane_missiles": 5,
          "m_arcane_concentration": 5,
          "m_magic_attunement": 2,
          "m_frost_warding": 2,
          "m_imp_frostbolt": 5,
          "m_elemental_precision": 3,
          "m_ice_shards": 5,
          "m_frostbite": 3,
          "m_piercing_ice": 3,
          "m_cold_snap": 1,
          "m_imp_blizzard": 3,
          "m_shatter": 5,
          "m_ice_block": 1,
          "m_winters_chill": 2,
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
            "id": "m_arcane_subtlety",
            "name": "奥术微妙",
            "icon": "spell_holy_dispelmagic",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "奥术法术仇恨降低 20%，目标抗性降低 5 点",
              "降低 40%/10 点"
            ]
          },
          {
            "id": "m_arcane_focus",
            "name": "奥术专注",
            "icon": "spell_shadow_teleport",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "奥术法术命中几率提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "m_imp_arcane_missiles",
            "name": "强化奥术飞弹",
            "icon": "spell_nature_starfall",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "施放奥术飞弹受到伤害不被打退几率提高 20%",
              "提高 40%",
              "提高 60%",
              "提高 80%",
              "提高 100%"
            ]
          },
          {
            "id": "m_wand_spec",
            "name": "魔杖专精",
            "icon": "inv_wand_01",
            "row": 2,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "魔杖伤害提高 13%",
              "提高 25%"
            ]
          },
          {
            "id": "m_magic_absorption",
            "name": "魔法吸收",
            "icon": "spell_nature_astralrecalgroup",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "所有抗性提高 2 点，抵抗法术回复法力 1%",
              "提高 4 点/2%",
              "提高 6 点/3%",
              "提高 8 点/4%",
              "提高 10 点/5%"
            ]
          },
          {
            "id": "m_arcane_concentration",
            "name": "节能施法",
            "icon": "spell_shadow_manaburn",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "伤害法术击中后有 2% 几率进入节能状态，下个法术不耗蓝",
              "几率 4%",
              "几率 6%",
              "几率 8%",
              "几率 10%"
            ]
          },
          {
            "id": "m_magic_attunement",
            "name": "魔法协调",
            "icon": "spell_nature_abolishmagic",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "魔法增效和魔法抑制效果提高 25%",
              "提高 50%"
            ]
          },
          {
            "id": "m_imp_arcane_explosion",
            "name": "强化魔爆术",
            "icon": "spell_nature_wispsplode",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "魔爆术暴击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "m_arcane_meditation",
            "name": "奥术冥想",
            "icon": "spell_shadow_siphonmana",
            "row": 4,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "施法时保持 5% 的法力恢复速度",
              "保持 10%",
              "保持 15%"
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
              "激活后使你的下一个施法时间低于 10 秒的法术变为瞬发"
            ]
          },
          {
            "id": "m_arcane_mind",
            "name": "奥术心智",
            "icon": "spell_holy_magicalsentry",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "智力上限提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "m_arcane_instability",
            "name": "奥术动荡",
            "icon": "spell_shadow_sealofkings",
            "row": 6,
            "col": 2,
            "max": 3,
            "prereq": "m_presence_of_mind",
            "ranks": [
              "法术伤害和暴击几率提高 1%",
              "提高 2%",
              "提高 3%"
            ]
          },
          {
            "id": "m_arcane_power",
            "name": "奥术强化",
            "icon": "spell_nature_lightning",
            "row": 6,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "法术伤害提高 30%，但法力消耗提高 30%，持续 15 秒"
            ]
          },
          {
            "id": "m_arcane_blast",
            "name": "奥术冲击",
            "icon": "spell_arcane_blast",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服31点核心】用强力奥术能量冲击目标造成高额伤害，每次施放使下一次奥冲伤害提高 15%，施法时间缩短！"
            ]
          }
        ]
      },
      {
        "id": "fire",
        "name": "火焰",
        "skills": [
          {
            "id": "m_imp_fireball",
            "name": "强化火球术",
            "icon": "spell_fire_flamebolt",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "火球术施法时间缩短 0.1 秒",
              "缩短 0.2 秒",
              "缩短 0.3 秒",
              "缩短 0.4 秒",
              "缩短 0.5 秒"
            ]
          },
          {
            "id": "m_impact",
            "name": "冲击",
            "icon": "spell_fire_soulburn",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "火焰法术有 2% 几率使目标昏迷 2 秒",
              "几率 4%",
              "几率 6%",
              "几率 8%",
              "几率 10%"
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
              "火焰法术暴击后使目标在 4 秒内额外受到 8% 的持续火焰伤害",
              "受到 16%",
              "受到 24%",
              "受到 32%",
              "受到 40%"
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
              "火焰法术射程增加 3 码",
              "增加 6 码"
            ]
          },
          {
            "id": "m_imp_fire_blast",
            "name": "强化火焰冲击",
            "icon": "spell_fire_fireball",
            "row": 2,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "火焰冲击冷却时间缩短 0.5 秒",
              "缩短 1.0 秒",
              "缩短 1.5 秒"
            ]
          },
          {
            "id": "m_incinerate",
            "name": "焚烧",
            "icon": "spell_fire_flameshock",
            "row": 3,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "灼烧和炎爆术致命一击几率提高 2%",
              "提高 4%"
            ]
          },
          {
            "id": "m_pyroblast",
            "name": "炎爆术",
            "icon": "spell_fire_fireball02",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "发射巨大火球造成巨额火焰伤害，并在 12 秒内造成持续燃烧伤害"
            ]
          },
          {
            "id": "m_burning_soul",
            "name": "燃烧之魂",
            "icon": "spell_fire_fire",
            "row": 3,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "火焰法术施法受到伤害打退几率降低 35%，仇恨降低 15%",
              "打退降低 70%，仇恨降低 30%"
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
              "灼烧有 33% 几率使目标承受火焰伤害提高 3%，可叠 5 层",
              "几率 66%",
              "几率 100%"
            ]
          },
          {
            "id": "m_imp_flamestrike",
            "name": "强化烈焰风暴",
            "icon": "spell_fire_selfdestruct",
            "row": 4,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "烈焰风暴致命一击几率提高 5%",
              "提高 10%",
              "提高 15%"
            ]
          },
          {
            "id": "m_master_of_elements",
            "name": "元素大师",
            "icon": "spell_fire_masterofelements",
            "row": 5,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "火焰或冰霜法术暴击后返还 10% 基础法力消耗",
              "返还 20%",
              "返还 30%"
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
              "火焰法术暴击几率提高 2%",
              "提高 4%",
              "提高 6%"
            ]
          },
          {
            "id": "m_blast_wave",
            "name": "冲击波",
            "icon": "spell_holy_excorcism_02",
            "row": 5,
            "col": 3,
            "max": 1,
            "prereq": "m_pyroblast",
            "ranks": [
              "释放烈焰巨浪攻击周围所有敌人造成火焰伤害，并减速 50% 持续 6 秒"
            ]
          },
          {
            "id": "m_fire_power",
            "name": "火焰强化",
            "icon": "spell_fire_immolation",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "火焰法术伤害提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "m_combustion",
            "name": "燃烧",
            "icon": "spell_fire_sealoffire",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "激活后使你的火焰伤害法术暴击几率每次递增 10%，直到产生 3 次暴击"
            ]
          },
          {
            "id": "m_frostfire_bolt",
            "name": "霜火之箭",
            "icon": "spell_frost_frostfirebolt",
            "row": 7,
            "col": 3,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服特色大招】发射冰火交融的飞箭，同时造成冰霜和火焰伤害，享受双重增益加成！"
            ]
          }
        ]
      },
      {
        "id": "frost",
        "name": "冰霜",
        "skills": [
          {
            "id": "m_frost_warding",
            "name": "抗寒结界",
            "icon": "spell_frost_frostward",
            "row": 1,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "防护冰霜结界和火结界吸收量提高 15%，且有 10% 几率反射",
              "提高 30%/20% 几率"
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
              "寒冰箭施法时间缩短 0.1 秒",
              "缩短 0.2 秒",
              "缩短 0.3 秒",
              "缩短 0.4 秒",
              "缩短 0.5 秒"
            ]
          },
          {
            "id": "m_elemental_precision",
            "name": "元素精准",
            "icon": "spell_ice_magicdamage",
            "row": 1,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "冰霜和火焰法术抵抗几率降低 2%，法力消耗降低 1%",
              "降低 4%/2%",
              "降低 6%/3%"
            ]
          },
          {
            "id": "m_ice_shards",
            "name": "寒冰碎片",
            "icon": "spell_frost_iceardor",
            "row": 2,
            "col": 1,
            "max": 5,
            "prereq": null,
            "ranks": [
              "冰霜法术致命一击伤害加成提高 20%",
              "提高 40%",
              "提高 60%",
              "提高 80%",
              "提高 100%"
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
              "冰冷效果有 5% 几率使目标冻结 5 秒",
              "几率 10%",
              "几率 15%"
            ]
          },
          {
            "id": "m_piercing_ice",
            "name": "刺骨寒冰",
            "icon": "spell_frost_frostbolt",
            "row": 3,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "冰霜法术伤害提高 2%",
              "提高 4%",
              "提高 6%"
            ]
          },
          {
            "id": "m_cold_snap",
            "name": "急速冷却",
            "icon": "spell_frost_wizardmark",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "立即结束所有冰霜法术的冷却时间"
            ]
          },
          {
            "id": "m_imp_blizzard",
            "name": "强化暴风雪",
            "icon": "spell_frost_icestorm",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "暴风雪减速效果提高 25%",
              "减速提高 50%",
              "减速提高 65%"
            ]
          },
          {
            "id": "m_shatter",
            "name": "碎冰",
            "icon": "spell_frost_frostshock",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "对被冰冻的目标施放法术致命一击几率提高 10%",
              "提高 20%",
              "提高 30%",
              "提高 40%",
              "提高 50%"
            ]
          },
          {
            "id": "m_ice_block",
            "name": "寒冰屏障",
            "icon": "spell_frost_frost",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "冰箱无敌 10 秒，期间免疫所有物理和法术伤害，但无法移动和施法"
            ]
          },
          {
            "id": "m_frost_channel",
            "name": "寒霜导能",
            "icon": "spell_frost_stun",
            "row": 5,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "冰霜法术法力消耗降低 5%，仇恨降低 4%",
              "降低 10%/7%",
              "降低 15%/10%"
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
              "冰霜伤害有 20% 几率使目标受到的冰霜暴击几率提高 2%，可叠 5 层",
              "几率 40%",
              "几率 60%",
              "几率 80%",
              "几率 100%"
            ]
          },
          {
            "id": "m_ice_barrier",
            "name": "寒冰护体",
            "icon": "spell_ice_lament",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "m_ice_block",
            "ranks": [
              "立即为自己施加冰盾吸收高额伤害，护盾存在期间施法不被打退"
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
        "name": "无限服·戒律苦修神佑 (31/20/0)",
        "desc": "【无限服单体治疗天花板】21点核心大招苦修3段高额爆发急救，能量灌注增幅法强，减伤无敌！",
        "points": {
          "p_unbreakable_will": 5,
          "p_imp_shield": 3,
          "p_imp_fort": 2,
          "p_inner_focus": 1,
          "p_meditation": 3,
          "p_wand_spec": 1,
          "p_mental_agility": 5,
          "p_mental_strength": 5,
          "p_force_will": 4,
          "p_power_infusion": 1,
          "p_penance": 1,
          "p_healing_focus": 2,
          "p_imp_renew": 3,
          "p_holy_spec": 5,
          "p_divine_fury": 5,
          "p_holy_nova": 1,
          "p_holy_reach": 2,
          "p_imp_healing": 2
        }
      },
      {
        "name": "无限服·愈合祷言团补 (14/37/0)",
        "desc": "【无限服团队弹跳团补之王】全新大招愈合祷言智能弹跳全团血崩瞬间稳血，神圣新星群刷无压力！",
        "points": {
          "p_unbreakable_will": 5,
          "p_imp_shield": 3,
          "p_imp_fort": 2,
          "p_inner_focus": 1,
          "p_meditation": 3,
          "p_healing_focus": 2,
          "p_imp_renew": 3,
          "p_holy_spec": 5,
          "p_spell_warding": 5,
          "p_divine_fury": 5,
          "p_holy_nova": 1,
          "p_inspiration": 3,
          "p_holy_reach": 2,
          "p_imp_healing": 3,
          "p_spiritual_guidance": 5,
          "p_spirit_redemption": 1,
          "p_prayer_mending": 1,
          "p_spiritual_healing": 1
        }
      },
      {
        "name": "无限服·暗影心爆灭杀 (13/0/38)",
        "desc": "【无限服暗牧单体巅峰】暗影形态常驻15%暗伤加成，吸血鬼拥抱全团回血，精神鞭笞无限减速！",
        "points": {
          "p_unbreakable_will": 5,
          "p_imp_shield": 3,
          "p_imp_fort": 2,
          "p_inner_focus": 1,
          "p_meditation": 2,
          "p_spirit_tap": 5,
          "p_shadow_affinity": 3,
          "p_imp_swp": 2,
          "p_shadow_focus": 5,
          "p_imp_mb": 5,
          "p_mind_flay": 1,
          "p_shadow_reach": 2,
          "p_shadow_weaving": 5,
          "p_silence": 1,
          "p_vampiric_embrace": 1,
          "p_imp_ve": 2,
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
            "id": "p_unbreakable_will",
            "name": "坚定意志",
            "icon": "spell_magic_magearmor",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "抵抗昏迷、恐惧和沉默几率提高 3%",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "p_wand_spec",
            "name": "魔杖专精",
            "icon": "inv_wand_01",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "魔杖伤害提高 5%",
              "提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%"
            ]
          },
          {
            "id": "p_imp_shield",
            "name": "强化真言术：盾",
            "icon": "spell_holy_powerwordshield",
            "row": 2,
            "col": 2,
            "max": 3,
            "prereq": null,
            "ranks": [
              "真言术：盾吸收量提高 5%",
              "提高 10%",
              "提高 15%"
            ]
          },
          {
            "id": "p_imp_fort",
            "name": "强化真言术：韧",
            "icon": "spell_holy_wordfortitude",
            "row": 2,
            "col": 3,
            "max": 2,
            "prereq": null,
            "ranks": [
              "真言术：韧耐力加成提高 15%",
              "提高 30%"
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
              "激活后使你的下一个法术法力消耗降低 100%，暴击几率提高 25%"
            ]
          },
          {
            "id": "p_meditation",
            "name": "冥想",
            "icon": "spell_nature_sleep",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "施法时保持 5% 的法力恢复速度",
              "保持 10%",
              "保持 15%"
            ]
          },
          {
            "id": "p_mental_agility",
            "name": "精神敏锐",
            "icon": "ability_hibernation",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "瞬发法术法力消耗降低 2%",
              "降低 4%",
              "降低 6%",
              "降低 8%",
              "降低 10%"
            ]
          },
          {
            "id": "p_mental_strength",
            "name": "精神指引",
            "icon": "spell_nature_enchantarmor",
            "row": 5,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "法力值上限提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "p_divine_spirit",
            "name": "神圣之灵",
            "icon": "spell_holy_divinespirit",
            "row": 5,
            "col": 3,
            "max": 1,
            "prereq": "p_meditation",
            "ranks": [
              "为目标施加神圣之灵，使其精神提高 40 点，持续 30 分钟"
            ]
          },
          {
            "id": "p_force_will",
            "name": "意志之力",
            "icon": "spell_nature_slowingtotem",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "法术伤害和暴击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
            ]
          },
          {
            "id": "p_power_infusion",
            "name": "能量灌注",
            "icon": "spell_holy_powerinfusion",
            "row": 6,
            "col": 3,
            "max": 1,
            "prereq": "p_mental_strength",
            "ranks": [
              "注入能量使目标法术伤害和治疗提高 20%，持续 15 秒"
            ]
          },
          {
            "id": "p_penance",
            "name": "苦修",
            "icon": "spell_holy_penance",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服特色大招】向目标射出一道神圣齐射，在 2 秒内对敌人造成 3 段神圣伤害，或为盟友回复巨额生命！"
            ]
          }
        ]
      },
      {
        "id": "holy",
        "name": "神圣",
        "skills": [
          {
            "id": "p_healing_focus",
            "name": "治疗专注",
            "icon": "spell_holy_healingfocus",
            "row": 1,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "治疗法术施法受到伤害打退几率降低 35%",
              "降低 70%"
            ]
          },
          {
            "id": "p_imp_renew",
            "name": "强化恢复",
            "icon": "spell_holy_renew",
            "row": 1,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "恢复治疗量提高 5%",
              "提高 10%",
              "提高 15%"
            ]
          },
          {
            "id": "p_holy_spec",
            "name": "神圣专精",
            "icon": "spell_holy_sealofsalvation",
            "row": 1,
            "col": 4,
            "max": 5,
            "prereq": null,
            "ranks": [
              "神圣法术致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
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
              "受到的所有法术伤害降低 2%",
              "降低 4%",
              "降低 6%",
              "降低 8%",
              "降低 10%"
            ]
          },
          {
            "id": "p_divine_fury",
            "name": "神圣之怒",
            "icon": "spell_holy_sealinggloriouslight",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "惩击、神圣之火、治疗术施法时间缩短 0.1 秒",
              "缩短 0.2 秒",
              "缩短 0.3 秒",
              "缩短 0.4 秒",
              "缩短 0.5 秒"
            ]
          },
          {
            "id": "p_holy_nova",
            "name": "神圣新星",
            "icon": "spell_holy_holynova",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "在施法者周围引起神圣爆炸，对 10 码内敌人造成伤害，并为队友回复生命"
            ]
          },
          {
            "id": "p_inspiration",
            "name": "灵感",
            "icon": "spell_holy_layonhands",
            "row": 3,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "快速治疗、治疗术或强效治疗暴击后使目标护甲值提高 8%，持续 15 秒",
              "提高 16%",
              "提高 25%"
            ]
          },
          {
            "id": "p_holy_reach",
            "name": "神圣延伸",
            "icon": "spell_holy_purifyingaura",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "神圣法术射程增加 10%，神圣新星半径增加 10%",
              "增加 20%/20%"
            ]
          },
          {
            "id": "p_imp_healing",
            "name": "强化治疗术",
            "icon": "spell_holy_heal02",
            "row": 4,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "次级治疗术、治疗术和强效治疗术法力消耗降低 5%",
              "降低 10%",
              "降低 15%"
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
              "死亡后化身救赎之魂，在 10 秒内无需消耗任何法力自由施放治疗法术"
            ]
          },
          {
            "id": "p_spiritual_guidance",
            "name": "精神指引",
            "icon": "spell_holy_spiritualguidence",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "法术治疗和法术伤害提高精神总值的 5%",
              "提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%"
            ]
          },
          {
            "id": "p_spiritual_healing",
            "name": "精神治疗",
            "icon": "spell_nature_moonglow",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "治疗法术效果提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "p_prayer_mending",
            "name": "愈合祷言",
            "icon": "spell_holy_prayerofmendingtga",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "【无限服特色大招】为目标施加愈合祷言，受到伤害时立即回复高额生命并智能弹跳给下一个队友，最多弹跳 5 次！"
            ]
          }
        ]
      },
      {
        "id": "shadow",
        "name": "暗影",
        "skills": [
          {
            "id": "p_spirit_tap",
            "name": "精神分流",
            "icon": "spell_shadow_requiem",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "杀死敌人后精神提高 20%，并在施法时保持 10% 回蓝",
              "提高 40%",
              "提高 60%",
              "提高 80%",
              "提高 100%"
            ]
          },
          {
            "id": "p_blackout",
            "name": "昏厥",
            "icon": "spell_shadow_gathershadows",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "暗影伤害法术击中目标有 2% 几率使其昏迷 3 秒",
              "几率 4%",
              "几率 6%",
              "几率 8%",
              "几率 10%"
            ]
          },
          {
            "id": "p_shadow_affinity",
            "name": "暗影亲和",
            "icon": "spell_shadow_shadowward",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "暗影法术产生的仇恨降低 8%",
              "降低 16%",
              "降低 25%"
            ]
          },
          {
            "id": "p_imp_swp",
            "name": "强化暗言术：痛",
            "icon": "spell_shadow_shadowwordpain",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "暗言术：痛持续时间延长 3 秒",
              "延长 6 秒"
            ]
          },
          {
            "id": "p_shadow_focus",
            "name": "暗影集中",
            "icon": "spell_shadow_burningspirit",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "暗影法术命中几率提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "p_imp_mb",
            "name": "强化心灵震爆",
            "icon": "spell_shadow_unholyfrenzy",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "心灵震爆冷却时间缩短 0.5 秒",
              "缩短 1.0 秒",
              "缩短 1.5 秒",
              "缩短 2.0 秒",
              "缩短 2.5 秒"
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
              "引导暗影能量剥离目标灵魂，造成暗影伤害并降低其移动速度 50%"
            ]
          },
          {
            "id": "p_shadow_reach",
            "name": "暗影延伸",
            "icon": "spell_shadow_chilltouch",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "暗影法术射程增加 10%",
              "增加 20%"
            ]
          },
          {
            "id": "p_shadow_weaving",
            "name": "暗影之波",
            "icon": "spell_shadow_blackplague",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "暗影伤害有 20% 几率使目标承受暗影伤害提高 3%，可叠 5 层",
              "几率 40%",
              "几率 60%",
              "几率 80%",
              "几率 100%"
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
              "使目标沉默 5 秒，阻止施法"
            ]
          },
          {
            "id": "p_vampiric_embrace",
            "name": "吸血鬼的拥抱",
            "icon": "spell_shadow_unsummonbuilding",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "使你的暗影法术伤害的 20% 转化为对小队全员的治疗，持续 1 分钟"
            ]
          },
          {
            "id": "p_imp_ve",
            "name": "强化吸血鬼拥抱",
            "icon": "spell_shadow_improvedvampiricembrace",
            "row": 5,
            "col": 3,
            "max": 2,
            "prereq": "p_vampiric_embrace",
            "ranks": [
              "吸血鬼拥抱转化的治疗百分比提高 5%",
              "提高 10%"
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
              "暗影法术伤害提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
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
              "变身暗影形态暗影伤害提高 15%，受到物理伤害降低 15%"
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
        "name": "无限服·痛苦吸魂斩杀 (31/8/12)",
        "desc": "【无限服单体持续伤害王者】吸魂斩杀低血量伤害翻3倍，暗影掌握增伤10%，夜幕瞬发大暗影箭！",
        "points": {
          "wl_suppression": 3,
          "wl_imp_corruption": 5,
          "wl_imp_life_tap": 2,
          "wl_imp_drain_life": 5,
          "wl_fel_concen": 5,
          "wl_nightfall": 2,
          "wl_grim_reach": 2,
          "wl_siphon_life": 1,
          "wl_shadow_mastery": 5,
          "wl_death_embrace": 1,
          "wl_demonic_embrace": 5,
          "wl_fel_intellect": 3,
          "wl_imp_sb": 5,
          "wl_bane": 5,
          "wl_devastation": 2
        }
      },
      {
        "name": "无限服·恶魔灵魂链接 (7/31/13)",
        "desc": "【无限服PVP与开荒第一肉盾】灵魂链接30%伤害转嫁恶魔宝宝，恶魔统御全属性抗性强化，坚如磐石！",
        "points": {
          "wl_suppression": 2,
          "wl_imp_corruption": 5,
          "wl_demonic_embrace": 5,
          "wl_imp_voidwalker": 3,
          "wl_fel_intellect": 5,
          "wl_fel_domination": 1,
          "wl_fel_stamina": 5,
          "wl_master_summoner": 2,
          "wl_unholy_power": 4,
          "wl_demonic_sacrifice": 1,
          "wl_master_demon": 4,
          "wl_soul_link": 1,
          "wl_imp_sb": 5,
          "wl_bane": 5,
          "wl_devastation": 2,
          "wl_shadowburn": 1
        }
      },
      {
        "name": "无限服·暗毁团本主力 (9/21/21)",
        "desc": "【无限服团队输出绝对主力】毁灭延伸暴击双倍极速爆发，牺牲魅魔提升15%暗影伤害，暗影箭雨！",
        "points": {
          "wl_suppression": 4,
          "wl_imp_corruption": 5,
          "wl_demonic_embrace": 5,
          "wl_imp_voidwalker": 3,
          "wl_fel_intellect": 2,
          "wl_fel_stamina": 5,
          "wl_unholy_power": 5,
          "wl_demonic_sacrifice": 1,
          "wl_imp_sb": 5,
          "wl_bane": 5,
          "wl_devastation": 5,
          "wl_destructive_reach": 2,
          "wl_shadowburn": 1,
          "wl_searing_pain": 2,
          "wl_ruin": 1
        }
      }
    ],
    "trees": [
      {
        "id": "affliction",
        "name": "痛苦",
        "skills": [
          {
            "id": "wl_suppression",
            "name": "镇压",
            "icon": "spell_nature_drowsy",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "痛苦法术命中几率提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
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
              "腐蚀术施法时间缩短 0.4 秒",
              "缩短 0.8 秒",
              "缩短 1.2 秒",
              "缩短 1.6 秒",
              "缩短 2.0 秒（瞬发）"
            ]
          },
          {
            "id": "wl_imp_life_tap",
            "name": "强化生命分流",
            "icon": "spell_shadow_burningspirit",
            "row": 2,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "生命分流获得的法力值提高 10%",
              "提高 20%"
            ]
          },
          {
            "id": "wl_imp_drain_life",
            "name": "强化吸取生命",
            "icon": "spell_shadow_lifedrain02",
            "row": 2,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "吸取生命生命值吸收量提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "wl_fel_concen",
            "name": "恶魔专注",
            "icon": "spell_shadow_fingerofdeath",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "引导吸取生命、吸取法力或吸取灵魂时受到伤害不被打退几率提高 14%",
              "提高 28%",
              "提高 42%",
              "提高 56%",
              "提高 70%"
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
              "激活后使你的下一次痛苦诅咒或末日诅咒伤害提高 50%"
            ]
          },
          {
            "id": "wl_grim_reach",
            "name": "无情延伸",
            "icon": "spell_shadow_callofbone",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "痛苦法术射程增加 10%",
              "增加 20%"
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
              "腐蚀术或吸取生命造成伤害时有 2% 几率使下个暗影箭瞬发",
              "几率 4%"
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
              "每 3 秒将目标的生命值转化为施法者的生命值，持续 30 秒"
            ]
          },
          {
            "id": "wl_curse_exhaustion",
            "name": "疲劳诅咒",
            "icon": "spell_shadow_grimward",
            "row": 5,
            "col": 3,
            "max": 1,
            "prereq": "wl_amplify_curse",
            "ranks": [
              "使目标移动速度降低 10%，持续 12 秒"
            ]
          },
          {
            "id": "wl_shadow_mastery",
            "name": "暗影掌握",
            "icon": "spell_shadow_shadetruesight",
            "row": 6,
            "col": 2,
            "max": 5,
            "prereq": "wl_siphon_life",
            "ranks": [
              "暗影法术造成的伤害和吸取的生命值提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "wl_death_embrace",
            "name": "吸魂斩杀",
            "icon": "spell_shadow_haunting",
            "row": 6,
            "col": 3,
            "max": 3,
            "prereq": null,
            "ranks": [
              "【无限服特色大招】目标生命值低于 25% 时，吸取灵魂造成的伤害提高 100%",
              "提高 200%",
              "提高 300%（3倍斩杀）"
            ]
          },
          {
            "id": "wl_dark_pact",
            "name": "黑暗契约",
            "icon": "spell_shadow_darkritual",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "从恶魔宠物身上抽取法力值转移给术士自身"
            ]
          }
        ]
      },
      {
        "id": "demonology",
        "name": "恶魔学识",
        "skills": [
          {
            "id": "wl_imp_healthstone",
            "name": "强化治疗石",
            "icon": "inv_stone_04",
            "row": 1,
            "col": 2,
            "max": 2,
            "prereq": null,
            "ranks": [
              "治疗石恢复的生命值提高 10%",
              "提高 20%"
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
              "耐力总值提高 3%，精神降低 1%",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "wl_imp_voidwalker",
            "name": "强化虚空行者",
            "icon": "spell_shadow_summonvoidwalker",
            "row": 2,
            "col": 1,
            "max": 3,
            "prereq": null,
            "ranks": [
              "虚空行者的折磨、受难、牺牲和吞噬暗影效果提高 10%",
              "提高 20%",
              "提高 30%"
            ]
          },
          {
            "id": "wl_fel_intellect",
            "name": "恶魔智力",
            "icon": "spell_holy_magicalsentry",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "小鬼、虚空行者、魅魔、地狱猎犬法力上限提高 3%",
              "提高 6%",
              "提高 9%",
              "提高 12%",
              "提高 15%"
            ]
          },
          {
            "id": "wl_fel_domination",
            "name": "恶魔支配",
            "icon": "spell_nature_removecurse",
            "row": 3,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "下一次召唤小鬼、虚空行者、魅魔或地狱猎犬施法时间缩短 5.5 秒，法力减少 50%"
            ]
          },
          {
            "id": "wl_fel_stamina",
            "name": "恶魔耐力",
            "icon": "spell_shadow_antishadow",
            "row": 3,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "恶魔宠物生命上限提高 3%，术士生命上限提高 3%",
              "提高 6%/6%",
              "提高 9%/9%",
              "提高 12%/12%",
              "提高 15%/15%"
            ]
          },
          {
            "id": "wl_master_summoner",
            "name": "召唤大师",
            "icon": "spell_shadow_impsofsummoning",
            "row": 4,
            "col": 2,
            "max": 2,
            "prereq": "wl_fel_domination",
            "ranks": [
              "召唤恶魔施法时间缩短 2 秒，法力减少 20%",
              "缩短 4 秒，法力减少 40%"
            ]
          },
          {
            "id": "wl_unholy_power",
            "name": "邪恶强化",
            "icon": "spell_shadow_shadowworddominate",
            "row": 4,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "恶魔宠物的近战攻击伤害提高 4%",
              "提高 8%",
              "提高 12%",
              "提高 16%",
              "提高 20%"
            ]
          },
          {
            "id": "wl_demonic_sacrifice",
            "name": "恶魔牺牲",
            "icon": "spell_shadow_psychicscream",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": null,
            "ranks": [
              "牺牲恶魔宠物获得专属强力 Buff：牺牲魅魔暗影伤害+15%，牺牲小鬼火焰伤害+15%"
            ]
          },
          {
            "id": "wl_master_demon",
            "name": "恶魔统御",
            "icon": "spell_shadow_shadowpact",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "携带恶魔宠物时获得常驻防御属性强化",
              "加成提高",
              "加成提高",
              "加成提高",
              "全属性与抗性大幅度提高"
            ]
          },
          {
            "id": "wl_soul_link",
            "name": "灵魂链接",
            "icon": "spell_shadow_gathershadows",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "wl_demonic_sacrifice",
            "ranks": [
              "激活后术士所受伤害的 30% 由恶魔宠物分担，且双方造成的伤害提高 3%"
            ]
          }
        ]
      },
      {
        "id": "destruction",
        "name": "毁灭",
        "skills": [
          {
            "id": "wl_imp_sb",
            "name": "强化暗影箭",
            "icon": "spell_shadow_shadowbolt",
            "row": 1,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "暗影箭暴击使目标受到的下 4 次暗影伤害提高 4%",
              "提高 8%",
              "提高 12%",
              "提高 16%",
              "提高 20%"
            ]
          },
          {
            "id": "wl_cataclysm",
            "name": "灾变",
            "icon": "spell_fire_windfire",
            "row": 1,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "毁灭法术法力消耗降低 1%",
              "降低 2%",
              "降低 3%",
              "降低 4%",
              "降低 5%"
            ]
          },
          {
            "id": "wl_bane",
            "name": "灾祸",
            "icon": "spell_shadow_deathpact",
            "row": 2,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "暗影箭和献祭施法时间缩短 0.1 秒，灵魂之火缩短 0.4 秒",
              "缩短 0.2s/0.8s",
              "缩短 0.3s/1.2s",
              "缩短 0.4s/1.6s",
              "缩短 0.5s/2.0s"
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
              "毁灭法术命中后有 2% 几率使目标眩晕 5 秒",
              "几率 4%",
              "几率 6%",
              "几率 8%",
              "几率 10%"
            ]
          },
          {
            "id": "wl_devastation",
            "name": "破坏",
            "icon": "spell_fire_flameshock",
            "row": 3,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "毁灭法术致命一击几率提高 1%",
              "提高 2%",
              "提高 3%",
              "提高 4%",
              "提高 5%"
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
              "瞬发暗影法术造成高额暗影伤害，消耗 1 块灵魂碎片"
            ]
          },
          {
            "id": "wl_destructive_reach",
            "name": "毁灭延伸",
            "icon": "spell_shadow_corpseexplode",
            "row": 4,
            "col": 1,
            "max": 2,
            "prereq": null,
            "ranks": [
              "毁灭法术射程增加 10%，仇恨降低 5%",
              "增加 20%，仇恨降低 10%"
            ]
          },
          {
            "id": "wl_searing_pain",
            "name": "强化灼热之痛",
            "icon": "spell_fire_soulburn",
            "row": 4,
            "col": 2,
            "max": 5,
            "prereq": null,
            "ranks": [
              "灼热之痛致命一击几率提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "wl_ruin",
            "name": "毁灭",
            "icon": "spell_shadow_shadowworddominate",
            "row": 5,
            "col": 2,
            "max": 1,
            "prereq": "wl_devastation",
            "ranks": [
              "毁灭法术致命一击伤害加成提高 100%"
            ]
          },
          {
            "id": "wl_imp_immolate",
            "name": "强化献祭",
            "icon": "spell_fire_immolation",
            "row": 5,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "献祭初始伤害提高 5%",
              "提高 10%",
              "提高 15%",
              "提高 20%",
              "提高 25%"
            ]
          },
          {
            "id": "wl_emberstorm",
            "name": "灰烬风暴",
            "icon": "spell_fire_selfdestruct",
            "row": 6,
            "col": 3,
            "max": 5,
            "prereq": null,
            "ranks": [
              "火焰法术伤害提高 2%",
              "提高 4%",
              "提高 6%",
              "提高 8%",
              "提高 10%"
            ]
          },
          {
            "id": "wl_conflagrate",
            "name": "点燃",
            "icon": "spell_fire_fireball",
            "row": 7,
            "col": 2,
            "max": 1,
            "prereq": "wl_imp_immolate",
            "ranks": [
              "引爆目标身上的献祭效果，立即造成高额火焰伤害"
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
