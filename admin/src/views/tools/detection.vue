<template>
    <div class="main-container attachment-container" v-if="systemService">
		<div class="bg-[#fff] pb-[20px] mb-3">
			<p class="pt-[20px] pb-[10px] pl-[20px] ">{{ t('serverInformation') }}</p>
			<div class="px-[20px] text-[14px]">
				<el-row class="py-[10px] items" v-for="(serverItems, serverIndex) in systemService.server">
				    <el-col :span="12" class="pl-[10px]">
						<span > {{ serverItems.name }}</span>
					</el-col>
					<el-col :span="12" class="pl-[10px]">
						<span>{{ serverItems.server }}</span>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="bg-[#fff] pb-[20px] mb-3">
			<p class="py-[20px] pl-[20px] ">{{ t('systemDemand') }}</p>
			<div class="px-[20px] text-[14px]">
				<el-row class="pb-[10px] items">
				    <el-col :span="8" class="pl-[10px]">
						<span >{{ t('environment') }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span>{{ t('demand') }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span>{{ t('version') }}</span>
					</el-col>
				</el-row>
				<el-row class="pb-[10px] items" v-for="(versionItems, versionIndex) in systemService.server_version">
				    <el-col :span="8" class="pl-[10px]">
						<span >{{ versionItems.name }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span >{{ versionItems.demand }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span >{{ versionItems.server }}</span>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="bg-[#fff] pb-[20px] mb-3">
			<p class="py-[20px] pl-[20px] ">{{ t('authorityStatus') }}</p>
			<div class="px-[20px] text-[14px]">
				<el-row class="py-[10px] items" >
				    <el-col :span="8" class="pl-[10px]">
						<span>{{ t('name') }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span>{{ t('demand') }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span>{{ t('status') }}</span>
					</el-col>
				</el-row>
				<el-row class="py-[10px] items" v-for="(variablesItems, variablesIndex) in systemService.system_variables">
				    <el-col :span="8" class="pl-[10px]">
						<span >{{ variablesItems.name }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span >{{ variablesItems.need }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span v-if="variablesItems.status"><el-icon color="green"><Select /></el-icon></span>
						<span v-else><el-icon color="red"><CloseBold /></el-icon></span>
					</el-col>
				</el-row>
				<el-row class="py-[10px] items" v-for="(dirsItems, dirsIndex) in systemService.dirs_list">
				    <el-col :span="8" class="pl-[10px]">
						<span>{{ dirsItems.name }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span>{{ dirsItems.demand }}</span>
					</el-col>
					<el-col :span="8" class="pl-[10px]">
						<span v-if="dirsItems.is_readable && dirsItems.is_write"><el-icon color="green"><Select /></el-icon></span>
						<span v-else><el-icon color="red"><CloseBold /></el-icon></span>
					</el-col>
				</el-row>
			</div>
		</div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { getSystem } from '@/api/tools'

const systemService = ref([])
const getSystemService = () => {
	getSystem().then(res=>{
		systemService.value = res.data;
	})
}
getSystemService()
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.items {
	border-bottom: 1px solid #eee;
}
</style>
