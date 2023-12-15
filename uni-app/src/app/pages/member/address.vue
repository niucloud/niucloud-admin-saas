<template>
    <scroll-view scroll-y="true" v-if="!loading">
        <view class="border-0 !border-b !border-[#eee] border-solid" v-if="!type">
            <u-tabs :list="tabs" @click="switchTab" :current="current" itemStyle="width:50%;height:88rpx;box-sizing: border-box;"></u-tabs>
        </view>
        <uni-swipe-action>
            <view class="p-[30rpx]" v-show="current == 0">
                <uni-swipe-action-item :right-options="addressOptions" @click="swipeClick" v-for="item in addressList">
                    <view class="border-0 !border-b !border-[#f5f5f5] border-solid pb-[30rpx] flex items-center">
                        <view class="flex-1" @click="selectAddress(item)">
                            <view class="font-bold my-[10rpx] text-sm">{{ item.full_address }}</view>
                            <view class="text-sm flex items-center">
                                {{ item.name }} 
                                <text class="text-[26rpx] text-gray-subtitle">{{ mobileHide(item.mobile) }}</text>
                                <view class="bg-primary text-white text-xs px-[10rpx] leading-none flex items-center h-[32rpx] ml-[10rpx] rounded" v-if="item.is_default == 1">{{ t('default') }}</view>
                            </view>
                        </view>
                        <text class="iconfont iconbianji" @click="editAddress(item.id)"></text>
                    </view>
                </uni-swipe-action-item>
                <view v-if="!addressList.length" class="pt-[20vh]">
                    <u-empty mode="address" :icon="img('static/resource/images/empty.png')"/>
                </view>
            </view>
            <view class="p-[30rpx]" v-show="current == 1">
                <uni-swipe-action-item :right-options="addressOptions" @click="swipeClick" v-for="item in locationAddressList">
                    <view class="border-0 !border-b !border-[#f5f5f5] border-solid pb-[30rpx] flex items-center">
                        <view class="flex-1" @click="selectAddress(item)">
                            <view class="font-bold my-[10rpx] text-sm">{{ item.full_address }}</view>
                            <view class="text-sm flex items-center">
                                {{ item.name }} 
                                <text class="text-[26rpx] text-gray-subtitle">{{ mobileHide(item.mobile) }}</text>
                                <view class="bg-primary text-white text-xs px-[10rpx] leading-none flex items-center h-[32rpx] ml-[10rpx] rounded" v-if="item.is_default == 1">{{ t('default') }}</view>
                            </view>
                        </view>
                        <text class="iconfont iconbianji" @click="editAddress(item.id)"></text>
                    </view>
                </uni-swipe-action-item>
                <view v-if="!locationAddressList.length" class="pt-[15vh]">
                    <u-empty mode="address" :icon="img('static/resource/images/empty.png')"/>
                </view>
            </view>
        </uni-swipe-action>
        <u-tabbar :fixed="true" :safeAreaInsetBottom="true" :border="false">
            <view class="p-[24rpx] pt-0 w-full">
                <u-button type="primary" shape="circle" :text="t('createAddress')" @click="addAddress"></u-button>
            </view>
        </u-tabbar>
    </scroll-view>
</template>

<script setup lang="ts">
    import { ref, reactive, computed, watch } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import { redirect, img, mobileHide } from '@/utils/common'
    import { getAddressList, deleteAddress } from '@/app/api/member'
    import { t } from '@/locale'
    
    const loading = ref(true)
    const current = ref(0)
    const tabs = ref([
        { name: t('address'), key: 'address' },
        { name: t('locationAddress'), key: 'location_address' }
    ])
    const addressList = ref<object[]>([])
    const locationAddressList = ref<object[]>([])
    const type = ref('')
    
    onLoad((data) => {
        type.value = data.type || ''
        if (data.type) current.value = data.type == 'address' ? 0 : 1
    })
    
    getAddressList({})
        .then(({ data }) => {
            const address = [], locationAddress = []
            data.forEach(item => { 
                item.type == 'address' ? address.push(item) : locationAddress.push(item)
            })
            addressList.value = address
            locationAddressList.value = locationAddress
            loading.value = false
        })
        .catch(() => {
            loading.value = false
        })
    
    const switchTab = (event)=> {
        current.value = event.index
    }
    
    const addAddress = ()=> {
        const url = `/app/pages/member/${tabs.value[ current.value ].key}_edit`
        redirect({ url, param: { type: type.value } })
    }
    
    const editAddress = (id: number)=> {
        const url = `/app/pages/member/${tabs.value[ current.value ].key}_edit`
        redirect({ url, param: { id, type: type.value } })
    }
    
    const addressOptions = ref([
        {
            text: t('delete'),
            style: {
                backgroundColor: '#F56C6C'
            }
        }
    ])
    
    const selectAddress = (data: object) => {
        const selectAddress = uni.getStorageSync('selectAddressCallback')
        if (selectAddress) {
            selectAddress.address_id = data.id
            
            uni.setStorage({
                key: 'selectAddressCallback',
                data: selectAddress,
                success() {
                    redirect({url: selectAddress.back })
                }
            })
        }
    }
    
    const swipeClick = (event: any) => {
        const list = current.value ? locationAddressList : addressList
        const data = list.value[event.index]
        
        deleteAddress(data.id)
            .then(()=>{
                list.value.splice(event.index, 1)
            }).catch()
    }
</script>

<style lang="scss" scoped>
    :deep(.u-tabs__wrapper__nav__line) {
        bottom: 0;
    }
</style>