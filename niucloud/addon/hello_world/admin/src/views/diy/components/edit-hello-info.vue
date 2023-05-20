<template>
	<div class="edit-horz-blank">
		<h3 class="mb-[10px]">test信息设置</h3>
		<el-form label-width="80px" class="px-[10px]">
			<el-form-item :label="t('blankHeight')">
				<el-slider v-model="diyStore.editComponent.height" show-input size="small"
				           class="ml-[10px] horz-blank-slider"/>
			</el-form-item>
		</el-form>
	</div>

</template>

<script lang="ts" setup>
    import {t} from '@/lang'
    import useDiyStore from '@/stores/modules/diy'

    const diyStore = useDiyStore()

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