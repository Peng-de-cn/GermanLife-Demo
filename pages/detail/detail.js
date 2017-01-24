var postDataKey = "PostDataKey";
var postData = {};

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
    replies: [],
    replyInputValue: "",
    inputValue: "",
    mapHidden: true,
  },
  onLoad: function (options) {
    var _this = this;
    wxGetStorage(postDataKey, function (data) {
      postData = data;
      if (data.street || data.city) {
        _this.setData({
          mapHidden: false
        });
        var address = data.street + " " + data.city;
        console.log("address: ", address);

        wxRequest(address, function (data) {
          var lat = data.results[0].geometry.location.lat;
          var lng = data.results[0].geometry.location.lng;
          _this.setData({
            userIcon: postData.userIcon,
            userName: postData.userName,
            title: postData.title,
            content: postData.content,
            replies: postData.replies,
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
      } else {
        _this.setData({
          mapHidden: true
        });
      }
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

  bindInputSubmit: function (e) {
    var value = e.detail.value;
    var replies = this.data.replies;
    console.log(replies);
    if (replies) {
      replies.push(value.reply);
    } else {
      replies = [value.reply];
    }

    this.setData({
      replies: replies,
      replyInputValue: "",
    });
    postData.replies = replies;
    console.log(postData);
    wx.setStorage({ key: postDataKey, data: postData });
  },

  onInputChange: function (e) {
    console.log(e);
    this.setData({
      inputValue: e.detail.value
    });
  },

  onReplyClick: function (e) {
    var name = "@" + e.currentTarget.dataset.name + " ";
    this.setData({
      replyInputValue: name + this.data.inputValue,
    });

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

