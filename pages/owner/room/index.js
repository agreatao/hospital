// pages/service/index.js
Page({
  data: {
    inputValue: '',
    clearShow: false,
    buttonClick:false,
    disable:true
  },
  listenerInput: function (e) {
    this.data.inputValue = e.detail.value;
    if (this.data.inputValue){
      this.setData({
        clearShow: true,
        buttonClick:true,
        disable: false
      })
    }else{
      this.setData({
        clearShow: false,
        buttonClick: false,
        disable:true 
      })
    }
  },
  clearInput:function(e){
    this.setData({
      inputValue: '',
      clearShow: false,
      buttonClick: false,
      disable: true 
    });
  }
})