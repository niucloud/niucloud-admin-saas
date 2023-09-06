<template>
    <div class="main main-container min-w-[1000px] min-h-[650px]" v-loading="loading">
		<el-card class="box-card !border-none" shadow="never">
			<div v-if="authinfo">
				<el-row>
					<el-col :span="8" class="mb-[20px]">
						<div class="flex mt-[15px]">
							<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('authApp') }}</span>
							<span class="text-[14px] text-[#666666]">{{ authinfo.app.app_name }}</span>
						</div>
					</el-col>
					<el-col :span="8" class="mb-[20px]">
						<div class="flex mt-[15px]">
							<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('authAppKey') }}</span>
							<span class="text-[14px] text-[#666666]">{{ authinfo.app.app_key }}</span>
						</div>
					</el-col>
					<el-col :span="8" class="mb-[20px]">
						<div class="flex mt-[15px]">
							<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('companyName') }}</span>
							<span class="text-[14px] text-[#666666]">{{ authinfo.app_auth.company_name }}</span>
						</div>
					</el-col>
					<el-col :span="8" class="mb-[20px]">
						<div class="mt-[15px]">
							<div class="flex">
								<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('siteAddress') }}</span>
								<span class="text-[14px] text-[#666666]">{{ authinfo.site_address }}</span>
							</div>
							<div class="flex" v-if="!authinfo.address_type">
								<span class="text-[14px] min-w-[130px] text-right mr-[20px]"></span>
								<span class="text-[14px] text-[#f10b0b] cursor-pointer" @click="authEvent">{{ t('siteAddressTips') }}</span>
							</div>
						</div>
					</el-col>
					<el-col :span="8" class="mb-[20px]">
						<div class="flex mt-[15px]">
							<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('contactName') }}</span>
							<span class="text-[14px] text-[#666666]">{{ authinfo.app_auth.contact_name }}</span>
						</div>
					</el-col>
					<el-col :span="8" class="mb-[20px]">
						<div class="flex mt-[15px]">
							<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('authCode') }}</span>
							<span class="text-[14px] text-[#666666]">{{ authinfo.auth_code }}</span>
						</div>
					</el-col>
					<el-col :span="8" class="mb-[20px]">
						<div class="flex mt-[15px]">
							<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('authSecret') }}</span>
							<span class="text-[14px] text-[#666666]">{{ authinfo.auth_secret }}</span>
						</div>
					</el-col>
					<el-col :span="8" class="mb-[20px]">
						<div class="flex mt-[15px]">
							<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('createTime') }}</span>
							<span class="text-[14px] text-[#666666]">{{ authinfo.create_time }}</span>
						</div>
					</el-col>
					<el-col :span="8" class="mb-[20px]">
						<div class="flex mt-[15px]">
							<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('expireTime') }}</span>
							<span class="text-[14px] text-[#666666]">{{ authinfo.expire_time }}</span>
						</div>
					</el-col>
				</el-row>
			</div>
			<div v-else>
				<el-form :model="formData" label-width="150px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
				    <el-card class="box-card !border-none" shadow="never">				
				        <el-form-item :label="t('authCode')">
				            <el-input v-model="formData.auth_code" :placeholder="t('authCodePlaceholder')" class="input-width" clearable/>
				        </el-form-item>
				
				        <el-form-item :label="t('authSecret')">
				            <el-input v-model="formData.auth_secret" clearable :placeholder="t('authSecretPlaceholder')" class="input-width"/>
				        </el-form-item>
				    </el-card>
				</el-form>
				
				<div class="fixed-footer-wrap">
				    <div class="fixed-footer">
				        <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
				    </div>
				</div>
			</div>
		</el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getAuthinfo, setAuthinfo, getAdminAuthinfo } from '@/api/module'
import { img } from '@/utils/common'
import { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()	
const authinfo = ref("")
const loading = ref(true)
const checkAppMange = () => {
	getAuthinfo().then(res => {
		loading.value = false
		if(res.data.data && res.data.data.length != 0){
			authinfo.value = res.data.data;
		}
	}).catch(() => {
		loading.value = false
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
})

const setFormData = async () => {
    const data = await (await getAdminAuthinfo()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
}
setFormData()

const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            setAuthinfo(formData).then(() => {
                loading.value = false
                checkAppMange()
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
 
const authEvent = () => {
	authinfo.value = ""
}
</script>

<style lang="scss" scoped>
	.app-text {
		overflow:hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow:ellipsis;
	}
	.main {
		background-color: var(--el-bg-color-overlay);
	}
	.app-item {
		// box-shadow: 0px 6px 18px 0px rgba(82,129,187,0.1);
	}
</style>
