<template>
    <el-dialog v-model="showDialog" :title="title" width="480px" :before-close="beforeClose" :destroy-on-close="true">
        <el-form :model="formData" label-width="130px" ref="formRef" :rules="formRules" class="page-form">

            <el-form-item :label="t('dictType')" >
                <el-select class="input-width" :placeholder="t('dictTypePlaceholder')" v-model="formData.dict_type"
                    filterable remote clearable>
                    <el-option :label="item.name" :value="item.key" v-for="item in dicList" :key="item.key" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup async>
import { ref, computed, toRaw, } from 'vue'
import { t } from '@/lang'
import { getDictAll } from '@/app/api/dict'
import type { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'

const showDialog = ref(false)
const title = ref('')
/**
 * 表单数据
 */
const initialFormData = {
    dict_type: "",
}
const formData: Record<string, any> = ref({ ...initialFormData })

const formRef = ref<FormInstance>()
const dicList = ref<Array<any>>([])
// 表单验证规则
const formRules = computed(() => {
    return {
        dict_type: [
            { required: true, message: t('dictTypePlaceholder'), trigger: 'change' }
        ],

    }
})

const getDictAllFn = () => {
    getDictAll().then((res) => {
        dicList.value = res.data
    })
}
const emit = defineEmits(['complete'])
/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            emit('complete', toRaw(formData.value))
            showDialog.value = false
        }
    })
}

const setFormData = async (row: any = null) => {
    formData.value = cloneDeep(Object.assign(initialFormData, row))
    getDictAllFn()
    showDialog.value = true
}
const beforeClose = (next: any) => {

    formRef.value?.clearValidate()
    next()
}
defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
