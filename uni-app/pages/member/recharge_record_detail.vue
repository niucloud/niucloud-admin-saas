<template>
	<view class="member-record-detail">
		<view class="money-wrap">
			<text>-{{ rechargeInfo.apply_money }}</text>
			<text>{{ rechargeInfo.status_name }}</text>
		</view>
		<!-- 状态0待审核1.待转账2已转账 -1拒绝' -->
		<view class="item">
			<view class="line-wrap">
				<text class="label">{{t('cashOutNo')}}</text>
				<text class="value">{{ rechargeInfo.cash_out_no }}</text>
			</view>
			<view class="line-wrap">
				<text class="label">{{t('serviceMoney')}}</text>
				<text class="value">￥{{ rechargeInfo.service_money }}</text>
			</view>
			<view class="line-wrap">
				<text class="label">{{t('createTime')}}</text>
				<text class="value">{{ rechargeInfo.create_time }}</text>
			</view>
			<view class="line-wrap" v-if="rechargeInfo.status">
				<text class="label">{{t('auditTime')}}</text>
				<text class="value">{{ rechargeInfo.audit_time }}</text>
			</view>
			<view class="line-wrap" v-if="rechargeInfo.transfer_bank">
				<text class="label">{{t('transferBank')}}</text>
				<text class="value">{{ rechargeInfo.transfer_bank }}</text>
			</view>
			<view class="line-wrap">
				<text class="label">{{t('transferAccount')}}</text>
				<text class="value">{{ rechargeInfo.transfer_account }}</text>
			</view>
			<view class="line-wrap" v-if="rechargeInfo.status == -1 && rechargeInfo.refuse_reason">
				<text class="label">{{t('refuseReason')}}</text>
				<text class="value">{{ rechargeInfo.refuse_reason }}</text>
			</view>
			<view class="line-wrap" v-if="rechargeInfo.status == 2">
				<text class="label">{{t('transferTypeName')}}</text>
				<text class="value">{{ rechargeInfo.transfer_type_name }}</text>
			</view>
			<view class="line-wrap" v-if="rechargeInfo.status == 2">
				<text class="label">{{t('transferTime')}}</text>
				<text class="value">{{ rechargeInfo.transfer_time }}</text>
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

let rechargeInfo = ref({});
let loading = ref<boolean>(false);
onLoad((option) => {
	let id = option.id || "";
	getRechargeDetailFn(id)
})

const getRechargeDetailFn = (id) => {
	loading.value = false;

	getRechargeDetail(id).then((res) => {
		rechargeInfo.value = res.data;
		loading.value = true;
	}).catch(() => {
		loading.value = true;
	})
}
</script>

<style lang="scss">
@import '@/styles/member_record_detail.scss';
</style>
