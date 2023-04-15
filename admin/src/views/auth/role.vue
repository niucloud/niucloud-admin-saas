<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between">
                <el-button type="primary" @click="addEvent">
                    {{ t('addRole') }}
                </el-button>
                <el-input v-model="seach" :placeholder="t('roleNamePlaceholder')" class="w-[190px]" prefix-icon="Search"
                    @input="loadRoleList()" clearable />
            </div>

            <div class="mt-[16px]">
                <el-table :data="roleTableData.data" size="large" v-loading="roleTableData.loading">
                    <template #empty>
                        <span>{{ !roleTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="role_name" :label="t('roleName')" />
                    <el-table-column :label="t('status')">
                        <template #default="{ row }">
                            <el-tag type="success" v-if="row.status == 1">{{ row.status_name }}</el-tag>
                            <el-tag type="error" v-if="row.status == 0">{{ row.status_name }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')"></el-table-column>
                    <el-table-column :label="t('operation')" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="danger" link @click="deleteEvent(row.role_id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="roleTableData.page" v-model:page-size="roleTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="roleTableData.total"
                        @size-change="loadRoleList()" @current-change="loadRoleList" />
                </div>
            </div>

            <edit-role ref="editRoleDialog" @complete="loadRoleList()" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { getRoleList, deleteRole } from '@/api/sys'
import { ElMessageBox } from 'element-plus'
import EditRole from '@/views/auth/components/edit-role.vue'

const roleTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
})

const seach = ref<string>('')
/**
 * 获取角色列表
 */
const loadRoleList = (page: number = 1) => {
    roleTableData.loading = true
    roleTableData.page = page

    getRoleList({
        page: roleTableData.page,
        limit: roleTableData.limit,
        role_name: seach.value
    }).then(res => {
        roleTableData.loading = false
        roleTableData.data = res.data.data
        roleTableData.total = res.data.total
    }).catch(() => {
        roleTableData.loading = false
    })
}
loadRoleList()

const editRoleDialog: Record<string, any> | null = ref(null)

/**
 * 添加角色
 */
const addEvent = () => {
    editRoleDialog.value.setFormData()
    editRoleDialog.value.showDialog = true
}

/**
 * 编辑角色
 * @param data
 */
const editEvent = (data: any) => {
    editRoleDialog.value.setFormData(data)
    editRoleDialog.value.showDialog = true
}

/**
 * 删除角色
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('roleDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteRole(id).then(() => {
            loadRoleList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped></style>
