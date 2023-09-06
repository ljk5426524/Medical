// pages/order-result/index.js
import api from '../../api/index'
import { wxToast } from '../../utils/wx-api'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		serviceDetail: {},
		orderSuccess: true,
		reason: '',
		orderNum: '',
		userInfo: {
			name: "185****1182",
		},
		pageIsReady: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { id } = options
		this.getServiceDetail(id)
		this.orderNow(id)
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
		api.getServiceDetail({
			serviceId: id
		}).then(res => {
			this.setData({
				serviceDetail: res.data
			})
		})
	},
	orderNow(id) {
		api.orderService({
			memberId: 99,
			memberName: "185****1182",
			serviceId: id
		}).then(res => {
			const { code, msg, data } = res
			if ([0, 1001, 1002, 1003].includes(+code)) {
				this.setData({
					orderSuccess: +code === 0,
					reason: msg,
					orderNum: data
				})
			} else {
				wxToast.show({
					title: msg
				})
			}
			this.setData({
				pageIsReady: true
			})
		})
	}
})