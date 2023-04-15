import { getTabbarPages } from './pages'
import useDiyStore from '@/stores/diy'

/**
	* 跳转页面
	*/
export const redirect = (redirect : redirectOptions) => {
	// 装修模式禁止跳转
	if (useDiyStore().mode == 'decorate') return

	let { url, mode, param, success, fail, complete } = redirect
	mode = mode || 'navigateTo'
	const tabBar = getTabbarPages()
	tabBar.includes(url) && (mode = 'switchTab')

	mode != 'switchTab' && param && Object.keys(param).length && (url += uni.$u.queryParams(param))

	switch (mode) {
		case 'switchTab':
			uni.switchTab({
				url,
				success: () => { success && success() },
				fail: () => { fail && fail() },
				complete: () => { complete && complete() }
			})
			break;
		case 'navigateTo':
			uni.navigateTo({
				url,
				success: () => { success && success() },
				fail: () => { fail && fail() },
				complete: () => { complete && complete() }
			})
			break;
		case 'reLaunch':
			uni.reLaunch({
				url,
				success: () => { success && success() },
				fail: () => { fail && fail() },
				complete: () => { complete && complete() }
			})
			break;
		case 'redirectTo':
			uni.redirectTo({
				url,
				success: () => { success && success() },
				fail: () => { fail && fail() },
				complete: () => { complete && complete() }
			})
			break;
	}
}

/**
* 自定义跳转链接
* @param {Object} link
*/
export const diyRedirect = (link : any) => {
	const diyStore = useDiyStore();
	// 装修模式禁止跳转
	if (diyStore.mode == 'decorate') return;

	if (link == null || Object.keys(link).length == 1) return;

	if (!link.url) return;

	// 外部链接
	if (link.url.indexOf('http') != -1 || link.url.indexOf('http') != -1) {

		// #ifdef H5
		window.location.href = link.url;
		// #endif

		// #ifdef MP
		redirect({
			url: '/pages/webview/index',
			param: { src: encodeURIComponent(link.url) }
		});
		// #endif
	} else {
		redirect({ url: link.url });
	}
}

/**
* 获取当前路由
*/
export const currRoute = () => {
	const pages = getCurrentPages()
	const route = pages[pages.length - 1]
	return route ? route.route : ''
}

// 获取分享路由
export const currShareRoute = () => {
	const pages = getCurrentPages()
	let currentRoute = pages[pages.length - 1].route //获取当前页面路由

	// #ifdef H5
	let currentParam = pages[pages.length - 1].$page.options; //获取路由参数
	// #endif

	// #ifdef MP
	let currentParam = pages[pages.length - 1].options || {}; //获取路由参数
	// #endif

	// 拼接参数
	let params = [];
	for (let key in currentParam) {
		params.push(key + '=' + currentParam[key])
	}
	let currentPath = '/' + currentRoute;
	let currentQuery = params.join('&');
	if (currentQuery) currentPath += '?' + currentQuery;

	return {
		path: currentPath,
		query: currentQuery,
		params: params
	}
}

/**
* 获取token
* @returns
*/
export function getToken() : null | string {
	return uni.getStorageSync(import.meta.env.VITE_REQUEST_STORAGE_TOKEN_KEY)
}

/**
* 设置token
* @param token
* @returns
*/
export function setToken(token : string) : void {
	uni.setStorageSync(import.meta.env.VITE_REQUEST_STORAGE_TOKEN_KEY, token)
}

/**
* 移除token
* @returns
*/
export function removeToken() : void {
	uni.removeStorageSync(import.meta.env.VITE_REQUEST_STORAGE_TOKEN_KEY)
}

/**
* 将url 解构为 { path: ***, query: {} }
*/
export function urlDeconstruction(url : string) {
	const query = {}
	const [path, param] = url.split('?')

	param && param.split('&').forEach((str : string) => {
		let [name, value] = str.split('=')
		query[name] = value
	})

	return { path, query }
}

/**
* 判断是否是url
* @param str 
* @returns 
*/
export function isUrl(str : string) : boolean {
	return str.indexOf('http://') != -1 || str.indexOf('https://') != -1
}

/**
* 图片输出
* @param path 
* @returns 
*/
export function img(path : string) : string {
	return isUrl(path) ? path : `${import.meta.env.VITE_IMG_DOMAIN || location.origin}/${path}`
}

/**
* 判断是否是微信浏览器
*/
export function isWeixinBrowser() : boolean {
	// #ifndef H5
	return false
	// #endif
	let ua = navigator.userAgent.toLowerCase()
	return /micromessenger/.test(ua) ? true : false
}

/**
* 获取应用场景值
*/
export function getAppChannel() : string {
	// #ifdef APP-PLUS
	return 'app'
	// #endif
	// #ifdef MP-WEIXIN
	return 'weapp'
	// #endif
	// #ifdef H5
	return isWeixinBrowser() ? 'wechat' : 'h5'
	// #endif
}

/**
* 金额格式化
*/
export function moneyFormat(money : string) : string {
	return isNaN(parseFloat(money)) ? money : parseFloat(money).toFixed(2)
}

/**
 * 手机号隐藏
 */
export function mobileConceal(mobile : string) : string {
	return mobile.substring(0, 3) + "****" + mobile.substr(mobile.length - 4);
}