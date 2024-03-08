<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{pageName}}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="payRefundTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('refundNo')" prop="refund_no">
                        <el-input v-model="payRefundTable.searchParam.refund_no" :placeholder="t('refundNoPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="payRefundTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadPayRefundList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="payRefundTable.data" size="large" v-loading="payRefundTable.loading">
                    <template #empty>
                        <span>{{ !payRefundTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="refund_no" :label="t('refundNo')" min-width="200" />
					<el-table-column prop="money" :label="t('refundMoney')" min-width="120" />
                    <el-table-column prop="type_name" :label="t('payType')" min-width="120" />
                    <el-table-column prop="status_name" :label="t('status')" min-width="120" />
					<el-table-column prop="create_time" :label="t('createTime')" min-width="160" />
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="payRefundTable.page" v-model:page-size="payRefundTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="payRefundTable.total"
                        @size-change="loadPayRefundList()" @current-change="loadPayRefundList" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getPayRefundPages } from '@/app/api/pay'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const payRefundTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        refund_no: '',
        create_time: []
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
// const selectData = ref<any[]>([])

/**
 * 获取商品标签列表
 */
const loadPayRefundList = (page: number = 1) => {
    payRefundTable.loading = true
    payRefundTable.page = page

    getPayRefundPages({
        page: payRefundTable.page,
        limit: payRefundTable.limit,
        ...payRefundTable.searchParam
    }).then(res => {
        payRefundTable.loading = false
        payRefundTable.data = res.data.data
        payRefundTable.total = res.data.total
    }).catch(() => {
        payRefundTable.loading = false
    })
}
loadPayRefundList()

const infoEvent = (data:any) => {
    router.push('/finance/refund/detail?refund_no=' + data.refund_no)
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadPayRefundList()
}
</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
