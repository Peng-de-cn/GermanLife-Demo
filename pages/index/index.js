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
    var _this = this
    wxGetStorage(postDataKey, function (data) {
      _this.setData({
        dummyPosts: data,
      })
      console.log(_this.data.dummyPosts);
    });
  },

  chooseCityChanged: function (e) {
    this.setData({
      regionsIndex: e.detail.value
    })

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
