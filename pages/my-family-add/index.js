// pages/my-family-add/index.js
import api from '../../api/index'
import { wxToast } from '../../utils/wx-api'
import { getLocalUserInfo } from '../../utils/storage'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {
			userName: '',
			sex: '男',
			cardNum: '',
			phone: '',
			age: 50,
			marriage: '已婚已育',
			relationship: '本人'
		},
		popType: 1, // 1:性别 2:婚育
		sexColumns: ['男', '女'],
		ageColumns: new Array(121).fill(0).map((v, i) => i),
		marryColumns: ['未婚未育', '未婚已育', '已婚未育', '已婚已育', '离婚未育', '离婚已育'],
		relationColumns: [
			'本人', '丈夫', '妻子', '父亲', '母亲', '儿子', '女儿', '爷爷', '奶奶', '外公', '外婆', '近亲', '远亲'],
		sickList: [{ name: '高血压', sel: false }, { name: '糖尿病', sel: false }, { name: '冠心病', sel: false }, { name: '高血脂', sel: false }],
		selSick: [],
		loginInfo: {},
		currentSexIdx: 0,
		currentMarryIdx: 3,
		currentRelationIdx: 0,
		currentAgeIdx: 50,
		infoReadOnly: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { id, type } = options

		this.setData({
			loginInfo: getLocalUserInfo(),
			infoReadOnly: !!type
		}, () => {
			this.getSickList().then(() => {
				if (id) {
					this.getMemberDetail(id)
				}
			})
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
	sexSel() {
		const { infoReadOnly } = this.data
		if (!infoReadOnly) {
			this.setData({
				popShow1: true
			})
		}
	},
	marrySel() {
		const { infoReadOnly } = this.data
		if (!infoReadOnly) {
			this.setData({
				popShow2: true
			})
		}
	},
	relationSel() {
		const { infoReadOnly } = this.data
		if (!infoReadOnly) {
			this.setData({
				popShow3: true
			})
		}
	},
	ageSel() {
		const { infoReadOnly } = this.data
		if (!infoReadOnly) {
			this.setData({
				popShow4: true
			})
		}
	},
	onClose() {
		this.setData({
			popShow1: false,
			popShow2: false,
			popShow3: false,
			popShow4: false,
		})
	},
	onSexChange(e) {
		const { value } = e.detail
		this.setData({
			userInfo: {
				...this.data.userInfo,
				sex: value
			}
		})
	},
	onMarryChange(e) {
		const { value } = e.detail
		this.setData({
			userInfo: {
				...this.data.userInfo,
				marriage: value
			}
		})
	},
	onRelationChange(e) {
		const { value } = e.detail
		this.setData({
			userInfo: {
				...this.data.userInfo,
				relationship: value
			}
		})
	},
	onAgeChange(e) {
		const { value } = e.detail
		this.setData({
			userInfo: {
				...this.data.userInfo,
				age: value
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
	historySel(e) {
		const { id } = e.currentTarget.dataset
		const { selSick, sickList, infoReadOnly } = this.data
		if (infoReadOnly) return false
		if (selSick.includes(id)) {
			this.setData({
				sickList: sickList.map(item => {
					if (item.id === id) {
						item.sel = false
					}
					return item
				}),
				selSick:
					selSick.filter(item => item !== id)
			})
		} else {
			this.setData({
				sickList: sickList.map(item => {
					if (item.id === id) {
						item.sel = true
					}
					return item
				}),
				selSick:
					[...selSick, id]
			})
		}
	},
	submit() {
		const {
			selSick,
			userInfo: {
				userName,
				sex,
				cardNum,
				phone,
				age,
				marriage,
				relationship
			},
			loginInfo: { id },
			currentMemberId
		} = this.data

		if (!sex || !cardNum || !phone || !age || !marriage || !relationship) {
			wxToast.show({
				title: `请完善必填项`
			})
			return false
		} else if (cardNum && cardNum.length !== 18) {
			wxToast.show({
				title: '请填写正确的身份证号'
			})
			return false
		} else if (phone && phone.length !== 11) {
			wxToast.show({
				title: '请填写正确的手机号'
			})
			return false
		}
		api[currentMemberId ? 'updateFamilyMember' : 'addFamilyMember']({
			id: currentMemberId || undefined,
			age,
			idCard: cardNum,
			marry: marriage,
			mobile: phone,
			name: userName,
			relationship,
			sex: sex === '男' ? '1' : '2',
			memberId: id || 99,
			familyMedicalHistory: selSick.join(',')
		}).then(res => {
			wxToast.show({
				title: `${currentMemberId ? '编辑' : '添加'}成功`,
				done: () => {
					wx.navigateBack()
				}
			})
		})
	},
	getSickList() {
		return new Promise((resolve, reject) => {
			api.getSickList({
				code: 'familyMedicalHistorys'
			}).then(res => {
				this.setData({
					sickList: res.data.records.map(i => {
						return {
							id: +i.itemValue,
							name: i.itemText,
							sel: false
						}
					})
				}, () => {
					resolve()
				})
			}).catch(() => {
				reject()
			})
		})
	},
	// 详情
	getMemberDetail(id) {
		api.getFamilyMemberDetail({ memberId: id }).then(res => {
			const {
				name,
				age,
				idCard,
				marry,
				mobile,
				relationship,
				sex,
				familyMedicalHistory
			} = res.data
			const { sickList, marryColumns, relationColumns } = this.data

			this.setData({
				currentMemberId: id,
				selSick: familyMedicalHistory && familyMedicalHistory.split(',').map(Number) || [],
				sickList: sickList.map(i => {
					if (familyMedicalHistory && familyMedicalHistory.split(',').map(Number).includes(i.id)) {
						i.sel = true
					} else {
						i.sel = false
					}
					return i
				}),
				userInfo: {
					userName: name || '',
					sex: sex ? sex === '1' ? '男' : '女' : '男',
					cardNum: idCard || '',
					phone: mobile || '',
					age: age,
					marriage: marry || '已婚已育',
					relationship: relationship || '本人'
				},
				currentSexIdx: sex && sex === '2' ? 1 : 0,
				currentMarryIdx: marry ? marryColumns.indexOf(marry) : 3,
				currentRelationIdx: relationship ? relationColumns.indexOf(relationship) : 0,
				currentAgeIdx: +age,
			})
		})
	}
})