/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-10 15:48:12
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-14 17:56:42
 * @FilePath: /vite-boot/src/main.ts
 * @Description: main.ts函数主入口
 */
import { createApp } from 'vue';
import App from './App.vue';
// 引入element-plus插件与样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 配置element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// 引入svg注册脚本
import 'virtual:svg-icons-register';

// 获取应用实例对象
const app = createApp(App);

app
	.use(ElementPlus, {
		locale: zhCn,
	})
	.mount('#app');
