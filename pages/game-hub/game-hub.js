Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',
    activeTab: 'all', // 'all' | 'reaction' | 'puzzle' | 'arcade'
    stats: {
      kickBestScore: 0,
      kickBestTitle: '未测试',
      quizBestScore: 0,
      quizBestTitle: '未测试',
      memoryBestTime: null,
      memoryBestStars: 0,
      dodgeBestWaves: 0,
      dodgeBestTitle: '未测试',
      best2048: 0,
      moleBestScore: 0,
      flappyBestScore: 0,
      snakeBestScore: 0
    }
  },

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
    this.loadUserStats();
  },

  loadUserStats() {
    const kickBest = wx.getStorageSync('game_kick_best') || {};
    const quizBest = wx.getStorageSync('game_quiz_best') || {};
    const memoryBest = wx.getStorageSync('game_memory_best') || {};
    const dodgeBest = wx.getStorageSync('game_dodge_best') || {};
    const best2048 = wx.getStorageSync('game_2048_best') || 0;
    const moleBest = wx.getStorageSync('game_mole_best') || 0;
    const flappyBest = wx.getStorageSync('game_flappy_best') || 0;
    const snakeBest = wx.getStorageSync('game_snake_best') || 0;

    this.setData({
      stats: {
        kickBestScore: kickBest.score || 0,
        kickBestTitle: kickBest.title || '暂无纪录',
        quizBestScore: quizBest.score !== undefined ? `${quizBest.score}分` : '暂无纪录',
        quizBestTitle: quizBest.title || '暂无纪录',
        memoryBestTime: memoryBest.time ? `${memoryBest.time}s` : '暂无纪录',
        memoryBestStars: memoryBest.stars || 0,
        dodgeBestWaves: dodgeBest.waves !== undefined ? `${dodgeBest.waves}波` : '暂无纪录',
        dodgeBestTitle: dodgeBest.title || '暂无纪录',
        best2048: best2048 > 0 ? `${best2048}分` : '暂无纪录',
        moleBestScore: moleBest > 0 ? `${moleBest}分` : '暂无纪录',
        flappyBestScore: flappyBest > 0 ? `${flappyBest}分` : '暂无纪录',
        snakeBestScore: snakeBest > 0 ? `${snakeBest}分` : '暂无纪录'
      }
    });
  },

  setTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateBack() {
    wx.navigateBack({
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  },

  // 8 款小游戏路由跳转
  goToKickGame() {
    wx.navigateTo({ url: '/pages/game-kick/game-kick' });
  },

  goToQuizGame() {
    wx.navigateTo({ url: '/pages/game-quiz/game-quiz' });
  },

  goToMemoryGame() {
    wx.navigateTo({ url: '/pages/game-memory/game-memory' });
  },

  goToDodgeGame() {
    wx.navigateTo({ url: '/pages/game-dodge/game-dodge' });
  },

  goTo2048Game() {
    wx.navigateTo({ url: '/pages/game-2048/game-2048' });
  },

  goToMoleGame() {
    wx.navigateTo({ url: '/pages/game-mole/game-mole' });
  },

  goToFlappyGame() {
    wx.navigateTo({ url: '/pages/game-flappy/game-flappy' });
  },

  goToSnakeGame() {
    wx.navigateTo({ url: '/pages/game-snake/game-snake' });
  },

  goToMatch3Game() {
    wx.navigateTo({ url: '/pages/game-match3/game-match3' });
  },

  goToMinesGame() {
    wx.navigateTo({ url: '/pages/game-mines/game-mines' });
  },

  goToGomokuGame() {
    wx.navigateTo({ url: '/pages/game-gomoku/game-gomoku' });
  },

  goToReactionGame() {
    wx.navigateTo({ url: '/pages/game-reaction/game-reaction' });
  },

  goToBreakoutGame() {
    wx.navigateTo({ url: '/pages/game-breakout/game-breakout' });
  },

  goToTetrisGame() {
    wx.navigateTo({ url: '/pages/game-tetris/game-tetris' });
  },

  goToTicTacToeGame() {
    wx.navigateTo({ url: '/pages/game-tictactoe/game-tictactoe' });
  },

  goToMazeGame() {
    wx.navigateTo({ url: '/pages/game-maze/game-maze' });
  },

  onShareAppMessage() {
    return {
      title: '艾泽拉斯游乐场 - 经典魔兽小游戏合集！',
      path: '/pages/game-hub/game-hub'
    };
  },

  onShareTimeline() {
    return {
      title: '艾泽拉斯游乐场 - 经典魔兽小游戏合集！',
      path: '/pages/game-hub/game-hub'
    };
  }
});
