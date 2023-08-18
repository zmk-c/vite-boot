<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-17 17:57:42
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-17 18:09:01
 * @FilePath: /vite-boot/src/layout/logo/index.vue
 * @Description: 
-->
<template>
	<div class="logo">
		<img src="../../../public/logo.png" />
		<p>甄选运营平台</p>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
	width: 100%;
	height: $base-menu-logo-height;
	color: white;
	display: flex;
	align-items: center;

	img {
		width: 40px;
		height: 40px;
	}

	p {
		font-size: $base-logo-title-fontSize;
		margin-left: 10px;
	}
}
</style>
