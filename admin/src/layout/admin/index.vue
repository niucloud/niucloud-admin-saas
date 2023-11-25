<template>
    <div class="common-layout min-w-[1200px]" >
        <el-container class="w-100 h-screen">
            <el-header class="h-[60px]">
                <layout-header></layout-header>
            </el-header>
            <el-container class="flex flex-col">
                <div ref="layoutAsideRef">
                    <layout-aside @complete="heightChange"></layout-aside>
                </div>

                <el-main :class="['main-wrap h-full p-0',{'bg-page': dark}]">
                    <el-scrollbar class="layout-content-height" :class="{'px-[64px]': flag }" :style="{height: contentHeight}">
                        <router-view v-slot="{ Component, route }" v-if="appStore.routeRefreshTag">
                            <keep-alive :include="tabbarStore.tabNames">
                                <component :is="Component" :key="route.fullPath" />
                            </keep-alive>
                        </router-view>
                    </el-scrollbar>
                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted} from 'vue'
import layoutHeader from './components/header/index.vue'
import layoutAside from './components/aside/index.vue'
import useAppStore from '@/stores/modules/app'
import useTabbarStore from '@/stores/modules/tabbar'
import useSystemStore from '@/stores/modules/system'
import useStyleStore from '@/stores/modules/style'
import { CollectionTag } from '@element-plus/icons-vue'

const appStore = useAppStore()
const tabbarStore = useTabbarStore()
const systemStore = useSystemStore()
const layoutAsideRef = ref()
const styleStore = useStyleStore()

// 控制页面内容高度start
let contentHeight= ref("")
const heightChange = ()=>{
    setTimeout(() => {
        contentHeight.value = `calc(100vh - ${layoutAsideRef.value.clientHeight + 60}px)`
    }, 600);
}
heightChange();
// 控制页面内容高度end

const dark = computed(()=>{
    return systemStore.dark
})

const flag = computed(()=>{
    return styleStore.flag
})
</script>

<style lang="scss" scoped>
.layout-content-height{
    height: calc(100vh - 130px);
}
</style>
