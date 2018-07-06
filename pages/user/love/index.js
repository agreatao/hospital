const app = getApp();

Page({
    data: {
        list: []
    },
    onShow: function(options) {
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_GZYSInfo",
            data: {
                strUserID: app.globalData.userinfo['用户ID'],
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
    deleteLove: function(e) {
        wx.showModal({
            title: '确定不再关注医生?',
            cancelText: '不再关注',
            confirmText: '继续关注',
            cancelColor: '#A3ACBF',
            confirmColor: '#FF4F29',
            success: (res) => {
                if (res.cancel)
                    wx.request({
                        url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_GZ_State",
                        data: {
                            strUserID: app.globalData.userinfo['用户ID'],
                            strEmpID: e.detail.empid,
                            strState: "0",
                            strKey: "C1BC7666E5C74BD384196-AD1532102C1"
                        },
                        method: "POST",
                        dataType: "JSON",
                        success: (res) => {
                            var result = JSON.parse(JSON.parse(res.data).d);
                            if (result.code == "0") {
                                this.data.list.splice(e.detail.index, 1);
                                this.setData({
                                    list: this.data.list
                                })
                            }
                        }
                    })
            }
        })
    }
})