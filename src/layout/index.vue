<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-17 09:11:06
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-17 17:15:36
 * @FilePath: /vite-boot/src/layout/index.vue
 * @Description: layout首页
-->
<template>
	<div class="layout_container">
		<!-- 左侧菜单 -->
		<div class="layout_slider">111</div>
		<!-- 顶部导航 -->
		<div class="layout_tabbar">222</div>
		<!-- 内容展示区 -->
		<div class="layout_main">
			<p style="height: 2000px">11111</p>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout_container {
	width: 100%;
	height: 100vh;
	background: red;

	.layout_slider {
		width: $base-menu-width;
		height: 100vh;
		background: $base-menu-background;
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
	}
}
</style>
