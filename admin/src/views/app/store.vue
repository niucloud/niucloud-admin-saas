<template>
    <div class="main-container h-[500px] w-full p-5 bg-white" v-loading="loading">

        <div class="flex mb-4">
            <div class="border rounded-sm switch-btn active px-4 py-1 cursor-pointer flex items-center	">
                <img src="@/assets/images/app_store/local_icon_select.png" class="mr-1.5 w-3.5 h-3.5 mb-0.5">
                {{ t('localAppText') }}
            </div>
            <div class="border rounded-sm switch-btn px-4 py-1 ml-3 cursor-pointer flex items-center" @click="market()">
                <img src="@/assets/images/app_store/market_icon.png" class="mr-1.5 w-3.5 h-3.5 mb-0.5">
                {{ t('marketAppText') }}
            </div>
        </div>
        <div class="relative">
            <div class="absolute right-0 top-[2px] flex items-center cursor-pointer z-20 border	border-inherit">
                <div class="flex item-center justify-center px-[6px] py-[4px]" :class="{ 'bg-slate-200': showType == 'small' }" @click="showType = 'small'">
                    <img src="@/assets/images/app_store/switch_icon_1.png" class=" w-[16px] h-[16px]">
                </div>
                <div class="flex item-center justify-center px-[6px] py-[4px]" :class="{ 'bg-slate-200': showType == 'large' }" @click="showType = 'large'">
                    <img src="@/assets/images/app_store/switch_icon_2.png" class="w-[16px] h-[16px] ">
                </div>
            </div>
            <el-tabs v-model="activeName" class="demo-tabs " @tab-click="handleClick">

                <el-tab-pane :label="installLabel" name="installed">
                    <div class="flex flex-wrap px-2 plug-list pb-10">
                        <div v-for="(item, index) in localList.installed" :key="index + 'a'" class="flex items-center cursor-pointer  w-[295px] relative plug-item mr-4 mb-4" @click="getAddonDetialFn(item)" v-if="showType == 'small'">
                            <div class="p-3">
                                <img class="w-[44px] h-[44px] rounded-sm" v-if="item.icon" :src="img(item.icon)" alt="">
                                <img class="w-[44px] h-[44px] rounded-sm" v-else src="@/assets/images/icon-addon.png" alt="">
                            </div>
                            <div class="flex items-center w-[220px] border-b py-3 justify-between">
                                <div class="flex flex-col">
                                    <span class="text-[14px] truncate w-[160px]">{{ item.title }}</span>
                                    <span class="text-xs text-gray-400 truncate w-[160px] mt-[4px]">{{ item.desc }}</span>
                                </div>
                                <span class="w-max flex items-center plug-item-operate border rounded-2xl px-3.5 py-1.5 leading-none " @click.stop="uninstallAddonFn(item.key)">{{ t('unload') }}</span>
                            </div>
                        </div>

                        <div class="flex flex-wrap plug-list pb-10 plug-large" v-if="showType == 'large'">
                            <div class="app-item cursor-pointer mr-4 mt-[20px] pb-2 bg-[#f7f7f7]" v-for="(item, index) in localList.installed" :key="index + 'a'" @click="getAddonDetialFn(item)">
                                <div class="flex justify-center items-center">
                                    <img class="w-[240px] h-[120px]" v-if="item.cover" :src="img(item.cover)" />
                                    <img v-else class="w-[240px] h-[120px]" src="@/assets/images/app_store/app_store_default.png" />
                                </div>
                                <div class="flex w-[240px] h-[46px]">
                                    <div class="text-left mt-2 w-[190px]">
                                        <p class="app-text text-[14px] text-[#222] pl-2">{{ item.title }}</p>
                                        <p class="app-text text-[12px] text-[#999] pl-2">{{ item.desc }}</p>
                                    </div>
                                    <div class="flex items-center pr-2">
                                        <span class="w-max flex items-center plug-item-operate border rounded-2xl px-2 py-1 leading-none mt-[10px]" @click.stop="uninstallAddonFn(item.key)">{{ t('unload') }}</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <el-empty :description="t('noPlug')" v-if="!localList.installed.length && !loading" class="mx-auto" />
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="uninstalledLabel" name="uninstalled">
                    <div class="flex flex-wrap px-2 plug-list pb-10">

                        <div v-for="(item, index) in localList.uninstalled" :key="index + 'a'" class="flex items-center cursor-pointer  w-[295px] relative plug-item mr-4 mb-4" @click="getAddonDetialFn(item)" v-if="showType == 'small'">
                            <div class="p-3">
                                <!-- <img class="w-[44px] h-[44px] rounded-sm" v-if="item.icon" :src="img(item.icon)" alt=""> -->
                                <img class="w-[44px] h-[44px] rounded-sm" src="@/assets/images/icon-addon.png" alt="">
                            </div>
                            <div class="flex items-center w-[220px] border-b py-3 justify-between">
                                <div class="flex flex-col">
                                    <span class="text-[14px] truncate w-[160px]">{{ item.title }}</span>
                                    <span class="text-xs text-gray-400 truncate w-[160px] mt-[4px]">{{ item.desc }}</span>
                                </div>
                                <span class="w-max flex items-center plug-item-operate border rounded-2xl px-3.5 py-1.5 leading-none" @click.stop="installAddonFn(item.key)">{{ t('install') }}</span>
                            </div>
                        </div>

                        <div class="flex flex-wrap plug-list pb-10 plug-large" v-if="showType == 'large'">
                            <div class="app-item cursor-pointer mr-4 mt-[20px] pb-2 bg-[#f7f7f7]" v-for="(item, index) in localList.uninstalled" :key="index + 'a'" @click="getAddonDetialFn(item)">
                                <div class="flex justify-center items-center">
                                    <!-- <img class="w-[240px] h-[120px]" v-if="item.cover" :src="img(item.cover)"/> -->

                                    <img class="w-[240px] h-[120px]" src="@/assets/images/app_store/app_store_default.png" />

                                </div>
                                <div class="flex w-[240px] h-[46px]">
                                    <div class="text-left mt-2 w-[190px]">
                                        <p class="app-text text-[14px] text-[#222] pl-2">{{ item.title }}</p>
                                        <p class="app-text text-[12px] text-[#999] pl-2">{{ item.desc }}</p>
                                    </div>
                                    <div class="flex items-center pr-2">
                                        <span class="w-max flex items-center plug-item-operate border rounded-2xl	px-2 py-1 leading-none mt-[10px]" @click.stop="installAddonFn(item.key)">{{ t('install') }}</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <el-empty :description="t('noPlug')" v-if="!localList.uninstalled.length && !loading" class="mx-auto" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 详情 -->
        <el-dialog v-model="appStoreShowDialog" :title="t('plugDetail')" width="500px" :destroy-on-close="true">
            <el-form :model="appStoreInfo" label-width="120px" ref="formRef" class="page-form">
                <el-form-item :label="t('title')">
                    <div class="input-width"> {{ appStoreInfo.title }} </div>
                </el-form-item>
                <el-form-item :label="t('desc')">
                    <div class="input-width"> {{ appStoreInfo.desc }} </div>
                </el-form-item>
                <el-form-item :label="t('author')">
                    <div class="input-width"> {{ appStoreInfo.author }} </div>
                </el-form-item>
                <el-form-item :label="t('version')">
                    <div class="input-width"> {{ appStoreInfo.version }} </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="appStoreShowDialog = false">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 安装弹窗 -->
        <el-dialog v-model="installShowDialog" :title="t('addonInstall')" width="60vw" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="installShowDialogClose">
            <el-steps :space="200" :active="installStep" finish-status="success" align-center>
                <el-step :title="t('envCheck')" class="flex-1" />
                <el-step :title="t('installProgress')" class="flex-1" />
                <el-step :title="t('installComplete')" class="flex-1" />
            </el-steps>
            <div v-show="installStep == 0" v-loading="!installCheckResult.dir">
                <el-scrollbar max-height="50vh">
                    <div class="min-h-[150px]">
                        <div class="bg-[#fff] my-3" v-if="installCheckResult.dir">
                            <el-alert :title="t('jobError')" type="error" :closable="false" class="mt-[20px]" v-if="!installCheckResult.job_normal" />
                            <p class="pt-[20px] pl-[20px] ">{{ t('dirPermission') }}</p>
                            <div class="px-[20px] text-[14px]">
                                <el-row class="py-[10px] items table-head-bg pl-[15px] mb-[10px]">
                                    <el-col :span="12">
                                        <span>{{ t('path') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('demand') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('status') }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="pb-[10px] items pl-[15px]" v-for="item in installCheckResult.dir.is_readable">
                                    <el-col :span="12">
                                        <span>{{ item.dir }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('readable') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span v-if="item.status"><el-icon color="green"><Select /></el-icon></span>
                                        <span v-else>
                                            <el-icon color="red">
                                                <CloseBold />
                                            </el-icon>
                                        </span>
                                    </el-col>
                                </el-row>
                                <el-row class="pb-[10px] items pl-[15px]" v-for="item in installCheckResult.dir.is_write">
                                    <el-col :span="12">
                                        <span>{{ item.dir }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('write') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span v-if="item.status"><el-icon color="green"><Select /></el-icon></span>
                                        <span v-else>
                                            <el-icon color="red">
                                                <CloseBold />
                                            </el-icon>
                                        </span>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="bg-[#fff] my-3" v-if="installCheckResult.dir">
                            <p class="pl-[20px] ">{{ t('packageManageTool') }}</p>
                            <div class="px-[20px] text-[14px]">
                                <el-row class="py-[10px] items table-head-bg pl-[15px] mb-[10px]">
                                    <el-col :span="12">
                                        <span>{{ t('name') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('demand') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('status') }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="pb-[10px] items pl-[15px]" v-for="item in installCheckResult.runtime">
                                    <el-col :span="12">
                                        <span>{{ item.name }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('installLabel') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span v-if="item.status"><el-icon color="green"><Select /></el-icon></span>
                                        <span v-else>
                                            <el-icon color="red">
                                                <CloseBold />
                                            </el-icon>
                                        </span>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="bg-[#fff] my-3" v-if="installCheckResult.conflict_files && installCheckResult.conflict_files.length">
                            <p class="pl-[20px] ">{{ t('conflictFiles') }}</p>
                            <div class="px-[20px] text-[14px] pt-[10px] pl-[15px]">
                                <el-row class="pb-[10px] items" v-for="item in installCheckResult.conflict_files">
                                    <el-col :span="24">
                                        <span>{{ item }}</span>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="bg-[#fff] my-3">
                            <p class="pl-[20px] ">{{ t('process') }}</p>
                            <div class="px-[20px] text-[14px]">
                                <el-row class="py-[10px] items table-head-bg pl-[15px] mb-[10px]">
                                    <el-col :span="12">
                                        <span>{{ t('name') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('demand') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('status') }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="pb-[10px] items pl-[15px]">
                                    <el-col :span="12">
                                        <span>php think queue:listen</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span>{{ t('open') }}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <span v-if="installCheckResult.job_normal">
                                            <el-icon color="green"><Select /></el-icon>
                                        </span>
                                        <span v-else>
                                            <el-icon color="red">
                                                <CloseBold />
                                            </el-icon>
                                        </span>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
                <div class="flex justify-end">
                    <el-button type="primary" :disabled="!installCheckResult.is_pass" @click="handleInstall">{{ t('install') }}</el-button>
                </div>
            </div>
            <div v-show="installStep == 1" class="h-[50vh] mt-[20px]">
                <terminal name="my-terminal" :context="currAddon" :init-log="null" :show-header="false" :show-log-time="true" />
            </div>
            <div v-show="installStep > 1" class="h-[50vh] mt-[20px] flex items-center justify-center">
                <el-result icon="success" :title="t('addonInstallSuccess')"></el-result>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { t } from '@/lang'
import { getAddonLocal, uninstallAddon, installAddon, preInstallCheck, getAddonInstallTaskState, executeInstall } from '@/api/addon'
import { TabsPaneContext, ElMessageBox } from 'element-plus'
import { img } from '@/utils/common'
import { Terminal, api as terminalApi } from 'vue-web-terminal'

const activeName = ref('installed')

const loading = ref<Boolean>(false)
const handleClick = (tab: TabsPaneContext, event: Event) => {
}

const showType = ref('large')

const installLabel = computed(() => {
    let text = t('installLabel')
    localList.value.installed.length && (text += ` (${localList.value.installed.length})`)
    return text
})

const uninstalledLabel = computed(() => {
    let text = t('uninstalledLabel')
    localList.value.uninstalled.length && (text += ` (${localList.value.uninstalled.length})`)
    return text
})

/**
 * 本地下载的插件列表
 */
const localList = ref({
    installed: [],
    uninstalled: []
})
const localListFn = () => {
    loading.value = true
    getAddonLocal({}).then(res => {
        const data = res.data

        localList.value.installed = []
        localList.value.uninstalled = []

        data.forEach(element => {
            if (element.install_info && Object.keys(element.install_info)?.length) {
                localList.value.installed.push(element)
            } else {
                localList.value.uninstalled.push(element)
            }
        })
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
localListFn()

const currAddon = ref('')
// 安装面板弹窗
const installShowDialog = ref(false)
// 安装任务
let installTask: AnyObject = {}
// 当前查询的任务
let currTask: string = ''
// 已执行任务
let executedTask: string[] = []
// 安装步骤
const installStep = ref(0)
// 安装检测结果
const installCheckResult = ref({})
// 定时器对象
let timer: null | any = null
/**
 * 安装
 * @param key
 */
const installAddonFn = (key: string) => {
    currAddon.value = key
    installAddon({ addon: key }).then(res => {
        installStep.value = 0
        executedTask = []
        installTask = makeIterator(Object.keys(res.data))
        currTask = installTask.next().value
        installShowDialog.value = true

        preInstallCheck(key).then(res => {
            installCheckResult.value = res.data
        }).catch(() => { })
    }).catch(() => {
    })
}

/**
 * 创建遍历器
 * @param arr array
 */
const makeIterator = (arr: string[]) => {
    let nextIndex = 0
    return {
        next: function () {
            return nextIndex < arr.length
                ? { value: arr[nextIndex++] }
                : { done: true }
        }
    }
}

const handleInstall = () => {
    if (!installCheckResult.value.is_pass) return
    installStep.value += 1

    terminalApi.execute('my-terminal', 'clear')

    executeInstall(currAddon.value)
        .then(() => {
            timer = setInterval(() => {
                getAddonInstallTaskState(currAddon.value, currTask).then(({ data }) => {
                    if (!executedTask.includes(currTask)) {
                        terminalApi.execute('my-terminal', data.command)
                        executedTask.push(currTask)
                    }
                    switch (data.state) {
                        case 'success':
                            terminalApi.pushMessage('my-terminal', { content: `${data.desc}执行成功`, class: 'success' })
                            if (data.step == 'installComplete') {
                                clearInterval(timer)
                                installStep.value += 2
                                localListFn()
                            } else {
                                currTask = installTask.next().value
                            }
                            break
                        case 'fail':
                            terminalApi.pushMessage('my-terminal', { content: `${data.desc}执行失败`, class: 'error' })
                            terminalApi.pushMessage('my-terminal', { content: `失败原因：${data.error}` })
                            clearInterval(timer)
                            break
                    }
                })
            }, 2000)
        })
        .catch()
}

// 监听安装弹窗关闭
watch(installShowDialog, (nval) => {
    if (!installShowDialog.value) clearInterval(timer)
})

watch(currAddon, (nval) => {
    installCheckResult.value = {}
})

/**
 * 卸载
 * @param key
 */
const uninstallAddonFn = (key: string) => {
    uninstallAddon({ addon: key }).then(res => {
        localListFn()
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

const market = () => {
    ElMessage({
        message: t('marketDevelopMessage'),
        grouping: true,
        type: 'success'
    })
}

/**
 * 安装弹窗关闭提示
 * @param done
 */
const installShowDialogClose = (done: () => {}) => {
    if (installStep.value == 1) {
        ElMessageBox.confirm(
            t('installShowDialogCloseTips'),
            t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            done()
        }).catch(() => { })
    } else done()
}

// 插件详情
const appStoreShowDialog = ref(false)
const appStoreInfo = ref<AnyObject>({})
const getAddonDetialFn = (data: AnyObject) => {
    appStoreShowDialog.value = true
    appStoreInfo.value = data
}
</script>

<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.plug-item {
    .plug-item-operate {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
        font-size: var(--el-font-size-extra-small);
    }
}

:deep(.t-container) {
    box-shadow: none !important;

    .t-window {
        padding: 10px 20px !important;
    }
}

.switch-btn.active {
    border-color: var(--el-color-primary);
    color: #fff;
    background-color: var(--el-color-primary);
}

.plug-large {
    .plug-item-operate {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
        font-size: var(--el-font-size-extra-small);
    }
}

.app-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

// 插件安装-弹窗-表格样式
.table-head-bg{
	background: #f5f7f9;
}
html.dark .table-head-bg{
	background: #141414;
}
</style>
