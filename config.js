/**
 * 小程序业务配置文件
 */

// export const baseUrl = 'http://39.99.224.123/jk-hms/' // 测试环境
export const baseUrl = 'https://app.kbing123.com/jk-hms/' // 测试环境
// export const baseUrl = 'https://app.kbing123.com/patient/' // 生产环境


// 患者tabbar
const TABBAR_DATA = [
  {
    "iconPath": "./res/images/doctor/home.png",
    "selectedIconPath": "./res/images/doctor/home-active.png",
    "pagePath": "pages/home/index",
    "text": "首页"
  },
  {
    "iconPath": "./res/images/patient/msg.png",
    "selectedIconPath": "./res/images/patient/msg-active.png",
    "pagePath": "pages/chat/index",
    "text": "消息"
  },
  {
    "iconPath": "./res/images/patient/my.png",
    "selectedIconPath": "./res/images/patient/my-active.png",
    "pagePath": "pages/my/index",
    "text": "我的"
  }
]


// 医生tabbar
const TABBAR_DATA_DOCTOR = [
  {
    "iconPath": "./res/images/doctor/home.png",
    "selectedIconPath": "./res/images/doctor/home-active.png",
    "pagePath": "pages/home-doctor/index",
    "text": "首页"
  },
  {
    "iconPath": "./res/images/doctor/patient.png",
    "selectedIconPath": "./res/images/doctor/patient-active.png",
    "pagePath": "pages/patient/index",
    "text": "患者"
  },
  {
    "iconPath": "./res/images/doctor/my.png",
    "selectedIconPath": "./res/images/doctor/my-active.png",
    "pagePath": "pages/my-doctor/index",
    "text": "我的"
  }
]