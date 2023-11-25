<template>
	<view :class="['rubik-cube', diyStore.mode]" :style="warpCss">

		<!-- 1左2右 -->
		<template v-if="diyComponent.mode == 'row1-lt-of2-rt'">
			<view class="template-left">
				<app-link :data="diyComponent.list[0].link" :class="['item', diyComponent.mode]"
					:style="{ marginRight: diyComponent.imageGap * 2 + 'rpx', width: diyComponent.list[0].imgWidth, height: diyComponent.list[0].imgHeight + 'px' }">
					<image :src="img(diyComponent.list[0].imageUrl)" mode="scaleToFill"
						:style="diyComponent.list[0].pageItemStyle" :show-menu-by-longpress="true"></image>
				</app-link>
			</view>

			<view class="template-right">
				<template v-for="(item, index) in diyComponent.list" :key="index">
					<template v-if="index > 0">
						<app-link :data="item.link" :class="['item', diyComponent.mode]"
							:style="{ marginBottom: diyComponent.imageGap * 2 + 'rpx', width: item.imgWidth, height: item.imgHeight + 'px' }">
							<image :src="img(item.imageUrl)" mode="scaleToFill" :style="item.pageItemStyle"
								:show-menu-by-longpress="true"></image>
						</app-link>
					</template>
				</template>
			</view>
		</template>

		<!-- 1左3右 -->
		<template v-else-if="diyComponent.mode == 'row1-lt-of1-tp-of2-bm'">
			<view class="template-left">
				<app-link :data="diyComponent.list[0].link" :class="['item', diyComponent.mode]"
					:style="{ marginRight: diyComponent.imageGap * 2 + 'rpx', width: diyComponent.list[0].imgWidth, height: diyComponent.list[0].imgHeight + 'px' }">
					<image :src="img(diyComponent.list[0].imageUrl)" mode="scaleToFill"
						:style="diyComponent.list[0].pageItemStyle" :show-menu-by-longpress="true"></image>
				</app-link>
			</view>

			<view class="template-right">
				<app-link :data="diyComponent.list[1].link" :class="['item', diyComponent.mode]"
					:style="{ marginBottom: diyComponent.imageGap * 2 + 'rpx', width: diyComponent.list[1].imgWidth, height: diyComponent.list[1].imgHeight + 'px' }">
					<image :src="img(diyComponent.list[1].imageUrl)" mode="scaleToFill"
						:style="diyComponent.list[1].pageItemStyle" :show-menu-by-longpress="true"></image>
				</app-link>
				<view class="template-bottom">
					<template v-for="(item, index) in diyComponent.list" :key="index">
						<template v-if="index > 1">
							<app-link :data="item.link" :class="['item', diyComponent.mode]" :style="{
										marginRight: diyComponent.imageGap * 2 + 'rpx',
										width: item.imgWidth,
										height: item.imgHeight + 'px'
									}">
								<image :src="img(item.imageUrl)" mode="scaleToFill" :style="item.pageItemStyle"
									:show-menu-by-longpress="true"></image>
							</app-link>
						</template>
					</template>
				</view>
			</view>
		</template>

		<template v-else>
			<app-link :class="['item', diyComponent.mode]" v-for="(item, index) in diyComponent.list" :key="index"
				:data="item.link"
				:style="{ marginRight: diyComponent.imageGap * 2 + 'rpx', marginBottom: diyComponent.imageGap * 2 + 'rpx', width: item.widthStyle, height: item.imgHeight + 'px' }">
				<image :src="img(item.imageUrl)" :mode="'scaleToFill'" :style="item.pageItemStyle"
					:show-menu-by-longpress="true"></image>
			</app-link>
		</template>

	</view>
</template>

<script setup lang="ts">
	// 魔方
	import { onMounted, computed, watch } from 'vue';
	import useDiyStore from '@/app/stores/diy';
	import { img } from '@/utils/common';

	const props = defineProps(['component', 'index', 'pullDownRefresh']);

	const diyStore = useDiyStore();

	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})

	const warpCss = computed(() => {
		var style = '';
		if (diyComponent.value.componentBgColor) style += 'background-color:' + diyComponent.value.componentBgColor + ';';
		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		return style;
	})

	const countBorderRadius = (type, index) => {
		var obj = '';
		if (diyComponent.value.elementAngle == 'right') {
			return obj;
		}
		var defaultData = {
			'row1-lt-of2-rt': [
				['border-top-right-radius', 'border-bottom-right-radius'],
				['border-top-left-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'],
				['border-top-left-radius', 'border-bottom-left-radius', 'border-top-right-radius']
			],
			'row1-lt-of1-tp-of2-bm': [
				['border-top-right-radius', 'border-bottom-right-radius'],
				['border-top-left-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'],
				['border-radius'],
				['border-top-left-radius', 'border-bottom-left-radius', 'border-top-right-radius']
			],
			'row1-tp-of2-bm': [
				['border-bottom-left-radius', 'border-bottom-right-radius'],
				['border-top-left-radius', 'border-bottom-right-radius', 'border-top-right-radius'],
				['border-top-left-radius', 'border-bottom-left-radius', 'border-top-right-radius']
			],
			'row2-lt-of2-rt': [
				['border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'],
				['border-top-left-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
				['border-top-left-radius', 'border-bottom-right-radius', 'border-top-right-radius'],
				['border-top-left-radius', 'border-bottom-left-radius', 'border-top-right-radius']
			],
			'row1-of4': [
				['border-top-right-radius', 'border-bottom-right-radius'],
				['border-radius'],
				['border-radius'],
				['border-top-left-radius', 'border-bottom-left-radius']
			],
			'row1-of3': [
				['border-top-right-radius', 'border-bottom-right-radius'],
				['border-radius'],
				['border-top-left-radius', 'border-bottom-left-radius']
			],
			'row1-of2': [
				['border-top-right-radius', 'border-bottom-right-radius'],
				['border-top-left-radius', 'border-bottom-left-radius']
			]
		};

		defaultData[type][index].forEach((item, index) => {
			obj += 'border-top-left-radius:' + diyComponent.value.topElementRounded * 2 + 'rpx;';
			obj += 'border-top-right-radius:' + diyComponent.value.topElementRounded * 2 + 'rpx;';
			obj += 'border-bottom-left-radius:' + diyComponent.value.bottomElementRounded * 2 + 'rpx;';
			obj += 'border-bottom-right-radius:' + diyComponent.value.bottomElementRounded * 2 + 'rpx;';
		});
		return obj;
	}

	watch(
		() => props.pullDownRefresh,
		(newValue, oldValue) => {
			// 处理下拉刷新业务
		}
	)

	onMounted(() => {
		refresh();
		// 装修模式下刷新
		watch(
			() => diyComponent.value,
			(newValue, oldValue) => {
				if (newValue && newValue.componentName == 'RubikCube') {
					refresh();
				}
			}
		)
	});

	const refresh = () => {
		if (diyStore.mode == 'decorate') {
			diyComponent.value.list.forEach((item : any, index) => {
				// 装修模式下设置默认图
				if (item.imageUrl == '') {
					item.imageUrl = 'static/resource/images/diy/figure.png';
					item.imgWidth = 690;
					item.imgHeight = 330;
				}
			});
		}
		handleData()
	}

	const handleData = () => {
		var singleRow = {
			'row1-of2': {
				ratio: 2,
				width: 'calc((100% - ' + uni.upx2px(diyComponent.value.imageGap * 2) + 'px) / 2)'
			},
			'row1-of3': {
				ratio: 3,
				width: 'calc((100% - ' + uni.upx2px(diyComponent.value.imageGap * 4) + 'px) / 3)'
			},
			'row1-of4': {
				ratio: 4,
				width: 'calc((100% - ' + uni.upx2px(diyComponent.value.imageGap * 6) + 'px) / 4)'
			}
		};

		diyComponent.value.list.forEach((item, index) => {
			item.pageItemStyle = countBorderRadius(diyComponent.value.mode, index);
		});

		if (singleRow[diyComponent.value.mode]) {
			calcSingleRow(singleRow[diyComponent.value.mode]);
		} else if (diyComponent.value.mode == 'row2-lt-of2-rt') {
			calcFourSquare();
		} else if (diyComponent.value.mode == 'row1-lt-of2-rt') {
			calcRowOneLeftOfTwoRight();
		} else if (diyComponent.value.mode == 'row1-tp-of2-bm') {
			calcRowOneTopOfTwoBottom();
		} else if (diyComponent.value.mode == 'row1-lt-of1-tp-of2-bm') {
			calcRowOneLeftOfOneTopOfTwoBottom();
		}
	};

	/**
	 * 魔方：单行多个，平分宽度
	 * 公式：
	 * 宽度：屏幕宽度/2，示例：375/2=187.5
	 * 比例：原图高/原图宽，示例：322/690=0.46
	 * 高度：宽度*比例，示例：187.5*0.46=86.25
	 */
	const calcSingleRow = (params) => {
		uni.getSystemInfo({
			success: res => {
				let maxHeight = 0;

				diyComponent.value.list.forEach((item, index) => {
					var ratio = item.imgHeight / item.imgWidth;

					let width = res.windowWidth - uni.upx2px(diyComponent.value.margin.both *
						2); // 减去左右间距
					if (diyComponent.value.imageGap > 0) {
						width -= uni.upx2px(params.ratio * diyComponent.value.imageGap * 2); // 减去间隙
					}
					item.imgWidth = width / params.ratio;
					item.imgHeight = item.imgWidth * ratio;

					if (maxHeight == 0 || maxHeight < item.imgHeight) maxHeight = item
						.imgHeight;
				})

				diyComponent.value.list.forEach((item, index) => {
					item.widthStyle = params.width;
					item.imgHeight = maxHeight;
				});
			}
		})
	};

	/**
	 * 魔方：四方型，各占50%
	 */
	const calcFourSquare = () => {
		uni.getSystemInfo({
			success: res => {
				let maxHeightFirst = 0;
				let maxHeightTwo = 0;
				diyComponent.value.list.forEach((item, index) => {
					var ratio = item.imgHeight / item.imgWidth;
					item.imgWidth = res.windowWidth;
					item.imgWidth -= uni.upx2px(diyComponent.value.margin.both * 4);
					if (diyComponent.value.imageGap > 0) {
						item.imgWidth -= uni.upx2px(diyComponent.value.imageGap * 2);
					}
					item.imgWidth = item.imgWidth / 2;
					item.imgHeight = item.imgWidth * ratio;


					// 获取每行最大高度
					if (index <= 1) {
						if (maxHeightFirst == 0 || maxHeightFirst < item.imgHeight) {
							maxHeightFirst = item.imgHeight;
						}
					} else if (index > 1) {
						if (maxHeightTwo == 0 || maxHeightTwo < item.imgHeight) {
							maxHeightTwo = item.imgHeight;
						}
					}
				});
				diyComponent.value.list.forEach((item, index) => {
					item.imgWidth = 'calc((100% - ' + uni.upx2px(diyComponent.value.imageGap * 2) +
						'px) / 2)';
					item.widthStyle = item.imgWidth;
					if (index <= 1) {
						item.imgHeight = maxHeightFirst;
					} else if (index > 1) {
						item.imgHeight = maxHeightTwo;
					}
				});
			}
		});
	}

	/**
	 * 魔方：1左2右
	 */
	const calcRowOneLeftOfTwoRight = () => {
		let rightHeight = 0; // 右侧两图平分高度
		let divide = 'left'; // 划分规则，left：左，right：右
		if (diyComponent.value.list[1].imgWidth === diyComponent.value.list[2].imgWidth) divide = 'right';
		uni.getSystemInfo({
			success: res => {
				diyComponent.value.list.forEach((item, index) => {
					if (index == 0) {
						var ratio = item.imgHeight / item.imgWidth; // 获取左图的尺寸比例
						item.imgWidth = res.windowWidth - uni.upx2px(diyComponent.value.margin
							.both * 4) - uni.upx2px(diyComponent.value.imageGap * 2);
						item.imgWidth = item.imgWidth / 2;
						item.imgHeight = item.imgWidth * ratio;
						rightHeight = (item.imgHeight - uni.upx2px(diyComponent.value.imageGap *
							2)) / 2;
						item.imgWidth += 'px';
					} else {
						item.imgWidth = diyComponent.value.list[0].imgWidth;
						item.imgHeight = rightHeight;
					}
				});
			}
		});
	}

	/**
	 * 魔方：1上2下
	 */
	const calcRowOneTopOfTwoBottom = () => {
		var maxHeight = 0;
		uni.getSystemInfo({
			success: res => {
				diyComponent.value.list.forEach((item, index) => {

					var ratio = item.imgHeight / item.imgWidth; // 获取左图的尺寸比例
					if (index == 0) {
						item.imgWidth = res.windowWidth - uni.upx2px(diyComponent.value.margin
							.both * 4);
					} else if (index > 0) {
						item.imgWidth = res.windowWidth - uni.upx2px(diyComponent.value.margin
							.both * 4) - uni.upx2px(diyComponent.value.imageGap * 2);
						item.imgWidth = item.imgWidth / 2;
					}

					item.imgHeight = item.imgWidth * ratio;

					// 获取最大高度
					if (index > 0 && (maxHeight == 0 || maxHeight < item.imgHeight))
						maxHeight = item.imgHeight;

				});
				diyComponent.value.list.forEach((item, index) => {
					item.imgWidth += 'px';
					item.widthStyle = item.imgWidth;
					if (index > 0) item.imgHeight = maxHeight;
				});
			}
		});
	}

	/**
	 * 魔方：1左3右
	 */
	const calcRowOneLeftOfOneTopOfTwoBottom = () => {
		uni.getSystemInfo({
			success: res => {
				diyComponent.value.list.forEach((item, index) => {
					// 左图
					if (index == 0) {
						var ratio = item.imgHeight / item.imgWidth; // 获取左图的尺寸比例
						item.imgWidth = res.windowWidth - uni.upx2px(diyComponent.value.margin
							.both * 4) - uni.upx2px(diyComponent.value.imageGap * 2);
						item.imgWidth = item.imgWidth / 2;
						item.imgHeight = item.imgWidth * ratio;
					} else if (index == 1) {
						item.imgWidth = diyComponent.value.list[0].imgWidth;
						item.imgHeight = (diyComponent.value.list[0].imgHeight - uni.upx2px(diyComponent.value
							.imageGap * 2)) / 2;
					} else if (index > 1) {
						item.imgWidth = (diyComponent.value.list[0].imgWidth - uni.upx2px(diyComponent.value
							.imageGap * 2)) / 2;
						item.imgHeight = diyComponent.value.list[1].imgHeight;
					}
				});

				diyComponent.value.list.forEach((item, index) => {
					item.imgWidth += 'px';
					item.imgHeight;
				});
			}
		});
	}
</script>

<style lang="scss">
	.rubik-cube {
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.item {
			text-align: center;
			line-height: 0;
			overflow: hidden;

			image {
				width: 100%;
				max-width: 100%;
				height: 100%;
			}
		}
	}


	// 一行两个
	.rubik-cube .item.row1-of2 {
		box-sizing: border-box;
		margin-top: 0 !important;
		margin-bottom: 0 !important;
	}

	.rubik-cube .item.row1-of2:nth-child(1) {
		margin-left: 0 !important;
	}

	.rubik-cube .item.row1-of2:nth-child(2) {
		margin-right: 0 !important;
	}

	// 一行三个
	.rubik-cube .item.row1-of3 {
		box-sizing: border-box;
		margin-top: 0 !important;
		margin-bottom: 0 !important;
	}

	.rubik-cube .item.row1-of3:nth-child(1) {
		margin-left: 0 !important;
	}

	.rubik-cube .item.row1-of3:nth-child(3) {
		margin-right: 0 !important;
	}

	// 一行四个
	.rubik-cube .item.row1-of4 {
		box-sizing: border-box;
		margin-top: 0 !important;
		margin-bottom: 0 !important;
	}

	.rubik-cube .item.row1-of4:nth-child(1) {
		margin-left: 0 !important;
	}

	.rubik-cube .item.row1-of4:nth-child(4) {
		margin-right: 0 !important;
	}

	// 两左两右
	.rubik-cube .item.row2-lt-of2-rt {
		// width: 50%;
		display: inline-block;
		box-sizing: border-box;
	}

	.rubik-cube .item.row2-lt-of2-rt:nth-child(1) {
		margin-left: 0 !important;
		margin-top: 0 !important;
	}

	.rubik-cube .item.row2-lt-of2-rt:nth-child(2) {
		margin-right: 0 !important;
		margin-top: 0 !important;
	}

	.rubik-cube .item.row2-lt-of2-rt:nth-child(3) {
		margin-left: 0 !important;
		margin-bottom: 0 !important;
	}

	.rubik-cube .item.row2-lt-of2-rt:nth-child(4) {
		margin-right: 0 !important;
		margin-bottom: 0 !important;
	}

	// 一左两右
	.rubik-cube .template-left,
	.rubik-cube .template-right {
		// width: 50%;
		box-sizing: border-box;
	}

	.rubik-cube .template-left .item.row1-lt-of2-rt:nth-child(1) {
		margin-bottom: 0;
	}

	.rubik-cube .template-right .item.row1-lt-of2-rt:nth-child(2) {
		margin-bottom: 0 !important;
	}

	.rubik-cube.row1-lt-of2-rt .template-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	// 一上两下
	.rubik-cube .item.row1-tp-of2-bm:nth-child(1) {
		width: 100%;
		box-sizing: border-box;
		margin-top: 0 !important;
		margin-left: 0 !important;
		margin-right: 0 !important;
	}

	.rubik-cube .item.row1-tp-of2-bm:nth-child(2) {
		// width: 50%;
		box-sizing: border-box;
		margin-left: 0 !important;
		margin-bottom: 0 !important;
	}

	.rubik-cube .item.row1-tp-of2-bm:nth-child(3) {
		// width: 50%;
		box-sizing: border-box;
		margin-right: 0 !important;
		margin-bottom: 0 !important;
	}

	// 一左三右
	.rubik-cube .template-left .item.row1-lt-of1-tp-of2-bm {
		width: 100%;
		box-sizing: border-box;
	}

	.rubik-cube .template-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.rubik-cube .template-bottom .item:nth-child(2) {
		margin-right: 0 !important;
	}
</style>
