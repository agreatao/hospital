Page({
  data: {
    obj: null,
    sfz:''
  },
  onLoad: function (options) {
    wx.request({
      url: "https://www.dszejt.com/ws/ws_xcx.asmx/GetEjtUserData",
      data: {
        strSFZH: "421003198210020013",
        strKey: "C1BC7666E5C74BD384196-AD1532102C1"
      },
      method: "POST",
      dataType: "JSON",
      success: (res) => {
        this.setData({
          obj: JSON.parse(JSON.parse(res.data).d)[0],
          sfz: JSON.parse(JSON.parse(res.data).d)[0].身份证号.slice(0, 6) + "********" + JSON.parse(JSON.parse(res.data).d)[0].身份证号.slice(14, 18)
        })
      }
    })
  }
})