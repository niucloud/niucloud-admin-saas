<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
       
		   <el-card class="box-card !border-none my-[16px] table-search-wrap" shadow="never">
			   <el-form :inline="true" :model="refundTableData.searchParam" ref="searchFormRef">
				<el-form-item :label="t('refundStatus')" prop="order_from">
					<el-select v-model="refundTableData.searchParam.status" clearable class="input-width">
						<el-option :label="t('selectPlaceholder')" value="" />
						<el-option :label="item.name" :value="key" v-for="(item, key) in refundList" />
					</el-select>
				</el-form-item>
				   <el-form-item :label="t('createTime')" prop="create_time">
					   <el-date-picker v-model="refundTableData.searchParam.create_time" type="datetimerange"
						   value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
						   :end-placeholder="t('endDate')" />
				   </el-form-item>
				   <el-form-item>
					   <el-button type="primary" @click="loadRefundList()">{{ t('search') }}</el-button>
					   <el-button @click="searchFormRef?.resetFields()">{{ t('reset') }}</el-button>
				   </el-form-item>
			   </el-form>
		   </el-card>

		   <div class="mt-[16px]">
			   <el-table :data="refundTableData.data" size="large" v-loading="refundTableData.loading">
				   <template #empty>
					   <span>{{ !refundTableData.loading ? t('emptyData') : '' }}</span>
				   </template>

				    <el-table-column prop="order_no" :show-overflow-tooltip="true" :label="t('memberInfo')" align="left" min-width="140">
					   <template #default="{ row }">
						   <div class="flex items-center cursor-pointer " @click="toMember(row.member.member_id)">
							   <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.headimg" :src="img(row.member.headimg)" alt="" >
							   <img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/assets/images/default_headimg.png" alt="" >
							   <div class="flex flex flex-col">
								   <span class="text-blue-700">{{ row.member.nickname || '' }}</span>
								   <span class="text-blue-700">{{ row.member.mobile || '' }}</span>
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

				    <!--  <el-table-column :label="t('operation')" fixed="right" width="230">
					   <template #default="{ row }">
						 <el-button v-for="(item,index) in operationBtn[row.status.toString()].value" :key="index+'a'" @click="fnProcessing(operationBtn[row.status.toString()].clickArr[index],row)" type="primary" link>{{ item }}</el-button> 
					   </template>
				   </el-table-column>-->
 
			    </el-table>
			    <div class="mt-[16px] flex justify-end">
				    <el-pagination v-model:current-page="refundTableData.page" v-model:page-size="refundTableData.limit"
					   layout="total, sizes, prev, pager, next, jumper" :total="refundTableData.total"
					   @size-change="loadRefundList()" @current-change="loadRefundList" />
			    </div>
		   </div>

	   </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { useRouter, useRoute } from 'vue-router'
import { getRefund, getRefundStatus } from '@/api/order'

const router = useRouter()
const refundTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        // order_no: '',
        // member_id,
        create_time: [],
        status: ''
    }
})

/**
 * 获取退款列表
 */
const loadRefundList = (page: number = 1) => {
    refundTableData.loading = true
    refundTableData.page = page

    getRefund({
        page: refundTableData.page,
        limit: refundTableData.limit,
        ...refundTableData.searchParam
    }).then(res => {
		console.log(res)
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
	getRefundStatus().then(res=>{
		console.log(res.data)
		refundList.value = res.data
		console.log(res.data)
	})
} 
checkRefundList()
/**
 * 会员详情
 */
const toMember = (member_id: number) => {
    router.push(`/member/detail?id=${member_id}`)
}

</script>



<style lang="scss" scoped></style>
