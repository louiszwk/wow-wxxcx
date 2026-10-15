const { QUIZ_QUESTIONS, getQuizTitle } = require('../../data/games_data.js');

Page({
  data: {
    menuButtonTop: 24,
    menuButtonHeight: 32,
    theme: 'dark',

    // 'ready' | 'playing' | 'game_over'
    gameState: 'ready',

    questionList: [],
    currentIndex: 0,
    currentQuestion: null,
    totalQuestions: 10,

    score: 0,
    combo: 0,
    maxCombo: 0,
    correctCount: 0,

    // 倒计时
    timeLeft: 15,
    timerPercent: 100,

    // 当前题目答题状态
    isAnswered: false,
    selectedOption: null,
    isCorrect: false,

    // 错题复盘记录
    wrongAnswers: [],

    resultSummary: null
  },

  timer: null,

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
    if (this.autoAdvanceTimeout) {
      clearTimeout(this.autoAdvanceTimeout);
      this.autoAdvanceTimeout = null;
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

  startQuiz() {
    this.clearAllTimers();
    // 从题库随机抽取 10 道题目打乱
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    this.setData({
      gameState: 'playing',
      questionList: selected,
      currentIndex: 0,
      currentQuestion: selected[0],
      totalQuestions: selected.length,
      score: 0,
      combo: 0,
      maxCombo: 0,
      correctCount: 0,
      wrongAnswers: [],
      resultSummary: null
    });

    this.loadQuestion(0);
  },

  loadQuestion(index) {
    this.clearAllTimers();
    const q = this.data.questionList[index];

    this.setData({
      currentIndex: index,
      currentQuestion: q,
      isAnswered: false,
      selectedOption: null,
      isCorrect: false,
      timeLeft: 15,
      timerPercent: 100
    });

    // 启动 15 秒倒计时
    this.timer = setInterval(() => {
      if (this.data.isAnswered) return;

      const newTime = this.data.timeLeft - 1;
      const pct = Math.max(0, Math.round((newTime / 15) * 100));

      this.setData({
        timeLeft: newTime,
        timerPercent: pct
      });

      if (newTime <= 0) {
        clearInterval(this.timer);
        this.timer = null;
        this.handleTimeout();
      }
    }, 1000);
  },

  // 超时未作答
  handleTimeout() {
    if (this.data.isAnswered) return;
    this.handleOptionSelect(-1); // -1 代表超时
  },

  // 玩家选择选项
  selectOption(e) {
    if (this.data.isAnswered) return;
    const optionIndex = parseInt(e.currentTarget.dataset.index, 10);
    this.handleOptionSelect(optionIndex);
  },

  handleOptionSelect(optionIndex) {
    this.clearAllTimers();
    const q = this.data.currentQuestion;
    const isCorrect = optionIndex === q.answer;

    if (isCorrect) {
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      const newCombo = this.data.combo + 1;
      const timeBonus = this.data.timeLeft * 5;
      const comboBonus = (newCombo - 1) * 20;
      const earned = 100 + timeBonus + comboBonus;

      this.setData({
        isAnswered: true,
        selectedOption: optionIndex,
        isCorrect: true,
        score: this.data.score + earned,
        combo: newCombo,
        maxCombo: Math.max(this.data.maxCombo, newCombo),
        correctCount: this.data.correctCount + 1
      });
    } else {
      if (wx.vibrateLong) wx.vibrateLong();
      const wrongs = [...this.data.wrongAnswers, {
        question: q.question,
        category: q.category,
        yourChoice: optionIndex >= 0 ? q.options[optionIndex] : '超时未答',
        correctChoice: q.options[q.answer],
        explain: q.explain
      }];

      this.setData({
        isAnswered: true,
        selectedOption: optionIndex,
        isCorrect: false,
        combo: 0,
        wrongAnswers: wrongs
      });
    }

    // 2.5 秒后自动进入下一题
    this.autoAdvanceTimeout = setTimeout(() => {
      this.nextQuestion();
    }, 2500);
  },

  nextQuestion() {
    this.clearAllTimers();
    const nextIdx = this.data.currentIndex + 1;
    if (nextIdx >= this.data.totalQuestions) {
      this.finishQuiz();
    } else {
      this.loadQuestion(nextIdx);
    }
  },

  finishQuiz() {
    this.clearAllTimers();
    const count = this.data.correctCount;
    const total = this.data.totalQuestions;
    const rankInfo = getQuizTitle(count, total);

    const best = wx.getStorageSync('game_quiz_best') || {};
    if (!best.score || this.data.score > best.score) {
      wx.setStorageSync('game_quiz_best', {
        score: this.data.score,
        title: rankInfo.title,
        correctCount: count,
        tier: rankInfo.tier
      });
    }

    this.setData({
      gameState: 'game_over',
      resultSummary: {
        score: this.data.score,
        correctCount: count,
        total: total,
        accuracyPct: Math.round((count / total) * 100),
        maxCombo: this.data.maxCombo,
        rankTitle: rankInfo.title,
        rankTier: rankInfo.tier,
        rankBadge: rankInfo.badge,
        isNewBest: !best.score || this.data.score > best.score
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '艾泽拉斯百晓生 - 魔兽机制与名梗知识竞答！',
      path: '/pages/game-quiz/game-quiz'
    };
  },

  onShareTimeline() {
    return {
      title: '艾泽拉斯百晓生 - 魔兽机制与名梗知识竞答！',
      path: '/pages/game-quiz/game-quiz'
    };
  }
});
