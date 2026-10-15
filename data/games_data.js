/**
 * 魔兽世界小游戏板块核心数据与配置
 * 包括：打断训练营技能库、魔兽百晓生题库、记忆配对技能库、词缀生存配置
 */

// 1. 打断特训营技能库
const KICK_SPELLS = [
  // 普通打断技能 (isShielded: false)
  {
    id: 'k1',
    caster: '唤风萨满',
    spell: '极寒风暴',
    icon: '🌪️',
    castTime: 1800, // 毫秒
    isShielded: false,
    threat: '灭团级',
    desc: '高额全团AOE，必须打断！'
  },
  {
    id: 'k2',
    caster: '暗影修道院狂热者',
    spell: '心智控制',
    icon: '🧠',
    castTime: 1600,
    isShielded: false,
    threat: '致命',
    desc: '控制关键队友，秒断优先！'
  },
  {
    id: 'k3',
    caster: '血色大主教',
    spell: '强效治疗术',
    icon: '✨',
    castTime: 2000,
    isShielded: false,
    threat: '高',
    desc: '恢复首领50%生命，不准漏断！'
  },
  {
    id: 'k4',
    caster: '通灵造物法师',
    spell: '凋零箭雨',
    icon: '💀',
    castTime: 1500,
    isShielded: false,
    threat: '高',
    desc: '全队剧毒DOT，迅速打断！'
  },
  {
    id: 'k5',
    caster: '地精爆破手',
    spell: '自爆炸药引信',
    icon: '💣',
    castTime: 1100, // 极速
    isShielded: false,
    threat: '秒杀',
    desc: '极速读条！考验反应速度！'
  },
  {
    id: 'k6',
    caster: '黑铁烈焰术士',
    spell: '地狱烈焰雨',
    icon: '🔥',
    castTime: 1700,
    isShielded: false,
    threat: '灭团级',
    desc: '地板持续高伤，打断后输出！'
  },
  {
    id: 'k7',
    caster: '巨魔巫医',
    spell: '妖术巫毒变蛙',
    icon: '🐸',
    castTime: 1900,
    isShielded: false,
    threat: '高',
    desc: '将坦克变为青蛙，必须防范！'
  },
  {
    id: 'k8',
    caster: '红玉烈焰召唤师',
    spell: '熔岩爆裂',
    icon: '🌋',
    castTime: 1400,
    isShielded: false,
    threat: '极高',
    desc: '单体毁灭性爆发，起手即断！'
  },
  {
    id: 'k9',
    caster: '虚空祭司',
    spell: '暗影之门召唤',
    icon: '👁️',
    castTime: 2200,
    isShielded: false,
    threat: '中',
    desc: '召唤额外小怪，压哨或秒断！'
  },
  {
    id: 'k10',
    caster: '塞塔里斯信徒',
    spell: '剧毒喷射',
    icon: '🐍',
    castTime: 1300,
    isShielded: false,
    threat: '高',
    desc: '锥形吐毒，考验手速！'
  },

  // 钢条/免疫技能 (isShielded: true -> 严禁打断，误按扣心)
  {
    id: 's1',
    caster: '深渊守卫',
    spell: '钢铁壁垒防护',
    icon: '🛡️',
    castTime: 1800,
    isShielded: true,
    threat: '钢条免疫',
    desc: '【钢条】不可打断！按打断将浪费技能并受惩罚！'
  },
  {
    id: 's2',
    caster: '机械魔像',
    spell: '充能过载反冲',
    icon: '⚡',
    castTime: 2000,
    isShielded: true,
    threat: '钢条反弹',
    desc: '【钢条】防护立场生效中，禁止打断！'
  },
  {
    id: 's3',
    caster: '狂暴督军',
    spell: '不屈怒吼',
    icon: '💢',
    castTime: 1600,
    isShielded: true,
    threat: '狂暴免断',
    desc: '【钢条】免疫一切打断与沉默！'
  },
  {
    id: 's4',
    caster: '古代泰坦巨像',
    spell: '歼灭者协议',
    icon: '⚙️',
    castTime: 2200,
    isShielded: true,
    threat: '银盾免控',
    desc: '【钢条】首领级读条，只能硬吃开减伤！'
  },
  {
    id: 's5',
    caster: '虚空畸体',
    spell: '虚空坍缩',
    icon: '🌌',
    castTime: 1500,
    isShielded: true,
    threat: '不可打断',
    desc: '【钢条】虚空帷幕护体，切勿出手！'
  }
];

// 2. 艾泽拉斯百晓生 趣味题库 (40+ 题)
const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: '大秘境机制',
    question: '在 12.1 S2 大秘境中，面对「崩裂」词缀，小怪阵亡时队伍最需要提防的是什么？',
    options: ['小怪爆炸对近战造成击退', '可叠加的暗影持续高额全团DOT', '小怪复活成更强亡灵', '坦克仇恨瞬间清零'],
    answer: 1,
    explain: '崩裂会在小怪死亡时给全队施加可叠加的暗影持续伤害，多只小怪同时死亡会造成极高治疗压力，需控血或全队交减伤。'
  },
  {
    id: 2,
    category: '大秘境机制',
    question: '「暴怒」词缀使非首领敌人在生命值降至多少百分比以下时进入激怒状态？',
    options: ['20%', '30%', '40%', '50%'],
    answer: 1,
    explain: '暴怒词缀使小怪生命值降至 30% 时激怒，伤害大幅提高，德鲁伊安抚、猎人凝神或潜行者毒刃可安抚消除。'
  },
  {
    id: 3,
    category: '大秘境机制',
    question: '在诸王之眠（Kings\' Rest）中，被盗贼狂暴怪施放「毒药新星」时，队伍必须怎样应对？',
    options: ['背对怪物即可免疫', '打断该读条或驱散剧毒', '全员跳跃规避', '坦克远离50码'],
    answer: 1,
    explain: '毒药新星是高伤害剧毒读条，必须分好打断轮次或由能解毒的职业第一时间驱散。'
  },
  {
    id: 4,
    category: '职业常识',
    question: '以下哪个专精拥有战斗中复活（战复）技能？',
    options: ['浩劫恶魔猎手', '惩戒圣骑士', '狂暴战士', '刺杀潜行者'],
    answer: 1,
    explain: '圣骑士（代祷/救赎）与德鲁伊、死亡骑士、术士等职业拥有战斗中复活队友的战复能力。'
  },
  {
    id: 5,
    category: '职业常识',
    question: '法师的「时间扭曲 / 嗜血」技能给全队提供的主要战斗属性提升是？',
    options: ['全能提高 30%', '暴击提高 30%', '急速提高 30%', '精通提高 30%'],
    answer: 2,
    explain: '嗜血/英勇/时间扭曲/原始暴怒提供 30% 急速持续 40 秒，并造成持续 10 分钟的心满意足/枯竭负面状态。'
  },
  {
    id: 6,
    category: '大秘境机制',
    question: '击杀带有「血池」词缀的小怪时，如果其他活着的敌人站在血池中会发生什么？',
    options: ['获得护盾免疫控制', '快速按百分比恢复生命值', '伤害提高 100%', '加速移动无法被减速'],
    answer: 1,
    explain: '血池会按最大生命值百分比迅速治疗站在里面的怪物，坦克必须及时将怪群拉出血池范围。'
  },
  {
    id: 7,
    category: '副本机制',
    question: '红玉新生法池（Ruby Life Pools）二号首领召出烈焰巨龙时，场上主要需要躲避的地板技能是？',
    options: ['滚石碾压', '飞火流星与烈焰风暴火圈', '寒冰喷吐陷阱', '暗影毒雾沼泽'],
    answer: 1,
    explain: '二号BOSS召出的巨龙会不断施放滚石地火与全场风暴火圈，需要保持走位切勿踩入地火。'
  },
  {
    id: 8,
    category: '职业常识',
    question: '圣骑士的保命神技「圣盾术」（俗称无敌）生效期间，会受到以下哪种机制的制约？',
    options: ['自律状态（无法立即再使用保护/圣疗）', '移动速度减半', '无法造成伤害', '法力值被清空'],
    answer: 0,
    explain: '圣盾术会让圣骑士进入“自律”状态，持续时间内无法再次使用保护祝福或圣疗术。'
  },
  {
    id: 9,
    category: '经典历史与梗',
    question: '魔兽世界最著名的玩家事件“火车王”主角在冲进黑石塔龙蛋房前嘴里喊的台词是？',
    options: ['For The Alliance!', 'Leeroy Jenkins!', 'Lok\'tar Ogar!', 'You are not prepared!'],
    answer: 1,
    explain: '玩家 Ben Schulz 在队伍商量战术时直接大喊“Leeroy Jenkins!”冲进房间引爆全场雏龙，成为魔兽史最经典梗。'
  },
  {
    id: 10,
    category: '经典历史与梗',
    question: '“你们这是自寻死路！”（You are not prepared!）是哪位著名魔兽首领的登场台词？',
    options: ['阿尔萨斯·米奈希尔', '伊利丹·怒风', '希尔瓦娜斯·风行者', '死亡之翼'],
    answer: 1,
    explain: '黑暗神殿最终首领伊利丹·怒风在开场CG与战斗喊话中说出的标志性台词：“你们这是自寻死路！”'
  },
  {
    id: 11,
    category: '职业常识',
    question: '潜行者的「暗影斗篷」技能开启时，通常可以解除并免疫何种效果？',
    options: ['所有物理流血伤害', '所有有害法术与魔法效果', '跌落摔伤', '首领正面顺劈斩'],
    answer: 1,
    explain: '暗影斗篷瞬间移除所有有害法术效果，并在持续时间内对魔法伤害和法术效果具有极高抵抗免疫。'
  },
  {
    id: 12,
    category: '副本机制',
    question: '在破晨号（The Dawnbreaker）副本中，玩家在不同飞艇和战舰间穿梭使用的是什么方式？',
    options: ['传送门装置', '驭龙术坐骑空战飞跃', '滑索缆车', '被地精大炮发射'],
    answer: 1,
    explain: '破晨号是地心之战特色空战副本，玩家随时可以召唤驭龙术坐骑在飞船甲板间滑翔飞行。'
  },
  {
    id: 13,
    category: '大秘境机制',
    question: '面对「纠缠」词缀时，被藤蔓缠绕降速的玩家可以通过哪种技能直接金蝉脱壳？',
    options: ['圣骑士自由祝福 / 潜行者暗影步 / 法师闪现', '纯喝治疗药水', '停在原地不动5秒', '普通攻击目标'],
    answer: 0,
    explain: '位移、变形或解除移动限制的技能（如自由祝福、小德变身、闪现、暗影步、疾跑）可立刻挣脱纠缠。'
  },
  {
    id: 14,
    category: '职业常识',
    question: '牧师的「群体驱散」（大驱）在 PVP 或 PVE 中，甚至能驱散敌人的什么绝对防御？',
    options: ['猎人假死', '无敌（圣盾术）与寒冰屏障（冰箱）', '战士盾墙', '盗贼潜行'],
    answer: 1,
    explain: '牧师的大驱是全魔兽极少数能强行驱散法师“冰箱”与圣骑士“无敌”的战略级神技。'
  },
  {
    id: 15,
    category: '经典历史与梗',
    question: '巫妖王阿尔萨斯手持的标志性魔剑名字是？',
    options: ['灰烬使者', '霜之哀伤（Frostmourne）', '埃辛诺斯战刃', '萨拉迈尼'],
    answer: 1,
    explain: '阿尔萨斯在诺森德拔出的符文魔剑名为“霜之哀伤”，吞噬了无数灵魂包括他自己的心智。'
  },
  {
    id: 16,
    category: '职业常识',
    question: '死亡骑士标志性的强力强制位移打断技能是？',
    options: ['死亡之握（拉人）', '反魔法护罩', '冰封之韧', '灵界打击'],
    answer: 0,
    explain: '死亡之握可以将远处的敌方目标瞬间拉至身前，并强制附带打断与短暂嘲讽效果。'
  },
  {
    id: 17,
    category: '大秘境机制',
    question: '小怪身上带有「银色盾牌外框」的读条（俗称钢条）意味着什么？',
    options: ['必须用物理打断技能打断', '无法被常规打断打断，需硬吃或使用硬控击飞', '打断该技能会立即回血', '仅限坦克能打断'],
    answer: 1,
    explain: '银色盾牌边框表示该读条免疫常规打断（脚踢、拳击等），只能通过眩晕、击飞、瘫痪等硬控手段打断，或开减伤硬吃。'
  },
  {
    id: 18,
    category: '大秘境机制',
    question: '在暴富矿区副本中，二号首领达兹拉克与他的战争机甲最危险的点名技能需要队伍如何配合？',
    options: ['将火箭引向足球炸弹并踢向BOSS', '所有人聚集在一起分担伤害', '所有人停止一切技能输出', '立刻跳出平台自杀'],
    answer: 0,
    explain: '踢炸弹是暴富矿区二号BOSS的核心机制，需要玩家精准走位将炸弹踢向BOSS消除易伤或破除护盾。'
  },
  {
    id: 19,
    category: '经典历史与梗',
    question: '魔兽世界“黑翼之巢”二号首领“堕落的瓦拉斯塔兹”（小红龙）给全团的开场 BUFF 是？',
    options: ['红龙精华（满怒气/能量/法力值快速恢复）', '烈焰抗性提升 500', '无限复活印记', '伤害提升 1000%'],
    answer: 0,
    explain: '小红龙著名的红龙精华让全团能量、怒气无限，法力秒回，但随后会点名“燃烧刺激”引爆队友，是当年无数公会的噩梦。'
  },
  {
    id: 20,
    category: '职业常识',
    question: '猎人玩家在遇到OT（仇恨失控）或想重置怪物战斗时，最经典的保命神技是？',
    options: ['逃脱（后跳）', '假死（Feign Death）', '灵龟守护（龟壳）', '误导'],
    answer: 1,
    explain: '假死能瞬间清空自身当前所有仇恨，使怪物转头攻击他人或重置战斗。'
  },
  {
    id: 21,
    category: '大秘境机制',
    question: '塞塔里斯神庙尾王米斯拉克斯战前，搬运两个眼球放入蛇头石像时，搬运者会受到什么限制？',
    options: ['移动速度降低且受击会掉落眼球', '每秒受到 90% 最大生命伤害', '完全无法看到周围敌人', '强制进入潜行状态'],
    answer: 0,
    explain: '搬运蛇眼时玩家会显著减速，且受到攻击时眼球会滑落，通常需要队友护送或投掷接力。'
  },
  {
    id: 22,
    category: '职业常识',
    question: '萨满祭司在阵亡后，可以使用的自我复活核心技能名称是？',
    options: ['转生（复生）', '土元素召唤', '星界转移', '灵魂链接'],
    answer: 0,
    explain: '复生（Reincarnation，俗称诈尸/转生）允许萨满在死亡后原地自行复活，不占用战斗团队战复次数。'
  },
  {
    id: 23,
    category: '大秘境机制',
    question: '「火山」词缀触发时，会在哪个位置生成即将喷发的熔岩裂缝？',
    options: ['远离敌人的远程或治疗玩家脚下', '近战攻击坦克的怪物脚下', '地图正中央固定点', '大秘境入口处'],
    answer: 0,
    explain: '火山通常在远离战斗怪物的远程或治疗玩家脚下生成，2秒后喷发造成高伤并击飞，需移动离开圈内。'
  },
  {
    id: 24,
    category: '经典历史与梗',
    question: '安其拉开门事件中，全服务器唯一获得“甲虫之王”称号与黑色其拉共鸣水晶坐骑的条件是？',
    options: ['在敲锣后10小时内完成流沙之棒任务', '单挑击败克苏恩', '全服第一个升到满级', '向军需官捐献100万块亚麻布'],
    answer: 0,
    explain: '手持流沙之棒的勇士敲响铜锣，在敲锣后的 10 小时窗口期内完成任务的玩家均可成为甲虫之王。'
  },
  {
    id: 25,
    category: '职业常识',
    question: '法师的「闪现术」在遇到以下哪种状态时可以直接解除？',
    options: ['昏迷（Stun）与定身效果', '被强制心控', '沉默效果', '中毒效果'],
    answer: 0,
    explain: '闪现术是极其强大的解控技能，能瞬发向前传送并解除自身受到的昏迷和定身效果。'
  }
];

// 3. 技能连连看 (Icon Memory Match) 技能配置 (8 对 = 16 张牌)
const MEMORY_ICONS = [
  { id: 'm1', name: '嗜血 / 英勇', emoji: '🐺', color: '#ef4444', desc: '全团爆发核心' },
  { id: 'm2', name: '无敌 (圣盾术)', emoji: '🛡️', color: '#f59e0b', desc: '圣骑士绝对防御' },
  { id: 'm3', name: '战复 (战斗复活)', emoji: '🌱', color: '#10b981', desc: '逆转团灭神技' },
  { id: 'm4', name: '斩杀 (Execute)', emoji: '⚔️', color: '#dc2626', desc: '战士残血终结技' },
  { id: 'm5', name: '寒冰屏障 (冰箱)', emoji: '❄️', color: '#06b6d4', desc: '法师保命金身' },
  { id: 'm6', name: '暗影之刃 / 消失', emoji: '🗡️', color: '#8b5cf6', desc: '潜行者致命匿踪' },
  { id: 'm7', name: '死亡之握 (拉人)', emoji: '🖐️', color: '#6366f1', desc: '死骑聚怪打断' },
  { id: 'm8', name: '痛苦压制 (减伤)', emoji: '✨', color: '#ec4899', desc: '牧师单体巨额护盾' }
];

// 4. 词缀走位大挑战 (Affix Dodge) 配置
const DODGE_CONFIG = {
  gridSize: 3, // 3x3 九宫格战场 (位置索引 0 到 8)
  initialLives: 3,
  hazards: [
    { type: 'volcano', name: '🌋 火山喷发', color: '#f97316', warnTime: 1200, desc: '熔岩即将喷发，迅速避开！' },
    { type: 'sanguine', name: '🩸 腐蚀血池', color: '#ef4444', warnTime: 1400, desc: '血水沸腾蔓延，切勿逗留！' },
    { type: 'storming', name: '🌪️ 狂暴风雷', color: '#38bdf8', warnTime: 1300, desc: '风暴席卷而来，赶紧闪开！' },
    { type: 'quaking', name: '⚡ 震荡大地', color: '#eab308', warnTime: 1100, desc: '地面剧烈晃动，前往安全区！' }
  ]
};

// 5. 段位称号计算
function getKickTitle(score, avgMs, misses) {
  if (score >= 900 && misses === 0 && avgMs < 350) return { title: '世界第一神踢', tier: 'S+', badge: '👑' };
  if (score >= 800 && misses <= 1) return { title: '角斗士手速', tier: 'S', badge: '🔥' };
  if (score >= 650) return { title: '20+ 大米门面', tier: 'A', badge: '⭐' };
  if (score >= 500) return { title: '合格打断手', tier: 'B', badge: '👍' };
  if (score >= 300) return { title: '手速随缘选手', tier: 'C', badge: '🌱' };
  return { title: '打断键抠掉了', tier: 'D', badge: '💤' };
}

function getQuizTitle(correctCount, total) {
  const rate = correctCount / total;
  if (rate >= 1) return { title: '艾泽拉斯大先知', tier: 'SSS', badge: '🌟' };
  if (rate >= 0.9) return { title: '千钧一发老领袖', tier: 'S', badge: '🏆' };
  if (rate >= 0.7) return { title: '资深高层车头', tier: 'A', badge: '🎖️' };
  if (rate >= 0.5) return { title: '合格大米车手', tier: 'B', badge: '⚔️' };
  return { title: '炉石小萌新', tier: 'C', badge: '🪵' };
}

function getDodgeTitle(waves) {
  if (waves >= 25) return { title: '走位天花板·神行者', tier: 'S+', badge: '⚡' };
  if (waves >= 18) return { title: '灵活如风·车队顶梁柱', tier: 'S', badge: '🌪️' };
  if (waves >= 12) return { title: '灵敏身手·高层先锋', tier: 'A', badge: '🏃' };
  if (waves >= 6) return { title: '偶有踩圈·合格团员', tier: 'B', badge: '🛡️' };
  return { title: '地板磁铁·人形木桩', tier: 'C', badge: '🪨' };
}

module.exports = {
  KICK_SPELLS,
  QUIZ_QUESTIONS,
  MEMORY_ICONS,
  DODGE_CONFIG,
  getKickTitle,
  getQuizTitle,
  getDodgeTitle
};
