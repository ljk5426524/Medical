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
  // 疾病列表
  getSickList(data) {
    return request({
      url: `${baseUrl}v1/api/index/getDict`,
      data,
      method: 'post',
    })
  }
}
