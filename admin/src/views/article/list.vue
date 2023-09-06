<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-[20px]">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">{{ t('addArticle') }}</el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="articleTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="articleTableData.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('categoryName')" prop="category_id">
                        <el-select v-model="articleTableData.searchParam.category_id" clearable :placeholder="t('categoryIdPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item['name']" :value="item['category_id']" v-for="item in categoryList" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadArticleList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="articleTableData.data" size="large" v-loading="articleTableData.loading">
                    <template #empty>
                        <span>{{ !articleTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="id" :show-overflow-tooltip="true" :label="t('ID')" width="100" />

                    <el-table-column prop="category_name" :label="t('categoryName')" width="120" />

                    <el-table-column prop="title" :show-overflow-tooltip="true" :label="t('title')" width="180">
                        <template #default="{ row }">
                            <a :href="row.article_url.web_url" target="_blank">{{ row.title }}</a>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('image')" min-width="120" align="center">
                        <template #default="{ row }">
                            <el-image class="w-12 h-12" v-if="row.image" :src="img(row.image)" fit="contain" />
                        </template>
                    </el-table-column>

                    <el-table-column prop="visit" :label="t('visit')" width="120" align="center">
                        <template #default="{ row }">
                            <span>{{ parseInt(row.visit + row.visit_virtual) }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('isShow')" min-width="120" align="center">
                        <template #default="{ row }">
                            <span v-if="row.is_show == 1">{{ t('show') }}</span>
                            <span v-if="row.is_show == 0">{{t('hidden')}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="sort" :label="t('sort')" width="100" align="center" />

                    <el-table-column :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" width="130">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="danger" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="articleTableData.page" v-model:page-size="articleTableData.limit" layout="total, sizes, prev, pager, next, jumper" :total="articleTableData.total" @size-change="loadArticleList()" @current-change="loadArticleList" />
                </div>
            </div>

        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getArticleList, deleteArticle, getArticleCategoryAll } from '@/api/article'
import { img } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title

const articleTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        title: '',
        category_id: ''
    }
})
const categoryList = ref([])

const searchFormRef = ref<FormInstance>()

const setCategoryList = async () => {
    categoryList.value = await (await getArticleCategoryAll({})).data
}
setCategoryList()

/**
 * 获取文章列表
 */
const loadArticleList = (page: number = 1) => {
    articleTableData.loading = true
    articleTableData.page = page

    getArticleList({
        page: articleTableData.page,
        limit: articleTableData.limit,
        ...articleTableData.searchParam
    }).then(res => {
        articleTableData.loading = false
        articleTableData.data = res.data.data
        articleTableData.total = res.data.total
    }).catch(() => {
        articleTableData.loading = false
    })
}
loadArticleList()

const router = useRouter()

/**
 * 添加文章
 */
const addEvent = () => {
    router.push('/article/edit')
}

/**
 * 编辑文章
 * @param data
 */
const editEvent = (data: any) => {
    router.push(`/article/edit?id=${data.id}`)
}

/**
 * 删除文章
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('articleDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteArticle(id).then(() => {
            loadArticleList()
        }).catch(() => {
        })
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadArticleList()
}
</script>

<style lang="scss" scoped></style>
