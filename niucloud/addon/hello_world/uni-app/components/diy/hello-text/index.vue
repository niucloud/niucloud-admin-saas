<template>
	<view :style="warpCss">
		hello-world：演示插件文本——自定义组件
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

    const warpCss = computed(() => {
        var style = '';
        style += 'background-color:' + diyComponent.value.componentBgColor + ';';
        style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
        style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
        style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
        style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
        return style;
    })
</script>

<style></style>