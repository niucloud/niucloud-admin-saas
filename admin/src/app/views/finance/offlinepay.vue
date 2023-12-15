<template>
    <el-card class="box-card !border-none" shadow="never" v-loading="payLoading">
        <!-- 设置支付配置 -->
        <div class="flex justify-between items-center">
            <span class="text-[20px]">{{ pageName }}</span>
        </div>

        <div class="mt-[10px]">
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="payListTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('outTradeNo')" prop="trade_no">
                        <el-input v-model="payListTable.searchParam.out_trade_no"
                            :placeholder="t('outTradeNoPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="payListTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item :label="t('status')" prop="status">
                        <el-select v-model="payListTable.searchParam.status" placeholder="Select">
                            <el-option :label="t('all')" value="" />
                            <el-option :label="t('waitAudit')" value="3" />
                            <el-option :label="t('passed')" value="2" />
                            <el-option :label="t('notPass')" value="-1" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadPayList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-table :data="payListTable.data" size="large" v-loading="payListTable.loading">
                <template #empty>
                    <span>{{ !payListTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column prop="out_trade_no" :label="t('outTradeNo')" min-width="230"
                    :show-overflow-tooltip="true" />
                <el-table-column prop="body" :label="t('body')" min-width="150" :show-overflow-tooltip="true" />
                <el-table-column prop="money" :label="t('money')" min-width="120" align="right" />
                <el-table-column :label="t('createTime')" min-width="150" align="center" :show-overflow-tooltip="true">
                    <template #default="{ row }">
                        {{ row.create_time || '' }}
                    </template>
                </el-table-column>

                <el-table-column :label="t('status')" min-width="150" align="center">
                    <template #default="{ row }">
                        <span v-if="row.status == 3">{{ t('waitAudit') }}</span>
                        <span v-if="row.status == 2" class="text-success">{{ t('passed') }}</span>
                        <span v-if="row.status == -1" class="text-error">{{ t('notPass') }}</span>
                    </template>
                </el-table-column>

                <el-table-column :label="t('operation')" fixed="right" width="240" align="right">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="detailEvent(row)">{{ t('detail') }}</el-button>
                        <span v-if="row.status == 3">
                            <el-button type="success" link @click="passEvent(row)">{{ t('pass') }}</el-button>
                            <el-button type="primary" link @click="refuseEvent(row)">{{ t('refuse') }}</el-button>
                        </span>
                        <el-button type="primary" link @click="voucherEvent(row)">{{ t('voucher') }}</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="payListTable.page" v-model:page-size="payListTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="payListTable.total"
                    @size-change="loadPayList()" @current-change="loadPayList" />
            </div>
        </div>
    </el-card>

    <el-image-viewer :url-list="previewImageList" v-if="imageViewerShow" @close="imageViewerShow = false" :initial-index="0"
        :zoom-rate="1" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { getPayAuditList, payAuditPass, payAuditRefuse } from '@/app/api/sys'
import { AnyObject } from '@/types/global'
import { ElMessageBox, FormInstance } from 'element-plus'
import { img } from '@/utils/common'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const previewImageList = ref<string[]>([])
const imageViewerShow = ref(false)

const payListTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        out_trade_no: '',
        create_time: '',
        status: ''
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadPayList()
}

/**
 * 获取站点账单记录列表
 */
const loadPayList = (page: number = 1) => {
    payListTable.loading = true
    payListTable.page = page

    getPayAuditList({
        page: payListTable.page,
        limit: payListTable.limit,
        ...payListTable.searchParam
    }).then(res => {
        payListTable.loading = false
        payListTable.data = res.data.data
        payListTable.total = res.data.total
    }).catch(() => {
        payListTable.loading = false
    })
}
loadPayList()

const passEvent = (row: AnyObject) => {
    ElMessageBox.confirm(
        t('passTips'),
        t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(({ value }) => {
        payAuditPass(row.out_trade_no)
            .then(() => {
                loadPayList()
            })
            .catch()
    }).catch(() => {

    })
}

const refuseEvent = (row: AnyObject) => {
    ElMessageBox.prompt(t('refuseReason'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        inputErrorMessage: t('refuseReason'),
        inputPattern: /\S/,
        inputType: 'textarea'
    }).then(({ value }) => {
        payAuditRefuse({ out_trade_no: row.out_trade_no, reason: value })
            .then(() => {
                loadPayList()
            })
            .catch()
    }).catch(() => {

    })
}

const voucherEvent = (row: AnyObject) => {
    previewImageList.value[0] = img(row.voucher)
    imageViewerShow.value = true
}

const detailEvent = (row: AnyObject) => {
    router.push(`/finance/pay/detail?id=${row.id}`)
}
</script>

<style lang="scss" scoped></style>
