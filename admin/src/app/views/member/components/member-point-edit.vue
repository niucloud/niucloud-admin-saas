<template>
    <el-dialog v-model="showDialog" :title="t('adjustPoint')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">

            <el-form-item :label="t('currPoint')" >
                <div class="input-width"> {{ formData.point }} </div>
            </el-form-item>

            <el-form-item :label="t('adjustType')">
                <el-radio-group v-model="formData.adjust_type">
                    <el-radio :label="1">{{ t('adjustAddPoint') }}</el-radio>
                    <el-radio :label="-1">{{ t('adjustReducePoint') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('adjustPoint')" prop="adjust">
                <el-input-number v-model="formData.adjust" clearable :min="0" :max="999999" :placeholder="t('adjustPlaceholder')" class=""/>
            </el-form-item>

            <el-form-item :label="t('memo')" prop="memo">
                <el-input v-model="formData.memo" type="textarea" rows="4" clearable :placeholder="t('memoPlaceholder')" class="input-width"/>
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
import { adjustPoint } from '@/app/api/member'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    member_id: 0,
    point: '',
    memo: '',
    adjust: '',
    account_data: '',
    adjust_type: 1
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        adjust: [
            { required: true, message: t('adjustPointPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    formData.adjust = Math.floor(formData.adjust)

                    const adjust = Math.abs(parseFloat(formData.adjust))

                    if (!adjust) {
                        callback(new Error(t('adjustPointPlaceholder')))
                    }

                    if (formData.adjust_type == -1 && (parseFloat(formData.point) - adjust < 0)) {
                        callback(new Error(t('adjustPointMaxAccountMessage')))
                    }

                    callback()
                },
                trigger: 'blur'
            }
        ]
    }
})

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            formData.account_data = Math.abs(parseFloat(formData.adjust)) * formData.adjust_type;
            const data = formData

            adjustPoint(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(() => {
                loading.value = false
                // showDialog.value = false
            })
        }
    })
}

const emit = defineEmits(['complete'])

const setFormData = async (row: any = null) => {
    loading.value = true
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
