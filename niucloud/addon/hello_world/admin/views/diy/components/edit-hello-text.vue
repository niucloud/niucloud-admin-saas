<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">文本设置</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('blankHeight')">
					<el-slider v-model="diyStore.editComponent.height" show-input size="small" class="ml-[10px] horz-blank-slider"/>
				</el-form-item>
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
    import {t} from '@/lang'
    import useDiyStore from '@/stores/modules/diy'

    const diyStore = useDiyStore()
    diyStore.editComponent.ignore = []; // 忽略公共属性

    defineExpose({})

</script>

<style lang="scss">
	.horz-blank-slider {
		.el-slider__input {
			width: 100px;
		}
	}
</style>
<style lang="scss" scoped></style>