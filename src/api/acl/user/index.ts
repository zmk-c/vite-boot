/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 00:10:43
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 13:59:07
 * @FilePath: /vite-boot/src/api/acl/user/index.ts
 * @Description: 权限管理相关的接口
 */
import request from '@/utils/request';
// 引入登陆的ts类型
import { User, UserFormData, UserResponseData, AllRolesResponseData, ReqSetRoleData } from './type';

// 权限管理-用户管理相关接口
export function userAcl() {
	return {
		reqUserInfo: (params: UserFormData) => {
			// 获取用户信息列表
			return request<any, UserResponseData>({
				// 范型当中第二个类型是约束返回数据的ts
				url: `/admin/acl/user/${params.page}/${params.limit}/?username=${params.username}`,
				method: 'get',
			});
		},
		saveUser: (data: User) => {
			// 新增用户
			return request<any, any>({
				url: `/admin/acl/user/save`,
				method: 'post',
				data: data,
			});
		},
		updateUser: (data: User) => {
			// 编辑用户
			return request<any, any>({
				url: `/admin/acl/user/update`,
				method: 'put',
				data: data,
			});
		},
		getRoleChecks: (adminId: number) => {
			// 获取当前用户的角色 以及全部角色
			return request<any, AllRolesResponseData>({
				// 范型当中第二个类型是约束返回数据的ts
				url: `/admin/acl/user/toAssign/${adminId}`,
				method: 'get',
			});
		},
		setUserRoles: (data: ReqSetRoleData) => {
			// 设置用户角色
			return request<any, any>({
				url: `/admin/acl/user/doAssignRole`,
				method: 'post',
				data: data,
			});
		},
		deleteUser: (id: number) => {
			// 单个删除
			return request<any, any>({
				url: `/admin/acl/user/remove/${id}`,
				method: 'delete',
				data: id,
			});
		},
		batchDeleteUser: (idList: number[]) => {
			// 批量个删除
			return request<any, any>({
				url: `/admin/acl/user/batchRemove`,
				method: 'delete',
				data: idList,
			});
		},
	};
}
