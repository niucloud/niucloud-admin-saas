<template>
    <div class="main-container w-full bg-white"  v-loading="loading">
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="saveInfo" label-width="80px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('headImg')">
                    <upload-image v-model="saveInfo.head_img" :limit="1" />
                </el-form-item>
				<el-form-item :label="t('userName')">
                    <span>{{saveInfo.username}}</span>
				</el-form-item>
                <el-form-item :label="t('realName')">
                    <el-input v-model="saveInfo.real_name" :placeholder="t('realNamePlaceholder')" clearable class="input-width" />
                </el-form-item>
            </el-form>
            <div class="fixed-footer-wrap">
                <div class="fixed-footer">
                    <el-button type="primary" @click="submitForm(formRef)">{{ t('save') }}</el-button>
                    <el-button type="primary" @click="returnFn(formRef)">{{ t('cancel') }}</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import type { FormInstance, FormRules, ElNotification } from 'element-plus'
import { img } from '@/utils/common'
import { getUserInfo,setUserInfo } from '@/app/api/personal'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
// 提交信息
let saveInfo = reactive({
        head_img: '',
        real_name: '',
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
const returnFn = ()=>{
    router.push('/user/center')
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
