<template>
	<view class="member-record-detail" v-show="loading">
		<view class="money-wrap">
			<text>￥{{ rechargeInfo.order_money }}</text>
			<text v-if="rechargeInfo.order_status_info">{{rechargeInfo.order_status_info.name}}</text>
		</view>
		<view class="item">
			<view class="line-wrap" v-if="rechargeInfo.item">
				<text class="label">{{ rechargeInfo.item[0].item_name }}</text>
				<text class="value">￥{{ rechargeInfo.order_money }}</text>
			</view>
			<view class="line-wrap">
				<text class="label">{{t('orderNo')}}</text>
				<text class="value">{{ rechargeInfo.order_no }}</text>
			</view>
			<view class="line-wrap">
				<text class="label">{{t('createTime')}}</text>
				<text class="value">{{ rechargeInfo.create_time }}</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { reactive, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { t } from '@/locale'
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