<template>
    <el-container class="w-100" :class="[{ 'sidebar-dark-mode': systemStore.sidebar == 'twoType' }, { 'sidebar-brightness-mode': systemStore.sidebar == 'oneType' }]">
        <el-main class="menu-wrap">
            <el-scrollbar>
                <el-menu :default-active="menuActive" :router="true" class="aside-menu h-full" unique-opened="true" :collapse="systemStore.menuIsCollapse">
                    <menu-item v-for="(route, index) in userStore.routers[0].children" :routes="route" :route-path="'setting/'+ route.path" :key="index" />
                </el-menu>
                <div class="h-[48px]"></div>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import menuItem from './menu-item.vue'
import storage from '@/utils/storage'
import { img } from '@/utils/common'

const logo = ref('@/app/assets/images/login_logo.png')
const systemStore = useSystemStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const siteInfo = storage.get('siteInfo') || false

const menuActive = computed(() => String(route.name))

userStore.routers = userStore.routers.filter((item,index) =>{
    if(item.name == 'setting_manage'){
        // item.meta.class = 1
        if (item.children) {
            item.children.forEach((subItem, subIndex) => {
                subItem.meta.class = 1
                if (subItem.children) {
                    subItem.children.forEach((threeItem, threeIndex) => {
                        threeItem.meta.class = 2
                    })
                }
            })
        }
        return item.children;
    }
})

// userStore.routers.forEach((item, index) => {
//     item.meta.class = 1
//     if (item.children) {
//         item.children.forEach((subItem, subIndex) => {
//             subItem.meta.class = 2
//             if (subItem.children) {
//                 subItem.children.forEach((threeItem, threeIndex) => {
//                     threeItem.meta.class = 3
//                 })
//             }
//         })
//     }
// })
</script>

<style lang="scss">
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
    padding: 0 !important;

    .el-menu {
        border-right: 0 !important;
    }
}

.sidebar-dark-mode {
    background-color: #191a23;

    &>.logo-wrap {
        .logo>i {
            font-size: 20px;
        }

        border-bottom: 2px solid #101117;
    }

    .el-menu {
        background-color: #191a23;

        .el-sub-menu {
            background: transparent !important;
        }

        .el-sub-menu__title,
        .el-menu-item {
            background: transparent !important;
            color: #B7B7ba;

            &:hover {
                background-color: transparent !important;
                color: #fff !important;
            }
        }

        .el-menu-item.is-active {
            color: #fff !important;
            background-color: var(--el-color-primary) !important;
        }

        li::after {
            content: "";
            width: 0;
            height: 0;
        }
    }
}

.sidebar-brightness-mode {
    &>.logo-wrap {
        .logo>i {
            font-size: 20px;
        }
    }
}
</style>
