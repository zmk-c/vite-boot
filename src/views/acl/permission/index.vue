<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-18 15:13:50
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 20:14:15
 * @FilePath: /vite-boot/src/views/acl/permission/index.vue
 * @Description: 菜单权限管理
-->
<template>
	<div>
		<!-- 这里用到的折叠的菜单 -->
		<ETable :showIndex="false" :columns="columns" :tableData="tableData" :defaultExpandAll="true">
			<template v-slot:cz="scope">
				<!-- 三级菜单下面 添加功能按钮 -->
				<el-button type="primary" size="small" icon="Plus" @click="addMenu(scope.row)" :disabled="scope.row.level == 4 ? true : false">{{
					scope.row.level === 3 ? '添加功能' : '添加菜单'
				}}</el-button>
				<el-button type="primary" size="small" icon="Edit" @click="updateRow(scope.row)">编辑</el-button>
				<el-popconfirm :title="`确定要删除菜单${scope.row.name}吗`" width="200px" @confirm="deleteRow(scope.row.id)">
					<template #reference>
						<el-button type="danger" size="small" icon="Delete">删除</el-button>
					</template>
				</el-popconfirm>
			</template>
		</ETable>

		<!-- 新增/编辑 菜单 -->
		<AdUdMenus v-model:dialogShow="dialogShow" v-if="dialogShow" :title="title" :singledata="singledata" @changedata="changedata"></AdUdMenus>
	</div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { menusAcl } from '@/api/acl/permission/index';
import { MenusData, MenusResponseData } from '@/api/acl/permission/type';
import AdUdMenus from './components/AdUdMenus.vue';
import { ElMessage } from 'element-plus';

const state = reactive({
	loading: false,
	// 表头
	columns: [
		{
			prop: 'name',
			label: '名称',
			align: 'center',
		},
		{
			prop: 'code',
			label: '权限值',
			align: 'center',
		},
		{
			prop: 'updateTime',
			label: '修改时间',
			align: 'center',
		},
		{
			prop: 'cz',
			label: '操作',
			align: 'center',
			slot: 'cz',
		},
	] as any,
	// 表格数据
	tableData: [] as MenusData[],
	// 选中的数据
	singledata: {} as MenusData,
	// 响应式数据 控制抽屉展开关闭
	dialogShow: false,
	// 抽屉头部
	title: '',
});
const { columns, tableData, dialogShow, title, singledata } = toRefs(state);

onMounted(() => {
	getTableList();
});

// 列表查询
const getTableList = () => {
	state.loading = true;
	menusAcl()
		.reqMenus()
		.then((res: MenusResponseData) => {
			if (res.code === 200) {
				state.tableData = res.data;
				state.loading = false;
			}
		});
};

// 新增菜单
const addMenu = (row: MenusData) => {
	state.dialogShow = true;
	state.singledata = row;
	state.title = '新增菜单';
};

// 编辑菜单
const updateRow = (row: MenusData) => {
	state.dialogShow = true;
	state.singledata = row;
	state.title = '编辑菜单';
};

// 单个删除
const deleteRow = (id: number) => {
	menusAcl()
		.deleteMenu(id)
		.then((res: any) => {
			if (res.code === 200) {
				ElMessage.success('删除成功');
				getTableList();
			} else {
				ElMessage.error(res.message);
			}
		});
};

// 子传父
const changedata = () => {
	getTableList();
};
</script>

<style scoped></style>
