<template>
    <div class="main-container w-full bg-white"  v-loading="loading">
        <el-card class="box-card !border-none relative" shadow="never">
            <el-form :model="saveInfo" label-width="80px" ref="formRef" class="page-form">
                <el-form-item :label="t('headImg')">
                    <el-image class="w-[70px] h-[70px]" :src="img(saveInfo.head_img)" fit="contain">
                        <template #error>
                            <div class="image-slot bg-[#c0c4cc] flex items-center justify-center w-[70px] h-[70px] rounded-full">
                                <el-icon class="!text-[#fff] !text-[45px]"><UserFilled /></el-icon>
                            </div>
                        </template>
                    </el-image>
                </el-form-item>
				<el-form-item :label="t('userName')">
				    <div>{{saveInfo.username}}</div>
				</el-form-item>
                <el-form-item :label="t('realName')">
                    <div>{{saveInfo.real_name}}</div>
                </el-form-item>
            </el-form>
            <span class="text-[14px] text-[#999] absolute top-[25px] right-[20px] cursor-pointer" @click="toEditPersonal">{{ t('editPersonal') }}</span>
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

// 编辑个人中心
const toEditPersonal = () => {
    router.push('/user/edit_center')
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
