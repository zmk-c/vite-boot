/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-17 09:00:28
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-17 09:00:31
 * @FilePath: /vite-boot/src/utils/time.ts
 * @Description: 时间组件
 */
export const getTime = () => {
	let msg = '';
	const hours = new Date().getHours();
	if (hours <= 9) {
		msg = '早上';
	} else if (hours <= 12) {
		msg = '上午';
	} else if (hours <= 18) {
		msg = '下午';
	} else {
		msg = '晚上';
	}
	return msg;
};
