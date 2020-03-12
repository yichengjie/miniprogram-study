import initDatepicker, {getSelectedDay, showDatepicker, closeDatepicker,
   enableArea, jump, setTodoLabels} from '../../templates/datepicker/index';
// ,// enableDays,
const conf = {
   onShow: function () {
      initDatepicker({
         /**
          * 点击日期后执行的事件
          * @param { object } currentSelect 当前点击的日期
          */
         afterTapDay: currentSelect => {
            console.log('当前点击的日期', currentSelect);
            console.log('getSelectedDay方法', getSelectedDay());
            const { year, month, day } = currentSelect;
            this.setData({
               selectedValue: `${year}-${month}-${day}`
            });
            closeDatepicker() ;
         }
      });
   },
   /**
    * 跳转至今天
    */
   callDatepicker(e) {
      const { value } = e.detail;
      showDatepicker(value);
   },

   /**
    * 当输入日期时
    * @param {object} e  事件对象
    */
   onInputDate(e) {
      this.inputTimer && clearTimeout(this.inputTimer);
      this.inputTimer = setTimeout(() => {
         const v = e.detail.value;
         const _v = (v && v.split('-')) || [];
         const RegExpYear = /^\d{4}$/;
         const RegExpMonth = /^(([0]?[1-9])|([1][0-2]))$/;
         const RegExpDay = /^(([0]?[1-9])|([1-2][0-9])|(3[0-1]))$/;
         if (_v && _v.length === 3) {
            if (
               RegExpYear.test(_v[0]) &&
               RegExpMonth.test(_v[1]) &&
               RegExpDay.test(_v[2])
            ) {
               jump(+_v[0], +_v[1], +_v[2]);
            }
         }
      }, 500);
   }
};
Page(conf);