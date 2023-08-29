/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-28 15:23:57
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 14:52:36
 * @FilePath: /vite-boot/src/api/acl/role/type.ts
 * @Description: 权限管理相关类型约束
 */

// 角色列表请求
export interface RoleFormData {
	page: number;
	limit: number;
	roleName?: string;
}

// 定义全部接口返回数据都拥有的ts类型
export interface ResponseData {
	code: number;
	message: string;
	ok: boolean;
}

// 角色信息
export interface Role {
	id?: number;
	createTime?: string;
	updateTime?: string;
	roleName?: string;
	remark: null;
}

// 定义获取角色信息返回的数据类型
export interface RoleResponseData extends ResponseData {
	data: {
		records: Role[];
		total: number;
	};
}
