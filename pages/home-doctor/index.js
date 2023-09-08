// pages/home-doctor/index.js
import api from "../../api/index";
import { getLocalUserInfo } from "../../utils/storage";
import { getTimeShow } from "../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    staticsInfo: {},
    doctorState: 0,
    msgList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = getLocalUserInfo();
    const { state, flag } = userInfo;
    this.setData(
      {
        userInfo,
        doctorState: +state, // 0,不接诊,1,开始接诊
        isChecking: +flag === 5, // 用户状态，0.启用；1.已删除；2.禁用,3.未认证,4:认证未通过 5:认证中 6:已认证
      },
      () => {
        this.getMsgList();
        this.getHomeStatics();
      }
    );
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  onStateChange({ detail }) {
    this.setData({ checked: detail });
  },

  getHomeStatics() {
    const {
      userInfo: { id },
    } = this.data;
    if (id) {
      api
        .getHomeStatics({
          doctorId: id,
        })
        .then((res) => {
          this.setData({
            staticsInfo: res.data,
          });
        });
    }
  },
  getMsgList() {
    const {
      userInfo: { id },
    } = this.data;
    if (id) {
      api
        .getMsgList({
          userId: id,
          appId: 2,
        })
        .then((res) => {
          this.setData({
            msgList: res.data.records.map((i) => {
              return {
                ...i,
                time: getTimeShow(i.updateTime),
              };
            }),
          });
        });
    }
  },
  // 接诊详情
  toSeekDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/seek-detail/index?id=${id}`,
    });
  },
});
