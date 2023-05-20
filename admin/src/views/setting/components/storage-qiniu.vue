<template>
    <el-dialog v-model="showDialog" :title="t('qiniuStorage')" width="580px" :destroy-on-close="true">
        <el-form :model="formData" label-width="140px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
            <el-form-item :label="t('isUse')">
                <el-radio-group v-model="formData.is_use">
                    <el-radio label="1">{{ t('startUsing') }}</el-radio>
                    <el-radio label="0">{{ t('statusDeactivate') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('qiniuBucket')" prop="bucket">
                <el-input v-model="formData.bucket" :placeholder="t('qiniuBucketPlaceholder')" class="input-width"
                    show-word-limit clearable />
                <div class="form-tip">{{ t('qiniuBucketTips') }}</div>
            </el-form-item>

            <el-form-item :label="t('qiniuAccessKey')" prop="access_key">
                <el-input v-model="formData.access_key" :placeholder="t('qiniuAccessKeyPlaceholder')" class="input-width"
                    clearable />
            </el-form-item>

            <el-form-item :label="t('qiniuSecretKey')" prop="secret_key">
                <el-input v-model="formData.secret_key" :placeholder="t('qiniuSecretKeyPlaceholder')" class="input-width"
                    clearable />
            </el-form-item>

            <el-form-item :label="t('domain')" prop="domain">
                <el-input v-model="formData.domain" :placeholder="t('domainPlaceholder')" class="input-width" clearable />
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
import { getStorageInfo, editStorage } from '@/api/sys'

let showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    storage_type: '',
    bucket: '',
    access_key: '',
    secret_key: '',
    domain: '',
    is_use: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        bucket: [
            { required: true, message: t('qiniuBucketPlaceholder'), trigger: 'blur' }
        ],
        access_key: [
            { required: true, message: t('qiniuAccessKeyPlaceholder'), trigger: 'blur' }
        ],
        secret_key: [
            { required: true, message: t('qiniuSecretKeyPlaceholder'), trigger: 'blur' }
        ],
        endpoint: [
            { required: true, message: t('aliEndpointPlaceholder'), trigger: 'blur' }
        ],
        domain: [
            { required: true, message: t('domainPlaceholder'), trigger: 'blur' }
        ],

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

            let data = formData

            editStorage(data).then(res => {
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
        const data = await (await getStorageInfo(row.storage_type)).data
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
            if (data.params[key] != undefined) formData[key] = data.params[key].value
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