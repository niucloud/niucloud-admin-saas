<template>
    <div class="main-container">
        <el-form :model="formData" label-width="200px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title">{{ t('weappInfo') }}</h3>

                <el-form-item :label="t('weappName')" prop="weapp_name">
                    <el-input v-model="formData.weapp_name" :placeholder="t('weappNamePlaceholder')" class="input-width"
                        clearable />
                </el-form-item>

                <el-form-item :label="t('weappOriginal')" prop="weapp_original">
                    <el-input v-model="formData.weapp_original" :placeholder="t('weappOriginalPlaceholder')"
                        class="input-width" clearable />
                </el-form-item>

                <el-form-item :label="t('weappQrcode')" prop="qr_code">
                    <upload-image v-model="formData.qr_code" />
                    <div class="form-tip">{{ t('weappQrcodeTips') }}</div>
                </el-form-item>

            </el-card>

            <el-card class="box-card !border-none mt-[16px]" shadow="never">
                <h3 class="panel-title">{{ t('weappDevelopInfo') }}</h3>

                <el-form-item :label="t('weappAppid')" prop="app_id">
                    <el-input v-model="formData.app_id" :placeholder="t('appidPlaceholder')" class="input-width"
                        clearable />
                    <div class="form-tip">{{ t('weappAppidTips') }}</div>
                </el-form-item>

                <el-form-item :label="t('weappAppsecret')" prop="app_secret">
                    <el-input v-model="formData.app_secret" :placeholder="t('appSecretPlaceholder')" class="input-width"
                        clearable />
                    <div class="form-tip">{{ t('weappAppsecretTips') }}</div>
                </el-form-item>

            </el-card>

            <el-card class="box-card !border-none mt-[16px]" shadow="never">
                <h3 class="panel-title">{{ t('theServerSetting') }}</h3>

                <el-form-item label="URL">
                    <el-input :model-value="formData.serve_url" placeholder="Please input" class="input-width"
                        :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(formData.serve_url)">{{ t('copy') }}
                            </div>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="Token" prop="token">
                    <el-input v-model="formData.token" :placeholder="t('tokenPlaceholder')" class="input-width"
                        maxlength="32" show-word-limit clearable />
                    <div class="form-tip">{{ t('tokenTips') }}</div>
                </el-form-item>

                <el-form-item label="EncodingAESKey" prop="encoding_aes_key">
                    <el-input v-model="formData.encoding_aes_key" :placeholder="t('encodingAesKeyPlaceholder')"
                        class="input-width" maxlength="43" show-word-limit clearable />
                    <div class="form-tip">{{ t('encodingAESKeyTips') }}</div>
                </el-form-item>

                <el-form-item :label="t('encryptionType')" prop="encryption_type">
                    <el-radio-group v-model="formData.encryption_type">
                        <el-radio label="0">{{ t('cleartextMode') }}</el-radio>
                        <el-radio label="1">{{ t('compatibleMode') }}</el-radio>
                        <el-radio label="2">{{ t('safeMode') }}</el-radio>
                    </el-radio-group>
                    <div class="form-tip">{{ t('cleartextModeTips') }}</div>
                    <div class="form-tip">{{ t('compatibleModeTips') }}</div>
                    <div class="form-tip">{{ t('safeModeTips') }}</div>
                </el-form-item>
            </el-card>

            <el-card class="box-card !border-none mt-[16px]" shadow="never">
                <div class="flex">
                    <h3 class="panel-title">{{ t('functionSetting') }}</h3>
                </div>

                <el-form-item :label="t('requestUrl')">
                    <el-input :model-value="formData.request_url" placeholder="Please input" class="input-width"
                        :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(formData.request_url)">{{ t('copy') }}
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('socketUrl')">
                    <el-input :model-value="formData.socket_url" placeholder="Please input" class="input-width"
                        :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(formData.socket_url)">{{ t('copy') }}
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('uploadUrl')">
                    <el-input :model-value="formData.upload_url" placeholder="Please input" class="input-width"
                        :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(formData.upload_url)">{{ t('copy') }}
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="t('downloadUrl')">
                    <el-input :model-value="formData.download_url" placeholder="Please input" class="input-width"
                        :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(formData.download_url)">{{ t('copy') }}
                            </div>
                        </template>
                    </el-input>
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
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getWeappConfig, setWeappConfig } from '@/api/weapp'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const loading = ref(true)

const formData = reactive<Record<string, string>>({
    weapp_name: '',
    weapp_original: '',
    app_id: '',
    app_secret: '',
    qr_code: '',
    token: '',
    encoding_aes_key: '',
    encryption_type: '0',
    serve_url: '',
    request_url: '',
    socket_url: '',
    upload_url: '',
    download_url: ''
})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
    weapp_name: [
        { required: true, message: t('weappNamePlaceholder'), trigger: 'blur' }
    ],
    weapp_original: [
        { required: true, message: t('weappOriginalPlaceholder'), trigger: 'blur' }
    ],
    app_id: [
        { required: true, message: t('appidPlaceholder'), trigger: 'blur' }
    ],
    app_secret: [
        { required: true, message: t('appSecretPlaceholder'), trigger: 'blur' }
    ],
    token: [
        { required: true, message: t('tokenPlaceholder'), trigger: 'blur' }
    ],
    encoding_aes_key: [
        { required: true, message: t('encodingAesKeyPlaceholder'), trigger: 'blur' }
    ]
})

/**
 * 获取微信配置
 */
getWeappConfig().then(res => {
    Object.assign(formData, res.data)
    loading.value = false
})

getWeappConfig().then(res => {
    Object.assign(res.data)
})

/**
 * 复制
 */
const { copy, isSupported, copied } = useClipboard()
const copyEvent = (text: string) => {
    if (!isSupported.value) {
        ElMessage({
            message: t('notSupportCopy'),
            type: 'warning'
        })
        return
    }
    copy(text)
}

watch(copied, () => {
    if (copied.value) {
        ElMessage({
            message: t('copySuccess'),
            type: 'success'
        })
    }
})

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            setWeappConfig(formData).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

</script>

<style lang="scss" scoped></style>
