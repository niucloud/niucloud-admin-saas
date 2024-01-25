<template>
    <div class="w-full pt-6 min-h-[100%] flex flex-col justify-center">
        <template v-if="agreement">
            <div class="main-container" v-if="agreement.title && agreement.content">
                <h2 class="text-center">{{ agreement.title }}</h2>
                <div v-html="agreement.content"></div>
            </div>
            <el-empty :description="t('protocolNotConfigured')" v-else />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { getAgreementInfo } from '@/app/api/system'

const agreement = ref<any | null>(null)
const route = useRoute()

getAgreementInfo(route.query.key).then(({ data }) => {
    agreement.value = data

    useHead({
        title: data.title
    })
}).catch(err => {
})
</script>

<style lang="scss" scoped></style>
