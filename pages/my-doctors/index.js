// pages/my-doctors/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        doctorList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo: getLocalUserInfo()
        }, () => {
            this.getMyDoctors()
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

    toDoctorDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/doctor-detail/index?id=${id}`
        })
    },
    toChat(e) {
        const { id } = e.currentTarget.dataset
        wx.switchTab({
            url: `../chat/index`
        })
    },
    getMyDoctors() {
        const { userInfo: { id } } = this.data
        api.getMyDoctors({
            current: 1,
            size: 100,
            userId: id
        }).then(res => {
            this.setData({
                doctorList: res.data.records
            })
        })
    }
})