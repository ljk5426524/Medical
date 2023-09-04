// pages/my/index.js
import api from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            id: "99",
            mobile: "18556201182",
            name: "185****1182",
            nickname: "185****1182",
            headImage: "http://app.kbing123.com/mdedia/20230904/XxGPWjWxRiS82ff4aea3844c983f36d5ca1ef27e71e7.png",
            sex: "1",
            age: '0',
            marry: '0',
            idcard: "3212831999999555",
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getUserInfo()
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
    getUserInfo() {
        api.getTokenByPhone({
            token: '62efc330f72b42f5810201d38acea937'
        }).then(res => {
            console.log(res)
        })

    }
})