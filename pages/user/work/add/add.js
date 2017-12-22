var app = getApp();
Page({
  data: {
    
  },

  //表单提交按钮
  formSubmit: function (e) {
    // var formData = e.detail.value;
    var company = e.detail.value.company;
    var position = e.detail.value.position;
    var entry = Date.parse(e.detail.value.entry) / 1000;
    var quit = Date.parse(e.detail.value.quit) / 1000;
    if (company.length == 0 || position.length == 0 || entry.length == 0 || quit.length == 0) {
      wx.showToast({
        title: '请输入完整信息!',
        icon: 'loading',
        duration: 1500
      })
      return;
    }
    var _this = this
    this.setData({
      // allValue: formData,
      company: company,
      position: position,
      entry: entry,
      quit: quit,
    })

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        var openid = res.data.openid;
        wx.request({
          url: app.url + 'addon/QiuExp/QiuExp/addQiuExp/',
          // data: formData,
          data: {
            'openid': openid,
            'company': company,
            'position': position,
            'entry': entry,
            'quit': quit,
          },
          header: { 'content-type': 'application/json; charset=UTF-8' },
          success: function (res) {
            console.log(res);
          },
        })
      }
    })

    wx.redirectTo({
      url: '../../work/work'
    })
  },

  companyInput: function (e) {
    this.setData({ company: e.detail.value })
  },
  positionInput: function (e) {
    this.setData({ position: e.detail.value })
  },
  entryInput: function (e) {
    this.setData({ entry: e.detail.value })
  },
  quitInput: function (e) {
    this.setData({ quit: Date.parse(e.detail.value) })
  },

  bindEntryChange: function (e) {
    this.setData({
      entry: e.detail.value
    })
  },
  bindQuitChange: function (e) {
    this.setData({
      quit: e.detail.value
    })
  },



})
