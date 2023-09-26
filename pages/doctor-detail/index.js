// pages/doctor-detail/index.js
import api from '../../api/index'
import { wxToast } from '../../utils/wx-api'
import { getLocalUserInfo } from '../../utils/storage'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonClientRect: wx.getMenuButtonBoundingClientRect(),
        doctorDetail: {},
        userInfo: {},
        doctorProduct: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options
        this.setData({
            userInfo: getLocalUserInfo()
        }, () => {
            this.getDoctorDetail(id)
            this.findDoctorProduct(id)
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


    goBack() {
        wx.navigateBack()
    },
    getDoctorDetail(id) {
        const { userInfo: { id: userId } } = this.data
        api.getDoctorDetail({
            appId: 1,
            userId,
            doctorId: id
        }).then(res => {
            this.setData({
                doctorDetail: res.data
            })
        })
    },
    findDoctorProduct(id) {
        api.findDoctorProduct({
            doctorId: id
        }).then(res => {
            this.setData({
                doctorProduct: res.data
            })
        })
    },
    applyDoctorFriend() {
        const { doctorDetail: { id }, userInfo: { id: userId } } = this.data
        api.applyDoctorFriend({
            userId,
            appId: 1,
            doctorId: id
        }).then(res => {
            wxToast.show({
                title: '申请成功'
            })
        })
    },
    deleteFriend() {
        const {
            doctorDetail: { id },
            userInfo: { id: userId }
        } = this.data
        api.handlePatientApply({
            userId,
            doctorId: id,
            state: 4,
            appId: 1,
        }).then(res => {
            wxToast.show({
                title: '已移除'
            })
            this.getDoctorDetail(id)
        })
    },
    toAsk(e) {
        const { code, id, imid } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/image-consult/index?code=${code}&id=${id}&imId=${imid}`
        })
    },
})