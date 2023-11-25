<template>
    <el-dropdown @command="switchLang" :tabindex="1">
        <icon name="iconfont-iconfanyi" />
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="zh-cn" :disabled="systemStore.lang == 'zh-cn'">简体中文</el-dropdown-item>
                <el-dropdown-item command="en" :disabled="systemStore.lang == 'en'">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import useSystemStore from '@/stores/modules/system'
import { language } from '@/lang'
import { useRoute } from 'vue-router'
import storage from '@/utils/storage'

const route = useRoute()
const systemStore = useSystemStore()

const switchLang = (command: string) => {
    systemStore.$patch((state) => {
        state.lang = command
        storage.set({ key: 'lang', data: command })
    })
    language.loadLocaleMessages(route.path, systemStore.lang)
    location.reload()
}
</script>

<style lang="scss" scoped></style>
