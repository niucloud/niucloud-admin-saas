<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('pageContent') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('pageName')">
					<el-input v-model="diyStore.global.title" :placeholder="t('pageNamePlaceholder')" clearable maxlength="12" show-word-limit/>
				</el-form-item>
				<el-form-item :label="t('tabbar')" class="display-block">
					<el-switch v-model="diyStore.global.bottomTabBarSwitch"/>
					<div class="text-sm text-gray-400">{{ t('tabbarSwitchTips') }}</div>
				</el-form-item>
			</el-form>
		</div>
	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('pageStyle') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('pageBgColor')">
					<el-color-picker v-model="diyStore.global.pageBgColor" show-alpha :predefine="diyStore.predefineColors"/>
				</el-form-item>
				<el-form-item :label="t('bgUrl')">
					<upload-image v-model="diyStore.global.bgUrl" :limit="1"/>
				</el-form-item>
			</el-form>
		</div>
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('marginSet') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('marginBoth')">
					<el-slider v-model="diyStore.global.template.margin.both" show-input size="small" @input="inputBoth" class="ml-[10px] horz-blank-slider"/>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { watch } from 'vue'
import useDiyStore from '@/stores/modules/diy'
import { img } from '@/utils/common'

const diyStore = useDiyStore()

watch(
    () => diyStore.global.bgUrl,
    (newValue, oldValue) => {
        // 设置图片宽高
        const image = new Image()
        image.src = img(diyStore.global.bgUrl)
        image.onload = async () => {
            diyStore.global.imgWidth = image.width
            diyStore.global.imgHeight = image.height
        }
    }
)

// 改变页面的左右边距时，更新所有组件的数值
const inputBoth = (value:any)=>{

    diyStore.value.forEach((item,index)=>{
        item.margin.both = value;
    })

}

defineExpose({})
</script>

<style lang="scss" scoped></style>
