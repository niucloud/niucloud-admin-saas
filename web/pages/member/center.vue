<template>
    <div class="w-full h-full bg-page pt-6">
        <div class="main-container flex justify-between">
            <sidebar></sidebar>
            <el-card class="box-card flex-1 ml-4" v-loading="loading" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span>{{t('personageInfo')}}</span>
                    </div>
                </template>
                <div class="pr-15"  v-if="info">
                    <el-form :model="info" class="form-wrap" label-width="120px">
                        <el-form-item :label="t('memberHeadimg')">
                            <div class="w-full flex justify-between content-center items-center">
                                <img v-if="!info.headimg" class="w-[80px] h-[80px]" src="@/assets/images/default_headimg.png" alt="">
                                <img v-else :src="img(info.headimg)" class="w-[80px] h-[80px]" alt="">
                                <el-upload
                                    class="avatar-uploader"
                                    :show-file-list="false"
                                    v-bind="upload"
                                >
                                    <span class="cursor-pointer text-color">{{t('edit')}}</span>
                                </el-upload>
                            </div>
                        </el-form-item>
                        <el-form-item :label="t('nickname')">
                            <div class="w-full flex justify-between content-center">
                                <span>{{updateNickname.value}}</span>
                                <span class="cursor-pointer text-color" @click="updateNickname.modal = true">{{t('edit')}}</span>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

            <el-dialog v-model="updateNickname.modal" :title="t('nickname')">
                <el-form :model="info">
                    <el-form-item>
                        <el-input v-model="updateNickname.value" autocomplete="off" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="updateNickname.modal = false">{{t('cancel')}}</el-button>
                        <el-button type="primary" @click="updateNicknameConfirm">{{t('confirm')}}</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import useMemberStore from '@/stores/member'
import useAppStore from '@/stores/app'
import { updateMember } from '@/api/member'
import { uploadImage } from '@/api/system'
import type { UploadProps } from 'element-plus'
import { ElMessage, UploadFile, UploadFiles } from 'element-plus'
import request from '@/utils/request'
import storage from '@/utils/storage'
import { getToken } from '@/utils/common'


const memberStore = useMemberStore()
const loading = ref(true)

//会员昵称
const updateNickname = reactive({
    modal: false,
    value: ''
})

const info = computed(() =>{
    updateNickname.value = memberStore.info?.nickname;
    if(memberStore.info) loading.value = false;
    return memberStore.info;
})
const appStore = useAppStore()
definePageMeta({ middleware: 'auth' })

const upload = computed(() => {
    const headers: Record<string, any> = {}
    headers.token = getToken()
    headers['site-id'] = storage.get('siteId') || 1
    return {
        action: `${request.options.baseURL}/file/image`,
        limit: 1,
        headers,
        onSuccess: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
            let img = uploadFile?.response?.data?.url;
            if (response.code == 200) {
                updateMember({
                    field: 'headimg',
                    value: img
                }).then(() => {
                    info.headimg = img
                })
            } else {
                uploadFile.status = 'fail'
                ElMessage({ message: response.msg, type: 'error' })
            }
        }
    }
})

// 修改会员名称
const updateNicknameConfirm = () => {
        if (!updateNickname.value) { ElMessage.error('会员昵称不能为空'); return }

        updateMember({
            field: 'nickname',
            value: updateNickname.value
        }).then(res => {
            updateNickname.modal = false
        })
}
</script>

<style lang="scss" scoped>
.box-card{
    border: none !important;
}
::v-deep .form-wrap .el-form-item{
    align-items: center;
}
</style>