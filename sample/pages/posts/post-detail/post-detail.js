// pages/posts/post-detail/post-detail.js
let postsData = require('../../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: -1,
    isPlayingMusic: false,
    collected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let postId = options.id;
    let postData = postsData.postList[postId];
    this.setData({ ...postData
    });

    //从缓存中获取是否被收藏
    let postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      let postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      });
    } else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  onCollectionTap: function(event) {
    //收藏变为未收藏，未收藏变为收藏
    let nextCollected = !this.data.collected;
    this.setData({
      collected: nextCollected
    });

    //保存到storage中
    let postsCollected = wx.getStorageSync('posts_collected');
    postsCollected[this.data.postId] = nextCollected;
    wx.setStorageSync('posts_collected', postsCollected);

    //用户反馈
    wx.showToast({
      title: nextCollected ? '收藏成功' : '取消收藏',
      icon: 'success'
    })
  },
  onShareTap: function(event) {
    let itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        //res.cancel 用户是不是点击了取消
        //res.tapIndex 数组元素的序号，从0开始
        if (!res.cancel) {
          wx.showModal({
            title: '用户' + itemList[res.tapIndex],
            content: '现在无法实现分享功能'
          })
        }
      }
    })
  },
  onMusicTap: function(event) {
    let nextIsPlayingMusic = !this.data.isPlayingMusic;
    this.setData({
      isPlayingMusic: nextIsPlayingMusic
    });

    //音乐播放
    let postData = postsData.postList[this.data.postId];
    let musicData = postData.music;

    if (nextIsPlayingMusic) {
      wx.playBackgroundAudio({
        dataUrl: musicData.url,
        title: musicData.title,
        coverImgUrl: musicData.coverImg
      })
    } else {
      wx.pauseBackgroundAudio();
    }
  }
})