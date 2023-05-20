<template>
	<view :style="horzBlankGaugeWrap">
	</view>
</template>

<script setup lang="ts">
	// 辅助空白
	import { computed } from 'vue';
	import useDiyStore from '@/stores/diy';

	const props = defineProps(['component', 'index']);

	const diyStore = useDiyStore();

	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})

	const horzBlankGaugeWrap = computed(() => {
		var style = '';
		style += 'height:' + diyComponent.value.height * 2 + 'rpx';
		return style;
	})
</script>

<style></style>