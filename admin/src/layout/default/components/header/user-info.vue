<template>
    <div>
        <el-dropdown @command="clickEvent" :tabindex="1">
            <div class="userinfo flex h-full items-center">
                <el-avatar :size="25" :icon="UserFilled" />
                <div class="user-name pl-[8px]">{{ userStore.userInfo.username }}</div>
                <icon name="element-ArrowDown" class="ml-[5px]" />
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="toLink('/home/index')">
                        <div class="flex items-center leading-[1] py-[5px]">
                            <span class="iconfont iconqiehuan ml-[4px] !text-[14px] mr-[10px]"></span>
                            <span class="text-[14px]">切换站点</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item @click="toLink('/user/center')">
                        <div class="flex items-center leading-[1] py-[5px]">
                            <span class="iconfont iconshezhi1 ml-[4px] !text-[14px] mr-[10px]"></span>
                            <span class="text-[14px]">账号设置</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item @click="changePasswordDialog=true">
                        <div class="flex items-center leading-[1] py-[5px]">
                            <span class="iconfont iconxiugai ml-[4px] !text-[14px] mr-[10px]"></span>
                            <span class="text-[14px]">修改密码</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="logout">
                        <div class="flex items-center leading-[1] py-[2px]">
                            <span class="iconfont icontuichudenglu !text-[21px] mr-[8px]"></span>
                            <span class="text-[14px]">退出登录</span>
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <el-dialog v-model="changePasswordDialog" width="450px" title="修改密码" :before-close="handleClose">
            <div>
                <el-form :model="saveInfo" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                    <el-form-item :label="t('originalPassword')" prop="original_password">
                        <el-input v-model="saveInfo.original_password" type="password" :placeholder="t('originalPasswordPlaceholder')" clearable class="input-width" />
                    </el-form-item>
                    <el-form-item :label="t('newPassword')" prop="password">
                        <el-input v-model="saveInfo.password" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" />
                        <div class="form-tip">{{t('passwordTip')}}</div>
                    </el-form-item>
                    <el-form-item :label="t('passwordCopy')" prop="password_copy">
                        <el-input v-model="saveInfo.password_copy" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="changePasswordDialog = false">{{t('cancel')}}</el-button>
                    <el-button type="primary" @click="submitForm(formRef)">{{t('save')}}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules, ElNotification } from 'element-plus'
import useUserStore from '@/stores/modules/user'
import { setUserInfo } from '@/app/api/personal'
import { t } from '@/lang'

const userStore = useUserStore()
const router = useRouter()

const clickEvent = (command: string) => {
    switch (command) {
        case 'logout':
            userStore.logout()
            break
    }
}

const toLink = (link) => {
    router.push(link)
}

// 修改密码 --- start
const changePasswordDialog = ref(false)
const formRef = ref<FormInstance>()
// 提交信息
const saveInfo = reactive({
    original_password: '',
    password: '',
    password_copy: ''
})
// 表单验证规则
const formRules = reactive<FormRules>({
    original_password: [
        { required: true, message: t('originalPasswordPlaceholder'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
    ],
    password_copy: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
    ]
})
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            let msg = ''
            if (saveInfo.password && !saveInfo.original_password) msg = t('originalPasswordHint')
            if (saveInfo.password && saveInfo.original_password && !saveInfo.password_copy) msg = t('newPasswordHint')
            if (saveInfo.password && saveInfo.original_password && saveInfo.password_copy && saveInfo.password != saveInfo.password_copy) msg = t('doubleCipherHint')
            if (msg) {
                ElNotification({
                    type: 'error',
                    message: msg
                })
                return
            }

            setUserInfo(saveInfo).then((res: any) => {
                changePasswordDialog.value = false
            })
        } else {
            return false
        }
    })
}
// 修改密码 --- end
</script>

<style lang="scss" scoped>
.el-popper .el-dropdown-menu{
    width: 150px;
}
</style>
