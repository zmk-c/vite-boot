/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-17 18:54:21
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-18 09:27:27
 * @FilePath: /vite-boot/src/router/router.ts
 * @Description: 常量路由
 */
export const constantRoute = [
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		name: 'login',
		meta: {
			title: '登录', // 菜单标题
			hidden: true, // 是否隐藏
		},
	},
	{
		path: '/',
		component: () => import('@/layout/index.vue'),
		name: 'layout',
		meta: {
			title: 'layout',
			hidden: false,
			icon: '',
		},
		redirect: '/home',
		children: [
			{
				path: '/home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '首页',
					hidden: false,
					icon: 'HomeFilled',
				},
			},
			{
				path: '/ceshi',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '测试',
					hidden: false,
					icon: 'HomeFilled',
				},
			},
		],
	},
	{
		path: '/screen',
		component: () => import('@/views/screen/index.vue'),
		name: 'screen',
		meta: {
			title: '大屏',
			hidden: false,
			icon: 'Platform',
		},
	},
	{
		path: '/404',
		component: () => import('@/views/404/index.vue'),
		name: '404',
		meta: {
			title: '404',
			hidden: true,
		},
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		name: 'Any',
		meta: {
			title: '任意路由',
			hidden: true,
		},
	},
];
