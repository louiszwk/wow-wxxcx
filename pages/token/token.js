Page({
  data: {
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    theme: 'dark',
    currentRegion: 'cn',
    price: { gold: '---' },
    lastUpdated: '--:--',
    isRefreshing: false
  },

  onLoad() {
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
    this.fetchData();
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

  switchRegion(e) {
    return; // Locked to CN
  },

  refreshData() {
    if (this.data.isRefreshing) return;
    this.fetchData();
  },

  fetchData() {
    this.setData({ isRefreshing: true });
    
    // 调用微信云开发中的爬虫云函数 (获取真实数据)
    wx.cloud.callFunction({
      name: 'getTokenPrice',
      data: {
        region: this.data.currentRegion
      },
      success: (res) => {
        if (res.result && res.result.success && res.result.data) {
          const now = new Date();
          const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
          
          this.setData({
            price: { gold: (res.result.data.price || 0).toLocaleString() },
            lastUpdated: timeString,
            isRefreshing: false
          });
          setTimeout(() => {
            this.drawChart(this.data.price.gold);
          }, 100);
        } else {
          console.warn('云函数抓取失败', res);
          this.setData({
            price: { gold: '数据错误' },
            isRefreshing: false
          });
          wx.showToast({ title: '抓取失败，请检查云函数日志', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('云函数调用异常:', err);
        this.setData({
          price: { gold: '调用失败' },
          isRefreshing: false
        });
        wx.showToast({ title: '请求超时或云环境未部署', icon: 'none' });
      }
    });
  },

  drawChart(currentPrice) {
    const basePrice = parseInt(currentPrice.replace(/,/g, '')) || 0;
    if (basePrice === 0) return;

    const query = wx.createSelectorQuery()
    query.select('#priceChart')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) return;
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        const width = res[0].width
        const height = res[0].height
        
        // 生成包含当前价格在内的过去7次价格模拟数据
        const points = []
        for (let i = 6; i >= 1; i--) {
          points.push(basePrice * (1 + (Math.random() * 0.06 - 0.03)));
        }
        points.push(basePrice)

        const min = Math.min(...points) * 0.95
        const max = Math.max(...points) * 1.05
        const range = max - min

        ctx.clearRect(0, 0, width, height)

        // 绘制折线
        ctx.beginPath()
        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 3
        
        const stepX = width / (points.length - 1)
        
        points.forEach((p, i) => {
          const x = i * stepX
          const y = height - ((p - min) / range) * height
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.stroke()
        
        // 绘制渐变填充
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.4)')
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)')
        ctx.fillStyle = gradient
        ctx.fill()
        
        // 绘制数据点
        ctx.fillStyle = '#ffffff'
        points.forEach((p, i) => {
          const x = i * stepX
          const y = height - ((p - min) / range) * height
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, 2 * Math.PI)
          ctx.fill()
          ctx.stroke()
        })
      })
  }
});
