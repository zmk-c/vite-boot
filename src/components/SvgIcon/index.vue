<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-15 10:06:47
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-15 10:29:12
 * @FilePath: /vite-boot/src/components/SvgIcon/index.vue
 * @Description: SVG图片组件
-->

<template>
	<!-- svg: 图标外层容器节点，内部需要和use标签配合使用 -->
	<svg :style="{ width, height }">
		<!-- xlink: href 属性执行哪个图标，属性值务必# icon-图标名字 -->
		<!-- use标签的fill属性可以设置图标颜色 -->
		<use :xlink:href="prefix + name" :fill="color"></use>
	</svg>
</template>

<script setup lang="ts">
defineProps({
	// xlink:href 属性值前缀
	prefix: {
		type: String,
		default: '#icon-',
	},
	// 提供使用的图标名字
	name: {
		type: String,
		default: '',
	},
	// 接受父组件传递颜色
	color: {
		type: String,
		default: '',
	},
	// 接受父组件传递的图标宽度和高度
	width: {
		type: String,
		default: '16px',
	},
	height: {
		type: String,
		default: '16px',
	},
});
</script>

<style scoped></style>
