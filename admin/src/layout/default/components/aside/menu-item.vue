<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="routes.children" :index="String(routes.name)">
            <template #title>
                <div v-if="meta.icon" class="w-[16px] h-[16px] relative flex items-center">
                    <icon v-if="meta.icon" :name="meta.icon" class="absolute !w-auto" />
                </div>
                <span :class="['ml-[10px]']">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :key="index" />
        </el-sub-menu>
        <template v-else>
            <el-menu-item :index="String(routes.name)" @click="router.push({ name: routes.name })" v-if="meta.addon && meta.parent_route && meta.parent_route.addon == ''">
                <div class="w-[16px] h-[16px] relative flex justify-center">
                    <el-image class="w-[16px] h-[16px] rounded-[50%] overflow-hidden" :src="img(addons[meta.addon].icon)" fit="fill"/>
                </div>
                <template #title>
                    <el-tooltip placement="right" effect="light">
                        <template #content>
                            该功能仅限{{ addons[meta.addon].title }}使用
                        </template>
                        <span :class="[{'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}, {'ml-[10px]': routes.meta.class == 2, 'ml-[15px]': routes.meta.class == 3}]">{{ meta.title }}</span>
                    </el-tooltip>
                </template>
            </el-menu-item>
            <el-menu-item :index="String(routes.name)" @click="router.push({ name: routes.name })" v-else>
                <div class="w-[16px] h-[16px] relative flex justify-center">
                    <icon :name="meta.icon" class="absolute top-[50%] -translate-y-[50%]" v-if="meta.icon"/>
                </div>
                <template #title>
                    <span :class="[{'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}, {'ml-[10px]': routes.meta.class == 2, 'ml-[15px]': routes.meta.class == 3}]">{{ meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <div v-if="routes.is_border" class="!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"></div>
    </template>

</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { img } from '@/utils/common'
import menuItem from './menu-item.vue'
import useUserStore from '@/stores/modules/user'

const router = useRouter()
const props = defineProps({
    routes: {
        type: Object,
        required: true
    }
})
const userStore = useUserStore()
const siteInfo = userStore.siteInfo
const meta = computed(() => props.routes.meta)

const addons = computed(() => {
    const addons:Record<string, any> = {}
    siteInfo?.apps.forEach((item: any) => { addons[item.key] = item })
    siteInfo?.site_addons.forEach((item: any) => { addons[item.key] = item })
    return addons
})

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
</style>
