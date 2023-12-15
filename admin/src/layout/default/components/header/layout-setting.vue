<template>
    <div class="flex">
        <icon name="element-Setting" @click="drawer = true" />

        <el-drawer v-model="drawer" :title="t('layout.layoutSetting')" size="300px">
            <el-scrollbar>
                <!-- 黑暗模式 -->
                <div class="setting-item flex items-center justify-between mb-[10px]">
                    <div class="title text-base text-tx-secondary">{{ t('layout.darkMode') }}</div>
                    <div class="">
                        <el-switch v-model="dark" :active-value="true" :inactive-value="false" />
                    </div>
                </div>
                <!-- 主题颜色 -->
                <div class="setting-item flex items-center justify-between mb-[10px]">
                    <div class="title text-base text-tx-secondary">{{ t('layout.themeColor') }}</div>
                    <div class="">
                        <el-color-picker v-model="theme" />
                    </div>
                </div>
            </el-scrollbar>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import useSystemStore from '@/stores/modules/system'
import { useDark, useToggle } from '@vueuse/core'
import { setThemeColor, img } from '@/utils/common'
import { t } from '@/lang'

const drawer = ref(false)
const systemStore = useSystemStore()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const dark = computed({
    get() {
        return systemStore.dark
    },
    set(val) {
        systemStore.setTheme('dark', val)
        toggleDark(val)
        setThemeColor(systemStore.theme, systemStore.dark ? 'dark' : 'light')
    }
})

const theme = computed({
    get() {
        return systemStore.theme
    },
    set(val) {
        systemStore.setTheme('theme', val)
        setThemeColor(systemStore.theme, systemStore.dark ? 'dark' : 'light')
    }
})

</script>

<style lang="scss" scoped>
:deep(.el-drawer__header) {
    margin-bottom: 0 !important;
}

.layout-style {
    &>div:nth-child(2n+2) {
        margin-right: 0;
    }
}
</style>
