Page({
  data: {
    obj: null
  },
  onLoad: function (options) {
    wx.request({
      url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_YSInfo",
      data: {
        strEmpID: options['ID'],
        strKey: "C1BC7666E5C74BD384196-AD1532102C1"
      },
      method: "POST",
      dataType: "JSON",
      success: (res) => {
        this.setData({
          obj: JSON.parse(JSON.parse(res.data).d)[0]
        })
      }
    })
  }
})