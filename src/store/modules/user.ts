/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 11:29:10
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-16 19:24:09
 * @FilePath: /vite-boot/src/store/modules/user.ts
 * @Description: 用户存储相关仓库
 */
import { defineStore } from 'pinia';
import { userInfo } from '@/api/user';
import { LoginFormData, LoginResponseData } from '@/api/user/type'; // 登陆接口请求和返回数据
import { UserState } from './types/type'; // 用户仓库数据类型

// 创建用户相关仓库
const useUserStore = defineStore('User', {
	// 小仓库存储数据地方 返回类型为UserState类型
	state: (): UserState => {
		return {
			token: localStorage.getItem('token'), // 用户唯一标识token
		};
	},

	// 异步|逻辑的地方
	actions: {
		// 用户登陆的方法
		async userLogin(userForm: LoginFormData) {
			const res: LoginResponseData = await userInfo().login(userForm);
			// 登陆请求成功 获取token
			console.log(res);
			if (res.code == 200) {
				// pinia仓库存储token
				// 由于pinia存储数据其实是利用js对象
				this.token = res.data.token as string; // 断言
				// 最好本地存储持久化一份
				localStorage.setItem('token', res.data.token as string);
				// 能保证当前async函数返回一个成功的promise
				return 'ok';
			} else {
				// 登陆请求失败
				return Promise.reject(new Error(res.data.token));
			}
		},
	},
});
// 对外暴露
export default useUserStore;
