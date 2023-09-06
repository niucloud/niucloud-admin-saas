<template>
	<div>
		<div @click="show">
			<slot>
				<div v-if="value.heatMapData.length">{{ t('selected') }}<span class="text-primary p-[4px]">{{ value.heatMapData.length}}</span>{{ t('selectedAfterHotArea') }}</div>
				<div v-else>{{ t('addHotArea') }}</div>
			</slot>
		</div>
		<el-dialog v-model="showDialog" :title="t('hotAreaSet')" width="45%" :close-on-press-escape="false" :destroy-on-close="true" :close-on-click-modal="false">

			<div class="flex">

				<div class="content-box relative bg-cover bg-gray-100 border border-dashed border-gray-500" :style="{ backgroundImage : 'url(' + img(value.imageUrl) + ')',width : contentBoxWidth + 'px', height : contentBoxHeight + 'px' }">
					<div v-for="(item,index) in dragBoxArr" :id="'box_' + index" class="area-box cursor-move border border-solid border-[#ccc] w-[100px] h-[100px] absolute top-0 left-0 select-none p-[5px]" :style="{ left : item.left + item.unit, top : item.top + item.unit }" @mousedown="mouseDown($event,index)">
						<span>{{ index + 1 }}</span>
						<template v-if="item.link.title">
							<span class="p-[4px]">|</span>
							<span>{{ item.link.title }}</span>
						</template>
						<span class="box1" @mousedown.stop="resizeMouseDown($event,index)"></span>
						<span class="box2" @mousedown.stop="resizeMouseDown($event,index)"></span>
						<span class="box3" @mousedown.stop="resizeMouseDown($event,index)"></span>
						<span class="box4" @mousedown.stop="resizeMouseDown($event,index)"></span>
					</div>
				</div>

				<el-form label-width="80px" class="pl-[20px]">
					<h3 class="mb-[10px] text-lg text-black">{{ t('hotAreaManage') }}</h3>
					<el-button type="primary" plain size="small" class="mb-[10px]" @click="addArea">{{ t('addHotArea') }}</el-button>
					<div class="overflow-y-auto h-[300px]">
						<template v-for="(item,index) in dragBoxArr">
							<div class="mb-[16px]" v-if="item">
								<el-form-item :label="t('hotArea') + (index + 1)">
									<div class="flex items-center">
										<diy-link v-model="item.link"/>
										<icon class="del cursor-pointer mx-[10px]" name="element-CircleCloseFilled" color="#bbb" size="20px" @click="dragBoxArr.splice(index,1)"/>
									</div>
								</el-form-item>
							</div>
						</template>
					</div>
				</el-form>

			</div>

			<template #footer>
	            <span class="dialog-footer">
		            <el-button @click="showDialog = false">{{ t('cancel')}}</el-button>
		            <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
	            </span>
			</template>
		</el-dialog>
	</div>

</template>

<script lang="ts" setup>
    import {t} from '@/lang'
    import {ref, reactive, computed} from 'vue'
    import {ElMessage} from 'element-plus'
    import {img} from '@/utils/common'

    const prop = defineProps({
        modelValue: {
            type: String,
            default: ''
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const value: any = computed({
        get() {
            return prop.modelValue
        },
        set(value) {
            emit('update:modelValue', value)
        }
    });

    const showDialog = ref(false);
    const contentBoxWidth = ref(400);
    const contentBoxHeight = ref(400);
    const num = ref(4);// 每行显示的数量
    const dragBoxArr: any = reactive([]);

    // 添加热区
    const addArea = () => {
        let left = dragBoxArr.length % num.value * 100;
        let top = Math.floor(dragBoxArr.length / num.value) * 100;
        if (top >= contentBoxWidth.value) {
            top = 0;
            left = 0;
        }

        dragBoxArr.push({
            left: left,
            top: top,
            width: 100,
            height: 100,
            unit: 'px',
            link: {
                name: ''
            }
        });
    };

    // 移动事件
    const mouseDown = (e: any, index: number) => {
        let box: any = document.getElementById('box_' + index);
        let disX = e.clientX - box.offsetLeft;
        let disY = e.clientY - box.offsetTop;

        //鼠标移动时
        document.onmousemove = function (e) {
            box.style.left = e.clientX - disX + 'px';
            box.style.top = e.clientY - disY + 'px';

            //边界判断
            if (e.clientX - disX < 0) {
                box.style.left = 0;
            }

            if (e.clientX - disX > contentBoxWidth.value - box.offsetWidth) {
                box.style.left = contentBoxWidth.value - box.offsetWidth + 'px';
            }

            if (e.clientY - disY < 0) {
                box.style.top = 0;
            }

            if (e.clientY - disY > contentBoxHeight.value - box.offsetHeight) {
                box.style.top = contentBoxHeight.value - box.offsetHeight + 'px';
            }
        };

        // 鼠标抬起时
        document.onmouseup = function (e) {
            document.onmousemove = null;
        }
    };

    // 拖拽大小事件
    const resizeMouseDown = (e: any, index: number) => {
        var oEv = e;
        oEv.stopPropagation();
        let box: any = document.getElementById('box_' + index);
        let className = e.target.className;

        // 获取移动前盒子的宽高，
        var oldWidth = box.offsetWidth;
        var oldHeight = box.offsetHeight;

        // 获取鼠标距离屏幕的left和top值
        var oldX = oEv.clientX;
        var oldY = oEv.clientY;

        // 元素相对于最近的父级定位
        var oldLeft = box.offsetLeft;
        var oldTop = box.offsetTop;

        // 设置最小的宽度
        var minWidth = 50;
        var minHeight = 50;

        document.onmousemove = function (e) {
            var oEv = e;
            // console.log('move', "width：" + oldWidth,
            //     '，oldLeft: ' + oldLeft, '，oldTop: ' + oldTop,
            //     '，oldX：clientX-- ' + oldX + '：' + oEv.clientX,
            //     '，oldY：clientY-- ' + oldY + '：' + oEv.clientY,
            // )

            // 左上角
            if (className == "box1") {

                let width = oldWidth - (oEv.clientX - oldX);
                let maxWidth = contentBoxWidth.value;

                let height = oldHeight - (oEv.clientY - oldY);
                let maxHeight = contentBoxHeight.value - oldTop;

                let left = oldLeft + (oEv.clientX - oldX);
                let top = oldTop + (oEv.clientY - oldY);

                if (width < minWidth) {
                    width = minWidth
                }
                if (width > maxWidth) {
                    width = maxWidth
                }

                if (height < minHeight) {
                    height = minHeight
                }
                if (height > maxHeight) {
                    height = maxHeight
                }

                if (oldLeft == 0 && oldTop == 0) {
                    // 坐标：left = 0，top = 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，left = 最小宽度，top = 最小高度
                        left = minWidth;
                        top = minHeight

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，left = 最小宽度，top = 不予处理
                        left = minWidth;

                    } else if (width > minWidth && height == minHeight) {

                        // 宽 > 最小值，高 = 最小值，left = 不予处理，top = 最小高度
                        top = minHeight

                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，left = 不予处理，top = 不予处理
                    }

                } else if (oldLeft == 0 && oldTop > 0) {

                    // 坐标：left = 0，top > 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，left = 最小宽度，top = 元素上偏移位置
                        left = minWidth;
                        top = box.offsetTop

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，left = 最小宽度，top = 元素上偏移位置
                        left = minWidth;
                        top = box.offsetTop;

                    } else if (width > minWidth && height == minHeight) {

                        // 宽 > 最小值，高 = 最小值，left = 不予处理，top = 元素上偏移位置
                        top = box.offsetTop;

                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，left = 不予处理，top = 不予处理
                    }

                } else if (oldLeft > 0 && oldTop == 0) {

                    // 坐标：left > 0，top = 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，left = 元素左偏移位置，top = 元素上偏移位置
                        left = box.offsetLeft;
                        top = box.offsetTop;

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，left = 元素左偏移位置，top = 0
                        left = box.offsetLeft;
                        top = 0;

                    } else if (width > minWidth && height == minHeight) {

                        // 宽 > 最小值，高 = 最小值，left = 不予处理，top = 元素上偏移位置
                        top = box.offsetTop;

                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，left = 不予处理，top = 不予处理
                    }

                } else if (oldLeft > 0 && oldTop > 0) {

                    // 坐标：left > 0，top > 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，left = 元素左偏移位置，top = 元素上偏移位置
                        left = box.offsetLeft;
                        top = box.offsetTop

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，left = 元素左偏移位置，top = 元素上偏移位置
                        left = box.offsetLeft;
                        top = box.offsetTop;

                    } else if (width > minWidth && height == minHeight) {

                        // 宽 > 最小值，高 = 最小值，left = 不予处理，top = 元素上偏移位置
                        top = box.offsetTop;

                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，left = 不予处理，top = 不予处理
                    }

                }

                //左上 宽
                if (left < 0) {
                    left = 0;
                    width = oldWidth - (oEv.clientX - oldX) + (oldLeft + (oEv.clientX - oldX));
                }

                //左上  高
                if (top < 0) {
                    top = 0;
                    height = oldTop + (oEv.clientY - oldY) + (oldHeight - (oEv.clientY - oldY));
                }

                box.style.width = width + 'px';
                box.style.height = height + 'px';
                box.style.left = left + 'px';
                box.style.top = top + 'px';

            } else if (className == "box2") {
                // 右上角

                let width = oldWidth + (oEv.clientX - oldX);
                let maxWidth = contentBoxWidth.value - oldLeft;

                let height = oldHeight - (oEv.clientY - oldY);
                let maxHeight = contentBoxHeight.value - oldTop;

                let top = oldTop + (oEv.clientY - oldY);

                if (width < minWidth) {
                    width = minWidth
                }
                if (width > maxWidth) {
                    width = maxWidth
                }

                if (height < minHeight) {
                    height = minHeight
                }
                if (height > maxHeight) {
                    height = maxHeight
                }

                if (oldLeft == 0 && oldTop == 0) {

                    // 坐标：left = 0，top = 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，top = 最小高度
                        top = minHeight

                    } else if (width == minWidth && height > minHeight) {
                        // 宽 = 最小值，高 > 最小值，不予处理
                    } else if (width > minWidth && height == minHeight) {

                        // 宽 > 最小值，高 = 最小值，top = 最小高度
                        top = minHeight

                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，不予处理
                    }

                } else if (oldLeft == 0 && oldTop > 0) {

                    // 坐标：left = 0，top > 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，top = 元素上偏移位置
                        top = box.offsetTop

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，top = 元素上偏移位置
                        top = box.offsetTop

                    } else if (width > minWidth && height == minHeight) {

                        // 宽 > 最小值，高 = 最小值，top = 元素上偏移位置
                        top = box.offsetTop

                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，不予处理
                    }

                } else if (oldLeft > 0 && oldTop == 0) {

                    // 坐标：left = 0，top = 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，top = 元素上偏移位置
                        top = box.offsetTop

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，top = 0
                        top = 0

                    } else if (width > minWidth && height == minHeight) {

                        // 宽 > 最小值，高 = 最小值，top = 元素上偏移位置
                        top = box.offsetTop

                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，不予处理
                    }

                } else if (oldLeft > 0 && oldTop > 0) {

                    // 坐标：left > 0，top > 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，top = 元素上偏移位置
                        top = box.offsetTop

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，top = 元素上偏移位置
                        top = box.offsetTop

                    } else if (width > minWidth && height == minHeight) {

                        // 宽 > 最小值，高 = 最小值，top = 元素上偏移位置
                        top = box.offsetTop

                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，不予处理
                    }

                }

                //右上  高
                if (top < 0) {
                    top = 0;
                    height = oldTop + (oEv.clientY - oldY) + (oldHeight - (oEv.clientY - oldY))
                }

                box.style.width = width + 'px';
                box.style.height = height + 'px';
                box.style.top = top + 'px';

            } else if (className == "box3") {
                // 左下角

                let width = oldWidth - (oEv.clientX - oldX);
                let maxWidth = contentBoxWidth.value;

                let height = oldHeight + (oEv.clientY - oldY);
                let maxHeight = contentBoxHeight.value - oldTop;

                let left = oldLeft + (oEv.clientX - oldX);

                if (width < minWidth) {
                    width = minWidth
                }
                if (width > maxWidth) {
                    width = maxWidth
                }

                if (height < minHeight) {
                    height = minHeight
                }
                if (height > maxHeight) {
                    height = maxHeight
                }

                if (oldLeft == 0 && oldTop == 0) {
                    // 坐标：left = 0，top = 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，left = 最小宽度
                        left = minWidth;

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，left = 最小宽度
                        left = minWidth;

                    } else if (width > minWidth && height == minHeight) {
                        // 宽 > 最小值，高 = 最小值，不予处理
                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，不予处理
                    }

                } else if (oldLeft == 0 && oldTop > 0) {

                    // 坐标：left = 0，top > 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，left = 最小宽度
                        left = minWidth;

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，left = 最小宽度
                        left = minWidth;

                    } else if (width > minWidth && height == minHeight) {
                        // 宽 > 最小值，高 = 最小值，不予处理
                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，不予处理
                    }

                } else if (oldLeft > 0 && oldTop == 0) {

                    // 坐标：left > 0，top = 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，left = 元素左偏移位置
                        left = box.offsetLeft;

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，left = 元素左偏移位置
                        left = box.offsetLeft;

                    } else if (width > minWidth && height == minHeight) {
                        // 宽 > 最小值，高 = 最小值，不予处理
                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，不予处理
                    }

                } else if (oldLeft > 0 && oldTop > 0) {

                    // 坐标：left > 0，top > 0

                    if (width == minWidth && height == minHeight) {

                        // 宽高 = 最小值，left = 元素左偏移位置
                        left = box.offsetLeft;

                    } else if (width == minWidth && height > minHeight) {

                        // 宽 = 最小值，高 > 最小值，left = 元素左偏移位置
                        left = box.offsetLeft;

                    } else if (width > minWidth && height == minHeight) {
                        // 宽 > 最小值，高 = 最小值，不予处理
                    } else if (width > minWidth && height > minHeight) {
                        // 宽 > 最小值，高 > 最小值，不予处理
                    }

                }

                if (left < 0) {
                    left = 0;
                    width = oldWidth - (oEv.clientX - oldX) + (oldLeft + (oEv.clientX - oldX));
                }

                box.style.width = width + 'px';
                box.style.height = height + 'px';
                box.style.left = left + 'px';

            } else if (className == "box4") {
                // 右下角

                let width = oldWidth + (oEv.clientX - oldX);
                let maxWidth = contentBoxWidth.value - oldLeft;

                let height = oldHeight + (oEv.clientY - oldY);
                let maxHeight = contentBoxHeight.value - oldTop;

                if (width < minWidth) {
                    width = minWidth
                }
                if (width > maxWidth) {
                    width = maxWidth
                }

                if (height < minHeight) {
                    height = minHeight
                }
                if (height > maxHeight) {
                    height = maxHeight
                }

                box.style.width = width + 'px';
                box.style.height = height + 'px';
            }
            dragBoxArr[index].unit = 'px'

        };

        // 鼠标抬起时
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    };

    const show = () => {
        // 每次打开时赋值
        if (!value.value.imageUrl) {
            ElMessage({
                type: 'warning',
                message: `${t('imageUrlTip')}`,
            });
            return;
        }
        if (Object.keys(value.value.heatMapData).length) {
            dragBoxArr.splice(0, dragBoxArr.length, ...value.value.heatMapData);
        } else {
            dragBoxArr.splice(0, dragBoxArr.length);
            addArea();
        }
        showDialog.value = true
    };

    const save = () => {
        var isOk = true;
        for (let i = 0; i < dragBoxArr.length; i++) {
            if (!dragBoxArr[i].link.title) {
                ElMessage({
                    type: 'warning',
                    message: t('selectedHotArea') + (i + 1) + t('hotAreaLink'),
                });
                isOk = false;
                break;
            }
        }

        if (!isOk) return;

        dragBoxArr.forEach((item: any, index: number) => {
            var box: any = document.getElementById('box_' + index);
            item.width = parseFloat(box.offsetWidth / contentBoxWidth.value * 100).toFixed(2);
            item.height = parseFloat(box.offsetHeight / contentBoxHeight.value * 100).toFixed(2);
            item.left = parseFloat(box.offsetLeft / contentBoxWidth.value * 100).toFixed(2);
            item.top = parseFloat(box.offsetTop / contentBoxHeight.value * 100).toFixed(2);
            item.unit = '%';
        });

        value.value.heatMapData = dragBoxArr;
        showDialog.value = false
    };

    defineExpose({
        showDialog
    })
</script>

<style lang="scss" scoped>
	.area-box {
		background-color: rgba(255, 255, 255, 0.7);
	}

	.box1, .box2, .box3, .box4 {
		width: 10px;
		height: 10px;
		background-color: #fff;
		position: absolute;
		border-radius: 50%;
		border: 1px solid #333;
	}

	.box1 {
		top: -5px;
		left: -5px;
		cursor: nw-resize;
	}

	.box2 {
		top: -5px;
		right: -5px;
		cursor: ne-resize;
	}

	.box3 {
		left: -5px;
		bottom: -5px;
		cursor: sw-resize;
	}

	.box4 {
		bottom: -5px;
		right: -5px;
		cursor: se-resize;
	}

</style>