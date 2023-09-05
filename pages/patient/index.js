// pages/patient/index.js
import api from '../../api/index'
import pinyin from 'js-pinyin'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		name: '',
		letters: [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
		],
		indexBarList: {},
		indexList: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getMyPatients()
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


	getMyPatients() {
		const { letters, name } = this.data
		api.getMyPatients({
			name,
			doctorId: 22
		}).then(res => {
			const list = res.data
			let indexBar = {}
			pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
			letters.forEach(item => {
				indexBar[item] = []
				list.forEach(el => {
					let first = pinyin
						.getCamelChars(el.nickname)
						.charAt(0)
						.toUpperCase() // fix 英文字母 会识别小写字母
					if (first === item) {
						indexBar[item].push(el)
					}
				})
			})
			let indexBarList = {}
			let indexList = []
			for (let k in indexBar) {
				if (indexBar[k].length > 0) {
					indexBarList[k] = indexBar[k]
					indexList.push(k)
				}
			}
			this.setData({
				indexBarList,
				indexList,
				patientList: list
			})
		})
	},
	onSearch(e) {
		this.setData({
			name: e.detail,
		}, () => {
			this.getMyPatients()
		});
	},

	onClickFriend() { }
})