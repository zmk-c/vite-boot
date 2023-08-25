/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-25 10:45:39
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-25 10:49:13
 * @FilePath: /vite-boot/src/store/modules/setting.ts
 * @Description: 关于layout组件相关配置
 */
// 关于layout组件相关配置

import { defineStore } from 'pinia';

const useLayOutSettingStore = defineStore('SettingStore', {
	state: () => {
		return {
			fold: false, // 用户控制菜单折叠还是收起
		};
	},
});
export default useLayOutSettingStore;
