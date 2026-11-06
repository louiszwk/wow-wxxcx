const { TALENT_DATA_60 } = require('../../data/infinite_data.js');

const TOTAL_TALENT_POINTS = 51; // 60级经典怀旧服满级天赋点数 (10级至60级)

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    classList: [
      { id: 'warrior', name: '战士', icon: '⚔️' },
      { id: 'mage', name: '法师', icon: '🧙‍♂️' },
      { id: 'rogue', name: '潜行者', icon: '🗡️' },
      { id: 'priest', name: '牧师', icon: '✨' },
      { id: 'paladin', name: '圣骑士', icon: '🛡️' },
      { id: 'hunter', name: '猎人', icon: '🏹' },
      { id: 'warlock', name: '术士', icon: '💀' },
      { id: 'shaman', name: '萨满', icon: '⚡' },
      { id: 'druid', name: '德鲁伊', icon: '🌱' }
    ],
    selectedClass: 'warrior',
    activeTreeIndex: 0,
    trees: [],
    treePoints: [0, 0, 0],
    pointsRemaining: TOTAL_TALENT_POINTS,
    pointsSpent: 0,
    currentMatrix: [],
    presets: [],
    // Tooltip / 悬浮详情弹窗
    selectedSkill: null,
    showTooltip: false
  },

  onLoad() {
    if (wx.showShareMenu) {
      wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    }

    const app = getApp();
    if (app.globalData) {
      this.setData({
        navBarHeight: app.globalData.navBarHeight,
        menuButtonTop: app.globalData.menuButtonTop,
        menuButtonHeight: app.globalData.menuButtonHeight
      });
    }

    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    this.setData({ theme: savedTheme });

    this.initClassTalents('warrior');
  },

  onShow() {
    const savedTheme = wx.getStorageSync('app_theme') || 'dark';
    if (this.data.theme !== savedTheme) {
      this.setData({ theme: savedTheme });
    }
  },

  navigateBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  },

  toggleTheme() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('app_theme', newTheme);
  },

  selectClass(e) {
    const classId = e.currentTarget.dataset.id;
    if (classId === this.data.selectedClass) return;
    this.initClassTalents(classId);
  },

  initClassTalents(classId) {
    const classData = TALENT_DATA_60[classId];
    if (!classData) return;

    // 初始化技能 rank = 0
    const trees = JSON.parse(JSON.stringify(classData.trees)).map(tree => ({
      ...tree,
      skills: tree.skills.map(s => ({
        ...s,
        rank: 0
      }))
    }));

    const presets = classData.presets || [];

    this.setData({
      selectedClass: classId,
      trees,
      presets,
      activeTreeIndex: 0,
      selectedSkill: null,
      showTooltip: false
    }, () => {
      // 默认加载第一个权威配装
      if (presets.length > 0) {
        this.applyPreset(presets[0]);
      } else {
        this.recalculateMatrix();
      }
    });
  },

  switchTree(e) {
    const index = parseInt(e.currentTarget.dataset.index, 10);
    this.setData({
      activeTreeIndex: index,
      selectedSkill: null,
      showTooltip: false
    }, () => {
      this.recalculateMatrix();
    });
  },

  recalculateMatrix() {
    const { trees, activeTreeIndex } = this.data;
    if (!trees || !trees[activeTreeIndex]) return;

    // 计算各系点数
    let totalSpent = 0;
    const treePoints = trees.map(tree => {
      let sum = 0;
      tree.skills.forEach(s => { sum += s.rank; });
      totalSpent += sum;
      return sum;
    });

    const pointsRemaining = Math.max(0, TOTAL_TALENT_POINTS - totalSpent);
    const activeTree = trees[activeTreeIndex];
    const activePoints = treePoints[activeTreeIndex];

    // 构建 7 层 × 4 列矩阵
    const matrix = [];
    for (let r = 1; r <= 7; r++) {
      const requiredPoints = (r - 1) * 5;
      const isTierUnlocked = activePoints >= requiredPoints;
      const cols = [];

      for (let c = 1; c <= 4; c++) {
        const skill = activeTree.skills.find(s => s.row === r && s.col === c) || null;
        let isLocked = !isTierUnlocked;
        let prereqName = '';

        if (skill && skill.prereq) {
          const parent = activeTree.skills.find(s => s.id === skill.prereq);
          if (parent) {
            prereqName = parent.name;
            if (parent.rank < parent.max) {
              isLocked = true;
            }
          }
        }

        cols.push({
          row: r,
          col: c,
          skill: skill ? { ...skill, isLocked, prereqName } : null
        });
      }

      matrix.push({
        rowNum: r,
        requiredPoints,
        isTierUnlocked,
        cols
      });
    }

    // 更新当前选中的技能详情
    let updatedSelectedSkill = this.data.selectedSkill;
    if (updatedSelectedSkill) {
      const refreshed = activeTree.skills.find(s => s.id === updatedSelectedSkill.id);
      if (refreshed) {
        let isLocked = activePoints < (refreshed.row - 1) * 5;
        let prereqName = '';
        if (refreshed.prereq) {
          const p = activeTree.skills.find(s => s.id === refreshed.prereq);
          if (p) {
            prereqName = p.name;
            if (p.rank < p.max) isLocked = true;
          }
        }
        updatedSelectedSkill = { ...refreshed, isLocked, prereqName };
      }
    }

    this.setData({
      treePoints,
      pointsSpent: totalSpent,
      pointsRemaining,
      currentMatrix: matrix,
      selectedSkill: updatedSelectedSkill
    });
  },

  onCellTap(e) {
    const { skillId } = e.currentTarget.dataset;
    if (!skillId) return;

    const { trees, activeTreeIndex } = this.data;
    const skill = trees[activeTreeIndex].skills.find(s => s.id === skillId);
    if (!skill) return;

    // 显示并更新 Tooltip
    this.showSkillTooltip(skill);

    // 尝试加 1 点
    this.tryAddPoint(skill.id);
  },

  showSkillTooltip(skill) {
    const { trees, activeTreeIndex, treePoints } = this.data;
    const activePoints = treePoints[activeTreeIndex];
    let isLocked = activePoints < (skill.row - 1) * 5;
    let prereqName = '';

    if (skill.prereq) {
      const parent = trees[activeTreeIndex].skills.find(s => s.id === skill.prereq);
      if (parent) {
        prereqName = parent.name;
        if (parent.rank < parent.max) isLocked = true;
      }
    }

    this.setData({
      selectedSkill: { ...skill, isLocked, prereqName },
      showTooltip: true
    });
  },

  closeTooltip() {
    this.setData({ showTooltip: false });
  },

  preventBubble() {},

  tryAddPoint(eOrId) {
    let skillId = null;
    if (typeof eOrId === 'string') {
      skillId = eOrId;
    } else if (eOrId && eOrId.currentTarget && eOrId.currentTarget.dataset) {
      skillId = eOrId.currentTarget.dataset.skillId;
    } else if (this.data.selectedSkill) {
      skillId = this.data.selectedSkill.id;
    }
    if (!skillId) return;

    const { trees, activeTreeIndex, pointsRemaining, treePoints } = this.data;
    const activeTree = trees[activeTreeIndex];
    const skill = activeTree.skills.find(s => s.id === skillId);
    if (!skill) return;

    if (pointsRemaining <= 0) {
      wx.showToast({ title: '点数已满 (上限51点)', icon: 'none' });
      return;
    }

    if (skill.rank >= skill.max) {
      return;
    }

    // 校验前置层点数
    const activePoints = treePoints[activeTreeIndex];
    const reqPoints = (skill.row - 1) * 5;
    if (activePoints < reqPoints) {
      wx.showToast({ title: `需在当前系投入 ${reqPoints} 点解锁`, icon: 'none' });
      return;
    }

    // 校验父前置技能
    if (skill.prereq) {
      const parent = activeTree.skills.find(s => s.id === skill.prereq);
      if (parent && parent.rank < parent.max) {
        wx.showToast({ title: `需要先点满【${parent.name}】`, icon: 'none' });
        return;
      }
    }

    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

    skill.rank += 1;
    this.recalculateMatrix();
  },

  tryReducePoint(e) {
    const skillId = e.currentTarget.dataset.skillId || (this.data.selectedSkill ? this.data.selectedSkill.id : null);
    if (!skillId) return;

    const { trees, activeTreeIndex } = this.data;
    const activeTree = trees[activeTreeIndex];
    const skill = activeTree.skills.find(s => s.id === skillId);
    if (!skill || skill.rank <= 0) return;

    // 校验点数层级依赖：扣减该点后，更高层级的技能是否会因点数不足而非法
    // 假设扣减 1 点，检查每一层 R (从 row+1 到 7)
    let tempSkills = JSON.parse(JSON.stringify(activeTree.skills));
    let target = tempSkills.find(s => s.id === skill.id);
    target.rank -= 1;

    for (let r = skill.row + 1; r <= 7; r++) {
      const hasSkillsInOrAboveRow = tempSkills.some(s => s.row >= r && s.rank > 0);
      if (hasSkillsInOrAboveRow) {
        // 计算前 (r-1) 层的总点数
        const pointsBeforeRow = tempSkills
          .filter(s => s.row < r)
          .reduce((sum, s) => sum + s.rank, 0);

        if (pointsBeforeRow < (r - 1) * 5) {
          wx.showToast({ title: '无法减少：更高层级天赋依赖此点数', icon: 'none' });
          return;
        }
      }
    }

    // 检查是否有子前置技能依赖该技能
    const childDependent = activeTree.skills.find(s => s.prereq === skill.id && s.rank > 0);
    if (childDependent && skill.rank - 1 < skill.max) {
      wx.showToast({ title: `无法减少：【${childDependent.name}】需要此前置`, icon: 'none' });
      return;
    }

    if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });

    skill.rank -= 1;
    this.recalculateMatrix();
  },

  applyPreset(preset) {
    const { trees } = this.data;
    const pointMap = preset.points || {};

    trees.forEach(tree => {
      tree.skills.forEach(skill => {
        skill.rank = pointMap[skill.id] || 0;
      });
    });

    this.recalculateMatrix();
    wx.showToast({ title: `已加载：${preset.name}`, icon: 'success' });
  },

  onPresetSelect(e) {
    const idx = parseInt(e.currentTarget.dataset.index, 10);
    const preset = this.data.presets[idx];
    if (preset) {
      this.applyPreset(preset);
    }
  },

  resetActiveTree() {
    const { trees, activeTreeIndex } = this.data;
    trees[activeTreeIndex].skills.forEach(s => { s.rank = 0; });
    this.recalculateMatrix();
    wx.showToast({ title: '本系天赋已重置', icon: 'success' });
  },

  resetAll() {
    const { trees } = this.data;
    trees.forEach(t => {
      t.skills.forEach(s => { s.rank = 0; });
    });
    this.recalculateMatrix();
    wx.showToast({ title: '全部 51 点天赋已重置', icon: 'success' });
  },

  copyTalentCode() {
    const { selectedClass, classList, treePoints, trees } = this.data;
    const cls = classList.find(c => c.id === selectedClass);
    const className = cls ? cls.name : '职业';
    const pointStr = treePoints.map((p, idx) => `${trees[idx].name}:${p}`).join(' / ');

    const code = `[魔兽世界60级 ${className} 天赋] ${pointStr} (总计已分配: ${this.data.pointsSpent}/51 点)`;

    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({ title: '天赋码已复制', icon: 'success' });
      }
    });
  }
,
  onShareAppMessage() {
    return {
      title: '魔兽世界无限服 - 60级全职业天赋模拟器',
      path: '/pages/infinite-talents/infinite-talents'
    };
  },

  onShareTimeline() {
    return {
      title: '魔兽世界无限服 - 60级全职业天赋模拟器',
      path: '/pages/infinite-talents/infinite-talents'
    };
  }
});
