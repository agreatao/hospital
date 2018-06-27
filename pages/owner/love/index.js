Page({
  data: {
    list: [],
    showLary:true
  },
  onLoad: function (event) {
    wx.request({
      url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_GZYSInfo",
      data: {
        strUserID: getApp().globalData.userinfo['用户ID'],
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
  },
  deletelove:function(e){
    // this.setData({
    //   showLary: ''
    // })
    wx.showModal({
      title: '确定不再关注医生?',
      cancelText: '不再关注',
      confirmText: '继续关注',
      cancelColor: '#A3ACBF',
      confirmColor: '#FF4F29',
      success: (res) => {
        if (res.confirm)
          wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_GZ_State",
            data: {
              strUserID: "17769",
              strEmpID: '1234',
              strState: '1',
              strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {

            }
          }) 
      }
    })
  },
  close:function(e){
    this.setData({
      showLary: true
    })
  },
  nofocus:function(e){

  }
})