<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-17 09:11:06
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-18 16:37:19
 * @FilePath: /vite-boot/src/layout/index.vue
 * @Description: layout首页
-->
<template>
	<div class="layout_container">
		<!-- 左侧菜单 -->
		<div class="layout_slider">
			<!-- 展示logo -->
			<Logo></Logo>

			<!-- 展示菜单 -->
			<el-scrollbar class="scollbar">
				<el-menu background-color="#001529" text-color="white">
					<Menus :menuList="userStore.menuRoutes"></Menus>
				</el-menu>
			</el-scrollbar>
		</div>
		<!-- 顶部导航 -->
		<div class="layout_tabbar">222</div>
		<!-- 内容展示区 -->
		<div class="layout_main">
			<!-- 基本路由展示 -->
			<!-- <router-view></router-view> -->

			<!-- 可以添加过渡动效 -->
			<router-view v-slot="{ Component }">
				<transition name="fade">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue';
import Menus from './menu/index.vue';
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout_container {
	width: 100%;
	height: 100vh;

	.layout_slider {
		width: $base-menu-width;
		height: 100vh;
		background: $base-menu-background;

		.scollbar {
			width: 100%;
			height: calc(100vh - $base-menu-logo-height);
			.el-menu {
				border-right: none;
			}
		}
	}

	.layout_tabbar {
		position: fixed;
		top: 0px;
		left: $base-menu-width;
		width: calc(100% - $base-menu-width);
		height: $base-tabbar-height;
		background: yellow;
	}

	.layout_main {
		position: absolute;
		width: calc(100% - $base-menu-width);
		height: calc(100vh - $base-tabbar-height);
		background: pink;
		left: $base-menu-width;
		top: $base-tabbar-height;
		padding: 20px;

		overflow: auto;
		// 过渡动画
		.fade-enter-from {
			opacity: 0;
			transform: scale(0);
		}
		.fade-enter-active {
			transition: all 0.3s;
		}

		.fade-enter-to {
			opacity: 1;
			transform: scale(1);
		}
	}
}
</style>
