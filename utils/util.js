
import { wxToast } from './wx-api'
import { getToken } from './storage'

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
export const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${formatNumber(year)}年${formatNumber(month)}月${formatNumber(day)}日`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

// => "hello=world&message=JavaScript%20is%20cool"
export function request({ url, data = {}, type, loadingText = '', isLoading = true, ...rest }) {
  const { token = "21186191f8ef442893fa64a69988aa6c", contentType = "application/x-www-form-urlencoded;charset=utf-8", selfHandle = false } = rest
  const header = {}
  let requestName = type || 'request'

  header['content-type'] = contentType

  getToken() && (header.Authorization = getToken())
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
        type || contentType === 'application/json' ? data : toUrlEncoded(data),
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

        console.log(resData)
        if (+code === 0 || selfHandle) {
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
              title: res.data.msg || '接口请求成功，但数据非预期，请稍后再试...',
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
