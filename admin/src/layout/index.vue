<template>
    <component :is="layout" />
</template>

<script lang="ts" setup>
import { ref, markRaw, defineAsyncComponent } from 'vue'
import Storage from '@/utils/storage'

const modules = import.meta.glob('./*/index.vue')
const siteLayout = Storage.get('layout') || 'default'
const layout = ref<any>(null)

Object.keys(modules).forEach(key => {
    key.indexOf(siteLayout) !== -1 && (layout.value = markRaw(defineAsyncComponent(modules[key])))
})
</script>

<style lang="scss" scoped></style>
