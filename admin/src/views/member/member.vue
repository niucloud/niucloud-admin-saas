<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between">
                <el-button type="primary" @click="addEvent">
                    {{ t('addMember') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[16px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="memberTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberInfo')" prop="keyword">
                        <el-input v-model="memberTableData.searchParam.keyword" class="w-[240px]"
                            :placeholder="t('memberInfoPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('registerChannel')" prop="register_channel">
                        <el-select v-model="memberTableData.searchParam.register_channel" clearable
                            :placeholder="t('channelPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item" :value="key" v-for="(item, key) in channelList" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('memberLabel')" prop="member_label">
                        <el-select v-model="memberTableData.searchParam.member_label" collapse-tags
                            :placeholder="t('memberLabelPlaceholder')" class="input-width">
                            <el-option :label="item['label_name']" :value="item['label_id']"
                                v-for="item in labelSelectData" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="memberTableData.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadMemberList()">{{ t('search') }}</el-button>
                        <el-button @click="searchFormRef?.resetFields()">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <div class="mt-[16px]">
                <el-table :data="memberTableData.data" size="large" v-loading="memberTableData.loading">

                    <template #empty>
                        <span>{{ !memberTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="nickname" :show-overflow-tooltip="true" :label="t('nickname')" min-width="170">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.headimg" :src="img(row.headimg)" alt="">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/assets/images/default_headimg.png"
                                    alt="">
                                <div class="flex flex flex-col">
                                    <span>{{ row.nickname || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" :label="t('mobile')" min-width="100" />
                    <el-table-column prop="point" :label="t('point')" min-width="70">
                        <template #default="{ row }">
                            {{ Number.parseInt(row.point) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="balance" :label="t('balance')" min-width="70" />
                    <el-table-column prop="member_label" :label="t('lable')" min-width="120">
                        <template #default="{ row }">
                            {{ memberLable(row) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="register_channel_name" :label="t('registerChannel')" min-width="120" />
                    <el-table-column :label="t('createTime')" min-width="140" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('lastVisitTime')" min-width="140" align="center">
                        <template #default="{ row }">
                            {{ row.last_visit_time || '' }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" width="200">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <el-button v-if="row.status == 1" type="primary" link @click="lockMember(row, 0)">{{
                                    t('lock') }}</el-button>
                                <el-button v-else type="primary" link @click="lockMember(row, 1)">{{ t('scrubLock')
                                }}</el-button>
                                <el-button type="primary" link @click="detailEvent(row)">{{ t('detail') }}</el-button>
                                <el-button type="primary" link @click="setMemberLable(row)">{{ t('setLable') }}</el-button>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="memberTableData.page" v-model:page-size="memberTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="memberTableData.total"
                        @size-change="loadMemberList()" @current-change="loadMemberList" />
                </div>
            </div>


            <add-member ref="addMemberDialog" @complete="loadMemberList()" />
            <edit-member ref="editMemberDialog" @complete="loadMemberList()" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { addMember, getRegisterChannelType, getMemberList, getMemberLabelAll, editMemberStatus } from '@/api/member'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import AddMember from '@/views/member/components/add-member.vue'
import EditMember from '@/views/member/components/edit-member.vue'

const memberTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        keyword: '',
        register_type: '',
        member_label: '',
        create_time: []
    }
})

const searchFormRef = ref<FormInstance>()

// 获取注册方式
const channelList = ref([])
const setChannelList = async () => {
    channelList.value = await (await getRegisterChannelType({})).data
}
setChannelList();


// 获取全部标签
let labelSelectData = ref(null)
const getMemberLabelAllFn = async () => {
    labelSelectData.value = await (await getMemberLabelAll()).data
}
getMemberLabelAllFn();

// 获取会员列表
const loadMemberList = (page: number = 1) => {
    memberTableData.loading = true
    memberTableData.page = page

    getMemberList({
        page: memberTableData.page,
        limit: memberTableData.limit,
        ...memberTableData.searchParam
    }).then(res => {
        memberTableData.loading = false
        memberTableData.data = res.data.data
        memberTableData.total = res.data.total
    }).catch(() => {
        memberTableData.loading = false
    })
}
loadMemberList()

const router = useRouter()
const addMemberDialog: Record<string, any> | null = ref(null)
const editMemberDialog: Record<string, any> | null = ref(null)


/**
 * 获取标签
 */
function memberLable(res: any) {
    let data;
    if (!res.member_label_array) return '';
    data = res.member_label_array.map((item) => {
        return item.label_name;
    });
    data = data.toString();
    return data
}

/**
 * 设置标签
 */
function setMemberLable(res: any) {
    let data = ref({
        type: 'member_label',
        id: res.member_id,
        title: t('setLable'),
        data: res
    });
    editMemberDialog.value.setDialogType(data.value)
    editMemberDialog.value.showDialog = true
}


/**
 * 添加会员
 */
const addEvent = () => {
    addMemberDialog.value.setFormData()
    addMemberDialog.value.showDialog = true
}

/**
 * 编辑会员
 * @param data
 */
const editEvent = (data: any) => { }

/**
 * 会员详情
 */
const detailEvent = (data: any) => {
    router.push(`/member/detail?id=${data.member_id}`)
}

/**
 * 变更会员状态
 */
const lockMember = (res, status) => {
    editMemberStatus({
        status: status,
        member_ids: [res.member_id]
    }).then(res => {
        if (res.code >= 0) {
            loadMemberList()
        }
    })
}
</script>

<style lang="scss" scoped></style>
