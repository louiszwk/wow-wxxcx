Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',

    // 'ready' | 'playing' | 'game_over'
    gameState: 'ready',

    score: 0,
    bestScore: 0,
    resultSummary: null
  },

  canvas: null,
  ctx: null,
  reqId: null,

  // 物理与尺寸配置 (基于虚拟 360x520 逻辑坐标)
  cw: 360,
  ch: 520,
  dpr: 1,

  bird: {
    x: 65,
    y: 230,
    vy: 0,
    gravity: 0.38,
    jump: -6.8,
    radius: 16,
    rotation: 0
  },

  pipes: [],
  pipeSpawnTimer: 0,
  pipeInterval: 105, // 帧数间隔
  pipeGap: 140, // 上下柱子通道高度
  pipeSpeed: 2.2,

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32
    });

    const savedBest = wx.getStorageSync('game_flappy_best') || 0;
    this.setData({ bestScore: savedBest });
  },

  onReady() {
    this.initCanvas();
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });
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
        wx.redirectTo({ url: '/pages/game-hub/game-hub' });
      }
    });
  },

  initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#flappyCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0] || !res[0].node) return;
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio || 1;

        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        this.canvas = canvas;
        this.ctx = ctx;
        this.dpr = dpr;
        this.cw = res[0].width;
        this.ch = res[0].height;

        this.drawScene();
      });
  },

  startGame() {
    this.stopLoop();

    this.bird = {
      x: 65,
      y: this.ch * 0.45,
      vy: 0,
      gravity: 0.38,
      jump: -6.8,
      radius: 16,
      rotation: 0
    };

    this.pipes = [];
    this.pipeSpawnTimer = 0;

    this.setData({
      gameState: 'playing',
      score: 0,
      resultSummary: null
    });

    this.startLoop();
  },

  startLoop() {
    const render = () => {
      this.updatePhysics();
      this.drawScene();

      if (this.data.gameState === 'playing') {
        if (this.canvas && this.canvas.requestAnimationFrame) {
          this.reqId = this.canvas.requestAnimationFrame(render);
        } else {
          this.reqId = setTimeout(render, 1000 / 60);
        }
      }
    };

    if (this.canvas && this.canvas.requestAnimationFrame) {
      this.reqId = this.canvas.requestAnimationFrame(render);
    } else {
      this.reqId = setTimeout(render, 1000 / 60);
    }
  },

  stopLoop() {
    if (this.canvas && this.canvas.cancelAnimationFrame && this.reqId) {
      this.canvas.cancelAnimationFrame(this.reqId);
    } else if (this.reqId) {
      clearTimeout(this.reqId);
    }
    this.reqId = null;
  },

  // 玩家触控起飞
  onCanvasTap() {
    if (this.data.gameState === 'ready') {
      this.startGame();
      return;
    }

    if (this.data.gameState !== 'playing') return;

    // 狮鹫拍打翅膀飞升
    this.bird.vy = this.bird.jump;
    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
  },

  updatePhysics() {
    const b = this.bird;

    // 重力下坠
    b.vy += b.gravity;
    b.y += b.vy;

    // 旋转倾角
    b.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (b.vy / 10)));

    // 碰撞天花板与地面
    if (b.y - b.radius <= 0) {
      b.y = b.radius;
      b.vy = 0;
    }

    const groundY = this.ch - 30;
    if (b.y + b.radius >= groundY) {
      this.handleGameOver();
      return;
    }

    // 管道生成与位移
    this.pipeSpawnTimer++;
    if (this.pipeSpawnTimer >= this.pipeInterval) {
      this.pipeSpawnTimer = 0;
      this.spawnPipe();
    }

    const pipeWidth = 52;
    for (let i = 0; i < this.pipes.length; i++) {
      const p = this.pipes[i];
      p.x -= this.pipeSpeed;

      // 得分判定 (通过管子中线)
      if (!p.passed && p.x + pipeWidth < b.x) {
        p.passed = true;
        const newScore = this.data.score + 1;
        this.setData({ score: newScore });
        if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      }

      // 碰撞检测 (AABB + 圆形碰撞)
      if (b.x + b.radius > p.x && b.x - b.radius < p.x + pipeWidth) {
        // 碰上管或下管
        if (b.y - b.radius < p.topHeight || b.y + b.radius > p.bottomY) {
          this.handleGameOver();
          return;
        }
      }
    }

    // 移除屏幕外管道
    this.pipes = this.pipes.filter(p => p.x + pipeWidth > -20);
  },

  spawnPipe() {
    const minHeight = 60;
    const maxHeight = this.ch - 30 - this.pipeGap - minHeight;
    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    const bottomY = topHeight + this.pipeGap;

    this.pipes.push({
      x: this.cw + 10,
      topHeight: topHeight,
      bottomY: bottomY,
      passed: false
    });
  },

  handleGameOver() {
    this.stopLoop();
    if (wx.vibrateLong) wx.vibrateLong();

    const score = this.data.score;
    const best = Math.max(this.data.bestScore, score);

    if (score > this.data.bestScore) {
      wx.setStorageSync('game_flappy_best', score);
    }

    let medal = '木质微章';
    let title = '飞行见习生';
    if (score >= 35) {
      medal = '🏆 泰坦星界勋章';
      title = '黑石深渊天空霸主';
    } else if (score >= 20) {
      medal = '🥇 黄金骑士勋章';
      title = '王牌狮鹫骑手';
    } else if (score >= 10) {
      medal = '🥈 白银突击勋章';
      title = '熟练驭龙者';
    } else if (score >= 4) {
      medal = '🥉 青铜探险勋章';
      title = '风暴学徒';
    }

    this.setData({
      gameState: 'game_over',
      bestScore: best,
      resultSummary: {
        score: score,
        best: best,
        medal: medal,
        title: title,
        isNewBest: score > this.data.bestScore
      }
    });

    this.drawScene();
  },

  drawScene() {
    const ctx = this.ctx;
    if (!ctx) return;

    const w = this.cw;
    const h = this.ch;

    // 1. 天空背景 (黑石山/暮色森林暗黑风格)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, '#0f172a');
    skyGrad.addColorStop(0.7, '#1e293b');
    skyGrad.addColorStop(1, '#334155');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // 远景群山剪影
    ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
    ctx.beginPath();
    ctx.moveTo(0, h - 80);
    ctx.lineTo(80, h - 140);
    ctx.lineTo(160, h - 90);
    ctx.lineTo(260, h - 160);
    ctx.lineTo(w, h - 100);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();

    // 2. 障碍黑石石柱 (Pipes)
    const pipeWidth = 52;
    for (let i = 0; i < this.pipes.length; i++) {
      const p = this.pipes[i];

      // 顶部石柱
      const topGrad = ctx.createLinearGradient(p.x, 0, p.x + pipeWidth, 0);
      topGrad.addColorStop(0, '#475569');
      topGrad.addColorStop(0.5, '#64748b');
      topGrad.addColorStop(1, '#334155');
      ctx.fillStyle = topGrad;
      ctx.fillRect(p.x, 0, pipeWidth, p.topHeight);

      // 顶部石柱突沿
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(p.x - 4, p.topHeight - 16, pipeWidth + 8, 16);

      // 底部石柱
      ctx.fillStyle = topGrad;
      ctx.fillRect(p.x, p.bottomY, pipeWidth, h - 30 - p.bottomY);

      // 底部石柱突沿
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(p.x - 4, p.bottomY, pipeWidth + 8, 16);

      // 符文光芒 (装饰)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.fillRect(p.x + 22, p.topHeight * 0.4, 8, 20);
      ctx.fillRect(p.x + 22, p.bottomY + 30, 8, 20);
    }

    // 3. 熔岩/要塞地面
    const groundGrad = ctx.createLinearGradient(0, h - 30, 0, h);
    groundGrad.addColorStop(0, '#f97316');
    groundGrad.addColorStop(0.3, '#7f1d1d');
    groundGrad.addColorStop(1, '#450a0a');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, h - 30, w, 30);

    // 4. 绘制主角狮鹫/巨龙 (Bird)
    const b = this.bird;
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rotation);

    // 狮鹫主体羽毛/身躯
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🦅', 0, 0);

    ctx.restore();

    // 5. 局内分数展示
    if (this.data.gameState === 'playing') {
      ctx.font = 'bold 36px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 8;
      ctx.fillText(`${this.data.score}`, w / 2, 80);
      ctx.shadowBlur = 0;
    }
  }
,
  onShareAppMessage() {
    return {
      title: '魔兽小游戏：驭龙高飞！测测你的指尖飞行身法',
      path: '/pages/game-flappy/game-flappy'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽小游戏：驭龙高飞！测测你的指尖飞行身法',
      path: '/pages/game-flappy/game-flappy'
    };
  }
});
