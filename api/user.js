import { request } from "../utils/util";
import { baseUrl } from "../config";

export default {
	// 头像、文件上传
	uploadFile(data) {
		return request({
			url: `${baseUrl}v1/api/file/upload`,
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
		});
	},
	// 校验用户信息是否完善
	checkUserInfo(data) {
		return request({
			url: `${baseUrl}api/v1/member/checkUserInfo`,
			data,
			method: "post"
		});
	},
	// 编辑用户信息
	editUserInfo(data) {
		return request({
			url: `${baseUrl}api/v1/member/editUserInfo`,
			data,
			method: "post"
		});
	},
	// code换openId
	loginByWxCode(data) {
		return request({
			url: `${baseUrl}login/loginByCode`,
			data,
			method: "post",
			contentType: 'application/json'
		})
	},
	// 解密手机号
	getUserPhone(data) {
		return request({
			url: `${baseUrl}wechat/getUserInfoByCode`,
			data,
			method: "post",
			contentType: 'application/json'
		})
	},
	// 注册登录 手机号绑定wxOpenId
	registeByUserPhone(data) {
		return request({
			url: `${baseUrl}wx/bindPhone`,
			data,
			method: "post",
			contentType: 'application/json'
		})
	},

	// 获取用户二维码
	getUserCode(data) {
		return request({
			url: `${baseUrl}qrCode/getImagePath`,
			data,
			method: 'get',
			contentType: 'application/json'
		})
	},

	// 获取扫码记录
	getScanRecord(data) {
		return request({
			url: `${baseUrl}api/v1/memberDoctorApply/applyDoctorList`,
			data,
			method: 'post',
		})
	}
}