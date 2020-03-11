var pageCommonBehavior = require('../page-common-behavior')

// components/hello/hello.js
Component({
   behaviors: [pageCommonBehavior],
   /**
    * 组件的属性列表
    */
   properties: {
      name: String,
      addr: String,
   },

   /**
    * 组件的初始数据
    */
   data: {

   },

   /**
    * 组件的方法列表
    */
   methods: {
      onInputChange: function(event) {
         let name = event.target.dataset.name;
         let value = event.detail.value;
         //this.setData({[name]: value});
         this.triggerEvent('customevent', {
            name,value
         }) 
      }
   }
})