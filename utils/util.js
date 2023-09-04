
import {
  wxToast
} from './wx-api'

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

// => "hello=world&message=JavaScript%20is%20cool"
export function request({ url, data = {}, type, loadingText = '', isLoading = true, ...rest }) {
  const { token = "3692c3ad47154f06b0f53f097ffb9117" } = rest
  const header = {}
  let requestName = type || 'request'

  if (wx.getStorageSync('token')) {
    header.Authorization = wx.getStorageSync('token')
  }
  header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  // header['content-type'] = 'multipart/form-data; boundary=XXX'
  token && (header.Authorization = token)

  return new Promise((reslove, reject) => {
    if (isLoading) {
      wx.showLoading({
        title: loadingText,
        mask: true
      });
    }
    console.log(header, toUrlEncoded(data))
    wx[requestName]({
      url,
      data:
        toUrlEncoded(data),
      header,
      ...rest,
      success: res => {
        isLoading && wx.hideLoading();

        if (res.header && res.header['Authorization']) {
          wx.setStorageSync('token', res.header['Authorization'])
        }

        let resData = res.data

        if (typeof resData === 'string') {
          resData = JSON.parse(resData)
        }
        const { code } = resData

        if (+code === 0) {
          reslove(resData)
        } else {
          reject('非预期结果')

          // session 过期
          if (code === 406 || code === 401) {
            gotoAuth()
          } else if (code === 40006) {
            // 用户被禁用
            wxToast.show({
              title: res.data.errorMsg,
              done: () => {
                gotoAuth()
              }
            })
          } else {

            wxToast.show({
              title: res.data.errorMsg || '接口请求成功，但数据非预期，请稍后再试...',
            })

          }
        }
      },
      fail: err => {
        isLoading && wx.hideLoading()

        wxToast.show({
          title: '网络异常，请稍后再试！',
        })

        reject(err)
      }
    });
  });
}
