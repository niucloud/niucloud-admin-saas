<template>
    <el-container class="w-screen h-screen">
        <el-header>
            <layout-header />
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <div class="w-full h-full bg-[#f7f7f7] flex items-center justify-center">
                Footer
            </div>
        </el-footer>
    </el-container>
</template>

<script lang="ts" setup>
import layoutHeader from '@/layout/default/components/header/index.vue'
</script>

<style lang="scss" scoped></style>
