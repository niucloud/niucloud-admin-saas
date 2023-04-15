<template>
	<view class="image-ads">
		<view v-if="diyComponent.list.length == 1" class="simple-graph-wrap"
			@click="diyRedirect(diyComponent.list[0].link)">
			<image :src="img(diyComponent.list[0].imageUrl)" :style="{ height: diyComponent.list[0].height }"
				mode="widthFix" class="w-full" :show-menu-by-longpress="true"></image>
		</view>

		<swiper v-else class="swiper" :style="{ height: swiperHeight }" autoplay="true" circular="true"
			@change="swiperChange">
			<swiper-item class="swiper-item" v-for="(item) in diyComponent.list" :key="item.id"
				@click="diyRedirect(item.link)">
				<view class="item" :style="{ height: item.height }">
					<image :src="img(item.imageUrl)" mode="scaleToFill" class="w-full h-full"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts" setup>
	// 图片广告
	import { ref, onMounted, watch, computed } from 'vue';
	import { img, diyRedirect } from '@/utils/common';
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

	const swiperIndex = ref(0);

	const swiperChange = e => {
		swiperIndex.value = e.detail.current;
	};

	const swiperHeight = ref('');

	const handleData = () => {
		let minHeight = 0;
		swiperHeight.value = '0rpx';

		diyComponent.value.list.forEach((item, index) => {

			uni.getSystemInfo({
				success: res => {
					var ratio = item.imgHeight / item.imgWidth;
					item.width = res.windowWidth;
					item.height = item.width * ratio;
				}
			});

			// 获取最大高度 if (maxHeight == 0 || maxHeight < item.imgHeight) maxHeight = item.imgHeight;
			if (minHeight == 0 || minHeight > item.height) minHeight = item.height;
		});

		diyComponent.value.list.forEach((item, index) => {
			item.height = minHeight * 2 + 'rpx';
			swiperHeight.value = minHeight * 2 + 'rpx';
		});

	};

	onMounted(() => {
		refresh();
		// 装修模式下刷新
		if (diyStore.mode == 'decorate') {
			watch(
				() => diyComponent.value,
				(newValue, oldValue) => {
					if (newValue && newValue.componentName == 'ImageAds') {
						refresh();
					}
				}
			)
		}
	});

	const refresh = () => {
		// 装修模式下设置默认图
		if (diyStore.mode == 'decorate') {
			diyComponent.value.list.forEach((item : any, index) => {
				if (item.imageUrl == '') {
					item.imageUrl = 'static/resource/images/diy/figure.png';
					item.imgWidth = 690;
					item.imgHeight = 330;
				}
			});
		}
		handleData()
	}
</script>

<style lang="scss" scoped>
</style>