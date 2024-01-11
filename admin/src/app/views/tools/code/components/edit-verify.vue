<template>
    <el-dialog v-model="showDialog" :title="title" width="480px" :before-close="beforeClose" :destroy-on-close="true">
        <el-form :model="formData" label-width="130px" ref="formRef" :rules="formRules" class="page-form">

            <el-form-item v-if="formData.validate_type == 'min'" :label="t('minLabel')" prop="min_number">
                <el-input-number v-model="formData.min_number" :step="1" step-strictly :min="1" class="input-width" />
            </el-form-item>
            <el-form-item v-else-if="formData.validate_type == 'max'" :label="t('maxLabel')" prop="max_number">
                <el-input-number v-model="formData.max_number" :step="1" step-strictly :min="1" class="input-width" />
            </el-form-item>
            <template v-else-if="formData.view_type === 'number'">
                <el-form-item :label="t('minLabel1')" prop="view_min">
                    <el-input-number v-model="formData.view_min" :min="0" :value-on-clear="0" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('maxLabel1')"  prop="view_max">
                    <el-input-number v-model="formData.view_max" :min="1" class="input-width" />
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item :label="t('minLabel')" prop="betweenMin">
                    <el-input-number v-model="formData.betweenMin" :step="1" step-strictly :min="1" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('maxLabel')" prop="betweenMax">
                    <el-input-number v-model="formData.betweenMax" :step="1" step-strictly :min="1" class="input-width" />
                </el-form-item>
            </template>
            <!-- <el-form-item v-else :label="t('between')" required>
                <el-col :span="11">
                    <el-form-item prop="betweenMin">
                        <el-input-number v-model="formData.betweenMin" :step="1" step-strictly :min="1" class="input-width" />
                    </el-form-item>
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="betweenMax">
                        <el-input-number v-model="formData.betweenMax" :step="1" step-strictly :min="1" class="input-width" />
                    </el-form-item>
                </el-col>
            </el-form-item> -->
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
import { ref, computed, toRaw } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'

const showDialog = ref(false)
const title = ref('')
/**
 * 表单数据
 */
const initialFormData = {
    validate_type: '',
    min_number: 1,
    max_number: 120,
    betweenMin: 1,
    betweenMax: 120
}
const formData: Record<string, any> = ref({ ...initialFormData })

const formRef = ref<FormInstance>()
const validateMin = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error(t('minPlaceholder')))
    } else if (value > formData.value.betweenMax) {
        callback(new Error(t('minPlaceholder1')))
    } else {
        callback()
    }
}
const validateMax = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error(t('maxPlaceholder')))
    } else if (value < formData.value.betweenMin) {
        callback(new Error(t('maxPlaceholder1')))
    } else {
        callback()
    }
}
const validateMin1 = (rule: any, value: any, callback: any) => {
    if (value > formData.value.view_max) {
        callback(new Error(t('min1Placeholder1')))
    } else {
        callback()
    }
}
const validateMax1 = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error(t('max1Placeholder')))
    } else if (value < formData.value.view_min) {
        callback(new Error(t('max1Placeholder1')))
    } else {
        callback()
    }
}
// 表单验证规则
const formRules = computed(() => {
    return {
        min_number: [
            { required: true, message: t('minPlaceholder'), trigger: 'change' }
        ],
        max_number: [
            { required: true, message: t('maxPlaceholder'), trigger: 'change' }
        ],
        betweenMin: [
            { required: true, validator: validateMin, trigger: 'change' }
        ],
        betweenMax: [
            { required: true, validator: validateMax, trigger: 'change' }
        ],
        view_min: [
            { required: true, validator: validateMin1, trigger: 'change' }
        ],
        view_max: [
            { required: true, validator: validateMax1, trigger: 'change' }
        ]
    }
})

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
