// data/wow_macros_data.js
// 魔兽世界全职业终极宏命令数据库 (80+ 常用实战宏)
// 包含通用神宏与 13 大职业全覆盖，支持分类筛选、全文搜索与一键复制

const MACRO_CATEGORIES = [
  // ================= 1. 通用核心神宏 =================
  {
    category: '通用核心',
    macros: [
      {
        title: '极限视距 2.6 倍拉远宏 (打本必开)',
        tag: '环境设置',
        desc: '突破魔兽原生视距上限，将视野范围直接扩大至 2.6 倍！打大秘境看地面特效、观察大波怪走位必备！',
        tips: '只需在游戏对话框按一次即可永久生效，无需重复按。',
        code: '/console cameraDistanceMaxZoomFactor 2.6'
      },
      {
        title: '万能鼠标指向打断宏 (带小队通报)',
        tag: '打断',
        desc: '鼠标悬停在怪血条上即可瞬间打断；若无悬停则打断当前选中的目标；打断成功自动在小队频道通报怪名，防止队伍打断撞车！',
        tips: '请将代码中的【责难】替换为你当前职业的打断技能（如法师替换为【法术反制】，盗贼替换为【脚踢】）。',
        code: '#showtooltip\n/stopcasting\n/cast [@mouseover,harm,nodead][harm,nodead] 责难\n/run local n=UnitName("mouseover") or UnitName("target"); if n then SendChatMessage("已打断 -> "..n, "PARTY") end'
      },
      {
        title: '焦点打断宏 (打断关键大怪)',
        tag: '打断',
        desc: '无需切换当前主力输出目标，直接打断设置的【焦点目标】！在高层大米专门盯防关键钢条法系怪时是全通车队标配。',
        tips: '替换【心灵冰冻】为你自己的打断技能名。',
        code: '#showtooltip\n/stopcasting\n/cast [@focus,harm,nodead][] 心灵冰冻'
      },
      {
        title: '一键全开爆发宏 (饰品+药水+种族+大招)',
        tag: '爆发',
        desc: '同时使用第 13 格（上饰品）、第 14 格（下饰品）、当前爆发药水、种族主动技能与职业核心大招，零公CD瞬间点火！',
        tips: '将【复仇之怒】和【血性狂怒(种族特长)】替换为你的大招与种族特长（如巨魔【狂暴】）。',
        code: '#showtooltip 复仇之怒\n/use 13\n/use 14\n/use 淬火强能药水\n/cast 血性狂怒(种族特长)\n/cast 复仇之怒'
      },
      {
        title: '秒取消保护祝福 / 圣盾术 / 寒冰屏障',
        tag: '取消',
        desc: '第一下开启无敌或保护抵挡尖刺击飞，第二下快速按即可立刻取消 Buff，恢复仇恨并防止 Boss 转向把脆皮队友拍死！',
        tips: '防猝死与消除移速惩罚的神宏。',
        code: '#showtooltip\n/cancelaura 保护祝福\n/cancelaura 圣盾术\n/cancelaura 寒冰屏障'
      },
      {
        title: '全自动环境坐骑一键宏 (陆地/飞行/水下合一)',
        tag: '坐骑',
        desc: '能飞的大陆自动召唤主力飞行坐骑；不能飞的副本或战场自动召唤陆地坐骑；在水里自动召唤水下坐骑；战斗中瞬发解减速技能！',
        tips: '替换为你自己拥有的坐骑名字。',
        code: '#showtooltip [swimming] 海龟; [flyable] 纯血火鹰; 暗夜山猫\n/dismount [mounted]\n/cast [swimming] 海龟\n/cast [flyable] 纯血火鹰\n/cast 暗夜山猫'
      },
      {
        title: '一键吃糖 + 治疗药水紧急救命宏',
        tag: '保命',
        desc: '在生命值垂危时优先吃术士制造的【治疗石】；若背包没有糖则吃【淬火治疗药水】并开启种族回血，两者不共用药水冷却！',
        tips: '大秘境中濒死时狂按此宏，瞬间拉回大半管血。',
        code: '#showtooltip 治疗石\n/use 治疗石\n/use 淬火治疗药水'
      },
      {
        title: '战斗伤害数字尺寸放大宏',
        tag: '界面',
        desc: '嫌弃魔兽原生跳出的暴击伤害数字太小不够爽？运行此宏可将伤害数字尺寸放大至 1.5 倍，刀刀到肉视觉拉满！',
        tips: '数值可按需调整，如 1.2 或 1.8。',
        code: '/console WorldTextScale 1.5'
      },
      {
        title: '团队就位确认与 5 秒开怪倒数宏',
        tag: '团队',
        desc: '作为队长或坦克，一键发起就位确认，并直接拉起游戏官方自带的 5 秒大字开怪倒计时钟！',
        tips: '打团本和大米队长必备。',
        code: '/readycheck\n/countdown 5'
      },
      {
        title: '一键重载插件与界面宏 (/reload)',
        tag: '工具',
        desc: '遇到界面卡死、插件报错、团队框体不见时，快速重载 UI 界面而无需退出游戏。',
        tips: '点击即可瞬间重载。',
        code: '/reload'
      }
    ]
  },

  // ================= 2. 圣骑士 (Paladin) =================
  {
    category: '圣骑士',
    macros: [
      {
        title: '圣疗术鼠标指向救急宏',
        tag: '指向',
        desc: '鼠标悬停在团队框架队友头上直接扔圣疗回满血；若无悬停则对当前目标使用；目标是敌方则直接给自己用。',
        tips: '抢救濒死坦克的瞬抬神宏。',
        code: '#showtooltip 圣疗术\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] 圣疗术'
      },
      {
        title: '自由祝福 / 牺牲祝福鼠标指向合一',
        tag: '指向',
        desc: '鼠标指向解救被减速定身的队友，配合牺牲祝福分担高额尖刺伤害。',
        tips: '可按需将自由祝福换为牺牲祝福。',
        code: '#showtooltip 自由祝福\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] 自由祝福'
      },
      {
        title: '防骑圣盾术无敌嘲讽宏',
        tag: '保命',
        desc: '开启圣盾术（无敌）的瞬间立即使用清算之手嘲讽 Boss，实现本体完全免伤且强行聚怪吃大招！',
        tips: '解决传统防骑开无敌导致怪转头拍死近战队友的致命痛点。',
        code: '#showtooltip 圣盾术\n/cast 圣盾术\n/cast 清算之手'
      },
      {
        title: '敲钟爆发 (神圣鸣钟 + 翅膀合一)',
        tag: '爆发',
        desc: '开启复仇之怒翅膀，同时释放神圣鸣钟（敲钟），瞬间打出全场飞盾与满圣能大爆发！',
        tips: '惩戒/防骑/奶骑通用。',
        code: '#showtooltip 神圣鸣钟\n/cast 复仇之怒\n/cast 神圣鸣钟'
      },
      {
        title: '制裁之锤焦点眩晕宏',
        tag: '控制',
        desc: '不丢当前目标，对设置的焦点目标秒交 6 秒制裁之锤强硬控制。',
        tips: '专门针对大秘境钢条怪打断。',
        code: '#showtooltip 制裁之锤\n/cast [@focus,harm,nodead][] 制裁之锤'
      },
      {
        title: '清毒术 / 净化术鼠标指向秒驱宏',
        tag: '驱散',
        desc: '鼠标指针悬停在团队框体中中毒或中疾病的队友名字上直接秒解，手感极快！',
        tips: '大秘境中面对剧毒与疾病词缀的救命神宏。',
        code: '#showtooltip 清毒术\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] 清毒术'
      }
    ]
  },

  // ================= 3. 战士 (Warrior) =================
  {
    category: '战士',
    macros: [
      {
        title: '大风车一键秒停打断宏 (防灭团核心)',
        tag: '打断',
        desc: '转剑刃风暴（大风车）期间遇到必须打断的钢条或需要救人，按此宏立即取消风车并瞬间打断！',
        tips: '高层大米避免贪伤害导致漏断灭团的良心宏。',
        code: '#showtooltip 拳击\n/cancelaura 剑刃风暴\n/stopcasting\n/cast 拳击'
      },
      {
        title: '焦点法术反射 (反弹致命读条)',
        tag: '保命',
        desc: '打断当前施法，立刻开启法术反射，将焦点大怪轰过来的巨额法术伤害原封不动反弹回去！',
        tips: '强韧周小怪读单体高伤法术反弹可打数百万伤害。',
        code: '#showtooltip 法术反射\n/stopcasting\n/cast 法术反射'
      },
      {
        title: '援护鼠标指向宏 (救队友/位移合一)',
        tag: '位移',
        desc: '鼠标悬停在队友头上立即冲刺援护，替队友承受下一次物理攻击并超长位移！',
        tips: '不仅能救队友，更是绝妙的快速位移躲地板手段。',
        code: '#showtooltip 援护\n/cast [@mouseover,help,nodead][@target,help,nodead] 援护'
      },
      {
        title: '破胆怒吼鼠标指向群恐宏',
        tag: '控制',
        desc: '鼠标指哪怪哪群恐，瞬间瘫痪大波近战小怪打断群体钢条。',
        tips: '群控断钢条神技。',
        code: '#showtooltip 破胆怒吼\n/cast [@mouseover,harm,nodead][] 破胆怒吼'
      },
      {
        title: '狂暴战鲁莽天神爆发合一',
        tag: '爆发',
        desc: '鲁莽 + 天神下凡 + 饰品一键开启，直接进入峰值狂暴斩杀模式！',
        tips: '按一次全开，随后即可狂打暴怒。',
        code: '#showtooltip 鲁莽\n/use 13\n/use 14\n/cast 天神下凡\n/cast 鲁莽'
      },
      {
        title: '防战盾墙破釜保命宏',
        tag: '保命',
        desc: '吃狂暴高压尖刺穿刺时，先开盾墙大减伤，若血量过低连续按则激活破釜沉舟拉高血上限。',
        tips: '坦克应急救命底牌。',
        code: '#showtooltip 盾墙\n/cast 盾墙\n/cast 破釜沉舟'
      }
    ]
  },

  // ================= 4. 死亡骑士 (Death Knight) =================
  {
    category: '死亡骑士',
    macros: [
      {
        title: '鼠标指向死亡之握 (拉怪断钢条)',
        tag: '指向',
        desc: '鼠标指哪怪拉哪怪！迅速将远处的法系读条怪拽进近战怪堆中，附带强制位移断钢条效果！',
        tips: 'DK聚怪灵魂宏，省去切换当前目标的延迟。',
        code: '#showtooltip 死亡之握\n/cast [@mouseover,harm,nodead][harm,nodead] 死亡之握'
      },
      {
        title: '枯萎凋零自身脚下秒放宏',
        tag: '范围',
        desc: '省去鼠标点地面绿圈选位置的繁琐操作，直接在自己站立的脚下中心瞬间砸出枯萎凋零！',
        tips: '无论血DK聚怪顺劈还是邪DK爆发，手感极其丝滑。',
        code: '#showtooltip 枯萎凋零\n/cast [@player] 枯萎凋零'
      },
      {
        title: '巫妖之躯 + 自吃死缠回血宏',
        tag: '保命',
        desc: '开启巫妖之躯获得减伤并免疫魅惑/恐惧，同时将自身变为亡灵，将凋零缠绕打在自己身上巨额回血！',
        tips: '血DK与邪DK在治疗阵亡时的终极大自救神宏。',
        code: '#showtooltip 巫妖之躯\n/cast 巫妖之躯\n/cast [@player] 凋零缠绕'
      },
      {
        title: '窒息焦点硬控宏',
        tag: '控制',
        desc: '对焦点目标直接打出窒息，将其悬空昏迷 4 秒，强制破除不可打断的危险钢条！',
        tips: '控制大怪必备。',
        code: '#showtooltip 窒息\n/cast [@focus,harm,nodead][] 窒息'
      },
      {
        title: '反魔法护罩 (绿坝) 秒开宏',
        tag: '保命',
        desc: '打断当前一切施法动作，立即开启绿坝免疫并吸收巨额魔法伤害与有害法术 DOT！',
        tips: '应对全屏魔法 AOE 的金牌底牌。',
        code: '#showtooltip 反魔法护罩\n/stopcasting\n/cast 反魔法护罩'
      },
      {
        title: '亡者大军天启一键全军出击',
        tag: '爆发',
        desc: '召唤全套亡者大军并激活符文武器增效，开启饰品打出毁灭级亡灵海大爆发！',
        tips: '团本起手与大米大波次怪融化专用。',
        code: '#showtooltip 亡者大军\n/use 13\n/use 14\n/cast 符文武器增效\n/cast 亡者大军'
      }
    ]
  },

  // ================= 5. 猎人 (Hunter) =================
  {
    category: '猎人',
    macros: [
      {
        title: '焦点 / 宠物一键误导宏 (起手拉仇恨)',
        tag: '团队',
        desc: '有焦点时自动误导给焦点坦克；无焦点时自动误导给自己的坚韧宝宝，绝不失手！',
        tips: '开怪前按一下，让坦克稳如泰山。',
        code: '#showtooltip 误导\n/cast [@focus,help,nodead][@pet,nodead] 误导'
      },
      {
        title: '秒假死防点名脱战宏',
        tag: '保命',
        desc: '瞬间停止一切射击与自动攻击读条并立刻假死，规避 Boss 致命点名并瞬间清空仇恨！',
        tips: '必须带 /stopattack 才能 100% 成功假死脱战。',
        code: '#showtooltip 假死\n/stopattack\n/stopcasting\n/cast 假死'
      },
      {
        title: '宁神射击鼠标指向 / 焦点秒驱宏',
        tag: '驱散',
        desc: '鼠标悬停或对焦点目标秒打宁神射击，瞬间驱散怪物的【激怒状态】与【有益魔法盾】！',
        tips: '大秘境暴怒周和法系盾怪的头号克星。',
        code: '#showtooltip 宁神射击\n/cast [@mouseover,harm,nodead][@focus,harm,nodead][] 宁神射击'
      },
      {
        title: '冰冻陷阱鼠标指针 [@cursor] 秒投',
        tag: '控制',
        desc: '不用先点技能再左键选地，鼠标指针指在哪直接瞬间把冰冻陷阱丢在哪！',
        tips: '控制大怪或断钢条极快。',
        code: '#showtooltip 冰冻陷阱\n/cast [@cursor] 冰冻陷阱'
      },
      {
        title: '焦油陷阱鼠标指针秒放',
        tag: '控制',
        desc: '指针指地直接下焦油陷阱，大面积减速风筝小怪群。',
        tips: '坦克风筝小怪时的神助攻。',
        code: '#showtooltip 焦油陷阱\n/cast [@cursor] 焦油陷阱'
      },
      {
        title: '治疗宠物 / 复活宠物二合一',
        tag: '工具',
        desc: '宝宝存活时按此宏为治疗宝宝；宝宝阵亡时按此宏自动读条复活宝宝，省一个快捷键位！',
        tips: '猎人常年必备的经典二合一宏。',
        code: '#showtooltip 治疗宠物\n/cast [@pet,dead] 复活宠物; [nopet] 召唤宠物 1; 治疗宠物'
      },
      {
        title: '逃脱 + 猎豹守护紧急大撤退',
        tag: '位移',
        desc: '后跳解定身并后退，同时激活猎豹守护大幅提高移动速度，躲避致命全屏拍地板！',
        tips: '后跳规避击飞与减速。',
        code: '#showtooltip 逃脱\n/stopcasting\n/cast 逃脱\n/cast 猎豹守护'
      }
    ]
  },

  // ================= 6. 潜行者 (Rogue) =================
  {
    category: '潜行者',
    macros: [
      {
        title: '暗影步脚踢打断宏 (瞬移踢断条)',
        tag: '打断',
        desc: '目标在远处读条？瞬间暗影步瞬移到目标背后并紧跟脚踢打断！神级超远距离断条！',
        tips: '大秘境解决远处漏网读条法系怪的第一绝活。',
        code: '#showtooltip 脚踢\n/cast [@mouseover,harm,nodead][harm,nodead] 暗影步\n/cast [@mouseover,harm,nodead][harm,nodead] 脚踢'
      },
      {
        title: '焦点致盲宏 (长达 1 分钟大控)',
        tag: '控制',
        desc: '不切换当前集火目标，直接致盲焦点大怪，使其瘫痪无法行动。',
        tips: '大米跳怪或控制高危门神怪利器。',
        code: '#showtooltip 致盲\n/cast [@focus,harm,nodead][] 致盲'
      },
      {
        title: '一键闷棍抓潜行宏 (自动索敌抓贼)',
        tag: '控制',
        desc: '快速狂按自动清除当前目标、索敌最近的敌对玩家/怪物并瞬间拍上闷棍！',
        tips: '竞技场和战场中抓隐身贼、德鲁伊的神器。',
        code: '#showtooltip 闷棍\n/cleartarget\n/targetenemyplayer\n/cast [nodead] 闷棍'
      },
      {
        title: '毒刃驱散怪物激怒状态宏',
        tag: '驱散',
        desc: '使用毒刃命中目标，造成自然伤害的同时瞬间驱散怪物的激怒增益（如狂暴撕裂）。',
        tips: '强韧暴怒周近战必带。',
        code: '#showtooltip 毒刃\n/cast [@mouseover,harm,nodead][] 毒刃'
      },
      {
        title: '嫁祸诀窍焦点坦克宏',
        tag: '团队',
        desc: '不换目标直接将嫁祸施加给焦点坦克，起手偷袭/伏击制造的巨额仇恨全部转移给坦克！',
        tips: '保坦克聚怪群仇恨神宏。',
        code: '#showtooltip 嫁祸诀窍\n/cast [@focus,help,nodead][] 嫁祸诀窍'
      },
      {
        title: '消失脱战 + 暗影打击秒出伤',
        tag: '爆发',
        desc: '瞬间使用消失进入潜行潜能，直接打出强力伏击或暗影打击！',
        tips: '狂徒/敏锐/奇袭刷核心被动必备。',
        code: '#showtooltip 消失\n/stopattack\n/cast 消失\n/cast 暗影打击'
      },
      {
        title: '暗影斗篷 + 闪避双开物理魔法全免',
        tag: '保命',
        desc: '同时开启暗影斗篷（免疫一切魔法）与闪避（100%躲闪物理攻击），实现真·物理魔法全免！',
        tips: '盗贼死里逃生的究极硬吃大招宏。',
        code: '#showtooltip 暗影斗篷\n/cast 暗影斗篷\n/cast 闪避'
      }
    ]
  },

  // ================= 7. 法师 (Mage) =================
  {
    category: '法师',
    macros: [
      {
        title: '暴风雪 / 烈焰风暴鼠标位置秒放',
        tag: '范围',
        desc: '省去出绿圈再点鼠标左键的延迟，鼠标指针停在哪里，技能直接瞬间砸在哪里！',
        tips: '冰法暴风雪、火法烈焰风暴、奥法奥爆必备。',
        code: '#showtooltip 暴风雪\n/cast [@cursor] 暴风雪'
      },
      {
        title: '焦点法术反制打断宏',
        tag: '打断',
        desc: '打断当前施法，不丢当前主力目标，直接打断焦点大怪！',
        tips: '大秘境法师的核心打断手法。',
        code: '#showtooltip 法术反制\n/stopcasting\n/cast [@focus,harm,nodead][] 法术反制'
      },
      {
        title: '强效隐形术秒断法术脱战宏',
        tag: '保命',
        desc: '秒停施法，瞬间进入强效隐形术，化解 Boss 点名并规避灭团！',
        tips: '高层大米法师保命看家本领。',
        code: '#showtooltip 强效隐形术\n/stopcasting\n/cast 强效隐形术'
      },
      {
        title: '寒冰屏障开合二合一 (防卡手)',
        tag: '保命',
        desc: '按一下开启冰箱挡技能，再按一下立刻解除冰箱并恢复施法，防止被点名打死队友！',
        tips: '极速消 Debuff 专用。',
        code: '#showtooltip 寒冰屏障\n/stopcasting\n/cancelaura 寒冰屏障\n/cast 寒冰屏障'
      },
      {
        title: '变形术 (变羊) 焦点控制宏',
        tag: '控制',
        desc: '对焦点目标直接施放变形术，将其变为绵羊瘫痪！',
        tips: '大米控制与断条利器。',
        code: '#showtooltip 变形术\n/cast [@focus,harm,nodead][] 变形术'
      },
      {
        title: '缓落术鼠标指向宏 (救队友掉落)',
        tag: '团队',
        desc: '悬停在被击飞悬崖的队友名字上直接丢缓落术，救队友于水火！',
        tips: '高空坠落不掉血。',
        code: '#showtooltip 缓落术\n/cast [@mouseover,help,nodead][@player] 缓落术'
      },
      {
        title: '冰霜之环鼠标指针秒下宏',
        tag: '控制',
        desc: '鼠标指针所指地面瞬间画出冰霜之环，冻结经过的所有小怪！',
        tips: '小怪群硬控断钢条神技。',
        code: '#showtooltip 冰霜之环\n/cast [@cursor] 冰霜之环'
      }
    ]
  },

  // ================= 8. 牧师 (Priest) =================
  {
    category: '牧师',
    macros: [
      {
        title: '真言术：盾鼠标指向宏',
        tag: '指向',
        desc: '鼠标悬停在团队框体中队友名字上直接套盾；无悬停则对自己套盾，手感拉满！',
        tips: '戒律与神牧不可或缺的救命宏。',
        code: '#showtooltip 真言术：盾\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] 真言术：盾'
      },
      {
        title: '痛苦压制 / 守护之魂大减伤指向',
        tag: '指向',
        desc: '鼠标悬停在濒死坦克头上瞬间交大减伤（压制或翅膀），绝不给错人！',
        tips: '替换为你专精对应的大招名字。',
        code: '#showtooltip 痛苦压制\n/cast [@mouseover,help,nodead][@target,help,nodead] 痛苦压制'
      },
      {
        title: '纯净术 / 驱散魔法敌友二合一',
        tag: '驱散',
        desc: '目标是队友时施放【纯净术】解魔法与疾病；目标是敌人时施放【驱散魔法】扒掉敌方增益盾！',
        tips: '神级双向驱散宏，节约一个快捷键。',
        code: '#showtooltip\n/cast [@mouseover,help,nodead] 纯净术; [@mouseover,harm,nodead] 驱散魔法; [help] 纯净术; 驱散魔法'
      },
      {
        title: '群体驱散鼠标位置 [@cursor] 秒放',
        tag: '驱散',
        desc: '省去绿圈选地动作，鼠标所指位置瞬间砸下群体驱散，秒驱无敌、冰箱与全团魔法！',
        tips: '大秘境与团本灭团技克星。',
        code: '#showtooltip 群体驱散\n/cast [@cursor] 群体驱散'
      },
      {
        title: '能量灌注给指定核心队友 + 密语通报',
        tag: '团队',
        desc: '一键将【能量灌注】喂给你的大核 DPS 队友，同时在聊天框私聊通报对方开启大招！',
        tips: '将代码中的【队友名字】替换为你车队里爆发最高的核心队友角色名。',
        code: '#showtooltip 能量灌注\n/cast [@队友名字,help,nodead][@mouseover,help,nodead][@player] 能量灌注\n/whisper 队友名字 >>> 能量灌注已给你，请全开爆发！<<<'
      },
      {
        title: '信仰飞跃 (拉人) 鼠标指向宏',
        tag: '指向',
        desc: '鼠标悬停在踩火或站位错误的倒霉队友头上，瞬间将其拽到自己身边救其一命！',
        tips: '救人拉人神技。',
        code: '#showtooltip 信仰飞跃\n/cast [@mouseover,help,nodead][@target,help,nodead] 信仰飞跃'
      },
      {
        title: '暗牧虚空爆发 + 洪流点火宏',
        tag: '爆发',
        desc: '开启虚空爆发进入虚空形态，开启爆发饰品，瞬间接虚空洪流直接飙升峰值！',
        tips: '暗影牧师爆发起手必备。',
        code: '#showtooltip 虚空爆发\n/use 13\n/use 14\n/cast 虚空爆发\n/cast 虚空洪流'
      }
    ]
  },

  // ================= 9. 萨满祭司 (Shaman) =================
  {
    category: '萨满祭司',
    macros: [
      {
        title: '12 秒风剪极速打断 (全职业最强断)',
        tag: '打断',
        desc: '停止施法，鼠标指向 > 焦点 > 当前目标优先级打断，利用 12 秒最短远程断条封神！',
        tips: '大秘境封神必备。',
        code: '#showtooltip 风剪\n/stopcasting\n/cast [@mouseover,harm,nodead][@focus,harm,nodead][] 风剪'
      },
      {
        title: '电能图腾自身脚下秒插宏',
        tag: '控制',
        desc: '无需选地，直接在自己脚下瞬间插出电能图腾，延迟晕眩怪堆打断钢条！',
        tips: '群晕控怪神宏。',
        code: '#showtooltip 电能图腾\n/cast [@player] 电能图腾'
      },
      {
        title: '暴雨图腾 / 大地之墙脚下秒放',
        tag: '范围',
        desc: '自身站位处瞬间放置防减伤或蓄奶图腾。',
        tips: '奶萨省心必备。',
        code: '#showtooltip 暴雨图腾\n/cast [@player] 暴雨图腾'
      },
      {
        title: '妖术焦点变青蛙宏',
        tag: '控制',
        desc: '不切换目标，直接将焦点目标变成青蛙瘫痪长达 1 分钟！',
        tips: '控制大怪神器。',
        code: '#showtooltip 妖术\n/cast [@focus,harm,nodead][] 妖术'
      },
      {
        title: '净化术驱散敌对增益宏',
        tag: '驱散',
        desc: '驱散目标身上带有的一切可驱散魔法盾（如回血、增伤、吸收盾）。',
        tips: '扒光怪物的强化 Buff。',
        code: '#showtooltip 净化术\n/cast [@mouseover,harm,nodead][] 净化术'
      },
      {
        title: '激流 / 治疗涌鼠标指向宏',
        tag: '指向',
        desc: '鼠标指团队框体直接套激流 Hot，手感飞速。',
        tips: '奶萨主力加血宏。',
        code: '#showtooltip 激流\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] 激流'
      },
      {
        title: '阵风位移 + 幽魂之狼极速狂奔',
        tag: '位移',
        desc: '向前起跳阵风大位移，紧接着瞬间变狼加速狂奔！',
        tips: '躲避全屏拍地板与快速追车队必备。',
        code: '#showtooltip 阵风\n/cast 阵风\n/cast 幽魂之狼'
      }
    ]
  },

  // ================= 10. 术士 (Warlock) =================
  {
    category: '术士',
    macros: [
      {
        title: '鼠标指向灵魂石秒战复宏',
        tag: '指向',
        desc: '鼠标悬停在阵亡倒地的队友尸体上直接战复；队友活着时悬停可提前绑上预备重生！',
        tips: '战复大米队友看家本领。',
        code: '#showtooltip 灵魂石\n/stopcasting\n/cast [@mouseover,help,dead][@mouseover,help,nodead][@target,help,dead] 灵魂石'
      },
      {
        title: '制造治疗石 + 吃糖二合一',
        tag: '保命',
        desc: '脱战无糖时点一下自动做糖；战斗中按一下直接吃糖回满血！省快捷键神器！',
        tips: '术士居家旅行必备。',
        code: '#showtooltip 治疗石\n/cast [nocombat] 制造治疗石\n/use 治疗石'
      },
      {
        title: '焦点放逐术宏 (大控恶魔与元素)',
        tag: '控制',
        desc: '将焦点位置的恶魔怪或元素怪直接放逐虚空，使其无敌且无法做出任何攻击。',
        tips: '应对特定恶魔/元素怪神级控制。',
        code: '#showtooltip 放逐术\n/cast [@focus,harm,nodead][] 放逐术'
      },
      {
        title: '恶魔传送门快速点击宏',
        tag: '位移',
        desc: '靠近传送门时直接按宏交互，瞬间完成超远距离跨屏传送，躲避一切机制！',
        tips: '解决战乱中点不到门的大痛点。',
        code: '/target 恶魔传送门\n/click ExtraActionButton1\n/targetlasttarget'
      },
      {
        title: '暗影之怒鼠标位置秒砸群晕',
        tag: '控制',
        desc: '鼠标指针所指地面瞬间爆开暗影之怒，群晕所有怪打断钢条！',
        tips: '群控断钢条。',
        code: '#showtooltip 暗影之怒\n/cast [@cursor] 暗影之怒'
      },
      {
        title: '毁灭黑魂地狱火一键爆发',
        tag: '爆发',
        desc: '召唤地狱火从天而降，开启黑暗灵魂与饰品，混乱之箭疯狂连射！',
        tips: '毁灭术毁天灭地爆发。',
        code: '#showtooltip 召唤地狱火\n/use 13\n/use 14\n/cast 黑暗灵魂：动荡\n/cast 召唤地狱火'
      }
    ]
  },

  // ================= 11. 德鲁伊 (Druid) =================
  {
    category: '德鲁伊',
    macros: [
      {
        title: '鼠标指向复生 (战复) 宏',
        tag: '指向',
        desc: '鼠标悬停在阵亡队友尸体或团队框体上，打断当前施法瞬间交战复复生！',
        tips: '秒战复队友神技。',
        code: '#showtooltip 复生\n/stopcasting\n/cast [@mouseover,help,dead][@target,help,dead] 复生'
      },
      {
        title: '安抚驱散激怒宏 (暴怒怪克星)',
        tag: '驱散',
        desc: '对狂暴怪物使用安抚，瞬间消解怪物的狂暴状态。',
        tips: '大秘境暴怒周德鲁伊必带。',
        code: '#showtooltip 安抚\n/cast [@mouseover,harm,nodead][] 安抚'
      },
      {
        title: '铁木树皮 / 回春术鼠标指向抬血',
        tag: '指向',
        desc: '鼠标悬停在队友头上立即套铁木树皮大减伤与回春 Hot。',
        tips: '奶德核心手法。',
        code: '#showtooltip 铁木树皮\n/cast [@mouseover,help,nodead][@target,help,nodead] 铁木树皮'
      },
      {
        title: '乌索尔之旋鼠标位置秒放',
        tag: '控制',
        desc: '指针指地直接下乌索尔之旋风圈，聚怪并强制拽回逃跑小怪！',
        tips: '配合台风击退可瞬间原地聚怪。',
        code: '#showtooltip 乌索尔之旋\n/cast [@cursor] 乌索尔之旋'
      },
      {
        title: '一键潜行变猫 / 变熊急救吃尖刺',
        tag: '形态',
        desc: '非战斗时秒变猎豹并潜行；战斗中按一下变熊获得高额护甲与耐力吃尖刺！',
        tips: '德鲁伊机动与保命核心。',
        code: '#showtooltip [nocombat] 潜行; 熊形态\n/cast [nocombat,nostance:2] 猎豹形态\n/cast [nocombat] 潜行\n/cast [combat,nostance:1] 熊形态'
      },
      {
        title: '迎头痛击近战打断宏',
        tag: '打断',
        desc: '熊形态或猫形态下冲刺打断施法。',
        tips: '带小冲刺的打断技能。',
        code: '#showtooltip 迎头痛击\n/cast [@mouseover,harm,nodead][] 迎头痛击'
      },
      {
        title: '台风击飞断钢条宏',
        tag: '控制',
        desc: '扇形风刃击飞面前所有怪物，强制打断不可常规打断的钢条技能！',
        tips: '群怪钢条克星。',
        code: '#showtooltip 台风\n/stopcasting\n/cast 台风'
      }
    ]
  },

  // ================= 12. 武僧 (Monk) =================
  {
    category: '武僧',
    macros: [
      {
        title: '切喉手焦点打断宏',
        tag: '打断',
        desc: '不切换目标直接打断焦点大怪施法，并使其沉默！',
        tips: '酒仙/踏风/织雾通用。',
        code: '#showtooltip 切喉手\n/stopcasting\n/cast [@focus,harm,nodead][] 切喉手'
      },
      {
        title: '扫堂腿群晕控制宏',
        tag: '控制',
        desc: '横扫周围所有敌对目标使其昏迷 3 秒，强制打断一切钢条！',
        tips: '高层大米波次核心手牌。',
        code: '#showtooltip 扫堂腿\n/cast 扫堂腿'
      },
      {
        title: '魂体双分：放置与传送二合一',
        tag: '位移',
        desc: '没有按 Shift 时使用【魂体双分：转移】瞬间回魂位移；按住 Shift 时在脚下重新放置魂体！',
        tips: '超好用的二合一空间位移宏。',
        code: '#showtooltip\n/cast [mod:shift] 魂体双分; 魂体双分：转移'
      },
      {
        title: '作茧缚命鼠标指向救命宏',
        tag: '指向',
        desc: '织雾奶僧绝招：鼠标悬停在濒死队友名字上直接套上百万吸收盾！',
        tips: '瞬间将队友从死亡边缘拉回。',
        code: '#showtooltip 作茧缚命\n/cast [@mouseover,help,nodead][@target,help,nodead] 作茧缚命'
      },
      {
        title: '和平之环鼠标指针秒弹怪',
        tag: '控制',
        desc: '指针指地直接下和平之环，将圈内所有怪物弹飞并阻挡进入！',
        tips: '聚怪与保护治疗神技。',
        code: '#showtooltip 和平之环\n/cast [@cursor] 和平之环'
      },
      {
        title: '壮胆酒 + 移花接木自愈大减伤',
        tag: '保命',
        desc: '开启壮胆酒大幅提高最大生命值与减伤，同时按下移花接木吸收真气珠回满血！',
        tips: '酒仙坦克吃尖刺必用。',
        code: '#showtooltip 壮胆酒\n/cast 壮胆酒\n/cast 移花接木'
      }
    ]
  },

  // ================= 13. 恶魔猎手 (Demon Hunter) =================
  {
    category: '恶魔猎手',
    macros: [
      {
        title: '瓦解焦点打断宏',
        tag: '打断',
        desc: '停止当前技能，对焦点大怪极速打断施法并恢复自身怒气！',
        tips: '打断还给怒气，极度划算。',
        code: '#showtooltip 瓦解\n/stopcasting\n/cast [@focus,harm,nodead][] 瓦解'
      },
      {
        title: '沉默咒符自身脚下秒放',
        tag: '控制',
        desc: '省去出圈选地，直接在自身脚下瞬间砸下沉默咒符，群体沉默小怪群！',
        tips: '复仇DH核心聚怪手法。',
        code: '#showtooltip 沉默咒符\n/cast [@player] 沉默咒符'
      },
      {
        title: '极乐敕令自身脚下秒炸',
        tag: '范围',
        desc: '在自己脚下瞬间引爆格里恩极乐敕令，炸出巨额伤害并产生大量灵魂碎片！',
        tips: '浩劫与复仇通用。',
        code: '#showtooltip 极乐敕令\n/cast [@player] 极乐敕令'
      },
      {
        title: '恶魔变形起跳一键爆发',
        tag: '爆发',
        desc: '开启爆发饰品，自身脚下起跳直接砸进怪堆进入恶魔形态！',
        tips: '省去选圈落地步骤。',
        code: '#showtooltip 恶魔变形\n/use 13\n/use 14\n/cast [@player] 恶魔变形'
      },
      {
        title: '幽灵视觉一键侦测潜行宏',
        tag: '工具',
        desc: '开启幽灵视觉看穿墙壁与潜行潜伏怪，大秘境防盗贼小怪突袭。',
        tips: '侦破一切隐身。',
        code: '#showtooltip 幽灵视觉\n/cast 幽灵视觉'
      },
      {
        title: '疾影 + 虚空行走极限保命宏',
        tag: '保命',
        desc: '先按开疾影大幅提升闪避与减伤；濒死再次按下直接进入虚空行走完全物理魔法无敌！',
        tips: '浩劫DH保命神牌。',
        code: '#showtooltip 虚空行走\n/cast 疾影\n/cast 虚空行走'
      }
    ]
  },

  // ================= 14. 唤魔师 (Evoker) =================
  {
    category: '唤魔师',
    macros: [
      {
        title: '营救鼠标指向宏 (抓队友到安全区)',
        tag: '指向',
        desc: '鼠标悬停在踩火队友头上，将其一把抓起并飞跃投掷到安全位置，并给两人套盾！',
        tips: '魔兽顶级救人神技。',
        code: '#showtooltip 营救\n/cast [@mouseover,help,nodead][@target,help,nodead] 营救'
      },
      {
        title: '镇压焦点打断宏',
        tag: '打断',
        desc: '利用龙希尔的远程打断镇压焦点怪物，使其沉默！',
        tips: '远程打断必备。',
        code: '#showtooltip 镇压\n/stopcasting\n/cast [@focus,harm,nodead][] 镇压'
      },
      {
        title: '扫尾 / 飞翼打击弹开怪断钢条',
        tag: '控制',
        desc: '龙尾横扫击飞面前小怪，强制破除非断条不可打断的危险钢条！',
        tips: '断钢条看家本领。',
        code: '#showtooltip 扫尾\n/cast 扫尾'
      },
      {
        title: '翡翠之花自身脚下秒开',
        tag: '范围',
        desc: '直接在自己脚下瞬间种出翡翠之花，两秒后绽放巨额群抬！',
        tips: '恩护奶龙与增辉常用。',
        code: '#showtooltip 翡翠之花\n/cast [@player] 翡翠之花'
      },
      {
        title: '狂龙之怒全开大爆发宏',
        tag: '爆发',
        desc: '开启饰品与狂龙之怒，重置瞬发烈焰吐息与永恒之涌！',
        tips: '湮灭龙大秘境融怪起手式。',
        code: '#showtooltip 狂龙之怒\n/use 13\n/use 14\n/cast 狂龙之怒'
      }
    ]
  }
];

module.exports = {
  MACRO_CATEGORIES
};
