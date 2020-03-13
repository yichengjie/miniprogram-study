//index.js
Page({
   data: {
      options: [{
         city_id: '001',
         city_name: '北京'
      }, {
         city_id: '002',
         city_name: '上海'
      }, {
         city_id: '003',
         city_name: '深圳'
      }],
      value1: ''
   },
   change(e) {
      console.info(e.detail) ;
   },
   onBtn1Tap: function(event){
      let options = [{
         city_id: '001',
         city_name: '北京'
      }, {
         city_id: '002',
         city_name: '上海'
      }] ;
      this.setData({
         options,
         value1: '002'
      }) ;
    
   }

})
