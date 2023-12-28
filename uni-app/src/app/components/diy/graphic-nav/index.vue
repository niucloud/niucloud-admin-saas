<template>
	<view :style="warpCss">
		<div v-if="diyComponent.navTitle" class="py-[30rpx] px-[32rpx] text-[30rpx]"
			:style="{fontWeight: diyComponent.font.weight,color:diyComponent.font.color}">
			{{diyComponent.navTitle}}
		</div>
		<view v-if="diyComponent.layout == 'vertical'" class="graphic-nav">
			<view class="graphic-nav-item" v-for="(item, index) in diyComponent.list" :key="item.id">

				<app-link :data="item.link" custom-class="flex items-center justify-between  py-[30rpx] px-[32rpx]"
					:class="[index == 0 ? 'border-t-0':'border-t']">

					<view class="graphic-img relative flex items-center w-10 h-10 mr-[20rpx]"
						v-if="diyComponent.mode != 'text'"
						:style="{ width: diyComponent.imageSize * 2 + 'rpx', height: diyComponent.imageSize * 2 + 'rpx' }">
						<image :src="img(item.imageUrl)" mode="aspectFill"
							:style="{ maxWidth: diyComponent.imageSize * 2 + 'rpx', maxHeight: diyComponent.imageSize * 2 + 'rpx', borderRadius: diyComponent.aroundRadius * 2 + 'rpx' }">
						</image>
						<text v-if="item.label.control"
							class="tag absolute -top-[10rpx] -right-[24rpx] text-white rounded-[24rpx] rounded-bl-none transform scale-80 py-1 px-2 text-xs"
							:style="{ color: item.label.textColor, backgroundImage: 'linear-gradient(' + item.label.bgColorStart + ',' + item.label.bgColorEnd + ')' }">
							{{ item.label.text }}
						</text>
					</view>

					<text v-if="diyComponent.mode != 'img'" class="graphic-text w-full truncate leading-normal"
						:style="{ fontSize: diyComponent.font.size * 2 + 'rpx', fontWeight: diyComponent.font.weight, color: diyComponent.font.color }">
						{{ item.title }}
					</text>
					<u-icon name="arrow-right" color="#CACACA"></u-icon>

				</app-link>

			</view>

		</view>
		<swiper v-else-if="diyComponent.layout == 'horizontal' && diyComponent.showStyle == 'pageSlide'"
			class="graphic-nav p-2 box-border relative" circular :indicator-dots="false"
			:style="{ height: swiperHeight }" @change="swiperChange">
			<swiper-item class="graphic-nav-wrap flex flex-wrap"
				v-for="(numItem, numIndex) in Math.ceil(diyComponent.list.length / (diyComponent.pageCount * diyComponent.rowCount))">

				<template v-for="(item, index) in diyComponent.list">

					<view class="graphic-nav-item" :class="[diyComponent.mode]" :key="item.id"
						v-if="swiperCondition(index,numItem)" :style="{ width: 100 / diyComponent.rowCount + '%' }">

						<app-link :data="item.link" custom-class="flex flex-col items-center box-border py-2">

							<view class="graphic-img relative flex items-center justify-center w-10 h-10"
								v-if="diyComponent.mode != 'text'"
								:style="{ width: diyComponent.imageSize * 2 + 'rpx', height: diyComponent.imageSize * 2 + 'rpx' }">
								<image :src="img(item.imageUrl)" mode="aspectFill"
									:style="{ maxWidth: diyComponent.imageSize * 2 + 'rpx', maxHeight: diyComponent.imageSize * 2 + 'rpx', borderRadius: diyComponent.aroundRadius * 2 + 'rpx' }">
								</image>

								<text
									class="tag absolute -top-[10rpx] -right-[24rpx] text-white rounded-[24rpx] rounded-bl-none transform scale-80 py-1 px-2 text-xs"
									v-if="item.label.control"
									:style="{ color: item.label.textColor, backgroundImage: 'linear-gradient(' + item.label.bgColorStart + ',' + item.label.bgColorEnd + ')' }">
									{{ item.label.text }}
								</text>
							</view>

							<text v-if="diyComponent.mode != 'img'"
								class="graphic-text w-full text-center truncate leading-normal"
								:class="{ 'pt-1.5' : diyComponent.mode != 'text' }"
								:style="{ fontSize: diyComponent.font.size * 2 + 'rpx', fontWeight: diyComponent.font.weight, color: diyComponent.font.color }">
								{{ item.title }}
							</text>
						</app-link>

					</view>
				</template>
			</swiper-item>
		</swiper>

		<scroll-view v-else :scroll-x="diyComponent.showStyle == 'singleSlide'"
			:class="['graphic-nav','graphic-nav-' + diyComponent.showStyle]">
			<!-- #ifdef MP -->
			<view class="uni-scroll-view-content">
				<!-- #endif -->

				<view class="graphic-nav-item" :class="{'flex-shrink-0' : diyComponent.showStyle == 'singleSlide'}"
					v-for="(item, index) in diyComponent.list" :key="item.id"
					:style="{ width: 100 / diyComponent.rowCount + '%' }">

					<app-link :data="item.link" custom-class="flex flex-col items-center box-border py-2">
						<view class="graphic-img relative flex items-center justify-center w-10 h-10"
							v-if="diyComponent.mode != 'text'"
							:style="{ width: diyComponent.imageSize * 2 + 'rpx', height: diyComponent.imageSize * 2 + 'rpx' }">
							<image :src="img(item.imageUrl)" mode="aspectFill"
								:style="{ maxWidth: diyComponent.imageSize * 2 + 'rpx', maxHeight: diyComponent.imageSize * 2 + 'rpx', borderRadius: diyComponent.aroundRadius * 2 + 'rpx' }">
							</image>
							<text
								:class="['tag absolute -top-[10rpx] -right-[24rpx] text-white rounded-[24rpx] rounded-bl-none transform scale-80 py-1 px-2 text-xs']"
								v-if="item.label.control"
								:style="{ color: item.label.textColor, backgroundImage: 'linear-gradient(' + item.label.bgColorStart + ',' + item.label.bgColorEnd + ')' }">
								{{ item.label.text }}
							</text>
						</view>
						<text v-if="diyComponent.mode != 'img'"
							class="graphic-text w-full text-center truncate leading-normal"
							:class="{ 'pt-1.5' : diyComponent.mode != 'text' }"
							:style="{ fontSize: diyComponent.font.size * 2 + 'rpx', fontWeight: diyComponent.font.weight, color: diyComponent.font.color }">
							{{ item.title }}
						</text>
					</app-link>
				</view>

				<!-- #ifdef MP -->
			</view>
			<!-- #endif -->

		</scroll-view>

	</view>
</template>

<script lang="ts" setup>
	// 图文导航
	import { ref, onMounted, watch, computed } from 'vue';
	import { img, diyRedirect, currRoute, getToken } from '@/utils/common';
	import useDiyStore from '@/app/stores/diy';
	import { useLogin } from '@/hooks/useLogin';

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

	const swiperIndex = ref(0);

	const swiperChange = e => {
		swiperIndex.value = e.detail.current;
	};

	const swiperCondition = (index, numItem) => {
		let count = diyComponent.value.pageCount * diyComponent.value.rowCount;
		let result = true;

		// #ifdef MP-WEIXIN
		result = index >= [(numItem) * (count)] && index < [(numItem + 1) * (count)];
		// #endif

		// #ifdef H5
		result = index >= [(numItem - 1) * (count)] && index < [numItem * (count)];
		// #endif

		return result;
	}

	const swiperHeight = ref('');

	const handleData = () => {
		var height = 0;
		if (diyComponent.value.mode == 'graphic') {
			height = (21 + 6 + 14 + 8 + diyComponent.value.imageSize) * diyComponent.value.pageCount; // 21 = 文字高度，6 = 文字上边距，14 = 上下内边距，8 = 外边距
		} else if (diyComponent.value.mode == 'img') {
			height = (14 + 8 + diyComponent.value.imageSize) * diyComponent.value.pageCount; // 14 = 上下内边距，8 = 外边距
		} else if (diyComponent.value.mode == 'text') {
			height = (21 + 14 + 8) * diyComponent.value.pageCount; // 21 = 文字高度，14 = 上下内边距，8 = 外边距
		}
		swiperHeight.value = (height * 2) + 'rpx';
	};

	onMounted(() => {
		refresh();
		// 装修模式下刷新
		if (diyStore.mode == 'decorate') {
			watch(
				() => diyComponent.value,
				(newValue, oldValue) => {
					if (newValue && newValue.componentName == 'GraphicNav') {
						refresh();
					}
				}
			)
		}
	});

	const refresh = () => {
		if (diyStore.mode == 'decorate') {
			diyComponent.value.list.forEach((item : any, index) => {
				// 装修模式下设置默认图
				if (item.imageUrl == '') {
					item.imageUrl = 'static/resource/images/diy/figure.png';
				}
			});
		}
		handleData()
	}

	const redirectTo = (link : any) => {
		if (link.url) {
			if (currRoute() == 'app/pages/member/index' && !getToken()) {
				useLogin().setLoginBack({ url: link.url })
				return;
			}
			diyRedirect(link);
		}
	}
</script>

<style>
	/* 固定显示 */
	.graphic-nav-fixed>>>.uni-scroll-view-content {
		display: flex;
		flex-wrap: wrap;
	}

	/* 单行滑动 */
	.graphic-nav-singleSlide>>>.uni-scroll-view-content {
		display: flex;
	}
</style>
<style lang="scss" scoped>
</style>
