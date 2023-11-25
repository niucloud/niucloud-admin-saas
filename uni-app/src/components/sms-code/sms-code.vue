<template>
    <view :class="{'text-primary': sendSms.canGetCode.value, 'text-gray-300': !sendSms.canGetCode.value}" @click="handleSend">{{ sendSms.tips.value }}</view>
    <u-code :seconds="sendSms.seconds" :change-text="sendSms.changeText" ref="smsRef" @change="sendSms.codeChange"></u-code>
    <u-modal :show="show" :title="t('captchaTitle')" :confirm-text="t('confirm')" :cancel-text="t('cancel')" :show-cancel-button="true" 
        @cancel="show = false" @confirm="handleConfirm">
        <view class="flex mt-[20rpx]">
            <u-input
                :placeholder="t('captchaPlaceholder')"
                border="surround"
                v-model="formData.captcha_code"
            ></u-input>
            <image :src="captcha.image.value" class="h-[76rpx] ml-[20rpx]" mode="heightFix" @click="captcha.refresh()"></image>
        </view>
    </u-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useSendSms } from '@/hooks/useSendSms'
import { useCaptcha } from '@/hooks/useCaptcha'
import { t } from '@/locale'

const prop = defineProps({
    mobile: String,
    type: String,
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])
const value = computed({
    get() {
        return prop.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const smsRef = ref(null)
const sendSms = useSendSms(smsRef)
const show = ref(false)

const formData = reactive<requestMobileParam>({
    mobile: '',
    captcha_code: '',
    captcha_key: '',
    type: prop.type
})

const captcha = useCaptcha(formData)

const handleSend = async()=> {
    if (smsRef.value.canGetCode) {
        formData.mobile = prop.mobile
        if (uni.$u.test.isEmpty(formData.mobile)) { uni.showToast({ title: t('mobilePlaceholder'), icon:'none' }); return }
        if (!uni.$u.test.mobile(formData.mobile)) { uni.showToast({ title: t('mobileError'), icon:'none' }); return }
        
        await captcha.refresh()
        show.value = true        
    }
}

const handleConfirm = async()=> {
    if (uni.$u.test.isEmpty(formData.captcha_code)) { uni.showToast({ title: t('captchaPlaceholder'), icon:'none' }); return }
    const sendRes = await sendSms.send(formData)
    
    if (sendRes) {
        value.value = sendRes
        show.value = false
    } else if (sendRes === false) {
        captcha.refresh()
    }
}
</script>

<style>
</style>