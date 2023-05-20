<template>
	<view class="diy-text bg-white" @click="redirect(diyComponent.link)">

		<view v-if="diyComponent.style == 'style-1'" class="p-[20rpx]">
			<view class="" :style="{
						fontSize: diyComponent.fontSize * 2 + 'rpx',
						color: diyComponent.textColor,
						fontWeight: diyComponent.fontWeight,
						textAlign : diyComponent.textAlign
					}">
				{{ diyComponent.text }}
			</view>
		</view>
		<view v-if="diyComponent.style == 'style-2'" class="p-[20rpx] flex items-center">
			<view class="max-w-[200rpx] truncate" :style="{
						fontSize: diyComponent.fontSize * 2 + 'rpx',
						color: diyComponent.textColor,
						fontWeight: diyComponent.fontWeight
					}">
				{{ diyComponent.text }}
			</view>
			<text class="ml-[16rpx] max-w-[300rpx] truncate" :style="{ color: diyComponent.subTitle.color,
						fontSize: diyComponent.subTitle.fontSize * 2 + 'rpx', }">{{ diyComponent.subTitle.text }}</text>
			<view class="ml-auto text-right flex items-center" v-if="diyComponent.more.isShow" :style="{ color: diyComponent.more.color }"
				@click.stop="redirect(diyComponent.more.link)">
				<text class="max-w-[200rpx] truncate text-[24rpx] mr-[8rpx]">{{ diyComponent.more.text }}</text>
				<u-icon name="arrow-right" size="12" :style="{ color: diyComponent.more.color }"></u-icon>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	// 标题
	import { ref, computed } from 'vue';
	import { redirect, img } from '@/utils/common';
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

<style lang="scss" scoped>
	/* 单行超出隐藏 */
	.using-hidden {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		white-space: break-spaces;
	}

	/* 多行超出隐藏 */
	.multi-hidden {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>