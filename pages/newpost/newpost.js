var app = getApp()

var postDataKey = "PostDataKey";
var postData = {
    userIcon: "",
    userName: "",
    type: "",
    street: "",
    city: "",
    region: "",
    title: "",
    content: "",
    images: [],
};

Page({
    data: {
        radioItems: [
            { name: '出租', value: '出租', checked: 'true' },
            { name: '求租', value: '求租' }
        ],
        regions: ["点击选择地区",
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
        imageCount: 9,
        imagePath: [],
        hideAddIcon: false,
        textLength: 0,
        buttonDisabled: true,
    },

    onLoad: function () {
        var _this = this
        app.getUserInfo(function (userInfo) {
            postData.userIcon = userInfo.avatarUrl,
            postData.userName = userInfo.nickName
        })
    },

    chooseRegionChanged: function (e) {
        var index = e.detail.value;
        var disabled = this.data.textLength == 0 || index == 0;
        this.setData({
            regionsIndex: index,
            buttonDisabled: disabled
        })

    },

    textareaBindInput: function (e) {
        var length = e.detail.value.length;
        var disabled = length == 0 || this.data.regionsIndex == 0;
        console.log(disabled);
        this.setData({
            textLength: length,
            buttonDisabled: disabled
        })
    },

    uploadImage: function () {
        var _this = this;
        wx.chooseImage({
            count: _this.data.imageCount, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function (res) {
                var tmpImagePath = _this.data.imagePath;
                var tempFilePaths = res.tempFilePaths;
                tmpImagePath = tmpImagePath.concat(tempFilePaths);
                var tmpHideAddIcon = false;
                var tmpImageCount = 9 - res.tempFilePaths.length;
                if (tmpImageCount == 0) {
                    tmpHideAddIcon = true;
                }

                _this.setData({
                    imagePath: tmpImagePath,
                    imageCount: tmpImageCount,
                    hideAddIcon: tmpHideAddIcon,
                })

            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },

    deleteImage: function (e) {
        var tmpImagePath = this.data.imagePath;
        tmpImagePath.splice(e.target.dataset.index, 1);
        var tmpHideAddIcon = false;
        var tmpImageCount = 9 - tmpImagePath.length;
        if (tmpImageCount == 0) {
            tmpHideAddIcon = true;
        }
        this.setData({
            imagePath: tmpImagePath,
            imageCount: tmpImageCount,
            hideAddIcon: tmpHideAddIcon,
        })
    },

    formSubmit: function (e) {
        var value = e.detail.value;
        postData.type = value.type;
        postData.title = value.title;
        postData.street = value.street;
        postData.city = value.city;
        postData.region = this.data.regions[value.region];
        postData.content = value.content;
        postData.images = this.data.imagePath;
        console.log("test: ", postData);

        wx.setStorage({ key: postDataKey, data: postData });
        // wx.getStorage({
        //     key: postDataKey,
        //     success: function (res) {
        //         console.log(res.data)
        //     }
        // })

        wx.navigateBack({
            url: '../index/index',
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

})