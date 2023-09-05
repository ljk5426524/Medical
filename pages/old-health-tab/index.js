// pages/old-health-tab/index.js
import api from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabActive: 1,
        serviceList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { tab } = options
        this.setData({
            tabActive: +tab
        }, () => {
            this.getServiceList()
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
    tabChange(e) {
        const { tab } = e.currentTarget.dataset
        this.setData({
            tabActive: tab
        }, () => {
            this.getServiceList()
        })
    },
    getServiceList() {
        const { tabActive } = this.data
        api.getServiceList({
            current: 0,
            size: 100,
            type: tabActive
        }).then(res => {
            this.setData({
                serviceList: res.data.records
            })
        })
    },

    toDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/old-health-detail/index?id=${id}`
        })
    }
})