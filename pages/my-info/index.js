// pages/my-info/index.js
import api from "../../api/index";
import { wxToast } from "../../utils/wx-api";
import { getLocalUserInfo, saveLocalUserInfo } from "../../utils/storage";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    popType: 1, // 1:性别 2:婚育
    sexColumns: ["男", "女"],
    ageColumns: new Array(121).fill(0).map((v, i) => i),
    marryColumns: [
      "未婚未育",
      "未婚已育",
      "已婚未育",
      "已婚已育",
      "离婚未育",
      "离婚已育",
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loginInfo: getLocalUserInfo(),
      userInfo: { ...getLocalUserInfo(), sex: getLocalUserInfo().sex === '1' ? '男' : '女' },
    }, () => {
      this.getQRCode()
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

  // 更换头像
  changeAvator() {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        const MAX_UPLOAD_MB = 10;
        const quality = 20;

        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        const tempFilesSize = res.tempFiles[0].size;

        // 最大图片10M
        if (tempFilesSize > MAX_UPLOAD_MB * 1024 * 1024) {
          wxToast.show({
            title: `上传的头像不能大于${MAX_UPLOAD_MB}M!`,
          });
        }

        wx.compressImage({
          src: tempFilePaths[0],
          quality,
          success: (res) => {
            this.uploadFile(res.tempFilePath);
          },
          fail: (res) => {
            // wx.compressImage 不支持 本地开发模式
            // 也不支持 非 jpg 图片
            this.uploadFile(tempFilePaths[0]);
          },
        });
      },
    });
  },

  // 文件上传
  uploadFile(filePath) {
    api
      .uploadFile({
        filePath,
        name: "media",
      })
      .then((res) => {
        this.setData({
          userInfo: {
            ...this.data.userInfo,
            headImage: res.data.media_url,
          },
        });
      });
  },
  sexSel() {
    this.setData({
      popType: 1,
      popShow: true,
    });
  },
  marrySel() {
    this.setData({
      popType: 2,
      popShow: true,
    });
  },
  ageSel() {
    this.setData({
      popType: 0,
      popShow: true,
    });
  },
  onClose() {
    this.setData({
      popShow: false,
    });
  },
  onSexChange(e) {
    const { value } = e.detail;
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        sex: value,
      },
    });
  },
  onMarryChange(e) {
    const { value } = e.detail;
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        marry: value,
      },
    });
  },
  onAgeChange(e) {
    const { value } = e.detail;
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        age: value,
      },
    });
  },
  // 输入昵称、学生姓名、班主任姓名
  changeField(event) {
    const {
      detail,
      currentTarget: {
        dataset: { type },
      },
    } = event;

    this.setData({
      userInfo: {
        ...this.data.userInfo,
        [type]: detail,
      },
    });
  },
  changePhone() {
    const { userInfo, username, cardNum, age } = this.data;
    console.log(userInfo, username, cardNum, age);
  },
  submit() {
    const {
      userInfo: { mobile, age, name, headImage, sex, marry, idcard },
      loginInfo: { id },
      loginInfo,
    } = this.data;
    api
      .editUserInfo({
        mobile,
        age,
        name,
        headImage,
        sex: sex === "男" ? "1" : "2",
        marry,
        idcard,
        id,
      })
      .then((res) => {
        saveLocalUserInfo({
          ...loginInfo,
          mobile,
          age,
          name,
          headImage,
          sex: sex === "男" ? "1" : "2",
          marry,
          idcard,
        });
        wxToast.show({
          title: "更新成功",
          done: () => {
            wx.navigateBack();
          },
        });
      });
  },
  getQRCode() {
    const { userInfo, userInfo: { id } } = this.data
    api.getUserCode({ id }).then(res => {
      this.setData({
        userInfo: {
          ...userInfo,
          qrCode: res.data
        }
      })
    })
  },
  previewCode() {
    const { userInfo: { qrCode } } = this.data
    wx.previewImage({
      current: qrCode, // 当前显示图片的http链接
      urls: [qrCode] // 需要预览的图片http链接列表
    })
  }
});
