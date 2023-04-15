<template>
    <el-dropdown @command="clickEvent" :tabindex="1">
        <div class="userinfo flex h-full items-center">
            <el-avatar :size="25" :icon="UserFilled" />
            <div class="user-name pl-[8px]">{{ userStore.userInfo.username }}</div>
            <icon name="element-ArrowDown" class="ml-[5px]" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="usercenter"><router-link to="/user/center">个人中心</router-link></el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()

const clickEvent = (command: string) => {
    switch (command) {
        case 'logout':
            userStore.logout()
            break
    }
}
</script>

<style lang="scss" scoped></style>
