var app = getApp()
Page({
  data: {
  },

  //表单提交按钮
  formSubmit: function (e) {
    // var formData = e.detail.value;
    var school = e.detail.value.school;
    var specialities = e.detail.value.specialities;
    var qualifications = e.detail.value.qualifications;
    var date = Date.parse(e.detail.value.date) / 1000;
    if (school.length == 0 || specialities.length == 0 || qualifications.length == 0 || date.length == 0 ){
      wx.showToast({
        title: '请输入完整信息!',
        icon: 'loading',
        duration: 1500
      })
      return;
    }
    var that = this
    this.setData({
      // allValue: formData,
      school: school,
      specialities: specialities,
      qualifications: qualifications,
      date: date,
    })

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        var openid = res.data.openid;
        wx.request({
          url: app.url + 'addon/QiuEdu/QiuEdu/addQiuEdu/',
          // data: formData,
          data: {
            'openid': openid,
            'school': school,
            'specialities': specialities,
            'qualifications': qualifications,
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
      url: '../../education/education'
    })
  },

  schoolInput: function (e) {
    this.setData({ school: e.detail.value })
  },
  specialitiesInput: function (e) {
    this.setData({ specialities: e.detail.value })
  },
  qualificationsInput: function (e) {
    this.setData({ qualifications: e.detail.value })
  },
  dateInput: function (e) {
    this.setData({ date: Date.parse(e.detail.value) })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // bindPickerqualifications: function (e) {
  //   this.setData({
  //     specialities: e.detail.value
  //   })
  // },


})
