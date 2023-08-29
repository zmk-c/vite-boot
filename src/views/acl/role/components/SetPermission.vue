<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-28 20:59:20
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 16:15:25
 * @FilePath: /vite-boot/src/views/acl/role/components/SetPermission.vue
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
				<!--default-expanded-keys:默认展开的节点的key的数组   props:配置选项，具体看下表-->
				<el-tree
					ref="treeRef"
					:data="treeData"
					show-checkbox
					node-key="id"
					default-expand-all
					:default-checked-keys="checkList"
					:props="defaultProps"
				/>
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
import { menusAcl } from '@/api/acl/permission/index';
import { MenusData, MenusResponseData, ReqSetRoleMenusData } from '@/api/acl/permission/type';
import { ElMessage, ElTree } from 'element-plus';

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

// tree的配置选项
const defaultProps = {
	children: 'children',
	label: 'name',
};
onMounted(() => {
	getMenus();
});

let treeRef = ref<InstanceType<typeof ElTree>>();
let treeData = ref<MenusData[]>([]); // 树形数据
let checkList = ref<number[]>([]); // 默认选中的节点id
// let expandList = ref<number[]>([]); // 默认展开的节点id
// 根据角色id获取当前勾选的权限
const getMenus = () => {
	menusAcl()
		.getMenusChecks(props.singledata.id)
		.then((res: MenusResponseData) => {
			if (res.code === 200) {
				// console.log(res.data);
				treeData.value = res.data;

				// 默认钩上已有的权限菜单 这里从尾往前过滤 这里有四级菜单
				filterSelectArray(treeData.value);
			}
		});
};

// 过滤出需要勾选的菜单
const filterSelectArray = (treeData: MenusData[]) => {
	treeData.forEach((item: MenusData) => {
		if (item.select && item.level === 4) {
			checkList.value.push(item.id);
		}

		if (item.children && item.children.length > 0) {
			// 递归遍历
			filterSelectArray(item.children);
		}
	});
	// console.log('tempList---', checkList.value);
};

// 确定
const submit = async () => {
	let rolesForm: ReqSetRoleMenusData = {
		roleId: props.singledata.id,
		permissionIdList: [] as any,
	};

	// 获取选中的数据
	rolesForm.permissionIdList.push(...treeRef.value.getCheckedKeys());
	menusAcl()
		.setRoleMenus(rolesForm)
		.then((res: any) => {
			if (res.code === 200) {
				closeDrawer();
				ElMessage.success('权限分配完成');
				// 权限分配之后 需要用户重新获取
				window.location.reload();
			} else {
				ElMessage.error(res.message);
			}
		});
};

// 关闭/取消
const closeDrawer = () => {
	emit('update:roleDwShow', false);
};

// 树形组件
</script>

<style scoped></style>
