<template>
    <u-popup :show="show" :round="10" @close="handleClose" :closeable="true" bgColor="#fff"
        :closeOnClickOverlay="false">
        <view class="flex flex-col h-[75vh]" v-if="payInfo">
            <view class="head">
                <view class="text-center py-[26rpx]">{{ t('pay.payTitle') }}</view>
                <view class="flex items-end justify-center w-full text-xl font-bold py-[20rpx]">
                    <view class="text-base mr-[4rpx]">{{ t('currency') }}</view>
                    {{ moneyFormat(payInfo.money) }}
                </view>
            </view>
            <scroll-view scroll-y="true" class="flex-1 pt-[20rpx]">
                <view class="flex text-sm px-[30rpx] py-[20rpx]">
                    <view class="text-gray-500">{{ t('pay.orderInfo') }}</view>
                    <view class="text-right flex-1 pl-[30rpx] truncate">{{ payInfo.body }}</view>
                </view>
                <view class="mx-[30rpx] py-[10rpx] px-[30rpx] bg-white rounded-md bg-page">
                    <view
                        class="pay-item py-[18rpx] flex items-center border-0 border-b border-solid border-[#eee]"
                        v-for="(item, index) in payInfo.pay_type_list"
                        :key="index" @click="type = item.key">
                        <u-image :src="img(item.icon)" width="50rpx" height="50rpx"></u-image>
                        <view class="flex-1 px-[20rpx] text-sm font-bold">{{ item.name }}</view>
                        <u-icon name="checkbox-mark" color="var(--primary-color)" v-if="item.key == type"></u-icon>
                    </view>
                </view>
            </scroll-view>
            <view class="p-[30rpx]">
                <u-button type="primary" :loading="loading" :text="t('pay.confirmPay')" shape="circle"
                    @click="confirmPay"></u-button>
            </view>
        </view>
    </u-popup>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { t } from '@/locale'
    import { getPayInfo, pay } from '@/api/pay'
    import { img, redirect, isWeixinBrowser, moneyFormat } from '@/utils/common'
    import wechat from '@/utils/wechat'

    const show = ref(false)
    const loading = ref(false)

    const payInfo = ref<AnyObject | null>(null)
    const type = ref('')

    /**
     * 确认支付
     */
    const confirmPay = () => {
        if (uni.$u.test.isEmpty(type.value)) {
            uni.showToast({ title: t('pay.notHavePayType'), icon: 'none' })
            return
        }
        if (loading.value) return
        loading.value = true

        pay({
            out_trade_no: payInfo.value?.out_trade_no,
            type: type.value
        }).then(res => {
            switch (type.value) {
                case 'wechatpay':
                    // #ifndef H5
                    uni.requestPayment({
                        provider: 'wxpay',
                        ...res.data,
                        success: (res) => {
                            redirect({ url: '/pages/pay/result', param: { code: payInfo.value?.out_trade_no }, mode: 'redirectTo' })
                        },
                        fail: (res) => {
                            loading.value = false
                        }
                    })
                    // #endif
                    // #ifdef H5
                    if (isWeixinBrowser()) {
                        res.data.timestamp = res.data.timeStamp
                        delete res.data.timeStamp
                        wechat.pay({
                            ...res.data,
                            success: () => {
                                redirect({ url: '/pages/pay/result', param: { code: payInfo.value?.out_trade_no }, mode: 'redirectTo' })
                            },
                            cancel: () => {
                                loading.value = false
                            }
                        })
                    } else {
                        uni.setStorageSync('paymenting', payInfo.value?.out_trade_no)
                        location.href = res.data.h5_url
                        addListenerPayBack()
                    }
                    // #endif
                    break;
                case 'alipay':
                    // #ifdef H5
                    if (isWeixinBrowser()) {
                        redirect({ url: '/pages/pay/browser', param: { code: payInfo.value?.out_trade_no, alipay: encodeURIComponent(res.data.url) }, mode: 'redirectTo' })
                    } else {
                        uni.setStorageSync('paymenting', payInfo.value?.out_trade_no)
                        location.href = res.data.url
                        addListenerPayBack()
                    }
                    // #endif
                    break;
                default:
                    redirect({ url: '/pages/pay/result', param: { code: payInfo.value?.out_trade_no }, mode: 'redirectTo' })
            }
        }).catch(() => {
            loading.value = false
        })
    }

    /**
     * 检测是否是支付后返回
     */
    uni.$on('checkIsReturnAfterPayment', () => {
        if (uni.getStorageSync('paymenting')) {
            redirect({
                url: '/pages/pay/result',
                param: { code: uni.getStorageSync('paymenting') },
                mode: 'redirectTo',
                success() {
                    uni.removeStorageSync('paymenting')
                }
            })
        }
    })

    const open = (outTradeNo : string) => {
        getPayInfo(outTradeNo)
            .then((res : any) => {
                let { data } = res
                if (uni.$u.test.isEmpty(data)) {
                    uni.showToast({ title: t('pay.notObtainedInfo'), icon: 'none' })
                    return
                }
                if (data.money == 0) {
                    redirect({ url: '/pages/pay/result', param: { code: outTradeNo }, mode: 'redirectTo' })
                    return
                }
                if (data.status != 0) {
                    uni.showToast({ title: t('pay.paymentDocuments') + data.status_name, icon: 'none' })
                    return
                }
                payInfo.value = data
                type.value = data.pay_type_list[0] ? data.pay_type_list[0].key : ''
                show.value = true
            })
            .catch(() => { })
    }

    const emits = defineEmits(['close'])

    const handleClose = () => {
        uni.removeStorageSync('paymenting')
        show.value = false
        emits('close')
    }

    defineExpose({
        open
    })
</script>

<style lang="scss" scoped>
    .pay-item:last-child {
        border: none;
    }
</style>