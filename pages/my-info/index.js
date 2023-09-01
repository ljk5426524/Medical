// pages/my-info/index.js
import api from "../../api/index";
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {
			userName: '',
			sex: 1,
			cardNum: '',
			phone: '',
			age: '',
			marriage: 0
		},
		popType: 1, // 1:性别 2:婚育
		sexColumns: [{
			text: '男',
			value: 1,
		}, {
			text: '女',
			value: 0,
		}],
		marryColumns: [{
			text: '未婚',
			value: 0,
		}, {
			text: '已婚',
			value: 1,
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

	},


	// 更换头像
	changeAvator() {
		wx.chooseImage({
			count: 1,
			sizeType: ["original", "compressed"],
			sourceType: ["album", "camera"],
			success: res => {
				const MAX_UPLOAD_MB = 10;
				const quality = 20;

				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths;
				const tempFilesSize = res.tempFiles[0].size;

				// 最大图片10M
				if (tempFilesSize > MAX_UPLOAD_MB * 1024 * 1024) {
					wxToast.show({
						title: `上传的头像不能大于${MAX_UPLOAD_MB}M!`
					});
				}

				wx.compressImage({
					src: tempFilePaths[0],
					quality,
					success: res => {
						this.uploadFile(res.tempFilePath);
					},
					fail: res => {
						// wx.compressImage 不支持 本地开发模式
						// 也不支持 非 jpg 图片
						this.uploadFile(tempFilePaths[0]);
					}
				});
			}
		});
	},

	// 文件上传
	uploadFile(filePath) {
		api
			.uploadFile({
				filePath,
				name: "file"
			})
			.then(res => {
				this.setData({
					userInfo: {
						...this.data.userInfo,
						picture: res.data.url
					}
				});
			});
	},
	sexSel() {
		this.setData({
			popType: 1,
			popShow: true
		})
	},
	marrySel() {
		this.setData({
			popType: 2,
			popShow: true
		})
	},
	onClose() {
		this.setData({
			popShow: false
		})
	},
	onSexChange(e) {
		const { value: { value } } = e.detail
		this.setData({
			userInfo: {
				...this.data.userInfo,
				sex: value
			}
		})
	},
	onMarryChange(e) {
		const { value: { value } } = e.detail
		this.setData({
			userInfo: {
				...this.data.userInfo,
				marriage: value
			}
		})
	},
	// 输入昵称、学生姓名、班主任姓名
	changeField(event) {
		const {
			detail,
			currentTarget: {
				dataset: { type }
			}
		} = event;

		console.log(detail, type);

		this.setData({
			userInfo: {
				...this.data.userInfo,
				[type]: detail
			}
		});
	},
	changePhone() {
		const { userInfo, username,
			cardNum,
			age, } = this.data
		console.log(userInfo, username,
			cardNum,
			age)
	},
	submit() { }
})