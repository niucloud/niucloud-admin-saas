<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <el-form :inline="true" :model="sysUserLogTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('ip')" prop="ip">
                        <el-input v-model="sysUserLogTableData.searchParam.ip" :placeholder="t('ipPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('username')" prop="username">
                        <el-input v-model="sysUserLogTableData.searchParam.username" :placeholder="t('usernamePlaceholder')" />
                    </el-form-item>

                    <el-form-item :label="t('url')" prop="url">
                        <el-input v-model="sysUserLogTableData.searchParam.url" :placeholder="t('urlPlaceholder')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadSysUserLogList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div>
                <el-table :data="sysUserLogTableData.data" size="large" v-loading="sysUserLogTableData.loading">
                    <template #empty>
                        <span>{{ !sysUserLogTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="username" :label="t('username')" min-width="120" />
                    <el-table-column prop="ip" :label="t('ip')" min-width="100" align="left"/>
                    <el-table-column prop="url" :label="t('url')" min-width="180" />
                    <el-table-column prop="type" :label="t('type')" min-width="100" align="center"/>
                     <el-table-column :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" align="right" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="detailEvent(row)">{{ t('detail') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="sysUserLogTableData.page" v-model:page-size="sysUserLogTableData.limit" layout="total, sizes, prev, pager, next, jumper" :total="sysUserLogTableData.total" @size-change="loadSysUserLogList()" @current-change="loadSysUserLogList" />
                </div>
                <user-log-detail ref="userLogDetailDialog" @complete="loadSysUserLogList()" />
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getLogList } from '@/app/api/site'
import UserLogDetail from '@/app/views/auth/components/user-log-detail.vue'
import { useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'

const route = useRoute()
const pageName = route.meta.title;

let sysUserLogTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      ip:"",
      username:"",
    }
})

const searchFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined)=>{
    if (!formEl) return

    formEl.resetFields();
    loadSysUserLogList();
}
/**
 * 获取管理员操作记录表列表
 */
const loadSysUserLogList = (page: number = 1) => {
    sysUserLogTableData.loading = true
    sysUserLogTableData.page = page

    getLogList({
        page: sysUserLogTableData.page,
        limit: sysUserLogTableData.limit,
         ...sysUserLogTableData.searchParam
    }).then(res => {
        sysUserLogTableData.loading = false
        sysUserLogTableData.data = res.data.data
        sysUserLogTableData.total = res.data.total
    }).catch(() => {
        sysUserLogTableData.loading = false
    })
}
loadSysUserLogList()
const userLogDetailDialog: Record<string, any> | null = ref(null)
/**
 * 查看详情
 * @param data
 */
 const detailEvent = (data: any) => {
    userLogDetailDialog.value.setFormData(data)
    userLogDetailDialog.value.showDialog = true
}
</script>

<style lang="scss" scoped></style>
