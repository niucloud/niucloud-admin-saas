<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <el-card class="box-card !border-none mb-[16px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="orderTableData.searchParam" ref="searchFormRef">
                    <!-- <el-form-item :label="t('orderNo')" prop="order_no">
                        <el-input v-model="orderTableData.searchParam.order_no" :placeholder="t('orderNoPlaceholder')" />
                    </el-form-item> -->

                    <el-form-item :label="t('orderFromName')" prop="order_from">
                        <el-select v-model="orderTableData.searchParam.order_from" clearable class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item" :value="key" v-for="(item, key) in channelList" />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('orderStatus')" prop="order_status">
                        <el-select v-model="orderTableData.searchParam.order_status" clearable class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item['name']" :value="item['status']" v-for="item in statusList" />
                        </el-select>
                    </el-form-item>
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

                    <el-table-column prop="order_no" :show-overflow-tooltip="true" :label="t('orderNo')" align="center"
                        min-width="140" />

                    <el-table-column prop="order_money" :label="t('orderMoney')" align="center" min-width="140" />

                    <el-table-column :label="t('member')" min-width="120" align="center">
                        <template #default="{ row }">
                            <div class="flex flex flex-col cursor-pointer" @click="toMember(row.member_id)">
                                <span class="text-blue-700">{{ row.member.nickname || '' }}</span>
                                <span class="text-blue-700">{{ row.member.mobile || '' }}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="order_from_name" :label="t('orderFromName')" align="center" min-width="140" />

                    <el-table-column :label="t('orderStatus')" min-width="120" align="center">
                        <template #default="{ row }">
                            {{ row.order_status_info.name }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="pay_type_name" :label="t('payTypeName')" align="center" min-width="140" />

                    <el-table-column :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>

                            <el-button v-if="[1, 10].includes(row.order_status_info.status)" type="primary" link @click="refundBtnFn(row)">{{ t('refundBtn') }}</el-button>

                            <template v-for="(item, index) in row.order_status_info.action">
                                <el-button type="danger" link @click="orderEvent(row, item.class)">{{ item.name }}</el-button>
                            </template>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="orderTableData.page" v-model:page-size="orderTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="orderTableData.total"
                        @size-change="loadOrderList()" @current-change="loadOrderList" />
                </div>
            </div>
        </el-card>

        <!-- 是否退款 -->
        <el-dialog v-model="refundShowDialog" :title="t('refundBtn')" width="500px" :destroy-on-close="true">
            <p>{{t('refundContent')}}</p>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="refundShowDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getRechargeOrderStatusList, getRechargeOrderList, rechargeRefund } from '@/api/order'
import { getChannelType } from '@/api/sys'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const member_id: number = parseInt(route.query.id || 0)

const channelList = ref([])
const setChannelList = async () => {
    channelList.value = await (await getChannelType({})).data
}
setChannelList()

const orderTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        order_no: '',
        order_status: '',
        member_id,
        create_time: [],
        order_from: ''
    }
})
const statusList = ref([])

const searchFormRef = ref<FormInstance>()

const setCategoryList = async () => {
    statusList.value = await (await getRechargeOrderStatusList({})).data
}
setCategoryList()

/**
 * 获取文章列表
 */
const loadOrderList = (page: number = 1) => {
    orderTableData.loading = true
    orderTableData.page = page

    getRechargeOrderList({
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
 * 订单操作
 */
const orderEvent = (data: any, type: string) => {

}
/**
 * 退款操作
 */
let refundShowDialog = ref(false);
const refundFn = (data) => {
    console.log("退款操作",data);
    refundShowDialog.value = true;
    rechargeRefund(data.order_id).then(res => {
        refundShowDialog.value = false;
    }).catch(() => {

    })


    // getRechargeOrderList({
    //     page: orderTableData.page,
    //     limit: orderTableData.limit,
    //     ...orderTableData.searchParam
    // }).then(res => {
    //     orderTableData.loading = false
    //     orderTableData.data = res.data.data
    //     orderTableData.total = res.data.total
    // }).catch(() => {
    //     orderTableData.loading = false
    // })
}

/**
 * 会员详情
 */
const toMember = (member_id: number) => {
    router.push(`/member/detail?id=${member_id}`)
}

</script>

<style lang="scss" scoped></style>
