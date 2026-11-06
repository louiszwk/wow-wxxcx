const { TALENT_DATA_60 } = require('../../data/infinite_data.js');

const TOTAL_TALENT_POINTS = 51; // 60级经典怀旧服满级天赋点数 (10级至60级)

Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    viewMode: 'list', // 'list' (配装列表) | 'tree' (天赋树模拟器)
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
    
    // 列表模式数据 (与正式服大秘境路线管理一致)
    buildsFilter: 'all', // 'all' | 'official' | 'my'
    onlyMyBuilds: false,
    allBuilds: [],
    displayBuilds: [],
    likedBuilds: {},

    // 当前编辑的配装信息
    currentBuildId: null,
    currentBuildName: '默认配装',
    currentBuildDesc: '',
    isCustomBuild: false,

    // 天赋树模拟器数据
    activeTreeIndex: 0,
    trees: [],
    treePoints: [0, 0, 0],
    pointsRemaining: TOTAL_TALENT_POINTS,
    pointsSpent: 0,
    currentMatrix: [],
    presets: [],
    
    // 保存弹窗表单
    showSaveModal: false,
    saveBuildName: '',
    saveBuildDesc: '',

    // Tooltip / 悬浮详情弹窗
    selectedSkill: null,
    showTooltip: false
  },

  onLoad(options) {
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
    const likedBuilds = wx.getStorageSync('infinite_liked_talent_builds') || {};

    let targetClass = (options && options.class) ? options.class : 'warrior';
    let targetMode = (options && options.mode) ? options.mode : 'list';

    this.setData({
      theme: savedTheme,
      likedBuilds,
      viewMode: targetMode
    });

    this.initClassTalents(targetClass, () => {
      // 若分享链接指定了配装名称，自动定位加载该配装
      if (options && options.buildName) {
        const decodedName = decodeURIComponent(options.buildName);
        const found = this.data.allBuilds.find(b => b.name === decodedName);
        if (found) {
          this.loadBuild(found);
          this.setData({ viewMode: 'tree' });
        }
      }
    });
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

  switchViewMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ viewMode: mode }, () => {
      if (wx.pageScrollTo) wx.pageScrollTo({ scrollTop: 0, duration: 100 });
    });
  },

  selectClass(e) {
    const classId = e.currentTarget.dataset.id;
    if (classId === this.data.selectedClass) return;
    this.initClassTalents(classId);
  },

  initClassTalents(classId, callback) {
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

    const computeBuildSummary = (points) => {
      const treeSums = trees.map(t => {
        return t.skills.reduce((acc, s) => acc + (points[s.id] || 0), 0);
      });
      const summaryStr = trees.map((t, idx) => `${t.name} ${treeSums[idx]}`).join(' / ');
      const total = treeSums.reduce((a, b) => a + b, 0);
      return { pointSummary: summaryStr, totalPoints: total };
    };

    const presets = classData.presets || [];

    // 从本地存储加载玩家保存的该职业配装
    const userBuilds = wx.getStorageSync('infinite_user_talent_builds') || [];
    const myClassBuilds = userBuilds.filter(b => b.classId === classId).map(b => {
      const { pointSummary, totalPoints } = computeBuildSummary(b.points || {});
      return { ...b, pointSummary, totalPoints };
    });

    // 格式化官方预设列表
    const officialBuilds = presets.map((p, idx) => {
      const { pointSummary, totalPoints } = computeBuildSummary(p.points || {});
      return {
        id: `official_${classId}_${idx}`,
        name: p.name,
        desc: p.desc || '暴雪无限服权威主流加点方案。',
        points: p.points || {},
        classId: classId,
        authorName: '暴雪官方推荐',
        displayTime: '2026.11.05 上线权威',
        isOfficial: true,
        isOwner: false,
        pointSummary,
        totalPoints,
        likes: 128 + idx * 37,
        views: 450 + idx * 82
      };
    });

    // 合并全部配装列表 (我的自定义配装置顶)
    const allBuilds = [...myClassBuilds, ...officialBuilds];

    // 默认首选配装
    const defaultBuild = allBuilds[0] || null;

    this.setData({
      selectedClass: classId,
      trees,
      presets,
      allBuilds,
      activeTreeIndex: 0,
      selectedSkill: null,
      showTooltip: false
    }, () => {
      this.filterBuilds();
      if (defaultBuild) {
        this.applyPreset(defaultBuild);
      } else {
        this.recalculateMatrix();
      }
      if (typeof callback === 'function') callback();
    });
  },

  // 筛选配装列表 (全部 / 官方权威 / 我的保存)
  filterBuilds() {
    const { allBuilds, buildsFilter, onlyMyBuilds } = this.data;
    let list = allBuilds;

    if (onlyMyBuilds || buildsFilter === 'my') {
      list = list.filter(b => b.isOwner);
    } else if (buildsFilter === 'official') {
      list = list.filter(b => b.isOfficial);
    }

    this.setData({ displayBuilds: list });
  },

  onSelectBuildFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({ buildsFilter: filter }, () => {
      this.filterBuilds();
    });
  },

  toggleOnlyMyBuilds() {
    this.setData({
      onlyMyBuilds: !this.data.onlyMyBuilds
    }, () => {
      this.filterBuilds();
    });
  },

  // 载入选中的配装并切换至天赋树加点视图
  loadBuild(build) {
    this.applyPreset(build);
    this.setData({
      viewMode: 'tree',
      currentBuildId: build.id,
      currentBuildName: build.name,
      currentBuildDesc: build.desc || '',
      isCustomBuild: !!build.isOwner
    });
  },

  onBuildCardTap(e) {
    const buildId = e.currentTarget.dataset.id;
    const build = this.data.allBuilds.find(b => b.id === buildId);
    if (build) {
      this.loadBuild(build);
    }
  },

  // 点赞配装
  onLikeBuild(e) {
    const buildId = e.currentTarget.dataset.id;
    const { likedBuilds, allBuilds } = this.data;
    const newLiked = { ...likedBuilds };

    const target = allBuilds.find(b => b.id === buildId);
    if (!target) return;

    if (newLiked[buildId]) {
      delete newLiked[buildId];
      target.likes = Math.max(0, (target.likes || 1) - 1);
      wx.showToast({ title: '已取消点赞', icon: 'none' });
    } else {
      newLiked[buildId] = true;
      target.likes = (target.likes || 0) + 1;
      if (wx.vibrateShort) wx.vibrateShort({ type: 'light' });
      wx.showToast({ title: '点赞成功！', icon: 'success' });
    }

    wx.setStorageSync('infinite_liked_talent_builds', newLiked);
    this.setData({
      likedBuilds: newLiked,
      allBuilds
    }, () => {
      this.filterBuilds();
    });
  },

  // 新建全新配装 (清空51点，进入自由加点)
  goToCreateBuild() {
    const { trees } = this.data;
    trees.forEach(t => t.skills.forEach(s => { s.rank = 0; }));
    
    this.setData({
      trees,
      viewMode: 'tree',
      currentBuildId: null,
      currentBuildName: '新建自定义配装',
      currentBuildDesc: '自由分配 51 点天赋规划',
      isCustomBuild: true
    }, () => {
      this.recalculateMatrix();
      wx.showToast({ title: '已清空点数，请自由加点', icon: 'none' });
    });
  },

  // 打开保存配装弹窗
  openSaveModal() {
    const defaultName = this.data.currentBuildId ? this.data.currentBuildName : `我的${this.getClassName()}配装`;
    this.setData({
      showSaveModal: true,
      saveBuildName: defaultName,
      saveBuildDesc: this.data.currentBuildDesc || ''
    });
  },

  closeSaveModal() {
    this.setData({ showSaveModal: false });
  },

  onSaveNameInput(e) { this.setData({ saveBuildName: e.detail.value }); },
  onSaveDescInput(e) { this.setData({ saveBuildDesc: e.detail.value }); },

  // 确认保存配装 (写入本地存储，像正式服大秘境路线一样随时管理)
  confirmSaveBuild() {
    const { saveBuildName, saveBuildDesc, selectedClass, trees, currentBuildId } = this.data;
    const name = saveBuildName.trim();
    if (!name) {
      wx.showToast({ title: '请输入配装方案名称', icon: 'none' });
      return;
    }

    // 收集点数映射与汇总
    const pointMap = {};
    trees.forEach(t => {
      t.skills.forEach(s => {
        if (s.rank > 0) pointMap[s.id] = s.rank;
      });
    });

    const treeSums = trees.map(t => {
      return t.skills.reduce((acc, s) => acc + (pointMap[s.id] || 0), 0);
    });
    const pointSummary = trees.map((t, idx) => `${t.name} ${treeSums[idx]}`).join(' / ');
    const totalPoints = treeSums.reduce((a, b) => a + b, 0);

    const userBuilds = wx.getStorageSync('infinite_user_talent_builds') || [];
    const buildId = currentBuildId && currentBuildId.startsWith('user_') ? currentBuildId : `user_${Date.now()}`;

    const newBuild = {
      id: buildId,
      name: name,
      desc: saveBuildDesc.trim() || '玩家自建无限服 51 点满级加点方案。',
      points: pointMap,
      classId: selectedClass,
      authorName: '我的自建配装',
      displayTime: '刚刚更新',
      isOfficial: false,
      isOwner: true,
      pointSummary,
      totalPoints,
      likes: 1,
      views: 1
    };

    // 如果是更新已有，替换之；否则置顶插入
    const existIndex = userBuilds.findIndex(b => b.id === buildId);
    if (existIndex !== -1) {
      userBuilds[existIndex] = newBuild;
    } else {
      userBuilds.unshift(newBuild);
    }

    wx.setStorageSync('infinite_user_talent_builds', userBuilds);

    this.setData({
      showSaveModal: false,
      currentBuildId: buildId,
      currentBuildName: name,
      currentBuildDesc: newBuild.desc,
      isCustomBuild: true
    });

    // 刷新该职业全部配装列表
    this.initClassTalents(selectedClass);

    wx.showToast({ title: '配装已保存成功！', icon: 'success' });
  },

  // 删除自定义配装
  onDeleteBuild(e) {
    const buildId = e.currentTarget.dataset.id;
    const buildName = e.currentTarget.dataset.name;

    wx.showModal({
      title: '删除配装确认',
      content: `确定要删除「${buildName}」吗？删除后无法恢复。`,
      confirmColor: '#ef4444',
      success: (res) => {
        if (res.confirm) {
          let userBuilds = wx.getStorageSync('infinite_user_talent_builds') || [];
          userBuilds = userBuilds.filter(b => b.id !== buildId);
          wx.setStorageSync('infinite_user_talent_builds', userBuilds);

          wx.showToast({ title: '已删除配装', icon: 'success' });
          this.initClassTalents(this.data.selectedClass);
        }
      }
    });
  },

  getClassName() {
    const cls = this.data.classList.find(c => c.id === this.data.selectedClass);
    return cls ? cls.name : '职业';
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

    // 校验点数层级依赖
    let tempSkills = JSON.parse(JSON.stringify(activeTree.skills));
    let target = tempSkills.find(s => s.id === skill.id);
    target.rank -= 1;

    for (let r = skill.row + 1; r <= 7; r++) {
      const hasSkillsInOrAboveRow = tempSkills.some(s => s.row >= r && s.rank > 0);
      if (hasSkillsInOrAboveRow) {
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

  copyTalentCode(e) {
    const buildId = (e && e.currentTarget && e.currentTarget.dataset) ? e.currentTarget.dataset.id : null;
    let targetBuild = null;
    if (buildId) {
      targetBuild = this.data.allBuilds.find(b => b.id === buildId);
    }

    const { selectedClass, classList, treePoints, trees, currentBuildName } = this.data;
    const cls = classList.find(c => c.id === selectedClass);
    const className = cls ? cls.name : '职业';

    let code = '';
    if (targetBuild && targetBuild.pointSummary) {
      code = `[魔兽世界无限服 ${className} · ${targetBuild.name}] ${targetBuild.pointSummary} (${targetBuild.totalPoints}/51点满级方案)`;
    } else {
      const pointStr = treePoints.map((p, idx) => `${trees[idx].name}:${p}`).join(' / ');
      code = `[魔兽世界无限服 ${className} · ${currentBuildName}] ${pointStr} (已分配: ${this.data.pointsSpent}/51 点)`;
    }

    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({ title: '天赋码已复制', icon: 'success' });
      }
    });
  },

  onShareAppMessage() {
    const className = this.getClassName();
    return {
      title: `魔兽世界无限服 - 60级${className}【${this.data.currentBuildName}】天赋配装方案`,
      path: `/pages/infinite-talents/infinite-talents?class=${this.data.selectedClass}&buildName=${encodeURIComponent(this.data.currentBuildName)}&mode=${this.data.viewMode}`
    };
  },

  onShareTimeline() {
    const className = this.getClassName();
    return {
      title: `魔兽世界无限服 - 60级${className}【${this.data.currentBuildName}】天赋配装方案`,
      path: `/pages/infinite-talents/infinite-talents?class=${this.data.selectedClass}&buildName=${encodeURIComponent(this.data.currentBuildName)}&mode=${this.data.viewMode}`
    };
  }
});
