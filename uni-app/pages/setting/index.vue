<template>
    <view class="w-full h-screen bg-page">
        <view class="h-[30rpx]"></view>
        <view class="m-[30rpx] bg-white rounded-md overflow-hidden px-[20rpx] py-[10rpx]">
            <u-cell-group :border="false">
                <u-cell :title="t('personalSettings')" :is-link="true" url="/pages/member/personal"></u-cell>
                <u-cell :title="t('switchLang')" :is-link="true" :value="lang" @click="langSheetShow = true"></u-cell>
                <u-cell :title="t('version')" :value="version"></u-cell>
            </u-cell-group>
        </view>
        <view class="m-[30rpx] bg-white rounded-md overflow-hidden px-[20rpx] py-[10rpx]">
            <u-cell-group :border="false">
                <u-cell :title="t('userAgreement')" :is-link="true" url="/pages/auth/agreement?key=service"></u-cell>
                <u-cell :title="t('privacyAgreement')" :is-link="true" url="/pages/auth/agreement?key=privacy"></u-cell>
            </u-cell-group>
        </view>
        <!-- #ifdef H5 -->
        <view class="m-[30rpx] bg-white rounded-md overflow-hidden px-[20rpx]" v-if="!isWeixinBrowser()">
            <u-cell-group :border="false">
                <u-cell :title="t('logout')" class="text-center" @click="memberStore.logout(true)"></u-cell>
            </u-cell-group>
        </view>
        <!-- #endif -->

        <u-action-sheet :actions="langList" :show="langSheetShow" :closeOnClickOverlay="true"
            :safeAreaInsetBottom="true"
            @close="langSheetShow = false" @select="switchLang"></u-action-sheet>
    </view>
</template>

<script setup lang="ts">
    import { ref, reactive, computed } from 'vue'
    import useMemberStore from '@/stores/member'
    import { t, language } from '@/locale'
    import { currRoute, isWeixinBrowser } from '@/utils/common'

    const memberStore = useMemberStore()

    const version = ref(import.meta.env.VITE_APP_VERSION)

    /**
     * 支持的语言列表
     */
    const langList = reactive({
        'zh-Hans': { name: '简体中文', fontSize: '14', value: 'zh-Hans' },
        'en': { name: 'English', fontSize: '14', value: 'en' }
    })
    const langSheetShow = ref(false)

    // 当前语言
    const lang = computed(() => {
        const lang = uni.getLocale()
        return langList[lang].name
    })

    /**
     * 切换语言
     */
    const switchLang = (lang) => {
        language.loadLocaleMessages('/' + currRoute(), lang.value)
    }
</script>

<style lang="scss" scoped>
    page {
        background: var(--page-bg-color);
    }

    :deep(.u-cell-group__wrapper) {
        .u-cell__body {
            padding-left: 0;
            padding-right: 0;
        }

        .u-cell {
            &:last-child .u-line {
                display: none;
            }
        }
    }
</style>