// pages/agreement/index.js
import api from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        agreement: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { type } = options
        if (+type < 4) {
            this.getSettingData(type)
        } else {
            this.aboutUs()
        }
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
    getSettingData(type) {
        api.getSettingData({}).then(res => {
            const { privacy, user, help } = res.data[0]
            const map = {
                1: privacy,
                2: user,
                3: help
            }
            wx.setNavigationBarTitle({
                title: +type == 1 ? '用户隐私协议' : +type === 2 ? '用户服务协议' : '帮助中心'
            })
            this.setData({
                agreement: map[+type]
            })
        })
    },
    aboutUs() {
        api.aboutUs().then(res => { })
    }
})