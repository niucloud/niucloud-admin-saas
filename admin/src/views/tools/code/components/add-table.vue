<template>
    <el-dialog v-model="showDialog" :title="t('addCode')" width="800px"
        :destroy-on-close="true">
        <div class="">
            <el-table :data="filterTableData" size="large" v-loading="tableTableData.loading" height="400"  >

                <template #empty>
                    <span>{{ !tableTableData.loading ? t('emptyData') : '' }}</span>
                </template>

                <el-table-column prop="Name" :label="t('tableName')" min-width="150" />
                <el-table-column prop="Comment" :label="t('tableComment')" min-width="120" />
                   
                <el-table-column align="right" min-width="150">
                    <template #header>
                        <el-input v-model="search" size="small" :placeholder="t('searchPlaceholder')" />
                    </template>
                    <template #default="scope">
                        <el-button
                        size="small"
                        type="primary"
                        @click="confirm(scope.row)"
                        >{{ t('addBtn') }}</el-button>
                    </template>
                </el-table-column>
             
            </el-table>
        </div>
         
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { addGenerateTable, generateTable } from '@/api/tools'

let showDialog = ref(false)
const loading = ref(false)
const search = ref('')


let tableTableData = reactive({
    loading: true,
    data: [],
    searchParam:{
      table_name:"",
      table_content:""
    }
})

const filterTableData = computed(() =>
    tableTableData.data.filter(
    (data) =>
      !search.value ||
      data.Name.toLowerCase().includes(search.value.toLowerCase()) || data.Comment.toLowerCase().includes(search.value.toLowerCase())
  )
)

const searchFormRef = ref<FormInstance>()

/**
 * 获取代码生成列表
 */
const loadTableList = () => {
    tableTableData.loading = true

    generateTable().then(res => {
        tableTableData.loading = false
        tableTableData.data = res.data
    }).catch(() => {
        tableTableData.loading = false
    })
}
loadTableList()

const emit = defineEmits(['complete'])
/**
 * 确认
 * @param formEl
 */
 const confirm = (row:any) => {
  let name:string = row.Name;
  ElMessageBox.confirm(t('selectTableTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'info',
        }
    ).then(() => {
        addGenerateTable({'table_name':name}).then(res => {
            loading.value = false
            showDialog.value = false
            emit('complete')
        }).catch(err => {
            
        })

    })
}

const setFormData = async (row: any = null) => {
    loadTableList();
}
 
defineExpose({
    showDialog,
    setFormData
})

</script>

<style lang="scss" scoped></style>