<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <el-alert class="warm-prompt" type="info">
                <template #default>
                    <p class="text-base">{{ t('operationTip') }} 1、{{ t('operationTipOne') }}</p>
                    <p class="text-base">2、{{ t('operationTipTwo') }}</p>
                </template>
            </el-alert>

            <div class="mt-[16px]">
                <el-button class="mb-[15px]" @click="batchAcquisitionFn">{{ t('batchAcquisition') }}</el-button>
                <el-table :data="cronTableData.data" size="large" v-loading="cronTableData.loading">

                    <template #empty>
                        <span>{{ !cronTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="name" :show-overflow-tooltip="true" :label="t('name')" min-width="150" />

                    <el-table-column :label="t('response')" min-width="180">
                        <template #default="{ row }">
                            <div v-for="(item, index) in row.weapp_json.content" :key="'a' + index" class="text-left">{{
                                item.join(":") }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('isStart')" min-width="100" align="center">
                        <template #default="{ row }">
                            {{ row.is_weapp == 1 ? t('startUsing') : t('statusDeactivate') }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="weapp_template_id" :label="t('serialNumber')" min-width="180" />

                    <el-table-column :label="t('operation')" fixed="right" width="140">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoSwitch(row)">{{ row.is_weapp == 1 ? t('close') :
                                t('open') }}</el-button>
                            <el-button type="danger" link @click="batchAcquisitionFn(row)">{{ t('regain') }}</el-button>
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
import { getTemplateList, getBatchAcquisition } from '@/api/weapp'
import { editMessageStatus } from '@/api/notice'
import { ElLoading } from 'element-plus'

const cronTableData = reactive({
    loading: true,
    data: []
})

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
 * 开启或关闭订阅消息
 */
interface Switch {
    key: string;
    type: string;
    status: number
}
const infoSwitch = (res) => {
    const data = ref<Switch>({
        key: '',
        type: '',
        status: 0
    })
    data.value.status = res.is_weapp ? 0 : 1
    data.value.key = res.key
    data.value.type = 'weapp'
    cronTableData.loading = true
    editMessageStatus(data.value).then(res => {
        loadCronList()
    }).catch(() => {
        cronTableData.loading = false
    })
}

</script>

<style lang="scss" scoped>
::v-deep .warm-prompt {
    background-color: var(--el-color-primary-light-9);
}

::v-deep .warm-prompt .el-icon {
    color: var(--el-color-primary);
}

::v-deep .warm-prompt p {
    color: var(--el-color-primary);
}
</style>
