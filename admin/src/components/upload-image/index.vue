<template>
    <div class="flex flex-wrap">
        <template v-if="limit == 1">
            <div class="rounded cursor-pointer overflow-hidden relative border border-dashed border-color image-wrap mr-[10px]" :style="style">
                <div class="w-full h-full relative" v-if="images.data.length">
                    <div class="w-full h-full flex items-center justify-center">
                        <el-image :src="img(images.data[0])" fit="contain"></el-image>
                    </div>
                    <div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation">
                        <icon name="element-ZoomIn" color="#fff" size="18px" class="mr-[10px]" @click="previewImage()" />
                        <icon name="element-Delete" color="#fff" size="18px" @click="removeImage" />
                    </div>
                </div>
                <upload-attachment :limit="limit" @confirm="confirmSelect" v-else>
                    <div class="w-full h-full flex items-center justify-center flex-col">
                        <icon name="element-Plus" size="20px" color="var(--el-text-color-secondary)" />
                        <div class="leading-none text-xs mt-[10px] text-secondary">{{ imageText || t('upload.root') }}</div>
                    </div>
                </upload-attachment>
            </div>
        </template>
        <template v-else>
            <div class="rounded cursor-pointer overflow-hidden relative border border-dashed border-color image-wrap mr-[10px]" :style="style" v-for="(item, index) in images.data" :key="index">
                <div class="w-full h-full relative">
                    <div class="w-full h-full flex items-center justify-center">
                        <el-image :src="img(item)" fit="contain"></el-image>
                    </div>
                    <div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation">
                        <icon name="element-ZoomIn" color="#fff" size="18px" class="mr-[10px]" @click="previewImage(index)" />
                        <icon name="element-Delete" color="#fff" size="18px" @click="removeImage(index)" />
                    </div>
                </div>
            </div>
            <div class="rounded cursor-pointer overflow-hidden relative border border-dashed border-color" :style="style" v-if="images.data.length < limit">
                <upload-attachment :limit="limit" @confirm="confirmSelect">
                    <div class="w-full h-full flex items-center justify-center flex-col">
                        <icon name="element-Plus" size="20px" color="var(--el-text-color-secondary)" />
                        <div class="leading-none text-xs mt-[10px] text-secondary">{{ imageText || t('upload.root') }}</div>
                    </div>
                </upload-attachment>
            </div>
        </template>
    </div>

    <el-image-viewer :url-list="previewImageList" v-if="imageViewer.show" @close="imageViewer.show = false" :initial-index="imageViewer.index" :zoom-rate="1" />
</template>

<script lang="ts" setup>
import { computed, reactive, watch, toRaw } from 'vue'
import { img } from '@/utils/common'
import { t } from '@/lang'

const prop = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '100px'
    },
    height: {
        type: String,
        default: '100px'
    },
    imageText: {
        type: String
    },
    limit: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return prop.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const images: Record<string, any> = reactive({
    data: []
})

let previewImageList: string[] = reactive([])

const setValue = () => {
    value.value = toRaw(images.data).toString()
    previewImageList = toRaw(images.data).map((url: string) => { return img(url) })
}

watch(() => value.value, () => {
    images.data = [
        ...value.value.split(',').filter((item: string) => { return item })
    ]
    setValue()
}, { immediate: true })

const style = computed(() => {
    return {
        width: prop.width,
        height: prop.height
    }
})

/**
 * 选择图片
 */
const confirmSelect = (data: Record<string, any>) => {
    if (prop.limit == 1) {
        images.data.splice(0, 1)
        data && images.data.push(data.url)
    } else {
        data.forEach((item: any) => {
            if (images.data.length < prop.limit) images.data.push(item.url)
        })
    }
    setValue()
}

/**
 * 删除图片
 * @param index
 */
const removeImage = (index: number = 0) => {
    images.data.splice(index, 1)
    setValue()
}

/**
 * 查看图片
 */
const imageViewer = reactive({
    show: false,
    index: 0
})
const previewImage = (index: number = 0) => {
    imageViewer.show = true
    imageViewer.index = index
}
</script>

<style lang="scss" scoped>
.image-wrap {
    .operation {
        display: none;
    }

    &:hover {
        .operation {
            display: flex;
        }
    }
}
</style>
