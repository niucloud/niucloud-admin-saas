<template>
    <view class="fixed-group">
        <template v-if="props.data.global.component == 'demo-index'">
            <fixed-demo-index :data="props.data" :pullDownRefreshCount="props.pullDownRefreshCount"></fixed-demo-index>
        </template>
    </view>
</template>
<script lang="ts" setup>
   const props = defineProps(['data','pullDownRefreshCount']);
</script>
<style lang="scss" scoped>
   @import './index.scss';
</style>
