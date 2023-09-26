import { request } from "../utils/util";
import { baseUrl } from "../config";

export default {
  // 查询患者列表
  getMyPatients(data) {
    return request({
      url: `${baseUrl}api/v1/member/getUserInfoByDoctorId`,
      data,
      method: "post",
    });
  },

  // 患者详情
  getPatientDetail(data) {
    return request({
      url: `${baseUrl}api/v1/member/getUserInfoByParam`,
      data,
      method: "post",
    });
  },

  // 患者详情诊疗记录
  getPatientRecordList(data) {
    return request({
      url: `${baseUrl}api/v1/medical/listRecord`,
      data,
      method: "post",
    });
  },

  // 新增患者列表
  getNewPatientList(data) {
    return request({
      url: `${baseUrl}api/v1/memberDoctorApply/applyDoctorList`,
      data,
      method: "post",
    });
  },

  // 处理患者好友请求
  handlePatientApply(data) {
    return request({
      url: `${baseUrl}api/v1/memberDoctorApply/doctorConfirm`,
      data,
      method: "post",
    });
  },
  // 个人中心统计
  getMyStatics(data) {
    return request({
      url: `${baseUrl}api/v1/doctor/getDoctorReceiptAndP`,
      data,
      method: "post",
    });
  },

  // 首页统计
  getHomeStatics(data) {
    return request({
      url: `${baseUrl}api/v1/doctor/getDoctorReceipt`,
      data,
      method: "post",
    });
  },

  // 消息列表
  getMsgList(data) {
    return request({
      url: `${baseUrl}v1/api/push/message/getList`,
      data,
      isLoading: false,
      method: "post",
    });
  },

  // 医生信息编辑
  editDoctorInfo(data) {
    return request({
      url: `${baseUrl}api/v1/doctor/editDoctor`,
      data,
      method: "post"
    });
  },

  // 医生编辑自己的状态 - 是否停诊
  editReceivePatient(data) {
    return request({
      url: `${baseUrl}api/v1/doctor/editReceivePatient`,
      data,
      method: "post"
    });
  },

  // 查询患者订单详情
  getSeekDetail(data) {
    return request({
      url: `${baseUrl}api/v1/dispatch/dispatchOrderDetail`,
      data,
      method: "post"
    });
  },

  // 处理患者订单 忽略
  handleRefusePatientSeek(data) {
    return request({
      url: `${baseUrl}api/v1/dispatch/refuseOrder`,
      data,
      method: "post"
    });
  },

  // 处理患者订单 同意
  handleAgreePatientSeek(data) {
    return request({
      url: `${baseUrl}api/v1/dispatch/receiptOrderNotify/${data.orderId}`,
      data,
      selfHandle: true,
      method: "post",
    });
  }
}