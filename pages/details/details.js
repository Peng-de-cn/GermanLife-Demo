Page({
    data: {
        imageCount: 9,
        imagePath: [],
        hideAddIcon: false,
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


    }

})