<template>
    <div class="bg-[#FAFAFA] box-border pb-[77px]">
        <div class="main-container" v-loading="loading">
            <div class="pt-[60px]">
                <div class="flex items-center">
                    <span class="text-[24px] font-600 text-[#242424] leading-[33px]">欢迎使用niucloud-admin</span>
                    <div class="ml-[12px] bg-[#333] flex items-center py-[3px] px-[6px] rounded">
                        <img class="w-[16px] h-[16px]" src="@/app/assets/images/SaaS.png" />
                        <span class="text-[12px] text-[#fff] font-600 leading-[16px] ml-[3px]">SAAS版</span>
                    </div>
                </div>
                <div class="flex items-center mt-[12px]">
                    <img class="w-[12px] h-[12px]" src="@/app/assets/images/versions.png" />
                    <span class="ml-[7px] text-[16px] font-600 text-[#424242] leading-[16px] font-[600]">{{ statInfo.version.version }}</span>
                    <el-link class="text-color ml-[30px] text-[14px] leading-[20px]" href="https://www.niucloud.com/"
                        target="_blank" :underline="false">{{ t("officialWbsite") }}</el-link>
                    <el-link class="ml-[12px] text-color text-[14px] leading-[20px]"
                        href="https://gitee.com/niucloud-team/niucloud.git" target="_blank"
                        :underline="false">Gitee</el-link>
                </div>
            </div>
            <div
                class="px-[32px] pt-[24px] pb-[14px] bg-[#fff] border-[1px] border-[#E9EBF0] border-solid mt-[42px] box-border">
                <el-card class="box-card !border-none profile-data" shadow="never"
                    :body-style="{ padding: '49px 32px 20px' }">
                    <template #header>
                        <div class="card-header mb-[20px]">
                            <span class="text-[18px] font-[600] text-[#333] leading-[24px]">{{
                                t("dataSummarize")
                            }}</span>
                            <span class="text-[12px] text-[#666] leading-[16px] ml-[18px]">更新时间 : </span>
                            <span class="text-[12px] text-[#666] leading-[16px]">{{ time }}</span>
                        </div>
                    </template>

                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div @click="toHref('site/list','1')" class="cursor-pointer">
                                <el-statistic :value="statInfo.today_data.norma_site_count" >
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("normalSiteSum") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div @click="toHref('site/list','2')" class="cursor-pointer">
                                <el-statistic :value="statInfo.today_data.expire_site_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("expireSiteSum") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div @click="toHref('/app_manage/app_store','uninstalled')" class="cursor-pointer">
                                <el-statistic :value="statInfo.app.app_no_installed_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("noInstallAppSun") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div @click="toHref('/app_manage/app_store','installed')" class="cursor-pointer">
                                <el-statistic :value="statInfo.app.app_installed_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("installAppSun") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                <div class="flex justify-between mt-[15px]">
                    <div class="w-[258px] h-[132px] bg-[#F9F9F9] flex justify-center flex-col items-center cursor-pointer"
                        @click="toLink('site/list')">
                        <img class="w-[52px]" src="@/app/assets/images/index/site1.png" />
                        <span class="text-[16px] text-[#333]">{{ t("siteList") }}</span>
                    </div>
                    <div class="w-[258px] h-[132px] bg-[#F9F9F9] flex justify-center flex-col items-center cursor-pointer"
                        @click="toLink('site/group')">
                        <img class="w-[52px]" src="@/app/assets/images/index/site_class1.png" />
                        <span class="text-[16px] text-[#333]">{{ t("sitePackage") }}</span>
                    </div>
                    <div class="w-[258px] h-[132px] bg-[#F9F9F9] flex justify-center flex-col items-center cursor-pointer"
                        @click="toLink('site/list')">
                        <img class="w-[52px]" src="@/app/assets/images/index/new_site1.png" />
                        <span class="text-[16px] text-[#333]">{{ t("newSite") }}</span>
                    </div>
                    <div class="w-[258px] h-[132px] bg-[#F9F9F9] flex justify-center flex-col items-center cursor-pointer"
                        @click="toLink('/admin/site/user')">
                        <img class="w-[52px]" src="@/app/assets/images/index/auth1.png" />
                        <span class="text-[16px] text-[#333]">{{
                            t("administrator")
                        }}</span>
                    </div>
                    <div class="w-[258px] h-[132px] bg-[#F9F9F9] flex justify-center flex-col items-center cursor-pointer"
                        @click="toApplication">
                        <img class="w-[52px]" src="@/app/assets/images/index/app1.png" />
                        <span class="text-[16px] text-[#333]">{{
                            t("appMarketplace")
                        }}</span>
                    </div>
                </div>
                <div class="mt-[60px] flex site">
                    <el-card class="box-card !border-none flex-1 mr-[30px]" shadow="never"
                        :body-style="{ paddingLeft: '0' }">
                        <template #header>
                            <div class="card-header">
                                <span class="text-[18px] text-[#333] font-[600]">{{
                                    t("newSite")
                                }}</span>
                            </div>
                        </template>
                        <div ref="newSiteStat" :style="{ width: '100%', height: '300px' }"></div>
                    </el-card>
                    <el-card class="box-card !border-none flex-1" shadow="never" :body-style="{ paddingLeft: '0' }">
                        <template #header>
                            <div class="card-header">
                                <span class="text-[18px] text-[#333] font-[600]">{{
                                    t("siteDistribution")
                                }}</span>
                            </div>
                        </template>
                        <div ref="siteStat" :style="{ width: '100%', height: '300px' }"></div>
                    </el-card>
                </div>

                <el-card class="box-card !border-none mt-[15px] site" shadow="never" :body-style="{ marginTop: '13px' }">
                    <template #header>
                        <div class="card-header">
                            <span class="text-[18px] font-[600] text-[#333]">{{
                                t("systemInfo")
                            }}</span>
                        </div>
                    </template>
                    <el-descriptions>
                        <el-descriptions-item :label="t('os')">{{
                            statInfo.system.os
                        }}</el-descriptions-item>
                        <el-descriptions-item :label="t('phpVersions')">{{
                            statInfo.system.php_v
                        }}</el-descriptions-item>
                        <el-descriptions-item :label="t('productionEnvironment')">{{
                            statInfo.system.environment
                        }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import useSystemStore from "@/stores/modules/system";
import { t } from "@/lang";
import { getStatInfo } from "@/app/api/stat";
import * as echarts from "echarts";
import { img } from "@/utils/common";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import useStyleStore from '@/stores/modules/style'
const loading = ref(true);
const visitStat = ref<any>(null);
const memberStat = ref<any>(null);

const newSiteStat = ref<any>(null);
const siteStat = ref<any>(null);

const systemStore = useSystemStore();
const styleStore = useStyleStore()

let statInfo = ref({
    today_data: {},
    system: {},
    version: {},
    about: [],
    site_stat: {},
    site_group_stat: {},
    app: {},
});
const getStatInfoFn = async (id: number = 0) => {
    statInfo.value = await (await getStatInfo()).data;
    loading.value = false;
    setTimeout(() => {
        drawChart();
    }, 20);
};
getStatInfoFn();

// 绘制折线图
const drawChart = () => {
    //新增站点
    const newSiteStatChart = echarts.init(newSiteStat.value);
    const newSiteStatOption = ref({
        legend: {},
        xAxis: {
            data: [],
        },
        yAxis: {},
        tooltip: {
            trigger: "axis",
        },
        series: [
            {
                name: t("newSite"),
                type: "line",
                data: [],
            },
        ],
    });
    newSiteStatOption.value.xAxis.data = statInfo.value.site_stat.date;
    newSiteStatOption.value.series[0].data = statInfo.value.site_stat.value;
    newSiteStatChart.setOption(newSiteStatOption.value);

    // 站点分布
    const siteStatChart = echarts.init(siteStat.value);
    const siteStatOption = ref({
        legend: {
            orient: 'vertical',
            right: 20,
            top: 40
        },
        tooltip: {},
        series: [
            {
                type: "pie",
                data: [],
            },
        ],
    });

    const len = statInfo.value.site_group_stat.type.length;
    for (let i = 0; i < len; i++) {
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
    });
};

const router = useRouter()
const route = useRoute()
if(route.path == '/admin/index'){
    styleStore.changeStyle()
}
watch(() => route.path, (newval, oldval) => {
    if(newval !== '/admin/index'){
        styleStore.changeBlack()
    }
})

/**
 * 链接跳转
 */
const toLink = (link) => {
    router.push(link);
};
const toHref = (url:any,id:any) =>{
    router.push({
        path:url,
        query:{id}
        })
}
const toApplication = ()=>{
    window.open('https://www.niucloud.com/app')
}
//更新时间
const time = ref('')
const nowTime = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hh = checkTime(date.getHours())
    const mm = checkTime(date.getMinutes())
    const ss = checkTime(date.getSeconds())
    function checkTime (i) {
        if (i < 10) {
            return '0' + i
        }
        return i
    }
    time.value = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
}
nowTime()
</script>

<style lang="scss" scoped>
.main-container {
    width: 1428px;
    margin: 0 auto;
}

:deep(.profile-data .el-card__header) {
    padding: 0 !important;
}

:deep(.site .el-card__header) {
    padding-left: 0 !important;
}

.card-header>span {
    line-height: 21px;
}

.text-color {
    color: var(--el-menu-active-color);
}

:deep(.el-descriptions__body) {
    background-color: #fbfbfb !important;
    padding: 16px 34px 2px;
    border-bottom: solid 1px #e9ebf0;
}

:deep(.el-descriptions__label) {
    font-weight: 600;
    color: #575657;
    line-height: 20px;
}

:deep(.el-descriptions__content) {
    color: #666;
}
</style>
