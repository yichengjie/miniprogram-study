// pages/movies/more-movie/more-movie.js
let util = require('../../../utils/util.js');

let app = getApp();
let typeMap = {
   "in_theaters": "正在热映",
   "top250": "豆瓣Top250",
   "coming_soon": "即将上映"
};

Page({

   /**
    * 页面的初始数据
    */
   data: {
      type: '',
      navigateTitle: '',
      movies: []
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      //start: 数据的开始项
      //count：单页条数
      let type = options.type;
      let title = typeMap[type];
      this.setData({
         type,
         navigateTitle: title
      });
      //加载电影列表
      this.getMovieListData(type);
   },
   onReady: function() {
      wx.setNavigationBarTitle({
         title: this.data.navigateTitle
      })
   },
   //滚动到底部加载新数据
   onScrolltolower: function(event) {
      this.getMovieListData(this.data.type);
   },
   //获取电影列表
   getMovieListData: function(type) {
      let doubanBase = app.globalData.doubanBase;
      let start = this.data.movies.length;
      var url = `${doubanBase}/v2/movie/${type}?start=${start}&count=10`;
      util.http(url, this.processDoubanData);
   },
   processDoubanData: function(data) {
      var newMovies = [];
      for (let subject of data.subjects) {
         let tmp = this.parseMovieData(subject);
         newMovies.push(tmp);
      }
      let movies = this.data.movies.concat(newMovies);
      //将数据保存起来
      this.setData({
         movies
      });
   },
   //解析一条电影数据
   parseMovieData(subject) {
      var title = subject.title;
      if (title.length >= 6) {
         title = title.substring(0, 6) + "...";
      }
      let stars = util.convertToStarsArray(subject.rating.stars);
      let tmp = {
         title,
         coverageUrl: subject.images.large,
         avrerage: subject.rating.average,
         movieId: subject.id,
         stars
      };
      return tmp;
   }

})