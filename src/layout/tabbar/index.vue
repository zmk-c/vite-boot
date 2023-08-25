<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-18 16:55:36
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-25 15:57:14
 * @FilePath: /vite-boot/src/layout/tabbar/index.vue
 * @Description: 顶部tabbar组件
-->
<template>
	<div class="tabbar">
		<div class="tabbar_left">
			<!-- 顶部左侧静态 -->
			<!-- 小图标 展开合并 因为之前封装了全局组件 这里可以直接用 -->
			<el-icon style="margin-right: 10px" @click="changeIcon">
				<!-- <Expand /> 下面使用动态组件展示-->
				<component :is="layOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
			</el-icon>
			<!-- 左侧面包屑 -->
			<el-breadcrumb separator-icon="ArrowRight">
				<!-- <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item> -->

				<!-- 现在动态的展示路由的名字 -->
				<el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
					<!-- <el-icon>
						<component :is="item.meta.icon"></component>
					</el-icon> -->
					<span>{{ item.meta.title }}</span>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="tabbar_right">
			<!-- 顶部右侧侧静态 -->
			<el-button type="default" size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
			<el-button type="default" size="small" icon="FullScreen" circle></el-button>
			<el-button type="default" size="small" icon="Setting" circle></el-button>
			<!-- 头像 -->
			<img src="../../assets/images/avater.png" style="height: 29px; width: 29px; margin: 0px 10px" />
			<!-- 下拉菜单 -->
			<el-dropdown>
				<span class="el-dropdown-link">
					admin<el-icon class="el-icon--right"><arrow-down /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>退出登陆</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Tabbar',
};
</script>

<script setup lang="ts">
// import { ref } from 'vue';
// 定义一个响应式数据控制图标切换
// let fold = ref(false); // 现在从仓库中去拿
// 用于控制菜单折叠
// const changeIcon = () => {
// 	fold.value = !fold.value;
// };
import { useRoute } from 'vue-router';
import useLayOutSettingStore from '@/store/modules/setting';
let layOutSettingStore = useLayOutSettingStore();
let $route = useRoute();

// 折叠按钮点击回调
const changeIcon = () => {
	layOutSettingStore.fold = !layOutSettingStore.fold;
};

// 刷新按钮点击回调
const updateRefresh = () => {
	layOutSettingStore.refresh = !layOutSettingStore.refresh;
};
</script>

<style scoped lang="scss">
.tabbar {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	// 加个渐变色
	background-image: linear-gradient(to right, white, black, white);

	.tabbar_left {
		display: flex;
		align-items: center;
		margin-left: 20px;
	}

	.tabbar_right {
		display: flex;
		align-items: center;
		margin-right: 20px;
	}
}
</style>
