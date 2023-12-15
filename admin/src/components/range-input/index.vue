<template>
    <div class="el-date-editor el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger" :class="{'is-active': isActive}">
        <input class="el-range-input" v-model="props.modelValue[0]" @blur="isActive = false" @focus="isActive = true" :placeholder="props.startPlaceholder">
        <span class="el-range-separator">-</span>
        <input class="el-range-input" v-model="props.modelValue[1]" @blur="isActive = false" @focus="isActive = true" :placeholder="props.endPlaceholder">
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isActive = ref(false)

const props = defineProps({
    startPlaceholder: {
        type: String,
        default: ''
    },
    endPlaceholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: Array,
        default: () => {
            return ['', '']
        }
    }
})

</script>

<style lang="scss" scoped>

</style>
