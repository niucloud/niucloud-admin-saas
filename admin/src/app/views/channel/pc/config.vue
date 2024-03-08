<template>
    <div class="main-container" v-loading="loading">
        <div class="flex ml-[18px] justify-between items-center mt-[20px]">
			<span class="text-page-title">{{pageName}}</span>
		</div>
        <el-form :model="formData" label-width="150px" ref="formRef" class="page-form">
            <el-card class="box-card !border-none" shadow="never">
                <el-form-item :label="t('preview')" prop="weapp_name">
                    <img class="w-[500px]" src="@/app/assets/images/channel/preview.png" alt="">
                </el-form-item>

                <el-form-item :label="t('isOpen')">
                    <el-switch v-model="formData.is_open"/>
                </el-form-item>

                <el-form-item :label="t('PCDomainName')">
                    <el-input :model-value="formData.request_url" class="input-width" :readonly="true">
                        <template #append>
                            <div class="cursor-pointer" @click="copyEvent(formData.request_url)">{{ t('copy') }}</div>
                        </template>
                    </el-input>
                    <span class="ml-2 cursor-pointer visit-btn" @click="visitFn">{{t('clickVisit')}}</span>
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
import { getUrl } from '@/app/api/sys'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import { getPcConfig, setPcConfig } from "@/app/api/pc"

const route = useRoute()
const pageName = route.meta.title
const loading = ref(true)

const formData = reactive<Record<string, string | boolean | any>>({
    is_open: false,
    request_url: ''
})

const formRef = ref<FormInstance>()

/**
 * 获取pc域名
 */
getUrl().then(res => {
    formData.request_url = res.data.web_url + '/'
    loading.value = false
})

/**
 * 获取pc配置
 */
getPcConfig().then(res => {
    Object.assign(formData, res.data)
    formData.is_open = Boolean(Number(formData.is_open))
    loading.value = false
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

// 点击访问
const visitFn = () => {
    window.open(formData.request_url)
}

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const data = { ...formData }
            data.is_open = Number(data.is_open)
            setPcConfig(data).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped>
.visit-btn{
    color:var(--el-color-primary);
}
</style>
