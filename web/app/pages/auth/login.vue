<template>
    <div class="w-full h-full bg-page flex items-center justify-center">
        <div class="flex bg-white">
            <div class="flex flex-col items-center w-[330px] py-[100px] border-r">
                <div class="title font-bold text-xl">打开手机微信</div>
                <div class="tips text-sm mt-[5px]">点击右上角打开扫一扫</div>
                <div class="qrcode p-[10px] mt-[30px] border h-[120px] leading-none box-content">
                    <div class="relative">
                        <el-image :src="weixinCode.url" class="w-[120px]" />
                        <div class="flex flex-col justify-center items-center absolute inset-0 bg-gray-50" v-if="weixinCode.pastDue">
                            <span class="text-xs text-gray-600">{{ weixinCode.pastDueContent }}</span>
                            <span @click="scanLoginFn()" class="text-xs cursor-pointer text-color mt-2">点击刷新</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white w-[380px] p-[30px]">
                <div class="flex items-end my-[30px]">
                    <div class="mr-[20px] text-base cursor-pointer leading-none" :class="{ 'font-bold': type == item.type }" v-for="item in loginType" @click="type = item.type">{{item.title }}</div>
                </div>
                <el-form :model="formData" ref="formRef" :rules="formRules" :validate-on-rule-change="false">
                    <div v-show="type == 'username'">
                        <el-form-item prop="username">
                            <el-input v-model="formData.username" :placeholder="t('usernamePlaceholder')" clearable :inline-message="true">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="formData.password" :placeholder="t('passwordPlaceholder')" type="password" clearable :show-password="true">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div v-show="type == 'mobile'">
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

                    <div class="flex justify-between leading-none">
                        <NuxtLink to="/auth/register">
                            <el-button type="primary" link>{{ t('noAccount') }}，{{ t('toRegister') }}</el-button>
                        </NuxtLink>
                        <!-- <NuxtLink to="/auth/resetpwd">
                            <el-button type="primary" link>{{ t('resetpwd') }}</el-button>
                        </NuxtLink> -->
                    </div>

                    <el-form-item>
                        <el-button type="primary" class="mt-[20px] w-full" size="large" @click="handleLogin" :loading="loading">{{ loading ? t('logining') : t('login') }}</el-button>
                    </el-form-item>

                    <div class="text-xs py-[50rpx] flex justify-center w-full" v-if="configStore.login.agreement_show">
                        {{ t('agreeTips') }}
                        <NuxtLink to="/auth/agreement?key=service">
                            <span class="text-primary">{{ t('userAgreement') }}</span>
                        </NuxtLink>
                        {{ t('and') }}
                        <NuxtLink to="/auth/agreement?key=privacy">
                            <span class="text-primary">{{ t('privacyAgreement') }}</span>
                        </NuxtLink>
                    </div>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormInstance } from 'element-plus'
import { usernameLogin, mobileLogin, scanlogin, checkscan } from '@/app/api/auth'
import useMemberStore from '@/stores/member'
import useConfigStore from '@/stores/config'
import QRCode from "qrcode";

definePageMeta({
    layout: "container"
});

// 校验二维码
const checkScanFn = (key) => {
    let parameter = { key };

    checkscan(parameter).then((res) => {
        let data = res.data;
        switch (data.status) {
            case 'wait':
                setTimeout(() => {
                    checkScanFn(weixinCode.value.key);
                }, 1000);
                break;

            case 'success':
                if (!data.login_data.token) {
                    useCookie('openId').value = data.login_data.openid
                    navigateTo(`/auth/bind`)
                } else {
                    memberStore.setToken(data.login_data.token)
                    useLogin().handleLoginBack()
                }
                break;
            case 'fail':
                weixinCode.value.pastDueContent = data.fail_reason
                weixinCode.value.pastDue = true;
                break;
        }
    }).catch((res) => {
        weixinCode.value.pastDue = true;
        weixinCode.value.pastDueContent = res.msg;
    })
}

// 扫码登录,微信二维码
const weixinCode = ref({
    url: '',
    key: '',
    pastDue: false,
    pastDueContent: '二维码生成失败'
})

const scanLoginFn = async () => {
    let data = await (await scanlogin()).data;
    weixinCode.value.key = data.key
    QRCode.toDataURL(data.url, { errorCorrectionLevel: 'L', margin: 0, width: 100 }).then(url => {
        weixinCode.value.url = url
    });
    weixinCode.value.pastDue = false;

    setTimeout(() => {
        checkScanFn(weixinCode.value.key);
    }, 1000);
}
scanLoginFn();

const memberStore = useMemberStore()

const configStore = useConfigStore()
configStore.getLoginConfig()

const loginType = computed(() => {
    const value = []
    configStore.login.is_username && (value.push({ type: 'username', title: t('usernameLogin') }))
    configStore.login.is_mobile && (value.push({ type: 'mobile', title: t('mobileLogin') }))
    type.value = value[0] ? value[0].type : ''
    return value
})

const loading = ref(false)
const type = ref('')
const formData = reactive({
    username: '',
    password: '',
    mobile: '',
    mobile_code: '',
    mobile_key: ''
})
const formRef = ref<FormInstance>()
const formRules = computed(() => {
    return {
        'username': {
            required: type.value == 'username',
            message: t('usernamePlaceholder'),
            trigger: ['blur', 'change'],
        },
        'password': {
            required: type.value == 'username',
            message: t('passwordPlaceholder'),
            trigger: ['blur', 'change']
        },
        'mobile': [
            {
                required: type.value == 'mobile',
                message: t('mobilePlaceholder'),
                trigger: ['blur', 'change'],
            },
            {
                validator(rule: any, value: string, callback: any) {
                    if (type.value != 'mobile') return true
                    else return test.mobile(value)
                },
                message: t('mobileError'),
                trigger: ['blur'],
            }
        ],
        'mobile_code': {
            required: type.value == 'mobile',
            message: t('codePlaceholder'),
            trigger: ['change']
        }
    }
})

const handleLogin = async () => {
    await formRef.value?.validate(async (valid, fields) => {
        if (valid) {
            if (loading.value) return
            loading.value = true

            const login = type.value == 'username' ? usernameLogin : mobileLogin

            login(formData).then(async (res) => {
                await memberStore.setToken(res.data.token)
                useLogin().handleLoginBack()
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

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

.text-color {
    color: var(--el-color-primary);
}
</style>
