<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-[20px]">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="dialogVisible = true">{{ t('addDiyPage') }}</el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="diyPageTableData.searchParam" ref="searchFormDiyPageRef">
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="diyPageTableData.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('forAddon')" prop="addon_name">
                        <el-select v-model="diyPageTableData.searchParam.addon_name" :placeholder="t('pageTypePlaceholder')">
                            <el-option :label="t('all')" value="" />
                            <el-option v-for="(item, key) in apps" :label="item.title" :value="key" :key="key"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('typeName')" prop="type">
                        <el-select v-model="diyPageTableData.searchParam.type" :placeholder="t('pageTypePlaceholder')">
                            <el-option :label="t('all')" value="" />
                            <el-option v-for="(item, key) in pageType" :label="item.title" :value="key" :key="key"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadDiyPageList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormDiyPageRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-table :data="diyPageTableData.data" size="large" v-loading="diyPageTableData.loading">

                <template #empty>
                    <span>{{ !diyPageTableData.loading ? t('emptyData') : '' }}</span>
                </template>

                <el-table-column prop="title" :label="t('title')" min-width="120" />
                <el-table-column prop="addon_name" :label="t('forAddon')" min-width="80" />
                <el-table-column prop="type_name" :label="t('typeName')" min-width="80" />
                <el-table-column :label="t('status')" min-width="80">
                    <template #default="{ row }">
                        <span v-if="row.type == 'DIY_PAGE'">-</span>
                        <template v-else>
                            <span v-if="row.is_default == 1" class="text-primary">{{ t('isUse') }}</span>
                            <span v-else>{{ t('unused') }}</span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="update_time" :label="t('updateTime')" min-width="120" />

                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="160">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="toPreview(row)">{{ t('promote') }}</el-button>
                        <el-button v-if="row.is_default == 0" type="primary" link @click="setUse(row.id)">{{ t('use') }}</el-button>
                        <el-button v-if="row.type == 'DIY_PAGE'" type="primary" link @click="openShare(row)">{{ t('shareSet') }}</el-button>
                        <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                        <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="diyPageTableData.page" v-model:page-size="diyPageTableData.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="diyPageTableData.total"
                    @size-change="loadDiyPageList()" @current-change="loadDiyPageList" />
            </div>

        </el-card>

        <!--添加页面-->
        <el-dialog v-model="dialogVisible" :title="t('addPageTips')" width="25%">

            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules">
                <el-form-item :label="t('title')" prop="title">
                    <el-input v-model="formData.title" :placeholder="t('titlePlaceholder')" clearable maxlength="12" show-word-limit class="w-full" />
                </el-form-item>
                <el-form-item :label="t('typeName')" prop="type">
                    <el-select v-model="formData.type" :placeholder="t('pageTypePlaceholder')" class="w-full">
                        <el-option v-for="(item, key) in pageType" :label="item.title" :value="key" :key="key"/>
                    </el-select>
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="addEvent(formRef)">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 分享设置-->
        <el-dialog v-model="shareDialogVisible" :title="t('shareSet')" width="30%">
            <el-tabs v-model="tabShareType">
                <el-tab-pane :label="t('wechat')" name="wechat"></el-tab-pane>
                <el-tab-pane :label="t('weapp')" name="weapp"></el-tab-pane>
            </el-tabs>
            <el-form :model="shareFormData[tabShareType]" label-width="90px" ref="shareFormRef" :rules="shareFormRules">
                <el-form-item :label="t('sharePage')">
                    <span>{{ sharePage }}</span>
                </el-form-item>
                <el-form-item :label="t('shareTitle')" prop="title">
                    <el-input v-model="shareFormData[tabShareType].title" :placeholder="t('shareTitlePlaceholder')" clearable maxlength="30" show-word-limit />
                </el-form-item>
                <el-form-item :label="t('shareDesc')" prop="desc" v-if="tabShareType == 'wechat'">
                    <el-input v-model="shareFormData[tabShareType].desc" :placeholder="t('shareDescPlaceholder')" type="textarea" rows="4" clearable maxlength="100" show-word-limit />
                </el-form-item>
                <el-form-item :label="t('shareImageUrl')" prop="url">
                    <upload-image v-model="shareFormData[tabShareType].url" :limit="1" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="shareDialogVisible = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="shareEvent(shareFormRef)">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { t } from '@/lang'
import { getApps,getDiyPageList, deleteDiyPage, getDiyTemplate, editDiyPageShare, setUseDiyPage } from '@/app/api/diy'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { getUrl } from '@/app/api/sys'

const router = useRouter()
const route = useRoute()
const pageName = route.meta.title
const pageType: any = reactive({}) // 页面类型

// 添加自定义页面
const formData = reactive({
    title: '',
    type: ''
})

// 表单验证规则
const formRules = computed(() => {
    return {
        title: [
            { required: true, message: t('titlePlaceholder'), trigger: 'blur' }
        ],
        type: [
            { required: true, message: t('pageTypePlaceholder'), trigger: 'blur' }
        ]
    }
})

const formRef = ref<FormInstance>()
const dialogVisible = ref(false)
const addEvent = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            dialogVisible.value = false
            const query = { type: formData.type, title: formData.title }
            router.push({
                path: '/decorate/edit',
                query
            })
        }
    })
}

const wapDomain = ref('')
const getDomain = async () => {
    wapDomain.value = (await getUrl()).data.wap_url
}

getDomain()

// 获取自定义页面类型
getDiyTemplate({ mode: '' }).then(res => {
    for (const key in res.data) {
        pageType[key] = res.data[key]
    }
})

const apps: any = reactive({}) // 应用插件列表

getApps({}).then(res=>{
    if(res.data){
        for (const key in res.data) {
            apps[key] = res.data[key];
        }
    }
});

const diyPageTableData: any = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        title: '',
        type: '',
        mode: '',
        addon_name: ''
    }
})

const searchFormDiyPageRef = ref<FormInstance>()

// 获取自定义页面列表
const loadDiyPageList = (page: number = 1) => {
    diyPageTableData.loading = true
    diyPageTableData.page = page

    getDiyPageList({
        page: diyPageTableData.page,
        limit: diyPageTableData.limit,
        ...diyPageTableData.searchParam
    }).then(res => {
        diyPageTableData.loading = false
        diyPageTableData.data = res.data.data
        diyPageTableData.total = res.data.total
    }).catch(() => {
        diyPageTableData.loading = false
    })
}

loadDiyPageList()

// 编辑自定义页面
const editEvent = (data: any) => {
    const url = router.resolve({
        path: '/decorate/edit',
        query: { id: data.id }
    })
    window.open(url.href)
}

// 设为使用
const setUse = (id: any) => {
    setUseDiyPage({id}).then(() => {
        loadDiyPageList()
    })
}

// 删除自定义页面
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('diyPageDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteDiyPage(id).then(() => {
            loadDiyPageList()
        }).catch(() => {
        })
    })
}

// 跳转去预览
const toPreview = (data: any) => {
    const url = router.resolve({
        path: '/preview/wap',
        query: {
            page: data.type_page + '?id=' + data.id
        }
    });
    window.open(url.href)
}

const tabShareType = ref('wechat')
const sharePage = ref('')
const shareFormId = ref(0)
const shareFormData = reactive({
    wechat: {
        title: '',
        desc: '',
        url: ''
    },
    weapp: {
        title: '',
        url: ''
    }
})

const shareDialogVisible = ref(false)
const shareFormRules = computed(() => {
    return {}
})

const shareFormRef = ref<FormInstance>()
const openShare = async (row: any) => {
    shareFormId.value = row.id
    sharePage.value = row.title
    const share = row.share ? JSON.parse(row.share) : {
        wechat: { title: '', desc: '', url: '' },
        weapp: { title: '', url: '' }
    }
    if (share) {
        shareFormData.wechat = share.wechat
        shareFormData.weapp = share.weapp
    }

    shareDialogVisible.value = true
}

const shareEvent = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            editDiyPageShare({
                id: shareFormId.value,
                share: JSON.stringify(shareFormData)
            }).then(() => {
                loadDiyPageList()
                shareDialogVisible.value = false
            }).catch(() => {
            })
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadDiyPageList()
}

</script>

<style lang="scss" scoped>
</style>