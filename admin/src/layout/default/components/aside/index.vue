<template>
    <el-aside :class="['h-screen layout-aside w-auto',{'bright': !dark}]">
        <side class="hidden-xs-only" />
    </el-aside>

    <el-drawer v-model="systemStore.menuDrawer" direction="ltr" :with-header="false" custom-class="aside-drawer" size="210px">
        <template #default>
            <side />
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { watch,computed } from 'vue'
import { useRoute } from 'vue-router'
import side from './side.vue'
import useSystemStore from '@/stores/modules/system'

const systemStore = useSystemStore()
const dark = computed(()=>{
    return systemStore.dark
})

const route = useRoute()
watch(route, () => {
    systemStore.$patch(state => {
        state.menuDrawer = false
    })
})
</script>

<style lang="scss">
.layout-aside {
    background-color: var(--side-dark-color, var(--el-bg-color));
    border-right: 1px solid var(--el-border-color-lighter);
    z-index: 101;
    &.bright{
        background-color: #F5F7F9;
        li{
            background-color: #F5F7F9;
            &.is-active:not(.is-opened){
                position: relative;
                color: #333;
                background-color: #fff;
                &::after{
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
}

.aside-drawer {
    .el-drawer__body {
        padding: 0px !important;
    }
}
</style>
