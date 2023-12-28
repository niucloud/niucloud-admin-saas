<template>
    <div class="pt-[59px] px-[20px] app-store" v-loading="authLoading">
        <div>
            <div class="flex justify-between items-center h-[32px] mb-4">
                <span class="text-[20px] text-[#222]">{{ t('localAppText') }}</span>
                <el-input class="!w-[250px]" :placeholder="t('search')" v-model="search_name" @keyup.enter="query">
                    <template #suffix>
                        <el-icon class="el-input__icon  cursor-pointer" size="14px" @click="query">
                            <search />
                        </el-icon>
                    </template>
                </el-input>
            </div>
            <div class="flex mt-[24px]">
                <div :class="['flex items-center text-[14px] h-[32px] border-[1px] border-solid my-[3px] border-[#E0E0E0] rounded-full px-[15px] mr-[24px] cursor-pointer bg-[#f8f8f8] hover:bg-[#fff]', { 'text-[#fff] !bg-[#000] border-[#000]': activeName === 'installed' }]"
                    @click="activeNameTabFn('installed')">
                    {{ t('installLabel') }}
                </div>
                <div :class="['flex items-center text-[14px] h-[32px] border-[1px] border-solid my-[3px] border-[#E0E0E0] rounded-full px-[15px] mr-[24px] cursor-pointer bg-[#f8f8f8] hover:bg-[#fff]', { 'text-[#fff] !bg-[#000] border-[#000]': activeName === 'uninstalled' }]"
                    @click="activeNameTabFn('uninstalled')">
                    {{ t('uninstalledLabel') }}
                </div>
                <div :class="['flex items-center text-[14px] h-[32px] border-[1px] border-solid my-[3px] border-[#E0E0E0] rounded-full px-[15px] mr-[24px] cursor-pointer bg-[#f8f8f8] hover:bg-[#fff]', { 'text-[#fff] !bg-[#000] border-[#000]': activeName === 'all' }]"
                    @click="activeNameTabFn('all')">
                    {{ t('buyLabel') }}
                </div>
            </div>
            <div class="mt-[25px]">
                <el-table v-if="localList[activeName].length" :data="info[activeName]" size="large" class="pt-[5px]">
                    <el-table-column :label="t('appName')" align="left" width="320">
                        <template #default="{ row }">
                            <div class="flex items-center" @click = "handleTips"
                                :class="{ 'cursor-pointer': row.type == 'app' && Object.keys(row.install_info).length }">
                                <el-image class="w-[54px] h-[54px]" :src="row.icon" fit="contain">
                                    <template #error>
                                        <div class="flex items-center w-full h-full">
                                            <img class="max-w-full max-h-full" src="@/app/assets/images/icon-addon.png"
                                                alt="">
                                        </div>
                                    </template>
                                </el-image>
                                <div
                                    class="flex flex-col justify-center pl-[20px] text-[#222] font-500 text-[13px]">
                                    <div class="w-[236px] truncate leading-[18px]">{{ row.title }}</div>
                                    <div class="w-[236px] truncate leading-[18px] mt-[6px]" v-if="row.install_info && Object.keys(row.install_info)?.length">{{ row.install_info.version }}</div>
                                    <div class="w-[236px] truncate leading-[18px] mt-[6px]" v-else>{{ row.version }}</div>
                                    <div class="mt-[3px]" v-if="row.install_info && Object.keys(row.install_info)?.length && row.install_info.version != row.version">
                                        <el-tag type="danger" size="small">{{ t('newVersion') }}{{ row.version }}</el-tag>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" min-width="120">
                        <template #header>
                            <div class="flex items-center">
                                <span class="text-[#222] font-500 text-[13px] mr-[5px]">{{ t('appIdentification') }}</span>
                                <el-tooltip class="box-item" effect="light" :content="t('tipText')" placement="bottom">
                                    <el-icon class="cursor-pointer text-[16px] text-[#a9a9a9]">
                                        <QuestionFilled />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                        <template #default="{ row }">
                            <span class="text-[#222] font-500 text-[13px]">{{ row.key }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" :label="t('introduction')" align="left" min-width="200">
                        <template #default="{ row }">
                            <span class="text-[#222] font-500 text-[13px] multi-hidden">{{ row.desc }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('type')" align="left" min-width="100">
                        <template #default="{ row }">
                            <span class="text-[#222] font-500 text-[13px]">{{ row.type === 'app' ? t('app') : t('addon')
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" :label="t('author')" align="left" min-width="100">
                        <template #default="{ row }">
                            <span class="text-[#222] font-500 text-[13px]">{{ row.author }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" fixed="right" align="right" width="150">
                        <template #default="{ row }">
                            <el-button class="!text-[13px]" type="primary" link @click="getAddonDetialFn(row)">{{
                                t('detail') }}</el-button>
                            <el-button class="!text-[13px]" v-if="row.install_info && Object.keys(row.install_info)?.length && row.install_info.version != row.version"
                                       type="primary" link @click="upgradeAddonFn(row.key)">{{ t('upgrade') }}</el-button>
                            <el-button class="!text-[13px]"
                                v-if="row.install_info && Object.keys(row.install_info)?.length && activeName != 'all'"
                                type="primary" link @click="uninstallAddonFn(row.key)">{{ t('unload') }}</el-button>
                            <el-button class="!text-[13px]"
                                v-else-if="row.is_download && row.install_info <= 0 && activeName != 'all'" type="primary"
                                link @click="installAddonFn(row.key)">{{ t('install') }}</el-button>
                            <el-button class="!text-[13px]" v-else :loading="downloading == row.key"
                                :disabled="downloading != ''" type="primary" link @click.stop="downEvent(row)">
                                <span v-if="row.install_info && Object.keys(row.install_info)?.length">{{ t('unloadDown')
                                }}</span>
                                <span v-else-if="row.is_download && row.install_info <= 0">{{ t('installDown') }}</span>
                                <span v-else>{{ t('down') }}</span>
                            </el-button>
                            <el-button class="!text-[13px]" type="primary" v-if="row.install_info && Object.keys(row.install_info)?.length" link @click="handleCloudBuild">{{
                                    t('cloudBuild') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-empty class="mx-auto overview-empty"
                    v-if="!localList.installed.length && !loading && activeName == 'installed'">
                    <template #image>
                        <div class="w-[230px] mx-auto">
                            <img src="@/app/assets/images/index/apply_empty.png" class="max-w-full" alt="">
                        </div>
                    </template>
                    <template #description>
                        <p class="flex items-center">{{ t('installed-empty') }}</p>
                    </template>
                </el-empty>
                <el-empty class="mx-auto overview-empty"
                    v-if="!localList.uninstalled.length && !loading && activeName == 'uninstalled'">
                    <template #image>
                        <div class="w-[230px] mx-auto">
                            <img src="@/app/assets/images/index/apply_empty.png" class="max-w-full" alt="">
                        </div>
                    </template>
                    <template #description>
                        <p class="flex items-center">
                            <span>{{ t('descriptionLeft') }}</span>
                            <el-link type="primary" @click="goRouter" class="mx-[5px]">{{ t('link') }}</el-link>
                            <span>{{ t('descriptionRight') }}</span>
                        </p>
                    </template>
                </el-empty>
                <div v-if="!localList.all.length && !loading && !authinfo && activeName == 'all'"
                    class="mx-auto overview-empty flex flex-col items-center pt-14 pb-6">
                    <div class="mb-[20px] text-sm text-[#888]">检测到当前账号尚未绑定授权，请先绑定授权！</div>
                    <div class="flex flex-1  flex-wrap justify-center relative">
                        <el-button class="w-[154px] !h-[48px] mt-[8px]" type="primary"
                            @click="authCodeApproveFn">授权码认证</el-button>
                        <el-popover ref="getAuthCodeDialog" placement="bottom" :width="478" trigger="click"
                            class="mt-[8px]">
                            <div class="px-[18px] py-[8px]">
                                <p class="leading-[32px] text-[14px]">
                                    您在官方应用市场购买任意一款应用，即可获得授权码。输入正确授权码认证通过后，即可支持在线升级和其它相关服务</p>
                                <div class="flex justify-end mt-[36px]">
                                    <el-button class="w-[182px] !h-[48px]" plain @click="market">去应用市场逛逛</el-button>
                                    <el-button class="w-[100px] !h-[48px]" plain
                                        @click="getAuthCodeDialog.hide()">关闭</el-button>
                                </div>
                            </div>
                            <template #reference>
                                <el-button
                                    class="w-[154px] !h-[48px] mt-[8px] !text-[var(--el-color-primary)] hover:!text-[var(--el-color-primary)] !bg-transparent"
                                    plain type="primary">如何获取授权码?</el-button>
                            </template>
                        </el-popover>
                    </div>
                </div>
                <el-empty class="mx-auto overview-empty"
                     v-if="!localList.all.length && !loading && authinfo && activeName == 'all'">
                    <template #image>
                        <div class="w-[230px] mx-auto">
                            <img src="@/app/assets/images/index/apply_empty.png" class="max-w-full" alt="">
                        </div>
                    </template>
                    <template #description>
                        <p class="flex items-center">
                            <span>{{ t('buyDescriptionLeft') }}</span>
                            <el-link type="primary" @click="goRouter" class="mx-[5px]">{{ t('link') }}</el-link>
                            <span>{{ t('descriptionRight') }}</span>
                        </p>
                    </template>
                </el-empty>
            </div>
            <el-dialog v-model="authCodeApproveDialog" title="授权码认证" width="400px">
                <el-form :model="formData" label-width="0" ref="formRef" :rules="formRules" class="page-form">
                    <el-card class="box-card !border-none" shadow="never">
                        <el-form-item prop="auth_code">
                            <el-input v-model="formData.auth_code" :placeholder="t('authCodePlaceholder')"
                                class="input-width" clearable size="large" />
                        </el-form-item>

                        <div class="mt-[20px]">
                            <el-form-item prop="auth_secret">
                                <el-input v-model="formData.auth_secret" clearable :placeholder="t('authSecretPlaceholder')"
                                    class="input-width" size="large" />
                            </el-form-item>
                        </div>

                        <div class="text-sm mt-[10px] text-info">{{ t('authInfoTips') }}</div>

                        <div class="mt-[20px]">
                            <el-button type="primary" class="w-full" size="large" :loading="saveLoading"
                                @click="save(formRef)">{{ t('confirm') }}</el-button>
                        </div>
                        <div class="mt-[10px] text-right">
                            <el-button type="primary" link @click="market">{{ t('notHaveAuth') }}</el-button>
                        </div>
                    </el-card>
                </el-form>
            </el-dialog>
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
            <el-dialog v-model="installShowDialog" :title="t('addonInstall')" width="850px" :close-on-click-modal="false"
                :close-on-press-escape="false" :before-close="installShowDialogClose">
                <el-steps :space="200" :active="installStep" finish-status="success" align-center>
                    <el-step :title="t('envCheck')" class="flex-1" />
                    <el-step :title="t('installProgress')" class="flex-1" />
                    <el-step :title="t('installComplete')" class="flex-1" />
                </el-steps>
                <div v-show="installStep == 1" v-loading="!installCheckResult.dir">
                    <el-scrollbar max-height="50vh">
                        <div class="min-h-[150px]">
                            <div class="bg-[#fff] my-3" v-if="installCheckResult.dir">
                                <p class="pt-[20px] pl-[20px] ">{{ t('dirPermission') }}</p>
                                <div class="px-[20px] pt-[10px] text-[14px]">
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
                                    <el-row class="pb-[10px] items pl-[15px]"
                                        v-for="item in installCheckResult.dir.is_readable">
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
                                    <el-row class="pb-[10px] items pl-[15px]"
                                        v-for="item in installCheckResult.dir.is_write">
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
                        </div>
                    </el-scrollbar>
                    <div class="flex justify-end">
                        <el-tooltip effect="dark" :content="t('installTips')" placement="top">
                            <el-button type="default" :disabled="!installCheckResult.is_pass || cloudInstalling"
                                :loading="localInstalling" @click="handleInstall">{{
                                    t('localInstall')
                                }}</el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" :content="t('cloudInstallTips')" placement="top">
                            <el-button type="primary" :disabled="!installCheckResult.is_pass || localInstalling"
                                :loading="cloudInstalling" @click="handleCloudInstall">{{
                                    t('cloudInstall')
                                }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <div v-show="installStep == 2" class="h-[50vh] mt-[20px]">
                    <terminal ref="terminalRef" :context="currAddon" :init-log="null" :show-header="false"
                        :show-log-time="true" @exec-cmd="onExecCmd"/>
                </div>
                <div v-show="installStep == 3" class="h-[50vh] mt-[20px] flex flex-col">
                    <el-result icon="success" :title="t('addonInstallSuccess')"></el-result>
                    <!-- 提示信息 -->
                    <div v-for="item in installAfterTips" class="mb-[10px]">
                        <el-alert :title="item" type="error" :closable="false" />
                    </div>
                </div>
            </el-dialog>

            <el-dialog v-model="uninstallShowDialog" :title="t('addonUninstall')" width="850px"
                :close-on-click-modal="false" :close-on-press-escape="false">
                <el-scrollbar max-height="50vh">
                    <div class="min-h-[150px]">
                        <div class="bg-[#fff] my-3" v-if="uninstallCheckResult.dir">
                            <p class="pt-[20px] pl-[20px] ">{{ t('dirPermission') }}</p>
                            <div class="px-[20px] pt-[10px] text-[14px]">
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
                                <el-row class="pb-[10px] items pl-[15px]"
                                    v-for="item in uninstallCheckResult.dir.is_readable">
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
                                <el-row class="pb-[10px] items pl-[15px]" v-for="item in uninstallCheckResult.dir.is_write">
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
                    </div>
                </el-scrollbar>
            </el-dialog>

            <!-- 下载提示 -->
            <el-dialog v-model="unloadHintDialog" title="下载提示" width="30%" :before-close="handleClose">
                <span>本地已经存在该插件/应用，再次下载会覆盖该插件/应用。</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="unloadHintDialog = false">取消</el-button>
                        <el-button type="primary" @click="downEventHintFn">确定</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>

    <upgrade ref="upgradeRef" @complete="localListFn"/>
    <cloud-build ref="cloudBuildRef" />
</template>

<script lang="ts" setup>
import { ref, reactive, watch, h } from 'vue'
import { t } from '@/lang'
import { getAddonLocal, uninstallAddon, installAddon, preInstallCheck, cloudInstallAddon, getAddonInstalltask, getAddonCloudInstallLog, preUninstallCheck, cancelInstall } from '@/app/api/addon'
import { downloadVersion, getAuthinfo, setAuthinfo } from '@/app/api/module'
import { ElMessage, ElMessageBox, ElNotification, FormInstance, FormRules } from 'element-plus'
import { img } from '@/utils/common'
import 'vue-web-terminal/lib/theme/dark.css'
import { Terminal, TerminalFlash } from 'vue-web-terminal'
import { findFirstValidRoute } from '@/router/routers'
import storage from '@/utils/storage'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import Upgrade from '@/app/components/upgrade/index.vue'
import CloudBuild from '@/app/components/cloud-build/index.vue'

const router = useRouter()
const route = useRoute()
const activeName = ref(storage.get('storeActiveName') || 'installed')
const upgradeRef = ref(null)
const cloudBuildRef = ref(null)
const loading = ref<Boolean>(true)
const downloading = ref('')
const installAfterTips = ref<string[]>([])
const userStore = useUserStore()
const unloadHintDialog = ref(false)
const terminalRef = ref(null)

const currDownData = ref()
const downEventHintFn = () => {
    downEvent(currDownData.value, true)
}

const activeNameTabFn = (data) => {
    activeName.value = data
    storage.set({ key: 'storeActiveName', data })
}
if (route.query.id) {
    activeNameTabFn(route.query.id)
}
const downEvent = (param: Record<string, any>, isDown = false) => {
    if (param.is_download && activeName.value == 'all' && !isDown) {
        unloadHintDialog.value = true
        currDownData.value = param
        return false
    }

    if (downloading.value) return
    downloading.value = param.key

    downloadVersion({ addon: param.key, version: param.version }).then(() => {
        unloadHintDialog.value = false
        installAddonFn(param.key)
        localListFn()
        downloading.value = ''
    }).catch(() => {
        downloading.value = ''
    })
}

const authCode = ref('')
getAuthinfo().then(res => {
    if (res.data.data && res.data.data.auth_code) {
        authCode.value = res.data.data.auth_code
    }
}).catch(() => {
})

/**
 * 本地下载的插件列表
 */
// input 筛选
const search_name = ref('')
// 表格展示数据
const info = ref({
    installed: [],
    uninstalled: [],
    all: []
})
const query = () => {
    if (search_name.value == '' || search_name.value == null) {
        info.value.installed = localList.value.installed
        info.value.uninstalled = localList.value.uninstalled
        info.value.all = localList.value.all
        return false
    }
    info.value.installed = localList.value.installed.filter((el: any) => el.title.indexOf(search_name.value) != -1)
    info.value.uninstalled = localList.value.uninstalled.filter((el: any) => el.title.indexOf(search_name.value) != -1)
    info.value.all = localList.value.all.filter((el: any) => el.title.indexOf(search_name.value) != -1)
}
const localList = ref({
    installed: [],
    uninstalled: [],
    all: [],
    error: ''
})

const localListFn = () => {
    loading.value = true
    getAddonLocal({}).then(res => {
        const data = res.data.list
        localList.value.error = res.data.error
        localList.value.installed = []
        localList.value.uninstalled = []
        localList.value.all = []
        for (const i in data) {
            if (data[i].is_local == false) localList.value.all.push(data[i])

            if (data[i].install_info && Object.keys(data[i].install_info)?.length) {
                localList.value.installed.push(data[i])
            } else {
                if (data[i].is_download == true) localList.value.uninstalled.push(data[i])
            }
        }
        query()
        userStore.routers.forEach((item, index) => {
            if (item.children && item.children.length) {
                item.name = findFirstValidRoute(item.children)
                appLink.value[item.meta.app] = findFirstValidRoute(item.children)
            } else {
                appLink.value[item.meta.app] = item.name
            }
        })
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

localListFn()

// 点击应用提示到站点
const handleTips = () => {
    ElMessage('请在站点中运行程序!')
}

// 点击应用可以进系统

const appLink: any = ref({})
const itemPath = (data: any) => {
    if (data.type == 'app' && Object.keys(data.install_info).length) {
        storage.set({ key: 'menuAppStorage', data: data.key })
        storage.set({ key: 'plugMenuTypeStorage', data: '' })
        const appMenuList = userStore.appMenuList
        appMenuList.push(data.key)
        userStore.setAppMenuList(appMenuList)
        const name: any = appLink.value[data.key]
        router.push({ name })
    }
}

const currAddon = ref('')

// 安装面板弹窗
const installShowDialog = ref(false)

// 安装步骤
const installStep = ref(1)

// 安装检测结果
const installCheckResult = ref({})

let flashInterval = null
const terminalFlash = new TerminalFlash()
const onExecCmd = (key, command, success, failed, name)=> {
    if (command == '开始安装插件') {
        success(terminalFlash)
        const frames = makeIterator(['/', '——', '\\', '|'])
        flashInterval = setInterval(() => {
            terminalFlash.flush('> ' + frames.next().value)
        }, 150)
    }
}

function makeIterator(array: string[]) {
    var nextIndex = 0
    return {
        next() {
            if ((nextIndex + 1) == array.length) {
                nextIndex = 0
            }
            return { value: array[nextIndex++] }
        }
    }
}

/**
 * 安装
 * @param key
 */
const installAddonFn = (key: string) => {
    currAddon.value = key

    preInstallCheck(key).then(res => {
        installStep.value = 1
        installShowDialog.value = true
        installAfterTips.value = []
        installCheckResult.value = res.data
        userStore.clearRouters()
    }).catch(() => { })
}

/**
 * 获取正在进行的安装任务
 */
let notificationEl = null
const getInstallTask = (first: boolean = true) => {
    getAddonInstalltask().then(res => {
        if (res.data) {
            if (first) {
                installLog = []
                currAddon.value = res.data.addon
                if (!installShowDialog.value) {
                    notificationEl = ElNotification.success({
                        title: t('warning'),
                        dangerouslyUseHTMLString: true,
                        message: h('div', {}, [
                            t('installingTips'),
                            h('span', { class: 'text-primary cursor-pointer', onClick: checkInstallTask }, [t('installPercent')])
                        ]),
                        duration: 0,
                        showClose: false
                    })
                }
            }
            if (res.data.error) {
                return
            }
            if (res.data.mode == 'cloud') {
                getCloudInstallLog()
            }
            setTimeout(() => {
                getInstallTask(false)
            }, 2000)
        } else {
            if (!first) {
                installStep.value = 3
                localListFn()
                userStore.clearRouters()
                notificationEl.close()
            }
        }
    })
}

getInstallTask()

const checkInstallTask = () => {
    installShowDialog.value = true
    installStep.value = 2
}

const localInstalling = ref(false)
/**
 * 安装插件
 */
const handleInstall = () => {
    if (!installCheckResult.value.is_pass || localInstalling.value) return
    localInstalling.value = true

    installAddon({ addon: currAddon.value }).then(res => {
        installStep.value = 3
        localListFn()
        localInstalling.value = false
        if (res.data.length) installAfterTips.value = res.data
    }).catch((res) => {
        localInstalling.value = false
    })
}

const cloudInstalling = ref(false)

/**
 * 云安装插件
 */
const handleCloudInstall = () => {
    if (!authCode.value) {
        authElMessageBox()
        return
    }

    if (!installCheckResult.value.is_pass || cloudInstalling.value) return
    cloudInstalling.value = true

    cloudInstallAddon({ addon: currAddon.value }).then(res => {
        installStep.value = 2
        terminalRef.value.execute('clear')
        terminalRef.value.execute('开始安装插件')
        getInstallTask()
        cloudInstalling.value = false
    }).catch((res) => {
        cloudInstalling.value = false
    })
}

const authElMessageBox = () => {
    ElMessageBox.confirm(
        t('authTips'),
        t('warning'),
        {
            distinguishCancelAndClose: true,
            confirmButtonText: t('toBind'),
            cancelButtonText: t('toNiucloud')
        }
    ).then(() => {
        authCodeApproveFn()
    }).catch((action: string) => {
        if (action === 'cancel') {
            window.open('https://www.niucloud.com/app')
        }
    })
}

let installLog: string[] = []
const getCloudInstallLog = () => {
    getAddonCloudInstallLog(currAddon.value)
        .then(res => {
            const data = res.data.data ?? []
            if (data[0] && data[0].length && installShowDialog.value == true) {
                data[0].forEach(item => {
                    if (!installLog.includes(item.action)) {
                        terminalRef.value.pushMessage({ content: `正在执行：${item.action}` })
                        installLog.push(item.action)

                        if (item.code == 0) {
                            terminalRef.value.pushMessage({ content: item.msg, class: 'error' })
                        }
                    }
                })
            }
        })
        .catch(() => {
            notificationEl?.close()
        })
}

watch(currAddon, (nval) => {
    installCheckResult.value = {}
})

// 卸载面板弹窗
const uninstallShowDialog = ref(false)

// 卸载环境检测结果
const uninstallCheckResult = ref({})

/**
 * 卸载
 * @param key
 */
const uninstallAddonFn = (key: string) => {
    if (import.meta.env.MODE == 'development') {
        ElMessageBox.confirm(
            t('uninstallTips'),
            t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            handleUninstallAddon(key)
        }).catch(() => { })
    } else {
        handleUninstallAddon(key)
    }
}

/**
 * 插件升级
 * @param key
 */
const upgradeAddonFn = (key: string) => {
    upgradeRef.value?.open(key)
}

/**
 * 云编译
 */
const handleCloudBuild = () => {
    if (!authCode.value) {
        authElMessageBox()
        return
    }
    if (cloudBuildRef.value.cloudBuildTask) {
        cloudBuildRef.value?.open()
        return
    }
    ElMessageBox.confirm(t('cloudBuildTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        cloudBuildRef.value?.open()
    })
}

const handleUninstallAddon = (key: string) => {
    preUninstallCheck(key).then(({ data }) => {
        if (data.is_pass) {
            uninstallAddon({ addon: key }).then(res => {
                localListFn()
                userStore.clearRouters()
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        } else {
            uninstallCheckResult.value = data
            uninstallShowDialog.value = true
        }
    })
}

const market = () => {
    window.open('https://www.niucloud.com/app')
}

/**
 * 安装弹窗关闭提示
 * @param done
 */
const installShowDialogClose = (done: () => {}) => {
    if (installStep.value == 2) {
        ElMessageBox.confirm(
            t('installShowDialogCloseTips'),
            t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            cancelInstall(currAddon.value)
            done()
        }).catch(() => { })
    } else if (installStep.value == 3) {
        activeNameTabFn('installed')
        location.reload()
    } else done()

    flashInterval && clearInterval(flashInterval)
}

// 插件详情
const appStoreShowDialog = ref(false)
const appStoreInfo = ref<AnyObject>({})
const getAddonDetialFn = (data: AnyObject) => {
    appStoreShowDialog.value = true
    appStoreInfo.value = data
}

// 授权
const authCodeApproveDialog = ref(false)
const authinfo = ref('')
const getAuthCodeDialog = ref(null)
const saveLoading = ref(false)
const authLoading = ref(true)
const checkAppMange = () => {
    authLoading.value = true
    getAuthinfo()
        .then((res) => {
            if (res.data.data && res.data.data.length != 0) {
                authinfo.value = res.data.data
            }
            authLoading.value = false
        })
        .catch(() => {
            authLoading.value = false
            authCodeApproveDialog.value = false
        })
}
checkAppMange()
const authCodeApproveFn = () => {
    authCodeApproveDialog.value = true
}

const formData = reactive<Record<string, string>>({
    auth_code: '',
    auth_secret: ''
})
const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
    auth_code: [
        { required: true, message: t('authCodePlaceholder'), trigger: 'blur' }
    ],
    auth_secret: [
        { required: true, message: t('authSecretPlaceholder'), trigger: 'blur' }
    ]
})

const save = async (formEl: FormInstance | undefined) => {
    if (saveLoading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            saveLoading.value = true

            setAuthinfo(formData)
                .then(() => {
                    saveLoading.value = false
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                })
                .catch(() => {
                    saveLoading.value = false
                })
        }
    })
}

const goRouter = () => {
    window.open('https://www.niucloud.com/app')
}
</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

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
.table-head-bg {
    background: #f5f7f9;
}

html.dark .table-head-bg {
    background: #141414;
}

.el-alert .el-alert__title {
    font-size: 16px;
    line-height: 18px;
}

.app-store {
    height: calc(100vh - 120px);
    box-sizing: border-box;
}
</style>

<style>
.el-empty .el-empty__image {
    width: auto;
}
</style>
