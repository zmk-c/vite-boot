/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-15 10:39:30
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-15 11:00:46
 * @FilePath: /vite-boot/src/components/index.ts
 * @Description: 自定义插件对象 全局组件
 */
// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue';
import Pagniation from './Pagination/index.vue';

// 全局对象
const allGlobalComponent = { SvgIcon, Pagniation };

// 对外暴露插件对象
export default {
	// 务必叫做install方法
	install(app) {
		// 注册项目全部的全局组件
		// Object.keys方法获取对象中所有的key（组件名）放到数组中
		Object.keys(allGlobalComponent).forEach((key) => {
			// 注册为全局组件
			app.component(key, allGlobalComponent[key]);
		});
	},
};
