<template>
    <div class="main-container">
        <el-form :model="formData" label-width="0" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('developerTokenEdit') }}</h3>
                <el-form-item label="" prop="token">
                    <div>
                        <el-input v-model="formData.token" :placeholder="t('tokenPlaceholder')" class="input-width" clearable maxlength="30"/>
                    </div>
                    <div class="text-[14px] text-[#a9a9a9] leading-tight mt-[10px]">{{ t('tokenTips') }}</div>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
                </el-form-item>
            </el-card>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { setDeveloperToken, getDeveloperToken } from '@/app/api/sys'
import { FormInstance, FormRules } from 'element-plus'

const loading = ref(true)
const formData = ref({
    token: ''
})

getDeveloperToken().then(({ data }) => {
    loading.value = false
    data.token && (formData.value = data)
}).catch()

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
    token: [
        { required: true, message: t('tokenPlaceholder'), trigger: 'blur' }
    ]
})

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            setDeveloperToken(formData.value).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>
