// pages/service/index.js
Page({
    data: {
        inputValue: '',
        clearShow: false,
        buttonClick: false,
        disable: true,
        prpayment: null,
        cardid: null,
        patientId: null
    },
    onLoad: function(options) {
        var payment = JSON.parse(options.payment);
        var cardid = options.cardidzy;
        var patientId = options.patientId;
        this.setData({
            prpayment: payment,
            cardid: cardid,
            patientId: patientId
        })
    },
    listenerInput: function(e) {
        this.data.inputValue = e.detail.value;
        if (this.data.inputValue) {
            this.setData({
                clearShow: true,
                buttonClick: true,
                disable: false,
                inputValue: e.detail.value
            })
        } else {
            this.setData({
                clearShow: false,
                buttonClick: false,
                disable: true
            })
        }
    },
    clearInput: function(e) {
        this.setData({
            inputValue: '',
            clearShow: false,
            buttonClick: false,
            disable: true
        });
    },
    pushMoney: function(e) {
        var money = e.target.dataset.money;
        var cardid = e.target.dataset.cardid;
        var patientId = e.target.dataset.patientid;
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/SetHISZYCZ_DDSC",
            data: {
                Card_ID: cardid,
                CZJE: money,
                XM: getApp().globalData.userinfo["真实姓名"],
                strCZLX: "WX",
                strZYH: patientId,
                strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {

            }
        })
    }
})