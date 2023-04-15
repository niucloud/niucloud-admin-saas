<template>
	<div class="edit-graphic-nav">
		<div class="border-solid border-b-4 border-gray-200 mb-[20px]">
			<h3 class="mb-[10px]">{{ t('graphicNavModeTitle') }}</h3>
			<el-form label-width="80px" class="px-[10px]">

				<el-form-item :label="t('layoutMode')">
					<el-radio-group v-model="diyStore.editComponent.layout">
						<el-radio :label="'horizontal'">{{t('layoutModeHorizontal')}}</el-radio>
						<el-radio :label="'vertical'">{{t('layoutModeVertical')}}</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item v-show="diyStore.editComponent.layout == 'vertical'" :label="t('graphicNavTitle')">
					<el-input v-model="diyStore.editComponent.navTitle" :placeholder="t('graphicNavTitlePlaceholder')"
					          clearable
					          maxlength="20" show-word-limit/>
				</el-form-item>

				<el-form-item :label="t('graphicNavSelectMode')">
					<el-radio-group v-model="diyStore.editComponent.mode">
						<el-radio :label="'graphic'">{{t('graphicNavModeGraphic')}}</el-radio>
						<el-radio :label="'img'">{{t('graphicNavModeImg')}}</el-radio>
						<el-radio :label="'text'">{{t('graphicNavModeText')}}</el-radio>
					</el-radio-group>
				</el-form-item>

				<template v-show="diyStore.editComponent.layout == 'horizontal'">

					<el-form-item :label="t('graphicNavShowStyle')">
						<el-radio-group v-model="diyStore.editComponent.showStyle">
							<el-radio :label="'fixed'">{{t('graphicNavStyleFixed')}}</el-radio>
							<el-radio :label="'singleSlide'">{{t('graphicNavStyleSingleSlide')}}</el-radio>
							<el-radio :label="'pageSlide'">{{t('graphicNavStylePageSlide')}}</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item :label="t('graphicNavRowCount')">
						<el-radio-group v-model="diyStore.editComponent.rowCount">
							<el-radio :label="3">3{{t('piece')}}</el-radio>
							<el-radio :label="4">4{{t('piece')}}</el-radio>
							<el-radio :label="5">5{{t('piece')}}</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item :label="t('graphicNavPageCount')">
						<el-radio-group v-model="diyStore.editComponent.pageCount">
							<el-radio :label="1">1{{t('line')}}</el-radio>
							<el-radio :label="2">2{{t('line')}}</el-radio>
						</el-radio-group>
					</el-form-item>
				</template>

			</el-form>
		</div>
		<div class="border-solid border-b-4 border-gray-200 mb-[20px]"
		     v-show="['graphic','img'].includes(diyStore.editComponent.mode)">
			<h3 class="mb-[10px]">{{ t('graphicNavImageSet') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('graphicNavImageSize')">
					<el-slider v-model="diyStore.editComponent.imageSize" show-input size="small"
					           class="ml-[10px] graphic-nav-slider" :min="30" :max="60"/>
				</el-form-item>

				<el-form-item :label="t('graphicNavAroundRadius')">
					<el-slider v-model="diyStore.editComponent.aroundRadius" show-input size="small"
					           class="ml-[10px] graphic-nav-slider" :max="50"/>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<h3 class="mb-[10px]">{{ t('graphicNavSetLabel') }}</h3>
			<el-form label-width="80px" class="px-[10px]">

				<p class="text-sm text-gray-400 mb-[10px]">{{ t('graphicNavTips') }}</p>

				<div ref="imageBoxRef">
					<div v-for="(item,index) in diyStore.editComponent.list" :key="item.id"
					     class="item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]">
						<el-form-item :label="t('image')"
						              v-show="diyStore.editComponent.mode === 'graphic' || diyStore.editComponent.mode === 'img'">
							<upload-image v-model="item.imageUrl" :limit="1"/>
						</el-form-item>

						<el-form-item :label="t('graphicNavTitle')"
						              v-show="diyStore.editComponent.mode === 'graphic' || diyStore.editComponent.mode === 'text'">
							<el-input v-model="item.title" :placeholder="t('graphicNavTitlePlaceholder')" clearable
							          maxlength="20" show-word-limit/>
						</el-form-item>

						<div class="del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]"
						     v-show="diyStore.editComponent.list.length > 1"
						     @click="diyStore.editComponent.list.splice(index,1)">
							<icon name="element-CircleCloseFilled" color="#bbb" size="20px"/>
						</div>

						<el-form-item :label="t('link')">
							<diy-link v-model="item.link"/>
						</el-form-item>
					</div>
				</div>

				<el-button v-show="diyStore.editComponent.list.length < 10" class="w-full" @click="addGraphicNav">
					{{t('addGraphicNav')}}
				</el-button>

			</el-form>
		</div>
	</div>

</template>

<script lang="ts" setup>
    import {ref, watch, onMounted, nextTick} from 'vue'
    import {t} from '@/lang'
    import Sortable from 'sortablejs'
    import {img} from '@/utils/common'
    import {range} from 'lodash-es'

    import useDiyStore from '@/stores/modules/diy'

    const diyStore = useDiyStore()

    // 组件验证
    diyStore.editComponent.verify = (index: number) => {
        var res = {code: true, message: ''};
        if (diyStore.value[index].layout == 'vertical') {
            if (diyStore.value[index].navTitle == '') {
                res.code = false;
                res.message = t('graphicNavTitlePlaceholder');
                return res;
            }
        }

        diyStore.value[index].list.forEach((item: any) => {
            if ((diyStore.value[index].mode === 'graphic' || diyStore.value[index].mode === 'img') && item.imageUrl === '') {
                res.code = false;
                res.message = t('imageUrlTip');
                return res;
            }
            if ((diyStore.value[index].mode === 'graphic' || diyStore.value[index].mode === 'text') && item.title === '') {
                res.code = false;
                res.message = t('graphicNavTitlePlaceholder');
                return res;
            }
        });
        return res;
    };

    diyStore.editComponent.list.forEach((item: any) => {
        if (!item.id) item.id = diyStore.generateRandom();
    })

    watch(
        () => diyStore.editComponent.list,
        (newValue, oldValue) => {
            // 设置图片宽高
            diyStore.editComponent.list.forEach((item: any) => {
                let image = new Image();
                image.src = img(item.imageUrl);
                image.onload = async () => {
                    item.imgWidth = image.width;
                    item.imgHeight = image.height;
                };
            });
        },
        {deep: true}
    )

    const addGraphicNav = () => {
        diyStore.editComponent.list.push({
            id: diyStore.generateRandom(),
            title: '',
            imageUrl: '',
            imgWidth: 0,
            imgHeight: 0,
            link: {name: ''},
            label: {
                control: false,
                text: '热门',
                textColor: '#FFFFFF',
                bgColorStart: '#F83287',
                bgColorEnd: '#FE3423'
            }

        })
    }

    const imageBoxRef = ref()

    onMounted(() => {
        const sortable = Sortable.create(imageBoxRef.value, {
            group: 'item-wrap',
            animation: 200,
            onEnd: event => {
                const temp = diyStore.editComponent.list[event.oldIndex!];
                diyStore.editComponent.list.splice(event.oldIndex!, 1);
                diyStore.editComponent.list.splice(event.newIndex!, 0, temp);
                nextTick(() => {
                    sortable.sort(
                        range(diyStore.editComponent.list.length).map(value => {
                            return value.toString();
                        })
                    );
                });
            }
        })
    })

    defineExpose({})

</script>

<style lang="scss">
	.graphic-nav-slider {
		.el-slider__input {
			width: 100px;
		}
	}
</style>
<style lang="scss" scoped>
	.edit-graphic-nav {

		.item-wrap {
			.del {
				display: none;
			}

			&:hover {
				.del {
					display: block;
				}
			}
		}
	}
</style>