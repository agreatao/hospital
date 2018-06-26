//app.js
App({
  globalData: {
    userinfo: null,
  },
  onLaunch: function () {
    wx.request({
      url: "https://www.dszejt.com/ws/ws_xcx.asmx/GetEjtUserData",
      data: {
        strSFZH: "421003198210020013",
        strKey: "C1BC7666E5C74BD384196-AD1532102C1"
      },
      method: "POST",
      dataType: "JSON",
      success: (res) => {
        this.globalData.userinfo = JSON.parse(JSON.parse(res.data).d)[0];
        console.log(JSON.parse(JSON.parse(res.data).d)[0])
      }
    })
  }
})