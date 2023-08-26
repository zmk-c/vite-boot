/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-10 15:48:12
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-26 23:23:00
 * @FilePath: /vite-boot/vite.config.ts
 * @Description: vite配置
 */
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// 获取 .env 环境配置文件
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [
			vue(),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]',
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve('./src'), // 相对路径别名配置，使用@ 代替 src
			},
		},
		// sass全局变量配置
		css: {
			preprocessorOptions: {
				scss: {
					javascriptEnabled: true,
					additionalData: '@import "./src/styles/variable.scss";',
				},
			},
		},
		// 代理跨域
		server: {
			proxy: {
				[env.VITE_APP_BASE_API]: {
					target: 'http://sph-api.atguigu.cn',
					changeOrigin: true, // 需要代理跨域
					rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''), // 路径重写
				},
			},
		},
	};
});
