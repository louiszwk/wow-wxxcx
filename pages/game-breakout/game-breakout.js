Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',
    score: 0,
    bestScore: 0,
    lives: 3,
    level: 1,
    gameState: 'ready', // 'ready' | 'playing' | 'paused' | 'over' | 'won'
    canvasWidth: 320,
    canvasHeight: 400
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    const best = wx.getStorageSync('game_breakout_best') || 0;

    const sys = wx.getSystemInfoSync();
    const cWidth = Math.min(sys.windowWidth - 32, 360);
    const cHeight = Math.min(sys.windowHeight - 240, 420);

    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32,
      theme: savedTheme,
      bestScore: best,
      canvasWidth: cWidth,
      canvasHeight: cHeight
    });
  },

  onReady() {
    this.initGameEngine();
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  onUnload() {
    this.stopLoop();
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateBack() {
    this.stopLoop();
    wx.navigateBack({
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  },

  initGameEngine() {
    const query = wx.createSelectorQuery();
    query.select('#breakoutCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) return;

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio || 2;

        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        this.canvas = canvas;
        this.ctx = ctx;
        this.width = res[0].width;
        this.height = res[0].height;

        this.resetGame();
        this.renderFrame();
      });
  },

  resetGame() {
    this.paddle = {
      x: this.width / 2 - 40,
      y: this.height - 24,
      width: 80,
      height: 12,
      targetWidth: 80
    };

    this.balls = [{
      x: this.width / 2,
      y: this.height - 40,
      vx: (Math.random() > 0.5 ? 1 : -1) * (2.5 + Math.random()),
      vy: -3.5,
      radius: 6
    }];

    this.createBricks();

    this.setData({
      score: 0,
      lives: 3,
      level: 1,
      gameState: 'ready'
    });
  },

  createBricks() {
    this.bricks = [];
    const rows = 5;
    const cols = 6;
    const padding = 6;
    const offsetTop = 20;
    const offsetLeft = 10;
    const brickWidth = (this.width - offsetLeft * 2 - (cols - 1) * padding) / cols;
    const brickHeight = 16;

    const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#10b981'];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Special explosive or multi-hit brick
        const isExplosive = Math.random() < 0.1;
        const hp = (!isExplosive && r < 2) ? 2 : 1;

        this.bricks.push({
          x: offsetLeft + c * (brickWidth + padding),
          y: offsetTop + r * (brickHeight + padding),
          w: brickWidth,
          h: brickHeight,
          hp: hp,
          maxHp: hp,
          color: isExplosive ? '#ef4444' : colors[r % colors.length],
          isExplosive: isExplosive
        });
      }
    }
  },

  startGame() {
    if (this.data.gameState === 'playing') return;
    this.setData({ gameState: 'playing' });
    this.startLoop();
  },

  startLoop() {
    this.stopLoop();
    const step = () => {
      if (this.data.gameState === 'playing') {
        this.updatePhysics();
        this.renderFrame();
        if (this.canvas && this.canvas.requestAnimationFrame) {
          this.animId = this.canvas.requestAnimationFrame(step);
        } else {
          this.timer = setTimeout(step, 1000 / 60);
        }
      }
    };
    step();
  },

  stopLoop() {
    if (this.canvas && this.canvas.cancelAnimationFrame && this.animId) {
      this.canvas.cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },

  updatePhysics() {
    let score = this.data.score;
    let lives = this.data.lives;

    for (let i = this.balls.length - 1; i >= 0; i--) {
      const b = this.balls[i];
      b.x += b.vx;
      b.y += b.vy;

      // Wall collision
      if (b.x - b.radius <= 0) {
        b.x = b.radius;
        b.vx = -b.vx;
      } else if (b.x + b.radius >= this.width) {
        b.x = this.width - b.radius;
        b.vx = -b.vx;
      }

      if (b.y - b.radius <= 0) {
        b.y = b.radius;
        b.vy = -b.vy;
      }

      // Paddle collision
      const p = this.paddle;
      if (
        b.y + b.radius >= p.y &&
        b.y - b.radius <= p.y + p.height &&
        b.x >= p.x &&
        b.x <= p.x + p.width
      ) {
        b.vy = -Math.abs(b.vy);
        // Angle based on hit point on paddle
        const hitOffset = (b.x - (p.x + p.width / 2)) / (p.width / 2);
        b.vx = hitOffset * 4.5;
        if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      }

      // Brick collisions
      for (let j = this.bricks.length - 1; j >= 0; j--) {
        const br = this.bricks[j];
        if (br.hp <= 0) continue;

        if (
          b.x + b.radius >= br.x &&
          b.x - b.radius <= br.x + br.w &&
          b.y + b.radius >= br.y &&
          b.y - b.radius <= br.y + br.h
        ) {
          br.hp--;
          b.vy = -b.vy;
          score += 10;

          if (br.isExplosive && br.hp <= 0) {
            // Explode adjacent bricks
            this.explodeAround(br.x, br.y);
            score += 30;
          }

          if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
          break;
        }
      }

      // Bottom fall
      if (b.y - b.radius > this.height) {
        this.balls.splice(i, 1);
      }
    }

    // Check all balls lost
    if (this.balls.length === 0) {
      lives--;
      if (lives <= 0) {
        this.stopLoop();
        this.setData({ lives: 0, score, gameState: 'over' });
        this.updateBestScore(score);
        return;
      } else {
        // Respawn single ball
        this.balls = [{
          x: this.paddle.x + this.paddle.width / 2,
          y: this.height - 40,
          vx: (Math.random() > 0.5 ? 1 : -1) * 3,
          vy: -3.5,
          radius: 6
        }];
        this.setData({ lives });
      }
    }

    // Check all bricks cleared
    const remainingBricks = this.bricks.filter(br => br.hp > 0).length;
    if (remainingBricks === 0) {
      score += 100;
      this.setData({ score, level: this.data.level + 1 });
      this.createBricks();
      // Speed up balls slightly
      this.balls.forEach(b => {
        b.vy *= 1.1;
      });
    }

    this.setData({ score });
    this.updateBestScore(score);
  },

  explodeAround(x, y) {
    this.bricks.forEach(br => {
      if (br.hp > 0 && Math.abs(br.x - x) < 50 && Math.abs(br.y - y) < 40) {
        br.hp = 0;
      }
    });
  },

  updateBestScore(score) {
    let newBest = Math.max(score, this.data.bestScore);
    if (newBest > this.data.bestScore) {
      this.setData({ bestScore: newBest });
      wx.setStorageSync('game_breakout_best', newBest);
    }
  },

  onTouchMove(e) {
    if (!this.paddle || !e.touches[0]) return;
    const touchX = e.touches[0].x;
    let newX = touchX - this.paddle.width / 2;
    newX = Math.max(0, Math.min(newX, this.width - this.paddle.width));
    this.paddle.x = newX;

    if (this.data.gameState === 'ready') {
      this.balls[0].x = this.paddle.x + this.paddle.width / 2;
      this.renderFrame();
    }
  },

  renderFrame() {
    const ctx = this.ctx;
    if (!ctx) return;

    // Clear background
    ctx.clearRect(0, 0, this.width, this.height);

    // Draw Bricks
    if (this.bricks) {
      this.bricks.forEach(br => {
        if (br.hp <= 0) return;
        ctx.fillStyle = br.hp < br.maxHp ? '#94a3b8' : br.color;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(br.x, br.y, br.w, br.h, 4) : ctx.rect(br.x, br.y, br.w, br.h);
        ctx.fill();

        if (br.isExplosive) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px sans-serif';
          ctx.fillText('💣', br.x + br.w / 2 - 5, br.y + br.h - 3);
        }
      });
    }

    // Draw Paddle (Paladin Aegis)
    if (this.paddle) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height, 6) : ctx.rect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
      ctx.fill();

      // Golden inner border
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Draw Balls (Holy Hammers)
    if (this.balls) {
      this.balls.forEach(b => {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }
  },

  onShareAppMessage() {
    return {
      title: `我在【圣光之锤打砖块】中轰碎魔石，斩获 ${this.data.score} 分！快来击碎天灾军团！`,
      path: '/pages/game-breakout/game-breakout'
    };
  },

  onShareTimeline() {
    return {
      title: '圣光之锤打砖块 - 魔兽圣骑士主题经典弹球打砖块！',
      path: '/pages/game-breakout/game-breakout'
    };
  }
});
