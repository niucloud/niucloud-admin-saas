<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-[20px]">{{pageName}}</span>
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="userTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('userName')" prop="username">
                        <el-input v-model="userTableData.searchParam.username" :placeholder="t('userNamePlaceholder')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadUserList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <div>
                <el-table :data="userTableData.data" size="large" v-loading="userTableData.loading">
                    <template #empty>
                        <span>{{ !userTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :label="t('headImg')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.head_img" :src="img(row.head_img)" />
                            <el-avatar v-else>
								<img src="@/assets/images/member_head.png"/>
							</el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" :label="t('accountNumber')" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="real_name" :label="t('userRealName')" min-width="120" show-overflow-tooltip />
                    <el-table-column :label="t('siteName')" min-width="120" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span>{{ row.roles[0].site_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('isAdmin')" width="120" align="center">
                        <template #default="{ row }">
                            {{ row.roles[0].is_admin ? t('yes') : t('no') }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('status')" min-width="120" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ t('statusNormal') }}</el-tag>
                            <el-tag class="ml-2" type="error" v-if="row.status == 0">{{t('statusDeactivate') }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="create_time" :label="t('createTime')" min-width="120" show-overflow-tooltip />

                    <el-table-column :label="t('operation')" fixed="right" width="100">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="userTableData.page" v-model:page-size="userTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="userTableData.total"
                        @size-change="loadUserList()" @current-change="loadUserList" />
                </div>
            </div>

        </el-card>
        <user-info ref="userDialog" @complete="loadUserList" />

    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getUserList } from '@/api/user'
import { img } from '@/utils/common'
import type { FormInstance } from 'element-plus'
import userInfo from '@/views/site/components/user-info.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;


const userTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        username: '',
        site_name: ''
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined)=>{
    if (!formEl) return
    
    formEl.resetFields();
    loadUserList();
}

/**
 * 获取用户列表
 */
const loadUserList = (page: number = 1) => {
    userTableData.loading = true
    userTableData.page = page

    getUserList({
        page: userTableData.page,
        limit: userTableData.limit,
        ...userTableData.searchParam

    }).then(res => {
        userTableData.loading = false
        userTableData.data = res.data.data
        userTableData.total = res.data.total
    }).catch(() => {
        userTableData.loading = false
    })
}
loadUserList()

const userDialog: Record<string, any> | null = ref(null)
/**
 * 查看详情
 * @param data
 */
const infoEvent = (data: any) => {
    userDialog.value.setFormData(data)
    userDialog.value.showDialog = true
}

</script>

<style lang="scss" scoped></style>
