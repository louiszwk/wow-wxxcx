const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// wowhead item icon base URL
const ICON_BASE = 'https://wow.zamimg.com/images/wow/icons/large/';

// Map slot names to frontend layout slots
const slotMap = {
  head: '头部', neck: '颈部', shoulder: '肩部', back: '背部', chest: '胸部',
  shirt: '衬衣', tabard: '战袍', wrist: '腕部', hands: '手部', waist: '腰部',
  legs: '腿部', feet: '脚部', finger1: '手指', finger2: '手指',
  trinket1: '饰品', trinket2: '饰品', mainhand: '主手', offhand: '副手'
};

exports.main = async (event, context) => {
  const { classSlug, specSlug } = event;
  
  if (!classSlug || !specSlug) {
    return { success: false, error: 'Missing classSlug or specSlug' };
  }

  try {
    // 1. 获取 Raider.io 大米排行榜（取第一页，约 20 个队伍，100 个玩家）
    const runsRes = await axios.get('https://raider.io/api/v1/mythic-plus/runs?region=world&dungeon=all&affixes=all');
    const runs = runsRes.data.rankings || [];
    
    // 2. 在这 100 个顶尖玩家中寻找匹配的职业和专精
    let targetCharacter = null;
    for (const run of runs) {
      if (run.run && run.run.roster) {
        const match = run.run.roster.find(r => 
          r.character.class.slug === classSlug && 
          r.character.spec.slug === specSlug
        );
        if (match) {
          targetCharacter = match.character;
          break;
        }
      }
    }
    
    // 如果在前20名车队里找不到这个专精（比如冷门专精），直接报错提示
    if (!targetCharacter) {
      return { 
        success: false, 
        error: `在前100名大秘境顶尖高手中未能找到使用 [${specSlug}] 专精的玩家。冷门专精无法获取大秘境实战毕业装备！`
      };
    }
    
    // 由于带 '-' 的名字 API 会报错，处理名字
    const charName = targetCharacter.name.split('-')[0];
    
    // 3. 获取该顶尖玩家的当前配装
    const profileUrl = `https://raider.io/api/v1/characters/profile?region=${targetCharacter.region.slug}&realm=${targetCharacter.realm.slug}&name=${encodeURIComponent(charName)}&fields=gear`;
    
    const profileRes = await axios.get(profileUrl);
    const gearData = profileRes.data.gear;
    
    if (!gearData || !gearData.items) {
      return { success: false, error: '获取玩家装备数据失败' };
    }
    
    const items = gearData.items;
    
    // 4. 组装前端需要的格式
    const leftGear = [];
    const rightGear = [];
    const weapons = [];
    
    const leftSlots = ['head', 'neck', 'shoulder', 'back', 'chest', 'shirt', 'tabard', 'wrist'];
    const rightSlots = ['hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2'];
    const weaponSlots = ['mainhand', 'offhand'];
    
    const formatItem = (slotKey) => {
      const item = items[slotKey];
      if (!item) return { slot: slotMap[slotKey] || slotKey, name: '', desc: '', quality: 'empty', icon: '' };
      return {
        slot: slotMap[slotKey] || slotKey,
        name: item.name,
        desc: `Item Level ${item.item_level}`,
        quality: 'epic',
        icon: item.icon ? `${ICON_BASE}${item.icon}.jpg` : '',
        id: item.item_id
      };
    };
    
    leftSlots.forEach(slot => leftGear.push(formatItem(slot)));
    rightSlots.forEach(slot => rightGear.push(formatItem(slot)));
    weaponSlots.forEach(slot => weapons.push(formatItem(slot)));
    
    return {
      success: true,
      data: {
        player: charName,
        realm: targetCharacter.realm.name,
        ilvl: gearData.item_level_equipped,
        leftGear,
        rightGear,
        weapons,
        stats: {
          crit: 0, haste: 0, mastery: 0, vers: 0 // API不直接提供绿字总和，前端可隐藏或显示装等
        }
      }
    };
    
  } catch (err) {
    console.error('getWowBisGear error:', err.response?.data || err.message);
    return { success: false, error: err.response?.data?.message || err.message };
  }
};
