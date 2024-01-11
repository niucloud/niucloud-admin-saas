<template>
    <div class="main-container mb-80" v-loading="loading">
        <div class="detail-head !mb-[10px]">
            <div class="left" @click="router.push({ path: '/tools/addon' })">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t('returnToPreviousPage') }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="form" label-width="90px" ref="formRef" :rules="rules" class="page-form">
                <el-form-item :label="t('title')" prop="title">
                    <el-input v-model="form.title" clearable :placeholder="t('titlePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('icon')" prop="icon">
                    <div>
                        <upload-image v-model="form.icon" />
                        <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('iconPlaceholder1') }}</p>
                    </div>

                </el-form-item>
                <el-form-item :label="t('key')" prop="key">
                    <div>
                        <el-input v-model="form.key" clearable :disabled="route.query.key"
                            :placeholder="t('keyPlaceholder')" class="input-width mr-[15px]" />
                        <el-button v-if="!route.query.key" type="primary" :disabled="form.key == ''"
                            @click="getAddonDevelopCheckFn(form.key)">官方市场标识检测</el-button>
                        <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('keyPlaceholder1') }}</p>
                        <p class="text-[12px] text-[#a9a9a9] leading-normal">{{ t('keyPlaceholder2') }}</p>
                    </div>

                </el-form-item>
                <el-form-item :label="t('desc')" prop="desc">
                    <el-input type="textarea" v-model="form.desc" clearable :placeholder="t('descPlaceholder')"
                        class="input-width" />
                </el-form-item>
                <el-form-item :label="t('author')" prop="author">
                    <el-input v-model="form.author" clearable :placeholder="t('authorPlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('version')" prop="version">
                    <div>
                        <el-input v-model="form.version" clearable :placeholder="t('versionPlaceholder')"
                            class="input-width" onkeyup="this.value = this.value.replace(/[^\d\.]/g,'');" />
                        <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('versionPlaceholder1') }}</p>
                    </div>

                </el-form-item>
                <el-form-item :label="t('cover')" prop="cover">
                    <div>
                        <upload-image v-model="form.cover" />
                        <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('coverPlaceholder1') }}</p>
                    </div>

                </el-form-item>
                <el-form-item :label="t('type')" prop="type">
                    <div>
                        <el-select v-model="form.type" :placeholder="t('typePlaceholder')" class="input-width" clearable
                            @change="typeChange">
                            <el-option v-for="(item, key) in options" :key="key" :label="item" :value="key" />
                        </el-select>
                        <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('typePlaceholder1') }}</p>
                        <p class="text-[12px] text-[#a9a9a9] leading-normal">{{ t('typePlaceholder2') }}</p>
                    </div>
                </el-form-item>
                <template v-if="form.type === 'addon'">
                    <el-form-item :label="t('supportType')">
                        <div>
                            <el-select v-model="form.support_type" class="input-width" @change="typeChange">
                                <el-option label="通用插件" :value="1" />
                                <el-option label="支持应用" :value="2" />
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('supportApp')" prop="support_app" v-if="form.support_type!=1">
                        <el-select v-model="form.support_app" :placeholder="t('supportAppPlaceholder')" class="input-width">
                            <el-option v-for="(item, index) in AppLst" :label="item.title" :value="item.key"
                                :key="index" />
                        </el-select>
                    </el-form-item>
                </template>
                <!-- <el-form-item v-if="form.type != 'app'" :label="t('supportApp')" prop="support_app">
                    <el-input v-model="form.support_app" clearable :placeholder="t('supportAppPlaceholder')"
                        class="input-width" />
                </el-form-item> -->
            </el-form>
        </el-card>
        <div class="fixed-footer-wrap" v-if="!loading">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('GeneratePlugins') }}</el-button>
                <el-button @click="router.push({ path: '/tools/addon' })">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { t } from '@/lang'
import { getAddontype, addAddonDevelop, editAddonDevelop, getAddonDevelopInfo, getAddonDevelopCheck } from '@/app/api/tools'
import { getAddonList } from '@/app/api/sys'
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const form = ref({
    title: '',
    icon: '',
    key: '',
    desc: '',
    author: '',
    version: '',
    cover: '',
    type: '',
    support_app: '',
    support_type: 1
})
const options = ref([])
const loading = ref(false)
const formRef = ref()
const validKey = (rule:any, value:any, callback:any) => {
    if (value !== '') {
        const reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
        if (!reg.test(value)) {
            return callback(new Error(t('keyPlaceholderErr')))
        } else {
            return callback() // *验证成功的地方必须callback()
        }
    } else {
        return callback(new Error(t('keyPlaceholder')))
    }
}
const validVersion = (rule:any, value:any, callback:any) => {
    if (value !== '') {
        const reg = /^([0-9]\d|[0-9])(\.([0-9]){1}){2}$/
        if (!reg.test(value)) {
            return callback(new Error(t('versionPlaceholderErr')))
        } else {
            return callback() // *验证成功的地方必须callback()
        }
    } else {
        return callback(new Error(t('versionPlaceholder')))
    }
}
const rules = ref({
    title: [
        { required: true, message: t('titlePlaceholder'), trigger: 'blur' }
    ],
    icon: [
        { required: true, message: t('iconPlaceholder'), trigger: 'change' }
    ],
    key: [
        { required: true, validator: validKey, trigger: 'blur' }
    ],
    author: [
        { required: true, message: t('authorPlaceholder'), trigger: 'blur' }
    ],
    version: [
        { required: true, validator: validVersion, trigger: 'blur' }
    ],
    cover: [
        { required: true, message: t('coverPlaceholder'), trigger: 'change' }
    ],
    type: [
        { required: true, message: t('typePlaceholder'), trigger: 'change' }
    ],
    support_app: [
        { required: true, message: t('typePlaceholder'), trigger: 'change' }
    ]
})
onMounted(async () => {
    const res = await getAddontype()
    options.value = res.data
    if (route.query.key) getAddonDevelopInfoFn(route.query.key)
})
const typeChange = () => {
    form.value.support_app = ''
}
// 详情查询
const getAddonDevelopInfoFn = (key: any) => {
    loading.value = true
    getAddonDevelopInfo(key).then(res => {
        form.value = Object.assign(form.value, res.data)
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
// 获取app列表
const AppLst = ref<Array<any>>([])
const getAddonListFn = async () => {
    const { data } = await getAddonList({})
    AppLst.value = data
}
getAddonListFn()
const getAddonDevelopCheckFn = (key: any) => {
    getAddonDevelopCheck(key).then(res => {
        ElMessageBox.alert(res.data ? t('warningText') : t('successText'), t('warning'), {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: t('confirm'),
            callback: (action: any) => {
                console.log(action)
            }
        })
    })
}
/**
 * 确认
 * @param formEl
 */
const onSave = async (formEl: FormInstance | undefined) => {
    await formEl.validate(async (valid) => {
        if (valid) {
            const save = route.query.key ? editAddonDevelop : addAddonDevelop
            loading.value = true
            save(form.value.key, form.value).then(res => {
                loading.value = false
                ElMessage({
                    message: t('onSaveSuccessText'),
                    type: 'success'
                })

                setTimeout(() => {
                    window.addonActiveName = 'pluginList'
                    router.push({ path: '/tools/addon' })
                }, 650)
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>
