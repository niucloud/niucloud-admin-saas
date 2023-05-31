<template>
	<div class="main-container">

		<div class="flex h-[700px] bg-body p-[20px]">
			<iframe class="w-[375px] border border-slate-100" :src="wapDomain" frameborder="0"></iframe>
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
							<el-form-item :label="t('link')">
								<el-input readonly :value="wapDomain">
									<template #append>
										<el-button @click="copyEvent(wapDomain)" class="bg-primary copy">{{ t('copy') }}</el-button>
									</template>
								</el-input>
							</el-form-item>
							<el-form-item label=" ">
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
    import {useRoute, useRouter} from 'vue-router'
    import {getWeappConfig} from '@/api/weapp'
    import {getUrl} from '@/api/sys'
    import {useClipboard} from '@vueuse/core'
    import {ElMessage} from 'element-plus'
    import {img} from '@/utils/common'
    import QRCode from "qrcode";

    const wapDomain = ref('')
    const wapImage = ref('')

    getUrl().then((res:any)=>{
        wapDomain.value = res.data.wap_url + '/pages/index/index'
        QRCode.toDataURL(wapDomain.value, {errorCorrectionLevel: 'L', margin: 0, width: 100}).then(url => {
            wapImage.value = url
        })
    });

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