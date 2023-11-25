<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-[20px]">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addDict') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="dictTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="dictTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('key')" prop="key">
                        <el-input v-model="dictTable.searchParam.key" :placeholder="t('keyPlaceholder')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadDictList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="dictTable.data" size="large" v-loading="dictTable.loading">
                    <template #empty>
                        <span>{{ !dictTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="name" :label="t('name')" min-width="120" />
                    <el-table-column prop="key" :label="t('key')" min-width="120" />
                    <el-table-column prop="memo" :label="t('memo')" min-width="120" />
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="120" />
                    <el-table-column :label="t('operation')" align="right" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="dictData(row)">{{ t('dictData') }}</el-button>
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="dictTable.page" v-model:page-size="dictTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="dictTable.total"
                        @size-change="loadDictList()" @current-change="loadDictList" />
                </div>
            </div>

            <edit ref="editDictDialog" @complete="loadDictList" />
            <dict ref="dictDialog" @complete="loadDictList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getDictList, deleteDict } from '@/app/api/dict'
import { img } from '@/utils/common'
import { ElMessageBox } from 'element-plus'
import Edit from '@/app/views/dict/components/edit.vue'
import dict from '@/app/views/dict/components/dict.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;

let dictTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "name":"",
      "key":""
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取数据字典列表
 */
const loadDictList = (page: number = 1) => {
    dictTable.loading = true
    dictTable.page = page

    getDictList({
        page: dictTable.page,
        limit: dictTable.limit,
         ...dictTable.searchParam
    }).then(res => {
        dictTable.loading = false
        dictTable.data = res.data.data
        dictTable.total = res.data.total
    }).catch(() => {
        dictTable.loading = false
    })
}
loadDictList()

const editDictDialog: Record<string, any> | null = ref(null)

/**
 * 添加数据字典
 */
const addEvent = () => {
    editDictDialog.value.setFormData()
    editDictDialog.value.showDialog = true
}

/**
 * 编辑数据字典
 * @param data
 */
const editEvent = (data: any) => {
    editDictDialog.value.setFormData(data)
    editDictDialog.value.showDialog = true
}

const dictDialog: Record<string, any> | null = ref(null)

const dictData = (data: any) => {
    dictDialog.value.setFormData(data)
}

/**
 * 删除数据字典
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('dictDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteDict(id).then(() => {
            loadDictList()
        }).catch(() => {
        })
    })
}


const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadDictList()
}


</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
