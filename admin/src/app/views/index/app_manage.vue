<template>
    <div class="box-border pt-[68px] px-[76px] overview-top" v-loading="loading">
        <div v-if="detail.appList && !loading">
            <div class="flex justify-between items-center">
                <div>
                    <div class="font-[600] text-[26px] text-[#222] leading-[37px]">{{ t('app') }}</div>
                    <div class="font-[500] text-[14px] text-[#222] leading-[20px] mt-[12px]">{{ t('versionInfo') }}&nbsp;{{
                        t('currentVersion') }}</div>
                </div>
                <el-button @click="toAppStore" class="px-[15px]">
                    <div class="mr-[9px] text-[#3F3F3F] iconfont iconxiazai01"></div>
                    <span class="font-[600] text-[14px] text-[#222] leading-[20px]">{{ t('appStore') }}</span>
                </el-button>
            </div>
            <div class="flex flex-wrap mt-[40px]">
                <template v-for="(item, index) in detail.appList" :key="index">
                    <div class="app-item w-[280px] box-border !bg-[#fff] rounded-[6px] cursor-pointer mr-[20px] mb-[20px] overflow-hidden" @click="itemPath(item)">
                        <div class="bg-[#F7FAFB] py-[18px] px-[24px] flex items-center app-item-head">
                            <el-image class="w-[44px] h-[44px]  rounded-[8px]" :src="img(item.icon)" fit="contain">
                                <template #error>
                                    <div class="image-slot">
                                        <img class="w-[40px] h-[40px] rounded-[8px]"
                                            src="@/app/assets/images/app_store/app_store_default.png" />
                                    </div>
                                </template>
                            </el-image>
                        </div>
                        <div class="py-[18px] px-[24px]">
                            <div class="font-[600] leading-[1] text-[14px] text-[#222]">{{ item.title }}</div>
                            <el-tooltip class="box-item" effect="light" :content="item.desc" placement="bottom-start">
                                <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[6px] truncate">
                                    {{ item.desc }}
                                </div>
                            </el-tooltip>
                        </div>
                    </div>
                </template>
                <el-empty class="mx-auto overview-empty" v-if="!detail.appList.length && !loading">
                    <template #image>
                        <div class="w-[230px] mx-auto">
                            <img src="@/app/assets/images/index/apply_empty.png" class="max-w-full" alt="">
                        </div>
                    </template>
                    <template #description>
                        <p class="flex items-center">
                            <span>{{ t('descriptionLeft') }}</span>
                            <el-link type="primary" @click="toAppStore" class="mx-[5px]">{{ t('link') }}</el-link>
                            <span>{{ t('descriptionRight') }}</span>
                        </p>
                    </template>
                </el-empty>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { t } from '@/lang'
import { getInstalledAddonList } from '@/app/api/addon'
import { img } from '@/utils/common'
import { useRouter } from 'vue-router'
import storage from '@/utils/storage'
import { findFirstValidRoute } from '@/router/routers'
import { UserFilled } from '@element-plus/icons-vue'
import useUserStore from '@/stores/modules/user'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(true)
const detail = reactive({
    appList: []
})
const appLink: any = ref({})

const getAuthaddonFn = () => {
    loading.value = true
    getInstalledAddonList().then(res => {
        Object.values(res.data).forEach((item: any, index) => {
            if (item.type == 'app') {
                detail.appList.push(item)
            }
        })
        userStore.routers.forEach((item, index) => {
            if (item.children && item.children.length) {
                item.name = findFirstValidRoute(item.children)
                appLink.value[item.meta.app] = findFirstValidRoute(item.children)
            } else {
                appLink.value[item.meta.app] = item.name
            }
        })
        loading.value = false
    }).catch(() => {
        loading.value = false

    })
}

getAuthaddonFn()

const itemPath = (data: any) => {
    storage.set({ key: 'menuAppStorage', data: data.key })
    storage.set({ key: 'plugMenuTypeStorage', data: '' })
    const appMenuList = userStore.appMenuList
    appMenuList.push(data.key)
    userStore.setAppMenuList(appMenuList)
    let name: any = appLink.value[data.key]
    router.push({ name: name })
}

const goAppManage = () => {
    router.push('/app_manage')
}

const goRouter = () => {
    window.open('https://www.niucloud.com/app')
}

// 跳转至开发者
const toAppStore = () => {
    router.push('/app_manage/app_store')
}

const goNiucloud = () => {
    window.open('https://www.niucloud.com')
}

const logout = () => {
    userStore.logout();
}
</script>

<style lang="scss" scoped>
.main-container {
    background: linear-gradient(180deg, rgba(253, 253, 253, 0.24) 0%, #FAFAFA 100%);
    min-height: calc(100vh - 64px);
}

.overview-top {
    background-image: url('@/app/assets/images/index/overview.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: calc(100vh - 120px);
}

.app-item {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.18);
}
.app-item:hover .app-item-head{
    background-color: #FDF4EF;
}

</style>
<style>
.overview-empty .el-empty__image {
    width: auto !important;
}
</style>
