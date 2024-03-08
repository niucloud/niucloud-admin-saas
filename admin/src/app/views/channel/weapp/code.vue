<template>
    <div class="main-container min-h-[300px] p-5">
        <div class="flex justify-between items-center mb-[20px]">
            <span class="text-page-title">{{ pageName }}</span>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane :label="t('weappAccessFlow')" name="/channel/weapp" />
            <el-tab-pane :label="t('subscribeMessage')" name="/channel/weapp/message" />
            <el-tab-pane :label="t('weappRelease')" name="/channel/weapp/code" />
        </el-tabs>
        <el-card class="box-card !border-none" shadow="never">
            <div class="mt-[50px]">
                <el-button type="primary" @click="insert" :loading="uploading" :disabled="weappTableData.loading">{{
                    t('cloudRelease') }}</el-button>
                <el-button @click="localInsert" :disabled="weappTableData.loading">{{ t('localRelease') }}</el-button>
            </div>
            <el-table class="mt-[15px]" :data="weappTableData.data" v-loading="weappTableData.loading" size="default">
                <template #empty>
                    <span>{{ t('emptyData') }}</span>
                </template>
                <el-table-column prop="version" :label="t('code')" align="left" />
                <!-- <el-table-column prop="desc" :label="t('content')" align="left" /> -->
                <el-table-column prop="status_name" :label="t('status')" align="left">
                    <template #default="{ row }">
                        <div>{{ row.status_name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" :label="t('createTime')" align="center" />
                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                    <template #default="{ row, $index }">
                        <div class="" v-if="previewContent && $index == 0 && row.status == 1 && weappTableData.page == 1">
                            <el-tooltip :content="previewContent" raw-content effect="light">
                                <el-button type="primary" link>
                                    {{ t('preview') }}</el-button>
                            </el-tooltip>
                            <el-button type="primary" link v-if="row.status == -1" @click="handleFailReason(row)">
                                {{ t('failReason') }}</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="weappTableData.page" v-model:page-size="weappTableData.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="weappTableData.total"
                    @size-change="getWeappVersionListFn" @current-change="getWeappVersionListFn" />
            </div>
        </el-card>
        <el-dialog v-model="dialogVisible" :title="t('codeDownTwoDesc')" width="30%" :before-close="handleClose">
            <el-form ref="ruleFormRef" :model="form" label-width="120px">
                <el-form-item prop="code" :label="t('code')">
                    <el-input v-model="form.code" :placeholder="t('codePlaceholder')"
                        onkeyup="this.value = this.value.replace(/[^\d\.]/g,'');" />
                </el-form-item>
                <el-form-item prop="path" :label="t('path')">
                    <upload-file v-model="form.path" :api="'weapp/upload'" :accept="'.zip'" />
                </el-form-item>
                <el-form-item :label="t('content')">
                    <el-input type="textarea" v-model="form.content" :placeholder="t('contentPlaceholder')" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="insert">
                        {{ t('confirm') }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="failReasonDialogVisible" :title="t('failReason')" width="60%">
            <el-scrollbar class="h-[60vh] w-full whitespace-pre p-[20px]">
                {{ failReason }}
            </el-scrollbar>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { setWeappVersion, getWeappPreview, getWeappVersionList, getWeappUploadLog, getWeappConfig } from '@/app/api/weapp'
import { t } from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { getAuthinfo } from '@/app/api/module'
import { ElMessageBox } from 'element-plus'
import { AnyObject } from '@/types/global'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
// const activeNames = ref('1')
const dialogVisible = ref(false)
const weappTableData:{
    page: number,
    limit: number,
    total: number,
    loading: boolean,
    data: AnyObject
} = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: []
})
const form = ref({
    desc: '',
    code: '',
    path: '',
    content: ''
})

const authCode = ref('')
getAuthinfo().then(res => {
    if (res.data.data && res.data.data.auth_code) {
        authCode.value = res.data.data.auth_code
        getWeappPreviewImage()
    }
}).catch(() => {
})

const weappConfig = ref<{
    app_id:string,
    app_secret:string
}>({
    app_id: '',
    app_secret: ''
})
getWeappConfig().then(res => {
    weappConfig.value = res.data
})

const activeName = ref('/channel/weapp/code')
const handleClick = (val: any) => {
    router.push({ path: activeName.value })
}
const ruleFormRef = ref<any>(null)

/**
 * 获取版本列表
 */
const getWeappVersionListFn = (page: number = 1) => {
    weappTableData.loading = true
    weappTableData.page = page

    getWeappVersionList({
        page: weappTableData.page,
        limit: weappTableData.limit
    }).then(res => {
        weappTableData.loading = false
        weappTableData.data = res.data.data
        weappTableData.total = res.data.total
        if (page == 1 && weappTableData.data.length && weappTableData.data[0].status == 0) getWeappUploadLogFn(weappTableData.data[0].task_key)
    }).catch(() => {
        weappTableData.loading = false
    })
}

getWeappVersionListFn()

const handleClose = () => {
    ruleFormRef.value.clearValidate()
}

const uploading = ref(false)
const insert = () => {
    if (!authCode.value) {
        authElMessageBox()
        return
    }
    if (!weappConfig.value.app_id) {
        configElMessageBox()
        return
    }

    if (uploading.value) return
    uploading.value = true

    previewContent.value = ''

    setWeappVersion(form.value).then(res => {
        getWeappVersionListFn()
        getWeappPreviewImage()
        uploading.value = false
    }).catch(() => {
        uploading.value = false
    })
}

const localInsert = () => {
    ElMessageBox.alert(t('localInsertTips'), t('warning'), {
        confirmButtonText: t('confirm')
    })
}

const previewContent = ref('')
const getWeappPreviewImage = () => {
    if (!authCode.value) return
    getWeappPreview()
        .then(res => {
            if (res.data) previewContent.value = `<img src="${res.data}" class="w-[150px]">`
        })
        .catch()
}

const getWeappUploadLogFn = (key: string) => {
    getWeappUploadLog(key).then(res => {
        const data = res.data.data ?? []
        if (data[0] && data[0].length) {
            const last = data[0][data[0].length - 1]
            if (last.code == 0) {
                getWeappVersionListFn()
                return
            }
            if (last.code == 1 && last.percent == 100) {
                getWeappVersionListFn()
                getWeappPreviewImage()
                return
            }
            setTimeout(() => {
                getWeappUploadLogFn(key)
            }, 2000)
        }
    })
}

const authElMessageBox = () => {
    ElMessageBox.confirm(
        t('authTips'),
        t('warning'),
        {
            distinguishCancelAndClose: true,
            confirmButtonText: t('toBind'),
            cancelButtonText: t('toNiucloud')
        }
    ).then(() => {
        router.push({ path: '/app/authorize' })
    }).catch((action: string) => {
        if (action === 'cancel') {
            window.open('https://www.niucloud.com/app')
        }
    })
}

const configElMessageBox = () => {
    ElMessageBox.confirm(
        t('weappTips'),
        t('warning'),
        {
            confirmButtonText: t('toSetting'),
            cancelButtonText: t('cancel')
        }
    ).then(() => {
        router.push({ path: '/channel/weapp/config' })
    }).catch((action: string) => {
    })
}

const failReason = ref('')
const failReasonDialogVisible = ref(false)
const handleFailReason = (data: any) => {
    failReason.value = data.fail_reason
    failReasonDialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.el-collapse {
    border: 0px !important
}

.el-collapse-item .el-collapse-item__wrap {
    border: 0px !important
}

:deep(.el-tabs__item:hover) {
    border-bottom: 2px solid var(--el-color-primary);
}

:deep(.el-tabs__item) {
    padding: 0;
}

:deep(.el-tabs__item+.el-tabs__item) {
    margin-right: 20px;
    margin-left: 20px;
    // border-bottom: 2px solid var(--el-color-primary);
}

:deep(.el-tabs--top) {
    .el-tabs__active-bar {
        display: none;
    }

    .el-tabs__item.is-active {
        border-bottom: 2px solid var(--el-color-primary);
    }

    .el-tabs__item.is-top:nth-child(2) {
        margin-right: 20px;
    }

}
</style>
