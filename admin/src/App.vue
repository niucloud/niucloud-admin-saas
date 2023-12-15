<template>
    <el-config-provider :locale="locale">
        <router-view></router-view>
    </el-config-provider>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import useSystemStore from '@/stores/modules/system'
import useAppStore from '@/stores/modules/app'
import { useDark, useToggle } from '@vueuse/core'
import { setThemeColor } from '@/utils/common'
import { useRoute } from 'vue-router'

const route = useRoute()

// 初始化设置语言
const systemStore = useSystemStore()
const locale = computed(() => (systemStore.lang === 'zh-cn' ? zhCn : en))

const toggleDark = useToggle(useDark())

watch(route, () => {
    useAppStore().$patch(state => {
        state.route = route
    })
}, { immediate: true })

onMounted(() => {
    // 设置主题色
    toggleDark(systemStore.dark)
    setThemeColor(systemStore.theme, systemStore.dark ? 'dark' : 'light')
})
</script>

<style lang="scss" scoped></style>
