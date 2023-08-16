/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-10 15:48:12
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-16 09:28:59
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
// 引入自定义插件对象：注册整个项目全局组件（直接在main.ts注册全局组件也可以，但是多的话就显得不直观，这里也算学习一个新的方法吧）
import globalComponent from '@/components/index';
// 引入模板的全局样式
import '@/styles/index.scss';
// 挂载路由
import router from './router';

// 获取应用实例对象
const app = createApp(App);

app
	.use(ElementPlus, {
		// 国际化
		locale: zhCn,
	})
	.use(globalComponent) // 安装自定义插件
	.use(router) // 注册模板路由
	.mount('#app');
