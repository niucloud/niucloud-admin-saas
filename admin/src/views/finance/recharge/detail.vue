<template>
    <div class="main-container">
        <el-form :model="formData" label-width="150px" ref="formRef" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none relative" shadow="never" >
                <h3 class="panel-title">{{ t('orderInfo') }}</h3>

                <el-form-item :label="t('orderNo')" >
                    <div class="input-width">{{ formData.order_no }}</div>
                </el-form-item>
 
                <el-form-item :label="t('orderMoney')" >
                    <div class="input-width">{{ formData.order_money }}</div>
                </el-form-item>

                <el-form-item :label="t('orderDiscountMoney')" >
                    <div class="input-width">{{ formData.order_discount_money }}</div>
                </el-form-item>

                <el-form-item :label="t('member')" >
                    <div class="input-width">
                        <div class="flex flex flex-col cursor-pointer" @click="toMember(formData.member_id)">
                            <span class="text-blue-700">{{ formData.member.nickname || '' }}</span>
                            <span class="text-blue-700">{{ formData.member.mobile || '' }}</span>
                        </div>
                    </div>
                </el-form-item>
                
                <el-form-item :label="t('ip')" >
                    <div class="input-width">{{ formData.ip }}</div>
                </el-form-item>

                <el-form-item :label="t('orderFromName')" >
                    <div class="input-width">{{ formData.order_from_name }}</div>
                </el-form-item>

                <el-form-item :label="t('orderStatus')" >
                    <div class="input-width">{{ formData.order_status_info.name }}</div>
                </el-form-item>

                <el-form-item :label="t('payTypeName')" >
                    <div class="input-width">{{ formData.pay_type_name }}</div>
                </el-form-item>

                <el-form-item :label="t('createTime')" >
                    <div class="input-width">{{ formData.create_time || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('payTime')" >
                    <div class="input-width">{{ formData.pay_time || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('remark')" >
                    <div class="input-width">{{ formData.remark || '' }}</div>
                </el-form-item>
                
                <el-form-item :label="t('memberMessage')" >
                    <div class="input-width">{{ formData.member_message || '' }}</div>
                </el-form-item>


            </el-card>

             
        </el-form>
         <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('confirm') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { img } from '@/utils/common'
import { getRechargeOrderInfo } from '@/api/order';
import { useRoute,useRouter } from 'vue-router'
import { cloneDeep } from 'lodash';
import useTabbarStore from '@/stores/modules/tabbar'

const tabbarStore = useTabbarStore()
const route = useRoute()
const router = useRouter()
const order_id:number = parseInt(route.query.order_id);
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    order_id:0,
    site_id: '',
    order_no: 0,
    order_from:0,
    order_type:'',
    out_trade_no:'',
    order_status: '',
    pay_status: '',
    refund_status: '',
    pay_type: '',
    member_id: '',
    ip: '',
    member_message: '',
    order_item_money:'',
    order_discount_money:'',
    order_money:'',
    create_time: '',
    pay_time:'',
    close_time: '',
    is_lock:'',
    remark:'',
    invoice_id:'',
    close_reason:'',
    item:'',
    member:'',
    order_status_info:'',
    order_from_name:''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async (order_id:number = 0) => {
    loading.value = true;
    Object.assign(formData, initialFormData)
    const data = await (await getRechargeOrderInfo(order_id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    loading.value = false;
}
if(order_id) setFormData(order_id);
else loading.value = false;

const formRef = ref<FormInstance>()
 
const onSave = async (formEl: FormInstance | undefined) => {
    back()
}

const back = () => {
    tabbarStore.removeTab(route.path)
    router.push({ path: '/order/recharge' })
}
/**
 * 会员详情
 */
 const toMember = (member_id:number) => {
    router.push(`/member/detail?id=${member_id}`)
}

</script>

<style lang="scss" scoped></style>