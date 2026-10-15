const ROWS = 9;
const COLS = 9;
const MINES = 10;

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',
    grid: [],
    mode: 'dig', // 'dig' | 'flag'
    status: 'playing', // 'playing' | 'won' | 'lost'
    faceIcon: '🙂',
    timer: 0,
    flagsLeft: 10,
    bestTime: 999,
    gameStarted: false
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    const best = wx.getStorageSync('game_mines_best') || 999;
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';

    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32,
      theme: savedTheme,
      bestTime: best
    });

    this.startNewGame();
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  onUnload() {
    this.stopTimer();
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

  toggleMode() {
    this.setData({ mode: this.data.mode === 'dig' ? 'flag' : 'dig' });
    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
  },

  startNewGame() {
    this.stopTimer();

    let grid = [];
    for (let r = 0; r < ROWS; r++) {
      grid[r] = [];
      for (let c = 0; c < COLS; c++) {
        grid[r][c] = {
          r,
          c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0
        };
      }
    }

    this.setData({
      grid,
      status: 'playing',
      faceIcon: '🙂',
      timer: 0,
      flagsLeft: MINES,
      gameStarted: false
    });
  },

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.setData({ timer: this.data.timer + 1 });
    }, 1000);
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  placeMines(firstR, firstC) {
    let grid = this.data.grid;
    let placed = 0;

    while (placed < MINES) {
      const randR = Math.floor(Math.random() * ROWS);
      const randC = Math.floor(Math.random() * COLS);

      // Do not place on first clicked cell or its immediate neighbors
      if (Math.abs(randR - firstR) <= 1 && Math.abs(randC - firstC) <= 1) {
        continue;
      }

      if (!grid[randR][randC].isMine) {
        grid[randR][randC].isMine = true;
        placed++;
      }
    }

    // Calculate neighbor mine counts
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!grid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc].isMine) {
                count++;
              }
            }
          }
          grid[r][c].neighborMines = count;
        }
      }
    }

    this.setData({ grid });
  },

  onCellTap(e) {
    if (this.data.status !== 'playing') return;

    const { r, c } = e.currentTarget.dataset;
    const { mode, grid, gameStarted } = this.data;
    const cell = grid[r][c];

    if (cell.isRevealed) return;

    if (mode === 'flag') {
      this.toggleFlag(r, c);
      return;
    }

    // Dig mode
    if (cell.isFlagged) return;

    if (!gameStarted) {
      this.placeMines(r, c);
      this.startTimer();
      this.setData({ gameStarted: true });
    }

    if (cell.isMine) {
      this.triggerGameOver(r, c);
      return;
    }

    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
    this.revealCell(r, c);
  },

  onCellLongPress(e) {
    if (this.data.status !== 'playing') return;
    const { r, c } = e.currentTarget.dataset;
    this.toggleFlag(r, c);
  },

  toggleFlag(r, c) {
    let grid = this.data.grid;
    let cell = grid[r][c];

    if (cell.isRevealed) return;

    if (!cell.isFlagged && this.data.flagsLeft <= 0) {
      wx.showToast({ title: '旗帜已用尽', icon: 'none' });
      return;
    }

    cell.isFlagged = !cell.isFlagged;
    const flagsLeft = this.data.flagsLeft + (cell.isFlagged ? -1 : 1);

    if (wx.vibrateShort) wx.vibrateShort({ type: 'medium' });

    this.setData({
      grid,
      flagsLeft
    });
  },

  revealCell(r, c) {
    let grid = this.data.grid;

    const queue = [{ r, c }];
    grid[r][c].isRevealed = true;

    while (queue.length > 0) {
      const cur = queue.shift();
      const curCell = grid[cur.r][cur.c];

      if (curCell.neighborMines === 0 && !curCell.isMine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = cur.r + dr;
            const nc = cur.c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
              const neighbor = grid[nr][nc];
              if (!neighbor.isRevealed && !neighbor.isFlagged && !neighbor.isMine) {
                neighbor.isRevealed = true;
                if (neighbor.neighborMines === 0) {
                  queue.push({ r: nr, c: nc });
                }
              }
            }
          }
        }
      }
    }

    this.setData({ grid });
    this.checkWinCondition();
  },

  checkWinCondition() {
    const grid = this.data.grid;
    let unrevealedSafeCells = 0;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!grid[r][c].isMine && !grid[r][c].isRevealed) {
          unrevealedSafeCells++;
        }
      }
    }

    if (unrevealedSafeCells === 0) {
      this.stopTimer();
      const currentTime = this.data.timer;
      let newBest = Math.min(currentTime, this.data.bestTime);

      if (newBest < this.data.bestTime) {
        wx.setStorageSync('game_mines_best', newBest);
      }

      this.setData({
        status: 'won',
        faceIcon: '😎',
        bestTime: newBest
      });

      if (wx.vibrateShort) wx.vibrateShort({ type: 'heavy' });
    }
  },

  triggerGameOver(hitR, hitC) {
    this.stopTimer();
    let grid = this.data.grid;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c].isMine) {
          grid[r][c].isRevealed = true;
        }
      }
    }

    if (wx.vibrateShort) wx.vibrateShort({ type: 'heavy' });

    this.setData({
      grid,
      status: 'lost',
      faceIcon: '💥'
    });
  },

  onShareAppMessage() {
    const text = this.data.status === 'won'
      ? `我在【地精工程排雷营】仅耗时 ${this.data.timer} 秒成功拆弹通关！`
      : '地精高爆炸弹来袭！快来【地精工程排雷营】测测你的逻辑排雷身法！';
    return {
      title: text,
      path: '/pages/game-mines/game-mines'
    };
  },

  onShareTimeline() {
    return {
      title: '地精工程排雷营 - 魔兽经典排雷对决！',
      path: '/pages/game-mines/game-mines'
    };
  }
});
