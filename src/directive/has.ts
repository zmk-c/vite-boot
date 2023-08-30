/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-31 01:44:02
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-31 01:58:13
 * @FilePath: /vite-boot/src/directive/has.ts
 * @Description: 自定义指令
 */
import pinia from '@/store';
import useUserStore from '@/store/modules/user';
const userStore = useUserStore(pinia);

// 根据用户的操作权限展示是否有对应的操作按钮
export const isHasButton = (app: any) => {
	// console.log('app', app);
	// 全局自定义指令: 实现按钮的权限
	app.directive('has', {
		// 代表使用这个全局自定义指令的DOM|组件挂载完毕的时候会执行一次
		mounted(el: any, options: any) {
			// console.log('el--', el);
			// console.log('options--', options);
			// 自定义指令右侧的数值：如果在用户仓库buttons中没有 表示没有权限 需要删除
			if (!userStore.buttons.includes(options.value)) {
				el.parentNode.removeChild(el);
			}
		},
	});
};
