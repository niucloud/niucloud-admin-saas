<template>
    <el-dialog v-model="showDialog" :title="popTitle" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" class="page-form" ref="formRef" :rules="formRules"
            v-loading="loading">
            <el-form-item :label="t('menuName')" prop="menu_name">
                <el-input v-model="formData.menu_name" :placeholder="t('menuNamePlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('menuKey')" prop="menu_key" v-if="!formData.id">
                <el-input v-model="formData.menu_key" :placeholder="t('menuKeyPlaceholder')" class="input-width" />
            </el-form-item>

            <el-form-item :label="t('menuType')">
                <el-radio-group v-model="formData.menu_type">
                    <el-radio :label="0">{{ t('menuTypeDir') }}</el-radio>
                    <el-radio :label="1">{{ t('menuTypeMenu') }}</el-radio>
                    <el-radio :label="2">{{ t('menuTypeButton') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('addon')" prop="addon" v-show="formData.app_type == 'site'">
                <el-select v-model="formData.addon" placeholder="Select" class="input-width" @change="addonChange">
                    <el-option v-for="(item, index) in addonLst" :label="item.title" :value="item.key" :key="index" />
                </el-select>
            </el-form-item>

            <el-form-item :label="t('parentMenu')" prop="parent_key">
                <el-tree-select class="input-width" v-if="formData.addon != ''" v-model="formData.parent_key"
                    :props="{ label: 'menu_name', value: 'menu_key' }" :data="addonMenuList" check-strictly
                    :render-after-expand="false" />
                <el-tree-select class="input-width" v-else v-model="formData.parent_key"
                    :props="{ label: 'menu_name', value: 'menu_key' }" :data="sysMenuList" check-strictly
                    :render-after-expand="false" />
            </el-form-item>

            <el-form-item :label="t('routePath')" prop="router_path" v-show="formData.menu_type != 2">
                <el-input v-model="formData.router_path" :placeholder="t('routePathPlaceholder')" class="input-width" />
            </el-form-item>

            <el-form-item :label="t('viewPath')" prop="view_path" v-show="formData.menu_type == 1">
                <el-input v-model="formData.view_path" :placeholder="t('viewPathPlaceholder')" class="input-width" />
            </el-form-item>

            <el-form-item :label="t('authId')" prop="api_url" v-show="formData.menu_type != 0">
                <el-input v-model="formData.api_url" :placeholder="t('authIdPlaceholder')" class="input-width">
                    <template #append>
                        <el-select class="w-[90px] border-none" v-model="formData.methods">
                            <el-option label="POST" value="post" />
                            <el-option label="GET" value="get" />
                            <el-option label="PUT" value="put" />
                            <el-option label="DELETE" value="delete" />
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item :label="t('menuIcon')" prop="icon" v-show="formData.menu_type != 2">
                <div class="input-width">
                    <select-icon v-model="formData.icon" />
                </div>
            </el-form-item>

            <el-form-item :label="t('status')" v-show="formData.menu_type != 2">
                <el-radio-group v-model="formData.status">
                    <el-radio :label="1">{{ t('statusNormal') }}</el-radio>
                    <el-radio :label="0">{{ t('statusDeactivate') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('isShow')" v-show="formData.menu_type != 2">
                <el-radio-group v-model="formData.is_show">
                    <el-radio :label="1">{{ t('show') }}</el-radio>
                    <el-radio :label="0">{{ t('hidden') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('menuShortName')">
                <el-input v-model="formData.menu_short_name" :placeholder="t('menuShortNamePlaceholder')"
                    class="input-width" />
            </el-form-item>

            <el-form-item :label="t('sort')">
                <el-input-number v-model="formData.sort" :min="0" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addMenu, editMenu, getMenuInfo, getSystemMenu, getAddonMenu } from '@/app/api/sys'
import { getAddonDevelop } from '@/app/api/tools'

const showDialog = ref(false)
const loading = ref(false)
let popTitle: string = ''

/**
 * 表单数据
 */
const initialFormData = {
    id: 0,
    menu_name: '',
    menu_type: 0,
    parent_key: '',
    icon: '',
    api_url: '',
    router_path: '',
    view_path: '',
    methods: 'post',
    sort: '',
    status: 1,
    is_show: 1,
    menu_key: '',
    app_type: '',
    addon: '',
    menu_short_name: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const addonLst = ref<Array<any>>([])
const sysMenuList = ref<Array<any>>([])
const addonMenuList = ref<Array<any>>([])
const formRef = ref<FormInstance>()

const validataMenuKey = (val: string) => {
    return /^([a-zA-Z_$])([a-zA-Z0-9_$])*$/.test(val)
}

// 表单验证规则
const formRules = computed(() => {
    return {
        menu_name: [
            { required: true, message: t('menuNamePlaceholder'), trigger: 'blur' }
        ],
        menu_key: [
            { required: true, message: t('menuKeyPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (!validataMenuKey(value)) {
                        callback(new Error(t('menuKeyValidata')))
                    }

                    callback()
                },
                trigger: 'blur'
            }
        ],
        // return /^([a-zA-Z_$])([a-zA-Z0-9_$])*$/.test(val)
        router_path: [
            { required: formData.menu_type != 2, message: t('routePathPlaceholder'), trigger: 'blur' }
        ],
        view_path: [
            { required: formData.menu_type == 1, message: t('viewPathPlaceholder'), trigger: 'blur' }
        ],
        icon: [
            { required: formData.menu_type != 2, message: t('selectIconPlaceholder'), trigger: 'blur' }
        ],
        api_url: [
            { required: formData.menu_type == 2, message: t('authIdPlaceholder'), trigger: 'blur' }
        ]
    }
})

// 获取插件列表
const getAddonDevelopFn = async () => {
    const { data } = await getAddonDevelop({})
    addonLst.value = [{ title: '系统', key: '' }]
    addonLst.value.push(...data)
}

// 获取系统菜单列表
const getSystemMenuFn = async () => {
    const { data } = await getSystemMenu()
    sysMenuList.value = [{ menu_name: '顶级', menu_key: '' }]
    sysMenuList.value.push(...data)
}

// 获取系统应用列表
const getAddonMenuFn = async (key: any) => {
    const { data } = await getAddonMenu(key)
    addonMenuList.value = data
}

// 选择应用
const addonChange = async (val: any) => {
    formData.parent_key = ''
    if (val != '') {
        await getAddonMenuFn(val)
        formData.parent_key = addonMenuList.value[0].menu_key
    }
}

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    const save = formData.id ? editMenu : addMenu

    await formEl.validate(async (valid, fields) => {
        if (valid) {
            loading.value = true

            const data = formData
            data.api_url = data.api_url ? `${data.api_url}/${formData.methods}` : ''

            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    popTitle = t('addMenu')
    getAddonDevelopFn()
    getSystemMenuFn()
    if (row.menu_key) {
        popTitle = t('updateMenu')
        const data = await (await getMenuInfo(row.app_type, row.menu_key)).data
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
        if (formData.addon != '') getAddonMenuFn(formData.addon)
    } else {
        Object.keys(formData).forEach((key: string) => {
            if (row[key] != undefined) formData[key] = row[key]
        })
    }

    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
