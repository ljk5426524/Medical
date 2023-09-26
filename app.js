// app.js
import { genTestUserSig } from './debug/GenerateTestUserSig';

import { getLocalUserInfo } from './utils/storage'

// 无ui集成
import TencentCloudChat from '@tencentcloud/chat';
import TIMUploadPlugin from 'tim-upload-plugin';
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin';

App({
  onLaunch() {
    wx.$TUIKit = TencentCloudChat.create({
      SDKAppID: this.globalData.config.SDKAPPID,
    });
    const userInfo = getLocalUserInfo()
    if (userInfo && userInfo.mobile) {
      this.globalData.config.userID = userInfo.mobile
      const userSig = genTestUserSig(this.globalData.config).userSig
      wx.$chat_SDKAppID = this.globalData.config.SDKAPPID;
      wx.$TUIKitTIM = TencentCloudChat;
      wx.$chat_userID = this.globalData.config.userID;
      wx.$chat_userSig = userSig;
      wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
      wx.$TUIKit.login({
        userID: userInfo.mobile,
        userSig
      });
      wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
    }
    console.log(wx.$TUIKitTIM)
    // 监听系统级事件
  },
  onUnload() {
    wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
  },

  globalData: {
    config: {
      userID: 'test2',
      SDKAPPID: 1400829197,
      SECRETKEY: '9056c295f5be389c2856a06597b843e75d9bdb5131d47101fd9f06a7ea417152', // Your secretKey
      EXPIRETIME: 604800,
    },
    isInit: false,
    userInfo: null
  },
  onSDKReady(event) {
    // 监听到此事件后可调用 SDK 发送消息等 API，使用 SDK 的各项功能。
    console.log('SDK_READY')
  }


})
