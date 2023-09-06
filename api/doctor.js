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
}