<template>
    <div class="main-container">
        <el-form :model="formData" label-width="150px" ref="formRef" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none relative" shadow="never" v-if="formData">
                <h3 class="panel-title">{{ t('orderInfo') }}</h3>

                <el-form-item :label="t('orderNo')">
                    <div class="input-width">{{ formData.order_no }}</div>
                </el-form-item>

                <el-form-item :label="t('orderMoney')">
                    <div class="input-width">{{ formData.order_money }}</div>
                </el-form-item>

                <el-form-item :label="t('orderDiscountMoney')">
                    <div class="input-width">{{ formData.order_discount_money }}</div>
                </el-form-item>

                <el-form-item :label="t('member')">
                    <div class="input-width">
                        <div class="flex flex flex-col cursor-pointer" @click="toMember(formData.member_id)">
                            <span class="">{{ formData.member.nickname || '' }}</span>
                            <span class="">{{ formData.member.mobile || '' }}</span>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item :label="t('ip')">
                    <div class="input-width">{{ formData.ip }}</div>
                </el-form-item>

                <el-form-item :label="t('orderFromName')">
                    <div class="input-width">{{ formData.order_from_name }}</div>
                </el-form-item>

                <el-form-item :label="t('orderStatus')">
                    <div class="input-width">{{ formData.order_status_info.name }}</div>
                </el-form-item>

                <el-form-item :label="t('payTypeName')">
                    <div class="input-width">{{ formData.pay_type_name }}</div>
                </el-form-item>

                <el-form-item :label="t('createTime')">
                    <div class="input-width">{{ formData.create_time || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('payTime')">
                    <div class="input-width">{{ formData.pay_time || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('remark')">
                    <div class="input-width">{{ formData.remark || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('memberMessage')">
                    <div class="input-width">{{ formData.member_message || '' }}</div>
                </el-form-item>

            </el-card>

        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getRechargeOrderInfo } from '@/api/order'
import { useRoute, useRouter } from 'vue-router'
import useTabbarStore from '@/stores/modules/tabbar'
import useAppStore from '@/stores/modules/app'

const tabbarStore = useTabbarStore()
const route = useRoute()
const router = useRouter()
const orderId: number = parseInt(route.query.order_id)
const loading = ref(true)

// 页面返回按钮
const appStore = useAppStore()
appStore.pageReturn = true
watch(route, (newX, oldX) => {
    appStore.pageReturn = false
})

const formData: Record<string, any> | null = ref(null)

const setFormData = async (orderId: number = 0) => {
    loading.value = true
    formData.value = null
    await getRechargeOrderInfo(orderId)
        .then(({ data }) => {
            formData.value = data
        })
        .catch(() => {

        })
    loading.value = false
}
if (orderId) setFormData(orderId)
else loading.value = false

const formRef = ref<FormInstance>()

const back = () => {
    tabbarStore.removeTab(route.path)
    router.push({ path: '/finance/recharge' })
}
/**
 * 会员详情
 */
const toMember = (memberId: number) => {
    router.push(`/member/detail?id=${memberId}`)
}

</script>

<style lang="scss" scoped></style>
