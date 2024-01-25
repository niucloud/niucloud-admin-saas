<template>
		<span class="text-[24px]">{{hello_world_text}}</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getHelloWorld } from '@/addon/{key}/api/hello_world'

const hello_world_text = ref('');

getHelloWorld().then(res => {
    hello_world_text.value = res.data;
})
</script>
<style lang="scss" scoped></style>
