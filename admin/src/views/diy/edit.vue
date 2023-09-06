<template>
    <div class="main-container flex-1">
        <el-header class="flex items-center h-[60px] bg-primary px-[20px]">
            <div class="text-white cursor-pointer flex items-center" @click="goBack">
                <el-icon size="14">
                    <ArrowLeft />
                </el-icon>
                <span class="pl-[5px]">{{ t('back') }}</span>
            </div>
            <div class="text-white ml-[10px] flex items-center">
                <span class="mr-[5px]"> ｜ {{ t('decorating') }}：{{ diyStore.typeName }}</span>
                <!--<el-icon class="font-bold"><EditPen /></el-icon>-->
            </div>
            <div class="flex-1"></div>
            <el-button @click="save()">{{ t('save') }}</el-button>
        </el-header>

        <div class="full-container flex flex-row flex-1 bg-page">

            <div class="component-list w-[290px]">

                <!-- 组件列表区域 -->
                <el-scrollbar class="px-[10px]">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item v-for="(item, key) in component" :key="key" :title="item.title" :name="key">
                            <ul class="flex flex-row flex-wrap">
                                <li v-for="(compItem, compKey) in item.list" :key="compKey" class="w-2/6 text-center cursor-pointer h-[75px]" :title="compItem.title" @click="diyStore.addComponent(compKey, compItem)">
                                    <icon :name="compItem.icon" size="23px" />
                                    <span class="block text-base truncate">{{ compItem.title }}</span>
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                </el-scrollbar>

            </div>

            <div class="preview-wrap flex-1 relative mt-[20px]">

                <el-scrollbar>
                    <el-button class="page-btn absolute right-[20px]" @click="diyStore.changeCurrentIndex(-99)">{{ t('pageSet') }}</el-button>
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
                                    <icon name="iconfont-icondelete-line" size="20px" class="block cursor-pointer leading-[40px]" @click="diyStore.delComponent" />
                                </el-tooltip>
                                <el-tooltip effect="light" :content="t('resetComponent')" placement="right">
                                    <icon name="iconfont-iconloader-line" size="20px" class="block cursor-pointer leading-[40px]" @click="diyStore.resetComponent" />
                                </el-tooltip>
                            </ul>

                            <!-- 组件预览渲染区域 -->
                            <iframe id="previewIframe" v-show="loadingIframe" :src="wapPreview" frameborder="0" class="preview-iframe w-[375px]" @load="loadIframe"></iframe>

                            <div v-show="loadingDev" class="preview-iframe w-[375px] pt-[20px] px-[20px]">
                                <div class="font-bold text-xl mb-[40px]">{{t('developTitle')}}</div>
                                <div class="mb-[20px] flex flex-col">
                                    <text class="mb-[10px]">{{ t('wapDomain') }}</text>
                                    <el-input v-model="wapDomain" :placeholder="t('wapDomainPlaceholder')" clearable />
                                </div>
                                <el-button type="primary" @click="saveWapDomain" >{{ t('confirm') }}</el-button>
                            </div>

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
                                <div class="tab-wrap flex rounded-[50px] bg-gray-100 text-[14px]" v-if="diyStore.currentComponent">
                                    <span class="cursor-pointer rounded-[50px] py-[5px] px-[15px]" :class="{ 'bg-primary text-white': diyStore.editTab == 'content'}" @click="diyStore.editTab = 'content'">{{ t('tabEditContent') }}</span>
                                    <span class="cursor-pointer rounded-[50px] py-[5px] px-[15px]" :class="{ 'bg-primary text-white': diyStore.editTab == 'style'}" @click="diyStore.editTab = 'style'">{{ t('tabEditStyle') }}</span>
                                </div>
                            </div>
                        </template>

                        <div class="edit-component-wrap">

                            <component v-if="diyStore.currentComponent" :is="modules[diyStore.currentComponent]" :value="diyStore.value[diyStore.currentIndex]">
                                <template #style>
                                    <div class="edit-attr-item-wrap">
                                        <h3 class="mb-[10px]">{{ t('componentStyleTitle') }}</h3>
                                        <el-form label-width="80px" class="px-[10px]">
                                            <el-form-item :label="t('bottomBgColor')" class="display-block" v-if="diyStore.editComponent.ignore.indexOf('pageBgColor') == -1">
                                                <el-color-picker v-model="diyStore.editComponent.pageBgColor" show-alpha :predefine="diyStore.predefineColors"/>
                                                <div class="text-sm text-gray-400">{{ t('bottomBgTips') }}</div>
                                            </el-form-item>
                                            <el-form-item :label="t('componentBgColor')" v-if="diyStore.editComponent.ignore.indexOf('componentBgColor') == -1">
                                                <el-color-picker v-model="diyStore.editComponent.componentBgColor" show-alpha :predefine="diyStore.predefineColors"/>
                                            </el-form-item>
                                            <el-form-item :label="t('marginTop')" v-if="diyStore.editComponent.ignore.indexOf('marginTop') == -1">
                                                <el-slider v-model="diyStore.editComponent.margin.top" show-input size="small" :min="0" class="ml-[10px] horz-blank-slider"/>
                                            </el-form-item>
                                            <el-form-item :label="t('marginBottom')" v-if="diyStore.editComponent.ignore.indexOf('marginBottom') == -1">
                                                <el-slider v-model="diyStore.editComponent.margin.bottom" show-input size="small" class="ml-[10px] horz-blank-slider"/>
                                            </el-form-item>
                                            <el-form-item :label="t('marginBoth')" v-if="diyStore.editComponent.ignore.indexOf('marginBoth') == -1">
                                                <el-slider v-model="diyStore.editComponent.margin.both" show-input size="small" class="ml-[10px] horz-blank-slider"/>
                                            </el-form-item>
                                            <el-form-item :label="t('topRounded')" v-if="diyStore.editComponent.ignore.indexOf('topRounded') == -1">
                                                <el-slider v-model="diyStore.editComponent.topRounded" show-input size="small" class="ml-[10px] horz-blank-slider" :max="50"/>
                                            </el-form-item>
                                            <el-form-item :label="t('bottomRounded')" v-if="diyStore.editComponent.ignore.indexOf('bottomRounded') == -1">
                                                <el-slider v-model="diyStore.editComponent.bottomRounded" show-input size="small" class="ml-[10px] horz-blank-slider" :max="50"/>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </template>
                            </component>
                            <div class="edit-attr-item-wrap" v-else>
                                <h3 class="mb-[10px]">{{ t('componentStyleTitle') }}</h3>
                                <el-form label-width="80px" class="px-[10px]">
                                    <el-form-item :label="t('bottomBgColor')" class="display-block" v-if="diyStore.editComponent.ignore.indexOf('pageBgColor') == -1">
                                        <el-color-picker v-model="diyStore.editComponent.pageBgColor" show-alpha :predefine="diyStore.predefineColors"/>
                                        <div class="text-sm text-gray-400">{{ t('bottomBgTips') }}</div>
                                    </el-form-item>
                                    <el-form-item :label="t('componentBgColor')" v-if="diyStore.editComponent.ignore.indexOf('componentBgColor') == -1">
                                        <el-color-picker v-model="diyStore.editComponent.componentBgColor" show-alpha :predefine="diyStore.predefineColors"/>
                                    </el-form-item>
                                    <el-form-item :label="t('marginTop')" v-if="diyStore.editComponent.ignore.indexOf('marginTop') == -1">
                                        <el-slider v-model="diyStore.editComponent.margin.top" show-input size="small" :min="0" class="ml-[10px] horz-blank-slider"/>
                                    </el-form-item>
                                    <el-form-item :label="t('marginBottom')" v-if="diyStore.editComponent.ignore.indexOf('marginBottom') == -1">
                                        <el-slider v-model="diyStore.editComponent.margin.bottom" show-input size="small" class="ml-[10px] horz-blank-slider"/>
                                    </el-form-item>
                                    <el-form-item :label="t('marginBoth')" v-if="diyStore.editComponent.ignore.indexOf('marginBoth') == -1">
                                        <el-slider v-model="diyStore.editComponent.margin.both" show-input size="small" class="ml-[10px] horz-blank-slider"/>
                                    </el-form-item>
                                    <el-form-item :label="t('topRounded')" v-if="diyStore.editComponent.ignore.indexOf('topRounded') == -1">
                                        <el-slider v-model="diyStore.editComponent.topRounded" show-input size="small" class="ml-[10px] horz-blank-slider" :max="50"/>
                                    </el-form-item>
                                    <el-form-item :label="t('bottomRounded')" v-if="diyStore.editComponent.ignore.indexOf('bottomRounded') == -1">
                                        <el-slider v-model="diyStore.editComponent.bottomRounded" show-input size="small" class="ml-[10px] horz-blank-slider" :max="50"/>
                                    </el-form-item>
                                </el-form>
                            </div>

                        </div>

                    </el-card>
                </el-scrollbar>

            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, watch } from 'vue'
import { t } from '@/lang'
import { addDiyPage, editDiyPage, initPage } from '@/api/diy';
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import { ElMessage, ElMessageBox } from 'element-plus'
import useDiyStore from '@/stores/modules/diy'
import storage from '@/utils/storage'

const diyStore = useDiyStore()
const route = useRoute();
const router = useRouter()

route.query.id = route.query.id || 0;
route.query.name = route.query.name || '';
route.query.type = route.query.type || ''; // 页面模板，新页面传入
route.query.template = route.query.template || ''; // 页面模板名称，新页面传入
route.query.title = route.query.title || '';
route.query.back = route.query.back || '/diy/list';

const wapUrl = ref('')
const wapDomain = ref('')
const wapPreview = ref('')

const loadingIframe = ref(false) // 加载iframe
const loadingDev = ref(false) // 加载开发环境配置
const timeFrame = ref(0)

const backPath = route.query.back
const component = ref([])
const componentType: string[] = reactive([])
const page = ref('')

const activeNames = ref(componentType)
const handleChange = (val: string[]) => { }

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
const isChange = ref(true); // 数据是否发生变化，true：没变化，false：变化了
const goBack = () => {
    if (isChange.value) {
        router.push(backPath);
    } else {
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
            router.push(backPath);
        }).catch(() => {
        })
    }
}

// 动态加载后台自定义组件编辑
const modulesFiles = import.meta.glob('./components/*.vue', { eager: true })
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
    id: route.query.id,
    name: route.query.name,
    type: route.query.type,
    template: route.query.template,
    title: route.query.title
}).then(res => {
    let data = res.data;
    diyStore.init(); // 初始化清空数据
    diyStore.id = data.id || 0;
    diyStore.name = data.name;
    diyStore.type = data.type;
    diyStore.typeName = data.type_name;
    diyStore.templateName = data.template;
    diyStore.isDefault = data.is_default;
    diyStore.pageMode = data.mode;
    if (data.value) {
        let sources = JSON.parse(data.value);
        diyStore.global = sources.global;
        if (sources.value.length) {
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
    for (let type in component.value) {
        componentType.push(type)
        for (let key in component.value[type].list) {
            let com = cloneDeep(component.value[type].list[key]);
            com.id = diyStore.generateRandom();
            com.componentName = key;
            com.componentTitle = com.title;
            Object.assign(com, com.value);
            delete com.name;
            delete com.title;
            delete com.value;
            delete com.type;
            delete com.icon;
            diyStore.components.push(com)
        }
    }

    wapDomain.value = data.domain_url.wap_domain;
    wapUrl.value = data.domain_url.wap_url;
    page.value = data.page;
    setDomain();

    // 生产模式禁止
    if(import.meta.env.MODE == 'production') return;

    // env文件配置过wap域名
    if (wapDomain.value) return;

    let wap_domain_storage = storage.get('wap_domain');
    if(wap_domain_storage){
        wapUrl.value = wap_domain_storage
        setDomain();
        return;
    }

    timeFrame.value = new Date().getTime();

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
        console.log('后台接受数据错误', e)
    }
}, false);

const saveWapDomain = ()=> {
    if (wapDomain.value.trim().length == 0) {
        ElMessage({
            type: 'warning',
            message: `${t('wapDomainPlaceholder')}`,
        });
        return;
    }
    wapUrl.value = wapDomain.value + '/wap'
    setDomain();
    storage.set({key: 'wap_domain', data: wapUrl.value});
    loadingIframe.value = true;
    loadingDev.value = false;
}

const setDomain = ()=>{
    wapPreview.value = `${wapUrl.value}/${page.value}?mode=decorate`; // 模式：decorate 装修 访问预览页面
    // 开发模式增加站点id
    if (import.meta.env.MODE == 'development') {
        let siteId = storage.get('siteId') || 0;
        wapPreview.value += `&site_id=${siteId}`;
    }
}

// 监听iframe加载事件
const loadIframe = ()=> {
    if (!wapPreview.value) return
    var loadTime = new Date().getTime();
    var difference = loadTime - timeFrame.value;
    // 检测页面加载差异，小于1000毫秒，则配置wap端域名
    if (difference < 1000) {
        loadingDev.value = true;
        loadingIframe.value = false;
        wapPreview.value = ''
    } else {
        loadingDev.value = false;
        loadingIframe.value = true;
    }
}

const isRepeat = ref(false)
const save = () => {
    if (!diyStore.verify()) {
        return;
    }

    if (isRepeat.value) return
    isRepeat.value = true

    let data = {
        id: diyStore.id,
        name: diyStore.name,
        title: diyStore.global.title,
        type: diyStore.type,
        template: diyStore.templateName,
        is_default: diyStore.isDefault,
        is_change: isChange.value ? 0 : 1,
        value: JSON.stringify({
            global: toRaw(diyStore.global),
            value: toRaw(diyStore.value)
        }),
    };

    const save = diyStore.id ? editDiyPage : addDiyPage
    save(data).then((res: any) => {
        isRepeat.value = false
        if (res.code == 1) {
            if (diyStore.id) {
                isRepeat.value = false // 不刷新
            } else {
                router.push(backPath);
            }
        }
    }).catch(err => {
        isRepeat.value = false
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
.display-block{
    .el-form-item__content{
        display: block;
    }
}

.edit-component-wrap{
    .content-wrap,.style-wrap{
        .edit-attr-item-wrap{
            border-top:4px solid var(--el-color-info-light-8);
            padding-top: 20px;
            &:first-of-type{
                border-top: none;
                padding-top: 0;
            }
        }
    }
}

</style>
<style lang="scss" scoped>
.full-container {
    height: calc(100vh - 60px);
}

.preview-iframe {
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