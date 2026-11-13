#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
《魔兽世界》正式服 12.1.5 / Midnight 第二赛季 —— 装备数据抓取管线

权威数据源（均为公开可读，无需 API Key）：
  1. bispath.gg/en/guide/bis/<专精>   40 个专精的 BiS 装备表（物品 ID / 装等 / 来源 Boss）
  2. nether.wowhead.com/tooltip/item/<ID>?locale=zhCN
                                       暴雪官方简中译名、图标、品质、装等、部位、
                                       护甲/武器类型、主副属性、特效、掉落 Boss 与掉率
  3. 12.1.5 单 Boss 团本「基希克斯破封」10 件特效装备（由物品 ID 区间扫描定位）

产物：scripts/cache/retail_gear_source.json
      —— 所有下游数据文件（retail_items_master / loot / wow_equipment_db /
         wow_guides_data）唯一的数据来源，由 build_retail_gear_data.js 消费。

用法：
  python3 scripts/fetch_retail_gear_data.py                       # 完整联网抓取
  python3 scripts/fetch_retail_gear_data.py --from-cache <DIR>   # 从已下载原始数据合并
  python3 scripts/fetch_retail_gear_data.py --full-scan          # 强制重新扫描 ID 区间
"""
import argparse
import concurrent.futures
import html
import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / 'scripts' / 'cache'
OUT = CACHE / 'retail_gear_source.json'
IDS_FILE = CACHE / 'known_item_ids.txt'
DATA_DATE = '2026-11-13'

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                    '(KHTML, like Gecko) Chrome/124.0 Safari/537.36'}

# ---------------------------------------------------------------- 专精元数据
# BISPath slug -> (职业 slug, 职业中文, 专精 id, 专精中文)
SPEC_META = {
    'arms-warrior': ('warrior', '战士', 'arms', '武器'),
    'fury-warrior': ('warrior', '战士', 'fury', '狂怒'),
    'protection-warrior': ('warrior', '战士', 'protection', '防护'),
    'holy-paladin': ('paladin', '圣骑士', 'holy', '神圣'),
    'protection-paladin': ('paladin', '圣骑士', 'protection', '防护'),
    'retribution-paladin': ('paladin', '圣骑士', 'retribution', '惩戒'),
    'beast-mastery-hunter': ('hunter', '猎人', 'beast-mastery', '野兽控制'),
    'marksmanship-hunter': ('hunter', '猎人', 'marksmanship', '射击'),
    'survival-hunter': ('hunter', '猎人', 'survival', '生存'),
    'assassination-rogue': ('rogue', '潜行者', 'assassination', '奇袭'),
    'outlaw-rogue': ('rogue', '潜行者', 'outlaw', '狂徒'),
    'subtlety-rogue': ('rogue', '潜行者', 'subtlety', '敏锐'),
    'discipline-priest': ('priest', '牧师', 'discipline', '戒律'),
    'holy-priest': ('priest', '牧师', 'holy', '神圣'),
    'shadow-priest': ('priest', '牧师', 'shadow', '暗影'),
    'blood-death-knight': ('death-knight', '死亡骑士', 'blood', '鲜血'),
    'frost-death-knight': ('death-knight', '死亡骑士', 'frost', '冰霜'),
    'unholy-death-knight': ('death-knight', '死亡骑士', 'unholy', '邪恶'),
    'elemental-shaman': ('shaman', '萨满祭司', 'elemental', '元素'),
    'enhancement-shaman': ('shaman', '萨满祭司', 'enhancement', '增强'),
    'restoration-shaman': ('shaman', '萨满祭司', 'restoration', '恢复'),
    'arcane-mage': ('mage', '法师', 'arcane', '奥术'),
    'fire-mage': ('mage', '法师', 'fire', '火焰'),
    'frost-mage': ('mage', '法师', 'frost', '冰霜'),
    'affliction-warlock': ('warlock', '术士', 'affliction', '痛苦'),
    'demonology-warlock': ('warlock', '术士', 'demonology', '恶魔学识'),
    'destruction-warlock': ('warlock', '术士', 'destruction', '毁灭'),
    'brewmaster-monk': ('monk', '武僧', 'brewmaster', '酒仙'),
    'mistweaver-monk': ('monk', '武僧', 'mistweaver', '织雾'),
    'windwalker-monk': ('monk', '武僧', 'windwalker', '踏风'),
    'balance-druid': ('druid', '德鲁伊', 'balance', '平衡'),
    'feral-druid': ('druid', '德鲁伊', 'feral', '野性'),
    'guardian-druid': ('druid', '德鲁伊', 'guardian', '守护'),
    'restoration-druid': ('druid', '德鲁伊', 'restoration', '恢复'),
    'havoc-demon-hunter': ('demon-hunter', '恶魔猎手', 'havoc', '浩劫'),
    'vengeance-demon-hunter': ('demon-hunter', '恶魔猎手', 'vengeance', '复仇'),
    'devourer-demon-hunter': ('demon-hunter', '恶魔猎手', 'devourer', '噬灭'),
    'devastation-evoker': ('evoker', '唤魔师', 'devastation', '湮灭'),
    'preservation-evoker': ('evoker', '唤魔师', 'preservation', '恩护'),
    'augmentation-evoker': ('evoker', '唤魔师', 'augmentation', '增辉'),
}

# 12.1.5「基希克斯破封」10 件特效装备（由 ID 区间扫描 + 官方 tooltip 掉落源确认）
KITHIX_IDS = [280617, 280799, 280835, 281029, 281056, 281215,
              281235, 281236, 281238, 281239]

# 物品 ID 扫描区间（12.1 S2 掉落池 + 12.1.5 新增）
SCAN_RANGES = [
    (158300, 158500), (159200, 159600), (193700, 193850), (239000, 239200),
    (250150, 250350), (251050, 251350), (252200, 252350), (268100, 268400),
    (270100, 270250), (270900, 271000), (271050, 271650), (273600, 273900),
    (275000, 275200), (280300, 280899), (280900, 281700), (281701, 282200),
]

SLOT_MAP = {
    'Head': '头部', 'Neck': '颈部', 'Shoulder': '肩部', 'Shoulders': '肩部',
    'Back': '背部', 'Cloak': '背部', 'Chest': '胸部', 'Wrist': '腕部',
    'Wrists': '腕部', 'Hands': '手部', 'Gloves': '手部', 'Waist': '腰部',
    'Legs': '腿部', 'Feet': '脚部', 'Boots': '脚部', 'Ring 1': '戒指 1',
    'Ring 2': '戒指 2', 'Ring': '戒指', 'Trinket 1': '饰品 1',
    'Trinket 2': '饰品 2', 'Trinket': '饰品', 'Main Hand': '主手',
    'Off Hand': '副手', 'Two Hand': '双手', 'Weapon': '武器',
    'One-Hand': '单手', 'Shield': '盾牌', 'Ranged': '远程',
}

# 下面三组仅用于给缓存数据打「原始掉落线索」标签，不是最终展示分类。
# 最终归类（烈毒之渊 8 首领 / 史诗钥石 8 副本 / 地下堡掉落）统一由
# scripts/season2_sources.js 的 classify() 决定，build_retail_gear_data.js 消费时覆盖。
RAID_ABYSS_BOSSES = {
    '盘魂者内克扎莉', '陵寝哨兵', '万毒邪祟者瓦什尼克', '迷失的探险者',
    '斯索拉克', '双生毒牙', '盘卷祭坛', '乌拉特克', '乌拉特克之息', '小怪掉落',
}
RAID_GROTTO_BOSSES = {'尼姆瑞莎·唤波者', '潮缚石窟'}
KITHIX_BOSSES = {'基希克斯', '基希克斯破封'}

WEAPON_SUB = {
    '剑': 'sword', '斧': 'axe', '锤': 'mace', '匕首': 'dagger', '拳套': 'fist',
    '法杖': 'staff', '长柄武器': 'polearm', '弓': 'bow', '枪': 'gun',
    '弩': 'crossbow', '魔杖': 'wand', '战刃': 'glaive', '盾牌': 'shield',
}
WEAPON_TYPE = {
    ('单手', '剑'): '单手剑', ('单手', '斧'): '单手斧', ('单手', '锤'): '单手锤',
    ('单手', '匕首'): '匕首', ('单手', '拳套'): '拳套', ('单手', '战刃'): '战刃',
    ('双手', '剑'): '双手剑', ('双手', '斧'): '双手斧', ('双手', '锤'): '双手锤',
    ('双手', '法杖'): '法杖', ('双手', '长柄武器'): '长柄武器',
    ('双手', '弓'): '弓', ('双手', '枪'): '枪械', ('双手', '弩'): '弩',
    ('远程', '魔杖'): '魔杖', ('远程', '弓'): '弓', ('远程', '枪'): '枪械',
    ('远程', '弩'): '弩', ('副手', '盾牌'): '盾牌',
}

# 按槽位标签切分，比按 div 边界切分稳健（BISPath 的武器行样式略有差异）
SLOT_SPAN_RE = re.compile(r'<span class="flex w-16[^"]*"[^>]*>')
ITEM_LINK_RE = re.compile(
    r'<a href="https://www\.wowhead\.com/item=(\d+)"([^>]*)>(.*?)</a>', re.S)


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode('utf-8', 'ignore')


def strip_tags(t):
    return html.unescape(re.sub(r'<[^>]+>', ' ', t))


def parse_bis_page(spec, text):
    i = text.find('BIS Gear List')
    j = text.find('Trinket Ranking', i)
    seg = text[i:j] if j > i else text[i:i + 90000]
    rows = []
    parts = SLOT_SPAN_RE.split(seg)
    for block in parts[1:]:
        sm = re.match(r'(.*?)</span>', block, re.S)
        if not sm:
            continue
        slot = html.unescape(re.sub(r'<[^>]+>', '', sm.group(1))).strip()
        if slot not in SLOT_MAP:
            continue
        a = ITEM_LINK_RE.search(block)      # 空槽位显示 '-'，没有链接，跳过
        if not a:
            continue
        dw = re.search(r'ilvl=(\d+)', a.group(2))
        src = re.search(r'<p class="mt-0\.5 text-xs text-zinc-600">(.*?)</p>', block, re.S)
        rows.append({
            'slot': SLOT_MAP[slot],
            'itemId': int(a.group(1)),
            'en': html.unescape(re.sub(r'<[^>]+>', '', a.group(3))).strip(),
            'ilvl': int(dw.group(1)) if dw else 0,
            'sourceEn': html.unescape(re.sub(r'<[^>]+>', '', src.group(1))).strip() if src else '',
        })
    return rows


def norm_item(iid, raw, en_hint='', bis_sources=None):
    """把 Wowhead tooltip JSON 规范化成统一权威条目。"""
    if not isinstance(raw, dict) or not raw.get('name') or not raw.get('icon'):
        return None
    name = raw['name']
    if '[' in name or ']' in name:      # 未本地化的英文占位名
        return None
    t = re.sub(r'\s+', ' ', strip_tags(raw.get('tooltip', '')))
    ilvl = re.search(r'物品等级[：:]\s*(\d+)', t)
    if not ilvl or int(ilvl.group(1)) < 300:
        return None
    slot_m = re.search(r'(头部|颈部|肩部|背部|胸部|腕部|手部|腰部|腿部|脚部|手指|饰品|'
                       r'单手|双手|主手|副手|远程|盾牌)', t)
    if not slot_m:
        return None
    slot = slot_m.group(1)
    armor = re.search(r'(布甲|皮甲|锁甲|板甲)', t)
    armor_type = armor.group(1) if armor else ''

    weapon_type = ''
    wm = re.search(r'(单手|双手|主手|副手|远程|盾牌)\s+'
                   r'(剑|斧|锤|匕首|拳套|法杖|长柄武器|弓|枪|弩|魔杖|战刃|盾牌|物品)', t)
    if wm:
        weapon_type = WEAPON_TYPE.get((wm.group(1), wm.group(2)), '')
    if not weapon_type and slot in ('单手', '双手', '远程', '主手', '副手', '盾牌'):
        icon = str(raw.get('icon', '')).lower()
        for key, val in [('sword_1h', '单手剑'), ('sword_2h', '双手剑'),
                         ('axe_1h', '单手斧'), ('axe_2h', '双手斧'),
                         ('mace_1h', '单手锤'), ('mace_2h', '双手锤'),
                         ('staff_2h', '法杖'), ('polearm_2h', '长柄武器'),
                         ('knife_1h', '匕首'), ('wand_1h', '魔杖'),
                         ('bow_1h', '弓'), ('gun_1h', '枪械'),
                         ('crossbow', '弩'), ('shield', '盾牌'),
                         ('glaive', '战刃'), ('fist', '拳套')]:
            if key in icon:
                weapon_type = val
                break

    main_stats = []
    for val in re.findall(r'\+\s*[\d,]+\s*\[([^\]]+)\]', t):
        main_stats += [x for x in re.findall(r'力量|敏捷|智力', val)]
    if not main_stats:
        main_stats = re.findall(r'\+\s*[\d,]+\s+(力量|敏捷|智力)(?=\s|$)', t)
    main_stats = list(dict.fromkeys(main_stats))

    # 主属性真实数值（页面「装备注明属性」用）
    main_stat_values = {}
    for val, key in re.findall(r'\+\s*([\d,]+)\s*(力量|敏捷|智力)(?=[\s\[]|$)', t):
        main_stat_values[key] = int(val.replace(',', ''))
    for val, bracket in re.findall(r'\+\s*([\d,]+)\s*\[([^\]]+)\]', t):
        for key in re.findall(r'力量|敏捷|智力', bracket):
            main_stat_values.setdefault(key, int(val.replace(',', '')))
    stamina_m = re.search(r'\+\s*([\d,]+)\s*耐力', t)
    armor_m = re.search(r'([\d,]+)\s*护甲', t)
    weapon_m = re.search(r'([\d,]+)\s*-\s*([\d,]+)\s*点伤害\s*速度\s*([\d.]+)', t)
    dps_m = re.search(r'每秒伤害\s*([\d.]+)\s*点', t)
    use_m = re.search(r'使用[：:]\s*(.*?)(?:\s+需要等级|\s+售价|\s+掉落于|$)', t)
    use_effect = re.sub(r'\s+', ' ', use_m.group(1)).strip() if use_m else ''

    secondary = {}
    for val, key in re.findall(r'\+\s*([\d,]+)\s*(暴击|急速|精通|全能)', t):
        secondary[key] = int(val.replace(',', ''))
    stat_combo = '/'.join(secondary.keys())

    drop_boss = ''
    dm = re.search(r'掉落于[：:]\s*([^掉]*?)(?:\s+掉落几率|\s+需要等级|\s+售价|$)', t)
    if dm:
        drop_boss = dm.group(1).strip()
    drop_rate = ''
    rm = re.search(r'掉落几率[：:]\s*([\d.]+%)', t)
    if rm:
        drop_rate = rm.group(1)

    special = ''
    em = re.search(r'装备[：:]\s*(.*?)(?:\s+需要等级|\s+使用[：:]|\s+售价|$)', t)
    if em:
        special = re.sub(r'\s+', ' ', em.group(1)).strip()
    # 旧版「艾泽里特护甲」占位文案不是当前版本的装备特效，不能当作特效展示
    if 'Azerite' in special or '艾泽里特' in special:
        special = ''

    tier_set = ''
    # 只认中文套装名；排除 [[Active Azerite Powers] (0/5)] 这类旧版残留
    tm = re.search(r'([\u4e00-\u9fff][^\s\[\]]*)\s*\(0/\d\)', t)
    if tm and '组合' in t:
        tier_set = tm.group(1)

    icon = str(raw['icon'])
    icon_url = 'https://wow.zamimg.com/images/wow/icons/large/%s.jpg' % icon

    # 职业限制（职业套装回读需要按职业名索引）
    cm = re.search(r'职业[：:]\s*([^\s]+)', t)
    class_restriction = cm.group(1) if cm else ''
    if not class_restriction and tier_set:
        icon_classes = [
            ('deathknight', '死亡骑士'), ('demonhunter', '恶魔猎手'),
            ('priest', '牧师'), ('paladin', '圣骑士'), ('warrior', '战士'),
            ('warlock', '术士'), ('shaman', '萨满祭司'), ('druid', '德鲁伊'),
            ('hunter', '猎人'), ('rogue', '潜行者'), ('mage', '法师'),
            ('monk', '武僧'), ('evoker', '唤魔师'),
        ]
        for key, val in icon_classes:
            if key in icon.lower():
                class_restriction = val
                break

    if drop_boss in KITHIX_BOSSES or iid in KITHIX_IDS:
        source_dungeon, source_type = '基希克斯破封', '团本'
    elif drop_boss in RAID_GROTTO_BOSSES:
        source_dungeon, source_type = '潮缚石窟', '团本'
    elif drop_boss in RAID_ABYSS_BOSSES:
        source_dungeon, source_type = '烈毒之渊', '团本'
    elif tier_set:
        source_dungeon, source_type = '套装', '套装'
    elif drop_boss:
        source_dungeon, source_type = '史诗钥石', '地下城'
    else:
        # 官方 tooltip 未标注掉落源，不臆造副本归属
        source_dungeon, source_type = '其他来源', '未标注'

    quality = {4: 'EPIC', 3: 'RARE', 5: 'LEGENDARY'}.get(raw.get('quality'), 'EPIC')

    item_class = weapon_type or armor_type or ('盾牌' if slot == '盾牌' else '其他')

    return {
        'id': iid,
        'name': name,
        'en': en_hint or '',
        'icon': icon,
        'iconUrl': icon_url,
        'ilvl': int(ilvl.group(1)),
        'quality': quality,
        'slot': slot,
        'armorType': armor_type,
        'weaponType': weapon_type,
        'itemClass': item_class,
        'mainStats': main_stats,
        'mainStatValues': main_stat_values,
        'stamina': int(stamina_m.group(1).replace(',', '')) if stamina_m else 0,
        'armorValue': int(armor_m.group(1).replace(',', '')) if armor_m else 0,
        'weaponDamage': ('%s - %s' % (weapon_m.group(1), weapon_m.group(2))) if weapon_m else '',
        'weaponSpeed': weapon_m.group(3) if weapon_m else '',
        'weaponDps': float(dps_m.group(1)) if dps_m else 0,
        'useEffect': use_effect,
        'secondary': secondary,
        'statCombo': stat_combo,
        'special': special,
        'dropBoss': drop_boss,
        'dropRate': drop_rate,
        'tierSet': tier_set,
        'classRestriction': class_restriction,
        'sourceDungeon': source_dungeon,
        # 套装按职业名索引（管理后台 quickFillFrom121Set 依赖此约定）
        'sourceBoss': (class_restriction if source_dungeon == '套装' else drop_boss) or source_dungeon,
        'sourceType': source_type,
        'sourceDesc': ('%s · %s' % (source_dungeon,
                                    class_restriction if source_dungeon == '套装' else drop_boss))
                      if (drop_boss or source_dungeon == '套装') else '官方数据未标注掉落来源',
        'isKithix': iid in KITHIX_IDS,
        'patch': '12.1.5' if iid in KITHIX_IDS else '12.1',
        'bisSources': sorted(set(bis_sources or [])),
    }


def load_raw_dirs(base):
    """从已下载的原始 JSON 目录读入全部物品 tooltip。"""
    raws = {}
    for folder in ('pool', 'item_meta', 'kith_items'):
        d = Path(base) / folder
        if not d.exists():
            continue
        for f in d.glob('*.json'):
            try:
                raws[f.stem] = json.loads(f.read_text(encoding='utf-8', errors='ignore'))
            except Exception:
                pass
    return raws


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--from-cache', default='', help='从已下载的原始数据目录合并')
    ap.add_argument('--full-scan', action='store_true', help='强制重新扫描物品 ID 区间')
    args = ap.parse_args()

    CACHE.mkdir(parents=True, exist_ok=True)
    specs_dir = CACHE / 'specs'
    items_dir = CACHE / 'items'
    specs_dir.mkdir(exist_ok=True)
    items_dir.mkdir(exist_ok=True)

    # ---------- 1) 40 专精 BiS 表 ----------
    spec_bis = {}
    if args.from_cache:
        src_dir = Path(args.from_cache) / 'bispath_specs'
        for slug in SPEC_META:
            f = src_dir / (slug + '.html')
            if f.exists():
                spec_bis[slug] = parse_bis_page(slug, f.read_text(encoding='utf-8', errors='ignore'))
    else:
        def get_spec(slug):
            f = specs_dir / (slug + '.html')
            if f.exists() and f.stat().st_size > 50000:
                text = f.read_text(encoding='utf-8', errors='ignore')
            else:
                text = fetch('https://bispath.gg/en/guide/bis/' + slug)
                f.write_text(text, encoding='utf-8')
            return slug, text
        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as ex:
            for slug, text in ex.map(get_spec, SPEC_META):
                spec_bis[slug] = parse_bis_page(slug, text)
        # 持久化 HTML 便于离线复现
        for slug in SPEC_META:
            f = specs_dir / (slug + '.html')
            if not f.exists():
                try:
                    f.write_text(fetch('https://bispath.gg/en/guide/bis/' + slug), encoding='utf-8')
                except Exception:
                    pass
    print('BiS 专精:', len(spec_bis), '| 记录:', sum(len(v) for v in spec_bis.values()))

    bis_ids = {r['itemId'] for v in spec_bis.values() for r in v}
    en_hints = {}
    bis_sources = {}
    for slug, rows in spec_bis.items():
        for r in rows:
            en_hints[r['itemId']] = r['en']
            bis_sources.setdefault(r['itemId'], []).append(r['sourceEn'])

    # ---------- 2) 物品 ID 集合 ----------
    known = set()
    if IDS_FILE.exists():
        known = {int(x) for x in IDS_FILE.read_text(encoding='utf-8').split() if x.strip().isdigit()}
    scan_ids = set(bis_ids) | set(KITHIX_IDS) | set(known)
    if args.full_scan or not known:
        for a, b in SCAN_RANGES:
            scan_ids.update(range(a, b + 1))

    # ---------- 3) 物品元数据 ----------
    raws = load_raw_dirs(args.from_cache) if args.from_cache else {}
    def load_item(iid):
        key = str(iid)
        if key in raws:
            return key, raws[key]
        f = items_dir / (key + '.json')
        if f.exists():
            try:
                return key, json.loads(f.read_text(encoding='utf-8', errors='ignore'))
            except Exception:
                pass
        if args.from_cache:
            return key, None
        try:
            text = fetch('https://nether.wowhead.com/tooltip/item/%d?locale=zhCN' % iid, 18)
            f.write_text(text, encoding='utf-8')
            return key, json.loads(text)
        except Exception:
            return key, None

    with concurrent.futures.ThreadPoolExecutor(max_workers=24) as ex:
        loaded = dict(ex.map(load_item, sorted(scan_ids)))

    items = {}
    for key, raw in loaded.items():
        norm = norm_item(int(key), raw, en_hints.get(int(key), ''),
                         bis_sources.get(int(key)))
        if norm:
            items[key] = norm
    print('有效装备:', len(items), '| 扫描 ID:', len(scan_ids))
    IDS_FILE.write_text('\n'.join(sorted(items, key=int)), encoding='utf-8')

    # 只保留有元数据的 BiS 记录，避免下游出现悬空引用
    clean_bis = {k: [r for r in v if str(r['itemId']) in items] for k, v in spec_bis.items()}

    out = {
        'meta': {
            'generatedAt': datetime.now(timezone.utc).isoformat(),
            'dataDate': DATA_DATE,
            'patch': '12.1.5',
            'season': 'Midnight Season 2',
            'sources': [
                'bispath.gg 40 专精 BiS 表（公开推荐清单，非模拟最优）',
                'nether.wowhead.com 官方简中物品 tooltip',
                '12.1.5 基希克斯破封掉落表（官方 tooltip 掉落源校验）',
            ],
            'itemCount': len(items),
            'specCount': len(clean_bis),
            'bisRowCount': sum(len(v) for v in clean_bis.values()),
            'kithixCount': sum(1 for v in items.values() if v['isKithix']),
        },
        'specMeta': SPEC_META,
        'specBis': clean_bis,
        'items': items,
    }
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
    print('已写入', OUT, '(%.1f KB)' % (OUT.stat().st_size / 1024))
    print('12.1.5 装备:', out['meta']['kithixCount'], '/ 10')


if __name__ == '__main__':
    main()
