/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-25 10:45:39
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-25 15:46:52
 * @FilePath: /vite-boot/src/store/modules/setting.ts
 * @Description: 关于layout组件相关配置
 */
// 关于layout组件相关配置

import { defineStore } from 'pinia';

const useLayOutSettingStore = defineStore('SettingStore', {
	state: () => {
		return {
			fold: false, // 用户控制菜单折叠还是收起
			refresh: false, // 控制页面刷新
		};
	},
});
export default useLayOutSettingStore;
