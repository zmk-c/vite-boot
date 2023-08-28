/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 11:29:10
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-28 09:10:45
 * @FilePath: /vite-boot/src/store/modules/user.ts
 * @Description: 用户存储相关仓库
 */
import { defineStore } from 'pinia';
import { userInfo } from '@/api/user';
// 登陆接口请求和返回数据
import { LoginFormData, LoginResponseData, UserInfoResponseData } from '@/api/user/type';
// 用户仓库数据类型
import { UserState } from './types/type';
// 引入路由(常量)
import { constantRoute } from '@/router/router';

// 创建用户相关仓库
const useUserStore = defineStore('User', {
	// 小仓库存储数据地方 返回类型为UserState类型
	state: (): UserState => {
		return {
			token: localStorage.getItem('token'), // 用户唯一标识token
			menuRoutes: constantRoute, // 仓库存储生成菜单需要的路由数组
			username: '',
			avatar: '',
		};
	},

	// 异步|逻辑的地方
	actions: {
		// 用户登陆的方法
		async userLogin(userForm: LoginFormData) {
			const res: LoginResponseData = await userInfo().reqLogin(userForm);
			// 登陆请求成功 获取token
			if (res.code == 200) {
				// pinia仓库存储token
				// 由于pinia存储数据其实是利用js对象
				this.token = res.data as string; // 断言
				// 最好本地存储持久化一份
				localStorage.setItem('token', res.data as string);
				// 能保证当前async函数返回一个成功的promise
				return 'ok';
			} else {
				// 登陆请求失败
				return Promise.reject(new Error(res.data));
			}
		},

		// 获取用户信息的方法 视频里是登陆只返回token 在通过接口携带token去获取用户信息
		async userInfo() {
			const res: UserInfoResponseData = await userInfo().reqUserInfo();
			console.log('getUserInfo ------', res);
			if (res.code === 200) {
				this.username = res.data.name as string; // 断言
				this.avatar = res.data.avatar as string;
				return 'ok'; // 这里与permisstion.ts对应上
			} else {
				return Promise.reject(res.message);
			}
		},

		// 退出登录
		async userLogout() {
			const res: any = await userInfo().reqLoginOut();
			if (res.code === 200) {
				this.token = '';
				this.username = '';
				this.avatar = '';
				localStorage.removeItem('token');
				return 'ok';
			} else {
				return Promise.reject(res.message);
			}
		},
	},
});
// 对外暴露
export default useUserStore;
