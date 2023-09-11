// pages/my-doctor/index.js
import { getLocalUserInfo } from "../../utils/storage";
import api from "../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    codePop: false,
    staticsInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData(
      {
        userInfo: getLocalUserInfo(),
      },
      () => {
        this.getMyStatics();
        this.getQRCode()
        console.log(this.data.userInfo)
      }
    );
  },

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
  getMyStatics() {
    const {
      userInfo: { id },
    } = this.data;
    if (id) {
      api.getMyStatics({ doctorId: id }).then((res) => {
        this.setData({
          staticsInfo: res.data,
        });
      });
    }
  },
  getQRCode() {
    const { userInfo, userInfo: { id } } = this.data
    if (id) {
      api.getUserCode({ id }).then(res => {
        this.setData({
          userInfo: {
            ...userInfo,
            qrCode: res.data
          }
        })
      })
    }
  },
  showMyCode() {
    const { userInfo: { id, qrCode } } = this.data
    if (id) {
      wx.previewImage({
        current: qrCode, // 当前显示图片的http链接
        urls: [qrCode] // 需要预览的图片http链接列表
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  },
  onClose() {
    this.setData({
      codePop: false
    })
  }
});
