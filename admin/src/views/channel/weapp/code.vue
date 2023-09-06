<template>
    <div class="main-container min-h-[300px]" v-loading="loading">
        <div class="flex ml-[18px] justify-between items-center mt-[20px]" v-if="!loading">
            <span class="text-[20px]">{{pageName}}</span>
        </div>
		<el-card class="box-card !border-none" shadow="never" v-if="!loading">
			<el-collapse v-model="activeNames">
			  <el-collapse-item :title="t('operatePrompt')" name="1">
				<div>
				  <p class="indent-4">{{ t('operatePromptTipsOne') }}: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html</p>
				  <p class="indent-4">{{ t('operatePromptTipsTwo') }}</p>
				</div>
			  </el-collapse-item>
			</el-collapse>
			<el-row class="mt-[50px]">
			    <el-col :span="12">
					<div class="p-[20px]">
						<p class="flex items-center"><span class="block w-[3px] h-[14px] bg-[#273de3] mr-[10px] bg-primary"></span><span class="text-[14px] font-bold">{{ t('weappInfo') }}</span></p>
						<div class="mt-[30px]">
							<div class="flex items-center justify-center mb-[30px]">
								<img class="w-[150px] h-[150px]" src=""/>
							</div>
							<div class="flex">
								<div class="mr-[30px] w-1/2 ">
									<p class="text-[12px] mt-2 text-right"><span class="text-[#999]">{{ t('weappName') }}</span></p>
									<p class="text-[12px] mt-2 text-right"><span class="text-[#999]">{{ t('weappId') }}</span></p>
									<p class="text-[12px] mt-2 text-right"><span class="text-[#999]">{{ t('weappOriginalId') }}</span></p>
								</div>
								<div class="w-1/2">
									<p class="text-[12px] mt-2 text-left">{{ weapp_config.weapp_name }}</p>
									<p class="text-[12px] mt-2 text-left">{{ weapp_config.app_id }} </p>
									<p class="text-[12px] mt-2 text-left">{{ weapp_config.weapp_original }} </p>
								</div>
							</div>
						</div>
					</div>
				</el-col>
			    <el-col :span="12">
					<div class="p-[20px]">
						<p class="flex items-center"><span class="block w-[3px] h-[14px] bg-[#273de3] mr-[10px] bg-primary"></span><span class="text-[14px] font-bold">{{ t('codeDown') }}</span></p>
						<div class="mt-[30px]">
							<div style="height: 300px">
							    <div class="flex">
							        <div>
							            <div
							                class="w-[16px] h-[16px] flex items-center bg-[#D1EBFF] border-[1px] border-[#0091FF] rounded-[999px]">
							                <div class="w-[8px] h-[8px] mx-auto bg-[#0091FF] rounded-[999px]"></div>
							            </div>
							           <div class="w-[2px] h-[100px] bg-[#D1EBFF] mx-auto"></div>
							        </div>
									<div class="ml-[20px] leading-[1]">
										<span class="leading-[1] text-[14px]">{{ t('codeDownOneTips') }}</span>
										<div class="mt-3">
											<el-button type="primary" class="w-[100px]" @click="showDialog = true">{{ t('downWeappCode') }}</el-button>
										</div>
									</div>
							    </div>
								<div class="flex">
								    <div>
								        <div
								            class="w-[16px] h-[16px] flex items-center bg-[#D1EBFF] border-[1px] border-[#0091FF] rounded-[999px]">
								            <div class="w-[8px] h-[8px] mx-auto bg-[#0091FF] rounded-[999px]"></div>
								        </div>
								       <div class="w-[2px] h-[100px] bg-[#D1EBFF] mx-auto"></div>
								    </div>
									<div class="ml-[20px] leading-[1]">
										<span class="leading-[1] text-[14px]">{{ t('codeDownTwoDesc') }}</span>
										<div class="mt-2">
											<p class="text-[12px] text-[#999]">{{ t('codeDownTwoTips') }}</p>
										</div>
									</div>
								</div>
								<div class="flex">
								    <div>
								        <div
								            class="w-[16px] h-[16px] flex items-center bg-[#D1EBFF] border-[1px] border-[#0091FF] rounded-[999px]">
								            <div class="w-[8px] h-[8px] mx-auto bg-[#0091FF] rounded-[999px]"></div>
								        </div>
								    </div>
								    <div class="ml-[20px] leading-[1]">
								    	<span class="leading-[1] text-[14px]">{{ t('codeDownThreeDesc') }}</span>
								    	<div class="mt-2">
								    		<p class="text-[12px] text-[#999]">{{ t('codeDownThreeTips') }}</p>
								    	</div>
								    </div>
								</div>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-dialog v-model="showDialog" :title="t('versionCode')" width="650px" :destroy-on-close="true">
			<el-table :data="weappTableData.data" size="large" v-loading="weappTableData.loading">
			    <el-table-column prop="version" :label="t('version')" min-width="100" />
				<el-table-column prop="create_time" :label="t('createTime')" min-width="150" />
				<el-table-column :label="t('operation')" fixed="right" width="100">
				    <template #default="{ row }">
				        <el-button type="danger" link @click="down(row)" >{{ t('down') }}</el-button>
				    </template>
				</el-table-column>
			</el-table>
			<div class="mt-[16px] flex justify-end">
			    <el-pagination v-model:current-page="weappTableData.page" v-model:page-size="weappTableData.limit" layout="total, prev, pager, next" :total="weappTableData.total"  @current-change="loadWeappTemplateList" />
			</div>
		
		    <template #footer>
		        <span class="dialog-footer">
		            <el-button type="primary" @click="showDialog = false">{{ t('close') }}</el-button>
		        </span>
		    </template>
		</el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { getWeappConfig, getVersionList, versionDown } from '@/api/weapp'
import { t } from '@/lang'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import axios, { HttpStatusCode } from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const loading = ref(true)
const activeNames = ref('1')
const showDialog = ref(false)

const weappTableData = reactive({
    page: 1,
    limit: 5,
    total: 0,
    loading: true,
    data: []
})

const weapp_config = ref([])
const checkWeappConfig = () =>{
	getWeappConfig().then(res => {
		if(res.data.app_id != ''){
			loading.value = false
			weapp_config.value = res.data
		}else{
			ElMessage(t('weappTips'))
			setTimeout(function() {
				history.back('/channel/weapp/config')
			}, 500);
		}
	})
}
checkWeappConfig()

/**
 * 获取版本列表
 */
const loadWeappTemplateList = (page: number = 1) => {
    weappTableData.loading = true
    weappTableData.page = page

    getVersionList({
        page: weappTableData.page,
        limit: weappTableData.limit,
		type: 'weapp'
    }).then(res => {
        weappTableData.loading = false
        weappTableData.data = res.data.data
        weappTableData.total = res.data.total
    }).catch(() => {
        weappTableData.loading = false
    })
}
loadWeappTemplateList()

const down = (item) => {
	versionDown(item.id).then(res=>{
		let blob = new Blob([res]);
		let url = window.URL.createObjectURL(blob); // 创建 url 并指向 blob
		let a = document.createElement('a');
		a.href = url;
		a.download = t('weappVersion') + item.version + '.zip';
		a.click();
		window.URL.revokeObjectURL(url); // 释放该 url
	})
}

</script>

<style lang="scss" scoped>
	.el-collapse {
		border: 0px !important
		
	}
	.el-collapse-item .el-collapse-item__wrap {
		border: 0px !important
	}
</style>
