<template>
	<div class="flex flex-wrap">
		<template v-if="limit == 1">
			<div class="rounded cursor-pointer relative bg-page video-wrap mr-[10px]" :style="style">
				<template v-if="videos.data.length">
					<div class="w-full h-full relative flex items-center overflow-hidden rounded">
						<video :src="img(videos.data[0])" class="w-full"/>
						<div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation">
							<icon name="iconfont-icon24gf-playCircle" color="#fff" size="25px" @click="previewVideo()"/>
						</div>
					</div>
					<icon name="element-CircleCloseFilled" color="#bbb" size="18px" @click="removeVideo" class="absolute z-[2] top-[-9px] right-[-9px]"/>
				</template>
				<upload-attachment :limit="limit" type="video" @confirm="confirmSelect" v-else>
					<div class="w-full h-full flex items-center justify-center flex-col">
						<icon name="iconfont-icon24gf-playCircle" size="25px" color="var(--el-text-color-secondary)"/>
					</div>
				</upload-attachment>
			</div>
		</template>
		<template v-else>
			<div class="rounded cursor-pointer relative bg-page video-wrap mr-[10px]" :style="style" v-for="(item, index) in videos.data" :key="index">
				<div class="w-full h-full relative flex items-center overflow-hidden rounded">
					<video :src="img(item)" class="w-full"/>
					<div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation">
						<icon name="iconfont-icon24gf-playCircle" color="#fff" size="25px" @click="previewVideo(index)"/>
					</div>
				</div>
				<icon name="element-CircleCloseFilled" color="#bbb" size="18px" @click="removeVideo(index)" class="absolute z-[2] top-[-9px] right-[-9px]"/>
			</div>
			<div class="rounded cursor-pointer relative bg-page video-wrap mr-[10px]" :style="style" v-if="videos.data.length < limit">
				<upload-attachment :limit="limit" type="video" @confirm="confirmSelect">
					<div class="w-full h-full flex items-center justify-center flex-col">
						<icon name="iconfont-icon24gf-playCircle" size="25px" color="var(--el-text-color-secondary)"/>
					</div>
				</upload-attachment>
			</div>
		</template>

		<!-- 视频预览 -->
		<el-dialog v-model="videoViewer.visible" width="50%" align-center :destroy-on-close="true" custom-class="video-preview">
			<video-player :src="videoViewer.src" width="100%"/>
		</el-dialog>

	</div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch, toRaw } from 'vue'
import { img } from '@/utils/common'

const prop = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '200px'
    },
    height: {
        type: String,
        default: '100px'
    },
    limit: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get () {
        return prop.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const videos: Record<string, any> = reactive({
    data: []
})

watch(() => value.value, () => {
    videos.data = [
        ...value.value.split(',').filter((item: string) => {
            return item
        })
    ]
    setValue()
})

const style = computed(() => {
    return {
        width: prop.width,
        height: prop.height
    }
})

/**
     * 选择视频
     */
const confirmSelect = (data: Record<string, any>) => {
    if (prop.limit == 1) {
        videos.data.splice(0, 1)
        data && videos.data.push(data.url)
    } else {
        data.forEach((item: any) => {
            if (videos.data.length < prop.limit) videos.data.push(item.url)
        })
    }
    setValue()
}

/**
     * 删除视频
     * @param index
     */
const removeVideo = (index: number = 0) => {
    videos.data.splice(index, 1)
    setValue()
}

const setValue = () => {
    value.value = toRaw(videos.data).toString()
}

/**
     * 查看视频
     */
const videoViewer = reactive({
    visible: false,
    src: ''
})
const previewVideo = (index: number = 0) => {
    videoViewer.visible = true
    videoViewer.src = img(videos.data[index])
}
</script>

<style lang="scss">
	.video-preview {
		background: none !important;
		box-shadow: none !important;

		.el-dialog__headerbtn .el-dialog__close {
			border-radius: 50%;
			width: 34px;
			height: 34px;
			font-size: 24px;
			color: #fff;
			background-color: var(--el-text-color-regular);
			border-color: #fff;
		}
	}
</style>
