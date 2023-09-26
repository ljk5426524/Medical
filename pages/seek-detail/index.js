import { wxToast } from "../../utils/wx-api";
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'

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
    orderDetail: null,
    oiId: null,
    oId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { oiId, oId } = options
    const userInfo = getLocalUserInfo()
    this.setData({
      oiId,
      oId,
      userInfo
    })
    this.getSeekDetail(oiId, oId)
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
      refuseShow: false
    });
  },
  onErrorClose() {
    this.setData({
      allowErrorShow: false
    }, () => {
      wx.navigateBack()
    })
  },
  // 接诊
  toChat() {
    const { oiId: orderItmeId, oId: orderId, userInfo: { id: doctorId }, orderDetail: { mobile, patientName } } = this.data
    api.handleAgreePatientSeek({
      orderId,
      doctorId,
      orderItmeId
    }).then(res => {
      const { msg, code } = res
      if (+code === 0) {
        wx.redirectTo({
          url: `/pages/chat/chat?tuId=${mobile}&oId=${orderId}&tuName=${patientName}&state=2`
        })
      } else if (+code === 4000) {
        this.setData({
          allowErrorShow: true,
        });
      } else {
        wxToast.show({
          title: msg || `接诊失败`,
          done: () => {
            wx.navigateBack()
          }
        })
      }
    })
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
    const { refuseType, reason, oiId, oId: orderId, userInfo: { id: doctorId } } = this.data
    const refuseTypeMap = {
      '1': '患者咨询的病情与我的专业无关',
      '2': '工作很忙，暂时没有时间处理',
      '3': reason
    }
    if (!refuseType) {
      wxToast.show({
        title: "请选择拒绝原因",
      });
    } else if (refuseType === '3' && !reason) {
      wxToast.show({
        title: "请填写拒绝原因",
      });
    } else {
      api.handleRefusePatientSeek({
        doctorId,
        orderId,
        reasons: refuseTypeMap[refuseType]
      }).then(res => {
        this.setData({
          refuseShow: false
        })
        wxToast.show({
          title: "已忽略",
          done: () => {
            wx.navigateBack()
          }
        })
      })
    }
  },

  getSeekDetail(oiId, oId) {
    api.getSeekDetail({
      orderType: 2,
      orderId: oId,
      orderItemId: oiId,
      appId: 2
    }).then(res => {
      this.setData({
        orderDetail: res.data
      })
    })
  },
  previewImg(e) {
    const { src, urls } = e.currentTarget.dataset
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: urls.split(','), // 需要预览的图片http链接列表
    });
  }
});
