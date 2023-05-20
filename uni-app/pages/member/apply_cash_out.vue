<template>
    <scroll-view scroll-y="true" class="w-screen h-screen bg-page" v-if="!pageLoading">
        <view>
            <view class="p-[30rpx] bg-white">
                <view>{{t('cashOutMoneyTip')}}</view>
                <view class="flex py-[20rpx] items-baseline border-0 border-b-[2rpx] border-solid border-gray-200">
                    <text class="text-[60rpx] ">{{ t('currency') }}</text>
                    <input type="digit" class="h-[70rpx] leading-[70rpx] pl-[10rpx] flex-1 font-bold text-[60rpx]"
                        v-model="applyData.apply_money" />
                    <image @click="clearMoney" v-if="applyData.apply_money"
                        :src="img('static/resource/images/member/apply_cash_out/close.png')" class="w-[40rpx] h-[40rpx]"
                        mode="widthFix" />
                </view>
                <view class="pt-[20rpx]">
                    <text
                        class="text-gray-400 text-[28rpx]">{{t('money')}}：{{ t('currency') }}{{ moneyFormat(cashOutMoney) }}</text>
                    <text class="pl-[10rpx] text-[28rpx] text-primary" @click="allMoney">{{t('allTx')}}</text>
                </view>
                <view>
                    <text
                        class="text-[24rpx] text-gray-400">{{t('minWithdrawal')}}{{ t('currency') }}{{ moneyFormat(config.min) }}</text>
                    <text class="text-[24rpx] text-gray-400">，{{t('commissionTo')}}{{ config.rate + '%' }}</text>
                </view>
            </view>

            <view class="px-[30rpx] bg-white mt-[30rpx]">
                <!-- 提现到微信 -->
                <view class="py-[30rpx] flex" v-if="config.transfer_type.includes('wechat') && memberStore.info && (memberStore.info.wx_openid || memberStore.info.weapp_openid)">
                    <view><text class="iconfont iconweixin1 text-[#43c93e] text-[70rpx]"></text></view>
                    <view class="flex-1 px-[20rpx]">
                        <view>{{ t('cashOutToWechat') }}</view>
                        <view class="text-[#bbb] text-[26rpx] mt-[16rpx]">{{ t('cashOutToWechatTips') }}</view>
                    </view>
                    <view class="flex items-center" @click="applyData.transfer_type = 'wechat'">
                        <text class="iconfont iconduigou text-[40rpx] text-primary"
                            v-if="applyData.transfer_type == 'wechat'"></text>
                        <text class="iconfont iconcheckbox_nol text-[40rpx] text-[#bbb]"
                            v-else></text>
                    </view>
                </view>
                
                <!-- 提现到支付宝 -->
                <view class="py-[30rpx] flex" v-if="config.transfer_type.includes('alipay')">
                    <view><text class="iconfont iconzhifubaoxuanzhong text-[#188dfb] text-[70rpx]"></text></view>
                    <view class="flex-1 px-[20rpx]">
                        <view>{{ t('cashOutToAlipay') }}</view>
                        <view class="text-[#bbb] text-[26rpx] mt-[16rpx]">
                            <view v-if="alipayAccountInfo">
                                {{ t('cashOutTo') }}{{ t('alipayAccountNo') }}{{ alipayAccountInfo.account_no }} <text class="text-black" @click="redirect({ url: '/pages/member/account', param: { type: 'alipay', mode: 'select' } })">{{ t('replace') }}</text>
                            </view>
                            <view v-else>
                                {{ t('cashOutToAlipayTips') }}
                            </view>
                        </view>
                    </view>
                    <view class="flex items-center">
                        <u-button :plain="true" type="primary" shape="circle" :custom-style="{height: '56rpx'}" v-if="!alipayAccountInfo" @click="redirect({ url: '/pages/member/account', param: { type: 'alipay', mode: 'select' } })">{{ t('toAdd') }}</u-button>
                        <view v-else @click="applyData.transfer_type = 'alipay'">                       
                            <text class="iconfont iconduigou text-[40rpx] text-primary"
                                v-if="applyData.transfer_type == 'alipay'"></text>
                            <text class="iconfont iconcheckbox_nol text-[40rpx] text-[#bbb]"
                                v-else></text>
                        </view>
                    </view>
                </view>
                
                <!-- 提现到银行卡 -->
                <view class="py-[30rpx] flex" v-if="config.transfer_type.includes('bank')">
                    <view class="w-[70rpx] flex justify-center">
                        <image
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAACnVJREFUeF7tWXtQVNcZ/91FQQZZdhcXfKCCqFXQuKBV0YSHqWJ9AbU+qkZQG+uEyu66i0maB5jEaSetBdvG1vrCRhM1bQS1SUw6gn0kJhkDpqLNQ10jLApEHmrCuuyeznfWRZZd3L03/MOw38zOPfee8517vt/5fY9zV0AfF6GP2w8/AH4G9HEE/C7QxwngD4J+F/C7QB9HwO8CfZwA/iwgyQWuQznBBmGxAKGdwd4u41e0070Ndhtd7z2zUT+DYKN7GWzt14PDAtZOXfIjgLULYNaziuGfQ0A73QPMxtt2wdGG0H6vzwaB2kI7omyjoMZkMFgRav8MTGZFP+Eu7PZ23gaz8nGMWRHArGABVtht7QiQfY08Q2VXxosGwAzlVkDQAggR6z7bx87EjrEzcKtfkFhVIBjAcAYMZeJ1uYbwDWR4BnmG4s4TiALAjPBfAuwpKSvYFTsVBRPnSFF16ExigFKq8R2vvQmdMVwSAGYoVwHCq1IsqA4bjIXJOWgL6CdFHYhljt3vCWEsDfr8CudUPjOgFqpDArBMyhp2x07F899l96fbgQFS3uxBp/l2AAoL7aIBMEN1GUCMlGXkTsnE0agJUlSBgQCmdKxX2hz3tf4NnfER0S5QA4VGBplbBPV1NTNm58IUovR1uOu4IQC+10MACMJWaA3PigbADOV6QNgpxYKL8gg8Omu9FFWHzlg7MFS6uoumTJaOvE3vSgBAtRvAOinLeH2kBoaEBVJUHTqT7UCodHUXzf7BocjNvS0agFqoPhWAiQMy56HfpAmwXb2Gb0te5/MEps5EYMpMWMrehrXqv24r3ayZhwPRiZIsSNVEISV9mItuVUMDyi5/KX4+AR9Ba5zWVdFrFriOsBg7AigAYlBlBfprJuLb/YfQnJPL5wqvOMYBaExI9QjA7LSfgtKgFCktWIQMTSzONTZAERSEkaFyPs2a995ByYVqcVMK7DfQ5ueLBsAM5QpAOEiKQ9jXXL8p6zG0lb7F2/SMtbTiusI9QZiD5ZiSniduoZ1GN732BBTBQYjZtwum1lZUrVyNSYPU2PLhByg88764ee1sETblH5cAgIpKRy1RPbz8GNe/oRwFe3MLZwOxoq3sbTRlruJ9MkUY7yM5NiwOh9bkISU+CvvLL8BU39rtohUhjvKYrjROE6NG5W9X4eqtVkTv3cUZULliNaLlciS89iqqGurFAWBlkcjPd1Py6gJ1UL3PgKQQ3QbIi7bCeu48GjUp/OXOZ636Z/g99dtMXyEgegQH4bllzyJi41pER8iR87uT3Kh9G9P5ffMdC9Kee4MbfPSpRR3G03Plqh3QLUxE0doUvvOll75AZuwYbvz+i9WoqLmGouQ0mFpb0GyxICYsDJnHy3B0QQYHjNhB7e1VnziYwnAOeqPGE2IPBOAmlGFtEIj3AYqSVxCcvdzF/5WlBzAg44fc/wkM6r+95WUMLNjM3/WDec9gd8mT3GAy6srOdWj5xgLdngpu9PYTlRyIgmXTeTtzWixGquUQsopQYkhH9sNx3CACodnShtJLX/J2+eKlHAiS7PHxvE0xgZ6frq0BY4yDojn4Fw4QGH4PvdGjLz4QgBoo58sgnKAXOYPdne070ar7Bad6ZNNlnhHqozUdAbJOCOdxof1qDZKKTuHj4tU4XV2DklMXsG/jHGw5fIZT3NlOnRDFXSTmZ3tQ/uISKAcGQbFyB67sWYdolTvdSxdmIGPUaO4GmbGjUTAtCfp/VqC48iyY1tCxyS6BUmDLoM0/IpoBZihfAgTOb+duE7UtpW/x9EdUp4B4t+I/HAxyDwKHYsWVwyfwQn1gh6E0B+10yalqaGIiEBMph0Z/gPu5IIC3iSEEFrkLZ4vFAsWf/uCy7oofL0PKsChknSjjbtA5JjgBIBak/vXwfT1mjYH+aZMEAFRUNc0mRTI2tPBJbjiJteo87hT/kRtPwVBevJW3qRYgd3jzZCU+mzQFtMOFhz5A1ZUGlD69iO922UeX+DOif8VLS1D64SUOTPG6VM4UU30LCh9PQtXNeuhOl7usOycuHsXJaWi+a+FpsTNIzizhGiSFi9AZ4rqLmA90ATNUzQDCxIVbx+iVST9BeWSsFFWAEkKSuPqfmHBlzeM8HuS8+06n9wo7oTNsEA3ADaiSbIDIZHv/NXHzDGgOpM84EkTNgHhx53+K+mlRwxG9b5cj8DmFCWugN5SIBqAOKiMDfi1h+ahSDMG81O6PDuTflBmKj3+Cc6ZGnh61CxK4K1AmcAr5OUX+pg0/548o7WnUES5LIrpTcVQyZ67nAokFxEGvvygaADNUbwLIkgJAd5+/KOdTpKcASDGBhHyegiOlx+LjlRipDkXO3Hgog4N4AKRIT7vrzP/7Zs/l+Z0kZ3w8qhod8xA4rtTnjy9DZ3ygH3YbA8xQ1QBwPYn4iMb6qYtxYuh4t9G061QIVZy/1tF3ztTAawK6UlAk4ZXjPV8uTkmDVpPIix+qBokBlPYyRrna1XLXwoshF2HYD70x50HL9giAGeHjANYtbbzh8P30jagNdo+dBEBJXrpLaUysIPoTIwgAhTwImhFqpP3tCDeaAhulSdpd2n2HoaWIlofxe2cf+b2H8jgXOuMO0QDUQrVOAOgbgGgxhagwY/YTHvVyZsVzY8nnnf5P91T8EP0zpsZi/6fVyJgWy098ZGTlisc4EFQBUgokZjhPhalRw3nAI8OJFW4ACJgCrfGsaADqoNrLgDWirQdwZMRD0CU6avuu4qzvie4U8JwVYeeS2NTUihabhZexuoTJKEpO5UYTGFQAUdAjV6C4QFdnGUzGu0R/oBY6Y5Q3G7pxAdX/6EucN2VP/fma+TgYneBRlYoiCoL6vac5A4gRVBJn/eoYrw4pGAovb+N1ABlHtT35PFV1hdNn8DYdjQkYnSaRF0NNbW0cFA/yBnTGpd5scAPgOgZG2BF4w5tid/2pj27A56GDPHYXLk/iRtLOUzVI/p+d5ijSiBWTotW8Tf5PhQ35eFchV6A+chFyAToMdfOBxAidcZs3O9wAMCM8C2CUAkVLc/9gxM2/fyDpOgEZTP5PQiBQ0HPeUxDUJKqBkYz7fGdxRn9KdeQKTr93PvdAf8BuT8amzf/yZoQHAFSE2iZvip763xs8FtnTvbKu+6nHMGCYuArQ82RCA4beisLSwrve7HADoBaqMwLg9vHQ20TUvzV+Fl4ZM8OXoZ7H9NQXYIa/Q2/06VO0CwAM6FcHlVWqBRmPZOPj8OHS1GUAksUdgLp9kSA8D63hRV8W4gLANShSAyBzPX/6Msu9MUMzXf50EaFJHwMZoOkJ+vPXzoXOeNKXBXRlQGCd4wgs6Ri3Kmk5TkWO9uW97mOIAQ/bAbp+N9kGndHo6xSegqDkf4G2jUsG/STLODsg7S8EQIAZEP4MrWGLmPd7LIS+AIIGQJEkZqLOYwseSudfYL8KCav/R+QYs6h51BiMMAxGsKwRKjsdyHyTTv/5+6bgGOX1s7iYyXrjWD8AvXHXenLNfgb0JJq9cS4/A3rjrvXkmv0M6Ek0e+Ncfgb0xl3ryTX7GdCTaPbGufo8A/4PpckqfWjPHTQAAAAASUVORK5CYII="
                            mode="widthFix" class="w-[60rpx]"></image>
                    </view>
                    <view class="flex-1 px-[20rpx]">
                        <view>{{ t('cashOutToBank') }}</view>
                        <view class="text-[#bbb] text-[26rpx] mt-[16rpx]">
                            <view v-if="bankAccountInfo">
                                {{ t('cashOutTo') }}{{ bankAccountInfo.bank_name }}{{ t('debitCard') }}{{ bankAccountInfo.account_no.substring(bankAccountInfo.account_no.length - 4) }} <text class="text-black" @click="redirect({ url: '/pages/member/account', param: { type: 'bank', mode: 'select' } })">{{ t('replace') }}</text>
                            </view>
                            <view v-else>
                                {{ t('cashOutToBankTips') }}
                            </view>
                        </view>
                    </view>
                    <view class="flex items-center">
                        <u-button :plain="true" type="primary" shape="circle" :custom-style="{height: '56rpx'}" v-if="!bankAccountInfo" @click="redirect({ url: '/pages/member/account', param: { type: 'bank', mode: 'select' } })">{{ t('toAdd') }}</u-button>
                        <view v-else @click="applyData.transfer_type = 'bank'">
                            <text class="iconfont iconduigou text-[40rpx] text-primary"
                                v-if="applyData.transfer_type == 'bank'"></text>
                            <text class="iconfont iconcheckbox_nol text-[40rpx] text-[#bbb]"
                                v-else></text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="px-[32rpx]">
                <u-button type="primary" shape="circle" :text="t('cashOut')" class="mt-[60rpx] mb-[40rpx]"
                    :disabled="applyData.apply_money == '' || applyData.apply_money == 0" :loading="loading"
                    @click="cashOut"></u-button>                
            </view>

            <view class="mt-[40rpx] text-center text-sm" @click="redirect({ url: '/pages/member/cash_out'})">
                {{t('cashOutList')}}
            </view>
        </view>
    </scroll-view>
    <u-loading-page :loading="pageLoading" bg-color="#e8e8e8" loading-text=""></u-loading-page>
</template>

<script lang="ts" setup>
    import { ref, reactive, watch, computed } from 'vue'
    import { t } from '@/locale'
    import { moneyFormat, redirect, img } from '@/utils/common'
    import useMemberStore from '@/stores/member'
    import { cashOutConfig, cashOutApply, getFirstCashoutAccountInfo, getCashoutAccountInfo } from '@/api/member'
    import { onLoad } from '@dcloudio/uni-app'

    const pageLoading = ref(true)
    const loading = ref(false)
    const memberStore = useMemberStore()

    // 申请提现数据
    const applyData = reactive({
        apply_money: '',
        transfer_type: '',
        account_type: 'money',
        account_id: 0
    })
    
    // 可提现金额
    const cashOutMoney = computed(() => {
        return memberStore.info ? memberStore.info[ applyData.account_type ] : 0
    })
	
    
    watch(() => applyData.transfer_type, (nval) => {
        switch (nval) {
            case 'bank':
                applyData.account_id = bankAccountInfo.value ? bankAccountInfo.value.account_id : 0
            break;
            case 'alipay':
                applyData.account_id = alipayAccountInfo.value ? alipayAccountInfo.value.account_id : 0
            break;
            default:
                applyData.account_id = 0
        }
    }, { immediate: true })

    const config = reactive<AnyObject>({
        is_auto_transfer: 0, // 是否自动转账
        is_auto_verify: 0, // 是否自动审核
        is_open: 0, // 是否启用提现
        min: 0, // 最低提现金额
        rate: 0, // 手续费比率
        transfer_type: [] // 提现方式
    })

    let query:AnyObject | undefined = {}
    
    onLoad(async (data) => {
        query = data
        uni.getStorageSync('cashOutAccountType') && (applyData.account_type = uni.getStorageSync('cashOutAccountType'))
        
        if (!['money', 'commission'].includes(applyData.account_type)) {
            uni.showToast({
                title: t('abnormalOperation'),
                icon: 'none',
                success() {
                    setTimeout(() => { uni.navigateBack({ delta: 1}) }, 1500)
                }
            })
            return
        }
        
        // 提现配置
        await cashOutConfig().then((res : any) => {
            for (let key in res.data) {
                config[key] = res.data[key];
            }
            if (config.transfer_type.includes('wechat') && memberStore.info && (!memberStore.info.wx_openid && !memberStore.info.weapp_openid)) config.transfer_type.splice(0, 1)
            config.transfer_type.includes('bank') && getBankAccountInfo()
            config.transfer_type.includes('alipay') && getAlipayAccountInfo()
            applyData.transfer_type = config.transfer_type[0]
            pageLoading.value = false
        })
    })

    //全部提现
    const allMoney = () => {
        applyData.apply_money = moneyFormat(cashOutMoney)
    }

    // 清空提现金额
    const clearMoney = () => {
        applyData.apply_money = '';
    }

    const verify = () => {
        if (!applyData.transfer_type) {
            uni.showToast({ title: t('noAvailableCashOutType'),  icon: 'none' })
            return false
        }
        if (uni.$u.test.isEmpty(applyData.apply_money)) {
            uni.showToast({ title: t('applyMoneyPlaceholder'), icon: 'none' })
            return false
        }
        if (!uni.$u.test.amount(applyData.apply_money)) {
            uni.showToast({ title: t('moneyformatError'), icon: 'none' })
            return false
        }
        if (parseFloat(applyData.apply_money) > parseFloat(cashOutMoney.value)) {
            uni.showToast({ title: t('applyMoneyExceed'), icon: 'none' })
            return false
        }
        if (parseFloat(applyData.apply_money) < parseFloat(config.min)) {
            uni.showToast({ title: t('applyMoneyBelow'),  icon: 'none' })
            return false
        }
        return true;
    }
        
    /**
     * 获取支付宝提现账号信息
     */
    const alipayAccountInfo = ref(null)
    const getAlipayAccountInfo = () => {
        const data = { account_type: 'alipay', account_id: 0 }
        let request = getFirstCashoutAccountInfo
        
        if (query.type && query.type == 'alipay' && query.account_id) {
            request = getCashoutAccountInfo
            data.account_id = query.account_id
        }
        
        request(data).then(res => {
            if (res.data && res.data.account_id) alipayAccountInfo.value = res.data
        })
    }
    
    /**
     * 获取银行卡提现账号信息
     */
    const bankAccountInfo = ref(null)
    const getBankAccountInfo = () => {
        const data = { account_type: 'bank', account_id: 0 }
        let request = getFirstCashoutAccountInfo
        
        if (query.type && query.type == 'bank' && query.account_id) {
            request = getCashoutAccountInfo
            data.account_id = query.account_id
        }
        request(data).then(res => {
            if (res.data && res.data.account_id) bankAccountInfo.value = res.data
        })
    }
    
    /**
     * 申请提现
     */
    const cashOut = ()=> {
        if (verify()) {
            if (loading.value) return
            loading.value = true
            
            cashOutApply(applyData)
                .then(res => {
                    redirect({ url: '/pages/member/cash_out' })
                })
                .catch(() => {
                    loading.value = false
                })
        }
    }
</script>

<style lang="scss" scoped>
</style>