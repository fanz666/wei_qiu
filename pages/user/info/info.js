var app = getApp();
Page({
  data: {
    user: [],
  },
  onLoad: function (res) {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        wx.getUserInfo({
          success: function (info) {
            var openid = res.data.openid;
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
                  date: res.data[0].date,     
                })
                var sex=res.data[0].sex;
                if (sex == "0") {                    
                  that.setData({
                    checked: true,
                  })          
                } else{
                  that.setData({
                    checked2: true,
                  })    
                }
                
              }
            })
          }
        })
      }
    })

  },

  //表单提交按钮
  formSubmit: function (e) {
    // var formData = e.detail.value;
    var nickName = e.detail.value.nickName;
    var tel = e.detail.value.tel;
    var email = e.detail.value.email;
    var sex = e.detail.value.sex;
    var date = Date.parse(e.detail.value.date) / 1000;
    if(tel.length == 0 || email.length == 0 || tel.length != 11 || !(/^1[34578]\d{9}$/.test(tel)) || !(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))) {
      wx.showToast({
        title: '手机号码或邮箱为空或格式不正确!',
        icon: 'loading',
        duration: 1500
      })
      return;
    }
    this.setData({
      nickName: nickName,
      tel: tel,
      email: email,
      sex: sex,
      date: date,
    })

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        var openid = res.data.openid;
        wx.request({
          url: app.url + 'addon/QiuUser/QiuUser/upQiuUser',
          data: {
            'openid': openid,
            'nickName': nickName,
            'tel': tel,
            'email': email,
            'sex': sex,
            'date': date,
          },
          header: { 'content-type': 'application/json; charset=UTF-8' },
          success: function (res) {
            console.log(res);            
          },
        })
      }
    })
    wx.redirectTo({
      url: '../info/info',
    })
  },

  nickNameInput: function (e) {
    this.setData({ nickName: e.detail.value })
  },
  telInput: function (e) {
    this.setData({ tel: e.detail.value })
  },
  emailInput: function (e) {
    this.setData({ email: e.detail.value })
  },
  dateInput: function (e) {
    this.setData({ date: Date.parse(e.detail.value) })
  },

  //  点击出生年月确定事件  
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

})
