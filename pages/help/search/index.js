Page({
  data: {
    list: []
  },
  searchDoctor: function(event) {
    wx.request({
      url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_YSList",
      data: {
        strCXKey: '',
        strKey: "C1BC7666E5C74BD384196-AD1532102C1"
      },
      method: "POST",
      dataType: "JSON",
      success: (res) => {
        this.setData({
          list: JSON.parse(JSON.parse(res.data).d)
        })
      }
    })
  }
})