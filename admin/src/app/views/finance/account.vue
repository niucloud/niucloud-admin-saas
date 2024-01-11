<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">

			<div class="flex justify-between items-center">
				<span class="text-[20px]">{{ pageName }}</span>
			</div>
			<el-card class="box-card !border-none base-bg !px-[35px]" shadow="never">
				<el-row class="flex">
					<el-col :span="8" class="min-w-[100px]">
						<div class="statistic-card">
							<el-statistic
								:value="accountStat.pay ? accountStat.pay.toFixed(2) : '0.00'"></el-statistic>
							<div class="statistic-footer">
								<div class="footer-item text-[14px] text-[#666]">
									<span>{{ t('totalPay') }}</span>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="8" class="min-w-[100px]">
						<div class="statistic-card">
							<el-statistic
								:value="accountStat.refund ? accountStat.refund.toFixed(2) : '0.00'"></el-statistic>
							<div class="statistic-footer">
								<div class="footer-item text-[14px] text-[#666]">
									<span>{{ t('totalRefund') }}</span>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="8" class="min-w-[100px]">
						<div class="statistic-card">
							<el-statistic
								:value="accountStat.transfer ? accountStat.transfer.toFixed(2) : '0.00'"></el-statistic>
							<div class="statistic-footer">
								<div class="footer-item text-[14px] text-[#666]">
									<span>{{ t('totalTransfer') }}</span>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-card>
			<el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
				<el-form :inline="true" :model="siteAccountLogTable.searchParam" ref="searchFormRef">
					<el-form-item :label="t('type')" class="items-center">
						<el-select v-model="siteAccountLogTable.searchParam.type" class="m-2"
							:placeholder="t('accountType')">
							<el-option v-for="(item, index) in accountType" :key="index" :label="item" :value="index" />
						</el-select>
					</el-form-item>
					<el-form-item :label="t('tradeNo')" prop="trade_no">
						<el-input v-model="siteAccountLogTable.searchParam.trade_no"
							:placeholder="t('tradeNoPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('createTime')" prop="create_time">
						<el-date-picker v-model="siteAccountLogTable.searchParam.create_time" type="datetimerange"
							value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="loadSiteAccountLogList()">{{ t('search') }}</el-button>
						<el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<div class="mt-[10px]">
				<el-table :data="siteAccountLogTable.data" size="large" v-loading="siteAccountLogTable.loading">
					<template #empty>
						<span>{{ !siteAccountLogTable.loading ? t('emptyData') : '' }}</span>
					</template>
					<el-table-column prop="trade_no" :label="t('tradeNo')" min-width="120" />
					<el-table-column prop="type_name" :label="t('type')" min-width="120" />
					<el-table-column prop="money" :label="t('money')" min-width="120" align="right" />
					<el-table-column :label="t('createTime')" min-width="150" align="center">
						<template #default="{ row }">
							{{ row.create_time || '' }}
						</template>
					</el-table-column>

					<el-table-column :label="t('operation')" align="right" fixed="right" min-width="120">
						<template #default="{ row }">
							<el-button type="primary" link @click="detailEvent(row)">{{ t('detail') }}</el-button>
						</template>
					</el-table-column>

				</el-table>
				<div class="mt-[16px] flex justify-end">
					<el-pagination v-model:current-page="siteAccountLogTable.page"
						v-model:page-size="siteAccountLogTable.limit" layout="total, sizes, prev, pager, next, jumper"
						:total="siteAccountLogTable.total" @size-change="loadSiteAccountLogList()"
						@current-change="loadSiteAccountLogList" />
				</div>
			</div>
		</el-card>
		<el-dialog v-model="showDialog" :title="t('accountDetail')" width="550px" :destroy-on-close="true">
			<el-form :model="formData" label-width="110px" ref="formRef" class="page-form">

				<el-form-item :label="t('tradeNo')">
					<div class="input-width"> {{ formData.trade_no }} </div>
				</el-form-item>
				<el-form-item :label="t('type')">
					<div class="input-width"> {{ formData.type_name }} </div>
				</el-form-item>
				<el-form-item :label="t('money')">
					<div class="input-width"> {{ formData.money }} </div>
				</el-form-item>
				<el-form-item :label="t('createTime')">
					<div class="input-width"> {{ formData.create_time }} </div>
				</el-form-item>
				<div v-if="formData.type == 'transfer'">
					<el-form-item :label="t('transferNo')">
						<div class="input-width"> {{ formData.pay_info.transfer_no }} </div>
					</el-form-item>
					<el-form-item :label="t('transferTime')">
						<div class="input-width"> {{ formData.pay_info.transfer_time }} </div>
					</el-form-item>
					<el-form-item :label="t('transferType')">
						<div class="input-width"> {{ formData.pay_info.transfer_type }} </div>
					</el-form-item>
					<el-form-item :label="t('transferMoney')">
						<div class="input-width"> {{ formData.pay_info.money }} </div>
					</el-form-item>
					<el-form-item :label="t('transferRemark')">
						<div class="input-width"> {{ formData.pay_info.remark }} </div>
					</el-form-item>
				</div>
				<div v-if="formData.type == 'refund'">
					<el-form-item :label="t('outTradeNo')">
						<div class="input-width"> {{ formData.pay_info.out_trade_no }} </div>
					</el-form-item>
					<el-form-item :label="t('createTime')">
						<div class="input-width"> {{ formData.pay_info.create_time }} </div>
					</el-form-item>
					<el-form-item :label="t('refundMoney')">
						<div class="input-width"> {{ formData.pay_info.money }} </div>
					</el-form-item>
					<el-form-item :label="t('failReason')">
						<div class="input-width"> {{ formData.pay_info.fail_reason }} </div>
					</el-form-item>
				</div>
				<div v-if="formData.type == 'pay'">
					<el-form-item :label="t('outTradeNo')">
						<div class="input-width"> {{ formData.pay_info.out_trade_no }} </div>
					</el-form-item>
					<el-form-item :label="t('createTime')">
						<div class="input-width"> {{ formData.pay_info.create_time }} </div>
					</el-form-item>
					<el-form-item :label="t('money')">
						<div class="input-width"> {{ formData.pay_info.money }} </div>
					</el-form-item>
					<el-form-item :label="t('body')">
						<div class="input-width"> {{ formData.pay_info.body }} </div>
					</el-form-item>
				</div>

			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="showDialog = false">{{ t('confirm') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getAccountList, getAccountStat, getAccountType } from '@/app/api/site'
// import { img } from '@/utils/common'
import type { FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const siteAccountLogTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        site_id: '',
        type: '',
        money: '',
        trade_no: '',
        create_time: ''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取站点账单记录列表
 */
const loadSiteAccountLogList = (page: number = 1) => {
    siteAccountLogTable.loading = true
    siteAccountLogTable.page = page

    getAccountList({
        page: siteAccountLogTable.page,
        limit: siteAccountLogTable.limit,
        ...siteAccountLogTable.searchParam
    }).then(res => {
        siteAccountLogTable.loading = false
        siteAccountLogTable.data = res.data.data
        siteAccountLogTable.total = res.data.total
    }).catch(() => {
        siteAccountLogTable.loading = false
    })
}
loadSiteAccountLogList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadSiteAccountLogList()
}

const accountType = ref([])
const checkAccountType = () => {
    getAccountType().then(res => {
        accountType.value = res.data
    })
}
checkAccountType()
const showDialog = ref(false)
const formData = ref({
    trade_no: '',
    type_name: '',
    money: 0,
    create_time: '',
    type: '',
    pay_info: {
        transfer_no: '',
        transfer_time: '',
        transfer_type: '',
        money: 0,
        remark: '',
        out_trade_no: '',
        create_time: '',
        fail_reason: '',
        body: ''
    }
})
const detailEvent = (info:any) => {
    showDialog.value = true
    formData.value = info
}

interface AccountStat{
    pay: number,
	refund: number,
	transfer: number
}

const accountStat = ref<AccountStat>({
    pay: 0,
    refund: 0,
    transfer: 0
})
const checkAccountStat = async () => {
    accountStat.value = await (await getAccountStat()).data
}
checkAccountStat()
</script>

<style lang="scss" scoped></style>
