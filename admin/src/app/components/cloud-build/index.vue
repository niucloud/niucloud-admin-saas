<template>
    <el-dialog v-model="showDialog" :title="t('cloudbuild.title')" width="850px" :close-on-click-modal="false"
               :close-on-press-escape="false" :before-close="dialogClose">

        <div v-show="active == 'build'" class="h-[60vh]" v-loading="loading">
            <div class="h-[60vh] flex flex-col" v-if="cloudBuildCheck && !cloudBuildTask">
                <el-scrollbar>
                    <div class="bg-[#fff] my-3" v-if="cloudBuildCheck.dir">
                        <p class="pt-[20px] pl-[20px] ">{{ t('cloudbuild.dirPermission') }}</p>
                        <div class="px-[20px] pt-[10px] text-[14px] el-table">
                            <el-row class="py-[10px] items table-head-bg pl-[15px] mb-[10px]">
                                <el-col :span="12">
                                    <span>{{ t('cloudbuild.path') }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span>{{ t('cloudbuild.demand') }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span>{{ t('status') }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="pb-[10px] items pl-[15px]"
                                    v-for="item in cloudBuildCheck.dir.is_readable">
                                <el-col :span="12">
                                    <span>{{ item.dir }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span>{{ t('cloudbuild.readable') }}</span>
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
                                    v-for="item in cloudBuildCheck.dir.is_write">
                                <el-col :span="12">
                                    <span>{{ item.dir }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span>{{ t('cloudbuild.write') }}</span>
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
                </el-scrollbar>
            </div>
            <div class="h-[60vh]" v-show="cloudBuildTask">
                <terminal ref="terminalRef" context="" :init-log="null" :show-header="false"
                          :show-log-time="true" @exec-cmd="onExecCmd"/>
            </div>
        </div>

        <div v-show="active == 'complete'">
            <div class="h-[60vh] flex flex-col">
                <div class="flex-1 h-0">
                    <el-result icon="success" :title="t('cloudbuild.cloudbuildSuccess')"></el-result>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, h, watch } from 'vue'
import { t } from '@/lang'
import { getCloudBuildLog, getCloudBuildTask, cloudBuild, clearCloudBuildTask, preBuildCheck } from '@/app/api/cloud'
import { Terminal, TerminalFlash } from 'vue-web-terminal'
import 'vue-web-terminal/lib/theme/dark.css'
import { AnyObject } from "@/types/global"
import { ElNotification, ElMessageBox } from "element-plus"
import {preUpgradeCheck} from "@/app/api/upgrade";

const showDialog = ref<boolean>(false)
const cloudBuildTask = ref<null | AnyObject>(null)
const active = ref('build')
const cloudBuildCheck = ref<null | AnyObject>(null)
const loading = ref(false)
const terminalRef = ref(null)
const emits = defineEmits(['complete'])

let cloudBuildLog = []
/**
 * 查询升级任务
 */
const getCloudBuildTaskFn = () => {
    getCloudBuildTask().then(({ data }) => {
        if (!data) return

        cloudBuildTask.value = data

        if (!showDialog.value) {
            showElNotification()
        }
    }).catch()
}
getCloudBuildTaskFn()

const getCloudBuildLogFn = () => {
    getCloudBuildLog().then(res => {
        if (!res.data) {
            if (showDialog.value && cloudBuildLog.length) {
                active.value = 'complete'
                terminalRef.value.execute('clear')
            }
            notificationEl && notificationEl.close()
            cloudBuildTask.value = null
            return
        }

        const data = res.data.data ?? []
        let error = ''

        if (data[0] && data[0].length && showDialog.value) {
            if (cloudBuildLog.length == 0) {
                terminalRef.value.execute('clear')
                terminalRef.value.execute('开始编译')
            }

            data[0].forEach(item => {
                if (!cloudBuildLog.includes(item.action)) {
                    terminalRef.value.pushMessage({ content: `正在执行：${item.action}` })
                    cloudBuildLog.push(item.action)

                    if (item.code == 0) {
                        error = item.msg
                        terminalRef.value.pushMessage({ content: item.msg, class: 'error' })
                    }
                }
            })
        }

        if (error) return

        setTimeout(() => {
            getCloudBuildLogFn()
        }, 2000)
    }).catch()
}

let notificationEl : any = null
/**
 * 升级中任务提示
 */
const showElNotification = () => {
    notificationEl = ElNotification.success({
        title: t('warning'),
        dangerouslyUseHTMLString: true,
        message: h('div', {}, [
            t('cloudbuild.executingTips'),
            h('span', { class: 'text-primary cursor-pointer', onClick: elNotificationClick }, [t('cloudbuild.clickView')])
        ]),
        duration: 0,
        showClose: false
    })
}

const elNotificationClick = () => {
    showDialog.value = true
    active.value = 'build'
    getCloudBuildLogFn()
}

const open = async () => {
    showDialog.value = true
    loading.value = true
    active.value = 'build'

    if (cloudBuildTask.value) {
        loading.value = false
        getCloudBuildLogFn()
        return
    }

    preBuildCheck().then(async ({ data }) => {
        if (data.is_pass) {
            cloudBuild().then(({ data }) => {
                loading.value = false
                cloudBuildTask.value = data
                getCloudBuildLogFn()
            }).catch(() => {
                showDialog.value = false
            })
        } else {
            loading.value = false
            cloudBuildCheck.value = data
        }
    }).catch(() => {
        showDialog.value = false
    })
}

/**
 * 升级进度动画
 */
let flashInterval = null
const terminalFlash = new TerminalFlash()
const onExecCmd = (key, command, success, failed, name) => {
    if (command == '开始编译') {
        success(terminalFlash)
        const frames = makeIterator(['/', '——', '\\', '|'])
        flashInterval = setInterval(() => {
            terminalFlash.flush('> ' + frames.next().value)
        }, 150)
    }
}

const makeIterator = (array: string[]) => {
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

const dialogClose = (done: () => {}) => {
    if (active.value == 'cloudbuild' && cloudBuildTask.value) {
        ElMessageBox.confirm(
            t('cloudbuild.showDialogCloseTips'),
            t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            done()
        }).catch(() => { })
    } else {
        done()
    }
}

watch(() => showDialog.value, () => {
    if (!showDialog.value) {
        active.value = 'build'
        cloudBuildLog = []
        flashInterval && clearInterval(flashInterval)
        clearCloudBuildTask()
    }
})

defineExpose({
    open,
    cloudBuildTask
})
</script>

<style lang="scss" scoped>
.table-head-bg {
    background-color: var(--el-table-header-bg-color);
}
:deep(.terminal .t-log-box span) {
    white-space: pre-wrap;
}
</style>
