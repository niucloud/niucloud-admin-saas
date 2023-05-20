<template>
	<view class="diy-group" id="componentList">
		<view v-for="(component, index) in data.value" :key="component.id"
			@click="diyStore.changeCurrentIndex(index, component)" class="draggable-element relative cursor-move"
			:class="{ selected: diyStore.currentIndex == index,decorate : diyStore.mode == 'decorate' }">

			<!-- 标题 -->
			<template v-if="component.componentName == 'Text'">
				<diy-system-text :component="component" :index="index"></diy-system-text>
			</template>

			<!-- 图片广告 -->
			<template v-if="component.componentName == 'ImageAds'">
				<diy-system-image-ads :component="component" :index="index"></diy-system-image-ads>
			</template>

			<!-- 图文导航 -->
			<template v-if="component.componentName == 'GraphicNav'">
				<diy-system-graphic-nav :component="component" :index="index"></diy-system-graphic-nav>
			</template>

			<!-- 文章 -->
			<template v-if="component.componentName == 'Article'">
				<diy-system-article :component="component" :index="index"></diy-system-article>
			</template>

			<!-- 辅助空白 -->
			<template v-if="component.componentName == 'HorzBlank'">
				<diy-system-horz-blank :component="component" :index="index"></diy-system-horz-blank>
			</template>

			<!-- 会员信息 -->
			<template v-if="component.componentName == 'MemberInfo'">
				<diy-system-member-info :component="component" :index="index"></diy-system-member-info>
			</template>

			<!-- 自定义扩展组件 -->
			<template v-if="systemComponent.indexOf(component.componentName) == -1">
				<diy-comp-extend :component="component" :index="index"></diy-comp-extend>
			</template>
		</view>
		<template v-if="diyStore.mode == ''">
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

	// 系统组件
	const systemComponent = ref(['Text', 'ImageAds', 'GraphicNav', 'Article', 'HorzBlank', 'MemberInfo'])

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