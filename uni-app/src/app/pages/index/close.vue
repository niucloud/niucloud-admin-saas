<template>
    <view class="w-screen h-screen flex flex-col items-center justify-center">
        <u-empty
            :icon="img('static/resource/images/site/close.png')"
            :text="t('siteClose')"
        >
        </u-empty>
    </view>
</template>

<script setup lang="ts">
import { img } from '@/utils/common'
import { t } from '@/locale'
</script>

<style lang="scss" scoped></style>