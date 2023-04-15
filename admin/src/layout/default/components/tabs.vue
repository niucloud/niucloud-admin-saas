<template>
    <div class="tab-wrap w-full px-[16px]">
        <el-tabs :closable="tabbarStore.tabLength > 1" :model-value="route.path" @tab-click="tabClick"
            @tab-remove="removeTab">
            <el-tab-pane v-for="(tab, key, index) in tabbarStore.tabs" :name="tab.path" :key="index">
                <template #label>
                    <el-dropdown trigger="contextmenu" placement="bottom-start">
                        <span :class="{ 'text-primary': route.path == tab.path }" class="tab-name">{{ tab.title }}</span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item icon="Back" :disabled="index == 0" @click="closeLeft(tab.path)">{{
                                    t('tabs.closeLeft')
                                }}</el-dropdown-item>
                                <el-dropdown-item icon="Right" :disabled="index == (tabbarStore.tabLength - 1)"
                                    @click="closeRight(tab.path)">{{
                                        t('tabs.closeRight') }}</el-dropdown-item>
                                <el-dropdown-item icon="Close" :disabled="tabbarStore.tabLength == 1"
                                    @click="closeOther(tab.path)">{{
                                        t('tabs.closeOther') }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import { watch, onMounted } from 'vue'
import useTabbarStore from '@/stores/modules/tabbar'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@/lang'

const tabbarStore = useTabbarStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
    tabbarStore.addTab(route)
})

watch(route, (nval: any) => {
    tabbarStore.addTab(nval)
})

/**
 * 添加tab
 * @param content
 */
const tabClick = (content: any) => {
    const tabRoute = tabbarStore.tabs[content.props.name]
    router.push({ path: tabRoute.path, query: tabRoute.query })
}

/**
 * 移除tab
 * @param content
 */
const removeTab = (content: any) => {
    if (route.path == content) {
        const tabs = Object.keys(tabbarStore.tabs)
        router.push({ path: tabs[tabs.indexOf(content) - 1] })
    }
    tabbarStore.removeTab(content)
}

/**
 * 关闭左侧
 * @param path
 */
const closeLeft = (path: string) => {
    const tabs = Object.keys(tabbarStore.tabs)
    for (let i = tabs.indexOf(path) - 1; i >= 0; i--) {
        delete tabbarStore.tabs[tabs[i]]
    }
    router.push({ path })
}

/**
 * 关闭右侧
 * @param path
 */
const closeRight = (path: string) => {
    const tabs = Object.keys(tabbarStore.tabs)
    for (let i = tabs.indexOf(path) + 1; i < tabs.length; i++) {
        delete tabbarStore.tabs[tabs[i]]
    }
    router.push({ path })
}

/**
 * 关闭其他
 * @param path
 */
const closeOther = (path: string) => {
    const tabs = Object.keys(tabbarStore.tabs)
    tabs.forEach((key: string) => { key != path && delete tabbarStore.tabs[key] })
    router.push({ path })
}
</script>

<style lang="scss" scoped>
:deep(.el-tabs) {
    .el-tabs--border-card {
        border: none;
    }

    .el-tabs__header {
        margin: 0;
    }

    .el-tabs__nav-wrap {
        margin-bottom: 0;

        &::after {
            display: none;
        }
    }

    .el-tabs__content {
        display: none;
    }

    .el-tabs__item {
        display: inline-flex !important;
        padding: 0 20px !important;
        align-items: center;

        .tab-name:focus {
            outline: none !important;
        }
    }

    .el-tabs__active-bar {
        display: none;
    }

    .el-tabs__item.is-active {
        background-color: var(--el-color-primary-light-9);
    }
}
</style>
