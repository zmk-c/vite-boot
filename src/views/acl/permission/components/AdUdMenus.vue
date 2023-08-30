<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-28 20:09:33
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 20:14:46
 * @FilePath: /vite-boot/src/views/acl/permission/components/AdUdMenus.vue
 * @Description: 新增/修改角色
-->
<template>
	<div>
		<!-- 弹框效果 -->
		<el-dialog v-model="props.dialogShow" :title="props.title" width="30%" :show-close="true" @close="closeDrawer" draggable>
			<el-form ref="menuRef" :rules="rules" :model="menuForm" label-width="auto">
				<el-form-item label="菜单名称" prop="name">
					<el-input placeholder="请输入菜单名称" v-model="menuForm.name"></el-input>
				</el-form-item>
				<el-form-item label="权限值" prop="code">
					<el-input placeholder="请输入权限值" v-model="menuForm.code"></el-input>
				</el-form-item>
			</el-form>

			<template #footer>
				<div style="flex: auto">
					<el-button @click="closeDrawer">取消</el-button>
					<el-button type="primary" @click="submit">确定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue';
import { MenusData } from '@/api/acl/permission/type';
import { menusAcl } from '@/api/acl/permission/index';
import { ElMessage, ElForm } from 'element-plus';
let menuRef = ref(ElForm);

onMounted(() => {
	if (props.title === '编辑菜单') {
		state.menuForm = { ...state.menuForm, ...props.singledata };
	}
});

// 从父组件传来的数据
const props = defineProps({
	// 响应式数据 控制抽屉展开关闭
	dialogShow: {
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
const emit = defineEmits(['update:dialogShow', 'changedata']);

const state = reactive({
	// 新增编辑用户信息
	menuForm: {
		name: '',
		code: '',
		level: props.singledata.level + 1, // 第几级菜单需要带上
		pid: props.singledata.id, // 父id需要带上
	} as MenusData,
	// 菜单表单校验
	rules: {
		name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
		code: [{ required: true, message: '菜单权限值不能为空', trigger: 'blur' }],
	},
});
const { menuForm, rules } = toRefs(state);

// 确定
const submit = async () => {
	// 校验
	await menuRef.value.validate();

	if (state.menuForm.id) {
		menusAcl()
			.updateMenu(state.menuForm)
			.then((res: any) => {
				if (res.code === 200) {
					ElMessage.success('菜单修改成功～');
					closeDrawer();
					window.location.reload();
				} else {
					ElMessage.error(res.message);
				}
			});
	} else {
		console.log('params----', state.menuForm);
		menusAcl()
			.saveMenu(state.menuForm)
			.then((res: any) => {
				if (res.code === 200) {
					ElMessage.success('菜单新增成功～');
					closeDrawer();
					window.location.reload();
				} else {
					ElMessage.error(res.message);
				}
			});
	}
};

// 关闭/取消
const closeDrawer = () => {
	menuRef.value.resetFields();
	state.menuForm.level = 0;
	state.menuForm.pid = 0;
	emit('update:dialogShow', false);
};
</script>

<style scoped></style>
