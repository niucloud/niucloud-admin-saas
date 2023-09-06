import { language } from '@/locale'
import { checkNeedLogin } from '@/utils/auth'
import { redirect, urlDeconstruction, getToken, getSiteId } from '@/utils/common'
import { memberLog } from '@/api/auth'
import { nextTick } from 'vue'

/**
 * 页面跳转拦截器
 */
export const redirectInterceptor = () => {
	const routerApi : string[] = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']

	routerApi.forEach((name : string) => {
		uni.addInterceptor(name, {
			invoke(args) {
				const route = urlDeconstruction(args.url)

				// 加载语言包
				language.loadLocaleMessages(route.path, uni.getLocale())

				// 开发模式下，如果未配置站点ID，则跳转到开发环境配置页面
				// #ifdef H5
				if (process.env.NODE_ENV == 'development') {
					if ((getSiteId(import.meta.env.VITE_SITE_ID || uni.getStorageSync('wap_site_id')) === '') && route.path != '/pages/index/develop') {
						redirect({ url: '/pages/index/develop', mode: 'reLaunch' })
					}
				}
				// #endif

				// 校验是否需要登录
				checkNeedLogin(route)

				// 添加会员访问日志
				if (getToken()) memberLog({ route: route.path, params: JSON.stringify(route.query), pre_route: getCurrentPages()[0].route })
			}
		})
	})
}

/**
 * 应用初始化拦截器
 */
export const launchInterceptor = () => {
	const launch = uni.getLaunchOptionsSync()
	launch.path = `/${launch.path}`

	// 开发模式下，如果未配置站点ID，则跳转到开发环境配置页面
	// #ifdef H5
	if (process.env.NODE_ENV == 'development') {
		// 后台DIY装修页面时，获取站点ID
		
		if (location.search.indexOf('site_id=') != -1) {
			let site_id = location.search.substr(location.search.indexOf('site_id=')+8);
			uni.setStorageSync('wap_site_id', site_id);
		}
		if (getSiteId(import.meta.env.VITE_SITE_ID || uni.getStorageSync('wap_site_id')) === '') {
			launch.path = '/pages/index/develop';
			uni.setStorageSync('develop_before_path', launch.path);
			redirect({ url: '/pages/index/develop', mode: 'reLaunch' })
		}
	}
	// #endif

	// 加载语言包
	language.loadLocaleMessages(launch.path, uni.getLocale())

	// 校验是否需要登录
	checkNeedLogin(launch)

	// 存储分享会员id
	if (launch.query && launch.query.mid) {
		uni.setStorageSync('pid', launch.query.mid)
	}

	// 添加会员访问日志
	if (getToken()) memberLog({ route: launch.path, params: JSON.stringify(launch.query || {}), pre_route: '' })
}