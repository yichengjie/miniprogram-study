// pages/movies/movies.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //1. 获取正在热映的电影：https://douban.uieee.com/v2/movie/in_theaters
    //2. 获取电影Top250：https://douban.uieee.com/v2/movie/top250
    //3. 获取即将上映电影：https://douban.uieee.com/v2/movie/coming_soon
    //访问参数：
    //start: 数据的开始项
    //count：单页条数
    let doubanBase = app.globalData.doubanBase;
    var inTheatersUrl = '/v2/movie/in_theaters';
    var top250Url = '/v2/movie/top250';
    let comingSoonUrl = '/v2/movie/coming_soon';
    this.getMovieListData(doubanBase + top250Url) ;
  },

  //获取电影列表
  getMovieListData: function (url) {
    wx.request({
      url: url,
      data:{

      },
      success: res => {
        this.processDoubanData(res.data) ;
      },
      fail: (err) => {
        console.error(err);
      }
    });
  },

  processDoubanData: function(data){
     var movies = [] ;
     let subjects = [] ;
    if (data.subjects.length >3){
      subjects = data.subjects.slice(0, 3)
    }else{
      subjects = data.subjects ;
    }

    for (let subject of subjects){
         console.info(subject) ;
         var title = subject.title ;
         if(title >= 6){
            title = title.substring(0,6) +"..." ;
         }
         var tmp = {
           title,
           avrerage: subject.rating.average,
           movieId: subject.id
         } ;
         movies.push(tmp) ;
     }
     this.setData({
       movies
     }) ;
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})