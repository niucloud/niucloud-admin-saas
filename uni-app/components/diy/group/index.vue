<template>
	<view class="diy-group" id="componentList">
		<view v-for="(component, index) in data.value" :key="component.id"
			@click="diyStore.changeCurrentIndex(index, component)" class="draggable-element relative cursor-move"
			:class="{ selected: diyStore.currentIndex == index,decorate : diyStore.mode == 'decorate' }"
			:style="component.pageStyle">

			<template v-if="component.componentName == 'Article'">
				<diy-article :component="component" :index="index"></diy-article>
			</template>
			<template v-if="component.componentName == 'GraphicNav'">
				<diy-graphic-nav :component="component" :index="index"></diy-graphic-nav>
			</template>
			<template v-if="component.componentName == 'HorzBlank'">
				<diy-horz-blank :component="component" :index="index"></diy-horz-blank>
			</template>
			<template v-if="component.componentName == 'ImageAds'">
				<diy-image-ads :component="component" :index="index"></diy-image-ads>
			</template>
			<template v-if="component.componentName == 'MemberInfo'">
				<diy-member-info :component="component" :index="index"></diy-member-info>
			</template>
			<template v-if="component.componentName == 'Text'">
				<diy-text :component="component" :index="index"></diy-text>
			</template>
		</view>
		<template v-if="diyStore.mode != 'decorate' && data.global.bottomTabBarSwitch">
			<view class="pt-[20rpx]"></view>
			<tabbar />
		</template>
	</view>
</template>
<script lang="ts" setup>
	import useDiyStore from '@/stores/diy';
	import { onMounted, nextTick, computed, ref } from 'vue';
	import Sortable from 'sortablejs';
	import { range } from 'lodash-es';
	const props = defineProps(['data']);
	const diyStore = useDiyStore();

	const data = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore;
		} else {
			return props.data;
		}
	})

	onMounted(() => {
		// #ifdef H5
		if (diyStore.mode == 'decorate') {
			var el = document.getElementById('componentList');
			const sortable = Sortable.create(el, {
				group: 'draggable-element',
				animation: 200,
				// 结束拖拽
				onEnd: event => {
					let temp = diyStore.value[event.oldIndex!];
					diyStore.value.splice(event.oldIndex!, 1);
					diyStore.value.splice(event.newIndex!, 0, temp);

					nextTick(() => {
						sortable.sort(
							range(diyStore.value.length).map(value => {
								return value.toString();
							})
						);

						diyStore.postMessage(event.newIndex, diyStore.value[event.newIndex]);
					});
				}
			});
		}
		// #endif
	});
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>