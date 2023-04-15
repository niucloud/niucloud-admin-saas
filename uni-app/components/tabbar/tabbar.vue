<template>
    <u-tabbar :value="value" @change="tabbarChange" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true" :inactive-color="tabbar.textColor" :active-color="tabbar.textHoverColor" v-if="tabbar">
        <block v-for="item in tabbar.list">
            <u-tabbar-item :style="{'background-color': tabbar.backgroundColor}" :text="item.text" :icon="img(value == item.link.url ? item.iconSelectPath : item.iconPath)" :name="item.link.url" v-if="tabbar.type == 1"></u-tabbar-item>
            <u-tabbar-item :style="{'background-color': tabbar.backgroundColor}" :icon="img(value == item.link.url ? item.iconSelectPath : item.iconPath)" :name="item.link.url" v-if="tabbar.type == 2"></u-tabbar-item>
            <u-tabbar-item :style="{'background-color': tabbar.backgroundColor}" :text="item.text" :name="item.link.url" v-if="tabbar.type == 3"></u-tabbar-item>
        </block>
    </u-tabbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { redirect, currRoute, img } from '@/utils/common'
import useConfigStore from '@/stores/config'

const tabbar = computed(() => {
    return useConfigStore().tabbar
})

const value = computed(() => {
    return '/' + currRoute()
})

const tabbarChange = (name: string) => {
    redirect({ url: `${name}` })
}
</script>

<style lang="scss" scoped></style>
