<template>
    <el-dialog v-model="showDialog" :title="t('detail')" width="500px" :destroy-on-close="true">
        <el-scrollbar height="400px" v-loading="loading">
            <el-descriptions :column="1">
                <el-descriptions-item :label="t('username')" label-align="right">{{logData.username}}</el-descriptions-item>
                <el-descriptions-item :label="t('ip')" label-align="right">{{logData.ip}}</el-descriptions-item>
                <el-descriptions-item :label="t('url')" label-align="right"><span class="break-all">{{logData.url}}</span></el-descriptions-item>
                <el-descriptions-item :label="t('type')" label-align="right">{{logData.type}}</el-descriptions-item>
                <el-descriptions-item :label="t('params')" label-align="right">
                    <span class="break-all">{{logData.params}}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-scrollbar>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
// import type { FormInstance } from 'element-plus'
import { getLogInfo } from '@/app/api/site'

const showDialog = ref(false)
const loading = ref(false)

interface LogData {
    username: string
    ip: string,
    url: string,
    type: string,
    params:any
}

const logData = ref<LogData>({
    username: '',
    ip: '',
    url: '',
    type: '',
    params: ''
})
const getLogDetail = async () => {
    logData.value = await (await getLogInfo(id)).data
    loading.value = false
}

let id = 0
const setFormData = async (row: any = null) => {
    loading.value = true
    if (row) {
        id = row.id
        getLogDetail()
    }
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
