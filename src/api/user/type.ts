/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 00:12:03
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-16 10:18:08
 * @FilePath: /vite-boot/src/api/user/type.ts
 * @Description: 登陆接口需要携带参数ts类型
 */

// 登录表单类型声明
export interface LoginFormData {
	username: string;
	password: string;
}

// 登录响应类型声明
export interface LoginResponseData {
	access_token: string;
	token_type: string;
}

// 验证码类型声明
export interface Captcha {
	img: string;
	uuid: string;
}
