<template>
    <div class="common-layout min-w-[1200px]" >
        <el-container class="w-100 h-screen">
            <layout-aside></layout-aside>

            <el-container>
                <el-header class="h-[60px]">
                    <layout-header></layout-header>
                </el-header>

                <el-main class="main-wrap h-full p-0">
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

const appStore = useAppStore()
const tabbarStore = useTabbarStore()

</script>

<style lang="scss" scoped></style>
