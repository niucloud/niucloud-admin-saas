<template>
    <el-dialog v-model="showDialog" :title="elDialogTitle" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
            <el-form-item :label="t('siteName')" prop="site_name">
                <el-input v-model="formData.site_name" clearable :placeholder="t('siteNamePlaceholder')" class="input-width" />
            </el-form-item>

            <el-form-item :label="t('groupId')" prop="group_id">
                <el-select v-model="formData.group_id" clearable :placeholder="t('groupIdPlaceholder')" class="input-width">
                    <el-option :label="item['group_name']" :value="item['group_id']" v-for="item in groupList" />
                </el-select>
            </el-form-item>
            <!-- <el-form-item :label="t('realName')" prop="real_name" v-if="!formData.site_id && !loading">
                    <el-input v-model="formData.real_name" clearable :placeholder="t('realNamePlaceholder')" class="input-width" />
                </el-form-item> -->

            <el-form-item :label="t('username')" prop="username" v-if="!formData.site_id && !loading">
                <el-input v-model="formData.username" clearable :placeholder="t('usernamePlaceholder')" class="input-width" />
            </el-form-item>

            <el-form-item :label="t('password')" prop="password" v-if="!formData.site_id && !loading">
                <el-input v-model="formData.password" clearable :placeholder="t('passwordPlaceholder')" class="input-width" :show-password="true" type="password" />
            </el-form-item>

            <el-form-item :label="t('confirmPassword')" prop="confirm_password" v-if="!formData.site_id && !loading">
                <el-input v-model="formData.confirm_password" :placeholder="t('confirmPasswordPlaceholder')" type="password" :show-password="true" clearable class="input-width" />
            </el-form-item>


            <el-form-item :label="t('expireTime')" prop="expire_time" class="input-width">
                <el-date-picker class="flex-1 !flex" v-model="formData.expire_time" clearable type="datetime" value-format="YYYY-MM-DD HH:mm:ss" :placeholder="t('expireTimePlaceholder')">
                </el-date-picker>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{t('confirm')}}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addSite, getSiteGroupAll, getSiteInfo, editSite } from '@/api/site';

let showDialog = ref(false)
const loading = ref(true)
let groupList = ref([]);

/**
 * 表单数据
 */
const initialFormData = {
    site_id: "",
    site_name: '',
    real_name: '',
    username: '',
    password: '',
    confirm_password: '',
    expire_time: '',
    group_id: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

const setGroupList = async () => {
    groupList.value = await (await getSiteGroupAll({})).data
    if (groupList.value.length > 0) formData.group_id = groupList.value[0].group_id
}
setGroupList()

const setFormData = async (row: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    if (row) {
        const data = await (await getSiteInfo(row.site_id)).data
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
    }
    loading.value = false
}

// 表单验证规则
const formRules = computed(() => {
    return {
        site_name: [
            { required: true, message: t('siteNamePlaceholder'), trigger: 'blur' }
        ],
        group_id: [
            { required: true, message: t('groupIdPlaceholder'), trigger: 'blur' }
        ],
        username: [
            { required: true, message: t('usernamePlaceholder'), trigger: 'blur' }
        ],
        password: [
            { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
        ],
        real_name: [
            { required: true, message: t('userRealNamePlaceholder'), trigger: 'blur' }
        ],
        confirm_password: [
            { required: true, message: t('confirmPasswordPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (value != formData.password) callback(new Error(t('confirmPasswordError')))
                    else callback()
                },
                trigger: 'blur'
            }
        ],
        expire_time: [
            { required: true, message: t('expireTimePlaceholder'), trigger: 'blur' }
        ]
    }
})

const emit = defineEmits(['complete'])

// 弹窗头部
const elDialogTitle = computed(() => {
    let title = ref<string>("");
    if (loading.value) return "";
    return formData.site_id ? t('editSite') : t('addSite');
});


/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            let data = formData
            let save = data.site_id ? editSite : addSite
            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(err => {
                loading.value = false
                // showDialog.value = false
            })
        }
    })
}

defineExpose({
    showDialog,
    setFormData,
    loading
})
</script>

<style lang="scss" scoped></style>