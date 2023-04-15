<template>
    <view v-if="agreement" class="p-[30rpx]">
        <u-parse :content="agreement.content"></u-parse>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAgreementInfo } from '@/api/system'

const agreement = ref(null)

onLoad((option)=> {
    getAgreementInfo(option.key).then((res: AnyObject) => {
        agreement.value = res.data
        uni.setNavigationBarTitle({
            title: res.data.title
        })
    })
})
</script>

<style lang="scss">
</style>