<template>
    <div class="w-full h-full bg-page flex items-center justify-center">
        <div class="flex bg-white">

            <div class="bg-white w-[380px] p-[30px]">
                <div class="flex items-end mb-[30px] mt-[15px]">
                    <div class="mr-[20px] text-base cursor-pointer leading-none font-bold">{{t('mobileBind')}}</div>
                </div>
                <el-form :model="formData" ref="formRef" :rules="formRules" :validate-on-rule-change="false">
                    <div>
                        <el-form-item prop="mobile">
                            <el-input v-model="formData.mobile" :placeholder="t('mobilePlaceholder')" clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="mobile_code">
                            <el-input v-model="formData.mobile_code" :placeholder="t('codePlaceholder')">
                                <template #suffix>
                                    <sms-code :mobile="formData.mobile" type="login" v-model="formData.mobile_key" @click="sendSmsCode" ref="smsCodeRef"></sms-code>
                                </template>
                            </el-input>
                        </el-form-item>
                    </div>

                    <el-form-item>
                        <el-button type="primary" class="mt-[20px] w-full" size="large" @click="handleRegister" :loading="loading">{{ loading ? t('binding') : t('bind') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { bind } from '@/app/api/auth'
import { bindMobile } from '@/app/api/member'
import useMemberStore from '@/stores/member'
import { FormInstance } from 'element-plus'
definePageMeta({
    layout: "container"
});

const memberStore = useMemberStore()
const info = computed(() => memberStore.info)
const loading = ref(false)
const formData = reactive({
    mobile: '',
    mobile_code: '',
    mobile_key: '',
    openid: useCookie('openId').value
})

const formRules = computed(() => {
    return {
        'mobile': [
            {
                type: 'string',
                required: true,
                message: t('mobilePlaceholder'),
                trigger: ['blur', 'change'],
            },
            {
                validator(rule: any, value: string, callback: any) {
                     return test.mobile(value)
                },
                message: t('mobileError'),
                trigger: ['change', 'blur'],
            }
        ],
        'mobile_code': {
            type: 'string',
            required: true,
            message: t('codePlaceholder'),
            trigger: ['blur', 'change']
        }
    }
})

const formRef = ref<FormInstance>()

const handleRegister = async () => {
    await formRef.value?.validate(async (valid, fields) => {
        if (valid) {
            if (loading.value) return
            loading.value = true

            const request = info.value ? bindMobile : bind

            request(formData).then((res: responseResult) => {
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
