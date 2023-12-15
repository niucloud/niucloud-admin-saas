<template>
    <el-menu
        :default-active="appStore.route"
        :ellipsis="false" :router="true"
        class="el-menu-vertical-demo w-[200px]"
    >
        <el-menu-item index="/member" route="/member" class="divide-y">
            <span>欢迎页</span>
        </el-menu-item>
        <el-menu-item index="/member/center" route="/member/center" class="divide-y">
            <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="/member/balance" route="/member/balance" class="divide-y">
            <span>我的余额</span>
        </el-menu-item>
        <el-menu-item index="/member/point" route="/member/point" class="divide-y">
            <span>我的积分</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import useAppStore from '@/stores/app'
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo{
    border: none !important;
    .el-menu-item{
        border-bottom: 1px solid #F1F1F1;
    }
}
</style>