<template>
    <div class="main-container flex" v-loading="loading">
        <div class="main-body flex-1 mr-[15px]" >
            <el-card class="box-card !border-none" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="text-[15px]">{{t('dataSummarize')}}</span>
                    </div>
                </template>
				
                <el-row :gutter="20">
                    <el-col :span="6" >
                        <el-statistic :value="statInfo.today_data.norma_site_count">
                            <template #title>
                                <div class="text-[14px] mb-[9px]">{{t('normalSiteSum')}}</div>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic :value="statInfo.today_data.expire_site_count">
                            <template #title>
                                <div class="text-[14px] mb-[9px]">{{t('expireSiteSum')}}</div>
                            </template>
                        </el-statistic>
                    </el-col>
					<el-col :span="6" >
					    <el-statistic :value="statInfo.app.app_no_installed_count">
					        <template #title>
					            <div class="text-[14px] mb-[9px]">{{t('noInstallAppSun')}}</div>
					        </template>
					    </el-statistic>
					</el-col>
					<el-col :span="6">
					    <el-statistic :value="statInfo.app.app_installed_count">
					        <template #title>
					            <div class="text-[14px] mb-[9px]">{{t('installAppSun')}}</div>
					        </template>
					    </el-statistic>
					</el-col>
                </el-row>
            </el-card>

            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <el-row justify="space-between">
					<el-col :span="4">
					    <div class="w-[120px] 2xl:w-[200px]  py-[15px] rounded-[10px] flex justify-center items-center cursor-pointer border-[1px] border-[#E5E8EE]" @click="toLink('site/list')">
							<img class="w-[33px]" src="@/assets/images/index/site.png"/>
					        <span class="ml-[10px] text-[16px] text-[#666]">{{t('siteList')}}</span>
					    </div>
					</el-col>
					<el-col :span="4">
						<div class="w-[120px] 2xl:w-[200px] py-[15px] rounded-[10px] flex justify-center items-center cursor-pointer border-[1px] border-[#E5E8EE]" @click="toLink('site/group')">
							<img class="w-[33px]" src="@/assets/images/index/site_class.png"/>
						    <span class="ml-[10px] text-[16px] text-[#666]">{{t('sitePackage')}}</span>
						</div>
					</el-col>
					<el-col :span="4">
						<div class="w-[120px] 2xl:w-[200px] py-[15px] rounded-[10px] flex justify-center items-center cursor-pointer border-[1px] border-[#E5E8EE]" @click="toLink('site/list')">
							<img class="w-[33px]" src="@/assets/images/index/new_site.png"/>
						    <span class="ml-[10px] text-[16px] text-[#666]">{{t('newSite')}}</span>
						</div>
					</el-col>
					<el-col :span="4">
						<div class="w-[120px] 2xl:w-[200px] py-[15px] rounded-[10px] flex justify-center items-center cursor-pointer border-[1px] border-[#E5E8EE]" @click="toLink('/auth/user')">
							<img class="w-[33px]" src="@/assets/images/index/auth.png"/>
						    <span class="ml-[10px] text-[16px] text-[#666]">{{t('administrator')}}</span>
						</div>
					</el-col>
					<el-col :span="4">
						<div class="w-[120px] 2xl:w-[200px] py-[15px] rounded-[10px] flex justify-center items-center cursor-pointer border-[1px] border-[#E5E8EE]" @click="toLink('/tools/app_store')">
							<img class="w-[33px]" src="@/assets/images/index/app.png"/>
						    <span class="ml-[10px] text-[16px] text-[#666]">{{t('appMarketplace')}}</span>
						</div>
					</el-col>
                </el-row>
            </el-card>
            
            <div class="mt-[15px] flex">
                <el-card class="box-card !border-none flex-1 mr-[15px]" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span class="text-[15px]">{{t('newSite')}}</span>
                        </div>
                    </template>
                    <div ref="newSiteStat" :style="{ width: '100%', height: '300px' }"></div>
                </el-card>
                <el-card class="box-card !border-none flex-1" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span class="text-[15px]">{{t('siteDistribution')}}</span>
                        </div>
                    </template>
                    <div ref="siteStat" :style="{ width: '100%', height: '300px' }"></div>
                </el-card>
            </div>

            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="text-[15px]">{{t('systemInfo')}}</span>
                    </div>
                </template>
                <el-descriptions>
                    <el-descriptions-item :label="t('os')">{{statInfo.system.os}}</el-descriptions-item>
                    <el-descriptions-item :label="t('phpVersions')">{{statInfo.system.php_v}}</el-descriptions-item>
                    <el-descriptions-item :label="t('productionEnvironment')">{{statInfo.system.environment}}</el-descriptions-item>
                </el-descriptions>
            </el-card>
        </div>
        <div class="main-aside w-[305px]">
            <el-card class="box-card !border-none" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="text-[15px]">{{t('versionsInfo')}}</span>
                    </div>
                </template>
                <el-descriptions :column="1">
                    <el-descriptions-item :label="t('versions')">{{statInfo.version.version}}</el-descriptions-item>
                    <el-descriptions-item :label="t('frame')">Thinkphp6,Elementplus,mysql</el-descriptions-item>
                    <el-descriptions-item :label="t('channel')">
						<el-link class="text-color" href="https://www.niucloud.com/" target="_blank" :underline="false">{{t('officialWbsite')}}</el-link> 
						<el-link class="ml-2 text-color" href="https://gitee.com/niucloud-team/niucloud-admin" target="_blank" :underline="false">Gitee</el-link>
					</el-descriptions-item>
                </el-descriptions>
            </el-card>
            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="text-[15px]">{{t('serviceSupport')}}</span>
                    </div>
                </template>
				<div>
					<div class="flex items-center pt-[10px] pb-[25px]">
						<img class="w-[120px] h-[120px] mr-[8px]" src="@/assets/images/index/wx_qrcode.jpg" alt="">
						<div>
							<p class="text-[14px]">{{ t('officialAccount') }}</p>
							<p class="text-[14px] text-gray-400">{{ t('officialAccountDesc') }}</p>
						</div>
					</div>
					<div class="flex items-center pt-[25px] pb-[30px] border-gray-300 border-b-[1px]">
						<img class="w-[120px] h-[120px] mr-[8px]" src="@/assets/images/index/wework_qrcode.png" alt="">
						<div>
							<p class="text-[14px]">{{ t('WeCom') }}</p>
							<p class="text-[14px] text-gray-400">{{ t('WeComDesc') }}</p>
						</div>
					</div>
					<div class="flex items-center mt-3">
						<div class="mr-[30px] flex">
							<icon name="iconfont-icondianhua" class="leading-[1]" size="20px" color="#000"></icon>
							<p class="text-[14px] ml-2">{{ t('tel') }}</p>
						</div>
						<div>
							<p class="text-[14px]">400-886-7993</p>
						</div>
					</div>
				</div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref,onMounted } from 'vue'
import useSystemStore from '@/stores/modules/system'
import { t } from '@/lang'
import { getStatInfo } from '@/api/stat'
import { ElMessage, FormRules } from 'element-plus'
import * as echarts from 'echarts'
import { img } from '@/utils/common'
import { useRouter } from 'vue-router'
const loading = ref(true)
const visitStat = ref<any>(null)
const memberStat = ref<any>(null)

const newSiteStat = ref<any>(null)
const siteStat = ref<any>(null)

const systemStore = useSystemStore()

let statInfo = ref({'today_data':{},system:{},version:{},about:[],site_stat:{},site_group_stat:{}, app:{}})
const getStatInfoFn = async (id: number = 0) => {
    statInfo.value = await (await getStatInfo()).data
    loading.value = false;
    setTimeout(() => {
        drawChart()
    }, 20)
}
getStatInfoFn()

// 绘制折线图
const drawChart = () => {
    //新增站点
    const newSiteStatChart = echarts.init(newSiteStat.value);
    const newSiteStatOption = ref({
        
        legend: {},
        xAxis: {
            data: []
        },
        yAxis: {},
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
            name: t('newSite'),
            type: 'line',
            data: []
            }
        ]
    });
    newSiteStatOption.value.xAxis.data = statInfo.value.site_stat.date;
    newSiteStatOption.value.series[0].data = statInfo.value.site_stat.value;
    newSiteStatChart.setOption(newSiteStatOption.value);

    // 站点分布 
    const siteStatChart = echarts.init(siteStat.value);
    const siteStatOption = ref({
        legend: {
			bottom:"bottom"
		},
        tooltip: {},
        series: [
            {
                type: 'pie',
                data: []
            }
        ]
    });

    const len = statInfo.value.site_group_stat.type.length;
    for(let i = 0; i < len; i++){
        let obj = {};
        obj.name = statInfo.value.site_group_stat.type[i];
        obj.value = statInfo.value.site_group_stat.value[i];
        siteStatOption.value.series[0].data.push(obj);
    }
    siteStatChart.setOption(siteStatOption.value);
    window.addEventListener("resize", () => {
    //页面大小变化后Echarts也更改大小
        newSiteStatChart.resize();
        siteStatChart.resize();
    })
}

const router = useRouter()
/**
 * 链接跳转
 */
const toLink = (link) => {
    router.push(link)
}
</script>

<style lang="scss" scoped>
.card-header > span{
    line-height: 21px;
}
.text-color{
    color: var(--el-menu-active-color);
}
</style>
