// pages/login/index.js
import api from "../../api/index";
import { ROLE_TYPE } from "../../utils/constant";
import { saveLocalUserInfo, saveOpenId, saveToken } from "../../utils/storage";
import { wxToast } from "../../utils/wx-api";

import { genTestUserSig } from '../../debug/GenerateTestUserSig';
import TencentCloudChat from '@tencentcloud/chat';
import TIMUploadPlugin from 'tim-upload-plugin';

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageShow: false,
    weixinOpenId: "",
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
    this.checkUser();
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

  checkUser() {
    wx.login({
      success: (response) => {
        const { code } = response;
        api
          .loginByWxCode({
            code,
            appId: ROLE_TYPE,
          })
          .then((res) => {
            if (typeof res.data === "string") {
              this.setData({
                pageShow: true,
                weixinOpenId: res.data,
              });
              saveOpenId(res.data);
            } else {
              saveLocalUserInfo(res.data.userInfo);
              saveToken(res.data.token);
              saveOpenId(res.data.userInfo.openId);
              if (this.checkNeedFillInfo(res.data.userInfo)) {
                wx.redirectTo({
                  url:
                    ROLE_TYPE === 1
                      ? "/pages/my-info/index"
                      : "/pages/my-info-doctor/index",
                });
              } else {
                this.initIM(res.data.userInfo)
              }
            }
          });
      },
    });
  },

  getUserPhone(e) {
    const { errMsg } = e.detail;
    if (errMsg === "getPhoneNumber:fail user deny") {
      // 用户拒绝
    } else if (errMsg === "getPhoneNumber:ok") {
      const { encryptedData, iv } = e.detail;

      wx.login({
        success: (response) => {
          api
            .getUserPhone({
              code: response.code,
              encryptedData,
              iv,
            })
            .then((res) => {
              const { phoneNumber } = res.data;
              const { weixinOpenId } = this.data;
              api
                .registeByUserPhone({
                  openId: weixinOpenId,
                  mobile: phoneNumber,
                  appId: ROLE_TYPE,
                })
                .then(async (res2) => {
                  if (res2.code === "0") {
                    saveLocalUserInfo(res2.data.userInfo);
                    saveToken(res2.data.token);
                    wxToast.show({
                      title: "授权成功",
                      done: () => {
                        if (this.checkNeedFillInfo(res2.data.userInfo)) {
                          wx.redirectTo({
                            url:
                              ROLE_TYPE === 1
                                ? "/pages/my-info/index"
                                : "/pages/my-info-doctor/index",
                          });
                        } else {
                          this.initIM(res2.data.userInfo)
                        }
                      },
                    });
                  }
                });
            });
        },
      });
    }
  },

  checkNeedFillInfo(loginInfo) {
    if (ROLE_TYPE === 1) {
      const { name, sex, mobile, age, marry } = loginInfo;
      return !name || !sex || !mobile || !age || !marry;
    } else {
      const {
        name,
        sex,
        workState,
        merchantName,
        merchantId,
        departmentName,
        departmentId,
        title,
        goodat,
        summary,
        doctorCertNo,
        engageCertPath,
      } = loginInfo;
      return (
        !name ||
        !sex ||
        !workState ||
        !merchantName ||
        !merchantId ||
        !departmentName ||
        !departmentId ||
        !title ||
        !goodat ||
        !summary ||
        !doctorCertNo ||
        !engageCertPath
      );
    }
  },

  initIM(userInfo) {
    const { mobile } = userInfo
    console.log('????????????', userInfo)
    if (mobile) {
      console.log(mobile, '手机号')
      app.globalData.config.userID = mobile
      const userSig = genTestUserSig(app.globalData.config).userSig
      wx.$chat_SDKAppID = app.globalData.config.SDKAPPID;
      wx.$TUIKitTIM = TencentCloudChat;
      wx.$chat_userID = app.globalData.config.userID;
      wx.$chat_userSig = userSig;
      wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
      wx.$TUIKit.login({
        userID: userInfo.mobile,
        userSig
      });
      wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
      wx.navigateBack();
    }
  },
  onSDKReady() {
    console.log('SDK_READY',)
  }
});
