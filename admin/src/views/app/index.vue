<template>
    <div class="main main-container min-w-[1000px] min-h-[650px]" v-loading="loading">
		<div class="pt-[1px]" v-for="(listItems, listIndex) in appManageList" :key="listIndex" v-if="appManageList.length > 0" >
			<p class="ml-4 mt-[20px] border-l-[2px] border-[#273de3] pl-3 leading-[1] font-bold">{{ listItems.name }}</p>
			<div class="flex flex-wrap">
				<div @click="toLink(appItems.url)" class="app-item cursor-pointer ml-4 mt-[20px] pb-2 bg-[#f7f7f7]" v-for="(appItems, appIndex) in listItems.app_list" :key="appIndex">
					<div class="flex justify-center items-center">
						<img v-if="appItems.cover" class="w-[240px] h-[120px]" :src="img(appItems.cover)"/>
						<img v-else class="w-[240px] h-[120px]" src="@/assets/images/app_default.png"/>
					</div>
					<div class="text-left mt-2 w-[240px]">
						<p class="app-text text-[14px] pl-2">{{ appItems.title }}</p>
						<p class="app-text text-[12px] text-[#999] pl-2">{{ appItems.desc }}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-else-if="!loading" class="flex justify-center items-center min-w-[1000px] min-h-[650px]">
			<div>
				<img src="@/assets/images/empty.png"/>
				<p class="text-center text-gray-400">{{ t('emptyApp') }}</p>
			</div>
		</div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getAppMange } from '@/api/sys'
import { img } from '@/utils/common'
import { useRouter } from 'vue-router'
	
const appManageList = ref([])
const loading = ref(true)
const checkAppMange = () => {
	getAppMange().then(res => {
		loading.value = false
		appManageList.value = res.data;
	}).catch(() => {
		loading.value = false
	})

}
checkAppMange()

const router = useRouter()
/**
 * 链接跳转
 */
const toLink = (link) => {
    router.push(link)
}
</script>

<style lang="scss" scoped>
	.app-text {
		overflow:hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow:ellipsis;
	}
	.main {
		background-color: var(--el-bg-color-overlay);
	}
	.app-item {
		// box-shadow: 0px 6px 18px 0px rgba(82,129,187,0.1);
	}
</style>
