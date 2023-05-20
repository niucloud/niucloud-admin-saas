<template>
    <view>
        <!-- 扩展组件 -->
    </view>
</template>
<script setup lang="ts">
    // 自定义扩展组件
    import { computed } from 'vue';
    import useDiyStore from '@/stores/diy';
    const props = defineProps(['component', 'index']);
    const diyStore = useDiyStore();
    const diyComponent = computed(() => {
        if (diyStore.mode == 'decorate') {
            return diyStore.value[props.index];
        } else {
            return props.component;
        }
    })
</script>
<style lang="scss" scoped></style>
