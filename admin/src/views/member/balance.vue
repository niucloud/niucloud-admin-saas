<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <el-card class="box-card !border-none my-[16px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="memberAccountLogTableData.searchParam" ref="searchFormRef">
                  
                    <el-form-item :label="t('fromType')" prop="from_type">
                        <el-select v-model="memberAccountLogTableData.searchParam.from_type" clearable :placeholder="t('fromTypePlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item.name" :value="key" v-for="(item,key) in fromTypeList" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker
                            v-model="memberAccountLogTableData.searchParam.create_time"
                            type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadMemberAccountLogList()">{{ t('search') }}</el-button>
                        <el-button @click="searchFormRef?.resetFields()">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[16px]">
                <el-table :data="memberAccountLogTableData.data" size="large" v-loading="memberAccountLogTableData.loading">

                    <template #empty>
                        <span>{{ !memberAccountLogTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column  :label="t('nickName')" min-width="140" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer" @click="toMember(row.member_id)">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.headimg" :src="img(row.headimg)" alt="" >
                                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/assets/images/default_headimg.png" alt="" >
                                <div class="flex flex flex-col">
                                    <span class="text-blue-700">{{ row.nickname || '' }}</span>
                                    <span class="text-blue-700">{{ row.mobile || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="account_data" :label="t('accountData')" min-width="120" />
                    <el-table-column prop="from_type_name" :label="t('fromType')" min-width="120" />
                    <el-table-column prop="create_time" :show-overflow-tooltip="true" :label="t('createTime')" min-width="150" />
                    <el-table-column prop="memo" :label="t('memo')" min-width="120" />

                    <el-table-column :label="t('operation')" fixed="right" width="100">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="memberAccountLogTableData.page" v-model:page-size="memberAccountLogTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="memberAccountLogTableData.total"
                        @size-change="loadMemberAccountLogList()" @current-change="loadMemberAccountLogList" />
                </div>
            </div>
        </el-card>
        <balance-info ref="balanceDialog" @complete="loadMemberAccountLogList" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getBalanceList,getChangeTypeList } from '@/api/member'
import { img } from '@/utils/common'
import balanceInfo from '@/views/member/components/member-balance-info.vue'
import { useRoute,useRouter } from 'vue-router'
const route = useRoute()
const member_id: number = parseInt(route.query.id || 0)

let memberAccountLogTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      from_type:"",
      create_time:"",
      mobile:"",
      member_id
    }
})

let fromTypeList = ref([])

const setFromTypeList = async () => {
    fromTypeList.value = await (await getChangeTypeList('balance')).data
}

setFromTypeList();

const searchFormRef = ref<FormInstance>()

/**
 * 获取会员账单表列表
 */
const loadMemberAccountLogList = (page: number = 1) => {
    memberAccountLogTableData.loading = true
    memberAccountLogTableData.page = page

    getBalanceList({
        page: memberAccountLogTableData.page,
        limit: memberAccountLogTableData.limit,
         ...memberAccountLogTableData.searchParam
    }).then(res => {
        memberAccountLogTableData.loading = false
        memberAccountLogTableData.data = res.data.data
        memberAccountLogTableData.total = res.data.total
    }).catch(() => {
        memberAccountLogTableData.loading = false
    })
}
loadMemberAccountLogList()

const balanceDialog: Record<string, any> | null = ref(null)
/**
 * 查看详情
 * @param data
 */
 const infoEvent = (data: any) => {
    balanceDialog.value.setFormData(data)
    balanceDialog.value.showDialog = true
}

const router = useRouter()

/**
 * 会员详情
 */
const toMember = (member_id:number) => {
    router.push(`/member/detail?id=${member_id}`)
}
 
</script>

<style lang="scss" scoped></style>