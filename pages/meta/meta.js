Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    dpsData: null,     // Mythicstats 爬取的 DPS
    tankData: null,    // Mythicstats 爬取的 Tank
    healerData: null,  // Mythicstats 爬取的 Healer
    theme: 'dark',
    loading: true,
    errorMsg: '',
    activeTab: 'dps'   // dps, tanks, healers
  },
  
  onLoad() {
    const app = getApp();
    if (app.globalData) {
      this.setData({
        navBarHeight: app.globalData.navBarHeight,
        menuButtonTop: app.globalData.menuButtonTop,
        menuButtonHeight: app.globalData.menuButtonHeight
      });
    }

    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });
    this.fetchData();
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  navigateBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  },

  fetchData() {
    this.setData({ loading: true, errorMsg: '' });
    
    // 1. 尝试从云数据库读取最新的定时缓存数据 (实现秒开)
    const db = wx.cloud.database();
    db.collection('meta_data').doc('latest').get().then(res => {
      if (res.data && res.data.html) {
        this.processMythicstats(res.data.html);
        this.setData({ loading: false });
      } else {
        this.fallbackFetch();
      }
    }).catch(err => {
      console.log('数据库未就绪或无缓存，回退到实时拉取', err);
      this.fallbackFetch();
    });
  },

  fallbackFetch() {
    // 2. 如果数据库没有数据，回退到老方法实时请求
    wx.cloud.callFunction({
      name: 'proxyRequest',
      data: {
        url: 'https://mythicstats.com/dps',
        method: 'GET',
        responseType: 'text'
      },
      success: (res) => {
        const result = res.result;
        if (result && result.success && result.data) {
          this.processMythicstats(result.data);
          this.setData({ loading: false });
        } else {
          this.setData({
            loading: false,
            errorMsg: '数据异常稍后再试'
          });
        }
      },
      fail: (err) => {
        console.error('Cloud function failed:', err);
        this.setData({
          loading: false,
          errorMsg: '数据异常稍后再试'
        });
      }
    });
  },



  processMythicstats(html) {
    if (!html) return;

    const chunkRegex = /<div class="h-6 flex justify-center items-center" style="background-color: [^"]*">([SABCDF])<\/div>\s*<div class="h-6 flex justify-center items-center" style="[^"]*" title="(\d+) average[^"]*">[^<]*<\/div>\s*<div class="h-6 flex justify-center items-center" style="[^"]*" title="(\d+) top[^"]*">[^<]*<\/div>\s*<div class="h-6 flex justify-center items-center" title="[^"]*" style="[^"]*">([\d,K\.]+)<\/div>.*?<span class="pl-1 capitalize whitespace-nowrap">(.*?)<\/span>/gs;
    
    let match;
    const dps = [];
    const tanks = [];
    const healers = [];

    const tankSet = new Set(['blood death-knight', 'vengeance demon-hunter', 'guardian druid', 'brewmaster monk', 'protection paladin', 'protection warrior']);
    const healerSet = new Set(['restoration druid', 'preservation evoker', 'mistweaver monk', 'holy paladin', 'discipline priest', 'holy priest', 'restoration shaman']);

    const enToCn = {
      'blood death-knight': '鲜血 死亡骑士', 'frost death-knight': '冰霜 死亡骑士', 'unholy death-knight': '邪恶 死亡骑士',
      'havoc demon-hunter': '浩劫 恶魔猎手', 'vengeance demon-hunter': '复仇 恶魔猎手', 'devourer demon-hunter': '浩劫 恶魔猎手',
      'balance druid': '平衡 德鲁伊', 'feral druid': '野性 德鲁伊', 'guardian druid': '守护 德鲁伊', 'restoration druid': '恢复 德鲁伊',
      'augmentation evoker': '增辉 唤魔师', 'devastation evoker': '湮灭 唤魔师', 'preservation evoker': '恩护 唤魔师',
      'beast-mastery hunter': '野兽控制 猎人', 'marksmanship hunter': '射击 猎人', 'survival hunter': '生存 猎人',
      'arcane mage': '奥术 法师', 'fire mage': '火焰 法师', 'frost mage': '冰霜 法师',
      'brewmaster monk': '酒仙 武僧', 'mistweaver monk': '织雾 武僧', 'windwalker monk': '踏风 武僧',
      'holy paladin': '神圣 圣骑士', 'protection paladin': '防护 圣骑士', 'retribution paladin': '惩戒 圣骑士',
      'discipline priest': '戒律 牧师', 'holy priest': '神圣 牧师', 'shadow priest': '暗影 牧师',
      'assassination rogue': '奇袭 潜行者', 'outlaw rogue': '狂徒 潜行者', 'subtlety rogue': '敏锐 潜行者',
      'elemental shaman': '元素 萨满', 'enhancement shaman': '增强 萨满', 'restoration shaman': '恢复 萨满',
      'affliction warlock': '痛苦 术士', 'demonology warlock': '恶魔学识 术士', 'destruction warlock': '毁灭 术士',
      'arms warrior': '武器 战士', 'fury warrior': '狂怒 战士', 'protection warrior': '防护 战士'
    };

    const tierColors = {
      'S': '#ff8000', 'A': '#a335ee', 'B': '#0070dd', 'C': '#1eff00', 'D': '#ffffff', 'F': '#9d9d9d'
    };

    while ((match = chunkRegex.exec(html)) !== null) {
      const tier = match[1];
      const val = parseInt(match[2], 10);
      const topVal = parseInt(match[3], 10);
      const runs = match[4];
      const enSpec = match[5].trim().toLowerCase();
      const cnName = enToCn[enSpec] || enSpec;
      
      const item = {
        name: cnName,
        tier: tier,
        tierColor: tierColors[tier],
        value: val > 1000 ? (val / 1000).toFixed(1) + 'K' : val,
        topValue: topVal > 1000 ? (topVal / 1000).toFixed(1) + 'K' : topVal,
        runs: runs,
        rawVal: val,
        rawTopVal: topVal,
        color: this.getColorForClassString(cnName)
      };

      if (tankSet.has(enSpec)) tanks.push(item);
      else if (healerSet.has(enSpec)) healers.push(item);
      else dps.push(item);
    }

    dps.sort((a, b) => b.rawVal - a.rawVal);
    tanks.sort((a, b) => b.rawVal - a.rawVal);
    healers.sort((a, b) => b.rawVal - a.rawVal);
    
    const maxDps = Math.max(...dps.map(d => d.rawTopVal)) || 1;
    dps.forEach(d => { d.avgPercent = (d.rawVal / maxDps) * 100; d.topPercent = (d.rawTopVal / maxDps) * 100; });
    
    const maxTank = Math.max(...tanks.map(d => d.rawTopVal)) || 1;
    tanks.forEach(d => { d.avgPercent = (d.rawVal / maxTank) * 100; d.topPercent = (d.rawTopVal / maxTank) * 100; });
    
    const maxHealer = Math.max(...healers.map(d => d.rawTopVal)) || 1;
    healers.forEach(d => { d.avgPercent = (d.rawVal / maxHealer) * 100; d.topPercent = (d.rawTopVal / maxHealer) * 100; });

    this.setData({ dpsData: dps, tankData: tanks, healerData: healers });
  },

  getColorForClassString(name) {
    const classColors = this.getClassColors();
    if (name.includes('死亡骑士')) return classColors['Death Knight'];
    if (name.includes('恶魔猎手')) return classColors['Demon Hunter'];
    if (name.includes('德鲁伊')) return classColors['Druid'];
    if (name.includes('唤魔师')) return classColors['Evoker'];
    if (name.includes('猎人')) return classColors['Hunter'];
    if (name.includes('法师')) return classColors['Mage'];
    if (name.includes('武僧')) return classColors['Monk'];
    if (name.includes('圣骑士')) return classColors['Paladin'];
    if (name.includes('牧师')) return classColors['Priest'];
    if (name.includes('潜行者')) return classColors['Rogue'];
    if (name.includes('萨满')) return classColors['Shaman'];
    if (name.includes('术士')) return classColors['Warlock'];
    if (name.includes('战士')) return classColors['Warrior'];
    return '#ffffff';
  },

  getClassColors() {
    return {
      'Death Knight': '#C41E3A', 'Demon Hunter': '#A330C9', 'Druid': '#FF7C0A',
      'Evoker': '#33937F', 'Hunter': '#ABD473', 'Mage': '#3FC7EB', 'Monk': '#00FF98',
      'Paladin': '#F48CBA', 'Priest': '#FFFFFF', 'Rogue': '#FFF468',
      'Shaman': '#0070DE', 'Warlock': '#8788EE', 'Warrior': '#C69B6D'
    };
  },

  getClsMap() {
    return { 'Death Knight':'死骑', 'Demon Hunter':'恶魔猎手', 'Druid':'德鲁伊', 'Evoker':'唤魔师', 'Hunter':'猎人', 'Mage':'法师', 'Monk':'武僧', 'Paladin':'圣骑士', 'Priest':'牧师', 'Rogue':'潜行者', 'Shaman':'萨满', 'Warlock':'术士', 'Warrior':'战士' };
  }
});
