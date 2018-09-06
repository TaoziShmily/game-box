//index.js
const app = getApp();
import {apiRequest} from '../../utils/util';
Page({
 	data: {
    imgUrls: [],
    newestList:[],
    list:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorActiveColor:'#fff',
    igame_title:''
  	},
      // 获取首页数据
    getData () {
        apiRequest('/i/igame/index?id=1233','POST',{},{'content-type':'application/x-www-form-urlencoded'}).then(res => {
            console.log('res',res)
          if (res.statusCode == 200 && res.data.status == "SUCCEED") {
            this.setData({
                imgUrls:res.data.topIgames,
                newestList:res.data.centerIgames,
                list:res.data.bottomIgames,
                igame_title:res.data.igame_title
            })
            wx.setNavigationBarTitle({
              title: res.data.igame_title || ''
            })
            if (wx.hideToast) {
              wx.hideToast();
            }
          } else {
            wx.showModal({
                title: '错误提示',
                content: '请求出错',
                showCancel:false
            })
          }
        }, res => {
          wx.showModal({
              title: '错误提示',
              showCancel:false
          })
        })
    },
      // 跳转
    goWebViewPage(e){
        var jump_url = e.currentTarget.dataset.jump_url;
        wx.navigateTo({
          url: '/pages/webView/webView?jump_url='+jump_url
        })
    },
    // 页面加载
    onLoad: function () {
        if (wx.showToast) {
            wx.showToast({
                title: '拼命加载中...',
                icon: 'loading',
                duration: 10000
            })
        }
        //更新数据
        this.getData();
    },

    // 分享功能
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: this.igame_title || '',
        path: '/pages/index/index'
      }
    }
})









