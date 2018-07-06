Page({
  data: {
    id: null,
    title: "",
    content: ""
  },
  onLoad: function (options) {
    this.setData({
      id: options['ID']
    })
  },
  startConsult: function(e) {
    if(this.data.title !== "" && this.data.content !== "") {
      wx.request({
        url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_YSZX_WTMS",
        data: {
          strZXID: this.data.id,
          strWT: this.data.title,
          strMS: this.data.content,
          strKey: "C1BC7666E5C74BD384196-AD1532102C1"
        },
        method: "POST",
        dataType: "JSON",
        success: (res) => {
          wx.navigateTo({
            url: "/pages/consult/contact/index?ID=" + this.data.id,
          })
        }
      });
    }
  },
  titleInput: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  contentInput: function(e) {
    this.setData({
      content: e.detail.value
    })
  }
})