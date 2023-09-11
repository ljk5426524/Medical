import { request } from "../utils/util";
import { baseUrl } from "../config";


export default {
  // 设置相关
  getSettingData(data) {
    return request({
      url: `${baseUrl}api/v1/amsAppAgreement/list`,
      data,
      method: "post",
      contentType: "application/json",
    });
  },
  // 关于我们
  aboutUs(data) {
    return request({
      url: `${baseUrl}v1/api/setting/aboutUs`,
      data,
      method: "post",
      contentType: "application/json",
    });
  },
}