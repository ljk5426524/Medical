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
}