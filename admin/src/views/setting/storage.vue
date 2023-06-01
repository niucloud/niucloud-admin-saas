<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
           <div class="flex justify-between items-center">
                <span class="text-[24px]">{{pageName}}</span>
            </div>
            <div class="mt-[16px]">
                <el-table :data="storageTableData.data" size="large" v-loading="loading">

                    <template #empty>
                        <span>{{ !loading ? t('emptyData') : '' }}</span>
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

            <storage-local ref="localDialog" @complete="loadStorageList()" />
            <storage-qiniu ref="qiniuDialog" @complete="loadStorageList()" />
            <storage-ali ref="aliyunDialog" @complete="loadStorageList()" />
            <storage-tencent ref="tencentDialog" @complete="loadStorageList()" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getStorageList,getStorageInfo } from '@/api/sys'
import storageLocal from '@/views/setting/components/storage-local.vue'
import storageQiniu from '@/views/setting/components/storage-qiniu.vue'
import storageAli from '@/views/setting/components/storage-ali.vue'
import storageTencent from '@/views/setting/components/storage-tencent.vue'
import { useRouter,useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

const localDialog: Record<string, any> | null = ref(null)        
const qiniuDialog: Record<string, any> | null = ref(null)
const aliyunDialog: Record<string, any> | null = ref(null)
const tencentDialog: Record<string, any> | null = ref(null)

let storageTableData = reactive({
    data: []
})
const loading = ref(true)

/**
 * 获取配置信息
 */
const loadStorageList = () => {
    loading.value = true
    getStorageList().then(res => {
        storageTableData.data = res.data
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
    
}

loadStorageList()
 
const editEvent = (data: any) => {
    eval(data.storage_type+'Dialog.value.setFormData(data)');
    eval(data.storage_type+'Dialog.value.showDialog = true;');
}

</script>

<style lang="scss" scoped></style>