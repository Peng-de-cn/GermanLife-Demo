var app = getApp()


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
    app.getUserInfo(function (userInfo) {
      app.globalData.postData = {
        image: userInfo.avatarUrl,
        title: "租房子测试",
        replies: "8",
      }

      var posts = [];

      for (var i = 0; i < 20; i++) {
         posts.unshift(app.globalData.postData);
      }

      _this.setData({
        userInfo: userInfo,
        dummyPosts: posts
      })
    })
  },

  chooseCityChanged: function (e) {
    this.setData({
      regionsIndex: e.detail.value
    })

  },

  onFabClick: function() {
      wx.navigateTo({
        url: '../details/details',
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
