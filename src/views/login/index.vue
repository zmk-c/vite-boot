<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 09:20:09
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-16 10:54:42
 * @FilePath: /vite-boot/src/views/login/index.vue
 * @Description: 登陆页面
-->
<template>
	<div class="login_container">
		<el-row>
			<!-- xs 屏幕的宽度小于768px -->
			<el-col :span="12" :xs="0"></el-col>
			<el-col :span="12" :xs="24">
				<el-form class="login_form">
					<h1>Hello</h1>
					<h2>欢迎来到甄选</h2>
					<el-form-item>
						<el-input v-model="userForm.username" placeholder="请输入账号" :prefix-icon="User"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="userForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" show-password></el-input>
					</el-form-item>
					<el-form-item>
						<el-button class="login_btn" type="primary" size="default">登陆</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, toRefs } from 'vue';
import { LoginFormData } from '@/api/user/type';

const state = reactive({
	userForm: {
		username: '',
		password: '',
	} as LoginFormData,
});

const { userForm } = toRefs(state);
</script>

<style scoped lang="scss">
.login_container {
	width: 100%;
	height: 100vh;
	background: url('@/assets/images/background.jpg') no-repeat;
	background-size: cover;

	.login_form {
		position: relative;
		width: 60%;
		top: 30vh;
		background: url('@/assets/images/login_form.png') no-repeat;
		background-size: cover;
		padding: 40px;

		h1 {
			font-size: 40px;
			color: #fff;
		}

		h2 {
			font-size: 20px;
			color: #fff;
			margin: 20px 0px;
		}

		.login_btn {
			width: 100%;
		}
	}
}
</style>
