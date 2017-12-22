var app = getApp()
Page({
  data: {
    userInfo: {},
    jobList: [],
    lastid: 0,
    city:[]
  },
  search: function () {
    wx.navigateTo({
      url: 'search/search',
      success: function (res) { },
    })
  },
  loadData: function (lastid) {
    var limit = 5
    var that = this
    wx.request({
      url: app.url + 'addon/QiuJob/QiuJob/getList',
      data: {
        lastid: lastid,
        limit: limit
      },
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        if (!res.data) {
          wx.showToast({
            title: '没有啦',
            icon: 'loading',
            duration: 2000
          })
          return false
        }
        var len = res.data.length
        that.setData({ lastid: res.data[len - 1].id })
        var dataArr = that.data.jobList
        var newData = dataArr.concat(res.data)
        that.setData({
          jobList: newData
        })
      }
    })
  },
  loadMore: function (event) {
    var id = event.currentTarget.dataset.lastid
    this.loadData(id)
  },
  onLoad: function () {
    var that = this
    this.loadData(0)
  },

})