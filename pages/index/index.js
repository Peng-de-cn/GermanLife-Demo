var app = getApp()
var postDataKey = "PostDataKey";

Page({
  data: {
    regions: ["所有地区",
      "Baden-Württemberg",
      "Bayern",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hessen",
      "Mecklenburg-Vorpommern",
      "Niedersachsen",
      "Nordrhein-Westfalen",
      "Rheinland-Pfalz",
      "Saarland",
      "Sachsen",
      "Sachsen-Anhalt",
      "Schleswig-Holstein",
      "Thüringen"],
    regionsIndex: 0,
    userInfo: {},
    dummyPosts: [],

  },

  onLoad: function () {
    var _this = this
    // app.getUserInfo(function (userInfo) {
    //   app.globalData.postData = {
    //     image: userInfo.avatarUrl,
    //     title: "租房子测试",
    //     replies: "8",
    //   }

    //   var posts = [];

    //   for (var i = 0; i < 20; i++) {
    //      posts.unshift(app.globalData.postData);
    //   }

    //   _this.setData({
    //     userInfo: userInfo,
    //     dummyPosts: posts
    //   })
    // })

       wx.getStorage({
        key: postDataKey,
        success: function(res){
          console.log(res.data)
          var posts = [];
          posts.unshift(res.data);
           _this.setData({
        dummyPosts: posts
      })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },

  chooseCityChanged: function (e) {
    this.setData({
      regionsIndex: e.detail.value
    })

  },

  onFabClick: function() {
      wx.navigateTo({
        url: '../newpost/newpost',
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  }
})
