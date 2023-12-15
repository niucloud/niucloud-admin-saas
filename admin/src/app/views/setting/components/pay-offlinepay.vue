<template>
    <el-dialog v-model="showDialog" :title="t('updateOfflinepay')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">

            <el-form-item :label="t('collectionName')" prop="config.collection_name">
                <el-input v-model="formData.config.collection_name" :placeholder="t('collectionNamePlaceholder')"
                    class="input-width" show-word-limit clearable />
            </el-form-item>

            <el-form-item :label="t('collectionBank')" prop="config.collection_bank">
                <el-input v-model="formData.config.collection_bank" :placeholder="t('collectionBankPlaceholder')"
                    class="input-width" clearable />
            </el-form-item>

            <el-form-item :label="t('collectionAccount')" prop="config.collection_account">
                <el-input v-model="formData.config.collection_account" :placeholder="t('collectionAccountPlaceholder')"
                    class="input-width" clearable />
            </el-form-item>

            <el-form-item :label="t('collectionDesc')" prop="config.collection_desc">
                <el-input v-model="formData.config.collection_desc" :placeholder="t('collectionDescPlaceholder')"
                    class="input-width" type="textarea" rows="4" clearable />
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

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    type: 'offlinepay',
    config: {
        collection_name: '',
        collection_bank: '',
        collection_account: '',
        collection_desc: ''
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
        'config.collection_name': [
            { required: true, message: t('collectionNamePlaceholder'), trigger: 'blur' }
        ],
        'config.collection_bank': [
            { required: true, message: t('collectionBankPlaceholder'), trigger: 'blur' }
        ],
        'config.collection_account': [
            { required: true, message: t('collectionAccountPlaceholder'), trigger: 'blur' }
        ],
        'config.collection_desc': [
            { required: true, message: t('collectionDescPlaceholder'), trigger: 'blur' }
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
