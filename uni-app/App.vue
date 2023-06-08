<script setup lang="ts">
	import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
	import manifest from '@/manifest.json'
	import { redirectInterceptor, launchInterceptor } from '@/utils/interceptor'
	import { getToken, isWeixinBrowser, getSiteId } from '@/utils/common'
	import useMemberStore from '@/stores/member'
	import useConfigStore from '@/stores/config'
	import useSystemStore from '@/stores/system'
	import { useLogin } from '@/hooks/useLogin'
	import { language } from '@/locale'

	// #ifdef H5
	if (import.meta.env.VITE_APP_DEBUG) { new window.VConsole() }
	// #endif

	onLaunch(async (data) => {
		// 添加初始化拦截器
		launchInterceptor()
		// 添加页面跳转拦截器
		redirectInterceptor()

		// #ifdef H5
		uni.getSystemInfoSync().platform == 'ios' && (uni.setStorageSync('initUrl', location.href))

		// 缺少站点id，拦截
		if (process.env.NODE_ENV == 'development' && (getSiteId(uni.getStorageSync('wap_site_id') || import.meta.env.VITE_SITE_ID) === '')) return;
		// #endif

		const configStore = useConfigStore()
		configStore.getTabbarConfig()
		await configStore.getLoginConfig()

		useSystemStore().getSitenfo()

		// 隐藏tabbar
		uni.hideTabBar()

		// 判断是否已登录
		if (getToken()) {
			const memberStore = useMemberStore()
			await memberStore.setToken(getToken())
		}

		if (!getToken()) {
			const login = useLogin()
			// 三方平台自动登录
			// #ifdef MP
			login.getAuthCode()
			// #endif
			// #ifdef H5
			if (isWeixinBrowser()) {
				data.query.code ? login.authLogin(data.query.code) : login.getAuthCode('snsapi_userinfo')
			}
			// #endif
		}

		// 监听浏览器返回
		// #ifdef H5
		window.addEventListener("popstate", function (e) {
			const path = '/' + location.pathname.replace(manifest.h5.router.base, '')
			language.loadLocaleMessages(path, uni.getLocale())
		}, false);
		// #endif
	})

	onShow(() => {

	})

	onHide(() => {
	})
</script>

<style></style>