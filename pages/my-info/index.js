// pages/my-info/index.js
import api from "../../api/index";
import { wxToast } from "../../utils/wx-api";
import { getLocalUserInfo, saveLocalUserInfo } from "../../utils/storage";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    sexColumns: ["男", "女"],
    ageColumns: new Array(121).fill(0).map((v, i) => i),
    marryColumns: [
      "未婚未育",
      "未婚已育",
      "已婚未育",
      "已婚已育",
      "离婚未育",
      "离婚已育",
    ],
    popShow1: false,
    popShow2: false,
    popShow3: false,
    defaultSexIdx: 1,
    defaultMarryIdx: 1,
    defaultAgeIdx: 50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = getLocalUserInfo()
    this.setData({
      loginInfo: userInfo,
      userInfo: {
        ...userInfo,
        sex: userInfo.sex === '1' ? '男' : userInfo.sex === '2' ? '女' : '男'
      },
    }, () => {
      this.backViewPicker()
      this.getQRCode()
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

  // 更换头像
  changeAvator() {
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
        if (tempFilesSize > MAX_UPLOAD_MB * 1024 * 1024) {
          wxToast.show({
            title: `上传的头像不能大于${MAX_UPLOAD_MB}M!`,
          });
        }

        wx.compressImage({
          src: tempFilePaths[0],
          quality,
          success: (res) => {
            this.uploadFile(res.tempFilePath);
          },
          fail: (res) => {
            // wx.compressImage 不支持 本地开发模式
            // 也不支持 非 jpg 图片
            this.uploadFile(tempFilePaths[0]);
          },
        });
      },
    });
  },

  // 文件上传
  uploadFile(filePath) {
    api
      .uploadFile({
        filePath,
        name: "media",
      })
      .then((res) => {
        this.setData({
          userInfo: {
            ...this.data.userInfo,
            headImage: res.data.media_url,
          },
        });
      });
  },
  sexSel() {
    this.setData({
      popShow1: true,
    });
  },
  marrySel() {
    this.setData({
      popShow2: true,
    });
  },
  ageSel() {
    this.setData({
      popShow3: true,
    });
  },
  onClose() {
    this.setData({
      popShow1: false,
      popShow2: false,
      popShow3: false,
    });
  },
  onSexChange(e) {
    const { value } = e.detail;
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        sex: value,
      },
    });
  },
  onMarryChange(e) {
    const { value } = e.detail;
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        marry: value,
      },
    });
  },
  onAgeChange(e) {
    const { value } = e.detail;
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        age: value,
      },
    });
  },
  // 输入昵称、学生姓名、班主任姓名
  changeField(event) {
    const {
      detail,
      currentTarget: {
        dataset: { type },
      },
    } = event;

    this.setData({
      userInfo: {
        ...this.data.userInfo,
        [type]: detail,
      },
    });
  },
  changePhone() {
    const { userInfo, username, cardNum, age } = this.data;
    console.log(userInfo, username, cardNum, age);
  },
  submit() {
    const {
      userInfo: { mobile, age, name, headImage, sex, marry, idcard },
      loginInfo: { id },
      loginInfo,
    } = this.data;
    if (!name || !sex || !idcard || !mobile || !age || !marry) {
      wxToast.show({
        title: '请完善必填项'
      })
      return false
    } else if (idcard && idcard.length !== 18) {
      wxToast.show({
        title: '请填写正确的身份证号'
      })
      return false
    } else if (mobile && mobile.length !== 11) {
      wxToast.show({
        title: '请填写正确的手机号'
      })
      return false
    }
    api
      .editUserInfo({
        mobile,
        age,
        name,
        headImage,
        sex: sex === "男" ? "1" : "2",
        marry,
        idcard,
        id,
      })
      .then((res) => {
        saveLocalUserInfo({
          ...loginInfo,
          mobile,
          age,
          name,
          headImage,
          sex: sex === "男" ? "1" : "2",
          marry,
          idcard,
        });
        wxToast.show({
          title: "更新成功",
          done: () => {
            wx.navigateBack();
          },
        });
      });
  },
  getQRCode() {
    const { userInfo, userInfo: { id } } = this.data
    api.getUserCode({ id }).then(res => {
      this.setData({
        userInfo: {
          ...userInfo,
          qrCode: res.data
        }
      })
    })
  },
  previewCode() {
    const { userInfo: { qrCode } } = this.data
    wx.previewImage({
      current: qrCode, // 当前显示图片的http链接
      urls: [qrCode] // 需要预览的图片http链接列表
    })
  },
  // 回显示picker 默认值
  backViewPicker() {
    const { userInfo, userInfo: { sex, marry, age }, marryColumns } = this.data
    const defaultSexIdx = !sex ? 0 : sex === '男' ? 0 : 1
    const defaultMarryIdx = marry ? marryColumns.indexOf(marry) : 3
    const defaultAgeIdx = +age
    this.setData({
      defaultSexIdx,
      defaultMarryIdx,
      defaultAgeIdx,
      userInfo: {
        ...userInfo,
        age: age || 50,
        marry: marry || '已婚已育'
      }
    })
  }
});
