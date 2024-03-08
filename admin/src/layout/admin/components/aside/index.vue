<template>
    <el-aside :class="['layout-aside w-full ease-in duration-200', { 'bright': !dark }]">

        <div class="flex flex-wrap items-center pt-[20px] pb-[10px] pl-[80px] pr-[70px]"
             v-if="twoMenuData.length">
            <template v-for="(item,index) in twoMenuData" :key="index">
                <div
                    v-if="item.meta.show"
                    @click="redirect(item)"
                    :class="['flex items-center h-[32px] border-[1px] border-solid my-[3px] border-[#E0E0E0] rounded-full px-[10px] mr-[24px] cursor-pointer bg-[#f8f8f8] hover:bg-[#fff]',{'text-[#fff] !bg-[#000] border-[#000]': menuActive == item.name || menuTwoActive && menuTwoActive == item.name}]">
                    <icon v-if="item.meta.icon" :name="item.meta.icon" class="!w-auto mr-[4px] !leading-[14px]" size="14px"
                          :title="item.meta.title" />
                    <span class="text-[14px]">{{ item.meta.short_title || item.meta.title }}</span>
                </div>
            </template>
        </div>
        <!-- 三级菜单 -->
        <div class="pt-[20px] pl-[80px] pr-[70px]" v-if="threeMenuData.length">
            <el-tabs v-model="menuTwoActive" @tab-click="toolsHandleClick">
                <template v-for="(item,index) in threeMenuData" :key="index">
                    <el-tab-pane :label="item.meta.title" :name="item.name" :path="item.path" v-if="item.meta.show"
                                 @click="settingMenuFn(item)"></el-tab-pane>
                </template>
            </el-tabs>
        </div>
    </el-aside>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useSystemStore from '@/stores/modules/system'

const route = useRoute()
const systemStore = useSystemStore()
const router = useRouter()
const dark = computed(() => {
    return systemStore.dark
})

const twoMenuData = ref<Record<string, any>[]>([])
const threeMenuData = ref<Record<string, any>[]>([])
const menuActive = ref('')
const menuTwoActive = ref('')

watch(route, () => {
    twoMenuData.value = route.matched[1].children ?? []
    threeMenuData.value = route.matched[2].children ?? []
    menuActive.value = route.matched[2] ? route.matched[2].name : ''
    menuTwoActive.value = route.matched[3] ? route.matched[3].name : ''
}, { immediate: true })

/**
 * 跳转
 * @param data
 */
const redirect = (data: any) => {
    if (data.children) {
        router.push(data.children[0].path)
    } else {
        router.push(data.path)
    }
}

const toolsHandleClick = (tab, event: Event) => {
    router.push({name: tab.props.name})
}
</script>

<style lang="scss">
.layout-aside {
    &.bright {
        li {
            background-color: #F5F7F9;

            &.is-active:not(.is-opened) {
                position: relative;
                color: #333;
                background-color: #fff;

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: 2px;
                    background-color: var(--el-menu-active-color);
                }
            }
        }
    }

    .menu-item:hover{
        color: var(--el-color-primary);
    }
}
.text-color{
    color: var(--el-color-primary);
}
</style>
