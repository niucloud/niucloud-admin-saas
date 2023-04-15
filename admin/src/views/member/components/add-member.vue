<template>
    <el-dialog v-model="showDialog" :title="popTitle" width="500px"
        :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('nickname')" prop="nickname">
                    <el-input v-model="formData.nickname" clearable :placeholder="t('nickNamePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('username')" prop="username">
                    <el-input v-model="formData.username" clearable :placeholder="t('usernamePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('mobile')" prop="mobile">
                    <el-input v-model="formData.mobile" clearable :placeholder="t('mobilePlaceholder')" type="number" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('password')" prop="password">
                    <el-input v-model="formData.password" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" />
                </el-form-item>
                <el-form-item :label="t('passwordCopy')" prop="password_copy">
                    <el-input v-model="formData.password_copy" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" />
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

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addMember,getMemberList } from '@/api/member'

let showDialog = ref(false)
const loading = ref(false)
let popTitle:string = '';

/**
 * 表单数据
 */
const initialFormData = {
    member_id: '',
    nickname: '',
    mobile: '',
    password: '',
    password_copy: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()



// 表单验证规则
const formRules = computed(() => {
    return {
    nickname: [
        { required: true, message: t('nickNamePlaceholder'), trigger: 'blur' }
    ],
    username: [
        { required: true, message: t('usernamePlaceholder'), trigger: 'blur' }
    ],
    mobile: [
        { validator: mobileVerify, trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
    ],
    password_copy: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' },
        { validator: doubleCipher, trigger: 'blur' }
    ],
    }
})
// 验证手机号格式
const mobileVerify = (rule: any, value: any, callback: any) => {
    if (value && !/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error(t('mobileHint')))
    }else {
        callback()
    }
}
// 验证两次密码
const doubleCipher = (rule: any, value: any, callback: any) => {
  if (value != formData.password) {
    callback(t('doubleCipherHint'));
  } else {
    callback()
  }
}

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    let save =  addMember

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            let data = formData

            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(err => {
                loading.value = false
                showDialog.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    popTitle = t('addMember')
    if(row){
        popTitle = t('updateMember')
        const data = await (await getMemberList(row.member_id)).data
        if (data) Object.keys(formData).forEach((key: string) => {
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