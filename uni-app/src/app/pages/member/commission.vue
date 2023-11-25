<template>
	<view class="account-info-wrap">

		<view class="account-info-head"
			:style="{ background: 'url(' + img('static/resource/images/member/balance_bg.png') + ') no-repeat 95% 30% / auto 250rpx, linear-gradient(314deg, #FE7849 0%, #FF1959 100%)'}">
			<view class="name">{{t('commissionInfo')}}</view>
			<view class="content">
				<view class="money" @click="redirect({ url: '/app/pages/member/detailed_account', param: { type : 'commission' } })">
					{{ memberStore.info ? moneyFormat(memberStore.info.commission) : 0.00 }}
				</view>
				<view class="text" @click="redirect({ url: '/app/pages/member/detailed_account', param: { type : 'commission' } })">{{t('accountCommission')}}</view>
				<view class="money-wrap">
					<view class="money-item">
						<view class="money">
							{{ moneyFormat(memberStore.info?.commission_get)|| '0.00' }}
						</view>
						<view class="text">{{ t('commission') }}</view>
					</view>
					<view class="money-item">
						<view class="money">
							{{ moneyFormat(memberStore.info?.commission_cash_outing)|| '0.00' }}
						</view>
						<view class="text">{{ t('money') }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="account-info-btn">
			<u-button type="primary" :plain="true" shape="circle" class="btn"
				:customStyle="{backgroundColor: '#fff',color: '#FE4E50', borderColor: '#FE4E50',width: 'calc(100vw - 64rpx)'}"
				@click="applyCashOut">
					<img class="max-w-[36rpx] max-h-[36rpx] mr-1" :src="img('static/resource/images/member/withdraw_deposit.png')" alt="">
					<text>{{t('cashOut')}}</text>
			</u-button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { t } from '@/locale'
	import { moneyFormat, redirect, img } from '@/utils/common';
	import useMemberStore from '@/stores/member'
	const memberStore = useMemberStore();
	const applyCashOut = ()=> {
	    uni.setStorageSync('cashOutAccountType', 'commission')
	    redirect({ url: '/app/pages/member/apply_cash_out' })
	}
</script>

<style lang="scss">
	@import '@/styles/account_info.scss';
</style>
