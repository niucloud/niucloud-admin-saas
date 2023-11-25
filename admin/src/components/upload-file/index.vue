<template>
    <el-upload v-bind="upload" class="w-full upload-file">
        <slot>
            <el-input v-model="value" class="w-full" :readonly="true" :title="value">
                <template #append>{{ t('upload.root') }}</template>
            </el-input>
        </slot>
    </el-upload>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { t } from '@/lang'
import { getToken } from '@/utils/common'
import { UploadFile, ElMessage } from 'element-plus'
import storage from '@/utils/storage'

const prop = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    api: {
        type: String,
        default: 'sys/document/document'
    }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return prop.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const upload: Record<string, any> = {
    action: `${import.meta.env.VITE_APP_BASE_URL}/${prop.api}`,
    showFileList: false,
    headers: {},
    accept: '.doc,.docx,.xml,.txt,.pem,.zip,.rar,.7z,.crt,.key',
    onSuccess: (response: any, uploadFile: UploadFile) => {
        if (response.code != undefined && response.code != 1) {
            ElMessage({ message: response.msg, type: 'error' })
            return
        }
        value.value = response.data.url
        ElMessage({ message: t('upload.success'), type: 'success' })
    }
}
upload.headers[import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()
upload.headers[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get('siteId') || 0

</script>

<style lang="scss">
.upload-file .el-upload {
    width: 100%;
}
</style>
