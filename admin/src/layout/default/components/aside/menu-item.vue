<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="routes.children" :index="String(routes.name)">
            <template #title>
                <div v-if="meta.icon && routes.meta.class == 1" class="w-[16px] h-[16px] relative flex items-center">
                    <icon v-if="meta.icon" :name="meta.icon" class="absolute !w-auto" />
                </div>
                <span :class="['ml-[10px]', {'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}]">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :route-path="resolvePath(route.path)" :key="index" />
        </el-sub-menu>
        <el-menu-item v-else-if="routes.meta.class == 1" :index="String(routes.name)" :route="routePath">
            <div v-if="meta.icon" class="w-[16px] h-[16px] relative flex justify-center">
                <icon :name="meta.icon" class="absolute top-[50%] -translate-y-[50%]" />
            </div>
            <template #title>
                <span :class="['ml-[10px]', {'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}]">{{ meta.title }}</span>
            </template>
        </el-menu-item>
        <el-menu-item v-else :index="String(routes.name)" :route="routePath">
            <template #title>
                <span :class="[{'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}, {'ml-[10px]': routes.meta.class == 2, 'ml-[15px]': routes.meta.class == 3}]">{{ meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
import { CollectionTag } from '@element-plus/icons-vue'
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

<style lang="scss">
.el-sub-menu{
    .el-icon{
        width: auto;
    }
    li{
        font-size: 15px;
    }
}
.el-alert .el-alert__description{
    margin-top: 0;
}
</style>
