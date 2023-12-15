<template>
    <template v-if="meta.show">
        <el-sub-menu v-if="routes.children" :index="String(routes.name)">
            <template #title>
                <div v-if="meta.icon && routes.meta.class == 1" class="w-[16px] h-[16px] relative flex items-center">
                    <icon v-if="meta.icon" :name="meta.icon" class="absolute !w-auto" />
                </div>
                <span :class="['ml-[10px]', {'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}]">{{ meta.title }}</span>
            </template>
            <menu-item v-for="(route, index) in routes.children" :routes="route" :route-path="resolvePath(route.path)" :key="index" />
        </el-sub-menu>
        <el-menu-item v-else-if="routes.meta.class == 1" :index="String(routes.name)" :route="'/'+routePath">
            <div v-if="meta.icon" class="w-[16px] h-[16px] relative flex justify-center">
                <icon :name="meta.icon" class="absolute top-[50%] -translate-y-[50%]" />
            </div>
            <template #title>
				<div class="relative">
					<span :class="['ml-[10px]', {'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}]">{{ meta.title }}</span>
					<div v-if="routes.path == '/site/siteindex'" class="absolute  top-[50%] -translate-y-[50%] right-[-180%]" @click="checkIndexList">
						<img class="w-[12px] h-[12px]" src="@/app/assets/images/index/model_tag.png"/>
					</div>
				</div>
            </template>
        </el-menu-item>
        <el-menu-item v-else :index="String(routes.name)" :route="'/'+routePath">
            <template #title>
                <span :class="[{'text-[15px]': routes.meta.class == 1}, {'text-[14px]': routes.meta.class != 1}, {'ml-[10px]': routes.meta.class == 2, 'ml-[15px]': routes.meta.class == 3}]">{{ meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
	<el-dialog v-model="showDialog" :title="t('indexTemplate')" width="550px" :destroy-on-close="true" >
		<div class="flex flex-wrap">
			<div v-for="(items, index) in indexList" :key="index" v-if="index_path == ''">
				<div @click="index_path = items.view_path" class="index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer" :class="items.is_use == 1 ? 'bg-primary text-[#fff]' : '' ">
					<span >{{ items.name }}</span>
				</div>
			</div>
			<div v-for="(itemTo, indexTo) in indexList" :key="indexTo" v-else>
				<div @click="index_path = itemTo.view_path" class="index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer" :class="index_path == itemTo.view_path ? 'bg-primary text-[#fff]' : '' ">
					<span >{{ itemTo.name }}</span>
				</div>
			</div>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="submitIndex">{{ t('confirm') }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { getIndexList, setIndexList } from '@/app/api/sys'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import menuItem from './menu-item.vue'
import { CollectionTag } from '@element-plus/icons-vue'
const router = useRouter()
const props = defineProps({
    routes: {
        type: Object,
        required: true
    },
    routePath: {
        type: String
    }
})
console.log("props",props.routePath)

const meta = computed(() => props.routes.meta)

const resolvePath = (path: string) => {
    return `${props.routePath}/${path}`
}

const indexList = ref();
const showDialog = ref(false)
const checkIndexList = () => {
	getIndexList().then(res => {
		showDialog.value = true
		indexList.value = res.data
		for(let i = 0 ; i < indexList.value.length; i ++){
			if(indexList.value[i].is_use == 1){
				index_path.value = indexList.value[i].view_path
			}
		}
	})
}

const index_path = ref('');
const submitIndex = () => {
	setIndexList({
		view_path: index_path.value
	}).then(() => {
	    showDialog.value = false
	    router.go(0)
	})
}

</script>

<style lang="scss">
.el-sub-menu{
    .el-icon{
        width: auto;
    }
    li{
        font-size: 15px;
    }
}
.el-alert .el-alert__description{
    margin-top: 0;
}
.index-item {
	border: 1px solid;
	border-color: var(--el-color-primary);
    &:hover {
		color: #fff;
        background-color: var(--el-color-primary);
    }
}
</style>
