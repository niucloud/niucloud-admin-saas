<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-[20px]">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">{{ t('addMemberLabel') }}</el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="memberLabelTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('labelName')" prop="label_name">
                        <el-input v-model="memberLabelTableData.searchParam.label_name" :placeholder="t('labelNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadMemberLabelList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="memberLabelTableData.data" size="large" v-loading="memberLabelTableData.loading">

                    <template #empty>
                        <span>{{ !memberLabelTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="label_name" :label="t('labelName')" min-width="120" />
                    <el-table-column prop="member_num" :label="t('memberNumber')" min-width="120" />
                    <el-table-column prop="memo" :label="t('memo')" min-width="120" />
                    <el-table-column prop="sort" :label="t('sort')" min-width="120" />

                    <el-table-column :label="t('operation')" fixed="right" width="130">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="danger" link @click="deleteEvent(row.label_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="memberLabelTableData.page" v-model:page-size="memberLabelTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="memberLabelTableData.total"
                        @size-change="loadMemberLabelList()" @current-change="loadMemberLabelList" />
                </div>
            </div>

            <edit-memberLabel ref="editMemberLabelDialog" @complete="loadMemberLabelList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getMemberLabelList, deleteMemberLabel } from '@/api/member'
import { ElMessageBox, FormInstance } from 'element-plus'
import EditMemberLabel from '@/views/member/components/edit-label.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;

let memberLabelTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
    "label_name":""
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined)=>{
    if (!formEl) return
    formEl.resetFields();
    loadMemberLabelList();
}

/**
 * 获取会员标签列表
 */
const loadMemberLabelList = (page: number = 1) => {
    memberLabelTableData.loading = true
    memberLabelTableData.page = page

    getMemberLabelList({
        page: memberLabelTableData.page,
        limit: memberLabelTableData.limit,
        ...memberLabelTableData.searchParam
    }).then(res => {
        memberLabelTableData.loading = false
        memberLabelTableData.data = res.data.data
        memberLabelTableData.total = res.data.total
    }).catch(() => {
        memberLabelTableData.loading = false
    })
}
loadMemberLabelList()

const editMemberLabelDialog: Record<string, any> | null = ref(null)

/**
 * 添加会员标签
 */
const addEvent = () => {
    editMemberLabelDialog.value.setFormData()
    editMemberLabelDialog.value.showDialog = true
}

/**
 * 编辑会员标签
 * @param data
 */
const editEvent = (data: any) => {
    editMemberLabelDialog.value.setFormData(data)
    editMemberLabelDialog.value.showDialog = true
}

/**
 * 删除会员标签
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('memberLabelDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteMemberLabel(id).then(() => {
            loadMemberLabelList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped></style>