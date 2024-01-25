<template>
	<view class="image-ads" :style="warpCss">
		<view v-if="diyComponent.list.length == 1" class="leading-0 overflow-hidden" :style="swiperWarpCss">
			<app-link :data="diyComponent.list[0].link">
				<image :src="img(diyComponent.list[0].imageUrl)" :style="{height: imgHeight}" mode="heightFix" class="w-full" :show-menu-by-longpress="true"/>
			</app-link>
		</view>

		<swiper v-else class="swiper" :style="{ height: imgHeight }" autoplay="true" circular="true" @change="swiperChange">
			<swiper-item class="swiper-item" v-for="(item) in diyComponent.list" :key="item.id" :style="swiperWarpCss">
				<app-link :data="item.link">
					<view class="item" :style="{height: imgHeight}">
						<image :src="img(item.imageUrl)" mode="scaleToFill" class="w-full h-full" :show-menu-by-longpress="true"/>
					</view>
				</app-link>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts" setup>
	// 图片广告
	import { ref, onMounted, watch, computed } from 'vue';
	import { img } from '@/utils/common';
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
		return style;
	})

	const swiperWarpCss = computed(() => {
		var style = '';
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

	const imgHeight = computed(() => {
		return (diyComponent.value.imageHeight * 2) + 'rpx';
	})

	const swiperIndex = ref(0);

	const swiperChange = e => {
		swiperIndex.value = e.detail.current;
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
	}
</script>

<style lang="scss" scoped>
</style>
