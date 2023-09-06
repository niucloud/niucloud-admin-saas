<template>
    <div class="main-container attachment-container"  v-loading="loading">
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="saveInfo" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('headImg')">
                    <upload-image v-model="saveInfo.head_img" :limit="1" />
                </el-form-item>
				<el-form-item :label="t('userName')">
				    <el-input v-model="saveInfo.username" clearable class="input-width" :readonly="true"/>
				</el-form-item>
                <el-form-item :label="t('realName')">
                    <el-input v-model="saveInfo.real_name" :placeholder="t('realNamePlaceholder')" clearable class="input-width" />
                </el-form-item>
                <el-form-item :label="t('originalPassword')">
                    <el-input v-model="saveInfo.original_password" type="password" :placeholder="t('originalPasswordPlaceholder')" clearable class="input-width" />
                </el-form-item>
                <el-form-item :label="t('password')">
                    <el-input v-model="saveInfo.password" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" />
                    <div class="form-tip">{{t('passwordTip')}}</div>
                </el-form-item>
                <el-form-item :label="t('passwordCopy')">
                    <el-input v-model="saveInfo.password_copy" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" />
                </el-form-item>
            </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="submitForm(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import type { FormInstance, FormRules, ElNotification } from 'element-plus'
import { img } from '@/utils/common'
import { getUserInfo,setUserInfo } from '@/api/personal'

// 提交信息
let saveInfo = reactive({
        head_img: '',
        real_name: '',
        original_password: '',
        password: '',
        password_copy: '',
		username: ''
    });

const formRef = ref<FormInstance>();
const loading = ref(true);

/**
 * 获取用户信息
 */
const getUserInfoFn = () => {
    loading.value = true;
    getUserInfo().then(res => {
        loading.value = false;
        
        let data = res.data;
        saveInfo.head_img = data.head_img;
        saveInfo.real_name = data.real_name;
        saveInfo.original_password = data.original_password;
        saveInfo.password = data.password;
        saveInfo.password_copy = data.password;
		saveInfo.username = data.username;
    }).catch(() => {
        loading.value = false;  
    })
}
getUserInfoFn();

const submitForm = (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    formEl.validate((valid) => {
        if (valid) {
            let msg = "";
            if (saveInfo.password && !saveInfo.original_password) msg = t('originalPasswordHint');
            if (saveInfo.password && saveInfo.original_password && !saveInfo.password_copy) msg = t('newPasswordHint');
            if (saveInfo.password && saveInfo.original_password && saveInfo.password_copy && saveInfo.password != saveInfo.password_copy) msg = t('doubleCipherHint');
            if (msg) {
                ElNotification({
                    type: 'error',
                    message: msg,
                })
                return;
            }

            loading.value = true;

            setUserInfo(saveInfo).then((res: any) => {
                loading.value = false;
            }).catch((err: any) => {
                loading.value = false
            })
        } else {
            return false
        }
    });
}

</script>

<style lang="scss" scoped>
:deep(.personal-body){
    background-color: #fff;
    .el-form-item__content{
        .el-input{
            width: 250px;
        }
        .el-form-item__content{
            justify-content: space-between;
        }
        .el-button{
            margin-left: auto;
        }
        .personal-option{
            margin-right: auto;
        }
    }
}
</style>
