<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <el-card class="box-card !border-none my-[16px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="orderTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="orderTableData.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadOrderList()">{{ t('search') }}</el-button>
                        <el-button @click="searchFormRef?.resetFields()">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[16px]">
                <el-table :data="orderTableData.data" size="large" v-loading="orderTableData.loading">
                    <template #empty>
                        <span>{{ !orderTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="order_no" :show-overflow-tooltip="true" :label="t('memberInfo')" align="center" min-width="140">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer " @click="toMember(row.member_id)">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.headimg" :src="img(row.headimg)" alt="" >
                                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/assets/images/default_headimg.png" alt="" >
                                <div class="flex flex flex-col">
                                    <span class="text-blue-700">{{ row.nickname || '' }}</span>
                                    <span class="text-blue-700">{{ row.mobile || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('withdrawalMethod')" align="center" min-width="140" >
                        <template #default="{ row }">
                            {{ Transfertype[row.transfer_type].name }}
                        </template>
                    </el-table-column>

                    <el-table-column  prop="apply_money" :label="t('applicationForWithdrawalAmount')" min-width="120" align="center" />

                    <el-table-column prop="service_money" :label="t('withdrawalCommission')" align="center" min-width="140" />

                    <el-table-column prop="money" :label="t('actualTransferAmount')" min-width="120" align="center" />

                    <el-table-column prop="" :label="t('withdrawalStatus')" align="center" min-width="140" >
                        <template #default="{ row }">
                            {{ auditStatus[row.status.toString()] }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('applyTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>

                    <!-- <el-table-column :label="t('operation')" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                        </template>
                    </el-table-column> -->

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="orderTableData.page" v-model:page-size="orderTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="orderTableData.total"
                        @size-change="loadOrderList()" @current-change="loadOrderList" />
                </div>
            </div>

        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getWithdrawList, getTransfertype } from '@/api/member'
import { img } from '@/utils/common'
import { ElMessageBox } from 'element-plus'
import { data } from 'dom7'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const member_id: number = parseInt(route.query.id || 0)
const auditStatus = ref({
    "1": t('toBeTransferred'),
    "2": t('transferred'),
    "-1": t('turnDown')
}); 


const orderTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        order_no: '',
        member_id,
        create_time: [],
        order_from: ''
    }
})

// 获取会员转账方式
const Transfertype = ref<Array<Object>>([])
const getTransfertypeFn = async()=>{
    Transfertype.value = await (await getTransfertype()).data
}
getTransfertypeFn()

/**
 * 获取提现列表
 */
const loadOrderList = (page: number = 1) => {
    orderTableData.loading = true
    orderTableData.page = page

    getWithdrawList({
        page: orderTableData.page,
        limit: orderTableData.limit,
        ...orderTableData.searchParam
    }).then(res => {
        orderTableData.loading = false
        orderTableData.data = res.data.data
        orderTableData.total = res.data.total
    }).catch(() => {
        orderTableData.loading = false
    })
}
loadOrderList()

/**
 * 订单详情
 * @param data
 */
const infoEvent = (data: any) => {
    router.push(`/finance/recharge/detail?order_id=${data.order_id}`)
}


/**
 * 会员详情
 */
const toMember = (member_id: number) => {
    router.push(`/member/detail?id=${member_id}`)
}

</script>

<style lang="scss" scoped></style>
