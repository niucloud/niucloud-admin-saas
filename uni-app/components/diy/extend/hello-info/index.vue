<template>
	<view>
		演示插件信息——自定义组件
	</view>
</template>

<script setup lang="ts">
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
</script>

<style></style>