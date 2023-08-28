/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-25 23:17:48
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-28 09:35:05
 * @FilePath: /vite-boot/src/permission.ts
 * @Description: 做路由鉴权
 */
// 做路由鉴权（某一个路由什么条件下可以访问，什么条件下不可以访问）
import router from '@/router';
import nprogress from 'nprogress'; // 进度条插件
// 引入进度条样式
import 'nprogress/nprogress.css';
import pinia from './store';
import useUserStore from './store/modules/user';
const userStore = useUserStore(pinia);

//全局进度条的配置
nprogress.configure({ showSpinner: false }); // 进度显示/隐藏
// 全局守卫：项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
	// 用户未登录: 可以访问/login 其余路由不能访问
	// 用户已登录: /login路由不在被访问 除非退出 此时在访问/login页面指向首页，其余的路由也可以访问
	// 切换路由的时候title也更换
	document.title = '硅谷甄选-' + to.meta.title;

	nprogress.start(); // 进度条开始
	const token = userStore.token;
	const username = userStore.username;
	// 获取token去判断用户登录还是未登录
	if (token) {
		if (to.path === '/login') {
			next('/');
		} else {
			// 登录成功访问其余路由
			// 有用户信息
			if (username) {
				next();
			} else {
				// 没有用户信息 则在前置守卫这里发送请求获取到用户信息
				try {
					// 获取用户信息
					await userStore.userInfo();
					next({ ...to });
				} catch (error) {
					// 退出登录
					await userStore.userLogout();
					next({ path: '/login', query: { redirect: to.path } });
				}
			}
		}
	} else {
		// 用户未登录判断
		if (to.path === '/login') {
			next();
		} else {
			next({ path: '/login', query: { redirect: to.path } });
		}
	}

	next();
});

// 全局后置守卫
router.afterEach(() => {
	nprogress.done(); // 进度条消失
});
