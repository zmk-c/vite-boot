<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-18 15:14:46
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 13:58:58
 * @FilePath: /vite-boot/src/views/acl/user/index.vue
 * @Description: 权限管理-用户管理
-->
<template>
	<div>
		<!-- 搜索条件 -->
		<el-card style="height: 80px">
			<el-form :inline="true" class="form">
				<el-form-item label="用户名:">
					<el-input v-model="queryParams.username" placeholder="请输入搜索的用户名" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getTableList">搜索</el-button>
					<el-button @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<!-- 表单操作 -->
		<el-card style="margin: 10px 0px">
			<el-button type="primary" size="default" icon="Plus" @click="addUser">添加用户</el-button>
			<el-button type="danger" size="default" icon="Delete" :disabled="selectdatas.length ? false : true" @click="deleteBatch">批量删除</el-button>
			<!-- table展示用户信息 采用Table封装的组件-->
			<div style="margin: 10px 0px">
				<ETable :showSelection="true" :columns="columns" :tableData="tableData" @handleSelectionChange="handleSelectionChange">
					<template v-slot:cz="scope">
						<el-button type="primary" size="small" icon="User" @click="setRole(scope.row)">分配角色</el-button>
						<el-button type="primary" size="small" icon="Edit" @click="updateRow(scope.row)">编辑</el-button>
						<el-popconfirm :title="`确定要删除${scope.row.username}吗`" width="200px" @confirm="deleteRow(scope.row.id)">
							<template #reference>
								<el-button type="danger" size="small" icon="Delete">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</ETable>
			</div>
			<!-- 分页器 -->
			<div style="margin: 10px 0px">
				<Pagniation :total="total" v-model:page="queryParams.page" v-model:size="queryParams.limit" @pagination="getTableList"></Pagniation>
			</div>
		</el-card>

		<!-- 新增/修改用户 -->
		<AdUduser v-model:drawerShow="drawerShow" v-if="drawerShow" :title="title" :singledata="singledata" @changedata="changedata"></AdUduser>

		<!-- 分配角色 -->
		<SetRole v-model:roleDwShow="roleDwShow" v-if="roleDwShow" :roleDwTitle="roleDwTitle" :singledata="singledata" @changedata="changedata"></SetRole>
	</div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { User, UserFormData, UserResponseData } from '@/api/acl/user/type';
import { userAcl } from '@/api/acl/user/index';
// 引入新增/修改用户组件
import AdUduser from './components/AdUduser.vue';
import SetRole from './components/SetRole.vue';
import { ElMessage } from 'element-plus';
const state = reactive({
	loading: false,
	// 表头
	columns: [
		{
			prop: 'id',
			label: 'ID',
			align: 'center',
		},
		{
			prop: 'name',
			label: '用户名字',
			align: 'center',
		},
		{
			prop: 'username',
			label: '用户名称',
			align: 'center',
		},
		{
			prop: 'roleName',
			label: '用户角色',
			align: 'center',
			width: '120',
		},
		{
			prop: 'createTime',
			label: '创建时间',
			align: 'center',
			width: '130',
		},
		{
			prop: 'updateTime',
			label: '更新时间',
			align: 'center',
			width: '130',
		},
		{
			prop: 'cz',
			label: '操作',
			align: 'center',
			slot: 'cz',
			width: '220',
		},
	],
	// 表格数据
	tableData: [] as any,
	// 选中的数据
	singledata: {} as User,
	// 多选的数据
	selectdatas: [] as any,
	// 总页数 默认为0
	total: 0,
	// 查询参数
	queryParams: {
		page: 1,
		limit: 10,
		username: '',
	} as UserFormData,
	// 响应式数据 控制抽屉展开关闭
	drawerShow: false,
	// 抽屉头部
	title: '',
	// 控制分配角色的抽屉展开关闭
	roleDwShow: false,
	// 抽屉头部
	roleDwTitle: '',
});
const { columns, tableData, total, queryParams, singledata, selectdatas, drawerShow, title, roleDwShow, roleDwTitle } = toRefs(state);

onMounted(() => {
	getTableList();
});

// 列表查询
const getTableList = () => {
	state.loading = true;
	userAcl()
		.reqUserInfo(state.queryParams)
		.then((res: UserResponseData) => {
			if (res.code === 200) {
				state.tableData = res.data.records;
				state.total = res.data.total;
				state.loading = false;
			}
		});
};

// 新增用户
const addUser = () => {
	state.drawerShow = true;
	state.title = '新增用户';
};

// 编辑用户
const updateRow = (row: User) => {
	state.drawerShow = true;
	state.singledata = row;
	state.title = '编辑用户';
};

// 分配角色
const setRole = (row: User) => {
	state.roleDwShow = true;
	state.singledata = row;
	state.roleDwTitle = '分配角色用户';
};

// 单个删除
const deleteRow = (id: number) => {
	userAcl()
		.deleteUser(id)
		.then((res: any) => {
			if (res.code === 200) {
				ElMessage.success('删除成功');
				getTableList();
			} else {
				ElMessage.error(res.message);
			}
		});
};

// 批量删除
const deleteBatch = () => {
	let idList: number[] = state.selectdatas.map((item: any) => item.id);

	userAcl()
		.batchDeleteUser(idList)
		.then((res: any) => {
			if (res.code === 200) {
				ElMessage.success('删除成功');
				getTableList();
			} else {
				ElMessage.error(res.message);
			}
		});
};

// 多选框选择 table复选框勾选的时候会触发的事件
const handleSelectionChange = (val: any) => {
	state.selectdatas = val;
};
// 查询条件重置
const reset = () => {
	state.queryParams.page = 1;
	state.queryParams.limit = 10;
	state.queryParams.username = '';
};

// 子传父
const changedata = () => {
	getTableList();
};
</script>

<style scoped lang="scss">
.form {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
