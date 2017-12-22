var app = getApp()
Page({
  data: {
    jobList: [],
    showView: true,
    requrieList: [
      { 'requrie': '成都' }, { 'requrie': '北京' }, { 'requrie': '上海' }, { 'requrie': '深圳' }, { 'requrie': '福建' }, { 'requrie': '重庆' }, { 'requrie': '广州' },
    ],
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  formSubmit: function (e) {
    var that = this;
    var search = e.detail.value.search;
    this.setData({
      search: search,
      showView: false
    })
    console.log("搜索关键字：", search)
    wx.request({
      url: app.url + 'addon/QiuJob/QiuJob/search',
      data: {
        "search": search
      },
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        if (!res.data) {
          wx.showToast({
            title: '没有搜索到!!!',
            icon: 'loading',
            duration: 2000
          })
          return false
        }
        that.setData({
          jobList: res.data
        })
      },
    })
  },
  requrie: function (e) {
    var that = this;
    var requrie = e.currentTarget.id;
    this.setData({
      requrie: requrie,
      showView: false
    })
    console.log("城市关键字：", requrie)
    wx.request({
      url: app.url + 'addon/QiuJob/QiuJob/searchRequrie',
      data: {
        "requrie": requrie
      },
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        if (!res.data) {
          wx.showToast({
            title: '没有搜索到!!!',
            icon: 'loading',
            duration: 2000
          })
          return false
        }
        that.setData({
          jobList: res.data
        })
      },
    })
  },
  searchInput: function (e) {
    this.setData({ search: e.detail.value })
  },
})
