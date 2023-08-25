<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-17 09:11:06
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-25 17:10:56
 * @FilePath: /vite-boot/src/layout/index.vue
 * @Description: layout首页
-->
<template>
	<div class="layout_container">
		<!-- 左侧菜单 现在动态计算折叠不折叠的宽度-->
		<div class="layout_slider" :class="{ fold: layOutSettingStore.fold ? true : false }">
			<!-- 展示logo -->
			<Logo></Logo>
			<!-- 展示菜单 -->
			<el-scrollbar class="scollbar">
				<!-- 菜单组件 -->
				<el-menu :collapse="layOutSettingStore.fold" :default-active="$route.path" background-color="#001529" text-color="white">
					<!-- 根据路由动态生成菜单 -->
					<Menus :menuList="userStore.menuRoutes"></Menus>
				</el-menu>
			</el-scrollbar>
		</div>
		<!-- 顶部导航 -->
		<div class="layout_tabbar" :class="{ fold: layOutSettingStore.fold ? true : false }">
			<Tabbar></Tabbar>
		</div>
		<!-- 内容展示区 -->
		<div class="layout_main" :class="{ fold: layOutSettingStore.fold ? true : false }">
			<!-- 基本路由展示 -->
			<!-- <router-view></router-view> -->

			<!-- 可以添加过渡动效 -->
			<router-view v-slot="{ Component }">
				<transition name="fade">
					<component :is="Component" v-if="flag" />
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'LayOut', // 给组件起名叫LayOut 在控制台使用vue工具能看到组件名称 否则组件都叫Index
};
</script>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
// 获取路由对象
import { useRoute } from 'vue-router';
// 引入左侧菜单logo字组件
import Logo from './logo/index.vue';
// 引入菜单组件
import Menus from './menu/index.vue';
// 引入顶部tabbar组件
import Tabbar from './tabbar/index.vue';
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
// 获取layout相关的小仓库
import useLayOutSettingStore from '@/store/modules/setting';

let userStore = useUserStore();
let $route = useRoute();
let layOutSettingStore = useLayOutSettingStore();

let flag = ref(true); // 是否展示内容展示区组件
// 内容展示区监听刷新按钮的变化
watch(
	() => layOutSettingStore.refresh,
	() => {
		// 点击刷新按钮：路由组件销毁
		flag.value = false;
		// 接着在重新渲染组件
		nextTick(() => {
			flag.value = true;
		});
	}
);
</script>

<style scoped lang="scss">
.layout_container {
	width: 100%;
	height: 100vh;

	.layout_slider {
		width: $base-menu-width;
		height: 100vh;
		background: $base-menu-background;
		// 折叠添加过渡动画
		transition: all 0.3s;

		.scollbar {
			width: 100%;
			height: calc(100vh - $base-menu-logo-height);
			.el-menu {
				border-right: none;
			}
		}
		// 折叠
		&.fold {
			width: $base-menu-min-width;
		}
	}

	.layout_tabbar {
		position: fixed;
		top: 0px;
		left: $base-menu-width;
		width: calc(100% - $base-menu-width);
		height: $base-tabbar-height;
		// 折叠添加过渡动画
		transition: all 0.3s;

		&.fold {
			width: calc(100% - $base-menu-min-width);
			left: $base-menu-min-width;
		}
	}

	.layout_main {
		position: absolute;
		width: calc(100% - $base-menu-width);
		height: calc(100vh - $base-tabbar-height);
		// background: pink;
		left: $base-menu-width;
		top: $base-tabbar-height;
		padding: 20px;
		overflow: auto;

		// 折叠添加过渡动画
		transition: all 0.3s;
		&.fold {
			width: calc(100% - $base-menu-min-width);
			left: $base-menu-min-width;
		}

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
