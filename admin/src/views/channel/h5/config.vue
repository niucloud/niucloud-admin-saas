<template>
    <div class="main-container">
        <div class="flex ml-[18px] justify-between items-center mt-[20px]">
			<span class="text-[24px]">{{pageName}}</span>
		</div>
        <el-form :model="formData" label-width="150px" ref="formRef" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <el-form-item :label="t('isOpen')">
                    <el-switch v-model="formData.is_open"/>
                </el-form-item>
                <el-form-item :label="t('h5DomainName')">
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
import { setH5Config, getH5Config } from '@/api/h5'
import { getUrl } from '@/api/sys'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title

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
 getUrl().then(res => {
    formData.request_url = res.data.wap_url + '/'
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
const visitFn = ()=>{
    window.open(formData.request_url);
}

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

<style lang="scss" scoped>
.visit-btn{
    color:var(--el-color-primary);
}
</style>
