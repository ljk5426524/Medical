// pages/old-health-detail/index.js
import api from '../../api/index'
import { wxToast } from '../../utils/wx-api'
import { getLocalUserInfo } from "../../utils/storage";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        serviceDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options
        this.setData({
            userInfo: getLocalUserInfo(),
        }, () => {
            this.getServiceDetail(id)
        }
        );
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

    getServiceDetail(id) {
        const { userInfo: { id: userId } } = this.data
        api.getServiceDetail({
            serviceId: id,
            userId
        }).then(res => {
            this.setData({
                serviceDetail: res.data
            })
        })
    },
    // 立即预约
    order() {
        const { serviceDetail: { id } } = this.data
        wx.navigateTo({
            url: `/pages/order-result/index?id=${id}`
        })
    },
    toRecordDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/service-detail/index?id=${id}`
        })
    }
})