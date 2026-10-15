const ROWS = 18;
const COLS = 10;

const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: '#06b6d4' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#3b82f6' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f97316' },
  O: { shape: [[1, 1], [1, 1]], color: '#eab308' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#22c55e' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a855f7' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#ef4444' }
};

const PIECE_KEYS = Object.keys(TETROMINOES);

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',
    grid: [],
    displayGrid: [],
    nextPiecePreview: [],
    score: 0,
    lines: 0,
    level: 1,
    bestScore: 0,
    gameState: 'ready', // 'ready' | 'playing' | 'paused' | 'over'
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    const best = wx.getStorageSync('game_tetris_best') || 0;

    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32,
      theme: savedTheme,
      bestScore: best
    });

    this.initBoard();
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  onUnload() {
    this.stopDropTimer();
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateBack() {
    this.stopDropTimer();
    wx.navigateBack({
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  },

  initBoard() {
    this.stopDropTimer();
    let grid = [];
    for (let r = 0; r < ROWS; r++) {
      grid[r] = [];
      for (let c = 0; c < COLS; c++) {
        grid[r][c] = null;
      }
    }

    this.nextPieceKey = this.getRandomPieceKey();

    this.setData({
      grid,
      displayGrid: grid,
      score: 0,
      lines: 0,
      level: 1,
      gameState: 'ready'
    });

    this.updateNextPreview();
  },

  getRandomPieceKey() {
    return PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)];
  },

  updateNextPreview() {
    const piece = TETROMINOES[this.nextPieceKey];
    this.setData({ nextPiecePreview: piece.shape });
  },

  startGame() {
    this.spawnPiece();
    this.setData({ gameState: 'playing' });
    this.startDropTimer();
  },

  startDropTimer() {
    this.stopDropTimer();
    const speed = Math.max(150, 700 - (this.data.level - 1) * 70);
    this.dropInterval = setInterval(() => {
      this.moveDown();
    }, speed);
  },

  stopDropTimer() {
    if (this.dropInterval) {
      clearInterval(this.dropInterval);
      this.dropInterval = null;
    }
  },

  spawnPiece() {
    const key = this.nextPieceKey;
    this.nextPieceKey = this.getRandomPieceKey();
    this.updateNextPreview();

    const t = TETROMINOES[key];
    this.currentPiece = {
      shape: JSON.parse(JSON.stringify(t.shape)),
      color: t.color,
      r: 0,
      c: Math.floor((COLS - t.shape[0].length) / 2)
    };

    if (this.checkCollision(this.currentPiece.r, this.currentPiece.c, this.currentPiece.shape)) {
      // Game Over!
      this.stopDropTimer();
      this.setData({ gameState: 'over' });
      if (wx.vibrateShort) wx.vibrateShort({ type: 'heavy' });
    } else {
      this.render();
    }
  },

  checkCollision(r, c, shape) {
    const grid = this.data.grid;
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newR = r + row;
          const newC = c + col;

          if (newR >= ROWS || newC < 0 || newC >= COLS) return true;
          if (newR >= 0 && grid[newR][newC] !== null) return true;
        }
      }
    }
    return false;
  },

  moveLeft() {
    if (this.data.gameState !== 'playing' || !this.currentPiece) return;
    if (!this.checkCollision(this.currentPiece.r, this.currentPiece.c - 1, this.currentPiece.shape)) {
      this.currentPiece.c--;
      this.render();
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
    }
  },

  moveRight() {
    if (this.data.gameState !== 'playing' || !this.currentPiece) return;
    if (!this.checkCollision(this.currentPiece.r, this.currentPiece.c + 1, this.currentPiece.shape)) {
      this.currentPiece.c++;
      this.render();
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
    }
  },

  rotate() {
    if (this.data.gameState !== 'playing' || !this.currentPiece) return;
    const oldShape = this.currentPiece.shape;
    // Rotate 90 deg clockwise
    const newShape = oldShape[0].map((_, index) => oldShape.map(row => row[index]).reverse());

    if (!this.checkCollision(this.currentPiece.r, this.currentPiece.c, newShape)) {
      this.currentPiece.shape = newShape;
      this.render();
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
    } else if (!this.checkCollision(this.currentPiece.r, this.currentPiece.c - 1, newShape)) {
      // Wall kick left
      this.currentPiece.c--;
      this.currentPiece.shape = newShape;
      this.render();
    } else if (!this.checkCollision(this.currentPiece.r, this.currentPiece.c + 1, newShape)) {
      // Wall kick right
      this.currentPiece.c++;
      this.currentPiece.shape = newShape;
      this.render();
    }
  },

  moveDown() {
    if (this.data.gameState !== 'playing' || !this.currentPiece) return;
    if (!this.checkCollision(this.currentPiece.r + 1, this.currentPiece.c, this.currentPiece.shape)) {
      this.currentPiece.r++;
      this.render();
    } else {
      this.lockPiece();
    }
  },

  hardDrop() {
    if (this.data.gameState !== 'playing' || !this.currentPiece) return;
    while (!this.checkCollision(this.currentPiece.r + 1, this.currentPiece.c, this.currentPiece.shape)) {
      this.currentPiece.r++;
    }
    this.render();
    if (wx.vibrateShort) wx.vibrateShort({ type: 'medium' });
    this.lockPiece();
  },

  lockPiece() {
    let grid = this.data.grid;
    const { r, c, shape, color } = this.currentPiece;

    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const targetR = r + row;
          const targetC = c + col;
          if (targetR >= 0 && targetR < ROWS) {
            grid[targetR][targetC] = color;
          }
        }
      }
    }

    this.clearLines(grid);
  },

  clearLines(grid) {
    let linesCleared = 0;

    for (let r = ROWS - 1; r >= 0; r--) {
      const isComplete = grid[r].every(cell => cell !== null);
      if (isComplete) {
        linesCleared++;
        grid.splice(r, 1);
        grid.unshift(new Array(COLS).fill(null));
        r++; // Recheck same row index after shift
      }
    }

    let scoreGained = 0;
    if (linesCleared === 1) scoreGained = 100;
    else if (linesCleared === 2) scoreGained = 300;
    else if (linesCleared === 3) scoreGained = 500;
    else if (linesCleared === 4) scoreGained = 800; // Tetris bonus!

    const newScore = this.data.score + scoreGained;
    const totalLines = this.data.lines + linesCleared;
    const newLevel = Math.floor(totalLines / 5) + 1;

    let newBest = Math.max(newScore, this.data.bestScore);
    if (newBest > this.data.bestScore) {
      wx.setStorageSync('game_tetris_best', newBest);
    }

    this.setData({
      grid,
      score: newScore,
      lines: totalLines,
      level: newLevel,
      bestScore: newBest
    });

    if (linesCleared > 0) {
      if (wx.vibrateShort) wx.vibrateShort({ type: 'medium' });
      this.startDropTimer(); // Adjust speed if level increased
    }

    this.spawnPiece();
  },

  render() {
    let display = JSON.parse(JSON.stringify(this.data.grid));

    if (this.currentPiece) {
      const { r, c, shape, color } = this.currentPiece;
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const dr = r + row;
            const dc = c + col;
            if (dr >= 0 && dr < ROWS && dc >= 0 && dc < COLS) {
              display[dr][dc] = color;
            }
          }
        }
      }
    }

    this.setData({ displayGrid: display });
  },

  onShareAppMessage() {
    return {
      title: `我在【达拉然奥术方块】中消除消行斩获 ${this.data.score} 分！快来体验经典俄罗斯方块！`,
      path: '/pages/game-tetris/game-tetris'
    };
  },

  onShareTimeline() {
    return {
      title: '达拉然奥术方块 - 魔兽魔改经典俄罗斯方块！',
      path: '/pages/game-tetris/game-tetris'
    };
  }
});
