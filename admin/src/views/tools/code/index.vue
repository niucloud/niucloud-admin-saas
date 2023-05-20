<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex">
                <el-button type="primary" @click="addEvent">
                    {{ t('addCode') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[16px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="codeTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('tableName')" prop="table_name">
                        <el-input v-model="codeTableData.searchParam.table_name" :placeholder="t('tableNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('tableContent')" prop="table_content">
                        <el-input v-model="codeTableData.searchParam.table_content" :placeholder="t('tableContentPlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadGenerateTableList()">{{ t('search') }}</el-button>
                        <el-button @click="searchFormRef?.resetFields()">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
 
            <div class="mt-[16px]">
                <el-table :data="codeTableData.data" size="large" v-loading="codeTableData.loading">

                    <template #empty>
                        <span>{{ !codeTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="table_name" :show-overflow-tooltip="true" :label="t('tableName')" min-width="120" />
                    <el-table-column prop="table_content" :show-overflow-tooltip="true" :label="t('tableContent')" min-width="120" />

                    <el-table-column prop="edit_type" :label="t('editType')" min-width="150" align="center">
                        <template #default="{ row }">
                            {{ row.edit_type == 1 ? t('popup') : t('page') }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" width="180" :show-overflow-tooltip="true">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="download(row.id)">{{ t('download') }}</el-button>
                           <el-button type="danger" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="codeTableData.page" v-model:page-size="codeTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="codeTableData.total"
                        @size-change="loadGenerateTableList()" @current-change="loadGenerateTableList" />
                </div>
            </div>

            <add-table ref="addCodeDialog" @complete="loadGenerateTableList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getGenerateTableList, deleteGenerateTable,generateCreate} from '@/api/tools'
import { img } from '@/utils/common'
import { ElMessageBox } from 'element-plus'
import AddTable from '@/views/tools/code/components/add-table.vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

let codeTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      table_name:"",
      table_content:""
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取代码生成列表
 */
const loadGenerateTableList = (page: number = 1) => {
    codeTableData.loading = true
    codeTableData.page = page

    getGenerateTableList({
        page: codeTableData.page,
        limit: codeTableData.limit,
         ...codeTableData.searchParam
    }).then(res => {
        codeTableData.loading = false
        codeTableData.data = res.data.data
        codeTableData.total = res.data.total
    }).catch(() => {
        codeTableData.loading = false
    })
}
loadGenerateTableList()

const addCodeDialog: Record<string, any> | null = ref(null)

/**
 * 添加代码生成
 */
const addEvent = () => {
    addCodeDialog.value.setFormData()
    addCodeDialog.value.showDialog = true
}
 
/**
 * 删除代码生成
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('codeDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteGenerateTable(id).then(() => {
            loadGenerateTableList()
        }).catch(() => {
        })
    })
}


/**
 * 编辑
 * @param data
 */
 const editEvent = (data: any) => {
    router.push('/tools/code/edit?id='+data.id)
}

/**
 * 下载
 */
 const download = (id: number) => {
    generateCreate({id}).then((data) => {
        window.open(img(data.data.file), '_blank')
    }).catch(() => {
    })
}


</script>

<style lang="scss" scoped></style>