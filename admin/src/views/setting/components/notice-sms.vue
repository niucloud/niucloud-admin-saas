<template>
    <el-dialog v-model="showDialog" :title="t('noticeSetting')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
            <el-form-item :label="t('status')">
                <el-radio-group v-model="formData.is_sms">
                    <el-radio :label="1">{{ t('startUsing') }}</el-radio>
                    <el-radio :label="0">{{ t('statusDeactivate') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('name')">
                <div class="input-width"> {{ formData.name }} </div>
            </el-form-item>

            <el-form-item :label="t('title')">
                <div class="input-width"> {{ formData.title }} </div>
            </el-form-item>

            <el-form-item :label="t('smsId')" prop="sms_id">
                <el-input v-model="formData.sms_id" :placeholder="t('smsIdPlaceholder')" class="input-width" show-word-limit
                    clearable />
            </el-form-item>

            <el-form-item :label="t('smsContent')">
                <div class="input-width"> {{ formData.content }} </div>
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
import { editNotice } from '@/api/notice'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    is_sms: 0,
    key: '',
    name: '',
    sms_default_content: '',
    title: '',
    type: '',
    sms_id: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        sms_id: [
            { required: true, message: t('smsIdPlaceholder'), trigger: 'blur' }
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

            const data = formData

            editNotice(data).then(res => {
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
    loading.value = true;
    Object.assign(formData, initialFormData)

    if (row) {
        Object.keys(formData).forEach((key: string) => {
            if (row[key] != undefined) formData[key] = row[key]
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
