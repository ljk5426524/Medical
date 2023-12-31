// pages/hospital-list/index.js
import api from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '', // 关键词查询
        hospitalList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMerchantByPage()
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

    getHospitalList() {
        const { keyword } = this.data
        console.log(keyword)
    },
    onSearch(e) {
        this.setData({
            keyword: e.detail,
        }, () => {
            this.getMerchantByPage()
        });
    },
    toFind(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/hospital-detail/index?id=${id}`
        })
    },
    getMerchantByPage() {
        const { keyword } = this.data
        api.getMerchantByPage({
            name: keyword
        }).then(res => {
            this.setData({
                hospitalList: res.data.records
            })
        })
    }
})