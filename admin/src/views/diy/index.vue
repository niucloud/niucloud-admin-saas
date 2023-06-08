<template>
	<div class="main-container">

		<div class="flex h-[700px] bg-body p-[20px]" v-show="loading">
			<iframe v-show="loadingIframe" class="w-[375px] border border-slate-100" :src="wapPreview" frameborder="0" id="previewIframe" @load="loadIframe"></iframe>
			<div v-show="loadingDev" class="w-[375px] border border-slate-100 pt-[20px] px-[20px]">
				<div class="font-bold text-xl mb-[40px]">{{t('developTitle')}}</div>
				<div class="mb-[20px] flex flex-col">
					<text class="mb-[10px]">{{ t('wapDomain') }}</text>
					<el-input v-model="wapDomain" :placeholder="t('wapDomainPlaceholder')" clearable />
				</div>
				<el-button type="primary" @click="save" >{{ t('confirm') }}</el-button>
			</div>

			<div class="w-[500px] ml-[40px]">
				<el-button type="primary" @click="toDecorate()">{{ t('decorate') }}</el-button>

				<div class="info-wrap mt-[20px]">
					<el-form label-width="80px" class="px-[10px]">
						<el-form-item :label="t('preview')">
							<el-radio-group v-model="previewMode">
								<el-radio :label="'weapp'">{{t('weapp')}}</el-radio>
								<el-radio :label="'wechat'">{{t('wechat')}}</el-radio>
							</el-radio-group>
						</el-form-item>
						<template v-if="previewMode == 'wechat'">
							<el-form-item :label="t('link')" v-show="wapPreview">
								<el-input readonly :value="wapPreview">
									<template #append>
										<el-button @click="copyEvent(wapPreview)" class="bg-primary copy">{{ t('copy') }}</el-button>
									</template>
								</el-input>
							</el-form-item>
							<el-form-item label=" " v-show="wapImage">
								<el-image :src="wapImage"/>
							</el-form-item>
						</template>
						<template v-if="previewMode == 'weapp'">
							<el-form-item label=" " v-if="weappConfig.qr_code">
								<el-image class="w-[100px] h-[100px]" :src="img(weappConfig.qr_code)"/>
							</el-form-item>
							<el-form-item label=" " v-else>
								<span class="text-gray-400">{{t('weappNotSet')}}</span>
							</el-form-item>
						</template>
					</el-form>

				</div>

			</div>
		</div>

	</div>
</template>

<script lang="ts" setup>
    import {ref, reactive, watch} from 'vue'
    import {t} from '@/lang'
    import { useRouter} from 'vue-router'
    import {getWeappConfig} from '@/api/weapp'
    import {getUrl} from '@/api/sys'
    import {useClipboard} from '@vueuse/core'
    import {ElMessage} from 'element-plus'
    import {img} from '@/utils/common'
    import QRCode from "qrcode";
    import storage from '@/utils/storage'

    const wapUrl = ref('')
    const wapDomain = ref('')
    const wapImage = ref('')
    const wapPreview = ref('')

    const loading = ref(false)
    const loadingIframe = ref(false) // 加载iframe
    const loadingDev = ref(false) // 加载开发环境配置
    const timeFrame = ref(0)

    var time = new Date().getTime();

    getUrl().then((res:any)=> {
        wapDomain.value = res.data.wap_domain;
        wapUrl.value = res.data.wap_url;
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
    });

    const save = ()=> {
        wapUrl.value = wapDomain.value + '/wap'
        setDomain();
        storage.set({ key : 'wap_domain', data :wapUrl.value });
        loadingIframe.value = true;
        loadingDev.value = false;
    }

    const setDomain = ()=> {
        let siteInfo = storage.get('siteInfo');
        let siteId = 0;
        if (siteInfo) siteId = siteInfo.site_id;
        wapPreview.value = `${wapUrl.value}/pages/index/index?mode=preview&site_id=${siteId}`;
        QRCode.toDataURL(wapPreview.value, {errorCorrectionLevel: 'L', margin: 0, width: 100}).then(url => {
            wapImage.value = url
        })
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
            wapImage.value = ''
        } else {
            loadingDev.value = false;
            loadingIframe.value = true;
        }
        loading.value = true
    }

    const router = useRouter()

    const weappConfig = reactive({
        qr_code: ''
    })

    const previewMode = ref('weapp')

    /**
     * 获取微信配置
     */
    getWeappConfig().then((res: any) => {
        if (res.code == 1) {
            let data = res.data;
            weappConfig.qr_code = data.qr_code;
        }
    })

    const url = router.resolve({
        path: '/decorate/edit',
        query: {name: 'DIY_INDEX'}
    });

    const toDecorate = () => {
        router.push('/decorate/edit?name=DIY_INDEX&back=/diy/index')
    }

    /**
     * 复制
     */
    const {copy, isSupported, copied} = useClipboard()
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

<style lang="scss">
	.copy {
		background: var(--el-color-primary) !important;
		color: var(--el-color-white) !important;
	}
</style>
<style lang="scss" scoped>
</style>