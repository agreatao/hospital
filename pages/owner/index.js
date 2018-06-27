Page({
  data: {
    obj: null,
    sfz: '',
    isZy:true,
    payment:null,
    cardidzy:null,
    patientId:null
  },
  onLoad: function (options) {
    var userinfo = getApp().globalData.userinfo; 
    var sfz = getApp().globalData.sfz; 
    this.setData({
      obj: userinfo,
      sfz: userinfo["身份证号"].slice(0, 6) + "********" + userinfo["身份证号"].slice(14, 18)
    })
    wx.request({
      url: "https://www.dszejt.com/ws/ws_xcx.asmx/V_PATS_IN_HOSPITAL_SFZH",
      data: {
        strSFZH: userinfo["身份证号"],//有数据测试账号"650202192611260017"
        strKey: "C1BC7666E5C74BD384196-AD1532102C1"
      },
      method: "POST",
      dataType: "JSON",
      success: (res) => {
        console.log(JSON.parse(JSON.parse(res.data).d))
        if (JSON.parse(JSON.parse(res.data).d).length>0){
          this.setData({
            isZy: '',
            payment: JSON.parse(JSON.parse(res.data).d)[0].PREPAYMENTS,
            cardidzy: JSON.parse(JSON.parse(res.data).d)[0].CARDID,
            patientId: JSON.parse(JSON.parse(res.data).d)[0].INP_NO
          })
        }      
      }
    })
  }
})