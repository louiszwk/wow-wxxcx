/**
 * scripts/build_infinite_latest_talents.js
 * 对应《魔兽世界：无限》（World of Warcraft: Forever 2026最新独立产品线）
 * 包含：潜行者（毁伤/猛毒/蓄势待发）、战士（刺矛打击/战备冲锋）、圣骑士（圣印舞/圣光守望）、
 * 萨满祭司（漩涡武器/先知之怒/激流/雷霆过载）、猎人（近战撕裂生存猎/独来独往/召唤雄鹰）、
 * 德鲁伊（日月之蚀/狂暴/野性成长）、法师（奥术冲击/霜火之箭）、牧师（苦修/愈合祷言）、
 * 术士（吸魂斩杀）
 * 全部暴雪官方Zamimg高清图标、严密前置条件、51点权威主流加点方案
 */

const fs = require('fs');
const path = require('path');

const TALENT_DATA_60 = {
  // ==========================================
  // 1. 潜行者 (Rogue) - 刺杀、战斗、敏锐 (无限服最新版)
  // ==========================================
  rogue: {
    name: '潜行者',
    icon: '🗡️',
    classIcon: 'class_rogue',
    presets: [
      {
        name: '无限服·双匕首毁伤 (31/8/12)',
        desc: '无限服全新刺杀标杆！31点终极绝技【毁伤】双匕首重击，猛毒提供AP增伤，暴击封印命运连击秒怪',
        points: {
          r_malice: 5, r_ruthlessness: 3, r_puncturing: 3, r_rel_strikes: 1, r_lethality: 5,
          r_venom: 2, r_imp_poisons: 5, r_cold_blood: 1, r_seal_fate: 5, r_mutilate: 1,
          r_imp_gouge: 3, r_imp_ss: 2, r_deflection: 3,
          r_opportunity: 5, r_camouflage: 5, r_initiative: 2
        }
      },
      {
        name: '无限服·战斗还击剑贼 (19/32/0)',
        desc: '无限服野外开荒与团本持续输出王牌！招架后【还击】缴械抗怪 + 剑刃乱舞清场 + 冲动极速回能',
        points: {
          r_malice: 5, r_ruthlessness: 3, r_imp_snd: 3, r_rel_strikes: 1, r_lethality: 5, r_imp_poisons: 2,
          r_imp_ss: 2, r_lightning_ref: 3, r_deflection: 5, r_precision: 5, r_riposte: 1, r_blade_flurry: 1,
          r_dw_spec: 5, r_sword_spec: 5, r_weapon_exp: 2, r_aggression: 2, r_adrenaline_rush: 1
        }
      },
      {
        name: '无限服·封印出血敏锐 (21/3/27)',
        desc: '无限服野外单挑与战场胜率之神！蓄势待发起手节能，冷血+伺机待发双消失双闪避，出血高效控能',
        points: {
          r_malice: 5, r_ruthlessness: 3, r_imp_snd: 2, r_rel_strikes: 1, r_lethality: 5, r_poised: 2, r_cold_blood: 1, r_imp_poisons: 2,
          r_imp_ss: 2, r_lightning_ref: 1,
          r_mod: 5, r_opportunity: 5, r_initiative: 3, r_ghostly: 1, r_imp_sap: 3, r_serrated_blades: 3,
          r_hemo: 1, r_prep: 1, r_dirty_deeds: 2, r_deadliness: 3
        }
      }
    ],
    trees: [
      {
        id: 'assassination',
        name: '刺杀',
        skills: [
          { id: 'r_imp_evisc', name: '强化剔骨', icon: 'ability_rogue_eviscerate', row: 1, col: 1, max: 3, prereq: null, ranks: ['使你的剔骨技能造成的伤害提高 5%', '提高 10%', '提高 15%'] },
          { id: 'r_malice', name: '恶意', icon: 'ability_racial_bloodrage', row: 1, col: 2, max: 5, prereq: null, ranks: ['致命一击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'r_murder', name: '谋杀', icon: 'spell_shadow_deathscream', row: 1, col: 3, max: 2, prereq: null, ranks: ['对人形生物、巨人、野兽和龙类造成的伤害提高 1%', '提高 2%'] },
          { id: 'r_puncturing', name: '穿刺之伤', icon: 'ability_backstab', row: 2, col: 1, max: 3, prereq: null, ranks: ['背刺暴击几率提高 10%，伏击暴击几率提高 15%', '提高 20%/30%', '提高 30%/45%'] },
          { id: 'r_ruthlessness', name: '无情', icon: 'ability_druid_disembowel', row: 2, col: 2, max: 3, prereq: null, ranks: ['终结技有 20% 几率增加一个连击点', '几率 40%', '几率 60%'] },
          { id: 'r_imp_snd', name: '强化切割', icon: 'ability_rogue_slicedice', row: 2, col: 3, max: 3, prereq: null, ranks: ['切割技能持续时间延长 15%', '延长 30%', '延长 45%'] },
          { id: 'r_rel_strikes', name: '无情打击', icon: 'ability_warrior_decisivestrike', row: 3, col: 1, max: 1, prereq: null, ranks: ['终结技每消耗一个连击点，就有 20% 几率恢复 25 点能量'] },
          { id: 'r_lethality', name: '致命偷袭', icon: 'ability_criticalstrike', row: 3, col: 2, max: 5, prereq: 'r_malice', ranks: ['邪恶攻击、背刺、伏击、出血暴击伤害加成提高 6%', '提高 12%', '提高 18%', '提高 24%', '提高 30%'] },
          { id: 'r_venom', name: '猛毒', icon: 'ability_creature_poison_06', row: 3, col: 3, max: 2, prereq: null, ranks: ['【无限服特色】毒药伤害额外获得 15% 攻击强度加成，上毒几率提高 3%', '伤害额外获得 30% 攻击强度加成，上毒几率提高 6%'] },
          { id: 'r_imp_poisons', name: '强化毒药', icon: 'ability_poisons', row: 4, col: 2, max: 5, prereq: null, ranks: ['毒药对目标生效的几率提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'r_poised', name: '蓄势待发', icon: 'ability_rogue_feigndeath', row: 4, col: 3, max: 2, prereq: null, ranks: ['【无限服特色】脱战且能量全满时，起手首个技能消耗减少 5 点能量', '起手首个技能消耗减少 10 点能量'] },
          { id: 'r_cold_blood', name: '冷血', icon: 'spell_ice_lament', row: 5, col: 2, max: 1, prereq: null, ranks: ['激活后，你的下一次攻击技能（毁伤、背刺、剔骨等）必定暴击'] },
          { id: 'r_vile_poisons', name: '剧毒', icon: 'ability_rogue_feigndeath', row: 5, col: 3, max: 5, prereq: null, ranks: ['毒药伤害提高 4%，抵抗驱散几率提高 8%', '提高 8%/16%', '提高 12%/24%', '提高 16%/32%', '提高 20%/40%'] },
          { id: 'r_seal_fate', name: '封印命运', icon: 'spell_shadow_chilltouch', row: 6, col: 2, max: 5, prereq: 'r_cold_blood', ranks: ['增加连击点的技能暴击时，有 20% 几率额外增加一个连击点', '几率 40%', '几率 60%', '几率 80%', '必定额外增加一个连击点'] },
          { id: 'r_mutilate', name: '毁伤', icon: 'ability_rogue_shadowstrikes', row: 7, col: 2, max: 1, prereq: 'r_seal_fate', ranks: ['【无限服31点终极绝技】瞬发消耗 60 能量。使用两把武器同时攻击目标，造成武器伤害并附加额外物理伤害。若目标处于中毒状态伤害提高 50%。奖励 2 个连击点数（需装备双匕首）。'] }
        ]
      },
      {
        id: 'combat',
        name: '战斗',
        skills: [
          { id: 'r_imp_gouge', name: '强化凿击', icon: 'ability_gouge', row: 1, col: 1, max: 3, prereq: null, ranks: ['凿击瘫痪时间延长 0.5 秒', '延长 1.0 秒', '延长 1.5 秒'] },
          { id: 'r_imp_ss', name: '强化邪恶攻击', icon: 'spell_shadow_ritualofsacrifice', row: 1, col: 2, max: 2, prereq: null, ranks: ['邪恶攻击能量消耗减少 3 点', '减少 5 点'] },
          { id: 'r_lightning_ref', name: '闪电反射', icon: 'spell_nature_invisibilty', row: 1, col: 3, max: 5, prereq: null, ranks: ['闪避几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'r_deflection', name: '偏斜', icon: 'ability_parry', row: 2, col: 2, max: 5, prereq: null, ranks: ['招架几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'r_precision', name: '精确', icon: 'ability_marksmanship', row: 2, col: 3, max: 5, prereq: null, ranks: ['近战命中率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'r_endurance', name: '耐久', icon: 'spell_shadow_shadowward', row: 3, col: 1, max: 2, prereq: null, ranks: ['疾跑和闪避冷却缩短 45 秒', '缩短 90 秒'] },
          { id: 'r_riposte', name: '还击', icon: 'ability_warrior_challange', row: 3, col: 2, max: 1, prereq: 'r_deflection', ranks: ['【开荒神技】招架后激活，造成 150% 武器伤害并缴械目标 6 秒'] },
          { id: 'r_imp_sprint', name: '强化疾跑', icon: 'ability_rogue_sprint', row: 3, col: 4, max: 2, prereq: null, ranks: ['疾跑有 50% 几率解除移动限制', '100% 几率解除移动限制'] },
          { id: 'r_imp_kick', name: '强化脚踢', icon: 'ability_kick', row: 4, col: 1, max: 2, prereq: null, ranks: ['脚踢有 50% 几率沉默目标 2 秒', '100% 几率沉默目标 2 秒'] },
          { id: 'r_blade_flurry', name: '剑刃乱舞', icon: 'ability_warrior_punishingblow', row: 4, col: 2, max: 1, prereq: null, ranks: ['攻速提高 20%，且每次攻击额外打击附近一个目标，持续 15 秒'] },
          { id: 'r_dagger_spec', name: '匕首专精', icon: 'ability_shockwave', row: 4, col: 3, max: 5, prereq: null, ranks: ['匕首暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'r_dw_spec', name: '双武器专精', icon: 'ability_dualwield', row: 5, col: 1, max: 5, prereq: null, ranks: ['副手武器造成的伤害提高 10%', '提高 20%', '提高 30%', '提高 40%', '提高 50%'] },
          { id: 'r_sword_spec', name: '剑类武器专精', icon: 'inv_sword_27', row: 5, col: 2, max: 5, prereq: null, ranks: ['用剑击中目标有 1% 几率获得一次额外攻击机会', '几率 2%', '几率 3%', '几率 4%', '几率 5%'] },
          { id: 'r_fist_spec', name: '拳套专精', icon: 'inv_gauntlets_04', row: 5, col: 3, max: 5, prereq: null, ranks: ['拳套暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'r_mace_spec', name: '锤类武器专精', icon: 'inv_mace_01', row: 5, col: 4, max: 5, prereq: null, ranks: ['锤类武器技能提高 1 点，并有 1% 几率昏迷 3 秒', '提高 2 点/2%', '提高 3 点/3%', '提高 4 点/4%', '提高 5 点/6%'] },
          { id: 'r_weapon_exp', name: '武器大师', icon: 'ability_bladeblaster', row: 6, col: 2, max: 2, prereq: null, ranks: ['单手剑、匕首和拳套武器技能提高 3 点', '提高 5 点'] },
          { id: 'r_aggression', name: '侵略', icon: 'ability_racial_avatar', row: 6, col: 3, max: 3, prereq: null, ranks: ['邪恶攻击和剔骨伤害提高 2%', '提高 4%', '提高 6%'] },
          { id: 'r_adrenaline_rush', name: '冲动', icon: 'spell_shadow_shadowworddominate', row: 7, col: 2, max: 1, prereq: null, ranks: ['能量恢复速度提高 100%，持续 15 秒'] }
        ]
      },
      {
        id: 'subtlety',
        name: '敏锐',
        skills: [
          { id: 'r_mod', name: '欺诈大师', icon: 'spell_shadow_charm', row: 1, col: 2, max: 5, prereq: null, ranks: ['潜行状态下降低敌人发现几率（相当于等级+1）', '等级+2', '等级+3', '等级+4', '等级+5'] },
          { id: 'r_opportunity', name: '伺机而动', icon: 'ability_warrior_warcry', row: 1, col: 3, max: 5, prereq: null, ranks: ['从背后使用背刺、绞喉或伏击伤害提高 4%', '提高 8%', '提高 12%', '提高 16%', '提高 20%'] },
          { id: 'r_sleight', name: '诡计', icon: 'ability_rogue_feint', row: 2, col: 1, max: 2, prereq: null, ranks: ['佯攻仇恨减少量提高 10%，受暴击几率降低 1%', '提高 20%/2%'] },
          { id: 'r_camouflage', name: '伪装', icon: 'ability_stealth', row: 2, col: 2, max: 5, prereq: null, ranks: ['潜行移速提高 3%，潜行冷却缩短 1 秒', '提高 6%/2s', '提高 9%/3s', '提高 12%/4s', '提高 15%/5s'] },
          { id: 'r_initiative', name: '先发制人', icon: 'spell_shadow_fumble', row: 2, col: 3, max: 3, prereq: null, ranks: ['伏击、绞喉或偷袭有 25% 几率额外增加一个连击点', '几率 50%', '几率 75%'] },
          { id: 'r_imp_ambush', name: '强化伏击', icon: 'ability_rogue_ambush', row: 2, col: 4, max: 3, prereq: null, ranks: ['伏击暴击几率提高 15%', '提高 30%', '提高 45%'] },
          { id: 'r_ghostly', name: '鬼魅攻击', icon: 'spell_shadow_curse', row: 3, col: 1, max: 1, prereq: null, ranks: ['造成 125% 武器伤害，并在 7 秒内闪避几率提高 15%，获得 1 个连击点'] },
          { id: 'r_imp_sap', name: '强化闷棍', icon: 'ability_sap', row: 3, col: 2, max: 3, prereq: null, ranks: ['闷棍后有 30% 几率不脱离潜行', '几率 60%', '几率 90%'] },
          { id: 'r_serrated_blades', name: '锯齿利刃', icon: 'inv_sword_33', row: 3, col: 3, max: 3, prereq: null, ranks: ['无视目标 100 点护甲，割裂伤害提高 10%', '无视 200 点/20%', '无视 300 点/30%'] },
          { id: 'r_setup', name: '调整', icon: 'spell_nature_mirrorimage', row: 4, col: 1, max: 3, prereq: null, ranks: ['成功闪避或招架攻击后有 15% 几率获得一个连击点', '几率 30%', '几率 45%'] },
          { id: 'r_elusiveness', name: '飘忽不定', icon: 'spell_magic_lesserinvisibilty', row: 4, col: 2, max: 2, prereq: null, ranks: ['消失和致盲冷却缩短 45 秒', '缩短 90 秒'] },
          { id: 'r_hemo', name: '出血', icon: 'spell_shadow_lifedrain', row: 4, col: 3, max: 1, prereq: 'r_serrated_blades', ranks: ['造成武器伤害并使目标承受物理伤害提高最多 3 点，持续 30 次充能'] },
          { id: 'r_prep', name: '伺机待发', icon: 'spell_shadow_antishadow', row: 5, col: 2, max: 1, prereq: null, ranks: ['激活后立即结束闪避、疾跑、消失、冷血、暗影步的冷却时间'] },
          { id: 'r_dirty_deeds', name: '卑鄙', icon: 'spell_shadow_summonsuccubus', row: 5, col: 3, max: 2, prereq: null, ranks: ['偷袭和绞喉能量消耗减少 10 点', '减少 20 点'] },
          { id: 'r_deadliness', name: '致命', icon: 'inv_weapon_crossbow_11', row: 6, col: 3, max: 5, prereq: null, ranks: ['攻击强度提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] }
        ]
      }
    ]
  },

  // ==========================================
  // 2. 战士 (Warrior) - 武器、狂怒、防护 (无限服最新版)
  // ==========================================
  warrior: {
    name: '战士',
    icon: '⚔️',
    classIcon: 'class_warrior',
    presets: [
      {
        name: '无限服·刺矛武器战 (31/20/0)',
        desc: '无限服特色武器大招！第4行新增【刺矛打击】克制龙类/巨人/骑乘强击下马 + 致死打击减疗50%',
        points: {
          w_imp_rend: 3, w_deflection: 2, w_tactical_mastery: 5, w_anger_mgmt: 1, w_deep_wounds: 3, w_imp_overpower: 2,
          w_impale: 2, w_impaling_strike: 1, w_two_hand_spec: 4, w_axe_spec: 5, w_sweeping_strikes: 1, w_mortal_strike: 1, w_imp_hs: 1,
          w_cruelty: 5, w_imp_demo: 5, w_imp_shout: 5, w_enrage: 5
        }
      },
      {
        name: '无限服·双持狂暴战 (17/34/0)',
        desc: '无限服近战物理输出天花板！乱舞极速平砍 + 嗜血瞬间高伤爆发 + 死亡之愿伤害加深',
        points: {
          w_imp_rend: 3, w_deflection: 2, w_tactical_mastery: 5, w_anger_mgmt: 1, w_deep_wounds: 3, w_impale: 2, w_two_hand_spec: 1,
          w_cruelty: 5, w_unbridled_wrath: 5, w_imp_cleave: 3, w_piercing_howl: 1, w_imp_shout: 4, w_imp_execute: 2, w_enrage: 5, w_flurry: 5, w_death_wish: 1, w_dw_spec: 2, w_bloodthirst: 1
        }
      },
      {
        name: '无限服·战备防战 (11/5/35)',
        desc: '无限服抗怪主力神坦！【战备冲锋】允许在防御姿态直接冲锋开怪，破釜沉舟保命，盾牌猛击高仇恨',
        points: {
          w_deflection: 5, w_tactical_mastery: 5, w_anger_mgmt: 1,
          w_cruelty: 5,
          w_shield_spec: 5, w_anticipation: 5, w_toughness: 5, w_def_charge: 1, w_imp_bloodrage: 1, w_last_stand: 1,
          w_imp_sunder: 3, w_imp_taunt: 2, w_imp_block: 2, w_defiance: 5, w_concussion_blow: 1,
          w_one_hand_spec: 3, w_shield_slam: 1
        }
      }
    ],
    trees: [
      {
        id: 'arms',
        name: '武器',
        skills: [
          { id: 'w_imp_hs', name: '强化英勇打击', icon: 'ability_rogue_ambush', row: 1, col: 1, max: 3, prereq: null, ranks: ['怒气消耗减少 1 点', '减少 2 点', '减少 3 点'] },
          { id: 'w_deflection', name: '偏斜', icon: 'ability_parry', row: 1, col: 2, max: 5, prereq: null, ranks: ['招架几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'w_imp_rend', name: '强化撕裂', icon: 'ability_gouge', row: 1, col: 3, max: 3, prereq: null, ranks: ['撕裂流血伤害提高 15%', '提高 25%', '提高 35%'] },
          { id: 'w_imp_charge', name: '强化冲锋', icon: 'ability_warrior_charge', row: 2, col: 1, max: 2, prereq: null, ranks: ['冲锋获得的怒气提高 3 点', '提高 6 点'] },
          { id: 'w_tactical_mastery', name: '战术掌握', icon: 'spell_nature_enchantarmor', row: 2, col: 2, max: 5, prereq: null, ranks: ['切换姿态保留 5 点怒气', '保留 10 点', '保留 15 点', '保留 20 点', '保留 25 点'] },
          { id: 'w_imp_thunder', name: '强化雷霆一击', icon: 'spell_nature_thunderclap', row: 2, col: 3, max: 3, prereq: null, ranks: ['雷霆一击怒气消耗减少 1 点', '减少 2 点', '减少 4 点'] },
          { id: 'w_imp_overpower', name: '强化压制', icon: 'ability_meleedamage', row: 3, col: 1, max: 2, prereq: null, ranks: ['压制暴击几率提高 25%', '提高 50%'] },
          { id: 'w_anger_mgmt', name: '愤怒掌控', icon: 'spell_holy_blessingofstamina', row: 3, col: 2, max: 1, prereq: 'w_tactical_mastery', ranks: ['战斗外怒气衰减速度减缓，战斗中每 3 秒产生 1 点怒气'] },
          { id: 'w_deep_wounds', name: '重伤', icon: 'ability_backstab', row: 3, col: 3, max: 3, prereq: null, ranks: ['暴击后使敌人流血，12秒内造成武器平均伤害的 20%', '造成 40%', '造成 60%'] },
          { id: 'w_impaling_strike', name: '刺矛打击', icon: 'ability_warrior_punishingblow', row: 4, col: 1, max: 1, prereq: null, ranks: ['【无限服第4行新技能】造成 40% 武器伤害，对龙类、巨人和坐骑目标额外造成 80% 伤害，并强制将目标击落坐骑'] },
          { id: 'w_two_hand_spec', name: '双手武器专精', icon: 'inv_sword_23', row: 4, col: 2, max: 5, prereq: null, ranks: ['双手近战武器伤害提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'w_impale', name: '穿刺', icon: 'ability_searingarrow', row: 4, col: 3, max: 2, prereq: 'w_deep_wounds', ranks: ['所有技能暴击伤害加成提高 10%', '提高 20%'] },
          { id: 'w_axe_spec', name: '斧类武器专精', icon: 'inv_axe_06', row: 5, col: 1, max: 5, prereq: null, ranks: ['装备斧类暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'w_sweeping_strikes', name: '横扫攻击', icon: 'ability_rogue_slicedice', row: 6, col: 2, max: 1, prereq: null, ranks: ['下 5 次近战攻击会额外打击附近一名额外目标'] },
          { id: 'w_mortal_strike', name: '致死打击', icon: 'ability_warrior_savageblow', row: 7, col: 2, max: 1, prereq: 'w_sweeping_strikes', ranks: ['造成武器伤害+85，并使目标受到的治疗效果降低 50%，持续 10 秒'] }
        ]
      },
      {
        id: 'fury',
        name: '狂怒',
        skills: [
          { id: 'w_booming_voice', name: '震耳嗓音', icon: 'spell_nature_purge', row: 1, col: 2, max: 5, prereq: null, ranks: ['战斗怒吼和挫志怒吼范围和持续时间提高 10%', '提高 20%', '提高 30%', '提高 40%', '提高 50%'] },
          { id: 'w_cruelty', name: '残忍', icon: 'ability_rogue_eviscerate', row: 1, col: 3, max: 5, prereq: null, ranks: ['近战武器暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'w_imp_demo', name: '强化挫志怒吼', icon: 'ability_warrior_warcry', row: 2, col: 2, max: 5, prereq: null, ranks: ['挫志怒吼降低近战强度效果提高 8%', '提高 16%', '提高 24%', '提高 32%', '提高 40%'] },
          { id: 'w_unbridled_wrath', name: '怒不可遏', icon: 'spell_nature_stoneclawtotem', row: 2, col: 3, max: 5, prereq: null, ranks: ['近战命中目标有 8% 几率产生 1 点额外怒气', '几率 16%', '几率 24%', '几率 32%', '几率 40%'] },
          { id: 'w_imp_cleave', name: '强化顺劈斩', icon: 'ability_warrior_cleave', row: 3, col: 1, max: 3, prereq: null, ranks: ['顺劈斩附加伤害提高 40%', '提高 80%', '提高 120%'] },
          { id: 'w_piercing_howl', name: '刺耳怒吼', icon: 'spell_shadow_deathscream', row: 3, col: 2, max: 1, prereq: null, ranks: ['使周围 10 码内所有敌人减速 50%，持续 6 秒'] },
          { id: 'w_imp_shout', name: '强化战斗怒吼', icon: 'ability_warrior_battleshout', row: 3, col: 4, max: 5, prereq: null, ranks: ['战斗怒吼攻击强度加成提高 5%', '提高 10%', '提高 15%', '提高 20%', '提高 25%'] },
          { id: 'w_dw_spec', name: '双武器专精', icon: 'ability_dualwield', row: 4, col: 1, max: 5, prereq: null, ranks: ['副手武器伤害提高 5%', '提高 10%', '提高 15%', '提高 20%', '提高 25%'] },
          { id: 'w_imp_execute', name: '强化斩杀', icon: 'inv_sword_48', row: 4, col: 2, max: 2, prereq: null, ranks: ['斩杀怒气消耗减少 2 点', '减少 5 点'] },
          { id: 'w_enrage', name: '激怒', icon: 'spell_shadow_unholyfrenzy', row: 4, col: 3, max: 5, prereq: null, ranks: ['遭受致命一击后造成近战伤害提高 5%', '提高 10%', '提高 15%', '提高 20%', '提高 25%'] },
          { id: 'w_flurry', name: '乱舞', icon: 'ability_ghoulfrenzy', row: 5, col: 2, max: 5, prereq: 'w_enrage', ranks: ['暴击后下 3 次攻击速度提高 10%', '提高 15%', '提高 20%', '提高 25%', '提高 30%'] },
          { id: 'w_death_wish', name: '死亡之愿', icon: 'spell_shadow_deathpact', row: 6, col: 2, max: 1, prereq: null, ranks: ['免疫恐惧，物理伤害提高 20%，但护甲和抗性降低 20%，持续 30 秒'] },
          { id: 'w_bloodthirst', name: '嗜血', icon: 'spell_nature_bloodlust', row: 7, col: 2, max: 1, prereq: null, ranks: ['立即造成基于 45% 攻强的物理伤害，并使下5次攻击命中时回复生命值'] }
        ]
      },
      {
        id: 'protection',
        name: '防护',
        skills: [
          { id: 'w_shield_spec', name: '盾牌专精', icon: 'inv_shield_06', row: 1, col: 2, max: 5, prereq: null, ranks: ['格挡几率提高 1%，成功格挡产生 1 点怒气', '格挡提高 2%', '格挡提高 3%', '格挡提高 4%', '格挡提高 5%'] },
          { id: 'w_anticipation', name: '预知', icon: 'spell_nature_mirrorimage', row: 1, col: 3, max: 5, prereq: null, ranks: ['防御技能提高 2 点', '提高 4 点', '提高 6 点', '提高 8 点', '提高 10 点'] },
          { id: 'w_def_charge', name: '战备冲锋', icon: 'ability_warrior_charge', row: 2, col: 1, max: 1, prereq: null, ranks: ['【无限服特色】允许在防御姿态下直接使用冲锋技能，并在战斗中保留冲锋产生的额外怒气'] },
          { id: 'w_toughness', name: '坚韧', icon: 'spell_holy_devotionaura', row: 2, col: 2, max: 5, prereq: null, ranks: ['装备护甲值提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'w_imp_bloodrage', name: '强化血性狂暴', icon: 'ability_racial_bloodrage', row: 2, col: 3, max: 2, prereq: null, ranks: ['血性狂暴立即产生的怒气提高 2 点', '提高 5 点'] },
          { id: 'w_last_stand', name: '破釜沉舟', icon: 'spell_holy_ashestoashes', row: 3, col: 2, max: 1, prereq: null, ranks: ['临时提高生命上限 30%，持续 20 秒'] },
          { id: 'w_imp_sunder', name: '强化破甲', icon: 'ability_warrior_sunder', row: 3, col: 1, max: 3, prereq: null, ranks: ['破甲攻击怒气消耗减少 1 点', '减少 2 点', '减少 3 点'] },
          { id: 'w_imp_taunt', name: '强化嘲讽', icon: 'spell_nature_reincarnation', row: 3, col: 3, max: 2, prereq: null, ranks: ['嘲讽冷却缩短 1 秒', '冷却缩短 2 秒'] },
          { id: 'w_imp_block', name: '强化盾牌格挡', icon: 'ability_defend', row: 4, col: 2, max: 2, prereq: 'w_shield_spec', ranks: ['盾牌格挡额外阻挡一次攻击，持续延长 1 秒', '额外阻挡两次，持续延长 2 秒'] },
          { id: 'w_defiance', name: '挑衅', icon: 'ability_bullrush', row: 4, col: 3, max: 5, prereq: null, ranks: ['防御姿态下造成的仇恨值提高 3%', '提高 6%', '提高 9%', '提高 12%', '提高 15%'] },
          { id: 'w_concussion_blow', name: '震荡猛击', icon: 'ability_thunderbolt', row: 5, col: 3, max: 1, prereq: null, ranks: ['击晕目标 5 秒，造成少量仇恨'] },
          { id: 'w_one_hand_spec', name: '单手武器专精', icon: 'inv_sword_20', row: 6, col: 3, max: 5, prereq: null, ranks: ['单手近战武器造成的物理伤害提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'w_shield_slam', name: '盾牌猛击', icon: 'inv_shield_05', row: 7, col: 2, max: 1, prereq: 'w_concussion_blow', ranks: ['用盾牌痛击目标造成高额仇恨，并有 50% 几率驱散目标 1 个魔法效果'] }
        ]
      }
    ]
  },

  // ==========================================
  // 3. 圣骑士 (Paladin) - 神圣、防护、惩戒 (无限服最新版)
  // ==========================================
  paladin: {
    name: '圣骑士',
    icon: '🛡️',
    classIcon: 'class_paladin',
    presets: [
      {
        name: '无限服·圣印舞惩戒骑 (11/0/40)',
        desc: '无限服核心明星流派！点出【圣印舞】自动继承上个圣印判定无需卡读条，命令圣印高暴击爆发融化目标',
        points: {
          pal_spiritual_focus: 5, pal_imp_sor: 5, pal_consecration: 1,
          pal_imp_bos: 5, pal_benediction: 5, pal_imp_judgement: 2, pal_deflection: 5,
          pal_conviction: 5, pal_seal_command: 1, pal_pursuit_justice: 2, pal_eye_for_eye: 2,
          pal_twohand_spec: 3, pal_sanctity_aura: 1, pal_seal_twisting: 1, pal_vengeance: 5, pal_repentance: 1, pal_imp_ret_aura: 2
        }
      },
      {
        name: '无限服·守望奶骑团刷 (31/20/0)',
        desc: '无限服全新大招【圣光守望】神圣震击无CD群加，启示暴击100%返还法力，王者祝福团队必备',
        points: {
          pal_spiritual_focus: 5, pal_imp_sor: 5, pal_healing_light: 3, pal_consecration: 1,
          pal_unyielding_faith: 2, pal_illumination: 5, pal_imp_bow: 2, pal_divine_favor: 1,
          pal_divine_power: 5, pal_watch_of_light: 1, pal_imp_loh: 1,
          pal_imp_devo: 5, pal_redoubt: 5, pal_precision: 3, pal_guardians_favor: 2, pal_blessing_kings: 1, pal_imp_rf: 3, pal_toughness: 1
        }
      }
    ],
    trees: [
      {
        id: 'holy',
        name: '神圣',
        skills: [
          { id: 'pal_spiritual_focus', name: '精神集中', icon: 'spell_arcane_blink', row: 1, col: 2, max: 5, prereq: null, ranks: ['圣光闪现和圣光术施法受打断几率降低 14%', '降低 28%', '降低 42%', '降低 56%', '降低 70%'] },
          { id: 'pal_imp_sor', name: '强化正义圣印', icon: 'ability_thunderbolt', row: 1, col: 3, max: 5, prereq: null, ranks: ['正义圣印和正义审判伤害提高 3%', '提高 6%', '提高 9%', '提高 12%', '提高 15%'] },
          { id: 'pal_healing_light', name: '治愈之光', icon: 'spell_holy_holybolt', row: 2, col: 2, max: 3, prereq: null, ranks: ['圣光术和圣光闪现治疗量提高 4%', '提高 8%', '提高 12%'] },
          { id: 'pal_consecration', name: '奉献', icon: 'spell_holy_innerfire', row: 2, col: 3, max: 1, prereq: null, ranks: ['将圣洁能量注入地面，8 秒内对进入该区域的敌人造成神圣伤害'] },
          { id: 'pal_imp_loh', name: '强化圣疗术', icon: 'spell_holy_layonhands', row: 3, col: 1, max: 2, prereq: null, ranks: ['圣疗术目标护甲提高 15%，冷却缩短 10 分钟', '护甲提高 30%，冷却缩短 20 分钟'] },
          { id: 'pal_unyielding_faith', name: '不屈意志', icon: 'spell_holy_unyieldingfaith', row: 3, col: 2, max: 2, prereq: null, ranks: ['受到恐惧和迷惑的几率降低 5%', '降低 10%'] },
          { id: 'pal_illumination', name: '启示', icon: 'spell_holy_greaterheal', row: 3, col: 3, max: 5, prereq: null, ranks: ['治疗法术暴击后有 20% 几率回复全部基础法力', '几率 40%', '几率 60%', '几率 80%', '必定回复全部基础法力'] },
          { id: 'pal_imp_bow', name: '强化智慧祝福', icon: 'spell_holy_sealofwisdom', row: 4, col: 2, max: 2, prereq: null, ranks: ['智慧祝福法力回复提高 10%', '提高 20%'] },
          { id: 'pal_divine_favor', name: '神恩术', icon: 'spell_holy_heal', row: 4, col: 3, max: 1, prereq: 'pal_illumination', ranks: ['激活后使你的下一个圣光闪现、圣光术或神圣震击 100% 暴击'] },
          { id: 'pal_divine_power', name: '神圣之力', icon: 'spell_holy_powerinfusion', row: 5, col: 2, max: 5, prereq: null, ranks: ['力量上限提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'pal_watch_of_light', name: '圣光守望', icon: 'ability_paladin_beaconoflight', row: 7, col: 2, max: 1, prereq: 'pal_divine_favor', ranks: ['【无限服全新大招】向目标施加圣光守望，施放下一个神圣震击不触发冷却；对友方施放为小队群加回血，对敌方施放造成群体神圣伤害'] }
        ]
      },
      {
        id: 'protection',
        name: '防护',
        skills: [
          { id: 'pal_imp_devo', name: '强化虔诚光环', icon: 'spell_holy_devotionaura', row: 1, col: 2, max: 5, prereq: null, ranks: ['虔诚光环护甲提高 5%', '提高 10%', '提高 15%', '提高 20%', '提高 25%'] },
          { id: 'pal_redoubt', name: '盾牌专精', icon: 'ability_defend', row: 1, col: 3, max: 5, prereq: null, ranks: ['受到暴击后格挡几率提高 6%，持续 10 秒', '提高 12%', '提高 18%', '提高 24%', '提高 30%'] },
          { id: 'pal_precision', name: '精确', icon: 'ability_marksmanship', row: 2, col: 1, max: 3, prereq: null, ranks: ['单手武器命中几率提高 1%', '提高 2%', '提高 3%'] },
          { id: 'pal_guardians_favor', name: '守护者的宠儿', icon: 'spell_holy_sealofprotection', row: 2, col: 2, max: 2, prereq: null, ranks: ['保护祝福冷却缩短 60 秒，自由祝福持续延长 3 秒', '冷却缩短 120 秒，持续延长 6 秒'] },
          { id: 'pal_toughness', name: '坚韧', icon: 'spell_holy_devotionaura', row: 2, col: 3, max: 5, prereq: null, ranks: ['装备护甲提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'pal_blessing_kings', name: '王者祝福', icon: 'spell_magic_magearmor', row: 3, col: 2, max: 1, prereq: null, ranks: ['为友方施加祝福，全属性提高 10%，持续 5 分钟'] },
          { id: 'pal_imp_rf', name: '强化正义之怒', icon: 'spell_holy_sealoffury', row: 3, col: 3, max: 3, prereq: null, ranks: ['正义之怒造成的仇恨提高 16%', '提高 33%', '提高 50%'] },
          { id: 'pal_blessing_sanc', name: '庇护祝福', icon: 'spell_nature_lightningshield', row: 5, col: 2, max: 1, prereq: null, ranks: ['受到的所有伤害减少 10 点，并在成功格挡后反弹神圣伤害'] }
        ]
      },
      {
        id: 'retribution',
        name: '惩戒',
        skills: [
          { id: 'pal_imp_bos', name: '强化力量祝福', icon: 'spell_holy_fistofjustice', row: 1, col: 2, max: 5, prereq: null, ranks: ['力量祝福提高的近战强度提高 4%', '提高 8%', '提高 12%', '提高 16%', '提高 20%'] },
          { id: 'pal_benediction', name: '祈福', icon: 'spell_frost_windwalkon', row: 1, col: 3, max: 5, prereq: null, ranks: ['审判和圣印法力消耗减少 3%', '减少 6%', '减少 9%', '减少 12%', '减少 15%'] },
          { id: 'pal_imp_judgement', name: '强化审判', icon: 'spell_holy_righteousfury', row: 2, col: 1, max: 2, prereq: null, ranks: ['审判冷却时间减少 1 秒', '减少 2 秒'] },
          { id: 'pal_deflection', name: '偏斜', icon: 'ability_parry', row: 2, col: 3, max: 5, prereq: null, ranks: ['招架几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'pal_conviction', name: '定罪', icon: 'spell_holy_retributionaura', row: 3, col: 2, max: 5, prereq: null, ranks: ['近战武器暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'pal_seal_command', name: '命令圣印', icon: 'ability_warrior_innerrage', row: 3, col: 3, max: 1, prereq: null, ranks: ['造成额外神圣伤害几率，审判造成武器伤害神圣打击'] },
          { id: 'pal_pursuit_justice', name: '正义追击', icon: 'spell_holy_persuitofjustice', row: 4, col: 1, max: 2, prereq: null, ranks: ['移动速度和坐骑速度提高 4%', '提高 8%'] },
          { id: 'pal_imp_ret_aura', name: '强化惩戒光环', icon: 'spell_holy_auraoflight', row: 4, col: 2, max: 3, prereq: null, ranks: ['惩戒光环反弹伤害提高 25%', '提高 50%', '提高 75%'] },
          { id: 'pal_eye_for_eye', name: '以眼还眼', icon: 'spell_holy_eyeforaneye', row: 4, col: 3, max: 2, prereq: null, ranks: ['受到暴击后将 15% 伤害反弹给攻击者', '反弹 30%'] },
          { id: 'pal_twohand_spec', name: '双手武器专精', icon: 'inv_hammer_04', row: 5, col: 1, max: 3, prereq: null, ranks: ['双手近战武器伤害提高 2%', '提高 4%', '提高 6%'] },
          { id: 'pal_sanctity_aura', name: '圣洁光环', icon: 'spell_holy_mindvision', row: 5, col: 2, max: 1, prereq: null, ranks: ['使 30 码内小队成员的神圣伤害提高 10%'] },
          { id: 'pal_seal_twisting', name: '圣印舞', icon: 'spell_holy_righteousnessaura', row: 5, col: 3, max: 1, prereq: null, ranks: ['【无限服重磅天赋】切换圣印时，原圣印的判定和攻击触发效果会自动附着在下一次武器攻击上带出，无需繁琐卡读条'] },
          { id: 'pal_vengeance', name: '复仇', icon: 'ability_racial_avatar', row: 6, col: 2, max: 5, prereq: 'pal_conviction', ranks: ['物理或神圣伤害暴击后伤害提高 3%，持续 8 秒，最多叠 5 层', '提高 6%', '提高 9%', '提高 12%', '提高 15%'] },
          { id: 'pal_repentance', name: '忏悔', icon: 'spell_holy_prayerofhealing', row: 7, col: 2, max: 1, prereq: null, ranks: ['使目标陷入冥想瘫痪最多 6 秒，受到伤害打断'] }
        ]
      }
    ]
  },

  // ==========================================
  // 4. 萨满祭司 (Shaman) - 元素、增强、恢复 (无限服最新版)
  // ==========================================
  shaman: {
    name: '萨满祭司',
    icon: '⚡',
    classIcon: 'class_shaman',
    presets: [
      {
        name: '无限服·漩涡先知增强萨 (0/32/19)',
        desc: '无限服增强核心大招！【漩涡武器】近战快速叠层瞬发法术 + 【先知之怒】全队狂暴爆发，风怒打击秒人',
        points: {
          sh_anc_know: 5, sh_shield: 5, sh_thundering: 5, sh_imp_ghost: 2, sh_flurry: 5, sh_toughness: 3, sh_maelstrom_weapon: 5,
          sh_fury_farseer: 1, sh_stormstrike: 1,
          sh_tidal_focus: 5, sh_imp_healingwave: 5, sh_water_shield: 3, sh_nature_guidance: 3, sh_healing_way: 3
        }
      },
      {
        name: '无限服·激流链刷奶萨 (0/5/46)',
        desc: '无限服全新大招【激流】持续HOT群刷拉血 + 【水之护盾】永动回蓝，法力之潮图腾全队续航',
        points: {
          sh_anc_know: 5,
          sh_tidal_focus: 5, sh_imp_healingwave: 5, sh_water_shield: 3, sh_ancestral_heal: 3, sh_totemic_focus: 5,
          sh_nature_guidance: 3, sh_healing_way: 3, sh_tidal_mastery: 5, sh_healing_grace: 3,
          sh_nature_swift: 1, sh_purification: 5, sh_mana_tide: 1, sh_imp_chain: 2, sh_riptide: 1, sh_spirit_weapons: 1
        }
      }
    ],
    trees: [
      {
        id: 'elemental',
        name: '元素',
        skills: [
          { id: 'sh_concussion', name: '震荡', icon: 'spell_fire_fireball', row: 1, col: 2, max: 5, prereq: null, ranks: ['闪电箭、闪电链和震击伤害提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'sh_convection', name: '对流', icon: 'spell_nature_wispsplode', row: 1, col: 3, max: 5, prereq: null, ranks: ['震击、闪电法术消耗降低 2%', '降低 4%', '降低 6%', '降低 8%', '降低 10%'] },
          { id: 'sh_elem_focus', name: '元素集中', icon: 'spell_shadow_manaburn', row: 3, col: 2, max: 1, prereq: null, ranks: ['法术暴击后进入节能施法状态，下2个法术法力消耗减少 100%'] },
          { id: 'sh_lightning_overload', name: '闪电过载', icon: 'spell_nature_lightningoverload', row: 4, col: 1, max: 3, prereq: null, ranks: ['【无限服特色】闪电箭与闪电链命中时有 7% 几率复制一次同等级免费瞬发法术', '几率 14%', '几率 20%'] },
          { id: 'sh_call_of_thunder', name: '雷霆召唤', icon: 'spell_nature_callstorm', row: 5, col: 1, max: 2, prereq: null, ranks: ['【无限服最新】闪电箭与闪电链致命一击几率提高 3%', '提高 6%'] },
          { id: 'sh_elem_fury', name: '元素之怒', icon: 'spell_fire_volcano', row: 5, col: 2, max: 1, prereq: 'sh_elem_focus', ranks: ['灼热图腾、闪电与震击暴击伤害加成提高 100%'] },
          { id: 'sh_elem_mastery', name: '元素掌握', icon: 'spell_nature_wispheal', row: 7, col: 2, max: 1, prereq: 'sh_elem_fury', ranks: ['激活后使你的下一个火焰、冰霜或自然法术 100% 暴击，法力消耗降低 100%'] }
        ]
      },
      {
        id: 'enhancement',
        name: '增强',
        skills: [
          { id: 'sh_anc_know', name: '先祖知识', icon: 'spell_shadow_grimward', row: 1, col: 2, max: 5, prereq: null, ranks: ['法力值上限提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'sh_shield', name: '盾牌专精', icon: 'inv_shield_06', row: 1, col: 3, max: 5, prereq: null, ranks: ['格挡几率提高 1%，格挡值提高 5%', '提高 2%/10%', '提高 3%/15%', '提高 4%/20%', '提高 5%/25%'] },
          { id: 'sh_thundering', name: '雷霆打击', icon: 'ability_thunderbolt', row: 2, col: 2, max: 5, prereq: null, ranks: ['近战武器暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'sh_imp_ghost', name: '强化幽魂之狼', icon: 'spell_nature_spiritwolf', row: 2, col: 3, max: 2, prereq: null, ranks: ['幽魂之狼施法时间缩短 1 秒', '缩短 2 秒（瞬发）'] },
          { id: 'sh_flurry', name: '乱舞', icon: 'ability_ghoulfrenzy', row: 4, col: 2, max: 5, prereq: 'sh_thundering', ranks: ['近战暴击后下 3 次攻击速度提高 10%', '提高 15%', '提高 20%', '提高 25%', '提高 30%'] },
          { id: 'sh_toughness', name: '坚韧', icon: 'spell_nature_spiritarmor', row: 4, col: 3, max: 5, prereq: null, ranks: ['装备护甲提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'sh_maelstrom_weapon', name: '漩涡武器', icon: 'spell_shaman_maelstromweapon', row: 5, col: 2, max: 5, prereq: null, ranks: ['【无限服标志大招】近战攻击命中产生漩涡充能，每层使闪电箭/链或治疗波施法时间减少 20%，叠至 5 层直接瞬发', '几率翻倍', '几率大幅提高', '极高几率产生充能', '近战攻击极速叠加漩涡武器瞬发法术'] },
          { id: 'sh_fury_farseer', name: '先知之怒', icon: 'spell_nature_bloodlust', row: 6, col: 3, max: 1, prereq: null, ranks: ['【无限服专属嗜血】激活后进入先知狂暴状态，自身攻速提升 30%，武器特效触发率翻倍，持续 15 秒'] },
          { id: 'sh_stormstrike', name: '风暴打击', icon: 'spell_holy_sealofmight', row: 7, col: 2, max: 1, prereq: 'sh_flurry', ranks: ['立刻用武器造成伤害，使目标承受的下2次自然伤害提高 20%'] }
        ]
      },
      {
        id: 'restoration',
        name: '恢复',
        skills: [
          { id: 'sh_tidal_focus', name: '潮汐集中', icon: 'spell_frost_manarecharge', row: 1, col: 2, max: 5, prereq: null, ranks: ['治疗法术法力消耗减少 1%', '减少 2%', '减少 3%', '减少 4%', '减少 5%'] },
          { id: 'sh_imp_healingwave', name: '强化治疗波', icon: 'spell_nature_magicimmunity', row: 1, col: 3, max: 5, prereq: null, ranks: ['治疗波施法时间减少 0.1 秒', '减少 0.2 秒', '减少 0.3 秒', '减少 0.4 秒', '减少 0.5 秒'] },
          { id: 'sh_water_shield', name: '水之护盾', icon: 'ability_shaman_watershield', row: 2, col: 3, max: 3, prereq: null, ranks: ['【无限服回蓝神技】水流环绕施法者每 5 秒回蓝，受击时消耗水球立即返还 150 点法力', '受击返还 300 点', '受击返还 450 点法力值'] },
          { id: 'sh_ancestral_heal', name: '先祖治疗', icon: 'spell_nature_undyingstrength', row: 2, col: 1, max: 3, prereq: null, ranks: ['治疗暴击后使目标护甲提高 8%，持续 15 秒', '提高 16%', '提高 25%'] },
          { id: 'sh_totemic_focus', name: '图腾集中', icon: 'spell_nature_moonglow', row: 2, col: 2, max: 5, prereq: null, ranks: ['图腾法力消耗减少 5%', '减少 10%', '减少 15%', '减少 20%', '减少 25%'] },
          { id: 'sh_nature_guidance', name: '自然指引', icon: 'spell_frost_stun', row: 3, col: 1, max: 3, prereq: null, ranks: ['法术和近战命中率提高 1%', '提高 2%', '提高 3%'] },
          { id: 'sh_healing_way', name: '治疗之路', icon: 'spell_nature_healingway', row: 3, col: 2, max: 3, prereq: null, ranks: ['治疗波使后续治疗波效果提高 6%，最多叠加 3 次', '几率 66%', '几率 100%'] },
          { id: 'sh_tidal_mastery', name: '潮汐精通', icon: 'spell_nature_healingwavegreater', row: 3, col: 3, max: 5, prereq: null, ranks: ['治疗与闪电法术暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'sh_healing_grace', name: '治愈恩赐', icon: 'spell_nature_healingtouch', row: 4, col: 3, max: 3, prereq: null, ranks: ['治疗产生的仇恨值减少 5%', '减少 10%', '减少 15%'] },
          { id: 'sh_nature_swift', name: '自然迅捷', icon: 'spell_nature_ravenform', row: 5, col: 2, max: 1, prereq: null, ranks: ['激活后使你的下一个自然法术变为瞬发'] },
          { id: 'sh_purification', name: '净化', icon: 'spell_frost_wizardmark', row: 5, col: 3, max: 5, prereq: null, ranks: ['治疗法术效果提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'sh_spirit_weapons', name: '灵魂武器', icon: 'ability_parry', row: 5, col: 1, max: 1, prereq: null, ranks: ['招架几率提高 5%'] },
          { id: 'sh_mana_tide', name: '法力之潮图腾', icon: 'spell_frost_summonwaterelemental', row: 6, col: 2, max: 1, prereq: 'sh_nature_swift', ranks: ['召唤法力之潮图腾，每 3 秒为小队恢复 170 点法力值，持续 12 秒'] },
          { id: 'sh_imp_chain', name: '强化治疗链', icon: 'spell_nature_healingwavegreater', row: 6, col: 3, max: 2, prereq: null, ranks: ['治疗链治疗量提高 5%', '提高 10%'] },
          { id: 'sh_riptide', name: '激流', icon: 'spell_nature_riptide', row: 7, col: 2, max: 1, prereq: 'sh_mana_tide', ranks: ['【无限服恢复大招】瞬发为友方施加激流持续回复生命，并使下一次治疗链或治疗波施法速度提升 25%'] }
        ]
      }
    ]
  },

  // ==========================================
  // 5. 猎人 (Hunter) - 野兽控制、射击、生存 (无限服近战生存+独来独往)
  // ==========================================
  hunter: {
    name: '猎人',
    icon: '🏹',
    classIcon: 'class_hunter',
    presets: [
      {
        name: '无限服·独来独往射击猎 (2/31/18)',
        desc: '无限服标志性【独来独往】不带宠物增伤20%！瞄准射击高暴击，强击光环全小队攻击强度拉满',
        points: {
          h_imp_hawk: 2,
          h_imp_conc: 5, h_efficiency: 1, h_lethal_shots: 5, h_aimed_shot: 1, h_hawk_eye: 3, h_imp_serpent: 2, h_lone_wolf: 1, h_barrage: 3,
          h_scatter_shot: 1, h_ranged_spec: 5, h_imp_multi: 3, h_trueshot_aura: 1,
          h_monster_slaying: 3, h_humanoid_slaying: 3, h_savage_strikes: 2, h_deflection: 5, h_surefooted: 3, h_killer_instinct: 2
        }
      },
      {
        name: '无限服·近战撕裂生存猎 (2/18/31)',
        desc: '无限服重大转型专精！近战武器猫鼬撕咬重置猛禽一击，31点终极绝技【撕裂打击】近战高伤流血',
        points: {
          h_imp_hawk: 2,
          h_imp_conc: 5, h_efficiency: 2, h_lethal_shots: 5, h_aimed_shot: 1, h_hawk_eye: 3, h_scatter_shot: 1, h_barrage: 1,
          h_monster_slaying: 3, h_humanoid_slaying: 3, h_deflection: 5, h_savage_strikes: 2, h_deterrence: 1, h_surefooted: 3, h_killer_instinct: 3, h_counterattack: 1, h_mongoose_flurry: 4, h_melee_spec: 5, h_lacerate_strike: 1
        }
      },
      {
        name: '无限服·雄鹰兽王狂暴 (31/20/0)',
        desc: '无限服新增【召唤雄鹰】削甲破防 + 狂野怒火红人免控爆发，野外练级刷怪无损平推',
        points: {
          h_imp_hawk: 5, h_endurance_training: 5, h_thick_hide: 3, h_call_eagle: 1, h_unleashed_fury: 5, h_ferocity: 5,
          h_intimidation: 1, h_frenzy: 5, h_bestial_wrath: 1,
          h_efficiency: 5, h_lethal_shots: 5, h_aimed_shot: 1, h_hawk_eye: 3, h_barrage: 3, h_scatter_shot: 1, h_ranged_spec: 2
        }
      }
    ],
    trees: [
      {
        id: 'beastmastery',
        name: '野兽控制',
        skills: [
          { id: 'h_imp_hawk', name: '强化雄鹰守护', icon: 'spell_nature_ravenform', row: 1, col: 2, max: 5, prereq: null, ranks: ['普通远程攻击有 1% 几率使攻击速度提高 30%', '几率 2%', '几率 3%', '几率 4%', '几率 5%'] },
          { id: 'h_endurance_training', name: '耐久训练', icon: 'spell_nature_reincarnation', row: 1, col: 3, max: 5, prereq: null, ranks: ['宠物生命提高 3%，猎人生命提高 1%', '提高 6%/2%', '提高 9%/3%', '提高 12%/4%', '提高 15%/5%'] },
          { id: 'h_thick_hide', name: '厚皮', icon: 'inv_misc_pelt_bear_03', row: 2, col: 2, max: 3, prereq: null, ranks: ['宠物护甲提高 10%', '提高 20%', '提高 30%'] },
          { id: 'h_call_eagle', name: '召唤雄鹰', icon: 'ability_hunter_pet_owl', row: 3, col: 3, max: 1, prereq: null, ranks: ['【无限服特色】召唤战鹰盘旋于战场上空，每 3 秒俯冲撕裂目标，使其护甲降低 5%'] },
          { id: 'h_unleashed_fury', name: '狂怒释放', icon: 'ability_bullrush', row: 3, col: 2, max: 5, prereq: null, ranks: ['宠物近战伤害提高 3%', '提高 6%', '提高 9%', '提高 12%', '提高 15%'] },
          { id: 'h_ferocity', name: '凶暴', icon: 'ability_hunter_pet_hyena', row: 4, col: 3, max: 5, prereq: null, ranks: ['宠物暴击几率提高 3%', '提高 6%', '提高 9%', '提高 12%', '提高 15%'] },
          { id: 'h_intimidation', name: '胁迫', icon: 'ability_devour', row: 5, col: 2, max: 1, prereq: null, ranks: ['命令宠物击晕目标 3 秒并造成大量仇恨'] },
          { id: 'h_frenzy', name: '狂乱', icon: 'inv_misc_monsterclaw_04', row: 6, col: 2, max: 5, prereq: 'h_intimidation', ranks: ['宠物暴击后有 20% 几率攻击速度提高 30%', '几率 40%', '几率 60%', '几率 80%', '几率 100%'] },
          { id: 'h_bestial_wrath', name: '狂野怒火', icon: 'ability_druid_ferociousbite', row: 7, col: 2, max: 1, prereq: 'h_frenzy', ranks: ['使宠物陷入狂怒造成伤害提高 50%，免疫一切恐惧与控制，持续 18 秒'] }
        ]
      },
      {
        id: 'marksmanship',
        name: '射击',
        skills: [
          { id: 'h_imp_conc', name: '强化震荡射击', icon: 'spell_frost_stun', row: 1, col: 2, max: 5, prereq: null, ranks: ['震荡射击有 4% 几率使目标昏迷 3 秒', '几率 8%', '几率 12%', '几率 16%', '几率 20%'] },
          { id: 'h_efficiency', name: '效率', icon: 'spell_frost_wizardmark', row: 1, col: 3, max: 5, prereq: null, ranks: ['射击技能法力消耗减少 2%', '减少 4%', '减少 6%', '减少 8%', '减少 10%'] },
          { id: 'h_lethal_shots', name: '致命射击', icon: 'ability_searingarrow', row: 2, col: 3, max: 5, prereq: null, ranks: ['远程武器暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'h_aimed_shot', name: '瞄准射击', icon: 'inv_spear_07', row: 3, col: 2, max: 1, prereq: 'h_lethal_shots', ranks: ['精准瞄准目标造成武器伤害+70，使目标受到的治疗降低 50%'] },
          { id: 'h_hawk_eye', name: '鹰眼', icon: 'ability_townwatch', row: 3, col: 3, max: 3, prereq: null, ranks: ['远程武器射程增加 2 码', '增加 4 码', '增加 6 码'] },
          { id: 'h_lone_wolf', name: '独来独往', icon: 'spell_hunter_lonewolf', row: 4, col: 1, max: 1, prereq: null, ranks: ['【无限服重磅天赋】在未激活宠物时，使猎人自身造成的伤害直接提升 20%'] },
          { id: 'h_imp_serpent', name: '强化毒蛇钉刺', icon: 'ability_hunter_quickshot', row: 4, col: 2, max: 5, prereq: null, ranks: ['毒蛇钉刺伤害提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'h_barrage', name: '弹幕', icon: 'ability_upgrademoonglaive', row: 4, col: 3, max: 3, prereq: null, ranks: ['多重射击和乱射伤害提高 5%', '提高 10%', '提高 15%'] },
          { id: 'h_scatter_shot', name: '驱散射击', icon: 'ability_golemstormbolt', row: 5, col: 2, max: 1, prereq: null, ranks: ['短程射击造成 50% 武器伤害并使目标迷惑 4 秒'] },
          { id: 'h_ranged_spec', name: '远程武器专精', icon: 'inv_weapon_rifle_01', row: 5, col: 3, max: 5, prereq: null, ranks: ['远程武器伤害提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'h_imp_multi', name: '强化多重射击', icon: 'ability_upgrademoonglaive', row: 6, col: 3, max: 3, prereq: null, ranks: ['多重射击冷却减少 1 秒', '减少 2 秒', '减少 3 秒'] },
          { id: 'h_trueshot_aura', name: '强击光环', icon: 'ability_trueshot', row: 7, col: 2, max: 1, prereq: 'h_scatter_shot', ranks: ['使 45 码内所有小队成员的攻击强度提高 50 点'] }
        ]
      },
      {
        id: 'survival',
        name: '生存',
        skills: [
          { id: 'h_monster_slaying', name: '怪物杀手', icon: 'inv_misc_head_dragon_01', row: 1, col: 1, max: 3, prereq: null, ranks: ['对野兽、巨人、龙类伤害提高 1%，暴击伤害提高 1%', '伤害提高 2%', '提高 3%'] },
          { id: 'h_humanoid_slaying', name: '人型生物杀手', icon: 'spell_holy_prayerofhealing', row: 1, col: 2, max: 3, prereq: null, ranks: ['对人形生物伤害提高 1%，暴击伤害提高 1%', '提高 2%', '提高 3%'] },
          { id: 'h_deflection', name: '偏斜', icon: 'ability_parry', row: 1, col: 3, max: 5, prereq: null, ranks: ['招架几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'h_savage_strikes', name: '野蛮打击', icon: 'ability_racial_bloodrage', row: 2, col: 1, max: 2, prereq: null, ranks: ['猛禽一击和猫鼬撕咬暴击几率提高 10%', '提高 20%'] },
          { id: 'h_deterrence', name: '威慑', icon: 'ability_whirlwind', row: 3, col: 1, max: 1, prereq: null, ranks: ['闪避和招架几率提高 25%，持续 10 秒'] },
          { id: 'h_surefooted', name: '稳固', icon: 'ability_kick', row: 4, col: 2, max: 3, prereq: null, ranks: ['命中几率提高 1%，移动限制抵抗提高 5%', '提高 2%/10%', '提高 3%/15%'] },
          { id: 'h_killer_instinct', name: '杀戮本能', icon: 'spell_holy_blessingofstamina', row: 4, col: 3, max: 3, prereq: null, ranks: ['所有攻击暴击几率提高 1%', '提高 2%', '提高 3%'] },
          { id: 'h_counterattack', name: '反击', icon: 'ability_warrior_challange', row: 5, col: 1, max: 1, prereq: 'h_deterrence', ranks: ['招架后激活，造成近战伤害并使目标定身 5 秒'] },
          { id: 'h_mongoose_flurry', name: '猫鼬疾袭', icon: 'ability_hunter_aspectofthecheetah', row: 5, col: 3, max: 4, prereq: null, ranks: ['【近战生存核心】猫鼬撕咬有 25% 几率重置猛禽一击冷却', '几率 50%', '几率 75%', '几率 100% 重置猛禽一击'] },
          { id: 'h_melee_spec', name: '近战专精', icon: 'inv_sword_23', row: 6, col: 2, max: 5, prereq: null, ranks: ['近战武器造成的物理伤害提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'h_lacerate_strike', name: '撕裂打击', icon: 'ability_druid_disembowel', row: 7, col: 2, max: 1, prereq: null, ranks: ['【无限服31点近战大招】造成 160% 武器伤害并在 12 秒内造成巨额流血，受猫鼬撕咬刷新'] }
        ]
      }
    ]
  },

  // ==========================================
  // 6. 德鲁伊 (Druid) - 平衡、野性战斗、恢复 (无限服狂暴+日月之蚀+野性成长)
  // ==========================================
  druid: {
    name: '德鲁伊',
    icon: '🍃',
    classIcon: 'class_druid',
    presets: [
      {
        name: '无限服·野性狂暴猫熊 (14/32/5)',
        desc: '无限服狂暴绝技！31点大招【狂暴】裂伤打3个目标无CD，终结技伤害翻倍，熊坦硬度与猫德输出爆表',
        points: {
          dr_grasp: 1, dr_imp_grasp: 4, dr_focus: 5, dr_omen: 1, dr_nature_reach: 2, dr_imp_moonfire: 1,
          dr_ferocity: 5, dr_feral_aggression: 5, dr_thickhide: 5, dr_feline_swift: 2, dr_charge: 1, dr_claws: 3, dr_fury: 2, dr_predatory: 3, dr_heart_wild: 5, dr_berserk: 1,
          dr_furor: 5
        }
      },
      {
        name: '无限服·野性成长奶德 (5/0/46)',
        desc: '无限服全新大招【野性成长】瞬发全队群疗HOT，迅捷治愈救急，团队激活永动机',
        points: {
          dr_focus: 5,
          dr_imp_motw: 5, dr_furor: 5, dr_nature_focus: 5, dr_imp_ht: 5, dr_insect: 1, dr_subtlety: 5,
          dr_imp_rejuv: 3, dr_tranquil_spirit: 5, dr_nature_swift: 1, dr_imp_regrowth: 5, dr_innervate: 1, dr_wild_growth: 1, dr_gift_nature: 4
        }
      }
    ],
    trees: [
      {
        id: 'balance',
        name: '平衡',
        skills: [
          { id: 'dr_grasp', name: '自然之握', icon: 'spell_nature_natureswrath', row: 1, col: 1, max: 1, prereq: null, ranks: ['受到近战攻击有 35% 几率纠缠定身敌人'] },
          { id: 'dr_imp_grasp', name: '强化自然之握', icon: 'spell_nature_natureswrath', row: 2, col: 1, max: 4, prereq: 'dr_grasp', ranks: ['纠缠触发几率提高 15%', '提高 30%', '提高 45%', '提高 65%'] },
          { id: 'dr_focus', name: '自然集中', icon: 'spell_nature_healingtouch', row: 1, col: 3, max: 5, prereq: null, ranks: ['愤怒和星火术施法受打退几率降低 14%', '降低 28%', '降低 42%', '降低 56%', '降低 70%'] },
          { id: 'dr_imp_moonfire', name: '强化月火术', icon: 'spell_nature_starfall', row: 2, col: 2, max: 5, prereq: null, ranks: ['月火术伤害和暴击几率提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'dr_omen', name: '清晰预兆', icon: 'spell_nature_crystalball', row: 3, col: 1, max: 1, prereq: null, ranks: ['近战攻击有几率使你进入节能施法状态'] },
          { id: 'dr_nature_reach', name: '自然延伸', icon: 'spell_nature_naturetouchgrow', row: 3, col: 2, max: 2, prereq: null, ranks: ['平衡法术射程增加 10%', '增加 20%'] },
          { id: 'dr_eclipse', name: '日月之蚀', icon: 'ability_druid_eclipse', row: 5, col: 3, max: 3, prereq: null, ranks: ['【无限服核心机制】愤怒暴击使星火术施法缩短 0.5 秒，星火暴击使愤怒伤害提高 10%', '施法缩短 1.0 秒 / 伤害提高 20%', '施法缩短 1.5 秒 / 伤害提高 30%'] },
          { id: 'dr_moonkin', name: '枭兽形态', icon: 'spell_nature_forceofnature', row: 7, col: 2, max: 1, prereq: null, ranks: ['变成枭兽形态护甲提高360%，小队法术暴击几率提高 3%'] }
        ]
      },
      {
        id: 'feral',
        name: '野性战斗',
        skills: [
          { id: 'dr_ferocity', name: '凶暴', icon: 'ability_hunter_pet_hyena', row: 1, col: 2, max: 5, prereq: null, ranks: ['重击、撕碎和爪击怒气或能量消耗减少 1 点', '减少 2 点', '减少 3 点', '减少 4 点', '减少 5 点'] },
          { id: 'dr_feral_aggression', name: '野性侵略', icon: 'ability_druid_demoralizingroar', row: 1, col: 3, max: 5, prereq: null, ranks: ['挫志咆哮降低近战强度提高 8%，撕咬伤害提高 3%', '提高 16%/6%', '提高 24%/9%', '提高 32%/12%', '提高 40%/15%'] },
          { id: 'dr_thickhide', name: '厚皮', icon: 'inv_misc_pelt_bear_03', row: 2, col: 2, max: 5, prereq: null, ranks: ['装备护甲加成提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'dr_feline_swift', name: '豹之迅捷', icon: 'spell_nature_spiritwolf', row: 2, col: 3, max: 2, prereq: null, ranks: ['户外猎豹移速提高 15%，躲避提高 2%', '移速提高 30%，躲避提高 4%'] },
          { id: 'dr_charge', name: '野性冲锋', icon: 'ability_hunter_pet_bear', row: 3, col: 2, max: 1, prereq: null, ranks: ['熊形态下冲锋并定身打断施法'] },
          { id: 'dr_claws', name: '锋利兽爪', icon: 'inv_misc_monsterclaw_04', row: 3, col: 3, max: 3, prereq: null, ranks: ['熊与豹形态暴击几率提高 2%', '提高 4%', '提高 6%'] },
          { id: 'dr_fury', name: '原始狂怒', icon: 'ability_racial_cannibalize', row: 4, col: 2, max: 2, prereq: 'dr_claws', ranks: ['暴击后熊获得 5 点怒气，豹获得 1 个连击点', '必定获得 5 怒气/1连击点'] },
          { id: 'dr_predatory', name: '掠食打击', icon: 'ability_hunter_pet_cat', row: 4, col: 3, max: 3, prereq: null, ranks: ['近战攻击强度提高当前等级的 50%', '提高 100%', '提高 150%'] },
          { id: 'dr_heart_wild', name: '兽群之心', icon: 'spell_holy_blessingofagility', row: 6, col: 2, max: 5, prereq: 'dr_predatory', ranks: ['耐力提高 4%，熊耐力额外提高 4%，豹力量提高 4%', '提高 8%', '提高 12%', '提高 16%', '提高 20%'] },
          { id: 'dr_berserk', name: '狂暴', icon: 'ability_druid_berserk', row: 7, col: 2, max: 1, prereq: 'dr_heart_wild', ranks: ['【无限服终极野性大招】裂伤可同时攻击 3 个目标且移除冷却，15 秒内产生连击点的技能造成的伤害提高 100%'] }
        ]
      },
      {
        id: 'restoration',
        name: '恢复',
        skills: [
          { id: 'dr_imp_motw', name: '强化野性印记', icon: 'spell_nature_regeneration', row: 1, col: 2, max: 5, prereq: null, ranks: ['野性印记属性提高 7%', '提高 14%', '提高 21%', '提高 28%', '提高 35%'] },
          { id: 'dr_furor', name: '激怒', icon: 'spell_holy_blessingofstamina', row: 1, col: 3, max: 5, prereq: null, ranks: ['变身熊时获得 2 点怒气，豹获得 8 点能量', '获得 4/16', '获得 6/24', '获得 8/32', '获得 10/40'] },
          { id: 'dr_nature_focus', name: '自然专注', icon: 'spell_nature_healingwavegreater', row: 2, col: 1, max: 5, prereq: null, ranks: ['治疗法术受打退几率降低 14%', '降低 28%', '降低 42%', '降低 56%', '降低 70%'] },
          { id: 'dr_imp_ht', name: '强化治疗之触', icon: 'spell_nature_healingtouch', row: 2, col: 2, max: 5, prereq: null, ranks: ['治疗之触施法缩短 0.1 秒', '缩短 0.2 秒', '缩短 0.3 秒', '缩短 0.4 秒', '缩短 0.5 秒'] },
          { id: 'dr_insect', name: '虫群', icon: 'spell_nature_insectswarm', row: 3, col: 2, max: 1, prereq: null, ranks: ['召唤虫群使敌人命中率降低 2%，并在 12 秒内造成自然伤害'] },
          { id: 'dr_subtlety', name: '细心', icon: 'ability_eyeoftheowl', row: 3, col: 3, max: 5, prereq: null, ranks: ['治疗法术仇恨降低 4%', '降低 8%', '降低 12%', '降低 16%', '降低 20%'] },
          { id: 'dr_imp_rejuv', name: '强化回春术', icon: 'spell_nature_rejuvenation', row: 4, col: 2, max: 3, prereq: null, ranks: ['回春术治疗提高 5%', '提高 10%', '提高 15%'] },
          { id: 'dr_tranquil_spirit', name: '宁静思想', icon: 'spell_holy_elunesgrace', row: 4, col: 3, max: 5, prereq: null, ranks: ['治疗法力消耗降低 2%', '降低 4%', '降低 6%', '降低 8%', '降低 10%'] },
          { id: 'dr_nature_swift', name: '自然迅捷', icon: 'spell_nature_ravenform', row: 5, col: 2, max: 1, prereq: null, ranks: ['激活后使你的下一个自然法术变成瞬发'] },
          { id: 'dr_imp_regrowth', name: '强化愈合', icon: 'spell_nature_resistnature', row: 5, col: 3, max: 5, prereq: null, ranks: ['愈合暴击几率提高 10%', '提高 20%', '提高 30%', '提高 40%', '提高 50%'] },
          { id: 'dr_innervate', name: '激活', icon: 'spell_nature_lightning', row: 6, col: 2, max: 1, prereq: 'dr_nature_swift', ranks: ['法力回复速度提高 400%，持续 20 秒，施法时保持 100% 回复'] },
          { id: 'dr_gift_nature', name: '治愈之赐', icon: 'spell_nature_protectionformnature', row: 6, col: 3, max: 5, prereq: null, ranks: ['所有治疗法术效果提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'dr_wild_growth', name: '野性成长', icon: 'ability_druid_flourish', row: 7, col: 2, max: 1, prereq: 'dr_innervate', ranks: ['【无限服全新治疗大招】瞬发为 15 码内最多 5 名队友施加持续治疗，在 7 秒内恢复大量生命值'] }
        ]
      }
    ]
  },

  // ==========================================
  // 7. 法师 (Mage) - 奥术、火焰、冰霜 (无限服奥术冲击+霜火之箭)
  // ==========================================
  mage: {
    name: '法师',
    icon: '🧙‍♂️',
    classIcon: 'class_mage',
    presets: [
      {
        name: '无限服·奥术冲击爆发 (31/20/0)',
        desc: '无限服全新大招【奥术冲击】叠加伤害爆发！配合奥术强化+气定神闲，瞬秒精英怪',
        points: {
          m_arcane_subtlety: 2, m_arcane_focus: 3, m_imp_missiles: 5, m_imp_explosion: 5, m_evocation: 1, m_imp_cs: 2, m_arcane_med: 3, m_presence_mind: 1, m_arcane_mind: 4, m_arcane_instability: 3, m_arcane_power: 1, m_arcane_blast: 1,
          m_imp_fireball: 5, m_ignite: 5, m_flame_throw: 2, m_pyroblast: 1, m_imp_scorch: 3, m_critical_mass: 3, m_burning_soul: 1
        }
      },
      {
        name: '无限服·霜火之箭输出 (17/31/3)',
        desc: '无限服特色【霜火之箭】同时享受火焰与冰霜加成！点燃暴击叠加烈焰，燃烧必爆输出爆表',
        points: {
          m_arcane_subtlety: 2, m_arcane_focus: 3, m_imp_missiles: 5, m_magic_absorption: 2, m_evocation: 1, m_arcane_med: 3, m_presence_mind: 1,
          m_imp_fireball: 5, m_ignite: 5, m_flame_throw: 2, m_frostfire_bolt: 1, m_pyroblast: 1, m_imp_scorch: 3, m_blast_wave: 1, m_critical_mass: 3, m_fire_power: 5, m_combustion: 1, m_burning_soul: 4,
          m_imp_frostbolt: 3
        }
      },
      {
        name: '无限服·深冰控场练级 (17/0/34)',
        desc: '无限服万金油生存流派！唤醒快速回蓝 + 强化暴风雪超强减速 + 寒冰护体双冰箱保命',
        points: {
          m_arcane_subtlety: 2, m_arcane_focus: 3, m_imp_missiles: 5, m_magic_absorption: 2, m_evocation: 1, m_arcane_med: 3, m_presence_mind: 1,
          m_imp_frostbolt: 5, m_ice_shards: 5, m_frostbite: 3, m_cold_snap: 1, m_piercing_ice: 3, m_shatter: 5, m_imp_blizzard: 3, m_ice_block: 1, m_winters_chill: 5, m_ice_barrier: 1, m_frost_channel: 2
        }
      }
    ],
    trees: [
      {
        id: 'arcane',
        name: '奥术',
        skills: [
          { id: 'm_arcane_subtlety', name: '奥术精妙', icon: 'spell_nature_wispsplode', row: 1, col: 1, max: 2, prereq: null, ranks: ['目标魔法抗性降低 5 点，仇恨降低 20%', '降低 10 点，仇恨降低 40%'] },
          { id: 'm_arcane_focus', name: '奥术集中', icon: 'spell_shadow_teleport', row: 1, col: 2, max: 5, prereq: null, ranks: ['奥术命中提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'm_imp_missiles', name: '强化奥术飞弹', icon: 'spell_nature_starfall', row: 1, col: 3, max: 5, prereq: null, ranks: ['受打退几率降低 20%', '降低 40%', '降低 60%', '降低 80%', '降低 100%'] },
          { id: 'm_imp_explosion', name: '强化魔爆术', icon: 'spell_nature_wispsplode', row: 2, col: 2, max: 5, prereq: null, ranks: ['魔爆术暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'm_magic_absorption', name: '魔法吸收', icon: 'spell_nature_astralrecalgroup', row: 2, col: 3, max: 5, prereq: null, ranks: ['抗性提高 2 点，抵抗回复 1%', '提高 4 点/2%', '提高 6 点/3%', '提高 8 点/4%', '提高 10 点/5%'] },
          { id: 'm_evocation', name: '唤醒', icon: 'spell_nature_purge', row: 3, col: 2, max: 1, prereq: null, ranks: ['8 秒内引导恢复 60% 总法力值'] },
          { id: 'm_imp_cs', name: '强化法术反制', icon: 'spell_frost_iceshock', row: 4, col: 2, max: 2, prereq: null, ranks: ['法术反制使目标沉默 2 秒', '沉默 4 秒'] },
          { id: 'm_arcane_med', name: '奥术冥想', icon: 'spell_shadow_siphonmana', row: 4, col: 3, max: 3, prereq: null, ranks: ['施法时保持 5% 精神回蓝', '保持 10%', '保持 15%'] },
          { id: 'm_presence_mind', name: '气定神闲', icon: 'spell_nature_enchantarmor', row: 5, col: 2, max: 1, prereq: null, ranks: ['下一次施法时间少于 10 秒的法术变为瞬发'] },
          { id: 'm_arcane_mind', name: '奥术心智', icon: 'spell_shadow_charm', row: 5, col: 3, max: 5, prereq: null, ranks: ['智力上限提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'm_arcane_instability', name: '奥术潜能', icon: 'spell_shadow_teleport', row: 6, col: 2, max: 3, prereq: 'm_presence_mind', ranks: ['法术伤害和暴击几率提高 1%', '提高 2%', '提高 3%'] },
          { id: 'm_arcane_power', name: '奥术强化', icon: 'spell_nature_lightning', row: 7, col: 2, max: 1, prereq: 'm_arcane_instability', ranks: ['伤害提高 30%，但法力消耗提高 30%，持续 15 秒'] },
          { id: 'm_arcane_blast', name: '奥术冲击', icon: 'spell_arcane_blast', row: 7, col: 3, max: 1, prereq: 'm_arcane_instability', ranks: ['【无限服重磅技能】用奥术冲击目标造成高额奥术伤害，每次施放使后续奥术伤害提高 15%，施法缩短 0.2 秒，最多叠 4 层'] }
        ]
      },
      {
        id: 'fire',
        name: '火焰',
        skills: [
          { id: 'm_imp_fireball', name: '强化火球术', icon: 'spell_fire_flamebolt', row: 1, col: 2, max: 5, prereq: null, ranks: ['火球术施法缩短 0.1 秒', '缩短 0.2 秒', '缩短 0.3 秒', '缩短 0.4 秒', '缩短 0.5 秒'] },
          { id: 'm_ignite', name: '点燃', icon: 'spell_fire_incinerate', row: 2, col: 1, max: 5, prereq: null, ranks: ['火焰法术暴击后在 4 秒内造成 8% 伤害', '造成 16%', '造成 24%', '造成 32%', '造成 40%'] },
          { id: 'm_flame_throw', name: '烈焰投掷', icon: 'spell_fire_flare', row: 2, col: 2, max: 2, prereq: null, ranks: ['火焰法术射程增加 3 码', '增加 6 码'] },
          { id: 'm_pyroblast', name: '炎爆术', icon: 'spell_fire_fireball02', row: 3, col: 2, max: 1, prereq: null, ranks: ['发射一枚巨大的火球造成毁灭性伤害并在 12 秒内灼烧'] },
          { id: 'm_burning_soul', name: '燃烧之魂', icon: 'spell_fire_fire', row: 3, col: 3, max: 4, prereq: null, ranks: ['火焰法术受打断几率降低 25%，仇恨降低 10%', '降低 50%/20%', '降低 70%/30%', '降低 85%/35%'] },
          { id: 'm_imp_scorch', name: '强化灼烧', icon: 'spell_fire_soulburn', row: 4, col: 1, max: 3, prereq: null, ranks: ['灼烧有 33% 几率使目标受火伤提高 3%，最多叠 5 层', '几率 66%', '几率 100%'] },
          { id: 'm_frostfire_bolt', name: '霜火之箭', icon: 'ability_mage_frostfirebolt', row: 5, col: 1, max: 1, prereq: null, ranks: ['【无限服特色大招】发射霜火之箭，同时造成冰霜和火焰伤害，享受双系天赋加成，并使目标减速 40%'] },
          { id: 'm_blast_wave', name: '冲击波', icon: 'spell_holy_excorcism_02', row: 5, col: 2, max: 1, prereq: 'm_pyroblast', ranks: ['以施法者为中心释放烈焰冲击波减速 50%'] },
          { id: 'm_critical_mass', name: '火焰重击', icon: 'spell_nature_wispheal', row: 5, col: 3, max: 3, prereq: null, ranks: ['火焰法术暴击几率提高 2%', '提高 4%', '提高 6%'] },
          { id: 'm_fire_power', name: '火焰强化', icon: 'spell_fire_immolation', row: 6, col: 3, max: 5, prereq: null, ranks: ['火焰法术造成的伤害提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'm_combustion', name: '燃烧', icon: 'spell_fire_sealoffire', row: 7, col: 2, max: 1, prereq: 'm_blast_wave', ranks: ['激活后每次火焰暴击几率提高 10%，直至造成 3 次暴击'] }
        ]
      },
      {
        id: 'frost',
        name: '冰霜',
        skills: [
          { id: 'm_imp_frostbolt', name: '强化寒冰箭', icon: 'spell_frost_frostbolt02', row: 1, col: 2, max: 5, prereq: null, ranks: ['寒冰箭施法缩短 0.1 秒', '缩短 0.2 秒', '缩短 0.3 秒', '缩短 0.4 秒', '缩短 0.5 秒'] },
          { id: 'm_ice_shards', name: '寒冰碎片', icon: 'spell_frost_iceardor', row: 2, col: 1, max: 5, prereq: null, ranks: ['冰霜暴击伤害加成提高 20%', '提高 40%', '提高 60%', '提高 80%', '提高 100%'] },
          { id: 'm_frostbite', name: '霜寒刺骨', icon: 'spell_frost_frostarmor', row: 2, col: 2, max: 3, prereq: null, ranks: ['寒冷效果有 5% 几率冻结目标 5 秒', '几率 10%', '几率 15%'] },
          { id: 'm_piercing_ice', name: '刺骨寒冰', icon: 'spell_frost_frostbolt', row: 3, col: 3, max: 3, prereq: null, ranks: ['冰霜伤害提高 2%', '提高 4%', '提高 6%'] },
          { id: 'm_cold_snap', name: '急速冷却', icon: 'spell_frost_wizardmark', row: 3, col: 2, max: 1, prereq: null, ranks: ['激活后立即结束所有冰霜法术的冷却时间'] },
          { id: 'm_imp_blizzard', name: '强化暴风雪', icon: 'spell_frost_icestorm', row: 4, col: 3, max: 3, prereq: null, ranks: ['暴风雪减速提高 30%', '提高 50%', '提高 65%'] },
          { id: 'm_shatter', name: '碎冰', icon: 'spell_frost_frostshock', row: 4, col: 2, max: 5, prereq: null, ranks: ['对被冰冻的目标施法暴击几率提高 10%', '提高 20%', '提高 30%', '提高 40%', '提高 50%'] },
          { id: 'm_ice_block', name: '寒冰屏障', icon: 'spell_frost_frost', row: 5, col: 2, max: 1, prereq: 'm_cold_snap', ranks: ['将自己封在冰块中免疫伤害 10 秒'] },
          { id: 'm_frost_channel', name: '寒霜导能', icon: 'spell_frost_stun', row: 5, col: 3, max: 3, prereq: null, ranks: ['冰霜法术法力消耗减少 5%，仇恨降低 4%', '减少 10%/7%', '减少 15%/10%'] },
          { id: 'm_winters_chill', name: '深冬之寒', icon: 'spell_frost_chillingblast', row: 6, col: 3, max: 5, prereq: null, ranks: ['冰霜伤害有 20% 几率使冰霜暴击提高 2%，最多叠 5 层', '几率 40%', '几率 60%', '几率 80%', '几率 100%'] },
          { id: 'm_ice_barrier', name: '寒冰护体', icon: 'spell_ice_lament', row: 7, col: 2, max: 1, prereq: 'm_ice_block', ranks: ['吸收大量伤害的护盾，持续 1 分钟，期间施法不被打断'] }
        ]
      }
    ]
  },

  // ==========================================
  // 8. 牧师 (Priest) - 戒律、神圣、暗影 (无限服苦修+愈合祷言)
  // ==========================================
  priest: {
    name: '牧师',
    icon: '✨',
    classIcon: 'class_priest',
    presets: [
      {
        name: '无限服·戒律苦修神佑 (31/20/0)',
        desc: '无限服核心高阶神技【苦修】21点即可点出！引导3连圣光箭高效救场，能量灌注法系爆发神辅助',
        points: {
          p_unbreakable_will: 5, p_imp_shield: 3, p_imp_fort: 2, p_inner_focus: 1, p_meditation: 3,
          p_mental_agility: 5, p_penance: 1, p_mental_strength: 5, p_power_infusion: 1, p_force_will: 5,
          p_healing_focus: 2, p_imp_renew: 3, p_holy_spec: 5, p_imp_flash: 2, p_divine_fury: 5, p_holy_nova: 1, p_spirit_redemption: 1, p_imp_healing: 1
        }
      },
      {
        name: '无限服·愈合祷言团补 (14/37/0)',
        desc: '无限服全新大招【愈合祷言】受击弹跳群疗神技！救赎之魂天使救场，精神指引高额法强',
        points: {
          p_unbreakable_will: 5, p_imp_shield: 3, p_imp_fort: 2, p_inner_focus: 1, p_meditation: 3,
          p_healing_focus: 2, p_imp_renew: 3, p_holy_spec: 5, p_imp_flash: 2, p_divine_fury: 5,
          p_holy_nova: 1, p_spirit_redemption: 1, p_imp_healing: 3, p_spiritual_guidance: 5, p_prayer_mending: 1, p_lightwell: 9
        }
      },
      {
        name: '无限服·暗影心爆灭杀 (13/0/38)',
        desc: '无限服暗牧续航全面重构！暗影形态持久回蓝，精神鞭笞射程+5码伤害+20%，暗言术灭爆发斩杀',
        points: {
          p_unbreakable_will: 5, p_imp_shield: 3, p_imp_fort: 2, p_inner_focus: 1, p_meditation: 2,
          p_blackout: 4, p_spirit_tap: 5, p_shadow_affinity: 3, p_imp_swp: 2, p_shadow_reach: 2, p_imp_mb: 5,
          p_mind_flay: 1, p_imp_scream: 2, p_shadow_weaving: 5, p_silence: 1, p_vampiric_embrace: 1,
          p_imp_ve: 1, p_darkness: 5, p_shadowform: 1
        }
      }
    ],
    trees: [
      {
        id: 'discipline',
        name: '戒律',
        skills: [
          { id: 'p_unbreakable_will', name: '坚定意志', icon: 'spell_magic_magearmor', row: 1, col: 2, max: 5, prereq: null, ranks: ['抵抗眩晕、恐惧和沉默几率提高 3%', '提高 6%', '提高 9%', '提高 12%', '提高 15%'] },
          { id: 'p_imp_shield', name: '强化真言术：盾', icon: 'spell_holy_powerwordshield', row: 1, col: 3, max: 3, prereq: null, ranks: ['真言术盾吸收量提高 5%', '提高 10%', '提高 15%'] },
          { id: 'p_imp_fort', name: '强化真言术：韧', icon: 'spell_holy_wordfortitude', row: 2, col: 2, max: 2, prereq: null, ranks: ['真言术韧提高耐力效果提高 15%', '提高 30%'] },
          { id: 'p_inner_focus', name: '心灵专注', icon: 'spell_frost_windwalkon', row: 3, col: 2, max: 1, prereq: null, ranks: ['下个法术法力消耗减少 100%，暴击几率提高 25%'] },
          { id: 'p_meditation', name: '冥想', icon: 'spell_nature_sleep', row: 3, col: 3, max: 3, prereq: null, ranks: ['施法时保持 5% 精神回蓝', '保持 10%', '保持 15%'] },
          { id: 'p_mental_agility', name: '精神敏锐', icon: 'ability_hibernation', row: 4, col: 2, max: 5, prereq: null, ranks: ['瞬发法术法力消耗减少 2%', '减少 4%', '减少 6%', '减少 8%', '减少 10%'] },
          { id: 'p_penance', name: '苦修', icon: 'spell_holy_penance', row: 5, col: 2, max: 1, prereq: 'p_mental_agility', ranks: ['【无限服21点核心大招】引导发射 3 枚圣光之箭，对友方立即造成连续高效治疗，或对敌方造成连续神圣伤害'] },
          { id: 'p_mental_strength', name: '精神指引', icon: 'spell_nature_enchantarmor', row: 5, col: 3, max: 5, prereq: null, ranks: ['法力值上限提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'p_power_infusion', name: '能量灌注', icon: 'spell_holy_powerinfusion', row: 6, col: 2, max: 1, prereq: 'p_penance', ranks: ['使目标法术伤害和治疗提高 20%，持续 15 秒'] },
          { id: 'p_force_will', name: '意志之力', icon: 'spell_nature_slowingtotem', row: 6, col: 3, max: 5, prereq: null, ranks: ['法术伤害和暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] }
        ]
      },
      {
        id: 'holy',
        name: '神圣',
        skills: [
          { id: 'p_healing_focus', name: '治疗专注', icon: 'spell_holy_healingfocus', row: 1, col: 2, max: 2, prereq: null, ranks: ['施法受打断几率降低 35%', '降低 70%'] },
          { id: 'p_imp_renew', name: '强化恢复', icon: 'spell_holy_renew', row: 1, col: 3, max: 3, prereq: null, ranks: ['恢复治疗量提高 5%', '提高 10%', '提高 15%'] },
          { id: 'p_holy_spec', name: '神圣专精', icon: 'spell_holy_sealofsalvation', row: 1, col: 4, max: 5, prereq: null, ranks: ['神圣法术暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'p_imp_flash', name: '强化快速治疗', icon: 'spell_holy_flashheal', row: 2, col: 2, max: 2, prereq: null, ranks: ['快速治疗法力消耗减少 5%', '减少 10%'] },
          { id: 'p_divine_fury', name: '神圣之怒', icon: 'spell_holy_sealinggloriouslight', row: 2, col: 3, max: 5, prereq: null, ranks: ['惩击、神圣之火与治疗术施法缩短 0.1 秒', '缩短 0.2 秒', '缩短 0.3 秒', '缩短 0.4 秒', '缩短 0.5 秒'] },
          { id: 'p_holy_nova', name: '神圣新星', icon: 'spell_holy_holynova', row: 3, col: 2, max: 1, prereq: null, ranks: ['制造神圣爆炸，对周围敌人造成伤害并为小队回血，无仇恨'] },
          { id: 'p_spirit_redemption', name: '救赎之魂', icon: 'inv_enchant_essenceeternallarge', row: 3, col: 3, max: 1, prereq: null, ranks: ['死亡后化身圣灵 10 秒，期间施法不消耗法力'] },
          { id: 'p_imp_healing', name: '强化治疗术', icon: 'spell_holy_heal02', row: 5, col: 2, max: 3, prereq: null, ranks: ['治疗术法力消耗降低 5%', '降低 10%', '降低 15%'] },
          { id: 'p_spiritual_guidance', name: '精神指引', icon: 'spell_holy_spiritualguidence', row: 6, col: 2, max: 5, prereq: null, ranks: ['法术伤害和治疗提高精神的 5%', '提高 10%', '提高 15%', '提高 20%', '提高 25%'] },
          { id: 'p_prayer_mending', name: '愈合祷言', icon: 'spell_holy_prayerofmendingtga', row: 7, col: 2, max: 1, prereq: null, ranks: ['【无限服强力群刷大招】为友方施加愈合祷言，受击后回血并自动弹跳到下一个队友身上，最多弹跳 5 次'] },
          { id: 'p_lightwell', name: '光明之泉', icon: 'spell_holy_summonlightwell', row: 5, col: 3, max: 9, prereq: null, ranks: ['召唤光明之泉，队友点击后 6 秒内恢复大量生命值', '恢复提升 10%', '恢复提升 20%', '恢复提升 30%', '恢复提升 40%', '恢复提升 50%', '恢复提升 60%', '恢复提升 70%', '恢复提升 80%'] }
        ]
      },
      {
        id: 'shadow',
        name: '暗影',
        skills: [
          { id: 'p_spirit_tap', name: '精神分流', icon: 'spell_shadow_requiem', row: 1, col: 2, max: 5, prereq: null, ranks: ['杀死敌人后精神提高 20%，并在施法时保持 10% 回蓝', '提高 40%', '提高 60%', '提高 80%', '提高 100%'] },
          { id: 'p_blackout', name: '昏厥', icon: 'spell_shadow_gathershadows', row: 1, col: 3, max: 5, prereq: null, ranks: ['暗影伤害目标有 2% 几率昏迷 3 秒', '几率 4%', '几率 6%', '几率 8%', '几率 10%'] },
          { id: 'p_shadow_affinity', name: '暗影亲和', icon: 'spell_shadow_shadowward', row: 2, col: 1, max: 3, prereq: null, ranks: ['暗影法术仇恨降低 8%', '降低 16%', '降低 25%'] },
          { id: 'p_imp_swp', name: '强化暗言术：痛', icon: 'spell_shadow_shadowwordpain', row: 2, col: 2, max: 2, prereq: null, ranks: ['暗言术痛持续延长 3 秒', '延长 6 秒'] },
          { id: 'p_shadow_reach', name: '暗影延伸', icon: 'spell_shadow_chilltouch', row: 2, col: 3, max: 2, prereq: null, ranks: ['暗影法术射程增加 10%', '增加 20%'] },
          { id: 'p_imp_mb', name: '强化心灵震爆', icon: 'spell_shadow_unholyfrenzy', row: 3, col: 2, max: 5, prereq: null, ranks: ['心灵震爆冷却减少 0.5 秒', '减少 1.0 秒', '减少 1.5 秒', '减少 2.0 秒', '减少 2.5 秒'] },
          { id: 'p_mind_flay', name: '精神鞭笞', icon: 'spell_shadow_siphonmana', row: 3, col: 3, max: 1, prereq: null, ranks: ['【无限服强化版】射程+5码，造成暗影伤害提高20%并减速目标 50%'] },
          { id: 'p_imp_scream', name: '强化心灵尖啸', icon: 'spell_shadow_psychicscream', row: 4, col: 2, max: 2, prereq: null, ranks: ['心灵尖啸冷却缩短 2 秒', '缩短 4 秒'] },
          { id: 'p_shadow_weaving', name: '暗影之波', icon: 'spell_shadow_blackplague', row: 4, col: 3, max: 5, prereq: null, ranks: ['暗影法术使目标承受暗影伤害提高 3%，最多叠加 5 层', '提高 6%', '提高 9%', '提高 12%', '提高 15%'] },
          { id: 'p_silence', name: '沉默', icon: 'spell_shadow_impphaseshift', row: 5, col: 1, max: 1, prereq: 'p_imp_scream', ranks: ['使目标沉默，不能施法，持续 5 秒'] },
          { id: 'p_vampiric_embrace', name: '吸血鬼的拥抱', icon: 'spell_shadow_unsummonbuilding', row: 5, col: 2, max: 1, prereq: null, ranks: ['使目标感染暗影能量，对其造成的单体暗影伤害 20% 转化为小队治疗'] },
          { id: 'p_imp_ve', name: '强化吸血鬼拥抱', icon: 'spell_shadow_improvedvampiricembrace', row: 6, col: 2, max: 2, prereq: 'p_vampiric_embrace', ranks: ['治疗转化率提高 5%', '提高 10%'] },
          { id: 'p_darkness', name: '黑暗', icon: 'spell_shadow_twilight', row: 6, col: 3, max: 5, prereq: null, ranks: ['暗影法术伤害提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'p_shadowform', name: '暗影形态', icon: 'spell_shadow_shadowform', row: 7, col: 2, max: 1, prereq: 'p_vampiric_embrace', ranks: ['【无限服重构】暗影伤害提高 15%，物理减伤 15%，且施法时大幅降低蓝耗，续航倍增'] }
        ]
      }
    ]
  },

  // ==========================================
  // 9. 术士 (Warlock) - 痛苦、恶魔学识、毁灭 (无限服吸魂斩杀)
  // ==========================================
  warlock: {
    name: '术士',
    icon: '💀',
    classIcon: 'class_warlock',
    presets: [
      {
        name: '无限服·痛苦吸魂斩杀 (31/8/12)',
        desc: '无限服特色【吸魂斩杀】引导期间DOT增伤，对低血量目标提供3倍斩杀伤害，暗影掌握全系增伤',
        points: {
          wl_suppression: 2, wl_imp_corruption: 5, wl_imp_life_tap: 2, wl_fel_concen: 5, wl_nightfall: 2,
          wl_siphon_life: 1, wl_death_embrace: 2, wl_shadow_mastery: 5, wl_dark_pact: 7,
          wl_demonic_embrace: 5, wl_imp_voidwalker: 3,
          wl_imp_sb: 5, wl_bane: 5, wl_shadowburn: 2
        }
      },
      {
        name: '无限服·恶魔灵魂链接 (7/31/13)',
        desc: '野外与决斗单挑之神！灵魂链接30%超强伤害分摊，高额耐力法坦不可撼动',
        points: {
          wl_imp_corruption: 5, wl_imp_life_tap: 2,
          wl_demonic_embrace: 5, wl_imp_voidwalker: 3, wl_fel_intellect: 5, wl_fel_stamina: 5, wl_fel_domination: 1, wl_master_summoner: 2, wl_unholy_power: 5, wl_master_demon: 4, wl_soul_link: 1,
          wl_imp_sb: 5, wl_bane: 5, wl_shadowburn: 1, wl_devastation: 2
        }
      },
      {
        name: '无限服·暗毁团本主力 (9/21/21)',
        desc: '无限服团本标杆输出！牺牲魅魔提高15%暗影伤害 + 暗影箭暴击触发毁灭易伤',
        points: {
          wl_suppression: 2, wl_imp_corruption: 5, wl_imp_life_tap: 2,
          wl_demonic_embrace: 5, wl_fel_intellect: 3, wl_fel_stamina: 3, wl_unholy_power: 5, wl_master_summoner: 2, wl_fel_domination: 1, wl_master_demon: 2,
          wl_imp_sb: 5, wl_bane: 5, wl_devastation: 5, wl_shadowburn: 1, wl_dest_reach: 2, wl_ruin: 3
        }
      }
    ],
    trees: [
      {
        id: 'affliction',
        name: '痛苦',
        skills: [
          { id: 'wl_suppression', name: '镇压', icon: 'spell_nature_drowsy', row: 1, col: 2, max: 5, prereq: null, ranks: ['痛苦法术命中率提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'wl_imp_corruption', name: '强化腐蚀术', icon: 'spell_shadow_abominationexplosion', row: 1, col: 3, max: 5, prereq: null, ranks: ['腐蚀术施法时间缩短 0.4 秒', '缩短 0.8 秒', '缩短 1.2 秒', '缩短 1.6 秒', '缩短 2.0 秒（瞬发）'] },
          { id: 'wl_imp_life_tap', name: '强化生命分流', icon: 'spell_shadow_burningspirit', row: 2, col: 3, max: 2, prereq: null, ranks: ['生命分流获得的法力提高 10%', '提高 20%'] },
          { id: 'wl_fel_concen', name: '恶魔专注', icon: 'spell_shadow_fingerofdeath', row: 3, col: 2, max: 5, prereq: null, ranks: ['引导吸取生命/法力受打断几率降低 14%', '降低 28%', '降低 42%', '降低 56%', '降低 70%'] },
          { id: 'wl_nightfall', name: '夜幕', icon: 'spell_shadow_twilight', row: 4, col: 2, max: 2, prereq: null, ranks: ['腐蚀术造成伤害时有 2% 几率使下一个暗影箭变为瞬发', '几率 4%'] },
          { id: 'wl_siphon_life', name: '生命虹吸', icon: 'spell_shadow_requiem', row: 5, col: 2, max: 1, prereq: null, ranks: ['每 3 秒吸取目标生命值并转移给施法者，持续 30 秒'] },
          { id: 'wl_death_embrace', name: '吸魂斩杀', icon: 'spell_shadow_haunting', row: 5, col: 3, max: 2, prereq: null, ranks: ['【无限服特色大招】引导吸取灵魂期间目标身上所有暗影持续伤害提高 15%，目标生命低于 25% 时伤害翻倍', '持续伤害提高 30%，目标生命低于 25% 时伤害提升 200%（三倍斩杀）'] },
          { id: 'wl_shadow_mastery', name: '暗影掌握', icon: 'spell_shadow_shadetruesight', row: 6, col: 2, max: 5, prereq: 'wl_siphon_life', ranks: ['暗影法术伤害提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'wl_dark_pact', name: '黑暗契约', icon: 'spell_shadow_darkritual', row: 7, col: 2, max: 7, prereq: null, ranks: ['从宠物身上抽取 150 点法力值转化为自身的法力值', '抽取 200 点', '抽取 250 点', '抽取 300 点', '抽取 350 点', '抽取 400 点', '抽取 450 点'] }
        ]
      },
      {
        id: 'demonology',
        name: '恶魔学识',
        skills: [
          { id: 'wl_demonic_embrace', name: '恶魔之拥', icon: 'spell_shadow_metamorphosis', row: 1, col: 3, max: 5, prereq: null, ranks: ['耐力上限提高 3%，精神降低 1%', '耐力提高 6%', '耐力提高 9%', '耐力提高 12%', '耐力提高 15%'] },
          { id: 'wl_imp_voidwalker', name: '强化虚空行者', icon: 'spell_shadow_summonvoidwalker', row: 2, col: 1, max: 3, prereq: null, ranks: ['虚空行者技能效果提高 10%', '提高 20%', '提高 30%'] },
          { id: 'wl_fel_intellect', name: '恶魔智力', icon: 'spell_holy_magicalsentry', row: 2, col: 2, max: 5, prereq: null, ranks: ['宠物法力上限提高 3%', '提高 6%', '提高 9%', '提高 12%', '提高 15%'] },
          { id: 'wl_fel_stamina', name: '恶魔耐力', icon: 'spell_shadow_antishadow', row: 3, col: 2, max: 5, prereq: null, ranks: ['宠物生命上限提高 3%', '提高 6%', '提高 9%', '提高 12%', '提高 15%'] },
          { id: 'wl_fel_domination', name: '恶魔支配', icon: 'spell_nature_removecurse', row: 3, col: 3, max: 1, prereq: null, ranks: ['使下一次召唤宠物施法时间减少 5.5 秒'] },
          { id: 'wl_master_summoner', name: '召唤大师', icon: 'spell_shadow_impsofsummoning', row: 4, col: 3, max: 2, prereq: 'wl_fel_domination', ranks: ['召唤施法减少 2 秒，法力减少 20%', '减少 4 秒，法力减少 40%'] },
          { id: 'wl_unholy_power', name: '邪恶强化', icon: 'spell_shadow_shadowworddominate', row: 5, col: 2, max: 5, prereq: null, ranks: ['宠物近战伤害提高 4%', '提高 8%', '提高 12%', '提高 16%', '提高 20%'] },
          { id: 'wl_master_demon', name: '恶魔统御', icon: 'spell_shadow_shadowpact', row: 6, col: 3, max: 5, prereq: null, ranks: ['恶魔存在时减伤与法术伤害提高 2%', '提高 4%', '提高 6%', '提高 8%', '提高 10%'] },
          { id: 'wl_soul_link', name: '灵魂链接', icon: 'spell_shadow_gathershadows', row: 7, col: 2, max: 1, prereq: 'wl_unholy_power', ranks: ['施法者受伤害的 30% 分摊给宠物，自身伤害提高 3%'] }
        ]
      },
      {
        id: 'destruction',
        name: '毁灭',
        skills: [
          { id: 'wl_imp_sb', name: '强化暗影箭', icon: 'spell_shadow_shadowbolt', row: 1, col: 2, max: 5, prereq: null, ranks: ['暗影箭暴击使下 4 次暗影伤害提高 4%', '提高 8%', '提高 12%', '提高 16%', '提高 20%'] },
          { id: 'wl_bane', name: '灾祸', icon: 'spell_shadow_deathpact', row: 2, col: 2, max: 5, prereq: null, ranks: ['暗影箭和献祭施法缩短 0.1 秒', '缩短 0.2 秒', '缩短 0.3 秒', '缩短 0.4 秒', '缩短 0.5 秒'] },
          { id: 'wl_devastation', name: '破坏', icon: 'spell_fire_flameshock', row: 3, col: 2, max: 5, prereq: null, ranks: ['毁灭系法术暴击几率提高 1%', '提高 2%', '提高 3%', '提高 4%', '提高 5%'] },
          { id: 'wl_shadowburn', name: '暗影灼烧', icon: 'spell_shadow_scourgebuild', row: 3, col: 3, max: 2, prereq: null, ranks: ['瞬发造成高额暗影伤害，消耗 1 灵魂碎片', '伤害提升 15%'] },
          { id: 'wl_dest_reach', name: '毁灭延伸', icon: 'spell_shadow_corpseexplode', row: 4, col: 1, max: 2, prereq: null, ranks: ['毁灭法术射程增加 10%', '增加 20%'] },
          { id: 'wl_ruin', name: '毁灭', icon: 'spell_shadow_shadowworddominate', row: 5, col: 2, max: 5, prereq: null, ranks: ['毁灭法术暴击伤害加成提高 20%', '提高 40%', '提高 60%', '提高 80%', '提高 100%'] }
        ]
      }
    ]
  }
};

// ==========================================
// 完整校验器
// ==========================================
let hasError = false;

for (const classKey in TALENT_DATA_60) {
  const cls = TALENT_DATA_60[classKey];
  const skillMap = {};
  
  // 校验每个技能
  for (const tree of cls.trees) {
    for (const s of tree.skills) {
      if (skillMap[s.id]) {
        console.error(`[ERROR] Class ${classKey}: Duplicate skill ID ${s.id}`);
        hasError = true;
      }
      skillMap[s.id] = s;

      if (!s.icon || typeof s.icon !== 'string') {
        console.error(`[ERROR] Class ${classKey}, Skill ${s.name}: Missing icon!`);
        hasError = true;
      }

      if (s.ranks.length !== s.max) {
        console.error(`[ERROR] Class ${classKey}, Skill ${s.name}: Ranks length ${s.ranks.length} !== max ${s.max}`);
        hasError = true;
      }
    }
  }

  // 校验前置技能
  for (const tree of cls.trees) {
    for (const s of tree.skills) {
      if (s.prereq) {
        const prereqSkill = skillMap[s.prereq];
        if (!prereqSkill) {
          console.error(`[ERROR] Class ${classKey}, Skill ${s.name}: Prereq ${s.prereq} not found!`);
          hasError = true;
        } else if (prereqSkill.row >= s.row) {
          console.error(`[ERROR] Class ${classKey}, Skill ${s.name}: Prereq ${s.prereq} row ${prereqSkill.row} >= ${s.row}`);
          hasError = true;
        }
      }
    }
  }

  // 校验所有预设
  for (const preset of cls.presets || []) {
    let ptsSum = 0;
    for (const [id, count] of Object.entries(preset.points || {})) {
      const sk = skillMap[id];
      if (!sk) {
        console.error(`[ERROR] Class ${classKey}, Preset "${preset.name}": Skill ${id} does not exist!`);
        hasError = true;
      } else {
        if (count > sk.max) {
          console.error(`[ERROR] Class ${classKey}, Preset "${preset.name}": Skill ${id} count ${count} > max ${sk.max}!`);
          hasError = true;
        }
        ptsSum += count;
      }
    }

    if (ptsSum !== 51) {
      console.error(`[ERROR] Class ${classKey}, Preset "${preset.name}": Total points = ${ptsSum} (must be 51)`);
      hasError = true;
    }
  }
}

if (hasError) {
  console.error('Validation failed! Fix errors above.');
  process.exit(1);
}

// 写入数据文件
const outputPath = path.resolve(__dirname, '../data/infinite_talents_data.js');
const fileContent = `/**
 * data/infinite_talents_data.js
 * 《魔兽世界：无限》（World of Warcraft: Forever 2026独立产品线）全职业最新权威天赋树数据库
 * 包含：
 * - 潜行者：刺杀大招【毁伤】、核心增伤【猛毒】、起手节能【蓄势待发】、开荒神技【还击】、剑刃乱舞、冲动、出血、伺机待发
 * - 战士：武器第4行新技能【刺矛打击】、防护姿态直接使用【战备冲锋】、致死打击、嗜血、盾牌猛击
 * - 圣骑士：惩戒核心特色【圣印舞】、神圣全新大招【圣光守望】、神恩术、命令圣印、王者祝福
 * - 萨满祭司：增强标志大招【漩涡武器】、专属嗜血【先知之怒】、恢复核心大招【激流】、回蓝【水之护盾】、元素【闪电过载】
 * - 猎人：生存系彻底转型【近战专精】与大招【撕裂打击】、射击新增【独来独往】、兽王新增【召唤雄鹰】
 * - 德鲁伊：平衡新增【日月之蚀】、野性新增大招【狂暴】、恢复新增大招【野性成长】、迅捷治愈、激活
 * - 法师：奥术核心大招【奥术冲击】、火焰与冰霜新增【霜火之箭】、气定神闲、寒冰护体
 * - 牧师：戒律21点高阶大招【苦修】、神圣核心群刷大招【愈合祷言】、暗影形态续航与强化精神鞭笞
 * - 术士：痛苦新增核心机制【吸魂斩杀】、灵魂链接、毁灭暴击
 * 
 * 100% 暴雪官方 Zamimg 高清图标名称、完整真实前置依赖、51 点满级权威主流加点预设
 * 自动生成于：${new Date().toISOString()}
 */

const TALENT_DATA_60 = ${JSON.stringify(TALENT_DATA_60, null, 2)};

module.exports = {
  TALENT_DATA_60
};
`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`[SUCCESS] Wrote complete talents database to ${outputPath}`);
