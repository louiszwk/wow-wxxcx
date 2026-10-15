Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',
    board: [null, null, null, null, null, null, null, null, null],
    turn: 'X', // 'X' (Horde ⚔️) | 'O' (Alliance 🛡️)
    vsMode: 'ai', // 'ai' | 'pvp'
    status: 'playing', // 'playing' | 'won' | 'draw'
    winner: null,
    winningLine: [],
    stats: {
      xWins: 0,
      oWins: 0,
      draws: 0
    }
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    const stats = wx.getStorageSync('game_ttt_stats') || { xWins: 0, oWins: 0, draws: 0 };

    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32,
      theme: savedTheme,
      stats
    });
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
    this.resetGame();
  },

  resetGame() {
    this.setData({
      board: [null, null, null, null, null, null, null, null, null],
      turn: 'X',
      status: 'playing',
      winner: null,
      winningLine: []
    });
  },

  onCellTap(e) {
    const idx = e.currentTarget.dataset.index;
    const { board, turn, status, vsMode } = this.data;

    if (status !== 'playing' || board[idx] !== null) return;
    if (vsMode === 'ai' && turn === 'O') return;

    this.makeMove(idx, turn);

    if (vsMode === 'ai' && this.data.status === 'playing') {
      setTimeout(() => {
        this.makeAiMove();
      }, 250);
    }
  },

  makeMove(idx, player) {
    let board = [...this.data.board];
    board[idx] = player;

    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

    const winInfo = this.checkWin(board);
    if (winInfo) {
      let stats = this.data.stats;
      if (winInfo.winner === 'X') stats.xWins++;
      else stats.oWins++;
      wx.setStorageSync('game_ttt_stats', stats);

      if (wx.vibrateShort) wx.vibrateShort({ type: 'heavy' });

      this.setData({
        board,
        status: 'won',
        winner: winInfo.winner,
        winningLine: winInfo.line,
        stats
      });
      return;
    }

    if (board.every(cell => cell !== null)) {
      let stats = this.data.stats;
      stats.draws++;
      wx.setStorageSync('game_ttt_stats', stats);

      this.setData({
        board,
        status: 'draw',
        stats
      });
      return;
    }

    this.setData({
      board,
      turn: player === 'X' ? 'O' : 'X'
    });
  },

  checkWin(board) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diags
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line };
      }
    }
    return null;
  },

  makeAiMove() {
    if (this.data.status !== 'playing') return;
    const board = this.data.board;

    // Minimax to find optimal move for O
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        let score = this.minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    if (bestMove !== null) {
      this.makeMove(bestMove, 'O');
    }
  },

  minimax(board, depth, isMaximizing) {
    const win = this.checkWin(board);
    if (win) {
      return win.winner === 'O' ? 10 - depth : depth - 10;
    }
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          let score = this.minimax(board, depth + 1, false);
          board[i] = null;
          maxScore = Math.max(score, maxScore);
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          let score = this.minimax(board, depth + 1, true);
          board[i] = null;
          minScore = Math.min(score, minScore);
        }
      }
      return minScore;
    }
  },

  onShareAppMessage() {
    return {
      title: '战歌峡谷井字棋！阵营3连决战，快来与我战歌夺旗！',
      path: '/pages/game-tictactoe/game-tictactoe'
    };
  },

  onShareTimeline() {
    return {
      title: '战歌峡谷井字棋 - 部落战斧 vs 联盟坚盾！',
      path: '/pages/game-tictactoe/game-tictactoe'
    };
  }
});
