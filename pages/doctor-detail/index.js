// pages/doctor-detail/index.js
import api from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonClientRect: wx.getMenuButtonBoundingClientRect(),
        doctorDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options
        this.getDoctorDetail(id)
        this.findDoctorProduct(id)
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
        api.getDoctorDetail({
            doctorId: id || 4
        }).then(res => {
            this.setData({
                doctorDetail: res.data
            })
        })
    },
    findDoctorProduct(id) {
        api.findDoctorProduct({
            doctorId: id || 4
        }).then(res => {
            // this.setData({
            //     doctorDetail: res.data
            // })
        })
    }
})