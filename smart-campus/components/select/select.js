Component({
   properties: {
      options: {
         type: Array,
         value: []
      },
      defaultOption: {
         type: Object,
         value: {
            id: '',
            name: '请选择'
         }
      },
      key: {
         type: String,
         value: 'id'
      },
      text: {
         type: String,
         value: 'name'
      },
      value: {
         type: String,
         value: '' 
      }
   },
   data: {
      result: [],
      isShow: false,
      current: {}
   },
   methods: {
      optionTap(e) {
         let dataset = e.target.dataset
         //关闭select组件
         this.setData({isShow: false});
         // 调用父组件方法，并传参
         this.triggerEvent("change", { ...dataset })
      },
      openClose() {
         this.setData({
            isShow: !this.data.isShow
         })
      },
      // 此方法供父组件调用
      close() {
         this.setData({
            isShow: false
         })
      }
   },
   lifetimes: {
      attached() {
         // 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
         let result = parseSelectResult(this.data.options, this.data.key, this.data.text) ;
         this.setData({
            current: Object.assign({}, this.data.defaultOption),
            result: result
         }) ;
      }
   },
   observers: {
      'options': function (options) {
         let result = parseSelectResult(options, this.data.key, this.data.text);
         this.setData({
            result: result
         }) ;
      },
      'value': function (newValue){
         let newItem  = null ;
         for (let item of this.data.options){
            if((item[this.data.key] +'') == (newValue +'')){
               newItem = item ;
               break ;
            }
         } 
         let newCurrent = this.data.defaultOption ;
         if (newItem != null){
            let {[this.data.key]: id, [this.data.text]:name} = newItem ;
            newCurrent = { id, name } ;
         }
         //更新select选中项
         this.setData({current: newCurrent});
      }
   }
});

/**
 * 解析select组件的result数据
 */
function parseSelectResult(options, key, text) {
   let result = []
   for (let item of options) {
      let { [key]: id, [text]: name } = item;
      result.push({ id, name })
   }
   return result;
}