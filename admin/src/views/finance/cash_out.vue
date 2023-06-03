<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center mb-[5px]">
                <span class="text-[24px]">{{pageName}}</span>
            </div>
            <el-card class="box-card !border-none base-bg !px-[35px]" shadow="never">
			    <el-row class="flex">
                    <el-col :span="12">
						<div class="statistic-card">
                            <el-statistic :value="statistics.transfered ? Number.parseFloat(statistics.transfered).toFixed(2) : '0.00'"></el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item text-[14px] text-[#666]">
                                    <span>{{ t('totalTransfered') }}</span>
                                </div>
                            </div>
                        </div>
					</el-col>
					<el-col :span="12">
						<div class="statistic-card">
                            <el-statistic :value="statistics.cash_outing ? Number.parseFloat(statistics.cash_outing).toFixed(2) : '0'"></el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item text-[14px] text-[#666]">
                                    <span>{{ t('totalCashOuting') }}</span>
                                </div>
                            </div>
                        </div>
					</el-col>
			    </el-row>
			</el-card>

            <el-card class="box-card !border-none mb-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="orderTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('applyTime')" prop="create_time">
                        <el-date-picker v-model="orderTableData.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
					<el-form-item :label="t('cashOutNumber')" prop="cash_out_no">
					    <el-input v-model="orderTableData.searchParam.cash_out_no" class="w-[240px]"
					        :placeholder="t('cashOutNumberPlaceholder')" />
					</el-form-item>
					
					<el-form-item :label="t('memberInfo')" prop="keyword">
					    <el-input v-model="orderTableData.searchParam.keyword" class="w-[240px]"
					        :placeholder="t('memberInfoPlaceholder')" />
					</el-form-item>
					
					<el-form-item :label="t('cashOutMethod')" prop="transfer_type">
					    <el-select v-model="orderTableData.searchParam.transfer_type" clearable class="input-width">
					        <el-option :label="t('selectPlaceholder')" value="" />
					        <el-option :label="item.name" :value="key" v-for="(item, key) in Transfertype" />
					    </el-select>
					</el-form-item>
					
					<el-form-item :label="t('cashOutStatus')" prop="order_from">
					    <el-select v-model="orderTableData.searchParam.status" clearable class="input-width">
					        <el-option :label="t('selectPlaceholder')" value="" />
					        <el-option :label="item" :value="key" v-for="(item, key) in cashOutStatusList" />
					    </el-select>
					</el-form-item>
					<el-form-item :label="t('auditTime')" prop="audit_time">
					    <el-date-picker v-model="orderTableData.searchParam.audit_time" type="datetimerange"
					        value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
					        :end-placeholder="t('endDate')" />
					</el-form-item>
					<el-form-item :label="t('transferTime')" prop="transfer_time">
					    <el-date-picker v-model="orderTableData.searchParam.transfer_time" type="datetimerange"
					        value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
					        :end-placeholder="t('endDate')" />
					</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadOrderList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="orderTableData.data" size="large" v-loading="orderTableData.loading">
                    <template #empty>
                        <span>{{ !orderTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="order_no" :show-overflow-tooltip="true" :label="t('memberInfo')" align="center" min-width="140">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer " @click="toMember(row.member.member_id)">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.member.headimg" :src="img(row.member.headimg)" alt="" >
                                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/assets/images/default_headimg.png" alt="" >
                                <div class="flex flex flex-col">
                                    <span class="">{{ row.member.nickname || '' }}</span>
                                    <span class="">{{ row.member.mobile || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('cashOutMethod')" align="center" min-width="140" >
                        <template #default="{ row }">
                            {{ Transfertype[row.transfer_type].name }}
                        </template>
                    </el-table-column>

                    <el-table-column  prop="apply_money" :label="t('applicationForWithdrawalAmount')" min-width="140" align="center" />

                    <el-table-column prop="money" :label="t('actualTransferAmount')" min-width="200" align="center"/>
					
                    <el-table-column prop="service_money" :label="t('cashOutCommission')" align="center" min-width="140" />

                    <el-table-column prop="status_name" :label="t('cashOutStatus')" align="center" min-width="100" />

                    <el-table-column :label="t('applyTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
					
					<el-table-column :label="t('auditTime')" min-width="180" align="center">
					    <template #default="{ row }">
					        {{ row.audit_time || '' }}
					    </template>
					</el-table-column>
					
					<el-table-column :label="t('transferTime')" min-width="180" align="center">
					    <template #default="{ row }">
					        {{ row.transfer_time || '' }}
					    </template>
					</el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" width="230">
                        <template #default="{ row }">
                            <el-button v-for="(item,index) in operationBtn[row.status.toString()].value" :key="index+'a'" @click="fnProcessing(operationBtn[row.status.toString()].clickArr[index],row)" type="primary" link>{{ item }}</el-button>
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

        <!-- 详情 -->
        <el-dialog v-model="cashOutShowDialog" :title="t('cashOutDetail')" width="500px" :destroy-on-close="true">
            <el-form :model="cashOutInfo" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="cashOutLoading">
                <el-form-item :label="t('nickname')">
                    <div class="input-width"> {{ cashOutInfo.nickname }} </div>
                </el-form-item>
                <el-form-item :label="t('cashOutAccountType')">
                    <div class="input-width"> {{ cashOutInfo.account_type_name }} </div>
                </el-form-item>
                <el-form-item :label="t('cashOutMethod')">
                    <div class="input-width"> {{ Transfertype[cashOutInfo.transfer_type].name }} </div>
                </el-form-item>
                <el-form-item :label="t('applicationForWithdrawalAmount')">
                    <div class="input-width"> {{ cashOutInfo.apply_money }} </div>
                </el-form-item>
                <el-form-item :label="t('cashOutCommission')">
                    <div class="input-width"> {{ cashOutInfo.service_money }} </div>
                </el-form-item>
                <el-form-item :label="t('actualTransferAmount')">
                    <div class="input-width"> {{ cashOutInfo.money }} </div>
                </el-form-item>
                <el-form-item :label="t('cashOutStatus')">
                    <div class="input-width"> {{ cashOutInfo.status_name }} </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="cashOutShowDialog = false">{{t('confirm')}}</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 是否审核 -->
        <el-dialog v-model="auditShowDialog" :title="t('rejectionAudit')" width="500px" :destroy-on-close="true">
            <el-form :model="auditFailure" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('reasonsRefusal')" prop="label_name">
                    <el-input v-model="auditFailure.refuse_reason" clearable :placeholder="t('reasonsRefusalPlaceholder')" class="input-width" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="auditShowDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{t('confirm')}}</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 是否转账 -->
        <el-dialog v-model="transferShowDialog" :title="t('rejectionAudit')" width="500px" :destroy-on-close="true">
            <p>{{t('isTransfer')}}</p>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="transferShowDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="confirm(formRef)">{{t('confirm')}}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getCashOutList, getTransfertype, memberTransfer, memberAudit, getCashOutDetail, getCashOutStatusList,getCashOutStat } from '@/api/member'
import { img } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'
import { data } from 'dom7'
import { useRouter, useRoute } from 'vue-router'

const cashOutStatusList = ref([])
const checkStatusList = async () => {
    cashOutStatusList.value = await (await getCashOutStatusList({})).data
}
checkStatusList()

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title;
const member_id: number = parseInt(route.query.id || 0)
const operationBtn = ref({
    "1": {
        value: [t('successfulAudit'),t('auditFailure'),t('detail')],
        clickArr: ['successfulAuditFn','auditFailureFn','detailFn']
    },
    "2": {
        value: [t('transfer'),t('detail')],
        clickArr: ['transferFn','detailFn']
    },
    "3": {
        value: [t('detail')],
        clickArr: ['detailFn']
    },
    "-1": {
        value: [t('detail')],
        clickArr: ['detailFn']
    },
    "-2": {
        value: [t('detail')],
        clickArr: ['detailFn']
    }
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
        status: '',
		cash_out_no: '',
		keyword: '',
		audit_time: '',
		transfer_time: '',
		transfer_type: ''
    }
})

const statistics = ref([])
const checkStatInfo = () => {
	getCashOutStat().then(res => {
		statistics.value = res.data;
	 })
}
checkStatInfo()


// 获取会员转账方式
const Transfertype = ref<Array<Object>>([])
const getTransfertypeFn = async()=>{
    Transfertype.value = await (await getTransfertype()).data
}
getTransfertypeFn()


const searchFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined)=>{
    if (!formEl) return
    
    formEl.resetFields();
    loadOrderList();
}

/**
 * 获取提现列表
 */
const loadOrderList = (page: number = 1) => {
    orderTableData.loading = true
    orderTableData.page = page

    getCashOutList({
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

// 函数总处理
let auditFailure = ref({refuse_reason:'',id:0,action: 0})
let auditShowDialog = ref(false);
const fnProcessing = (type:string, data: any)=>{
    let obj = {}
    if(['successfulAuditFn','auditFailureFn'].includes(type)){
        obj.id = data.id;
        if(type == 'successfulAuditFn'){
            obj.action = 'agree';
            cashOutAuditFn(obj)
        }else{
            obj.action = 'refuse';
            auditFailure.value =  Object.assign(auditFailure.value,obj);
            auditShowDialog.value = true;
        }
    }else if(type == 'transferFn'){
        obj.id = data.id;
        ElMessageBox.confirm(`${t('isTransfer')}`,`${t('transfer')}`)
        .then(() => {
            transferFn(obj);
        })
    }else{
        detailFn(data.id);
    }
}


/**
 * 转账
 * @param data
 */
const transferFn = (data)=>{
    memberTransfer({...data}).then(res => {
        loadOrderList()
    }).catch(() => {
        loadOrderList()
    })
}

/**
 * 详情
 * @param data
 */

let cashOutShowDialog = ref(false);
let cashOutInfo = ref({});
let cashOutLoading = ref(true);
const detailFn = (id)=>{
    getCashOutDetail(id).then(res => {
        cashOutInfo.value = res.data;
        cashOutShowDialog.value = true;
        cashOutLoading.value = false;
    }).catch(() => {
        loadOrderList()
    })
}

/**
 *  提现审核
 * @param data
 */
const cashOutAuditFn = (data)=>{
    memberAudit({
        ...data
    }).then(res => {
        loadOrderList()
    }).catch(() => {
        loadOrderList()
    })
}

/**
 *  拒绝审核
 * @param data
 */
const confirm = ()=>{
    auditShowDialog.value = false;
    cashOutAuditFn(auditFailure.value);
}

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
