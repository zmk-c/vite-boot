/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-15 23:56:22
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-16 00:37:34
 * @FilePath: /vite-boot/src/api/user/index.ts
 * @Description: 统一用户信息/登陆/退出相关接口
 */

import request from '@/utils/request';
// 引入登陆的ts类型
import { LoginFormData } from './type';

// 统一用户信息/登陆/退出相关接口
export function userInfo() {
	return {
		login: (data: LoginFormData) => {
			return request({
				url: 'user/login',
				method: 'post',
				data: data,
			});
		},
		loginOut: (params: any) => {
			return request({
				url: 'user/loginOut',
				method: 'get',
				params: params,
			});
		},
	};
}
