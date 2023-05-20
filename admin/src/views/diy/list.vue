<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex">
                <el-button type="primary" @click="dialogVisible = true">
                    {{ t('addDiyPage') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[16px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="diyPageTableData.searchParam" ref="searchFormDiyPageRef"
                    v-if="tabValue == 'diy'">
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="diyPageTableData.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('typeName')" prop="type">
                        <el-select v-model="diyPageTableData.searchParam.type" :placeholder="t('pageTypePlaceholder')">
                            <el-option :label="t('all')" value="" />
                            <el-option v-for="(item, key) in pageType" :label="item.title" :value="key" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadDiyPageList()">{{ t('search') }}</el-button>
                        <el-button @click="searchFormDiyPageRef?.resetFields()">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="diyRouteTableData.searchParam" ref="searchFormDiyRouteRef"
                    v-if="tabValue == 'route'">
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="diyRouteTableData.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadDiyRouteList()">{{ t('search') }}</el-button>
                        <el-button @click="searchFormDiyRouteRef?.resetFields()">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[16px]">

                <el-tabs v-model="tabValue" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane :label="t('diyPage')" name="diy">

                        <el-table :data="diyPageTableData.data" size="large" v-loading="diyPageTableData.loading">

                            <template #empty>
                                <span>{{ !diyPageTableData.loading ? t('emptyData') : '' }}</span>
                            </template>

                            <el-table-column prop="title" :label="t('title')" min-width="120" />
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
                                    <el-button type="primary" link @click="promoteEvent(row)">{{ t('promote') }}</el-button>
                                    <el-button v-if="row.type != 'DIY_PAGE' && row.is_default == 0" type="primary" link
                                        @click="setUse(row)">{{ t('use') }}</el-button>
                                    <el-button v-if="row.type == 'DIY_PAGE'" type="primary" link @click="openShare(row)">{{
                                        t('shareSet') }}</el-button>
                                    <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                                    <el-button v-if="row.type == 'DIY_PAGE' || row.is_default == 0" type="danger" link
                                        @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                        <div class="mt-[16px] flex justify-end">
                            <el-pagination v-model:current-page="diyPageTableData.page"
                                v-model:page-size="diyPageTableData.limit" layout="total, sizes, prev, pager, next, jumper"
                                :total="diyPageTableData.total" @size-change="loadDiyPageList()"
                                @current-change="loadDiyPageList" />
                        </div>
                    </el-tab-pane>
                    <!-- 基础页面路径 -->
                    <el-tab-pane :label="t('basicRoute')" name="route">
                        <el-table :data="diyRouteTableData.data" size="large" v-loading="diyRouteTableData.loading">
                            <template #empty>
                                <span>{{ !diyRouteTableData.loading ? t('emptyData') : '' }}</span>
                            </template>
                            <el-table-column prop="title" :label="t('title')" min-width="120" />
                            <el-table-column prop="page" :label="t('wapUrl')" min-width="120">
                                <template #default="{ row }">
                                    <span class="mr-[10px]">{{ wapDomain + row.page }}</span>
                                    <el-button type="primary" link @click="copyEvent(wapDomain + row.page)">{{ t('copy')
                                    }}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="page" :label="t('weappUrl')" min-width="120">
                                <template #default="{ row }">
                                    <span class="mr-[10px]">{{ row.page }}</span>
                                    <el-button type="primary" link @click="copyEvent(row.page)">{{ t('copy') }}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column :label="t('share')" fixed="right" min-width="80">
                                <template #default="{ row }">
                                    <el-button v-if="row.is_share == 1" type="primary" link @click="openShare(row)">{{
                                        t('shareSet') }}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>

                </el-tabs>

            </div>

        </el-card>

        <!--添加页面-->
        <el-dialog v-model="dialogVisible" :title="t('addPageTips')" width="20%">

            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules">
                <el-form-item :label="t('typeName')" prop="type">
                    <el-select v-model="formData.type" :placeholder="t('pageTypePlaceholder')">
                        <el-option v-for="(item, key) in pageType" :label="item.title" :value="key" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="t('title')" prop="title">
                    <el-input v-model="formData.title" :placeholder="t('titlePlaceholder')" clearable maxlength="12"
                        show-word-limit />
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
                    <el-input v-model="shareFormData[tabShareType].title" :placeholder="t('shareTitlePlaceholder')"
                        clearable maxlength="30" show-word-limit />
                </el-form-item>
                <el-form-item :label="t('shareDesc')" prop="desc" v-if="tabShareType == 'wechat'">
                    <el-input v-model="shareFormData[tabShareType].desc" :placeholder="t('shareDescPlaceholder')"
                        type="textarea" rows="4" clearable maxlength="100" show-word-limit />
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

        <!-- 推广-->
        <el-dialog v-model="promoteDialogVisible" :title="t('promote')" width="30%">
            <el-form label-width="90px">
                <el-form-item :label="t('shareLink')">
                    <el-input readonly :value="promoteWapDomain">
                        <template #append>
                            <el-button @click="copyEvent(promoteWapDomain)" class="bg-primary copy">{{ t('copy')
                            }}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-image :src="wapImage" />
                </el-form-item>
            </el-form>

            <!--			<el-tabs v-model="tabPromote">-->
            <!--				<el-tab-pane :label="t('wechat')" name="wechat"></el-tab-pane>-->
            <!--				<el-tab-pane :label="t('weapp')" name="weapp"></el-tab-pane>-->
            <!--			</el-tabs>-->

        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, computed } from 'vue'
import { t } from '@/lang'
import { getDiyPageList, deleteDiyPage, setUseDiyPage, getDiyPageType, getDiyRouteList, getDiyRouteInfo, editDiyPageShare, editDiyRouteShare } from '@/api/diy'
import { TabsPaneContext, ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import QRCode from "qrcode";
import { getUrl } from '@/api/sys'

const pageType: any = reactive({})

const router = useRouter()

// 添加自定义页面
const formData = reactive({
    type: '',
    title: ''
})

// 表单验证规则
const formRules = computed(() => {
    return {
        type: [
            { required: true, message: t('pageTypePlaceholder'), trigger: 'blur' },
        ],
        title: [
            { required: true, message: t('titlePlaceholder'), trigger: 'blur' },
        ]
    }
})

const formRef = ref<FormInstance>()
const dialogVisible = ref(false)
const addEvent = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            dialogVisible.value = false;
            router.push('/decorate/edit?type=' + formData.type + '&title=' + formData.title);
        }
    })
}

let diyRouteTableData = reactive({
    loading: true,
    data: [],
    searchParam: {
        "title": "",
    }
})

const wapDomain = ref('')
const getDomain = async () => {
    wapDomain.value = (await getUrl()).data.wap_url;
};
getDomain();

/**
 * 获取自定义路由列表
 */
const loadDiyRouteList = () => {
    diyRouteTableData.loading = true

    getDiyRouteList({
        ...diyRouteTableData.searchParam
    }).then(res => {
        diyRouteTableData.loading = false
        diyRouteTableData.data = res.data
    }).catch(() => {
        diyRouteTableData.loading = false
    })
}
loadDiyRouteList()

// 获取自定义页面类型
getDiyPageType({}).then(res => {
    for (let key in res.data) {
        pageType[key] = res.data[key]
    }
})

let diyPageTableData: any = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        "title": "",
        "type": '',
    }
})

const tabValue = ref('diy')
const handleClick = (tab: TabsPaneContext, event: Event) => {
    tabValue.value = tab.props.name;
    if (tabValue.value == 'diy') {
        loadDiyPageList()
    } else {
        loadDiyRouteList()
    }

}

const searchFormDiyRouteRef = ref<FormInstance>()
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
    let url = router.resolve({
        path: '/decorate/edit',
        query: { id: data.id }
    });
    window.open(url.href);
}

// 删除自定义页面
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('diyPageDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteDiyPage(id).then(() => {
            loadDiyPageList()
        }).catch(() => {
        })
    })
}

// 设为使用
const setUse = (data: any) => {
    setUseDiyPage({ id: data.id }).then(() => {
        loadDiyPageList()
    })
}

/**
 * 复制
 */
const { copy, isSupported, copied } = useClipboard()
const copyEvent = (text: string) => {
    if (!isSupported.value) {
        ElMessage({
            message: t('notSupportCopy'),
            type: 'warning'
        })
    }
    copy(text)
}

watch(copied, () => {
    if (copied.value) {
        ElMessage({
            message: t('copySuccess'),
            type: 'success'
        })
    }
})

const tabShareType = ref('wechat')
const sharePage = ref('')
const shareFormId = ref(0)
const diyRouteData = reactive({
    title: '',
    name: '',
    page: '',
    is_share: 0,
    sort: 0
})
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
    return {
        // title: [
        //     { required: true, message: t('shareTitlePlaceholder'), trigger: 'blur' },
        //     // {
        //     //     validator: (rule: any, value: string, callback: any) => {
        //     //         console.log('validator',value,tabShareType)
        //     //         // let content = value.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "")
        //     //         // if(!content && value.indexOf('img') === -1){
        //     //         //     callback(new Error(t('shareTitlePlaceholder')))
        //     //         // }else callback()
        //     //     },
        //     //     trigger: ['blur', 'change']
        //     // }
        // ],
    }
})

const shareFormRef = ref<FormInstance>()
const openShare = async (row: any) => {
    if (tabValue.value == 'route') {
        // 基础页面
        let info = (await getDiyRouteInfo({
            name: row.name
        })).data;

        if (info.title) {
            row.id = info.id;
            row.title = info.title
            row.name = info.name
            row.page = info.page
            row.is_share = info.is_share
            row.sort = info.sort
            row.share = info.share
        }

        diyRouteData.title = row.title
        diyRouteData.name = row.name
        diyRouteData.page = row.page
        diyRouteData.is_share = row.is_share
        diyRouteData.sort = row.sort

    }
    shareFormId.value = row.id;
    sharePage.value = row.title;
    let share = row.share ? JSON.parse(row.share) : {
        wechat: { title: '', desc: '', url: '' },
        weapp: { title: '', url: '' }
    };
    if (share) {
        shareFormData.wechat = share.wechat;
        shareFormData.weapp = share.weapp;
    }

    shareDialogVisible.value = true;
}

const shareEvent = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            let save = tabValue.value == 'diy' ? editDiyPageShare : editDiyRouteShare
            save({
                id: shareFormId.value,
                share: JSON.stringify(shareFormData),
                ...diyRouteData
            }).then(() => {
                if (tabValue.value == 'diy') {
                    loadDiyPageList()
                } else {
                    loadDiyRouteList()
                }
                shareDialogVisible.value = false;
            }).catch(() => {
            })
        }
    })
}

const promoteDialogVisible = ref(false)
const tabPromote = ref('wechat')
const promoteWapDomain = ref('')
const wapImage = ref('')
const promoteEvent = (data: any) => {
    promoteWapDomain.value = wapDomain.value + '/pages/index/diy?id=' + data.id;
    QRCode.toDataURL(promoteWapDomain.value, { errorCorrectionLevel: 'L', margin: 0, width: 100 }).then(url => {
        wapImage.value = url
    })

    promoteDialogVisible.value = true;
    console.log('promoteEvent', data)
}
</script>

<style lang="scss">
.copy {
    background: var(--el-color-primary) !important;
    color: var(--el-color-white) !important;
}
</style>
<style lang="scss" scoped></style>