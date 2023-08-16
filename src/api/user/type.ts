/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 00:12:03
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-16 18:36:01
 * @FilePath: /vite-boot/src/api/user/type.ts
 * @Description: 登陆接口需要携带参数ts类型
 */

// 登录表单类型声明
export interface LoginFormData {
	username: string;
	password: string;
}

// 登录接口返回数据类型
export interface LoginResponseData {
	code: number;
	data: dataType;
}

interface dataType {
	token?: string;
	message?: string;
}
