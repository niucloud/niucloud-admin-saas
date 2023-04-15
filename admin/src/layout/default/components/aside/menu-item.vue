<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="routes.children" :index="String(routes.name)">
            <template #title>
                <icon v-if="meta.icon" :name="meta.icon" class="mr-[6px] w-auto" />
                <span>{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :route-path="resolvePath(route.path)"
                :key="index" />
        </el-sub-menu>
        <el-menu-item v-else :index="String(routes.name)" :route="routePath">
            <icon v-if="meta.icon" :name="meta.icon" class="mr-[6px] w-auto" />
            <template #title>
                <span>{{ meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import menuItem from './menu-item.vue'

const props = defineProps({
    routes: {
        type: Object,
        required: true
    },
    routePath: {
        type: String
    }
})

const meta = computed(() => props.routes.meta)

const resolvePath = (path: string) => {
    return `${props.routePath}/${path}`
}
</script>

<style lang="scss" scoped>
.w-auto {
    width: auto !important;
}
</style>
