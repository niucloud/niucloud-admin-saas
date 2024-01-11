<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">

		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('hotAreaSet') }}</h3>
			<el-form label-width="80px" class="px-[10px]">

				<div ref="imageBoxRef">
					<div class="item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]">
						<el-form-item :label="t('hotAreaBackground')">
							<upload-image v-model="diyStore.editComponent.imageUrl" :limit="1" @change="selectImg"/>
						</el-form-item>

						<el-form-item :label="t('hotAreaSet')">
							<heat-map v-model="diyStore.editComponent"/>
						</el-form-item>
					</div>
				</div>

			</el-form>
		</div>

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
import { img } from '@/utils/common'

const diyStore = useDiyStore()
diyStore.editComponent.ignore = [] // 忽略公共属性

// 组件验证
diyStore.editComponent.verify = (index: number) => {
    const res = { code: true, message: '' }
    if (diyStore.value[index].imageUrl === '') {
        res.code = false
        res.message = t('imageUrlTip')
        return res
    }
    return res
}

const selectImg = (url: string) => {
    handleHeight()
}

// 处理高度
const handleHeight = () => {
    const image = new Image()
    image.src = img(diyStore.editComponent.imageUrl)
    image.onload = async () => {
        diyStore.editComponent.imgWidth = image.width
        diyStore.editComponent.imgHeight = image.height
    }
}

defineExpose({})

</script>

<style lang="scss" scoped>
</style>
