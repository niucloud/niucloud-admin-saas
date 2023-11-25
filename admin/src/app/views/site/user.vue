<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-[20px]">{{ pageName }}</span>
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="userTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('userName')" prop="username">
                        <el-input v-model="userTableData.searchParam.username" :placeholder="t('userNamePlaceholder')" />
                    </el-form-item>
                    <!-- <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="userTableData.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item> -->
                    <el-form-item :label="t('loginTime')" prop="last_time">
                        <el-date-picker v-model="userTableData.searchParam.last_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
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
                            <div class="w-[35px] h-[35px] flex items-center justify-center">
                                <img v-if="row.head_img" :src="img(row.head_img)" class="w-[35px] rounded-full" />
                                <img v-else src="@/app/assets/images/member_head.png" class="w-[35px] rounded-full" />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" :label="t('accountNumber')" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="real_name" :label="t('userRealName')" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="site_num" :label="t('siteNum')" min-width="120" show-overflow-tooltip align="center" />
                    <!-- <el-table-column prop="create_time" :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column> -->
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
                    <el-table-column :label="t('operation')" align="right" fixed="right" width="160">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="detailEvent(row.uid)">{{ t('detail') }}</el-button>
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
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getUserList } from '@/app/api/site'
import { img } from '@/utils/common'
import type { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const pageName = route.meta.title

const userTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        username: '',
        site_name: '',
        // create_time: [],
        last_time: []
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadUserList()
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

/**
 * 查看详情
 * @param data
 */
const detailEvent = (uid: number) => {
    router.push({ path: '/admin/site/user_info', query: { uid } })
}
</script>

<style lang="scss" scoped></style>
