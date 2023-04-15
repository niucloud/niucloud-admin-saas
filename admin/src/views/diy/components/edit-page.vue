<template>
	<!--	class="border-solid border-b-4 border-gray-200 mb-[20px]"-->
	<div class="edit-page-set">
		<h3 class="mb-[10px]">{{ t('pageContent') }}</h3>
		<el-form label-width="80px" class="px-[10px]">
			<el-form-item :label="t('pageName')">
				<el-input v-model="diyStore.global.title" :placeholder="t('pageNamePlaceholder')" clearable
				          maxlength="12" show-word-limit/>
			</el-form-item>
			<el-form-item :label="t('pageBgColor')">
				<el-color-picker v-model="diyStore.global.pageBgColor" show-alpha :predefine="predefineColors"/>
			</el-form-item>
			<el-form-item :label="t('tabbar')">
				<el-switch v-model="diyStore.global.tabbarSwitch"/>
				<!--<div class="text-sm text-gray-400">{{ t('tabbarSwitchTips') }}</div>-->
			</el-form-item>
			<el-form-item>
				<div class="text-sm text-gray-400">{{ t('tabbarSwitchTips') }}</div>
			</el-form-item>
		</el-form>
	</div>

</template>

<script lang="ts" setup>
    import {t} from '@/lang'
    import {ref} from 'vue'
    import useDiyStore from '@/stores/modules/diy'

    const diyStore = useDiyStore()
    const predefineColors = ref([
        '#F4391c',
        '#ff4500',
        '#ff8c00',
        '#FFD009',
        '#ffd700',
        '#19C650',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#FF407E',
        '#CFAF70',
        '#A253FF',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
    ])
    defineExpose({})
</script>

<style lang="scss" scoped></style>