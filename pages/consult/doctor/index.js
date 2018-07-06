const app = getApp();

Page({
    data: {
        obj: null,
        list: null
    },
    onLoad: function(options) {
        this.setData({
            empID: options["ID"]
        });
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_YSInfo",
            data: {
                strEmpID: options['ID'],
                strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {
                this.setData({
                    obj: JSON.parse(JSON.parse(res.data).d)[0]
                })
            }
        });
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Get_XCX_YSZX_PJList",
            data: {
                strEmpID: options['ID'],
                strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {
                this.setData({
                    list: JSON.parse(JSON.parse(res.data).d)
                })
            }
        });
    },
    submit: function(e) {
        wx.showModal({
            title: '立即支付，即可获得医生专业的解答。',
            content: '有效时限：支付成功后24小时',
            cancelText: '取消支付',
            confirmText: '确认支付',
            confirmColor: '#FF4F29',
            success: (res) => {
                if (res.confirm) {
                    wx.request({
                        url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_YSZX_DDSC",
                        data: {
                            strEmpID: this.data.obj["医生ID"],
                            strSFZH: app.globalData.userinfo['身份证号'],
                            XMNC: app.globalData.userinfo['真实姓名'] || app.globalData.userinfo["昵称"],
                            strJG: this.data.obj['价格'],
                            strKey: "C1BC7666E5C74BD384196-AD1532102C1"
                        },
                        method: "POST",
                        dataType: "JSON",
                        success: (res) => {
                            var data = JSON.parse(JSON.parse(res.data).d);
                            // TODO 微信支付
                            // 支付成功
                            wx.request({
                                url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_YSZX_DDQR",
                                data: {
                                    strZXID: data['订单流水'],
                                    DZID: '3241312415', // 支付成功返回订单编号
                                    strKey: "C1BC7666E5C74BD384196-AD1532102C1"
                                },
                                method: "POST",
                                dataType: "JSON",
                                success: (res) => {
                                    var data = JSON.parse(JSON.parse(res.data).d);
                                    console.log(data);
                                    // TODO 微信支付
                                    // 支付成功
                                    if (data.code == 0) {
                                        wx.navigateTo({
                                            url: '/pages/consult/ask/index?ID=' + data['订单流水'],
                                        })
                                    } else {
                                        wx.showToast({
                                            title: '支付失败'
                                        })
                                    }
                                }
                            });



                        }
                    });
                }
            }
        })
    }
})


function order() {
    wx.request({
        url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
        data: {
            appid: 'wx34a4ad9639c830e7', // 小程序ID
            mch_id: '', // 商户号
            nonce_str: '', // 随机字符串
            sign: '', // 签名
            body: "独山子人民医院——付费咨询",
            out_trade_no: '', // 商户订单号
            total_fee: '', // 订单总金额
            spbill_create_ip: '', // 终端IP
            notify_url: '', // 通信地址
            trade_type: 'JSAPI'
        },
        method: "POST",
        dataType: "JSON",
        success: (res) => {
            console.log(res);
        }
    });
}