Component({
    properties: {
        listData: Array
    },
    methods: {
        longPress: function(e) {
            this.triggerEvent("deletelove", {
                empid: e.target.dataset.id,
                index: e.target.dataset.index
            }, {});
        },
        navTo: function(e) {
            wx.navigateTo({
                url: "/pages/consult/doctor/index?ID=" + e.target.dataset.id
            })
        }
    }
})