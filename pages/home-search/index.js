// pages/home-search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        doctorList: [{
            id: 1,
            name: '王小明',
            hospital: '北京协和医院',
            department: '神经内科',
            position: '主治医师',
        }, {
            id: 2,
            name: '李晓红',
            hospital: '北京协和医院',
            department: '神经内科',
            position: '副主任医师',
        }],
        nurseList: [{
            id: 1,
            name: '王小花',
            hospital: '北京协和医院',
            department: '外科',
            position: '护士长',
        }, {
            id: 2,
            name: '李晓',
            hospital: '北京协和医院',
            department: '内科',
            position: '护士',
        }],
        hospitalList: [{
            id: 1,
            name: '北京协和医院',
            desc: '共有323名专家可提供服务',
            phone: '010-69155566',
            location: '北京市通州区xxxx街道鱼市街10-2031号',
        }, {
            id: 2,
            name: '南京市鼓楼医院',
            desc: '共有1234名专家可提供服务',
            phone: '025-892839040',
            location: '南京市鼓楼区xxx街道1号',
        }, {
            id: 3,
            name: '江苏省人民医院',
            desc: '共有3232名专家可提供服务',
            phone: '025-69155566',
            location: '南京市鼓楼区上海路31号',
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
})