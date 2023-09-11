// pages/search/index.js
import api from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        deptOptions: [],
        deptId: '',
        hospitalId: '',
        hospitalOptions: [],
        userList: []

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { dId, hId, role } = options
        this.setData({
            role: role,
            hospitalId: hId ? +hId : '',
            deptId: dId || ''
        })
        Promise.all([this.getDepartmentPage(), this.getMerchantByPage()]).then(res => {
            this.selectDoctorByPage()
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
    getDepartmentPage() {
        api.getDepartmentPage({}).then(res => {
            this.setData({
                deptOptions: [{
                    value: '',
                    text: '全部科室'
                }, ...res.data.map(i => {
                    return {
                        value: i.id,
                        text: i.name
                    }
                })]
            })
        })
    },
    getMerchantByPage() {
        api.getMerchantByPage({
        }).then(res => {

            this.setData({
                hospitalOptions: [{
                    value: '',
                    text: '全部医院'
                }, ...res.data.records.map(i => {
                    return {
                        value: i.id,
                        text: i.name
                    }
                })]
            })
        })
    },
    selectDoctorByPage() {
        const { hospitalId, deptId, keyword, role } = this.data
        const params = {}
        if (hospitalId) {
            params.merchantId = hospitalId
        }
        if (deptId) {
            params.departmentId = deptId
        }
        if (keyword) {
            params.name = keyword
        }
        if (role) {
            params.role = role
        }
        api.selectDoctorByPage(params).then(res => {
            this.setData({
                userList: res.data.records
            })
        })
    },
    onSearch(e) {
        this.setData({
            keyword: e.detail,
        }, () => {
            this.selectDoctorByPage()
        });
    },
    toDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/doctor-detail/index?id=${id}`,
        })
    },
    selChange(e) {
        const { detail, currentTarget: { dataset: { type } } } = e

        this.setData({
            [type]: detail
        }, () => {
            this.selectDoctorByPage()
        })
    }
})