<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-[24px]">{{pageName}}</span>
            </div>
            <div class="mt-[20px]">
                <el-table :data="smsTableData.data" size="large" v-loading="smsTableData.loading">
                    <template #empty>
                        <span>{{ !smsTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="name" :label="t('name')" min-width="100" :show-overflow-tooltip="true"/>
                    <el-table-column :label="t('isUse')" min-width="180" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success" v-if="row.is_use == 1">{{ t('statusNormal') }}</el-tag>
                            <el-tag class="ml-2" type="error" v-if="row.is_use == 0">{{
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

            <ali ref="aliDialog" @complete="loadSmsList()" />
            <tencent ref="tencentDialog" @complete="loadSmsList()" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getSmsList,getSmsInfo } from '@/api/notice'
import Ali from '@/views/setting/components/sms-ali.vue'
import Tencent from '@/views/setting/components/sms-tencent.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

const aliDialog: Record<string, any> | null = ref(null)
const tencentDialog: Record<string, any> | null = ref(null)

let smsTableData = reactive({
    loading: true,
    data: [],
})

/**
 * 获取配置信息
 */
const loadSmsList = () => {
    smsTableData.loading = true
    getSmsList().then(res => {
        smsTableData.data = res.data
        smsTableData.loading = false
    }).catch(() => {
        smsTableData.loading = false
    })
}

loadSmsList()
const editEvent = (data: any) => {
    eval(data.sms_type+'Dialog.value.setFormData(data)');
    eval(data.sms_type+'Dialog.value.showDialog = true;');
}

</script>

<style lang="scss" scoped></style>