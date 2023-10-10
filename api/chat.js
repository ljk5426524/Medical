import { request } from "../utils/util";
import { baseUrl } from "../config";

export default {
  // 消息列表
  getChatList(data) {
    return request({
      url: `${baseUrl}/v1/api/push/message/getList`,
      data,
      isLoading: false,
      method: "post",
    });
  },
  // 发消息
  senMsgByPatient(data) {
    return request({
      url: `${baseUrl}v1/api/im/message/sendMsg`,
      data,
      isLoading: false,
      method: 'post'
    })
  },
  // 关闭对话
  closeDialogByDoctor(data) {
    return request({
      url: `${baseUrl}api/v1/dispatch/closeOrder`,
      data,
      isLoading: false,
      method: 'post'
    })
  },
  // 会话详情
  getMsgDetail(data) {
    return request({
      url: `${baseUrl}v1/api/im/message/getImMsg`,
      data,
      isLoading: false,
      method: 'post'
    })
  },
  // 获取订单时间、是否评价
  getOrderTime(data) {
    return request({
      url: `${baseUrl}api/v1/dispatch/getOrderServerTime`,
      data,
      isLoading: false,
      method: 'post'
    })
  },
}