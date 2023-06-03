<template>
	<div>
		<div @click="show">
			<slot>
				<el-input v-model="value.title" :placeholder="t('linkPlaceholder')" readonly>
					<template #suffix>
						<div @click.stop="clear">
							<el-icon v-if="value.name">
								<Close/>
							</el-icon>
							<el-icon v-else>
								<ArrowRight/>
							</el-icon>
						</div>
					</template>
				</el-input>
			</slot>
		</div>
		<el-dialog v-model="showDialog" :title="t('selectLinkTips')" width="40%" :close-on-press-escape="false" :destroy-on-close="true" :close-on-click-modal="false">

			<div class="flex items-start">
				<el-scrollbar class="w-[140px] border-r h-[350px]">
					<div v-for="(item,index) in link" :key="index"
					     class="h-[40px] leading-[40px] cursor-pointer hover:bg-primary-light-9 px-[10px] hover:text-primary"
					     :class="[ item.name == parentLinkName ? 'bg-primary-light-9 text-primary' : '' ]"
					     @click="changeParentLink(item)">
						{{ item.title }}
					</div>
				</el-scrollbar>
				<el-scrollbar class="pl-4 h-[350px] flex-1">
					<template v-if="parentLinkName == 'DIY_LINK'">
						<div class="mb-[16px]">
							<el-form-item :label="t('diyLinkName')">
								<el-input v-model="selectLink.title" :placeholder="t('diyLinkNamePlaceholder')" class="w-6/12"/>
							</el-form-item>
						</div>
						<div class="mb-[16px]">
							<el-form-item :label="t('diyLinkUrl')">
								<el-input v-model="selectLink.url" :placeholder="t('diyLinkUrlPlaceholder')" class="w-6/12"/>
							</el-form-item>
						</div>
						<el-form-item label=" ">
							<div class="text-sm text-gray-400 select-text">路径必须以“/”开头，例：/pages/index/index</div>
						</el-form-item>
						<el-form-item label=" ">
							<div class="text-sm text-gray-400 select-text">跳转外部链接“/”开头，例：https://baidu.com</div>
						</el-form-item>
					</template>
					<div v-else class="flex flex-wrap">
						<div v-for="(item,index) in childList" :key="index"
						     class="border border-br rounded-[3px] mr-[10px] mb-[10px] px-4 h-[32px] leading-[32px] cursor-pointer hover:bg-primary-light-9 px-[10px] hover:text-primary"
						     :class="[ item.name == selectLink.name ? 'border-primary text-primary' : '' ]"
						     @click="changeChildLink(item)">{{ item.title }}
						</div>
					</div>
				</el-scrollbar>
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
    import {ref, computed} from 'vue'
    import {cloneDeep} from 'lodash-es'
    import {getLink} from '@/api/diy';
    import {ElMessage} from 'element-plus'
import { CollectionTag } from '@element-plus/icons-vue';

    const prop = defineProps({
        modelValue: {
            type: String,
            default: ''
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const value: any = computed({
        get() {
            return prop.modelValue
        },
        set(value) {
            emit('update:modelValue', value)
        }
    })

    const showDialog = ref(false)

    const link: any = ref([])

    const parentLinkName = ref('')

    const childList: any = ref([])

    const selectLink: any = ref([])

    const show = () => {
        // 每次打开时赋值
        if (value.value.name != '') {
            selectLink.value = cloneDeep(value.value);
            parentLinkName.value = selectLink.value.parent;
        }
        showDialog.value = true
    }

    getLink({}).then((res: any) => {
        link.value = res.data;

        childList.value = Object.values(link.value)[0].child_list;
        if (value.value.name != '') {
            selectLink.value = cloneDeep(value.value);
        } else {
            selectLink.value = {
                parent: Object.values(link.value)[0].name
            };
        }
        parentLinkName.value = selectLink.value.parent;
    });

    // 选择父级链接
    const changeParentLink = (item: any) => {
        childList.value = item.child_list;
        parentLinkName.value = item.name;
    }

    // 选择子链接
    const changeChildLink = (item: any) => {
        delete item.is_share;
        Object.assign(selectLink.value, item)
    }

    const clear = () => {
        value.value = {
            name: '',
            parent: '',
            title: '',
            url: ''
        }
    }

    const save = () => {

        // 自定义链接
        if (parentLinkName.value === 'DIY_LINK') {
            selectLink.value.parent = parentLinkName.value
            selectLink.value.name = parentLinkName.value

            if (!selectLink.value.title) {
                ElMessage({
                    message: t('diyLinkNameNotEmpty'),
                    type: 'warning',
                })
                return;
            }

            if (!selectLink.value.url) {
                ElMessage({
                    message: t('diyLinkUrlNotEmpty'),
                    type: 'warning',
                })
                return;
            }

        }

        value.value = cloneDeep(selectLink.value)
        showDialog.value = false
    }

    defineExpose({
        showDialog
    })
</script>

<style lang="scss" scoped></style>