<template>
    <el-container
        :class="['w-full h-screen bg-page', { 'login-wrap': loginType == 'admin' }, { 'site-login-wrap': loginType == 'site' }]">
        <!-- 平台端登录 -->
        <el-main class="login-main items-center justify-center" v-if="!imgLoading && loginType == 'admin'">
            <div class="flex rounded-2xl overflow-hidden">
                <div class="login-main-left w-[450px] flex flex-wrap justify-center">
                    <el-image v-if="loginConfig.bg" class="w-[450px] h-[400px]" :src="img(loginConfig.bg)" fit="cover" />
                    <img v-else src="@/assets/images/login/login_index_left.png" alt="">
                </div>
                <div class="login flex flex-col w-[400px] h-[400px] p-[40px]">
                    <h3 class="text-center text-lg font-bold mb-[10px]">{{ t('siteTitle') }}</h3>
                    <h3 class="text-center text-2xl font-bold mb-[26px]">{{ t('platform') }}</h3>

                    <el-form :model="form" ref="formRef" :rules="formRules">
                        <el-form-item prop="username">
                            <el-input v-model="form.username" :placeholder="t('userPlaceholder')"
                                @keyup.enter="handleLogin(formRef)" class="h-[40px] input-with-select">
                                <template #prepend>
                                    <icon name="element-User" />
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="form.password" :placeholder="t('passwordPlaceholder')" type="password"
                                @keyup.enter="handleLogin(formRef)" :show-password="true"
                                class="h-[40px] input-with-select">
                                <template #prepend>
                                    <icon name="element-Lock" />
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" class="mt-[30px] h-[40px] w-full" @click="handleLogin(formRef)"
                                :loading="loading">{{
                                    loading ? t('logging') : t('login')
                                }}</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
        </el-main>

        <!-- 站点端登录 -->
        <el-main class="login-main items-center justify-evenly" v-else-if="!imgLoading && loginType == 'site'">
            <div>
                <el-row class="items-end mb-[20px]">
                    <el-col :span="8">
                        <img src="@/assets/images/site_login.png" alt="">
                    </el-col>
                    <el-col :span="8" class="ml-[20px]">
                        <div>{{ t('manageAdminFramework') }}</div>
                    </el-col>
                </el-row>
                <div class="login flex flex-col w-[360px] p-[40px] rounded-md rounded-[10px]">
                    <h3 class="text-center text-3xl mb-[30px]">{{ t('siteLogin') }}</h3>
                    <el-form :model="form" ref="formRef" :rules="formRules">
                        <el-form-item prop="username">
                            <el-input v-model="form.username" @keyup.enter="handleLogin(formRef)" class="w-50 m-1 h-[40px]"
                                :placeholder="t('userPlaceholder')">
                                <template #prefix>
                                    <icon name="element-User" />
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input type="password" v-model="form.password" @keyup.enter="handleLogin(formRef)"
                                :show-password="true" class="w-50 m-1 h-[40px]" :placeholder="t('passwordPlaceholder')">
                                <template #prefix>
                                    <icon name="element-Lock" />
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" class="mt-[30px] h-[40px] w-full" @click="handleLogin(formRef)"
                                :loading="loading">{{
                                    loading ? t('logging') : t('login')
                                }}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-main>

        <!-- 验证组件 -->
        <verify @success="success" :mode="pop" captchaType="blockPuzzle" :imgSize="{ width: '330px', height: '155px' }"
            ref="verifyRef"></verify>

        <el-footer></el-footer>
    </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@/lang'
import storage from '@/utils/storage'
import { getLoginConfig } from '@/api/auth'
import useUserStore from '@/stores/modules/user'
import { setWindowTitle, img, getAppType } from '@/utils/common'

const loading = ref(false)
const imgLoading = ref(false)
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 判断登录页面[平台或者站点]
const loginType = ref(getAppType())

if (loginType.value == 'site') {
    setWindowTitle(t('siteLogin'))
} else {
    setWindowTitle(t('adminLogin'))
}

// 验证码 - start
const verifyRef = ref(null)
const success = (params) => {
    loginFn({ captcha_code: params.captchaVerification })
}
// 验证码 - end

const form = reactive({
    username: '',
    password: ''
})

// 获取登录配置信息
const loginConfig = ref({})
const getLoginConfigFn = async (id: number = 0) => {
    imgLoading.value = true
    const data = await (await getLoginConfig()).data
    loginConfig.value = data
    imgLoading.value = false
}
getLoginConfigFn()

const formRef = ref<FormInstance>()

const formRules = reactive<FormRules>({
    username: [
        { required: true, message: t('userPlaceholder'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
    ]
})

const handleLogin = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate((valid, fields) => {
        if (valid) {
            if (parseInt(loginConfig.value.is_captcha) && loginType.value == 'admin' || parseInt(loginConfig.value.is_site_captcha) && loginType.value == 'site') { verifyRef.value.show() } else { loginFn() }
        }
    })
}

// data 验证码
const loginFn = (data = {}) => {
    loading.value = true
    userStore.login({ username: form.username, password: form.password, ...data }, loginType.value).then(res => {
        storage.set({ key: 'app_type', data: loginType.value })
        const { query: { redirect } } = route
        const path = typeof redirect === 'string' ? redirect : '/'
        router.push(path)
    }).catch(err => {
        loading.value = false
    })
}
</script>

<style lang="scss">
.login-wrap {
    background-image: url("assets/images/login/login_index_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
}

.site-login-wrap {
    background-image: url('@/assets/images/back_login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
    padding: 0 15px;
}

.login-main {
    display: flex !important;
}

.login {
    background: var(--el-bg-color);
}

@media only screen and (max-width: 750px) {
    .login-main-left {
        display: none;
    }
}
</style>
