/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 08:55:49
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-17 18:56:05
 * @FilePath: /vite-boot/src/router/index.ts
 * @Description: 通过vue-router插件实现模版路由配置
 */
// 通过vue-router插件实现模版路由配置

import { createRouter, createWebHashHistory } from 'vue-router';
// 导入常量路由
import { constantRoute } from './router';

// 创建路由器
const router = createRouter({
	// 路由模式hash 基于hash实现 路由前面有'#/'
	history: createWebHashHistory(),
	routes: constantRoute,
	// 刷新时，滚动条位置还原
	scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
