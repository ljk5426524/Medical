// TUIKitWChat/Chat/index.js
import constant from './utils/constant';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    conversationID: {
      type: String,
      value: '',
      observer(conversationID) {
        console.log('jin', conversationID)
        this.setData({
          outsideConversation: true,
          currentConversationID: conversationID,
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowConversation: false,
    isShowConversationList: false,
    currentConversationID: '',
    unreadCount: 0,
    hasCallKit: false,
    config: {
      userID: '',
      userSig: '',
      type: 1,
      tim: null,
      SDKAppID: 0,
    },
    outsideConversation: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      const { config } = this.data;
      config.userID = wx.$chat_userID;
      config.userSig = wx.$chat_userSig;
      config.tim = wx.$TUIKit;
      config.SDKAppID = wx.$chat_SDKAppID;
      this.setData({
        config,
      }, () => {
        this.TUICallKit = this.selectComponent('#TUICallKit');
        // 这里的 isExitInit 用来判断 TUICallKit init 方法是否存在
        // 当 isExitInit 为 true 时，进行 callkit 初始化和日志上报
        const isExitInit = (this.TUICallKit.init !== undefined);
        if (this.TUICallKit !== null && isExitInit) {
          this.TUICallKit.init();
          wx.setStorageSync('_isTIMCallKit', true);
          wx.$_isTIMCallKit = '_isTIMCallKit';
          this.setData({
            hasCallKit: true,
          });
        }
      });
      console.log('?!?!??!??!!!?!?', this.data.outsideConversation, this.data.currentConversationID)
      if (this.data.outsideConversation) {
        this.setData({
          isShowConversation: true,
          isShowConversationList: false,
          currentConversationID: this.data.currentConversationID,
          unreadCount: 0,
        }, () => {
          const TUIChat = this.selectComponent('#TUIChat');
          TUIChat.init();
        });
      } else {
        this.setData({
          isShowConversationList: true,
        }, () => {
          const TUIConversation = this.selectComponent('#TUIConversation');
          TUIConversation.init();
        })
      }
    },
    currentConversationID(event) {
      wx.navigateTo({
        url: `/chat-im/pages/chat?id=${event.detail.currentConversationID}`
      })
    },
    showConversationList() {
      if (this.data.outsideConversation) {
        this.handleBack();
      } else {
        this.setData({
          isShowConversation: false,
          isShowConversationList: true,
        }, () => {
          const TUIConversation = this.selectComponent('#TUIConversation');
          TUIConversation.init();
        });
      }
    },
    handleCall(event) {
      if (event.detail.groupID) {
        this.TUICallKit.groupCall(event.detail);
      } else {
        this.TUICallKit.call(event.detail);
      }
    },
    handleBack() {
      if (app?.globalData?.reportType !== constant.OPERATING_ENVIRONMENT) {
        wx.navigateBack({
          delta: 1,
        });
      } else {
        wx.switchTab({
          url: '/pages/TUI-Index/index',
        });
      }
    },
    sendMessage(event) {
      this.selectComponent('#TUIChat').sendMessage(event);
    },
  },
});
