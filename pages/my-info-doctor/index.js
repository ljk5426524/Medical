// pages/my-info-doctor/index.js
import api from '../../api/index'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {},
		textAreaOption: {
			maxHeight: 100,
			minHeight: 50
		},
		sexColumns: ['男', '女'],
		jobColumns: ['在职', '退休'],
		professionColumns: ['主任医师', '副主任医师', '主治医师', '住院医生', '护士', '专家'],
		popShow: false,
		popType: 1,
		deptColumns: []
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

	uploadPic(e) {
		const { type } = e.currentTarget.dataset
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
				// if (tempFilesSize > MAX_UPLOAD_MB * 1024 * 1024) {
				// 	wxToast.show({
				// 		title: `上传的头像不能大于${MAX_UPLOAD_MB}M!`
				// 	});
				// }

				wx.compressImage({
					src: tempFilePaths[0],
					quality,
					success: res => {
						this.uploadFile(res.tempFilePath, type);
					},
					fail: res => {
						// wx.compressImage 不支持 本地开发模式
						// 也不支持 非 jpg 图片
						this.uploadFile(tempFilePaths[0], type);
					}
				});
			}
		});
	},
	// 文件上传
	uploadFile(filePath, type) {
		api
			.uploadFile({
				filePath,
				name: "media"
			})
			.then(res => {
				this.setData({
					userInfo: {
						...this.data.userInfo,
						[type]: res.data.media_url
					}
				});
			});
	},

	// 关闭picker
	onClose() {
		this.setData({
			popShow: false,
			deptShow: false
		})
	},

	// 打开picker
	selShow(e) {
		const { type } = e.currentTarget.dataset
		this.setData({
			popShow: true,
			popType: +type
		})
	},

	onPickerChange(e) {
		const { type } = e.currentTarget.dataset
		const { value } = e.detail
		this.setData({
			userInfo: {
				...this.data.userInfo,
				[type]: value
			}
		})
	},
	changeField(e) {
		const {
			detail,
			currentTarget: {
				dataset: { type }
			}
		} = e;
		this.setData({
			userInfo: {
				...this.data.userInfo,
				[type]: detail
			}
		})
	},

	getDepartmentPage() {
		api.getDepartmentPage({}).then(res => {
			this.setData({
				departmentList: res.data
			})
		})
	},
	// 提交
	confirm() {
		// const { user }
	}
})