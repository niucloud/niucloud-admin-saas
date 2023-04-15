<template>
	<view class="diy-group" id="componentList">
		<view v-for="(component, index) in data.value" :key="component.id"
			@click="diyStore.changeCurrentIndex(index, component)" class="draggable-element relative cursor-move"
			:class="{ selected: diyStore.currentIndex == index,decorate : diyStore.mode == 'decorate' }">

			<!-- 标题 -->
			<template v-if="component.componentName == 'Text'">
				<diy-text :component="component" :index="index"></diy-text>
			</template>

			<!-- 图片广告 -->
			<template v-if="component.componentName == 'ImageAds'">
				<diy-image-ads :component="component" :index="index"></diy-image-ads>
			</template>

			<!-- 图文导航 -->
			<template v-if="component.componentName == 'GraphicNav'">
				<diy-graphic-nav :component="component" :index="index"></diy-graphic-nav>
			</template>

			<!-- 文章 -->
			<template v-if="component.componentName == 'Article'">
				<diy-article :component="component" :index="index"></diy-article>
			</template>

			<!-- 辅助空白 -->
			<template v-if="component.componentName == 'HorzBlank'">
				<diy-horz-blank :component="component" :index="index"></diy-horz-blank>
			</template>

			<!-- 会员信息 -->
			<template v-if="component.componentName == 'MemberInfo'">
				<diy-member-info :component="component" :index="index"></diy-member-info>
			</template>
		</view>
		<template v-if="diyStore.mode == ''">
			<tabbar />
		</template>
	</view>

</template>

<script lang="ts" setup>
	import useDiyStore from '@/stores/diy';
	import { onMounted, nextTick, computed } from 'vue';
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
	.draggable-element {
		&.decorate {
			&:hover:before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				border: 4rpx solid $u-primary;
				z-index: 10;
				pointer-events: none;
				cursor: move;
				border-style: dotted;
			}

			&.selected:before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				border: 4rpx solid $u-primary;
				z-index: 10;
				pointer-events: none;
				cursor: move;
			}
		}
	}
</style>