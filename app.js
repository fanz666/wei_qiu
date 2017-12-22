var Promise = require('es6-promise.min.js');//引入ES6 
App({
  url: 'https://fanyz.cn/weicms/index.php?s=/',  
  onError: function (res) {
    console.log(res);
  },
  //获取session
  getSession: function () {
    var info = wx.getStorageSync('session');
    return info.session;
  },
  //获取用户信息
  getUserInfo: function () {
    var timestamp = getTimestamp();//获取当前时间戳
    //检查微信登录态是否过期
    var checkSession = function () {
      return new Promise(function (resolve, reject) {
        wx.checkSession({
          fail: function () {
            console.log('SESSION登录态过期！');
            reject();
          },
          success: function () {
            resolve();
          }
        });
      });
    };    
    //检查SESSION缓存是否过期
    var checkStorage = function () {
      return new Promise(function (resolve, reject) {
        wx.getStorage({
          key: 'session',
          success: function (res) {
            if (res.data.expires) {
              if (timestamp > res.data.expires) {//超时
                resolve();
              } else {
                reject();
              }
            } else { resolve(); }
          }, fail: function () { resolve(); }
        });
      });
    };
    //刷新用户信息
    var updateUserInfo = function () {
      return new Promise(function (resolve, reject) {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000,
          mask: true
        });
        resolve();
      });
    }
    //用户授权登录
    // var login = function () {
    //   return new Promise(function (resolve, reject) {
    //     wx.login({
    //       success: function (loginRes) {
    //         resolve(loginRes);
    //       },
    //       fail: function (res) {
    //         reject(res);
    //       }
    //     });
    //   });
    // }
    //获取用户信息     
    // var getUserInfo = function (loginRes) {
    //   return new Promise(function (resolve, reject) {
    //     var that = this;
    //     wx.getUserInfo({
    //       success: function (userinfoRes) {
    //         var data = {
    //           loginRes: loginRes,
    //           userinfoRes: userinfoRes
    //         }
    //         resolve(data);
    //       },
    //       fail: function (res) {
    //         reject(res);
    //       }
    //     });
    //   });
    // };
    //用户信息入库
    // var request = function (data) {
    //   return new Promise(function (resolve, reject) {
    //     var userInfoStr = JSON.stringify(data.userinfoRes);
    //     wx.request({
    //       url: 'https://fanyz.cn/weicms/index.php?s=/addon/QiuUser/QiuUser/getSession',
    //       data: {
    //         code: data.loginRes.code,
    //         userInfo: userInfoStr
    //       },
    //       header: { 'content-type': 'application/x-www-form-urlencoded' },
    //       method: 'POST',
    //       success: function (res) {
    //         //缓存session及userInfo
    //         if (res.data.error == 0) {
    //           var return_obj = {
    //             res: res.data, userinfoRes: data.userinfoRes
    //           };
    //           resolve(return_obj);
    //         } else {
    //           reject(res);
    //         }
    //       },
    //       fail: function (res) {
    //         reject(res);
    //       }
    //     });
    //   });
    // };
    //异步写入缓存
  //   var setStorage = function (data) {
  //     return new Promise(function (resolve, reject) {
  //       wx.setStorage({
  //         key: "session",
  //         data: {
  //           session: data.res.session,
  //           userInfo: data.userinfoRes.userInfo,
  //           expires: data.res.expires  //超时时间戳
  //         },
  //         success: function () { resolve(); }, fail: function (res) { reject(res); }
  //       })
  //     })
  //   };
  //   checkSession().then(function (value) {
  //     console.log('SESSION登录态未过期！');
  //     checkStorage().then(function (value) {
  //       console.log('SESSION缓存已过期');
  //       updateUserInfo().then(function () {
  //         login().then(function (value) {
  //           console.log('授权登录成功');
  //           getUserInfo(value).then(function (value) {
  //             console.log('获取用户信息成功');
  //             request(value).then(function (value) {
  //               console.log('用户信息入库成功');
  //               setStorage(value).then(function (value) {
  //                 console.log('写入缓存成功'); wx.hideToast();
  //               }, function (value) {
  //                 wx.showModal({
  //                   title: '写入缓存失败',
  //                   showCancel: false,
  //                   content: value
  //                 })
  //               }).catch(console.log(console));
  //             }, function (value) {
  //               wx.showModal({
  //                 title: '用户信息入库失败',
  //                 showCancel: false,
  //                 content: value
  //               })
  //             });
  //           }, function (value) {
  //             wx.showModal({
  //               title: '获取用户信息失败！',
  //               showCancel: false,
  //               content: value
  //             })
  //           });
  //         }, function (value) {
  //           wx.showModal({
  //             title: '授权登录失败！',
  //             showCancel: false,
  //             content: value
  //           })
  //         });
  //       });
  //     }, function () {
  //       console.log('SESSION缓存未过期');
  //     });
  //   }, function () {
  //     console.log('SESSION登录态已过期！');
  //     updateUserInfo().then(function () {
  //       login().then(function (value) {
  //         console.log('授权登录成功');
  //         getUserInfo(value).then(function (value) {
  //           console.log('获取用户信息成功');
  //           request(value).then(function (value) {
  //             console.log('用户信息入库成功');
  //             setStorage(value).then(function (value) {
  //               console.log('写入缓存成功'); wx.hideToast();
  //             }, function (value) {
  //               wx.showModal({
  //                 title: '写入缓存失败',
  //                 showCancel: false,
  //                 content: value
  //               })
  //             }).catch(console.log(console));
  //           }, function (value) {
  //             wx.showModal({
  //               title: '用户信息入库失败',
  //               showCancel: false,
  //               content: value
  //             })
  //           });
  //         }, function (value) {
  //           wx.showModal({
  //             title: '获取用户信息失败！',
  //             showCancel: false,
  //             content: value
  //           })
  //         });
  //       }, function (value) {
  //         wx.showModal({
  //           title: '授权登录失败！',
  //           showCancel: false,
  //           content: value
  //         })
  //       });
  //     });
  //   });
  // },
  // onLaunch: function () {
  //   // this.getUserDataToken();
  // },
  // getUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  },
  globalData: {
    userInfo: null,
  },
  onShow: function () {
    console.log("app onShow")
  },
  onHide: function () {
    console.log("app onHide")
  },
  onError: function (msg) {

  },
  appData: {
    userInfo: null
  },
})
function getTimestamp() {
  var tmp = Date.parse(new Date()).toString();
  tmp = tmp.substr(0, 10);
  return tmp;
}