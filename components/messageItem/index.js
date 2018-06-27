Component({
  properties: {
    listData: Array
  },
  data: {
    start: 0,
    end: 0
  },
  ready: function() {
  },
  methods: {
    click: function(e) {
      if(this.end - this.start > 350) {
        wx.showModal({
          title: '确定删除吗',
          cancelText: '取消',
          confirmText: '确定',
          success: (e1) => {
            if(e1.confirm) {
              wx.request({
                url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_YSZX_LYDEL",
                data: {
                  strLYID: e.currentTarget.dataset.id,
                  strLYRID: e.currentTarget.dataset.sfzh,
                  strKey: "C1BC7666E5C74BD384196-AD1532102C1"
                },
                method: "POST",
                dataType: "JSON",
                success: (res) => {
                  var result = JSON.parse(JSON.parse(res.data).d);
                  if(result.code == 0) {
                    wx.showToast({
                      title: '成功删除',
                    });
                    var index = e.currentTarget.dataset.index;
                    this.data.listData.splice(index, 1);
                    this.setData({
                      listData: this.data.listData
                    })
                  }
                }
              })
            }
          }
        })
      }
    },
    touchstart: function(e) {
      this.start = e.timeStamp;
    },
    touchend: function(e) {
      this.end = e.timeStamp;
    }
  }
})
