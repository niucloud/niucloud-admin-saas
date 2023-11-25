<template>
	<div class="main-container">
		<div class="detail-head">
			<div class="left" @click="router.push({ path: '/channel/wechat' })">
				<span class="iconfont iconxiangzuojiantou !text-xs"></span>
				<span class="ml-[1px]">{{ t('returnToPreviousPage') }}</span>
			</div>
			<span class="adorn">|</span>
			<span class="right">{{ pageName }}</span>
		</div>
		<el-card class="box-card !border-none" shadow="never">

			<div class="mt-[20px]">
				<div class="flex">
					<div class="min-w-[60px]">
						<span
							class="flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary">1</span>
					</div>
					<div>
						<p class="flex items-center text-[14px]">{{ t('writingTipsOne1') }}--<el-button link type="primary"
								@click="linkEvent">{{ t('writingTipsOne2') }}</el-button>, {{ t('writingTipsOne3') }}<span
								class="text-primary">URL / Token / EncondingAESKey</span>{{ t('writingTipsOne4') }}</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/wechat_1.png" />
						</div>
						<p class="flex items-center text-[14px] mt-[20px]">{{ t('writingTipsOne5') }}</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/wechat_4.png" />
						</div>
					</div>
				</div>
				<div class="flex mt-[40px]">
					<div class="min-w-[60px]">
						<span
							class="flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary">2</span>
					</div>
					<div>
						<p class="flex items-center text-[14px]">{{ t('writingTipsTwo1') }}</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/wechat_2.png" />
						</div>
					</div>
				</div>
				<div class="flex mt-[40px]">
					<div class="min-w-[60px]">
						<span
							class="flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary">3</span>
					</div>
					<div>
						<p class="flex items-center text-[14px]">{{ t('writingTipsThree1') }}<span
								class="text-primary">{{ t('writingTipsThree2') }}</span></p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/wechat_3.png" />
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getWechatConfig } from '@/app/api/wechat'
import { img } from '@/utils/common'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title
const router = useRouter()
const loading = ref(true)
const formData = reactive<Record<string, string>>({
	wechat_name: '',
	wechat_original: '',
	app_id: '',
	app_secret: '',
	qr_code: '',
	token: '',
	encoding_aes_key: '',
	encryption_type: 'not_encrypt'
})

/**
 * 获取微信配置
 */
getWechatConfig().then(res => {
	Object.assign(formData, res.data)
	loading.value = false
})

const linkEvent = () => {
	window.open('https://mp.weixin.qq.com/', '_blank')
}

</script>

<style lang="scss" scoped></style>
