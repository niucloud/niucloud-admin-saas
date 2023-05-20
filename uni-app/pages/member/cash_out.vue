<template>
	<view class="member-record-list">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getCashOutListFn">
			<view v-for="(item,index) in cashOutList" :key="item.id" class="member-record-item" @click="toDetailFn(item)">
				<view class="name">{{item.transfer_type_name}}</view>
				<view class="desc">{{t('applyTime')}}: {{item.create_time}}</view>
				<view class="desc">{{ item.status != -1 ? currentStatusDesc(item.status) : item.refuse_reason}}</view>
				<view class="money" :class="item.apply_money > 0 ? 'text-active' : ''"> 
					{{ item.apply_money > 0 ? '+' + item.apply_money : item.apply_money }}
				</view>
				<view class="state">
					{{ item.status_name }}
				</view>
			</view>
			<mescroll-empty v-if="!cashOutList.length && loading" :option="{tip : (account_type == 'commission' ? t('commissemptyTip') : t('emptyTip') )}"></mescroll-empty>
		</mescroll-body>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { t } from '@/locale'
import { redirect, img } from '@/utils/common';
import { getCashOutList } from '@/api/member';
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app';
const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

let cashOutList = ref<Array<any>>([]);
let mescrollRef = ref(null);
let loading = ref<boolean>(false);
let account_type = uni.getStorageSync('cashOutAccountType')
const currentStatusDesc = (status) =>{
	switch(status){
		case 1:
			return t('toBeReviewed')
		case 2:
			return t('toBeTransfer')
		case 3:
			return t('transfer')
		case -2:
			return t('cancelApply')
	}
}

const getCashOutListFn = (mescroll)=>{
	let data = ref({});
	loading.value = false;
	data.value.page = mescroll.num;
	data.value.page_size = mescroll.size;
	data.value.account_type = account_type;
	getCashOutList(data.value).then((res) => {
		let newArr = res.data.data;
		mescroll.endSuccess(newArr.length);
		//设置列表数据
		if (mescroll.num == 1){
			cashOutList.value = []; //如果是第一页需手动制空列表
		}
		cashOutList.value = cashOutList.value.concat(newArr);
		loading.value = true;
	}).catch(()=>{
		loading.value = true;
		mescroll.endErr(); // 请求失败, 结束加载
	})
}

const toDetailFn = (data)=>{
	redirect({ url: '/pages/member/cash_out_detail', param: { id: data.id }});
}
</script>

<style lang="scss">
	@import '@/styles/member_record_list.scss';
</style>
