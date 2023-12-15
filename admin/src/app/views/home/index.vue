<template>
    <div>
        <div class="flex justify-between items-center py-[24px] pl-[62px] pr-[64px] home-head">
            <div class="flex items-center">
                <img class="w-[32x] h-[32px] rounded-full" v-if="webConfig.icon" :src="img(webConfig.icon)" alt="">
                <img class="w-[32x] h-[32px] rounded-full" v-else src="@/app/assets/images/icon-addon.png" alt="">
                <span class="ml-[10px] text-[16px] font-bold">{{webConfig.site_name}}</span>
            </div>
            <div class="flex items-center">
                <span class="mr-[12px] text-[14px]">{{userStore.userInfo.username}}</span>
                <span @click="logoutFn()" class="text-[14px] cursor-pointer text-[var(--el-color-primary)]">退出</span>
            </div>
        </div>

        <div class="w-[1200px] m-auto  mt-[62px]">
            <div class="flex justify-between items-center">
                <span class="text-[24px] font-bold">站点列表</span>
                <el-button type="primary" class="w-[90px] !h-[34px]" @click="handleChick">创建站点</el-button>
            </div>
            <div class="flex justify-between items-center mt-[18px]">
                <div class="flex items-center flex-wrap text-[14px] w-[800px]">
                    <span :class="['mr-[12px] cursor-pointer', {'text-[var(--el-color-primary)]': params.app == ''}]" @click="cutAppFn('')">所有应用</span>
                    <span :class="['mr-[12px] cursor-pointer', {'text-[var(--el-color-primary)]': params.app == item.key}]" @click="cutAppFn(item.key)" v-for="(item,index) in addonList" :key="index">{{item.title}}</span>
                </div>
                <el-input v-model="params.keywords" class="!w-[300px] !h-[34px]" placeholder="输入要搜索的站点名称" @keyup.enter.native="query">
                    <template #suffix>
                        <el-icon @click.stop="query" class="cursor-pointer">
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
            </div>

            <div class="flex flex-wrap mt-[30px]" v-loading="loading">
                <div v-for="(item, index) in tableData" :key="index" @click="selectSite(item)"
                    :class="['home-item w-[285px] box-border mb-[20px] cursor-pointer',{'mr-[20px]': index ==0 || (index+1)%4 != 0}]">
                    <div class="flex items-center px-[24px] pt-[22px] pb-[16px] bg-[#F0F2F4] home-item-head">
                        <img v-if="item.logo" class="w-[48px] h-[48px] mr-[15px] rounded-[50%] overflow-hidden" :src="img(item.logo)" />
                        <img v-else class="w-[48px] h-[48px] mr-[15px] rounded-[50%] overflow-hidden" src="@/app/assets/images/member_head.png" />
                        <div class="flex flex-col flex-1 justify-center">
                            <div class="flex items-center flex-wrap">
                                <span class="text-[16px] text-[#000] max-w-[145px] font-bold truncate mr-[10px]">{{item.site_name}}</span>
                                <div class="flex items-center justify-center min-w-[42px] h-[18px] bg-[#FF5500] rounded-tl-md rounded-br-md items-tab" v-if="item.app_name">
                                    <span class="text-[12px] text-[#fff]">{{item.app_name}}</span>
                                </div>
                            </div>
                            <span class="text-[12px] mt-[3px] text-[#555]">{{item.create_time ? item.create_time.split(" ")[0] : '--'}} 到 {{item.expire_time ? item.expire_time.split(" ")[0] : '--'}}</span>
                        </div>
                    </div>
                    <div class="px-[24px] py-[20px] text-[#6D7278]">
                        <p class="text-[14px]">站点编号：{{item.site_id}}</p>
                        <p class="text-[14px] mt-[2px]">站点套餐：{{item.group_name || '--'}}</p>
                    </div>
                </div>
                <div v-if="!tableData.length && !loading" class="m-auto">
                    <img src="@/app/assets/images/empty.png"/>
                    <p class="text-center text-gray-400">暂无站点</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'
import { CollectionTag, Search } from '@element-plus/icons-vue'
import { getHomeSite } from '@/app/api/home'
import { getWebConfig } from '@/app/api/sys'
import { img } from '@/utils/common'
import useUserStore from '@/stores/modules/user'
import storage from '@/utils/storage'
import { getInstalledAddonList } from '@/app/api/addon'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const state = reactive({
    params: {
        keywords: '',
        page: 1,
        limit: 12,
        app: '',
        sort: false
    },
    loading: false,
    tableData: []
})

const { params, loading, tableData } = toRefs(state)
const getHomeSiteFn = () => {
    state.loading = true
    getHomeSite(state.params).then(res => {
        state.tableData = res.data.data
        state.loading = false
    }).catch(() => {
        state.loading = false
    })
}
getHomeSiteFn()

// 切换应用
const cutAppFn = (app)=>{
    state.params.app = app;
    getHomeSiteFn();
}


// 网络设置
let webConfig = ref({})
const getWebConfigFn = () =>{
    getWebConfig().then(res =>{
        webConfig.value = res.data;
    })
}
getWebConfigFn()

const query = () => {
    state.params.page = 1
    getHomeSiteFn()
}

const selectSite = (site: any) => {
    storage.set({ key: 'siteId', data: site.site_id })
    storage.set({ key: 'siteInfo', data: site })
    storage.set({ key: 'comparisonSiteIdStorage', data: site.site_id })
    useUserStore().$patch((state) => {
        state.siteInfo = site
    })
    location.href = `${location.origin}/site/`
}
const logoutFn = ()=>{
    userStore.logout();
}
const toLinkFn = (link)=>{
    router.push(link)
}

/**
 * 获取应用列表
 */
const addonList = ref([])
getInstalledAddonList().then(({ data }) => {
    addonList.value = data
}).catch()

const handleChick = () => {
	ElMessage('加班加点研发中...')
}
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
    @apply rounded-none;
}

.border-color {
    border-color: var(--el-color-primary);
}

.text-color {
    color: var(--el-color-primary);
}
.home-item{
    box-shadow: 0 2px 4px 0 rgba(161,167,183,0.18);
    .items-tab span{
        transform: scale(0.9);
    }
}
.home-item:hover {
    border-color: var(--el-color-primary);
    .title {
        color: var(--el-color-primary);
    }
    .home-item-head{
        background-color: #A1A7B7;
        span{
            color: #fff !important;
        }
    }
}
.home-head{
    box-shadow: 0 4px 8px 0 rgba(28,31,55,0.04);
}
</style>
