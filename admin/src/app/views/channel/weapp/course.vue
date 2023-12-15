<template>
	<div class="main-container">
		<div class="detail-head">
			<div class="left" @click="router.push({ path: '/channel/weapp' })">
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
						<p class="flex items-center text-[14px]">{{ t('writingTipsOne1') }}<el-button link type="primary"
								@click="linkEvent">{{ t("writingTipsOne2") }}</el-button>,{{ t('writingTipsOne3') }}</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/weapp_1.png" />
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
							<img class="w-[100%]" src="@/app/assets/images/setting/weapp_2.png" />
						</div>
					</div>
				</div>
				<div class="flex mt-[40px]">
					<div class="min-w-[60px]">
						<span
							class="flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary">3</span>
					</div>
					<div>
						<p class="flex items-center text-[14px]">{{ t('writingTipsThree1') }}<span class="text-primary">{{
							t('writingTipsThree2') }}</span></p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/weapp_3.png" />
						</div>
					</div>
				</div>
				<div class="flex mt-[40px]">
					<div class="min-w-[60px]">
						<span
							class="flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary">4</span>
					</div>
					<div>
						<p class="flex items-center text-[14px]">{{ t('writingTipsFour1') }}<span class="text-primary">URL /
								Token / EncondingAESKey</span>{{ t('writingTipsFour2') }}</p>
						<div class="w-[100%] mt-[10px]">
							<img class="w-[100%]" src="@/app/assets/images/setting/weapp_4.png" />
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { img } from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const linkEvent = () => {
	window.open("https://mp.weixin.qq.com/", "_blank")
}

</script>

<style lang="scss" scoped></style>
