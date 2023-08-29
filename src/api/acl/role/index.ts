/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 00:10:43
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 14:55:29
 * @FilePath: /vite-boot/src/api/acl/role/index.ts
 * @Description: 权限管理相关的接口
 */
import request from '@/utils/request';
// 引入角色管理的的ts类型
import { Role, RoleFormData, RoleResponseData } from './type';

// 权限管理-角色管理相关接口
export function userAcl() {
	return {
		reqUserInfo: (params: RoleFormData) => {
			// 获取用户信息列表
			return request<any, RoleResponseData>({
				// 范型当中第二个类型是约束返回数据的ts
				url: `/admin/acl/role/${params.page}/${params.limit}/?roleName=${params.roleName}`,
				method: 'get',
			});
		},
		saveRole: (data: Role) => {
			// 新增角色
			return request<any, any>({
				url: `/admin/acl/role/save`,
				method: 'post',
				data: data,
			});
		},
		updateRole: (data: Role) => {
			// 编辑角色
			return request<any, any>({
				url: `/admin/acl/role/update`,
				method: 'put',
				data: data,
			});
		},
		deleteRole: (id: number) => {
			// 单个删除
			return request<any, any>({
				url: `/admin/acl/role/remove/${id}`,
				method: 'delete',
				data: id,
			});
		},
		batchDeleteRoles: (idList: number[]) => {
			// 批量个删除
			return request<any, any>({
				url: `/admin/acl/role/batchRemove`,
				method: 'delete',
				data: idList,
			});
		},
	};
}
