<template>
    <view class="px-[30rpx]">
        <u-form labelPosition="left" :model="formData" labelWidth="200rpx" errorType='toast' :rules="rules"
            ref="formRef">
            <view class="mt-[10rpx]">
                <u-form-item :label="t('name')" prop="name" :border-bottom="true">
                    <u-input v-model="formData.name" border="none" clearable
                        :placeholder="t('namePlaceholder')"></u-input>
                </u-form-item>
            </view>
            <view class="mt-[10rpx]">
                <u-form-item :label="t('mobile')" prop="mobile" :border-bottom="true">
                    <u-input v-model="formData.mobile" border="none" clearable
                        :placeholder="t('mobilePlaceholder')"></u-input>
                </u-form-item>
            </view>
            <view class="mt-[10rpx]">
                <u-form-item :label="t('selectArea')" prop="area" :border-bottom="true" @click="selectArea">
                    <view v-if="!formData.area" class="text-gray-placeholder text-[30rpx]">{{ t('selectAreaPlaceholder') }}</view>
                    <view v-else class="text-[30rpx]">{{ formData.area }}</view>
                </u-form-item>
            </view>
            <view class="mt-[10rpx]">
                <u-form-item :label="t('address')" prop="address" :border-bottom="true">
                    <u-input v-model="formData.address" border="none" clearable
                        :placeholder="t('addressPlaceholder')"></u-input>
                </u-form-item>
            </view>
            <view class="mt-[10rpx]">
                <u-form-item :label="t('defaultAddress')" prop="name" :border-bottom="true">
                    <u-switch v-model="formData.is_default" size="20" :activeValue="1" :inactiveValue="0"></u-switch>
                </u-form-item>
            </view>
            <view class="mt-[40rpx]">
                <u-button type="primary" shape="circle" :text="t('save')" @click="save" :loading="operateLoading"></u-button>
            </view>
        </u-form>
    </view>
    
    <area-select ref="areaRef" @complete="areaSelectComplete" :area-id="formData.district_id"/>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import { redirect } from '@/utils/common'
    import { t } from '@/locale'
    import { addAddress, editAddress, getAddressInfo } from '@/app/api/member'
    
    const formData = ref({
        id: 0,
        name: '',
        mobile: '',
        province_id: 0,
        city_id: 0,
        district_id: 0,
        address: '',
        full_address: '',
        is_default: 0,
        area: '',
        type: 'address'
    })
    
    const areaRef = ref()
    const formRef = ref(null)
    const type = ref('')
    
    onLoad((data) => {
        if (data.id) {
            getAddressInfo(data.id)
                .then(({ data }) => {
                    data && Object.assign(formData.value, data)
                })
                .catch()
        }
        type.value = data.type || ''
    })
    
    const rules = computed(() => {
        return {
            'name': {
                type: 'string',
                required: true,
                message: t('namePlaceholder'),
                trigger: ['blur', 'change'],
            },
            'mobile': [
                {
                    type: 'string',
                    required: true,
                    message: t('mobilePlaceholder'),
                    trigger: ['blur', 'change'],
                },
                {
                    validator() {
                        return uni.$u.test.mobile(formData.value.mobile)
                    },
                    message: t('mobileError')
                }
            ],
            'area': {
                validator() {
                    return !uni.$u.test.isEmpty(formData.value.area)
                },
                message: t('selectAreaPlaceholder')
            },
            'address': {
                type: 'string',
                required: true,
                message: t('addressPlaceholder'),
                trigger: ['blur', 'change'],
            }
        }
    })
    
    const selectArea = () => {
        areaRef.value.open()
    }
    
    const areaSelectComplete = (event) => {
        formData.value.province_id = event.province.id || 0
        formData.value.city_id = event.city.id || 0
        formData.value.district_id = event.district.id || 0
        formData.value.area = `${event.province.name || ''}${event.city.name || ''}${event.district.name || ''}`
    }
    
    const operateLoading = ref(false)
    const save = ()=> {
        const save = formData.value.id ? editAddress : addAddress
        
        formRef.value.validate().then(() => {
            if (operateLoading.value) return
            operateLoading.value = true
            
            formData.value.full_address = formData.value.area + formData.value.address
        
            save(formData.value).then((res) => {
                operateLoading.value = false
                setTimeout(()=> {
                    redirect({ url: '/app/pages/member/address', param: { type: type.value } })
                }, 1000)
            }).catch(() => {
                operateLoading.value = false
            })
        })
    }
</script>

<style lang="scss" scoped></style>