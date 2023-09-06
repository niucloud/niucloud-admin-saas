<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <el-card class="box-card !border-none my-[16px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="cronTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="cronTableData.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('lastTime')" prop="last_time">
                        <el-date-picker
                            v-model="cronTableData.searchParam.last_time"
                            type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadCronList()">{{ t('search') }}</el-button>
                        <el-button @click="searchFormRef?.resetFields()">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[16px]">
                <el-table :data="cronTableData.data" size="large" v-loading="cronTableData.loading">

                    <template #empty>
                        <span>{{ !cronTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    
                    <el-table-column prop="title" :show-overflow-tooltip="true" :label="t('title')" min-width="150" />
                    <el-table-column prop="type_name" :label="t('typeName')" min-width="120" />
                    
                    <el-table-column :label="t('crondType')" min-width="180" align="center">
                        <template #default="{ row }">
                            <span v-if="row.type == 'crond'">{{ row.crond_length }}{{ row.crond_type_name }}</span>
                            <span v-else>{{ t('cron') }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="count" :label="t('count')" min-width="120" />

                    <el-table-column :label="t('lastTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.last_time || '' }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('nextTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.next_time || '' }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" width="100">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="cronTableData.page" v-model:page-size="cronTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="cronTableData.total"
                        @size-change="loadCronList()" @current-change="loadCronList" />
                </div>
            </div>

        </el-card>
        <cron-info ref="cronDialog" @complete="loadCronList" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getCronList } from '@/api/sys'
import { img } from '@/utils/common'
import { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import CronInfo from '@/views/setting/components/cron-info.vue'

const cronTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        title: '',
        type:'',
        last_time:''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取任务列表
 */
const loadCronList = (page: number = 1) => {
    cronTableData.loading = true
    cronTableData.page = page

    getCronList({
        page: cronTableData.page,
        limit: cronTableData.limit,
        ...cronTableData.searchParam
    }).then(res => {
        cronTableData.loading = false
        cronTableData.data = res.data.data
        cronTableData.total = res.data.total
    }).catch(() => {
        cronTableData.loading = false
    })
}
loadCronList()

const router = useRouter()

const cronDialog: Record<string, any> | null = ref(null)
/**
 * 查看任务
 * @param data
 */
const infoEvent = (data: any) => {
    cronDialog.value.setFormData(data)
    cronDialog.value.showDialog = true
}
 
</script>

<style lang="scss" scoped></style>
