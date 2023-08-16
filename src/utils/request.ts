/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-15 18:20:28
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-16 18:33:38
 * @FilePath: /vite-boot/src/utils/request.ts
 * @Description: axios二次封装
 */
// 进行axios二次封装：使用请求与响应拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 第一步：利用axios对象的create方法，去创建axios实例
const request = axios.create({
	// 基础路径
	baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径会携带 /dev-api
	timeout: 5000, // 超时时间设置
});

// 第二步：request实例添加请求与响应(基本的 axios官网)
// 添加请求拦截器
request.interceptors.request.use(
	(config) => {
		// config配置对象，headers属性请求头，经常给服务器携带公共参数
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 添加响应拦截器
request.interceptors.response.use(
	(config) => {
		// 成功回调 简化数据
		return config.data;
	},
	(error) => {
		// 失败回调： 处理http网络错误
		// 定义一个变量存储网络错误信息
		let message = '';
		const code = error.response.data;
		switch (code) {
			case 401:
				message = 'Token过期';
				break;
			case 403:
				message = '无权访问';
				break;
			case 404:
				message = '请求地址错误';
				break;
			case 500:
				message = '服务器出现问题';
				break;

			default:
				message = '网络出现问题';
				break;
		}
		// 提示错误信息
		ElMessage.error(message);

		return Promise.reject(error);
	}
);
// 第三步：导出 axios 实例
export default request;
