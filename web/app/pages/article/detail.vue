<template>
    <div class="w-full min-h-[100%] main-container pt-5">
		<div class="mt-[20px] mb-[50px]" v-if="articleDeatail">
			<el-breadcrumb :separator-icon="ArrowRight">
			    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			    <el-breadcrumb-item :to="{ path: '/article/list' }">文章</el-breadcrumb-item>
			    <el-breadcrumb-item >{{ articleDeatail.category_name }}</el-breadcrumb-item>
			</el-breadcrumb>
			<div >
				<p class="py-[20px] text-center text-[24px]">{{ articleDeatail.title }}</p>
				<div class="flex justify-center">
					<!-- <div class="mr-3 flex items-center text-gray-500 text-sm text-[#999]"><el-icon><View /></el-icon> <span class="ml-1">浏览量：158</span></div> -->
					<div class="mr-3 flex items-center text-gray-500 text-sm text-[#999]"><el-icon><Clock /></el-icon><span class="ml-1">时间：{{ articleDeatail.create_time }}</span></div>
				</div>
				<div class="mt-[50px]" v-html="articleDeatail.content"></div>
			</div>
		</div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { getArticleDetail } from '@/app/api/article'
import { ArrowRight } from '@element-plus/icons-vue'
import { nMounted } from 'vue';
import { useRoute } from 'vue-router';

const Route = useRoute(); //获取到值
const articleDeatail = ref();
onMounted(() => {
	obtainArticleInfo(Route.query.id)
});

const obtainArticleInfo = (id) => {
	getArticleDetail(id).then(res => {
		articleDeatail.value = res.data;
    })
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
</style>
