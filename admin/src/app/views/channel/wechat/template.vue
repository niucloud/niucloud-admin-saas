<template>
    <div class="main-container p-5">
        <div class="flex justify-between items-center mb-[20px]">
            <span class="text-page-title">{{ pageName }}</span>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane :label="t('wechatAccessFlow')" name="/channel/wechat" />
            <el-tab-pane :label="t('customMenu')" name="/channel/wechat/menu" />
            <el-tab-pane :label="t('wechatTemplate')" name="/channel/wechat/message" />
        </el-tabs>
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="batchAcquisitionFn">{{ t('batchAcquisition')
                }}</el-button>
            </div>
            <el-alert class="warm-prompt !my-[20px]" type="info">
                <template #default>
                    <div class="flex">
                        <el-icon class="mr-2 mt-[2px]" size="18">
                            <Warning />
                        </el-icon>
                        <div>
                            <p class="text-base">{{ t('operationTip') }}</p>
                            <p class="text-base">1、{{ t('operationTipOne') }}</p>
                            <p class="text-base">2、{{ t('operationTipTwo') }}</p>
                            <p class="text-base">3、{{ t('operationTipThree') }}</p>
                            <p class="text-base">4、{{ t('operationTipFour') }}</p>
                        </div>
                    </div>
                </template>
            </el-alert>
            <div class="mt-[10px]">
                <el-table :data="cronTableData.data" size="large" v-loading="cronTableData.loading">
                    <template #empty>
                        <span>{{ !cronTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="name" :show-overflow-tooltip="true" :label="t('name')" min-width="150" />

                    <el-table-column :label="t('messageType')" min-width="100" align="center">
                        <template #default="{ row }">
                            <span>{{ row.message_type == 1 ? t('buyerNews') : t('sellerMessage') }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('isStart')" min-width="100" align="center">
                        <template #default="{ row }">
                            {{ row.is_wechat == 1 ? t('startUsing') : t('statusDeactivate') }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('response')" min-width="180">
                        <template #default="{ row }">
                            <div v-for="(item, index) in row.wechat.content" :key="'a' + index" class="text-left">
                                {{ item.join("：") }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="wechat_template_id" :label="t('serialNumber')" min-width="140" />

                    <el-table-column :label="t('operation')" fixed="right" align="right" width="200">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoSwitch(row)">{{ row.is_wechat == 1 ? t('close') :
                                t('open') }}</el-button>
                            <el-button type="primary" link @click="batchAcquisitionFn(row)">{{ t('regain') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getTemplateList, getBatchAcquisition } from '@/app/api/wechat'
import { editNoticeStatus } from '@/app/api/notice'
import { AnyObject } from '@/types/global'
import { ElLoading } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const cronTableData = reactive({
    loading: true,
    data: []
})
const activeName = ref('/channel/wechat/message')
const handleClick = (val: any) => {
    router.push({ path: activeName.value })
}
/**
 * 获取消息模板列表
 */
const loadCronList = (page: number = 1) => {
    cronTableData.loading = true

    getTemplateList().then(res => {
        cronTableData.loading = false
        cronTableData.data = res.data
    }).catch(() => {
        cronTableData.loading = false
    })
}
loadCronList()

/**
 * 批量获取
 */
const batchAcquisitionFn = (row: AnyObject | null = null) => {
    const loading = ElLoading.service({ lock: true, background: 'rgba(0, 0, 0, 0)' })
    getBatchAcquisition({ keys: row ? [row.key] : [] }).then(() => {
        loadCronList()
        loading.close()
    }).catch(() => {
        loading.close()
    })
}

/**
 * 开启或关闭模版消息
 */
interface Switch {
    key: string;
    type: string;
    status: number
}

const infoSwitch = (res: AnyObject) => {
    const data = ref<Switch>({
        key: '',
        type: '',
        status: 0
    })
    data.value.status = res.is_wechat ? 0 : 1
    data.value.key = res.key
    data.value.type = 'wechat'
    cronTableData.loading = true
    editNoticeStatus(data.value).then(res => {
        loadCronList()
    }).catch(() => {
        cronTableData.loading = false
    })
}
</script>
<style lang="scss" scoped>
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

}</style>
