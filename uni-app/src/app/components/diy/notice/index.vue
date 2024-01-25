<template>
    <view :style="warpCss" class="overflow-hidden">
        <view class="flex items-center pl-[28rpx] pr-[22rpx]" @click="noticeClickFn">
            <image v-if="diyComponent.iconType == 'system'" :src="img(`addon/shop/diy/notice/${diyComponent.systemIcon}.png`)" class="h-[44rpx] max-w-[130rpx] -mr-[8rpx]" mode="heightFix"></image>
            <image v-else :src="img(diyComponent.imageUrl || '')" class="w-[30rpx] h-[30rpx] -mr-[8rpx]" mode="aspectFit"></image>
            <u-notice-bar :text="diyComponent.list.text" :color="diyComponent.textColor" :bgColor="diyComponent.componentBgColor" :fontSize="diyComponent.fontSize * 2 + 'rpx'" speed="50" icon="" :style="{'fontWeight': diyComponent.fontWeight}"></u-notice-bar>
            <text class="iconfont iconxiangyoujiantou -ml-[8rpx]" :style="{'color': diyComponent.textColor,'fontSize': (diyComponent.fontSize * 2 + 'rpx'), 'fontWeight': diyComponent.fontWeight}"></text>
        </view>
        <u-popup :show="noticeShow" @close="noticeShow = false" :closeable="true" mode="center" :round="5">
            <view class="py-[30rpx] text-sm leading-none border-0 border-solid border-b-[2rpx] border-[#eee]">
                <text class="ml-[30rpx]">公告内容</text>
            </view>
            <scroll-view scroll-y="true" class="px-6 py-3 w-[600rpx] h-[500rpx] text-sm">
                {{diyComponent.list.text}}
            </scroll-view>
            <button @click="noticeShow = false" class="!mx-[30rpx] !mb-[40rpx] !w-auto !h-[80rpx] text-sm leading-[80rpx] rounded-full text-white !bg-[#ff4500]">我知道了</button>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
// 应用列表
import { ref, computed, watch, onMounted } from 'vue';
import { img, redirect } from '@/utils/common';
import useDiyStore from '@/app/stores/diy';

const props = defineProps(['component', 'index', 'pullDownRefreshCount']);
const diyStore = useDiyStore();
const noticeShow = ref(false);

const diyComponent = computed(() => {
    if (diyStore.mode == 'decorate') {
        return diyStore.value[props.index];
    } else {
        return props.component;
    }
})

const warpCss = computed(() => {
    var style = '';
    if (diyComponent.value.componentBgColor) style += 'background-color:' + diyComponent.value.componentBgColor + ';';
    if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
    if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
    if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
    return style;
})

watch(
    () => props.pullDownRefreshCount,
    (newValue, oldValue) => {
        // 处理下拉刷新业务
    }
)

onMounted(() => {
    refresh();
    // 装修模式下刷新
    if (diyStore.mode == 'decorate') {
        watch(
            () => diyComponent.value,
            (newValue, oldValue) => {
                if (newValue && newValue.componentName == 'AddonList') {
                    refresh();
                }
            }
        )
    }
});

const refresh = () => {
    // 装修模式下设置默认图
    if (diyStore.mode == 'decorate') {
        if(!diyComponent.value.list.title) diyComponent.value.list.title = '公告名称';
    }
}

const noticeClickFn = ()=>{
    if(diyStore.mode == 'decorate') return false;
    if(diyComponent.value.showType == 'popup'){
        noticeShow.value = true;
    }else{
        redirect({ url: diyComponent.value.list.link.url});
    }
}
</script>

<style lang="scss" scoped>
/* 单行超出隐藏 */
.using-hidden {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: break-spaces;
}

/* 多行超出隐藏 */
.multi-hidden {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
