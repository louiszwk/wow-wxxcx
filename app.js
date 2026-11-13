// app.js
App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID，环境 ID 可打开云控制台查看
        env: 'cloud1-d1gavf33jdc49fc9b', // <--- 用户需要替换为真实的 env id
        traceUser: true,
      });
    }

    const systemInfo = (wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync());
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    
    this.globalData = {
      statusBarHeight: systemInfo.statusBarHeight,
      menuButtonTop: menuButtonInfo.top,
      menuButtonHeight: menuButtonInfo.height,
      navBarHeight: (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight
    };
  }
})
