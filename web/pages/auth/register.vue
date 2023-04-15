<template>
    <div class="w-full h-full bg-page flex items-center justify-center">
        <div class="flex bg-white">
            <div class="flex flex-col items-center w-[330px] py-[100px] border-r">
                <div class="title font-bold text-xl">打开手机微信</div>
                <div class="tips text-sm mt-[5px]">点击右上角打开扫一扫</div>
                <div class="qrcode mt-[30px] border leading-none">
                    <el-image
                        :src="img('https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHU7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAySlJSbU1Sb0hiMlQxOEcwSGhBY1AAAgTSfStkAwRYAgAA')"
                        class="w-[120px]"></el-image>
                </div>
            </div>

            <div class="bg-white w-[380px] p-[30px]">
                <div class="flex items-end my-[30px]">
                    <div class="mr-[20px] text-base cursor-pointer leading-none" :class="{ 'font-bold': type == item.type }"
                        v-for="item in registerType" @click="type = item.type">{{
                            item.title }}
                    </div>
                </div>
                <el-form :model="formData" ref="formRef" :rules="formRules" :validate-on-rule-change="false">
                    <div v-show="type == 'username'">
                        <el-form-item prop="username">
                            <el-input v-model="formData.username" :placeholder="t('usernamePlaceholder')" clearable
                                :inline-message="true">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="formData.password" :placeholder="t('passwordPlaceholder')" type="password"
                                clearable :show-password="true">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="confirm_password">
                            <el-input v-model="formData.confirm_password" :placeholder="t('confirmPasswordPlaceholder')"
                                type="password" clearable :show-password="true">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div v-show="type == 'mobile' || configStore.login.is_bind_mobile">
                        <el-form-item prop="mobile">
                            <el-input v-model="formData.mobile" :placeholder="t('mobilePlaceholder')" clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="mobile_code">
                            <el-input v-model="formData.mobile_code" :placeholder="t('codePlaceholder')">
                                <template #suffix>
                                    <sms-code :mobile="formData.mobile" type="login" v-model="formData.mobile_key"
                                        @click="sendSmsCode" ref="smsCodeRef"></sms-code>
                                </template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div v-show="type == 'username'">
                        <el-form-item prop="captcha_code">
                            <el-input v-model="formData.captcha_code" :placeholder="t('captchaPlaceholder')">
                                <template #suffix>
                                    <div class="py-0 leading-none">
                                        <el-image :src="captcha.image.value" class="h-[30px] cursor-pointer"
                                            @click="captcha.refresh()"></el-image>
                                    </div>
                                </template>
                            </el-input>
                        </el-form-item>
                    </div>

                    <div class="flex justify-end leading-none">
                        <NuxtLink to="/auth/login">
                            <el-button type="primary" link>{{ t('haveAccount') }}，{{ t('toLogin') }}</el-button>
                        </NuxtLink>
                    </div>

                    <el-form-item>
                        <el-button type="primary" class="mt-[20px] w-full" size="large" @click="handleRegister"
                            :loading="loading">{{ loading ? t('registering') : t('register') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { usernameRegister, mobileRegister } from '@/api/auth'
import useMemberStore from '@/stores/member'
import useConfigStore from '@/stores/config'
import { FormInstance } from 'element-plus'

definePageMeta({
    layout: "container"
});

const memberStore = useMemberStore()

const configStore = useConfigStore()
configStore.getLoginConfig()

const type = ref('')
const registerType = computed(() => {
    const value = []
    configStore.login.is_username && (value.push({ type: 'username', title: t('usernameRegister') }))
    configStore.login.is_mobile && !configStore.login.is_bind_mobile && (value.push({ type: 'mobile', title: t('mobileRegister') }))
    type.value = value[0] ? value[0].type : ''
    return value
})

const loading = ref(false)

const formData = reactive({
    username: '',
    password: '',
    confirm_password: '',
    mobile: '',
    mobile_code: '',
    mobile_key: '',
    captcha_key: '',
    captcha_code: ''
})

const formRules = computed(() => {
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
        'confirm_password': [
            {
                type: 'string',
                required: type.value == 'username',
                message: t('confirmPasswordPlaceholder'),
                trigger: ['blur', 'change']
            },
            {
                validator(rule: any, value: string, callback: any) {
                    return value == formData.password
                },
                message: t('confirmPasswordError'),
                trigger: ['change', 'blur'],
            }
        ],
        'mobile': [
            {
                type: 'string',
                required: type.value == 'mobile' || configStore.login.is_bind_mobile,
                message: t('mobilePlaceholder'),
                trigger: ['blur', 'change'],
            },
            {
                validator(rule: any, value: string, callback: any) {
                    if (type.value != 'mobile' && !configStore.login.is_bind_mobile) return true
                    else return test.mobile(value)
                },
                message: t('mobileError'),
                trigger: ['change', 'blur'],
            }
        ],
        'mobile_code': {
            type: 'string',
            required: type.value == 'mobile' || configStore.login.is_bind_mobile,
            message: t('codePlaceholder'),
            trigger: ['blur', 'change']
        },
        'captcha_code': {
            type: 'string',
            required: type.value == 'username',
            message: t('captchaPlaceholder'),
            trigger: ['blur', 'change'],
        }
    }
})

const formRef = ref<FormInstance>()

const handleRegister = async () => {
    await formRef.value?.validate(async (valid, fields) => {
        if (valid) {
            if (loading.value) return
            loading.value = true

            const register = type.value == 'username' ? usernameRegister : mobileRegister

            register(formData).then((res: responseResult) => {
                memberStore.setToken(res.data.token)
                useLogin().handleLoginBack()
            }).catch(() => {
                loading.value = false
                captcha.refresh()
            })
        }
    })
}

// 验证码
const captcha = useCaptcha(formData)
captcha.refresh()

// 获取手机验证码
const smsCodeRef = ref<AnyObject | null>(null)
const sendSmsCode = async () => {
    await formRef.value?.validateField('mobile', async (valid, fields) => {
        if (valid) {
            smsCodeRef.value?.send()
        }
    })
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
    .el-input__wrapper {
        box-shadow: unset !important;
        border-radius: 0;
        border-bottom: 1px solid var(--el-input-border-color);
        padding: 8px 0;

        &.is-focus {
            border-bottom: 1px solid var(--el-input-focus-border-color);
        }
    }

    &.is-error {
        .el-input__wrapper {
            border-bottom: 1px solid var(--el-color-danger);
        }
    }
}

:deep(.el-form-item__error) {
    padding-top: 5px;
}
</style>