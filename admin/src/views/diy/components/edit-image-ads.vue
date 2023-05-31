<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('imageSet') }}</h3>
			<el-form label-width="80px" class="px-[10px]">

				<p class="text-sm text-gray-400 mb-[10px]">{{ t('imageAdsTips') }}</p>

				<div ref="imageBoxRef">
					<div v-for="(item,index) in diyStore.editComponent.list" :key="item.id" class="item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]">
						<el-form-item :label="t('image')">
							<upload-image v-model="item.imageUrl" :limit="1"/>
						</el-form-item>

						<div class="del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]" v-show="diyStore.editComponent.list.length > 1" @click="diyStore.editComponent.list.splice(index,1)">
							<icon name="element-CircleCloseFilled" color="#bbb" size="20px"/>
						</div>

						<el-form-item :label="t('link')">
							<diy-link v-model="item.link"/>
						</el-form-item>
					</div>
				</div>

				<el-button v-show="diyStore.editComponent.list.length < 10" class="w-full" @click="addImageAd">{{ t('addImageAd') }}</el-button>

			</el-form>
		</div>
	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">

		<!-- 组件样式 -->
		<slot name="style"></slot>
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

    const addImageAd = () => {
        diyStore.editComponent.list.push({
            id: diyStore.generateRandom(),
            imageUrl: '',
            imgWidth: 0,
            imgHeight: 0,
            link: {name: ''}
        })
    }

    const imageBoxRef = ref()

    onMounted(() => {
        nextTick(() => {
            const sortable = Sortable.create(imageBoxRef.value, {
                group: 'item-wrap',
                animation: 200,
                onEnd: event => {
                    const temp = diyStore.editComponent.list[event.oldIndex!];
                    diyStore.editComponent.list.splice(event.oldIndex!, 1);
                    diyStore.editComponent.list.splice(event.newIndex!, 0, temp);
                    sortable.sort(
                        range(diyStore.editComponent.list.length).map(value => {
                            return value.toString();
                        })
                    );
                }
            })
        });
    })

    defineExpose({})
</script>

<style lang="scss" scoped>
	.edit-image-ads {

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