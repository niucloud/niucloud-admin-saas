<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar :placeholder="true" bgColor="var(--primary-color)" titleStyle="color: #fff">
			<template #left>
			</template>
		</u-navbar>
		<!-- #endif -->
		<view class="pt-[34rpx] member-info">
			<view v-if="info" class="flex ml-[32rpx] mr-[52rpx]  items-center relative">
				<!-- clickAvatar 唤起获取微信 -->
				<u-avatar :src="img(info.headimg)" size="60" leftIcon="none" @click="clickAvatar"></u-avatar>
				<view class="ml-[22rpx]">
					<view class="text-[#222222] truncate w-[430rpx] font-bold text-lg">{{ info.nickname }}</view>
					<view class="text-[#696B70] text-[24rpx] mt-[10rpx]">{{ t('memberLanguage') }}</view>
				</view>
				<view class="set-icon flex items-center absolute right-0 top-2">
					<app-link url="/pages/setting/index">
						<text class="iconfont iconshezhi text-[#000] text-[1.6rem] ml-[10rpx]"></text>
					</app-link>
				</view>
			</view>
			<view v-else class="flex ml-[32rpx] mr-[52rpx]  items-center relative" @click="toLogin">
				<u-avatar src="" size="60"></u-avatar>
				<view class="ml-[22rpx]">
					<view class="text-[#222222] font-bold text-lg">{{ t('login') }}/{{ t('register') }}</view>
					<view class="text-[#696B70] text-[24rpx] mt-[10rpx]">{{ t('memberLanguage') }}</view>
				</view>
				<view class="set-icon flex items-center absolute right-0 top-2">
					<app-link url="/pages/setting/index">
						<text class="iconfont iconshezhi text-[#000] text-[1.6rem] ml-[10rpx]"></text>
					</app-link>
				</view>
			</view>

			<view class="flex m-[30rpx] mb-0 py-[30rpx] ">
				<view class="flex-1 text-center">
					<view class="font-bold">
						<app-link :url="(info ? '/pages/member/point' : '')">{{ parseInt(info?.point) || 0 }}</app-link>
					</view>
					<view class="text-sm mt-[10rpx]">
						<app-link :url="(info ? '/pages/member/point' : '')">{{ t('point') }}</app-link>
					</view>
				</view>
				<view class="flex-1 text-center">
					<view class="font-bold">
						<app-link :url="(info ? '/pages/member/balance' : '')">{{ money }}</app-link>
					</view>
					<view class="text-sm mt-[10rpx]">
						<app-link :url="(info ? '/pages/member/balance' : '')">{{ t('balance') }}</app-link>
					</view>
				</view>
			</view>
		</view>
		<view class="m-[32rpx] flex justify-between p-[32rpx] bg-white rounded-[20rpx]">
			<app-link url="/pages/member/personal">
				<view>
					<view class="w-[60rpx] h-[60rpx] mx-auto">
						<image class="w-[60rpx]" :src="img('static/resource/images/diy/m_info.jpg')" mode="widthFix" />
					</view>
					<view class="text-[24rpx] text-[#333] mt-[18rpx] text-center">{{ t('memberCenter') }}</view>
				</view>
			</app-link>
			<app-link url="/pages/member/balance">
				<view>
					<view class="w-[60rpx] h-[60rpx] mx-auto">
						<image class="w-[60rpx]" :src="img('static/resource/images/diy/m_balance.jpg')"
							mode="widthFix" />
					</view>
					<view class="text-[24rpx] text-[#333] mt-[18rpx] text-center">{{ t('myBalance') }}</view>
				</view>
			</app-link>
			<app-link url="/pages/member/point">
				<view>
					<view class="w-[60rpx] h-[60rpx] mx-auto">
						<image class="w-[60rpx]" :src="img('static/resource/images/diy/m_point.jpg')" mode="widthFix" />
					</view>
					<view class="text-[24rpx] text-[#333] mt-[18rpx] text-center">{{ t('myPoint') }}</view>
				</view>
			</app-link>
			<app-link>
				<view @click="servicePopup = true">
					<view class="w-[60rpx] h-[60rpx] mx-auto">
						<image class="w-[60rpx]" :src="img('static/resource/images/diy/m_service.jpg')"
							mode="widthFix" />
					</view>
					<view class="text-[24rpx] text-[#333] mt-[18rpx] text-center">{{ t('customerService') }}</view>
				</view>
			</app-link>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<information-filling ref="infoFill"></information-filling>
		<!-- #endif -->
	</view>
</template>

<script lang="ts" setup>
	import { computed, ref } from 'vue'
	import useMemberStore from '@/stores/member'
	import { useLogin } from '@/hooks/useLogin'
	import { img, isWeixinBrowser, redirect, urlDeconstruction, moneyFormat } from '@/utils/common'
	import { t } from '@/locale'
	import { wechatSync } from '@/api/system'
	import useDiyStore from '@/stores/diy'

	const props = defineProps(['component', 'index']);

	const diyStore = useDiyStore();

	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})

	const memberStore = useMemberStore()

	const { query } = urlDeconstruction(location.href)
	if (query.code && isWeixinBrowser()) {
		wechatSync({ code: query.code }).then(res => {
			memberStore.getMemberInfo()
		})
	}

	const info = computed(() => {
		// 装修模式
		if (diyStore.mode == 'decorate') {
			return {
				headimg: '',
				nickname: '昵称',
				balance: 0,
				point: 0
			}
		} else {
			return memberStore.info;
		}
	})

	const money = computed(() => {
		if (info.value) {
			let m = parseFloat(info.value.balance) + parseFloat(info.value.money)
			return moneyFormat(m.toString());
		} else {
			return 0;
		}
	})

	const toLogin = () => {
		useLogin().setLoginBack({ url: '/pages/member/index' })
	}

	const infoFill = ref(false)
	const clickAvatar = () => {
		// #ifdef MP-WEIXIN
		infoFill.value.show = true
		// #endif

		// #ifdef H5
		if (isWeixinBrowser()) {
			useLogin().getAuthCode('snsapi_userinfo')
		} else {
			redirect({ url: '/pages/member/personal' })
		}
		// #endif
	}
</script>

<style lang="scss" scoped>
	.member-info {
		background-image: linear-gradient(#E3F0FF, #F5F6F8)
	}
</style>