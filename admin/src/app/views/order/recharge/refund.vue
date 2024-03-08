<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">
			<div class="flex justify-between items-center mb-[5px]">
				<span class="text-page-title">{{ pageName }}</span>
			</div>

			<el-card class="box-card !border-none table-search-wra base-bg !px-[35px]" shadow="never">
				<el-row class="flex">
					<el-col :span="12">
						<div class="statistic-card">
							<el-statistic :value="refundStat.refund_all_money"></el-statistic>
							<div class="statistic-footer">
								<div class="footer-item text-[14px] text-[#666]">
									<span>{{ t('accumulateRefundMoney') }}</span>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="statistic-card">
							<el-statistic :value="refundStat.refund_have_money"></el-statistic>
							<div class="statistic-footer">
								<div class="footer-item text-[14px] text-[#666]">
									<span>{{ t('haveRefundMoney') }}</span>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-card>

			<el-card class="box-card !border-none mb-[10px] table-search-wrap" shadow="never">
				<el-form :inline="true" :model="refundTableData.searchParam" ref="searchFormRef">
					<el-form-item :label="t('memberInfo')" prop="keywords">
						<el-input v-model="refundTableData.searchParam.keywords" class="w-[240px]" :placeholder="t('memberInfoPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('refundNumber')" prop="refund_no">
						<el-input v-model="refundTableData.searchParam.refund_no" class="w-[240px]" :placeholder="t('refundNumberPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('orderNumber')" prop="order_no">
						<el-input v-model="refundTableData.searchParam.order_no" class="w-[240px]" :placeholder="t('orderNumberPlaceholder')" />
					</el-form-item>

					<el-form-item :label="t('refundStatus')" prop="status">
						<el-select v-model="refundTableData.searchParam.status" clearable class="input-width">
							<el-option :label="t('selectPlaceholder')" value="" />
							<el-option :label="item.name" :value="key" v-for="(item, key) in refundList" :key="key" />
						</el-select>
					</el-form-item>
					<el-form-item :label="t('refundTime')" prop="create_time">
						<el-date-picker v-model="refundTableData.searchParam.create_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="loadRefundList()">{{ t('search') }}</el-button>
						<el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<div>
				<el-table :data="refundTableData.data" size="large" v-loading="refundTableData.loading">
					<template #empty>
						<span>{{ !refundTableData.loading ? t('emptyData') : '' }}</span>
					</template>

					<el-table-column :show-overflow-tooltip="true" :label="t('memberInfo')" align="left" min-width="140">
						<template #default="{ row }">
							<div class="flex items-center cursor-pointer " @click="toMember(row.member.member_id)">
								<img class="w-[50px] h-[50px] mr-[10px]" v-if="row.member.headimg" :src="img(row.member.headimg)" alt="">
								<img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/app/assets/images/default_headimg.png" alt="">
								<div class="flex flex flex-col">
									<span class="">{{ row.member.nickname || '' }}</span>
									<span class="">{{ row.member.mobile || '' }}</span>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="refund_no" :label="t('refundNumber')" align="center" min-width="200" />
					<el-table-column prop="item.item_name" :label="t('refundSource')" align="center" min-width="140" />
					<el-table-column prop="money" :label="t('refundAmount')" align="center" min-width="140" />
					<el-table-column :label="t('refundTime')" min-width="180" align="center">
						<template #default="{ row }">
							{{ row.create_time || '' }}
						</template>
					</el-table-column>
					<el-table-column :label="t('statusName')" min-width="180" align="center">
						<template #default="{ row }">
							{{ row.status_name || '' }}
						</template>
					</el-table-column>

					<el-table-column :label="t('operation')" align="right" fixed="right" width="130">
						<template #default="{ row }">
							<el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
						</template>
					</el-table-column>

				</el-table>
				<div class="mt-[16px] flex justify-end">
					<el-pagination v-model:current-page="refundTableData.page" v-model:page-size="refundTableData.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="refundTableData.total"
						@size-change="loadRefundList()" @current-change="loadRefundList" />
				</div>
			</div>

		</el-card>

		<el-dialog v-model="refundInfoShowDialog" :title="t('refundDetail')" width="500px" :destroy-on-close="true">
			<el-form :model="refundInfo" label-width="120px" ref="formRef" :rules="formRules" class="page-form">
				<el-form-item :label="t('nickname')">
					<div class="input-width"> {{ refundInfo.member.nickname }} </div>
				</el-form-item>
				<el-form-item :label="t('refundSource')">
					<div class="input-width"> {{ refundInfo.item.item_name }} </div>
				</el-form-item>
				<el-form-item :label="t('refundAmount')">
					<div class="input-width"> {{ refundInfo.money }} </div>
				</el-form-item>
				<el-form-item :label="t('orderNumber')">
					<div class="input-width"> {{ refundInfo.item.order_no }} </div>
				</el-form-item>
				<el-form-item :label="t('refundNumber')">
					<div class="input-width"> {{ refundInfo.refund_no }} </div>
				</el-form-item>
				<el-form-item :label="t('refundTime')">
					<div class="input-width"> {{ refundInfo.create_time }} </div>
				</el-form-item>
				<el-form-item :label="t('statusName')">
					<div class="input-width"> {{ refundInfo.status_name }} </div>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="refundInfoShowDialog = false">{{ t('confirm') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { useRouter, useRoute } from 'vue-router'
import { getRechargeRefund, getRechargeRefundStatus, getRechargeRefundStat } from '@/app/api/order'
import { FormInstance } from 'element-plus'

const router = useRouter()
const route = useRoute()
const pageName = route.meta.title
const searchFormRef = ref<FormInstance>()
const refundTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        refund_no: '',
        // member_id,
        create_time: [],
        status: '',
        keywords: '',
        order_no: ''
    }
})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadRefundList()
}
/**
 * 获取退款列表
 */
const loadRefundList = (page: number = 1) => {
    refundTableData.loading = true
    refundTableData.page = page

    getRechargeRefund({
        page: refundTableData.page,
        limit: refundTableData.limit,
        ...refundTableData.searchParam
    }).then(res => {
        refundTableData.loading = false
        refundTableData.data = res.data.data
        refundTableData.total = res.data.total
    }).catch(() => {
        refundTableData.loading = false
    })
}
loadRefundList()

const refundList = ref([])
const checkRefundList = () => {
    getRechargeRefundStatus().then(res => {
        refundList.value = res.data
    })
}
checkRefundList()

const refundStat = reactive({
    refund_all_money: 0.00,
    refund_have_money: 0.00,
    refund_Success_money: 0.00,
    refund_fail_moey: 0.00
})
const checkRefundStat = () => {
    getRechargeRefundStat().then(res => {
        refundStat.refund_all_money = res.data.all.money
        refundStat.refund_have_money = res.data.have.money
        refundStat.refund_Success_money = res.data['3'].money
        refundStat.refund_fail_moey = res.data['-1'].money
    })
}
checkRefundStat()

const refundInfoShowDialog = ref(false)
const refundInfo = ref({})

const infoEvent = (info:any) => {
    refundInfo.value = info
    refundInfoShowDialog.value = true
}

/**
 * 会员详情
 */
const toMember = (memberId: number) => {
    router.push(`/member/detail?id=${memberId}`)
}

</script>

<style lang="scss" scoped></style>
