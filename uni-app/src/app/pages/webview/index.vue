<template>
	<view>
		<u-icon name="arrow-left" class="navigate-back" @click="navigateBack"></u-icon>
		<web-view :src="src"></web-view>
	</view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';

	const src = ref('')

	onLoad((option : any) => {
		src.value = decodeURIComponent(option.src);
	})

	const navigateBack = () => {
		uni.navigateBack({
			delta: 1
		});
	}
</script>

<style lang="scss" scoped>
	.navigate-back {
		position: absolute;
		top: 34rpx;
		left: 34rpx;
		z-index: 999;
		font-size: 16px;
	}
</style>