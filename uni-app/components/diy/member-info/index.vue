<template>
    <view>
        <!-- #ifdef MP-WEIXIN -->
        <u-navbar :placeholder="true" bgColor="var(--primary-color)" titleStyle="color: #fff">
            <template #left>
            </template>
        </u-navbar>
        <!-- #endif -->
        <view class="bg-primary" v-if="info">
            <view class="flex p-[30rpx]">
                <u-avatar :src="img(info.headimg)" size="60" leftIcon="none" @click="clickAvatar"></u-avatar>
                <view class="flex-1 w-0 mx-[20rpx] flex justify-center flex-col">
                    <view class="text-white font-bold text-lg">{{ info.nickname }}</view>
                    <view></view>
                </view>
                <view class="flex items-center">
                    <app-link url="/pages/setting/index">
                        <text class="iconfont iconshezhi text-white text-lg ml-[10rpx]"></text>
                    </app-link>
                </view>
            </view>

            <view class="flex m-[30rpx] mb-0 py-[30rpx] bg-white rounded-lg rounded-b-none">
                <view class="flex-1 text-center">
                    <view class="font-bold">
                        <app-link url="/pages/member/point">{{ parseInt(info.point) }}</app-link>
                    </view>
                    <view class="text-sm mt-[10rpx]">
                        <app-link url="/pages/member/point">{{ t('point') }}</app-link>
                    </view>
                </view>
                <view class="flex-1 text-center">
                    <view class="font-bold">
                        <app-link url="/pages/member/balance">{{ moneyFormat(info.balance) }}</app-link>
                    </view>
                    <view class="text-sm mt-[10rpx]">
                        <app-link url="/pages/member/balance">{{ t('balance') }}</app-link>
                    </view>
                </view>
            </view>

            <!-- #ifdef MP-WEIXIN -->
            <information-filling ref="infoFill"></information-filling>
            <!-- #endif -->
        </view>
        <view v-else class="flex p-[30rpx] bg-primary" @click="toLogin">
            <u-avatar src="" size="60"></u-avatar>
            <view class="flex-1 w-0 mx-[20rpx] flex justify-center flex-col">
                <view class="text-white font-bold text-lg">{{ t('login') }}/{{ t('register') }}</view>
            </view>
        </view>
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

<style>
</style>