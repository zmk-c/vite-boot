<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-28 20:59:20
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-28 23:36:41
 * @FilePath: /vite-boot/src/views/acl/user/components/SetRole.vue
 * @Description: 分配角色组件
-->
<template>
	<div>
		<!-- 抽屉效果 -->
		<el-drawer v-model="props.roleDwShow" :show-close="false" @close="closeDrawer">
			<template #header>
				<h4>{{ props.roleDwTitle }}</h4>
			</template>

			<template #default>
				<el-form label-width="auto">
					<el-form-item label="用户姓名">
						<el-input v-model="props.singledata.username" disabled></el-input>
					</el-form-item>
					<el-form-item label="角色">
						<el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
						<!-- 职位复选框 -->
						<el-checkbox-group v-model="checkPositions" @change="handleCheckedPositionsChange">
							<el-checkbox v-for="(role, index) in allPositions" :key="index" :label="role">{{ role.roleName }}</el-checkbox>
						</el-checkbox-group>
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
import { ref, onMounted } from 'vue';
import { userAcl } from '@/api/acl/index';
import { AllRolesResponseData, ReqSetRoleData } from '@/api/acl/type';
import { ElMessage, ElForm } from 'element-plus';

// 从父组件传来的数据
const props = defineProps({
	// 响应式数据 控制抽屉展开关闭
	roleDwShow: {
		type: Boolean,
		default: false,
	},
	// 抽屉头部标题
	roleDwTitle: {
		type: String,
		default: '',
	},
	// 选中的数据
	singledata: {
		type: Object,
		default: () => {},
	},
});
const emit = defineEmits(['update:roleDwShow', 'changedata']);

onMounted(() => {
	getRoles();
});

// 获取用户的角色
const getRoles = () => {
	userAcl()
		.getRoleChecks(props.singledata.id)
		.then((res: AllRolesResponseData) => {
			if (res.code === 200) {
				checkPositions.value = res.data.assignRoles;
				allPositions = res.data.allRolesList;
			}
		});
};

// 确定
const submit = async () => {
	let rolesForm: ReqSetRoleData = {
		userId: props.singledata.id,
		roleIdList: checkPositions.value.map((item: any) => item.id),
	};

	userAcl()
		.setUserRoles(rolesForm)
		.then((res: any) => {
			if (res.code === 200) {
				closeDrawer();
				emit('changedata');
				ElMessage.success('分配角色完成');
			}
		});
};

// 关闭/取消
const closeDrawer = () => {
	emit('update:roleDwShow', false);
};

/*复选框操作*/
const checkAll = ref<boolean>(false); // 是否全选
const isIndeterminate = ref<boolean>(true); // 设置不确定的样式
const checkPositions = ref(['前端', '后端'] as any);
let allPositions = ['超级管理员', '前台', '运营', '产品', '前端', '后端', '测试', '财务', '运维', '销售'] as any;

const handleCheckAllChange = (checkAll: boolean) => {
	console.log(checkAll);
	checkPositions.value = checkAll ? allPositions : [];
	isIndeterminate.value = false;
};
const handleCheckedPositionsChange = (value: string[]) => {
	const checkedCount = value.length;
	checkAll.value = checkedCount === allPositions.length;
	isIndeterminate.value = checkedCount > 0 && checkedCount < allPositions.length;
};
</script>

<style scoped></style>
