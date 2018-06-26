Page({
  data: {
    navbar: ['病史', '检验', '检查', "医嘱"],
    currentTab: 4, 
    list: []
  },
  navbarTap: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad: function (){
    this.setData({
      currentTab:1
    }),
    wx.request({
      url: "https://www.dszejt.com/ws/ws_xcx.asmx/V_LAB_TEST_MASTER",
      data: {
        strPATIENT_ID: "0000183083",
        startDate:"2015-01-01",
        endDate:"2018-01-01",
        strLisType:2,
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