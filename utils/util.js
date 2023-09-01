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
export function request({ url, data, type, loadingText = '', isLoading = true, ...rest }) {
  const { token } = rest
  const header = {}
  let requestName = type || 'request'

  if (wx.getStorageSync('cookie')) {
    header.cookie = wx.getStorageSync('cookie')
  }

  token && (header.token = token)

  return new Promise((reslove, reject) => {
    if (isLoading) {
      wx.showLoading({
        title: loadingText,
        mask: true
      });
    }

    wx[requestName]({
      url,
      data,
      header,
      ...rest,
      success: res => {
        isLoading && wx.hideLoading();

        if (res.header && res.header['Set-Cookie']) {
          wx.setStorageSync('cookie', res.header['Set-Cookie'])
        }

        let resData = res.data

        if (typeof resData === 'string') {
          resData = JSON.parse(resData)
        }

        const { errorCode, success } = resData

        if (errorCode === 200 && success) {
          reslove(resData)
        } else {
          reject('非预期结果')

          // session 过期
          if (errorCode === 406 || errorCode === 401) {
            gotoAuth()
          } else if (errorCode === 40006) {
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
