<template>
	<!-- 内容 -->
	<div class="content-wrap rubik-cube" v-show="diyStore.editTab == 'content'">

		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('selectStyle') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('template')">
					<span>{{ selectTemplate.name }}</span>
				</el-form-item>
				<ul class="selected-template-list">
					<li v-for="(item,i) in templateList" :class="[(item.className == diyStore.editComponent.mode) ?  'selected' : '' ]" @click="changeTemplateList(i)">
						<icon :name="'iconfont-' + item.src" size="16px"/>
					</li>
				</ul>
			</el-form>
		</div>
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('rubikCubeLayout') }}</h3>
			<el-form label-width="80px" class="px-[10px]">

				<ul class="layout">
					<li v-for="(li,i) in selectTemplate.dimensionScale" :class="[selectTemplate.className]" :style="{ width: rubikCubeList[i].widthStyle, height: rubikCubeList[i].imgHeight + 'px' }">
						<div class="have-preview-image" v-show="diyStore.editComponent.list[i].imageUrl">
							<img class="!w-full !h-full" :src="img(diyStore.editComponent.list[i].imageUrl)"/>
						</div>
						<div class="empty" :class="[selectTemplate.className]" v-show="!diyStore.editComponent.list[i].imageUrl">
							<p>{{li.name}}</p>
							<p>{{li.desc}}</p>
						</div>
					</li>
				</ul>

				<div v-for="(item,index) in diyStore.editComponent.list" :key="item.id" class="item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]">
					<el-form-item :label="t('image')">
						<upload-image v-model="item.imageUrl" :limit="1" @change="selectImg"/>
					</el-form-item>

					<el-form-item :label="t('link')">
						<diy-link v-model="item.link"/>
					</el-form-item>
				</div>

			</el-form>

		</div>

	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">

		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('rubikCubeStyle') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('imageGap')">
					<el-slider v-model="diyStore.editComponent.imageGap" show-input size="small" class="ml-[10px] horz-blank-slider" :max="30"/>
				</el-form-item>
				<el-form-item :label="t('topRounded')">
					<el-slider v-model="diyStore.editComponent.topElementRounded" show-input size="small" class="ml-[10px] horz-blank-slider" :max="50"/>
				</el-form-item>
				<el-form-item :label="t('bottomRounded')">
					<el-slider v-model="diyStore.editComponent.bottomElementRounded" show-input size="small" class="ml-[10px] horz-blank-slider" :max="50"/>
				</el-form-item>
			</el-form>
		</div>

		<!-- 组件样式 -->
		<slot name="style"></slot>
	</div>

</template>

<script lang="ts" setup>
    import {ref, watch, onMounted, nextTick, computed} from 'vue'
    import {t} from '@/lang'
    import useDiyStore from '@/stores/modules/diy'
    import {img} from '@/utils/common'

    const diyStore = useDiyStore()
    diyStore.editComponent.ignore = []; // 忽略公共属性

    // 组件验证
    diyStore.editComponent.verify = (index: number) => {
        var res = {code: true, message: ''};
        diyStore.value[index].list.forEach((item: any) => {
            if (item.imageUrl === '') {
                res.code = false;
                res.message = t('imageUrlTip');
                return res;
            }
        });
        return res;
    };

    const templateList = ref([
        {
            name: "1行2个",
            src: 'iconyihangliangge',
            className: "row1-of2",
            dimensionScale: [
                {
                    desc: "宽度50%",
	                size: "200px * 200px",
	                name: "图一"
                },
                {
                    desc: "宽度50%",
                    size: "200px * 200px",
                    name: "图二"
                }
            ],
            descAux: "选定布局区域，在下方添加图片，建议添加尺寸一致的图片，宽度最小建议为：200px"
        },
        {
            name: "1行3个",
            src: 'iconyihangsange',
            className: "row1-of3",
            dimensionScale: [
                {
                    desc: "宽度33.33%",
                    size: "200px * 200px",
                    name: "图一"
                },
                {
                    desc: "宽度33.33%",
                    size: "200px * 200px",
                    name: "图二"
                },
                {
                    desc: "宽度33.33%",
                    size: "200px * 200px",
                    name: "图三"
                }
            ],
            descAux: "选定布局区域，在下方添加图片，建议添加尺寸一致的图片，宽度最小建议为：130px"
        },
        {
            name: "1行4个",
            src: 'iconyihangsige',
            className: "row1-of4",
            dimensionScale: [
                {
                    desc: "宽度25%",
                    size: "200px * 200px",
                    name: "图一"
                },
                {
                    desc: "宽度25%",
                    size: "200px * 200px",
                    name: "图二"
                },
                {
                    desc: "宽度25%",
                    size: "200px * 200px",
                    name: "图三"
                },
                {
                    desc: "宽度25%",
                    size: "200px * 200px",
                    name: "图四"
                }
            ],
            descAux: "选定布局区域，在下方添加图片，建议添加尺寸一致的图片，宽度最小建议为：100px"
        },
        {
            name: "2左2右",
            src: 'iconmofang-liangzuoliangyou',
            className: "row2-lt-of2-rt",
            dimensionScale: [
                {
                    desc: "宽度50%",
                    size: "200px * 200px",
                    name: "图一"
                },
                {
                    desc: "宽度50%",
                    size: "200px * 200px",
                    name: "图二"
                },
                {
                    desc: "宽度50%",
                    size: "200px * 200px",
                    name: "图三"
                },
                {
                    desc: "宽度50%",
                    size: "200px * 200px",
                    name: "图四"
                }
            ],
            descAux: "选定布局区域，在下方添加图片，建议添加尺寸一致的图片，宽度最小建议为：200px"
        },
        {
            name: "1左2右",
            src: 'iconmofang-yizuoliangyou',
            className: "row1-lt-of2-rt",
            dimensionScale: [
                {
                    desc: "宽度50% * 高度100%",
                    size: "200px * 400px",
                    name: "图一"
                },
                {
                    desc: "宽度50% * 高度50%",
                    size: "200px * 200px",
                    name: "图二"
                },
                {
                    desc: "宽度50% * 高度50%",
                    size: "200px * 200px",
                    name: "图三"
                }
            ],
            descAux: "选定布局区域，在下方添加图片，宽度最小建议为：200px，右侧两张图片高度一致，左侧图片高度为右侧两张图片高度之和（例：左侧图片尺寸：200px * 300px，右侧两张图片尺寸：200px * 150px）"
        },
        {
            name: "1上2下",
            src: 'iconmofang-yishangliangxia',
            className: "row1-tp-of2-bm",
            dimensionScale: [
                {
                    desc: "宽度100% * 高度50%",
                    size: "400px * 200px",
                    name: "图一"
                },
                {
                    desc: "宽度50% * 高度50%",
                    size: "200px * 200px",
                    name: "图二"
                },
                {
                    desc: "宽度50% * 高度50%",
                    size: "200px * 200px",
                    name: "图三"
                }
            ],
            descAux: "选定布局区域，在下方添加图片，上方一张图片的宽度为下方两张图片宽度之和，下放两张图片尺寸一致，高度可根据实际需求自行确定（例：上方图片尺寸：400px * 150px，下方两张图片尺寸：200px * 150px）"
        },
        {
            name: "1左3右",
            src: 'iconxuanzemoban-yizuosanyou',
            className: "row1-lt-of1-tp-of2-bm",
            dimensionScale: [
                {
                    desc: "宽度50% * 高度100%",
                    size: "200px * 400px",
                    name: "图一"
                },
                {
                    desc: "宽度50% * 高度50%",
                    size: "200px * 200px",
                    name: "图二"
                },
                {
                    desc: "宽度25% * 高度50%",
                    size: "100px * 200px",
                    name: "图三"
                },
                {
                    desc: "宽度25% * 高度50%",
                    size: "100px * 200px",
                    name: "图四"
                }
            ],
            descAux: "选定布局区域，在下方添加图片，左右两侧内容宽高相同，右侧上下区域高度各占50%，右侧内容下半部分两张图片的宽度相同，各占右侧内容宽度的50%（例：左侧图片尺寸：200px * 400px，右侧上半部分图片尺寸：200px * 200px，右侧下半部分两张图片尺寸：100px * 200px）"
        }
    ]);

	let rubikCubeList = ref([]);
    const selectTemplate = computed(() => {
        var data;
        templateList.value.forEach((item) => {
            if (item.className == diyStore.editComponent.mode) {
				data = item;
				
				rubikCubeList.value = JSON.parse(JSON.stringify(diyStore.editComponent.list));
				if (item.className == 'row2-lt-of2-rt') {
					calcFourSquare();
				} else if (item.className == 'row1-lt-of2-rt') {
					calcRowOneLeftOfTwoRight();
				} else if (item.className == 'row1-tp-of2-bm') {
					calcRowOneTopOfTwoBottom();
				} else if (item.className == 'row1-lt-of1-tp-of2-bm') {
					calcRowOneLeftOfOneTopOfTwoBottom();
				} else {
					calcSingleRow(item.className);
				}
            }
        })
        return data;
    });

    const changeTemplateList = (v: number) => {
        for (var i = 0; i < templateList.value.length; i++) {
            if (i == v) {
                diyStore.editComponent.mode = templateList.value[i].className;
                var count = templateList.value[i].dimensionScale.length;

                //重置当前编辑的图片集合

                //数量不够，进行添加
                if (count > diyStore.editComponent.list.length) {
                    for (var j = 0; j < count; j++) {
                        if ((j + 1) > diyStore.editComponent.list.length) diyStore.editComponent.list.push({
                            imageUrl: "",
                            imgWidth: 0,
                            imgHeight: 0,
                            link: {name: ""}
                        });
                    }
                } else {
                    //数量不相同时，并且数量超出，减去
                    if (count != diyStore.editComponent.list.length) {
                        for (var j = 0; j < diyStore.editComponent.list.length; j++) {
                            if ((j + 1) > count) {
                                diyStore.editComponent.list.splice(j, 1);
                                j = 0;
                            }
                        }
                    }

                }
            }
        }
    };

    const selectImg = (url:string)=> {
        handleHeight(true);
	};

    // 处理高度
    const handleHeight = (isCalcHeight:boolean = false)=> {
        diyStore.editComponent.list.forEach((item: any, index: number) => {
            let image = new Image();
            image.src = img(item.imageUrl);
            image.onload = async () => {
                item.imgWidth = image.width;
                item.imgHeight = image.height;
            };
		});
    }

	defineExpose({})

	/**
	 * 魔方：单行多个，平分宽度
	 * 公式：
	 * 宽度：屏幕宽度/2，示例：375/2=187.5
	 * 比例：原图高/原图宽，示例：322/690=0.46
	 * 高度：宽度*比例，示例：187.5*0.46=86.25
	 */
	const calcSingleRow = (type) => {
		let maxHeight = 0;
		var paramsRatio = 2;
		var paramsWidth = 'calc(100% / 2)';
		if(type == 'row1-of3'){
			paramsRatio = 3;
			paramsWidth = 'calc(100% / 3)';
		}
		if(type == 'row1-of4'){
			paramsRatio = 4
			paramsWidth = 'calc(100% / 4)';
		}

		rubikCubeList.value.forEach((item, index) => {
			var ratio = item.imgHeight / item.imgWidth;

			let width = 330;
			item.imgWidth = width / paramsRatio;
			item.imgHeight = item.imgWidth * ratio;

			if (maxHeight == 0 || maxHeight < item.imgHeight) maxHeight = item.imgHeight;
		})

		rubikCubeList.value.forEach((item, index) => {
			item.widthStyle = paramsWidth;
			item.imgHeight = maxHeight;
		});
	};

	/**
	 * 魔方：四方型，各占50%
	 */
	const calcFourSquare = () => {
		let maxHeightFirst = 0;
		let maxHeightTwo = 0;
		rubikCubeList.value.forEach((item, index) => {
			var ratio = item.imgHeight / item.imgWidth;
			item.imgWidth = 330;
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
		rubikCubeList.value.forEach((item, index) => {
			item.imgWidth = 'calc(100% / 2)';
			item.widthStyle = item.imgWidth;
			if (index <= 1) {
				item.imgHeight = maxHeightFirst;
			} else if (index > 1) {
				item.imgHeight = maxHeightTwo;
			}
		});
	}

	/**
	 * 魔方：1左2右
	 */
	const calcRowOneLeftOfTwoRight = () => {
		let rightHeight = 0; // 右侧两图平分高度
		let divide = 'left'; // 划分规则，left：左，right：右
		if (rubikCubeList.value[1].imgWidth === rubikCubeList.value[2].imgWidth) divide = 'right';
		rubikCubeList.value.forEach((item, index) => {
			if (index == 0) {
				var ratio = item.imgHeight / item.imgWidth; // 获取左图的尺寸比例
				item.imgWidth = 330;
				item.imgWidth = item.imgWidth / 2;
				item.imgHeight = item.imgWidth * ratio;
				rightHeight = item.imgHeight / 2;
				item.imgWidth += 'px';
			} else {
				item.imgWidth = rubikCubeList.value[0].imgWidth;
				item.imgHeight = rightHeight;
			}
		});
	}

	/**
	 * 魔方：1上2下
	 */
	const calcRowOneTopOfTwoBottom = () => {
		var maxHeight = 0;
		rubikCubeList.value.forEach((item, index) => {

			var ratio = item.imgHeight / item.imgWidth; // 获取左图的尺寸比例
			if (index == 0) {
				item.imgWidth = 330;
			} else if (index > 0) {
				item.imgWidth = 330;
				item.imgWidth = item.imgWidth / 2;
			}

			item.imgHeight = item.imgWidth * ratio;

			// 获取最大高度
			if (index > 0 && (maxHeight == 0 || maxHeight < item.imgHeight))
				maxHeight = item.imgHeight;

		});
		rubikCubeList.value.forEach((item, index) => {
			item.imgWidth += 'px';
			item.widthStyle = item.imgWidth;
			if (index > 0) item.imgHeight = maxHeight;
		});
	}

	/**
	 * 魔方：1左3右
	 */
	const calcRowOneLeftOfOneTopOfTwoBottom = () => {
		rubikCubeList.value.forEach((item, index) => {
			// 左图
			if (index == 0) {
				var ratio = item.imgHeight / item.imgWidth; // 获取左图的尺寸比例
				item.imgWidth = 330;
				item.imgWidth = item.imgWidth / 2;
				item.imgHeight = item.imgWidth * ratio;
			} else if (index == 1) {
				item.imgWidth = rubikCubeList.value[0].imgWidth;
				item.imgHeight = rubikCubeList.value[0].imgHeight / 2;
			} else if (index > 1) {
				item.imgWidth = rubikCubeList.value[0].imgWidth / 2;
				item.imgHeight = rubikCubeList.value[1].imgHeight;
			}
		});

		rubikCubeList.value.forEach((item, index) => {
			item.imgWidth += 'px';
		});
	}

</script>

<style lang="scss" scoped>
	.rubik-cube .selected-template-list {
		/*padding-left: 15px;*/
		margin-bottom: 20px;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;

		li {
			color: #909399;
			width: 46px;
			height: 32px;
			text-align: center;
			line-height: 29px;
			border: 1px solid #e5e5e5;
			cursor: pointer;
			background: #ffffff;
			box-sizing: border-box;
			border-right: 1px transparent solid;

			&:last-child {
				border-right: 1px solid #e5e5e5;
			}

			&.selected {
				color: var(--el-color-primary);
				border-color: var(--el-color-primary);
			}

			img {
				display: inline-block;
			}

			div {
				font-size: 12px;
			}
		}
	}

	.layout {
		overflow: hidden;
		position: relative;
		margin-bottom: 15px;

		li {
			float: left;
			color: #909399;
			border: 1px solid #e5e5e5;
			cursor: pointer;
			font-size: 12px;
			position: relative;

			div.empty {
				left: 0;
				text-align: center;
				width: 100%;
				position: absolute;
				top: 50%;
				margin-top: -26px;

				p {
					margin: 0;
					line-height: 26px;
				}
			}

			div.have-preview-image {
				box-sizing: border-box;

				img {
					display: inline-block;
					width: auto;
					height: auto;
					max-width: 100%;
					max-height: 100%;
				}
			}

			// 1行2个
			&.row1-of2 {
				width: 49.2%;
				height: 160px;
				border-right: 1px transparent solid;

				&:last-child {
					border-right: 1px solid #e5e5e5;
				}

				div.empty {
				}

				div.have-preview-image {
					text-align: center;
					height: 100%;
					line-height: 160px;
					background: #ffffff;
				}

			}

			// 1行3个
			&.row1-of3 {
				width: 32.5%;
				height: 100px;
				border-right: 1px transparent solid;

				&:last-child {
					border-right: 1px solid #bdf;
				}

				div.empty {
				}

				div.have-preview-image {
					text-align: center;
					height: 100%;
					line-height: 100px;
					background: #ffffff;
				}
			}

			// 1行4个
			&.row1-of4 {
				width: 24.2%;
				height: 80px;
				border-right: 1px transparent solid;

				&:last-child {
					border-right: 1px solid #bdf;
				}

				div.empty {
				}

				div.have-preview-image {
					text-align: center;
					height: 100%;
					line-height: 80px;
					background: #ffffff;
				}
			}

			// 2左2右
			&.row2-lt-of2-rt {
				width: 49.2%;
				height: 160px;

				&:nth-child(1) {
					border-right: 1px transparent solid;
					border-bottom: 1px transparent solid;
				}

				&:nth-child(2) {
					border-bottom: 1px transparent solid;
				}

				&:nth-child(3) {
					border-right: 1px transparent solid;
					clear: both;
				}

				div.empty {
				}

				div.have-preview-image {
					text-align: center;
					height: 100%;
					line-height: 160px;
					background: #ffffff;
				}
			}

			// 1左2右
			&.row1-lt-of2-rt {
				width: 49.2%;
				font-size: 12px;

				&:nth-child(1) {
					height: 322px;
					border-right: 1px transparent solid;

					div.have-preview-image {
						text-align: center;
						height: 100%;
						background: #ffffff;
					}
				}

				&:nth-child(2) {
					height: 160px;
					border-bottom: 1px transparent solid;

					div.have-preview-image {
						display: flex;
						align-items: center;
						justify-content: center;
						background: #ffffff;
					}
				}

				&:nth-child(3) {
					height: 160px;

					div.have-preview-image {
						text-align: center;
						height: 100%;
						background: #ffffff;
					}
				}

				div.empty {
				}
			}

			// 1上2下
			&.row1-tp-of2-bm {
				height: 160px;

				&:nth-child(1) {
					width: 99.4%;
					border-bottom: 1px transparent solid;
				}

				&:nth-child(2) {
					width: 49.2%;
					border-right: 1px transparent solid;
				}

				&:nth-child(3) {
					width: 49.2%;
				}

				div.empty {
				}

				div.have-preview-image {
					text-align: center;
					height: 100%;
					line-height: 160px;
					background: #ffffff;
				}
			}

			// 1左3右
			&.row1-lt-of1-tp-of2-bm {
				&:nth-child(1) {
					height: 320px;
					width: 49.2%;
					border-right: 1px transparent solid;

					div.have-preview-image {
						text-align: center;
						height: 100%;
						background: #ffffff;
					}
				}

				&:nth-child(2) {
					height: 160px;
					width: 49.2%;
					border-bottom: 1px transparent solid;

					div.have-preview-image {
						text-align: center;
						height: 100%;
						background: #ffffff;
					}
				}

				&:nth-child(3) {
					height: 160px;
					width: 24.2%;
					border-right: 1px transparent solid;

					div.have-preview-image {
						text-align: center;
						height: 100%;
						background: #ffffff;
					}
				}

				&:nth-child(4) {
					height: 160px;
					width: 24.2%;

					div.have-preview-image {
						text-align: center;
						height: 100%;
						background: #ffffff;
					}
				}

				div.empty {
				}
			}

		}
	}
</style>