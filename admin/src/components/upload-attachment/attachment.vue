<template>
    <div class="flex border-t border-b main-wrap border-color w-full" :class="scene == 'select' ? 'h-[40vh]' : 'h-full'">
        <!-- 分组 -->
        <div class="group-wrap w-[180px] p-[15px] h-full border-r border-color flex flex-col">
        
            <el-input v-model="categoryParam.name" class="m-0" :placeholder="t('upload.attachmentCategoryPlaceholder')" clearable 
                prefix-icon="Search" @input="getAttachmentCategoryList()" />
            <div class="group-list flex-1 my-[10px]">
                <el-scrollbar>
                    <div class="group-item p-[10px] leading-none text-xs rounded cursor-pointer" :class="{ active: attachmentParam.cate_id == 0 }" @click="attachmentParam.cate_id = 0">
                        {{ t('selectPlaceholder') }}
                    </div>
                    <div class="group-item px-[10px] text-xs rounded cursor-pointer flex" v-for="(item, index) in attachmentCategory.data" :key="index" :class="{ active: attachmentParam.cate_id == item.id }">
                        <div class="flex-1 leading-none truncate py-[10px]" @click="attachmentParam.cate_id = item.id">{{item.name }}</div>
                        <div class="leading-none operate py-[10px]" v-if="scene == 'attachment'">
                            <!-- 编辑分组 -->
                            <popover-input :placeholder="t('upload.attachmentCategoryPlaceholder')" @confirm="updateAttachmentCategory($event, index)" :value="item.name">
                                <span class="text-primary">{{ t('edit') }}</span>
                            </popover-input>
                            <!-- 删除分组 -->
                            <span class="text-danger ml-[5px]" @click="deleteAttachmentCategory(index)">{{ t('delete')}}</span>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
            <!-- 添加分组 -->
            <popover-input :placeholder="t('upload.attachmentCategoryPlaceholder')" @confirm="addAttachmentCategory">
                <el-button>{{ t('upload.addAttachmentCategory') }}</el-button>
            </popover-input>
        </div>
        <!-- 素材 -->
        <div class="attachment-list-wrap flex flex-col p-[15px] flex-1">
            <el-row :gutter="15" class="h-[32px]">
                <el-col :span="12">
                    <div class="flex">
                        <el-upload v-bind="upload" ref="uploadRef">
                            <el-button type="primary">{{ t('upload.upload' + type) }} {{ isOpen }}</el-button>
                        </el-upload>
						<div v-if="scene == 'attachment'">
							<el-button v-if="operate === false" class="ml-[10px]" type="primary" @click="operate = true">{{t('edit') }}</el-button>
							<el-button v-else class="ml-[10px]" type="primary" @click="operate = false">{{ t('complete') }}</el-button>
						</div>
                        
                    </div>
                </el-col>
                <el-col :span="12" class="text-right">
                    <el-input v-model="attachmentParam.real_name" class="m-0 w-[200px]" clearable :placeholder="t('upload.placeholder' + type + 'Name')" prefix-icon="Search" @input="getAttachmentList()" />
                </el-col>
            </el-row>
            <div class="flex-1 my-[15px] h-0" v-loading="attachment.loading">
                <el-scrollbar>
                    <div class="flex flex-wrap" v-if="attachment.data.length && (operate === true || scene != 'attachment')">
                        <div class="attachment-item mr-[10px]" :class="scene == 'select' ? 'w-[100px]' : 'w-[120px]'" v-for="(item, index) in attachment.data" :key="index">
                            <div class="attachment-wrap w-full rounded cursor-pointer overflow-hidden relative flex items-center justify-center" :class="scene == 'select' ? 'h-[100px]' : 'h-[120px]'" @click="selectFile(item)">
                                <el-image :src="img(item.url)" fit="contain" v-if="type == 'image'"></el-image>
                                <video :src="img(item.url)" v-else></video>
                                <div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60" v-show="selectedFile[item.att_id]">
                                    <icon name="element-Select" color="#fff" size="25px" />
                                </div>
                            </div>
                            <div class="flex items-center">
                                <el-tooltip placement="top">
                                    <template #content>{{ item.real_name }}</template>
                                    <div class="truncate my-[10px] cursor-pointer text-base flex-1 ">{{ item.real_name }}</div>
                                </el-tooltip>
                                <!-- 图片操作 -->
                                <el-dropdown :hide-on-click="false" v-if="scene == 'attachment'">
                                    <icon name="element-MoreFilled" class="cursor-pointer ml-[10px]" size="14px" />
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item class="text-center" @click="previewImage(index)" v-if="item.att_type == 'image'">
                                                <div class="text-center w-full">{{ t('lookOver') }}</div>
                                            </el-dropdown-item>
                                            <el-dropdown-item class="text-center" @click="previewVideo(index)" v-if="item.att_type == 'video'">
                                                <div class="text-center w-full">{{ t('lookOver') }}</div>
                                            </el-dropdown-item>
                                            <el-dropdown-item class="text-center" @click="moveAttachmentEvent(index)">
                                                <div class="text-center w-full">{{ t('upload.move') }}</div>
                                            </el-dropdown-item>
                                            <el-dropdown-item @click="deleteAttachmentEvent(index)">
                                                <div class="text-center w-full">{{ t('delete') }}</div>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap" v-else-if="attachment.data.length && operate === false">
                        <div class="attachment-item mr-[10px] w-[120px]" v-for="(item, index) in attachment.data" :key="index">
                            <div class="attachment-wrap w-full rounded cursor-pointer overflow-hidden relative flex items-center justify-center h-[120px]">
                                <el-image :src="img(item.url)" fit="contain" v-if="type == 'image'" :preview-src-list="item.image_list"></el-image>
                                <video :src="img(item.url)" v-else></video>
                            </div>
                            <div class="flex items-center">
                                <el-tooltip placement="top">
                                    <template #content>{{ item.real_name }}</template>
                                    <div class="truncate my-[10px] cursor-pointer text-base flex-1 ">{{ item.real_name }}</div>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-center" v-else>
                        <el-empty v-if="!attachment.loading" :description="t('upload.attachmentEmpty')" :image-size="100" />
                    </div>
                </el-scrollbar>
            </div>
            <el-row :gutter="20">
                <el-col :span="8" v-if="scene == 'attachment' && operate === true">
                    <div class="flex items-center">
                        <el-checkbox v-model="selectAll" :label="t('selectAll')" size="large" />
                        <el-button class="ml-[15px]" :disabled="batchOperateDisabled" @click="deleteAttachmentEvent()">{{t('delete') }}</el-button>
                        <el-button :disabled="batchOperateDisabled" @click="moveAttachmentEvent()">{{ t('upload.move') }}</el-button>
                    </div>
                </el-col>
                <el-col :span="scene == 'attachment' ? 16 : 24">
                    <div class="flex h-full justify-end items-center">
                        <el-pagination v-model:current-page="attachment.page" :small="true" v-model:page-size="attachment.limit" :page-sizes="[10, 20, 40, 60]" layout="total, sizes, prev, pager, next, jumper" :total="attachment.total" @size-change="getAttachmentList()" @current-change="getAttachmentList" />
                    </div>
                </el-col>
            </el-row>
        </div>

        <template v-if="scene == 'attachment'">
            <!-- 移动附件分组 -->
            <el-dialog v-model="moveAttachmentData.visible" :title="t('upload.moveCategory')" width="350px">
                <el-form label-width="60px">
                    <el-form-item :label="t('upload.moveTo')" style="margin-bottom: 0;">
                        <el-select v-model="moveAttachmentData.cateId" class="input-width">
                            <el-option :label="item.name" :value="item.id" v-for="(item, index) in attachmentCategory.data" :key="index" />
                        </el-select>
                    </el-form-item>
                </el-form>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="moveAttachmentData.visible = false">{{ t('cancel') }}</el-button>
                        <el-button type="primary" :loading="moveAttachmentData.loading" @click="moveAttachmentData.confirm()">{{t('confirm') }}</el-button>
                    </span>
                </template>
            </el-dialog>

            <!-- 图片预览 -->
            <el-image-viewer :url-list="previewImageList" v-if="imageViewer.show" @close="imageViewer.show = false" :initial-index="imageViewer.index" :zoom-rate="1" />

            <!-- 视频预览 -->
            <el-dialog v-model="videoViewer.visible" width="50%" align-center :destroy-on-close="true" custom-class="video-preview">
                <video-player :src="videoViewer.src" width="100%" />
            </el-dialog>

        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed, toRaw } from 'vue'
import { t } from '@/lang'
import {
    getAttachmentCategoryList as attachmentCategoryList,
    getAttachmentList as attachmentList,
    addAttachmentCategory as addCategory,
    editAttachmentCategory as updateCategory,
    deleteAttachmentCategory as deleteCategory,
    deleteAttachment,
    moveAttachment
} from '@/api/sys'
import { debounce, img, getToken } from '@/utils/common'
import { ElMessage, UploadFile, UploadFiles, ElMessageBox } from 'element-plus'
import storage from '@/utils/storage'

const operate = ref(false)
const prop = defineProps({
    // 选择数量限制
    limit: {
        type: Number,
        default: 1
    },
    type: {
        type: String,
        default: 'image'
    },
    // 场景
    scene: {
        type: String,
        default: 'select' // select 选择图片 attachment 素材中心
    }
})

// 选中的文件
const selectedFile: Record<string, any> = reactive({})

const attachmentCategory: Record<string, any> = reactive({
    data: []
})
const attachment: Record<string, any> = reactive({
    loading: true,
    page: 1,
    total: 0,
    limit: prop.scene == 'select' ? 10 : 20,
    data: []
})
const categoryParam = reactive({
    name: ''
})
const attachmentParam = reactive({
    real_name: '',
    cate_id: 0
})

/**
 * 查询分组
 */
const getAttachmentCategoryList = debounce(() => {
    attachmentCategoryList({
        type: prop.type,
        ...categoryParam
    }).then(res => {
        attachmentCategory.data = res.data
    }).catch(() => {

    })
})
getAttachmentCategoryList()

/**
 * 查询图片
 */
const getAttachmentList = debounce((page: number = 1) => {
    attachment.loading = true
    attachment.page = page
    attachmentList({
        page: attachment.page,
        limit: attachment.limit,
        att_type: prop.type,
        ...attachmentParam
    }).then(res => {
        attachment.data = res.data.data
        attachment.total = res.data.total
        attachment.loading = false
        prop.scene == 'attachment' && clearSelected()
		
        for (let i = 0; i < attachment.data.length; i++) {
			attachment.data[i]['image_list'] = []
            attachment.data[i]['image_list'].push(img(res.data.data[i]['url']))
        }


    }).catch(() => {
        attachment.loading = false
    })
})
getAttachmentList()

watch(() => attachmentParam.cate_id, () => {
    getAttachmentList()
})

/**
 * 添加分组
 */
const addAttachmentCategory = (name: string) => {
    addCategory({
        type: prop.type,
        name
    }).then(res => {
        getAttachmentCategoryList(1)
    }).catch(() => {

    })
}

/**
 * 编辑分组
 * @param name
 * @param index
 */
const updateAttachmentCategory = (name: string, index: number) => {
    updateCategory({
        id: attachmentCategory.data[index].id,
        name
    }).then(res => {
        attachmentCategory.data[index].name = name
    }).catch(() => {

    })
}

/**
 * 删除分组
 */
const deleteAttachmentCategory = (index: number) => {
    ElMessageBox.confirm(t('upload.deleteCategoryTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteCategory(attachmentCategory.data[index].id).then(() => {
            attachmentCategory.data.splice(index, 1)
        }).catch(() => {
        })
    })
}

const uploadRef = ref<Record<string, any> | null>(null)

// 上传文件
const upload = computed(() => {
    const headers: Record<string, any> = {}
    headers[import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()
    headers[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get('siteId') || 0

    return {
        action: `${import.meta.env.VITE_APP_BASE_URL}/sys/${prop.type}`,
        multiple: true,
        data: {
            cate_id: attachmentParam.cate_id
        },
        headers,
        onSuccess: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
            if (response.code >= 1) {
                getAttachmentList()
                uploadRef.value?.handleRemove(uploadFile)
            } else {
                uploadFile.status = 'fail'
                ElMessage({ message: response.msg, type: 'error' })
            }
        }
    }
})

// 全选
const selectAll = ref(false)
watch(selectAll, () => {
    if (selectAll.value) {
        const keys = Object.keys(toRaw(selectedFile))
        attachment.data.forEach((item: Record<string, any>) => {
            if (!keys.includes(item.att_id)) selectedFile[item.att_id] = toRaw(item)
        })
    } else {
        clearSelected()
    }
})

/**
 * 清空选中
 */
const clearSelected = () => {
    const keys = Object.keys(toRaw(selectedFile))
    if (keys.length) {
        keys.forEach((key) => { delete selectedFile[key] })
        selectAll.value = false
    }
}

/**
 * 选择文件
 */
const selectFile = (data: any) => {
    if (selectedFile[data.att_id]) delete selectedFile[data.att_id]
    else if (prop.scene == 'select') {
        const keys = Object.keys(toRaw(selectedFile))
        const length = keys.length
        if (prop.limit == 1 && length == prop.limit) {
            delete selectedFile[keys[0]]
        } else if (length >= prop.limit) {
            ElMessage.info(t('upload.triggerUpperLimit'))
            return
        }
        selectedFile[data.att_id] = toRaw(data)
    } else {
        selectedFile[data.att_id] = toRaw(data)
    }
}

/**
 * 删除附件
 * @param index
 */
const deleteAttachmentEvent = (index: number | null = null) => {
    const ids = index === null ? Object.keys(toRaw(selectedFile)) : [attachment.data[index].att_id]

    ElMessageBox.confirm(t('upload.deleteAttachmentTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteAttachment({ att_ids: ids }).then(() => {
            getAttachmentList()
        }).catch(() => {
        })
    })
}

/**
 * 移动附件
 */
const moveAttachmentData: Record<string, any> = reactive({
    cateId: '',
    loading: false,
    visible: false
})
const moveAttachmentEvent = (index: number | null = null) => {
    const ids = index === null ? Object.keys(toRaw(selectedFile)) : [attachment.data[index].att_id]
    moveAttachmentData.visible = true
    moveAttachmentData.cateId = attachmentCategory.data[0].id

    moveAttachmentData.confirm = () => {
        moveAttachmentData.loading = true
        moveAttachment({ cate_id: moveAttachmentData.cateId, att_ids: ids }).then(() => {
            moveAttachmentData.visible = false
            moveAttachmentData.loading = false
            getAttachmentList()
        }).catch(() => {
            moveAttachmentData.loading = false
        })
    }
}

// 批量操作是否可操作
const batchOperateDisabled = ref(true)
watch(selectedFile, () => {
    batchOperateDisabled.value = Object.keys(toRaw(selectedFile)).length == 0
})

/**
 * 查看图片
 */
const imageViewer = reactive({
    show: false,
    index: 0
})
const previewImage = (index: number) => {
    imageViewer.show = true
    imageViewer.index = index
}
const previewImageList = computed(() => {
    return toRaw(attachment.data).map((item: Record<string, any>) => { return img(item.url) })
})

/**
 * 视频预览
 */
const videoViewer = reactive({
    visible: false,
    src: ''
})
const previewVideo = (index: number) => {
    videoViewer.visible = true
    videoViewer.src = img(attachment.data[index].url)
}

defineExpose({
    selectedFile
})
</script>

<style lang="scss" scoped>
.group-list {
    .group-item {
        margin-top: 3px;

        .operate {
            display: none;
        }

        &.active {
            background-color: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
        }

        &:hover {
            background-color: var(--el-color-primary-light-9);

            .operate {
                display: block;
            }
        }
    }
}

.attachment-list-wrap {
    .attachment-wrap {
        background: var(--el-border-color-extra-light);
    }
}
</style>
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

.el-upload-list {
    position: absolute !important;
    z-index: 10;

    .el-upload-list__item {
        background: #fff !important;
        box-shadow: var(--el-box-shadow-light);
    }
}</style>
