// pages/hospital-detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hospitalDetail: {
            id: 1,
            name: '北京协和医院',
            desc: '共有323名专家可提供服务',
            phone: '010-69155566',
            location: '北京市通州区xxxx街道鱼市街10-2031号',
            departmentList: [{
                id: 1,
                name: '神经内科'
            }, {
                id: 2,
                name: '神经外科'
            }, {
                id: 3,
                name: '胸外科'
            }, {
                id: 4,
                name: '心血管内科'
            }, {
                id: 5,
                name: '泌尿外科'
            }]
        }
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

    toFind(e) {
        const { id: dId } = e.currentTarget.dataset
        const { id: hId } = this.data.hospitalDetail
        wx.navigateTo({
            url: `/pages/search/index?dId=${dId}&hId=${dId}`
        })
    }
})