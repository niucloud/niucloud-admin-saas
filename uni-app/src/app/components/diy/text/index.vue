<template>
	<view class="diy-text" :style="warpCss">
		<view v-if="diyComponent.style == 'style-1'" class="p-[20rpx]">
			<app-link :data="diyComponent.link">
				<view :style="{
						fontSize: diyComponent.fontSize * 2 + 'rpx',
						color: diyComponent.textColor,
						fontWeight: diyComponent.fontWeight,
						textAlign : diyComponent.textAlign
					}">
					{{ diyComponent.text }}
				</view>
			</app-link>
		</view>
		<view v-if="diyComponent.style == 'style-2'" class="p-[20rpx] flex items-center">
			<app-link :data="diyComponent.link">
				<view class="max-w-[200rpx] truncate" :style="{
						fontSize: diyComponent.fontSize * 2 + 'rpx',
						color: diyComponent.textColor,
						fontWeight: diyComponent.fontWeight
					}">
					{{ diyComponent.text }}
				</view>
			</app-link>
			<text class="ml-[16rpx] max-w-[300rpx] truncate" :style="{ color: diyComponent.subTitle.color, fontSize: diyComponent.subTitle.fontSize * 2 + 'rpx', }">{{ diyComponent.subTitle.text }}</text>
			<view class="ml-auto text-right " v-if="diyComponent.more.isShow" :style="{ color: diyComponent.more.color }">
				<app-link :data="diyComponent.more.link" custom-class="flex items-center">
					<text class="max-w-[200rpx] truncate text-[24rpx] mr-[8rpx]">{{ diyComponent.more.text }}</text>
					<u-icon name="arrow-right" size="12" :style="{ color: diyComponent.more.color }"></u-icon>
				</app-link>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	// 标题
	import { ref, computed, watch } from 'vue';
	import { redirect, img } from '@/utils/common';
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
		if (diyComponent.value.componentBgColor) style += 'background-color:' + diyComponent.value.componentBgColor + ';';
		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		return style;
	})

	watch(
		() => props.pullDownRefresh,
		(newValue, oldValue) => {
			// 处理下拉刷新业务
		}
	)
</script>

<style lang="scss" scoped>
</style>
