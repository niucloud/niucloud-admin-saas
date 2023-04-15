import { language } from '@/locale'
import { checkNeedLogin } from '@/utils/auth'
import { urlDeconstruction } from '@/utils/common'

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
				// 校验是否需要登录
				checkNeedLogin(route)
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
	language.loadLocaleMessages(launch.path, uni.getLocale())
	// 校验是否需要登录
	checkNeedLogin(launch)

	// 存储分享会员id
	if (launch.query && launch.query.mid) {
		uni.setStorageSync('pid', launch.query.mid)
	}

	// #ifdef H5
	const match = location.href.match(/\/s(\d*)\//);
	if (match) uni.setStorageSync('site_id', match[1])
	// #endif
}