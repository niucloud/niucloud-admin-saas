<template>
    <div class="main-container" v-loading="loading">
        <div class="flex ml-[18px] justify-between items-center mt-[20px]">
			<span class="text-[24px]">{{pageName}}</span>
		</div>
        <el-form :model="formData" label-width="150px" ref="formRef" class="page-form">
            
            <el-card class="box-card !border-none" shadow="never">
                <el-form-item :label="t('preview')" prop="weapp_name">
                    <img class="w-[500px]" src="@/assets/images/channel/preview.png" alt="">
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
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getUrl } from '@/api/sys'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title

const loading = ref(true)

const formData = reactive<Record<string, string | boolean>>({
    is_open: false,
    request_url: ''
})

const formRef = ref<FormInstance>()
const router = useRouter()


/**
 * 获取pc域名
 */
 getUrl().then(res => {
    formData.request_url = res.data.web_url + '/';
    loading.value = false;
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
</script>

<style lang="scss" scoped>
.visit-btn{
    color:var(--el-color-primary);
}
</style>
