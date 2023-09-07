import { wxToast } from "../../utils/wx-api";
import api from '../../api/index'

// pages/seek-detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    refuseType: 0,
    refuseShow: false,
    allowErrorShow: false,
    options: { maxHeight: 100, minHeight: 50 },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    this.getSeekDetail(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() { },

  // pop关闭
  onClose() {
    this.setData({
      refuseShow: false,
      allowErrorShow: false
    });
  },

  // 接诊
  toChat() {
    wxToast.show({
      title: "跳转对话",
    });
    this.setData({
      allowErrorShow: true,
    });
  },

  // 忽略
  refuse() {
    this.setData({
      refuseShow: true,
    });
  },

  // 忽略原因切换
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      refuseType: name,
    });
  },

  // 忽略确认
  confirm() {
    const { refuseType, reason } = this.data;
    if (!refuseType) {
      wxToast.show({
        title: "请选择拒绝原因",
      });
    } else if (refuseType === '3' && !reason) {
      wxToast.show({
        title: "请填写拒绝原因",
      });
    } else {
      wxToast.show({
        title: "已忽略",
      })
    }
  },

  getSeekDetail(id) {
    api.getSeekDetail({}).then(res => {

    })
  }
});
