<template>
    <div class="main-container">
        <el-alert class="warm-prompt" type="info">
            <template #default>
                <div class="flex items-center">
                    <el-icon class="mr-2" size="18"><Warning /></el-icon>
                    <p class="text-base">{{t('operationTip')}}</p>
                </div>
            </template>
        </el-alert>
        <div class="flex ml-[18px] justify-between items-center mt-[20px]">
			<span class="text-[24px]">{{pageName}}</span>
		</div>
        <el-form :model="formData" label-width="200px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{t('wechatpay')}}</h3>
                    
                <el-form-item :label="t('mchId')" prop="wechatpay_config.mch_id">
                    <el-input v-model="formData.wechatpay_config.mch_id" :placeholder="t('mchIdPlaceholder')" class="input-width" maxlength="32" show-word-limit clearable />
                    <div class="form-tip">{{ t('mchIdTips') }}</div>
                </el-form-item>

                <el-form-item :label="t('mchSecretKey')" prop="wechatpay_config.mch_secret_key">
                    <el-input v-model="formData.wechatpay_config.mch_secret_key" :placeholder="t('mchSecretKeyPlaceholder')" class="input-width" maxlength="32" show-word-limit clearable />
                    <div class="form-tip">{{ t('mchSecretKeyTips') }}</div>
                </el-form-item>

                <el-form-item :label="t('mchSecretCert')" prop="wechatpay_config.mch_secret_cert">
                    <div class="input-width">
                        <upload-file v-model="formData.wechatpay_config.mch_secret_cert" api="sys/document/wechat" />
                    </div>
                    <div class="form-tip">{{ t('mchSecretCertTips') }}</div>
                </el-form-item>

                <el-form-item :label="t('mchPublicCertPath')" prop="wechatpay_config.mch_public_cert_path">
                    <div class="input-width">
                        <upload-file v-model="formData.wechatpay_config.mch_public_cert_path" api="sys/document/wechat" />
                    </div>
                    <div class="form-tip">{{ t('mchPublicCertPathTips') }}</div>
                </el-form-item>
            </el-card>


            <el-card class="box-card mt-4 !border-none" shadow="never">
                <h3 class="panel-title !text-sm">{{t('alipay')}}</h3>

                <el-form-item :label="t('appId')" prop="alipay_config.app_id">
                    <el-input v-model="formData.alipay_config.app_id" :placeholder="t('appIdPlaceholder')" class="input-width" maxlength="32" show-word-limit clearable />
                    <div class="form-tip">{{ t('appIdTips') }}</div>
                </el-form-item>
                <el-form-item :label="t('appSecretCert')" prop="alipay_config.app_secret_cert">
                    <el-input v-model="formData.alipay_config.app_secret_cert" :placeholder="t('appSecretCertPlaceholder')" class="input-width" type="textarea" rows="4" clearable />
                </el-form-item>

                <el-form-item :label="t('appPublicCertPath')" prop="alipay_config.app_public_cert_path">
                    <div class="input-width">
                        <upload-file v-model="formData.alipay_config.app_public_cert_path" api="sys/document/aliyun" />
                    </div>
                </el-form-item>

                <el-form-item :label="t('alipayPublicCertPath')" prop="alipay_config.alipay_public_cert_path">
                    <div class="input-width">
                        <upload-file v-model="formData.alipay_config.alipay_public_cert_path" api="sys/document/aliyun" />
                    </div>
                </el-form-item>

                <el-form-item :label="t('alipayRootCertPath')" prop="alipay_config.alipay_root_cert_path">
                    <div class="input-width">
                        <upload-file v-model="formData.alipay_config.alipay_root_cert_path" api="sys/document/aliyun" />
                    </div>
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
import { reactive, ref, computed } from 'vue'
import { t } from '@/lang'
import { getTransferInfo, setTransferInfo } from '@/api/sys'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title

const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    wechatpay_config:{
        mch_id: '',
        mch_secret_key: '',
        mch_secret_cert: '',
        mch_public_cert_path: '',
    },  
    alipay_config:{
        app_secret_cert: '',
        app_public_cert_path: '',
        alipay_public_cert_path: '',
        alipay_root_cert_path: '',
        app_id: '' 
    }
}
const formData: Record<string, any> = reactive({ ...initialFormData })


// 获取提款信息
const transferInfoF = async () =>{
    loading.value = true;
    let val = await (await getTransferInfo('transfer')).data
    if(val && val.length){
        formData.wechatpay_config = val[0].config
        formData.alipay_config = val[1].config
    }
    loading.value = false;
}
transferInfoF();

const formRef = ref<FormInstance>()
// 表单验证规则
const formRules = computed(() => {
    return {
        'wechatpay_config.mch_id': [
            { required: true, message: t('mchIdPlaceholder'), trigger: 'blur' }
        ],
        'wechatpay_config.mch_secret_key': [
            { required: true, message: t('mchSecretKeyPlaceholder'), trigger: 'blur' }
        ],
        'wechatpay_config.mch_secret_cert': [
            { required: true, message: t('mchSecretCertPlaceholder'), trigger: 'blur' }
        ],
        'wechatpay_config.mch_public_cert_path': [
            { required: true, message: t('mchPublicCertPathPlaceholder'), trigger: 'blur' }
        ],
        'alipay_config.app_id': [
            { required: true, message: t('appIdPlaceholder'), trigger: 'blur' }
        ],
        'alipay_config.app_secret_cert': [
            { required: true, message: t('appSecretCertPlaceholder'), trigger: 'blur' }
        ],
        'alipay_config.app_public_cert_path': [
            { required: true, message: t('appPublicCertPathPlaceholder'), trigger: 'blur' }
        ],
        'alipay_config.alipay_public_cert_path': [
            { required: true, message: t('alipayPublicCertPathPlaceholder'), trigger: 'blur' }
        ],
        'alipay_config.alipay_root_cert_path': [
            { required: true, message: t('alipayRootCertPathPlaceholder'), trigger: 'blur' }
        ]
    }
})

/**
 * 确认
 * @param formEl
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data = formData;
            setTransferInfo(data).then(res => {
                loading.value = false;
            }).catch(() => {
                loading.value = false;
            })
        }
    })
}
</script>

<style lang="scss" scoped>
:deep(.warm-prompt) {
    .el-alert__description{
        margin: 0;
    }
}
</style>
