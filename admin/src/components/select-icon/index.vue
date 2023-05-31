<template>
    <el-popover trigger="click" v-model:visible="visible">
        <template #reference>
            <slot name="reference"></slot>
        </template>
        <div class="flex w-full flex-col">
            <div class="head flex w-full mb-[10px]">
                <span>请选择图标</span>
                <div class="flex justify-end flex-auto">
                    <span class="ml-[10px] cursor-pointer" :class="{ active: type == 'element' }"
                        @click="type = 'element'">element</span>
                    <span class="ml-[10px] cursor-pointer" :class="{ active: type == 'iconfont' }"
                        @click="type = 'iconfont'">iconfont</span>
                </div>
            </div>
            <div class="icon-wrap h-[240px]">
                <el-scrollbar>
                    <div class="flex flex-wrap" v-show="type == 'element'">
                        <el-button v-for="icon in element" class="w-[35px] h-[35px] icon-item"
                            @click="selectIcon('element-' + icon)">
                            <icon :name="'element-' + icon" />
                        </el-button>
                    </div>
                    <div class="flex flex-wrap" v-show="type == 'iconfont'">
                        <el-button v-for="icon in iconfont" class="w-[35px] h-[35px] icon-item"
                            @click="selectIcon('iconfont-' + icon)">
                            <icon :name="'iconfont-' + icon" />
                        </el-button>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </el-popover>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const type = ref('element')
const visible = ref('false')

// element 图标
const element = computed(() => {
    return Object.keys(ElementPlusIconsVue)
})

// iconfont 图标
const iconfont = computed(() => {
    const iconfile = import.meta.globEager('@/styles/iconfont.css')['/src/styles/iconfont.css'].default
    const icons = Array.from(iconfile.matchAll(/(icon.*)\:before/g))

    return icons.map(item => {
        return item[1]
    })
})

const emit = defineEmits(['select'])

// 选择图标
const selectIcon = (name) => {
    emit('select', name)
    visible.value = false
}
</script>

<style lang="scss" scoped>
.icon-item {
    margin: 6px 6px 6px 0;
}

.active {
    color: var(--el-color-primary);
}
</style>
