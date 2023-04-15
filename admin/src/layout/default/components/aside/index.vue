<template>
    <el-aside class="h-screen layout-aside w-auto">
        <side class="hidden-xs-only" />
    </el-aside>

    <el-drawer v-model="systemStore.menuDrawer" direction="ltr" :with-header="false" custom-class="aside-drawer"
        size="210px">
        <template #default>
            <side />
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import side from './side.vue'
import useSystemStore from '@/stores/modules/system'

const systemStore = useSystemStore()

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
}

.aside-drawer {
    .el-drawer__body {
        padding: 0px !important;
    }
}
</style>
