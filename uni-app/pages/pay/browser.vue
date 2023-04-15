<template>
    <view class="w-screen h-screen bg-[#424040] text-right">
        <image :src="img('static/resource/images/pay/invite_friends_share.png')" mode="heightFix"
            class="pt-[30rpx] pr-[30rpx] h-[200rpx]"></image>
        <view class="text-white font-bold pt-[30rpx] pr-[30rpx]">点击右上角跳转到浏览器打开</view>
    </view>
</template>

<script setup lang="ts">
    import { img, isWeixinBrowser } from '@/utils/common'
    import { onLoad } from '@dcloudio/uni-app'

    onLoad((data : AnyObject) => {
        if (!isWeixinBrowser() && data.alipay) {
            uni.setStorageSync('paymenting', data.code)
            location.href = decodeURIComponent(data.alipay)
        }
    })
</script>

<style lang="scss" scoped></style>