<template>
	<view class="bg-white">
		<view v-if="diyComponent.layout == 'vertical'" class="graphic-nav py-[20rpx] px-[30rpx] box-border relative">
			<div v-if="diyComponent.navTitle"
				class="py-2 border-solid border-b border-t-0 border-l-0 border-r-0 border-gray-200">
				{{diyComponent.navTitle}}
			</div>
			<view
				class="graphic-nav-item flex items-center justify-between py-2 border-solid border-l-0 border-r-0 border-b-0 border-gray-200"
				v-for=" (item, index) in diyComponent.list" :key="item.id"
				:class="[index == 0 ? 'border-t-0':'border-t']" @click="redirectTo(item.link)">

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
				<u-icon name="arrow-right"></u-icon>
			</view>

		</view>
		<swiper v-else-if="diyComponent.layout == 'horizontal' && diyComponent.showStyle == 'pageSlide'"
			class="graphic-nav p-2 box-border relative" circular :indicator-dots="false"
			:style="{ height: swiperHeight }" @change="swiperChange">
			<swiper-item class="graphic-nav-wrap flex flex-wrap"
				v-for="(numItem, numIndex) in Math.ceil(diyComponent.list.length / (diyComponent.pageCount * diyComponent.rowCount))">
				<!-- #ifdef MP-WEIXIN -->

				<view class="graphic-nav-item flex flex-col items-center box-border py-2" :class="[diyComponent.mode]"
					v-for=" (item, index) in diyComponent.list" :key="item.id"
					v-if="index >= [(numItem) * (diyComponent.pageCount * diyComponent.rowCount)] && index < [(numItem+1) * (diyComponent.pageCount * diyComponent.rowCount)]"
					:style="{ width: 100 / diyComponent.rowCount + '%' }" @click="redirectTo(item.link)">
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class="graphic-nav-item flex flex-col items-center box-border py-2"
						:class="[diyComponent.mode]" v-for=" (item, index) in diyComponent.list" :key="item.id"
						v-if="index >= [(numItem - 1) * (diyComponent.pageCount * diyComponent.rowCount)] && index < [numItem * (diyComponent.pageCount * diyComponent.rowCount)]"
						:style="{ width: 100 / diyComponent.rowCount + '%' }" @click="redirectTo(item.link)">
						<!-- #endif -->

						<view class="graphic-img relative flex items-center justify-center w-10 h-10"
							v-if="diyComponent.mode != 'text'"
							:style="{  width: diyComponent.imageSize * 2 + 'rpx', height: diyComponent.imageSize * 2 + 'rpx' }">
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
					</view>
			</swiper-item>
		</swiper>

		<scroll-view v-else :scroll-x="diyComponent.showStyle == 'singleSlide'"
			:class="['graphic-nav','graphic-nav-'+diyComponent.showStyle]">
			<!-- #ifdef MP -->
			<view class="uni-scroll-view-content">
				<!-- #endif -->

				<view class="graphic-nav-item flex flex-col items-center box-border py-2"
					:class="{'flex-shrink-0' : diyComponent.showStyle == 'singleSlide'}"
					v-for="(item, index) in diyComponent.list" :key="item.id"
					:style="{ width: 100 / diyComponent.rowCount + '%' }" @click="redirectTo(item.link)">
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
	import useDiyStore from '@/stores/diy';
	import { useLogin } from '@/hooks/useLogin'

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
		var height = 0;
		if (diyComponent.value.mode == 'graphic') {
			height = (21 + 6 + 14 + 8 + diyComponent.value.imageSize) * diyComponent.value.pageCount; // 21 = 文字高度，8 = 文字上边距，14 = 上下内边距，8 = 外边距
		} else if (diyComponent.value.mode == 'img') {
			height = (14 + 8 + diyComponent.value.imageSize) * diyComponent.value.pageCount; // 14 = 上下内边距，8 = 外边距
		} else if (diyComponent.value.mode == 'text') {
			height = (21 + 14 + 8) * diyComponent.value.pageCount; // 21 = 文字高度，14 = 上下内边距，8 = 外边距
		}
		swiperHeight.value = height + 'rpx';
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
			if (currRoute() == 'pages/member/index' && !getToken()) {
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