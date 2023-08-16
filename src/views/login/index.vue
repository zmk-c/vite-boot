<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-16 09:20:09
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-16 19:52:25
 * @FilePath: /vite-boot/src/views/login/index.vue
 * @Description: 登陆页面
-->
<template>
	<div class="login_container">
		<el-row>
			<!-- xs 屏幕的宽度小于768px -->
			<el-col :span="12" :xs="0"></el-col>
			<el-col :span="12" :xs="24">
				<el-form class="login_form" :model="userForm" :rules="rules" ref="loginFormRef">
					<h1>Hello</h1>
					<h2>欢迎来到甄选</h2>
					<el-form-item prop="username">
						<el-input v-model="userForm.username" :prefix-icon="User" clearable></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="userForm.password" type="password" :prefix-icon="Lock" clearable show-password></el-input>
					</el-form-item>
					<el-form-item>
						<el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登陆</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { LoginFormData } from '@/api/user/type';
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user';
const useStore = useUserStore(); // 获取用户仓库
const $router = useRouter(); // 获取路由器
const state = reactive({
	loading: false, // 按钮加载效果
	userForm: {
		username: 'admin',
		password: 'admin123',
	} as LoginFormData,

	// 表单校验
	rules: {
		username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
		password: [{ required: true, min: 6, max: 15, message: '密码长度最少6位', trigger: 'change' }],
	},
});
const { loading, userForm, rules } = toRefs(state);
const loginFormRef = ref();

// 登陆按钮回调
const login = async () => {
	// 保证全部表单校验通过再发请求
	await loginFormRef.value.validate();
	state.loading = true;
	// 调用用户登陆方法
	try {
		await useStore.userLogin(state.userForm);
		// 编程式导航跳转到展示数据首页
		$router.push('/');
		// 登陆成功提示信息
		ElNotification({
			type: 'success',
			message: '登陆成功',
		});
		state.loading = false;
	} catch (error: any) {
		state.loading = false;
		ElNotification({
			type: 'error',
			message: error.message,
		});
	}
};
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
