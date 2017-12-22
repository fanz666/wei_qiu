var app = getApp();
Page({
  data: {
    user: [],
    eduList: [],
    expList: [],
    sex:'',
  },
  onLoad: function (res) {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        wx.getUserInfo({
          success: function (info) {
            var openid = res.data.openid;
            // 获取用户基本信息
            wx.request({
              url: app.url + 'addon/QiuUser/QiuUser/getList',
              data: {
                "openid": openid,
              },
              header: {
                "content-type": "application/json"
              },
              success: function (res) {
                that.setData({
                  user: res.data[0],
                })
                var sex = res.data[0].sex;
                // console.log(res.data[0].avatarUrl);
                if (sex == "0") {
                  that.setData({
                    sex: '男',
                  })
                } else {
                  that.setData({
                    sex: '女',
                  })
                }

              }
            })
            // 获取教育背景
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
            // 获取工作经验
            wx.request({
              url: app.url + 'addon/QiuExp/QiuExp/getList',
              data: {
                "openid": openid,
              },
              header: {
                "content-type": "application/json"
              },
              success: function (res) {
                that.setData({
                  expList: res.data
                })
              }
            })
          }
        })
      }
    })

  },

})
