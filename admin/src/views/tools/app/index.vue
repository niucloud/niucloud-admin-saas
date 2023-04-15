<template>
    <div class="main-container h-[500px] w-full flex items-center justify-center bg-white">
        <span class="text-2xl">{{t('content')}}</span>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
</script>

<style lang="scss" scoped></style>
