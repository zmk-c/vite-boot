/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-15 23:56:22
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-25 16:49:33
 * @FilePath: /vite-boot/src/api/user/index.ts
 * @Description: 统一用户信息/登陆/退出相关接口
 */

import request from '@/utils/request';
// 引入登陆的ts类型
import { LoginFormData, LoginResponseData } from './type';

// 统一用户信息/登陆/退出相关接口
export function userInfo() {
	return {
		login: (data: LoginFormData) => {
			return request<LoginResponseData, any>({
				url: 'user/login',
				method: 'post',
				data: data,
			});
		},
		reqUserInfo: () => {
			return request({
				url: 'user/getUserInfo',
				method: 'get',
			});
		},
		loginOut: (params: any) => {
			return request<LoginResponseData, any>({
				url: 'user/loginOut',
				method: 'get',
				params: params,
			});
		},
	};
}
