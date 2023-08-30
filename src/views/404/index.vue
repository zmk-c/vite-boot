<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 08:55:00
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-31 01:29:35
 * @FilePath: /vite-boot/src/views/404/index.vue
 * @Description: 
-->
<template>
	<div class="notFound">
		<img src="../../assets/images/error_images/404.png" />
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
let $router = useRouter();
const goHome = () => {
	$router.push('/home');
};

onMounted(() => {
	setTimeout(() => {
		goHome();
	}, 1000);
});
</script>

<style scoped lang="scss">
.notFound {
	img {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
