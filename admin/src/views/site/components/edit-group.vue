<template>
    <el-dialog v-model="showDialog" :title="popTitle" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
            <el-form-item :label="t('groupName')" prop="group_name">
                <el-input v-model="formData.group_name" :placeholder="t('groupNamePlaceholder')" clearable
                    :disabled="formData.uid" class="input-width" maxlength="20" :show-word-limit="true" />
            </el-form-item>
            <el-form-item :label="t('groupDesc')" prop="group_desc">
                <el-input v-model="formData.group_desc" type="textarea" rows="4" clearable
                    :placeholder="t('groupDescPlaceholder')" class="input-width" maxlength="100" />
            </el-form-item>

            <el-form-item :label="t('permission')" prop="group_roles">
                <div>
                    <el-checkbox v-model="selectAll" :label="t('selectAll')" />
                    <el-checkbox v-model="checkStrictly" :label="t('checkStrictly')" />
                </div>
                <el-scrollbar max-height="40vh" class="w-full">
                    <el-tree :data="menus" :props="{ label: 'menu_name' }" :default-checked-keys="formData.group_roles"
                        :check-strictly="checkStrictly" show-checkbox default-expand-all @check-change="handleCheckChange"
                        node-key="menu_key" ref="treeRef" />
                </el-scrollbar>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                    t('confirm')
                }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup async>
import { ref, reactive, computed, watch, toRaw } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getMenus } from '@/api/sys'
import { addSiteGroup, editSiteGroup, getSiteGroupInfo } from '@/api/site'
import { debounce } from '@/utils/common'

const showDialog = ref(false)
const loading = ref(false)
let popTitle: string = '';

// 获取权限数据
const menus = ref<Record<string, any>[]>([])
getMenus('site').then((res) => {
    menus.value = res.data
})

// 全选
const selectAll = ref(false)
const checkStrictly = ref(false)
const treeRef: Record<string, any> | null = ref(null)
watch(selectAll, () => {
    if (selectAll.value) {
        treeRef.value.setCheckedNodes(toRaw(menus.value))
    } else {
        treeRef.value.setCheckedNodes([])
    }
})

const handleCheckChange = debounce((e) => {
    formData.group_roles = treeRef.value.getCheckedKeys()
})

/**
 * 表单数据
 */
const initialFormData = {
    group_id: 0,
    group_name: '',
    group_desc: '',
    group_roles: []
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        group_name: [
            { required: true, message: t('groupNamePlaceholder'), trigger: 'blur' }
        ],
        group_roles: [
            {
                required: true,
                validator: (rule: any, value: string, callback: any) => {
                    if (!value.length) callback(new Error(t('groupRolesPlaceholder')))
                    else callback()
                },
                trigger: 'blur'
            }
        ]
    }
})

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    const save = formData.group_id ? editSiteGroup : addSiteGroup

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data = formData

            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(() => {
                loading.value = false
                showDialog.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    loading.value = true
    selectAll.value = false
    Object.assign(formData, initialFormData)
    popTitle = t('addGroup')
    if (row) {
        popTitle = t('updateGroup')
        const data = await (await getSiteGroupInfo(row.group_id)).data
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
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
