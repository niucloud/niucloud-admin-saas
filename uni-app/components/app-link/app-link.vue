<template>
	<view @click="toRedirect">
		<slot></slot>
	</view>
</template>

<script setup lang="ts">
	import { redirect, diyRedirect, currRoute, getToken } from '@/utils/common'

	const prop = defineProps({
		url: String,
		data: {
			type: Object,
			default: () => {
				return {}
			}
		},
		mode: {
			type: String,
			default: 'navigateTo'
		}
	})

	const toRedirect = () => {
		if (Object.keys(prop.data).length) {
			if (!prop.data.url) return;
			if (currRoute() == 'pages/member/index' && !getToken()) {
				useLogin().setLoginBack({ url: prop.data.url })
				return;
			}
			diyRedirect(prop.data);
		} else {
			redirect(prop)
		}
	}
</script>

<style lang="scss" scoped></style>