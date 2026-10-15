Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',
    state: 'idle', // 'idle' | 'waiting' | 'ready' | 'result' | 'early'
    currentTime: 0,
    bestTime: 999,
    trials: [],
    averageTime: 0,
    evaluation: {
      title: '暂未评级',
      desc: '完成一次测试即可获取魔兽专精评价'
    }
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    const best = wx.getStorageSync('game_reaction_best') || 999;

    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32,
      theme: savedTheme,
      bestTime: best
    });
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  onUnload() {
    this.clearWaitTimer();
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

  clearWaitTimer() {
    if (this.waitTimer) {
      clearTimeout(this.waitTimer);
      this.waitTimer = null;
    }
  },

  onScreenTap() {
    const { state } = this.data;

    if (state === 'idle' || state === 'result' || state === 'early') {
      // Start waiting
      this.startWaiting();
    } else if (state === 'waiting') {
      // Early tap / False start
      this.clearWaitTimer();
      if (wx.vibrateShort) wx.vibrateShort({ type: 'heavy' });
      this.setData({
        state: 'early',
        evaluation: {
          title: '💀 严重抢跑！提前开怪！',
          desc: '团长咆哮：嗜血还没喊呢谁先动手的？倒地吃修理费！'
        }
      });
    } else if (state === 'ready') {
      // Success hit!
      const elapsed = Date.now() - this.startTime;
      if (wx.vibrateShort) wx.vibrateShort({ type: 'medium' });
      this.handleSuccess(elapsed);
    }
  },

  startWaiting() {
    this.clearWaitTimer();
    this.setData({
      state: 'waiting'
    });

    // Random wait between 1500ms and 4500ms
    const randomDelay = Math.floor(Math.random() * 3000) + 1500;
    this.waitTimer = setTimeout(() => {
      this.startTime = Date.now();
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      this.setData({ state: 'ready' });
    }, randomDelay);
  },

  handleSuccess(time) {
    let trials = [...this.data.trials, time];
    if (trials.length > 5) trials.shift();

    const sum = trials.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / trials.length);

    let newBest = Math.min(time, this.data.bestTime);
    if (newBest < this.data.bestTime) {
      wx.setStorageSync('game_reaction_best', newBest);
    }

    const evalObj = this.getEvaluation(time);

    this.setData({
      state: 'result',
      currentTime: time,
      bestTime: newBest,
      trials,
      averageTime: avg,
      evaluation: evalObj
    });
  },

  getEvaluation(ms) {
    if (ms < 180) {
      return {
        title: '👑 极限狂暴战 (极神反应)',
        desc: '神经反射登峰造极！大秘境0.1秒秒断神手，断骨挫锐无所不能！'
      };
    } else if (ms < 230) {
      return {
        title: '⚡ 敏锐潜行者 (顶尖高玩)',
        desc: '出刀如闪电！大秘境20+极限控场主力，反应速度碾压95%玩家！'
      };
    } else if (ms < 290) {
      return {
        title: '🛡️ 防护圣骑士 (稳健主力)',
        desc: '坚若磐石的反应！减伤覆盖精准，开荒团队最安心的定海神针！'
      };
    } else if (ms < 380) {
      return {
        title: '🧙‍♂️ 奥术法师 (略慢半拍)',
        desc: '技能后摇略长，可能正在沉迷读条搓大火球，下次记得快点按！'
      };
    } else {
      return {
        title: '💤 躺尸老板 (划水吃席)',
        desc: '喝茶慢动作！团灭了才发现嗜血开过了，速速醒醒起来输出！'
      };
    }
  },

  resetStats() {
    this.setData({
      trials: [],
      averageTime: 0
    });
    wx.showToast({ title: '轮次已重置', icon: 'none' });
  },

  onShareAppMessage() {
    const text = this.data.currentTime > 0
      ? `我在【嗜血拔刀测试】中斩获 ${this.data.currentTime}ms 神经反应！获评【${this.data.evaluation.title}】！快来挑战！`
      : '萨满开嗜血啦！快来【嗜血拔刀反应测试】测测你的毫秒级神经反射！';
    return {
      title: text,
      path: '/pages/game-reaction/game-reaction'
    };
  },

  onShareTimeline() {
    return {
      title: '嗜血拔刀反应测试 - 魔兽玩家极限手速与专精评级！',
      path: '/pages/game-reaction/game-reaction'
    };
  }
});
