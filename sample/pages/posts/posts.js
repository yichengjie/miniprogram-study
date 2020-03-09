let postsData = require('../../data/posts-data.js') ;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ posts: postsData.postList }) ;
  },
  onPostTap: function(event){
    let postId = event.currentTarget.dataset.postid ;
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postId,
    }) ;
  },
  onSwiperTap: function(event){
    //target与currentTarget的区别
    //target指的是当前点击的组件，和currentTarget指的是事件捕获的组件
    //target这里指的是image,而currentTarget指的是swiper
    let postId = event.target.dataset.postid ;
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postId,
    }) ;
    
  }
})