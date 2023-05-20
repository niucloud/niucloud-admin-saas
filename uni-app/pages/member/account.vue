<template>
    <view class="w-screen h-screen bg-page">
        <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getCashoutAccountListFn">
            <view class="h-[20rpx]"></view>
            <view class="p-[30rpx] bg-white mx-[32rpx] my-[20rpx] rounded flex" v-for="(item, index) in accountList" :key="index" @click="handleClick(item)">
                <view class="w-[100rpx] h-[100rpx] flex items-center justify-center mr-[10rpx]">
                    <image
                        src="data:image/png;base64,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"
                        mode="widthFix" class="w-[80rpx]" v-if="item.account_type == 'bank'"></image>
                    <text class="iconfont iconzhifubaoxuanzhong text-[#188dfb] text-[80rpx]" v-else></text>
                </view>
                <view>
                    <view>{{ item.account_type == 'bank' ? item.bank_name : t('alipayAccountNo') }}</view>
                    <view v-if="item.account_type == 'bank'" class="text-sm text-gray-subtitle mt-[10rpx]">{{ t('endNumber') }} {{ item.account_no.substring(item.account_no.length - 4) }}{{ t('bankCard') }}</view>
                    <view v-else class="text-sm text-gray-subtitle mt-[10rpx]">{{ item.account_no }}</view>
                </view>
            </view>
            <view class="p-[30rpx] bg-white mx-[32rpx] my-[20rpx] rounded flex" @click="redirect({ url: '/pages/member/account_edit', param: { type: accountType, mode } })">
                <u-icon name="plus" color="#333" size="16"></u-icon>
                <text class="text-sm ml-[10rpx] flex-1">{{ accountType == 'bank' ? t('addBankCard') : t('addAlipayAccount') }}</text>
                <u-icon name="arrow-right" color="#333" size="14"></u-icon>
            </view>
        </mescroll-body>
    </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { redirect } from '@/utils/common'
    import { getCashoutAccountList } from '@/api/member'
    import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
    import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
    import { onPageScroll, onReachBottom, onLoad } from '@dcloudio/uni-app'
    import { t } from '@/locale'
    
    const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)
    const accountList = ref<Array<any>>([])
    const loading = ref(false)
    const accountType = ref('bank')
    const mescrollRef = ref(null)
    const mode = ref('get')
    
    onLoad((data) => {
        data.type && (accountType.value = data.type)
        data.mode && (mode.value = data.mode)
    })
    
    const getCashoutAccountListFn = (mescroll : mescrollStructure) => {
    	loading.value = false;
    	let data : object = {
    		page: mescroll.num,
    		limit: mescroll.size,
            account_type: accountType.value
    	};
    
    	getCashoutAccountList(data).then((res) => {
    		const newArr = (res.data.data as Array<Object>);
    		//设置列表数据
    		if (mescroll.num == 1) {
    			accountList.value = []; //如果是第一页需手动制空列表
    		}
    		accountList.value = accountList.value.concat(newArr);
    		mescroll.endSuccess(newArr.length);
    		loading.value = true;
    	}).catch(() => {
    		loading.value = true;
    		mescroll.endErr(); // 请求失败, 结束加载
    	})
    }
    
    const handleClick = (data: AnyObject) => {
        if (mode.value == 'get') redirect({ url: '/pages/member/account_edit', param: { id: data.account_id, type: accountType.value, mode: mode.value } })
        else redirect({ url: '/pages/member/apply_cash_out', param: { account_id: data.account_id, type: accountType.value } })
    }
</script>

<style lang="scss" scoped></style>