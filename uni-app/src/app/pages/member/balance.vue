<template>
	<u-loading-page :loading="loading" loadingText=""></u-loading-page>
	<view class="account-info-wrap" v-show="!loading">
		<view class="account-info-head"
			:style="{ background: 'url(' + img('static/resource/images/member/balance_bg.png') + ') no-repeat 95% 30% / auto 250rpx, linear-gradient(314deg, #FE7849 0%, #FF1959 100%)'}">
			<view class="name">{{t('balanceInfo')}}</view>
			<view class="content">
				<view class="money">
					{{ memberStore.info ? moneyFormat((parseFloat(memberStore.info.balance) + parseFloat(memberStore.info.money)).toString()) : '0.00' }}
				</view>
				<view class="text">{{t('accountBalance')}}</view>
				<view class="money-wrap">
					<view class="money-item"
						@click="redirect({ url: '/app/pages/member/detailed_account', param: { type : 'balance' } })">
						<view class="money">
							{{ moneyFormat(memberStore.info?.balance)|| '0.00' }}
						</view>
						<view class="text leading-none">{{ t('balance') }}</view>
					</view>
					<view class="money-item"
						@click="redirect({ url: '/app/pages/member/detailed_account', param: { type : 'money' } })">
						<view class="money">
							{{ moneyFormat(memberStore.info?.money)|| '0.00' }}
						</view>
						<view class="text leading-none">{{ t('money') }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="account-info-btn">
			<u-button type="primary" shape="circle" class="btn"
				:customStyle="{backgroundColor: '#FE4E50',color: '#fff', borderColor: '#FE4E50',width: 'calc(100vw - 64rpx)'}"
				@click="topUpFn">
				<img class="max-w-[36rpx] max-h-[36rpx] mr-1" :src="img('static/resource/images/member/reset.png')"
					alt="">
				<text>{{t('recharge')}}</text>
			</u-button>
			<u-button v-if="cashOutConfigObj.is_open == 1" type="primary" :plain="true" shape="circle" class="btn"
				:customStyle="{backgroundColor: '#fff',color: '#FE4E50', borderColor: '#FE4E50',width: 'calc(100vw - 64rpx)'}"
				@click="applyCashOut">
				<img class="max-w-[36rpx] max-h-[36rpx] mr-1"
					:src="img('static/resource/images/member/withdraw_deposit.png')" alt="">
				<text>{{t('cashOut')}}</text>
			</u-button>
		</view>

		<!-- 充值 -->
		<u-popup :show="topUpShow" mode="center" :round="10" @close="closePopup" :closeable="true">
			<view class="w-80 px-3 pb-4 pt-7 box-border">
				<u--input :placeholder="t('rechargeAmountPlaceholder')" v-model="rechargeAmount" border="bottom"
					type="number" clearable>
				</u--input>
				<view class="top-up-wrap flex flex-wrap justify-around mt-3">
					<view v-for="(item,index) in rechargePackage" :key="index"
						:class="['top-up-item w-22 box-border border-1 text-center rounded mt-2 py-3 px-4 border-gray-400 border-solid',{'border-primary text-primary':rechargeAmount == item}]"
						@click="rechargeAmount = item">
						<text>{{item}}{{t('yuan')}}</text>
					</view>
				</view>
				<view class="mt-5 px-2">
					<u-button type="primary" shape="circle" :loading="rechargeLoading" :text="t('clickRecharge')"
						@click="recharge"></u-button>
				</view>
				<view class="mt-[20rpx] text-center text-sm"
					@click="redirect({ url: '/app/pages/member/recharge_record' })">{{t('rechargeRecord')}}</view>
			</view>
		</u-popup>

		<pay ref="payRef" @close="rechargeLoading = false"></pay>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue'
	import { t } from '@/locale'
	import { moneyFormat, redirect, img } from '@/utils/common';
	import { createRecharge, cashOutConfig } from '@/app/api/member';
	import { onShow } from '@dcloudio/uni-app';
	import useMemberStore from '@/stores/member'

	const memberStore = useMemberStore(),
		topUpShow = ref<boolean>(false);

	const topUpFn = () => {
		topUpShow.value = true;
	}

	const closePopup = () => {
		topUpShow.value = false;
	}

	const rechargePackage = ref([20, 30, 50, 100, 200, 300])

	const rechargeAmount = ref<string | number>("");
	const rechargeLoading = ref(false)

	const payRef = ref(null)

	const cashOutConfigObj = reactive({
		is_auto_transfer: 0, // 是否自动转账
		is_auto_verify: 0, // 是否自动审核
		is_open: 0, // 是否启用提现
		min: 0, // 最低提现金额
		rate: 0, // 手续费比率
		transfer_type: [] // 提现方式
	})

	const loading = ref(true);

	onShow(() => {
		// h5端检测是否是支付后返回 支付组件必须调用
		// #ifdef H5
		uni.$emit('checkIsReturnAfterPayment')
		// #endif

		cashOutConfig().then((res) => {
			for (let key in res.data) {
				cashOutConfigObj[key] = res.data[key];
			}
			loading.value = false;
		})
	})

	/**
	 * 发起充值
	 */
	const recharge = () => {
		if (uni.$u.test.isEmpty(rechargeAmount.value)) {
			uni.showToast({ title: t('rechargeAmountPlaceholder'), icon: 'none' })
			return
		}
		if (!uni.$u.test.amount(rechargeAmount.value) || rechargeAmount.value <= 0) {
			uni.showToast({ title: t('rechargeAmountError'), icon: 'none' })
			return
		}
		if (rechargeLoading.value) return
		rechargeLoading.value = true

		createRecharge({ recharge_money: rechargeAmount.value }).then(res => {
			payRef.value?.open(res.data.trade_type, res.data.trade_id)
		}).catch(() => {
			rechargeLoading.value = false
		})
	}

	const applyCashOut = () => {
		uni.setStorageSync('cashOutAccountType', 'money')
		redirect({ url: '/app/pages/member/apply_cash_out' })
	}
</script>

<style lang="scss" scoped>
	@import '@/styles/account_info.scss';
</style>
