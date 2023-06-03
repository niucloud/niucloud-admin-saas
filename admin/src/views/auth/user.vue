<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-[24px]">{{pageName}}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">{{ t('addUser') }}</el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="userTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('accountNumber')" prop="seach">
                        <el-input v-model="userTableData.searchParam.seach" class="w-[240px]" :placeholder="t('accountNumberPlaceholder')" />
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
                    <el-table-column :label="t('userRoleName')" min-width="120" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span v-if="row.userrole.is_admin">{{ t('administrator') }}</span>
                            <span v-else>{{ row.userrole.role_array.join(' | ') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('status')" min-width="120" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ t('statusUnlock') }}</el-tag>
                            <el-tag class="ml-2" type="error" v-if="row.status == 0">{{t('statusLock') }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="last_time" :label="t('lastLoginTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.last_time || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('lastLoginIP')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.last_ip || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" fixed="right" width="160">
                        <template #default="{ row }">
							<div v-if="row.userrole.is_admin != 1">
								<el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
								<el-button type="danger" link @click="lockEvent(row.uid)" v-if="row.status">{{ t('lock') }}</el-button>
								<el-button type="danger" link @click="unlockEvent(row.uid)" v-else>{{ t('unlock') }}</el-button>
							</div>
                            <div v-else>
                                <el-button link disabled >{{ t('adminDisabled') }}</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="userTableData.page" v-model:page-size="userTableData.limit" layout="total, sizes, prev, pager, next, jumper" :total="userTableData.total" @size-change="loadUserList()" @current-change="loadUserList" />
                </div>
            </div>

            <edit-user ref="editUserDialog" @complete="loadUserList()" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getUserList, lockUser, unlockUser } from '@/api/site'
import EditUser from '@/views/auth/components/edit-user.vue'
import { img } from '@/utils/common'
import { ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

const userTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
        seach: ''
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
        username: userTableData.searchParam.seach

    }).then(res => {
        userTableData.loading = false
        userTableData.data = res.data.data
        userTableData.total = res.data.total
    }).catch(() => {
        userTableData.loading = false
    })
}
loadUserList()

const editUserDialog: Record<string, any> | null = ref(null)

/**
 * 添加用户
 */
const addEvent = () => {
    editUserDialog.value.setFormData()
    editUserDialog.value.showDialog = true
}

/**
 * 编辑用户
 * @param data
 */
const editEvent = (data: any) => {
    editUserDialog.value.setFormData(data)
    editUserDialog.value.showDialog = true
}

/**
 * 锁定用户
 */
const lockEvent = (id: number) => {
    ElMessageBox.confirm(t('userLockTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        lockUser(id).then(() => {
            loadUserList()
        }).catch(() => {
        })
    })
}


/**
 * 解锁用户
 */
 const unlockEvent = (id: number) => {
    ElMessageBox.confirm(t('userUnlockTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        unlockUser(id).then(() => {
            loadUserList()
        }).catch(() => {
        })
    })
}

</script>

<style lang="scss" scoped></style>
