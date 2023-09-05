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
}