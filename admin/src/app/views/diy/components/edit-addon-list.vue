<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('addonListSet') }}</h3>
			<el-form label-width="100px" class="px-[10px]">
				<div ref="addonBoxRef">
					<div v-for="(item,index) in diyStore.editComponent.list" :key="item.id" class="item-wrap !cursor-move p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]">
                        <div v-show="item.title" class="flex items-center pb-[10px]">
							<img class="w-[60px] h-[60px] rounded-md" :src="img(item.icon)" />
                            <div class="flex flex-col justify-center ml-[10px] leading-[1]">
                                <span class="text-[14px]">{{item.title}}</span>
                                <span class="text-[12px] text-[#999] mt-[8px]">{{item.desc}}</span>
                            </div>
                        </div>
						<div class="del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]" v-show="diyStore.editComponent.list.length > 1" @click="diyStore.editComponent.list.splice(index,1)">
							<icon name="element-CircleCloseFilled" color="#bbb" size="20px"/>
						</div>
					</div>
				</div>

				<el-button class="w-full" @click="addAddon">{{ t('addAddon') }}</el-button>

			</el-form>

		</div>

		<el-dialog v-model="showDialog" :title="t('addonListTips')" width="600px" :close-on-press-escape="false" :close-on-click-modal="false">

			<div>

				<el-table :data="addonTableData.data" size="large" v-loading="addonTableData.loading" @current-change="handleCurrentChange" highlight-current-row max-height="500px">
					<template #empty>
						<span>{{ !addonTableData.loading ? t('emptyData') : '' }}</span>
					</template>

					<el-table-column :label="t('addonIcon')" width="120" align="center">
						<template #default="{ row }">
							<el-image class="w-[50px] h-[50px]" v-if="row.icon" :src="img(row.icon)" fit="contain"/>
						</template>
					</el-table-column>

					<el-table-column prop="title" :show-overflow-tooltip="true" width="120" :label="t('addonTitle')" />

					<el-table-column prop="desc" :show-overflow-tooltip="true" :label="t('addonDesc')" />

				</el-table>
			</div>

		</el-dialog>
	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">

		<!-- 组件样式 -->
		<slot name="style"></slot>
	</div>

</template>

<script lang="ts" setup>
import { t } from '@/lang'
import useDiyStore from '@/stores/modules/diy'
import { ref, reactive, onMounted, nextTick } from 'vue'
import { img } from '@/utils/common'
import { getWapIndexList } from '@/app/api/sys'
import Sortable from 'sortablejs'
import { range } from 'lodash-es'

const diyStore = useDiyStore()
diyStore.editComponent.ignore = [] // 忽略公共属性

// 组件验证
diyStore.editComponent.verify = (index: number) => {
    const res = { code: true, message: '' }
    // if (diyStore.value[index].list.length === 0) {
    //     res.code = false;
    //     res.message = t('selectAddonTips');
    // }
    return res
}

const showDialog = ref(false)

const addonBoxRef = ref()

onMounted(() => {
    nextTick(() => {
        const sortable = Sortable.create(addonBoxRef.value, {
            group: 'item-wrap',
            animation: 200,
            onEnd: event => {
                const temp = diyStore.editComponent.list[event.oldIndex!]
                diyStore.editComponent.list.splice(event.oldIndex!, 1)
                diyStore.editComponent.list.splice(event.newIndex!, 0, temp)
                sortable.sort(
                    range(diyStore.editComponent.list.length).map(value => {
                        return value.toString()
                    })
                )
            }
        })
    })
})

const addonTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        title: '',
        key: '',
    }
})

// 获取插件列表
const loadAddonList = (page: number = 1) => {
    addonTableData.loading = true
    addonTableData.page = page

    getWapIndexList({
        ...addonTableData.searchParam
    }).then(res => {
        addonTableData.loading = false
        addonTableData.data = res.data
        addonTableData.total = res.data.length
    }).catch(() => {
        addonTableData.loading = false
    })
}

loadAddonList()

const handleCurrentChange = (val:any) => {
    const item:any = {
        id: diyStore.generateRandom(),
        key: '',
        title: '',
        url: '',
        icon: '',
        desc: ''
    }
    for (let k in val) {
        item[k] = val[k]
    }

    diyStore.editComponent.list.push(item)
    showDialog.value = false
}

const addAddon = () => {
    showDialog.value = true
}

defineExpose({})
</script>

<style lang="scss" scoped>
</style>
