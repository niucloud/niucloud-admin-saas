<template>
	<div class="flex flex-wrap">
		<template v-if="limit == 1">
			<div class="rounded cursor-pointer overflow-hidden relative border border-dashed border-color icon-wrap mr-[10px]" :style="style">
				<div class="w-full h-full relative" v-if="icons.data.length">
					<div class="w-full h-full flex items-center justify-center">
						<icon :name="icons.data[0]" size="40px"></icon>
					</div>
					<div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation">
						<icon name="element-Delete" color="#fff" size="18px" @click="removeIcon"/>
					</div>
				</div>
				<upload-attachment :limit="limit" type="icon" @confirm="confirmSelect" v-else>
					<div class="w-full h-full flex items-center justify-center flex-col">
						<icon name="element-Plus" size="20px" color="var(--el-text-color-secondary)"/>
						<div class="leading-none text-xs mt-[10px] text-secondary">{{ iconText || t('upload.selecticon') }}</div>
					</div>
				</upload-attachment>
			</div>
		</template>
		<template v-else>
			<div class="rounded cursor-pointer overflow-hidden relative border border-dashed border-color icon-wrap mr-[10px]" :style="style" v-for="(item, index) in icons.data" :key="index">
				<div class="w-full h-full relative">
					<div class="w-full h-full flex items-center justify-center">
						<icon :name="item" size="40px"></icon>
					</div>
					<div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation">
						<icon name="element-Delete" color="#fff" size="18px" @click="removeIcon(index)"/>
					</div>
				</div>
			</div>
			<div class="rounded cursor-pointer overflow-hidden relative border border-dashed border-color" :style="style" v-if="icons.data.length < limit">
				<upload-attachment :limit="limit" @confirm="confirmSelect">
					<div class="w-full h-full flex items-center justify-center flex-col">
						<icon name="element-Plus" size="20px" color="var(--el-text-color-secondary)"/>
						<div class="leading-none text-xs mt-[10px] text-secondary">{{ iconText || t('upload.selecticon') }}</div>
					</div>
				</upload-attachment>
			</div>
		</template>
	</div>

</template>

<script lang="ts" setup>
import { computed, reactive, watch, toRaw } from 'vue'
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
    iconText: {
        type: String
    },
    limit: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

const value = computed({
    get () {
        return prop.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const icons: Record<string, any> = reactive({
    data: []
})

const setValue = () => {
    value.value = toRaw(icons.data).toString()
}

watch(() => value.value, () => {
    icons.data = [
        ...value.value.split(',').filter((item: string) => {
            return item
        })
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
     * 选择图标
     */
const confirmSelect = (data: Record<string, any>) => {
    if (prop.limit == 1) {
        icons.data.splice(0, 1)
        data && icons.data.push(data.url)
    } else {
        data.forEach((item: any) => {
            if (icons.data.length < prop.limit) icons.data.push(item.url)
        })
    }
    setValue()
    emit('change', value.value)
}

/**
     * 删除图标
     * @param index
     */
const removeIcon = (index: number = 0) => {
    icons.data.splice(index, 1)
    setValue()
}

</script>

<style lang="scss" scoped>
	.icon-wrap {
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
