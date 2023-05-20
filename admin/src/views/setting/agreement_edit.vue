<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never" v-loading="loading">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('type')">
                    <el-input v-model="formData.agreement_key_name" readonly class="input-width" />
                </el-form-item>
                <el-form-item :label="t('title')" prop="title">
                    <el-input v-model="formData.title" clearable :placeholder="t('titlePlaceholder')" class="input-width"
                        maxlength="20" />
                </el-form-item>
                <el-form-item :label="t('content')">
                    <editor v-model="formData.content" />
                </el-form-item>
            </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getAgreementInfo, editAgreement } from '@/api/sys'
import { useRoute, useRouter } from 'vue-router'
import useTabbarStore from '@/stores/modules/tabbar'
import useAppStore from '@/stores/modules/app'

const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const agreement_key: string = route.query.key || ''
const loading = ref(false)
const categoryList = ref([])
const tabbarStore = useTabbarStore()

// 页面返回按钮
appStore.pageReturn = true;
watch(route, (newX, oldX) => {
    appStore.pageReturn = false;
});

/**
 * 表单数据
 */
const initialFormData = {
    agreement_key: '',
    content: '',
    title: '',
    agreement_key_name: ''
}

const formData: Record<string, any> = reactive({ ...initialFormData })
loading.value = true
const setFormData = async (agreement_key: string = '') => {
    Object.assign(formData, initialFormData)
    const data = await (await getAgreementInfo(agreement_key)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    loading.value = false;
}
if (agreement_key) setFormData(agreement_key)



const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        title: [
            { required: true, message: t('titlePlaceholder'), trigger: 'blur' }
        ]
    }
})

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const data = formData
            data.key = formData.agreement_key;
            editAgreement(data).then(res => {
                loading.value = false
                back();
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const back = () => {
    tabbarStore.removeTab(route.path)
    router.push({ path: '/setting/agreement' })
}
</script>

<style lang="scss" scoped></style>
