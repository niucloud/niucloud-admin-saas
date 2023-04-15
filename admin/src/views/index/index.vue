<template>
    <div class="main-container flex" v-loading="loading">
        <div class="main-body flex-1 mr-[15px]" >
            <el-card class="box-card !border-none" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="text-[14px]">{{t('todayData')}}</span>
                    </div>
                </template>
                <el-row>
                    <el-col :span="8">
                        <el-statistic :value="statInfo.today_data.total_member_count">
                            <template #title>
                                <div class="text-[14px] mb-[9px]">{{t('memberNumb')}}</div>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="8">
                        <el-statistic :value="statInfo.today_data.total_site_count">
                            <template #title>
                                <div class="text-[14px] mb-[9px]">{{t('numberOfSites')}}</div>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="8">
                        <el-statistic :value="statInfo.today_data.total_visit_count">
                            <template #title>
                                <div class="text-[14px] mb-[9px]">{{t('numberOfVisitors')}}</div>
                            </template>
                        </el-statistic>
                    </el-col>
                </el-row>
            </el-card>

            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="text-[14px]">{{t('commonlyUsedFunction')}}</span>
                    </div>
                </template>
                <el-row :gutter="20" justify="space-between">
                    <el-col :span="4">
                        <div class="flex justify-center flex-col items-center cursor-pointer" @click="toLink('/article/list')">
                            <img class="w-[40px] h-[40px]" src="@/assets/images/index/article_list.png" alt="">
                            <span class="mt-[10px] text-[14px]">{{t('articleList')}}</span>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="flex justify-center flex-col items-center cursor-pointer" @click="toLink('/member/member')">
                            <img class="w-[40px] h-[40px]" src="@/assets/images/index/member.png" alt="">
                            <span class="mt-[10px] text-[14px]">{{t('memberManagement')}}</span>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="flex justify-center flex-col items-center cursor-pointer" @click="toLink('/member/balance')">
                            <img class="w-[40px] h-[40px]" src="@/assets/images/index/balance.png" alt="">
                            <span class="mt-[10px] text-[14px]">{{t('balanceAccount')}}</span>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="flex justify-center flex-col items-center cursor-pointer" @click="toLink('/auth/user')">
                            <img class="w-[40px] h-[40px]" src="@/assets/images/index/administrator.png" alt="">
                            <span class="mt-[10px] text-[14px]">{{t('administrator')}}</span>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="flex justify-center flex-col items-center cursor-pointer" @click="toLink('/diy/index')">
                            <img class="w-[40px] h-[40px]" src="@/assets/images/index/fitment.png" alt="">
                            <span class="mt-[10px] text-[14px]">{{t('WebDecoration')}}</span>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            
            <div class="mt-[15px] flex">
                <el-card class="box-card !border-none flex-1 mr-[15px]" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span class="text-[14px]">{{t('accessMessage')}}</span>
                        </div>
                    </template>
                    <div ref="visitStat" :style="{ width: '100%', height: '300px' }"></div>
                </el-card>
                <el-card class="box-card !border-none flex-1" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span class="text-[14px]">{{t('memberDistribution')}}</span>
                        </div>
                    </template>
                    <div ref="memberStat" :style="{ width: '100%', height: '300px' }"></div>
                </el-card>
            </div>

            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="text-[14px]">{{t('systemInfo')}}</span>
                    </div>
                </template>
                <el-descriptions>
                    <el-descriptions-item :label="t('os')">{{statInfo.system.os}}</el-descriptions-item>
                    <el-descriptions-item :label="t('phpVersions')">{{statInfo.system.php_v}}</el-descriptions-item>
                    <el-descriptions-item :label="t('productionEnvironment')">{{statInfo.system.environment}}</el-descriptions-item>
                </el-descriptions>
            </el-card>
        </div>
        <div class="main-aside w-[300px]">
            <el-card class="box-card !border-none" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="text-[14px]">{{t('versionsInfo')}}</span>
                    </div>
                </template>
                <el-descriptions :column="1">
                    <el-descriptions-item :label="t('versions')">{{statInfo.version.version}}</el-descriptions-item>
                    <el-descriptions-item :label="t('frame')">vue3.x、ElementUI、MySQL</el-descriptions-item>
                    <el-descriptions-item :label="t('channel')">{{t('officialWbsite')}}、Gitee</el-descriptions-item>
                </el-descriptions>
            </el-card>
            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="text-[14px]">{{t('serviceSupport')}}</span>
                    </div>
                </template>
                <div v-for="(item,index) in statInfo.about" :class="['flex', 'items-center', 'pt-[40px]', 'pb-[40px]',{'border-gray-300 border-b-[1px]': index==0}] ">
                    <img class="w-[120px] h-[120px] mr-[8px]" :src="img(item.image)" alt="">
                    <div>
                        <p class="text-[14px]">{{item.name}}</p>
                        <p class="text-[12px] mt-[8px] text-gray-400">{{item.desc}}</p>
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

const systemStore = useSystemStore()

let statInfo = ref({'today_data':{},system:{},version:{},about:[],visit_stat:{},member_stat:{}})
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
    //访问消息
    const visitStatChart = echarts.init(visitStat.value);
    const visitStatOption = ref({
        
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
            name: t('pageView'),
            type: 'line',
            data: []
            }
        ]
    });
    visitStatOption.value.xAxis.data = statInfo.value.visit_stat.date;
    visitStatOption.value.series[0].data = statInfo.value.visit_stat.value;
    visitStatChart.setOption(visitStatOption.value);

    // 会员分布 
    const memberStatChart = echarts.init(memberStat.value);
    const memberStatOption = ref({
        legend: {},
        tooltip: {},
        series: [
            {
                type: 'pie',
                data: []
            }
        ]
    });

    const len = statInfo.value.member_stat.type.length;
    for(let i = 0; i < len; i++){
        let obj = {};
        obj.name = statInfo.value.member_stat.type[i];
        obj.value = statInfo.value.member_stat.value[i];
        memberStatOption.value.series[0].data.push(obj);
    }
    memberStatChart.setOption(memberStatOption.value);
    window.addEventListener("resize", () => {
    //页面大小变化后Echarts也更改大小
        visitStatChart.resize();
        memberStatChart.resize();
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
</style>
