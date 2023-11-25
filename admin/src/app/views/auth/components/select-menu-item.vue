<template>
    <template v-if="prop.menu.menu_type != 2">
        <el-option :label="`${prop.menu.menu_name}`" :value="prop.menu.menu_key">
            <span v-html="`${menuLevel}${prop.menu.menu_name}`"></span>
        </el-option>
        <template v-if="prop.menu.children">
            <select-menu-item :menu="item" v-for="item in prop.menu.children" :level="prop.level + 1" />
        </template>
    </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const prop = defineProps({
    menu: Object,
    level: {
        type: Number,
        default: 0
    }
})

const menuLevel = computed(() => {
    let t = ''
    for (let i = 0; i < prop.level; i++) {
        t += i == 0 ? '&emsp;|--' : '--'
    }
    return t
})
</script>

<style lang="scss" scoped>

</style>