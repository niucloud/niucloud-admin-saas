<template>
    <el-dialog v-model="showDialog" :title="t('updateAlipay')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">

            <el-form-item :label="t('appId')" prop="config.app_id">
                <el-input v-model="formData.config.app_id" :placeholder="t('appIdPlaceholder')" class="input-width" maxlength="32" show-word-limit clearable />
                <div class="form-tip">{{ t('appIdTips') }}</div>
            </el-form-item>
            <el-form-item :label="t('appSecretCert')" prop="config.app_secret_cert">
                <el-input v-model="formData.config.app_secret_cert" :placeholder="t('appSecretCertPlaceholder')" class="input-width" type="textarea" rows="4" clearable />
            </el-form-item>

            <el-form-item :label="t('appPublicCertPath')" prop="config.app_public_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.config.app_public_cert_path" api="sys/document/aliyun" />
                </div>
            </el-form-item>

            <el-form-item :label="t('alipayPublicCertPath')" prop="config.alipay_public_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.config.alipay_public_cert_path" api="sys/document/aliyun" />
                </div>
            </el-form-item>

            <el-form-item :label="t('alipayRootCertPath')" prop="config.alipay_root_cert_path">
                <div class="input-width">
                    <upload-file v-model="formData.config.alipay_root_cert_path" api="sys/document/aliyun" />
                </div>
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{t('confirm')}}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { setPatConfig } from '@/app/api/sys'
import { number } from 'echarts'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    type: 'alipay',
    app_id: '',
    config:{
        app_secret_cert: '',
        app_public_cert_path: '',
        alipay_public_cert_path: '',
        alipay_root_cert_path: ''
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
        'config.app_id': [
            { required: true, message: t('appIdPlaceholder'), trigger: 'blur' }
        ],
        'config.app_secret_cert': [
            { required: true, message: t('appSecretCertPlaceholder'), trigger: 'blur' }
        ],
        'config.app_public_cert_path': [
            { required: true, message: t('appPublicCertPathPlaceholder'), trigger: 'blur' }
        ],
        'config.alipay_public_cert_path': [
            { required: true, message: t('alipayPublicCertPathPlaceholder'), trigger: 'blur' }
        ],
        'config.alipay_root_cert_path': [
            { required: true, message: t('alipayRootCertPathPlaceholder'), trigger: 'blur' }
        ]
    }
})

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async(formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if(valid){
            emit('complete',formData);
            showDialog.value = false;
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
        formData['channel'] = data['redio_key'].split('_')[0];
        formData['status'] = Number(formData['status']);
    }
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
