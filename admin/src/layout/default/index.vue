<template>
    <div class="common-layout">
        <el-container class="w-100 h-screen">
            <layout-aside></layout-aside>

            <el-container>
                <el-header>
                    <layout-header></layout-header>
                </el-header>

                <el-main class="main-wrap h-full bg-page p-0">
                    <el-scrollbar>
                        <div class="p-[16px]">
                            <router-view v-slot="{ Component, route }" v-if="appStore.routeRefrehTag">
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
import layoutHeader from './components/header/index.vue'
import layoutAside from './components/aside/index.vue'
import useAppStore from '@/stores/modules/app'
import useTabbarStore from '@/stores/modules/tabbar'

const appStore = useAppStore()
const tabbarStore = useTabbarStore()
</script>

<style lang="scss" scoped></style>
