<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addSiteGroup') }}
                </el-button>
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="siteGroupTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('groupName')" prop="keywords">
                        <el-input v-model="siteGroupTableData.searchParam.keywords"
                            :placeholder="t('groupNamePlaceholder')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadSiteGroupList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div>
                <el-table :data="siteGroupTableData.data" size="large" v-loading="siteGroupTableData.loading">

                    <template #empty>
                        <span>{{ !siteGroupTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="group_name" :label="t('groupName')" />

                    <el-table-column prop="group_name" :label="t('appName')" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <el-tag class="mr-1" size="small" v-for="name in row.app_name">{{ name }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="group_name" :label="t('addonName')" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <el-tag class="mr-1" size="small" v-for="name in row.addon_name">{{ name }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="create_time" :label="t('createTime')"></el-table-column>
                    <el-table-column prop="group_roles" :label="t('operation')" align="right" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.group_id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="siteGroupTableData.page"
                        v-model:page-size="siteGroupTableData.limit" layout="total, sizes, prev, pager, next, jumper"
                        :total="siteGroupTableData.total" @size-change="loadSiteGroupList()"
                        @current-change="loadSiteGroupList" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { getSiteGroupList, deleteSiteGroup } from '@/app/api/site'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const searchFormRef = ref<FormInstance>()

const siteGroupTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        keywords: ''
    }
})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadSiteGroupList()
}

/**
 * 获取分组列表
 */
const loadSiteGroupList = (page: number = 1) => {
    siteGroupTableData.loading = true
    siteGroupTableData.page = page

    getSiteGroupList({
        page: siteGroupTableData.page,
        limit: siteGroupTableData.limit,
        ...siteGroupTableData.searchParam
    }).then(res => {
        siteGroupTableData.loading = false
        siteGroupTableData.data = res.data.data
        siteGroupTableData.total = res.data.total
    }).catch(() => {
        siteGroupTableData.loading = false
    })
}
loadSiteGroupList()

/**
 * 添加分组
 */
const addEvent = () => {
    router.push('/admin/site/group_edit')
}

/**
 * 编辑分组
 * @param data
 */
const editEvent = (data: any) => {
    router.push({ path: '/admin/site/group_edit', query: { id: data.group_id } })
}

/**
 * 删除分组
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('groupDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteSiteGroup(id).then(() => {
            loadSiteGroupList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped></style>
