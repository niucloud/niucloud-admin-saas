<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('articleData') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('dataSources')">
					<el-radio-group v-model="diyStore.editComponent.sources">
						<el-radio :label="'initial'">{{t('defaultSources')}}</el-radio>
						<el-radio :label="'diy'">{{t('manualSelectionSources')}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label="t('articleNum')" v-show="diyStore.editComponent.sources == 'initial'">
					<el-slider v-model="diyStore.editComponent.count" show-input size="small" class="ml-[10px] article-slider" :min="1" :max="30"/>
				</el-form-item>
				<el-form-item :label="t('manualSelectionSources')" v-show="diyStore.editComponent.sources == 'diy'" class=" flex">
					<span @click="showArticle" class="cursor-pointer flex-1" :class="{ 'text-primary' : diyStore.editComponent.articleIds.length > 0 }">{{ diyStore.editComponent.articleIds.length > 0 ? t('selected') + diyStore.editComponent.articleIds.length + t('piece') : t('selectPlaceholder') }}</span>
					<el-icon>
						<ArrowRight/>
					</el-icon>
				</el-form-item>
			</el-form>
		</div>

		<el-dialog v-model="showDialog" :title="t('selectArticleTips')" width="60%" :close-on-press-escape="false" :close-on-click-modal="false">

			<div>
				<el-table :data="articleTableData.data" size="large" v-loading="articleTableData.loading" @selection-change="handleSelectionChange">
					<template #empty>
						<span>{{ !articleTableData.loading ? t('emptyData') : '' }}</span>
					</template>

					<el-table-column type="selection" width="55"/>

					<el-table-column prop="title" :show-overflow-tooltip="true" :label="t('articleTitle')" width="140"/>

					<el-table-column :label="t('articleImage')" min-width="120" align="center">
						<template #default="{ row }">
							<el-image class="w-12 h-12" v-if="row.image" :src="img(row.image)" fit="contain"/>
						</template>
					</el-table-column>

					<el-table-column prop="category_name" :label="t('articleCategoryName')" align="center" min-width="140"/>

					<el-table-column prop="summary" :label="t('articleSummary')" width="180" :show-overflow-tooltip="true"/>

					<el-table-column :label="t('createTime')" min-width="180" align="center">
						<template #default="{ row }">
							{{ row.create_time || '' }}
						</template>
					</el-table-column>

				</el-table>
				<div class="mt-[16px] flex justify-end">
					<el-pagination v-model:current-page="articleTableData.page" v-model:page-size="articleTableData.limit" layout="total, sizes, prev, pager, next, jumper" :total="articleTableData.total" @size-change="loadArticleList()" @current-change="loadArticleList"/>
				</div>
			</div>

			<template #footer>
	            <span class="dialog-footer">
		            <el-button @click="showDialog = false">{{ t('cancel')}}</el-button>
		            <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
	            </span>
			</template>
		</el-dialog>
	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('articleStyle') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('articleBgColor')">
					<el-color-picker v-model="diyStore.editComponent.elementBgColor" show-alpha :predefine="diyStore.predefineColors"/>
				</el-form-item>
				<el-form-item :label="t('topRounded')">
					<el-slider v-model="diyStore.editComponent.topElementRounded" show-input size="small" class="ml-[10px] graphic-nav-slider" :max="50"/>
				</el-form-item>
				<el-form-item :label="t('bottomRounded')">
					<el-slider v-model="diyStore.editComponent.bottomElementRounded" show-input size="small" class="ml-[10px] graphic-nav-slider" :max="50"/>
				</el-form-item>
			</el-form>
		</div>

		<!-- 组件样式 -->
		<slot name="style"></slot>
	</div>

</template>

<script lang="ts" setup>
    import {t} from '@/lang'
    import useDiyStore from '@/stores/modules/diy'
    import {ref, reactive} from 'vue'
    import {img} from '@/utils/common'
    import {getArticleList} from '@/api/article'

    const diyStore = useDiyStore()
    diyStore.editComponent.ignore = []; // 忽略公共属性

    // 组件验证
    diyStore.editComponent.verify = (index: number) => {
        var res = {code: true, message: ''};
        if (diyStore.value[index].sources === 'diy' && diyStore.value[index].articleIds.length === 0) {
            res.code = false;
            res.message = t('selectArticleTip');
        }
        return res;
    };

    const showDialog = ref(false)

    const showArticle = () => {
        showDialog.value = true
    }

    const articleTableData = reactive({
        page: 1,
        limit: 10,
        total: 0,
        loading: true,
        data: [],
        searchParam: {
            title: '',
            category_id: '',
            is_show: 1
        }
    })

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

    const multipleSelection: any = ref([])

    const handleSelectionChange = (val: any[]) => {
        multipleSelection.value = val
    }

    const save = () => {
        diyStore.editComponent.articleIds = [];
        multipleSelection.value.forEach((item: any) => {
            diyStore.editComponent.articleIds.push(item.id)
        })
        showDialog.value = false
    }

    defineExpose({})
</script>

<style lang="scss">
	.article-slider {
		.el-slider__input {
			width: 100px;
		}
	}
</style>
<style lang="scss" scoped>
</style>