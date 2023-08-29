<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-28 20:09:33
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 14:25:54
 * @FilePath: /vite-boot/src/views/acl/role/components/AdUdRole.vue
 * @Description: 新增/修改角色
-->
<template>
	<div>
		<!-- 抽屉效果 -->
		<el-drawer v-model="props.drawerShow" :show-close="false" @close="closeDrawer">
			<template #header>
				<h4>{{ props.title }}</h4>
			</template>

			<template #default>
				<el-form ref="userRef" :model="roleForm" label-width="auto">
					<el-form-item label="角色名称" prop="roleName">
						<el-input placeholder="请输入角色名" v-model="roleForm.roleName"></el-input>
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
import { Role } from '@/api/acl/role/type';
import { userAcl } from '@/api/acl/role/index';
import { ElMessage, ElForm } from 'element-plus';
let userRef = ref(ElForm);

onMounted(() => {
	if (props.title === '编辑角色') {
		state.roleForm = { ...state.roleForm, ...props.singledata };
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
	roleForm: {
		roleName: '',
	} as Role,
});
const { roleForm } = toRefs(state);

// 确定
const submit = async () => {
	// 校验
	await userRef.value.validate();

	if (state.roleForm.id) {
		userAcl()
			.updateRole(state.roleForm)
			.then((res: any) => {
				if (res.code === 200) {
					ElMessage.success('角色修改成功～');
					closeDrawer();
					emit('changedata');
				} else {
					ElMessage.error(res.message);
				}
			});
	} else {
		userAcl()
			.saveRole(state.roleForm)
			.then((res: any) => {
				if (res.code === 200) {
					ElMessage.success('角色新增成功～');
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
	state.roleForm.id = 0;
	emit('update:drawerShow', false);
};
</script>

<style scoped></style>
