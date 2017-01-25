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
    console.log("onLoad");
  },

  onShow: function () {
    console.log("onShow");
    loadPostList(this, postDataKey, this.data.regionsIndex);
  },

  chooseCityChanged: function (e) {
    var _this = this;
    var regionsIndex = e.detail.value;
    this.setData({
      regionsIndex: regionsIndex
    })

    loadPostList(_this, postDataKey, regionsIndex);
  },

  onFabClick: function () {
    wx.navigateTo({
      url: '../newpost/newpost',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onPostItemClick: function (res) {
    var postId = res.currentTarget.dataset.id;
    console.log("index postId: ", postId);
    wx.navigateTo({
      url: '../detail/detail?id=' + postId,
      success: function (res) {
        // success
      }
    })
  }
});

function wxGetStorage(postDataKey, callback) {
  wx.getStorage({
    key: postDataKey,
    success: function (res) {
      if (callback) {
        var data = res.data;
        callback(data);
      }
    },
    fail: function () {
      console.log("getStorage fail");
    },
    complete: function () {
    }
  })
};

function loadPostList(_this, postDataKey, regionsIndex) {
    wxGetStorage(postDataKey, function (data) {
      var region = _this.data.regions[regionsIndex];
      var dummyPosts = [];
      if (regionsIndex == 0) {
        dummyPosts = data;
      } else {
        for (var i = 0; i < data.length; i++) {
          var postData = data[i];
          if (postData.region == region) {
            dummyPosts.push(postData);
          }
        }
      }

      _this.setData({
        dummyPosts: dummyPosts,
      })
      console.log(_this.data.dummyPosts);
    });
}
