<template>
    <el-container class="h-[60px] bg-[#2B303B] layout-admin flex items-center justify-between px-[15px] text-white" >
        <!-- :class="['h-full px-[10px]',{'layout-header border-b border-color': !dark}]"  -->
        <div class="flex items-center text-[14px]  leading-[1]">
            <span class="iconfont icontuodong !text-[25px] mr-[6px]"></span>

            <template v-for="(item, index) in oneMenuData">
                <template v-if="item.meta.show">
                    <span class="mx-2 text-[#4F5563] mx-[15px]" v-if="index">|</span>
                    <span class="cursor-pointer" @click="router.push({ name: item.name })" >
                        {{ item.meta.short_title || item.meta.title }}
                    </span>
                </template>
            </template>
        </div>
        <div class="right-panel h-full flex items-center justify-end">
            <!-- 刷新当前页 -->
            <div class="navbar-item flex items-center h-full cursor-pointer" @click="refreshRouter">
                <icon name="element-Refresh" />
            </div>
            <!-- 用户信息 -->
            <div class="navbar-item flex items-center h-full cursor-pointer">
                <user-info />
            </div>
        </div>
        <input type="hidden" v-model="comparisonToken">
        <input type="hidden" v-model="comparisonSiteId">

        <el-dialog v-model="detectionLoginDialog" :title="t('layout.detectionLoginTip')" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <span>{{ t('layout.detectionLoginContent') }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="detectionLoginFn">{{ t('layout.detectionLoginOperation') }}</el-button>
                </span>
            </template>
        </el-dialog>

		<el-dialog v-model="showDialog" :title="t('indexTemplate')" width="550px" :destroy-on-close="true" >
			<div class="flex flex-wrap">
				<div v-for="(items, index) in indexList" :key="index" v-if="index_path == ''">
					<div @click="index_path = items.view_path" class="index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer" :class="items.is_use == 1 ? 'bg-primary text-[#fff]' : '' ">
						<span >{{ items.name }}</span>
					</div>
				</div>
				<div v-for="(itemTo, indexTo) in indexList" :key="indexTo" v-else>
					<div @click="index_path = itemTo.view_path" class="index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer" :class="index_path == itemTo.view_path ? 'bg-primary text-[#fff]' : '' ">
						<span >{{ itemTo.name }}</span>
					</div>
				</div>
			</div>
		    <template #footer>
		        <span class="dialog-footer">
		            <el-button type="primary" @click="submitIndex">{{ t('confirm') }}</el-button>
		        </span>
		    </template>
		</el-dialog>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useUserStore from '@/stores/modules/user'
import useAppStore from '@/stores/modules/app'
import { useRouter } from 'vue-router'
import { t } from '@/lang'
import storage from '@/utils/storage'
import userInfo from './user-info.vue'
import { findFirstValidRoute } from "@/router/routers"

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const routers = userStore.routers

const oneMenuData = ref<Record<string, any>[]>([])
routers.forEach(item => {
    item.original_name = item.name
    if (item.children && item.children.length) {
        item.name = findFirstValidRoute(item.children)
    }
    oneMenuData.value.push(item)
})

// 检测登录 start
const detectionLoginDialog = ref(false)
const comparisonToken = ref('')
const comparisonSiteId = ref('')
if (storage.get('comparisonTokenStorage')) {
    comparisonToken.value = storage.get('comparisonTokenStorage')
}
if (storage.get('comparisonSiteIdStorage')) {
    comparisonSiteId.value = storage.get('comparisonSiteIdStorage')
}
// 监听标签页面切换
document.addEventListener('visibilitychange', e => {
    if (document.visibilityState === 'visible' && (comparisonSiteId.value != storage.get('siteId') || comparisonToken.value != storage.get('token'))) {
        detectionLoginDialog.value = true
    }
})

const detectionLoginFn = () => {
    detectionLoginDialog.value = false
    location.reload()
}
// 检测登录 end

// 刷新路由
const refreshRouter = () => {
    if (!appStore.routeRefreshTag) return
    appStore.refreshRouterView()
}

storage.set({ key: 'currHeadMenuName', data: "" })
</script>

<style lang="scss" scoped>
.layout-header{
    position: relative;
    z-index: 5;
    border-bottom: 1px solid #e8e9eb;
}
.navbar-item {
    padding: 0 8px;
    color: #fff;
}
.index-item {
	border: 1px solid;
	border-color: var(--el-color-primary);
    &:hover {
		color: #fff;
        background-color: var(--el-color-primary);
    }
}
</style>
<style>
.layout-admin .el-dropdown{
    color: #fff;
}
</style>
