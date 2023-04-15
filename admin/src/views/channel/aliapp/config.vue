<template>
    <div class="main-container">
        <el-form :model="formData" label-width="200px" ref="formRef" class="page-form"
            v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title">{{ t('aliappSet') }}</h3>

                <el-form-item :label="t('aliappName')">
                    <el-input v-model="formData.name" :placeholder="t('aliappNamePlaceholder')" class="input-width"
                        clearable />
                </el-form-item>

                <el-form-item :label="t('aliappQrcode')">
                    <upload-image v-model="formData.qrcode" />
                    <div class="form-tip">{{ t('aliappQrcodeTips') }}</div>
                </el-form-item>

            </el-card>

            <el-card class="box-card !border-none mt-[16px]" shadow="never">
                <h3 class="panel-title">{{ t('aliappDevelopInfo') }}</h3>

                <el-form-item :label="t('aliappOriginal')">
                    <el-input v-model="formData.private_key" :placeholder="t('aliappOriginalPlaceholder')"
                        class="input-width" clearable />
                </el-form-item>

                <el-form-item :label="t('aliappAppid')">
                    <el-input v-model="formData.app_id" :placeholder="t('appidPlaceholder')" class="input-width"
                        clearable />
                </el-form-item>

                <el-form-item :label="t('countersignType')">
                    {{t('certificate')}}
                </el-form-item>

                <el-form-item :label="t('publicKey')">
                    <div class="input-width">
                        <upload-file v-model="formData.public_key_crt" api="upload/cert/aliapp" />
                    </div>
                    <div class="form-tip">{{ t('publicKeyTips') }}</div>
                </el-form-item>
                
                <el-form-item :label="t('alipayPublicKey')">
                    <div class="input-width">
                        <upload-file v-model="formData.alipay_public_key_crt" api="upload/cert/aliapp" />
                    </div>
                    <div class="form-tip">{{ t('alipayPublicKeyTips') }}</div>
                </el-form-item>
                
                <el-form-item :label="t('alipayWithCrt')">
                    <div class="input-width">
                        <upload-file v-model="formData.alipay_with_crt" api="upload/cert/aliapp" />
                    </div>
                    <div class="form-tip">{{ t('alipayWithCrtTips') }}</div>
                </el-form-item>
            </el-card>

            <el-card class="box-card !border-none mt-[16px]" shadow="never">
                <h3 class="panel-title">{{ t('theServerSetting') }}</h3>

                <el-form-item label="AESKey">
                    <el-input v-model="formData.aes_key" :placeholder="t('AESKeyPlaceholder')" class="input-width"  show-word-limit clearable />
                </el-form-item>
            </el-card>

            <el-card class="box-card !border-none mt-[16px]" shadow="never">
                <div class="flex">
                    <h3 class="panel-title">{{ t('functionSetting') }}</h3>
                </div>

                <el-form-item :label="t('serveWhiteList')">
                    <el-input :model-value="formData.request_url" class="input-width"
                        :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(formData.request_url)">{{ t('copy') }}
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
import { setAliappConfig, getAliappConfig, getAliappStatic } from '@/api/aliapp'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance } from 'element-plus'

const loading = ref(true)

const formData = reactive<Record<string, string>>({
    name: '',
    qrcode: '',
    private_key: '',
    app_id: '',
    aes_key: '',
    public_key_crt: '',
    alipay_public_key_crt: '',
    alipay_with_crt: '',
    request_url: ''
})

const formRef = ref<FormInstance>()


/**
 * 获取支付宝配置
 */
getAliappConfig().then(res => {
    Object.assign(formData, res.data)
    loading.value = false
})
/**
 * 获取支付宝静态资源
 */
getAliappStatic().then(res => {
    formData.request_url = res.data.domain
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
            setAliappConfig(formData).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

</script>

<style lang="scss" scoped></style>
