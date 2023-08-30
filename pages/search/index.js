// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        deptOptions: [{
            value: '',
            text: '全部科室'
        }, {
            value: 1,
            text: '神经内科'
        }, {
            value: 2,
            text: '神经外科'
        }, {
            value: 3,
            text: '胸外科'
        }, {
            value: 4,
            text: '心血管内科'
        }, {
            value: 5,
            text: '泌尿外科'
        }],
        orderOptions: [{
            value: '',
            text: '综合排序'
        }, {
            value: 1,
            text: '正序'
        }, {
            value: 2,
            text: '倒序'
        }],
        deptId: '',
        orderType: '',

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

    }
})