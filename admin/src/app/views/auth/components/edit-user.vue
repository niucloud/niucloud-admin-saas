<template>
    <el-dialog v-model="showDialog" :title="popTitle" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">

            <el-form-item :label="t('accountNumber')" v-if="!formData.uid" prop="uid">
                <el-select :model-value="uid" :placeholder="t('accountNumberPlaceholder')" class="input-width" filterable
                    clearable :allow-create="true" @change="selectUser" :default-first-option="true">
                    <el-option v-for="item in userList" :key="item.uid" :label="item.username" :value="item.uid">
                        <div class="flex items-center">
                            <el-avatar :src="img(item.head_img)" size="small" class="mr-[10px]" v-if="item.head_img" />
                            <img src="@/app/assets/images/member_head.png" alt="" class="mr-[10px] w-[24px]" v-else>
                            {{ item.username }}
                        </div>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="t('accountNumber')" prop="username" v-else>
                <el-input v-model="formData.username" :placeholder="t('accountNumberPlaceholder')" clearable
                    :disabled="formData.uid" class="input-width" maxlength="10" show-word-limit />
            </el-form-item>

            <div v-if="needAddUserInfo">
                <el-form-item :label="t('headImg')">
                    <upload-image v-model="formData.head_img" />
                </el-form-item>

                <el-form-item :label="t('userRealName')" prop="real_name">
                    <el-input v-model="formData.real_name" :placeholder="t('userRealNamePlaceholder')" clearable
                        class="input-width" maxlength="10" show-word-limit />
                </el-form-item>

                <div v-if="!formData.uid">
                    <el-form-item :label="t('password')" prop="password">
                        <el-input v-model="formData.password" :placeholder="t('passwordPlaceholder')" type="password"
                            :show-password="true" clearable class="input-width" />
                    </el-form-item>

                    <el-form-item :label="t('confirmPassword')" prop="confirm_password">
                        <el-input v-model="formData.confirm_password" :placeholder="t('confirmPasswordPlaceholder')"
                            type="password" :show-password="true" clearable class="input-width" />
                    </el-form-item>
                </div>
            </div>

            <el-form-item :label="t('userRoleName')" prop="role_ids" v-if="!formData.userrole.is_admin">
                <el-select v-model="formData.role_ids" :placeholder="t('userRolePlaceholder')" class="input-width" multiple
                    collapse-tags collapse-tags-tooltip>
                    <el-option :label="item.role_name" :value="item.role_id" v-for="(item, index) in roles" :key="index" />
                </el-select>
            </el-form-item>

            <el-form-item :label="t('status')">
                <el-radio-group v-model="formData.status">
                    <el-radio :label="1">{{ t('statusUnlock') }}</el-radio>
                    <el-radio :label="0">{{ t('lock') }}</el-radio>
                </el-radio-group>
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
import { ref, reactive, computed, toRaw, watch } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getUserInfo, getAllUserList } from '@/app/api/user'
import { addUser, editUser } from '@/app/api/site'
import { allRole } from '@/app/api/sys'
import { img, deepClone } from '@/utils/common'

const userList = ref([])
const uid = ref<number | string>('')

const selectUser = (value: any) => {
    uid.value = value
    if (typeof value == 'string') formData.username = value
}

const getUserList = () => {
    getAllUserList({}).then(({ data }) => {
        userList.value = data
    }).catch()
}
getUserList()

const needAddUserInfo = computed(() => {
    if (formData.uid || !uid.value || typeof uid.value == 'string') {
        return true
    } else {
        return false
    }
})

const showDialog = ref(false)
const loading = ref(false)
let popTitle: string = ''

/**
 * 表单数据
 */
const initialFormData = {
    uid: 0,
    username: '',
    head_img: '',
    real_name: '',
    password: '',
    confirm_password: '',
    status: 1,
    role_ids: [],
    userrole: {}
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        uid: [
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (!formData.uid && uid.value === '') callback(new Error(t('managerPlaceholder')))
                    else callback()
                },
                trigger: 'blur'
            }
        ],
        username: [
            { required: formData.uid == 0, message: t('accountNumberPlaceholder'), trigger: 'blur' }
        ],
        real_name: [
            { required: true, message: t('userRealNamePlaceholder'), trigger: 'blur' }
        ],
        role_ids: [
            { required: true, message: t('userRolePlaceholder'), trigger: 'blur' }
        ],
        password: [
            { required: formData.uid == 0, message: t('passwordPlaceholder'), trigger: 'blur' }
        ],
        confirm_password: [
            { required: formData.uid == 0, message: t('confirmPasswordPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (value != formData.password) callback(new Error(t('confirmPasswordError')))
                    else callback()
                },
                trigger: 'blur'
            }
        ]
    }
})

const emit = defineEmits(['complete'])

// 角色
const roles = ref<Record<string, any>>([])
allRole().then(res => {
    roles.value = res.data
    roles.value.forEach(element => {
        element.role_id = element.role_id.toString()
    })
})

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    const save = formData.uid ? editUser : addUser

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data = deepClone(toRaw(formData))
            if (!formData.uid && typeof uid.value == 'number') data.uid = uid.value

            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                !formData.uid && getUserList()
                emit('complete')
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    loading.value = true
    uid.value = ''
    Object.assign(formData, initialFormData)
    popTitle = t('addUser')

    if (row) {
        popTitle = t('updateUser')
        const data = await (await getUserInfo(row.uid)).data
        data.role_ids = data.role_ids || []
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
