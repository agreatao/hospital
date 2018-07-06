const app = getApp();

Page({
    data: {
        obj: {},
        list: [],
        onContact: true,
        inputValue: null
    },
    onLoad: function(options) {
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_ZXInfo",
            data: {
                strZXID: options['ID'],
                strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {
                this.setData({
                    obj: JSON.parse(JSON.parse(res.data).d)[0],
                    onContact: new Date() < new Date(JSON.parse(JSON.parse(res.data).d)[0]['结束时间'])
                })
            }
        });
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_ZXInfo_LYList",
            data: {
                strZXID: options['ID'],
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
    askInputConfirm: function(e) {
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_YSZX_LYSC",
            data: {
                strZXID: this.data.obj['咨询流水ID'],
                strLYDX: 'H',
                strLYRID: app.globalData.userinfo['身份证号'],
                strNR: e.detail.value,
                strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {
                var result = JSON.parse(JSON.parse(res.data).d);
                console.log(result);
                if (result.code === "0") {
                    this.data.list.push({
                        '头像': app.globalData.userinfo['头像'],
                        '内容': e.detail.value,
                        '留言对象': 'H',
                        '留言ID': result['留言ID']
                    });
                    this.setData({
                        list: this.data.list,
                        inputValue: null
                    });
                }
            }
        })
    }
})