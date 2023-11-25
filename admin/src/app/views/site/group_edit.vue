<template>
    <div class="main-container mb-80" v-loading="loading">
        <div class="detail-head !mb-[10px]">
            <div class="left" @click="back">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t('returnToPreviousPage') }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('groupName')" prop="group_name">
                    <el-input v-model="formData.group_name" :placeholder="t('groupNamePlaceholder')" clearable
                        :disabled="formData.uid" class="input-width" maxlength="20" :show-word-limit="true" />
                </el-form-item>
                <el-form-item :label="t('groupDesc')" prop="group_desc">
                    <el-input v-model="formData.group_desc" type="textarea" rows="4" clearable
                        :placeholder="t('groupDescPlaceholder')" class="input-width" maxlength="100" />
                </el-form-item>
                <el-form-item :label="t('mainApp')" prop="app">
                    <el-select class="input-width" v-model="formData.app" :placeholder="t('mainAppPlaceholder')"
                        :disabled="formData.group_id">
                        <block v-for="item in addonList">
                            <el-option v-if="item.type == 'app'" :key="item.key" :label="item.title" :value="item.key" />
                        </block>
                    </el-select>
                </el-form-item>

                <el-form-item :label="t('containAddon')">
                    <div class="text-gray-400" v-if="!formData.app">请先选择主应用</div>
                    <div class="text-gray-400" v-else-if="!supportAddon.length">没有所选应用可用的插件</div>
                    <el-checkbox-group v-model="formData.addon" class="flex w-full" v-else>
                        <template #default>
                            <div class="flex w-[300px]" v-for="item in supportAddon">
                                <el-checkbox :label="item.key" name=""
                                    class="w-full !h-auto border border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md">
                                    <template #default>
                                        <div class="w-full">
                                            <div class="flex">
                                                <div class="w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden">
                                                    <el-image :src="img(item.cover)" v-if="item.cover"
                                                        class="w-full h-full" />
                                                    <el-image v-else class="w-full h-full">
                                                        <template #error>
                                                            <div class="image-error">
                                                                <el-icon><icon-picture /></el-icon>
                                                            </div>
                                                        </template>
                                                    </el-image>
                                                </div>
                                                <div class="flex-1 w-0 flex flex-col justify-center">
                                                    <div class="font-bold">{{ item.title }}</div>
                                                    <div class="text-gray-400 mt-[10px]">{{ item.desc }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </el-checkbox>
                            </div>
                        </template>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>

            <div class="fixed-footer-wrap">
                <div class="fixed-footer">
                    <el-button type="primary" @click="confirm(formRef)" v-loading="saveLoding">{{ t('save') }}</el-button>
                    <el-button @click="back()">{{ t('cancel') }}</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup async>
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addSiteGroup, editSiteGroup, getSiteGroupInfo } from '@/app/api/site'
import { getInstalledAddonList } from '@/app/api/addon'
import { img } from '@/utils/common'
import { useRouter, useRoute } from 'vue-router'

const loading = ref(true)
const addonList = ref([])
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const saveLoding = ref(false)

/**
 * 表单数据
 */
const formData: Record<string, any> = ref({
    group_id: 0,
    group_name: '',
    group_desc: '',
    app: '',
    addon: []
})

if (route.query.id) {
    getSiteGroupInfo(route.query.id).then(({ data }) => {
        formData.value = data
        loading.value = false
    }).catch()
} else {
    loading.value = false
}

const back = () => {
    router.push('/admin/site/group')
}

getInstalledAddonList().then(({ data }) => {
    addonList.value = data
}).catch()

const supportAddon = computed(() => {
    const addon = []
    if (formData.value.app && Object.keys(addonList.value).length) {
        Object.keys(addonList.value).forEach(key => {
            const item = addonList.value[key]
            if (item.type == 'addon' && item.support_app == '' || item.support_app == formData.value.app) addon.push(item)
        })
    }
    return addon
})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        group_name: [
            { required: true, message: t('groupNamePlaceholder'), trigger: 'blur' }
        ],
        app: [
            { required: true, message: t('mainAppPlaceholder'), trigger: 'blur' }
        ]
    }
})

watch(() => formData.value.app, (nval, oval) => {
    if (nval && oval) formData.value.addon = []
})

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (saveLoding.value || !formEl) return
    const save = formData.value.group_id ? editSiteGroup : addSiteGroup

    await formEl.validate(async (valid) => {
        if (valid) {
            saveLoding.value = true

            save(formData.value).then(res => {
                setTimeout(() => {
                    back()
                }, 1000)
            }).catch(() => {
                saveLoding.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped>
.image-error {
    background: var(--el-border-color-extra-light);
    width: 100%;
    height: 100%;
}

:deep(.el-checkbox__label) {
    width: 100%;
}
</style>
