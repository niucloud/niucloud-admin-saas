<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-[24px]">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addSite') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="siteTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('siteName')" prop="keywords">
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

                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="siteTableData.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>

                    <el-form-item :label="t('expireTime')" prop="expire_time">
                        <el-date-picker v-model="siteTableData.searchParam.expire_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadSiteList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-alert class="warm-prompt" type="info">
                <template #default>
                    <div class="flex items-center">
                        <el-icon class="mr-2" size="18">
                            <Warning />
                        </el-icon>
                        <p class="text-base">{{ t('operationTip') }} <span class="cursor-pointer" @click="toSiteLink">{{
                            siteLink }}</span> </p>
                    </div>
                </template>
            </el-alert>

            <div class="mt-[20px]">
                <el-table :data="siteTableData.data" size="large" v-loading="siteTableData.loading">

                    <template #empty>
                        <span>{{ !siteTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="site_id" :label="t('siteId')" min-width="80" :show-overflow-tooltip="true" />

                    <el-table-column :label="t('siteInfo')" min-width="180" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.logo" :src="img(row.logo)" alt="">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/assets/images/site_logo.png" alt="">
                                <div class="flex flex flex-col">
                                    <span>{{ row.site_name || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="group_name" :label="t('groupId')" min-width="80" :show-overflow-tooltip="true" />
                    <el-table-column :label="t('status')" min-width="80" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ row.status_name }}</el-tag>
                            <el-tag class="ml-2" type="error" v-else-if="row.status == 3">
                                {{ row.status_name }}
                            </el-tag>
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

                    <el-table-column :label="t('operation')" fixed="right" width="200">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="urlEvent(row)">{{ t('url') }}</el-button>
                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                            <el-button type="primary" link @click="openClose(row.status, row.site_id)"
                                v-if="row.status == 1 || row.status == 3">{{ row.status == 1 ? t('closeTxt') : t('openTxt')
                                }}</el-button>
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
import { img } from '@/utils/common'
import { t } from '@/lang'
import { getSiteList, getSiteGroupAll, getStatusList, closeSite, openSite } from '@/api/site'
import { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import EditSite from '@/views/site/components/edit-site.vue'
const route = useRoute()
const pageName = route.meta.title

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
        status: '',
        create_time: [],
        expire_time: []

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

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadSiteList()
}

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
 * 站点域名
 * @param data
 */
const urlEvent = (data: any) => {
    ElMessage({
        message: t('siteUrlDevelopMessage'),
        grouping: true,
        type: 'success'
    })
}

const toLink = (link) => {
    router.push(link)
}

/**
 * 站点登录
 * @param data
 */
const toSiteLink = () => {
    window.open(siteLink)
}

const openClose = (i, site_id) => {
    if (i == 1) {
        closeSite({ site_id }).then(res => {
            loadSiteList()
        })
    }
    if (i == 3) {
        openSite({ site_id }).then(res => {
            loadSiteList()
        })
    }
}

</script>

<style lang="scss" scoped>
:deep(.warm-prompt) {
    .el-alert__description {
        margin: 0;
    }
}
</style>
