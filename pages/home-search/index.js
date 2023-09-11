// pages/home-search/index.js
import api from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        doctorList: [],
        deptList: [],
        hospitalList: [],
        keywords: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSearchList()
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
            url: `/pages/doctor-detail/index?id=${id}`,
        })
    },

    toHospital(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/hospital-detail/index?id=${id}`,
        })
    },
    getSearchList() {
        const { keywords } = this.data
        api.getSearchList({
            current: 1,
            size: 100,
            keywords,
        }).then(res => {
            const list = res.data.records
            this.setData({
                doctorList: list.filter(i => i.type === '0'),
                deptList: list.filter(i => i.type === '3'),
                hospitalList: list.filter(i => i.type === '2')
            })
        })
    },
    onSearch(e) {
        this.setData({
            keywords: e.detail
        }, () => {
            this.getSearchList()
        })
    }
})