<template>
    <div class="h-[30px]">
        <el-button type="primary" link :disabled="!sendSms.canGetCode.value" @click="handleClick">{{ sendSms.text.value }}</el-button>
    </div>

    <el-dialog v-model="captchaDialog" :title="t('captchaTitle')" width="350px" :append-to-body="true" :align-center="true">
        <el-form :model="formData" ref="formRef" :rules="formRules">
            <el-form-item prop="captcha_code" style="margin-bottom: 0;">
                <el-input v-model="formData.captcha_code" :placeholder="t('captchaPlaceholder')">
                    <template #suffix>
                        <div class="py-[5px] leading-none">
                            <el-image :src="captcha.image.value" class="h-[30px] cursor-pointer" @click="captcha.refresh()"></el-image>
                        </div>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="captchaDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
const prop = defineProps({
    mobile: String,
    type: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    }
})

const emits = defineEmits(['update:modelValue', 'click'])

const value = computed({
    get() {
        return prop.modelValue
    },
    set(value) {
        emits('update:modelValue', value)
    }
})

const loading = ref(false)
const formData = reactive<requestMobileParam>({
    mobile: '',
    captcha_code: '',
    captcha_key: '',
    type: prop.type
})
const formRules = reactive({
    captcha_code: {
        required: true,
        message: t('captchaPlaceholder'),
        trigger: ['blur', 'change']
    }
})
const formRef = ref<AnyObject | null>(null)

const captchaDialog = ref(false)
const captcha = useCaptcha(formData)
captcha.refresh()

const sendSms = useSendSms()

const send = () => {
    formData.mobile = prop.mobile
    if (sendSms.canGetCode.value) {
        captchaDialog.value = true
    }
}

const confirm = async () => {
    await formRef.value?.validate(async (valid, fields) => {
        if (valid) {
            loading.value = true

            const sendRes = await sendSms.send(formData)
            if (sendRes) {
                value.value = sendRes
                captchaDialog.value = false
                loading.value = false
            } else if (sendRes === false) {
                captcha.refresh()
                loading.value = false
            }
        }
    })
}

const handleClick = () => {
    emits('click')
}

defineExpose({
    send
})
</script>

<style lang="scss" scoped></style>