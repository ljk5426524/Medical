// pages/home/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonClientRect: wx.getMenuButtonBoundingClientRect(),
        userInfo: null,
        specialist: []
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
        const userInfo = getLocalUserInfo()
        if (userInfo && userInfo.id) {
            this.setData({
                userInfo: getLocalUserInfo()
            }, () => {
                this.getMyDoctors()
            })
        }
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

    toFind(e) {
        const { type } = e.currentTarget.dataset
        const { userInfo } = this.data
        const map = {
            1: '/pages/hospital-list/index',
            2: '/pages/department/index',
            3: '/pages/search/index?role=0',
            4: '/pages/search/index?role=1'
        }
        wx.navigateTo({
            url: userInfo ? map[type] : '/pages/login/index'
        })
    },
    toAsk() {
        const { userInfo } = this.data
        wx.navigateTo({
            url: userInfo ? '/pages/doctor-detail/index' : '/pages/login/index'
        })
    },
    toOldHealth() {
        const { userInfo } = this.data
        wx.navigateTo({
            url: userInfo ? '/pages/old-health-menu/index' : '/pages/login/index'
        })
    },
    getMyDoctors() {
        api.getMyDoctors({
            userId: 99
        }).then(res => {
            this.setData({
                specialist: res.data.records
            })
        })
    },
    toDoctorDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/doctor-detail/index?id=${id}`,
        })
    },

    toSearch() {
        wx.navigateTo({
            url: `/pages/home-search/index`
        })
    }
})