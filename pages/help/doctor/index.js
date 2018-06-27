const app = getApp();

Page({
  data: {
    obj: null,
    list: null
  },
  onLoad: function (options) {
    this.setData({
      empID: options["ID"]
    });
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
        if (res.confirm) {
          // TODO 微信支付

          wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_YSZX_DDSC",
            data: {
              strEmpID: this.data.obj["医生ID"],
              strSFZH: app.globalData.userinfo['身份证号'],
              XMNC: app.globalData.userinfo['真实姓名'] || app.globalData.userinfo["昵称"],
              strJG: this.data.obj['价格'],
              strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {
              var data = JSON.parse(JSON.parse(res.data).d);
              wx.navigateTo({
                url: '/pages/help/ask/index?ID=' + data['订单流水'],
              })
            }
          });
        }
      }
    })
  }
})