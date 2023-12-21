<template>
    <el-aside class="h-screen group layout-aside w-[80px] bg-[#F7F8FA] w-[230px] ease-in duration-200">
        <!-- <side class="hidden-xs-only" /> -->
        <div class="">
            <el-header class="logo-wrap w-100 h-auto mb-[30px]">
                <div class="logo flex items-center m-auto max-w-[230px] h-[60px] justify-center"
                    v-if="!systemStore.menuIsCollapse">
                    <img class="max-h-full max-w-full" v-if="siteInfo.logo" :src="img(siteInfo.logo)" alt="">
                    <img class="max-h-full max-w-full" v-else src="@/app/assets/images/login_logo.png" alt="">
                </div>
                <div class="logo flex items-center justify-center w-[64px] h-[30px]" v-else>
                    <i class="text-3xl iconfont iconyunkongjian"></i>
                </div>
            </el-header>

            <el-scrollbar max-height="calc(100vh - 90px)">
                <!-- v-for="(item, index) in userStore.routers" :key="index"item.name.toString() {{ item.meta.title }} -->
                <div  @click="toLink('/index')"
                    :class="['flex items-center py-[10px] px-[30px] mb-[8px] cursor-pointer text-[#989898] menu-item whitespace-nowrap', { 'bg-color text-color':  'Symbol(homeIndex)'== menuActive }]">
                    <icon :name="'element-Memo'" class=" !w-auto" size="24px" />
                    <span :class="['ml-[15px] text-[14px] ease-in duration-200']">站点列表</span>
                </div>
            </el-scrollbar>

        </div>
    </el-aside>

    <!-- <el-drawer v-model="systemStore.menuDrawer" direction="ltr" :with-header="false" custom-class="aside-drawer" size="210px">
        <template #default>
            <side />
        </template>
    </el-drawer> -->
</template>

<script lang="ts" setup>
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import side from './side.vue'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import storage from '@/utils/storage'

const userStore = useUserStore()
const systemStore = useSystemStore()
const siteInfo = userStore.siteInfo
const route = useRoute()
const router = useRouter()
const menuActive = computed(() => {
    return String(route.name)
})

watch(route, () => {
    systemStore.$patch(state => {
        state.menuDrawer = false
    })
})
// 跳转链接
const toLink = (path) => {
    router.push({ path })
}
</script>

<style lang="scss" scoped>
.menu-item:hover{
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
}
.text-color {
    color: var(--el-color-primary);
}

.bg-color {
    border-color: var(--el-color-primary);
}
</style>
