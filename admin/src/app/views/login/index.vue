<template>
    <el-container
        :class="['w-full h-screen bg-page flex flex-col', { 'login-wrap': loginType == 'admin' }, { 'site-login-wrap': loginType == 'site' }]">
        <!-- 平台端登录 -->
        <el-main class="login-main items-center justify-center flex-1 h-0" v-if="loginType == 'admin'">
            <div class="flex rounded-2xl overflow-hidden">
                <div class="login-main-left w-[450px] flex flex-wrap justify-center">
                    <el-image v-if="loginConfig.bg" class="w-[450px] h-[400px]" :src="img(loginConfig.bg)" fit="cover" />
                    <img v-else src="@/app/assets/images/login/login_index_left.png" alt="">
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
                                :loading="loading">{{ loading ? t('logging') : t('login') }}</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
        </el-main>

        <!-- 站点端登录 -->
        <el-main class="login-main w-full login-site-main items-center h-screen justify-evenly bg-[#F8FAFF]"
            v-else-if="!imgLoading && loginType == 'site'">
            <div class="flex rounded-2xl overflow-hidden h-screen w-full relative">
                <img v-if="loginConfig.site_bg" class="hidden h-[100%] lg:block" :src="img(loginConfig.site_bg)" />
                <img v-else class="hidden h-[100%] lg:block" src="@/app/assets/images/site_login_bg.png" />
                <div
                    class="w-[100%] bg-[#F8FAFF] flex flex-col absolute right-0 top-0 h-screen lg:w-[60%]">
                    <div class="flex justify-center items-center flex-1 h-0">
                        <div class="site-login-item w-[45%] py-[30px] relative rounded-[13px] max-w-[350px] bg-[#fff]">
                            <div class="w-[80%] mx-auto">
                                <h3 class="text-3xl mb-[30px]">{{ t('siteLogin') }}</h3>
                                <el-form :model="form" ref="formRef" :rules="formRules">
                                    <el-form-item prop="username">
                                        <el-input v-model="form.username" @keyup.enter="handleLogin(formRef)"
                                                  class="w-50 m-1 h-[40px]" :placeholder="t('userPlaceholder')">
                                            <template #prefix>
                                                <icon name="element-User" />
                                            </template>
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item prop="password">
                                        <el-input type="password" v-model="form.password" @keyup.enter="handleLogin(formRef)"
                                                  :show-password="true" class="w-50 m-1 h-[40px]"
                                                  :placeholder="t('passwordPlaceholder')">
                                            <template #prefix>
                                                <icon name="element-Lock" />
                                            </template>
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item>
                                        <el-button type="primary" class="mt-[30px] h-[40px] w-full"
                                                   @click="handleLogin(formRef)" :loading="loading">{{ loading ? t('logging') :
                                            t('login') }}</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-center mt-[20px] text-[#999] text-sm pb-8 " v-if="copyright">
                        <a :href="copyright.gov_url" v-if="copyright.gov_record" class="flex" target="_blank">
                            <img src="@/app/assets/images/gov_icon.png" alt="" class="h-[20px] mr-1">
                            <span class="mr-3">公安备案号:{{ copyright.gov_record }}</span>
                        </a>
                        <a href="https://beian.miit.gov.cn/" target="_blank" v-if="copyright.icp">
                            <span class="mr-3">备案号:{{ copyright.icp }}</span>
                        </a>
                        <a :href="copyright.copyright_link" target="_blank">
                            <span class="mr-3" v-if="copyright.company_name">{{ copyright.company_name }}</span>
                            <span class="mr-3" v-if="copyright.copyright_desc">©{{ copyright.copyright_desc }}</span>
                        </a>
                    </div>
                </div>
            </div>
        </el-main>

        <div class="flex items-center justify-center mt-[20px] text-[#999] text-sm pb-8" v-if="copyright && loginType == 'admin'">
            <a :href="copyright.gov_url" v-if="copyright.gov_record" class="flex" target="_blank">
                <img src="@/app/assets/images/gov_icon.png" alt="" class="h-[20px] mr-1">
                <span class="mr-3">公安备案号:{{ copyright.gov_record }}</span>
            </a>
            <a href="https://beian.miit.gov.cn/" target="_blank" v-if="copyright.icp">
                <span class="mr-3">备案号:{{ copyright.icp }}</span>
            </a>
            <a :href="copyright.copyright_link" target="_blank">
                <span class="mr-3" v-if="copyright.company_name">{{ copyright.company_name }}</span>
                <span class="mr-3" v-if="copyright.copyright_desc">©{{ copyright.copyright_desc }}</span>
            </a>
        </div>

        <!-- 验证组件 -->
        <verify @success="success" :mode="pop" captchaType="blockPuzzle" :imgSize="{ width: '330px', height: '155px' }"
            ref="verifyRef"></verify>
        <!-- <el-footer></el-footer> -->
    </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@/lang'
import storage from '@/utils/storage'
import { getLoginConfig } from '@/app/api/auth'
import useUserStore from '@/stores/modules/user'
import { setWindowTitle, img, getAppType } from '@/utils/common'
import { getWebConfig, getWebCopyright } from '@/app/api/sys'

const loading = ref(false)
const imgLoading = ref(false)
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const copyright = ref(null)

getWebCopyright().then(({ data }) => {
    copyright.value = data
})

route.redirectedFrom && (route.query.redirect = route.redirectedFrom.path)

const webSite = ref([])
const setFormData = async (id: number = 0) => {
    webSite.value = await (await getWebConfig()).data
}
setFormData()

// 判断登录页面[平台或者站点]
const loginType = ref(getAppType())

if (loginType.value == 'site') {
    setWindowTitle(t('siteLogin'))
} else {
    setWindowTitle(t('adminLogin'))
}

// 验证码 - start
const verifyRef = ref(null)
const success = (params:any) => {
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
    }).catch(() => {
        loading.value = false
    })
}
</script>

<style lang="scss">
.login-wrap {
    background-image: url("@/app/assets/images/login/login_index_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
}

.login-site-main {
    padding: 0 !important;
}

.site-warp {
    background-image: url("@/app/assets/images/login/site_bg.png");
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.site-login-wrap {
    // background-image: url('@/app/assets/images/back_login.jpg');
    // background-repeat: no-repeat;
    // background-size: cover;
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

.admin_name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

@media only screen and (max-width: 750px) {
    .login-main-left {
        display: none;
    }
}
</style>
