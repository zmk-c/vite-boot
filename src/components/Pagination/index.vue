<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-15 10:44:04
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-28 15:17:45
 * @FilePath: /vite-boot/src/components/Pagination/index.vue
 * @Description: 分页器二次封装
-->
<template>
	<div>
		<el-pagination
			background
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="pageSizes"
			:layout="layout"
			:total="total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
	page: { type: Number, default: 1 },
	size: { type: Number, default: 10 },
	total: { type: Number, default: 0 },
	layout: { type: String, default: 'prev, pager, next, jumper, -> , sizes, total' },
	pageSizes: {
		type: Array,
		default: () => [10, 20, 30, 50, 100],
	},
});

const emit = defineEmits(['update:size', 'update:page', 'pagination']);

const pageSize = computed({
	get: () => props.size,
	set: (val) => {
		emit('update:size', val);
	},
});
const currentPage = computed({
	get: () => props.page,
	set: (val) => {
		emit('update:page', val);
	},
});

function handleSizeChange() {
	emit('pagination');
}

function handleCurrentChange() {
	emit('pagination');
}
</script>
