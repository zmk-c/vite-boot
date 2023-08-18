/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 18:38:30
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-17 19:03:30
 * @FilePath: /vite-boot/src/store/modules/types/type.ts
 * @Description:
 */

import { RouteRecordRaw } from 'vue-router';
export interface UserState {
	token: string | null;
	menuRoutes: RouteRecordRaw[]; // 路由表类型
}
