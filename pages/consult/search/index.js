Page({
    data: {
        list: [],
        searchKey: null
    },
    searchKeyChange: function(e) {
        this.setData({
            searchKey: e.detail.value
        });
    },
    search: function(e) {
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_YSList",
            data: {
                strCXKey: this.data.searchKey,
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