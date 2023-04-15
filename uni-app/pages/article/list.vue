<template>
	<view class="bg-gray-100 min-h-[100vh]">
		<view class="fixed top-0 inset-x-0 z-10">
			<view
				class='p-[10px] bg-white border-solid border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-200'>
				<u-search :placeholder="t('searchPlaceholder')" actionText :actionStyle="{'width':0,'margin':0}"
					v-model="articleTitle" @clickIcon="searchFn"></u-search>
			</view>
			<scroll-view :scroll-x="true" :enable-flex="true"
				class="nav-list bg-white align-center px-[10px] box-border">
				<view class="flex scroll-view-wrap">
					<view
						:class="['nav-item text-[14px] mx-[5px] h-[30px] leading-[30px] my-[5px] border-t-0 border-l-0 border-r-0',{'border-solid border-b-[2px] active': currCategoryId==item.category_id}]"
						@click="loadCategory(item.category_id)" v-for="(item,index) in categoryList"
						:key="item.category_id">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="220rpx" @down="downCallback" @up="getArticleListFn">
			<view v-for="(item,index) in articleList" :key="item.id"
				:class="['bg-white flex align-center p-[10px]',{'border-solid border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-200': articleList.length-1 !== index}] "
				@click="toLink(item.id)">
				<u--image width="260rpx" height="200rpx" :src="img(item.image)" v-if="item.image" model="aspectFill">
					<template #error>
						<u-icon name="photo" color="#999" size="50"></u-icon>
					</template>
				</u--image>
				<view class="flex-1 flex flex-col justify-between ml-[10px]">
					<view class="text-[16px] leading-[1.3] multi-hidden mt-[2px]">{{item.title}}</view>
					<view class="text-[14px] using-hidden mb-[auto] mt-[10px] text-gray-500">{{item.summary}}</view>
					<view class="text-[12px] text-gray-400 flex justify-between mb-[5px]">
						<text class="">{{item.create_time}}</text>
					</view>
				</view>
			</view>
			<mescroll-empty v-if="!articleList.length && loading"></mescroll-empty>
		</mescroll-body>
		<tabbar />
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { t } from '@/locale'
	import { redirect, img } from '@/utils/common';
	import { getArticleList, getArticleCategory } from '@/api/article';
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
	import { onPageScroll, onReachBottom } from '@dcloudio/uni-app';
	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
	import { useShare } from '@/hooks/useShare'

	const { setShare, onShareAppMessage, onShareTimeline } = useShare()
	setShare()
	onShareAppMessage()
	onShareTimeline()

	let categoryList = ref<Array<Object>>([]);
	let articleList = ref<Array<any>>([]);
	let currCategoryId = ref<number | string>('');
	let articleTitle = ref<string>('');
	let mescrollRef = ref(null);
	let loading = ref<boolean>(false);

	interface acceptingDataStructure {
		data : acceptingDataItemStructure,
		msg : string,
		code : number
	}
	interface acceptingDataItemStructure {
		data : object,
		[propName : string] : number | string | object
	}
	onLoad(async () => {
		await getArticleCategory().then((res : acceptingDataStructure) => {
			const initData = { name: t("all"), category_id: '' };
			categoryList.value.push(initData);
			categoryList.value = categoryList.value.concat(res.data.data);
		});
	})

	interface mescrollStructure {
		num : number,
		size : number,
		endSuccess : Function,
		[propName : string] : any
	}
	const getArticleListFn = (mescroll : mescrollStructure) => {
		loading.value = false;
		let data : object = {
			category_id: currCategoryId.value,
			title: articleTitle.value,
			page: mescroll.num,
			limit: mescroll.size
		};

		getArticleList(data).then((res : acceptingDataStructure) => {
			let newArr = (res.data.data as Array<Object>);
			//设置列表数据
			if (mescroll.num == 1) {
				articleList.value = []; //如果是第一页需手动制空列表
			}
			articleList.value = articleList.value.concat(newArr);
			mescroll.endSuccess(newArr.length);
			loading.value = true;
		}).catch(() => {
			loading.value = true;
			mescroll.endErr(); // 请求失败, 结束加载
		})
	}

	const loadCategory = (id : string) => {
		currCategoryId.value = id;
		getMescroll().resetUpScroll();
	}

	const searchFn = () => {
		getMescroll().resetUpScroll();
	}

	const toLink = (id : string) => {
		redirect({ url: '/pages/article/detail', param: { id } })
	}

	onMounted(() => {
		setTimeout(() => {
			getMescroll().optUp.textNoMore = t("end");
		}, 500)
	});
</script>

<style lang="scss" scoped>
	.nav-item.active {
		color: $u-primary;
	}

	.scroll-view-wrap {
		word-break: keep-all;
	}

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