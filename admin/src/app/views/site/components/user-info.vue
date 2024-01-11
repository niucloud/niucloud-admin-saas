<template>
    <el-dialog v-model="showDialog" :title="t('userInfo')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">

            <el-form-item :label="t('headimg')">
                <div class="flex items-center">
                    <el-avatar v-if="formData.head_img" :src="img(formData.head_img)" />
                    <el-avatar v-else>
                        <img src="@/app/assets/images/member_head.png" />
                    </el-avatar>
                </div>
            </el-form-item>

            <el-form-item :label="t('userRealName')">
                <div class="input-width"> {{ formData.real_name }} </div>
            </el-form-item>
            <el-form-item :label="t('accountNumber')">
                <div class="input-width"> {{ formData.username }} </div>
            </el-form-item>

            <el-form-item :label="t('siteId')">
                <div class="input-width"> {{ formData.roles[0].site_id }} </div>
            </el-form-item>

            <el-form-item :label="t('siteName')">
                <div class="flex">
                    <div class="max-w-[260px]"> {{ formData.roles[0].site_name }} </div>
                    <el-link class="ml-10 text-blue-700" href="/site/login" target="_blank" :underline="false">{{
                        t('enterSite') }}</el-link>
                </div>

            </el-form-item>

            <el-form-item :label="t('isAdmin')">
                <div class="input-width">{{ formData.roles[0].is_admin ? t('yes') : t('no') }} </div>
            </el-form-item>

            <el-form-item :label="t('status')">
                <div class="input-width">
                    <el-tag class="ml-2" type="success" v-if="formData.status == 1">{{ t('statusNormal') }}</el-tag>
                    <el-tag class="ml-2" type="error" v-if="formData.status == 0">{{ t('statusDeactivate') }}</el-tag>
                </div>
            </el-form-item>

            <el-form-item :label="t('lastIp')">
                <div class="input-width"> {{ formData.last_ip }} </div>
            </el-form-item>

            <el-form-item :label="t('lastTime')" v-if="parseFloat(formData.last_time)">
                <div class="input-width"> {{ formData.last_time }} </div>
            </el-form-item>

            <el-form-item :label="t('createTime')" v-if="parseFloat(formData.create_time)">
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
import { img } from '@/utils/common'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    username: '',
    create_time: '',
    head_img: '',
    last_ip: '',
    last_time: '',
    login_count: '',
    real_name: '',
    status: '',
    uid: '',
    update_time: '',
    roles: []

}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {

    }
})

// const emit = defineEmits(['complete'])

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
