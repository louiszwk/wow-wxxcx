const { DODGE_CONFIG, getDodgeTitle } = require('../../data/games_data.js');

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',

    // 'ready' | 'playing' | 'game_over'
    gameState: 'ready',

    playerPos: 4, // 初始在九宫格中心 (0-8)
    lives: 3,
    wave: 1,
    score: 0,

    // 9 个格子的当前状态
    // { id: 0..8, isPlayer: bool, isHazard: bool, hazardType: null, isDetonated: bool }
    gridTiles: [],

    activeHazards: [], // 当前预警的危险格子索引列表
    currentHazardInfo: null, // 当前主要词缀信息
    warnProgress: 100, // 倒计时进度条

    resultSummary: null
  },

  waveTimer: null,
  progressTimer: null,

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32
    });
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });
  },

  onUnload() {
    this.clearAllTimers();
  },

  clearAllTimers() {
    if (this.waveTimer) {
      clearTimeout(this.waveTimer);
      this.waveTimer = null;
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
    if (this.nextWaveTimeout) {
      clearTimeout(this.nextWaveTimeout);
      this.nextWaveTimeout = null;
    }
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

  startGame() {
    this.clearAllTimers();
    this.initGrid(4);

    this.setData({
      gameState: 'playing',
      playerPos: 4,
      lives: 3,
      wave: 1,
      score: 0,
      activeHazards: [],
      currentHazardInfo: null,
      resultSummary: null
    });

    this.startNextWave();
  },

  initGrid(playerIdx) {
    const tiles = [];
    for (let i = 0; i < 9; i++) {
      tiles.push({
        id: i,
        isPlayer: i === playerIdx,
        isHazard: false,
        hazardType: null,
        isDetonated: false
      });
    }
    this.setData({ gridTiles: tiles });
  },

  // 玩家点击九宫格格子进行走位
  onTileTap(e) {
    if (this.data.gameState !== 'playing') return;
    const targetIdx = parseInt(e.currentTarget.dataset.index, 10);

    // 走位至目标格子
    if (targetIdx === this.data.playerPos) return;

    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

    const tiles = this.data.gridTiles.map(t => ({
      ...t,
      isPlayer: t.id === targetIdx
    }));

    this.setData({
      playerPos: targetIdx,
      gridTiles: tiles
    });
  },

  // 开启新一波词缀预警
  startNextWave() {
    this.clearAllTimers();

    const wave = this.data.wave;
    // 词缀预警时间随波数递减（从 1400ms 降至最低 650ms）
    const warnTime = Math.max(650, 1400 - (wave - 1) * 35);

    // 随机选择词缀
    const hazardList = DODGE_CONFIG.hazards;
    const hazard = hazardList[Math.floor(Math.random() * hazardList.length)];

    // 决定本波危险格子数量 (Wave 1-4: 1-2个; Wave 5-10: 2-3个; Wave 11+: 3-4个)
    let count = 1;
    if (wave >= 11) {
      count = Math.random() < 0.6 ? 3 : 4;
    } else if (wave >= 5) {
      count = Math.random() < 0.6 ? 2 : 3;
    } else if (wave >= 3) {
      count = Math.random() < 0.5 ? 1 : 2;
    }

    // 随机挑选危险格子（优先包含玩家当前格子或周围，确保玩家需要走位！）
    const dangerIndices = [];
    // 60% 概率将玩家当前站立点选为危险圈，逼迫玩家走位！
    if (Math.random() < 0.7) {
      dangerIndices.push(this.data.playerPos);
    }

    while (dangerIndices.length < count) {
      const rnd = Math.floor(Math.random() * 9);
      if (!dangerIndices.includes(rnd)) {
        dangerIndices.push(rnd);
      }
    }

    // 更新格子渲染状态
    const tiles = this.data.gridTiles.map(t => ({
      ...t,
      isHazard: dangerIndices.includes(t.id),
      hazardType: dangerIndices.includes(t.id) ? hazard.type : null,
      isDetonated: false
    }));

    this.setData({
      activeHazards: dangerIndices,
      currentHazardInfo: hazard,
      gridTiles: tiles,
      warnProgress: 100
    });

    // 预警倒计时
    const startTime = Date.now();
    this.progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const leftPct = Math.max(0, 100 - (elapsed / warnTime) * 100);
      this.setData({ warnProgress: leftPct });
    }, 30);

    // 预警结束，词缀引爆判定
    this.waveTimer = setTimeout(() => {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
      this.handleDetonation(dangerIndices, hazard);
    }, warnTime);
  },

  handleDetonation(dangerIndices, hazard) {
    const playerHit = dangerIndices.includes(this.data.playerPos);

    // 引爆视觉
    const tiles = this.data.gridTiles.map(t => ({
      ...t,
      isDetonated: dangerIndices.includes(t.id)
    }));

    if (playerHit) {
      // 受到伤害！
      if (wx.vibrateLong) wx.vibrateLong();
      const newLives = Math.max(0, this.data.lives - 1);

      this.setData({
        gridTiles: tiles,
        lives: newLives,
        warnProgress: 0
      });

      if (newLives <= 0) {
        this.nextWaveTimeout = setTimeout(() => {
          this.finishGame();
        }, 800);
        return;
      }
    } else {
      // 成功走位规避！
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      const waveBonus = this.data.wave * 15 + 50;

      this.setData({
        gridTiles: tiles,
        score: this.data.score + waveBonus,
        warnProgress: 0
      });
    }

    // 进入下一波
    this.nextWaveTimeout = setTimeout(() => {
      this.setData({
        wave: this.data.wave + 1
      });
      this.startNextWave();
    }, 450);
  },

  finishGame() {
    this.clearAllTimers();

    const waves = this.data.wave;
    const score = this.data.score;
    const titleInfo = getDodgeTitle(waves);

    const best = wx.getStorageSync('game_dodge_best') || {};
    const isNewBest = !best.waves || waves > best.waves;
    if (isNewBest) {
      wx.setStorageSync('game_dodge_best', {
        waves: waves,
        score: score,
        title: titleInfo.title,
        tier: titleInfo.tier
      });
    }

    this.setData({
      gameState: 'game_over',
      resultSummary: {
        waves: waves,
        score: score,
        title: titleInfo.title,
        tier: titleInfo.tier,
        badge: titleInfo.badge,
        isNewBest: isNewBest
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '词缀走位大挑战 - 极限身法躲避火山风雷！',
      path: '/pages/game-dodge/game-dodge'
    };
  },

  onShareTimeline() {
    return {
      title: '词缀走位大挑战 - 极限身法躲避火山风雷！',
      path: '/pages/game-dodge/game-dodge'
    };
  }
});
