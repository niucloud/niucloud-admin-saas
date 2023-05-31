<template>
    <div class="w-screen h-screen flex flex-col items-center justify-center">
        <el-empty :description="t('siteNonexistence')" :image="img('static/resource/images/site/close.png')"
            image-size="300px" />
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "container"
});

</script>

<style lang="scss" scoped></style>