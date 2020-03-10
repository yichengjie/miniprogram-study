function convertToStarsArray(stars) {
   let num = stars.toString().substring(0, 1);
   var array = [];
   for (let i = 0; i < 5; i++) {
      if (i <= num) {
         array.push(1);
      } else {
         array.push(0);
      }
   }
   return array;
}

function http(url, callback) {
   wx.showNavigationBarLoading();
   wx.request({
      url: url,
      method: 'GET',
      header: {
         "Content-Type": "application/text"
      },
      success: res => {
         wx.hideNavigationBarLoading();
         callback(res.data);
      },
      fail: (err) => {
         wx.hideNavigationBarLoading();
         console.error(err);
      }
   });
}

module.exports = {
   convertToStarsArray,
   http
}