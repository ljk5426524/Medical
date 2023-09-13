// pages/patient-new/index.js
import api from '../../api/index'
import { formatDate } from "../../utils/util";
import { wxToast } from '../../utils/wx-api';
import { getLocalUserInfo } from '../../utils/storage'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        patientList: {},
        patientListStr: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo: getLocalUserInfo()
        }, () => {
            this.getNewPatientList()
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

    getNewPatientList() {
        const { userInfo: { id } } = this.data
        api.getNewPatientList({
            current: 1,
            size: 100,
            doctorId: id
        }).then(res => {
            const list = res.data.records.map(i => {
                return {
                    ...i,
                    applyDate: formatDate(new Date(+i.applyTime))
                }
            })
            const dateList = Array.from(new Set(list.map(i => {
                return i.applyDate
            })))
            const obj = {}
            dateList.map(i => {
                obj[i] = []
                list.forEach((el) => {
                    if (el.applyDate === i) {
                        obj[i].push(el)
                    }
                })
            })
            this.setData({
                patientList: obj,
                patientListStr: JSON.stringify(obj)
            })
        })
    },
    // 处理患者好友
    handleFriend(e) {
        const { id, type } = e.currentTarget.dataset
        const { userInfo: { id: loginId } } = this.data
        api.handlePatientApply({
            userId: id,
            doctorId: loginId || 22,
            state: +type,
            appId: 1,
        }).then(res => {
            wxToast.show({
                title: +type === 2 ? '已添加' : '已忽略'
            })
            this.getNewPatientList()
        })
    },

    toDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/patient-detail/index?id=${id}`,
        })
    }
})