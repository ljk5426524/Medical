import { request } from "../utils/util";
import { baseUrl } from "../config";

export default {
  // 查询患者关注的专家 我的专家
  getMyDoctors(data) {
    return request({
      url: `${baseUrl}api/v1/doctor/selectDoctorByUserId`,
      data,
      method: "post",
    });
  },
  // 专家详情
  getDoctorDetial(data) {
    return request({
      url: `${baseUrl}api/v1/doctor/findDoctorDetail`,
      data,
      method: "post",
    })
  },
  // 申请专家好友
  applyDoctorFriend(data) {
    return request({
      url: `${baseUrl}api/v1/memberDoctorApply/applyDoctor`,
      data,
      method: "post",
    })
  },
  // 我的家庭成员
  getMyFamily(data) {
    return request({
      url: `${baseUrl}api/v1/memberFamily/findFamilyMember`,
      data,
      method: "post",
    })
  },
  // 新增家庭成员
  addFamilyMember(data) {
    return request({
      url: `${baseUrl}api/v1/memberFamily/saveFamilyMember`,
      data,
      method: "post",
    })
  },
  // 查看家庭成员详情
  getFamilyMemberDetail(data) {
    return request({
      url: `${baseUrl}api/v1/memberFamily/findFamilyMemberById`,
      data,
      method: "post",
    })
  },
  // 新增家庭成员
  updateFamilyMember(data) {
    return request({
      url: `${baseUrl}api/v1/memberFamily/updateFamilyMember`,
      data,
      method: "post",
    })
  },


  // 疾病列表
  getSickList(data) {
    return request({
      url: `${baseUrl}v1/api/index/getDict`,
      data,
      method: 'post',
    })
  },
  // 义诊体检列表
  getServiceRecordList(data) {
    return request({
      url: `${baseUrl}api/v1/serviceRecord/listPage`,
      data,
      method: "post",
      contentType: 'application/json'
    })
  },
  // 在线问诊记录
  getOnlineRecord(data) {
    return request({
      url: `${baseUrl}api/v1/order/selectOnlineOrderByUserId`,
      data,
      method: "post",
    })
  },
  // 快速问诊订单
  getFasteRecord(data) {
    return request({
      url: `${baseUrl}api/v1/order/selectDispatchOrderByUserId`,
      data,
      method: "post",
      contentType: 'application/json'
    })
  },
  // 记录订单详情
  getOrderDetail(data) {
    return request({
      url: `${baseUrl}api/v1/order/getOrderDetailByOrderId`,
      data,
      method: "post"
    })
  },
  // 老年健康 服务列表
  getServiceList(data) {
    return request({
      url: `${baseUrl}api/v1/service/listPage`,
      data,
      method: "post",
      contentType: 'application/json'
    })
  },
  // 老年健康 服务详情
  getServiceDetail(data) {
    return request({
      url: `${baseUrl}api/v1/service/detail`,
      data,
      method: "get",
      contentType: 'application/json'
    })
  },
  // 老年健康 服务预约
  orderService(data) {
    return request({
      url: `${baseUrl}api/v1/service/order`,
      data,
      selfHandle: true,
      method: "post",
      contentType: 'application/json'
    })
  },
  // 首页搜索
  getSearchList(data) {
    return request({
      url: `${baseUrl}v1/api/patientIndex/searchInfoForAndroid`,
      data,
      method: "post",
    })
  },

  // 我的服务详情
  getMyServiceDetail(data) {
    return request({
      url: `${baseUrl}api/v1/serviceRecord/detail`,
      data,
      method: "get",
      contentType: 'application/json'
    })
  },
  // 我的服务转让
  transferMyService(data) {
    return request({
      url: `${baseUrl}api/v1/serviceRecord/transfer`,
      data,
      method: "post",
      contentType: 'application/json'
    })
  },

  // 发起图文问诊
  sendOrder(data) {
    return request({
      url: `${baseUrl}api/v1/order/handler/4`,
      data,
      method: "post",
      contentType: 'application/json'
    })
  },
  // 问诊评价
  saveEvaluate(data) {
    return request({
      url: `${baseUrl}api/v1/order/saveOrderComment`,
      data,
      method: "post",
    })
  },
  // 评价详情
  getEvaluateDetail(data) {
    return request({
      url: `${baseUrl}api/v1/order/getOrderComment`,
      data,
      method: 'post'
    })
  },
  // 服务消息
  getServiceMsgList(data) {
    return request({
      url: `${baseUrl}api/v1/serviceRecord/msg/listPage`,
      data,
      method: 'post',
      contentType: 'application/json'
    })
  }
}
