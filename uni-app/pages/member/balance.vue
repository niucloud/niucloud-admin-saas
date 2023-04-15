<template>
    <view class="bg-gray-100 min-h-[100vh]">
        <view class="bg-gradient-to-r from-red-500 to-red-400 fixed top-0 left-0 right-0 z-10">
            <view class="px-5 py-6 bg-right-top bg-no-repeat bg-contain"
                :style="{'backgroundImage': `url(${img('static/resource/images/member/balance_bg.png')})`}">
                <text class="text-white">{{t('availableBalance')}}</text>
                <view class="flex align-center justify-between mt-[15rpx]">
                    <text
                        class="text-4xl text-white using-hidden w-95">{{memberStore.info ? moneyFormat(memberStore.info.balance) : 0.00 }}</text>
                    <view class="w-[60px]">
                        <u-button type="primary" :plain="true" :text="t('recharge')" size="small"
                            :customStyle="{backgroundColor: 'transparent',color: '#fff', borderColor: '#fff'}"
                            @click="topUpFn"></u-button>
                    </view>
                </view>
            </view>
        </view>
        <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getBalanceListFn" top="253rpx">
            <view
                class="bg-white flex items-center border-solid border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300 px-2 py-3">
                <u-icon name="list-dot" color="#666" size="20"></u-icon>
                <text class="text-sm">{{t('balanceDetail')}}</text>
            </view>
            <view v-for="(item,index) in balanceList" :key="item.id"
                :class="['bg-white relative px-2 py-3',{'border-solid border-t-0 border-l-0 border-r-0 border-b-1 border-gray-200': balanceList.length-1 != index}] ">
                <view class="text-base">{{item.from_type_name}}</view>
                <view class="text-xs text-gray-400 mt-1">{{item.create_time}}</view>
                <view class="text-sm absolute top-[50%] transform -translate-y-[50%] right-2">{{item.account_data}}
                </view>
            </view>
            <mescroll-empty v-if="!balanceList.length && loading"></mescroll-empty>
        </mescroll-body>

        <u-popup :show="topUpShow" mode="center" :round="10" @close="closePopup" :closeable="true">
            <view class="w-80 px-3 pb-5 pt-7 box-border">
                <u--input :placeholder="t('rechargeAmountPlaceholder')" v-model="rechargeAmount" border="bottom"
                    type="number"
                    clearable>
                </u--input>
                <view class="top-up-wrap flex flex-wrap justify-around mt-3">
                    <view
                        :class="['top-up-item w-22 box-border border-1 text-center rounded mt-2 py-3 px-4 border-gray-400 border-solid',{'border-primary text-primary':rechargeAmount == 20}]"
                        @click="rechargeAmount = 20">
                        <text>20元</text>
                    </view>
                    <view
                        :class="['top-up-item w-22 box-border border-1 text-center rounded mt-2 py-3 px-4 border-gray-400 border-solid',{'border-primary text-primary':rechargeAmount == 30}]"
                        @click="rechargeAmount = 30">
                        <text>30元</text>
                    </view>
                    <view
                        :class="['top-up-item w-22 box-border border-1 text-center rounded mt-2 py-3 px-4 border-gray-400 border-solid',{'border-primary text-primary':rechargeAmount == 50}]"
                        @click="rechargeAmount = 50">
                        <text>50元</text>
                    </view>
                    <view
                        :class="['top-up-item w-22 box-border border-1 text-center rounded mt-2 py-3 px-4 border-gray-400 border-solid',{'border-primary text-primary':rechargeAmount == 100}]"
                        @click="rechargeAmount = 100">
                        <text>100元</text>
                    </view>
                    <view
                        :class="['top-up-item w-22 box-border border-1 text-center rounded mt-2 py-3 px-4 border-gray-400 border-solid',{'border-primary text-primary':rechargeAmount == 200}]"
                        @click="rechargeAmount = 200">
                        <text>200元</text>
                    </view>
                    <view
                        :class="['top-up-item w-22 box-border border-1 text-center rounded mt-2 py-3 px-4 border-gray-400 border-solid',{'border-primary text-primary':rechargeAmount == 300}]"
                        @click="rechargeAmount = 300">
                        <text>300元</text>
                    </view>
                </view>
                <view class="mt-5 px-2">
                    <u-button type="primary" shape="circle" :loading="rechargeLoading" :text="t('clickRecharge')"
                        @click="recharge"></u-button>
                </view>
            </view>
        </u-popup>

        <pay ref="payRef" @close="rechargeLoading = false"></pay>
    </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { t } from '@/locale'
    import { moneyFormat, img } from '@/utils/common';
    import { getBalanceList, createRecharge } from '@/api/member';
    import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
    import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
    import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
    import { onPageScroll, onReachBottom, onShow } from '@dcloudio/uni-app';
    import useMemberStore from '@/stores/member'
    const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

    const memberStore = useMemberStore(),
        balanceList = ref<Array<any>>([]),
        mescrollRef = ref(null),
        loading = ref<boolean>(false),
        topUpShow = ref<boolean>(false);

    interface mescrollStructure {
        num : number,
        size : number,
        endSuccess : Function,
        [propName : string] : any
    }
    const getBalanceListFn = (mescroll : mescrollStructure) => {
        loading.value = false;
        let data : Object = {
            page: mescroll.num,
            page_size: mescroll.size,
        };
        interface acceptingDataStructure {
            data : acceptingDataItemStructure,
            msg : string,
            code : number
        }
        interface acceptingDataItemStructure {
            data : object,
            [propName : string] : number | string | object
        }
        getBalanceList(data).then((res : acceptingDataStructure) => {
            let newArr = res.data.data;
            mescroll.endSuccess(newArr.length);
            //设置列表数据
            if (mescroll.num == 1) {
                balanceList.value = []; //如果是第一页需手动制空列表
            }
            balanceList.value = balanceList.value.concat(newArr);
            loading.value = true;
        }).catch(() => {
            loading.value = true;
            mescroll.endErr(); // 请求失败, 结束加载
        })
    }

    const topUpFn = () => {
        topUpShow.value = true;
    }

    const closePopup = () => {
        topUpShow.value = false;
    }

    const rechargeAmount = ref<string | number>("");
    const rechargeLoading = ref(false)

    const payRef = ref(null)

    onShow(() => {
        // h5端检测是否是支付后返回 支付组件必须调用
        // #ifdef H5
        uni.$emit('checkIsReturnAfterPayment')
        // #endif
    })

    /**
     * 发起充值
     */
    const recharge = () => {
        if (uni.$u.test.isEmpty(rechargeAmount.value)) {
            uni.showToast({ title: t('rechargeAmountPlaceholder'), icon: 'none' })
            return
        }
        if (!uni.$u.test.amount(rechargeAmount.value) || rechargeAmount.value <= 0) {
            uni.showToast({ title: t('rechargeAmountError'), icon: 'none' })
            return
        }
        if (rechargeLoading.value) return
        rechargeLoading.value = true

        createRecharge({ recharge_money: rechargeAmount.value })
            .then(res => {
                payRef.value?.open(res.data.out_trade_no)
            })
            .catch(() => {
                rechargeLoading.value = false
            })
    }
</script>

<style lang="scss" scoped>
    @mixin flex {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
    }

    /* 单行超出隐藏 */
    .using-hidden {
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: break-spaces;
    }

    .popup-content {
        @include flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        height: 50px;
        background-color: #fff;
    }
</style>