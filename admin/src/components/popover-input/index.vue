<template>
    <el-popover placement="top" trigger="click" :width="prop.width" v-model:visible="visible">
        <el-input v-model="value" :placeholder="prop.placeholder" clearable class="mr-[10px]" :maxlength="prop.maxlength"
            :show-word-limit="true" />
        <div class="text-right mt-[15px]">
            <el-button @click="visible = false">{{ t('cancel') }}</el-button>
            <el-button type="primary" @click="confirm">{{ t('confirm') }}</el-button>
        </div>
        <template #reference>
            <slot></slot>
        </template>
    </el-popover>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { t } from '@/lang'
import { ElMessage } from 'element-plus'

const prop = defineProps({
    width: {
        type: String,
        default: '350px'
    },
    value: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: true
    },
    maxlength: {
        type: Number,
        default: 10
    }
})

const value = ref(prop.value)
const visible = ref(false)

watch(visible, () => {
    if (!visible.value) {
        value.value = ''
    }
})

const emit = defineEmits(['confirm'])

const confirm = () => {
    if (!/[\S]+/.test(value.value)) {
        ElMessage.error(prop.placeholder || '不能为空')
        return
    }
    emit('confirm', value.value)
    visible.value = false
}
</script>

<style lang="scss" scoped></style>