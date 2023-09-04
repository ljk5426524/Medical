// pages/home/index.js
import api from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        specialist: [{
            name: '刘高级',
            titleName: '主任',
            departmentName: '外科',
            merchantName: '南京市儿童医院'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMyDoctors()
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

    toFind(e) {
        const { type } = e.currentTarget.dataset
        const map = {
            1: '/pages/hospital-list/index',
            2: '/pages/department/index',
            3: '/pages/search/index?role=0',
            4: '/pages/search/index?role=1'
        }
        wx.navigateTo({
            url: map[type]
        })
    },
    toAsk() {
        wx.navigateTo({
            url: '/pages/doctor-detail/index'
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
    }
})