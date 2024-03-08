<template>
    <el-card class="box-card !border-none" shadow="never" v-loading="payLoading">
        <!-- 设置支付配置 -->
        <div class="flex justify-between items-center" v-if="!payLoading">
            <span class="text-page-title">{{ pageName }}</span>
            <el-button type="primary" @click="isEdit = true" ref="setConfigBtn">{{ t('setConfig') }}</el-button>
        </div>
        <el-card class="box-card box-pay-card !border-none mt-[20px]" shadow="never"
            v-for="(payItems, payKey) in payConfigData" :key="payKey">
            <div class="flex mb-3">
                <span class="text-base">{{ payItems.name }}</span>
            </div>
            <div class="pay-table">
                <div
                    class="flex items-center pay-table-head table-bg table-item-pd table-item-border justify-between table-bg">
                    <span class="text-base text-[#999] w-[150px]">{{ t('payType') }}</span>
                    <!-- <span class="text-base font-bold text-[#999] w-[110px]">{{t('settingDefaultPay')}}</span> -->
                    <span class="text-base text-[#999] w-[110px] text-center">{{ t('onState') }}</span>
                    <span class="text-base text-[#999] w-[80px] text-center" v-if="isEdit">{{ t('templateName') }}</span>
                </div>
                <div ref="fieldBoxRefs" :data-key="payKey">
                    <div v-for="(childrenItem, childrenIndex) in payItems.pay_type" :key="childrenItem.redio_key"
                        class="flex table-item-border table-item-pd justify-between" :id="payKey + '_' + childrenIndex">
                        <div class="table-item-flex w-[150px]">
                            <span v-if="isEdit" class="iconfont icontuodong mr-2 handle cursor-pointer"></span>
                            <div class="flex items-center select-none">
                                <div class="mr-[15px] w-[30px] h-[30px]"><img class="w-[30px]"
                                        :src="img(childrenItem.icon)" /></div>
                                <span class="text-base text-[#666]">{{ childrenItem.name }}</span>
                            </div>
                        </div>
                        <!-- <div class="table-item-flex w-[110px] select-none">
							<el-radio v-model="payItems.default_pay_type" :label="childrenItem.redio_key" size="large" @change="settingDefault(childrenItem,payKey)">{{ t('settingDefault') }}</el-radio>
						</div> -->
                        <div class="table-item-flex w-[110px] justify-center select-none">
                            <el-switch v-if="isEdit" v-model="childrenItem.status" :active-text="t('isEnable')"
                                @change="enablePaymentMode(childrenItem)" />
                            <div v-else>
                                <el-tag v-if="childrenItem.status" class="ml-2" type="success">{{ t('open') }}</el-tag>
                                <el-tag v-else class="ml-2" type="info">{{ t('notOpen') }}</el-tag>
                            </div>
                        </div>
                        <div class="table-item-flex w-[80px]  justify-center select-none" v-if="isEdit">
                            <button @click="configPayFn(childrenItem)" class="text-base"
                                v-if="childrenItem.key != 'balancepay'">{{ t('clickConfigure')
                                }}</button>
                            <button v-else>--</button>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <div class="fixed-footer-wrap" v-if="isEdit">
            <div class="fixed-footer">
                <el-button type="primary" :loading="loading" @click="cancelFn">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="saveFn(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>
        <wechatpay ref="wechatpayDialog" @complete="setConfigInfo" />
        <alipay ref="alipayDialog" @complete="setConfigInfo" />
        <offlinepay ref="offlinepayDialog" @complete="setConfigInfo" />
    </el-card>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { t } from '@/lang'
import { getPayConfigList, setPatConfig } from '@/app/api/sys'
import Wechatpay from '@/app/views/setting/components/pay-wechatpay.vue'
import Alipay from '@/app/views/setting/components/pay-alipay.vue'
import Offlinepay from '@/app/views/setting/components/pay-offlinepay.vue'
import { img } from '@/utils/common'
import { ElMessage } from 'element-plus'
import Sortable, { SortableEvent } from 'sortablejs'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title

const wechatpayDialog: Record<string, any> | null = ref(null)
const alipayDialog: Record<string, any> | null = ref(null)
const offlinepayDialog: Record<string, any> | null = ref(null)

const payLoading = ref(true)

const isEdit = ref<boolean>(false)
const setConfigBtn = ref()

// 获取原始数据
const payConfigData = ref([])
const checkPayConfigList = () => {
    getPayConfigList().then(res => {
        const payData = res.data
        for (const i in payData) {
            const payType = payData[i].pay_type
            const pay_type = []
            let default_key = ''

            payType.forEach((item, index) => {
                item.redio_key = payData[i].key + '_' + item.key
                item.defauit_key = ''
                if (item.is_default == 1) {
                    default_key = item.redio_key
                }

                item.status = Boolean(item.status)
                pay_type.push(item)
            })

            payData[payData[i].key].default_pay_type = default_key
            payData[payData[i].key].pay_type = pay_type
        }
        payConfigData.value = payData
        payLoading.value = false
        nextTick(() => {
            fieldBoxRefs.value.forEach((item, index) => {
                sortableFn(item, index)
            })
        })
    }).catch(() => {

    })
}
checkPayConfigList()

// 配置支付宝、微信信息
const setConfigInfo = (data:any) => {
    payConfigData.value[data.channel].pay_type.forEach(element => {
        if (element.key == data.type) {
            element.config = data.config
        }
    })
}

// 初始化配置信息
const configPayFn = (data:any) => {
    eval(data.key + 'Dialog.value.setFormData(data)')
    eval(data.key + 'Dialog.value.showDialog = true;')
}

// 开启支付方式
const enablePaymentMode = (res) => {
    if (res.key == 'wechatpay' && !res?.config?.mch_secret_cert || res.key == 'alipay' && !res?.config?.alipay_root_cert_path) {
        res.status = false
        ElMessage(t('configurePaymentMethod'))
        return false
    }
}

interface SortableEvt extends SortableEvent {
    originalEvent?: DragEvent
}

// 拖动
const fieldBoxRefs = ref<any>([])
watch(isEdit, (newValue, oldValue) => {
    if (newValue) {
        nextTick(() => {
            fieldBoxRefs.value.forEach((item:any, index:any) => {
                sortableFn(item, index)
            })
        })
    }
})

// item=>拖动的每项，index 索引
const sortableFn = (item, index) => {
    const sortable = Sortable.create(item, {
        group: {
            put: false // 不允许拖拽进这个列表
        },
        handle: '.handle',
        animation: 200,
        disabled: false,
        onEnd: (evt) => {
            const key = evt.target.getAttribute('data-key')
            const data = payConfigData.value[key].pay_type
            data.splice(evt.newIndex, 0, ...data.splice(evt.oldIndex, 1))
        }
    })
}

// 保存
const saveFn = () => {
    payLoading.value = true
    const data = JSON.parse(JSON.stringify(payConfigData.value))
    Object.values(data).forEach((item, index) => {
        item.pay_type.forEach((subItem:any, subIndex:any) => {
            subItem.sort = subIndex
            subItem.status = Number(subItem.status)
        })
    })

    setPatConfig({ config: data }).then(res => {
        checkPayConfigList()
        isEdit.value = false
        payLoading.value = false
    })
}

// 取消按钮
const cancelFn = () => {
    location.reload()
}
</script>

<style lang="scss" scoped>
.table-item-pd {
    @apply py-[10px] px-[11px];
}

.table-item-border {
    @apply border-b border-[#ebeef5];
}

.table-item-flex {
    display: flex;
    align-items: center;
}

:deep(.box-pay-card) .el-card__body {
    padding: 0;
}

.table-bg {
    background: #f5f7f9;
}

html.dark .table-bg {
    background: #141414;
}
</style>
