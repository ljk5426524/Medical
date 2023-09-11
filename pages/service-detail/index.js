// pages/service-detail/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'
import { wxToast } from '../../utils/wx-api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        serviceDetail: {},
        userList: [],
        familySelShow: false,
        familyChoose: null,
        recordId: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options
        this.setData({
            recordId: id,
            userInfo: getLocalUserInfo()
        }, () => {
            this.getMyFamily()
            this.getServiceDetail(id)
        })
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

    getServiceDetail(id) {
        api.getMyServiceDetail({
            recordId: id
        }).then(res => {
            this.setData({
                serviceDetail: res.data
            })
        })
    },
    getMyFamily() {
        const { userInfo: { id } } = this.data
        api.getMyFamily({
            memberId: id
        }).then(res => {
            this.setData({
                userList: res.data
            })
        })
    },
    changePatient() {
        this.setData({
            familySelShow: true
        })
    },
    // 家庭成员切换
    onClick(event) {
        const { id } = event.currentTarget.dataset;
        this.setData({
            familyChoose: id,
        });
    },
    onClose() {
        this.setData({
            familySelShow: false
        })
    },
    confirm() {
        const { familyChoose, userInfo: { id }, recordId } = this.data
        api.transferMyService({
            recordId,
            memberId: id,
            tranfereeId: familyChoose
        }).then(res => {
            this.setData({
                familySelShow: false
            })
            wxToast.show({
                title: '转让成功',
                done: () => {
                    wx.navigateBack()
                }
            })
        })
    }
})