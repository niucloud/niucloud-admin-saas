<template>
    <el-dialog v-model="showDialog" :title="t('updateWechat')" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
            <el-form-item :label="t('status')">
                <el-radio-group v-model="formData.status">
                    <el-radio label="1">{{ t('startUsing') }}</el-radio>
                    <el-radio label="0">{{ t('statusDeactivate') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('mchId')" prop="mch_id">
                <el-input v-model="formData.mch_id" :placeholder="t('mchIdPlaceholder')" class="input-width" maxlength="32"
                    show-word-limit clearable />
                <div class="form-tip">{{ t('mchIdTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('mchSecretKey')" prop="mch_secret_key">
                <el-input v-model="formData.mch_secret_key" :placeholder="t('mchSecretKeyPlaceholder')" class="input-width"
                    maxlength="32" show-word-limit clearable />
                <div class="form-tip">{{ t('mchSecretKeyTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('mchSecretCert')" prop="mch_secret_cert">
                <div class="input-width">
                    <upload-file v-model="formData.mch_secret_cert" />
                </div>
                <div class="form-tip">{{ t('mchSecretCertTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('mchPublicCertPath')" prop="mch_public_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.mch_public_cert_path" />
                </div>
                <div class="form-tip">{{ t('mchPublicCertPathTips') }}</div>
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                    t('confirm')
                }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getPayConfig, setPayConfig } from '@/api/sys'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    type: 'wechatpay',
    mch_id: '',
    status: '',
    mch_secret_key: '',
    mch_secret_cert: '',
    mch_public_cert_path: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        mch_id: [
            { required: true, message: t('mchIdPlaceholder'), trigger: 'blur' }
        ],
        mch_secret_key: [
            { required: true, message: t('mchSecretKeyPlaceholder'), trigger: 'blur' }
        ],
        mch_secret_cert: [
            { required: true, message: t('mchSecretCertPlaceholder'), trigger: 'blur' }
        ],
        mch_public_cert_path: [
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
            loading.value = true

            const data = formData

            setPayConfig(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(err => {
                loading.value = false
                showDialog.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    if (row) {
        const data = await (await getPayConfig(row.key)).data
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
    }
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
