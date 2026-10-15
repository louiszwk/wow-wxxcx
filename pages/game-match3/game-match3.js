const GEM_TYPES = [
  { id: 1, icon: '🔮', name: '奥术', color: '#a855f7' },
  { id: 2, icon: '❄️', name: '冰霜', color: '#38bdf8' },
  { id: 3, icon: '🔥', name: '烈焰', color: '#ef4444' },
  { id: 4, icon: '⚡', name: '风暴', color: '#f59e0b' },
  { id: 5, icon: '🌿', name: '自然', color: '#22c55e' },
  { id: 6, icon: '💀', name: '暗影', color: '#9333ea' }
];

const ROWS = 7;
const COLS = 7;

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',
    board: [],
    selected: null,
    score: 0,
    bestScore: 0,
    movesLeft: 25,
    combo: 0,
    isAnimating: false,
    gameOver: false,
    gameWon: false,
    targetScore: 1200
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    const best = wx.getStorageSync('game_match3_best') || 0;
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';

    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32,
      theme: savedTheme,
      bestScore: best
    });

    this.startNewGame();
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

  navigateBack() {
    wx.navigateBack({
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  },

  startNewGame() {
    let board = this.createInitialBoard();
    this.setData({
      board,
      selected: null,
      score: 0,
      movesLeft: 25,
      combo: 0,
      isAnimating: false,
      gameOver: false,
      gameWon: false
    });
  },

  createInitialBoard() {
    let board = [];
    for (let r = 0; r < ROWS; r++) {
      board[r] = [];
      for (let c = 0; c < COLS; c++) {
        let validGem = null;
        while (!validGem) {
          const randType = GEM_TYPES[Math.floor(Math.random() * GEM_TYPES.length)];
          // Avoid 3 in a row horizontally
          if (c >= 2 && board[r][c - 1].id === randType.id && board[r][c - 2].id === randType.id) {
            continue;
          }
          // Avoid 3 in a row vertically
          if (r >= 2 && board[r - 1][c].id === randType.id && board[r - 2][c].id === randType.id) {
            continue;
          }
          validGem = { ...randType, r, c };
        }
        board[r][c] = validGem;
      }
    }
    return board;
  },

  onGemTap(e) {
    if (this.data.isAnimating || this.data.gameOver) return;

    const { r, c } = e.currentTarget.dataset;
    const { selected, board } = this.data;

    if (!selected) {
      // First select
      this.setData({ selected: { r, c } });
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      return;
    }

    // If tapped the same gem, deselect
    if (selected.r === r && selected.c === c) {
      this.setData({ selected: null });
      return;
    }

    // Check if adjacent
    const isAdjacent = Math.abs(selected.r - r) + Math.abs(selected.c - c) === 1;
    if (!isAdjacent) {
      // Re-select new gem
      this.setData({ selected: { r, c } });
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      return;
    }

    // Swap gems
    this.trySwap(selected, { r, c });
  },

  trySwap(p1, p2) {
    let board = JSON.parse(JSON.stringify(this.data.board));
    
    // Perform swap
    const temp = board[p1.r][p1.c];
    board[p1.r][p1.c] = { ...board[p2.r][p2.c], r: p1.r, c: p1.c };
    board[p2.r][p2.c] = { ...temp, r: p2.r, c: p2.c };

    const matches = this.findMatches(board);

    if (matches.length > 0) {
      // Valid move!
      const newMoves = this.data.movesLeft - 1;
      this.setData({
        board,
        selected: null,
        movesLeft: newMoves,
        isAnimating: true
      });
      if (wx.vibrateShort) wx.vibrateShort({ type: 'medium' });
      this.processMatches(board, 1);
    } else {
      // Invalid move -> show brief swap and revert
      this.setData({ board, selected: null, isAnimating: true });
      setTimeout(() => {
        // Revert swap
        const revTemp = board[p1.r][p1.c];
        board[p1.r][p1.c] = { ...board[p2.r][p2.c], r: p1.r, c: p1.c };
        board[p2.r][p2.c] = { ...revTemp, r: p2.r, c: p2.c };
        this.setData({ board, isAnimating: false });
      }, 250);
    }
  },

  findMatches(board) {
    let matchedSet = new Set();

    // Check horizontal matches
    for (let r = 0; r < ROWS; r++) {
      let count = 1;
      for (let c = 1; c <= COLS; c++) {
        if (c < COLS && board[r][c].id === board[r][c - 1].id) {
          count++;
        } else {
          if (count >= 3) {
            for (let k = 0; k < count; k++) {
              matchedSet.add(`${r},${c - 1 - k}`);
            }
          }
          count = 1;
        }
      }
    }

    // Check vertical matches
    for (let c = 0; c < COLS; c++) {
      let count = 1;
      for (let r = 1; r <= ROWS; r++) {
        if (r < ROWS && board[r][c].id === board[r - 1][c].id) {
          count++;
        } else {
          if (count >= 3) {
            for (let k = 0; k < count; k++) {
              matchedSet.add(`${r - 1 - k},${c}`);
            }
          }
          count = 1;
        }
      }
    }

    return Array.from(matchedSet).map(s => {
      const [r, c] = s.split(',').map(Number);
      return { r, c };
    });
  },

  processMatches(board, comboMultiplier) {
    const matches = this.findMatches(board);
    if (matches.length === 0) {
      // No more matches in chain
      this.checkEndGame();
      this.setData({ isAnimating: false });
      return;
    }

    // Mark matched cells
    const gainedScore = matches.length * 15 * comboMultiplier;
    const newScore = this.data.score + gainedScore;
    let newBest = Math.max(newScore, this.data.bestScore);

    if (newBest > this.data.bestScore) {
      wx.setStorageSync('game_match3_best', newBest);
    }

    // Clear matched cells (set id to 0)
    matches.forEach(m => {
      board[m.r][m.c] = null;
    });

    this.setData({
      score: newScore,
      bestScore: newBest,
      combo: comboMultiplier
    });

    setTimeout(() => {
      // Drop gems down column by column
      for (let c = 0; c < COLS; c++) {
        let emptyRow = ROWS - 1;
        for (let r = ROWS - 1; r >= 0; r--) {
          if (board[r][c] !== null) {
            if (emptyRow !== r) {
              board[emptyRow][c] = { ...board[r][c], r: emptyRow, c };
              board[r][c] = null;
            }
            emptyRow--;
          }
        }
        // Fill remaining top cells with new random gems
        for (let r = emptyRow; r >= 0; r--) {
          const randType = GEM_TYPES[Math.floor(Math.random() * GEM_TYPES.length)];
          board[r][c] = { ...randType, r, c };
        }
      }

      this.setData({ board });

      // Check for cascade chain reactions
      setTimeout(() => {
        this.processMatches(board, comboMultiplier + 1);
      }, 250);
    }, 200);
  },

  checkEndGame() {
    const { movesLeft, score, targetScore } = this.data;
    if (movesLeft <= 0) {
      const won = score >= targetScore;
      this.setData({
        gameOver: true,
        gameWon: won
      });
      if (won) {
        wx.showToast({ title: '🎉 达成目标！', icon: 'success' });
      }
    }
  },

  onShareAppMessage() {
    return {
      title: `我在【达拉然魔法宝石消消乐】斩获了 ${this.data.score} 分！快来挑战三消大师！`,
      path: '/pages/game-match3/game-match3'
    };
  },

  onShareTimeline() {
    return {
      title: `我在【达拉然魔法宝石消消乐】斩获了 ${this.data.score} 分！快来挑战三消大师！`,
      path: '/pages/game-match3/game-match3'
    };
  }
});
