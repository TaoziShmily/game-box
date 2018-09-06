//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    //冷热启动
    const updateManager = wx.getUpdateManager()
    // 当向微信后台请求完新版本信息，会进行回调
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(111,res.hasUpdate)
    })
    // 当新版本下载完成，会进行回调
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    // 当新版本下载失败，会进行回调
    updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel:false
      })
    })

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    API_PATH: 'https://api.topeffects.cn',
    postHeader: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
})