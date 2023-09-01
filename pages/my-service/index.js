// pages/my-service/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabActive: 1,
        serviceList: [{
            id: 1,
            name: '服务一',
            time: '2021.05.01 12:00:00',
            state: 1,
            status: 1,
            from: 'test1',
            hospital: "南京市鼓楼医院"
        }, {
            id: 2,
            name: '服务二',
            time: '2021.05.01 12:00:00',
            state: 2,
            status: 2,
            from: 'test1',
            hospital: "南京市鼓楼医院"
        }, {
            id: 3,
            name: '服务三',
            time: '2021.05.01 12:00:00',
            state: 3,
            status: 2,
            from: 'test1',
            hospital: "南京市鼓楼医院"
        }, {
            id: 3,
            name: '服务三',
            time: '2021.05.01 12:00:00',
            state: 3,
            status: 2,
            from: 'test1',
            hospital: "南京市鼓楼医院"
        }, {
            id: 3,
            name: '服务三',
            time: '2021.05.01 12:00:00',
            state: 3,
            status: 2,
            from: 'test1',
            hospital: "南京市鼓楼医院"
        }, {
            id: 3,
            name: '服务三',
            time: '2021.05.01 12:00:00',
            state: 3,
            status: 2,
            from: 'test1',
            hospital: "南京市鼓楼医院"
        }, {
            id: 3,
            name: '服务三',
            time: '2021.05.01 12:00:00',
            state: 3,
            status: 2,
            from: 'test1',
            hospital: "南京市鼓楼医院"
        }]
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

    },
    tabChange(e) {
        const { tab } = e.currentTarget.dataset
        this.setData({
            tabActive: tab
        })
    },
})