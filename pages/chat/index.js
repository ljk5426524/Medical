// pages/chat/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabActive: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (query) {


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
    onUnload() {

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
    tabChange(e) {
        const { tab } = e.currentTarget.dataset
        this.setData({
            tabActive: tab
        })
    },

    tochat() {
        wx.navigateTo({
            url: `../../chat-im/pages/chat`
        })
    }
})