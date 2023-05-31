<template>
    <view class="w-screen h-screen flex flex-col">
        <view class="flex-1">
            <!-- #ifdef H5 -->
            <view class="h-[100rpx]"></view>
            <!-- #endif -->
            <view class="px-[60rpx] pt-[100rpx] mb-[100rpx]">
                <view class="font-bold text-xl">{{ t('login') }}</view>
            </view>
            <view class="px-[60rpx] text-sm flex mb-[50rpx] font-bold leading-none" v-if="loginType.length > 1">
                <block v-for="(item, index) in loginType">
                    <view :class="{'text-gray-300' : item.type != type}" @click="type = item.type">{{ item.title }}
                    </view>
                    <view class="mx-[30rpx] border-solid border-0 border-r-[2px] border-gray-300" v-show="index == 0">
                    </view>
                </block>
            </view>
            <view class="px-[60rpx]">
                <u-form labelPosition="left" :model="formData" errorType='toast' :rules="rules" ref="formRef">
                    <view v-show="type == 'username'">
                        <u-form-item label="" prop="username" :border-bottom="true">
                            <u-input v-model="formData.username" border="none" clearable
                                :placeholder="t('usernamePlaceholder')"></u-input>
                        </u-form-item>
                        <view class="mt-[40rpx]">
                            <u-form-item label="" prop="password" :border-bottom="true">
                                <u-input v-model="formData.password" border="none" type="password" clearable
                                    :placeholder="t('passwordPlaceholder')"></u-input>
                            </u-form-item>
                        </view>
                    </view>
                    <view v-show="type == 'mobile'">
                        <u-form-item label="" prop="mobile" :border-bottom="true">
                            <u-input v-model="formData.mobile" border="none" clearable
                                :placeholder="t('mobilePlaceholder')"></u-input>
                        </u-form-item>
                        <view class="mt-[40rpx]">
                            <u-form-item label="" prop="mobile_code" :border-bottom="true">
                                <u-input v-model="formData.mobile_code" border="none" type="password" clearable
                                    :placeholder="t('codePlaceholder')">
                                    <template #suffix>
                                        <sms-code :mobile="formData.mobile" type="login"
                                            v-model="formData.mobile_key"></sms-code>
                                    </template>
                                </u-input>
                            </u-form-item>
                        </view>
                    </view>
                    <view class="flex text-xs justify-between mt-[20rpx] text-gray-400">
                        <app-link url="/pages/auth/register">{{ t('noAccount') }}
                            <text class="text-primary">{{ t('toRegister') }}</text>
                        </app-link>
                        <app-link url="/pages/auth/resetpwd">{{ t('resetpwd') }}</app-link>
                    </view>
                    <view class="mt-[80rpx]">
                        <u-button type="primary" :loading="loading" :loadingText="t('logining')" @click="handleLogin">
                            {{ t('login') }}
                        </u-button>
                    </view>
                </u-form>
            </view>
        </view>
        <view class="text-xs py-[50rpx] flex justify-center w-full" v-if="configStore.login.agreement_show">
            {{ t('agreeTips') }}
            <app-link url="/pages/auth/agreement?key=service">
                <text class="text-primary">{{ t('userAgreement') }}</text>
            </app-link>
            {{ t('and') }}
            <app-link url="/pages/auth/agreement?key=privacy">
                <text class="text-primary">{{ t('privacyAgreement') }}</text>
            </app-link>
        </view>
    </view>
</template>

<script setup lang="ts">
    import { ref, reactive, computed } from 'vue'
    import { usernameLogin, mobileLogin } from '@/api/auth'
    import useMemberStore from '@/stores/member'
    import useConfigStore from '@/stores/config'
    import { useLogin } from '@/hooks/useLogin'
    import { t } from '@/locale'

    const formData = reactive({
        username: '',
        password: '',
        mobile: '',
        mobile_code: '',
        mobile_key: ''
    })
    uni.getStorageSync('openid') && (Object.assign(formData, { openid: uni.getStorageSync('openid') }))

    const memberStore = useMemberStore()
    const configStore = useConfigStore()

    const loading = ref(false)

    const type = ref('')

    const loginType = computed(() => {
        const value = []
        configStore.login.is_username && (value.push({ type: 'username', title: t('usernameLogin') }))
        configStore.login.is_mobile && (value.push({ type: 'mobile', title: t('mobileLogin') }))
        type.value = value[0] ? value[0].type : ''
        return value
    })

    const rules = computed(() => {
        return {
            'username': {
                type: 'string',
                required: type.value == 'username',
                message: t('usernamePlaceholder'),
                trigger: ['blur', 'change'],
            },
            'password': {
                type: 'string',
                required: type.value == 'username',
                message: t('passwordPlaceholder'),
                trigger: ['blur', 'change']
            },
            'mobile': [
                {
                    type: 'string',
                    required: type.value == 'mobile',
                    message: t('mobilePlaceholder'),
                    trigger: ['blur', 'change'],
                },
                {
                    validator(rule, value) {
                        if (type.value != 'mobile') return true
                        else return uni.$u.test.mobile(value)
                    },
                    message: t('mobileError'),
                    trigger: ['change', 'blur'],
                }
            ],
            'mobile_code': {
                type: 'string',
                required: type.value == 'mobile',
                message: t('codePlaceholder'),
                trigger: ['blur', 'change']
            }
        }
    })

    const formRef = ref(null)

    const handleLogin = () => {
        formRef.value.validate().then(() => {
            if (loading.value) return
            loading.value = true

            const login = type.value == 'username' ? usernameLogin : mobileLogin

            login(formData).then((res) => {
                memberStore.setToken(res.data.token)
                useLogin().handleLoginBack()
            }).catch(() => {
                loading.value = false
            })
        })
    }
</script>

<style lang="scss" scoped></style>