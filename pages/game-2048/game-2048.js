const TIER_MAP = {
  2: { name: '破损布甲', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.18)', border: '#64748b' },
  4: { name: '粗糙皮甲', color: '#f8fafc', bg: 'rgba(255, 255, 255, 0.15)', border: '#cbd5e1' },
  8: { name: '精良锁甲', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)', border: '#22c55e' },
  16: { name: '稀有板甲', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.22)', border: '#38bdf8' },
  32: { name: '史诗紫装', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.25)', border: '#a855f7' },
  64: { name: '传说橙装', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.28)', border: '#ea580c' },
  128: { name: '神器圣物', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.3)', border: '#e11d48' },
  256: { name: '泰坦铸造', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.35)', border: '#d97706' },
  512: { name: '古神低语', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.4)', border: '#7e22ce' },
  1024: { name: '巨龙之魂', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.45)', border: '#0891b2' },
  2048: { name: '泰坦神装', color: '#eab308', bg: 'linear-gradient(135deg, #eab308, #ec4899)', border: '#f59e0b' }
};

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',

    grid: [],
    score: 0,
    bestScore: 0,
    isGameOver: false,
    hasWon: false,
    canUndo: false
  },

  previousState: null,
  touchStartX: 0,
  touchStartY: 0,

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32
    });

    const savedBest = wx.getStorageSync('game_2048_best') || 0;
    this.setData({ bestScore: savedBest });

    this.startNewGame();
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateBack() {
    wx.navigateBack({
      fail: () => {
        wx.redirectTo({ url: '/pages/game-hub/game-hub' });
      }
    });
  },

  startNewGame() {
    // 4x4 网格初始化
    const grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];

    this.addRandomTile(grid);
    this.addRandomTile(grid);

    this.previousState = null;

    this.setData({
      grid: this.formatGrid(grid),
      score: 0,
      isGameOver: false,
      hasWon: false,
      canUndo: false
    });
  },

  formatGrid(matrix) {
    const displayGrid = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = matrix[r][c];
        const info = val > 0 ? (TIER_MAP[val] || { name: `${val}`, color: '#ffffff', bg: '#475569', border: '#64748b' }) : null;
        displayGrid.push({
          row: r,
          col: c,
          value: val,
          name: info ? info.name : '',
          color: info ? info.color : '',
          bg: info ? info.bg : '',
          border: info ? info.border : ''
        });
      }
    }
    return displayGrid;
  },

  getRawMatrix() {
    const matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.data.grid.forEach(cell => {
      matrix[cell.row][cell.col] = cell.value;
    });
    return matrix;
  },

  addRandomTile(matrix) {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (matrix[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }
    if (emptyCells.length === 0) return false;

    const chosen = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    matrix[chosen.r][chosen.c] = Math.random() < 0.9 ? 2 : 4;
    return true;
  },

  // 滑动手势处理
  onTouchStart(e) {
    if (this.data.isGameOver) return;
    if (e.touches && e.touches.length > 0) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  },

  onTouchEnd(e) {
    if (this.data.isGameOver) return;
    if (!e.changedTouches || e.changedTouches.length === 0) return;

    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const dy = e.changedTouches[0].clientY - this.touchStartY;

    const minDistance = 28;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > minDistance) {
        if (dx > 0) this.move('right');
        else this.move('left');
      }
    } else {
      if (Math.abs(dy) > minDistance) {
        if (dy > 0) this.move('down');
        else this.move('up');
      }
    }
  },

  // 按钮控制方向
  moveDir(e) {
    const dir = e.currentTarget.dataset.dir;
    this.move(dir);
  },

  move(direction) {
    if (this.data.isGameOver) return;

    const matrix = this.getRawMatrix();
    // 深度保存撤回状态
    const backupMatrix = matrix.map(row => [...row]);
    const currentScore = this.data.score;

    let moved = false;
    let earnedScore = 0;

    const slideRow = (row) => {
      let arr = row.filter(val => val !== 0);
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i] *= 2;
          earnedScore += arr[i];
          arr[i + 1] = 0;
          i++;
        }
      }
      arr = arr.filter(val => val !== 0);
      while (arr.length < 4) {
        arr.push(0);
      }
      return arr;
    };

    if (direction === 'left') {
      for (let r = 0; r < 4; r++) {
        const newRow = slideRow(matrix[r]);
        if (newRow.some((val, idx) => val !== matrix[r][idx])) moved = true;
        matrix[r] = newRow;
      }
    } else if (direction === 'right') {
      for (let r = 0; r < 4; r++) {
        const reversed = [...matrix[r]].reverse();
        const newRow = slideRow(reversed).reverse();
        if (newRow.some((val, idx) => val !== matrix[r][idx])) moved = true;
        matrix[r] = newRow;
      }
    } else if (direction === 'up') {
      for (let c = 0; c < 4; c++) {
        let col = [matrix[0][c], matrix[1][c], matrix[2][c], matrix[3][c]];
        const newCol = slideRow(col);
        for (let r = 0; r < 4; r++) {
          if (matrix[r][c] !== newCol[r]) moved = true;
          matrix[r][c] = newCol[r];
        }
      }
    } else if (direction === 'down') {
      for (let c = 0; c < 4; c++) {
        let col = [matrix[3][c], matrix[2][c], matrix[1][c], matrix[0][c]];
        const newCol = slideRow(col).reverse();
        for (let r = 0; r < 4; r++) {
          if (matrix[r][c] !== newCol[r]) moved = true;
          matrix[r][c] = newCol[r];
        }
      }
    }

    if (!moved) return;

    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

    this.previousState = {
      matrix: backupMatrix,
      score: currentScore
    };

    this.addRandomTile(matrix);

    const newScore = this.data.score + earnedScore;
    const newBest = Math.max(this.data.bestScore, newScore);

    if (newBest > this.data.bestScore) {
      wx.setStorageSync('game_2048_best', newBest);
    }

    // 检查是否有 2048 胜利或死局
    let hasWon = false;
    let hasMovesLeft = false;

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (matrix[r][c] >= 2048) hasWon = true;
        if (matrix[r][c] === 0) hasMovesLeft = true;
        if (c < 3 && matrix[r][c] === matrix[r][c + 1]) hasMovesLeft = true;
        if (r < 3 && matrix[r][c] === matrix[r + 1][c]) hasMovesLeft = true;
      }
    }

    this.setData({
      grid: this.formatGrid(matrix),
      score: newScore,
      bestScore: newBest,
      canUndo: true,
      hasWon: hasWon,
      isGameOver: !hasMovesLeft
    });
  },

  undoMove() {
    if (!this.previousState || !this.data.canUndo) return;

    this.setData({
      grid: this.formatGrid(this.previousState.matrix),
      score: this.previousState.score,
      canUndo: false,
      isGameOver: false
    });
    this.previousState = null;
  },

  onShareAppMessage() {
    return {
      title: '泰坦神装 2048 - 快来合成魔兽传说神兵！',
      path: '/pages/game-2048/game-2048'
    };
  },

  onShareTimeline() {
    return {
      title: '泰坦神装 2048 - 快来合成魔兽传说神兵！',
      path: '/pages/game-2048/game-2048'
    };
  }
});
