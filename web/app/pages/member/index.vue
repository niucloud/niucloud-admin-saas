<template>
    <div class="w-full h-full bg-page pt-6">
        <div class="main-container flex justify-between">
            <sidebar></sidebar>
            <el-card class="box-card flex-1 ml-4" v-loading="loading" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span>{{t('welcomePage')}}</span>
                    </div>
                </template>
                <div class="px-10 py-5" v-if="info">
                    <div class="flex items-center border-gray-300 border-b-1 pb-5 px-5">
                        <img v-if="!info.headimg" class="w-[65px] h-[65px] rounded-full" src="@/assets/images/default_headimg.png" alt="">
                        <img v-else :src="img(info.headimg)" class="w-[65px] h-[65px] rounded-full" alt="">
                        <div class="ml-4">
                            <div>
                                <span class="text-base font-bold">{{info.nickname}}</span>
                                <span class="text-xs">（{{t('mobile')}}：{{info.mobile ? info.mobile : t('notBound') }}）</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">{{t('registrationTime')}}：{{info.create_time}}</p>
                        </div>
                    </div>
                    <div class="flex justify-between mt-8 statistic-wrap px-8">
                        <NuxtLink to="/member/point">
                            <el-statistic :title="t('point')" :value="info.point" />
                        </NuxtLink>
                        <NuxtLink to="/member/balance">
                            <el-statistic :title="t('balance')" :value="info.balance" />
                        </NuxtLink>
                        <el-statistic :title="t('looseChange')" :value="info.money" />
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import useMemberStore from '@/stores/member'
import useAppStore from '@/stores/app'
import type { UploadProps } from 'element-plus'

const memberStore = useMemberStore()
const loading = ref(true)
const info = computed(() =>{
    if(memberStore.info) loading.value = false;
    return memberStore.info;
})
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
::v-deep .box-card{
    border: none !important;
    .el-card__header{
        border-color: #F1F1F1;
    }
}
::v-deep .statistic-wrap{
    .el-statistic__head, .el-statistic__content{
        text-align: center;
    }
}
</style>