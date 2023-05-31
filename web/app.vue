<template>
	<el-config-provider :locale="locale">
		<NuxtLayout>
			<NuxtLoadingIndicator />
			<NuxtPage />
		</NuxtLayout>
	</el-config-provider>
</template>

<script lang="ts" setup>
import useConfigStore from '@/stores/config'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import Language from '~~/utils/language'
import useSystemStore from '@/stores/system'
import useAppStore from '@/stores/app'
import useMemberStore from '@/stores/member'
// 引入全局样式
import '@/assets/styles/index.scss'

if (process.client) {
	const match = location.href.match(/\/s(\d*)\//)
	const cookie = useCookie('siteId')
	match ? cookie.value = match[1] : cookie.value = null
}

// 初始化设置语言
const systemStore = useSystemStore()
const locale = computed(() => (systemStore.lang === 'zh-cn' ? zhCn : en))

// 初始化查询一些配置
const configStore = useConfigStore()
configStore.getLoginConfig()

// 查询站点信息
systemStore.getSitenfo()

// 如果已登录
getToken() && useMemberStore().setToken(getToken())

const route = useRoute()
watch(route, (nval, oval) => {
	useAppStore().$patch(state => {
		state.route = route.path
	})

	// 设置页面title
	let path = route.path == '/' ? '/index' : route.path
	// 处理部署后不知道为什么url会自动拼接上 / 的问题
	if (path.slice(-1) == '/') path = path.slice(0, -1)
	path = !path.lastIndexOf('/') ? `${path}/index` : path
	let key = path.replace('/', '').replaceAll('/', '.')

	setTimeout(() => {
		useHead({
			title: t(`pages.${key}`)
		})
	}, !oval ? 500 : 0)
}, { immediate: true })

// 语言包初始化加载
const language = new Language(useNuxtApp().$getI18n())
language.loadLocaleMessages(route.path, useSystemStore().lang)

// 设置title模板
useHead({
	titleTemplate: (title) => {
		const siteTitle = systemStore.site.front_end_name || systemStore.site.site_name
		return title ? `${title} - ${siteTitle}` : siteTitle
	}
})
</script>