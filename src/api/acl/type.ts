/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-28 15:23:57
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 00:28:21
 * @FilePath: /vite-boot/src/api/acl/type.ts
 * @Description: 权限管理相关类型约束
 */
// 登录表单类型声明
export interface UserFormData {
	page: number;
	limit: number;
	username?: string;
}

// 登录接口返回数据类型
// 定义全部接口返回数据都拥有的ts类型

export interface ResponseData {
	code: number;
	message: string;
	ok: boolean;
}
// 用户信息
export interface User {
	id?: number;
	createTime?: string;
	updateTime?: string;
	username?: string;
	password?: string;
	name?: string;
	pbone?: string;
	roleName?: string;
}

// 定义获取用户信息返回的数据类型
export interface UserResponseData extends ResponseData {
	data: {
		records: User[];
		total: number;
	};
}

// 职位的类型
export interface RoleData {
	id?: number;
	createTime?: string;
	updateTime?: string;
	roleName: string;
	remark: null;
}

// 定义获取角色信息返回的数据类型
export interface AllRolesResponseData extends ResponseData {
	data: {
		assignRoles: RoleData[];
		allRolesList: RoleData[];
	};
}

// 定义给用户设置角色的请求参数
export interface ReqSetRoleData {
	roleIdList: number[];
	userId: number;
}
