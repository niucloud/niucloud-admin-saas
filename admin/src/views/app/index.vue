<template>
    <div class="main-container bg-[#fff] min-w-[1000px] min-h-[650px]">
		<div class="pt-[1px]" v-for="(listItems, listIndex) in appManageList" :key="listIndex">
			<p class="ml-4 mt-[20px] border-l-[2px] border-[#273de3] pl-4 leading-[1]">{{ listItems.name }}</p>
			<div class="flex flex-wrap" v-if="isTrue == 0">
				<div @click="toLink(appItems.url)" class="flex cursor-pointer ml-4 mt-[20px] w-[240px] p-[10px] border-[1px] border-[#eee] border-[solid]" v-for="(appItems, appIndex) in listItems.app_list" :key="appIndex">
					<div class="flex justify-center items-center mr-[10px] min-w-[50px]">
						<img v-if="appItems.icon" class="w-[50px] h-[50px]" :src="img(appItems.icon)"/>
					</div>
					<div class="w-[150px]">
						<p class="app-text text-[14px] text-[#666]">{{ appItems.title }}</p>
						<p class="app-text text-[12px] text-[#999]">{{ appItems.desc }}</p>
					</div>
				</div>
			</div>
			<div class="flex flex-wrap" v-if="isTrue == 1">
				<div @click="toLink(appItems.url)" class="cursor-pointer ml-4 mt-[20px] w-[140px] p-[10px] border-[1px] border-[#eee] border-[solid]" v-for="(appItems, appIndex) in listItems.app_list" :key="appIndex">
					<div class="flex justify-center items-center">
						<img v-if="appItems.cover" class="w-[110px] h-[110px]" :src="img(appItems.cover)"/>
					</div>
					<div class="text-center mt-2">
						<p class="app-text text-[14px] text-[#666]">{{ appItems.title }}</p>
						<p class="app-text text-[12px] text-[#999]">{{ appItems.desc }}</p>
					</div>
				</div>
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
const isTrue = ref(1)
const checkAppMange = () => {
	getAppMange().then(res=>{
		appManageList.value = res.data;
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
</style>
