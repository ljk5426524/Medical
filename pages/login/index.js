// pages/login/index.js
import api from '../../api/index'
import { saveLocalUserInfo, saveOpenId, saveToken } from '../../utils/storage'
import { wxToast } from '../../utils/wx-api'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageShow: false,
		weixinOpenId: ''
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
		this.checkUser()
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

	checkUser() {
		wx.login({
			success: response => {
				const { code } = response
				api.loginByWxCode({
					code
				}).then((res => {
					if (typeof res.data === 'string') {
						this.setData({
							pageShow: true,
							weixinOpenId: res.data,
						})
						saveOpenId(res.data)
					} else {
						saveLocalUserInfo(res.data.userInfo)
						saveToken(res.data.token)
						saveOpenId(res.data.userInfo.openId)
						wx.navigateBack()
					}
				}))
			}
		})
	},

	getUserPhone(e) {
		const {
			errMsg
		} = e.detail
		if (errMsg === "getPhoneNumber:fail user deny") {
			// 用户拒绝
		} else if (errMsg === "getPhoneNumber:ok") {
			const {
				encryptedData,
				iv
			} = e.detail

			wx.login({
				success: response => {
					api
						.getUserPhone({
							code: response.code,
							encryptedData,
							iv,
						})
						.then(res => {
							const {
								phoneNumber
							} = res.data
							const {
								weixinOpenId
							} = this.data
							api
								.registeByUserPhone({
									openId: weixinOpenId,
									mobile: phoneNumber,
								})
								.then(async res2 => {
									if (res2.code === '0') {
										saveLocalUserInfo(res2.data.userInfo)
										saveToken(res2.data.token)
										wxToast.show({
											title: "授权成功",
											done: () => {
												wx.navigateBack()
											}
										})
									}
								})
						})
				},
			})
		}
	},
	back() { wx.navigateBack() }
})