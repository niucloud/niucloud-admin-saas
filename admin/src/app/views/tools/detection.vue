<template>
	<div class="main-container attachment-container" v-if="systemService">
		<el-card class="box-card !border-none" shadow="never">
			<div class="flex justify-between items-center">
				<span class="text-[20px]">{{ pageName }}</span>
			</div>
			<div class="bg-[#fff] pb-[20px] mb-3">
				<p class="pt-[20px] pb-[10px] text-sm">{{ t('serverInformation') }}</p>
				<div class="text-[14px]">
					<el-table :data="systemService.server" size="large" v-loading="loadingArr.server_load">
						<el-table-column prop="name" :label="t('environment')" align="left" min-width="200" />
						<el-table-column prop="server" :label="t('version')" align="left" min-width="140" />
					</el-table>
				</div>
			</div>
			<div class="bg-[#fff] pb-[20px] mb-3">
				<p class="py-[20px] text-sm">{{ t('systemDemand') }}</p>
				<div class="text-[14px]">
					<el-table :data="systemService.server_version" size="large" v-loading="loadingArr.server_version_load">
						<el-table-column prop="name" :label="t('environment')" align="left" min-width="200" />
						<el-table-column prop="demand" :label="t('demand')" align="left" min-width="140" />
						<el-table-column prop="server" :label="t('version')" align="left" min-width="140" />
					</el-table>
				</div>
			</div>
			<div class="bg-[#fff] pb-[20px] mb-3">
				<p class="py-[20px] text-sm">{{ t('authorityStatus') }}</p>
				<div class="text-[14px]">
					<el-table :data="systemService.system_variables" size="large" v-loading="loadingArr.system_variables_load">
						<el-table-column prop="name" :label="t('name')" align="left" min-width="200" />
						<el-table-column prop="need" :label="t('demand')" align="left" min-width="140" />
						<el-table-column :label="t('status')" align="left" min-width="140">
							<template #default="{ row }">
								<span v-if="row.status"><el-icon color="green"><Select /></el-icon></span>
								<span v-else>
									<el-icon color="red">
										<CloseBold />
									</el-icon>
								</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>

			<div class="bg-[#fff] pb-[20px] mb-3">
				<p class="py-[20px] text-sm">{{ t('process') }}</p>
				<div class="text-[14px]">
					<el-table :data="systemService.process" size="large" v-loading="loadingArr.process_load">
						<el-table-column prop="name" :label="t('name')" align="left" min-width="200" />
						<el-table-column prop="need" :label="t('demand')" align="left" min-width="140" />
						<el-table-column :label="t('status')" align="left" min-width="140">
							<template #default="{ row }">
								<span v-if="row.status"><el-icon color="green"><Select /></el-icon></span>
								<span v-else>
									<el-icon color="red">
										<CloseBold />
									</el-icon>
								</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { getSystem } from '@/app/api/tools'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const systemService = ref([])
let loadingArr = reactive({
	"server_load": true,
	"server_version_load": true,
	"system_variables_load": true,
	"process_load": true
})
const getSystemService = () => {
	loadingArr.server_load = true;
	loadingArr.server_version_load = true;
	loadingArr.system_variables_load = true;
	loadingArr.process_load = true;
	getSystem().then(res => {
		systemService.value = res.data
		loadingArr.server_load = false;
		loadingArr.server_version_load = false;
		loadingArr.system_variables_load = false;
		loadingArr.process_load = false;
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
