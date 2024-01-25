<template>
    <el-container class="w-screen h-screen">
        <el-header class="shadow z-1">
            <layout-header />
        </el-header>
        <el-main class="p-0 min-w-[1200px]">
            <slot></slot>
            <layout-footer />
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import layoutHeader from './default/components/header/index.vue'
import layoutFooter from './default/components/footer/index.vue'
</script>

<style lang="scss" scoped>
.el-header {
    --el-header-padding: 0;
}

.el-main {
    --el-main-padding: 0;
}
</style>
