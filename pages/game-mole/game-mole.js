const MOLE_TYPES = [
  { type: 'trogg', name: '穴居人', icon: '🧌', score: 10, prob: 0.5 },
  { type: 'murloc', name: '哇啦啦鱼人', icon: '🐟', score: 20, prob: 0.25 },
  { type: 'goblin', name: '黄金地精', icon: '💰', score: 50, prob: 0.1 },
  { type: 'bomb', name: '炸药桶', icon: '💣', score: -30, isHarmful: true, prob: 0.15 }
];

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',

    // 'ready' | 'playing' | 'game_over'
    gameState: 'ready',

    holes: [], // 9 个洞的状态: { id: 0..8, active: bool, mole: obj, isHit: bool }
    timeLeft: 30,
    score: 0,
    combo: 0,
    maxCombo: 0,
    hits: 0,
    misses: 0,
    bestScore: 0,

    lastHitFeedback: null, // { text, x, y }

    resultSummary: null
  },

  timer: null,
  spawnTimer: null,
  hideTimers: {},

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32
    });

    const savedBest = wx.getStorageSync('game_mole_best') || 0;
    this.setData({ bestScore: savedBest });
    this.initHoles();
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });
  },

  onUnload() {
    this.clearAllTimers();
  },

  clearAllTimers() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.spawnTimer) {
      clearInterval(this.spawnTimer);
      this.spawnTimer = null;
    }
    Object.keys(this.hideTimers).forEach(k => {
      clearTimeout(this.hideTimers[k]);
    });
    this.hideTimers = {};
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateBack() {
    this.clearAllTimers();
    wx.navigateBack({
      fail: () => {
        wx.redirectTo({ url: '/pages/game-hub/game-hub' });
      }
    });
  },

  initHoles() {
    const h = [];
    for (let i = 0; i < 9; i++) {
      h.push({
        id: i,
        active: false,
        mole: null,
        isHit: false
      });
    }
    this.setData({ holes: h });
  },

  startGame() {
    this.clearAllTimers();
    this.initHoles();

    this.setData({
      gameState: 'playing',
      timeLeft: 30,
      score: 0,
      combo: 0,
      maxCombo: 0,
      hits: 0,
      misses: 0,
      resultSummary: null
    });

    // 倒计时
    this.timer = setInterval(() => {
      const left = this.data.timeLeft - 1;
      this.setData({ timeLeft: left });
      if (left <= 0) {
        this.finishGame();
      }
    }, 1000);

    // 怪物刷新循环
    this.spawnLoop();
  },

  spawnLoop() {
    const spawnOnce = () => {
      if (this.data.gameState !== 'playing') return;

      // 寻找空洞
      const inactiveHoles = this.data.holes.filter(h => !h.active).map(h => h.id);
      if (inactiveHoles.length === 0) return;

      const chosenHoleId = inactiveHoles[Math.floor(Math.random() * inactiveHoles.length)];

      // 按概率随机一种怪物
      const rnd = Math.random();
      let accum = 0;
      let chosenType = MOLE_TYPES[0];
      for (const m of MOLE_TYPES) {
        accum += m.prob;
        if (rnd <= accum) {
          chosenType = m;
          break;
        }
      }

      const updated = [...this.data.holes];
      updated[chosenHoleId] = {
        id: chosenHoleId,
        active: true,
        mole: chosenType,
        isHit: false
      };
      this.setData({ holes: updated });

      // 停留时间（地精最快 450ms，普通 750ms）
      const stayTime = chosenType.type === 'goblin' ? 480 : 720;

      this.hideTimers[chosenHoleId] = setTimeout(() => {
        if (this.data.gameState !== 'playing') return;
        const cur = [...this.data.holes];
        if (cur[chosenHoleId] && cur[chosenHoleId].active && !cur[chosenHoleId].isHit) {
          cur[chosenHoleId].active = false;
          cur[chosenHoleId].mole = null;
          this.setData({ holes: cur });
        }
      }, stayTime);
    };

    // 每 420ms 触发一次
    this.spawnTimer = setInterval(() => {
      spawnOnce();
      // 随着时间减少，有概率同时刷两个
      if (this.data.timeLeft < 18 && Math.random() < 0.35) {
        spawnOnce();
      }
    }, 420);
  },

  // 玩家击打洞口
  onWhackTap(e) {
    if (this.data.gameState !== 'playing') return;
    const holeId = parseInt(e.currentTarget.dataset.id, 10);
    const hole = this.data.holes[holeId];

    if (!hole.active || hole.isHit || !hole.mole) {
      // 击空
      return;
    }

    const mole = hole.mole;
    const isHarmful = mole.isHarmful;

    if (isHarmful) {
      // 砸中炸药桶！
      if (wx.vibrateLong) wx.vibrateLong();
      const newScore = Math.max(0, this.data.score + mole.score);
      const updated = [...this.data.holes];
      updated[holeId].isHit = true;

      this.setData({
        holes: updated,
        score: newScore,
        combo: 0,
        misses: this.data.misses + 1,
        lastHitFeedback: { text: '💥 炸飞! -30', type: 'bad' }
      });
    } else {
      // 命中目标！
      if (wx.vibrateShort) wx.vibrateShort({ type: 'medium' });
      const newCombo = this.data.combo + 1;
      const comboBonus = (newCombo - 1) * 5;
      const earned = mole.score + comboBonus;
      const newScore = this.data.score + earned;
      const newHits = this.data.hits + 1;
      const updated = [...this.data.holes];
      updated[holeId].isHit = true;

      this.setData({
        holes: updated,
        score: newScore,
        combo: newCombo,
        maxCombo: Math.max(this.data.maxCombo, newCombo),
        hits: newHits,
        lastHitFeedback: { text: `+${earned}`, type: 'good' }
      });
    }

    // 命中后迅速隐去
    setTimeout(() => {
      const cur = [...this.data.holes];
      if (cur[holeId]) {
        cur[holeId].active = false;
        cur[holeId].mole = null;
        cur[holeId].isHit = false;
        this.setData({ holes: cur });
      }
    }, 180);
  },

  finishGame() {
    this.clearAllTimers();

    const score = this.data.score;
    const hits = this.data.hits;
    const misses = this.data.misses;
    const totalTaps = hits + misses;
    const accuracy = totalTaps > 0 ? Math.round((hits / totalTaps) * 100) : 0;

    let title = '初级矿工';
    let badge = '⛏️';
    if (score >= 600) {
      title = '艾泽拉斯神锤尊者';
      badge = '👑';
    } else if (score >= 420) {
      title = '鱼人克星先锋';
      badge = '⚡';
    } else if (score >= 260) {
      title = '熟练矿道清道夫';
      badge = '⭐';
    }

    const savedBest = wx.getStorageSync('game_mole_best') || 0;
    const isNewBest = score > savedBest;
    if (isNewBest) {
      wx.setStorageSync('game_mole_best', score);
    }

    this.setData({
      gameState: 'game_over',
      bestScore: Math.max(savedBest, score),
      resultSummary: {
        score: score,
        hits: hits,
        maxCombo: this.data.maxCombo,
        accuracy: accuracy,
        title: title,
        badge: badge,
        isNewBest: isNewBest
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '矿洞打穴居人 - 暴富矿洞狂暴敲地鼠！',
      path: '/pages/game-mole/game-mole'
    };
  },

  onShareTimeline() {
    return {
      title: '矿洞打穴居人 - 暴富矿洞狂暴敲地鼠！',
      path: '/pages/game-mole/game-mole'
    };
  }
});
