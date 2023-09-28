// pages/chat/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'
import { getTimeShow } from "../../utils/util";
let time = null
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabActive: 1,
		msgList: [],
		serviceList: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (query) {


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
		const userInfo = getLocalUserInfo()
		if (userInfo && userInfo.id) {
			this.setData({
				userInfo: getLocalUserInfo()
			}, () => {
				this.getChatList(userInfo.id)
				this.getServiceMsgList(userInfo.id)
				time = setInterval(() => {
					this.getChatList(userInfo.id)
				}, 5000)
			})
		}
	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		clearInterval(time)
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {
		clearInterval(time)
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
		}, () => {
			if (tab === 2) {
				// 服务消息
				this.getServiceList()
			} else {
				// 问诊消息
				this.getChatList(userInfo.id)
			}
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
	// 消息列表
	getChatList(userId) {
		api.getChatList({
			current: 0,
			size: 100,
			appid: 1,
			userId: userId
		}).then(res => {
			this.setData({
				msgList: res.data.records.map(i => {
					return {
						...i,
						time: getTimeShow(i.receiveStartTime * 1),
						stateStr: this.stateFomart(+i.statue)
					}
				})
			})
		})
	},
	// 获取服务消息
	getServiceMsgList(userId) {
		api.getServiceMsgList({
			memberId: userId,
			size: 500,
			current: 0
		}).then(res => {
			this.setData({
				serviceList: res.data.records.map(i => {
					return {
						...i,
						time: getTimeShow(i.createTime * 1)
					}
				})
			})
		})
	},
	toDialog(e) {
		const { tuid, oid, dname, cvid, state, msgid, did } = e.currentTarget.dataset
		if ([0, 4, 5, 9].includes(+state)) return false
		if (+state === 2) {
			clearInterval(time)
			// 问诊中 带入聊天所需数据
			wx.navigateTo({
				url: `/pages/chat/chat?tuId=${tuid}&oId=${oid}&tuName=${dname}&state=${state}&doctorId=${did}`
			})
		} else if (+state === 3 || +state === 6) {
			clearInterval(time)
			// 订单结束 不可聊天直接获取聊天记录
			wx.navigateTo({
				url: `/pages/chat/chat?tuId=${tuid}&tuName=${dname}&msgId=${oid}&state=${state}&oId=${oid}&doctorId=${did}`
			})
		} else if (+state === 1) {
			// 待服务
			wx.showToast({
				title: '未接单',
				icon: 'none'
			})
		}
	},
	toSeverceDetail(e) {
		const { id } = e.currentTarget.dataset
		wx.navigateTo({
			url: `/pages/service-detail/index?id=${id}`
		})
	},
})