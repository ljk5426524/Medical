// pages/order-diagnosis/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        recordList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { type } = options
        this.setData({
            userInfo: getLocalUserInfo()
        }, () => {
            if (type && +type === 1) {
                this.getOnlineRecord()
                wx.setNavigationBarTitle({
                    title: '在线问诊历史'
                })
            } else {
                this.getFasteRecord()
                wx.setNavigationBarTitle({
                    title: '快速问诊历史'
                })
            }
        })
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
    onUnload: function () {

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
    getOnlineRecord() {
        const { userInfo: { id } } = this.data
        api.getOnlineRecord({
            current: 1,
            size: 10,
            memberId: id || 47
        }).then(res => {
            this.setData({
                recordList: res.data.records.map(i => {
                    return {
                        ...i,
                        state: +i.state,
                        stateStr: this.stateFomart(i.state)
                    }
                })
            })
        })
    },
    getFasteRecord() {
        const { userInfo: { id } } = this.data
        api.getFasteRecord({
            current: 1,
            size: 10,
            memberId: id || 47
        }).then(res => {
            this.setData({
                recordList: res.data.records.map(i => {
                    return {
                        ...i,
                        state: 2,
                        stateStr: this.stateFomart(i.state)
                    }
                })
            })
        })
    },
    stateFomart(val) {
        const map = {
            0: '待支付',
            1: '待服务',
            2: '服务中',
            3: '已服务',
            4: '已取消',
            5: '无效订单',
            6: '已关闭',
            9: '待派单'
        }
        return map[+val]
    },
    toDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/order-diagnosis-detail/index?id=${id}`
        })
    }
})