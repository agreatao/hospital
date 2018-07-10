const app = getApp();

Page({
    data: {
        first: [{
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }],
        firstPoint: 0,
        second: [{
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }],
        secondPoint: 0,
        third: [{
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }, {
            image: '/assets/consult/star.png'
        }],
        thirdPoint: 0,
        content: ""
    },
    onLoad: function(options) {
        this.setData({
            id: options['ID']
        })
    },
    result: function(e) {
        var key = e.currentTarget.dataset.key;
        for (var i = 0; i < this.data[key].length; i++) {
            if (i <= e.currentTarget.dataset.index) {
                this.data[key][i].image = "/assets/consult/star-active.png";
            } else {
                this.data[key][i].image = "/assets/consult/star.png";
            }
        }
        this.setData({
            [key]: this.data[key],
            [key + 'Point']: e.currentTarget.dataset.index + 1
        })
    },
    contentInput: function(e) {
        this.setData({
            content: e.detail.value
        })
    },
    submit: function(e) {
        wx.request({
            url: "https://www.dszejt.com/ws/ws_xcx.asmx/Set_XCX_YSZX_PJData",
            data: {
                strZXID: this.data.id,
                strPJRID: app.globalData.userinfo['用户ID'],
                strPJDF: (this.data.firstPoint + this.data.secondPoint + this.data.thirdPoint) / 3,
                strPJNR: this.data.content,
                strKey: "C1BC7666E5C74BD384196-AD1532102C1"
            },
            method: "POST",
            dataType: "JSON",
            success: (res) => {
                if (JSON.parse(JSON.parse(res.data).d).code == 0) {
                    wx.showToast({
                        title: '评价成功'
                    });
                    wx.switchTab({
                        url: '/pages/consult/index',
                    })
                }
            }
        })
    }
})