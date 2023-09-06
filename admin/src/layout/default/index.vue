<template>
    <div class="common-layout min-w-[1200px]" >
        <el-container class="w-100 h-screen">
            <layout-aside></layout-aside>

            <el-container>
                <el-header>
                    <layout-header></layout-header>
                </el-header>

                <el-main :class="['main-wrap h-full p-0',{'bg-page': dark}]">
                    <el-scrollbar>
                        <div class="p-[10px]">
                            <router-view v-slot="{ Component, route }" v-if="appStore.routeRefreshTag">
                                <keep-alive :include="tabbarStore.tabNames">
                                    <component :is="Component" :key="route.fullPath" />
                                </keep-alive>
                            </router-view>
                        </div>
                    </el-scrollbar>
                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import layoutHeader from './components/header/index.vue'
import layoutAside from './components/aside/index.vue'
import useAppStore from '@/stores/modules/app'
import useTabbarStore from '@/stores/modules/tabbar'
import useSystemStore from '@/stores/modules/system'

const appStore = useAppStore()
const tabbarStore = useTabbarStore()
const systemStore = useSystemStore()
const dark = computed(()=>{
    return systemStore.dark
})
</script>

<style lang="scss" scoped></style>
