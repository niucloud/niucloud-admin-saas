<template>
    <div class="main-container">
        <el-form :model="formData" label-width="200px" ref="formRef" class="page-form"
            v-loading="loading">
            <el-card class="box-card !border-none mt-[16px]" shadow="never">
                <div class="flex">
                    <h3 class="panel-title">{{ t('H5Info') }}</h3>
                </div>
 
                <el-form-item :label="t('isOpen')">
                    <el-switch
                        v-model="formData.is_open"
                    />
                </el-form-item>
                <el-form-item :label="t('h5DomainName')">
                    <el-input :model-value="formData.request_url" class="input-width" :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(formData.request_url)">{{ t('copy') }}</div>
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
import { setH5Config, getH5Config } from '@/api/h5'
import { getSceneDomain } from '@/api/sys'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance } from 'element-plus'

const loading = ref(true)

const formData = reactive<Record<string, string | boolean>>({
    is_open: false,
    request_url: ''
})

const formRef = ref<FormInstance>()


/**
 * 获取h5配置
 */
getH5Config().then(res => {
    Object.assign(formData, res.data)
    formData.is_open = Boolean(Number(formData.is_open));
    loading.value = false
})
/**
 * 获取h5域名
 */
getSceneDomain().then(res => {
    formData.request_url = res.data.wap_domain
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
            let data = {...formData};
            data.is_open = Number(data.is_open);
            setH5Config(data).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

</script>

<style lang="scss" scoped></style>
