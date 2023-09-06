<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
           <div class="flex justify-between items-center">
                <span class="text-[20px]">{{pageName}}</span>
            </div>
            <div class="mt-[20px]">
                <el-table :data="agreementTableData.data" size="large" v-loading="agreementTableData.loading">

                    <template #empty>
                        <span>{{ !agreementTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    
                    <el-table-column prop="type_name" :label="t('typeName')" min-width="100" :show-overflow-tooltip="true" />

                    <el-table-column prop="title" :label="t('title')" min-width="100" :show-overflow-tooltip="true"/>
                     
                    <el-table-column :label="t('updateTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.update_time || '' }}
                        </template>
                    </el-table-column>
              
                    <el-table-column :label="t('operation')" fixed="right" width="100">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('config') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
            </div>
 
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { t } from '@/lang'
import { getAgreementList } from '@/api/sys'
import { useRouter,useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;
 
let agreementTableData = reactive({
    loading: true,
    data: [],
})

/**
 * 获取协议列表
 */
const loadAgreementList = () => {
    agreementTableData.loading = true
    agreementTableData.data = [];
    getAgreementList().then(res => {
        Object.keys(res.data).forEach((key) => {
            return agreementTableData.data.push(res.data[key]);
        })
        agreementTableData.loading = false
    }).catch(() => {
        agreementTableData.loading = false
    })
}

loadAgreementList()

const router = useRouter()

const editEvent = (data: any) => {
    router.push(`/setting/agreement/edit?key=${data.agreement_key}`)
}

</script>

<style lang="scss" scoped></style>