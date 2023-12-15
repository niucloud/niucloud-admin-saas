<template>
    <div class="border border-color">
        <toolbar class="border-b border-color" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <wang-editor :style="{ height, 'overflow-y': 'hidden', width: '100%' }" :defaultConfig="editorConfig" :mode="mode" v-model="content" @onCreated="handleCreated" />
        <upload-attachment type="image" ref="imageRef" :limit="10" @confirm="imageSelect" />
        <upload-attachment type="video" ref="videoRef" @confirm="videoSelect" />
    </div>
</template>

<script lang="ts" setup>
import { shallowRef, computed, onBeforeUnmount, ref } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { IToolbarConfig, IEditorConfig, IDomEditor } from '@wangeditor/editor'
import { Editor as WangEditor, Toolbar } from '@wangeditor/editor-for-vue'
import { img } from '@/utils/common'

const editorRef = shallowRef()

const prop = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    mode: {
        type: String,
        default: 'simple'
    },
    height: {
        type: String,
        default: '300px'
    }
})

const emit = defineEmits(['update:modelValue'])

const imageRef: Record<string, any> | null = ref(null)
const videoRef: Record<string, any> | null = ref(null)

const content = computed({
    get() {
        return prop.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['group-image', 'insertVideo', 'insertLink'],
    insertKeys: {
        index: 16,
        keys: ['uploadImage', 'uploadVideo']
    }
}

// 编辑器配置
type InsertFnType = (url: string) => void
let insertFn: InsertFnType = (url: string) => { }

const editorConfig: Partial<IEditorConfig> = {
    MENU_CONF: {
        uploadImage: {
            customBrowseAndUpload(insert: InsertFnType) {
                imageRef.value.showDialog = true
                insertFn = insert
            }
        },
        uploadVideo: {
            customBrowseAndUpload(insert: InsertFnType) {
                videoRef.value.showDialog = true
                insertFn = insert
            }
        }
    }
}

const imageSelect = (data: Record<string, any>) => {
    data.forEach((item: any) => { insertFn(img(item.url)) })
}

const videoSelect = (data: Record<string, any>) => {
    insertFn(img(data.url))
}

const handleCreated = (editor: IDomEditor) => {
    editorRef.value = editor
}

/**
 * 组件销毁时，也及时销毁编辑器
 */
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>

<style lang="scss" scoped></style>
