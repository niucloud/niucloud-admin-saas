<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-[20px]">{{ pageName }}</span>
            </div>

            <el-table class="mt-[20px]" :data="bottomNavTableData.data" size="large" v-loading="bottomNavTableData.loading">

                <template #empty>
                    <span>{{ !bottomNavTableData.loading ? t('emptyData') : '' }}</span>
                </template>

                <el-table-column prop="title" :label="t('title')" min-width="120" >
                    <template #default="{ row }">
                        <span>{{ row.info.title }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="key" :label="t('key')" min-width="80"/>

                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="160">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="bottomNavTableData.page" v-model:page-size="bottomNavTableData.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="bottomNavTableData.total"
                               @size-change="loadbottomNavList()" @current-change="loadbottomNavList" />
            </div>

        </el-card>

    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { t } from '@/lang'
    import { getDiyBottomList } from '@/app/api/diy'
    import { useRoute, useRouter } from 'vue-router'

    const router = useRouter()
    const route = useRoute()
    const pageName = route.meta.title

    const bottomNavTableData: any = reactive({
        page: 1,
        limit: 10,
        total: 0,
        loading: true,
        data: [],
    })

    // 获取自定义页面列表
    const loadBottomNavList = (page: number = 1) => {
        bottomNavTableData.loading = true
        bottomNavTableData.page = page

        getDiyBottomList({}).then(res => {
            bottomNavTableData.loading = false

            const len = Math.ceil(res.data.length / bottomNavTableData.limit)
            const data = JSON.parse(JSON.stringify(res.data))
            const dataGather = []
            for (let i = 0; i < len; i++) {
                dataGather[i] = data.splice(0, bottomNavTableData.limit)
            }
            bottomNavTableData.data = dataGather[bottomNavTableData.page - 1]

            bottomNavTableData.total = res.data.length
        }).catch(() => {
            bottomNavTableData.loading = false
        })
    }

    loadBottomNavList()

    // 编辑底部导航
    const editEvent = (data: any) => {
        router.push('/diy/tabbar_edit?key=' + data.key)
    }

</script>

<style lang="scss" scoped>
</style>