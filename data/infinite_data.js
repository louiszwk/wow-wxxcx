/**
 * 魔兽世界「无限服」核心数据库
 * 包含：航线与飞行NPC数据、天赋树预设、种族与职业介绍、预置许愿墙、表情包骚话库
 */

// 1. 世界地图与航线 NPC 数据库
const FLIGHT_PATHS = [
  // 联盟 - 东部王国
  {
    id: 'f1',
    zone: '暴风城',
    continent: '东部王国',
    faction: '联盟',
    npc: '邓加尔·朗喝',
    coord: '暴风城飞行点 (66.3, 62.1)',
    connections: ['铁炉堡', '西部荒野', '湖畔镇', '夜色镇', '天裔圣林']
  },
  {
    id: 'f2',
    zone: '铁炉堡',
    continent: '东部王国',
    faction: '联盟',
    npc: '格里斯·蛮鬃',
    coord: '大锻炉北部 (55.5, 47.8)',
    connections: ['暴风城', '洛克莫丹', '米奈希尔港', '南海镇', '鹰巢山']
  },
  {
    id: 'f3',
    zone: '西部荒野 (哨兵岭)',
    continent: '东部王国',
    faction: '联盟',
    npc: '索尔·金拳',
    coord: '哨兵岭营地 (56.6, 52.6)',
    connections: ['暴风城', '夜色镇']
  },
  {
    id: 'f4',
    zone: '暮色森林 (夜色镇)',
    continent: '东部王国',
    faction: '联盟',
    npc: '费尔雷·白云',
    coord: '夜色镇城镇大厅旁 (77.5, 44.3)',
    connections: ['暴风城', '湖畔镇', '哨兵岭', '反抗军营地']
  },
  {
    id: 'f5',
    zone: '南海镇',
    continent: '东部王国',
    faction: '联盟',
    npc: '达维·石须',
    coord: '希尔斯布莱德丘陵 (49.3, 52.3)',
    connections: ['铁炉堡', '避难所', '鹰巢山', '米奈希尔港']
  },

  // 部落 - 东部王国
  {
    id: 'f6',
    zone: '幽暗城',
    continent: '东部王国',
    faction: '部落',
    npc: '迈克尔·加勒特',
    coord: '蝙蝠饲养区庭院 (63.3, 48.6)',
    connections: ['亡灵壁垒', '塔伦米尔', '落锤镇', '瑟伯切尔']
  },
  {
    id: 'f7',
    zone: '塔伦米尔',
    continent: '东部王国',
    faction: '部落',
    npc: '扎拉·暗矛',
    coord: '希尔斯布莱德丘陵 (60.1, 18.6)',
    connections: ['幽暗城', '落锤镇', '复仇营地']
  },

  // 部落 - 卡利姆多
  {
    id: 'f8',
    zone: '奥格瑞玛',
    continent: '卡利姆多',
    faction: '部落',
    npc: '多拉·逐日',
    coord: '双足飞龙栖木顶部 (45.1, 63.9)',
    connections: ['十字路口', '雷霆崖', '碎木岗哨', '棘齿城', '加基森']
  },
  {
    id: 'f9',
    zone: '雷霆崖',
    continent: '卡利姆多',
    faction: '部落',
    npc: '塔拉·风暴之蹄',
    coord: '中央高地飞龙站 (46.9, 49.8)',
    connections: ['奥格瑞玛', '十字路口', '烈日石居', '乱风岗']
  },
  {
    id: 'f10',
    zone: '十字路口',
    continent: '卡利姆多',
    faction: '部落',
    npc: '德沃克·狂风',
    coord: '贫瘠之地交通枢纽 (51.5, 30.3)',
    connections: ['奥格瑞玛', '雷霆崖', '棘齿城', '乱风岗', '陶拉祖营地']
  },

  // 联盟 - 卡利姆多
  {
    id: 'f11',
    zone: '达纳苏斯',
    continent: '卡利姆多',
    faction: '联盟',
    npc: '鲁斯莱·绿叶',
    coord: '战士区角鹰兽栖木 (36.3, 45.6)',
    connections: ['鲁瑟兰村', '奥伯丁', '阿斯特兰纳', '羽月要塞']
  },
  {
    id: 'f12',
    zone: '塞拉摩岛',
    continent: '卡利姆多',
    faction: '联盟',
    npc: '芭芭拉·晨光',
    coord: '尘泥沼泽塞拉摩码头 (67.5, 51.3)',
    connections: ['加基森', '泥链镇', '避难所']
  },

  // 中立 - 争夺区
  {
    id: 'f13',
    zone: '藏宝海湾',
    continent: '东部王国',
    faction: '中立',
    npc: '格里兹·金币',
    coord: '荆棘谷黑水海盗阳台 (27.5, 77.8)',
    connections: ['暴风城', '格罗姆高', '夜色镇', '斯通纳德']
  },
  {
    id: 'f14',
    zone: '加基森',
    continent: '卡利姆多',
    faction: '中立',
    npc: '布里克·裂盔',
    coord: '塔纳利斯沙漠绿洲 (51.6, 26.8)',
    connections: ['塞拉摩', '十字路口', '塞纳里奥要塞', '乱风岗']
  },

  // 无限服全新探索区
  {
    id: 'f15',
    zone: '天裔圣林 (无限服新地图)',
    continent: '无限探索区',
    faction: '中立',
    npc: '艾露恩之使·塞蕾丝',
    coord: '星界神殿裂隙处 (42.0, 31.5)',
    connections: ['暴风城', '奥格瑞玛', '藏宝海湾', '海加尔山根']
  },
  {
    id: 'f16',
    zone: '海加尔山根·秩序遗迹',
    continent: '无限探索区',
    faction: '中立',
    npc: '诺达希尔古树之灵',
    coord: '创世石碑 (58.3, 22.4)',
    connections: ['天裔圣林', '阿斯特兰纳', '碎木岗哨']
  }
];

// 2. 种族与职业介绍数据库
const WOW_RACES = [
  // 联盟
  {
    id: 'race_celestial',
    name: '天裔精灵 (Celestial Elf)',
    faction: '联盟/无限服独占',
    factionType: 'alliance',
    badge: '无限服全新种族',
    desc: '拥有吸收星界能量与虚空折射的古老高等血统，暴雪在无限服首次开放的可选新种族。',
    traits: [
      { name: '星界折射 (主动)', desc: '瞬发，使自身进入 2 秒相位微隐，规避下一次受到的范围法术伤害，冷却 90 秒。' },
      { name: '奥能亲和 (被动)', desc: '法术伤害和暴击伤害提高 1.5%，法力值消耗降低 3%。' },
      { name: '虚空抗性 (被动)', desc: '受到的暗影与奥术伤害降低 10 点。' }
    ],
    availableClasses: ['法师', '牧师', '潜行者', '圣骑士', '战士', '术士']
  },
  {
    id: 'race_human',
    name: '人类 (Human)',
    faction: '联盟',
    factionType: 'alliance',
    badge: '经典种族',
    desc: '适应力极强的凡人种族，拥有卓越的外交才能与剑锤精通。',
    traits: [
      { name: '自利 / 感知', desc: '提高潜行侦测能力持续 20 秒，对盗贼潜行有极强反制作用。' },
      { name: '剑/锤类武器专精', desc: '单手与双手剑锤武器技能提高 5 点，极大降低偏斜伤害。' },
      { name: '外交', desc: '获得的声望提高 10%。' },
      { name: '人类精魄', desc: '精神属性提高 5%。' }
    ],
    availableClasses: ['战士', '圣骑士', '潜行者', '牧师', '法师', '术士']
  },
  {
    id: 'race_nightelf',
    name: '暗夜精灵 (Night Elf)',
    faction: '联盟',
    factionType: 'alliance',
    badge: '经典种族',
    desc: '隐居在卡利姆多古树中的卡多雷，受到月神艾露恩的庇护。',
    traits: [
      { name: '影遁 (主动)', desc: '脱离战斗后进入潜行状态，无法移动，躲避野外仇恨神技。' },
      { name: '迅捷 (被动)', desc: '躲闪几率提高 1%，提高坦克生存率。' },
      { name: '精灵之魂 (被动)', desc: '死亡后变为小精灵，跑尸移动速度提高 50%。' }
    ],
    availableClasses: ['德鲁伊', '猎人', '潜行者', '牧师', '战士']
  },
  {
    id: 'race_dwarf',
    name: '矮人 (Dwarf)',
    faction: '联盟',
    factionType: 'alliance',
    badge: '经典种族',
    desc: '来自丹莫罗大山的坚韧山丘勇士，擅长石化解毒与火枪射击。',
    traits: [
      { name: '石像形态 (主动)', desc: '解除并免疫流血、毒药与疾病效果，护甲值提高 10%，持续 8 秒。' },
      { name: '枪械专精', desc: '枪械武器技能提高 5 点。' },
      { name: '寻找财宝', desc: '小地图上标记宝箱位置。' }
    ],
    availableClasses: ['战士', '圣骑士', '猎人', '潜行者', '牧师']
  },

  // 部落
  {
    id: 'race_orc',
    name: '兽人 (Orc)',
    faction: '部落',
    factionType: 'horde',
    badge: '核心种族',
    desc: '崇尚荣耀与力量的战士氏族，萨满教义与近战斧类大师。',
    traits: [
      { name: '血性狂暴 (主动)', desc: '近战攻击强度大幅提高，爆发期必备爆发神技。' },
      { name: '坚韧 (被动)', desc: '抵抗昏迷（眩晕）几率额外提高 25%，PVP 绝对克星。' },
      { name: '斧类专精', desc: '斧类武器技能提高 5 点。' },
      { name: '命令 (被动)', desc: '宠物造成的伤害提高 5%。' }
    ],
    availableClasses: ['战士', '萨满祭司', '猎人', '潜行者', '术士']
  },
  {
    id: 'race_undead',
    name: '被遗忘者 (Undead)',
    faction: '部落',
    factionType: 'horde',
    badge: '核心种族',
    desc: '挣脱天灾军团巫妖王心智枷锁的自由亡灵，以剧毒和意志著称。',
    traits: [
      { name: '亡灵意志 (主动)', desc: '免疫并解除魅惑、恐惧与睡眠效果，PVP/团本顶级战略解控。' },
      { name: '食尸 (主动)', desc: '吞食附近的尸体恢复生命值，练级极强续航。' },
      { name: '水下呼吸', desc: '水下呼吸时间延长 300%。' }
    ],
    availableClasses: ['法师', '牧师', '潜行者', '术士', '战士']
  },
  {
    id: 'race_tauren',
    name: '牛头人 (Tauren)',
    faction: '部落',
    factionType: 'horde',
    badge: '核心种族',
    desc: '信仰大地母亲的庞大牛头人战士，莫高雷草原的和平卫士。',
    traits: [
      { name: '战争践踏 (主动)', desc: '0.5秒施法，使身边至多 5 个敌人昏迷 2 秒。' },
      { name: '坚韧 (被动)', desc: '最大生命值提高 5%，坦克最强血牛种族。' },
      { name: '草药学专精', desc: '草药学技能提高 15 点。' }
    ],
    availableClasses: ['战士', '萨满祭司', '德鲁伊', '猎人']
  },
  {
    id: 'race_troll',
    name: '巨魔 (Troll)',
    faction: '部落',
    factionType: 'horde',
    badge: '核心种族',
    desc: '敏捷狂暴的暗矛丛林部族，狂暴与巫毒再生大师。',
    traits: [
      { name: '狂暴 (主动)', desc: '生命值越低攻速与施法速度加成越高，最高提升 30% 施法/攻击急速。' },
      { name: '再生 (被动)', desc: '生命回复速度提高 10%，战斗中仍保持 10% 恢复。' },
      { name: '弓/投掷专精', desc: '弓箭武器技能提高 5 点。' }
    ],
    availableClasses: ['猎人', '萨满祭司', '法师', '牧师', '潜行者', '战士']
  }
];

// 3. 经典职业与无限服特色
const WOW_CLASSES = [
  {
    name: '战士 (Warrior)',
    role: '坦克 / 近战强力物理输出',
    icon: '⚔️',
    color: '#c79c6e',
    specs: ['武器 (斩杀致死)', '狂怒 (狂暴双持)', '防护 (盾牌格挡)'],
    infiniteFeature: '无限服强化了防护战的群嘲能力与狂怒战的暴击回怒机制，配装流派更加多样。'
  },
  {
    name: '法师 (Mage)',
    role: '远程法术输出 / 群体控场',
    icon: '🧙‍♂️',
    color: '#69ccf0',
    specs: ['奥术 (爆发输出)', '火焰 (点燃暴击)', '冰霜 (暴风雪控制)'],
    infiniteFeature: '无限服中火法点燃机制优化，冰法新增深层寒冰碎裂机制，造水与传送门依旧是团队灵魂。'
  },
  {
    name: '潜行者 (Rogue)',
    role: '近战刺杀 / 爆发控制',
    icon: '🗡️',
    color: '#fff569',
    specs: ['刺杀 (毒药流血)', '战斗 (剑专割草)', '敏锐 (暗影伏击)'],
    infiniteFeature: '连击点数获取手感平滑，战斗贼剑专风怒配合更为致命，伏击暴击毁天灭地。'
  },
  {
    name: '牧师 (Priest)',
    role: '全能治疗 / 暗影法术输出',
    icon: '✨',
    color: '#ffffff',
    specs: ['戒律 (吸收护盾)', '神圣 (群体治疗)', '暗影 (心控痛触)'],
    infiniteFeature: '矮人不再独占反恐结界！全种族牧师获得特化祝福，暗牧蓝耗大幅改善。'
  },
  {
    name: '圣骑士 (Paladin)',
    role: '板甲治疗 / 坦克 / 近战输出',
    icon: '🛡️',
    color: '#f58cba',
    specs: ['神圣 (圣光闪烁)', '防护 (正义防御)', '惩戒 (圣印宣判)'],
    infiniteFeature: '无限服大幅强化防骑嘲讽与仇恨机制，惩戒骑获得稳定回蓝圣印，真正实现三系开花。'
  },
  {
    name: '德鲁伊 (Druid)',
    role: '四系全能 / 潜行形态切换',
    icon: '🌱',
    color: '#ff7d0a',
    specs: ['平衡 (星涌月火)', '野性 (猫德/熊德)', '恢复 (回春绽放)'],
    infiniteFeature: '无限服解除熊德装备限制，猫德输出循环简化，战复与激活依旧是团队王牌。'
  },
  {
    name: '萨满祭司 (Shaman)',
    role: '图腾辅助 / 元素法系 / 增强近战 / 链条治疗',
    icon: '⚡',
    color: '#0070de',
    specs: ['元素 (闪电链)', '增强 (风怒打击)', '恢复 (治疗链)'],
    infiniteFeature: '风怒图腾与嗜血/英勇加成优化，增强萨双手/双持自由切换，治疗链依旧是团补天花板。'
  },
  {
    name: '猎人 (Hunter)',
    role: '远程物理 / 野兽控制 / 陷阱牵制',
    icon: '🏹',
    color: '#abd473',
    specs: ['野兽控制 (宝宝狂暴)', '射击 (瞄准射击)', '生存 (近战/陷阱)'],
    infiniteFeature: '弹药袋容量扩增，近战生存猎特色专精重磅魔改，凝神射击依旧是团队刚需。'
  },
  {
    name: '术士 (Warlock)',
    role: '持续伤害 (DOT) / 恶魔召唤 / 灵魂石',
    icon: '💀',
    color: '#9482c9',
    specs: ['痛苦 (腐蚀诅咒)', '恶魔学识 (恶魔契约)', '毁灭 (暗影箭雨)'],
    infiniteFeature: '灵魂碎片背包机制优化，拉人召唤门法阵效率大幅提高，暗毁流输出依旧稳坐第一梯队。'
  }
];

// 4. 真实60级经典怀旧服 7 层天赋树数据库 (行 Row 1-7, 列 Col 1-4, 51点满级上限)
const TALENT_DATA_60 = {
  warrior: {
    name: '战士',
    icon: '⚔️',
    presets: [
      { name: '狂暴战 (17/34/0)', desc: '团本极限近战物理DPS输出天花板', points: { w_deflect: 5, w_rend: 0, w_tactical: 5, w_deepwounds: 3, w_impale: 2, f_cruelty: 5, f_unbridled: 5, f_battleshout: 5, f_enrage: 5, f_flurry: 5, f_bloodbath: 1, f_dualwield: 5, f_berserker: 3 } },
      { name: '武器致死战 (31/20/0)', desc: 'PVP与战场压制/致死打击减疗核心', points: { w_deflect: 5, w_rend: 3, w_tactical: 5, w_overpower: 2, w_deepwounds: 3, w_impale: 2, w_axespec: 5, w_sweeping: 1, w_mortal: 1, w_twohand: 4, f_cruelty: 5, f_unbridled: 5, f_battleshout: 5, f_enrage: 5 } },
      { name: '团本防战 (11/5/35)', desc: '团队副本主T核心扛怪与盾牌格挡仇恨流', points: { w_deflect: 5, w_tactical: 5, w_anger: 1, f_cruelty: 5, p_shieldspec: 5, p_anticipation: 5, p_toughness: 5, p_laststand: 1, p_defiance: 5, p_sunder: 3, p_taunt: 2, p_concussion: 1, p_onehand: 5, p_shieldslam: 1 } }
    ],
    trees: [
      {
        id: 'arms',
        name: '武器 (Arms)',
        skills: [
          { id: 'w_deflect', name: '偏斜', icon: '🛡️', row: 1, col: 2, max: 5, prereq: null, ranks: ['招架几率提高 1%', '招架几率提高 2%', '招架几率提高 3%', '招架几率提高 4%', '招架几率提高 5%'] },
          { id: 'w_rend', name: '强化撕裂', icon: '🩸', row: 1, col: 3, max: 3, prereq: null, ranks: ['撕裂伤害提高 15%', '撕裂伤害提高 25%', '撕裂伤害提高 35%'] },
          { id: 'w_tactical', name: '战术掌握', icon: '⚔️', row: 2, col: 2, max: 5, prereq: null, ranks: ['切换姿态时保留最多 5 点怒气', '切换姿态时保留最多 10 点怒气', '切换姿态时保留最多 15 点怒气', '切换姿态时保留最多 20 点怒气', '切换姿态时保留最多 25 点怒气'] },
          { id: 'w_overpower', name: '强化压制', icon: '⚡', row: 2, col: 3, max: 2, prereq: null, ranks: ['压制暴击几率提高 25%', '压制暴击几率提高 50%'] },
          { id: 'w_anger', name: '愤怒掌控', icon: '🔥', row: 3, col: 1, max: 1, prereq: null, ranks: ['使你的怒气流失速度降低，并在战斗外每3秒生成1点怒气'] },
          { id: 'w_deepwounds', name: '重伤', icon: '💥', row: 3, col: 3, max: 3, prereq: 'w_rend', ranks: ['暴击在12秒内造成武器平均伤害的 20% 流血', '暴击在12秒内造成武器平均伤害的 40% 流血', '暴击在12秒内造成武器平均伤害的 60% 流血'] },
          { id: 'w_twohand', name: '双手武器专精', icon: '🗡️', row: 4, col: 1, max: 5, prereq: null, ranks: ['双手近战武器伤害提高 1%', '双手近战武器伤害提高 2%', '双手近战武器伤害提高 3%', '双手近战武器伤害提高 4%', '双手近战武器伤害提高 5%'] },
          { id: 'w_impale', name: '穿刺', icon: '🎯', row: 4, col: 3, max: 2, prereq: 'w_deepwounds', ranks: ['技能攻击暴击伤害加成提高 10%', '技能攻击暴击伤害加成提高 20%'] },
          { id: 'w_axespec', name: '斧类武器专精', icon: '🪓', row: 5, col: 1, max: 5, prereq: null, ranks: ['斧类武器暴击几率提高 1%', '斧类武器暴击几率提高 2%', '斧类武器暴击几率提高 3%', '斧类武器暴击几率提高 4%', '斧类武器暴击几率提高 5%'] },
          { id: 'w_sweeping', name: '横扫攻击', icon: '🌪️', row: 5, col: 2, max: 1, prereq: null, ranks: ['接下来的 5 次近战攻击将同时击中额外的 1 个临近目标'] },
          { id: 'w_mortal', name: '致死打击', icon: '☠️', row: 7, col: 2, max: 1, prereq: 'w_sweeping', ranks: ['瞬发打击造成武器伤害+85点，并使目标受到的治疗降低50%，持续10秒'] }
        ]
      },
      {
        id: 'fury',
        name: '狂怒 (Fury)',
        skills: [
          { id: 'f_cruelty', name: '残忍', icon: '🔥', row: 1, col: 3, max: 5, prereq: null, ranks: ['近战暴击几率提高 1%', '近战暴击几率提高 2%', '近战暴击几率提高 3%', '近战暴击几率提高 4%', '近战暴击几率提高 5%'] },
          { id: 'f_unbridled', name: '怒不可遏', icon: '⚡', row: 2, col: 2, max: 5, prereq: null, ranks: ['击中敌人有几率获得 1 点额外怒气', '击中敌人有较高几率获得 1 点额外怒气', '击中敌人有更大几率获得 1 点额外怒气', '击中敌人有极高几率获得 1 点额外怒气', '每次近战命中几乎必定获得 1 点额外怒气'] },
          { id: 'f_battleshout', name: '强化战斗怒吼', icon: '📢', row: 2, col: 3, max: 5, prereq: null, ranks: ['战斗怒吼攻击强度加成提高 5%', '战斗怒吼攻击强度加成提高 10%', '战斗怒吼攻击强度加成提高 15%', '战斗怒吼攻击强度加成提高 20%', '战斗怒吼攻击强度加成提高 25%'] },
          { id: 'f_dualwield', name: '双武器专精', icon: '⚔️', row: 4, col: 1, max: 5, prereq: null, ranks: ['副手武器伤害提高 10%', '副手武器伤害提高 15%', '副手武器伤害提高 20%', '副手武器伤害提高 25%', '副手武器伤害提高 30%'] },
          { id: 'f_enrage', name: '激怒', icon: '😡', row: 4, col: 3, max: 5, prereq: null, ranks: ['受到致命暴击后近战伤害提高 5%', '受到致命暴击后近战伤害提高 10%', '受到致命暴击后近战伤害提高 15%', '受到致命暴击后近战伤害提高 20%', '受到致命暴击后近战伤害提高 25%'] },
          { id: 'f_flurry', name: '乱击', icon: '🌪️', row: 5, col: 2, max: 5, prereq: 'f_enrage', ranks: ['打出暴击后下 3 次攻击速度提高 10%', '打出暴击后下 3 次攻击速度提高 15%', '打出暴击后下 3 次攻击速度提高 20%', '打出暴击后下 3 次攻击速度提高 25%', '打出暴击后下 3 次攻击速度提高 30%'] },
          { id: 'f_berserker', name: '狂暴姿态专精', icon: '🦁', row: 6, col: 2, max: 5, prereq: null, ranks: ['狂暴姿态暴击几率提高 1%', '狂暴姿态暴击几率提高 2%', '狂暴姿态暴击几率提高 3%', '狂暴姿态暴击几率提高 4%', '狂暴姿态暴击几率提高 5%'] },
          { id: 'f_bloodbath', name: '嗜血', icon: '🩸', row: 7, col: 2, max: 1, prereq: 'f_flurry', ranks: ['立刻攻击目标造成基于攻强的高额物理伤害，后续5次命中为自身恢复生命值'] }
        ]
      },
      {
        id: 'protection',
        name: '防护 (Protection)',
        skills: [
          { id: 'p_shieldspec', name: '盾牌专精', icon: '🛡️', row: 1, col: 2, max: 5, prereq: null, ranks: ['格挡几率提高 1%，成功格挡获得怒气', '格挡几率提高 2%，成功格挡获得怒气', '格挡几率提高 3%，成功格挡获得怒气', '格挡几率提高 4%，成功格挡获得怒气', '格挡几率提高 5%，成功格挡获得怒气'] },
          { id: 'p_anticipation', name: '预知', icon: '👁️', row: 1, col: 3, max: 5, prereq: null, ranks: ['防御技能提高 2 点', '防御技能提高 4 点', '防御技能提高 6 点', '防御技能提高 8 点', '防御技能提高 10 点'] },
          { id: 'p_toughness', name: '坚韧', icon: '🧱', row: 2, col: 3, max: 5, prereq: null, ranks: ['装备护甲值提高 2%', '装备护甲值提高 4%', '装备护甲值提高 6%', '装备护甲值提高 8%', '装备护甲值提高 10%'] },
          { id: 'p_laststand', name: '破釜沉舟', icon: '❤️', row: 3, col: 1, max: 1, prereq: 'p_shieldspec', ranks: ['激活后立刻获得 30% 生命上限，持续 20 秒，冷却 10 分钟'] },
          { id: 'p_defiance', name: '挑衅', icon: '💢', row: 3, col: 2, max: 5, prereq: null, ranks: ['防御姿态下的仇恨值提高 3%', '防御姿态下的仇恨值提高 6%', '防御姿态下的仇恨值提高 9%', '防御姿态下的仇恨值提高 12%', '防御姿态下的仇恨值提高 15%'] },
          { id: 'p_sunder', name: '强化破甲', icon: '🔨', row: 4, col: 2, max: 3, prereq: null, ranks: ['破甲攻击消耗的怒气减少 1 点', '破甲攻击消耗的怒气减少 2 点', '破甲攻击消耗的怒气减少 3 点'] },
          { id: 'p_taunt', name: '强化嘲讽', icon: '🔔', row: 4, col: 3, max: 2, prereq: null, ranks: ['嘲讽冷却时间减少 1 秒', '嘲讽冷却时间减少 2 秒'] },
          { id: 'p_concussion', name: '震荡猛击', icon: '💫', row: 5, col: 2, max: 1, prereq: null, ranks: ['重击使目标昏迷 5 秒'] },
          { id: 'p_onehand', name: '单手武器专精', icon: '🗡️', row: 6, col: 3, max: 5, prereq: null, ranks: ['单手物理武器造成的伤害提高 2%', '单手物理武器造成的伤害提高 4%', '单手物理武器造成的伤害提高 6%', '单手物理武器造成的伤害提高 8%', '单手物理武器造成的伤害提高 10%'] },
          { id: 'p_shieldslam', name: '盾牌猛击', icon: '💥', row: 7, col: 2, max: 1, prereq: 'p_concussion', ranks: ['用盾牌猛击目标，造成巨大仇恨和伤害，并有50%几率驱散目标1个有益魔法'] }
        ]
      }
    ]
  },
  mage: {
    name: '法师',
    icon: '🧙‍♂️',
    presets: [
      { name: '深冰控场练级 (17/0/34)', desc: '开荒练级、单刷副本、冰环暴风雪AOE神级配置', points: { m_focus: 5, m_mind: 5, m_clearcast: 1, m_frostbolt: 5, m_icebite: 3, m_frostbite: 3, m_permafrost: 3, m_iceblock: 1, m_shatter: 5, m_icebarrier: 1 } },
      { name: '火法团本输出 (17/31/3)', desc: '大后期黑翼之巢/安其拉暴击点燃融化BOSS主流', points: { m_focus: 5, m_mind: 5, m_clearcast: 1, m_ignite: 5, m_fireblast: 3, m_pyroblast: 1, m_burn: 5, m_crit: 5, m_combustion: 1, m_elemental: 3 } }
    ],
    trees: [
      {
        id: 'arcane',
        name: '奥术 (Arcane)',
        skills: [
          { id: 'm_subtle', name: '奥术精妙', icon: '🔮', row: 1, col: 1, max: 2, prereq: null, ranks: ['奥术法术造成的仇恨降低 20%，目标法术抗性降低 5 点', '奥术法术造成的仇恨降低 40%，目标法术抗性降低 10 点'] },
          { id: 'm_focus', name: '奥术专注', icon: '✨', row: 1, col: 2, max: 5, prereq: null, ranks: ['有 2% 几率进入节能施法状态', '有 4% 几率进入节能施法状态', '有 6% 几率进入节能施法状态', '有 8% 几率进入节能施法状态', '有 10% 几率进入节能施法状态'] },
          { id: 'm_mind', name: '奥术心智', icon: '🧠', row: 3, col: 2, max: 5, prereq: null, ranks: ['智力上限提高 3%', '智力上限提高 6%', '智力上限提高 9%', '智力上限提高 12%', '智力上限提高 15%'] },
          { id: 'm_clearcast', name: '气定神闲', icon: '🌟', row: 5, col: 2, max: 1, prereq: 'm_mind', ranks: ['激活后使下一个耗时小于10秒的法术变为瞬发法术'] },
          { id: 'm_power', name: '奥术强化', icon: '⚡', row: 7, col: 2, max: 1, prereq: 'm_clearcast', ranks: ['法术伤害提高 30%，但法力消耗提高 30%，持续 15 秒'] }
        ]
      },
      {
        id: 'fire',
        name: '火焰 (Fire)',
        skills: [
          { id: 'm_impact', name: '冲击', icon: '💥', row: 1, col: 2, max: 5, prereq: null, ranks: ['火焰法术有 2% 几率昏迷目标 2 秒', '火焰法术有 4% 几率昏迷目标 2 秒', '火焰法术有 6% 几率昏迷目标 2 秒', '火焰法术有 8% 几率昏迷目标 2 秒', '火焰法术有 10% 几率昏迷目标 2 秒'] },
          { id: 'm_ignite', name: '点燃', icon: '🔥', row: 1, col: 3, max: 5, prereq: null, ranks: ['火系法术暴击后，在4秒内造成额外 8% 伤害', '火系法术暴击后，在4秒内造成额外 16% 伤害', '火系法术暴击后，在4秒内造成额外 24% 伤害', '火系法术暴击后，在4秒内造成额外 32% 伤害', '火系法术暴击后，在4秒内造成额外 40% 伤害'] },
          { id: 'm_fireblast', name: '强化火焰冲击', icon: '☄️', row: 2, col: 1, max: 3, prereq: null, ranks: ['火焰冲击冷却时间减少 0.5 秒', '火焰冲击冷却时间减少 1.0 秒', '火焰冲击冷却时间减少 1.5 秒'] },
          { id: 'm_pyroblast', name: '炎爆术', icon: '🌋', row: 3, col: 2, max: 1, prereq: null, ranks: ['发射巨大的炽热火球，造成极高直接火焰伤害与12秒持续灼烧'] },
          { id: 'm_burn', name: '炽热狂暴', icon: '🧨', row: 4, col: 2, max: 5, prereq: null, ranks: ['火焰法术对生命值低于20%的目标造成的伤害提高 10%', '火焰法术对生命值低于20%的目标造成的伤害提高 20%'] },
          { id: 'm_crit', name: '致命偷袭', icon: '🎯', row: 5, col: 3, max: 5, prereq: 'm_ignite', ranks: ['火系法术暴击几率提高 2%', '火系法术暴击几率提高 4%', '火系法术暴击几率提高 6%'] },
          { id: 'm_combustion', name: '燃烧', icon: '🔥', row: 7, col: 2, max: 1, prereq: 'm_pyroblast', ranks: ['激活后使你的火焰法术暴击几率逐步递增直至连续3次暴击'] }
        ]
      },
      {
        id: 'frost',
        name: '冰霜 (Frost)',
        skills: [
          { id: 'm_frostbolt', name: '强化寒冰箭', icon: '❄️', row: 1, col: 2, max: 5, prereq: null, ranks: ['寒冰箭施法时间减少 0.1 秒', '寒冰箭施法时间减少 0.2 秒', '寒冰箭施法时间减少 0.3 秒', '寒冰箭施法时间减少 0.4 秒', '寒冰箭施法时间减少 0.5 秒'] },
          { id: 'm_icebite', name: '极寒冰霜', icon: '🧊', row: 1, col: 3, max: 3, prereq: null, ranks: ['减速效果持续时间延长 1 秒', '减速效果持续时间延长 2 秒', '减速效果持续时间延长 3 秒'] },
          { id: 'm_frostbite', name: '霜寒刺骨', icon: '🥶', row: 2, col: 1, max: 3, prereq: null, ranks: ['冻结几率提高 5%', '冻结几率提高 10%', '冻结几率提高 15%'] },
          { id: 'm_permafrost', name: '强化暴风雪', icon: '🌨️', row: 3, col: 1, max: 3, prereq: null, ranks: ['暴风雪减速效果提高 30%', '暴风雪减速效果提高 50%', '暴风雪减速效果提高 65%'] },
          { id: 'm_iceblock', name: '寒冰屏障', icon: '🧊', row: 3, col: 3, max: 1, prereq: null, ranks: ['把你封进寒冰之中，10秒内免疫一切物理与法术伤害，但无法移动和施法'] },
          { id: 'm_shatter', name: '碎冰', icon: '💎', row: 4, col: 3, max: 5, prereq: 'm_iceblock', ranks: ['对处于冰冻状态的目标法术暴击几率提高 10%', '对处于冰冻状态的目标法术暴击几率提高 20%', '对处于冰冻状态的目标法术暴击几率提高 30%', '对处于冰冻状态的目标法术暴击几率提高 40%', '对处于冰冻状态的目标法术暴击几率提高 50%'] },
          { id: 'm_icebarrier', name: '寒冰护体', icon: '🛡️', row: 7, col: 2, max: 1, prereq: 'm_shatter', ranks: ['瞬发冰霜护盾吸收大量伤害，吸收期间施法不会因受到攻击而打退'] }
        ]
      }
    ]
  },
  rogue: {
    name: '潜行者',
    icon: '🗡️',
    presets: [
      { name: '战斗剑贼 (19/32/0)', desc: '经典60级副本割草DPS第一梯队剑刃乱舞冲动流', points: { r_malice: 5, r_lethality: 5, r_imp_sinister: 2, r_blade_flurry: 1, r_weapon_exp: 2, r_sword_spec: 5, r_adrenaline: 1 } },
      { name: '冷血出血敏锐贼 (21/3/27)', desc: '野外单挑与战场单杀伏击瞬秒冷血剔骨流', points: { r_malice: 5, r_coldblood: 1, r_opportunity: 5, r_prep: 1, r_hemo: 1 } }
    ],
    trees: [
      {
        id: 'assassination',
        name: '刺杀 (Assassination)',
        skills: [
          { id: 'r_malice', name: '恶意', icon: '🩸', row: 1, col: 2, max: 5, prereq: null, ranks: ['暴击几率提高 1%', '暴击几率提高 2%', '暴击几率提高 3%', '暴击几率提高 4%', '暴击几率提高 5%'] },
          { id: 'r_eviscerate', name: '强化剔骨', icon: '🗡️', row: 1, col: 3, max: 3, prereq: null, ranks: ['剔骨伤害提高 5%', '剔骨伤害提高 10%', '剔骨伤害提高 15%'] },
          { id: 'r_lethality', name: '致命偷袭', icon: '🎯', row: 3, col: 3, max: 5, prereq: 'r_malice', ranks: ['刺杀技能暴击伤害提高 6%', '刺杀技能暴击伤害提高 12%', '刺杀技能暴击伤害提高 18%', '刺杀技能暴击伤害提高 24%', '刺杀技能暴击伤害提高 30%'] },
          { id: 'r_coldblood', name: '冷血', icon: '❄️', row: 5, col: 2, max: 1, prereq: null, ranks: ['激活后使你的下一次邪恶攻击、背刺或剔骨暴击几率提高 100%'] },
          { id: 'r_vigor', name: '精力', icon: '⚡', row: 7, col: 2, max: 1, prereq: null, ranks: ['使你的能量上限提高 10 点'] }
        ]
      },
      {
        id: 'combat',
        name: '战斗 (Combat)',
        skills: [
          { id: 'r_imp_sinister', name: '强化邪恶攻击', icon: '⚔️', row: 1, col: 2, max: 2, prereq: null, ranks: ['邪恶攻击能量消耗降低 3 点', '邪恶攻击能量消耗降低 5 点'] },
          { id: 'r_deflection', name: '偏斜', icon: '🛡️', row: 1, col: 3, max: 5, prereq: null, ranks: ['招架几率提高 1%', '招架几率提高 2%', '招架几率提高 3%', '招架几率提高 4%', '招架几率提高 5%'] },
          { id: 'r_blade_flurry', name: '剑刃乱舞', icon: '🌪️', row: 3, col: 2, max: 1, prereq: null, ranks: ['攻击速度提高 20%，且攻击将同时攻击附近的额外 1 个目标，持续 15 秒'] },
          { id: 'r_sword_spec', name: '剑类武器专精', icon: '🗡️', row: 5, col: 3, max: 5, prereq: null, ranks: ['剑类武器命中后有 1% 几率额外攻击一次', '剑类武器命中后有 2% 几率额外攻击一次', '剑类武器命中后有 3% 几率额外攻击一次', '剑类武器命中后有 4% 几率额外攻击一次', '剑类武器命中后有 5% 几率额外攻击一次'] },
          { id: 'r_weapon_exp', name: '武器大师', icon: '👑', row: 5, col: 1, max: 2, prereq: null, ranks: ['单手剑、匕首和拳套技能提高 3 点', '单手剑、匕首和拳套技能提高 5 点'] },
          { id: 'r_adrenaline', name: '冲动', icon: '⚡', row: 7, col: 2, max: 1, prereq: 'r_blade_flurry', ranks: ['能量恢复速度提高 100%，持续 15 秒'] }
        ]
      },
      {
        id: 'subtlety',
        name: '敏锐 (Subtlety)',
        skills: [
          { id: 'r_opportunity', name: '伺机而动', icon: '👁️', row: 1, col: 2, max: 5, prereq: null, ranks: ['背刺、绞喉和伏击伤害提高 4%', '背刺、绞喉和伏击伤害提高 8%', '背刺、绞喉和伏击伤害提高 12%', '背刺、绞喉和伏击伤害提高 16%', '背刺、绞喉和伏击伤害提高 20%'] },
          { id: 'r_initiative', name: '先发制人', icon: '🏃', row: 2, col: 3, max: 3, prereq: null, ranks: ['伏击、绞喉有 25% 几率额外获得 1 个连击点', '伏击、绞喉有 50% 几率额外获得 1 个连击点', '伏击、绞喉有 75% 几率额外获得 1 个连击点'] },
          { id: 'r_prep', name: '伺机待发', icon: '🔄', row: 3, col: 3, max: 1, prereq: null, ranks: ['激活后立刻结束潜行、闪避、消失、疾跑、致盲和冷血的冷却时间'] },
          { id: 'r_hemo', name: '出血', icon: '🩸', row: 5, col: 3, max: 1, prereq: 'r_prep', ranks: ['瞬发打击目标造成伤害并施加减益，使目标受到的下30次物理伤害提升'] }
        ]
      }
    ]
  },
  priest: {
    name: '牧师',
    icon: '✨',
    presets: [
      { name: '神圣戒律团补 (26/25/0)', desc: '团队副本主力治疗、能量灌注与快速抬血', points: { p_unbreakable: 5, p_meditation: 3, p_innerfocus: 1, p_infusion: 1, p_healingfocus: 2, p_renew: 3, p_holycare: 5, p_divinespirit: 1 } },
      { name: '暗影暗牧输出 (14/0/37)', desc: '暗影交织易伤辅助与持续心爆输出', points: { p_unbreakable: 5, p_innerfocus: 1, s_spiritapoc: 5, s_shadowweav: 5, s_silence: 1, s_vampiric: 1, s_shadowform: 1 } }
    ],
    trees: [
      {
        id: 'discipline',
        name: '戒律 (Discipline)',
        skills: [
          { id: 'p_unbreakable', name: '坚定意志', icon: '🛡️', row: 1, col: 2, max: 5, prereq: null, ranks: ['抵抗昏迷、恐惧和沉默几率提高 3%', '抵抗昏迷、恐惧和沉默几率提高 6%', '抵抗昏迷、恐惧和沉默几率提高 9%', '抵抗昏迷、恐惧和沉默几率提高 12%', '抵抗昏迷、恐惧和沉默几率提高 15%'] },
          { id: 'p_meditation', name: '冥想', icon: '🧘', row: 3, col: 2, max: 3, prereq: null, ranks: ['施法时保持 5% 的法力回复速度', '施法时保持 10% 的法力回复速度', '施法时保持 15% 的法力回复速度'] },
          { id: 'p_innerfocus', name: '心灵专注', icon: '🧠', row: 3, col: 3, max: 1, prereq: null, ranks: ['激活后下一个法术法力消耗减少 100%，暴击几率提高 25%'] },
          { id: 'p_infusion', name: '能量灌注', icon: '⚡', row: 7, col: 2, max: 1, prereq: 'p_meditation', ranks: ['给目标注入能量，法术伤害和治疗效果提高 20%，持续 15 秒'] }
        ]
      },
      {
        id: 'holy',
        name: '神圣 (Holy)',
        skills: [
          { id: 'p_healingfocus', name: '治疗专注', icon: '🌱', row: 1, col: 2, max: 2, prereq: null, ranks: ['施法受打退几率降低 35%', '施法受打退几率降低 70%'] },
          { id: 'p_renew', name: '强化恢复', icon: '💧', row: 1, col: 3, max: 3, prereq: null, ranks: ['恢复治疗效果提高 5%', '恢复治疗效果提高 10%', '恢复治疗效果提高 15%'] },
          { id: 'p_holycare', name: '神圣专精', icon: '✨', row: 3, col: 2, max: 5, prereq: null, ranks: ['神圣法术暴击几率提高 1%', '神圣法术暴击几率提高 2%', '神圣法术暴击几率提高 3%', '神圣法术暴击几率提高 4%', '神圣法术暴击几率提高 5%'] },
          { id: 'p_divinespirit', name: '神圣之灵', icon: '🕊️', row: 5, col: 2, max: 1, prereq: null, ranks: ['为目标施加神圣祝福，精神总值提高 40 点，持续 30 分钟'] },
          { id: 'p_lightwell', name: '光明泉', icon: '⛲', row: 7, col: 2, max: 1, prereq: 'p_divinespirit', ranks: ['召唤神圣光明泉，友方点击可获得大量生命回复'] }
        ]
      },
      {
        id: 'shadow',
        name: '暗影 (Shadow)',
        skills: [
          { id: 's_spiritapoc', name: '精神分流', icon: '💀', row: 1, col: 2, max: 5, prereq: null, ranks: ['击杀目标后精神提高 20%，法力恢复速度提高 20%', '击杀目标后精神提高 40%，法力恢复速度提高 40%', '击杀目标后精神提高 60%，法力恢复速度提高 60%', '击杀目标后精神提高 80%，法力恢复速度提高 80%', '击杀目标后精神提高 100%，法力恢复速度提高 100%'] },
          { id: 's_shadowweav', name: '暗影交织', icon: '🌑', row: 3, col: 2, max: 5, prereq: null, ranks: ['暗影法术击中有 20% 几率使目标承受暗影易伤', '暗影法术击中有 40% 几率使目标承受暗影易伤', '暗影法术击中有 60% 几率使目标承受暗影易伤', '暗影法术击中有 80% 几率使目标承受暗影易伤', '暗影法术必定使目标承受暗影伤害提高 15%'] },
          { id: 's_silence', name: '沉默', icon: '🤐', row: 4, col: 1, max: 1, prereq: null, ranks: ['使目标沉默 5 秒，无法施法'] },
          { id: 's_vampiric', name: '吸血鬼的拥抱', icon: '🧛', row: 5, col: 2, max: 1, prereq: null, ranks: ['使你的暗影法术造成的单体伤害的 20% 转化为对全队的治疗'] },
          { id: 's_shadowform', name: '暗影形态', icon: '👤', row: 7, col: 2, max: 1, prereq: 's_vampiric', ranks: ['变身暗影形态，暗影伤害提高 15%，受到的物理伤害减少 15%'] }
        ]
      }
    ]
  },
  paladin: {
    name: '圣骑士',
    icon: '🛡️',
    presets: [
      { name: '神圣奶骑 (31/20/0)', desc: '团本常驻主坦刷血单加之王神圣震击流', points: { pl_int: 5, pl_focus: 5, pl_illum: 5, pl_shock: 1, pl_redoubt: 5, pl_tough: 5, pl_blessprot: 1 } },
      { name: '惩戒暴击 (11/8/32)', desc: '近战圣印裁决爆发与命令圣印致死流', points: { pl_int: 5, pl_bene: 5, pl_conviction: 5, pl_sealofcmd: 1, pl_vengeance: 5, pl_rep: 1 } }
    ],
    trees: [
      {
        id: 'holy',
        name: '神圣 (Holy)',
        skills: [
          { id: 'pl_int', name: '神圣智慧', icon: '🧠', row: 1, col: 3, max: 5, prereq: null, ranks: ['智力上限提高 2%', '智力上限提高 4%', '智力上限提高 6%', '智力上限提高 8%', '智力上限提高 10%'] },
          { id: 'pl_focus', name: '精神集中', icon: '✨', row: 2, col: 2, max: 5, prereq: null, ranks: ['施法受打退几率降低 14%', '施法受打退几率降低 28%', '施法受打退几率降低 42%', '施法受打退几率降低 56%', '施法受打退几率降低 70%'] },
          { id: 'pl_illum', name: '启发', icon: '💡', row: 3, col: 2, max: 5, prereq: null, ranks: ['治疗法术打出暴击后，恢复 20% 基础法力值', '治疗法术打出暴击后，恢复 40% 基础法力值', '治疗法术打出暴击后，恢复 60% 基础法力值', '治疗法术打出暴击后，恢复 80% 基础法力值', '治疗法术打出暴击后，恢复 100% 基础法力值'] },
          { id: 'pl_shock', name: '神圣震击', icon: '⚡', row: 7, col: 2, max: 1, prereq: 'pl_illum', ranks: ['瞬发神圣法术，立即治疗友军或对敌人造成神圣伤害'] }
        ]
      },
      {
        id: 'protection',
        name: '防护 (Protection)',
        skills: [
          { id: 'pl_redoubt', name: '盾牌壁垒', icon: '🛡️', row: 1, col: 2, max: 5, prereq: null, ranks: ['遭受暴击后格挡几率提高 6%', '遭受暴击后格挡几率提高 12%', '遭受暴击后格挡几率提高 18%', '遭受暴击后格挡几率提高 24%', '遭受暴击后格挡几率提高 30%'] },
          { id: 'pl_tough', name: '坚韧', icon: '🧱', row: 2, col: 3, max: 5, prereq: null, ranks: ['护甲值提高 2%', '护甲值提高 4%', '护甲值提高 6%', '护甲值提高 8%', '护甲值提高 10%'] },
          { id: 'pl_blessprot', name: '庇护祝福', icon: '🏰', row: 3, col: 2, max: 1, prereq: null, ranks: ['减少目标受到的所有伤害，并在格挡时反弹神圣伤害'] },
          { id: 'pl_shield', name: '神圣之盾', icon: '🛡️', row: 7, col: 2, max: 1, prereq: 'pl_blessprot', ranks: ['格挡几率提高 30%，格挡时造成神圣伤害仇恨'] }
        ]
      },
      {
        id: 'retribution',
        name: '惩戒 (Retribution)',
        skills: [
          { id: 'pl_bene', name: '祈福', icon: '🙏', row: 1, col: 2, max: 5, prereq: null, ranks: ['审判和圣印法力消耗降低 3%', '审判和圣印法力消耗降低 6%', '审判和圣印法力消耗降低 9%', '审判和圣印法力消耗降低 12%', '审判和圣印法力消耗降低 15%'] },
          { id: 'pl_sealofcmd', name: '命令圣印', icon: '👑', row: 3, col: 2, max: 1, prereq: null, ranks: ['普攻有几率打出基于武器伤害 70% 的神圣伤害宣判'] },
          { id: 'pl_conviction', name: '定罪', icon: '⚔️', row: 3, col: 3, max: 5, prereq: null, ranks: ['近战武器暴击几率提高 1%', '近战武器暴击几率提高 2%', '近战武器暴击几率提高 3%', '近战武器暴击几率提高 4%', '近战武器暴击几率提高 5%'] },
          { id: 'pl_vengeance', name: '复仇', icon: '🔥', row: 5, col: 2, max: 5, prereq: 'pl_conviction', ranks: ['物理或神圣暴击后，伤害提高 3%', '物理或神圣暴击后，伤害提高 6%', '物理或神圣暴击后，伤害提高 9%', '物理或神圣暴击后，伤害提高 12%', '物理或神圣暴击后，伤害提高 15%'] },
          { id: 'pl_rep', name: '忏悔', icon: '🕊️', row: 7, col: 2, max: 1, prereq: 'pl_vengeance', ranks: ['使人形目标瘫痪最多 6 秒，任何伤害都会打断'] }
        ]
      }
    ]
  },
  hunter: {
    name: '猎人',
    icon: '🏹',
    presets: [
      { name: '射击团本输出 (20/31/0)', desc: '远程物理持续输出、瞄准射击多重循环天花板', points: { h_lethal: 5, h_aimed: 1, h_ranged_spec: 5, h_trueshot: 1, h_thickhide: 3, h_frenzy: 5 } },
      { name: '野兽狂暴练级 (31/20/0)', desc: '宠物扛怪单刷狂暴无敌、野外练级最安逸流派', points: { h_thickhide: 3, h_beastswift: 2, h_ferocity: 5, h_intimidate: 1, h_frenzy: 5, h_wrath: 1, h_aimed: 1 } }
    ],
    trees: [
      {
        id: 'beastmastery',
        name: '野兽控制 (Beast)',
        skills: [
          { id: 'h_thickhide', name: '厚皮', icon: '🐾', row: 2, col: 2, max: 3, prereq: null, ranks: ['宠物护甲提高 10%', '宠物护甲提高 20%', '宠物护甲提高 30%'] },
          { id: 'h_ferocity', name: '凶暴', icon: '🦁', row: 3, col: 2, max: 5, prereq: null, ranks: ['宠物暴击几率提高 2%', '宠物暴击几率提高 4%', '宠物暴击几率提高 6%', '宠物暴击几率提高 8%', '宠物暴击几率提高 10%'] },
          { id: 'h_intimidate', name: '胁迫', icon: '🐺', row: 5, col: 2, max: 1, prereq: 'h_ferocity', ranks: ['命令宠物下一次命中使目标昏迷 3 秒，制造大量仇恨'] },
          { id: 'h_frenzy', name: '狂乱', icon: '⚡', row: 5, col: 3, max: 5, prereq: null, ranks: ['宠物暴击后攻击速度提高 6%', '宠物暴击后攻击速度提高 12%', '宠物暴击后攻击速度提高 18%', '宠物暴击后攻击速度提高 24%', '宠物暴击后攻击速度提高 30%'] },
          { id: 'h_wrath', name: '狂野怒火', icon: '🔥', row: 7, col: 2, max: 1, prereq: 'h_intimidate', ranks: ['宠物进入狂怒状态，伤害提高 50%，持续 18 秒且免疫一切控制'] }
        ]
      },
      {
        id: 'marksmanship',
        name: '射击 (Marksman)',
        skills: [
          { id: 'h_lethal', name: '致死射击', icon: '🎯', row: 2, col: 3, max: 5, prereq: null, ranks: ['远程武器暴击几率提高 1%', '远程武器暴击几率提高 2%', '远程武器暴击几率提高 3%', '远程武器暴击几率提高 4%', '远程武器暴击几率提高 5%'] },
          { id: 'h_aimed', name: '瞄准射击', icon: '🏹', row: 3, col: 2, max: 1, prereq: null, ranks: ['瞄准蓄力射击，造成武器伤害 + 600 点额外物理伤害'] },
          { id: 'h_ranged_spec', name: '远程武器专精', icon: '🎯', row: 5, col: 3, max: 5, prereq: null, ranks: ['远程武器造成的伤害提高 1%', '远程武器造成的伤害提高 2%', '远程武器造成的伤害提高 3%', '远程武器造成的伤害提高 4%', '远程武器造成的伤害提高 5%'] },
          { id: 'h_trueshot', name: '强击光环', icon: '📢', row: 7, col: 2, max: 1, prereq: 'h_ranged_spec', ranks: ['释放光环，使小队全员攻击强度提高 100 点'] }
        ]
      },
      {
        id: 'survival',
        name: '生存 (Survival)',
        skills: [
          { id: 'h_deflect', name: '偏斜', icon: '🛡️', row: 1, col: 2, max: 5, prereq: null, ranks: ['招架几率提高 1%', '招架几率提高 2%', '招架几率提高 3%', '招架几率提高 4%', '招架几率提高 5%'] },
          { id: 'h_entrap', name: '诱捕', icon: '🕸️', row: 2, col: 1, max: 3, prereq: null, ranks: ['陷阱触发时使目标定身 2 秒', '陷阱触发时使目标定身 3 秒', '陷阱触发时使目标定身 5 秒'] },
          { id: 'h_killer', name: '杀戮本能', icon: '🗡️', row: 5, col: 3, max: 5, prereq: null, ranks: ['所有攻击的暴击几率提高 1%', '所有攻击的暴击几率提高 2%', '所有攻击的暴击几率提高 3%'] }
        ]
      }
    ]
  },
  warlock: {
    name: '术士',
    icon: '💀',
    presets: [
      { name: '暗毁团本主力 (9/21/21)', desc: '牺牲魅魔暗影箭暴击连环轰炸第一DPS流派', points: { wl_suppress: 5, wl_shadowvulnerability: 5, wl_demonicembrace: 5, wl_sacrifice: 1, wl_shadowburn: 1, wl_ruin: 1 } },
      { name: '痛苦吸血流 (30/21/0)', desc: '野外多目标永动机双DOT挂满永不空蓝', points: { wl_suppress: 5, wl_imp_corrupt: 5, wl_nightfall: 2, wl_siphonlife: 1, wl_shadowmastery: 5 } }
    ],
    trees: [
      {
        id: 'affliction',
        name: '痛苦 (Affliction)',
        skills: [
          { id: 'wl_suppress', name: '镇压', icon: '🌑', row: 1, col: 2, max: 5, prereq: null, ranks: ['痛苦系法术命中率提高 2%', '痛苦系法术命中率提高 4%', '痛苦系法术命中率提高 6%', '痛苦系法术命中率提高 8%', '痛苦系法术命中率提高 10%'] },
          { id: 'wl_imp_corrupt', name: '强化腐蚀术', icon: '🧪', row: 1, col: 3, max: 5, prereq: null, ranks: ['腐蚀术施法时间减少 0.4 秒', '腐蚀术施法时间减少 0.8 秒', '腐蚀术施法时间减少 1.2 秒', '腐蚀术施法时间减少 1.6 秒', '腐蚀术施法时间减少 2.0 秒 (变为瞬发)'] },
          { id: 'wl_nightfall', name: '夜幕', icon: '✨', row: 3, col: 2, max: 2, prereq: null, ranks: ['腐蚀术或吸血有 2% 几率使下一个暗影箭瞬发', '腐蚀术或吸血有 4% 几率使下一个暗影箭瞬发'] },
          { id: 'wl_siphonlife', name: '生命虹吸', icon: '🩸', row: 4, col: 2, max: 1, prereq: null, ranks: ['每3秒转移敌人的生命值恢复自身，持续30秒'] },
          { id: 'wl_shadowmastery', name: '暗影掌握', icon: '🌑', row: 7, col: 2, max: 1, prereq: 'wl_siphonlife', ranks: ['暗影法术造成的伤害和吸取效果提高 10%'] }
        ]
      },
      {
        id: 'demonology',
        name: '恶魔学识 (Demonology)',
        skills: [
          { id: 'wl_demonicembrace', name: '恶魔之拥', icon: '😈', row: 1, col: 3, max: 5, prereq: null, ranks: ['耐力上限提高 3%', '耐力上限提高 6%', '耐力上限提高 9%', '耐力上限提高 12%', '耐力上限提高 15%'] },
          { id: 'wl_sacrifice', name: '恶魔牺牲', icon: '🩸', row: 5, col: 2, max: 1, prereq: null, ranks: ['牺牲当前宠物获得强力BUFF，牺牲魅魔提升 15% 暗影伤害持续30分钟'] },
          { id: 'wl_soullink', name: '灵魂链接', icon: '🔗', row: 7, col: 2, max: 1, prereq: 'wl_sacrifice', ranks: ['受到的伤害 30% 由恶魔分担，自身和宠物伤害提高 3%'] }
        ]
      },
      {
        id: 'destruction',
        name: '毁灭 (Destruction)',
        skills: [
          { id: 'wl_shadowvulnerability', name: '暗影灼烧', icon: '💥', row: 3, col: 3, max: 1, prereq: null, ranks: ['瞬发造成大量暗影伤害，击杀目标后返还灵魂碎片'] },
          { id: 'wl_ruin', name: '毁灭', icon: '🌋', row: 5, col: 2, max: 1, prereq: null, ranks: ['毁灭系法术暴击伤害加成提高 100%'] }
        ]
      }
    ]
  },
  shaman: {
    name: '萨满祭司',
    icon: '⚡',
    presets: [
      { name: '恢复治疗链 (0/5/46)', desc: '团本群加天花板、法潮图腾与无限拉链子核心', points: { sh_tidal: 5, sh_manaspring: 1, sh_naturefocus: 5, sh_healingway: 3, sh_manatide: 1 } },
      { name: '风怒增强暴力近战 (20/31/0)', desc: '双手大斧风怒秒杀、黑曜石斩杀近战流', points: { sh_ancestral: 5, sh_flurry: 5, sh_spiritweapons: 1, sh_stormstrike: 1 } }
    ],
    trees: [
      {
        id: 'elemental',
        name: '元素 (Elemental)',
        skills: [
          { id: 'sh_convection', name: '传导', icon: '⚡', row: 1, col: 2, max: 5, prereq: null, ranks: ['闪电震击法力消耗降低 2%', '闪电震击法力消耗降低 4%', '闪电震击法力消耗降低 6%', '闪电震击法力消耗降低 8%', '闪电震击法力消耗降低 10%'] },
          { id: 'sh_elementalmastery', name: '元素掌握', icon: '🌪️', row: 7, col: 2, max: 1, prereq: null, ranks: ['激活后使下一个火焰、冰霜或自然法术变为瞬发且必定暴击'] }
        ]
      },
      {
        id: 'enhancement',
        name: '增强 (Enhancement)',
        skills: [
          { id: 'sh_ancestral', name: '先祖知识', icon: '🧠', row: 1, col: 3, max: 5, prereq: null, ranks: ['法力值上限提高 1%', '法力值上限提高 2%', '法力值上限提高 3%', '法力值上限提高 4%', '法力值上限提高 5%'] },
          { id: 'sh_flurry', name: '乱击', icon: '⚔️', row: 4, col: 2, max: 5, prereq: null, ranks: ['打出近战暴击后，下3次攻击速度提高 10%', '打出近战暴击后，下3次攻击速度提高 15%', '打出近战暴击后，下3次攻击速度提高 20%', '打出近战暴击后，下3次攻击速度提高 25%', '打出近战暴击后，下3次攻击速度提高 30%'] },
          { id: 'sh_spiritweapons', name: '幽魂武器', icon: '🛡️', row: 5, col: 2, max: 1, prereq: 'sh_flurry', ranks: ['近战攻击制造的仇恨降低 30%，并有几率招架近战攻击'] },
          { id: 'sh_stormstrike', name: '风暴打击', icon: '🔨', row: 7, col: 2, max: 1, prereq: 'sh_spiritweapons', ranks: ['立即用双手武器攻击目标，并使目标承受的下2次自然伤害提升 20%'] }
        ]
      },
      {
        id: 'restoration',
        name: '恢复 (Restoration)',
        skills: [
          { id: 'sh_tidal', name: '潮汐集中', icon: '🌊', row: 1, col: 2, max: 5, prereq: null, ranks: ['治疗法术法力消耗减少 1%', '治疗法术法力消耗减少 2%', '治疗法术法力消耗减少 3%', '治疗法术法力消耗减少 4%', '治疗法术法力消耗减少 5%'] },
          { id: 'sh_naturefocus', name: '自然专注', icon: '🌱', row: 2, col: 2, max: 5, prereq: null, ranks: ['施放治疗法术受打退几率降低 14%', '施放治疗法术受打退几率降低 28%', '施放治疗法术受打退几率降低 42%', '施放治疗法术受打退几率降低 56%', '施放治疗法术受打退几率降低 70%'] },
          { id: 'sh_healingway', name: '治疗之道', icon: '💧', row: 3, col: 3, max: 3, prereq: null, ranks: ['治疗波提高后续治疗效果 6%', '治疗波提高后续治疗效果 12%', '治疗波提高后续治疗效果 18%'] },
          { id: 'sh_manatide', name: '法潮图腾', icon: '⛲', row: 7, col: 2, max: 1, prereq: 'sh_healingway', ranks: ['召唤法潮图腾，为小队成员每 3 秒恢复大量法力值，持续 12 秒'] }
        ]
      }
    ]
  },
  druid: {
    name: '德鲁伊',
    icon: '🌱',
    presets: [
      { name: '野性巨熊坦克 (0/30/21)', desc: '高护甲血牛抗怪熊坦与猫德物理输出', points: { dr_ferocity: 5, dr_thickhide: 5, dr_feralcharge: 1, dr_predatory: 5, dr_leaderofthepack: 1, dr_naturefocus: 5, dr_intensity: 3, dr_innervate: 1 } },
      { name: '恢复激活奶德 (14/0/37)', desc: '持续HOT回春愈合与团队战略激活发动机', points: { dr_naturefocus: 5, dr_subtlety: 5, dr_tranquil: 2, dr_innervate: 1, dr_swiftmend: 1 } }
    ],
    trees: [
      {
        id: 'balance',
        name: '平衡 (Balance)',
        skills: [
          { id: 'dr_naturegrasp', name: '自然之握', icon: '🌿', row: 1, col: 2, max: 1, prereq: null, ranks: ['激活后受近战攻击有 35% 几率纠缠定身敌人'] },
          { id: 'dr_moonkin', name: '枭兽形态', icon: '🦉', row: 7, col: 2, max: 1, prereq: null, ranks: ['变身枭兽，护甲提高 360%，全队法术暴击几率提高 3%'] }
        ]
      },
      {
        id: 'feral',
        name: '野性 (Feral)',
        skills: [
          { id: 'dr_ferocity', name: '凶暴', icon: '🐾', row: 1, col: 2, max: 5, prereq: null, ranks: ['重击和爪击消耗的怒气和能量降低 1 点', '重击和爪击消耗的怒气和能量降低 2 点', '重击和爪击消耗的怒气和能量降低 3 点', '重击和爪击消耗的怒气和能量降低 4 点', '重击和爪击消耗的怒气和能量降低 5 点'] },
          { id: 'dr_thickhide', name: '厚皮', icon: '🐻', row: 2, col: 2, max: 5, prereq: null, ranks: ['装备护甲加成提高 2%', '装备护甲加成提高 4%', '装备护甲加成提高 6%', '装备护甲加成提高 8%', '装备护甲加成提高 10%'] },
          { id: 'dr_feralcharge', name: '野性冲锋', icon: '⚡', row: 3, col: 2, max: 1, prereq: null, ranks: ['熊形态下冲锋敌人，使目标定身 4 秒并打断施法'] },
          { id: 'dr_leaderofthepack', name: '兽群领袖', icon: '🦁', row: 7, col: 2, max: 1, prereq: null, ranks: ['使附近的队友远程和近战暴击几率提高 3%'] }
        ]
      },
      {
        id: 'restoration',
        name: '恢复 (Restoration)',
        skills: [
          { id: 'dr_naturefocus', name: '自然集中', icon: '💧', row: 1, col: 2, max: 5, prereq: null, ranks: ['施法受打退几率降低 14%', '施法受打退几率降低 28%', '施法受打退几率降低 42%', '施法受打退几率降低 56%', '施法受打退几率降低 70%'] },
          { id: 'dr_subtlety', name: '微妙', icon: '🌿', row: 3, col: 1, max: 5, prereq: null, ranks: ['治疗法术造成的仇恨降低 4%', '治疗法术造成的仇恨降低 8%', '治疗法术造成的仇恨降低 12%', '治疗法术造成的仇恨降低 16%', '治疗法术造成的仇恨降低 20%'] },
          { id: 'dr_innervate', name: '激活', icon: '✨', row: 6, col: 2, max: 1, prereq: null, ranks: ['使目标法力回复速度提高 400%，持续 20 秒，并且施法时保持 100% 回复'] },
          { id: 'dr_swiftmend', name: '迅捷治愈', icon: '🍃', row: 7, col: 2, max: 1, prereq: 'dr_innervate', ranks: ['消耗目标身上的回春术或愈合，立即为其恢复巨额生命值'] }
        ]
      }
    ]
  }
};

// 5. 初始许愿池预设清单 (用于许愿墙)
const INITIAL_WISHES = [
  {
    id: 'w_1',
    author: '狂暴小土人',
    classIcon: '⚔️',
    category: '神兵掉落',
    text: '无限服开服第一周必出风剑左右脸！公会熔火之心一把毕业！',
    likes: 128,
    date: '10分钟前'
  },
  {
    id: 'w_2',
    author: '冰冠奥法妹',
    classIcon: '🧙‍♂️',
    category: '稀有坐骑',
    text: '许愿无限服能摸出天裔精灵隐藏星界角鹰兽！颜值即是正义！',
    likes: 96,
    date: '35分钟前'
  },
  {
    id: 'w_3',
    author: '老牛开路不翻车',
    classIcon: '🛡️',
    category: '开荒通关',
    text: '求一个准时上线不咕咕的固定车队，大秘境和团本打通关！',
    likes: 74,
    date: '1小时前'
  },
  {
    id: 'w_4',
    author: '绝命毒师贼',
    classIcon: '🗡️',
    category: '欧气满满',
    text: '今晚希尔斯布莱德野外杀怪掉落【提布的炽炎之剑】！发家致富！',
    likes: 215,
    date: '2小时前'
  }
];

// 6. 魔兽核心术语与黑话全书 (魔兽术语板块核心数据)
const WOW_TERMS = [
  // 核心机制
  {
    id: 't_gcd',
    term: 'GCD (Global Cooldown)',
    alias: '公共冷却时间 / 公CD',
    category: 'mechanics',
    tag: '核心机制',
    definition: '绝大部分技能施放后，触发的所有技能通用的短暂停顿时间（经典怀旧服通常为 1.5 秒，受急速缩短，盗贼德鲁伊为 1 秒）。不占用 GCD 的技能通常称为“脱离公CD技能”（如打断、减伤大招）。',
    example: '“打断技能不要乱用，千万留心打断不占 GCD，但别为了打伤害把自己卡进共CD断不掉！”',
    tip: '保命技能和控制打断技能通常优先考虑不占 GCD 的，随时留一手救急。'
  },
  {
    id: 't_ot',
    term: 'OT (Over Threat)',
    alias: '仇恨失控 / 仇恨溢出',
    category: 'mechanics',
    tag: '核心机制',
    definition: 'DPS 或治疗的仇恨值超过了主坦（MT）一定比例（近战需超过 110%，远程需超过 130%），导致 BOSS 或怪物的目标直接转移攻击非坦克玩家。通常直接导致该玩家瞬间暴毙。',
    example: '“停手！法师火法起手大火球暴击直接 OT 死了，等防战先打破甲拉稳再打！”',
    tip: '输出再高，OT 倒地就是 0 DPS。开打前请安装仇恨插件（如 ThreatClassic2），仇恨达到 90% 必须立刻停手或使用消仇恨技能（假死、渐隐、碎裂）。'
  },
  {
    id: 't_bis',
    term: 'BiS (Best in Slot)',
    alias: '毕业装备 / 最优配装',
    category: 'mechanics',
    tag: '核心机制',
    definition: '当前阶段当前专精下，在每个装备部位（头部、胸甲、武器、饰品等）理论上能够提供最高收益的终极装备搭配方案。',
    example: '“法师别买那件散件了，那是隔壁牧师的，你的 P1 BiS 衣服是大法师之袍！”',
    tip: '装等高并不一定等于 BiS，在 60 级版本中，命中（9%物理/16%法术上限）、暴击、武器技能等级的收益往往大幅超越纯基础主属性。'
  },
  {
    id: 't_dot',
    term: 'DoT / HoT',
    alias: '持续伤害 / 持续治疗',
    category: 'mechanics',
    tag: '核心机制',
    definition: 'DoT (Damage over Time) 指随着时间每间隔几秒扣血的持续伤害（如痛、腐蚀术、撕裂、点燃）；HoT (Heal over Time) 指持续加血（如恢复、回春术）。',
    example: '“牧师给被点名的队友挂个回春和恢复，保持 HoT 别断，血线就不会电梯血。”',
    tip: '60级怀旧服 BOSS 身上有 16 个减益（Debuff）上限槽位，野团千万别乱丢低伤害 DoT 顶掉了团队核心破甲和易伤！'
  },
  {
    id: 't_aoe',
    term: 'AOE (Area of Effect)',
    alias: '范围群体伤害 / 聚怪割草',
    category: 'mechanics',
    tag: '核心机制',
    definition: '作用于一定地面范围内的法术与物理技能（如法师暴风雪、奥术飞弹魔爆、术士地狱烈火、战士旋风斩）。',
    example: '“把那波小龙聚到中场，法师和术士直接下暴风雪和火雨 AOE 融化掉！”',
    tip: '群怪 AOE 容易迅速产生巨额仇恨，最好等坦克聚怪并踩完雷霆/顺劈后再开火。'
  },
  {
    id: 't_dr',
    term: 'DR (Diminishing Returns)',
    alias: '递减效应 / 控制递减',
    category: 'mechanics',
    tag: '核心机制',
    definition: '同一种控制效果（如昏迷、变羊瘫痪、恐惧）在 15-20 秒内连续施加给同一目标时，持续时间逐次减半（100% ➔ 50% ➔ 25% ➔ 免疫），主要用于 PVP 战斗平衡。',
    example: '“盗贼偷袭接肾击注意控制递减，别顶着免疫狂砸肾击浪费连击点！”',
    tip: 'PVP 插件会显示控制递减计时条，等递减重置后再交下一轮满晕控制收益最高。'
  },

  // 战斗与走位黑话
  {
    id: 't_cleave',
    term: '顺劈斩 / 龙头龙尾 (Cleave & Breath)',
    alias: '正面顺劈 / 龙尾扫击',
    category: 'tactics',
    tag: '战斗走位',
    definition: '魔兽中近战 BOSS 的通用机制：BOSS 面前 180° 会释放范围顺劈击杀除主坦以外的一切人；巨龙类 BOSS 正面有高伤龙息，尾部有击退断骨扫击，因此全团必须严格站在 BOSS 身体侧腹击杀。',
    example: '“近战全部去巨龙的侧腹输出！谁要是站龙头被顺劈秒杀扣 100 金！”',
    tip: '永远不要站在坦克身边蹭伤害，近战输出第一准则：找怪物的正后方或侧身位输出。'
  },
  {
    id: 't_los',
    term: 'LOS (Line of Sight)',
    alias: '卡视角 / 卡墙角拉怪',
    category: 'tactics',
    tag: '战斗走位',
    definition: '利用副本的墙角、石柱或门洞障碍物阻挡远程施法怪物对你的视线，迫使远程怪无法读条而主动跑近至近战距离，方便坦克集中聚怪。',
    example: '“通灵学院拉法系怪，坦克扔个飞刀立刻躲门后卡 LOS，怪就自己走过来了。”',
    tip: '治疗开打前如果站在拐角外面露头给坦克加血，怪就会掉头去打治疗导致卡视角失败。'
  },
  {
    id: 't_kick',
    term: '断条 / 钢条 (Interrupt)',
    alias: '打断 / 拳击 / 脚踢 / 法术反制',
    category: 'tactics',
    tag: '战斗走位',
    definition: '在敌方施法读条期间使用打断技能强行中断施法，并使该系法术在数秒内无法再次施放。无法打断的特殊读条在后代版本通常显示为“钢条（不可打断）”。',
    example: '“分配好打断链！1棒盗贼脚踢，2棒法师反制，3棒狂暴战拳击，别全抢同一秒交重了！”',
    tip: '打断重叠是灭团最常见原因，最好在语音里喊好打断顺序。'
  },
  {
    id: 't_dispell',
    term: '驱散 / 净毒 / 解诅咒 (Dispel)',
    alias: '大驱 / 解疾病 / 净化术',
    category: 'tactics',
    tag: '战斗走位',
    definition: '牧师、骑士、萨满、小德、法师使用技能解除队友身上的有害 Debuff（魔法、毒药、诅咒、疾病）或驱散 BOSS 身上的无敌/狂暴 BUFF。',
    example: '“熔火之心老二萨弗隆先驱者，小德和法师专职解诅咒，解慢了全团血崩！”',
    tip: '一键解 Curse 插件（如 Decursive）是 60 级开荒团本不可或缺的神器。'
  },

  // 副本与团队
  {
    id: 't_lust',
    term: '嗜血 / 英勇 (Bloodlust / Heroism)',
    alias: '开YY / 敲嗜血 / 爆发期',
    category: 'raid',
    tag: '团本大米',
    definition: '萨满祭司的核心爆发大招，为全团提供 30% 施法与攻击极速持续 40 秒，是击杀 BOSS 最核心的爆发压血阶段标志。',
    example: '“BOSS 进 20% 狂暴线了，萨满开嗜血！全团吃药水全技能全开全力压掉！”',
    tip: '嗜血期间所有人技能 CD 缩短、攻速暴增，应提前存好能量、怒气并配合爆发饰品。'
  },
  {
    id: 't_enrage',
    term: '软狂暴 / 硬狂暴 (Enrage)',
    alias: '狂暴倒计时 / 灭团倒计时',
    category: 'raid',
    tag: '团本大米',
    definition: '硬狂暴：BOSS 战斗时间超过设定上限（如 10 分钟）后直接秒杀全团；软狂暴：BOSS 战斗时间越长，场上环境伤害/全场暗影AOE越来越高，直至治疗蓝耗空崩盘。',
    example: '“还有 15 秒帕奇维克硬狂暴，DPS 加把劲别刮痧了，不然一拳秒一个！”',
    tip: '狂暴机制强制要求团队的总秒伤达标，不能纯靠慢慢磨血过关。'
  },
  {
    id: 't_table',
    term: '拉桌子 / 发糖 / 拍BUFF',
    alias: '面包大餐 / 治疗石 / 智耐精野爪',
    category: 'raid',
    tag: '团本大米',
    definition: '进本前团队准备流程：法师造水拉桌子给全员分发大面包；术士放灵魂之井发治疗石（俗称吃糖）；牧师拍真言术韧、法师拍奥术光辉、德鲁伊拍野性赐福（爪子）。',
    example: '“法师拉个桌子！术士拉门发糖！牧师给二队补个大耐力，准备开怪！”',
    tip: '死后跑尸复活会丢失所有团队 BUFF，必须提醒治疗与法爷重新补拍 BUFF。'
  },

  // 经典神装与神器
  {
    id: 't_thunderfury',
    term: '风剑 (Thunderfury)',
    alias: '雷霆之怒·逐风者的祝福之剑',
    category: 'gear',
    tag: '经典神装',
    definition: '60级熔火之心出品的传说级橙色单手剑，由迦顿男爵与加尔掉落的左右两片【逐风者禁锢之颅】合成。其被动旋风减速与范围仇恨神技，令其稳坐 60 级甚至 70 级主坦第一神兵。',
    example: '“团长出了右脸！只要再出个左脸，公会主T就能合出全区第一把风剑了！”',
    tip: '风剑不仅是一件装备，更是经典怀旧服一个公会凝聚力和牌面的象征。'
  },
  {
    id: 't_teebu',
    term: '提布 (Teebu)',
    alias: '提布的炽炎之剑',
    category: 'gear',
    tag: '经典神装',
    definition: '60级世界掉落的史诗级单手发光火剑，全艾泽拉斯野外 62 级以上精英怪极小概率掉落，拥有极拉风的纯火焰光剑外观与击中触发火球特效，拍卖行价值连城。',
    example: '“刚才在湿地杀了个精英怪随手一摸掉落了提布！发家致富直接换千金马了！”',
    tip: '外观党的终极追求，也是 60 级开服最顶级的奢侈品。'
  },
  {
    id: 't_nelth',
    term: '奈泪 (Neltharion\'s Tear)',
    alias: '奈法利安之泪',
    category: 'gear',
    tag: '经典神装',
    definition: '黑翼之巢（BWL）尾王奈法利安掉落的法系终极饰品，提供 44 点法术伤害与 2% 法术命中，整个 60 级版本无任何饰品可撼动其地位。',
    example: '“今晚奈泪一出，法师和术士的金币直接叫到 10 万起跳，头破血流！”',
    tip: '法系命中的极品神器，法师术士哪怕到了纳克萨玛斯（NAXX）依然佩戴。'
  },

  // 社交与行话
  {
    id: 't_gkd',
    term: 'GKD / 111 / 222',
    alias: '搞快点 / 进组 / 拉人',
    category: 'social',
    tag: '社交行话',
    definition: '魔兽玩家经典聊天快捷暗号：111 代表“求组/我准备好了/打 1 进组”；222 代表“需要术士拉门拉人”；GKD 是“搞快点”拼音缩写。',
    example: '“通灵学院刷装车队 4=1 来个能奶的大佬，打 1 进组，城外 222 集合就飞！”',
    tip: '在公会频道或大脚世界频道看到打 1 时，输入 1 即可快速被组进团队。'
  },
  {
    id: 't_jump',
    term: '跳车 / 鸽子 (Leaver)',
    alias: '中途退队 / 违约放鸽子',
    category: 'social',
    tag: '社交行话',
    definition: '副本或大秘境开打后，因为团灭几次、装备没出、或者态度不好而私自退队离开，导致剩下队友直接黑钥废本的可耻行为。',
    example: '“老一灭了一把治疗直接退队跳车了，真是太搞人心态了，全服拉黑避雷！”',
    tip: '良好的车队信誉是玩好魔兽的第一张名片，提前沟通胜过无声跳车。'
  }
];

module.exports = {
  FLIGHT_PATHS,
  WOW_RACES,
  WOW_CLASSES,
  TALENT_DATA_60,
  INITIAL_WISHES,
  WOW_TERMS
};

