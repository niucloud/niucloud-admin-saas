<template>
	<view :style="warpCss">
		<view v-for="(item,index) in list" :key="item.id"
			:class="['item flex align-center p-[20rpx]  mb-[20rpx]',{'border-solid border-t-0 border-l-0 border-r-0 border-b border-gray-200': list.length-1 !== index}] "
			@click="toLink(item.url)">
			<u--image width="120rpx" height="120rpx" :src="img(item.icon)" v-if="item.icon"
				class="rounded-md overflow-hidden" model="aspectFill">
				<template #error>
					<u-icon name="photo" color="#999" size="60"></u-icon>
				</template>
			</u--image>
			<view class="flex-1 flex flex-col justify-center ml-[20rpx]">
				<view class="text-sm leading-[1.3] using-hidden">{{item.title}}</view>
				<view class="text-xs text-[#999] mt-[8rpx] leading-[1.6] multi-hidden">{{item.desc}}</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	// 应用列表
	import { ref, computed, watch, onMounted } from 'vue';
	import { redirect, img } from '@/utils/common';
	import useDiyStore from '@/app/stores/diy';
	import { getWapIndexList } from '@/app/api/system';

	const props = defineProps(['component', 'index', 'pullDownRefreshCount']);
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

	const list = ref([])

	watch(
		() => props.pullDownRefreshCount,
		(newValue, oldValue) => {
			// 处理下拉刷新业务
		}
	)

	onMounted(() => {
		refresh();
		// 装修模式下刷新
		if (diyStore.mode == 'decorate') {
			watch(
				() => diyComponent.value,
				(newValue, oldValue) => {
					if (newValue && newValue.componentName == 'AddonList') {
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
				if (item.icon == '') {
					item.icon = 'static/resource/images/diy/figure.png';
				}
				if (item.title == '') {
					item.title = '应用名称';
				}
			});
		}

		if (diyComponent.value.list.length == 0) {
			getWapIndexList({}).then((res) => {
				list.value = res.data;
			})
		} else {
			list.value = diyComponent.value.list;
		}
	}

	const toLink = (url : string) => {
		redirect({ url })
	}
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