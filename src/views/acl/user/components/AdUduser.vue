<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-28 20:09:33
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-28 20:48:14
 * @FilePath: /vite-boot/src/views/acl/user/components/AdUduser.vue
 * @Description: 新增/修改用户
-->
<template>
	<div>
		<!-- 抽屉效果 -->
		<el-drawer v-model="props.drawerShow" :show-close="false" @close="closeDrawer">
			<template #header>
				<h4>{{ props.title }}</h4>
			</template>

			<template #default>
				<el-form ref="userRef" :model="userForm" :rules="rules" label-width="auto">
					<el-form-item label="用户姓名" prop="name">
						<el-input placeholder="请输入用户姓名" v-model="userForm.name"></el-input>
					</el-form-item>
					<el-form-item label="用户昵称" prop="username">
						<el-input placeholder="请输入用户昵称" v-model="userForm.username"></el-input>
					</el-form-item>
					<el-form-item label="用户密码" prop="password" v-if="props.title != '编辑用户'">
						<el-input type="password" placeholder="请输入用户密码" v-model="userForm.password"></el-input>
					</el-form-item>
				</el-form>
			</template>

			<template #footer>
				<div style="flex: auto">
					<el-button @click="closeDrawer">取消</el-button>
					<el-button type="primary" @click="submit">确定</el-button>
				</div>
			</template>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue';
import { User } from '@/api/acl/type';
import { userAcl } from '@/api/acl/index';
import { ElMessage, ElForm } from 'element-plus';
let userRef = ref(ElForm);

onMounted(() => {
	if (props.title === '编辑用户') {
		state.userForm = { ...state.userForm, ...props.singledata };
	}
});

// 从父组件传来的数据
const props = defineProps({
	// 响应式数据 控制抽屉展开关闭
	drawerShow: {
		type: Boolean,
		default: false,
	},
	// 抽屉头部标题
	title: {
		type: String,
		default: '',
	},
	// 选中的数据
	singledata: {
		type: Object,
		default: () => {},
	},
});
const emit = defineEmits(['update:drawerShow', 'changedata']);

const state = reactive({
	// 新增编辑用户信息
	userForm: {
		username: '',
		password: '',
		name: '',
	} as User,
	// 用户表单校验
	rules: {
		name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
		username: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
		password: [{ required: true, min: 6, max: 15, message: '密码长度最少6位', trigger: 'change' }],
	},
});
const { userForm, rules } = toRefs(state);

// 确定
const submit = async () => {
	// 校验
	await userRef.value.validate();

	if (state.userForm.id) {
		userAcl()
			.updateUser(state.userForm)
			.then((res: any) => {
				if (res.code === 200) {
					ElMessage.success('用户修改成功～');
					// 如果修改的是当前等用户信息 则退回登录页
					window.location.reload();
					emit('update:drawerShow', false);
				} else {
					ElMessage.error(res.message);
				}
			});
	} else {
		userAcl()
			.saveUser(state.userForm)
			.then((res: any) => {
				if (res.code === 200) {
					ElMessage.success('用户新增成功～');
					closeDrawer();
					emit('changedata');
				} else {
					ElMessage.error(res.message);
				}
			});
	}
};

// 关闭/取消
const closeDrawer = () => {
	userRef.value.resetFields();
	state.userForm.password = '';
	state.userForm.id = 0;
	emit('update:drawerShow', false);
};
</script>

<style scoped></style>
