// pages/image-consult/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'
import { wxToast } from '../../utils/wx-api';
const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		options: { maxHeight: 100, minHeight: 50 },
		productCode: '',
		doctorId: '',
		imgList: [],
		desc: '',
		familySelShow: false,
		familyChooseName: '',
		familyChoose: '',
		familyChooseSex: '',
		familyChooseCard: '',
		userList: [],
		toUserId: null,
		sickList: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { code, id, imId } = options
		this.setData({
			productCode: code,
			doctorId: id,
			toUserId: imId,
			userInfo: getLocalUserInfo()
		}, () => {
			this.getMyFamily()
			this.getSickList()
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

	uploadPic(e) {
		const { type } = e.currentTarget.dataset;
		wx.chooseImage({
			count: 1,
			sizeType: ["original", "compressed"],
			sourceType: ["album", "camera"],
			success: (res) => {
				const MAX_UPLOAD_MB = 10;
				const quality = 20;

				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths;
				const tempFilesSize = res.tempFiles[0].size;

				// 最大图片10M
				// if (tempFilesSize > MAX_UPLOAD_MB * 1024 * 1024) {
				// 	wxToast.show({
				// 		title: `上传的头像不能大于${MAX_UPLOAD_MB}M!`
				// 	});
				// }

				wx.compressImage({
					src: tempFilePaths[0],
					quality,
					success: (res) => {
						this.uploadFile(res.tempFilePath, type);
					},
					fail: (res) => {
						// wx.compressImage 不支持 本地开发模式
						// 也不支持 非 jpg 图片
						this.uploadFile(tempFilePaths[0], type);
					},
				});
			},
		});
	},
	// 文件上传
	uploadFile(event) {
		const { file } = event.detail;
		const { imgList } = this.data
		api
			.uploadFile({
				filePath: file.url,
				name: "media",
			})
			.then((res) => {
				this.setData({
					imgList: [...imgList, { url: res.data.media_url, name: '' }]
				});
			});
	},
	// 家庭成员切换
	onClick(event) {
		const { id, name, card, sex, age, sickhis } = event.currentTarget.dataset;
		this.setData({
			familyChoose: id,
			familyChooseName: name,
			familyChooseCard: card,
			familyChooseSex: sex,
			familyChooseAge: age,
			familyChooseSickhis: sickhis,
			familySelShow: false
		});
	},
	onClose() {
		this.setData({
			familySelShow: false
		})
	},
	openFamilyChoose() {
		this.setData({
			familySelShow: true
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
	getSickList() {
		return new Promise((resolve, reject) => {
			api.getSickList({
				code: 'familyMedicalHistorys'
			}).then(res => {
				this.setData({
					sickList: res.data.records
				}, () => {
					resolve()
				})
			}).catch(() => {
				reject()
			})
		})
	},
	del(e) {
		const { detail: { index } } = e
		console.log(e, index)
		const { imgList } = this.data
		imgList.splice(index, 1)
		this.setData({
			imgList
		})
	},
	confirm() {
		const { imgList, desc, familyChooseCard, familyChooseAge, familyChooseSex, familyChooseSickhis, familyChooseName, productCode, doctorId, userInfo: { id: userId }, toUserId, sickList } = this.data
		const params = {
			params: {
				doctorId,
				patientSex: familyChooseSex,
				productCode,
				patientIdcard: familyChooseCard,
				patientName: familyChooseName,
				patientAge: familyChooseAge,
				userId,
				description: desc,
				payAmount: '0.0',
				caseUrl: imgList.map(i => i.url).join(',')
			},
		}
		console.log('params', params)
		api.sendOrder(params).then(res => {
			wxToast.show({
				title: '问诊已提交，请耐心等待医生接诊...',
				duration: 5000,
				done: () => {
					wx.navigateBack()
				}
			})
			const familyChooseSickhisStr = familyChooseSickhis && familyChooseSickhis.split(',').map(i => sickList.find(s => s.itemValue === i).itemText).join(',') || '无'
			const message = wx.$TUIKit.createTextMessage({
				to: toUserId,
				conversationType: wx.$TUIKitTIM.TYPES.CONV_C2C,
				payload: {
					text: `   患者信息   \n姓名：${familyChooseName}\n性别：${familyChooseSex === '1' ? '男' : '女'}\n年龄：${familyChooseAge}\n主诉：${desc}\n家族病史：${familyChooseSickhisStr}\n`
				},
			})

			let promise = wx.$TUIKit.sendMessage(message);
			promise.then(function (imResponse) {
				// 发送成功
				console.log(imResponse, "发送成功");
			}).catch(function (imError) {
				// 发送失败
				console.warn('sendMessage error:', imError);
			});
		})
	},
})