<template>
    <el-dialog v-model="showDialog" :title="t('updateAlipay')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
            <el-form-item :label="t('status')">
                <el-radio-group v-model="formData.status">
                    <el-radio label="1">{{ t('startUsing') }}</el-radio>
                    <el-radio label="0">{{ t('statusDeactivate') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('appId')" prop="app_id">
                <el-input v-model="formData.app_id" :placeholder="t('appIdPlaceholder')" class="input-width" maxlength="32"
                    show-word-limit clearable />
                <div class="form-tip">{{ t('appIdTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('appSecretCert')" prop="app_secret_cert">
                <el-input v-model="formData.app_secret_cert" :placeholder="t('appSecretCertPlaceholder')"
                    class="input-width" type="textarea" rows="4" clearable />
            </el-form-item>

            <el-form-item :label="t('appPublicCertPath')" prop="app_public_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.app_public_cert_path" />
                </div>
            </el-form-item>

            <el-form-item :label="t('alipayPublicCertPath')" prop="alipay_public_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.alipay_public_cert_path" />
                </div>
            </el-form-item>

            <el-form-item :label="t('alipayRootCertPath')" prop="alipay_root_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.alipay_root_cert_path" />
                </div>
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
    type: 'alipay',
    app_id: '',
    status: '',
    app_secret_cert: '',
    app_public_cert_path: '',
    alipay_public_cert_path: '',
    alipay_root_cert_path: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        app_id: [
            { required: true, message: t('appIdPlaceholder'), trigger: 'blur' }
        ],
        app_secret_cert: [
            { required: true, message: t('appSecretCertPlaceholder'), trigger: 'blur' }
        ],
        app_public_cert_path: [
            { required: true, message: t('appPublicCertPathPlaceholder'), trigger: 'blur' }
        ],
        alipay_public_cert_path: [
            { required: true, message: t('alipayPublicCertPathPlaceholder'), trigger: 'blur' }
        ],
        alipay_root_cert_path: [
            { required: true, message: t('alipayRootCertPathPlaceholder'), trigger: 'blur' }
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
            }).catch(() => {
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
