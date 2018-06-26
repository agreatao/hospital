Page({
  data: {
    obj: null,
    list: null
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
    });
    wx.request({
      url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_PJList",
      data: {
        strEmpID: options['ID'],
        strKey: "C1BC7666E5C74BD384196-AD1532102C1"
      },
      method: "POST",
      dataType: "JSON",
      success: (res) => {
        this.setData({
          list: JSON.parse(JSON.parse(res.data).d)
        })
      }
    });
  },
  submit: function(e) {
    wx.showModal({
      title: '立即支付，即可获得医生专业的解答。',
      content: '有效时限：支付成功后24小时',
      cancelText: '取消支付',
      confirmText: '确认支付',
      confirmColor: '#FF4F29',
      success: (res) => {
        if (res.confirm)
          wx.navigateTo({
            url: '/pages/help/ask/index',
          })
      }
    })
  }
})