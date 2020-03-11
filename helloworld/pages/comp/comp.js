// pages/comp/comp.js
Page({

   data: {
      name:'张三',
      addr: '北京'
   },

   onInputChange: function(event){
      let name = event.target.dataset.name ;
      let value = event.detail.value ;
      //console.info(name + " = " + value);
      this.setData({
         [name]: value
      }) ;
   },
   handleCustomEvent: function(event){
      let detail =  event.detail ;
      let name = detail.name ;
      let value = detail.value ;
      this.setData({[name]:value}) ;
   }
   
})