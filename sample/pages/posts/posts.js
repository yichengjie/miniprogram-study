// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let posts = [
      {
        author_img: '/images/avatar/1.png',
        date: 'Sep 18 2016',
        title: '正是虾肥蟹壮时',
        post_img: '/images/post/crab.png',
        content: '世界卫生组织6日公布的最新数据显示，截至欧洲中部时间6日10时（北京时间6日17时）',
        view_num: '112',
        collect_num: '96'
      },
      {
        author_img: '/images/avatar/2.png',
        date: 'Sep 25 2016',
        title: '比利.林恩的中场故事',
        post_img: '/images/post/bl.png',
        content: '3月5日的外交部例行记者会上，外交部新闻发言人首次对印度扣留中国“大翠云”号货轮货物做出了正式回应。',
        view_num: '112',
        collect_num: '96'
      }
    ] ;
    this.setData({ posts }) ;
  }
})