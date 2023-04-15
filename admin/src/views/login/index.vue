<template>
    <el-container class="w-full h-screen bg-page">
        <el-main class="login-main items-center justify-evenly">
            <div class="login-main-left w-[520px] flex flex-wrap justify-center">
                <h1 class="text-primary text-4xl font-bold mr-auto">{{t("siteTitle")}}</h1>
                <p class="leading-6 text-gray-500 text-base mt-3">{{t("siteDesc")}}</p>
                <img src="@/assets/images/login_bg.png" alt="">
            </div>
            <div class="login flex flex-col w-[440px] p-[40px] rounded-md">
                <h3 class="text-center text-3xl mb-[30px]">{{t('platform')}}</h3>

                <el-form :model="form" ref="formRef" :rules="formRules">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" :placeholder="t('userPlaceholder')"
                            @keyup.enter="handleLogin(formRef)" class="h-[40px]">
                            <template #prepend>
                                <icon name="element-User" />
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input v-model="form.password" :placeholder="t('passwordPlaceholder')" type="password"
                            @keyup.enter="handleLogin(formRef)" :show-password="true" class="h-[40px]">
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
        </el-main>
        <el-footer></el-footer>
    </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@/lang'
import { img } from '@/utils/common'
import useUserStore from '@/stores/modules/user'
import { setWindowTitle } from '@/utils/common'

const loading = ref(false)
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const form = reactive({
    username: '',
    password: ''
})

setWindowTitle(t('login'))

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
            loading.value = true

            userStore.login({ username: form.username, password: form.password }).then(res => {
                const { query: { redirect } } = route
                const path = typeof redirect === 'string' ? redirect : '/'
                router.push(path)
            }).catch(err => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped>
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
