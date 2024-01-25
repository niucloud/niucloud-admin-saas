<template>
    <div class="w-full h-full bg-page pt-6">
        <div class="main-container flex justify-between" v-loading="balanceTableData.loading">
            <sidebar></sidebar>
            <el-card class="box-card flex-1 ml-4" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span>{{t('myBalance')}}</span>
                    </div>
                </template>
                <div class="px-6">
                    <el-table :data="balanceTableData.data" stripe>
                        <el-table-column prop="account_type_name" :label="t('accountType')" width="180" />
                        <el-table-column prop="account_data" :label="t('changeInAmount')" width="120" />
                        <el-table-column prop="from_type_name" :label="t('modeOfOccurrence')" width="180" />
                        <el-table-column prop="memo" :label="t('remark')" width="180" />
                        <el-table-column prop="create_time" :label="t('occurrenceTime')" />
                    </el-table>
                    <div class="mt-[16px] flex justify-end">
                        <el-pagination v-model:current-page="balanceTableData.page" v-model:page-size="balanceTableData.limit" layout="total, sizes, prev, pager, next, jumper" :total="balanceTableData.total" @size-change="loadBalanceList()" @current-change="loadBalanceList" />
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { UploadProps } from 'element-plus'
import { getBalanceList } from '@/app/api/member'
// 获取会员列表
const balanceTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: []
})
const loadBalanceList = (page: number = 1) => {
    balanceTableData.loading = true
    balanceTableData.page = page

    getBalanceList({
        page: balanceTableData.page,
        limit: balanceTableData.limit,
    }).then(res => {
        balanceTableData.loading = false
        balanceTableData.data = res.data.data
        balanceTableData.total = res.data.total
    }).catch(() => {
        balanceTableData.loading = false
    })
}
loadBalanceList()

</script>

<style lang="scss" scoped>
.box-card{
    border: none !important;
}
.text-color{
    color: var(--jjext-color-brand);
}
</style>
