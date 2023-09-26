// pages/patient-detail/index.js
import api from "../../api/index";
import { getLocalUserInfo } from '../../utils/storage'
import { getTimeShow } from "../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonClientRect: wx.getMenuButtonBoundingClientRect(),
    patientDetail: {},
    recordList: {},
    recordListStr: '',
    originRecordList: [],
    patientId: null,
    tabActive: 1,
    msgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options;
    this.getPatientDetail(id);
    this.getPatientRecordList(id);
    this.setData({
      patientId: id,
      userInfo: getLocalUserInfo(),
    }, () => {
      this.getChatList()
    })
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

  getPatientDetail(id = 63) {
    api.getPatientDetail({ id }).then((res) => {
      this.setData({
        patientDetail: res.data,
      });
    });
  },
  getPatientRecordList(id = 63) {
    api
      .getPatientRecordList({ current: 1, userId: id, size: 500 })
      .then((res) => {
        const obj = {};
        const list = res.data.records;
        const monthArr = Array.from(new Set(list.map((i) => i.caseMonth)));
        monthArr.map((item) => {
          obj[item] = [];
          list.forEach((el) => {
            if (el.caseMonth === item) {
              obj[item].push(el);
            }
          });
        });
        for (let v in obj) {
          obj[v] = obj[v].map((i) => {
            return {
              ...i,
              day: i.caseDay.split("-")[1],
              month:
                i.caseMonth.split("-")[0] +
                "年" +
                i.caseMonth.split("-")[1] +
                "月",
              height: "auto",
            };
          });
        }
        this.setData({
          recordList: obj,
          recordListStr: JSON.stringify(obj),
          originRecordList: list,
        });
      });
  },
  // 消息列表
  getChatList() {
    const { userInfo: { id: userId } } = this.data
    api.getChatList({
      current: 0,
      size: 100,
      appid: 2,
      userId
    }).then(res => {
      this.setData({
        msgList: res.data.records.map(i => {
          return {
            ...i,
            time: getTimeShow(i.receiveStartTime * 1),
            stateStr: this.stateFomart(+i.statue)
          }
        })
      })
    })
  },
  imgPreview(e) {
    const { idx, month, index } = e.currentTarget.dataset;
    const { recordList } = this.data;
    console.log(idx, month, index);
    wx.previewImage({
      current: index, // 当前显示图片的http链接
      urls: recordList[month][idx].caseAlbums, // 需要预览的图片http链接列表
    });
  },
  iconClick(e) {
    const { idx, month } = e.currentTarget.dataset;
    const { recordList } = this.data;
    this.setData(
      {
        recordList: {
          ...recordList,
          [month]: recordList[month].map((i, subIndex) => {
            if (subIndex === idx) {
              return {
                ...i,
                height: i.height === 0 ? "auto" : 0,
              };
            } else {
              return i;
            }
          }),
        },
      }
    );
  },
  goBack() {
    wx.navigateBack()
  },
  toUserInfo() {
    const { patientId } = this.data
    wx.navigateTo({
      url: `/pages/patient-info/index?id=${patientId}`
    })
  },
  // 会话记录
  toChatHistory() {
    this.setData({
      tabActive: 1
    })
  },
  toMedicalRecord() {
    this.setData({
      tabActive: 2
    })
  },
  stateFomart(val) {
    const map = {
      0: '待支付',
      1: '待服务',
      2: '问诊中',
      3: '问诊结束',
      4: '问诊已取消',
      5: '无效订单',
      6: '已关闭',
      9: '待派单'
    }
    return map[+val]
  },
  toDialog(e) {
    const { tuid, oid, dname, cvid, state } = e.currentTarget.dataset
    if ([0, 4, 5, 9].includes(+state)) return false
    if (+state === 2) {
      // 问诊中 带入聊天所需数据
      wx.navigateTo({
        url: `/pages/chat/chat?tuId=${tuid}&oId=${oid}&tuName=${dname}&state=${state}`
      })
    } else if (+state === 3 || +state === 6) {
      // 订单结束 不可聊天直接获取聊天记录
      wx.navigateTo({
        url: `/pages/chat/chat?tuId=${tuid}&tuName=${dname}&msgId=${oid}&state=${state}&oId=${oid}`
      })
    } else if (+state === 1) {
      // 待服务
      wx.showToast({
        title: '未接单',
        icon: 'none'
      })
    }
  }
});
