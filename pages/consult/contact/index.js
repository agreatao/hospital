const app = getApp();

Page({
    data: {
        doctor: {},
        list: [],
        onContact: true,
        content: null,
        wH: 0,
        dH: 0,
        bH: 0
    },
    setMessageHeight: function() {
        wx.createSelectorQuery().select('#doctor').boundingClientRect((rect) => {
            this.setData({
                dH: rect.height
            })
        }).exec()
        wx.createSelectorQuery().select('.fix-bottom.' + (this.data.onContact ? 'contact' : 'complete')).boundingClientRect( (rect) => {
            this.setData({
                bH: rect.height
            })
        }).exec()
        this.setData({
            wH: app.globalData.device.height
        })
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
                    doctor: JSON.parse(JSON.parse(res.data).d)[0],
                    onContact: new Date() < new Date(JSON.parse(JSON.parse(res.data).d)[0]['结束时间'])
                })
                this.setMessageHeight();
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
    contentInput: function(e) {
        this.setData({
            content: e.detail.value
        })
    },
    contentConfirm: function(e) {
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_YSZX_LYSC",
            data: {
                strZXID: this.data.doctor['咨询流水ID'],
                strLYDX: 'H',
                strLYRID: app.globalData.userinfo['身份证号'],
                strNR: this.data.content,
                strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {
                var result = JSON.parse(JSON.parse(res.data).d);
                if (result.code === "0") {
                    this.data.list.push({
                        '头像': app.globalData.userinfo['头像'],
                        '内容': this.data.content,
                        '留言对象': 'H',
                        '留言ID': result['留言ID']
                    });
                    this.setData({
                        list: this.data.list,
                        content: null
                    });
                }
            }
        })
    }
})