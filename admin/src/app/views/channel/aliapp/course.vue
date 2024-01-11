<template>
	<div class="main-container">
		<div class="detail-head">
			<div class="left" @click="router.push({ path: '/channel/aliapp' })">
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
						<p class="flex items-center text-[14px]">{{ t('alipayCourseTipsOne1') }}--<el-button link
								type="primary" @click="linkEvent">{{ t('alipayCourseTipsOne2') }}</el-button>, {{
									t('alipayCourseTipsOne3') }}</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/alipay1.png" />
						</div>
						<p class="flex items-center text-[14px] mt-[20px]">{{ t('alipayCourseTipsTwo1') }}</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/alipay2.png" />
						</div>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/alipay3.png" />
						</div>
					</div>
				</div>
				<div class="flex mt-[40px]">
					<div class="min-w-[60px]">
						<span
							class="flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary">2</span>
					</div>
					<div>
						<p class="flex items-center text-[14px]">{{ t('alipayCourseTipsTwo2') }}</p>
						<div class="w-[100%] mt-[10px] flex flex-wrap">
							<div class="w-[100%]">
								<img class="w-[100%]" src="@/app/assets/images/setting/alipay4.png" />
							</div>
							<div>
								<el-row :gutter="20">
									<el-col :span="6">
										<div class="w-[100%]">
											<img class="w-[100%]" src="@/app/assets/images/setting/alipay4_1.jpg" />
										</div>
									</el-col>
									<el-col :span="6">
										<div class="w-[100%]">
											<img class="w-[100%]" src="@/app/assets/images/setting/alipay4_2.jpg" />
										</div>
									</el-col>
									<el-col :span="6">
										<div class="w-[100%]">
											<img class="w-[100%]" src="@/app/assets/images/setting/alipay4_3.jpg" />
										</div>
									</el-col>
									<el-col :span="6">
										<div class="w-[100%]">
											<img class="w-[100%]" src="@/app/assets/images/setting/alipay4_4.jpg" />
										</div>
									</el-col>
								</el-row>
							</div>
						</div>
					</div>
				</div>
				<div class="flex mt-[40px]">
					<div class="min-w-[60px]">
						<span
							class="flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary">3</span>
					</div>
					<div>
						<!-- <span class="text-primary">{{ t('alipayCourseTipsThree2') }}</span> -->
						<p class="flex items-center text-[14px]">{{ t('alipayCourseTipsThree1') }}
						</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/alipay5.png" />
						</div>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/alipay6.png" />
						</div>
						<p class="flex items-center text-[14px] mt-[20px]">{{ t('alipayCourseTipsThree2') }}</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/alipay7.png" />
						</div>
						<p class="flex items-center text-[14px] mt-[20px]">{{ t('alipayCourseTipsThree3') }}</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/alipay8.png" />
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getWechatConfig } from '@/app/api/wechat'
// import { img } from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
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
    window.open('https://open.alipay.com/develop/manage', '_blank')
}

</script>

<style lang="scss" scoped></style>
