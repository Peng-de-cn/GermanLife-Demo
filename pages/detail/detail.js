var postDataKey = "PostDataKey";
var postDetailDataKey = "postDetailDataKey";
var postData = {};
var postDetailData = {};
var postID = "";

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
    replyData: {
      postID: "",
      replies: [],
    },
    repliesData: [],
    replyInputValue: "",
    inputValue: "",
    postReplyIndex: -1,
  },

  onLoad: function (options) {
    var _this = this;
    postID = options.id;

    wxGetStorage(postDataKey, function (data) {

      for (var i = 0; i < data.length; i++) {
        if (postID == data[i].postID) {
          postData = data[i];
        }
      }
      var address = "";

      if (postData.city) {
        address = postData.street + " " + postData.city;
      } else {
        address = "Germany";
      }

      wxRequest(address, function (data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        if (!postData.city) {
          address = "很可惜，楼主没有给出地址";
        }
        _this.setData({
          userIcon: postData.userIcon,
          userName: postData.userName,
          title: postData.title,
          content: postData.content,
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

    wxGetStorage(postDetailDataKey, function (data) {
      console.log(data);
      postDetailData = data;
      _this.setData({
        repliesData: postDetailData,
      });

      for (var i = 0; i < data.length; i++) {
        if (postID == data[i].postID) {
          _this.setData({
            replies: data[i].replies,
            postReplyIndex: i,
          });
        }
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
    if (replies) {
      replies.push(value.reply);
    } else {
      replies = [value.reply];
    }

    var replyData = this.data.replyData;
    replyData.postID = postID;
    replyData.replies = replies;

    var repliesData = this.data.repliesData;

    if (this.data.postReplyIndex == -1) {
      repliesData.push(replyData);
    } else {
      repliesData.splice(this.data.postReplyIndex, 1, replyData);
    }

    this.setData({
      replies: replies,
      repliesData: repliesData,
      replyInputValue: "",
      inputValue: "",
    });

    wx.setStorage({ key: postDetailDataKey, data: this.data.repliesData });
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
  console.log("google data: ", data);
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

