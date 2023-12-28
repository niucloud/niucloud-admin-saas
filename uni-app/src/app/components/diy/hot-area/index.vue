<template>
	<view :style="warpCss">
		<view class="simple-graph-wrap overflow-hidden relative leading-0">
			<image :style="{ height: diyComponent.imgHeight }" :src="img(diyComponent.imageUrl)" mode="widthFix"
				:show-menu-by-longpress="true" class="w-full"></image>

			<template v-if="diyStore.mode != 'decorate'">
				<!-- 热区功能 -->
				<app-link :data="mapItem.link" custom-class="absolute" v-for="(mapItem, mapIndex) in diyComponent.heatMapData"
					:key="mapIndex" :style="{
					width: mapItem.width + '%',
					height: mapItem.height + '%',
					left: mapItem.left + '%',
					top: mapItem.top + '%'
				}"></app-link>

			</template>
		</view>
	</view>
</template>

<script setup lang="ts">
	// 热区
	import { computed, watch, onMounted } from 'vue';
	import useDiyStore from '@/app/stores/diy';
	import { img } from '@/utils/common';

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
		if (diyComponent.value.componentBgColor) style += 'background-color:' + diyComponent.value.componentBgColor + ';';
		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		return style;
	})

	onMounted(() => {
		refresh();
		// 装修模式下刷新
		watch(
			() => diyComponent.value,
			(newValue, oldValue) => {
				if (newValue && newValue.componentName == 'HotArea') {
					refresh();
				}
			}
		)
	});

	const refresh = () => {
		if (diyStore.mode == 'decorate') {
			// 装修模式下设置默认图
			if (diyComponent.value.imageUrl == '') {
				diyComponent.value.imageUrl = 'static/resource/images/diy/figure.png';
				diyComponent.value.imgWidth = 690;
				diyComponent.value.imgHeight = 330;
			}
		}
	}

	watch(
		() => props.pullDownRefresh,
		(newValue, oldValue) => {
			// 处理下拉刷新业务
		}
	)
</script>

<style lang="scss">
</style>
