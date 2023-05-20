<template>
    <div class="main-container" v-loading="loading">
        <el-card class="box-card !border-none" shadow="never">
            <el-descriptions :title="t('essentialInfo')">
                <el-descriptions-item :label="t('headimg')">
                    <img class="w-[50px] h-[50px] mr-[10px] inline-block" v-if="formData.headimg" :src="img(formData.headimg)" alt="">
                    <img class="w-[50px] h-[50px] mr-[10px] inline-block" v-else src="@/assets/images/default_headimg.png" alt="">
                    <el-icon @click="editMemberInfo('headimg')" class="-bottom-[2px] -right-[4px] cursor-pointer"><EditPen /></el-icon>
                </el-descriptions-item>
                <el-descriptions-item :label="t('urserName')">{{formData.username || t('notAvailable')}}</el-descriptions-item>
                <el-descriptions-item :label="t('nickname')" class="flex align-center">{{formData.nickname || t('notAvailable')}}<el-icon @click="editMemberInfo('nickname')" class="-bottom-[2px] -right-[4px] cursor-pointer"><EditPen /></el-icon></el-descriptions-item>
                <el-descriptions-item :label="t('mobile')">{{formData.mobile || t('notAvailable')}}</el-descriptions-item>
                <el-descriptions-item :label="t('memberLabel')">{{formData.member_label_name.toString() || t('notAvailable')}}<el-icon @click="editMemberInfo('member_label')" class="-bottom-[2px] -right-[4px] cursor-pointer"><EditPen /></el-icon></el-descriptions-item>
                <el-descriptions-item :label="t('birthday')">{{formData.birthday || t('notAvailable')}}<el-icon @click="editMemberInfo('birthday')" class="-bottom-[2px] -right-[4px] cursor-pointer"><EditPen /></el-icon></el-descriptions-item>
                <el-descriptions-item :label="t('sex')">{{formData.sex == 1 && t('manSex') || formData.sex == 2 && t('girlSex') || t('secrecySex')}}<el-icon @click="editMemberInfo('sex')" class="-bottom-[2px] -right-[4px] cursor-pointer"><EditPen /></el-icon></el-descriptions-item>
                <el-descriptions-item :label="t('wxUnionid')">{{formData.wx_unionid || t('notAvailable')}}</el-descriptions-item>
                <el-descriptions-item :label="t('weappOpenid')">{{formData.weapp_openid || t('notAvailable')}}</el-descriptions-item>
                <el-descriptions-item :label="t('wxOpenid')">{{formData.wx_openid || t('notAvailable')}}</el-descriptions-item>
                <el-descriptions-item :label="t('registeredSource')">{{formData.register_channel_name || t('notAvailable')}}</el-descriptions-item>
                <el-descriptions-item :label="t('createTime')">{{formData.create_time || t('notAvailable')}}</el-descriptions-item>
                <el-descriptions-item :label="t('lastVisitTime')">{{formData.last_visit_time || t('notAvailable')}}</el-descriptions-item>
            </el-descriptions>
        </el-card>

        <el-card class="box-card !border-none mt-[16px]" shadow="never">
            <div class="card-header mb-2">
                <span class="font-bold">{{t('accountInfo')}}</span>
            </div>
            <el-row :gutter="16">
                <el-col :span="6">
                    <div class="statistic-card">
                        <el-statistic :value="formData.point">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                    {{t('point')}}
                                    <el-tooltip
                                        effect="dark"
                                        :content="t('adjust')"
                                        placement="top"
                                    >
                                        <el-icon @click="adjustPoint(formData)" class="ml-2" :size="12"><EditPen /></el-icon>
                                    </el-tooltip>
                                    <el-tooltip
                                        effect="dark"
                                        :content="t('detail')"
                                        placement="top"
                                    >
                                        <el-icon @click="infoPoint(formData)" class="ml-2" :size="12"><View /></el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>{{t('accumulative')}}</span>
                                <span class="green ml-1">
                                {{formData.point_get}}
                                </span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statistic-card">
                        <el-statistic :value="formData.balance">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                    {{t('balance')}}
                                    <el-tooltip
                                        effect="dark"
                                        :content="t('adjust')"
                                        placement="top"
                                    >
                                        <el-icon @click="adjustBalance(formData)" class="ml-2" :size="12"><EditPen /></el-icon>
                                    </el-tooltip>
                                    <el-tooltip
                                        effect="dark"
                                        :content="t('detail')"
                                        placement="top"
                                    >
                                        <el-icon @click="infoBalance(formData)" class="ml-2" :size="12"><View /></el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>{{t('accumulative')}}</span>
                                <span class="red ml-1">
                                {{formData.balance_get}}
                                </span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statistic-card">
                        <el-statistic :value="formData.money" title="New transactions today">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                {{t("money")}}
                                <el-tooltip
                                        effect="dark"
                                        :content="t('detail')"
                                        placement="top"
                                    >
                                        <el-icon @click="infoBalance(formData)" class="ml-2" :size="12"><View /></el-icon>
                                </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>{{t('accumulative')}}</span>
                                <span class="green ml-1">
                                    {{formData.money_get}}
                                </span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statistic-card">
                        <el-statistic :value="formData.commission" title="New transactions today">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                {{t("commission")}}
                                <el-tooltip
                                        effect="dark"
                                        :content="t('detail')"
                                        placement="top"
                                    >
                                        <el-icon @click="infoCommission(formData)" class="ml-2" :size="12"><View /></el-icon>
                                </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>{{t('accumulative')}}</span>
                                <span class="green ml-1">
                                    {{formData.commission_get}}
                                </span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>

        <point-edit ref="pointDialog" @complete="getMemberInfoFn" />
        <balance-edit ref="balanceDialog" @complete="getMemberInfoFn" />
        <edit-member ref="editMemberDialog" @complete="getMemberInfoFn()" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getMemberInfo } from '@/api/member'
import { ElMessageBox, FormInstance, ElMessage } from 'element-plus'
import { useRouter,useRoute } from 'vue-router'
import { img } from '@/utils/common'
import PointEdit from '@/views/member/components/member-point-edit.vue'
import BalanceEdit from '@/views/member/components/member-balance-edit.vue'
import EditMember from '@/views/member/components/edit-member.vue'
import colorGradient from '../../../../uniapp/src/uni_modules/vk-uview-ui/libs/function/colorGradient'
import useAppStore from '@/stores/modules/app'

const route = useRoute()
const appStore = useAppStore()

// 页面返回按钮
appStore.pageReturn = true;
watch(route, (newX,oldX) => {
    appStore.pageReturn = false;
});

let loading = ref(true)

// 获取会员信息
const id: number = parseInt(route.query.id || 0)
const formData: any = reactive({member_label_name: ''});

const getMemberInfoFn = async () => {
    loading.value = true;    
    if(id) {
        let data = await (await getMemberInfo(id)).data;
        if(!data || Object.keys(data).length == 0){
            ElMessage.error(t('memberNull'))
            setTimeout(()=>{
                router.go(-1);
            },2000)
            return false;
        }

        Object.keys(data).forEach((item)=>{
            formData[item] = data[item];
        })

        if(formData?.member_label_array && Object.keys(formData.member_label_array)?.length ){
           formData.member_label = Object.values(formData.member_label_array).map((item:any,index)=>{
                return item.label_id
            });

            formData.member_label_name = Object.values(formData.member_label_array).map((item:any,index)=>{
                return item.label_name
            });
        }
        loading.value = false;
    }else{
        loading.value = false;
    }
}
getMemberInfoFn();


const pointDialog: Record<string, any> | null = ref(null)
const balanceDialog: Record<string, any> | null = ref(null)
const editMemberDialog: Record<string, any> | null = ref(null)


/**
 *  修改会员信息
 */
 const editMemberInfo = (type: any) => {
     let data = ref({
        type,
        id,
        data: formData
     });
    editMemberDialog.value.setDialogType(data.value)
    editMemberDialog.value.showDialog = true
}

/**
 * 调整积分
 */
 const adjustPoint = (data: any) => {
    pointDialog.value.setFormData(data)
    pointDialog.value.showDialog = true
}

/**
 * 调整余额
 */
 const adjustBalance = (data: any) => {
    balanceDialog.value.setFormData(data)
    balanceDialog.value.showDialog = true
}

const router = useRouter()

/**
 * 积分详情
 */
const infoPoint = () => {
    router.push(`/member/point?id=${id}`)
}


/**
 * 余额详情 
 */
 const infoBalance = () => {
    router.push(`/member/balance?id=${id}`)
}

/**
 * 佣金详情 
 */
 const infoCommission = () => {
    router.push(`/member/commission?id=${id}`)
}

</script>

<style lang="scss" scoped></style>
