<template>
    <div class="main-container">
        <div class="flex ml-[18px] justify-between items-center mt-[20px]">
			<span class="text-[20px]">{{pageName}}</span>
		</div>

        <el-form :model="formData" label-width="150px" ref="ruleFormRef" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">

                <h3 class="panel-title !text-sm">{{ t('admin') }}</h3>

                <el-form-item :label="t('isCaptcha')" prop="formData.is_auth_register">
                    <el-switch v-model="formData.is_captcha"/>
                </el-form-item>

                <el-form-item :label="t('bgImg')">
                    <upload-image v-model="formData.bg" />
                    <div class="form-tip">{{t('adminBgImgTip')}}</div>
                </el-form-item>

            </el-card>

            <el-card class="box-card !border-none mt-4" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('site') }}</h3>

                <el-form-item :label="t('isCaptcha')" prop="formData.is_auth_register">
                    <el-switch v-model="formData.is_site_captcha"/>
                </el-form-item>

                <el-form-item :label="t('bgImg')">
                    <upload-image v-model="formData.site_bg" />
                    <div class="form-tip">{{t('siteBgImgTip')}}</div>
                </el-form-item>

            </el-card>
        </el-form>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(ruleFormRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getConfigLogin, setConfigLogin } from '@/app/api/sys'
import { FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const loading = ref(true)
const ruleFormRef = ref<FormInstance>()
const formData = reactive<Record<string, number | string>>({
    is_captcha: 0,
    is_site_captcha: 0,
    bg: '',
    site_bg: ''
})

const getFormData = async (id: number = 0) => {
    const data = await (await getConfigLogin()).data
    Object.keys(formData).forEach((key: string) => {
        if (['is_captcha', 'is_site_captcha'].includes(key)) formData[key] = Boolean(Number(data[key]))
        else formData[key] = data[key]
    })
    loading.value = false
}
getFormData()

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            const save = JSON.parse(JSON.stringify(formData))
            Object.keys(save).forEach((key) => {
                if (['is_captcha', 'is_site_captcha'].includes(key)) save[key] = Number(save[key])
            })

            setConfigLogin(save).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped>
.el-form .form-tip{
    line-height: 1.5;
    margin-top: 5px;
}
</style>
