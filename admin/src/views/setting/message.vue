<template>
    <div class="main-container" v-loading="messageTableData.loading">
        <el-card class="box-card !border-none" shadow="never">
            <h3 class="panel-title">{{ t('buyerMessage') }}</h3>
            <div class="flex flex-row flex-wrap m-[-4px]">
               
                <div class="sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/4 p-1" v-for="item in messageTableData.buyer" >
                    <div class="border rounded-sm	" >
                        <div class="card-header flex items-center p-4 pb-3 pt-3 border-b text-base">
                            <span class="mr-1">{{ item.name }}</span>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="item.title"
                                placement="top"
                            >
                                <el-icon class="cursor-pointer"><Warning /></el-icon>
                            </el-tooltip>
                        </div>
                        <div class="flex justify-around message-type p-4 pb-6 pt-6 ">
                            <div class="text-sm mr-1 flex items-center cursor-pointer" v-if="item.sms == 1" @click="setMessage(item, 'sms')">
                                <el-icon :class="item.is_sms ? 'open' : ''"><CircleCheck /></el-icon>
                                <span class="ml-0.5">{{ t('sms') }}</span>
                            </div>
                            <div class="text-sm  flex items-center cursor-pointer" v-if="item.wechat" @click="setMessage(item, 'wechat')">
                                <el-icon :class="item.is_wechat ? 'open' : ''"><CircleCheck /></el-icon>
                                <span class="ml-0.5">{{ t('wechat') }}</span>
                            </div>
                            <div class="text-sm  flex items-center cursor-pointer" v-if="item.weapp" @click="setMessage(item, 'weapp')">
                                <el-icon :class="item.is_weapp ? 'open' : ''"><CircleCheck /></el-icon>
                                <span class="ml-0.5">{{ t('weapp') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                 
            </div>
        </el-card>
        
        <el-card class="box-card !border-none mt-[16px]" shadow="never">
            <h3 class="panel-title">{{ t('sellerMessage') }}</h3>
            <div class="flex flex-row flex-wrap m-[-4px]">
                <div class="sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/4 p-1" v-for="item in messageTableData.seller">
                    <div class="border rounded-sm	" >
                        <div class="card-header flex items-center p-4 pb-3 pt-3 border-b text-base">
                            <span class="mr-1">{{ item.name }}</span>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="item.title"
                                placement="top"
                            >
                                <el-icon class="cursor-pointer"><Warning /></el-icon>
                            </el-tooltip>
                        </div>
                        <div class="flex justify-around message-type p-4 pb-6 pt-6 ">
                            <div class="text-sm mr-1 flex items-center cursor-pointer" v-if="item.sms == 1" @click="setMessage(item, 'sms')">
                                <el-icon :class="item.is_sms ? 'open' : ''"><CircleCheck /></el-icon>
                                <span class="ml-0.5">{{ t('sms') }}</span>
                            </div>
                            <div class="text-sm  flex items-center cursor-pointer" v-if="item.wechat" @click="setMessage(item, 'wechat')">
                                <el-icon :class="item.is_wechat ? 'open' : ''"><CircleCheck /></el-icon>
                                <span class="ml-0.5">{{ t('wechat') }}</span>
                            </div>
                            <div class="text-sm  flex items-center cursor-pointer" v-if="item.weapp" @click="setMessage(item, 'weapp')">
                                <el-icon :class="item.is_weapp ? 'open' : ''"><CircleCheck /></el-icon>
                                <span class="ml-0.5">{{ t('weapp') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>

        <sms ref="smsDialog" @complete="loadMessageList()" />
        <wechat ref="wechatDialog" @complete="loadMessageList()" />
        <weapp ref="weappDialog" @complete="loadMessageList()" />
        
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getMessageList } from '@/api/message'

import Sms from '@/views/setting/components/message-sms.vue'

import Wechat from '@/views/setting/components/message-wechat.vue'

import Weapp from '@/views/setting/components/message-weapp.vue'

const smsDialog: Record<string, any> | null = ref(null)
const wechatDialog: Record<string, any> | null = ref(null)
const weappDialog: Record<string, any> | null = ref(null)

let messageTableData = reactive({
    loading: true,
    buyer:[],
    seller:[]
})

/**
 * 获取配置信息
 */
const loadMessageList = () => {
    messageTableData.loading = true
    messageTableData.buyer = [];
    messageTableData.seller = [];
    getMessageList().then(res => {
        Object.keys(res.data).forEach(key => {
            let item = res.data[key];
            item.sms = item.support_type.indexOf('sms') !== -1 ? 1 : 0;
            item.wechat = item.support_type.indexOf('wechat') !== -1 ? 1 : 0;
            item.weapp = item.support_type.indexOf('weapp') !== -1 ? 1 : 0;
            if(item.receiver_type == 1){
                messageTableData.buyer.push(item)
            }
            if(item.receiver_type == 2){
                messageTableData.seller.push(item)
            }
        })

        messageTableData.loading = false
    }).catch(() => {
        messageTableData.loading = false
    })
    
}

loadMessageList()
 
const setMessage = (data: any, type: string) => {
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
.message-type{
    >div:nth-last-child(1):first-child{
        width:100%;
    }
}
</style>