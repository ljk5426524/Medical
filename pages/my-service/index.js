// pages/my-service/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        tabActive: 0,
        serviceList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        this.setData({
            userInfo: getLocalUserInfo()
        }, () => {
            this.getServiceRecordList()
        })
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
    tabChange(e) {
        const { tab } = e.currentTarget.dataset
        this.setData({
            tabActive: tab
        }, () => {
            this.getServiceRecordList()
        })
    },

    getServiceRecordList() {
        const { tabActive, userInfo: { id } } = this.data
        api.getServiceRecordList({
            current: 0,
            size: 100,
            memberId: id,
            type: tabActive,// 0：义诊，1：体检
        }).then(res => {
            this.setData({
                serviceList: res.data.records
            })
        })
    },

    toDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/service-detail/index?id=${id}`,
        })
    }
})