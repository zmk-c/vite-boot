<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-15 10:44:04
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-29 17:00:35
 * @FilePath: /vite-boot/src/components/ETable/index.vue
 * @Description: 表格组件二次封装
-->
<template>
	<div class="table-wrapper" v-loading="loading">
		<el-table
			ref="tableRef"
			:border="border"
			:default-expand-all="defaultExpandAll"
			:row-key="rowKey"
			:stripe="stripe"
			:show-header="showHeader"
			:data="tableData"
			:span-method="objectSpanMethod"
			:highlight-current-row="highlightCurrentRow"
			@current-change="handleCurrentChange"
			@selection-change="handleSelectionChange"
			@sort-change="handleSortChange"
		>
			<!-- 序号及多选框 -->
			<el-table-column v-if="showSelection" fixed="left" type="selection" width="40" :selectable="checkboxSelect"> </el-table-column>
			<el-table-column v-if="showIndex" label="序号" align="center" type="index" width="70"></el-table-column>

			<!-- 表格数据 -->
			<el-table-column
				v-for="item in columns"
				:prop="item.prop"
				:sortable="item.sortable === 'custom' ? 'custom' : item.sortable ? true : false"
				:align="item.align"
				:label="item.label"
				:min-width="item.width"
				:key="item.label"
				:fixed="item.fixed ? item.fixed : false"
				show-overflow-tooltip
			>
				<template #default="{ row, $index }">
					<span v-if="!item.slot" :style="item.event === 'custom' ? row.style : ''" :class="item.active ? 'active' : ''">
						{{ row[item.prop] }}
					</span>
					<slot :name="item.slot" :row="{ ...row, index: $index }"></slot>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTable } from 'element-plus';
const props = defineProps({
	// 表格数据加载
	loading: {
		type: Boolean,
		default: false,
	},
	// 是否显示表格边框
	border: {
		type: Boolean,
		default: true,
	},
	// 是否展开表格
	showHeader: {
		type: Boolean,
		default: true,
	},
	// 是否为斑马纹
	stripe: {
		type: Boolean,
		default: true,
	},
	// 是否折叠
	defaultExpandAll: {
		type: Boolean,
		default: false,
	},
	// 折叠的key
	rowKey: {
		type: String,
		default: 'id',
	},
	// 是否高亮但前行
	highlightCurrentRow: {
		type: Boolean,
		default: false,
	},
	// 表格数据
	tableData: {
		type: Array as any,
		default: () => [],
	},
	// 表头每列的名称
	columns: {
		type: Array as any,
		default: () => [],
	},
	// 展示序号
	showIndex: {
		type: Boolean,
		default: true,
	},
	// 是否多选
	showSelection: {
		type: Boolean,
		default: false,
	},
	// 复选框禁用参数
	selectDisabledForm: {
		type: Object,
		default: null,
	},
	// 是否需要合并单元格
	spanMethodShow: {
		type: Boolean,
		default: false,
	},
	// 合并单元格数据
	arraySpanMethod: {
		type: Object,
		default: null,
	},
});
const emit = defineEmits(['handleSelectionChange', 'handleSortChange']);
defineExpose({ handleCurrentChange, clearSelection });

const currentRow = ref();
// 表格的当前行发生变化的时候会触发该事件 单个
function handleCurrentChange(val: any) {
	console.log('single---', val);
	currentRow.value = val;
}

// 表格多选改变
function handleSelectionChange(val: any) {
	console.log('multi', val);
	emit('handleSelectionChange', val);
}

// 排序
function handleSortChange(val: any) {
	emit('handleSortChange', val);
}

const tableRef = ref<InstanceType<typeof ElTable>>();
// 清除选中的框
function clearSelection() {
	tableRef.value!.clearSelection();
}

// 复选框禁用 仅对 type=selection 的列有效
const checkboxSelect = (row: any, rowIndex: number): boolean => {
	if (props.showSelection) {
		//是否复选框
		for (let key in props.selectDisabledForm) {
			//绑定参数表格禁用
			if (row[key] == props.selectDisabledForm[key]) {
				return false; //当满足什么条件时启用
			}
		}
		return true;
	}
	return true;
};

// 合并单元格
function objectSpanMethod({ row, column, rowIndex, columnIndex }: any) {
	//暂时合并行的逻辑
	if (props.arraySpanMethod && props.arraySpanMethod.rowspan && columnIndex === props.arraySpanMethod.columnIndex) {
		if (rowIndex > 0) {
			if (row[props.arraySpanMethod.id] != props.tableData[rowIndex - 1][props.arraySpanMethod.id]) {
				let i = rowIndex;
				let num = 0; // 定义一个变量i，用于记录行索引值并进行循环，num用于计数
				while (i < props.tableData.length) {
					// 当索引值小于table的数组长度时，循环执行
					if (props.tableData[i][props.arraySpanMethod.id] === row[props.arraySpanMethod.id]) {
						// 判断循环的单元格的值是不是和当前行的值相等
						i++; // 如果相等，则索引值加1
						num++; // 合并的num计数加1
					} else {
						i = props.tableData.length; // 如果不相等，将索引值设置为table的数组长度，跳出循环
					}
				}
				return {
					rowspan: num, // 最终将合并的行数返回
					colspan: props.arraySpanMethod.colspan,
				};
			} else {
				return {
					rowspan: 0, // 最终将合并的行数返回
					colspan: props.arraySpanMethod.colspan,
				};
			}
		} else {
			let i = rowIndex;
			let num = 0;
			while (i < props.tableData.length) {
				// 当索引值小于table的数组长度时，循环执行
				if (props.tableData[i][props.arraySpanMethod.id] === row[props.arraySpanMethod.id]) {
					i++;
					num++;
				} else {
					i = props.tableData.length;
				}
			}
			return {
				rowspan: num,
				colspan: props.arraySpanMethod.colspan,
			};
		}
	}
}
</script>

<style lang="scss">
.table-wrapper {
	width: 100%;
	height: 100%;
}
</style>
