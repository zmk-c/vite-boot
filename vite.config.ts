/*
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-10 15:48:12
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-14 17:54:33
 * @FilePath: /vite-boot/vite.config.ts
 * @Description: vite配置
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
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
});
