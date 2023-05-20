<template>
    <u-popup :show="show" :round="10" @close="show = false" :closeable="true">
        <view class="mx-[30rpx] pb-[20rpx] pt-[40rpx] border-t">
            <view class="text-base">{{ t('getAvatarNickname') }}</view>
            <view class="text-sm mt-[18rpx] text-gray-400">{{ t('getAvatarNicknameTips') }}</view>
        </view>
        <u-form labelPosition="left" :model="formData" errorType='toast' :rules="rules" ref="formRef">
            <view class="mx-[30rpx]">
                <view class="mt-[20rpx]">
                    <u-form-item :label="t('headimg')" prop="headimg" :border-bottom="true">
                        <button class="m-0 my-[10rpx] p-0 w-[140rpx] h-[140rpx]" open-type="chooseAvatar"
                            @chooseavatar="onChooseAvatar">
                            <view class="w-full h-full flex items-center justify-center overflow-hidden">
                                <u-image :src="img(formData.headimg)" width="140rpx" v-if="formData.headimg"></u-image>
                                <u-icon name="plus" v-else></u-icon>
                            </view>
                        </button>
                    </u-form-item>
                    <u-form-item :label=" t('nickname')" prop="nickname" :border-bottom="true">
                        <input type="nickname" v-model="formData.nickname" :placeholder="t('nicknamePlaceholder')"
                            @blur="bindNickname">
                    </u-form-item>
                </view>
            </view>
            <view class="p-[30rpx] mt-[20rpx]">
                <u-button type="primary" :loading="loading" :text="t('confirm')" shape="circle"
                    @click="confirm"></u-button>
            </view>
        </u-form>
    </u-popup>
</template>

<script setup lang="ts">
    import { ref, reactive, computed, watch } from 'vue'
    import { t } from '@/locale'
    import useMemberStore from '@/stores/member'
    import { img } from '@/utils/common'
    import { modifyMember } from '@/api/member'
    import { fetchBase64Image } from '@/api/system'

    const show = ref(false)
    const loading = ref(false)
    const memberStore = useMemberStore()
    const info = computed(() => memberStore.info)

    const formData = reactive({
        nickname: '',
        headimg: ''
    })

    watch(() => info.value, () => {
        formData.nickname = info.value.nickname
        formData.headimg = info.value.headimg
    }, { immediate: true })

    const onChooseAvatar = (e) => {
        uni.getFileSystemManager().readFile({
            filePath: e.detail.avatarUrl, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => {
                fetchBase64Image({ content: res.data }).then(uploadRes => {
                    formData.headimg = uploadRes.data.url
                })
            }
        })
    }

    const bindNickname = (e) => {
        formData.nickname = e.detail.value
    }

    const rules = {
        'headimg': {
            type: 'string',
            required: true,
            message: t('headimgPlaceholder'),
            trigger: ['blur', 'change'],
        },
        'nickname': {
            type: 'string',
            required: true,
            message: t('nicknamePlaceholder'),
            trigger: ['blur', 'change'],
        }
    }

    const formRef = ref(null)

    const confirm = async () => {
        formRef.value.validate().then(async () => {
            if (loading.value) return
            loading.value = true

            // 修改头像
            await modifyMember({ field: 'headimg', value: formData.headimg })
                .then(() => {
                    memberStore.info.headimg = formData.headimg
                })
                .catch(() => {
                    loading.value = false
                })
            if (!loading.value) return

            // 修改昵称
            modifyMember({ field: 'nickname', value: formData.nickname })
                .then(() => {
                    memberStore.info.nickname = formData.nickname
                    loading.value = false
                    show.value = false
                })
                .catch(() => {
                    loading.value = false
                })
        })
    }

    defineExpose({
        show
    })
</script>

<style lang="scss" scoped></style>