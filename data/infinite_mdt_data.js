/**
 * 魔兽世界「无限服」地下城与团队副本 MDT 风格地图与怪物技能机制数据库
 * 仅用于地图与怪物机制展示与图鉴查阅，无需规划路线
 */

const INFINITE_MDT_DUNGEONS = [
  {
    id: 'd_hall_of_lords',
    name: '领主大厅',
    fullName: '领主大厅 (Hall of the Lords)',
    level: '58 - 60 级',
    type: '5人满级高阶地下城',
    location: '洛丹伦废墟深处',
    mapTheme: '#1e1b4b',
    accentColor: '#818cf8',
    mapWidth: 700,
    mapHeight: 520,
    rooms: [
      { name: '前庭卫所', x: 120, y: 400, w: 140, h: 80 },
      { name: '审判长廊', x: 280, y: 320, w: 140, h: 180 },
      { name: '幽冥监牢', x: 140, y: 180, w: 150, h: 130 },
      { name: '领主议事圣所', x: 440, y: 140, w: 200, h: 220 }
    ],
    enemies: [
      {
        id: 'e1',
        x: 180, y: 440,
        name: '白银堕落卫士',
        isBoss: false,
        icon: '🛡️',
        creatureType: '亡灵',
        health: '18,500',
        characteristics: ['可昏迷', '可减速', '可打断', '嘲讽有效'],
        spells: [
          { name: '断筋重击', icon: '🩸', castTime: '瞬发', range: '近战', tags: ['坦克高伤', '减速'], desc: '造成120%武器物理伤害，并使目标移动速度降低50%，持续6秒。' },
          { name: '戒备光环', icon: '🛡️', castTime: '被动', range: '10码', tags: ['光环增益'], desc: '使周围8码内友军受到的物理伤害降低15%。' }
        ]
      },
      {
        id: 'e2',
        x: 320, y: 410,
        name: '狂乱苦修僧',
        isBoss: false,
        icon: '🧙‍♂️',
        creatureType: '人形',
        health: '14,200',
        characteristics: ['可昏迷', '可打断', '可沉默', '可致盲'],
        spells: [
          { name: '暗影愈合', icon: '✨', castTime: '2.0秒读条', range: '40码', tags: ['必打断', '治疗'], desc: '为重伤友军恢复大量生命值，读条极快，必须安排专人打断！' },
          { name: '精神灼烧', icon: '🔥', castTime: '引导3秒', range: '30码', tags: ['全队AOE', '可打断'], desc: '每秒对全队造成暗影伤害，需第一时间使用打断或昏迷控制。' }
        ]
      },
      {
        id: 'b1',
        x: 210, y: 240,
        name: '大审判官维拉尔',
        isBoss: true,
        bossNum: 1,
        icon: '👑',
        creatureType: '亡灵',
        health: '86,000',
        characteristics: ['免疫昏迷', '免疫缴械', '嘲讽有效', '可打断'],
        spells: [
          { name: '圣光神罚', icon: '⚡', castTime: '2.5秒读条', range: '全场AOE', tags: ['全队AOE', '灭团高危'], desc: '对全队释放圣光神罚，造成高额神圣伤害。治疗需预留爆发大招抬血。' },
          { name: '忏悔折磨', icon: '⛓️', castTime: '瞬发', range: '30码', tags: ['点名点控'], desc: '使一名玩家昏迷6秒，期间每秒承受暗圣双系伤害，可被驱散。' },
          { name: '净化之怒', icon: '🔥', castTime: '1.8秒读条', range: '40码', tags: ['可打断'], desc: '轰击当前目标造成大量神圣伤害，近战组需严格轮流打断。' }
        ]
      },
      {
        id: 'e3',
        x: 360, y: 340,
        name: '亡灵缚魂犬',
        isBoss: false,
        icon: '🐕',
        creatureType: '野兽/亡灵',
        health: '12,800',
        characteristics: ['可减速', '可昏迷', '可恐吓野兽'],
        spells: [
          { name: '致死撕咬', icon: '🦷', castTime: '瞬发', range: '近战', tags: ['减疗50%'], desc: '撕咬坦克使其受到的治疗降低50%，治疗需提前刷满血量。' }
        ]
      },
      {
        id: 'b2',
        x: 350, y: 220,
        name: '被遗忘的典狱官',
        isBoss: true,
        bossNum: 2,
        icon: '👑',
        creatureType: '亡灵',
        health: '98,000',
        characteristics: ['免疫控制', '嘲讽有效'],
        spells: [
          { name: '锁链禁锢', icon: '⛓️', castTime: '瞬发', range: '30码', tags: ['定身控制'], desc: '射出铁链束缚2名玩家拉至Boss身边并定身，需立刻转火击碎锁链。' },
          { name: '压制重击', icon: '🔨', castTime: '1.5秒读条', range: '近战', tags: ['坦克死刑'], desc: '对主坦进行沉重打击，击碎护甲50%，坦克必须开启硬减伤。' },
          { name: '狱卒怒吼', icon: '📢', castTime: '瞬发', range: '20码', tags: ['群体恐惧'], desc: '怒吼使20码内全员恐惧3秒，需预下战栗图腾或提前远离。' }
        ]
      },
      {
        id: 'e4',
        x: 480, y: 280,
        name: '议会死灵卫队长',
        isBoss: false,
        icon: '⚔️',
        creatureType: '亡灵',
        health: '26,000',
        characteristics: ['可昏迷', '嘲讽有效'],
        spells: [
          { name: '顺劈斩', icon: '🗡️', castTime: '瞬发', range: '近战顺劈', tags: ['正面顺劈'], desc: '对正面锥形区域所有人造成高额物理伤害，近战千万背对站位！' }
        ]
      },
      {
        id: 'b3',
        x: 540, y: 190,
        name: '复仇幽魂卡尔森 (尾王)',
        isBoss: true,
        bossNum: 3,
        icon: '👑',
        creatureType: '亡灵幽魂',
        health: '135,000',
        characteristics: ['免疫一切控制', '嘲讽有效'],
        spells: [
          { name: '灵魂碎裂 (灭团技)', icon: '💀', castTime: '引导5秒', range: '全屏AOE', tags: ['全队AOE', '灭团高危'], desc: '血量降至50%时转阶段，Boss升空引导灵魂风暴，全队承受极高暗影伤害，必须全力集火破盾！' },
          { name: '暗影易伤诅咒', icon: '🌑', castTime: '瞬发', range: '全场', tags: ['诅咒', '需驱散'], desc: '使随机2名玩家承受暗影伤害提高100%，法师/德鲁伊需秒解诅咒。' },
          { name: '哀鸣尖叫', icon: '😱', castTime: '2.0秒读条', range: '40码', tags: ['可打断'], desc: '恐惧当前目标4秒，可被打断。' }
        ]
      }
    ]
  },
  {
    id: 'd_zephyrian_sanctum',
    name: '泽风秘境',
    fullName: '泽风秘境 (Zephyrian Sanctum)',
    level: '15 - 20 / 60 级(精英)',
    type: '5人全新探索地下城',
    location: '泽风岛 (微风岛)',
    mapTheme: '#0c4a6e',
    accentColor: '#38bdf8',
    mapWidth: 700,
    mapHeight: 520,
    rooms: [
      { name: '风语回廊', x: 100, y: 380, w: 160, h: 100 },
      { name: '浮空断崖', x: 280, y: 260, w: 150, h: 160 },
      { name: '风暴圣坛', x: 460, y: 130, w: 200, h: 220 }
    ],
    enemies: [
      {
        id: 'zs_e1',
        x: 160, y: 430,
        name: '狂躁风元素幼体',
        isBoss: false,
        icon: '🌪️',
        creatureType: '元素',
        health: '6,200',
        characteristics: ['可冰冻', '可减速', '可击飞'],
        spells: [
          { name: '风刃投掷', icon: '💨', castTime: '1.5秒读条', range: '30码', tags: ['自然伤害'], desc: '发射风刃造成自然伤害并击退5码。' }
        ]
      },
      {
        id: 'zs_b1',
        x: 220, y: 400,
        name: '唤风学徒瑟琳',
        isBoss: true,
        bossNum: 1,
        icon: '👑',
        creatureType: '天裔/人形',
        health: '38,000',
        characteristics: ['可打断', '免疫昏迷'],
        spells: [
          { name: '轻风护盾', icon: '🛡️', castTime: '瞬发', range: '自身', tags: ['减伤'], desc: '制造风之护盾吸收伤害并反弹远程法术。' },
          { name: '穿透强风', icon: '🌪️', castTime: '2.0秒读条', range: '40码', tags: ['可打断'], desc: '穿透直线伤害，注意走位躲开正面。' }
        ]
      },
      {
        id: 'zs_b2',
        x: 350, y: 320,
        name: '暴怒狂风元素',
        isBoss: true,
        bossNum: 2,
        icon: '👑',
        creatureType: '元素',
        health: '55,000',
        characteristics: ['免疫定身', '嘲讽有效'],
        spells: [
          { name: '龙卷风卷起', icon: '🌪️', castTime: '瞬发', range: '全场', tags: ['强控击飞'], desc: '场地随机生成3道龙卷风，踩中将被击飞至浮空断崖外，必须灵活跑位。' },
          { name: '闪电链迸裂', icon: '⚡', castTime: '2.0秒读条', range: '35码', tags: ['弹射AOE'], desc: '闪电弹射3名玩家，全员分散站位5码以上。' }
        ]
      },
      {
        id: 'zs_b3',
        x: 560, y: 220,
        name: '高阶风暴领主艾尔索斯 (尾王)',
        isBoss: true,
        bossNum: 3,
        icon: '👑',
        creatureType: '元素领主',
        health: '110,000',
        characteristics: ['免疫一切控制'],
        spells: [
          { name: '全场风暴过载 (灭团技)', icon: '⚡', castTime: '引导6秒', range: '全图', tags: ['全队AOE', '机制解法'], desc: 'Boss召唤狂暴台风席卷全场，玩家必须迅速踩进场地中央的【静风法阵】免疫伤害，否则必死！' },
          { name: '狂风击退', icon: '💨', castTime: '瞬发', range: '近战', tags: ['悬崖击退'], desc: '强力推飞主坦克，主坦务必背靠巨石墙壁站位。' }
        ]
      }
    ]
  },
  {
    id: 'd_ruins_lordaeron',
    name: '洛丹伦废墟',
    fullName: '洛丹伦废墟 (Ruins of Lordaeron)',
    level: '56 - 60 级',
    type: '5人进阶地下城',
    location: '提瑞斯法林地',
    mapTheme: '#1c1917',
    accentColor: '#f97316',
    mapWidth: 700,
    mapHeight: 520,
    rooms: [
      { name: '王城地窖', x: 100, y: 380, w: 150, h: 100 },
      { name: '皇家墓道', x: 270, y: 270, w: 150, h: 160 },
      { name: '天灾核心炉', x: 450, y: 140, w: 200, h: 220 }
    ],
    enemies: [
      {
        id: 'rl_b1',
        x: 180, y: 420,
        name: '堕落十字军领袖加文',
        isBoss: true,
        bossNum: 1,
        icon: '👑',
        creatureType: '亡灵',
        health: '82,000',
        characteristics: ['免疫缴械', '嘲讽有效'],
        spells: [
          { name: '反魔法护盾', icon: '🛡️', castTime: '瞬发', range: '自身', tags: ['法术免疫'], desc: '开启绿坝，5秒内免疫一切法术伤害，物理DPS全力输出。' },
          { name: '亡者大军', icon: '💀', castTime: '3.0秒读条', range: '全场', tags: ['召唤群怪', '可打断'], desc: '召唤4只食尸鬼助手，坦克第一时间聚怪打断。' }
        ]
      },
      {
        id: 'rl_b2',
        x: 340, y: 330,
        name: '缝合憎恶烂肉',
        isBoss: true,
        bossNum: 2,
        icon: '👑',
        creatureType: '亡灵憎恶',
        health: '96,000',
        characteristics: ['免疫昏迷'],
        spells: [
          { name: '剧毒喷溅 (绿水扩散)', icon: '🟢', castTime: '瞬发', range: '地面', tags: ['毒池走位'], desc: '地面喷洒剧毒绿水，站在其中每秒掉血20%，坦克需拉怪沿外圈不停风筝移动！' },
          { name: '肉钩索命', icon: '🪝', castTime: '瞬发', range: '40码', tags: ['拽人强控'], desc: '随机肉钩拽一名远程或治疗到Boss脚下狂殴，被拉者快速后跳逃离。' }
        ]
      },
      {
        id: 'rl_b3',
        x: 540, y: 210,
        name: '奥术构造体IX号 (尾王)',
        isBoss: true,
        bossNum: 3,
        icon: '👑',
        creatureType: '机械/奥术',
        health: '128,000',
        characteristics: ['免疫昏迷', '魔法免疫阶段'],
        spells: [
          { name: '奥能过载爆轰', icon: '💥', castTime: '2.5秒读条', range: '全场AOE', tags: ['全队AOE', '必开减伤'], desc: '过载核心能量，对全队造成致命奥术暴击，治疗全团减伤大招必交。' },
          { name: '魔力消融射线', icon: '⚡', castTime: '瞬发点名', range: '30码', tags: ['射线走位'], desc: '点名旋转扫射激光，被击中者每秒受到灼烧，切勿穿过激光。' }
        ]
      }
    ]
  },
  {
    id: 'd_shendralar_archives',
    name: '辛德拉档案馆',
    fullName: '辛德拉档案馆 (Shen\'dralar Archives)',
    level: '58 - 60 级',
    type: '5人满级高阶地下城',
    location: '菲拉斯·辛德拉古城',
    mapTheme: '#2e1065',
    accentColor: '#c084fc',
    mapWidth: 700,
    mapHeight: 520,
    rooms: [
      { name: '古代藏书阁', x: 110, y: 390, w: 150, h: 90 },
      { name: '禁忌秘术大厅', x: 280, y: 280, w: 150, h: 160 },
      { name: '托塞德林密室', x: 450, y: 150, w: 200, h: 210 }
    ],
    enemies: [
      {
        id: 'sa_b1',
        x: 180, y: 430,
        name: '藏书馆长玛尔杜克',
        isBoss: true,
        bossNum: 1,
        icon: '👑',
        creatureType: '上层精灵幽魂',
        health: '84,000',
        characteristics: ['可打断'],
        spells: [
          { name: '禁忌卷轴呼唤', icon: '📜', castTime: '瞬发', range: '全场', tags: ['召唤小怪'], desc: '召唤飞行魔法卷轴，卷轴会不断读条奥术飞弹，需优先AOE清理。' }
        ]
      },
      {
        id: 'sa_b2',
        x: 350, y: 340,
        name: '禁忌魔典之灵',
        isBoss: true,
        bossNum: 2,
        icon: '👑',
        creatureType: '魔法生物',
        health: '92,000',
        characteristics: ['可打断', '必断心控'],
        spells: [
          { name: '远古心智控制 (灭团技)', icon: '🧠', castTime: '2.5秒读条', range: '30码', tags: ['必打断', '心控队友'], desc: '心控一名输出队友攻击队友，读条必须第一时间打断！若读出需立刻羊/闷被控者。' }
        ]
      },
      {
        id: 'sa_b3',
        x: 550, y: 230,
        name: '奥术宗师瓦罗森 (尾王)',
        isBoss: true,
        bossNum: 3,
        icon: '👑',
        creatureType: '高等精灵幽灵',
        health: '130,000',
        characteristics: ['免疫一切控制'],
        spells: [
          { name: '能量过载符文 (踩圈机制)', icon: '🔮', castTime: '瞬发', range: '场地3圈', tags: ['踩圈机制'], desc: '场地刷新3个紫色奥术符文圈，必须各站一名玩家踩灭，漏踩将引发全灭级AOE。' }
        ]
      }
    ]
  },
  {
    id: 'd_mire_abyss',
    name: '泥沼深渊',
    fullName: '泥沼深渊 (Mire Abyss)',
    level: '45 - 52 级',
    type: '5人升级地下城',
    location: '尘泥沼泽南部',
    mapTheme: '#064e3b',
    accentColor: '#34d399',
    mapWidth: 700,
    mapHeight: 520,
    rooms: [
      { name: '沉没水洞', x: 120, y: 390, w: 140, h: 90 },
      { name: '龙卵孵化穴', x: 280, y: 280, w: 150, h: 150 },
      { name: '深渊巨口巢穴', x: 450, y: 150, w: 190, h: 210 }
    ],
    enemies: [
      {
        id: 'ma_b1',
        x: 180, y: 430,
        name: '泥沼潜伏者',
        isBoss: true,
        bossNum: 1,
        icon: '👑',
        creatureType: '野兽',
        health: '62,000',
        characteristics: ['可减速', '嘲讽有效'],
        spells: [
          { name: '泥浆剧毒缠绕', icon: '🟢', castTime: '瞬发', range: '30码', tags: ['定身毒'], desc: '定身并施加剧毒DOT，萨满/德鲁伊/圣骑优先驱散。' }
        ]
      },
      {
        id: 'ma_b2',
        x: 350, y: 340,
        name: '黑龙斥候斯卡尔',
        isBoss: true,
        bossNum: 2,
        icon: '👑',
        creatureType: '龙类',
        health: '78,000',
        characteristics: ['免疫昏迷'],
        spells: [
          { name: '黑龙烈焰吐息', icon: '🔥', castTime: '瞬发', range: '正面扇形', tags: ['正面顺劈'], desc: '龙族标志性吐息，秒杀脆皮，所有人绝对不能站在龙头！' }
        ]
      },
      {
        id: 'ma_b3',
        x: 540, y: 230,
        name: '深渊巨口多拉克 (尾王)',
        isBoss: true,
        bossNum: 3,
        icon: '👑',
        creatureType: '深渊巨兽',
        health: '98,000',
        characteristics: ['免疫控制'],
        spells: [
          { name: '巨颚碎甲 (换坦技)', icon: '🦷', castTime: '瞬发', range: '近战', tags: ['坦克死刑', '破甲50%'], desc: '粉碎主坦护甲50%，持续15秒，主坦需覆盖大盾墙或风筝拉开。' }
        ]
      }
    ]
  },
  {
    id: 'd_windfury_spire',
    name: '风怒尖塔',
    fullName: '风怒尖塔 (Windfury Spire)',
    level: '38 - 44 级',
    type: '5人高空险境地下城',
    location: '千针石林 / 天空之境',
    mapTheme: '#1e293b',
    accentColor: '#f59e0b',
    mapWidth: 700,
    mapHeight: 520,
    rooms: [
      { name: '尖塔悬梯', x: 130, y: 390, w: 140, h: 90 },
      { name: '雷霆鹰巢', x: 290, y: 280, w: 140, h: 150 },
      { name: '空贼瞭望顶台', x: 450, y: 150, w: 190, h: 210 }
    ],
    enemies: [
      {
        id: 'ws_b1',
        x: 190, y: 430,
        name: '尖啸鹰身女王',
        isBoss: true,
        bossNum: 1,
        icon: '👑',
        creatureType: '人形/鹰身人',
        health: '48,000',
        characteristics: ['可昏迷', '可打断'],
        spells: [
          { name: '刺耳尖啸', icon: '📢', castTime: '1.5秒读条', range: '全场', tags: ['全员沉默'], desc: '全队强行沉默4秒，施法职业需在读条结束前立刻停手防打断。' }
        ]
      },
      {
        id: 'ws_b2',
        x: 350, y: 340,
        name: '雷霆蜥蜴狂暴之首',
        isBoss: true,
        bossNum: 2,
        icon: '👑',
        creatureType: '野兽',
        health: '58,000',
        characteristics: ['嘲讽有效'],
        spells: [
          { name: '撼地踩踏', icon: '⚡', castTime: '瞬发', range: '近战20码', tags: ['群体击晕'], desc: '猛烈践踏地面击晕20码内所有人3秒。' }
        ]
      },
      {
        id: 'ws_b3',
        x: 540, y: 230,
        name: '空贼首领巴兹尔 (尾王)',
        isBoss: true,
        bossNum: 3,
        icon: '👑',
        creatureType: '人形',
        health: '72,000',
        characteristics: ['可打断'],
        spells: [
          { name: '悬崖狂风推击 (坠亡高危)', icon: '🌪️', castTime: '瞬发', range: '近战', tags: ['坠崖秒杀'], desc: '强风击飞目标30码，若背靠悬崖会直接摔下千米尖塔坠亡！全员必须贴近内侧岩壁站立！' }
        ]
      }
    ]
  },
  {
    id: 'd_temple_of_sorrow',
    name: '悲伤沼泽神殿',
    fullName: '悲伤沼泽神殿 (Temple of Sorrow)',
    level: '50 - 55 级',
    type: '5人经典扩展地下城',
    location: '悲伤沼泽沉没神殿侧翼',
    mapTheme: '#042f2e',
    accentColor: '#14b8a6',
    mapWidth: 700,
    mapHeight: 520,
    rooms: [
      { name: '梦魇前厅', x: 120, y: 390, w: 140, h: 90 },
      { name: '祭祀深潭', x: 280, y: 280, w: 140, h: 150 },
      { name: '阿塔莱沉眠密室', x: 450, y: 150, w: 190, h: 210 }
    ],
    enemies: [
      {
        id: 'ts_b1',
        x: 180, y: 430,
        name: '腐化绿龙幼体',
        isBoss: true,
        bossNum: 1,
        icon: '👑',
        creatureType: '龙类',
        health: '68,000',
        characteristics: ['免疫昏迷'],
        spells: [
          { name: '酸蚀吐息', icon: '🟢', castTime: '瞬发', range: '正面', tags: ['自然伤害'], desc: '对正面喷涂强酸并叠加自然易伤。' }
        ]
      },
      {
        id: 'ts_b2',
        x: 340, y: 340,
        name: '梦魇编织者',
        isBoss: true,
        bossNum: 2,
        icon: '👑',
        creatureType: '恶魔/幽魂',
        health: '76,000',
        characteristics: ['可打断'],
        spells: [
          { name: '沉睡诅咒', icon: '💤', castTime: '瞬发', range: '30码', tags: ['昏睡诅咒'], desc: '使目标陷入沉睡8秒，受到伤害可解除。' }
        ]
      },
      {
        id: 'ts_b3',
        x: 540, y: 230,
        name: '阿塔莱高阶祭司 (尾王)',
        isBoss: true,
        bossNum: 3,
        icon: '👑',
        creatureType: '巨魔/亡灵',
        health: '94,000',
        characteristics: ['免疫一切控制'],
        spells: [
          { name: '血神献祭', icon: '🩸', castTime: '2.0秒读条', range: '40码', tags: ['必打断'], desc: '牺牲一名小怪恢复30%生命，必须第一时间打断并秒掉小怪。' }
        ]
      }
    ]
  },
  {
    id: 'd_gnomeregan_deep',
    name: '诺莫瑞根深层机械区',
    fullName: '诺莫瑞根深层机械区 (Gnomeregan Deep Core)',
    level: '30 - 36 级',
    type: '5人机械工厂地下城',
    location: '丹莫罗诺莫瑞根下层',
    mapTheme: '#1f2937',
    accentColor: '#38bdf8',
    mapWidth: 700,
    mapHeight: 520,
    rooms: [
      { name: '动力管道区', x: 120, y: 390, w: 140, h: 90 },
      { name: '齿轮装配车间', x: 280, y: 280, w: 140, h: 150 },
      { name: '放射性核心动力炉', x: 450, y: 150, w: 190, h: 210 }
    ],
    enemies: [
      {
        id: 'gd_b1',
        x: 180, y: 430,
        name: '热能过载电容器',
        isBoss: true,
        bossNum: 1,
        icon: '👑',
        creatureType: '机械',
        health: '36,000',
        characteristics: ['免疫减速'],
        spells: [
          { name: '静电电弧', icon: '⚡', castTime: '瞬发', range: '20码', tags: ['闪电AOE'], desc: '静电随机电击近战，注意驱散感电debuff。' }
        ]
      },
      {
        id: 'gd_b2',
        x: 340, y: 340,
        name: '疯狂技师斯宾克',
        isBoss: true,
        bossNum: 2,
        icon: '👑',
        creatureType: '麻疯侏儒',
        health: '42,000',
        characteristics: ['可昏迷', '可打断'],
        spells: [
          { name: '放射性炸弹投掷', icon: '💣', castTime: '瞬发', range: '30码', tags: ['躲炸弹'], desc: '投掷炸弹，5秒后爆炸造成巨额伤害，全员注意躲开红圈。' }
        ]
      },
      {
        id: 'gd_b3',
        x: 540, y: 230,
        name: '放射性清扫机终极版 (尾王)',
        isBoss: true,
        bossNum: 3,
        icon: '👑',
        creatureType: '巨型机械机甲',
        health: '64,000',
        characteristics: ['免疫控制'],
        spells: [
          { name: '旋转清扫齿轮', icon: '⚙️', castTime: '瞬发引导', range: '近战大范围', tags: ['大风车躲避'], desc: '机甲开启高速大风车旋转，近战必须立刻后撤，否则直接秒杀！' }
        ]
      }
    ]
  },
  {
    id: 'd_duskwood_stronghold',
    name: '暮色古堡',
    fullName: '暮色古堡 (Duskwood Stronghold)',
    level: '28 - 34 级',
    type: '5人暗黑剧情地下城',
    location: '暮色森林逆风小径边缘',
    mapTheme: '#0f172a',
    accentColor: '#ec4899',
    mapWidth: 700,
    mapHeight: 520,
    rooms: [
      { name: '废弃马厩与庭院', x: 120, y: 390, w: 140, h: 90 },
      { name: '幽暗血宴长厅', x: 280, y: 280, w: 140, h: 150 },
      { name: '领主藏骸主卧', x: 450, y: 150, w: 190, h: 210 }
    ],
    enemies: [
      {
        id: 'ds_b1',
        x: 180, y: 430,
        name: '狼人狂暴领主',
        isBoss: true,
        bossNum: 1,
        icon: '👑',
        creatureType: '狼人/人形',
        health: '34,000',
        characteristics: ['可减速', '嘲讽有效'],
        spells: [
          { name: '月夜狂暴', icon: '🌕', castTime: '瞬发', range: '自身', tags: ['攻速狂暴'], desc: '血量低于30%时攻速提升100%，坦克需开启减伤保命。' }
        ]
      },
      {
        id: 'ds_b2',
        x: 340, y: 340,
        name: '暗影死灵术士',
        isBoss: true,
        bossNum: 2,
        icon: '👑',
        creatureType: '亡灵',
        health: '38,000',
        characteristics: ['可打断'],
        spells: [
          { name: '暗影箭雨', icon: '🌑', castTime: '2.5秒读条', range: '40码', tags: ['可打断', '全队AOE'], desc: '全队暗影箭，必须专人打断。' }
        ]
      },
      {
        id: 'ds_b3',
        x: 540, y: 230,
        name: '斯塔文的怨念幻象 (尾王)',
        isBoss: true,
        bossNum: 3,
        icon: '👑',
        creatureType: '幽魂',
        health: '52,000',
        characteristics: ['需火把破盾'],
        spells: [
          { name: '无敌暗影帷幕 (火把破盾机制)', icon: '🕯️', castTime: '被动', range: '自身', tags: ['解谜机制'], desc: '全场昏暗，Boss免疫伤害！必须由一名队员拾取场地火把照亮Boss方可破除无敌护盾！' }
        ]
      }
    ]
  }
];

module.exports = {
  INFINITE_MDT_DUNGEONS
};
