<template>
	<div class="main main-container min-w-[1000px] min-h-[650px]" v-loading="loading">
		<el-card class="box-card !border-none" shadow="never" v-if="!loading">
			<div class="flex">
				<div class="bg-[#F3F6FF] mr-[14px] w-[402px] pt-[30px] pl-[32px] pr-[20px] pb-[60px] timeline-log-wrap">
					<div class="flex items-center justify-between">
						<span class="text-[20px]">版本信息</span>
                        <div class="flex-1 w-0 flex justify-end">
                            <el-button class="text-[#4C4C4C] w-[78px] h-[32px] !bg-transparent" @click="getFrameworkVersionListFn" v-if="!newVersion || (newVersion && newVersion.version_no == versions)">检测更新</el-button>
                            <el-button class="text-[#4C4C4C] w-[78px] h-[32px]" type="primary" @click="handleUpgrade" v-else>一键升级</el-button>
                            <el-button class="text-[#4C4C4C] w-[78px] h-[32px]" type="primary" @click="handleCloudBuild">云编译</el-button>
                        </div>
					</div>
					<div class="mt-[30px] flex items-center text-[14px] text-[#797979]">
						<span>当前版本</span>
						<span class="text-[26px] ml-[15px] mr-[10px] text-[#656668]">{{versions}}</span>
						<em class="text-[12px]" v-if="!newVersion || (newVersion && newVersion.version_no == versions)">(当前已是最新版本)</em>
                        <em class="text-[12px] text-[red]" v-else>(最新版本{{ newVersion.version_no }})</em>
					</div>
				</div>
				<div class="flex-1 flex justify-between items-center bg-[#F3F6FF] pt-[34px] pl-[30px] pr-[60px] pb-[62px] timeline-log-wrap">
					<div class="flex flex-col">
						<div class="flex flex-wrap items-center">
							<p class="text-[20px] mr-[20px]">授权信息</p>
							<span class="text-[14px] text-[#666]">{{ authinfo.company_name || '--' }}</span>
						</div>
						<div class="mt-[46px] ml-[40px] flex flex-wrap">
							<span class="text-[14px] mr-[84px]">授权域名<em
									class="ml-[12px] text-[12px]">{{ authinfo.site_address || '--'
									}}</em></span>
							<span class="text-[14px] flex items-center">
								<span>授权码</span>
								<em class="ml-[12px] mr-[10px] text-[12px]">{{ authinfo.auth_code ? (isCheck
									?
									authinfo.auth_code : hideAuthCode(authinfo.auth_code)) : '--' }}</em>
								<el-icon v-if="!isCheck" @click="isCheck = !isCheck" class="text-[12px] cursor-pointer">
									<View />
								</el-icon>
								<el-icon v-else @click="isCheck = !isCheck" class="text-[12px] cursor-pointer">
									<Hide />
								</el-icon>
							</span>
						</div>
					</div>
					<div class="flex flex-1  flex-wrap justify-end relative">
						<el-button class="w-[154px] !h-[48px] mt-[8px]" type="primary"
							@click="authCodeApproveFn">授权码认证</el-button>
						<el-popover ref="getAuthCodeDialog" placement="bottom-start" :width="478" trigger="click"
							class="mt-[8px]">
							<div class="px-[18px] py-[8px]">
								<p class="leading-[32px] text-[14px]">您在官方应用市场购买任意一款应用，即可获得授权码。输入正确授权码认证通过后，即可支持在线升级和其它相关服务
								</p>
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
					<el-dialog v-model="authCodeApproveDialog" title="授权码认证" width="400px">
						<el-form :model="formData" label-width="0" ref="formRef" :rules="formRules" class="page-form">
							<el-card class="box-card !border-none" shadow="never">
								<el-form-item prop="auth_code">
									<el-input v-model="formData.auth_code" :placeholder="t('authCodePlaceholder')"
										class="input-width" clearable size="large" />
								</el-form-item>

								<div class="mt-[20px]">
									<el-form-item prop="auth_secret">
										<el-input v-model="formData.auth_secret" clearable
											:placeholder="t('authSecretPlaceholder')" class="input-width" size="large" />
									</el-form-item>
								</div>

								<div class="text-sm mt-[10px] text-info">{{ t('authInfoTips') }}</div>

								<div class="mt-[20px]">
									<el-button type="primary" class="w-full" size="large" :loading="saveLoading"
										@click="save(formRef)">{{
											t('confirm') }}</el-button>
								</div>
								<div class="mt-[10px] text-right">
									<el-button type="primary" link @click="market">{{ t('notHaveAuth') }}</el-button>
								</div>
							</el-card>
						</el-form>
					</el-dialog>
				</div>
			</div>
		</el-card>

        <el-card class="box-card !border-none " shadow="never" v-if="!loading">
            <div class="text-[20px] mb-[20px]">历史版本</div>
            <el-timeline>
                <el-timeline-item :timestamp="item['release_time'] + ' 版本：' + item['version_no']" v-for="(item,index) in frameworkVersionList" type="primary" :hollow="true" placement="top" :key="index">
                    <div class="mt-[10px] p-[20px] bg-overlay rounded-md timeline-log-wrap whitespace-pre" v-if="item['upgrade_log']">
                        <div v-html="item['upgrade_log']"></div>
                    </div>
                </el-timeline-item>
            </el-timeline>
        </el-card>

        <upgrade ref="upgradeRef" />
        <cloud-build ref="cloudBuildRef" />
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { t } from '@/lang'
import { getVersions } from '@/app/api/auth'
import { getAuthinfo, setAuthinfo, getFrameworkVersionList } from '@/app/api/module'
import { ElMessageBox, FormInstance, FormRules } from 'element-plus'
import Upgrade from '@/app/components/upgrade/index.vue'
import CloudBuild from '@/app/components/cloud-build/index.vue'

const upgradeRef = ref<any>(null)
const cloudBuildRef = ref<any>(null)
const getAuthCodeDialog: Record<string, any> | null = ref(null)

const authCodeApproveDialog = ref(false)
const isCheck = ref(false)
const frameworkVersionList = ref([])

const getFrameworkVersionListFn = () => {
    getFrameworkVersionList().then(({ data }) => {
        frameworkVersionList.value = data
    })
}
getFrameworkVersionListFn()

const newVersion:any = computed(() => {
    return frameworkVersionList.value.length ? frameworkVersionList.value[0] : null
})

const hideAuthCode = (res:any) => {
    const authCode = JSON.parse(JSON.stringify(res))
    const data = authCode.slice(0, authCode.length / 2) + authCode.slice(authCode.length / 2, authCode.length - 1).replace(/./g, '*')
    return data
}

const authCodeApproveFn = () => {
    authCodeApproveDialog.value = true
}

interface AuthInfo {
	company_name: string,
	site_address: string,
	auth_code: string
}

const authinfo = ref<AuthInfo>({
    company_name: '',
    site_address: '',
    auth_code: ''
})
const loading = ref(true)
const saveLoading = ref(false)
const checkAppMange = () => {
    getAuthinfo()
        .then((res) => {
            loading.value = false
            if (res.data.data && res.data.data.length != 0) {
                authinfo.value = res.data.data
                authCodeApproveDialog.value = false
            }
        })
        .catch(() => {
            loading.value = false
            authCodeApproveDialog.value = false
        })
}
checkAppMange()

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
                    checkAppMange()
                })
                .catch(() => {
                    saveLoading.value = false
                    authCodeApproveDialog.value = false
                })
        }
    })
}

const market = () => {
    window.open('https://www.niucloud.com/app')
}

const versions = ref('')
const getVersionsInfo = () => {
    getVersions().then(res => {
        versions.value = res.data.version.version
    })
}
getVersionsInfo()

/**
 * 升级
 */
const handleUpgrade = () => {
    if (!authinfo.value) {
        authCodeApproveFn()
        return
    }
    upgradeRef.value?.open()
}

const handleCloudBuild = () => {
    if (!authinfo.value) {
        authCodeApproveFn()
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
</script>

<style lang="scss" scoped>
.app-text {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
}

.main {
	background-color: var(--el-bg-color-overlay);
}

em {
	font-style: normal
}
.timeline-log-wrap {
    background: #F5F7F9;
}
html.dark {
    .timeline-log-wrap {
        background: var(--el-bg-color);
        color: var(--el-text-color-regular);
    }
}
</style>
<style>
.auth-code-dialog .el-overlay {
	background-color: transparent;
}

.auth-code-dialog .el-dialog__header {
	padding: 0;
}

.auth-code-dialog .el-dialog__body {
	padding: 20px 30px;
}
</style>
