<template>
    <div class="main-container">
        <el-form :model="formData" label-width="150px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title">{{ t('websiteInfo') }}</h3>

                <el-form-item :label="t('siteName')" prop="site_name">
                    <el-input v-model="formData.site_name" :placeholder="t('siteNamePlaceholder')" class="input-width"
                        clearable maxlength="20"/>
                </el-form-item>

                <el-form-item :label="t('logo')">
                    <upload-image v-model="formData.logo" />
                </el-form-item>
                
                <el-form-item :label="t('keywords')" >
                    <el-input v-model="formData.keywords" :placeholder="t('keywordsPlaceholder')" class="input-width" clearable maxlength="20"/>
                </el-form-item>

                <el-form-item :label="t('desc')" >
                    <el-input v-model="formData.desc" type="textarea" rows="4" clearable
                        :placeholder="t('descPlaceholder')" class="input-width" maxlength="100" />
                </el-form-item>
                
                
            </el-card>
        </el-form>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { setWebsite,getWebsite } from '@/api/sys'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import storage from '@/utils/storage'

const loading = ref(true)

const formData = reactive<Record<string, string>>({
    site_name: '',
    logo: '',
    desc: '',
    latitude: '',
    keywords:'',
    longitude: '',
    province_id: '',
    city_id: '',
    district_id: '',
    address:'',
    full_address:'',
    business_hours:'',
    phone:''
})
 

const setFormData = async (id: number = 0) => {
    const data = await (await getWebsite()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
  
    loading.value = false;
}
setFormData()

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
    site_name: [
        { required: true, message: t('siteNamePlaceholder'), trigger: 'blur' }
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
            
            setWebsite(formData).then(() => {
                loading.value = false
                setStore();
            }).catch(() => {
                loading.value = false
            })
        }
    })
}


const setStore = async () => {
    const data = await (await getWebsite()).data
    storage.set({ key: 'siteInfo', data: data })
}

</script>

<style lang="scss" scoped></style>
