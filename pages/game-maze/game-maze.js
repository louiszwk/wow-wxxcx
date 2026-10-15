const GRID_SIZE = 11; // Must be odd number

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',
    maze: [],
    playerPos: { r: 1, c: 1 },
    exitPos: { r: 9, c: 9 },
    playerAvatar: '🐻', // Druid bear form
    steps: 0,
    treasuresCollected: 0,
    totalTreasures: 4,
    timer: 0,
    bestTime: 999,
    gameWon: false
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    const best = wx.getStorageSync('game_maze_best') || 999;

    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32,
      theme: savedTheme,
      bestTime: best
    });

    this.startNewMaze();
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
    this.stopTimer();
    wx.navigateBack({
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  },

  startTimer() {
    this.stopTimer();
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

  startNewMaze() {
    this.stopTimer();

    // 1. Generate empty walls
    let maze = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      maze[r] = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        maze[r][c] = {
          type: 'wall', // 'wall' | 'path' | 'treasure' | 'exit'
          item: null
        };
      }
    }

    // 2. DFS Backtracking Maze Generator
    const startR = 1;
    const startC = 1;
    maze[startR][startC].type = 'path';

    const stack = [{ r: startR, c: startC }];
    const dirs = [
      [-2, 0], [2, 0], [0, -2], [0, 2]
    ];

    while (stack.length > 0) {
      const cur = stack[stack.length - 1];
      // Find unvisited neighbors at step 2
      const neighbors = [];
      for (let [dr, dc] of dirs) {
        const nr = cur.r + dr;
        const nc = cur.c + dc;
        if (nr > 0 && nr < GRID_SIZE - 1 && nc > 0 && nc < GRID_SIZE - 1) {
          if (maze[nr][nc].type === 'wall') {
            neighbors.push({ r: nr, c: nc, wallR: cur.r + dr / 2, wallC: cur.c + dc / 2 });
          }
        }
      }

      if (neighbors.length > 0) {
        // Pick random neighbor
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        maze[next.wallR][next.wallC].type = 'path';
        maze[next.r][next.c].type = 'path';
        stack.push({ r: next.r, c: next.c });
      } else {
        stack.pop();
      }
    }

    // Set Exit at bottom-right path cell
    const exitR = GRID_SIZE - 2;
    const exitC = GRID_SIZE - 2;
    maze[exitR][exitC].type = 'exit';
    maze[exitR][exitC].item = '🌀';

    // Place 4 treasures on random path cells (excluding start and exit)
    const treasureTypes = ['💎', '🍄', '🥚', '🔮'];
    let placed = 0;
    while (placed < 4) {
      const randR = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      const randC = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      if (maze[randR][randC].type === 'path' && !(randR === startR && randC === startC) && !(randR === exitR && randC === exitC)) {
        maze[randR][randC].type = 'treasure';
        maze[randR][randC].item = treasureTypes[placed % treasureTypes.length];
        placed++;
      }
    }

    this.setData({
      maze,
      playerPos: { r: startR, c: startC },
      exitPos: { r: exitR, c: exitC },
      steps: 0,
      treasuresCollected: 0,
      timer: 0,
      gameWon: false
    });

    this.startTimer();
  },

  move(dr, dc) {
    if (this.data.gameWon) return;

    const { playerPos, maze } = this.data;
    const newR = playerPos.r + dr;
    const newC = playerPos.c + dc;

    if (newR < 0 || newR >= GRID_SIZE || newC < 0 || newC >= GRID_SIZE) return;
    if (maze[newR][newC].type === 'wall') {
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      return;
    }

    // Valid move!
    let updatedMaze = this.data.maze;
    let treasures = this.data.treasuresCollected;

    // Collect treasure
    if (updatedMaze[newR][newC].type === 'treasure') {
      updatedMaze[newR][newC].type = 'path';
      updatedMaze[newR][newC].item = null;
      treasures++;
      if (wx.vibrateShort) wx.vibrateShort({ type: 'medium' });
      wx.showToast({ title: '拾取洞穴宝藏！', icon: 'none' });
    }

    // Check exit
    if (newR === this.data.exitPos.r && newC === this.data.exitPos.c) {
      this.handleVictory();
    }

    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

    this.setData({
      playerPos: { r: newR, c: newC },
      maze: updatedMaze,
      steps: this.data.steps + 1,
      treasuresCollected: treasures
    });
  },

  handleVictory() {
    this.stopTimer();
    const finalTime = this.data.timer;
    let newBest = Math.min(finalTime, this.data.bestTime);

    if (newBest < this.data.bestTime) {
      wx.setStorageSync('game_maze_best', newBest);
    }

    if (wx.vibrateShort) wx.vibrateShort({ type: 'heavy' });

    this.setData({
      gameWon: true,
      bestTime: newBest
    });
  },

  moveUp() { this.move(-1, 0); },
  moveDown() { this.move(1, 0); },
  moveLeft() { this.move(0, -1); },
  moveRight() { this.move(0, 1); },

  onShareAppMessage() {
    return {
      title: `我在【哀嚎洞穴迷宫寻宝】耗时 ${this.data.timer} 秒成功脱困！快来穿越复杂地下城！`,
      path: '/pages/game-maze/game-maze'
    };
  },

  onShareTimeline() {
    return {
      title: '哀嚎洞穴迷宫寻宝 - 德鲁伊穿越复杂地下城与寻宝！',
      path: '/pages/game-maze/game-maze'
    };
  }
});
