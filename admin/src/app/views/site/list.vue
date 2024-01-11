<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-[20px]">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addSite') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="siteTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('siteName')" prop="keywords">
                        <el-input v-model="siteTableData.searchParam.keywords" :placeholder="t('siteNamePlaceholder')" />
                    </el-form-item>

                    <el-form-item :label="t('app')" prop="app_id">
                        <el-select v-model="siteTableData.searchParam.app" clearable @change="appChangeFn"
                            :placeholder="t('appIdPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="all" />
                            <el-option :label="item['title']" :value="item['key']"
                                v-for="(item, index) in Object.values(addonList)"  :key="index"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('groupId')" prop="group_id">
                        <el-select v-model="siteTableData.searchParam.group_id" clearable
                            :placeholder="t('groupIdPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item['group_name']" :value="item['group_id']"
                                v-for="(item, index) in groupList[siteTableData.searchParam.app]" :key="index"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('status')" prop="status">
                        <el-select v-model="siteTableData.searchParam.status" clearable
                            :placeholder="t('groupIdPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item" :value="index" v-for="(item, index) in statusList" :key="index"/>
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

            <div class="mt-[20px]">
                <el-table :data="siteTableData.data" size="large" v-loading="siteTableData.loading">

                    <template #empty>
                        <span>{{ !siteTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="site_id" :label="t('siteId')" width="100" :show-overflow-tooltip="true" />

                    <el-table-column :label="t('siteInfo')" width="300" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.logo" :src="img(row.logo)" alt="">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/app/assets/images/site_logo.png"
                                    alt="">
                                <div class="flex flex flex-col">
                                    <span>{{ row.site_name || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('manager')" width="150" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <div class="flex flex flex-col">
                                    <span>{{ row.admin.username || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="group_name" :label="t('groupId')" width="150" :show-overflow-tooltip="true" />
                    <el-table-column prop="create_time" :label="t('createTime')" width="250"
                        :show-overflow-tooltip="true" />
                    <el-table-column prop="expire_time" :label="t('expireTime')" width="250" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-if="row.expire_time == 0">永久</div>
                            <div v-else>{{ row.expire_time }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('status')" width="100" align="center">
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

                    <el-table-column :label="t('operation')" min-width="250" align="right" fixed="right">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="toSiteLink(row)">
                                <!--                                <a href="javascript:;" title="启动站点" class="iconfont iconicon_huojian"></a>-->
                                访问站点
                            </el-button>
                            <el-button type="primary" link @click="openClose(row.status, row.site_id)"
                                v-if="row.status == 1 || row.status == 3">{{ row.status == 1 ? t('closeTxt') : t('openTxt')
                                }}</el-button>
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row)">{{ t('delete') }}</el-button>
                            <el-button type="primary" link @click="urlEvent(row)">{{ t('url') }}</el-button>
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
import { img } from '@/utils/common'
import { t } from '@/lang'
import { getSiteList, getSiteGroupAll, getStatusList, closeSite, openSite, deleteSite } from '@/app/api/site'
import { ElMessageBox, FormInstance, ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import EditSite from '@/app/views/site/components/edit-site.vue'
import { getInstalledAddonList } from '@/app/api/addon'
// import { CollectionTag } from '@element-plus/icons-vue'
// import { deleteMenu } from "@/app/api/sys"

const route = useRoute()
const pageName = route.meta.title

const groupList = ref({
    all: []
})

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
        app: 'all',
        status: '',
        create_time: [],
        expire_time: []

    }
})
siteTableData.searchParam.status = route.query.id || ''
const setGroupList = async () => {
    const obj = await (await getSiteGroupAll({})).data

    groupList.value.all = obj
    obj.forEach((item:any, index:any) => {
        if (!groupList.value[item.app]) {
            groupList.value[item.app] = []
            groupList.value[item.app].push(item)
        } else {
            groupList.value[item.app].push(item)
        }
    })
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
 * 应用选择
 */
const appChangeFn = () => {
    siteTableData.searchParam.group_id = ''
}

/**
 * 获取应用列表
 */
const addonList = ref([])
getInstalledAddonList().then(({ data }) => {
    addonList.value = data
}).catch()

/**
 * 获取站点列表
 */
const loadSiteList = (page: number = 1) => {
    siteTableData.loading = true
    siteTableData.page = page
    siteTableData.searchParam.app = siteTableData.searchParam.app == 'all' ? '' : siteTableData.searchParam.app
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
    router.push({ path: '/admin/site/info', query: { id: data.site_id } })
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

/**
 * 编辑站点详情
 * @param data
 */
const editEvent = (data: any) => {
    addSiteDialog.value.setFormData(data)
    addSiteDialog.value.showDialog = true
}

/**
 * 站点登录
 * @param data
 */
const toSiteLink = (data: any) => {
    window.localStorage.setItem('site.siteId', data.site_id)
    window.open(`${location.origin}/site/`)
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

const deleteEvent = (data: any) => {
    ElMessageBox.confirm(t('siteDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteSite(data.site_id).then(res => {
            loadSiteList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped>
:deep(.warm-prompt) {
    .el-alert__description {
        margin: 0;
    }
}</style>
