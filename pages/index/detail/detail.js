var app = getApp()
Page({
  data: {
    position: [],
    userInfo: {},
  },
  onLoad: function (options) {
    var that = this
    wx.getUserInfo({
      success: function (res) {        
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
                        });

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
    })

    wx.request({
      url: app.url + 'addon/QiuJob/QiuJob/getDetail',
      data: {
        id: options.id
      },
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          position: res.data
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    var company = e.detail.value.company;
    var position = e.detail.value.position;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        var openid = res.data.openid;
        var nickName = res.data.nickName;
        console.log(openid+nickName);
        wx.request({
          url: app.url + 'addon/QiuApply/QiuApply/addApply',
          data: {
            'openid': openid,
            'nickName': nickName,
            'company': company,
            'position': position,
          },
          header: { 'content-type': 'application/json; charset=UTF-8' },
          success: function (res) {
            console.log(res.data);
            if (res.data == "0") {
              wx.showToast({
                title: '投过啦！！！',
                icon: 'loading',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '投简中。。。',
                icon: 'loading',
                duration: 2000
              })
            }
          },
        })
      }
    })
  }
})