<template>
    <component :is="layout" />
</template>

<script lang="ts" setup>
import { ref, markRaw, defineAsyncComponent, provide } from 'vue'
import { getAppType } from '@/utils/common'
import useUserStore from '@/stores/modules/user'

const sysLayout = import.meta.glob('./*/index.vue')
const addonLayout = import.meta.glob('@/addon/**/layout/index.vue')
const modules = Object.assign(sysLayout, addonLayout)

let siteLayout = 'default'
switch (getAppType()) {
    case 'admin':
        siteLayout = 'admin'
        break
    case 'home':
        siteLayout = 'home'
        break
    default:
        const siteInfo = useUserStore().siteInfo
        if (siteInfo && siteInfo.apps && siteInfo.apps.length == 1) siteLayout = siteInfo.apps[0].key
}

const layout = ref<any>(null)

Object.keys(modules).forEach(key => {
    key.indexOf(siteLayout) !== -1 && (layout.value = markRaw(defineAsyncComponent(modules[key])))
})

!layout.value && (layout.value = markRaw(defineAsyncComponent(modules['./default/index.vue'])))

/**
 * 监听某些页面需要独立配置布局
 */
provide('setLayout', (name: any) => {
    if (siteLayout == name) return
    siteLayout = name
    Object.keys(modules).forEach(key => {
        key.indexOf(name) !== -1 && (layout.value = markRaw(defineAsyncComponent(modules[key])))
    })
})
</script>

<style lang="scss" scoped></style>
