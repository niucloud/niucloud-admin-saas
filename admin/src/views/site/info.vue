<template>
    <div class="main-container">
        <div class="detail-head !mb-[10px]">
            <div class="left" @click="router.push({ path: '/admin/site/list' })">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{t('returnToPreviousPage')}}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
            <el-button class="ml-auto w-[100px] mr-[10px]" type="primary" @click="editEvent(formRef)">{{ t('edit') }}</el-button>
        </div>
        <el-form :model="formData" label-width="90px" ref="formRef" class="page-form">
            <el-card class="box-card !border-none relative" shadow="never">
                <el-form-item :label="t('siteName')">
                    <div class="input-width">{{ formData.site_name }}</div>
                </el-form-item>

                <el-form-item :label="t('siteLogo')">
                    <el-image v-if="formData.logo" class="w-20 h-20" :src="img(formData.logo)" fit="contain"></el-image>
					<img class="w-20 h-20" v-else src="@/assets/images/site_logo.png" alt="" >
                </el-form-item>

                <el-form-item :label="t('groupName')">
                    <div class="input-width">{{ formData.group_name || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('keywords')">
                    <div class="input-width">{{ formData.keywords || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('status')">
                    <template #default="{ row }">
                        <el-tag class="ml-2" type="success" v-if="formData.status == 1">{{ t('statusNormal') }}</el-tag>
                        <el-tag class="ml-2" type="error" v-if="formData.status == 0">{{t('statusDeactivate') }}</el-tag>
                        <el-tag class="ml-2" type="error" v-if="formData.status == 2">{{t('statusExpire') }}</el-tag>
                    </template>
                </el-form-item>

                <el-form-item :label="t('createTime')">
                    <div class="input-width">{{ formData.create_time || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('expireTime')">
                    <div class="input-width">{{ formData.expire_time || '' }}</div>
                </el-form-item>
            </el-card>

        </el-form>
        <edit-site ref="editSiteDialog" @complete="loadSiteinfo()" />
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('confirm') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { img } from '@/utils/common'
import { getSiteInfo } from '@/api/site'
import { useRoute, useRouter } from 'vue-router'
import EditSite from '@/views/site/components/edit-site.vue'
import useTabbarStore from '@/stores/modules/tabbar'
import useAppStore from '@/stores/modules/app'

const appStore = useAppStore()
const tabbarStore = useTabbarStore()
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const id: number = parseInt(route.query.id)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    site_id: 0,
    site_name: '',
    expire_time: 0,
    group_id: 0,
    keywords: '',
    business_hours: '',
    logo: '',
    desc: '',
    latitude: '',
    longitude: '',
    province_id: '',
    city_id: '',
    district_id: '',
    address: '',
    full_address: '',
    phone: '',
    group_name: '',
    status: 0,
    create_time: 0
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async (id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getSiteInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    loading.value = false
}
if (id) setFormData(id)
else loading.value = false

const loadSiteinfo = () => {
    setFormData(id)
}

const formRef = ref<FormInstance>()

const editSiteDialog: Record<string, any> | null = ref(null)

/**
 * 编辑站点
 */
const editEvent = (data: any) => {
    editSiteDialog.value.setFormData(formData)
    editSiteDialog.value.showDialog = true
}

const onSave = async (formEl: FormInstance | undefined) => {
    back()
}

const back = () => {
    tabbarStore.removeTab(route.path)
    router.push({ path: '/admin/site/list' })
}
</script>

<style lang="scss" scoped></style>
