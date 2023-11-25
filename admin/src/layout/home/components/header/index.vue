<template>
    <el-container :class="['h-full px-[10px]',{'layout-header border-b border-color': !dark}]" >
        <el-row class="w-100 h-full w-full" justify="end">
            <el-col :span="12">
                <div class="right-panel h-full flex items-center justify-end">
                    <!-- 刷新当前页 -->
                    <div class="navbar-item flex items-center h-full cursor-pointer" @click="refreshRouter">
                        <icon name="element-Refresh" />
                    </div>
                    <!-- 预览 只有站点时展示-->
                    <i class="iconfont iconlingdang-xianxing cursor-pointer px-[8px]" :title="t('newInfo')" v-if="appType == 'site'"></i>
					<!-- 切换首页 -->
					<div class="navbar-item flex items-center h-full cursor-pointer"  v-if="appType == 'site'" @click="checkIndexList">
						<icon name="iconfont-iconqiehuan" :title="t('indexSwitch')"/>
					</div>
                    <!-- 切换语言 -->
                    <div class="navbar-item flex items-center h-full cursor-pointer">
                        <switch-lang />
                    </div>
                    <!-- 切换全屏 -->
                    <div class="navbar-item flex items-center h-full cursor-pointer" @click="toggleFullscreen">
                        <icon name="iconfont-icontuichuquanping" v-if="isFullscreen" />
                        <icon name="iconfont-iconquanping" v-else />
                    </div>
                    <!-- 布局设置 -->
                    <div class="navbar-item flex items-center h-full cursor-pointer">
                        <layout-setting />
                    </div>
                    <!-- 用户信息 -->
                    <div class="navbar-item flex items-center h-full cursor-pointer">
                        <user-info />
                    </div>
                </div>
            </el-col>
        </el-row>
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
import { computed, ref, onMounted, watch } from 'vue'
import layoutSetting from './layout-setting.vue'
import switchLang from './switch-lang.vue'
import userInfo from './user-info.vue'
import { useFullscreen } from '@vueuse/core'
import useSystemStore from '@/stores/modules/system'
import useAppStore from '@/stores/modules/app'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@/lang'
import storage from '@/utils/storage'
import { getIndexList, setIndexList } from '@/app/api/sys'

const router = useRouter()
const appType = storage.get('app_type')
const { toggle: toggleFullscreen, isFullscreen } = useFullscreen()
const systemStore = useSystemStore()
const appStore = useAppStore()
const route = useRoute()
const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)

const dark = computed(()=>{
    return systemStore.dark
})

// 检测登录 start
const detectionLoginDialog = ref(false)
const comparisonToken = ref('')
const comparisonSiteId = ref('')
if (storage.get('comparisonTokenStorage')) {
    comparisonToken.value = storage.get('comparisonTokenStorage')
    // storage.remove(['comparisonTokenStorage']);
}
if (storage.get('comparisonSiteIdStorage')) {
    comparisonSiteId.value = storage.get('comparisonSiteIdStorage')
    // storage.remove(['comparisonSiteIdStorage']);
}
// 监听标签页面切换
document.addEventListener('visibilitychange', e => {
    if (document.visibilityState === 'visible' && (comparisonSiteId.value != storage.get('siteId') || comparisonToken.value != storage.get('token'))) {
        detectionLoginDialog.value = true
    }
})

const detectionLoginFn = () => {
    detectionLoginDialog.value = false
    location.reload();
}
// 检测登录 end

onMounted(() => {
    // 监听窗体宽度变化
    window.onresize = () => {
        return (() => {
            screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        })()
    }
})

watch(screenWidth, () => {
    if (screenWidth.value < 992) {
        if (!systemStore.menuIsCollapse) systemStore.toggleMenuCollapse(true)
    } else {
        if (systemStore.menuIsCollapse) systemStore.toggleMenuCollapse(false)
    }
})

// 菜单栏展开折叠
const toggleMenuCollapse = () => {
    systemStore.$patch((state) => {
        if (screenWidth.value < 768) {
            state.menuDrawer = true
            state.menuIsCollapse = false
        } else {
            systemStore.toggleMenuCollapse(!systemStore.menuIsCollapse)
        }
    })
}

// 刷新路由
const refreshRouter = () => {
    if (!appStore.routeRefreshTag) return
    appStore.refreshRouterView()
}

// 面包屑导航
const breadcrumb = computed(() => {
    const matched = route.matched.filter(item => { return item.meta.title })
    if (matched[0] && matched[0].path == '/') matched.splice(0, 1)
    return matched
})

// 返回上一页
const backFn = () => {
    router.go(-1)
}

const indexList = ref();
const showDialog = ref(false)
const checkIndexList = () => {
	getIndexList().then(res => {
		showDialog.value = true
		indexList.value = res.data
		for(let i = 0 ; i < indexList.value.length; i ++){
			if(indexList.value[i].is_use == 1){
				index_path.value = indexList.value[i].view_path
			}
		}
	})
}

const index_path = ref('');
const submitIndex = () => {
	setIndexList({
		view_path: index_path.value
	}).then(() => {
	    showDialog.value = false
	    router.go(0)
	})
}
</script>

<style lang="scss" scoped>
.layout-header{
    position: relative;
    z-index: 5;
    border-bottom: 1px solid #e8e9eb;
}
.navbar-item {
    padding: 0 8px;
    &:hover {
        background-color: var(--el-bg-color-page);
    }
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
