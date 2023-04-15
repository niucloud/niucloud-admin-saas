<template>
    <div class="w-full h-full bg-page pt-6">
        <div class="main-container flex justify-between" v-loading="pointTableData.loading">
            <sidebar></sidebar>
            <el-card class="box-card flex-1 ml-4" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span>{{t('myPoint')}}</span>
                    </div>
                </template>
                <div class="px-6">
                    <el-table :data="pointTableData.data" stripe>
                        <el-table-column prop="account_type_name" :label="t('accountType')" width="180" />
                        <el-table-column prop="account_data" :label="t('changeInAmount')" width="120" />
                        <el-table-column prop="from_type_name" :label="t('modeOfOccurrence')" width="180" />
                        <el-table-column prop="memo" :label="t('remark')" width="180" />
                        <el-table-column prop="create_time" :label="t('occurrenceTime')" />
                    </el-table>
                    <div class="mt-[16px] flex justify-end">
                        <el-pagination v-model:current-page="pointTableData.page" v-model:page-size="pointTableData.limit"
                            layout="total, sizes, prev, pager, next, jumper" :total="pointTableData.total"
                            @size-change="loadPointList()" @current-change="loadPointList" />
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { UploadProps } from 'element-plus'
import { getPointList } from '@/api/member'
// 获取会员列表
const pointTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: []
})
const loadPointList = (page: number = 1) => {
    pointTableData.loading = true
    pointTableData.page = page

    getPointList({
        page: pointTableData.page,
        limit: pointTableData.limit,
    }).then(res => {
        pointTableData.loading = false
        pointTableData.data = res.data.data
        pointTableData.total = res.data.total
    }).catch(() => {
        pointTableData.loading = false
    })
}
loadPointList()

</script>

<style lang="scss" scoped>
.box-card{
    border: none !important;
}
.text-color{
    color: var(--jjext-color-brand);
}
</style>