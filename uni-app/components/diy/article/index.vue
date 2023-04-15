<template>
	<view>
		<view v-for="(item,index) in articleList" :key="item.id"
			:class="['bg-white flex align-center p-[20rpx]',{'border-solid border-t-0 border-l-0 border-r-0 border-b border-gray-200': articleList.length-1 !== index}] "
			@click="toLink(item.id)">
			<u--image width="260rpx" height="200rpx" :src="img(item.image)" v-if="item.image" model="aspectFill">
				<template #error>
					<u-icon name="photo" color="#999" size="50"></u-icon>
				</template>
			</u--image>
			<view class="flex-1 flex flex-col justify-between ml-[20rpx]">
				<view class="text-[32rpx] leading-[1.3] multi-hidden mt-[4rpx]">{{item.title}}</view>
				<view class="text-[28rx] using-hidden mb-[auto] mt-[20rpx] text-gray-500">{{item.summary}}</view>
				<view class="text-[24rpx] text-gray-400 flex justify-between mb-[10rpx]">
					<text class="">{{item.create_time}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	// 文章
	import { ref, computed } from 'vue';
	import { redirect, img } from '@/utils/common';
	import useDiyStore from '@/stores/diy';
	import { getArticleAll } from '@/api/article';

	const props = defineProps(['component', 'index']);
	const diyStore = useDiyStore();
	const articleList = ref<Array<any>>([]);

	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})

	const getArticleListFn = () => {
		interface dataStructure {
			ids ?: Array<number>,
			limit ?: number
		}
		let data : dataStructure = {};

		if (diyComponent.value.sources == "diy")
			data.ids = diyComponent.value.articleIds;
		else
			data.limit = diyComponent.value.count;

		interface takeDataStructure {
			data : Array<Object>,
			msg : string,
			code : number
		}
		getArticleAll(data).then((res : takeDataStructure) => {
			articleList.value = res.data;
		});
	}

	const refresh = () => {
		if (diyStore.mode == 'decorate') {
			let obj = {
				image: "",
				summary: "文章摘要",
				title: "文章标题",
				create_time: "2023-03-28 09:00:00"
			};
			articleList.value.push(obj);
		} else {
			getArticleListFn();
		}
	}

	refresh();
	const toLink = (id : string) => {
		redirect({ url: '/pages/article/detail', param: { id } })
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