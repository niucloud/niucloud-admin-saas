<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
           
            <div class="mt-[16px]">
                <el-table :data="payTableData.data" size="large" v-loading="payTableData.loading">

                    <template #empty>
                        <span>{{ !payTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    
                    <el-table-column prop="name" :label="t('name')" min-width="100" :show-overflow-tooltip="true"/>
                    <el-table-column :label="t('status')" min-width="180" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success" v-if="row.config.status == 1">{{ t('statusNormal') }}</el-tag>
                            <el-tag class="ml-2" type="error" v-if="row.config.status == 0">{{
                                t('statusDeactivate')
                            }}</el-tag>
                          
                        </template>
                    </el-table-column>
              
                    <el-table-column :label="t('operation')" fixed="right" width="100">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('config') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
            </div>

            <wechatpay ref="wechatpayDialog" @complete="loadPayList()" />
            <alipay ref="alipayDialog" @complete="loadPayList()" />
            <offlinepay ref="offlinepayDialog" @complete="loadPayList()" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getPayConfig,getPayList } from '@/api/sys'
import Wechatpay from '@/views/setting/components/pay-wechatpay.vue'
import Alipay from '@/views/setting/components/pay-alipay.vue'
import Offlinepay from '@/views/setting/components/pay-offlinepay.vue'

const wechatpayDialog: Record<string, any> | null = ref(null)        
const alipayDialog: Record<string, any> | null = ref(null)
const offlinepayDialog: Record<string, any> | null = ref(null)

let payTableData = reactive({
    loading: true,
    data: [],
})

/**
 * 获取配置信息
 */
const loadPayList = () => {
    payTableData.loading = true
    getPayList().then(res => {
        payTableData.data = res.data
        payTableData.loading = false
    }).catch(() => {
        payTableData.loading = false
    })
}

loadPayList()
 
const editEvent = (data: any) => {
    eval(data.key+'Dialog.value.setFormData(data)');
    eval(data.key+'Dialog.value.showDialog = true;');
}

</script>

<style lang="scss" scoped></style>