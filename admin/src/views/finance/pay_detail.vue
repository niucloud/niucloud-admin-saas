<template>
    <div class="main-container">
        <div class="detail-head">
            <div class="left" @click="router.push({ path: '/finance/pay/offlinepay' })">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t('returnToPreviousPage') }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>

        <el-card class="box-card !border-none" shadow="never" v-loading="loading">
            <el-form :model="formData" label-width="150px" ref="formRef" class="page-form mt-[10px]" v-if="!loading">
                <el-form-item :label="t('outTradeNo')">
                    <div class="input-width">{{ formData.out_trade_no }}</div>
                </el-form-item>
                <el-form-item :label="t('createTime')">
                    <div class="input-width">{{ formData.create_time }}</div>
                </el-form-item>
                <el-form-item :label="t('money')">
                    <div class="input-width">{{ formData.money }}</div>
                </el-form-item>
                <el-form-item :label="t('body')">
                    <div class="input-width">{{ formData.body }}</div>
                </el-form-item>
                <el-form-item :label="t('channel')">
                    <div class="input-width">{{ formData.channel_name }}</div>
                </el-form-item>
                <el-form-item :label="t('payStatus')">
                    <div class="input-width">{{ formData.status_name }}</div>
                </el-form-item>
                <el-form-item :label="t('payType')" v-if="formData.type_name">
                    <div class="input-width">{{ formData.type_name }}</div>
                </el-form-item>
                <el-form-item :label="t('payTime')" v-if="formData.pay_time">
                    <div class="input-width">{{ formData.pay_time }}</div>
                </el-form-item>
                <el-form-item :label="t('failTime')" v-if="formData.close_time">
                    <div class="input-width">{{ formData.close_time }}</div>
                </el-form-item>
                <el-form-item :label="t('failReason')" v-if="formData.fail_reason">
                    <div class="input-width">{{ formData.fail_reason }}</div>
                </el-form-item>
                <el-form-item :label="t('voucher')" v-if="formData.type == 'offlinepay' && formData.voucher">
                    <div class="input-width cursor-pointer">
                        <el-image style="width: 100%;" :src="img(formData.voucher)" fit="cover" @click="voucherEvent" />
                    </div>
                </el-form-item>
                <el-form-item :label="t('auditVoucher')" v-if="formData.type == 'offlinepay' && formData.status == 3">
                    <el-button type="primary" @click="passEvent">{{ t('pass') }}</el-button>
                    <el-button type="danger" @click="refuseEvent">{{ t('refuse') }}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
    <el-image-viewer :url-list="previewImageList" v-if="imageViewerShow" @close="imageViewerShow = false" :initial-index="0"
        :zoom-rate="1" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { getPayDetail, payAuditPass, payAuditRefuse } from '@/api/sys'
import { img } from '@/utils/common'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const id: number = parseInt((route.query.id || 0))
const loading = ref(true)
const formData: Record<string, any> | null = ref(null)

const setFormData = async () => {
    loading.value = true
    formData.value = null
    await getPayDetail(id)
        .then(({ data }) => {
            formData.value = data
        })
        .catch(() => {

        })
    loading.value = false
}
setFormData()

const passEvent = () => {
    ElMessageBox.confirm(
        t('passTips'),
        t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(({ value }) => {
        payAuditPass(formData.value.out_trade_no)
            .then(() => {
                setFormData()
            })
            .catch()
    }).catch(() => {

    })
}

const refuseEvent = () => {
    ElMessageBox.prompt(t('refuseReason'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        inputErrorMessage: t('refuseReason'),
        inputPattern: /\S/,
        inputType: 'textarea'
    }).then(({ value }) => {
        payAuditRefuse({ out_trade_no: formData.value.out_trade_no, reason: value })
            .then(() => {
                setFormData()
            })
            .catch()
    }).catch(() => {

    })
}

const previewImageList = ref<string[]>([])
const imageViewerShow = ref(false)
const voucherEvent = () => {
    previewImageList.value[0] = img(formData.value.voucher)
    imageViewerShow.value = true
}
</script>

<style lang="scss" scoped></style>
