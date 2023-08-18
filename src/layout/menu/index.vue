<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-17 18:44:20
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-18 16:45:11
 * @FilePath: /vite-boot/src/layout/menu/index.vue
 * @Description: 菜单路由封装
-->
<template>
	<!-- 动态展示 -->
	<template v-for="item in menuList" :key="item.path">
		<!-- 没有子路由-->
		<template v-if="!item.children">
			<el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="getRoute">
				<el-icon>
					<component :is="item.meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.meta.title }} </span>
				</template>
			</el-menu-item>
		</template>

		<!-- 有子路由但只有一个 -->
		<template v-if="item.children && item.children.length === 1">
			<el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="getRoute">
				<el-icon>
					<component :is="item.children[0].meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.children[0].meta.title }}</span>
				</template>
			</el-menu-item>
		</template>
		<!-- 有子路由并且有多个 -->
		<template v-if="item.children && item.children.length > 1">
			<el-sub-menu :index="item.path">
				<template #title>
					<el-icon>
						<component :is="item.meta.icon"></component>
					</el-icon>
					<span>{{ item.meta.title }}</span>
				</template>
				<!-- 递归 -->
				<Menus :menuList="item.children"></Menus>
			</el-sub-menu>
		</template>
	</template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
// 获取父组件传递过来的全部路由数组
defineProps(['menuList']);

const $router = useRouter();

// 点击跳转路由 	菜单点击时的回调函数
const getRoute = (vc: any) => {
	$router.push(vc.index);
};
</script>

<script lang="ts">
export default {
	name: 'Menus',
};
</script>

<style scoped></style>
