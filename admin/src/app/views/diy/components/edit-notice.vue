<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">公告图标</h3>

			<div class="px-[22px] pb-[20px]">
				<el-radio-group v-model="diyStore.editComponent.iconType" class="mb-[18px]">
					<el-radio label="system">系统图标</el-radio>
					<el-radio label="custom">自定义图标</el-radio>
				</el-radio-group>
				<div v-if="diyStore.editComponent.iconType == 'system'" class="flex items-center flex-wrap py-[8px] px-[10px] bg-[#f4f3f7] rounded">
					<img src="@/app/assets/images/diy/notice/style_01.png" :class="['h-[28px] px-[10px] py-[5px] mr-[10px] rounded cursor-pointer', {'border-[1px] border-solid border-[var(--el-color-primary)]': diyStore.editComponent.systemIcon == 'style_01'}]" @click="diyStore.editComponent.systemIcon = 'style_01'" alt="">
				</div>
				<div v-if="diyStore.editComponent.iconType == 'custom'">
					<upload-image v-model="diyStore.editComponent.imageUrl" :limit="1"/>
				</div>
			</div>
		</div>
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">公告内容</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('title')">
					<el-input v-model="diyStore.editComponent.list.text" :placeholder="t('titlePlaceholder')" clearable show-word-limit/>
				</el-form-item>
				<el-form-item label="点击类型">
					<el-radio-group v-model="diyStore.editComponent.showType" class="mb-[18px]">
						<el-radio label="popup">弹出公告内容</el-radio>
						<el-radio label="link">跳出链接</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label="t('link')" class="!mb-0" v-if="diyStore.editComponent.showType == 'link'">
					<diy-link v-model="diyStore.editComponent.list.link"/>
				</el-form-item>
			</el-form>
		</div>
	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('titleStyle') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('textFontSize')">
					<el-slider v-model="diyStore.editComponent.fontSize" show-input size="small" class="ml-[10px] article-slider" :min="12" :max="20"/>
				</el-form-item>
				<el-form-item :label="t('textFontWeight')">
					<el-radio-group v-model="diyStore.editComponent.fontWeight">
						<el-radio :label="'normal'">{{t('fontWeightNormal')}}</el-radio>
						<el-radio :label="'bold'">{{t('fontWeightBold')}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label="t('textColor')">
					<el-color-picker v-model="diyStore.editComponent.textColor"/>
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

    const diyStore = useDiyStore()
    diyStore.editComponent.ignore = []; // 忽略公共属性

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
				diyStore.editComponent.styleName = "风格1"
                break;
            case 'style-2':
                diyStore.editComponent.subTitle.control = true
                diyStore.editComponent.more.control = true
				diyStore.editComponent.styleName = "风格2"
                break;
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
	}
	.add-notice-width{
		width: calc(100% - 20px);
	}
</style>
<style lang="scss" scoped></style>