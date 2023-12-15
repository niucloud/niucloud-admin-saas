<template>
    <div class="main-container">
        <div class="detail-head">
            <div class="left" @click="router.push({ path: '/member/refund' })">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t('returnToPreviousPage') }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
	    <el-card class="box-card !border-none relative" shadow="never" v-if="formData">
			<div class="flex px-[20px] py-[20px] justify-between">
				<span>{{ t('refundMoney') }}：<span>￥{{ formData.money }}</span></span>
				<span>{{ t('refundNo') }}：<span>{{ formData.refund_no }}</span></span>
			</div>
			<el-table :data="refundList" size="large">
			    <el-table-column prop="out_trade_no" :label="t('outTradeNo')" min-width="200" />
				<el-table-column prop="create_time" :label="t('createTime')" min-width="160" />
				<el-table-column prop="refund_type_name" :label="t('refundTypeName')" min-width="120" />
				<el-table-column :label="t('refundMoney')" min-width="120">
					<template #default="{ row }">
				        <span>￥{{ row.money }}</span>
				    </template>
				</el-table-column>
			    <el-table-column prop="status_name" :label="t('statusName')" min-width="120" />
			    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
			       <template #default="{ row }">
			           <el-button type="primary" link @click="transferEvent(row)" v-if="row.status == 'wait'">{{ t('transfer') }}</el-button>
			       </template>
			    </el-table-column>
			</el-table>
		</el-card>

		<el-dialog v-model="transferDialog" :title="title" width="500px" class="diy-dialog-wrap"
		    :destroy-on-close="true">
		    <el-form :model="transfeFormData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
				<el-form-item :label="t('transferType')">
					<el-radio-group v-model="transfeFormData.refund_type">
					    <el-radio :label="item.value" v-for="(item, index) in refundTypeData" :key="index">{{ item.name }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label="t('refundMoney')" >
					<span>{{ transfeFormData.refund_money }}</span>
				</el-form-item>
				<el-form-item :label="t('voucher')" v-if="transfeFormData.refund_type == 'offline'">
					<upload-image v-model="transfeFormData.voucher" />
				</el-form-item>
		    </el-form>

		    <template #footer>
		        <span class="dialog-footer">
		            <el-button @click="transferDialog = false">{{ t('cancel') }}</el-button>
		            <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
		                t('confirm')
		            }}</el-button>
		        </span>
		    </template>
		</el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import { getPayRefundInfo, getRefundType, getRefundTransfer } from '@/app/api/pay'
import { useRoute, useRouter } from 'vue-router'
import { img, getAppType } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const refundNo: string = route.query.refund_no
const loading = ref(true)
const appType = getAppType()

const refundList = ref([])
const formData: Record<string, any> | null = ref(null)

const setFormData = async (refundNo: string = '') => {
    loading.value = true
    formData.value = null
    await getPayRefundInfo(refundNo)
        .then(({ data }) => {
            formData.value = data
            refundList.value.push(data)
        })

        .catch(() => {

        })
    loading.value = false
}
if (refundNo) setFormData(refundNo)
else loading.value = false

const refundTypeData = ref([])
getRefundType().then((data) => {
    Object.keys(data.data).forEach((key: string) => {
        refundTypeData.value.push({ value: key, name: data.data[key] })
    })
})

const transferDialog = ref(false)
const transferEvent = (data) => {
    transferDialog.value = true
    transfeFormData.refund_no = data.refund_no
    transfeFormData.refund_money = data.money
}

const initialFormData = {
    refund_no: '',
    refund_type: 'back',
    voucher: '',
    refund_money: 0.00
}
const transfeFormData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        label_name: [
            { required: true, message: t('labelNamePlaceholder'), trigger: 'blur' }

        ]
    }
})

const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const data = transfeFormData
            getRefundTransfer(data).then(res => {
                loading.value = false
                transferDialog.value = false
                refundList.value = []
                setFormData(refundNo)
            }).catch(err => {
                transferDialog.value = false
                loading.value = false
            })
        }
    })
}

// const transferEvent = () => {
//     const routeUrl = router.resolve({
// 	    path: '/member/refund',
// 	    query: { refund_id: formData.value.refund_id }
//     })
//     window.open(routeUrl.href, '_blank')
// }

</script>

<style lang="scss" scoped></style>
