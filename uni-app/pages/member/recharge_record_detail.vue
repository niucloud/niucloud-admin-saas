<template>
	<view class="member-record-detail">
		<view class="money-wrap">
			<text>-{{ cashOutInfo.apply_money }}</text>
			<text>{{ cashOutInfo.status_name }}</text>
		</view>
		<!-- 状态0待审核1.待转账2已转账 -1拒绝' -->
		<view class="item">
			<view class="line-wrap">
				<text class="label">{{t('cashOutNo')}}</text>
				<text class="value">{{ cashOutInfo.cash_out_no }}</text>
			</view>
			<view class="line-wrap">
				<text class="label">{{t('serviceMoney')}}</text>
				<text class="value">￥{{ cashOutInfo.service_money }}</text>
			</view>
			<view class="line-wrap">
				<text class="label">{{t('createTime')}}</text>
				<text class="value">{{ cashOutInfo.create_time }}</text>
			</view>
			<view class="line-wrap" v-if="cashOutInfo.status">
				<text class="label">{{t('auditTime')}}</text>
				<text class="value">{{ cashOutInfo.audit_time }}</text>
			</view>
			<view class="line-wrap" v-if="cashOutInfo.transfer_bank">
				<text class="label">{{t('transferBank')}}</text>
				<text class="value">{{ cashOutInfo.transfer_bank }}</text>
			</view>
			<view class="line-wrap">
				<text class="label">{{t('transferAccount')}}</text>
				<text class="value">{{ cashOutInfo.transfer_account }}</text>
			</view>
			<view class="line-wrap" v-if="cashOutInfo.status == -1 && cashOutInfo.refuse_reason">
				<text class="label">{{t('refuseReason')}}</text>
				<text class="value">{{ cashOutInfo.refuse_reason }}</text>
			</view>
			<view class="line-wrap" v-if="cashOutInfo.status == 2">
				<text class="label">{{t('transferTypeName')}}</text>
				<text class="value">{{ cashOutInfo.transfer_type_name }}</text>
			</view>
			<view class="line-wrap" v-if="cashOutInfo.status == 2">
				<text class="label">{{t('transferTime')}}</text>
				<text class="value">{{ cashOutInfo.transfer_time }}</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { t } from '@/locale'
import { redirect, img } from '@/utils/common';
import { getRechargeDetail } from '@/api/member';

let cashOutInfo = ref({});
let loading = ref<boolean>(false);
onLoad((option) => {
	let id = option.id || "";
	getCashoutAccountListFn(id)
})

const getCashoutAccountListFn = (id) => {
	loading.value = false;

	getRechargeDetail(id).then((res) => {
		cashOutInfo.value = res.data;
		loading.value = true;
	}).catch(() => {
		loading.value = true;
	})
}
</script>

<style lang="scss">
@import '@/styles/member_record_detail.scss';
</style>
