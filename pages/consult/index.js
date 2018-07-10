const app = getApp();

Page({
    data: {
        list: null
    },
    onLoad: function(options) {
        this.getList();
    },
    onPullDownRefresh: function() {
        this.getList(() => {
            wx.stopPullDownRefresh();
        })
    },
    getList: function(cb) {
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_YSList_ZJHF",
            data: {
                strSFZH: app.globalData.userinfo['身份证号'],
                strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {
                this.setData({
                    list: JSON.parse(JSON.parse(res.data).d)
                })
                if(typeof cb === "function") {
                    cb.call(this);
                }
            }
        })
    }
})