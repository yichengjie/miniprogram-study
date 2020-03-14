//index.js
Page({
   data: {
      options: [{
         id: '001',
         name: '北京'
      }, {
         id: '002',
         name: '上海'
      }, {
         id: '003',
         name: '深圳'
      }],
      value1: ''
   },
   change(e) {
      let id = e.detail.id ;
      this.setData({ value1:id}) ;
   },
   onBtn1Tap: function(event){
      this.setData({value1: '002'}) ;
   },
   close: function(){
      // 关闭select
      this.selectComponent('#select1').close()
   }

})
