// pages/my-info-doctor/index.js
import api from "../../api/index";
import { getLocalUserInfo, saveLocalUserInfo } from "../../utils/storage";
import { wxToast } from "../../utils/wx-api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    textAreaOption: {
      maxHeight: 100,
      minHeight: 50,
    },
    sexColumns: ["男", "女"],
    jobColumns: ["在职", "退休"],
    professionColumns: [
      { text: "主任医师", id: 3 },
      { text: "副主任医师", id: 4 },
      { text: "主治医师", id: 1 },
      { text: "住院医生", id: 13 },
      { text: "护士", id: 2 },
      { text: "专家", id: 5 },
    ],
    popShow1: false,
    popShow2: false,
    popShow3: false,
    deptColumns: [],
    hospitalColumns: [],
    defaultSexIdx: 0,
    defaultJobIdx: 0,
    defaultProfessionIdx: 0,
    defaultDeptIdx: 0,
    defaultHospitalIdx: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = getLocalUserInfo()
    Promise.all([this.getDepartmentPage(), this.getMerchantByPage()]).then(res => {
      this.setData({
        userInfo: {
          ...userInfo,
          sex: userInfo.sex ? userInfo.sex === "1" ? "男" : "女" : '男',
          workState: userInfo.workState === "1" ? "在职" : "退休",
        },
      }, () => {
        this.backViewPicker()
      });
    })
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
  uploadFile(filePath, type) {
    api
      .uploadFile({
        filePath,
        name: "media",
      })
      .then((res) => {
        this.setData({
          userInfo: {
            ...this.data.userInfo,
            [type]: res.data.media_url,
          },
        });
      });
  },

  // 关闭picker
  onClose() {
    this.setData({
      popShow1: false,
      popShow2: false,
      popShow3: false,
      deptShow: false,
      hospitalShow: false,
    });
  },

  // 打开picker
  selShow(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({
      deptShow: +type === 4,
      hospitalShow: +type === 5,
      popShow1: +type === 1,
      popShow2: +type === 2,
      popShow3: +type === 3,
    });
  },

  onPickerChange(e) {
    const { type } = e.currentTarget.dataset;
    const {
      value,
      value: { text, id },
    } = e.detail;
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        [type]: text || value,
      },
    });
    console.log(type === "titleName", id);
    if (type === "titleName") {
      this.setData({
        userInfo: {
          ...this.data.userInfo,
          title: id,
        },
      });
    }
  },
  changeField(e) {
    const {
      detail,
      currentTarget: {
        dataset: { type },
      },
    } = e;
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        [type]: detail,
      },
    });
  },

  getDepartmentPage() {
    return new Promise((resolve, reject) => {
      api.getDepartmentPage({}).then((res) => {
        this.setData({
          deptColumns: res.data.map((i) => {
            return {
              text: i.name,
              value: i.id,
            };
          }),
          deptList: res.data,
        }, () => {
          resolve()
        });
      }).catch(() => {
        reject()
      })
    })
  },
  getMerchantByPage() {
    return new Promise((resolve, reject) => {
      api.getMerchantByPage().then((res) => {
        this.setData({
          hospitalColumns: res.data.records.map((i) => {
            return {
              text: i.name,
              value: i.id,
            };
          }),
        }, () => {
          resolve()
        });
      }).catch(() => {
        reject()
      })
    })
  },
  onChange(e) {
    const { userInfo } = this.data;
    const { value } = e.detail;
    const { type } = e.currentTarget.dataset;
    this.setData({
      userInfo: {
        ...userInfo,
        [type + "Name"]: value.text,
        [type + "Id"]: value.value,
      },
    });
  },
  // 提交
  confirm() {
    const {
      userInfo: {
        name,
        sex,
        workState,
        merchantName,
        merchantId,
        departmentName,
        departmentId,
        title,
        idcard,
        goodat,
        summary,
        doctorCertPath,
        engageCertPath,
        idcardFrontImage,
        idcardBlankImage,
        headImage,
      },
    } = this.data;
    console.log(this.data.userInfo);
    if (
      !name ||
      !sex ||
      !workState ||
      !merchantName ||
      !merchantId ||
      !departmentName ||
      !departmentId ||
      !title ||
      !goodat ||
      !summary ||
      !doctorCertPath ||
      !engageCertPath
    ) {
      return wxToast.show({
        title: "请完善必填项！",
      });
    }
    api
      .editDoctorInfo({
        ...this.data.userInfo,
        sex: sex === "男" ? "1" : "2",
        workState: workState === "在职" ? "1" : "2",
        idcard: idcard === "null" ? "" : idcard,
      })
      .then((res) => {
        saveLocalUserInfo(res.data);
        wxToast.show({
          title: "修改成功",
          done: () => {
            wx.switchTab({
              url: "/pages/my-doctor/index",
            });
          },
        });
      });
  },
  // 回显picker
  backViewPicker() {
    const {
      userInfo: {
        sex,
        titleName,
        title,
        departmentName,
        departmentId,
        merchantName,
        merchantId,
        workState
      },
      professionColumns,
      deptColumns,
      hospitalColumns
    } = this.data
    console.log(hospitalColumns.findIndex(i => i.value === merchantId))
    this.setData({
      defaultSexIdx: !sex ? 0 : sex === '男' ? 0 : 1,
      defaultJobIdx: workState === "在职" ? 0 : 1,
      defaultProfessionIdx: professionColumns.findIndex(i => i.id === +title),
      defaultDeptIdx: deptColumns.findIndex(i => i.value === departmentId),
      defaultHospitalIdx: hospitalColumns.findIndex(i => i.value === +merchantId),
    })
  }
});
