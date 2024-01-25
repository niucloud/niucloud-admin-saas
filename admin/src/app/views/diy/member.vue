<template>
    <div class="flex flex-wrap mt-[20px] min-w-[1000px]" v-if="page.use_template">
        <div class="page-item relative bg-no-repeat ml-[20px] mr-[40px] bg-[#f7f7f7] w-[340px] pt-[90px] pb-[20px]">
            <p class="absolute top-[54px] left-[50%] translate-x-[-50%] text-[14px] truncate w-[130px] text-center">{{ page.use_template.title }}</p>

            <div v-show="page.use_template.url" class="w-[320px] h-[550px] mx-auto">
                <iframe :id="'previewIframe_' + key" v-show="page.loadingIframe" class="w-[320px] h-[550px] mx-auto" :src="page.use_template.wapPreview" frameborder="0"></iframe>
                <div v-show="page.loadingDev" class="w-[320px] h-[550px] mx-auto bg-body pt-[20px] px-[20px]">
                    <div class="font-bold text-xl mb-[40px]">{{ t('developTitle') }}</div>
                    <div class="mb-[20px] flex flex-col">
                        <text class="mb-[10px]">{{ t('wapDomain') }}</text>
                        <el-input v-model="wapDomain" :placeholder="t('wapDomainPlaceholder')" clearable />
                    </div>
                    <div class="flex">
                        <el-button type="primary" @click="saveDomain()">{{ t('confirm') }}</el-button>
                        <el-button type="primary" @click="settingTips()" plain>{{ t('settingTips') }}</el-button>
                    </div>
                </div>
            </div>

            <div v-show="!page.use_template.wapPreview" class="overflow-hidden w-[320px] h-[550px] mx-auto">
                <img class="max-w-full" v-if="page.use_template.cover" :src="img(page.use_template.cover)" />
            </div>

            <div class="popup-wrap absolute inset-x-0 inset-y-0 select-none" :class="{ 'disabled': page.isDisabledPop }"></div>

        </div>

        <div class="w-[500px]">
            <div class="flex flex-wrap">
                <el-button type="primary" @click="toDecorate()" v-show="page.use_template.action == 'decorate'" class="mr-[12px]">{{ t('decorate') }}</el-button>
            </div>

            <div class="info-wrap">

                <div class="mt-[20px] bg-[#F7F8FA] p-[20px] flex items-center justify-between">
                    <div>
                        <div class="font-bold">{{ t('H5') }}</div>
						<el-form label-width="40px" class="mt-[5px]">
							<el-form-item :label="t('link')" v-show="page.use_template.wapPreview" class="mb-[5px]">
								<el-input readonly :value="page.use_template.wapPreview">
									<template #append>
										<el-button @click="copyEvent(page.use_template.wapPreview)" class="bg-primary copy">{{ t('copy') }}</el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-form>
                        <div class="text-[#999] text-base">{{ t('scanQRCodeOnRight') }}</div>
                    </div>
                    <div class="text-center">
                        <el-image class="w-[100px] h-[100px] mb-[5px]" :src="wapImage" />
                        <div @click="toPreview()" class="text-primary text-base cursor-pointer">{{ t('preview') }}</div>
                    </div>
                </div>

            </div>

        </div>

    </div>

</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getDecoratePage, changeTemplate } from '@/app/api/diy'
import storage from '@/utils/storage'
import QRCode from 'qrcode'
import { useClipboard } from '@vueuse/core'

const type: any = ref('DIY_MEMBER_INDEX');
const page: any = reactive({})
const router = useRouter()
const wapDomain = ref('')
const wapImage = ref('')
const link = ref({
    name: ''
})

// 添加自定义页面
const formData = reactive({
    type: '',
    name: '',
    parent:'',
    page: '',
    title: '',
    action: ''
})

// 初始化数据
const refreshData = () => {
    getDecoratePage({
        type : type.value
    }).then(res => {
        for (const key in res.data) {
            page[key] = res.data[key]
        }

        link.value.name = page.use_template.name;
        link.value.title = page.use_template.title;
        link.value.page = page.use_template.page;
        link.value.action = page.use_template.action;
        link.value.parent = page.use_template.parent;

        if (page.use_template.url) {
            page.loadingIframe = false // 加载iframe
            page.loadingDev = false // 加载开发环境配置
            page.isDisabledPop = false // 是否禁止打开遮罩层
            page.difference = 0 // 检测页面加载差异，小于1000毫秒，则配置wap端域名

            wapDomain.value = page.domain_url.wap_domain
            page.wapUrl = page.domain_url.wap_url

            if (import.meta.env.MODE == 'development') {
                // 开发模式情况下，并且未配置wap域名，则获取缓存域名
                if (wapDomain.value) {
                    page.wapUrl = wapDomain.value + '/wap'
                    setDomain()
                }
                if (storage.get('wap_domain')) {
                    page.wapUrl = storage.get('wap_domain')
                    setDomain()
                }
            }

            setDomain()
        }
    })
}

refreshData()

// 监听 uni-app 端 是否加载完成
window.addEventListener('message', (event) => {
    try {
        const data = JSON.parse(event.data)
        if (['appOnLaunch', 'appOnReady'].indexOf(data.type) != -1) {
            page.loadingDev = false // 禁用开发环境配置
            page.loadingIframe = true // 加载iframe
            const loadTime = new Date().getTime()
            page.difference = loadTime - page.timeIframe
            page.isDisabledPop = false // 是否禁止打开遮罩层
        }
    } catch (e) {
        initLoad()
        console.log('后台接受数据错误', e)
    }
}, false)

// 将数据发送到uniapp
const postMessage = () => {
    const diyData = JSON.stringify({
        type: 'appOnReady',
        message: '加载完成'
    })
    if (window['previewIframe_' + type.value]) window['previewIframe_' + type.value].contentWindow.postMessage(diyData, '*')
}

// 初始化加载状态
const initLoad = () => {
    page.loadingDev = true
    page.isDisabledPop = true
    page.loadingIframe = false
}

const saveDomain = () => {
    if (wapDomain.value.trim().length == 0) {
        ElMessage({
            type: 'warning',
            message: `${t('wapDomainPlaceholder')}`,
        })
        return
    }
    const wapUrl = wapDomain.value + '/wap'
    storage.set({key: 'wap_domain', data: wapUrl})

    if (page.use_template.url) {
        page.wapUrl = wapUrl
        setDomain()
    }
    setTimeout(() => {
        if (page.use_template.url) {
            page.loadingIframe = true // 加载iframe
            page.loadingDev = false // 加载开发环境配置
            page.isDisabledPop = false // 是否禁止打开遮罩层
        }
    }, 100 * 3)
}

const settingTips = () => {
    window.open('https://www.kancloud.cn/niucloud/niucloud-admin-develop/3213393')
}

const setDomain = () => {
    page.use_template.wapPreview = page.wapUrl + page.use_template.url
    QRCode.toDataURL(page.use_template.wapPreview, { errorCorrectionLevel: 'L', margin: 0, width: 100 }).then(url => {
        wapImage.value = url
    })
    page.timeIframe = new Date().getTime()
    postMessage()
    setTimeout(() => {
        if (page.difference == 0) initLoad()
    }, 1000 * 2)
}

// 跳转去装修
const toDecorate = () => {
    const query: any = {
        back: '/site/diy/member'
    }
    if (page.use_template.id) {
        query.id = page.use_template.id
    } else if (page.use_template.type) {
        query.name = page.use_template.type
    } else if (page.use_template.url) {
        query.url = page.use_template.url
    }
    const url = router.resolve({
        path: '/decorate/edit',
        query
    })
    window.open(url.href)
}

// 跳转去预览
const toPreview = () => {
    let value = page.use_template.page
    if (page.use_template.url) {
        value = page.use_template.url
    } else if (page.use_template.id) {
        value += '?id=' + page.use_template.id
    }
    const url = router.resolve({
        path: '/preview/wap',
        query: {
            page:value
        }
    })
    window.open(url.href)
}

const isRepeat = ref(false)
const changePage = ()=>{
    formData.type = type.value;
    formData.name = link.value.name;
    formData.page = link.value.url;
    formData.title = link.value.title;
    formData.action = link.value.action;
    formData.parent = link.value.parent;

    if (isRepeat.value) return
    isRepeat.value = true

    changeTemplate({
        ...formData
    }).then((res) => {
        isRepeat.value = false
        refreshData()
    })
}

// 复制
const { copy, isSupported, copied } = useClipboard()
const copyEvent = (text: string) => {
    if (!isSupported.value) {
        ElMessage({
            message: t('notSupportCopy'),
            type: 'warning'
        })
    }
    copy(text)
}

watch(copied, () => {
    if (copied.value) {
        ElMessage({
            message: t('copySuccess'),
            type: 'success'
        })
    }
})
</script>

<style lang="scss" scoped>
.page-item {
    background-image: url(@/app/assets/images/iphone_bg.png);
    background-color: var(--el-bg-color);
    background-size: 100%;

    .popup-wrap {
        display: none;
    }

    &:hover {
        .popup-wrap:not(.disabled) {
            display: block !important;
        }
    }
}
</style>
