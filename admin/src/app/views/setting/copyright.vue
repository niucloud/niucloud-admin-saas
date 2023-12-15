<template>
    <div class="main-container">
        <el-form :model="formData" label-width="150px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('copyrightEdit') }}</h3>
                <el-form-item :label="t('logo')">
                    <upload-image v-model="formData.logo" />
                </el-form-item>

                <el-form-item :label="t('companyName')" prop="company_name">
                    <el-input v-model="formData.company_name" :placeholder="t('companyNamePlaceholder')" class="input-width" clearable maxlength="30"/>
                </el-form-item>

                <el-form-item :label="t('copyrightLink')" >
                    <el-input v-model="formData.copyright_link" :placeholder="t('copyrightLinkPlaceholder')" class="input-width" clearable />
                </el-form-item>

                <el-form-item :label="t('copyrightDesc')" >
                    <el-input v-model="formData.copyright_desc" type="textarea" rows="4" clearable :placeholder="t('copyrightDescPlaceholder')" class="input-width" maxlength="150" />
                </el-form-item>

            </el-card>

            <el-card class="box-card !border-none mt-[16px]" shadow="never">
                <h3 class="panel-title !text-sm">{{ t('putOnRecordEdit') }}</h3>

                <el-form-item :label="t('icp')" prop="icp">
                    <el-input v-model="formData.icp" :placeholder="t('icpPlaceholder')" class="input-width" clearable maxlength="20"/>
                </el-form-item>

                <el-form-item :label="t('govRecord')" >
                    <el-input v-model="formData.gov_record" :placeholder="t('govRecordPlaceholder')" class="input-width" clearable maxlength="50"/>
                </el-form-item>

                <el-form-item :label="t('govUrl')" >
                    <el-input v-model="formData.gov_url" :placeholder="t('govUrlPlaceholder')" class="input-width" clearable />
                </el-form-item>

                <el-form-item :label="t('marketSupervisionUrl')" >
                    <el-input v-model="formData.market_supervision_url" rows="4" clearable :placeholder="t('marketSupervisionUrlPlaceholder')" class="input-width" />
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
import { setCopyright,getCopyright } from '@/app/api/sys'
import { FormInstance, FormRules } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const loading = ref(true)

const formData = reactive<Record<string, string>>({
    icp: '',
    gov_record: '',
    gov_url: '',
    market_supervision_url: '',
    logo:'',
    company_name: '',
    copyright_link: '',
    copyright_desc: ''
})


const setFormData = async (id: number = 0) => {
    const data = await (await getCopyright()).data
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
            setCopyright(formData).then(() => {
                loading.value = false

            }).catch(() => {
                loading.value = false
            })
        }
    })
}

</script>

<style lang="scss" scoped></style>
