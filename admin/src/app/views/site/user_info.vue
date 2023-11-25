<template>
    <div class="main-container" v-loading="loading">
        <div class="detail-head">
            <div class="left" @click="router.push({ path: '/admin/site/user' })">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t('returnToPreviousPage') }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <h3 class="panel-title !text-[16px] pl-[15px] mb-[20px]">{{ t('userInfo') }}</h3>
            <el-row :gutter="20" class="pl-[15px] mb-[20px]">
                <el-col :span="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('uid') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.uid }}
                    </span>
                </el-col>
                <el-col :span="6" :offset="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('username') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.username }}
                    </span>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="pl-[15px] mb-[20px]">
                <el-col :span="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('realname') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.real_name || '--' }}
                    </span>
                </el-col>
                <el-col :span="6" :offset="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('addTime') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.create_time }}
                    </span>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="pl-[15px] mb-[20px]">
                <el-col :span="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('lastLoginTime') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.last_time || '' }}
                    </span>
                </el-col>
                <el-col :span="6" :offset="6">
                    <span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('lastLoginIP') }}</span>
                    <span class="text-[14px] text-[#666666]">
                        {{ detail.last_ip || '' }}
                    </span>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card !border-none" shadow="never">
            <h3 class="panel-title !text-[16px] pl-[15px]">{{ t('siteInfo') }}</h3>

            <el-table :data="detail.roles" size="large">
                <el-table-column prop="site_id" :label="t('siteId')" width="100px" />
                <el-table-column prop="site_name" :label="t('siteName')" />
                <el-table-column prop="last_time" :label="t('isAdmin')" min-width="180" align="center">
                    <template #default="{ row }">
                        {{ row.is_admin ? t('yes') : t('no') }}
                    </template>
                </el-table-column>
                <el-table-column :label="t('status')" min-width="80" align="center">
                    <template #default="{ row }">
                        <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ row.status_name }}</el-tag>
                        <el-tag class="ml-2" type="error" v-else-if="row.status == 3">
                            {{ row.status_name }}
                        </el-tag>
                        <el-tag class="ml-2" type="error" v-else>
                            {{ row.status_name }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="expire_time" :label="t('expireTime')" />
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { getUserInfo } from '@/app/api/site'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const uid: number = parseInt(route.query.uid || 0)
const loading = ref(true)
const detail = ref({})

getUserInfo(uid).then(({ data }) => {
    detail.value = data
    loading.value = false
}).catch()

</script>

<style lang="scss" scoped></style>
