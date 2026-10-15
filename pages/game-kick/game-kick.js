const { KICK_SPELLS, getKickTitle } = require('../../data/games_data.js');

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',

    // 游戏流程状态: 'ready' | 'playing' | 'round_result' | 'game_over'
    gameState: 'ready',

    round: 1,
    maxRounds: 10,
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: 3,

    // 当前怪与技能
    currentSpell: null,
    progressPercent: 0, // 0 - 100
    isCasting: false,

    // 当前回合反馈
    roundFeedback: null, // { type: 'success'|'shield_error'|'miss'|'shield_success', text: '', reactionMs: 0, deltaScore: 0 }

    // 统计记录
    reactionTimes: [],
    misses: 0,
    resultSummary: null
  },

  timer: null,
  castStartTime: 0,
  hasInterruptedInRound: false,

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    this.setData({
      menuButtonTop: menuButtonInfo ? menuButtonInfo.top : 24,
      menuButtonHeight: menuButtonInfo ? menuButtonInfo.height : 32
    });
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });
  },

  onUnload() {
    this.clearAllTimers();
  },

  clearAllTimers() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.nextRoundTimeout) {
      clearTimeout(this.nextRoundTimeout);
      this.nextRoundTimeout = null;
    }
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  navigateBack() {
    this.clearAllTimers();
    wx.navigateBack({
      fail: () => {
        wx.redirectTo({ url: '/pages/game-hub/game-hub' });
      }
    });
  },

  startGame() {
    this.clearAllTimers();
    this.setData({
      gameState: 'playing',
      round: 1,
      score: 0,
      combo: 0,
      maxCombo: 0,
      lives: 3,
      reactionTimes: [],
      misses: 0,
      resultSummary: null
    });
    this.startRound();
  },

  startRound() {
    this.clearAllTimers();
    this.hasInterruptedInRound = false;

    // 随机挑选一个技能（确保普通技能和钢条技能均有概率，钢条约占 25%~30%）
    const isPickShield = Math.random() < 0.28;
    const pool = KICK_SPELLS.filter(s => s.isShielded === isPickShield);
    const chosen = pool[Math.floor(Math.random() * pool.length)] || KICK_SPELLS[0];

    this.setData({
      currentSpell: chosen,
      progressPercent: 0,
      isCasting: true,
      roundFeedback: null
    });

    // 读条开始
    this.castStartTime = Date.now();
    const duration = chosen.castTime;
    const intervalMs = 25;

    this.timer = setInterval(() => {
      const elapsed = Date.now() - this.castStartTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));

      this.setData({ progressPercent: pct });

      if (pct >= 100) {
        clearInterval(this.timer);
        this.timer = null;
        this.handleCastCompleted();
      }
    }, intervalMs);
  },

  // 玩家按下打断按键
  onInterruptTap() {
    if (this.data.gameState !== 'playing' || !this.data.isCasting || this.hasInterruptedInRound) {
      return;
    }
    this.hasInterruptedInRound = true;
    const reactionMs = Date.now() - this.castStartTime;

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    const spell = this.data.currentSpell;

    // 震动反馈
    if (wx.vibrateShort) {
      wx.vibrateShort({ type: 'medium' });
    }

    if (spell.isShielded) {
      // 致命失误：打在钢条上！
      const newLives = Math.max(0, this.data.lives - 1);
      const newScore = Math.max(0, this.data.score - 50);

      this.setData({
        isCasting: false,
        score: newScore,
        combo: 0,
        lives: newLives,
        misses: this.data.misses + 1,
        roundFeedback: {
          type: 'shield_error',
          title: '破盾失败！',
          badge: '⚠️ 钢条免疫',
          text: '该法术带有银色盾牌，免疫常规打断！',
          reactionMs,
          deltaScore: -50
        }
      });

      this.scheduleNextRound(newLives <= 0);
    } else {
      // 打断成功！
      let baseScore = 100;
      let tag = '打断成功';

      if (reactionMs < 380) {
        baseScore = 130;
        tag = '⚡ 极限神速秒断！';
      } else if (this.data.progressPercent >= 80) {
        baseScore = 120;
        tag = '🎯 完美压哨截断！';
      } else if (reactionMs < 600) {
        baseScore = 110;
        tag = '🔥 极速反应！';
      }

      const newCombo = this.data.combo + 1;
      const comboBonus = (newCombo - 1) * 15;
      const totalEarned = baseScore + comboBonus;
      const newScore = this.data.score + totalEarned;
      const newReactionTimes = [...this.data.reactionTimes, reactionMs];
      const newMaxCombo = Math.max(this.data.maxCombo, newCombo);

      this.setData({
        isCasting: false,
        score: newScore,
        combo: newCombo,
        maxCombo: newMaxCombo,
        reactionTimes: newReactionTimes,
        roundFeedback: {
          type: 'success',
          title: tag,
          badge: `+${totalEarned}分`,
          text: `打断耗时: ${reactionMs} ms ${newCombo > 1 ? '(连击 x' + newCombo + ')' : ''}`,
          reactionMs,
          deltaScore: totalEarned
        }
      });

      this.scheduleNextRound(false);
    }
  },

  // 读条到达 100%（玩家未按打断）
  handleCastCompleted() {
    const spell = this.data.currentSpell;

    if (spell.isShielded) {
      // 成功规避钢条（忍住没按是正确的策略！）
      const bonus = 80;
      const newScore = this.data.score + bonus;
      const newCombo = this.data.combo + 1;
      const newMaxCombo = Math.max(this.data.maxCombo, newCombo);

      this.setData({
        isCasting: false,
        score: newScore,
        combo: newCombo,
        maxCombo: newMaxCombo,
        roundFeedback: {
          type: 'shield_success',
          title: '🛡️ 成功避开钢条！',
          badge: `+${bonus}分`,
          text: '防住手痒误触！理智克制加分！',
          reactionMs: spell.castTime,
          deltaScore: bonus
        }
      });

      this.scheduleNextRound(false);
    } else {
      // 致命失误：漏断！怪读条完成了！
      if (wx.vibrateLong) {
        wx.vibrateLong();
      }
      const newLives = Math.max(0, this.data.lives - 1);
      const newScore = Math.max(0, this.data.score - 60);

      this.setData({
        isCasting: false,
        score: newScore,
        combo: 0,
        lives: newLives,
        misses: this.data.misses + 1,
        roundFeedback: {
          type: 'miss',
          title: '💥 严重漏断！',
          badge: '灭顶之灾 -60分',
          text: `${spell.caster} 读条完毕！灭团高伤降临！`,
          reactionMs: spell.castTime,
          deltaScore: -60
        }
      });

      this.scheduleNextRound(newLives <= 0);
    }
  },

  scheduleNextRound(forceGameOver) {
    this.nextRoundTimeout = setTimeout(() => {
      if (forceGameOver || this.data.round >= this.data.maxRounds) {
        this.finishGame();
      } else {
        this.setData({
          round: this.data.round + 1,
          roundFeedback: null
        });
        this.startRound();
      }
    }, 1300);
  },

  finishGame() {
    this.clearAllTimers();

    const times = this.data.reactionTimes;
    const avgMs = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 999;
    const rankInfo = getKickTitle(this.data.score, avgMs, this.data.misses);

    // 本地存储最高纪录
    const best = wx.getStorageSync('game_kick_best') || {};
    if (!best.score || this.data.score > best.score) {
      wx.setStorageSync('game_kick_best', {
        score: this.data.score,
        title: rankInfo.title,
        avgMs: avgMs,
        tier: rankInfo.tier
      });
    }

    this.setData({
      gameState: 'game_over',
      isCasting: false,
      resultSummary: {
        score: this.data.score,
        avgMs: avgMs,
        maxCombo: this.data.maxCombo,
        misses: this.data.misses,
        rankTitle: rankInfo.title,
        rankTier: rankInfo.tier,
        rankBadge: rankInfo.badge,
        isNewBest: !best.score || this.data.score > best.score
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '秒断特训营 - 挑战大秘境极限打断反应速度！',
      path: '/pages/game-kick/game-kick'
    };
  },

  onShareTimeline() {
    return {
      title: '秒断特训营 - 挑战大秘境极限打断反应速度！',
      path: '/pages/game-kick/game-kick'
    };
  }
});
