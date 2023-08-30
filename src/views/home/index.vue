<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 08:54:28
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-30 09:13:16
 * @FilePath: /vite-boot/src/views/home/index.vue
 * @Description: 
-->
<template>
	<el-card>
		<div class="box">
			<img :src="userStore.avatar" class="avatar" />
			<div class="content">
				<h3>{{ getTime() }}好，{{ userStore.username }}</h3>
				<p>Vite-Boot开发模板</p>
			</div>
		</div>
	</el-card>

	<!-- 欢迎图片 使用SvgIcon全局组件-->
	<div class="welcome">
		<SvgIcon name="welcome" width="500px" height="500px"></SvgIcon>
	</div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time';
import useUserStore from '@/store/modules/user';
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.box {
	display: flex;

	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}

	.content {
		margin-left: 20px;

		h3 {
			font-size: 28px;
			font-weight: bold;
			text-align: center;
			margin: 20px 0px;
		}

		p {
			font-size: 13px;
			font-style: italic;
			color: grey;
		}
	}
}

.welcome {
	display: flex;
	justify-content: center;
}
</style>
