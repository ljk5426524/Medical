import { request } from "../utils/util";
import { baseUrl } from "../config";

export default {
  // 医院列表
  getMerchantByPage(data) {
    return request({
      url: `${baseUrl}api/v1/merchant/getMerchantByPage`,
      data,
      method: "post",
    });
  },

  // 医院详情
  getMerchantByDetail(data) {
    return request({
      url: `${baseUrl}api/v1/merchant/getMerchantDetail`,
      data,
      method: "post",
    })
  },
  // 医院科室详情
  getDepartmentByMerchant(data) {
    return request({
      url: `${baseUrl}api/v1/department/getDepartmentByMerchantId/${data.id}`,
      method: "post",
    })
  },

  // 科室列表
  getDepartmentPage(data) {
    return request({
      url: `${baseUrl}api/v1/department/listDepartment`,
      data,
      method: "post",
    })
  },

  // 医生列表
  selectDoctorByPage(data) {
    return request({
      url: `${baseUrl}api/v1/doctor/selectDoctorByPage`,
      data,
      method: "post",
    })
  },

  // 医生详情
  getDoctorDetail(data) {
    return request({
      url: `${baseUrl}api/v1/doctor/findDoctorDetail`,
      data,
      method: "post",
    })
  },
  // 专家可提供的服务
  findDoctorProduct(data) {
    return request({
      url: `${baseUrl}api/v1/doctor/findDoctorProduct`,
      data,
      method: "post",
    })
  },
}
