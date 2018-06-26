Page({
  data: {
    obj: null,
    sfz: ''
  },
  onLoad: function (options) {
    var userinfo = getApp().globalData.userinfo;
    var sfz = getApp().globalData.sfz;
    this.setData({
      obj: userinfo,
      sfz: userinfo["身份证号"].slice(0, 6) + "********" + userinfo["身份证号"].slice(14, 18)
    })
  }
})