const { MEMORY_ICONS } = require('../../data/games_data.js');

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',

    // 'ready' | 'playing' | 'game_over'
    gameState: 'ready',

    cards: [],
    flippedCards: [], // 记录当前翻开的卡牌索引 [index1, index2]
    matchedCount: 0,
    totalPairs: 8,

    moves: 0,
    elapsedSeconds: '0.0',
    combo: 0,

    isLocked: false, // 翻错两张牌等待翻回期间锁定点击

    resultSummary: null
  },

  timer: null,
  startTime: 0,

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
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.flipTimeout) {
      clearTimeout(this.flipTimeout);
      this.flipTimeout = null;
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

    // 复制 8 个技能，形成 16 张卡牌，并打乱顺序
    const deck = [];
    MEMORY_ICONS.forEach((icon, idx) => {
      deck.push({
        uid: `${icon.id}_1`,
        pairId: icon.id,
        name: icon.name,
        emoji: icon.emoji,
        color: icon.color,
        desc: icon.desc,
        isFlipped: false,
        isMatched: false
      });
      deck.push({
        uid: `${icon.id}_2`,
        pairId: icon.id,
        name: icon.name,
        emoji: icon.emoji,
        color: icon.color,
        desc: icon.desc,
        isFlipped: false,
        isMatched: false
      });
    });

    // 洗牌 Fisher-Yates
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.setData({
      gameState: 'playing',
      cards: deck,
      flippedCards: [],
      matchedCount: 0,
      moves: 0,
      elapsedSeconds: '0.0',
      combo: 0,
      isLocked: false,
      resultSummary: null
    });

    this.startTime = Date.now();
    this.timer = setInterval(() => {
      const diff = (Date.now() - this.startTime) / 1000;
      this.setData({
        elapsedSeconds: diff.toFixed(1)
      });
    }, 100);
  },

  // 点击卡牌
  onCardTap(e) {
    if (this.data.isLocked || this.data.gameState !== 'playing') return;

    const index = parseInt(e.currentTarget.dataset.index, 10);
    const card = this.data.cards[index];

    // 已匹配或已翻开的牌不可重复点
    if (card.isMatched || card.isFlipped) return;

    // 震动
    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

    // 翻开当前牌
    const updatedCards = [...this.data.cards];
    updatedCards[index].isFlipped = true;

    const currentFlipped = [...this.data.flippedCards, index];

    this.setData({
      cards: updatedCards,
      flippedCards: currentFlipped
    });

    // 如果翻开了两张牌
    if (currentFlipped.length === 2) {
      const idx1 = currentFlipped[0];
      const idx2 = currentFlipped[1];
      const card1 = updatedCards[idx1];
      const card2 = updatedCards[idx2];
      const newMoves = this.data.moves + 1;

      if (card1.pairId === card2.pairId) {
        // 匹配成功！
        card1.isMatched = true;
        card2.isMatched = true;
        const newMatched = this.data.matchedCount + 1;
        const newCombo = this.data.combo + 1;

        if (wx.vibrateShort) wx.vibrateShort({ type: 'medium' });

        this.setData({
          cards: updatedCards,
          flippedCards: [],
          matchedCount: newMatched,
          moves: newMoves,
          combo: newCombo
        });

        // 检查是否全部配对完成 (8 对)
        if (newMatched >= this.data.totalPairs) {
          this.finishGame(newMoves);
        }
      } else {
        // 匹配失败，短暂展示后翻转回去
        this.setData({
          isLocked: true,
          moves: newMoves,
          combo: 0
        });

        this.flipTimeout = setTimeout(() => {
          const revertCards = [...this.data.cards];
          revertCards[idx1].isFlipped = false;
          revertCards[idx2].isFlipped = false;

          this.setData({
            cards: revertCards,
            flippedCards: [],
            isLocked: false
          });
        }, 750);
      }
    }
  },

  finishGame(finalMoves) {
    this.clearAllTimers();
    const timeUsed = parseFloat(this.data.elapsedSeconds);

    // 星级与评定
    let stars = 1;
    let title = '初出茅庐';
    if (timeUsed <= 22 && finalMoves <= 14) {
      stars = 3;
      title = '魔兽速记神脑';
    } else if (timeUsed <= 36 && finalMoves <= 20) {
      stars = 2;
      title = '身手敏捷特工';
    }

    const best = wx.getStorageSync('game_memory_best') || {};
    const isNewBest = !best.time || timeUsed < best.time;
    if (isNewBest) {
      wx.setStorageSync('game_memory_best', {
        time: timeUsed,
        moves: finalMoves,
        stars: stars
      });
    }

    this.setData({
      gameState: 'game_over',
      resultSummary: {
        timeUsed: timeUsed,
        moves: finalMoves,
        stars: stars,
        title: title,
        isNewBest: isNewBest
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '技能连连看 - 全职业标志技能翻牌配对挑战！',
      path: '/pages/game-memory/game-memory'
    };
  },

  onShareTimeline() {
    return {
      title: '技能连连看 - 全职业标志技能翻牌配对挑战！',
      path: '/pages/game-memory/game-memory'
    };
  }
});
