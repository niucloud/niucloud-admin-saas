<template>
    <view @click="toRedirect" :class="prop.customClass" :style="prop.customStyle">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { redirect, diyRedirect, currRoute, getToken } from '@/utils/common'
import { useLogin } from '@/hooks/useLogin';

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
    },
    customClass: {
        type: [String, Object, Array],
        default: ''
    },
    customStyle: {
        type: [String, Object, Array],
        default: ''
    }
})

const toRedirect = () => {
    if (Object.keys(prop.data).length) {
        if (!prop.data.url) return;
        if (currRoute() == 'app/pages/member/index' && !getToken()) {
            useLogin().setLoginBack({ url: prop.data.url })
            return;
        }
        diyRedirect(prop.data);
    } else {
        redirect(prop)
    }
}
</script>

<style lang="scss" scoped></style>
