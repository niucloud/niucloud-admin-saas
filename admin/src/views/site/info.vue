<template>
    <div class="main-container">
        <el-form :model="formData" label-width="150px" ref="formRef" class="page-form">
            <el-card class="box-card !border-none relative" shadow="never">
                <h3 class="panel-title">{{ t('siteInfo') }}</h3>

                <el-form-item :label="t('siteName')" >
                    <div class="input-width">{{ formData.site_name }}</div>
                </el-form-item>

                <el-form-item :label="t('siteLogo')" >
                    <el-image v-if="formData.logo" class="w-20 h-20" :src="img(formData.logo)" fit="contain" ></el-image>
                </el-form-item>

                <el-form-item :label="t('groupName')" >
                    <div class="input-width">{{ formData.group_name || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('keywords')" >
                    <div class="input-width">{{ formData.keywords || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('status')" >
                    <template #default="{ row }">
                        <el-tag class="ml-2" type="success" v-if="formData.status == 1">{{ t('statusNormal') }}</el-tag>
                        <el-tag class="ml-2" type="error" v-if="formData.status == 0">{{
                            t('statusDeactivate')
                        }}</el-tag>
                        <el-tag class="ml-2" type="error" v-if="formData.status == 2">{{
                            t('statusExpire')
                        }}</el-tag>
                    </template>
                </el-form-item>

                <el-form-item :label="t('createTime')" >
                    <div class="input-width">{{ formData.create_time || '' }}</div>
                </el-form-item>

                <el-form-item :label="t('expireTime')" >
                    <div class="input-width">{{ formData.expire_time || '' }}</div>
                </el-form-item>

                <el-button class="absolute right-5 top-5" type="primary" @click="editEvent(formRef)">{{ t('edit') }}</el-button>
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
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { img } from '@/utils/common'
import { getSiteInfo,addSite,updateSite,getSiteGroupAll } from '@/api/site';
import { useRoute,useRouter } from 'vue-router'
import { cloneDeep } from 'lodash';
import EditSite from '@/views/site/components/edit-site.vue'
import useTabbarStore from '@/stores/modules/tabbar'
import useAppStore from '@/stores/modules/app'

const appStore = useAppStore()
const tabbarStore = useTabbarStore()
const route = useRoute()
const router = useRouter()
const id:number = parseInt(route.query.id);
const loading = ref(true)

// 页面返回按钮
appStore.pageReturn = true;
watch(route, (newX,oldX) => {
    appStore.pageReturn = false;
});

/**
 * 表单数据
 */
const initialFormData = {
    site_id:0,
    site_name: '',
    expire_time: 0,
    group_id:0,
    keywords:'',
    business_hours:'',
    logo: '',
    desc: '',
    latitude: '',
    longitude: '',
    province_id: '',
    city_id: '',
    district_id: '',
    address:'',
    full_address:'',
    phone:'',
    group_name: '',
    status:0,
    create_time: 0
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async (id:number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getSiteInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    loading.value = false;
}
if(id) setFormData(id);
else loading.value = false;

const loadSiteinfo = () => {
    setFormData(id);
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
    router.push({ path: '/site/list' })
}
</script>

<style lang="scss" scoped></style>