<template>
    <el-container class="w-100 h-screen">
        <el-header class="logo-wrap w-100 border-0 border-b-[1px] border-solid border-[e5e7eb]">
            <div class="logo flex items-center m-auto max-w-[210px] h-[30px]" v-if="!systemStore.menuIsCollapse">
                <img class="max-h-[40px] max-w-[40px] rounded-full" v-if="siteInfo.logo" :src="img(siteInfo.logo)" alt="">
                <img class="max-h-[40px] max-w-[40px] rounded-full" v-else src="@/app/assets/images/icon-addon.png" alt="">
                <span class="ml-[8px] text-[16px]">{{siteInfo.site_name}}</span>
            </div>
            <div class="logo flex items-center justify-center w-[64px] h-[30px]" v-else>
                <i class="text-3xl iconfont iconyunkongjian"></i>
            </div>
        </el-header>

        <el-main class="menu-wrap">
            <el-scrollbar>
                <el-menu :default-active="menuActive" :router="true" class="aside-menu h-full" unique-opened="true" :collapse="systemStore.menuIsCollapse">
                    <menu-item v-for="(route, index) in userStore.routers" :routes="route" :route-path="route.path" :key="index" />
                </el-menu>
                <div class="h-[48px]"></div>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import menuItem from './menu-item.vue'
import storage from '@/utils/storage'
import { img } from '@/utils/common'

const logo = ref('@/app/assets/images/login_logo.png')
const systemStore = useSystemStore()
const userStore = useUserStore()
const route = useRoute()
const siteInfo = userStore.siteInfo
const menuActive = computed(() => String(route.name))

let currAppData = ref([]);
userStore.routers.forEach((item, index) => {
    if(item.name != siteInfo.app){
        item.meta.class = 1
        if (item.children) {
            item.children.forEach((subItem, subIndex) => {
                subItem.meta.class = 2
                if (subItem.children) {
                    subItem.children.forEach((threeItem, threeIndex) => {
                        threeItem.meta.class = 3
                    })
                }
            })
        }
    }else{
        if (item.children) {
            item.children.forEach((subItem, subIndex) => {
                subItem.meta.class = 1
                subItem.path = item.path + '/' + subItem.path;
                if (subItem.children) {
                    subItem.children.forEach((threeItem, threeIndex) => {
                        threeItem.meta.class = 2
                    })
                }
            })
        }
        currAppData.value = userStore.routers.splice(index,1);
    }
})

if (currAppData.value[0] && currAppData.value[0].children) {
    currAppData.value[0].children.reverse();
    currAppData.value[0].children.forEach((item,index) => {
        if( index == 0 ){
            item.is_border = true;
        }
        userStore.routers.unshift(item);
    });
}
</script>

<style lang="scss">
.aside-menu:not(.el-menu--collapse) {
    width: var(--aside-width);
    .el-menu-item{
        height: 40px;
        margin-bottom: 4px;
    }
    .el-sub-menu{
        .el-sub-menu__title{
            height: 40px;
            margin-bottom: 4px;
        }
    }
}
.logo-wrap {
    padding: 0;
    display: flex;
    white-space: nowrap;
    align-items: center;

    .logo {
        height: 100%;
        box-sizing: border-box;
    }

    .logo-title {
        flex: 1;
        width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: var(--el-font-size-base);
    }
}
.menu-wrap {
    flex: 1 !important;
    height: 0 !important;
    padding: 0 !important;

    .el-menu {
        border-right: 0 !important;
    }
}
</style>
