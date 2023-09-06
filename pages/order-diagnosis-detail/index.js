// pages/order-diagnosis-detail/index.js
import api from '../../api/index'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		buttonClientRect: wx.getMenuButtonBoundingClientRect(),
		recordDetail: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { id } = options
		this.getOrderDetail(id)
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

	goBack() {
		wx.navigateBack()
	},

	getOrderDetail(id) {
		api.getOrderDetail({
			orderId: id
		}).then(res => {
			this.setData({
				recordDetail: res.data.length ? { ...res.data[0], stateStr: this.stateFomart(res.data[0].state) } : {}
			})
		})
	},
	stateFomart(val) {
		const map = {
			0: '待支付',
			1: '待服务',
			2: '问诊中',
			3: '问诊结束',
			4: '问诊已取消',
			5: '无效订单',
			6: '已关闭',
			9: '待派单'
		}
		return map[+val]
	},
})