const app = getApp();

Component({
    properties: {
        image: String,
        empid: {
            type: String,
            value: '',
            observer: function(newVal, oldVal) {
                wx.request({
                    url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_GZ_State",
                    data: {
                        strEmpID: newVal,
                        strUserID: app.globalData.userinfo['用户ID'],
                        strKey: "C1BC7666E5C74BD384196-AD1532102C1"
                    },
                    method: "POST",
                    dataType: "JSON",
                    success: (res) => {
                        this.setData({
                            isFollow: JSON.parse(res.data).d > 0 ? true : false
                        })
                    }
                })
            }
        }
    },
    data: {
        isFollow: false
    },
    methods: {
        change: function(e) {
            wx.request({
                url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_GZ_State",
                data: {
                    strEmpID: this.data.empid,
                    strUserID: app.globalData.userinfo['用户ID'],
                    strState: this.data.isFollow ? '0' : '1',
                    strKey: "C1BC7666E5C74BD384196-AD1532102C1"
                },
                method: "POST",
                dataType: "JSON",
                success: (res) => {
                    if (JSON.parse(res.data).d) {
                        this.setData({
                            isFollow: !this.data.isFollow
                        })
                    }
                }
            })
        }
    }
})