Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',

    // 'ready' | 'playing' | 'paused' | 'game_over'
    gameState: 'ready',

    gridSize: 16, // 16x16 矩阵
    gridCells: [], // 扁平化的 256 个格子

    snake: [], // [{ x, y }] 0 为头部
    food: { x: 5, y: 5, type: 'egg' }, // 'egg' | 'crystal'
    crystalTimer: 0,

    score: 0,
    dragonLength: 3,
    bestScore: 0,
    speed: 150, // ms per tick

    resultSummary: null
  },

  timer: null,
  dir: 'right',
  nextDir: 'right',
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

    const savedBest = wx.getStorageSync('game_snake_best') || 0;
    this.setData({ bestScore: savedBest });
    this.initBoard();
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });
  },

  onUnload() {
    this.stopGameLoop();
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateBack() {
    this.stopGameLoop();
    wx.navigateBack({
      fail: () => {
        wx.redirectTo({ url: '/pages/game-hub/game-hub' });
      }
    });
  },

  initBoard() {
    const initialSnake = [
      { x: 5, y: 8 },
      { x: 4, y: 8 },
      { x: 3, y: 8 }
    ];
    this.dir = 'right';
    this.nextDir = 'right';

    this.setData({
      snake: initialSnake,
      dragonLength: initialSnake.length,
      food: { x: 11, y: 8, type: 'egg' }
    });
    this.renderGrid(initialSnake, { x: 11, y: 8, type: 'egg' });
  },

  renderGrid(snake, food) {
    const size = this.data.gridSize;
    const cells = [];

    // 哈希索引
    const snakeMap = {};
    snake.forEach((segment, idx) => {
      snakeMap[`${segment.x}_${segment.y}`] = idx === 0 ? 'head' : 'body';
    });

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const key = `${c}_${r}`;
        let type = 'empty';

        if (snakeMap[key]) {
          type = snakeMap[key];
        } else if (food && food.x === c && food.y === r) {
          type = food.type; // 'egg' | 'crystal'
        }

        cells.push({
          x: c,
          y: r,
          type: type
        });
      }
    }

    this.setData({ gridCells: cells });
  },

  startGame() {
    this.stopGameLoop();
    this.initBoard();

    this.setData({
      gameState: 'playing',
      score: 0,
      speed: 150,
      resultSummary: null
    });

    this.startGameLoop();
  },

  startGameLoop() {
    this.timer = setInterval(() => {
      this.gameTick();
    }, this.data.speed);
  },

  stopGameLoop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  gameTick() {
    if (this.data.gameState !== 'playing') return;

    this.dir = this.nextDir;
    const snake = [...this.data.snake];
    const head = { ...snake[0] };

    if (this.dir === 'up') head.y -= 1;
    else if (this.dir === 'down') head.y += 1;
    else if (this.dir === 'left') head.x -= 1;
    else if (this.dir === 'right') head.x += 1;

    const size = this.data.gridSize;

    // 撞墙判定
    if (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size) {
      this.handleGameOver();
      return;
    }

    // 撞自身判定
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        this.handleGameOver();
        return;
      }
    }

    // 前进
    snake.unshift(head);

    let food = this.data.food;
    let earned = 0;
    let ate = false;

    // 吃到食物
    if (head.x === food.x && head.y === food.y) {
      ate = true;
      if (food.type === 'crystal') {
        earned = 30;
      } else {
        earned = 10;
      }

      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

      // 生成新食物
      food = this.generateFood(snake);
    } else {
      // 没吃食物则尾部缩减 1 节
      snake.pop();
    }

    const newScore = this.data.score + earned;
    const newBest = Math.max(this.data.bestScore, newScore);

    // 随着长度增加，速度稍微加快
    let newSpeed = Math.max(85, 150 - Math.floor(snake.length / 3) * 5);

    this.setData({
      snake: snake,
      dragonLength: snake.length,
      food: food,
      score: newScore,
      bestScore: newBest
    });

    this.renderGrid(snake, food);

    if (newSpeed !== this.data.speed) {
      this.setData({ speed: newSpeed });
      this.stopGameLoop();
      this.startGameLoop();
    }
  },

  generateFood(snake) {
    const size = this.data.gridSize;
    const occupied = {};
    snake.forEach(s => { occupied[`${s.x}_${s.y}`] = true; });

    const empties = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!occupied[`${c}_${r}`]) {
          empties.push({ x: c, y: r });
        }
      }
    }

    if (empties.length === 0) return { x: 0, y: 0, type: 'egg' };

    const chosen = empties[Math.floor(Math.random() * empties.length)];
    const isCrystal = Math.random() < 0.25; // 25% 出现奥术水晶

    return {
      x: chosen.x,
      y: chosen.y,
      type: isCrystal ? 'crystal' : 'egg'
    };
  },

  changeDir(targetDir) {
    if (this.data.gameState !== 'playing') return;

    // 防止反向直接掉头撞死
    const opposites = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    };

    if (opposites[targetDir] === this.dir) return;

    this.nextDir = targetDir;
  },

  onKeyDir(e) {
    const dir = e.currentTarget.dataset.dir;
    this.changeDir(dir);
  },

  // 滑动手势控制
  onTouchStart(e) {
    if (e.touches && e.touches.length > 0) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  },

  onTouchEnd(e) {
    if (!e.changedTouches || e.changedTouches.length === 0) return;

    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const dy = e.changedTouches[0].clientY - this.touchStartY;
    const minDist = 24;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > minDist) {
        this.changeDir(dx > 0 ? 'right' : 'left');
      }
    } else {
      if (Math.abs(dy) > minDist) {
        this.changeDir(dy > 0 ? 'down' : 'up');
      }
    }
  },

  handleGameOver() {
    this.stopGameLoop();
    if (wx.vibrateLong) wx.vibrateLong();

    const score = this.data.score;
    const length = this.data.dragonLength;

    if (score > this.data.bestScore) {
      wx.setStorageSync('game_snake_best', score);
    }

    let title = '雏龙初展翅';
    let badge = '🐲';
    if (score >= 300) {
      title = '守护巨龙·阿莱克斯塔萨';
      badge = '👑';
    } else if (score >= 180) {
      title = '炽热黑曜始祖龙';
      badge = '🔥';
    } else if (score >= 80) {
      title = '巡空风暴巨龙';
      badge = '⚡';
    }

    this.setData({
      gameState: 'game_over',
      resultSummary: {
        score: score,
        length: length,
        title: title,
        badge: badge,
        isNewBest: score > this.data.bestScore
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '贪吃幼龙 - 吞食奥术水晶无限成长！',
      path: '/pages/game-snake/game-snake'
    };
  },

  onShareTimeline() {
    return {
      title: '贪吃幼龙 - 吞食奥术水晶无限成长！',
      path: '/pages/game-snake/game-snake'
    };
  }
});
