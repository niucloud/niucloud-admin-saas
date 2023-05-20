<template>
    <el-dialog v-model="showDialog" :title="t('messageInfo')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">

            <el-form-item :label="t('messageKey')">
                <div class="input-width"> {{ formData.name }} </div>
            </el-form-item>

            <el-form-item :label="t('messageType')">
                <div v-if="formData.message_type == 'sms'">{{ t('sms') }}</div>
                <div v-if="formData.message_type == 'wechat'">{{ t('wechat') }}</div>
                <div v-if="formData.message_type == 'weapp'">{{ t('weapp') }}</div>
            </el-form-item>

            <el-form-item :label="t('messageData')">
                <div class="input-width"> {{ formData.message_data }} </div>
            </el-form-item>

            <el-form-item :label="t('nickname')">
                <div class="input-width"> {{ formData.nickname }} </div>
            </el-form-item>

            <el-form-item :label="t('receiver')">
                <div class="input-width"> {{ formData.receiver }} </div>
            </el-form-item>

            <el-form-item :label="t('createTime')">
                <div class="input-width"> {{ formData.create_time }} </div>
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="showDialog = false">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { editNoticeStatus } from '@/api/notice'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    create_time: 0,
    message_data: '',
    message_key: '',
    message_type: '',
    name: '',
    nickname: '',
    receiver: '',
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {

    }
})

const emit = defineEmits(['complete'])

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
