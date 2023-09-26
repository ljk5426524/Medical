// pages/chat/chat.js
import dayjs from '../../utils/dayjs'
import { getLocalUserInfo } from '../../utils/storage'
import { ROLE_TYPE } from "../../utils/constant";
import api from '../../api/index'
import { wxToast } from '../../utils/wx-api';


var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 计算msg总高度
 */
function calScrollHeight(that, keyHeight) {
	var query = wx.createSelectorQuery();
	query.select('.scrollMsg').boundingClientRect(function (rect) { }).exec();
}
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		audioFlag: false,
		messageTime: "",
		showMessageTime: false,
		inputRoomHeight: '16vw',
		scrollHeight: '',
		inputBottom: 0,
		selfUserId: null, // 本人用户id
		toUserId: null, // 对话方用户id
		messageList: [], // 历史记录的消息列表
		displayFlag: '',
		inputVal: '',
		nextReqMessageID: null,
		isCompleted: false,
		conversationID: null,
		isDoctor: ROLE_TYPE === 2,
		orderState: null,
		historyMsgId: null,
		evaluateShow: false, // 评价
		options: { maxHeight: 100, minHeight: 50 },
		rate: 0, // 评分
		suggest: '', // 建议
		comment: [{
			id: 1,
			text: '非常敬业',
			sel: false
		}, {
			id: 2,
			text: '非常专业认真',
			sel: false
		}, {
			id: 3,
			text: '不友好',
			sel: false
		}, {
			id: 4,
			text: '态度非常好',
			sel: false
		}, {
			id: 5,
			text: '意见很有帮助',
			sel: false
		}], // 预置评价
		isComment: false,
		lastMinute: '00',
		lastSecond: '00',
		limitShow: false,
		startServiceTime: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// tuId 会话方id
		// tuName 会话方name
		// cvId  im会话id
		// oId 订单id
		// state 状态 是否是'2'问/接诊中 是则获取im历史记录
		// msgId 会话id 问诊结束的情况有 获取本地聊天记录
		const { tuId, oId, tuName, state, msgId, doctorId } = options
		const userInfo = getLocalUserInfo()
		this.setData({
			toUserId: tuId || 'test1',
			toUserName: tuName,
			userInfo,
			orderId: oId,
			orderState: +state,
			selfUserId: userInfo.mobile,
			conversationID: `C2C${tuId}`,
			historyMsgId: msgId,
			doctorId
		}, () => {
			// 患者 获取问诊时间
			this.getOrderTime(oId)
		})
		wx.setNavigationBarTitle({
			title: tuName
		})
		console.log('12121212', { tuId, oId, tuName })
		if (state === '2') {
			// 问/接诊中
			this.getMessageListHandler()
		} else if (msgId) {
			// 获取服务器存的聊天记录
			this.getSavedMsgDetail(msgId)
		}
		wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived, this);
		setTimeout(() => {
			this.setData({
				toView: 'msg-' + (this.data.messageList.length - 1),
			})
		}, 800)
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

	// 获取聚焦
	focus(e) {
		keyHeight = e.detail.height;
		this.setData({
			scrollHeight: (windowHeight - keyHeight) + 'px'
		});
		this.setData({
			toView: 'msg-' + (this.data.messageList.length - 1),
			inputBottom: keyHeight + 'px',
			displayFlag: "",
			inputRoomHeight: '16vw',
		})
	},

	//失去聚焦(软键盘消失)
	blur(e) {
		this.setData({
			scrollHeight: '',
			inputBottom: 0
		})
		this.setData({
			toView: 'msg-' + (this.data.messageList.length - 1),
			displayFlag: "",
		})

	},
	changeEmoji() {
		this.setData({
			scrollHeight: '',
			inputBottom: 0,
			audioFlag: false
		})
		this.setData({
			displayFlag: 'emoji',
			inputBottom: '0px',
			inputRoomHeight: '310px'
		})
	},
	multimediaHandler() {
		this.setData({
			scrollHeight: '',
			inputBottom: 0,
		})
		this.setData({
			displayFlag: 'extension',
			inputBottom: '0px',
			inputRoomHeight: '200px'
		})
	},
	// 表情接收事件
	appendMessage(emoji) {
		let {
			message
		} = emoji.detail
		let {
			inputVal
		} = this.data
		this.setData({
			inputVal: inputVal + message
		})
	},
	// 监听接收消息事件
	onMessageReceived(event) {
		let {
			messageList, startServiceTime
		} = this.data
		let _this = this
		const receiveMessageList = event.data;
		receiveMessageList.forEach((message) => {
			_this.messageTimeForShow(message)
			console.log(message, wx.$TUIKitTIM)
			const { payload } = message
			if (message.type === wx.$TUIKitTIM.TYPES.MSG_TEXT) {
				// 文本消息
				_this.setData({
					messageList: [...messageList, message]
				})
				if (!startServiceTime) {
					this.getOrderTime()
				}
				if (payload && payload.text.indexOf('---您好！此次问诊已结束，感谢您的咨询--------') > -1) {
					_this.setData({
						historyMsgId: -1
					})
				}
			} else if (message.type === wx.$TUIKitTIM.TYPES.MSG_IMAGE) {
				// 图片消息
				_this.setData({
					messageList: [...messageList, message]
				})
				if (!startServiceTime) {
					this.getOrderTime()
				}
			} else if (message.type === wx.$TUIKitTIM.TYPES.MSG_SOUND) {
				_this.setData({
					messageList: [...messageList, message]
				})
				// 音频消息
			} else if (message.type === wx.$TUIKitTIM.TYPES.MSG_VIDEO) {
				// 视频消息
			} else if (message.type === wx.$TUIKitTIM.TYPES.MSG_FILE) {
				// 文件消息
			} else if (message.type === wx.$TUIKitTIM.TYPES.MSG_CUSTOM) {
				// 自定义消息
			} else if (message.type === wx.$TUIKitTIM.TYPES.MSG_MERGER) {
				// 合并消息 
			} else if (message.type === wx.$TUIKitTIM.TYPES.MSG_LOCATION) {
				// 地理位置消息
			} else if (message.type === wx.$TUIKitTIM.TYPES.MSG_GRP_TIP) {
				// 群提示消息
			} else if (message.type === wx.$TUIKitTIM.TYPES.MSG_GRP_SYS_NOTICE) {
				// 群系统通知
			}
			_this.setData({
				toView: 'msg-' + (_this.data.messageList.length - 1),
			})
		});
	},
	// 点击查看大图
	getLookBigImage(event) {
		console.log(event)
		let {
			imgurl
		} = event.currentTarget.dataset
		console.log(imgurl)
		wx.previewImage({
			current: imgurl,
			urls: [imgurl]
		})
	},
	// 拉取会话历史记录
	getMessageListHandler() {
		const { conversationID } = this.data
		let promise = wx.$TUIKit.getMessageList({
			conversationID: conversationID
		});
		promise.then((imResponse) => {
			const { messageList, nextReqMessageID, isCompleted } = imResponse.data
			console.log(messageList, 'messageList')
			let msgList = []
			let lastMsgIdx = 0
			for (let idx = messageList.length - 1; idx >= 0; idx--) {
				if (messageList[idx].payload.text && messageList[idx].payload.text.indexOf(`---您好！此次问诊已结束，感谢您的咨询--------`) > -1) {
					lastMsgIdx = idx
				}
				console.log(lastMsgIdx, idx)
				if (idx > lastMsgIdx) {
					msgList.unshift(messageList[idx])
				}
			}
			console.log('msgList', msgList)
			this.setData({
				messageList: msgList,
				nextReqMessageID,
				isCompleted
			})
			console.log(messageList, imResponse.data, "历史会话")
			setTimeout(() => {
				this.setData({
					toView: 'msg-' + (this.data.messageList.length - 1),
				})
			}, 200)
		});
	},
	// 滚动到顶部
	bindscrolltoupperHandler() {
		if (wx.$TUIKitTIM.EVENT.SDK_READY == 'sdkStateReady') {
			if (this.data.isCompleted) return
			console.log("进去到徐拉 ", this.data.messageList, this.data.nextReqMessageID)
			let _this = this;
			let promise = wx.$TUIKit.getMessageList({
				conversationID: 'C2Ctest1',
				nextReqMessageID: _this.data.nextReqMessageID
			});
			promise.then(function (imResponse) {
				console.log(imResponse.data.messageList, imResponse.data, "********************")
				const messageList = imResponse.data.messageList;
				const nextReqMessageID = imResponse.data.nextReqMessageID;
				const isCompleted = imResponse.data.isCompleted;
				if (messageList.length == 0) {
					return
				}
				_this.setData({
					messageList: [...messageList, ..._this.data.messageList],
					nextReqMessageID,
					isCompleted
				})
			});
		}
	},

	// 发送消息
	sendClick() {
		let _this = this
		let {
			toUserId
		} = _this.data
		if (wx.$TUIKitTIM.EVENT.SDK_READY == 'sdkStateReady') {
			let message = wx.$TUIKit.createTextMessage({
				to: toUserId,
				conversationType: wx.$TUIKitTIM.TYPES.CONV_C2C,
				payload: {
					text: _this.data.inputVal
				},
			});
			// 2. 发送消息
			let promise = wx.$TUIKit.sendMessage(message);
			promise.then(function (imResponse) {
				// 发送成功
				console.log(imResponse, "发送成功");
				const { data: { message: { conversationID } } } = imResponse
				_this.sendMessageLocal(_this.data.inputVal, conversationID)
				_this.messageTimeForShow(imResponse.data.message)
				setTimeout(() => {
					_this.setData({
						inputVal: "",
						messageList: [..._this.data.messageList, imResponse.data.message]
					})
					_this.setData({
						toView: 'msg-' + (_this.data.messageList.length - 1),
					})
				}, 300)
			}).catch(function (imError) {
				// 发送失败
				console.warn('sendMessage error:', imError);
				const { data: { message: { conversationID } } } = imError
				_this.sendMessageLocal(_this.data.inputVal, conversationID, 1)
			});
		}
	},
	// 展示消息时间
	messageTimeForShow(messageTime) {
		const interval = 5 * 60 * 1000;
		const nowTime = Math.floor(messageTime.time / 10) * 10 * 1000;
		if (this.data.messageList.length > 0) {
			const lastTime = this.data.messageList.slice(-1)[0].time * 1000;
			if (nowTime - lastTime > interval) {
				this.data.messageTime = dayjs(nowTime);
				let timer = dayjs(nowTime).format('MM-DD HH:mm')
				let ts = timer.split(" ")
				let m = ts[0].split("-")[0]
				let d = ts[0].split("-")[1]
				messageTime.messageTime = `${m}月${d}日  ${ts[1]}`
				messageTime.showMessageTime = true
			} else {
				messageTime.showMessageTime = false
			}
		}
	},
	// 同步im消息至服务器
	sendMessageLocal(text, conversationID, isFaild) {
		const { userInfo: { mobile, nickname }, toUserId, toUserName, orderId, startServiceTime } = this.data
		api.senMsgByPatient({
			appid: ROLE_TYPE,
			msgType: 'text',
			orderId,
			targetId: toUserId,
			targetType: 'user',
			targetName: toUserName,
			fromName: nickname,
			fromType: 'user',
			fromId: mobile,
			text,
			msgFail: isFaild || 0,
			msgId: conversationID
		}).then(() => {
			if (!startServiceTime) {
				this.getOrderTime()
			}
		})
	},
	// 结束会话 医生端独有
	closeDialog() {
		this.setData({
			dialogShow: true
		})
	},

	// 关闭确认
	closeConfirm() {
		const { orderId, toUserId } = this.data
		// im追加结束语
		api.closeDialogByDoctor({ orderId }).then(res => {
			const message = wx.$TUIKit.createTextMessage({
				to: toUserId,
				conversationType: wx.$TUIKitTIM.TYPES.CONV_C2C,
				payload: {
					text: `---您好！此次问诊已结束，感谢您的咨询--------`
				},
			})

			let promise = wx.$TUIKit.sendMessage(message);
			promise.then(function (imResponse) {
				// 发送成功
				console.log(imResponse, "发送成功");
				wx.navigateBack()
			}).catch(function (imError) {
				// 发送失败
				console.warn('sendMessage error:', imError);
				wx.navigateBack()
			});
		})
	},
	getSavedMsgDetail(msgId) {
		const { toUserId } = this.data
		api.getMsgDetail({
			orderId: msgId
		}).then(res => {
			console.log(res)
			const list = res.data.records
			this.setData({
				historyMsgId: msgId,
				messageList: list.map(i => {
					return {
						flow: toUserId === i.targetId ? 'out' : 'in',
						type: i.text.indexOf('http://') > -1 && (i.text.indexOf('.png') > -1 || i.text.indexOf('.jpg') > -1 || i.text.indexOf('.jpeg') > -1 || i.text.indexOf('.gif') > -1) ? 'TIMImageElem' : 'TIMTextElem', // 文字
						payload: {
							text: i.text,
							imageInfoArray: [{
								imageUrl: i.text
							}]
						}
					}
				})
			})
		})
	},
	publicImageUpload(e) {
		const { type } = e.currentTarget.dataset
		const {
			toUserId
		} = this.data
		wx.chooseImage({
			sourceType: [type],
			count: 1,
			success: res => {
				wx.showLoading({
					title: '',
				})
				let message = wx.$TUIKit.createImageMessage({
					to: toUserId,
					conversationType: wx.$TUIKitTIM.TYPES.CONV_C2C,
					payload: {
						file: res
					},
					onProgress: event => {
						console.log('file uploading:', event)
						if (event == 1) {
							wx.hideLoading()
						}
					}
				});
				let promise = wx.$TUIKit.sendMessage(message);
				promise.then(imResponse => {
					const { data: { message: { conversationID } } } = imResponse
					this.getMessageListHandler()
					this.clickScrollView()
					this.uploadFile(res.tempFilePaths[0], conversationID)
				}).catch(imError => {
					console.warn('sendMessage error:', imError);
				});
			},
			complete: () => {
				wx.hideLoading()
			}
		})
	},

	// 点击空白
	clickScrollView() {
		this.setData({
			displayFlag: '',
			inputBottom: '0',
			inputRoomHeight: '16vw',
		})
	},

	// 文件上传
	uploadFile(filePath, conversationID) {
		api
			.uploadFile({
				filePath,
				name: "media",
			})
			.then((res) => {
				this.sendMessageLocal(res.data.media_url, conversationID)
			});
	},
	// 评价
	toEvaluate() {
		const { isComment } = this.data
		if (isComment) {

		}
		this.setData({
			evaluateShow: true
		})
	},
	onClose() {
		this.setData({
			evaluateShow: false
		})
	},
	onRateChange(e) {
		const val = e.detail
		this.setData({
			rate: val
		})
	},
	chooseEv(e) {
		const { text, sel } = e.currentTarget.dataset
		const { comment, isComment } = this.data
		if (isComment) return false
		this.setData({
			comment: comment.map(i => {
				if (i.text === text) {
					return {
						...i,
						sel: !sel
					}
				} else {
					return i
				}
			})
		})

	},
	// 确认评价
	confirmEvaluate() {
		const { rate, suggest, comment, userInfo: { id: userId }, orderId } = this.data
		console.log(rate, suggest, comment)
		const commentParams = comment.filter(i => {
			return i.sel
		}).map(i => i.text).join(',')
		api.saveEvaluate({
			userId,
			orderId,
			score: rate,
			comment: commentParams,
			commentDescription: suggest
		}).then(res => {
			wxToast.show({
				title: '评价成功',
				done: () => {
					wx.navigateBack()
				}
			})
		})
	},
	// 获取订单剩余时间
	getOrderTime(oid) {
		const { orderId, orderState } = this.data
		api.getOrderTime({ orderId, appid: 1 }).then(res => {
			const { isComment, startServiceTime } = res.data
			this.setData({
				isComment: isComment === '0',
				startServiceTime
			})
			if (isComment === '0') {
				this.getEvaluateDetail()
			}
			if (!startServiceTime) return false
			const startTimeStamp = startServiceTime * 1
			const isOver = (new Date().getTime() - startServiceTime * 1) > 1800000
			if (!isOver && orderState === 2) {
				// 未结束
				const timeId = setInterval(() => {
					// 获取当前时间戳
					const now = +new Date()
					// 设置截止时间戳
					const end = startTimeStamp + 1800000
					// 倒计时的时长
					const time = end - now;

					let m = parseInt(time / 1000 / 60 % 60);
					let s = parseInt(time / 1000 % 60);
					// 补'0'
					m = m < 10 ? '0' + m : m
					s = s < 10 ? '0' + s : s

					this.setData({
						limitShow: true,
						lastMinute: m,
						lastSecond: s
					})
					if (time < 0) {
						//关闭定时器
						clearInterval(timeId)
						wxToast.show({
							title: '问诊已自动结束',
							done: () => {
								this.getSavedMsgDetail(this.data.orderId)
							}
						})
						this.setData({
							limitShow: false
						})
					}
				}, 1000);
			}
		})
	},
	// 再次问诊
	toDoctorDetail() {
		const { doctorId } = this.data
		wx.redirectTo({
			url: `/pages/doctor-detail/index?id=${doctorId}`
		})
	},
	getEvaluateDetail() {
		const { orderId } = this.data
		api.getEvaluateDetail({
			orderId
		}).then(res => {
			const { comment: initComment } = this.data
			const { score, commentDescription, comment } = res.data
			this.setData({
				rate: +score,
				suggest: commentDescription,
				comment: initComment.map(i => {
					if (comment.includes(i.text)) {
						return {
							...i,
							sel: true
						}
					} else {
						return i
					}
				})
			})
		})
	}
})