<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-17 17:57:42
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-25 11:40:21
 * @FilePath: /vite-boot/src/layout/logo/index.vue
 * @Description: 
-->
<template>
	<div class="logo">
		<img src="@/assets/images/logo.png" />
		<p>甄选运营平台</p>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Logo',
};
</script>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
	width: 100%;
	height: $base-menu-logo-height;
	color: white;
	display: flex;
	align-items: center;
	padding-left: 10px;

	img {
		width: 30px;
		height: 30px;
	}

	p {
		font-size: $base-logo-title-fontSize;
		margin-left: 10px;
	}
}
</style>
