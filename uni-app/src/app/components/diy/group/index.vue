<template>
    <view class="diy-group" id="componentList">
        <view v-for="(component, index) in data.value" :key="component.id"
        @click="diyStore.changeCurrentIndex(index, component)" class="draggable-element relative"
        :class="{ selected: diyStore.currentIndex == index,decorate : diyStore.mode == 'decorate' }" :style="component.pageStyle">
            <template v-if="component.componentName == 'AddonList'">
                <diy-addon-list :component="component" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"></diy-addon-list>
            </template>
            <template v-if="component.componentName == 'GraphicNav'">
                <diy-graphic-nav :component="component" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"></diy-graphic-nav>
            </template>
            <template v-if="component.componentName == 'HorzBlank'">
                <diy-horz-blank :component="component" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"></diy-horz-blank>
            </template>
            <template v-if="component.componentName == 'HotArea'">
                <diy-hot-area :component="component" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"></diy-hot-area>
            </template>
            <template v-if="component.componentName == 'ImageAds'">
                <diy-image-ads :component="component" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"></diy-image-ads>
            </template>
            <template v-if="component.componentName == 'MemberInfo'">
                <diy-member-info :component="component" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"></diy-member-info>
            </template>
            <template v-if="component.componentName == 'Notice'">
                <diy-notice :component="component" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"></diy-notice>
            </template>
            <template v-if="component.componentName == 'RubikCube'">
                <diy-rubik-cube :component="component" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"></diy-rubik-cube>
            </template>
            <template v-if="component.componentName == 'Text'">
                <diy-text :component="component" :index="index" :pullDownRefreshCount="props.pullDownRefreshCount"></diy-text>
            </template>
        </view>
        <template v-if="diyStore.mode == '' && data.global.bottomTabBarSwitch">
            <view class="pt-[20rpx]"></view>
            <tabbar :addon="tabbarAddonName" />
        </template>
    </view>
</template>
<script lang="ts" setup>
   import useDiyStore from '@/app/stores/diy';
   import { onMounted, nextTick, computed } from 'vue';
   import Sortable from 'sortablejs';
   import { range } from 'lodash-es';
   import useConfigStore from '@/stores/config'
   const props = defineProps(['data','pullDownRefreshCount']);
   const diyStore = useDiyStore();

   const data = computed(() => {
       if (diyStore.mode == 'decorate') {
           return diyStore;
       } else {
           return props.data;
       }
   })

   const tabbarAddonName = computed(() => {
       return useConfigStore().addon;
   })

   onMounted(() => {
       // #ifdef H5
       if (diyStore.mode == 'decorate') {
           var el = document.getElementById('componentList');
           const sortable = Sortable.create(el, {
               group: 'draggable-element',
               animation: 200,
               // 结束拖拽
               onEnd: event => {
                   let temp = diyStore.value[event.oldIndex!];
                   diyStore.value.splice(event.oldIndex!, 1);
                   diyStore.value.splice(event.newIndex!, 0, temp);

                   nextTick(() => {
                       sortable.sort(
                           range(diyStore.value.length).map(value => {
                               return value.toString();
                           })
                       );

                       diyStore.postMessage(event.newIndex, diyStore.value[event.newIndex]);
                   });
               }
           });
       }
       // #endif
   });
</script>
<style lang="scss" scoped>
   @import './index.scss';
</style>
