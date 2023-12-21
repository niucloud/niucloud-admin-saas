<template>
	<view class="bg-gray-100 min-h-[100vh]">
		<view class="fixed top-0 inset-x-0 z-10">
            hello_world
		</view>

		<tabbar />
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { t } from '@/locale'

	import { useShare } from '@/hooks/useShare'

	const { setShare, onShareAppMessage, onShareTimeline } = useShare()
	setShare()
	onShareAppMessage()
	onShareTimeline()
</script>

<style lang="scss" scoped>
</style>
