<template>
	<view>
		<u-loading-page :loading="loading" loadingText=""></u-loading-page>
		<view v-show="!loading"
			:style="{ backgroundColor: data.global.pageBgColor,minHeight: 'calc(100vh - 50px)',backgroundImage : data.global.bgUrl ? 'url(' +  img(data.global.bgUrl) + ')' : '' }"
			class="bg-index">
			<diy-group :data="data"></diy-group>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import { onLoad, onShow } from '@dcloudio/uni-app';
	import { getDiyInfo } from '@/api/diy';
	import useDiyStore from '@/stores/diy';
	import { useShare } from '@/hooks/useShare'
	import { img } from '@/utils/common';

	const { setShare, onShareAppMessage, onShareTimeline } = useShare()
	setShare();
	onShareAppMessage()
	onShareTimeline()

	const loading = ref(true);
	const diyStore = useDiyStore();

	const diyData = reactive({
		global: {},
		value: []
	})

	const data = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore;
		} else {
			return diyData;
		}
	})

	onLoad(option => {
		// #ifdef H5
		// 装修模式
		diyStore.mode = option.mode || '';
		if (diyStore.mode == 'decorate') {
			loading.value = false;
		}
		// #endif
	});

	onShow(() => {
		// 装修模式
		if (diyStore.mode == 'decorate') {
			diyStore.init();
		} else {
			getDiyInfo({
				name: 'DIY_INDEX'
			}).then((res : any) => {
				if (res.data.value) {
					let sources = JSON.parse(res.data.value);
					diyData.global = sources.global;
					diyData.value = sources.value;
					diyData.value.forEach((item, index) => {
						item.pageStyle = '';
						if (item.pageBgColor) item.pageStyle += 'background-color:' + item.pageBgColor + ';';
						if (item.margin) {
							item.pageStyle += 'padding-top:' + item.margin.top * 2 + 'rpx' + ';';
							item.pageStyle += 'padding-bottom:' + item.margin.bottom * 2 + 'rpx' + ';';
							item.pageStyle += 'padding-right:' + item.margin.both * 2 + 'rpx' + ';';
							item.pageStyle += 'padding-left:' + item.margin.both * 2 + 'rpx' + ';';
						}
					});
					uni.setNavigationBarTitle({
						title: diyData.global.title
					})
				}

				loading.value = false;
			});
		}

	});
</script>
<style lang="scss" scoped>
	.bg-index {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background-size: 100% !important;
		background-repeat: no-repeat !important;
	}
</style>