<template>
    <div class="w-full main-container pt-5">
        <el-carousel height="350px" indicator-position="none" arrow="never">
            <el-carousel-item>
                <div class="h-full index-carousel"></div>
            </el-carousel-item>
        </el-carousel>
        <div class="mt-[20px] mb-[50px]">
			<div>
				<div class="w-full">
					<el-breadcrumb :separator-icon="ArrowRight">
					    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					    <el-breadcrumb-item :to="{ path: '/article/list' }">文章</el-breadcrumb-item>
					    <el-breadcrumb-item v-if="selectedCategoryName">{{ selectedCategoryName }}</el-breadcrumb-item>
					</el-breadcrumb>
					<div class="flex mt-[20px] items-start">
						<div class="w-[50px]">类目：</div>
						<el-row>
							<el-button class="mb-[10px]" @click="selectedCategory(categoryItem)" v-for="(categoryItem, categoryIndex) in activeCategoryLsit" :key="categoryIndex">{{ categoryItem.name }}</el-button>
						</el-row>
					</div>
					<div class="article-list mb-[20px] cursor-pointer" v-for="(activeItem, activeIndex) in articleTableData.data" :key="activeIndex"  @click="toLink(activeItem.id)">
						<div class="flex justify-between relative py-[20px] border-b-1 border-gray-300 border-solid">
							<div class="w-[150px] h-[150px] flex items-center">
								<img :src="img(activeItem.image)"/>
							</div>
							<div class="w-[1030px]">
								<p class="text-xl font-bold">{{ activeItem.title }}</p>
								<span class="overflow-ellipsis mt-2 mb-2 tow-line-overflow text-gray-500">{{ activeItem.intro }}</span>
							</div>
							<!-- <div class="activeBo flex items-right mt-2 justify-end absolute">
								<span class="mr-5 text-sm text-gray-500">{{ activeItem.create_time }}</span>
								<div class="mr-3 flex items-center text-gray-500 text-sm"><el-icon><View /></el-icon> <span class="ml-1">158</span></div>
								<div class="mr-3 flex items-center text-gray-500 text-sm"><el-icon><Pointer /></el-icon> <span class="ml-1">22</span></div>
								<div class="mr-3 flex items-center text-gray-500 text-sm"><el-icon><Star /></el-icon> <span class="ml-1">55</span></div>
								<div class="flex items-center text-gray-500 text-sm"><el-icon><ChatDotRound /></el-icon> <span class="ml-1">655</span></div>
							</div> -->
						</div>
						
					</div>
					<el-pagination 
						class="justify-center"
						@current-change="handleCurrentChange" 
						@size-change="handleSizeChange" 
						:page-size="articleTableData.limit"
						background 
						layout="prev, pager, next" 
						:total="articleTableData.total"
					/>
				</div>
			</div>
		</div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { bind } from '@/api/auth'
import { bindMobile } from '@/api/member'
import useMemberStore from '@/stores/member'
import { getArticleCategory,getArticleList } from '@/api/article'
import { FormInstance } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter();
const activeCategoryLsit = ref([])
const selectedCategoryName = ref()
const articleTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        title: '',
        category_id:''
    }
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

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

const checkArticleCategory = () => {
	getArticleCategory().then(res => {
		activeCategoryLsit.value = res.data.data;
    })
}
checkArticleCategory()

const selectedCategory = (item) => {
	articleTableData.searchParam.category_id = item.category_id;
	selectedCategoryName.value = item.name
}

const handleSizeChange = (val: number) => {
	loadArticleList(val)
}
const handleCurrentChange = (val: number) => {
	loadArticleList(val)
}
const toLink = (id) => {
	router.push(`/article/detail?id=${id}`)
}

</script>

<style lang="scss" scoped>
.index-carousel {
	background-image: url('@/assets/images/index_carousel.png');
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
}

.article-wrap{
    span{
        line-height: 1;
        box-shadow: 0 0 5px var(--el-color-primary-light-7);
        &.active{
            background-image: linear-gradient(to right,var(--el-color-primary-light-5), var(--el-color-primary));
        }
        &:hover{
            background-image: linear-gradient(to right,var(--el-color-primary-light-5), var(--el-color-primary));
            color: #fff;
        }
    }
}

.tow-line-overflow{
    overflow: hidden;
    display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.text-color{
    color: var(--el-color-primary);
}

.custom-tabs-label span{
	font-size: 20px;
	padding: 0px 10px;
}
.activeBo {
	bottom : 20px;
	right : 0px
}
</style>