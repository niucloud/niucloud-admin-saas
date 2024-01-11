<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('styleSet') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('selectStyle')" class="flex">
					<span class="text-primary flex-1 cursor-pointer" @click="showStyle">{{ diyStore.editComponent.styleName
					}}</span>
					<el-icon>
						<ArrowRight />
					</el-icon>
				</el-form-item>
			</el-form>
		</div>
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('titleContent') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('title')">
					<el-input v-model="diyStore.editComponent.text" :placeholder="t('titlePlaceholder')" clearable
						maxlength="15" show-word-limit />
				</el-form-item>
				<el-form-item :label="t('link')">
					<diy-link v-model="diyStore.editComponent.link" />
				</el-form-item>
				<el-form-item :label="t('textAlign')" v-show="diyStore.editComponent.style == 'style-1'">
					<el-radio-group v-model="diyStore.editComponent.textAlign">
						<el-radio :label="'left'">{{ t('textAlignLeft') }}</el-radio>
						<el-radio :label="'center'">{{ t('textAlignCenter') }}</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
		</div>

		<div class="edit-attr-item-wrap" v-show="diyStore.editComponent.subTitle.control">
			<h3 class="mb-[10px]">{{ t('subTitleContent') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('subTitle')">
					<el-input v-model="diyStore.editComponent.subTitle.text" :placeholder="t('subTitlePlaceholder')"
						clearable maxlength="30" show-word-limit />
				</el-form-item>
				<el-form-item :label="t('textFontSize')">
					<el-slider v-model="diyStore.editComponent.subTitle.fontSize" show-input size="small"
						class="ml-[10px] article-slider" :min="12" :max="16" />
				</el-form-item>
				<el-form-item :label="t('textColor')">
					<el-color-picker v-model="diyStore.editComponent.subTitle.color" />
				</el-form-item>
			</el-form>
		</div>

		<div class="edit-attr-item-wrap" v-show="diyStore.editComponent.more.control">
			<h3 class="mb-[10px]">{{ t('moreContent') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('more')">
					<el-input v-model="diyStore.editComponent.more.text" :placeholder="t('morePlaceholder')" clearable
						maxlength="8" show-word-limit />
				</el-form-item>
				<el-form-item :label="t('link')">
					<diy-link v-model="diyStore.editComponent.more.link" />
				</el-form-item>
				<el-form-item :label="t('moreIsShow')">
					<el-switch v-model="diyStore.editComponent.more.isShow" />
				</el-form-item>
				<el-form-item :label="t('textColor')">
					<el-color-picker v-model="diyStore.editComponent.more.color" />
				</el-form-item>
			</el-form>
		</div>

		<el-dialog v-model="showDialog" :title="t('selectStyle')" width="40%">

			<div class="flex flex-wrap">
				<div class="flex items-center justify-center overflow-hidden w-[280px] h-[100px] mr-[12px] cursor-pointer border bg-gray-50"
					:class="{ 'border-primary': selectStyle == 'style-1' }" @click="selectStyle = 'style-1'">
					<img class="max-w-[280px] max-h-[220px]" src="@/app/assets/images/diy/text/style1.png" />
				</div>
				<div class="flex items-center justify-center overflow-hidden w-[280px] h-[100px] mr-[12px] cursor-pointer border bg-gray-50"
					:class="{ 'border-primary': selectStyle == 'style-2' }" @click="selectStyle = 'style-2'">
					<img class="max-w-[280px] max-h-[220px]" src="@/app/assets/images/diy/text/style2.png" />
				</div>
			</div>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
					<el-button type="primary" @click="changeStyle">{{ t('confirm') }}</el-button>
				</span>
			</template>

		</el-dialog>
	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">

		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('titleStyle') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('textFontSize')">
					<el-slider v-model="diyStore.editComponent.fontSize" show-input size="small"
						class="ml-[10px] article-slider" :min="12" :max="20" />
				</el-form-item>
				<el-form-item :label="t('textFontWeight')">
					<el-radio-group v-model="diyStore.editComponent.fontWeight">
						<el-radio :label="'normal'">{{ t('fontWeightNormal') }}</el-radio>
						<el-radio :label="'bold'">{{ t('fontWeightBold') }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label="t('textColor')">
					<el-color-picker v-model="diyStore.editComponent.textColor" />
				</el-form-item>
			</el-form>
		</div>

		<!-- 组件样式 -->
		<slot name="style"></slot>

	</div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import useDiyStore from '@/stores/modules/diy'
import { ref } from 'vue'

const diyStore = useDiyStore()
diyStore.editComponent.ignore = [] // 忽略公共属性

const showDialog = ref(false)

const showStyle = () => {
    showDialog.value = true
}

const selectStyle = ref(diyStore.editComponent.style)

const changeStyle = () => {
    switch (selectStyle.value) {
        case 'style-1':
            diyStore.editComponent.subTitle.control = false
            diyStore.editComponent.more.control = false
            diyStore.editComponent.styleName = '风格1'
            break
        case 'style-2':
            diyStore.editComponent.subTitle.control = true
            diyStore.editComponent.more.control = true
            diyStore.editComponent.styleName = '风格2'
            break
    }
    diyStore.editComponent.style = selectStyle.value
    showDialog.value = false
}

defineExpose({})

</script>

<style lang="scss">
.horz-blank-slider {
	.el-slider__input {
		width: 100px;
	}
}</style>
<style lang="scss" scoped></style>
