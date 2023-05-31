<template>
    <div class="main-container">
        <el-form :model="formData" label-width="200px" ref="formRef" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none mt-[16px]" shadow="never">
                <h3 class="panel-title">{{ t('oplatformSetting') }}</h3>

                <el-form-item label="APPID">
                    <el-input v-model="formData.appid" :placeholder="t('appidPlaceholder')" class="input-width" clearable/>
                </el-form-item>

                <el-form-item label="APPSECRET" >
                    <el-input v-model="formData.appsecret" :placeholder="t('appsecretPlaceholder')" class="input-width" clearable/>
                </el-form-item>
				
				<h3 class="panel-title">{{ t('oplatformComm') }}</h3>
				<el-form-item :label="t('empowerStartDomain')">
					<span>{{ formData.start_domain }}</span>
				</el-form-item>
					
				<el-form-item :label="t('empowerReceiveUrl')" >
					<span>{{ formData.receive_url }}</span>
				</el-form-item>
							
				<el-form-item :label="t('messageValidationToken')" >
				    <el-input v-model="formData.token" class="input-width" clearable/>
				</el-form-item>
				
				<el-form-item :label="t('messageDecryptKey')" >
				    <el-input v-model="formData.key" class="input-width" clearable/>
				</el-form-item>
				
				<el-form-item :label="t('messageReceiveUrl')" >
					<span>{{ formData.message_receive }}</span>
				</el-form-item>
				
				<el-form-item :label="t('wechatDomain')" >
					<span>{{ formData.host }}</span>
				</el-form-item>	
				
				<el-form-item :label="t('weappDomain')" >
					<span>{{ formData.host }}</span>
				</el-form-item>	
				
				<el-form-item :label="t('weappBusinessDomain')" > 
					<span>{{ formData.host }}</span>
				</el-form-item>	
				
				<h3 class="panel-title">{{ t('oplatformBuilder') }}</h3>
				<el-form-item :label="t('builderEmail')" >
				    <el-input v-model="formData.email" class="input-width" clearable/>
				</el-form-item>
				
				<el-form-item :label="t('builderMobile')" >
				    <el-input v-model="formData.mobile" class="input-width" clearable/>
				</el-form-item>
				
				<el-form-item :label="t('builderQQ')" >
				    <el-input v-model="formData.qq" class="input-width" clearable/>
				</el-form-item>
				
				<el-form-item :label="t('builderWx')" >
				    <el-input v-model="formData.wx" class="input-width" clearable/>
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
import { setCopyright,getCopyright } from '@/api/sys'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const loading = ref(true)
const formData = reactive<Record<string, string>>({
    appid: '',
    appsecret: '',
	token: '',
	key: '',
	email: '',
	mobile: '',
	qq: '',
	wx: '',
	start_domain: '',
	receive_url: '',
	message_receive: '',
	host: ''
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
