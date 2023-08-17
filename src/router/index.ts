/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 08:55:49
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-17 09:11:53
 * @FilePath: /vite-boot/src/router/index.ts
 * @Description: 通过vue-router插件实现模版路由配置
 */
// 通过vue-router插件实现模版路由配置

import { createRouter, createWebHashHistory } from 'vue-router';

// 创建路由器
const router = createRouter({
	// 路由模式hash 基于hash实现 路由前面有'#/'
	history: createWebHashHistory(),
	routes: [
		{
			// 登陆
			path: '/login',
			component: () => import('@/views/login/index.vue'),
			name: 'login',
		},
		{
			// 登陆成功狗展示的数据路由
			path: '/',
			component: () => import('@/layout/index.vue'),
			name: 'layout',
		},
		{
			// 登陆
			path: '/404',
			component: () => import('@/views/404/index.vue'),
			name: '404',
		},
	],
	// 刷新时，滚动条位置还原
	scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
