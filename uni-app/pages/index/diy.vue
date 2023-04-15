<template>
	<view>
		<u-loading-page :loading="loading" loadingText=""></u-loading-page>
		<view v-show="!loading" :style="{ backgroundColor: data.global.pageBgColor }">
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

	const { setShare, onShareAppMessage, onShareTimeline } = useShare()
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

	const id = ref(0)
	const name = ref('')

	onLoad(option => {
		// #ifdef H5
		// 装修模式
		diyStore.mode = option.mode || '';
		if (diyStore.mode == 'decorate') {
			loading.value = false;
		}
		// #endif
		id.value = option.id || '';
		name.value = option.name || '';
	});

	onShow(() => {
		// 装修模式
		if (diyStore.mode == 'decorate') {
			diyStore.init();
		} else {
			getDiyInfo({
				id: id.value,
				name: name.value
			}).then((res : any) => {
				if (res.code == 200) {
					let sources = JSON.parse(res.data.value);
					diyData.global = sources.global;
					diyData.value = sources.value;
					uni.setNavigationBarTitle({
						title: diyData.global.title
					})

					let share = res.data.share ? JSON.parse(res.data.share) : null;
					setShare(share);

					loading.value = false;
				}
			});
		}
	});
</script>
<style lang="scss" scoped>
</style>