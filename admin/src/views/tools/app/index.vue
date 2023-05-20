<template>
    <div class="main-container h-[500px] w-full p-5 bg-white" v-loading="loading">
        <el-tabs
            v-model="activeName"
            type="card"
            class="demo-tabs"
            @tab-click="handleClick"
        >
            <el-tab-pane :label="t('installLabel')" name="installed">
                <div class="flex flex-wrap px-2 plug-list pb-10">
                    <div v-for="(item,index) in localList.installed" :key="index+'a'" class="flex items-center bg-[#F7F8FA] cursor-pointer p-3 w-[295px] relative plug-item mr-4 mb-4"  @click="getAddonDetialFn(item)">
                        <img class="w-[40px] h-[40px] rounded-sm" v-if="item.icon" :src="img(item.icon)" alt="">
                        <img class="w-[40px] h-[40px] rounded-sm" v-else src="@/assets/images/icon-addon.png" alt="">
                        <div class="flex flex-col ml-2">
                            <span class="text-sm truncate w-[190px]">{{item.title}}</span>
                            <span class="text-xs text-gray-400 truncate w-[190px]">{{item.desc}}</span>
                        </div>
                        <span class="plug-item-operate" @click.stop="uninstallAddonFn(item.key)">{{t('unload')}}</span>
                    </div>
                    
                    <el-empty :description="t('noPlug')" v-if="!localList.installed.length" class="mx-auto" />
                </div>
            </el-tab-pane>
            <el-tab-pane :label="t('uninstalledLabel')" name="uninstalled">
                <div class="flex flex-wrap px-2 plug-list pb-10">
                    <div v-for="(item,index) in localList.uninstalled" :key="index+'a'" class="flex items-center bg-[#F7F8FA] p-3 w-[295px] relative plug-item mr-4 mb-4"  @click="getAddonDetialFn(item)">
                        <img class="w-[40px] h-[40px] rounded-sm" v-if="item.icon" :src="img(item.icon)" alt="">
                        <img class="w-[40px] h-[40px] rounded-sm" v-else src="@/assets/images/icon-addon.png" alt="">
                        <div class="flex flex-col ml-2">
                            <span class="text-sm truncate w-[190px]">{{item.title}}</span>
                            <span class="text-xs text-gray-400 truncate w-[190px]">{{item.desc}}</span>
                        </div>
                        <span class="plug-item-operate" @click.stop="installAddonFn(item.key)">{{t('install')}}</span>
                    </div>
                    
                    <el-empty :description="t('noPlug')" v-if="!localList.uninstalled.length" class="mx-auto" />
                </div>
            </el-tab-pane>
        </el-tabs>

        <!-- 详情 -->
        <el-dialog v-model="appStoreShowDialog" :title="t('plugDetail')" width="500px" :destroy-on-close="true">
            <el-form :model="appStoreInfo" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="cashOutLoading">
                <el-form-item :label="t('title')">
                    <div class="input-width"> {{ appStoreInfo.title }} </div>
                </el-form-item>
                <el-form-item :label="t('desc')">
                    <div class="input-width"> {{ appStoreInfo.desc }} </div>
                </el-form-item>
                <el-form-item :label="t('author')">
                    <div class="input-width"> {{ appStoreInfo.author }} </div>
                </el-form-item>
                 <el-form-item :label="t('version')">
                    <div class="input-width"> {{ appStoreInfo.version }} </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="appStoreShowDialog = false">{{t('confirm')}}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import {  getAddonLocal, uninstallAddon, installAddon, getAddonDetial } from '@/api/addon'
import { useClipboard } from '@vueuse/core'
import type { TabsPaneContext } from 'element-plus'
import { img } from '@/utils/common'
const activeName = ref('installed')

let loading = ref<Boolean>(false);
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

/**
 * 本地下载的插件列表 
 */
let localList = ref({
    "installed": [],
    "uninstalled": []
})
const localListFn = () => {
    loading.value = true;
    getAddonLocal({}).then(res => {
        let data = res.data
        data.forEach(element => {
            if(element.install_info && Object.keys(element.install_info)?.length){
                localList.value.installed.push(element)
            }else{
                localList.value.uninstalled.push(element)
            }
        });
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    })
}
localListFn()

// 安装
const installAddonFn = (key) => {
    loading.value = true;
    installAddon({addon:key}).then(res => {
        localListFn()
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    })
}

// 卸载 
const uninstallAddonFn = (key) => {
    uninstallAddon({addon:key}).then(res => {
        localListFn()
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    })
}

// 插件详情
let appStoreShowDialog = ref(false); 
let appStoreInfo = ref({}); 
const getAddonDetialFn = (data)=>{
    appStoreShowDialog.value = true;
    appStoreInfo.value = data;
    console.log("插件详情",data);
    
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
