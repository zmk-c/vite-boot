/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-15 23:56:22
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-28 09:11:15
 * @FilePath: /vite-boot/src/api/user/index.ts
 * @Description: 统一用户信息/登陆/退出相关接口
 */

import request from '@/utils/request';
// 引入登陆的ts类型
import { LoginFormData, LoginResponseData, UserInfoResponseData } from './type';

// 统一用户信息/登陆/退出相关接口
export function userInfo() {
	return {
		reqLogin: (data: LoginFormData) => {
			return request<any, LoginResponseData>({
				// 范型当中第二个类型是约束返回数据的ts
				url: '/admin/acl/index/login',
				method: 'post',
				data: data,
			});
		},
		reqUserInfo: () => {
			return request<any, UserInfoResponseData>({
				url: '/admin/acl/index/info',
				method: 'get',
			});
		},
		reqLoginOut: () => {
			return request<any, any>({
				url: '/admin/acl/index/logout',
				method: 'post',
			});
		},
	};
}
