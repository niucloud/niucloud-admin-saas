<template>
    <view @click="toRedirect">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
    import { redirect } from '@/utils/common'

    const prop = defineProps({
        url: String,
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        mode: {
            type: String,
            default: 'navigateTo'
        }
    })

    const toRedirect = () => {
        redirect(prop)
    }
</script>

<style lang="scss" scoped></style>