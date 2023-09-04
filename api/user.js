import { request } from "../utils/util";
import { baseUrl } from "../config";

export default {
	// 头像、文件上传
	uploadFile(data) {
		return request({
			url: `${baseUrl}ftpFile/upload`,
			data,
			method: "post",
			type: "uploadFile",
			filePath: data.filePath,
			name: data.name
		});
	},
	// 手机号获取token
	getTokenByPhone(data) {
		return request({
			url: `${baseUrl}user/pwd/token`,
			data,
			method: "post",
			contentType: "application/x-www-form-urlencoded"
		});
	},
	// 校验用户信息是否完善
	checkUserInfo(data) {
		return request({
			url: `${baseUrl}api/v1/member/checkUserInfo`,
			data,
			method: "post"
		});
	}
}