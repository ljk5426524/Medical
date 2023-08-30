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
        userList:[{
            id:1,
            name:'王小明',
            major:'主任医师',
            hospital:'南京市鼓楼医院',
            subject:'外科',
            desc:'擅长：中医药诊治儿童神经精神系统疾病（多发性抽动症）、脾胃系疾病（厌食症、慢性腹泻）',
            serviceCount:2131,
            good:98,
        },{
            id:2,
            name:'王大明',
            major:'主任医师',
            hospital:'南京市鼓楼医院',
            subject:'外科',
            desc:'擅长：中医药诊治儿童神经精神系统疾病（多发性抽动症）、脾胃系疾病（厌食症、慢性腹泻）',
            serviceCount:2131,
            good:98,
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

    }
})