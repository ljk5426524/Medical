// pages/my-family-add/index.js
import api from '../../api/index'
import { wxToast } from '../../utils/wx-api'
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
        selSick: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSickList()
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
        this.setData({
            popType: 1,
            popShow: true
        })
    },
    relationSel() {
        this.setData({
            popType: 3,
            popShow: true
        })
    },
    marrySel() {
        this.setData({
            popType: 2,
            popShow: true
        })
    },
    ageSel() {
        this.setData({
            popType: 0,
            popShow: true
        })
    },
    onClose() {
        this.setData({
            popShow: false
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
    historySel(e) {
        const { id } = e.currentTarget.dataset
        const { selSick, sickList } = this.data
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
        const { userInfo: {
            userName,
            sex,
            cardNum,
            phone,
            age,
            marriage,
            relationship
        }, selSick } = this.data

        console.log(selSick)
        if (!sex || !cardNum || !phone || !age || !marriage || !relationship) {
            wxToast.show({
                title: `请完善必填项`
            })
            return false
        }
        api.addFamilyMember({
            age,
            idCard: cardNum,
            marry: marriage,
            mobile: phone,
            name: userName,
            relationship,
            sex: sex === '男' ? '1' : '2',
            memberId: 99,
            familyMedicalHistory: selSick.join(',')
        }).then(res => {
            wxToast.show({
                title: '添加成功',
                done: () => {
                    wx.navigateBack()
                }
            })
        })
    },
    getSickList() {
        api.getSickList({
            code: 'familyMedicalHistorys'
        }).then(res => {
            console.log(res)
            this.setData({
                sickList: res.data.records.map(i => {
                    return {
                        id: +i.itemValue,
                        name: i.itemText,
                        sel: false
                    }
                })
            })
        })
    }
})