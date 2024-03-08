import { language } from '@/locale'
import { checkNeedLogin } from '@/utils/auth'
import { redirect, getToken, getSiteId } from '@/utils/common'
import { memberLog } from '@/app/api/auth'
import useConfigStore from "@/stores/config";

/**
 * 页面跳转拦截器
 */
export const redirectInterceptor = (route: { path: string, query: object }) => {
	route.path = `/${route.path}`

	// 检测当前访问的是系统（app）还是插件
	setAddonName(route.path)

	// 加载语言包
	language.loadLocaleMessages(route.path, uni.getLocale())

	// 开发模式下，如果未配置站点ID，则跳转到开发环境配置页面
	// #ifdef H5
	if (process.env.NODE_ENV == 'development') {
		if ((getSiteId(import.meta.env.VITE_SITE_ID || uni.getStorageSync('wap_site_id')) === '') && route.path != '/app/pages/index/develop') {
			redirect({ url: '/app/pages/index/develop', mode: 'reLaunch' })
		}
	}
	// #endif

	// 校验是否需要登录
	checkNeedLogin(route)

	// 添加会员访问日志
	if (getToken()) memberLog({ route: route.path, params: JSON.stringify(route.query), pre_route: getCurrentPages()[0]?.route })
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
			launch.path = '/app/pages/index/develop';
			uni.setStorageSync('develop_before_path', launch.path);
			redirect({ url: '/app/pages/index/develop', mode: 'reLaunch' })
		}
	}
	// #endif

	// 检测当前访问的是系统（app）还是插件
	setAddonName(launch.path);

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

/**
 * 检测当前访问的是系统（app）还是插件，设置插件的底部导航
  * @param path
 */
const setAddonName = (path: string) => {
	let pathArr = path.split('/')
	let route = pathArr[1] == 'addon' ? pathArr[2] : 'app';
	const configStore = useConfigStore()
	if (configStore.addon != route) {
		configStore.addon = route;
		configStore.getTabbarConfig();
	}
}
