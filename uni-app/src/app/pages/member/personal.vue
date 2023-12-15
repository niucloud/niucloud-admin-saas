<template>
    <view class="w-full h-screen bg-page" v-if="info">
        <view class="flex flex-col items-center pt-[30rpx]">
            <!-- #ifdef MP-WEIXIN -->
            <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" :plain="true" class="border-0">
                <u-avatar :src="img(info.headimg)" size="60" leftIcon="none"></u-avatar>
                <view class="text-primary text-sm mt-[10rpx]">{{ t('updateHeadimg') }}</view>
            </button>
            <!-- #endif -->
            <!-- #ifndef MP-WEIXIN -->
            <u-upload @afterRead="afterRead" :maxCount="1">
                <u-avatar :src="img(info.headimg)" size="60" leftIcon="none"></u-avatar>
                <view class="text-primary text-sm mt-[10rpx]">{{ t('updateHeadimg') }}</view>
            </u-upload>
            <!-- #endif -->
        </view>

        <view class="m-[30rpx] bg-white rounded-md overflow-hidden px-[20rpx] py-[10rpx]">
            <u-cell-group :border="false">
                <u-cell :title="t('nickname')" :is-link="true" :value="info.nickname"
                    @click="updateNickname.modal = true"></u-cell>
                <u-cell :title="t('sex')" :is-link="true" :value="info.sex_name || t('unknown')"
                    @click="sexSheetShow = true"></u-cell>
                <u-cell :title="t('mobile')">
                    <template #value>
                        <view v-if="info.mobile">{{ mobileConceal(info.mobile) }}</view>
                        <view>
                            <app-link url="/app/pages/auth/bind">
                                <u-button type="primary" :plain="true" :text="t('bindMobile')" shape="circle"
                                    size="mini"></u-button>
                            </app-link>
                        </view>
                    </template>
                </u-cell>
                <u-cell :title="t('birthday')" :is-link="true" :value="info.birthday || t('unknown')"
                    @click="birthdayPicker = true"></u-cell>
            </u-cell-group>
        </view>

        <u-modal :show="updateNickname.modal" :closeOnClickOverlay="true" @close="updateNickname.modal = false"
            :show-cancel-button="true"
            @cancel="updateNickname.modal = false" :title="t('updateNickname')">
            <view class="w-full mt-[20rpx] border-0 border-b border-gray-300 border-solid py-[20rpx]">
                <input type="nickname" v-model="updateNickname.value" :placeholder="t('nicknamePlaceholder')"
                    @blur="bindNickname">
            </view>
            <template #confirmButton>
                <view class="mt-[10rpx]">
                    <u-button type="primary" :text="t('confirm')" shape="circle"
                        @click="updateNicknameConfirm"></u-button>
                </view>
            </template>
        </u-modal>

        <u-action-sheet :actions="sexList" :show="sexSheetShow" :closeOnClickOverlay="true"
            :safeAreaInsetBottom="true"
            @close="sexSheetShow = false" @select="updateSex"></u-action-sheet>

        <u-datetime-picker :show="birthdayPicker" mode="date" :confirm-text="t('confirm')"
            :maxDate="new Date().valueOf()" :minDate="0"
            :cancel-text="t('cancel')" @cancel="birthdayPicker = false" @confirm="updateBirthday"></u-datetime-picker>
    </view>
</template>

<script setup lang="ts">
    import { ref, computed, reactive, watch } from 'vue'
    import { t } from '@/locale'
    import useMemberStore from '@/stores/member'
    import { img, mobileConceal } from '@/utils/common'
    import { modifyMember } from '@/app/api/member'
    import { fetchBase64Image, uploadImage } from '@/app/api/system'

    const memberStore = useMemberStore()
    const info = computed(() => memberStore.info)

    /**
     * 修改昵称
     */
    const updateNickname = reactive({
        modal: false,
        value: info.nickname || ''
    })
    const bindNickname = (e) => {
        updateNickname.value = e.detail.value
    }
    const updateNicknameConfirm = () => {
        if (uni.$u.test.isEmpty(updateNickname.value)) { uni.showToast({ title: t('nicknamePlaceholder'), icon: 'none' }); return }

        modifyMember({
            field: 'nickname',
            value: updateNickname.value
        }).then(res => {
            memberStore.info.nickname = updateNickname.value
            updateNickname.modal = false
        })
    }

    /**
     * 修改性别
     */
    const sexSheetShow = ref(false)
    const sexList = computed(() => {
        return [
            { name: t('man'), value: 1 },
            { name: t('woman'), value: 2 }
        ]
    })
    const updateSex = (e) => {
        modifyMember({
            field: 'sex',
            value: e.value
        }).then(res => {
            memberStore.info.sex_name = e.name
        })
    }

    /**
     * 修改用户头像
     */
    const onChooseAvatar = (e) => {
        uni.getFileSystemManager().readFile({
            filePath: e.detail.avatarUrl, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => {
                fetchBase64Image({ content: res.data }).then(uploadRes => {
                    modifyMember({
                        field: 'headimg',
                        value: uploadRes.data.url
                    }).then(res => {
                        memberStore.info.headimg = uploadRes.data.url
                    })
                })
            }
        })
    }

    const afterRead = (event) => {
        uploadImage({
            filePath: event.file.url,
            name: 'file'
        }).then(res => {
            modifyMember({
                field: 'headimg',
                value: res.data.url
            }).then(() => {
                memberStore.info.headimg = res.data.url
            })
        }).catch(() => {
        })
    }

    /**
     * 编辑生日
     */
    const birthdayPicker = ref(false)
    const updateBirthday = (e) => {
        modifyMember({
            field: 'birthday',
            value: uni.$u.date(e.value, 'yyyy-mm-dd')
        }).then(() => {
            memberStore.info.birthday = uni.$u.date(e.value, 'yyyy-mm-dd')
            birthdayPicker.value = false
        })
    }
</script>

<style lang="scss" scoped>
    page {
        background: var(--page-bg-color);
    }

    :deep(.u-cell-group__wrapper) {
        .u-cell__body {
            padding-left: 0;
            padding-right: 0;
        }

        .u-cell {
            &:last-child .u-line {
                display: none;
            }
        }
    }

    :deep(button, button:after) {
        border: none;
    }
</style>
<style lang="scss">
</style>
