// pages/my-doctor/index.js
import { getLocalUserInfo } from '../../utils/storage'
import api from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        staticsInfo: {}
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
            this.getMyStatics()
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
    getMyStatics() {
        const { userInfo: { id } } = this.data
        api.getMyStatics({ doctorId: id || 22 }).then(res => {
            this.setData({
                staticsInfo: res.data
            })
        })
    }
})