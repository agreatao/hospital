Page({
    data: {
        list: []
    },
    onLoad: function(event) {
        var sfz = getApp().globalData.userinfo["身份证号"];
        console.log(sfz);
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/V_PAT_MASTER_INDEX",
            data: {
                strSFZH: sfz,
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