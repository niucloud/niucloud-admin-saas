<template>
	<view class="fixed-group">
		<template v-if="props.data.global.component == 'demo-index'">
			<fixed-demo-index :data="props.data" :pullDownRefresh="props.pullDownRefresh"></fixed-demo-index>
		</template>
	</view>
</template>
<script lang="ts" setup>
	const props = defineProps(['data', 'pullDownRefresh']);
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>