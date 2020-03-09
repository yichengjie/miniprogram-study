Page({
  onTap:function(event){
    // wx.navigateTo({
    //   url: '../posts/posts',
    // }) ;
    // wx.redirectTo({
    //   url: '../posts/posts',
    // }) ;
    wx.switchTab({
      url: '../posts/posts',
    })
  },
  onHide: function(){
    console.info("welcome page is on hide ") ;
  }
})