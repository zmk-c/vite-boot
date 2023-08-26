/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 00:12:03
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-27 00:05:46
 * @FilePath: /vite-boot/src/api/user/type.ts
 * @Description: 定义用户相关数据的ts类型
 */

// 登录表单类型声明
export interface LoginFormData {
	username: string;
	password: string;
}

// 登录接口返回数据类型
// 定义全部接口返回数据都拥有的ts类型

export interface ResponseData {
	code: number;
	message: string;
	ok: boolean;
}

// 定义登录接口返回的数据类型
export interface LoginResponseData extends ResponseData {
	data: string;
}

// 定义获取用户信息返回的数据类型
export interface UserInfoResponseData extends ResponseData {
	data: {
		routes: string[];
		buttons: string[];
		roles: string[];
		name: string;
		avatar: string;
	};
}
