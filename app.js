App({
    globalData: {
        userinfo: null,
        device: null
    },
    onLaunch: function() {
        let device = wx.getSystemInfoSync();
        this.globalData.device = {
            height: device.windowHeight,
            width: device.windowWidth
        }
    }
})