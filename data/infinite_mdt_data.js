/**
/**
 * 魔兽世界「无限服」地下城与怪物机制速查数据库 (2026.11.05 官方最新上线全量)
 * 仅用于地下城地图与怪物技能机制速览图鉴，无需规划路线
 */

const INFINITE_MDT_DUNGEONS = [
  {
    id: 'd_hall_of_lords',
    name: '领主大厅',
    fullName: '领主大厅 (Hall of the Lords)',
    level: '58 - 60 级',
    type: '5人满级高阶地下城',
    location: '洛丹伦废墟深处',
    mapTheme: '#111827',
    accentColor: '#818cf8',
    mapWidth: 680,
    mapHeight: 460,
    rooms: [
      { name: '前庭卫所 (入口)', x: 40, y: 320, w: 160, h: 100, type: 'entrance' },
      { name: '行刑走廊', x: 230, y: 330, w: 120, h: 80, type: 'corridor' },
      { name: '幽冥监牢 (1号区)', x: 210, y: 150, w: 160, h: 150, type: 'wing' },
      { name: '议事长廊', x: 380, y: 220, w: 110, h: 80, type: 'corridor' },
      { name: '堕落议政圣所 (尾王殿)', x: 490, y: 110, w: 160, h: 220, type: 'boss_hall' }
    ],
    enemies: [
      // 区域1: 前庭卫所 (入口小怪群)
      {
        id: 'hl_e1', x: 70, y: 370, name: '白银堕落门卫', isBoss: false, icon: '🛡️', creatureType: '亡灵', health: '16,800',
        characteristics: ['可昏迷', '可减速', '嘲讽有效'],
        spells: [{ name: '重击', icon: '🩸', castTime: '瞬发', range: '近战', tags: ['坦克高伤'], desc: '对当前目标造成150%武器物理伤害。' }]
      },
      {
        id: 'hl_e2', x: 120, y: 350, name: '巡逻猎犬', isBoss: false, icon: '🐺', creatureType: '野兽', health: '11,200',
        characteristics: ['可冰冻', '可减速', '潜行侦测'],
        spells: [{ name: '撕咬破甲', icon: '🦷', castTime: '瞬发', range: '近战', tags: ['减甲破防'], desc: '撕咬目标使其护甲降低30%，可叠加3层。' }]
      },
      {
        id: 'hl_e3', x: 160, y: 380, name: '狂乱侍僧', isBoss: false, icon: '🧙‍♂️', creatureType: '人形', health: '13,500',
        characteristics: ['可打断', '可沉默', '可昏迷'],
        spells: [
          { name: '暗影愈合', icon: '✨', castTime: '1.8秒读条', range: '40码', tags: ['必打断', '治疗'], desc: '为重伤卫士恢复20%生命值，必须安排专人打断！' },
          { name: '暗影箭', icon: '🔮', castTime: '2.0秒读条', range: '30码', tags: ['单体暗影'], desc: '对仇恨最高目标造成高额暗影伤害。' }
        ]
      },
      // 区域2: 行刑走廊
      {
        id: 'hl_e4', x: 260, y: 350, name: '白银执刑官', isBoss: false, icon: '⚔️', creatureType: '亡灵精英', health: '22,000',
        characteristics: ['可减速', '免疫昏迷'],
        spells: [{ name: '斩首顺劈', icon: '🪓', castTime: '瞬发', range: '正面近战', tags: ['顺劈斩', '近战走位'], desc: '正面扇形顺劈，近战输出切勿站在坦克正面！' }]
      },
      {
        id: 'hl_e5', x: 310, y: 370, name: '受缚怨灵', isBoss: false, icon: '👻', creatureType: '亡灵', health: '12,000',
        characteristics: ['可放逐', '可打断'],
        spells: [{ name: '女妖哀嚎', icon: '📢', castTime: '2.5秒读条', range: '全队', tags: ['全队沉默', '必打断'], desc: '使全队陷入恐慌沉默4秒，施法职业务必秒断。' }]
      },
      // 区域3: 幽冥监牢 (1号Boss与护卫)
      {
        id: 'hl_b1', x: 280, y: 210, name: '狱长布莱克索恩 (1号首领)', isBoss: true, bossNum: 1, icon: '👑', creatureType: '亡灵精英', health: '85,000',
        characteristics: ['免疫一切控制', '狂暴机制'],
        spells: [
          { name: '锁链禁锢', icon: '⛓️', castTime: '瞬发', range: '30码', tags: ['强控点名'], desc: '随机用幽冥铁链锁住1名治疗或输出，其余队友需转火打掉铁链。' },
          { name: '狱火风暴', icon: '🔥', castTime: '3秒读条', range: '全场', tags: ['全队AOE', '走位躲避'], desc: '地面喷涌暗影烈焰，全员必须远离黑水区域！' }
        ]
      },
      {
        id: 'hl_e6', x: 240, y: 250, name: '监牢刑讯看守', isBoss: false, icon: '🛡️', creatureType: '亡灵', health: '17,500',
        characteristics: ['可昏迷', '可定身'],
        spells: [{ name: '盾牌猛击', icon: '🛡️', castTime: '瞬发', range: '近战', tags: ['昏迷击退'], desc: '击退主坦克并使其昏迷2秒，副仇恨需提防OT。' }]
      },
      // 区域4: 议事长廊
      {
        id: 'hl_e7', x: 410, y: 240, name: '议会奥术傀儡', isBoss: false, icon: '🤖', creatureType: '机械', health: '24,000',
        characteristics: ['不可昏迷', '嘲讽有效'],
        spells: [{ name: '过载自爆', icon: '💥', castTime: '3秒自爆', range: '15码', tags: ['临死自爆', '全员散开'], desc: '血量降至15%开始自爆，近战全员需第一时间后撤15码！' }]
      },
      {
        id: 'hl_e8', x: 440, y: 270, name: '皇家密探潜行者', isBoss: false, icon: '🗡️', creatureType: '亡灵潜行', health: '14,000',
        characteristics: ['潜行突袭', '可致盲'],
        spells: [{ name: '伏击背刺', icon: '🗡️', castTime: '瞬发', range: '近战', tags: ['偷袭后排'], desc: '突然现身伏击后排布甲，治疗需及时开减伤。' }]
      },
      // 区域5: 堕落议政圣所 (2号与尾王)
      {
        id: 'hl_b2', x: 540, y: 240, name: '大审判官法斯琪娅 (2号首领)', isBoss: true, bossNum: 2, icon: '👑', creatureType: '亡灵法皇', health: '92,000',
        characteristics: ['可打断法术', '法术护盾'],
        spells: [
          { name: '虚空陨石', icon: '☄️', castTime: '2.5秒读条', range: '40码', tags: ['分担AOE'], desc: '点名落下一颗暗影流星，落点全队分摊伤害，单人吃直接秒杀！' },
          { name: '法力吸取', icon: '🌀', castTime: '引导4秒', range: '35码', tags: ['抽蓝减蓝', '必打断'], desc: '迅速抽取治疗法力值，必须立即打断！' }
        ]
      },
      {
        id: 'hl_e9', x: 590, y: 260, name: '堕落皇家卫队长', isBoss: false, icon: '🛡️', creatureType: '精英', health: '21,000',
        characteristics: ['可打断', '免疫定身'],
        spells: [{ name: '防御战姿', icon: '🛡️', castTime: '瞬发', range: '自身', tags: ['大额减伤'], desc: '格挡率提升50%，持续8秒。' }]
      },
      {
        id: 'hl_b3', x: 570, y: 150, name: '莫格莱尼残魂·领主大公 (尾王)', isBoss: true, bossNum: 3, icon: '👑', creatureType: '亡灵君王', health: '145,000',
        characteristics: ['免疫一切控制', '狂暴灭团技'],
        spells: [
          { name: '灰烬之怒', icon: '🔥', castTime: '瞬发', range: '正面40码', tags: ['秒杀喷涌', '严禁站正面'], desc: '向正面喷射高额圣光烈焰，除坦克外任何人必秒，全员必须站Boss背后！' },
          { name: '堕落忏悔', icon: '✨', castTime: '2.0秒读条', range: '全场', tags: ['全队瘫痪', '治疗秒驱'], desc: '随机使2名玩家瘫痪6秒，治疗必须第一时间驱散魔法。' },
          { name: '亡者天灾军团 (P2转阶段)', icon: '💀', castTime: '血量40%触发', range: '全场', tags: ['全场转火'], desc: '召唤6名天灾自爆骷髅，DPS必须全力AOE清怪！' }
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
    location: '泽风岛 (微风岛新种族主岛)',
    mapTheme: '#082f49',
    accentColor: '#38bdf8',
    mapWidth: 680,
    mapHeight: 460,
    rooms: [
      { name: '风语回廊 (入口梯道)', x: 40, y: 310, w: 160, h: 100, type: 'entrance' },
      { name: '微风试炼台', x: 230, y: 320, w: 120, h: 90, type: 'wing' },
      { name: '浮空断崖 (悬空桥)', x: 220, y: 160, w: 150, h: 130, type: 'corridor' },
      { name: '气旋云梯', x: 390, y: 220, w: 100, h: 80, type: 'corridor' },
      { name: '风暴圣坛 (领主神殿)', x: 500, y: 120, w: 150, h: 210, type: 'boss_hall' }
    ],
    enemies: [
      // 区域1: 风语回廊
      {
        id: 'zs_e1', x: 70, y: 360, name: '狂躁风元素幼体', isBoss: false, icon: '🌪️', creatureType: '元素', health: '5,800',
        characteristics: ['可冰冻', '可减速', '可击飞'],
        spells: [{ name: '微风冲击', icon: '💨', castTime: '瞬发', range: '20码', tags: ['击退击飞'], desc: '微小风弹击退目标3码。' }]
      },
      {
        id: 'zs_e2', x: 120, y: 340, name: '风怒鹰身巡逻斥候', isBoss: false, icon: '🦅', creatureType: '人形', health: '7,400',
        characteristics: ['可昏迷', '可致盲', '可打断'],
        spells: [
          { name: '尖啸呼唤', icon: '📢', castTime: '2.0秒读条', range: '30码', tags: ['呼叫援军', '必打断'], desc: '尖叫呼唤回廊深处的小怪助战，施法职业务必断条！' },
          { name: '俯冲爪击', icon: '🦅', castTime: '瞬发', range: '近战', tags: ['流血高伤'], desc: '撕裂目标，造成持续8秒的流血物理伤害。' }
        ]
      },
      {
        id: 'zs_e3', x: 160, y: 370, name: '塑风学徒', isBoss: false, icon: '🧙‍♂️', creatureType: '天裔/人形', health: '6,600',
        characteristics: ['可打断', '可沉默'],
        spells: [{ name: '风刃术', icon: '🌪️', castTime: '1.5秒读条', range: '35码', tags: ['自然伤害'], desc: '向目标发射高速风刃，造成单体自然伤害。' }]
      },
      // 区域2: 微风试炼台 (1号Boss)
      {
        id: 'zs_b1', x: 280, y: 360, name: '唤风学者瑟琳 (1号首领)', isBoss: true, bossNum: 1, icon: '👑', creatureType: '天裔精英', health: '42,000',
        characteristics: ['可打断法术', '免疫昏迷'],
        spells: [
          { name: '轻风护盾', icon: '🛡️', castTime: '瞬发', range: '自身', tags: ['吸收护盾'], desc: '制造风之气流吸收伤害并反弹远程投射法术。' },
          { name: '穿透强风', icon: '🌪️', castTime: '2.0秒读条', range: '40码', tags: ['直线贯穿', '必打断'], desc: '直线穿透飓风伤害，注意侧向走位躲开正面。' }
        ]
      },
      {
        id: 'zs_e4', x: 310, y: 320, name: '风暴信徒卫兵', isBoss: false, icon: '🛡️', creatureType: '人形', health: '8,800',
        characteristics: ['可减速', '嘲讽有效'],
        spells: [{ name: '疾风斩', icon: '⚔️', castTime: '瞬发', range: '近战', tags: ['快速连击'], desc: '连续挥舞双刀造成2次攻击。' }]
      },
      // 区域3: 浮空断崖
      {
        id: 'zs_e5', x: 240, y: 230, name: '断崖风行兽', isBoss: false, icon: '🐆', creatureType: '野兽', health: '9,500',
        characteristics: ['可冰冻', '扑击点名'],
        spells: [{ name: '狂风飞扑', icon: '💨', castTime: '瞬发', range: '25码', tags: ['扑击眩晕'], desc: '随机扑向远程玩家并眩晕1.5秒。' }]
      },
      {
        id: 'zs_b2', x: 290, y: 190, name: '暴怒狂风巨怪 (2号首领)', isBoss: true, bossNum: 2, icon: '👑', creatureType: '元素巨怪', health: '58,000',
        characteristics: ['免疫定身', '嘲讽有效'],
        spells: [
          { name: '龙卷风吹飞', icon: '🌪️', castTime: '瞬发', range: '全场', tags: ['悬崖击飞', '危险走位'], desc: '场地随机生成3道龙卷风，踩中将被击飞下浮空断崖摔死！' },
          { name: '闪电链迸裂', icon: '⚡', castTime: '2.0秒读条', range: '35码', tags: ['弹射AOE'], desc: '闪电链弹射3名玩家，全员分散站位5码以上。' }
        ]
      },
      // 区域4: 气旋云梯
      {
        id: 'zs_e6', x: 420, y: 250, name: '激流风暴编织者', isBoss: false, icon: '⚡', creatureType: '天裔精英', health: '12,500',
        characteristics: ['可打断', '可昏迷'],
        spells: [{ name: '静电力场', icon: '⚡', castTime: '2.5秒读条', range: '自身20码', tags: ['力场AOE', '必打断'], desc: '制造带电环形力场，全队需打断或迅速走出范围。' }]
      },
      // 区域5: 风暴圣坛 (尾王)
      {
        id: 'zs_e7', x: 530, y: 260, name: '圣坛执风守卫', isBoss: false, icon: '🛡️', creatureType: '元素卫士', health: '14,000',
        characteristics: ['嘲讽有效', '高护甲'],
        spells: [{ name: '风暴护甲', icon: '🛡️', castTime: '瞬发', range: '自身', tags: ['荆棘反伤'], desc: '近战攻击者每次命中将受到反噬自然伤害。' }]
      },
      {
        id: 'zs_b3', x: 570, y: 170, name: '风暴领主艾尔索斯 (尾王)', isBoss: true, bossNum: 3, icon: '👑', creatureType: '高阶元素领主', health: '120,000',
        characteristics: ['免疫一切控制', '全场机制灭团'],
        spells: [
          { name: '全场暴风过载 (灭团技)', icon: '⚡', castTime: '引导6秒', range: '全图', tags: ['全场秒杀', '机制破局'], desc: 'Boss召唤狂暴台风席卷全场，玩家必须迅速踩进场地中央的【静风法阵】免疫伤害，否则必死！' },
          { name: '飓风推飞', icon: '💨', castTime: '瞬发', range: '近战', tags: ['坦克背靠墙'], desc: '强力推飞主坦克，主坦务必背靠巨石墙壁站位防止跌落！' }
        ]
      }
    ]
  },
  {
    id: 'd_ruins_lordaeron',
    name: '洛丹伦废墟',
    fullName: '洛丹伦废墟地下走廊 (Ruins of Lordaeron)',
    level: '55 - 60 级',
    type: '5人经典满级地下城',
    location: '提瑞斯法林地',
    mapTheme: '#18181b',
    accentColor: '#a1a1aa',
    mapWidth: 680,
    mapHeight: 460,
    rooms: [
      { name: '王城外门坍塌处', x: 40, y: 310, w: 160, h: 100, type: 'entrance' },
      { name: '皇家地下通道', x: 230, y: 320, w: 120, h: 90, type: 'corridor' },
      { name: '白银之手遗迹圣堂', x: 220, y: 160, w: 150, h: 130, type: 'wing' },
      { name: '下水道迷宫', x: 390, y: 220, w: 100, h: 80, type: 'corridor' },
      { name: '王座地牢深渊', x: 500, y: 120, w: 150, h: 210, type: 'boss_hall' }
    ],
    enemies: [
      {
        id: 'rl_e1', x: 80, y: 350, name: '游荡的腐烂食尸鬼', isBoss: false, icon: '🧟', creatureType: '亡灵', health: '13,200',
        characteristics: ['可减速', '可冰冻', '狂暴'],
        spells: [{ name: '食肉撕裂', icon: '🩸', castTime: '瞬发', range: '近战', tags: ['易伤DeBuff'], desc: '造成物理伤害并使目标受到的物理伤害提高10%。' }]
      },
      {
        id: 'rl_e2', x: 130, y: 340, name: '天灾通灵师', isBoss: false, icon: '💀', creatureType: '人形', health: '14,500',
        characteristics: ['必打断', '可致盲', '可沉默'],
        spells: [
          { name: '复生骸骨', icon: '💀', castTime: '2.5秒读条', range: '30码', tags: ['召唤群怪', '必打断'], desc: '不断唤醒周围尸体变成骷髅兵，必须第一时间打断！' },
          { name: '暗影箭雨', icon: '🔮', castTime: '3.0秒读条', range: '全队', tags: ['全队暗影'], desc: '向全队抛洒暗影之箭。' }
        ]
      },
      {
        id: 'rl_b1', x: 290, y: 210, name: '堕落骑士加文 (1号首领)', isBoss: true, bossNum: 1, icon: '👑', creatureType: '亡灵骑士', health: '78,000',
        characteristics: ['免疫昏迷', '破甲机制'],
        spells: [
          { name: '破甲顺劈', icon: '🪓', castTime: '瞬发', range: '正面近战', tags: ['坦克死刑'], desc: '对正面劈砍造成高额伤害并粉碎护甲，副坦需备换嘲。' },
          { name: '白银背弃斩', icon: '⚔️', castTime: '瞬发', range: '近战', tags: ['点名大伤害'], desc: '随机转向非坦克目标突刺，治疗需预读大圣光。' }
        ]
      },
      {
        id: 'rl_e3', x: 420, y: 240, name: '下水道剧毒淤泥怪', isBoss: false, icon: '🦠', creatureType: '不可分类', health: '16,000',
        characteristics: ['免疫诱捕', '毒性分裂'],
        spells: [{ name: '毒液喷射', icon: '🧪', castTime: '瞬发', range: '15码', tags: ['全员剧毒', '萨满清毒'], desc: '喷洒高额持续自然毒素，萨满与德鲁伊需迅速解毒。' }]
      },
      {
        id: 'rl_b2', x: 570, y: 170, name: '瘟疫制造者诺斯替克 (尾王)', isBoss: true, bossNum: 2, icon: '👑', creatureType: '天灾巫妖', health: '135,000',
        characteristics: ['转阶段传送', '诅咒全队'],
        spells: [
          { name: '洛丹伦黑死病', icon: '☣️', castTime: '瞬发', range: '全图', tags: ['灭团高危', '法师德鲁伊解'], desc: '点名全队黑死病诅咒，若10秒内未解除将传染全队并造成即死性伤害！' },
          { name: '凋零之云', icon: '☁️', castTime: '引导8秒', range: '全场', tags: ['地面毒水', '全员风筝'], desc: '场地扩散剧毒迷雾，全员必须随着安全路线不断移动风筝。' }
        ]
      }
    ]
  },
  {
    id: 'd_shendralar_archives',
    name: '辛德拉档案馆',
    fullName: '辛德拉秘法档案馆 (Shendralar Archives)',
    level: '56 - 60 级',
    type: '5人奥术高阶地下城',
    location: '菲拉斯·厄运之槌遗迹群深处',
    mapTheme: '#311042',
    accentColor: '#c084fc',
    mapWidth: 680,
    mapHeight: 460,
    rooms: [
      { name: '档案室外庭', x: 40, y: 310, w: 160, h: 100, type: 'entrance' },
      { name: '奥术藏书长廊', x: 230, y: 320, w: 120, h: 90, type: 'corridor' },
      { name: '禁断秘卷陈列馆', x: 220, y: 160, w: 150, h: 130, type: 'wing' },
      { name: '法力晶能导管区', x: 390, y: 220, w: 100, h: 80, type: 'corridor' },
      { name: '上古秘法核心圣所', x: 500, y: 120, w: 150, h: 210, type: 'boss_hall' }
    ],
    enemies: [
      {
        id: 'sa_e1', x: 80, y: 350, name: '失控魔力魔典', isBoss: false, icon: '📖', creatureType: '奥术魔法', health: '12,500',
        characteristics: ['可打断', '法术反射'],
        spells: [{ name: '秘法飞弹', icon: '✨', castTime: '引导3秒', range: '30码', tags: ['奥术飞弹'], desc: '快速发射5枚奥术飞弹攻击随机目标。' }]
      },
      {
        id: 'sa_e2', x: 130, y: 340, name: '上古辛德拉档案官', isBoss: false, icon: '🧙‍♀️', creatureType: '暗夜精灵亡灵', health: '17,800',
        characteristics: ['必打断', '群体沉默'],
        spells: [
          { name: '魔力封印', icon: '🔒', castTime: '2.0秒读条', range: '40码', tags: ['打断反制', '沉默治疗'], desc: '若施法者被此技能命中，将被沉默6秒。' },
          { name: '奥术暴风', icon: '🌀', castTime: '引导4秒', range: '全队', tags: ['全场AOE'], desc: '在地面制造奥术漩涡，踩入者持续掉血。' }
        ]
      },
      {
        id: 'sa_b1', x: 290, y: 210, name: '档案守卫者阿塔尼斯 (1号首领)', isBoss: true, bossNum: 1, icon: '👑', creatureType: '奥术构造体', health: '88,000',
        characteristics: ['高法术抗性', '护盾反弹'],
        spells: [
          { name: '法力震荡波', icon: '⚡', castTime: '瞬发', range: '自身20码', tags: ['击退击飞'], desc: '将周围所有近战震退20码并造成法力流失。' },
          { name: '棱镜充能 (吸收盾)', icon: '🛡️', castTime: '瞬发', range: '自身', tags: ['吸收护盾', '物理集火'], desc: '开启奥术吸收护盾，期间免疫魔法伤害，必须物理DPS破盾！' }
        ]
      },
      {
        id: 'sa_b2', x: 570, y: 170, name: '大魔导师瓦兰德斯 (尾王)', isBoss: true, bossNum: 2, icon: '👑', creatureType: '辛德拉秘法皇', health: '142,000',
        characteristics: ['免疫打断', '全场时空静止'],
        spells: [
          { name: '时空回溯', icon: '⏳', castTime: '3.0秒读条', range: '全场', tags: ['时光倒流', '集火打断'], desc: '尝试回溯时光使自己恢复15%生命值，全队需集中打掉其奥术屏障破法！' },
          { name: '奥术湮灭星雨', icon: '🌠', castTime: '引导6秒', range: '全场', tags: ['全队AOE', '减伤覆盖'], desc: '全场疯狂降下奥术流星，治疗必须开启全减伤大招（宁静/真言术障）。' }
        ]
      }
    ]
  },
  {
    id: 'd_mire_abyss',
    name: '泥沼深渊',
    fullName: '泥沼深渊 (Mire Abyss)',
    level: '57 - 60 级',
    type: '5人泥潭与剧毒地下城',
    location: '尘泥沼泽黑龙巢穴外围',
    mapTheme: '#142718',
    accentColor: '#4ade80',
    mapWidth: 680,
    mapHeight: 460,
    rooms: [
      { name: '毒雾泥潭入口', x: 40, y: 310, w: 160, h: 100, type: 'entrance' },
      { name: '鳄鱼盘踞浅滩', x: 230, y: 320, w: 120, h: 90, type: 'corridor' },
      { name: '深渊沉船废墟', x: 220, y: 160, w: 150, h: 130, type: 'wing' },
      { name: '腐败水下溶洞', x: 390, y: 220, w: 100, h: 80, type: 'corridor' },
      { name: '黑龙龙卵孵化渊室', x: 500, y: 120, w: 150, h: 210, type: 'boss_hall' }
    ],
    enemies: [
      {
        id: 'ma_e1', x: 80, y: 350, name: '泥沼剧毒多头蛇', isBoss: false, icon: '🐍', creatureType: '野兽', health: '18,500',
        characteristics: ['可昏迷', '剧毒顺劈'],
        spells: [{ name: '剧毒喷射', icon: '🧪', castTime: '瞬发', range: '正面近战', tags: ['剧毒顺劈'], desc: '对正面扇形喷吐强力腐蚀毒素，不可站正面。' }]
      },
      {
        id: 'ma_b1', x: 290, y: 210, name: '沼泽暴君克罗尔 (1号首领)', isBoss: true, bossNum: 1, icon: '👑', creatureType: '变异巨鳄', health: '82,000',
        characteristics: ['狂暴', '流血高伤'],
        spells: [
          { name: '死亡翻滚', icon: '🐊', castTime: '瞬发', range: '近战', tags: ['强控坦克', '大流血'], desc: '咬住主坦克进行翻滚造成巨量流血伤害并瘫痪3秒。' },
          { name: '泥潭召唤', icon: '🌿', castTime: '瞬发', range: '场地', tags: ['召唤幼鳄'], desc: '召唤4只小鳄鱼群殴治疗，副坦需及时群嘲拉住。' }
        ]
      },
      {
        id: 'ma_b2', x: 570, y: 170, name: '黑龙孵化者凡妮莎 (尾王)', isBoss: true, bossNum: 2, icon: '👑', creatureType: '龙人领主', health: '138,000',
        characteristics: ['龙类扫尾', '龙息喷吐'],
        spells: [
          { name: '暗影龙息', icon: '🐲', castTime: '2.0秒读条', range: '正面40码', tags: ['坦克换嘲', '正面秒杀'], desc: '对前方喷出暗黑烈焰，使受到火焰伤害提高50%，需换嘲。' },
          { name: '狂暴龙卵孵化', icon: '🥚', castTime: '瞬发', range: '全场', tags: ['踩蛋机制', 'DPS转火'], desc: '全场龙卵开始颤动，DPS必须提前踩碎龙卵防止小黑龙孵化！' }
        ]
      }
    ]
  },
  {
    id: 'd_windfury_spire',
    name: '风怒尖塔',
    fullName: '风怒尖塔 (Windfury Spire)',
    level: '58 - 60 级',
    type: '5人元素高塔地下城',
    location: '海加尔山脉秩序前哨',
    mapTheme: '#1e293b',
    accentColor: '#38bdf8',
    mapWidth: 680,
    mapHeight: 460,
    rooms: [
      { name: '塔基环梯入口', x: 40, y: 310, w: 160, h: 100, type: 'entrance' },
      { name: '烈风旋转升降台', x: 230, y: 320, w: 120, h: 90, type: 'corridor' },
      { name: '雷霆充能平台 (中层)', x: 220, y: 160, w: 150, h: 130, type: 'wing' },
      { name: '外缘浮空索桥', x: 390, y: 220, w: 100, h: 80, type: 'corridor' },
      { name: '尖塔风暴穹顶 (天台尾王)', x: 500, y: 120, w: 150, h: 210, type: 'boss_hall' }
    ],
    enemies: [
      {
        id: 'ws_e1', x: 80, y: 350, name: '尖塔风暴狂暴者', isBoss: false, icon: '⚔️', creatureType: '人形/元素', health: '19,000',
        characteristics: ['激怒', '风怒连击'],
        spells: [{ name: '风怒三连击', icon: '⚡', castTime: '被动触发', range: '近战', tags: ['瞬间秒坦'], desc: '普通攻击有20%几率额外触发2次瞬间物理攻击，坦克防暴毙！' }]
      },
      {
        id: 'ws_b1', x: 290, y: 210, name: '雷霆风暴行者 (1号首领)', isBoss: true, bossNum: 1, icon: '👑', creatureType: '雷电元素领主', health: '86,000',
        characteristics: ['闪电充能', '全员点名'],
        spells: [
          { name: '静电过载连线', icon: '⚡', castTime: '瞬发', range: '全场', tags: ['连线拉断', '走位跑开'], desc: '随机点名2名玩家闪电连线，两人必须向相反方向奔跑拉断连线！' },
          { name: '风怒图腾', icon: '🗿', castTime: '瞬发', range: '场地', tags: ['必须秒拆'], desc: '在场地插下风怒图腾，使周围怪物攻速提高100%，必须秒拆！' }
        ]
      },
      {
        id: 'ws_b2', x: 570, y: 170, name: '风怒大领主凯兰 (尾王)', isBoss: true, bossNum: 2, icon: '👑', creatureType: '高阶风怒行者', health: '148,000',
        characteristics: ['全场狂风', '吹飞悬崖'],
        spells: [
          { name: '塔顶飓风暴破', icon: '🌪️', castTime: '4.0秒读条', range: '全场', tags: ['全员抱团', '找掩体'], desc: '巨大的狂风将全队向尖塔边缘猛烈推飞，全员必须抱团躲在石柱后方！' },
          { name: '闪电风暴击碎', icon: '⚡', castTime: '2.5秒读条', range: '主坦', tags: ['坦克破甲大死刑'], desc: '对当前目标造成350%武器高额电击伤害，坦克开大减伤。' }
        ]
      }
    ]
  },
  {
    id: 'd_temple_of_sorrow',
    name: '悲伤神殿',
    fullName: '悲伤沼泽沉没神殿深层 (Temple of Sorrow)',
    level: '54 - 58 级',
    type: '5人古神与绿龙地下城',
    location: '悲伤沼泽水下地宫',
    mapTheme: '#111827',
    accentColor: '#10b981',
    mapWidth: 680,
    mapHeight: 460,
    rooms: [
      { name: '浸水神殿长廊', x: 40, y: 310, w: 160, h: 100, type: 'entrance' },
      { name: '阿塔莱祭祀平台', x: 230, y: 320, w: 120, h: 90, type: 'corridor' },
      { name: '沉没之池祭坛', x: 220, y: 160, w: 150, h: 130, type: 'wing' },
      { name: '巨魔白骨环廊', x: 390, y: 220, w: 100, h: 80, type: 'corridor' },
      { name: '哈卡莱噬魂圣所 (尾王)', x: 500, y: 120, w: 150, h: 210, type: 'boss_hall' }
    ],
    enemies: [
      {
        id: 'ts_e1', x: 80, y: 350, name: '阿塔莱血法师', isBoss: false, icon: '🩸', creatureType: '巨魔人形', health: '16,000',
        characteristics: ['可打断', '吸血光环'],
        spells: [{ name: '鲜血虹吸', icon: '🩸', castTime: '引导3秒', range: '30码', tags: ['必打断', '吸血'], desc: '吸取目标生命值并大幅回复自身血量，必须打断。' }]
      },
      {
        id: 'ts_b1', x: 290, y: 210, name: '噩梦巨龙幼体 (1号首领)', isBoss: true, bossNum: 1, icon: '👑', creatureType: '绿龙/龙类', health: '84,000',
        characteristics: ['催眠睡雾', '龙息'],
        spells: [
          { name: '翡翠沉睡', icon: '💤', castTime: '瞬发', range: '20码', tags: ['催眠全场', '受到伤害打破'], desc: '使周围玩家陷入沉睡10秒，受到伤害可打断沉睡。' },
          { name: '酸蚀龙息', icon: '🧪', castTime: '2.0秒读条', range: '正面', tags: ['正面毒伤'], desc: '正面扇形酸液吐息，坦克保持背对人群。' }
        ]
      },
      {
        id: 'ts_b2', x: 570, y: 170, name: '神皇哈卡之影 (尾王)', isBoss: true, bossNum: 2, icon: '👑', creatureType: '风蛇古神', health: '136,000',
        characteristics: ['堕落之血', '全场心控'],
        spells: [
          { name: '堕落之血 (传染DeBuff)', icon: '🩸', castTime: '瞬发', range: '全图', tags: ['全场传染', '分散站位'], desc: '恶名昭彰的传染性疫病，点名玩家互相靠近会疯狂传染扩散，全员散开！' },
          { name: '精神鞭笞心控', icon: '🧠', castTime: '引导5秒', range: '40码', tags: ['心控队友', '队友控场'], desc: '心控DPS最高的队友攻击自己人，队友需第一时间羊/盲/锁心控者！' }
        ]
      }
    ]
  },
  {
    id: 'd_gnomeregan_deep',
    name: '诺莫瑞根深层机械区',
    fullName: '诺莫瑞根深层机械核心区 (Gnomeregan Deep Mechanics)',
    level: '55 - 58 级',
    type: '5人侏儒机械地下城',
    location: '丹莫罗诺莫瑞根地下深层',
    mapTheme: '#262626',
    accentColor: '#f97316',
    mapWidth: 680,
    mapHeight: 460,
    rooms: [
      { name: '齿轮升降梯入口', x: 40, y: 310, w: 160, h: 100, type: 'entrance' },
      { name: '放射性废料排污管', x: 230, y: 320, w: 120, h: 90, type: 'corridor' },
      { name: '机械装配流水线', x: 220, y: 160, w: 150, h: 130, type: 'wing' },
      { name: '高压蒸汽闸室', x: 390, y: 220, w: 100, h: 80, type: 'corridor' },
      { name: '机械狂人麦克尼尔控制核心', x: 500, y: 120, w: 150, h: 210, type: 'boss_hall' }
    ],
    enemies: [
      {
        id: 'gd_e1', x: 80, y: 350, name: '辐射麻风侏儒工程师', isBoss: false, icon: '⚙️', creatureType: '人形', health: '14,800',
        characteristics: ['投掷地雷', '可打断'],
        spells: [{ name: '爆破地雷', icon: '💣', castTime: '瞬发', range: '场地', tags: ['踩雷高伤'], desc: '在地面扔下步兵地雷，走位需绕开。' }]
      },
      {
        id: 'gd_b1', x: 290, y: 210, name: '高压防暴战车 (1号首领)', isBoss: true, bossNum: 1, icon: '👑', creatureType: '重装机械', health: '89,000',
        characteristics: ['不可定身', '正面冲锋'],
        spells: [
          { name: '推土冲撞', icon: '🚜', castTime: '2.0秒读条', range: '直线50码', tags: ['直线秒杀', '迅速侧闪'], desc: '锁定一条路径高速冲撞，被撞到的任何人直接秒杀！' },
          { name: '灼热蒸汽喷射', icon: '💨', castTime: '瞬发', range: '自身周围', tags: ['近战走位'], desc: '向周围喷发高温蒸汽，近战必须后退。' }
        ]
      },
      {
        id: 'gd_b2', x: 570, y: 170, name: '麦克尼尔泰坦机甲 Mk-IV (尾王)', isBoss: true, bossNum: 2, icon: '👑', creatureType: '巨型机械BOSS', health: '146,000',
        characteristics: ['护盾转换', '全屏导弹'],
        spells: [
          { name: '集束火箭齐射', icon: '🚀', castTime: '引导5秒', range: '全图', tags: ['红圈走位', '全队散开'], desc: '全场落下数十枚红圈火箭弹，全员需持续跑动躲避红圈！' },
          { name: '高能电磁充能', icon: '🔋', castTime: '瞬发', range: '自身', tags: ['集火充能柱'], desc: '机甲开启无敌状态，全员必须在20秒内打掉场边4根导电立柱解开无敌！' }
        ]
      }
    ]
  },
  {
    id: 'd_duskwood_stronghold',
    name: '暮色古堡',
    fullName: '暮色古堡深渊地窖 (Duskwood Stronghold)',
    level: '58 - 60 级',
    type: '5人暗影吸血鬼与狼人地下城',
    location: '暮色森林·乌鸦岭墓园地下',
    mapTheme: '#171717',
    accentColor: '#e11d48',
    mapWidth: 680,
    mapHeight: 460,
    rooms: [
      { name: '阴森墓门入口', x: 40, y: 310, w: 160, h: 100, type: 'entrance' },
      { name: '血色贵族宴会厅', x: 230, y: 320, w: 120, h: 90, type: 'corridor' },
      { name: '狼人嚎叫刑讯室', x: 220, y: 160, w: 150, h: 130, type: 'wing' },
      { name: '地穴棺椁迷宫', x: 390, y: 220, w: 100, h: 80, type: 'corridor' },
      { name: '暗影伯爵寝宫 (尾王)', x: 500, y: 120, w: 150, h: 210, type: 'boss_hall' }
    ],
    enemies: [
      {
        id: 'ds_e1', x: 80, y: 350, name: '暮色吸血蝠群', isBoss: false, icon: '🦇', creatureType: '野兽', health: '12,000',
        characteristics: ['可打断', '高攻速'],
        spells: [{ name: '蝠群盲目', icon: '🦇', castTime: '瞬发', range: '近战', tags: ['致盲命中下降'], desc: '致盲目标使其物理命中率降低40%。' }]
      },
      {
        id: 'ds_b1', x: 290, y: 210, name: '狂暴狼王沃根 (1号首领)', isBoss: true, bossNum: 1, icon: '👑', creatureType: '狼人精英', health: '87,000',
        characteristics: ['月圆狂暴', '流血叠加'],
        spells: [
          { name: '月圆撕裂', icon: '🐺', castTime: '瞬发', range: '近战', tags: ['无限叠加流血'], desc: '对目标施加流血效果，每秒掉血500点，可无限叠加，治疗压力极大！' },
          { name: '群体狼嚎', icon: '📢', castTime: '瞬发', range: '全图', tags: ['全场恐惧3秒'], desc: '全员恐惧奔跑3秒，需萨满战栗图腾或牧师防护恐惧结界。' }
        ]
      },
      {
        id: 'ds_b2', x: 570, y: 170, name: '德拉库拉暗影伯爵 (尾王)', isBoss: true, bossNum: 2, icon: '👑', creatureType: '吸血鬼血领主', health: '150,000',
        characteristics: ['生命虹吸', '化身蝙蝠'],
        spells: [
          { name: '鲜血盛宴 (心控吸血)', icon: '🍷', castTime: '瞬发', range: '30码', tags: ['点名控场', '集火破盾'], desc: '禁锢一名队友并疯狂汲取其生命转化为自身血量，队友需集火打破血盾解救！' },
          { name: '黑夜暗影潜行 (P2隐身)', icon: '🌑', castTime: '瞬发', range: '全场', tags: ['隐身伏击', '点亮烛台'], desc: '场地陷入完全漆黑，Boss隐身潜伏，全员必须在10秒内点亮四周烛台使其现形！' }
        ]
      }
    ]
  }
];

module.exports = {
  INFINITE_MDT_DUNGEONS
};
