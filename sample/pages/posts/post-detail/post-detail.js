// pages/posts/post-detail/post-detail.js
let postsData = require('../../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: -1,
    collected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let postId = options.id ;
    let postData = postsData.postList[postId] ;
    this.setData({ ...postData }) ;

    //从缓存中获取是否被收藏
    let postsCollected = wx.getStorageSync('posts_collected') ;
    if (postsCollected){
      let postCollected = postsCollected[postId];
      this.setData({collected: postCollected}) ;
    }else{
      postsCollected = {} ;
      postsCollected[postId] = false ;
      wx.setStorageSync('posts_collected', postsCollected) ;
    }
  },
  onCollectionTap: function(event){
    let nextCollected = !this.data.collected ;
    this.setData({
      collected: nextCollected
    }) ;

    //保存到storage中
    let postsCollected = wx.getStorageSync('posts_collected');
    postsCollected[this.data.postId] = nextCollected ;
    wx.setStorageSync('posts_collected', postsCollected);
  },
  onShareTap: function(event){
    
  }
})