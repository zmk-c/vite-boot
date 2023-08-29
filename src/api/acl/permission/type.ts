/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-28 15:23:57
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 16:10:31
 * @FilePath: /vite-boot/src/api/acl/permission/type.ts
 * @Description: 权限管理相关类型约束
 */

// 定义全部接口返回数据都拥有的ts类型
export interface ResponseData {
	code: number;
	message: string;
	ok: boolean;
}

// 菜单与按钮的ts类型
export interface MenusData {
	id: number;
	createTime?: string;
	updateTime?: string;
	pid: number;
	name: string;
	code: string;
	toCode: string;
	type: number;
	status: null;
	level: number;
	children?: MenusData[];
	select: boolean;
}

// 定义获取角色信息返回的数据类型
export interface MenusResponseData extends ResponseData {
	data: MenusData[];
}
// 定义给角色分配菜单权限的请求参数
export interface ReqSetRoleMenusData {
	permissionIdList: number[];
	roleId: number;
}
