<template>
    <div class="main-container h-[500px] w-full p-5 bg-white" v-loading="loading">
        <div class="flex flex-wrap px-2 plug-list pb-10">
           <div class="flex items-center bg-[#F7F8FA] p-3 w-[295px] relative plug-item mr-4 mb-4 cursor-pointer">
               <div class="flex flex-col ml-2">
                   <span class="text-sm truncate w-[190px]">{{t('refreshMenu')}}</span>
                   <span class="text-xs text-gray-400 mt-1 truncate w-[190px]" :title="t('refreshMenuDesc')">{{t('refreshMenuDesc')}}</span>
               </div>
               <span class="plug-item-operate" @click="refreshMenu()">{{t('refresh')}}</span>
           </div>

            <div class="flex items-center bg-[#F7F8FA] p-3 w-[295px] relative plug-item mr-4 mb-4 cursor-pointer">
                <div class="flex flex-col ml-2">
                    <span class="text-sm truncate w-[190px]">{{t('dataCache')}}</span>
                    <span class="text-xs text-gray-400 mt-1 truncate w-[190px]" :title="t('dataCacheDesc')">{{t('dataCacheDesc')}}</span>
                </div>
                <span class="plug-item-operate" @click="schemaCache()">{{t('refresh')}}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { clearSchemaCache, menuRefresh } from '@/app/api/sys'

const loading = ref<Boolean>(false)

// 数据缓存
const schemaCache = () => {
    loading.value = true
    clearSchemaCache({}).then(res => {
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
// 更新菜单
const refreshMenu = () => {
    loading.value = true
    menuRefresh({}).then(res => {
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.plug-item{
    .plug-item-operate{
        @apply text-xs absolute right-3 cursor-pointer;
        color: var(--el-color-primary);
    }
}
</style>
