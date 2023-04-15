<template>
	<view class="bg-gray-100 min-h-[100vh]">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getPointListFn">
			<view v-for="(item,index) in pointList" :key="item.id" :class="['bg-white relative p-[10px]',{'border-solid border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-200': pointList.length-1 != index}] ">
				<view class="text-[14px]">{{item.from_type_name}}</view>
				<view class="text-[12px] text-gray-400 mt-[10px]">{{item.create_time}}</view>
				<view class="text-[14px] absolute top-[50%] transform -translate-y-[50%] right-[10px]">{{item.account_data}}</view>
			</view>
			<mescroll-empty v-if="!pointList.length && loading"></mescroll-empty>
		</mescroll-body>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { t } from '@/locale'
import { redirect, img } from '@/utils/common';
import { getPointList } from '@/api/member';
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app';
const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

let pointList = ref<Array<any>>([]);
let mescrollRef = ref(null);
let loading = ref<boolean>(false);

const getPointListFn = (mescroll)=>{
	let data = ref({});
	loading.value = false;
	data.value.page = mescroll.num;
	data.value.page_size = mescroll.size;
	getPointList(data.value).then((res) => {
		let newArr = res.data.data;
		mescroll.endSuccess(newArr.length);
		//设置列表数据
		if (mescroll.num == 1){
			pointList.value = []; //如果是第一页需手动制空列表
		}
		pointList.value = pointList.value.concat(newArr);
		loading.value = true;
	}).catch(()=>{
		loading.value = true;
		mescroll.endErr(); // 请求失败, 结束加载
	})
}
</script>

<style lang="scss" scoped></style>
