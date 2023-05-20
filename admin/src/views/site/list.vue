<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <el-alert class="warm-prompt" type="info">
                <template #default>
                    <p class="text-base">{{ t('operationTip') }} <span class="cursor-pointer" @click="toSiteLink">{{
                        siteLink }}</span> </p>
                </template>
            </el-alert>

            <div class="flex justify-between mt-3">
                <el-button type="primary" @click="addEvent">
                    {{ t('addSite') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[16px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="siteTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('siteName')" prop="site_name">
                        <el-input v-model="siteTableData.searchParam.keywords" :placeholder="t('siteNamePlaceholder')" />
                    </el-form-item>

                    <el-form-item :label="t('groupId')" prop="group_id">
                        <el-select v-model="siteTableData.searchParam.group_id" clearable
                            :placeholder="t('groupIdPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item['group_name']" :value="item['group_id']" v-for="item in groupList" />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('status')" prop="status">
                        <el-select v-model="siteTableData.searchParam.status" clearable
                            :placeholder="t('groupIdPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item" :value="index" v-for="(item, index) in statusList" />
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadSiteList()">{{ t('search') }}</el-button>
                        <el-button @click="searchFormRef?.resetFields()">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[16px]">
                <el-table :data="siteTableData.data" size="large" v-loading="siteTableData.loading">

                    <template #empty>
                        <span>{{ !siteTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="site_name" :label="t('siteName')" min-width="120"
                        :show-overflow-tooltip="true" />
                    <el-table-column prop="group_name" :label="t('groupId')" min-width="120"
                        :show-overflow-tooltip="true" />
                    <el-table-column :label="t('status')" min-width="120" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ row.status_name }}</el-tag>
                            <el-tag class="ml-2" type="error" v-else>
                                {{ row.status_name }}
                            </el-tag>

                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="140"
                        :show-overflow-tooltip="true" />
                    <el-table-column prop="expire_time" :label="t('expireTime')" min-width="140"
                        :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-if="row.expire_time == 0">永久</div>
                            <div v-else>{{ row.expire_time }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" width="100">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="siteTableData.page" v-model:page-size="siteTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="siteTableData.total"
                        @size-change="loadSiteList()" @current-change="loadSiteList" />
                </div>
            </div>

        </el-card>
        <edit-site ref="addSiteDialog" @complete="loadSiteList()" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getSiteList, getSiteGroupAll, getStatusList } from '@/api/site'
import { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import EditSite from '@/views/site/components/edit-site.vue'

const siteLink = location.origin + '/site/login'

const groupList = ref([])

const statusList = ref([])

const siteTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        keywords: '',
        group_id: '',
        status: ''
    }
})

const setGroupList = async () => {
    groupList.value = await (await getSiteGroupAll({})).data
}
setGroupList()

const setStatusList = async () => {
    statusList.value = await (await getStatusList()).data
}

setStatusList()

const searchFormRef = ref<FormInstance>()

/**
 * 获取站点列表
 */
const loadSiteList = (page: number = 1) => {
    siteTableData.loading = true
    siteTableData.page = page

    getSiteList({
        page: siteTableData.page,
        limit: siteTableData.limit,
        ...siteTableData.searchParam
    }).then(res => {
        siteTableData.loading = false
        siteTableData.data = res.data.data
        siteTableData.total = res.data.total
    }).catch(() => {
        siteTableData.loading = false
    })
}
loadSiteList()

const router = useRouter()

const addSiteDialog: Record<string, any> | null = ref(null)
/**
 * 添加站点
 */
const addEvent = (data: any) => {
    addSiteDialog.value.setFormData()
    addSiteDialog.value.showDialog = true
}

/**
 * 站点详情
 * @param data
 */
const infoEvent = (data: any) => {
    router.push('/admin/site/info?id=' + data.site_id)
}

/**
 * 站点登录
 * @param data
 */
const toSiteLink = () => {
    window.open(siteLink)
}

</script>

<style lang="scss" scoped>
::v-deep .warm-prompt {
    background-color: var(--el-color-primary-light-9) !important;
}

::v-deep .warm-prompt .el-icon {
    color: var(--el-color-primary);
}

::v-deep .warm-prompt p {
    color: var(--el-color-primary);
}
</style>
