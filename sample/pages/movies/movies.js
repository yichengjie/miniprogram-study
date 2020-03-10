// pages/movies/movies.js
let util = require('../../utils/util.js');
let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: [],
        top250: [],
        comingSoon: [],
        searchMovies: [],
        searchPannelShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //1. 获取正在热映的电影：http://t.yushu.im/v2/movie/in_theaters
        //2. 获取电影Top250：http://t.yushu.im/v2/movie/top250
        //3. 获取即将上映电影：http://t.yushu.im/v2/movie/coming_soon
        ////////////////////////////////////////////////////////////////
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
        this.getMovieListData(doubanBase + inTheatersUrl, 'inTheaters');
        this.getMovieListData(doubanBase + top250Url, 'top250');
        this.getMovieListData(doubanBase + comingSoonUrl, 'comingSoon');
    },

    //获取电影列表
    getMovieListData: function (url, type) {
        wx.request({
            url: url,
            method: 'GET',
            header: {
                "Content-Type": "application/text"
            },
            success: res => {
                //如果不是搜索电影则取前三条记录
                let subjects = res.data.subjects ;
                if(type !== "searchMovies"){
                    subjects = this.getFirstThreeData(subjects) ;
                }
                this.processDoubanData(subjects, type);
            },
            fail: (err) => {
                console.error(err);
            }
        });
    },
    
    getFirstThreeData: function(list){
        let retList = [];
        if (list.length > 3) {
            retList = list.slice(0, 3)
        } else {
            retList = list;
        }
        return retList ;
    },

    processDoubanData: function (subjects, type) {
        var movies = [];
        for (let subject of subjects) {
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
            movies.push(tmp);
        }
        this.setData({
            [type]: movies
        });
    },
    onMoreTap: function (event) {
        let type = event.currentTarget.dataset.type;
        console.info('type : ', type);
        //点击c查看更多
        wx.navigateTo({
            url: './more-movie/more-movie?type=' + type,
        })
    },
    onBindFocus: function (event) {
        console.info('onBindFocus');
        this.setData({
            searchPannelShow: true
        });
    },
    onBindBlur: function (event) {
        let text = event.detail.value;
         //https://douban.uieee.com/v2/movie/search
        //apikey=0df993c66c0c636e29ecbb5344252a4a
        if(text != ''){
            let url = app.globalData.doubanBase + `/v2/movie/search?q=${text}`;
            this.getMovieListData(url, 'searchMovies');
        }
    },
    onCancalImgTap: function (event) {
        this.setData({
            searchPannelShow: false,
            searchMovies:[]
        });
    },
    onMovieTap: function(event){
        let movieid = event.currentTarget.dataset.movieid ;
        wx.navigateTo({
            url: `./movie-detail/movie-detail?movieid=${movieid}` 
        }) ;
    }
})