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
    })
  }
})