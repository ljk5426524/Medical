// pages/my-family/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userList: []
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
            this.getMyFamily()
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
    toAdd() {
        wx.navigateTo({
            url: '/pages/my-family-add/index',
        })
    },
    getMyFamily() {
        const { id } = this.data.userInfo
        api.getMyFamily({
            memberId: id
        }).then(res => {
            this.setData({
                userList: res.data
            })
        })
    },
    // 详情
    toDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/my-family-add/index?id=${id}&type=1`,
        })
    },
    toEdit(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/my-family-add/index?id=${id}`,
        })
    }
})