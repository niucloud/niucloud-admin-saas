<template>
	<div class="main-container"></div>
</template>

<script lang="ts" setup>
    import {ref} from 'vue'
    import {useRouter} from 'vue-router'

    const router = useRouter()
    const url = router.resolve({
        path: '/decorate/edit',
        query: {name: 'DIY_MEMBER_INDEX'}
    });
    router.push('/decorate/edit?name=DIY_MEMBER_INDEX')
</script>

<style lang="scss" scoped>
</style>