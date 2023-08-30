<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-18 16:55:36
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-30 16:24:36
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
			<el-button type="default" size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
			<!-- 这里不采用抽屉了 采用pop弹出框 -->
			<el-popover placement="top-start" title="主题设置" :width="200" trigger="hover">
				<el-form>
					<el-form-item label="主题颜色">
						<el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="setColor" />
					</el-form-item>
					<el-form-item label="暗黑模式">
						<el-switch v-model="dark" inline-prompt active-icon="Moon" inactive-icon="Sunny" @change="changeDark" />
					</el-form-item>
				</el-form>
				<template #reference>
					<el-button type="default" size="small" icon="Setting" circle></el-button>
				</template>
			</el-popover>
			<!-- 头像 -->
			<!-- <img src="../../assets/images/avater.png" style="height: 29px; width: 29px; margin: 0px 10px" /> -->
			<img :src="userStore.avatar" style="height: 29px; width: 29px; margin: 0px 10px; border-radius: 50%" />
			<!-- 下拉菜单 -->
			<el-dropdown>
				<span class="el-dropdown-link">
					{{ userStore.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
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
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
let layOutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
// 获取路由对象
let $route = useRoute();
// 获取路由器对象
let $router = useRouter();

// 颜色相关
const color = ref('rgba(255, 69, 0, 0.68)');
const predefineColors = ref([
	'#ff4500',
	'#ff8c00',
	'#ffd700',
	'#90ee90',
	'#00ced1',
	'#1e90ff',
	'#c71585',
	'rgba(255, 69, 0, 0.68)',
	'rgb(255, 120, 0)',
	'hsv(51, 100, 98)',
	'hsva(120, 40, 94, 0.5)',
	'hsl(181, 100%, 37%)',
	'hsla(209, 100%, 56%, 0.73)',
	'#c7158577',
]);
const setColor = () => {
	// 通知js修改根节点的样式对象的属性与属性值
	let html = document.documentElement;
	html.style.setProperty('--el-color-primary', color.value);
	html.style.setProperty('--el-color-danger', color.value);
};

// 主题相关
let dark = ref(false);
const changeDark = () => {
	// 获取html根标签 动态的增加dark class
	let html = document.documentElement;
	dark.value ? (html.className = 'dark') : (html.className = '');
};

// 折叠按钮点击回调
const changeIcon = () => {
	layOutSettingStore.fold = !layOutSettingStore.fold;
};

// 刷新按钮点击回调
const updateRefresh = () => {
	layOutSettingStore.refresh = !layOutSettingStore.refresh;
};

// 全屏按钮的点击回调
const fullScreen = () => {
	// 可以用来判断当前项目是不是全屏Boolean
	let full = document.fullscreenElement;
	// 切换为全屏
	if (!full) {
		document.documentElement.requestFullscreen();
	} else {
		// 再点击 退出全屏
		document.exitFullscreen();
	}
};

// 退出登陆点击回调
const logout = async () => {
	// 首先请求退出接口 其次将仓库中关于用户相关的数据清空 最后再跳转登录页面
	await userStore.userLogout();
	$router.push({ path: '/login', query: { redirect: $route.path } }); // 退出再登录的时候 回到原来的页面
};
</script>

<style scoped lang="scss">
.tabbar {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	// 加个渐变色
	// background-image: linear-gradient(to right, white, black, white);

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
