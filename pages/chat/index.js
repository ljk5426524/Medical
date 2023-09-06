// pages/chat/index.js
import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin';
import { genTestUserSig } from '../../utils/GenerateTestUserSig';
import { OPTIONS } from '../../res/constants/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabActive: 1,
        conversationList: [],
        name: 'test2'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (query) {
        // this.initChat()
        const userSig = genTestUserSig({ ...OPTIONS, userID: this.data.name }).userSig
        wx.$TUIKit = TIM.create({
            SDKAppID: OPTIONS.SDKAPPID
        })
        wx.$chat_SDKAppID = OPTIONS.SDKAPPID;
        wx.$chat_userID = this.data.name;
        wx.$chat_userSig = userSig;
        wx.$TUIKitTIM = TIM;
        wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
        wx.$TUIKit.registerPlugin({ 'tim-profanity-filter-plugin': TIMProfanityFilterPlugin });
        wx.$TUIKit.login({
            userID: this.data.name,
            userSig
        });
        wx.setStorage({
            key: 'currentUserID',
            data: [],
        });
        wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);

    },
    initChat() {
        // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
        const tim = TIM.create({ SDKAppID: OPTIONS.SDKAPPID }); // SDK 实例通常用 tim 表示
        // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel  https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#setLogLevel 接口的说明</a>
        tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
        // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

        // 注册腾讯云即时通信 IM 上传插件
        tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
        tim.login({
            userID: 'test2',
            userSig: genTestUserSig({ ...OPTIONS, userID: 'test2' }).userSig
        })

        tim.on(TIM.EVENT.MESSAGE_RECEIVED, (res) => {
            console.log('message received', res.data)

            tim.getConversationList().then((imResponse) => {
                const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
                console.log('??????', conversationList)
                this.setData({
                    conversationList: conversationList.map(i => {
                        return {
                            id: i.conversationID,
                            name: i.toAccount,
                            time: new Date(i.lastMessage.lastTime).toLocaleTimeString(),
                            msg: i.lastMessage.messageForShow
                        }
                    })
                })
                //会话列表信息解析处理，请求后台接口获取对应聊天人信息

            }).catch(function (imError) {
                console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
            })
        })
        tim.on(TIM.EVENT.SDK_READY, () => {
            tim.getConversationList().then((imResponse) => {
                const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
                console.log('??????', conversationList)
                this.setData({
                    conversationList: conversationList.map(i => {
                        return {
                            id: i.conversationID,
                            name: i.toAccount,
                            time: i.lastMessage.lastMessage.timeago,
                            msg: i.lastMessage.messageForShow
                        }
                    })
                })
                //会话列表信息解析处理，请求后台接口获取对应聊天人信息

            }).catch(function (imError) {
                console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
            })
        });
    },
    onMessageReceived(val) {
        console.log('message received', val)
    },
    onSDKReady: function (event) {
        const TUIKit = this.selectComponent('#TUIKit');
        TUIKit.init();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    tabChange(e) {
        const { tab } = e.currentTarget.dataset
        this.setData({
            tabActive: tab
        })
    },
    toChat(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `../chat/chat?id=${id}`
        })
    }
})