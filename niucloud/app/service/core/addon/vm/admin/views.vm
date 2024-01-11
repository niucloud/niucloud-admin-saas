<template>
  <span class="text-[20px]">{{hello_world_text}}</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getHelloWorld } from '@/addon/{key}/api/hello_world'

const hello_world_text = ref('');
const getHelloWorldInfo = async () => {
  hello_world_text.value = await (await getHelloWorld()).data
}
getHelloWorldInfo()
</script>

<style lang="scss" scoped>
</style>
