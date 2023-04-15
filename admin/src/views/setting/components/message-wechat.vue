<template>
    <el-dialog v-model="showDialog" :title="t('messageSetting')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
            <el-form-item :label="t('status')">
                <el-radio-group v-model="formData.status">
                    <el-radio :label="1">{{ t('startUsing') }}</el-radio>
                    <el-radio :label="0">{{ t('statusDeactivate') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('name')" >
                <div class="input-width"> {{ formData.name }} </div>
            </el-form-item>

            <el-form-item :label="t('tempKey')" >
                <div class="input-width"> {{ formData.temp_key }} </div>
            </el-form-item>

            <el-form-item :label="t('first')" prop="first">
                <el-input v-model="formData.wechat_first" :placeholder="t('firstPlaceholder')" class="input-width"
                     show-word-limit clearable />
            </el-form-item>

            <el-form-item :label="t('content')" >
                <div class="input-width"> 
                    <div v-for="(item, index) in formData.content">{{ item[0] }}：{{ item[1] }} </div>    
                </div>
            </el-form-item>

            <el-form-item :label="t('remark')" prop="remark">
                <el-input v-model="formData.wechat_remark" :placeholder="t('remarkPlaceholder')" class="input-width"
                     show-word-limit clearable />
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
import { updateMessage } from '@/api/message'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    status: 0,
    key:'',
    name:'',
    title:'',
    type:'',
    content:[],
    first:'',
    remark:'',
    temp_key:'',
    wechat_first:'',
    wechat_remark:''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {

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

            updateMessage(data).then(res => {
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
        Object.keys(formData).forEach((key: string) => {
            if (row[key] != undefined) formData[key] = row[key]
            if (row.wechat_json[key] != undefined) formData[key] = row.wechat_json[key]
        })
        if(!formData.wechat_first) formData['wechat_first'] = formData['first']
        if(!formData.wechat_remark) formData['wechat_remark'] = formData['remark']
    }
    
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
