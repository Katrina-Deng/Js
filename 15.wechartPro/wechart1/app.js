// app.js
// 单例对象
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('login res',res);
      }
    })
  },
  onShow(){
    console.log('显示了');
  },
  onHide(){
    console.log('隐藏了');
  },
  globalData: {
    userInfo: null,
    title:'globalData title'
  }
})
