// var Promise = require('../../es6-promise.min.js');//引入ES6 
var app = getApp();

Page({
  data: {
    user: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (info) {
            var rawData = info['rawData'];
            wx.request({
              url: app.url + 'addon/QiuUser/QiuUser/login',
              data: {
                "code": code,
                "rawData": rawData,
              },
              header: {
                "content-type": "application/json"
              },
              success: function (res) {
                if (res.statusCode != 200) {
                  wx.showModal({
                    title: '登录失败'
                  });
                }
                that.setData({
                  user: res.data[0]
                })
                // console.log(res.data);
                wx.setStorage({
                  key: "openid",
                  data: {
                    openid: res.data[0].openid,
                    nickName: res.data[0].nickName,
                  }
                })
              },
            })
          }, fail: function () {
            wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                        wx.getUserInfo({
                          success: function (res) {
                            var userInfo = res.userInfo;
                            that.setData({
                              nickName: userInfo.nickName,
                            })
                          }
                        })
                      }
                    }, fail: function (res) {
                    }
                  })
                }
              }
            })
          }, complete: function (res) {
          }
        });
      }
    });

  },
  chooseImageTap: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.showToast({
          icon: "loading",
          title: "正在上传"
        })

        wx.uploadFile({
          url: app.url + 'addon/QiuUser/QiuUser/uploadImage',
          filePath: tempFilePaths[0],
          name: 'uploadFile',
          header: {
            'content-type': 'multipart/form-data'
          }, // 设置请求的 header
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            'session_token': wx.getStorageSync('session_token')
          },
          success: function (res) {
            wx.getStorage({
              key: 'openid',
              success: function (res) {
                var openid = res.data.openid;
                wx.request({
                  url: app.url + 'addon/QiuUser/QiuUser/uploadImage',
                  data: {
                    'openid': openid,
                  },
                  header: { 'content-type': 'application/json; charset=UTF-8' },
                  success: function (res) {
                    wx.showToast({
                      title: "图片修改成功",
                      icon: 'success',
                    })
                    console.log(res);
                  },
                })
              }
            })
          },
          fail: function (res) {
          }
        })
      }
    })
  },
  // 我的简历
  resumeClick: function () {
    wx.navigateTo({
      url: 'resume/resume'
    })
  },
  // 申请记录
  applyForClick: function () {
    wx.navigateTo({
      url: 'apply/apply'
    })
  },
  // 通知
  noticeClick: function () {
    wx.navigateTo({
      url: 'notice/notice'
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },

})