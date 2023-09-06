<template>
    <el-dialog v-model="showDialog" :title="t('updateWechat')" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">

            <el-form-item :label="t('mchId')" prop="config.mch_id">
                <el-input v-model="formData.config.mch_id" :placeholder="t('mchIdPlaceholder')" class="input-width"
                    maxlength="32" show-word-limit clearable />
                <div class="form-tip">{{ t('mchIdTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('mchSecretKey')" prop="config.mch_secret_key">
                <el-input v-model="formData.config.mch_secret_key" :placeholder="t('mchSecretKeyPlaceholder')"
                    class="input-width" maxlength="32" show-word-limit clearable />
                <div class="form-tip">{{ t('mchSecretKeyTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('mchSecretCert')" prop="config.mch_secret_cert">
                <div class="input-width">
                    <upload-file v-model="formData.config.mch_secret_cert" api="sys/document/wechat" />
                </div>
                <div class="form-tip">{{ t('mchSecretCertTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('mchPublicCertPath')" prop="config.mch_public_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.config.mch_public_cert_path" api="sys/document/wechat" />
                </div>
                <div class="form-tip">{{ t('mchPublicCertPathTips') }}</div>
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { setPatConfig } from '@/api/sys'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    type: 'wechatpay',
    config: {
        mch_id: '',
        mch_secret_key: '',
        mch_secret_cert: '',
        mch_public_cert_path: ''
    },
    channel: '',
    status: 0,
    is_default: 0
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        'config.mch_id': [
            { required: true, message: t('mchIdPlaceholder'), trigger: 'blur' }
        ],
        'config.mch_secret_key': [
            { required: true, message: t('mchSecretKeyPlaceholder'), trigger: 'blur' }
        ],
        'config.mch_secret_cert': [
            { required: true, message: t('mchSecretCertPlaceholder'), trigger: 'blur' }
        ],
        'config.mch_public_cert_path': [
            { required: true, message: t('mchPublicCertPathPlaceholder'), trigger: 'blur' }
        ]
    }
})

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            emit('complete', formData)
            showDialog.value = false
        }
    })
}

const setFormData = async (data: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    if (data) {
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
        formData.channel = data.redio_key.split('_')[0]
        formData.status = Number(formData.status)
    }
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
