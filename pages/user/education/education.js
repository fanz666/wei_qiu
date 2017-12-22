var app = getApp();
Page({
  data: {
    eduList: [],
    user: [],
  },
  onLoad: function (res) {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        var openid = res.data.openid;
        console.log(openid);
        wx.request({
          url: app.url + 'addon/QiuEdu/QiuEdu/getList',
          data: {
            "openid": openid,
          },
          header: {
            "content-type": "application/json"
          },
          success: function (res) {
            that.setData({
              eduList: res.data
            })
          }
        })
      }
    })

  },

  add: function () {
    wx.navigateTo({
      url: 'add/add',
    })
  },

  edit: function (e) {
    wx.navigateTo({
      url: 'add/add',
    })
  },
  del: function (e) {
    var id = parseInt(e.currentTarget.id)
    console.log('id=' + id)
    wx.request({
      url: app.url + 'addon/QiuEdu/QiuEdu/del/id/' + id,
      data: {},
      header: {},
      method: 'POST',
      dataType: '',
      success: function (res) {
        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'success',
            duration: 1000
          }),
            wx.removeStorage({
              key: 'id'
            }),
            wx.redirectTo({
              url: '../education/education'
            })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器网络错误!',
          icon: 'loading',
          duration: 1500
        })
      },
      complete: function (res) { },
    })
  }
})