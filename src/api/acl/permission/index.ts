/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 00:10:43
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 15:47:01
 * @FilePath: /vite-boot/src/api/acl/permission/index.ts
 * @Description: 权限管理相关的接口
 */
import request from '@/utils/request';
// 引入菜单权限的ts类型
import { MenusResponseData, ReqSetRoleMenusData } from './type';

// 权限管理-菜单管理相关接口
export function menusAcl() {
	return {
		getMenusChecks: (roleId: number) => {
			// 获取当前权限菜单
			return request<any, MenusResponseData>({
				url: `/admin/acl/permission/toAssign/${roleId}`,
				method: 'get',
			});
		},
		setRoleMenus: (data: ReqSetRoleMenusData) => {
			// 给角色设置菜单权限
			return request<any, any>({
				url: `/admin/acl/permission/doAssignAcl`,
				method: 'post',
				data: data,
			});
		},
	};
}
