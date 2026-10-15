const BOARD_SIZE = 11;

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',
    board: [],
    currentPlayer: 1, // 1: 部落 (Horde), 2: 联盟 (Alliance)
    vsMode: 'ai', // 'ai' | 'pvp'
    status: 'playing', // 'playing' | 'won' | 'draw'
    winner: null,
    moveHistory: [],
    lastMove: null,
    stats: {
      hordeWins: 0,
      allianceWins: 0
    }
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    const stats = wx.getStorageSync('game_gomoku_stats') || { hordeWins: 0, allianceWins: 0 };

    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32,
      theme: savedTheme,
      stats
    });

    this.initBoard();
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

  switchMode(e) {
    const mode = e.currentTarget.dataset.mode;
    if (mode === this.data.vsMode) return;
    this.setData({ vsMode: mode });
    this.initBoard();
  },

  initBoard() {
    let board = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      board[r] = [];
      for (let c = 0; c < BOARD_SIZE; c++) {
        board[r][c] = 0; // 0: empty, 1: horde, 2: alliance
      }
    }

    this.setData({
      board,
      currentPlayer: 1,
      status: 'playing',
      winner: null,
      moveHistory: [],
      lastMove: null
    });
  },

  onCellTap(e) {
    if (this.data.status !== 'playing') return;

    const { r, c } = e.currentTarget.dataset;
    if (this.data.board[r][c] !== 0) return;

    // In AI mode, if current player is AI (2), ignore user tap
    if (this.data.vsMode === 'ai' && this.data.currentPlayer === 2) return;

    this.makeMove(r, c, this.data.currentPlayer);

    // If AI mode and game is still playing, trigger AI move
    if (this.data.vsMode === 'ai' && this.data.status === 'playing') {
      setTimeout(() => {
        this.makeAiMove();
      }, 300);
    }
  },

  makeMove(r, c, player) {
    let board = this.data.board;
    board[r][c] = player;

    const moveHistory = [...this.data.moveHistory, { r, c, player }];
    const nextPlayer = player === 1 ? 2 : 1;

    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

    this.setData({
      board,
      moveHistory,
      lastMove: { r, c },
      currentPlayer: nextPlayer
    });

    if (this.checkWin(r, c, player)) {
      this.handleWin(player);
    } else if (moveHistory.length === BOARD_SIZE * BOARD_SIZE) {
      this.setData({ status: 'draw' });
    }
  },

  handleWin(player) {
    let stats = this.data.stats;
    if (player === 1) stats.hordeWins++;
    else stats.allianceWins++;

    wx.setStorageSync('game_gomoku_stats', stats);

    if (wx.vibrateShort) wx.vibrateShort({ type: 'heavy' });

    this.setData({
      status: 'won',
      winner: player,
      stats
    });
  },

  undoMove() {
    const { moveHistory, vsMode } = this.data;
    if (moveHistory.length === 0 || this.data.status !== 'playing') return;

    let board = this.data.board;
    const stepsToUndo = vsMode === 'ai' ? 2 : 1;

    for (let i = 0; i < stepsToUndo && moveHistory.length > 0; i++) {
      const last = moveHistory.pop();
      board[last.r][last.c] = 0;
    }

    const newLastMove = moveHistory.length > 0 ? moveHistory[moveHistory.length - 1] : null;
    const nextPlayer = moveHistory.length % 2 === 0 ? 1 : 2;

    this.setData({
      board,
      moveHistory,
      lastMove: newLastMove,
      currentPlayer: nextPlayer
    });
  },

  checkWin(r, c, player) {
    const board = this.data.board;
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal \
      [1, -1]   // anti-diagonal /
    ];

    for (let [dr, dc] of directions) {
      let count = 1;

      // Check positive direction
      for (let step = 1; step < 5; step++) {
        const nr = r + dr * step;
        const nc = c + dc * step;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] === player) {
          count++;
        } else {
          break;
        }
      }

      // Check negative direction
      for (let step = 1; step < 5; step++) {
        const nr = r - dr * step;
        const nc = c - dc * step;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] === player) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) return true;
    }

    return false;
  },

  makeAiMove() {
    if (this.data.status !== 'playing') return;

    const board = this.data.board;
    let bestScore = -Infinity;
    let bestMove = null;

    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board[r][c] === 0) {
          // Evaluate AI score (attack) + opponent score (defense)
          const attackScore = this.evaluatePosition(r, c, 2);
          const defenseScore = this.evaluatePosition(r, c, 1);
          const totalScore = attackScore * 1.1 + defenseScore;

          if (totalScore > bestScore) {
            bestScore = totalScore;
            bestMove = { r, c };
          }
        }
      }
    }

    if (bestMove) {
      this.makeMove(bestMove.r, bestMove.c, 2);
    }
  },

  evaluatePosition(r, c, player) {
    const board = this.data.board;
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    let totalScore = 0;

    for (let [dr, dc] of directions) {
      let count = 1;
      let blocked = 0;

      // Positive
      for (let step = 1; step < 5; step++) {
        const nr = r + dr * step;
        const nc = c + dc * step;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
          if (board[nr][nc] === player) count++;
          else if (board[nr][nc] !== 0) { blocked++; break; }
          else break;
        } else {
          blocked++;
          break;
        }
      }

      // Negative
      for (let step = 1; step < 5; step++) {
        const nr = r - dr * step;
        const nc = c - dc * step;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
          if (board[nr][nc] === player) count++;
          else if (board[nr][nc] !== 0) { blocked++; break; }
          else break;
        } else {
          blocked++;
          break;
        }
      }

      if (count >= 5) totalScore += 100000;
      else if (count === 4) totalScore += blocked === 0 ? 10000 : 1000;
      else if (count === 3) totalScore += blocked === 0 ? 1000 : 100;
      else if (count === 2) totalScore += blocked === 0 ? 100 : 10;
    }

    return totalScore;
  },

  onShareAppMessage() {
    return {
      title: '战歌峡谷五子棋！联盟 vs 部落 棋盘博弈，快来与我对弈一局！',
      path: '/pages/game-gomoku/game-gomoku'
    };
  },

  onShareTimeline() {
    return {
      title: '战歌五子棋：联盟vs部落 棋盘巅峰对决！',
      path: '/pages/game-gomoku/game-gomoku'
    };
  }
});
