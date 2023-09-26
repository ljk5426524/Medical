// pages/home-doctor/index.js
import api from "../../api/index";
import { getLocalUserInfo } from "../../utils/storage";
import { getTimeShow } from "../../utils/util";
let time = null
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
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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
        this.getMsgList()
        time = setInterval(() => {
          this.getMsgList()
        }, 5000)
        this.getHomeStatics()
      }
    );
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    time && clearInterval(time)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    time && clearInterval(time)
  },

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

  onStateChange({ detail }) {
    console.log(detail)
    const { userInfo: { id } } = this.data
    this.setData({ doctorState: detail ? 0 : 1 });
    api.editReceivePatient({
      doctorId: id,
      statue: detail ? 0 : 1
    }).then(res => {

    })
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
          current: 0,
          size: 100
        })
        .then((res) => {
          this.setData({
            msgList: res.data.records.map((i) => {
              return {
                ...i,
                time: getTimeShow(i.updateTime.split('-').join('/')),
              };
            }),
          });
        });
    }
  },
  // 接诊详情
  toSeekDetail(e) {
    const { oid, oiid } = e.currentTarget.dataset;
    time && clearInterval(time)
    wx.navigateTo({
      url: `/pages/seek-detail/index?oId=${oid}&oiId=${oiid}`,
    });
  },
  toChat(e) {
    const { tuid, oid, pname, cvid, state, msgid } = e.currentTarget.dataset
    if ([0, 4, 5, 9].includes(+state)) return false
    time && clearInterval(time)
    if (+state === 2) {
      // 问诊中 带入聊天所需数据
      wx.navigateTo({
        url: `/pages/chat/chat?tuId=${tuid}&oId=${oid}&tuName=${pname}&state=${state}`
      })
    } else if (+state === 3 || +state === 6) {
      // 订单结束 不可聊天直接获取聊天记录
      wx.navigateTo({
        url: `/pages/chat/chat?tuId=${tuid}&tuName=${pname}&msgId=${msgid}&state=${state}`
      })
    }
  },
});
