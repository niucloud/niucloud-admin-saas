<template>
    <el-dialog v-model="showDialog" :title="popTitle" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-form-item :label="t('labelName')" prop="label_name">
                <el-input v-model="formData.label_name" clearable :placeholder="t('labelNamePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('memo')">
                <el-input v-model="formData.memo" type="textarea" rows="4" clearable :placeholder="t('memoPlaceholder')" class="input-width"/>
            </el-form-item>
            <el-form-item :label="t('sort')" prop="sort">
                <el-input v-model="formData.sort" clearable :placeholder="t('sortPlaceholder')" class="input-width" type="number" />
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
import { addMemberLabel, updateMemberLabel, getMemberLabelInfo } from '@/app/api/member'

let showDialog = ref(false)
const loading = ref(false)
let popTitle:string = '';

/**
 * 表单数据
 */
const initialFormData = {
    label_id: '',
    label_name: '',
    memo: '',
    sort: 0,

}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
    label_name: [
        { required: true, message: t('labelNamePlaceholder'), trigger: 'blur' }
    ],
    sort:[
        { validator: sortVerify, trigger: 'blur' }
    ]
    }
})

const sortVerify = (rule: any, value: any, callback: any) => {
    if (value < 0) {
        callback(new Error(t('sortVerifyOne')))
    } else if (value.toString().indexOf(".") != -1) {
        callback(new Error(t('sortVerifyTwo')))
    } else {
        callback()
    }
}

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    let save = formData.label_id ? updateMemberLabel : addMemberLabel

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            let data = formData

            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(err => {
                loading.value = false
                // showDialog.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    popTitle = t('addMemberLabel')
    if(row){
        popTitle = t('updateMemberLabel')
        const data = await (await getMemberLabelInfo(row.label_id)).data
        if (data) Object.keys(formData).forEach((key: string) => {
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
