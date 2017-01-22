var postDataKey = "PostDataKey";

Page({
  data: {
    userIcon: "",
    userName: "",
    title: "",
    content: "",
    address: "",
    city: "",
    latitude: "",
    longitude: "",
    markers: [],
    replies: []
  },
  onLoad: function (options) {
    var _this = this;
    wxGetStorage(postDataKey, function (data) {
      var userData = data;
      var address = data.street + " " + data.city;
      console.log("address: ", address);

      wxRequest(address, function (data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        _this.setData({
          userIcon: userData.userIcon,
          userName: userData.userName,
          title: userData.title,
          content: userData.content,
          address: address,
          latitude: lat,
          longitude: lng,
          markers: [{
            id: 0,
            latitude: lat,
            longitude: lng,
          }]
        })
      });
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  controltap: function (res) {
    console.log("controltap: ", res);
  },

  onOpenMapPageClick: function (res) {
        console.log("onOpenMapPageClick: ", res);
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: 28,
      name: this.data.address
    })
  }, 

  bindInputSubmit: function(res) {
     console.log(res.detail.value);
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
      console.log("getStorage fail: ", res);
    },
    complete: function () {
    }
  })
};

function wxRequest(data, callback) {
  wx.request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCu2UEmbQ-KuH1FQQqLV4_dhyJy5h7rzAo',
    data: { address: data },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      console.log(res);
      console.log("google map: ", res.data.results);
      if (callback) {
        var data = res.data;
        callback(data);
      }
    },
    fail: function (res) {
      console.log("google map fail: ", res);
    },
    complete: function (res) {
    }
  })
};

