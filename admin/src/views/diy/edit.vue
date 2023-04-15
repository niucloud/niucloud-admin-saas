<template>

	<div class="main-container flex-1">
		<el-header class="flex items-center h-[60px] bg-primary px-[20px]">
			<div class="text-white cursor-pointer flex items-center" @click="goBack">
				<el-icon size="14"><ArrowLeft /></el-icon>
				<span class="pl-[5px]">{{ t('back') }}</span>
			</div>
			<div class="text-white ml-[10px] flex items-center">
				<span class="mr-[5px]"> ｜ {{ t('decorating') }}：{{ diyStore.typeName }}</span>
<!--				<el-icon class="font-bold"><EditPen /></el-icon>-->
			</div>
			<div class="flex-1"></div>
			<el-button @click="save()">{{ t('save') }}</el-button>
		</el-header>

		<div class="full-container flex flex-row flex-1 bg-page">

			<div class="component-list w-[290px]">

				<!-- 组件列表区域 -->
				<el-scrollbar class="px-[10px]">
					<el-collapse v-model="activeNames" @change="handleChange">
						<el-collapse-item v-for="(item,index) in component" :key="index" :title="item.type_name" :name="item.type">
							<ul class="flex flex-row flex-wrap">
								<li v-for="(compItem,compIndex) in item.list" :key="compIndex" class="w-2/6 text-center cursor-pointer h-[75px]" :title="compItem.title" @click="diyStore.addComponent(compItem)">
									<icon :name="compItem.icon" size="23px"/>
									<span class="block text-base truncate">{{compItem.title}}</span>
								</li>
							</ul>
						</el-collapse-item>
					</el-collapse>
				</el-scrollbar>

			</div>

			<div class="preview-wrap flex-1 relative mt-[20px]">

				<el-scrollbar>
					<el-button class="page-btn absolute right-[20px]" @click="diyStore.changeCurrentIndex(-99)">{{ t('pageSet')}}</el-button>
					<div class="diy-view-wrap w-[375px] shadow-lg mx-auto">
						<div class="preview-head bg-no-repeat bg-center bg-cover" @click="diyStore.changeCurrentIndex(-99)">
							<span class="text-base block text-center truncate cursor-pointer h-[64px] leading-[84px]">{{ diyStore.global.title }}</span>
						</div>
						<div class="preview-block relative">

							<ul class="quick-action absolute text-center -right-[70px] top-[20px] w-[42px] rounded shadow-md">
								<el-tooltip effect="light" :content="t('moveUpComponent')" placement="right">
									<icon name="iconfont-iconjiantoushang" size="20px" class="block cursor-pointer leading-[40px]" @click="diyStore.moveUpComponent" />
								</el-tooltip>
								<el-tooltip effect="light" :content="t('moveDownComponent')" placement="right">
									<icon name="iconfont-iconjiantouxia" size="20px" class="block cursor-pointer leading-[40px]" @click="diyStore.moveDownComponent" />
								</el-tooltip>
								<el-tooltip effect="light" :content="t('copyComponent')" placement="right">
									<icon name="iconfont-iconcopy-line" size="20px" class="block cursor-pointer leading-[40px]" @click="diyStore.copyComponent" />
								</el-tooltip>
								<el-tooltip effect="light" :content="t('delComponent')" placement="right">
									<icon name="iconfont-icondelete-line" size="20px" class="block cursor-pointer leading-[40px]" @click="diyStore.delComponent"/>
								</el-tooltip>
								<el-tooltip effect="light" :content="t('resetComponent')" placement="right">
									<icon name="iconfont-iconloader-line" size="20px" class="block cursor-pointer leading-[40px]" @click="diyStore.resetComponent" />
								</el-tooltip>
							</ul>

							<!-- 组件预览渲染区域 -->
							<iframe id="previewIframe" v-show="wapDomain" :src="wapDomain" frameborder="0" class="preview-iframe w-[375px]"></iframe>

						</div>
					</div>
				</el-scrollbar>

			</div>

			<div class="edit-attribute-wrap w-[400px]">

				<!-- 编辑组件属性区域 -->
				<el-scrollbar>
					<el-card class="box-card" shadow="never">
						<template #header>
							<div class="card-header flex justify-between items-center">
								<span class="title flex-1">{{ diyStore.currentIndex == -99 ? t('pageSet') : diyStore.editComponent.componentTitle }}</span>
							</div>
						</template>
						<component :is="modules[diyStore.currentComponent]" :value="diyStore.value[diyStore.currentIndex]" />
					</el-card>
				</el-scrollbar>

			</div>

		</div>
	</div>
</template>

<script lang="ts" setup>
    import {ref, reactive, toRaw, onMounted, watch} from 'vue'
    import {t} from '@/lang'
    import { addDiyPage, updateDiyPage,initPage} from '@/api/diy';
    import {useRoute,useRouter} from 'vue-router'
    import { cloneDeep, range, isEmpty } from 'lodash-es'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import useDiyStore from '@/stores/modules/diy'
    import { getWapDomain } from '@/utils/common'

    const diyStore = useDiyStore()
    const route = useRoute();
    const router = useRouter()

    const wapDomain = ref('')

    const component = ref([])
    const componentType:string[] = reactive([])

    const activeNames = ref(componentType)
    const handleChange = (val: string[]) => {}

    route.query.id = route.query.id || 0;
    route.query.name = route.query.name || '';
    route.query.type = route.query.type || ''; // 页面类型，新页面传入
    route.query.title = route.query.title || '';

    // 初始化原数据
    const originData = reactive({
        id: diyStore.id,
        name: diyStore.name,
        title: diyStore.global.title,
        value: JSON.stringify({
            global: toRaw(diyStore.global),
            value: toRaw(diyStore.value)
        })
    })

    // 返回上一页
    const isChange = ref(true) // 数据是否发生变化，true：没变化，false：变化了
    const goBack = () => {
        if(isChange.value){
            router.push('/diy/list');
        }else{
            // 数据发生变化，弹框提示：确定离开此页面
            ElMessageBox.confirm(
                t('leavePageTitleTips'),
                t('leavePageContentTips'),
                {
                    confirmButtonText: t('confirm'),
                    cancelButtonText: t('cancel'),
                    type: 'warning',
                    autofocus: false
                }
            ).then(() => {
                router.push('/diy/list');
            }).catch(() => {
            })
        }
    }

    // 动态加载后台自定义组件编辑
    const modulesFiles = import.meta.glob('./components/*.vue', {eager: true})
    const modules = {}
    for (const [key, value] of Object.entries(modulesFiles)) {
        const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1')
        const name = moduleName.split('/')[1]
        modules[name] = value.default
    }

    // 全局监听自定义数据变化
    watch(
        () => diyStore,
        (newValue, oldValue) => {
            let data = {
                id: newValue.id,
                name: newValue.name,
                title: newValue.global.title,
                value: JSON.stringify({
                    global: toRaw(newValue.global),
                    value: toRaw(newValue.value)
                })
            };

            diyStore.postMessage();
            isChange.value = JSON.stringify(data) == JSON.stringify(originData);
        },
        { deep: true }
    )

    // 根据当前页面路由查询页面初始化数据
    initPage({
        id:route.query.id,
        name:route.query.name,
        type:route.query.type,
        title:route.query.title
    }).then(res=> {
        if (res.code == 200) {
            let data = res.data;
            diyStore.id = data.id || 0;
            diyStore.name = data.name;
            diyStore.type = data.type;
            diyStore.typeName = data.type_name;
            if (data.value) {
                let sources = JSON.parse(data.value);
                diyStore.global = sources.global;
                if(sources.value.length) {
                    diyStore.value = sources.value;
                    // diyStore.changeCurrentIndex(0,diyStore.value[0]);
                }
            } else {
                diyStore.global.title = data.title;
            }

            // 初始化原数据
            originData.id = diyStore.id;
            originData.name = diyStore.name;
            originData.title = diyStore.global.title;
            originData.value = JSON.stringify({
                global: toRaw(diyStore.global),
                value: toRaw(diyStore.value)
            });

            component.value = data.component
            component.value.forEach((item: any) => {
                componentType.push(item.type)
                item.list.forEach((comp: any) => {
                    let com = cloneDeep(comp);
                    com.id = diyStore.generateRandom();
                    com.componentName = com.name;
                    com.componentTitle = com.title;
                    com.maxCount = com.max_count;
                    Object.assign(com, com.value);
                    delete com.name;
                    delete com.title;
                    delete com.value;
                    delete com.type;
                    delete com.icon;
                    delete com.max_count;
                    diyStore.components.push(com)
                })
            })

            wapDomain.value = `${getWapDomain()}/${data.page}?mode=decorate`; // 模式：decorate 装修 访问预览页面
        }
    })

    onMounted(() => {
        // 预览前端 uniapp iframe
        window.previewIframe = document.getElementById('previewIframe')
    })

    // 监听组件数据 uni-app端
    window.addEventListener('message', (event) => {
        try {
            let data = JSON.parse(event.data);
            if (!data.type) return;

            switch (data.type) {
                case 'init':
                    // 初始化，与uniapp建立连接传输数据
                    diyStore.load = true;
                    diyStore.postMessage();
                    break;
                case 'change':
                    // 切换
                    diyStore.changeCurrentIndex(data.index, data.component);
                    break;
                case 'data':
                    // 传数据
                    diyStore.changeCurrentIndex(data.index, data.component);
                    diyStore.global = data.global;
                    diyStore.value = data.value;
                    break;
            }
        } catch (e) {
            console.log('后台接受数据错误',e)
        }
    }, false);

    const loading = ref(false)
    const save = ()=> {
        if (!diyStore.verify()) {
            return;
        }

        if (loading.value) return
        loading.value = true

        let data = {
            id: diyStore.id,
            name: diyStore.name,
            title: diyStore.global.title,
            type: diyStore.type,
            value: JSON.stringify({
                global: toRaw(diyStore.global),
                value: toRaw(diyStore.value)
            })
        };

        const save = diyStore.id ? updateDiyPage : addDiyPage
        save(data).then((res: any) => {
            loading.value = false
            if (res.code == 200) {
                if (diyStore.id) {
                    loading.value = false // 不刷新
                } else {
                    router.push('/diy/list');
                }
            }
        }).catch(err => {
            loading.value = false
        })

    }
</script>

<style lang="scss">
	.el-collapse-item__wrap {
		border-bottom: none;
	}

	.el-collapse-item__content {
		padding-bottom: 0;
	}

	.el-collapse-item__header {
		font-size: var(--el-font-size-base);
	}
</style>
<style lang="scss" scoped>
	.full-container {
		height: calc(100vh - 60px);
	}

	.preview-iframe{
		height: calc(100vh - 160px);
	}

	.component-list {
		background: var(--el-bg-color);
	}

	.component-list ul li {
		&:not(.disabled):hover {
			color: var(--el-color-primary);
			background: var(--el-color-primary-light-9);
		}
	}

	.diy-view-wrap {
		background: var(--el-bg-color-page);
	}

	.diy-view-wrap .preview-head {
		background-image: url(assets/images/diy_preview_head.png);
		background-color: var(--el-bg-color);
	}

	.quick-action {
		background: var(--el-bg-color);
	}

	.edit-attribute-wrap {
		background: var(--el-bg-color);
	}

	.edit-attribute-wrap .box-card {
		border: none;
	}

</style>