<template>
    <el-container class="w-100 h-screen" :class="[{'sidebar-dark-mode':systemStore.sidebar == 'twoType'},{'sidebar-brightness-mode':systemStore.sidebar == 'oneType'}]">
        <el-header class="logo-wrap w-100">
            <div class="logo flex items-center m-auto max-w-[210px] h-[30px]" v-if="!systemStore.menuIsCollapse">
                <img class="max-h-full max-w-full" v-if="storage.get('siteInfo').logo" :src="img(siteInfo.logo)" alt="">
                <img class="max-h-full max-w-full" v-else src="@/assets/images/login_logo.png" alt="">
            </div>
            <div class="logo flex items-center justify-center w-[64px] h-[30px]" v-else>
                <i class="text-3xl iconfont iconyunkongjian"></i>
            </div>
        </el-header>

        <el-main class="menu-wrap">
            <el-scrollbar>
                <el-menu :default-active="menuActive" :router="true" class="aside-menu h-full" unique-opened="true"
                    :collapse="systemStore.menuIsCollapse">
                    <menu-item v-for="(route, index) in userStore.routers" :routes="route" :route-path="route.path"
                        :key="index" />
                </el-menu>
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

const logo = ref('assets/images/logo-square.png')
const systemStore = useSystemStore()
const userStore = useUserStore()
const route = useRoute()
const siteInfo = storage.get('siteInfo') || false

const menuActive = computed(() => String(route.name))
</script>

<style lang="scss" scoped>
.aside-menu:not(.el-menu--collapse) {
    width: var(--aside-width);
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
    flex: 1;
    height: 0;
    padding: 0;

    :deep(.el-menu) {
        border-right: 0 !important;
    }
}
::v-deep.sidebar-dark-mode{
    background-color: #191a23;
    & > .logo-wrap{
        .logo>i{
            font-size: 20px;
        }
        border-bottom: 2px solid #101117;
    }
    .el-menu{
        background-color: #191a23;
        ul.el-menu--inline{
            background-color: #101117;
        }
        .el-sub-menu__title, .el-menu-item{
            color: #B7B7ba;
            &:hover{
                background-color: transparent;
                color: #fff;
            }
        }
        .el-menu-item.is-active{
            color: #fff;
            background-color: var(--el-color-primary);
        }
    }
}
::v-deep.sidebar-brightness-mode{
    & > .logo-wrap{
        .logo>i{
            font-size: 20px;
        }
    }
}
</style>
