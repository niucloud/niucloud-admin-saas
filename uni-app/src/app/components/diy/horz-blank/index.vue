<template>
	<view :style="warpCss">
	</view>
</template>

<script setup lang="ts">
	// 辅助空白
	import { computed, watch } from 'vue';
	import useDiyStore from '@/app/stores/diy';

	const props = defineProps(['component', 'index', 'pullDownRefresh']);

	const diyStore = useDiyStore();

	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})

	const warpCss = computed(() => {
		var style = '';
		style += 'height:' + diyComponent.value.height * 2 + 'rpx;';
		if (diyComponent.value.componentBgColor) style += 'background-color:' + diyComponent.value.componentBgColor + ';';
		return style;
	})

	watch(
		() => props.pullDownRefresh,
		(newValue, oldValue) => {
			// 处理下拉刷新业务
		}
	)
</script>

<style></style>
