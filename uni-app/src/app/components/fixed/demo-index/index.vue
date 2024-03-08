<template>
	<view>
		固定模板示例，我也可以装修
		<!-- 自定义模板渲染 -->
		<diy-group :data="props.data" :pullDownRefresh="props.pullDownRefresh"></diy-group>
	</view>
</template>

<script setup lang="ts">
	import { computed, watch } from 'vue';
    import diyGroup from '@/addon/components/diy/group/index.vue'
	const props = defineProps(['data', 'pullDownRefresh']);
</script>

<style></style>
