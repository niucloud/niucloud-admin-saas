<template>
    <div class="main-container" v-loading="noticeTableData.loading">
        <el-card class="box-card !border-none" shadow="never">
            <h3 class="panel-title">{{ t('buyerNotice') }}</h3>
            <div class="flex flex-row flex-wrap m-[-4px]">
				<el-table :data="noticeTableData.seller" size="large">
				    <el-table-column prop="name" :label="t('noticeType')" min-width="120" />
				    <el-table-column :label="t('operation')" fixed="right" min-width="300">
				        <template #default="{ row }">
				            <div class="flex">
								<div class="text-sm mr-1 flex items-center cursor-pointer" v-if="row.sms_type == 1" @click="setNotice(row, 'sms')">
								    <el-icon class="text-[15px] mr-[3px]" :class="row.is_sms ? 'open' : ''"><SuccessFilled /></el-icon>
								    <span class="ml-0.5">{{ t('sms') }}</span>
								</div>
								<div class="text-sm  flex items-center cursor-pointer ml-[20px]" v-if="row.wechat_type" @click="setNotice(row, 'wechat')">
								    <el-icon class="text-[15px] mr-[3px]" :class="row.is_wechat ? 'open' : ''"><SuccessFilled /></el-icon>
								    <span class="ml-0.5">{{ t('wechat') }}</span>
								</div>
								<div class="text-sm  flex items-center cursor-pointer ml-[20px]" v-if="row.weapp_type" @click="setNotice(row, 'weapp')">
								    <el-icon class="text-[15px] mr-[3px]" :class="row.is_weapp ? 'open' : ''"><SuccessFilled /></el-icon>
								    <span class="ml-0.5">{{ t('weapp') }}</span>
								</div>
				            </div>
				        </template>
				    </el-table-column>
				</el-table>	
            </div>
        </el-card>
        
        <el-card class="box-card !border-none mt-[16px]" shadow="never">
            <h3 class="panel-title">{{ t('sellerNotice') }}</h3>
            <div class="flex flex-row flex-wrap m-[-4px]">
				<el-table :data="noticeTableData.buyer" size="large">
				    <el-table-column prop="name" :label="t('noticeType')" min-width="120" />
				    <el-table-column :label="t('operation')" fixed="right" min-width="300">
				        <template #default="{ row }">
				            <div class="flex">
								<div class="text-sm mr-1 flex items-center cursor-pointer" v-if="row.sms_type == 1" @click="setNotice(row, 'sms')">
								    <el-icon class="text-[15px] mr-[3px]" :class="row.is_sms ? 'open' : ''"><SuccessFilled /></el-icon>
								    <span class="ml-0.5">{{ t('sms') }}</span>
								</div>
								<div class="text-sm  flex items-center cursor-pointer ml-[20px]" v-if="row.wechat_type" @click="setNotice(row, 'wechat')">
								    <el-icon class="text-[15px] mr-[3px]" :class="row.is_wechat ? 'open' : ''"><SuccessFilled /></el-icon>
								    <span class="ml-0.5">{{ t('wechat') }}</span>
								</div>
								<div class="text-sm  flex items-center cursor-pointer ml-[20px]" v-if="row.weapp_type" @click="setNotice(row, 'weapp')">
								    <el-icon class="text-[15px] mr-[3px]" :class="row.is_weapp ? 'open' : ''"><SuccessFilled /></el-icon>
								    <span class="ml-0.5">{{ t('weapp') }}</span>
								</div>
				            </div>
				        </template>
				    </el-table-column>
				</el-table>	
            </div>
        </el-card>

        <sms ref="smsDialog" @complete="loadNoticeList()" />
        <wechat ref="wechatDialog" @complete="loadNoticeList()" />
        <weapp ref="weappDialog" @complete="loadNoticeList()" />
        
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getNoticeList } from '@/api/notice'

import Sms from '@/views/setting/components/notice-sms.vue'

import Wechat from '@/views/setting/components/notice-wechat.vue'

import Weapp from '@/views/setting/components/notice-weapp.vue'

const smsDialog: Record<string, any> | null = ref(null)
const wechatDialog: Record<string, any> | null = ref(null)
const weappDialog: Record<string, any> | null = ref(null)

let noticeTableData = reactive({
    loading: true,
    buyer:[],
    seller:[]
})

/**
 * 获取配置信息
 */
const loadNoticeList = () => {
    noticeTableData.loading = true
    noticeTableData.buyer = [];
    noticeTableData.seller = [];
    getNoticeList().then(res => {
        Object.keys(res.data).forEach(key => {
            let item = res.data[key];
            item.sms_type = item.support_type.indexOf('sms') !== -1 ? 1 : 0;
            item.wechat_type = item.support_type.indexOf('wechat') !== -1 ? 1 : 0;
            item.weapp_type = item.support_type.indexOf('weapp') !== -1 ? 1 : 0;
            if(item.receiver_type == 1){
                noticeTableData.buyer.push(item)
            }
            if(item.receiver_type == 2){
                noticeTableData.seller.push(item)
            }
        })

        noticeTableData.loading = false
    }).catch(() => {
        noticeTableData.loading = false
    })
    
}

loadNoticeList()
 
const setNotice = (data: any, type: string) => {
    data.type = type;
    eval('data.status=data.is_'+type);
    eval(type+'Dialog.value.setFormData(data)');
    eval(type+'Dialog.value.showDialog = true;');
}

</script>

<style lang="scss" scoped>
.open{
    color: var(--el-color-primary);
}
.notice-type{
    >div:nth-last-child(1):first-child{
        width:100%;
    }
}
</style>